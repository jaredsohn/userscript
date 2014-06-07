// ==UserScript==
// @name       		TPB IMDb
// @version    		1.0.1
// @description  	Add IMDb ratings to TPB
// @homepageURL   	http://userscripts.org/scripts/show/400300 
// @downloadURL   	http://userscripts.org/scripts/source/400300.user.js  
// @updateURL     	http://userscripts.org/scripts/source/400300.meta.js  
// @include 		*://*thepiratebay*
// ==/UserScript==

var s = document.head.querySelectorAll("script");
if(s[1] && s[1].src.match("/static/js/tpb.js")) {
	var searchResults = $("#searchResult");
	if(searchResults) {
		$("tr.header").getElementsByTagName('th')[0].insertAdjacentHTML('afterend', "<th>IMDb</th>");
		var rows = $("#searchResult tbody").getElementsByTagName('tr');
		for(var i = 0; i < rows.length; i++) {
			(function() {
				var current = rows[i];
				if(current.querySelectorAll("td")[0]) {
					current.querySelectorAll("td")[0].insertAdjacentHTML('afterend', '<td class="imdb-data">...</td>');
					var type = current.querySelector(".vertTh");
					if(type && type.innerHTML.match(/\/browse\/20(1|2|7)/)) {
						var data = current.querySelectorAll("td")[2].querySelector("a").innerHTML.match(/(.+?)([0-9]{4})/);
						if(data) {
							var title = fixTitle(data[1]);
							var year = data[2];
							if (!setRating(title, year, current, 0)) {
								var r = new XMLHttpRequest;
								r.open("GET", 'http://www.omdbapi.com/?s=' + encodeURI(title) + '&y=' + encodeURI(year), true)
								r.onload = function () {
									var result = JSON.parse(r.responseText);
									if(result.Response !== "False") {
										var ID = result.Search[0].imdbID;
										setRating(title, year, current, ID);
									}
									else { 
										current.querySelector(".imdb-data").innerHTML = ""; 
									}
								}
								r.send();
							}
						} else {
							current.querySelector(".imdb-data").innerHTML = "";
						}
					} else {
						current.querySelector(".imdb-data").innerHTML = "";
					}
				}
			})();
		}
	}

	function $(q) {
		var a = document.querySelectorAll(q);
		if(a.length === 1) return a[0];
		return a;
	}

	// strips the title of distractive data
	function fixTitle(title) {

		// replace dots with spaces
		title = title.replace(/\./g, " ");
		
		// remove R5 or R6 tags
		title = title.replace(/R(5|6)/, "");
		
		// remove unwanted characters
		title = title.replace(/[\(\)\[\]]/g, "");
		
		// trim
		title = title.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, '');
		
		return title;
	}

	function toHours(mins) {
		mins = parseInt(mins)
		return Math.floor(mins / 60) + "h " + mins % 60 + "min";
	}
	function setRating(title, year, current, ID){
		var r = new XMLHttpRequest;
		if (ID) {r.open("GET", 'http://www.omdbapi.com/?i=' + ID, true)}
		else {r.open("GET", 'http://www.omdbapi.com/?t=' + encodeURI(title) + '&y=' + encodeURI(year), true)}
		r.onload = function () {
			var result = JSON.parse(r.responseText);
			if(result.Response !== "False") {
				var rating = result.imdbRating;
				if(!isNaN(rating)) {
					var color = 100 - rating * 10;
					var blue = 50;
					var red = Math.min(255, blue + color * (255 - blue) / 50);
					var green = Math.min(255, 255 - (color - 50) * (255 - blue) / 50);
					current.querySelector(".imdb-data").innerHTML = '<a title="' + toHours(result.Runtime) + ' / ' + result.Genre.toLowerCase() + '" href="http://www.imdb.com/title/' + result.imdbID + '" target="_blank"><div style="background-color:rgb(' + Math.round(red) + ', ' + Math.round(green) + ', ' + Math.round(blue) + ');" class="imdb-rating">' + rating + '</div></a>';
				}
				return true;
			} else {
				current.querySelector(".imdb-data").innerHTML = "";
				return false;
			}
		};
		r.send();
	}
}