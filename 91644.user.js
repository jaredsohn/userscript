// ==UserScript==
// @name           torrentz.com Megasearch!
// @namespace      http://userscripts.org/scripts/show/91644
// @description    Aggregates torrentz search results in one neat mega page
// @include        http://*torrentz.*/*
// ==/UserScript==

var loggingOn = true;
var months = []; 

months["Jan"] = "01";
months["Feb"] = "02";
months["Mar"] = "03";
months["Apr"] = "04";
months["May"] = "05";
months["Jun"] = "06";
months["Jul"] = "07";
months["Aug"] = "08";
months["Sep"] = "09";
months["Oct"] = "10";
months["Nov"] = "11";
months["Dec"] = "12";

function process() {
	if (window.location.href.search(/search(.*)\?f=_mega/) < 0) {
		add_mega_link();
		return;
	}

	var div_results = get_div_results();
	clean_page(div_results);
	
	var search_query = window.location.href.replace(/^.*search\?f=_mega/, "");

	var depth = 1;
	var match = search_query.match(/\+depth\%3D([0-9]+)/i);
	if (match) {
		depth = match[1];
		search_query = search_query.replace(/\+depth\%3D[0-9]+/i, "");
	} else {
		var match = search_query.match(/\+depth=([0-9]+)/i);
		if (match) {
			depth = match[1];
			search_query = search_query.replace(/\+depth=[0-9]+/i, "");
		}
	}
	
	console.log(search_query + "," + depth);
	
	aggregate(div_results, search_query, depth);	
}

