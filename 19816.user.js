// ==UserScript==
// @name           TVGids.nl (NL) IMDB Ratings
// @namespace      macmanus
// @description    The same principle as "Film 1 (NL) EPG IMDB ratings" (http://userscripts.org/scripts/show/19656), only this time for the TV guide on TVGids.nl
// @include        http://www.tvgids.nl/*
// ==/UserScript==

document.getElementsByClassName = function (needle) {
    var s = document.getElementsByTagName('*'), i = s.length, e, r = [];
    var re = new RegExp('(^|\\s)' + needle + '(\\s|$)');
    while (i--) {
        e = s[i];
        if (e.className && re.test(e.className)) r.push(e);
    }
    return r;
}

function addColumn(table) {
	for (var i=0; i<table.tBodies[0].rows.length; i++) {
		var newCell = table.tBodies[0].rows[i].insertCell(-1);
		if (i==0)
			newCell.innerHTML = 'Rating';
		else
			newCell.innerHTML = '&nbsp;';
	}
}

function setLinks() {
	GM_log("Start working...");
	
	if (window.location.href.match(/tvgids.nl\/programmadetail\/\?ID=/) != null) {
		var detail = document.getElementById("progDetail");
		GM_log("Detail found" + detail);
		var titlespan = detail.getElementsByTagName("SPAN")[0];
		if (titlespan != null) {
			var movielink = "http://imdb.com/find?s=tt&q=" + titlespan.innerHTML;
			GM_log("Link found for" + movielink);
			insertImdbNode(titlespan, movielink);
		}
	} else {
		var programtable = document.getElementsByClassName("overzicht");
		
		var filmtablink = document.getElementsByName("overzichtAlle")[0];
		if (filmtablink != null && filmtablink.parentNode.className == "actief"
				|| window.location.href.match(/\/zoeken\/\?genre=film/) != null
				|| window.location.href.match(/tvgids.nl\/films/) != null) {
			for (var h=0;h < programtable.length;h++) {
				addColumn(programtable[h]);
				var programlinks = programtable[h].getElementsByTagName("a");
				GM_log(programlinks.length + " links");
				for (var i=0;i < programlinks.length;i++) {
					//GM_log("link: " + document.links[i].href);
					if (new String(programlinks[i].href).match(/\/programmadetail\/\?ID=/) != null) {
						var movielink = programlinks[i];
						var moviename = movielink.innerHTML;
						
						var movieurl = "http://imdb.com/find?s=tt&q=" + moviename;
						GM_log("Link found for " + moviename + " ("+movieurl+")");
						
						insertImdbNode(movielink, movieurl);
					} else if (programlinks[i].href.match(/^http:\/\/ad.nl.doubleclick.net/) != null) {
						programlinks[i].style.display = "none";
					}
				}
			}
		}
	}
}

function insertImdbNode(movielink, movieurl) {
		getMovieInfo(movieurl, 
				function (content) {
							var movieInfo = extractMovieInfo(content);
							if (movieInfo != null) {
								if (movieInfo.rating != null) {
							    var imdbNode = unsafeWindow.document.createElement('span');
							
									var ratinglink=unsafeWindow.document.createElement('a');
									ratinglink.setAttribute('href',movieurl);
									var ratingtext=unsafeWindow.document.createElement('i');
									var rating=unsafeWindow.document.createTextNode(movieInfo.rating);
									ratingtext.appendChild(rating);
									ratinglink.appendChild(ratingtext);
									
									if (movielink.tagName != "A") {
										var banner = document.getElementById("detailBanner");
										var biggerfont = unsafeWindow.document.createElement('span');
										biggerfont.setAttribute("style","font: bold 25px arial");
										for (var l = 0; l < 3; l++)
											biggerfont.appendChild(unsafeWindow.document.createElement('br'));
										biggerfont.appendChild(unsafeWindow.document.createTextNode("IMDB Rating:"));
										biggerfont.appendChild(ratinglink);
										banner.appendChild(biggerfont);
									} else {
										var movietablerow = movielink;
										for(var k = 0;k < 6 && movietablerow.tagName != "TR"; k++) {
											movietablerow = movietablerow.parentNode;
										}
										movietablerow.cells[movietablerow.cells.length - 1].style.textAlign = "left";
										movietablerow.cells[movietablerow.cells.length - 1].appendChild(ratinglink);
									}
								} else {
									GM_log("Using url " + movieInfo.alternateurl + " to get the rating from the most popular result (movie: " + movielink.innerHTML + ")");
									insertImdbNode(movielink, movieInfo.alternateurl);
								}
							}
					}
			);
}	

function getMovieInfo(movieurl, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: movieurl,
    onload: function(details) {
      callback(details.responseText);
    }
  });
}

function extractMovieInfo(content) {
  // <b>User Rating:</b> 
  // <b>2.1/10</b> 
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  if (match != null && match.length > 0) {
  	return { rating: match[1] };
  } else {
  	var pattern = /<b>Popular Titles<\/b> \(Displaying 1 Result\).*?<a href=".*?"/;
		var splpat = /<a href="/;
		result = content.match(pattern);
		if (result != null) {
			result = result[0].split(splpat)[1];
			result = result.substring(0, result.length - 1);
			return { alternateurl: "http://imdb.com" + result };
		}
  	return { rating: 'Ambiguous' };
  }
}

unsafeWindow.addEventListener('load', setLinks, false);