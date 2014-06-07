// ==UserScript==
// @name           IMDb To IHeartMovies
// @namespace      imdb2ihm
// @description	   Copy your movie ratings from IMDb to IHeartMovies.com, LivingSocial Movies and Sinemalar.com
// @author		   sanilunlu
// @version		   1.0
// @include        http://www.imdb.com/mymovies/list?votehistory
// ==/UserScript==

// string => xpath
// number => type
// object => node
// boolean => fix
function $x() {
	var x='',          // default values
	node=document,
	type=0,
	fix=true,
	i=0,
	toAr=function(xp){      // XPathResult to array
		var final=[], next;
		while(next=xp.iterateNext())
			final.push(next);
		return final
	},
	cur;
	while (cur=arguments[i++]) {     // argument handler
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	}
	if (fix) {      // array conversion logic
		if (type==6) type=4;
		if (type==7) type=5;
	}
	if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
	if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
	var temp;
	if (node != document && node.ownerDocument != document) {
		var ex = node.createExpression(x, null); // because it gives an error!
		temp = ex.evaluate(node,type,null); //evaluate!
	} else {
		temp = document.evaluate(x,node,null,type,null); //evaluate!
	}
if (fix)
	switch(type) {                              // automatically return special type
		case 1:return temp.numberValue;
		case 2:return temp.stringValue;
		case 3:return temp.booleanValue;
		case 8:return temp.singleNodeValue;
		case 9:return temp.singleNodeValue;
	}
	return fix ? toAr(temp) : temp;
}

// onload: xhr.responseText
// onerror: xhr
function post(url, data, cb, er) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(xhr) { cb(xhr.responseText); },
    onerror: function(xhr) { er(xhr) }
  });
}

// onload: xhr.responseText
// onerror: xhr
function get(url, cb, er) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers: {
			"User-Agent": "Mozilla/5.0",
			"Accept": "text/html"
		},
		onload: function(xhr) { cb(xhr.responseText); },
    onerror: function(xhr) { er(xhr) }
  });
}

function cleanMovieName(movieName) {
	return movieName.replace(/[,.:;]/, "").replace(/ [-] /, " ").replace(/ [&] /, " ").replace(/ and /, " ");
}