function add_mega_link() {
	var all_divs = document.getElementsByTagName('div');
	var div = undefined;

	for (i in all_divs)
		if (all_divs[i].className == "top") {
			div = all_divs[i];
			break;
		}
	
	if (div.innerHTML.search(/Mega Search/) > 0)
		return;
	
	var search_query = window.location.href.replace(/^.*search.*\?f=/, "");

	var insertionPoint = div.innerHTML.search(/<li><a href=\"\/search\"/);
	div.innerHTML = div.innerHTML.substring(0, insertionPoint) + 
					'<li><a href="/search?f=_mega+' + search_query + '" title="Mega Search">Megasearch</a></li>' +
					div.innerHTML.substring(insertionPoint);
}

function get_div_results() {
	var all_divs = document.getElementsByTagName('div');
	var div_results = undefined;

	for (i in all_divs)
		if (all_divs[i].className == "results")
			div_results = all_divs[i];

	return div_results;
}

function clean_page(div_results) {

	var nodes = div_results.getElementsByTagName('dl');
	while (nodes.length > 0)
		div_results.removeChild(nodes[0]);
	
	var all_divs = document.getElementsByTagName('div');

	var i = 0;
	while (i < all_divs.length) {
		if (all_divs[i].className == "note" || all_divs[i].className == "footer" || all_divs[i].className == "topx")
			all_divs[i].parentNode.removeChild(all_divs[i]);
		else i++;
	}
	
	nodes = document.getElementsByTagName('form');
	while (nodes.length > 0)
		nodes[0].parentNode.removeChild(nodes[0]);

	div_results.innerHTML = 
			'<h2 style="border-bottom: none"><span id="search_title_1"></span> <span id="search_title_2">0%</span></h2>' +
			'<h3><table width="100%"><tr><td align="left" width="80%">Movie Info</td><td width="10%">IMDB</td><td width="10%">RT</td></tr></table></h3>';
	
	set_search_title("Fetching torrents...");
}

function set_search_title(title, value1) {
	if (title)
		document.getElementById("search_title_1").innerHTML = title;
	if (value1)
		document.getElementById("search_title_2").innerHTML = value1 + "%";
}

function aggregate(div_results, search_query, depth, movies_found, idx) {

	var url = "http://www.torrentz.com/searchA?f=" + search_query + "+-xxx+-porn";

	if (!movies_found)
		movies_found = [];

	if (!idx) {
		idx = 0;
	} else {
		url += "&p=" + idx;
	}

	console.log("URL: " + url);
	
	set_search_title(undefined, Number(idx*100 / depth));
	
	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {
			console.log("loaded: " + idx + "," + movies_found);
			var result = response.responseText;

			var match1 = result.match(/<dl>.*?<\/dl>/gi);
			
			if (!match1) {
				if (movies_found.length > 0) {
					set_search_title("", 100);
					get_info_for_all_movies(div_results, movies_found);
				}
				return;
			}
			
			for (i = 0; i < match1.length; i++) {
				var match2 = match1[i].match(/<a href=\"(\/[a-z0-9]{40})\">(.*)\<\/a>/i);

				if (match2) {
					cleaned = cleanTitle(match2[2]);
					var movie_title = cleaned[0];
					var year = cleaned[1];
					
					if (movie_title != "") {
						
						movies_found[movie_title] = [];
						movies_found[movie_title]["title"] = movie_title; 
						movies_found[movie_title]["year"] = year;
						
						if (!movies_found[movie_title]["peers"])
							movies_found[movie_title]["peers"] = 0;
						if (!movies_found[movie_title]["date"])
							movies_found[movie_title]["date"] = "9999";
						
						match2 = match1[i].match(/<dd><span class="a"> *<span title="..., (.*?)">(.*?)<\/span> *<\/span> *<span class="s">.*?<\/span> <span class="u">([0-9,]+)<\/span> <span class="d">([0-9,]+)<\/span><\/dd>/i);
						
						if (match2) {
							movies_found[movie_title]["peers"] = Number(match2[3]) + Number(match2[4]) + Number(movies_found[movie_title]["peers"]);
							
							var match3 = match2[1].match(/([0-9]+) (...) ([0-9][0-9][0-9][0-9]) ([0-9][0-9]:[0-9][0-9]:[0-9][0-9])/i);
							if (match3) {
								var date = match3[3] + months[match3[2]] + match3[1] + " " + match3[4];
								if (date < movies_found[movie_title]["date"]) {
									movies_found[movie_title]["date"] = date;
									movies_found[movie_title]["date_str"] = match2[2];
								}
							}
						}
					}
				}
			}
			
			console.log(movies_found.length);
			console.log(movies_found);

			if (idx == depth - 1 || match1.length < 50) {
				set_search_title("", 100);
				get_info_for_all_movies(div_results, movies_found);
			} else {
				aggregate(div_results, search_query, depth, movies_found, idx + 1);
			}
		}
	});
}

function cleanTitle(movie_title) {

	var year = '';

	movie_title = movie_title.toLowerCase();
	movie_title = movie_title
					.replace(/<b>|<\/b>/g, '')
					.replace(/\./g, ' ')
					.replace(/_/g, ' ')
					.replace(/[\',]/g, '');

	match = movie_title.search(/(19|20|21)[0-9][0-9]/g);

	if (match > 3) {
		year = movie_title.substring(match, match + 4);
	}
	
	var pattern = "((19|20|21)[0-9][0-9]|" + 
		"dvd|brrip|bdrip|blu ray|hdtv| hd|720p|1080p|klaxxon|proper|r5|limited|italian|french|german|" + 
		" ts|telesync|avi|xvid|bluray|hddvd|nhd| ws|spanish| dc |500mb|1gb|2gb|" +
		"directors cut| unrated| aka|a k a| extended|the trilogy|the triology| trilogy" + ")";
	
	match = movie_title.search(new RegExp(pattern), "gi");
	
	if (match >= 0)
		movie_title = movie_title.substring(0, match);
	
	if (movie_title.match(/s[0-9][0-9]e[0-9][0-9]/i))
		return ["",""];

	movie_title = movie_title
					.replace(/\[.*?\]/g, '')
					.replace(/ +/g, ' ')
					.replace(/^ +| +$/g, '');

	return [ movie_title, year ];
}

function get_info_for_all_movies(div_results, movies_found) {
	var keys = new Array();
	for (var key in movies_found) {
		keys.push(movies_found[key]["date"] + "--" + key);
	}

	keys.sort();
	keys.reverse();
	
	g_num_movies = keys.length;
	g_num_done = 0;

	set_search_title("Fetching movies info...");

	for (var idx in keys) {
		var curr_movie = movies_found[keys[idx].replace(/^.*?--/, "")];
		
		console.log(idx + ":" + curr_movie["title"] + ","	+ curr_movie["year"]);

		add_result_row(div_results, curr_movie, idx);
		
		get_imdb_info_from_advanced_search(curr_movie["title"], curr_movie["year"], idx);
		get_RT_info_step_1(curr_movie["title"], curr_movie["year"], idx);
	}
}

function add_result_row(div_results, movie_info, idx) {

	var movie_row = document.createElement('dl');
	div_results.appendChild(movie_row);
	
	movie_row.id = "dl_" + idx;
	idxNum = Number(idx) + 1;
	
	var movie_title = movie_info["title"];

	movie_row.innerHTML = 
		'<font size="2">' +
		'<table width="100%" id="table_' + idx + '">' + 
			'<tr>'+
				'<td align="right" width="110" id="poster_' + idx + '"></td>' + 
				'<td valign="top" width="890">' + 
					'<table width="100%" id="table_' + idx + '">' + 
						'<tr>'+
							'<td width="690" id="title_td_' + idx + '">' +
								'<font size="2" color="#75808A">' + idxNum + '</font>. '+ 
								'<b><span id="title_' + idx + '">' + movie_title + '</span></b> '+ 
								'<span id="year_' + idx + '"></span> ' + 
								' &nbsp&nbsp&nbsp&nbsp ' + 
								'<span id="imdb_link_' + idx + '"></span> &nbsp ' + 
								'<span id="rt_link_' + idx + '"></span> &nbsp ' + 
								'<span id="torrentz_link_' + idx + '"></span>' +
							'</td>' + 
							'<td align="right" width="80" id="imdb_rating_' + idx + '">--</td>' + 
							'<td align="right" width="120" id="rt_rating_' + idx + '">---</td>'+ 
						'</tr>' + 
						'<tr><td><span id="extra_' + idx + '"></span>' + 
							'<font size="2" color="#75808A"> (' + movie_info["peers"] + ' peers, first seen ' + movie_info["date_str"] + ') </font>' + 
						'</td><td></td></tr>' + 
						'<tr><td id="summary_' + idx + '"></td><td></td></tr>' + 
					'</table>' +
				'</td>' +
			'</tr>' +
		'</table>' +
		'</font>';
}

function add_IMDB_info_to_document(imdb_info, idx) {
	try {
	
		var movieTitle = capitalizeFirsts(imdb_info["title"]);
		var strYear = "";
		
		console.log(imdb_info);
	
		if (imdb_info["year"] != "")
			strYear = "(" + imdb_info["year"] + ")";
	
		idxInc = Number(idx) + 1;
		
		var imdb_link, imdb_summary, imdb_rating, imdb_extra, imdb_poster;
		var torrentz_link = 'http://www.torrentz.com/search?q=' + imdb_info["title"].replace(/ /gi, "+");
		
		if (imdb_info["has_imdb_info"] == "Y") {
			imdb_link = "http://www.imdb.com/title/" + imdb_info["ref"];
			imdb_summary = '<font size="2" color="#75808A">' + imdb_info["summary"]	+ '</font>';
			imdb_rating = imdb_info["rating"];
			imdb_extra = imdb_info["genre"];
			imdb_poster = imdb_info["poster"];
		} else {
			imdb_link = "http://www.imdb.com/find?s=all&q="	+ imdb_info["title"].replace(/ /g, "+");
			imdb_summary = "";
			imdb_rating = "--";
			imdb_extra = "";
			imdb_poster = "";
		}
	
		document.getElementById('title_' + idx).innerHTML = movieTitle; 
		document.getElementById('year_' + idx).innerHTML = strYear; 
		document.getElementById('imdb_link_' + idx).innerHTML = '<a href="#" onClick="javascript:window.open(' + "'" + imdb_link + "');return false;"	+ '">IMDB</a>'; 
		document.getElementById('torrentz_link_' + idx).innerHTML = '<a href="#" onClick="javascript:window.open(' + "'" + torrentz_link + "');return false;" + '>Torrentz</a>';
		document.getElementById('extra_' + idx).innerHTML = imdb_extra;
		document.getElementById('summary_' + idx).innerHTML = imdb_summary;
		document.getElementById('imdb_rating_' + idx).innerHTML = imdb_rating;
		
		g_num_done++;
		set_search_title(undefined, Math.ceil((g_num_done * 100) / (g_num_movies * 2)));
	
	} catch (e) {
		console.log(e.stack);
	}
}

function addRTInfoToDocument(rt_info, idx) {
	if (rt_info["has_rt_info"] == "Y") {
		document.getElementById('rt_rating_' + idx).innerHTML = rt_info["rating_critics"] + " / " + rt_info["rating_popular"];
		document.getElementById('rt_link_' + idx).innerHTML = '<a href="#" onClick="javascript:window.open(' + "'" + rt_info["url"] + "');return false;" + '>RT</a>';
		document.getElementById('poster_' + idx).innerHTML = '<img src="'+ rt_info["poster"] + '" width="104" height="154"></img>';
	} else {
		console.log("no Rt info: " + rt_info["title"]);
		document.getElementById('rt_link_' + idx).innerHTML = '<a href="#" onClick="javascript:window.open(' + "'" + rt_info["url"] + "');return false;" + '>RT</a>';
	}

	g_num_done++;
	set_search_title(undefined, Math.ceil((g_num_done * 100) / (g_num_movies * 2)));
}

function get_imdb_info_from_advanced_search(movieTitle, movieYear, idx) {

	if (loggingOn)
		console.log("searching imdb for: " + movieTitle);

	if (movieYear > 0)
		var url = "http://www.imdb.com/search/title?release_date=" + movieYear + "-01-01," + movieYear + "-12-31&sort=num_votes,desc&title=" + movieTitle.replace(/ /g, "%20");
	else
		var url = "http://www.imdb.com/search/title?sort=num_votes,desc&title="	+ movieTitle.replace(/ /g, "%20");

	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {

			var result = response.responseText.replace(/\n/g,"");
			
			if (movieYear != "")
				var pattern = new RegExp("a href=..title.(tt[0-9]+).. title=." + movieTitle + " +." + movieYear + ".\">", "i");
			else
				var pattern = new RegExp("a href=..title.(tt[0-9]+).. title=." + movieTitle + " +.[0-9][0-9][0-9][0-9].\">", "i");

			var match = result.match(pattern);
			
			var imdb_info = [];
			imdb_info["title"] = movieTitle;
			imdb_info["year"] = movieYear;
			imdb_info["ref"] = "";
			imdb_info["rating"] = "";
			imdb_info["summary"] = "";

			if (match) {
				
				imdb_info["has_imdb_info"] = "Y";
				imdb_info["ref"] = match[1];

				var rating = "";
				var summary = "none";
				var match, pattern;
				
				pattern = new RegExp(imdb_info["ref"] + ".imdb.([0-9.]+).", "i");
				match = result.match(pattern);
				if (match) imdb_info["rating"] = match[1];

				pattern = new RegExp(imdb_info["ref"] + ".*?outline..(.*?)\<\/span", "im");
				match = result.replace(/\n/gm, "").match(pattern);
				if (match) imdb_info["summary"] = match[1];
				
				pattern = new RegExp(imdb_info["ref"] + ".*?.span class..genre..(.*?)\<\/span", "im");
				match = result.match(pattern);
				
				if (match) {
					var match2 = match[1].match(/<a href..\/genre\/(.*?).\>(.*?)\<\/\a\>/gi);
					imdb_info["genre"] = "";
				
					for (matchIdx in match2) {
						match = match2[matchIdx].match(/<a href..\/genre\/(.*?).\>(.*?)\<\/\a\>/i);
						imdb_info["genre"] = imdb_info["genre"] + match[2] + ", ";
					}
					imdb_info["genre"] = imdb_info["genre"].replace(/, $/, "");
				}

				console.log("IMDB found 1: " + movieTitle + "," + imdb_info["ref"]);
				add_IMDB_info_to_document(imdb_info, idx);
			} else {
				get_imdb_info_from_regular_search(movieTitle, movieYear, idx);
			}
		},

		onerror : function(response) {
			console.log("onerror:" + response.status + ":"
					+ response.statusText + "," + response.readyState + ","
					+ response.responseHeaders);
		}
	});
}