function iterateImdbMovies(funcToHandle) {
	var trs = $x("//tr[count(td)=4 and count(@*)=0]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	var i = 0;
	trs.forEach(function(tr) {
		i++;
		var name = $x("//tr[count(td)=4 and count(@*)=0][" + i + "]/td[2]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		var vote = $x("//tr[count(td)=4 and count(@*)=0][" + i + "]/td[3]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		var movieNameYear = name[0].textContent;
		var movieRating = vote[0].textContent;
		movieNameYear = movieNameYear.replace(/[\x01-\x1F\t\n\r\f"]/, "");
		movieNameYear = movieNameYear.replace(/(TV)/, "");
		movieNameYear = movieNameYear.replace(/(V)/, "");
		movieNameYear = movieNameYear.replace(/(VG)/, "");
		movieNameYear = movieNameYear.replace(/\/I+/, "");
		movieNameYear = movieNameYear.replace(/^"/,"").replace(/"(\s*\([0-9]*\)\s*)$/,"$1");
		movieNameYear = movieNameYear.trim();
		var movieName = movieNameYear.replace(/\s*\([0-9]*\)\s*$/, "");
		var movieYear = movieNameYear.match(/\(([0-9]*)\)\s*$/)[1];
//	unsafeWindow.console.log("N: " + movieNameYear + " V: " + movieRating);
//	unsafeWindow.console.log(tr);
		funcToHandle(movieNameYear, movieRating, tr, movieName, movieYear);
	});
}

var yeni = document.createElement("div");
//yeni.setAttribute("id", "donen-cevap");
//yeni.setAttribute("style", "display:none");
//document.body.appendChild(yeni);

// iHeartMovies.com
if(confirm('Do you want to sync your ratings to iHeartMovies.com? (You should be logged in)') == true) {
	iterateImdbMovies(function(movieName, movieRating, tr) {
		unsafeWindow.console.log('Querying ' + 'http://www.iheartmovies.com/search/inc.query.php?q=' + movieName + '&type=f' + ' with null');
		post('http://www.iheartmovies.com/search/inc.query.php?q=' + movieName + '&type=f', null, function(text) {
			yeni.innerHTML = text;
	//		unsafeWindow.console.log('Link:' + text);
			var result = $x("//span[@id='donen-cevap']/div/attribute::ihmpage", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			if(result[0] == undefined) {
				unsafeWindow.console.log('Can not find the movie ' + movieName);
				tr.querySelector('td').style.backgroundColor = 'red';
				return;
			}
			var resultLink = 'http://www.iheartmovies.com' + result[0].textContent;
			var resultMovieId = result[0].textContent.replace('/film/',"");
			unsafeWindow.console.log('Querying ' + 'http://www.iheartmovies.com/film/ajax/add.php' + ' with ' + 'id=' + resultMovieId);
			post('http://www.iheartmovies.com/film/ajax/add.php', 'id=' + resultMovieId, function(text) {
				post('http://www.iheartmovies.com/film/ajax/categorize.php', 'id=' + resultMovieId + '&cat=mywatched&s=1', function(text) {
					post('http://www.iheartmovies.com/film/ajax/rate.php', 'id=' + resultMovieId + '&rating=' + movieRating, function(text) {
						unsafeWindow.console.log('Movie ' + movieName + ' (id: ' + resultMovieId + ') was rated ' + movieRating + ' successfully.');
						tr.querySelector('td').style.backgroundColor = 'green';
					});
				});
			});
		});
	});
}

// LivingSocial.com
if(confirm('Do you want to sync your ratings with LivingSocial.com? (You should be logged in)') == true) {
	iterateImdbMovies(function(movieName, movieRating, tr) {
		unsafeWindow.console.log('Querying ' + 'http://movies.livingsocial.com/search?q=' + escape(movieName) + ' with null');
		get('http://movies.livingsocial.com/search?q=' + escape(movieName), function(text, xhr) {
			yeni.innerHTML = text;
			var result = $x("//div[@class='search_result_wrapper'][1]//h3/a/attribute::href", yeni, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			if(result == undefined || result[0] == undefined) {
				unsafeWindow.console.log('Can not find the movie ' + movieName);
				tr.querySelector('td').style.backgroundColor = 'red';
				return;
			}
			var xLink = result[0].textContent;
			if(xLink.lastIndexOf('?') == -1) {
				unsafeWindow.console.log('Can not find the movie link of ' + movieName);
				tr.querySelector('td').style.backgroundColor = 'red';
				return;
			}
			var resultMovie = $x("//div[@class='search_result_wrapper'][1]//h3", yeni, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)[0].textContent;
			resultMovie = resultMovie.trim();
			var resultYear = $x("//div[@class='search_result_wrapper'][1]//h4", yeni, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)[0].textContent;
			resultYear = resultYear.trim();
			if((resultMovie + ' ' + resultYear).toLowerCase().replace(/[,.:;]/, "").replace(/ [-] /, " ").replace(/ [&] /, " ").replace(/ and /, " ") != 
					movieName.toLowerCase().replace(/[,.:;]/, "").replace(/ [-] /, " ").replace(/ [&] /, " ").replace(/ and /, " ")) {
				unsafeWindow.console.log('Can not find the movie ' + movieName + ' against ' + resultMovie + ' ' + resultYear);
				tr.querySelector('td').style.backgroundColor = 'orange';
				tr.firstElementChild.nextElementSibling.innerHTML += " => <a href='" + 'http://movies.livingsocial.com/search?q=' + escape(movieName) + "'>rate manually</a>"
				return;
			}
			var resultLink = 'http://movies.livingsocial.com' + xLink.substr(0, xLink.lastIndexOf('?')) + '/ratings?ref=search-rating';
			unsafeWindow.console.log('Querying ' + 'http://movies.livingsocial.com' + xLink.substr(0, xLink.lastIndexOf('?')) + '/ratings?ref=search-rating');
			post(resultLink, 'rating=' + movieRating, function(text) {
				unsafeWindow.console.log('Movie ' + movieName + ' was rated ' + movieRating + ' successfully.');
				tr.querySelector('td').style.backgroundColor = 'green';
			}, function(xhr) {
				unsafeWindow.console.log('Error!');
				unsafeWindow.console.log(xhr);
			});
		}, function(xhr) {
			unsafeWindow.console.log('Error!');
			unsafeWindow.console.log(xhr);
		});
	});
}

// Sinemalar.com
if(confirm('Oylamalarınızı Sinemalar.com ile eşitlemek istiyor musunuz? (Oturum açmış olmanız gerekli)') == true) {
	iterateImdbMovies(function(movieNameYear, movieRating, tr, movieName, movieYear) {
		unsafeWindow.console.log('Querying ' + 'http://www.sinemalar.com/filmler/' + escape(movieNameYear) + '/ with null');
		get('http://www.sinemalar.com/filmler/' + escape(movieName) + '/', function(text, xhr) {
			yeni.innerHTML = text;
			var results = $x("//div[@class='commentsright']", yeni, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
			if(results == undefined || results[0] == undefined) {
				unsafeWindow.console.log('Can not find the movie ' + movieNameYear);
				tr.querySelector('td').style.backgroundColor = 'red';
				return;
			}
			var found = false;
			for(var i = 0; i < results.length; i++) {
				var titlex = $x(".//p[@class='theatremovietitle']", results[i], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
				if(titlex == undefined || titlex[0] == undefined)
					continue;
				var title = titlex[0].textContent;
				var titlex = $x(".//p[@class='theatremovietitleorg']", results[i], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
				if(titlex == undefined || titlex[0] == undefined)
					continue;
				var orgtitle = titlex[0].textContent;
				var yeartitle = title.match(/\(([0-9]*)\)\s*$/)[1];
				var titlex = $x(".//p[@class='theatremovietitle']/a/attribute::href", results[i], XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
				var urltitle = titlex[0].textContent;
				var idtitle = urltitle.match(/\/film\/([0-9]+)\//)[1];
				// find exact match
				if(cleanMovieName(orgtitle.toLowerCase()) == cleanMovieName(movieName.toLowerCase()) && yeartitle == movieYear) {
					unsafeWindow.console.log('Film oylanıyor ' + movieNameYear + ' (' + 'http://www.sinemalar.com/includes/ajax/movie/rateMovie.php?id=' + idtitle + '&rating=' + movieRating + ')');
					get('http://www.sinemalar.com/includes/ajax/movie/rateMovie.php?id=' + idtitle + '&rating=' + movieRating, function(text) {
						unsafeWindow.console.log(movieName + ' filmi ' + movieRating + ' ile oylandı.');
						tr.querySelector('td').style.backgroundColor = 'green';
					}, function(xhr) {
						unsafeWindow.console.log('Hata!');
						unsafeWindow.console.log(xhr);
						tr.querySelector('td').style.backgroundColor = 'red';
					});
					found = true;
					break;
				}
			}
			if(!found) {
				unsafeWindow.console.log('Filmi bulunamadı ' + movieNameYear + ' <> ' + orgtitle + ' (' + yeartitle + ')');
				tr.querySelector('td').style.backgroundColor = 'orange';
			}
		});
	});
}