function get_imdb_info_from_regular_search(movie_title, movie_year, idx) {

	if (loggingOn)
		console.log("searching imdb 2 for: " + movie_title);

	var url = "http://www.imdb.com/find?s=all&q=" + movie_title.replace(/ /g, "+");
	
	console.log(url);

	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {

			var page_text = response.responseText.replace(/\n/g,"");
			
			if (page_text.indexOf("<title>IMDb Search</title>") >= 0) {
				console.log("imdb: hit search page: " + movie_title);
				var imdb_info = extract_imdb_info_from_regular_search(movie_title, movie_year, page_text);
				get_imdb_info_from_movie_page(imdb_info, idx);
			} else {
				console.log("imdb: hit movie page: " + movie_title);
				var imdb_info = [];
				imdb_info["title"] = movie_title;
				imdb_info["year"] = movie_year;
				extract_imdb_info_from_movie_page(page_text, imdb_info);
				add_IMDB_info_to_document(imdb_info, idx);
			}
		},

		onerror : function(response) {
			console.log("onerror:" + response.status + ":"
					+ response.statusText + "," + response.readyState + ","
					+ response.responseHeaders);
		}
	});
}
 
function extract_imdb_info_from_regular_search(movie_title, movie_year, page_text) {
	
	var imdb_info = [];
	imdb_info["title"] = movie_title;
	imdb_info["year"] = 0;
	imdb_info["link_found"] = "N";

	var patternStr = "link=.title.(tt[0-9]+)....> *(.*?) *\<\/a\> *.([0-9][0-9][0-9][0-9]).";
	var pattern = new RegExp(patternStr, "gi");
	var match = page_text.match(pattern);

	if (match) {
		
		console.log("match regular search: " + movie_title);

		for (tryIdx in [1,2]) {
		
			for (matchIdx in match) {
				pattern = new RegExp(patternStr, "i");
				var match2 = match[matchIdx].match(pattern);
				
				if (match2) {
					result_title = match2[2];
					result_year = match2[3];
					
					var movieMatches = false;
					
					if (tryIdx == 1) {
						if (result_title.replace(/[^a-z0-9]/gi,"").toUpperCase() == movie_title.replace(/[^a-z0-9]/gi,"").toUpperCase()) {
							movieMatches = true;
						}
					} else if (tryIdx == 2) {
						if (result_title.replace(/[^a-z0-9]/gi,"").toUpperCase().indexOf(movie_title.replace(/[^a-z0-9]/gi,"").toUpperCase()) >= 0) {
							movieMatches = true;
						} else if (movie_title.replace(/[^a-z0-9]/gi,"").toUpperCase().indexOf(result_title.replace(/[^a-z0-9]/gi,"").toUpperCase()) >= 0) {
							movieMatches = true;
						} 
					}

					if (movieMatches) {
						
						imdb_info["link_found"] = "Y";
						if (movie_year == "") {
							imdb_info["title"] = result_title;
							imdb_info["year"] = result_year;
							imdb_info["ref"] = match2[1];
							break;
						} else if (result_year == movie_year) {
							imdb_info["title"] = result_title;
							imdb_info["year"] = result_year;
							imdb_info["ref"] = match2[1];
							break;
						} else if (Math.abs(result_year - movie_year) < Math.abs(imdb_info["year"] - movie_year)) {
							imdb_info["title"] = result_title;
							imdb_info["year"] = result_year;
							imdb_info["ref"] = match2[1];
							break;
						}
					}
				}
			}
		}

	}
	
	return imdb_info;
}


function get_imdb_info_from_movie_page(imdb_info, idx) {

	if (loggingOn)
		console.log("searching imdb 3 for: " + imdb_info["title"]);

	var url = "http://www.imdb.com/title/" + imdb_info["ref"];

	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {
			var page_text = response.responseText.replace(/\n/g,"");
			extract_imdb_info_from_movie_page(page_text, imdb_info);
			add_IMDB_info_to_document(imdb_info, idx);
		},

		onerror : function(response) {
			console.log("onerror:" + response.status + ":"
					+ response.statusText + "," + response.readyState + ","
					+ response.responseHeaders);
		}
	});
}

function extract_imdb_info_from_movie_page(page_text, imdb_info) {
	
	imdb_info["has_imdb_info"] = "Y";
	
	pattern = new RegExp("<title>(.*?) +.([0-9][0-9][0-9][0-9]). - IMDb</title>", "i");
	var match = page_text.match(pattern);
	if (match) {
		imdb_info["title"] = match[1];
		imdb_info["year"] = match[2];
	}

	pattern = new RegExp("meta +property=\"og:url\" +content=.http://www.imdb.com/title/(tt[0-9]+)/.", "i");
	var match = page_text.match(pattern);
	if (match) imdb_info["ref"] = match[1];

	patternStr = "<a +onclick=\".*?\/rg\/title-overview\/genre\/images\/.*?\" +href\=\"/genre/.*?\" *>(.*?)<\/a>";
	pattern = new RegExp(patternStr, "gi");
	var match = page_text.match(pattern);

	if (match) {
		imdb_info["genre"] = "";
		pattern = new RegExp(patternStr, "i");

		for (matchIdx in match) {
			var match2 = match[matchIdx].match(pattern);
			if (match2)
				imdb_info["genre"] = imdb_info["genre"] + match2[1] + ", ";
		}
		imdb_info["genre"] = imdb_info["genre"].replace(/, $/, "");
	}

	pattern = new RegExp("<span class=\"rating-rating\">([0-9.]+)<span>", "i");
	var match = page_text.match(pattern);
	if (match) imdb_info["rating"] = match[1];

	pattern = new RegExp("<p><p>(.*?)(|<a href.*?)</p></p>", "i");
	match = page_text.match(pattern);
	if (match) imdb_info["summary"] = match[1];
	
	console.log("imdb 3: " + imdb_info["title"] + "," + imdb_info["genre"]);
}

function get_RT_info_step_1(movieTitle, movieYear, idx) {

	if (loggingOn)
		console.log("searching RT for: " + movieTitle);

	var url = "http://www.rottentomatoes.com/search/full_search.php?search=" + movieTitle.replace(/ /g, "%20");

	console.log("RT search 1: " + url);

	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {
			
			var result = response.responseText.replace(/\n/gm, " ");
			
            var patternStr = "class=.firstCol title.> +<p> +<a href=.(.*?). +class=.. +>(.*?)<.*?lastCol date.> *\<p\>\<strong\>([0-9]+)\<\/strong\>";
			var pattern = new RegExp(patternStr, "ig");
			var match = result.match(pattern);
			
			if (match) {

				for (matchIdx in match) {
					
					pattern = new RegExp(patternStr, "i");
					var match2 = match[matchIdx].match(pattern);

					if (match2) {
						var ref = match2[1];
						var titleFound = match2[2].replace(/[^a-z0-9]/gi,"").trim().toLowerCase();
						var yearFound = match2[3];
						
						if (titleFound == movieTitle.replace(/[^a-z0-9]/gi,"").toLowerCase() && yearFound == movieYear) {
							var url = 'http://www.rottentomatoes.com' + ref;
							get_RT_info_step_2(url, movieTitle, movieYear, idx);
							return;
						}
					}
				}

				for (matchIdx in match) {
					
					pattern = new RegExp(patternStr, "i");
					var match2 = match[matchIdx].match(pattern);

					if (match2) {
						var ref = match2[1];
						var titleFound = match2[2].replace(/[^a-z0-9]/gi,"").trim().toLowerCase();
						var yearFound = match2[3];
						
						if (titleFound.indexOf(movieTitle.replace(/[^a-z0-9]/gi,"").toLowerCase()) >= 0) {
							var url = 'http://www.rottentomatoes.com' + ref;
							get_RT_info_step_2(url, movieTitle, movieYear, idx);
							return;
						}
					}
				}
			} 
			
			var rt_info = [];
			rt_info["has_rt_info"] = "N";
			rt_info["url"] = "http://www.rottentomatoes.com/search/full_search.php?search=" + movieTitle.replace(/ /g, "%20");
			addRTInfoToDocument(rt_info, idx);
			console.log("no RT match 1:" + movieTitle);
		},

		onerror : function(response) {
			console.log("onerror:" + response.status + ":" + response.statusText + "," + response.readyState + "," + response.responseHeaders);
		}
	});
}

function get_RT_info_step_2(url, movieTitle, movieYear, idx) {

	if (loggingOn)
		console.log("searching RT 2 for: " + movieTitle);

	console.log(url);

	GM_xmlhttpRequest( {

		method : 'GET',
		url : url,
		headers : {
			'User-agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept' : 'application/atom+xml,application/xml,text/xml'
		},

		onload : function(response) {
			var page_text = response.responseText.replace(/\n/gm, " ");

			var rt_info = [];
			rt_info["url"] = url;
			rt_info["has_rt_info"] = "Y";
			rt_info["poster"] = undefined;

			var pattern = new RegExp(".meter popcorn numeric ..(.*?)..span.", "i");
			var match = page_text.match(pattern);
			if (match)
				rt_info["rating_popular"] = match[1] + "%";
			else 
				rt_info["rating_popular"] = "--";

			var pattern = new RegExp(".meter (fresh|rotten|certified) numeric (|perfect) *\".*?>(.*?)</span.", "i");
			var match = page_text.match(pattern);
			if (match)
				rt_info["rating_critics"] = match[3] + "%";
			else
				rt_info["rating_critics"] = "--";
			
			var match = page_text.match(/class=\"poster\"> *<img src=\"(http:\/\/.*?\.(jpg|gif))\"/i);
			if (match)
				if (!match[1].search(/poster_default/) >= 0)
					rt_info["poster"] = match[1];
			
			addRTInfoToDocument(rt_info, idx);
		},

		onerror : function(response) {
			console.log("onerror:" + response.status + ":"
					+ response.statusText + "," + response.readyState + ","
					+ response.responseHeaders);
		}

	});

}

function capitalizeFirsts(val) {
	newVal = '';
	val = val.split(' ');
	for ( var c = 0; c < val.length; c++)
		newVal += val[c].substring(0, 1).toUpperCase()
				+ val[c].substring(1, val[c].length) + ' ';
	return newVal;
}

function printStack(e) {

	if (e.stack) {
		var callstack = [];
		var lines = e.stack.split('\n');
		for ( var i = 0, len = lines.length; i < len; i++) {
			if (lines[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
				callstack.push(lines[i]);
			}
		}
		callstack.shift();
		console.log(callstack.join("\n"));
	}
}

function debug() {
	var div_results = get_div_results();
	clean_page(div_results);
	var movie_title = "shrek";
	add_result_row(div_results, movie_title, "2001");
	get_imdb_info_from_advanced_search(movie_title, "", 0);
}

//debug();

process();
