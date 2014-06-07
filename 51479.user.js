// ==UserScript==
// @name           MetaRYM for Waffles
// @namespace     http://userscripts.org/scripts/show/51479
// @description    Add Metacritic and RateYourMusic ratings to albums on Waffles.FM
// @author         shrodes, based on code from Sean Flanigan [Metacritic - Good Old Games], Brice McIver [Metacritic - Google Movies] and Indieana [OiNKPlus]
// @include	https://*waffles.fm/details.php?id=*
// @include	http://*waffles.fm/details.php?id=*
// @include	http://*waffles.fm/browse.php*
// @include	https://*waffles.fm/browse.php*
//
// @date          07/02/2010
// @version       1.10
// @since         14/06/2009
// ==/UserScript==
// ------------------------------------------------------------------------
// Copyright (c) 2009, shrodes, shrodes@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//			- TODO add: check artist name against metacritic result to ensure correct link is received
//          - TODO add: browse page rating sort
//
// CHANGELOG
//
// 1.2 - 07/02/2010 - Added the ability to add ratings to browse page. Added loading icon to feel like something is actually happening. Renamed to MetaRYM
// 1.1 - 19/06/2009 - Added RateYourMusic ratings. Added command to switch between layout modes. 
// 1.02 - 15/06/2009 - Now checks to see if result found matches artist to ensure correct rating. Added different display method for under download link.
// 1.01 - 15/06/2009 - Refactor, added in alternate positioning so the rating can display in the torrent heading (default), or underneath the download link.
// 1.00 - 14/06/2009 - Initial version based on code from sources above. Basic checking and parsing Metacritic rating.


(function () {

	var ratingProvider = GM_getValue("ratingProvider");
	if(ratingProvider == null) {
		GM_setValue("ratingProvider","RateYourMusic");
		ratingProvider = "RateYourMusic";
	}
	
   var ratingLocation = GM_getValue("ratingLocation");
   if (ratingLocation == null) {
		GM_setValue("ratingLocation","beneath download");
   }
   
   var browseRatings = GM_getValue("browseRatings");
	if(browseRatings == null) {
		GM_setValue("browseRatings","off");
		browseRatings = "off";
	}
	
	GM_registerMenuCommand('MetaWaffles: Switch ratings provider (currently ' + ratingProvider + ')', changeProvider);
	GM_registerMenuCommand('MetaWaffles: Switch layout (currently ' + ratingLocation + ')', changeLayout);
	GM_registerMenuCommand('MetaWaffles: Show ratings on browse page (currently ' + browseRatings + ')', changeBrowse);
	
   var CSS_CODE =		".MetaWaffles { position:relative; max-width:700px; }\
		.explore  { text-decoration:none; }\
		.leftinfo {clear:both;}\
		.floatright { border: solid #000000 0px;float:right;margin:0pt 0pt 10px 10px;padding:2px;text-align: left;}\
		.floatleft { border: solid #000000 0px;float:left;text-align: left; width:140px;  }\
		.floatleft-small { border: solid #000000 0px;float:left;text-align: left;   }\
		.floatmiddle { border: solid #000000 0px;text-align: left; margin-left:140px;}\
		.green { font-weight: bold; color: #000000; background-color: #33CC00; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; }\
		.yellow { font-weight: bold; color: #000000; background-color: #FFFF00; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; }\
		.red { font-weight: bold; color: #FFFFFF; background-color: #FF0000; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; }\
		.noscore{ font-weight: bold; color: #000000; background-color: #808E9B; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; }\
		.rym{ font-weight: bold; color: #000000; background-color: #33CC00; padding-right: 3px; padding-left: 3px; letter-spacing: 0px; }\ ";	
	var new_row;
	var centertable;
	var album = "";
	var artist = "";
	var headCode = "<img src=\"data:image/gif;base64,R0lGODlhEAAQAPMAAP%2F%2F%2FwAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAEKxDISau9OE%2FBu%2F%2FcQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv%2FXJEMxIFg4VieV0qaqCC%2BrOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2F9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo%2BUCAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BcghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2FnKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2FxymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEJhDISau9OE%2FBu%2F%2BcthBDEmZjeWKpKYikC6svGq9XC%2B6e5v%2FAICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2Fxy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BctRBDUhgHElZjeaYr1ZqoKogkDd9s%2Fto4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2F3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D\">";
	var newElement = document.createElement("span");
	newElement.innerHTML = "<img src=\"data:image/gif;base64,R0lGODlhEAAQAPMAAP%2F%2F%2FwAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAEKxDISau9OE%2FBu%2F%2FcQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv%2FXJEMxIFg4VieV0qaqCC%2BrOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2F9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo%2BUCAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BcghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2FnKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2FxymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEJhDISau9OE%2FBu%2F%2BcthBDEmZjeWKpKYikC6svGq9XC%2B6e5v%2FAICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2Fxy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BctRBDUhgHElZjeaYr1ZqoKogkDd9s%2Fto4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2F3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D\">" 
	var addedCells = new Array();
	var savedRatings = new Array();
		   
	// -- [Main] --------------------------------------------------------------------------------------
	function main() {
		if(document.location.href.search(/browse.php/i) != -1 && GM_getValue("browseRatings") == "on") {
			doBrowseTable();
		}
		if(document.location.href.search(/details.php/i) != -1) {
			doTorrentRating();		
		}
	}
	
	function changeLayout() {
		if (GM_getValue("ratingLocation") == "beneath download") {
			GM_setValue("ratingLocation", "torrent title");
			location.reload(true)
		}
		else {
			GM_setValue("ratingLocation", "beneath download");
			location.reload(true)
		}
	}
	
	function changeBrowse() {
		if (GM_getValue("browseRatings") == "off") {
			GM_setValue("browseRatings", "on");
			location.reload(true)
		}
		else {
			GM_setValue("browseRatings", "off");
			location.reload(true)
		}
	}
	
	function changeProvider() {
		if (GM_getValue("ratingProvider") == "RateYourMusic") {
			GM_setValue("ratingProvider", "MetaCritic");
			location.reload(true)
		}
		else {
			GM_setValue("ratingProvider", "RateYourMusic");
			location.reload(true)
		}
	}
	
	function doTorrentRating() {
		placeFrame();
		album = getAlbum();
		artist = getArtist();
		if(ratingProvider == "MetaCritic") {
			getMetaRating(artist,album,null);
		}
		else if(ratingProvider == "RateYourMusic") {
			getRYMRating(artist,album,null);
		}
	}
	
	function doBrowseTable() {
		addGlobalStyle(CSS_CODE);
		var table = document.getElementById("browsetable");
		var trs = table.getElementsByTagName("tr");
		createColumn(trs);
		for (var i = 1 ; i < trs.length; i++) {
			var tds = trs[i].getElementsByTagName("td");
			var midway = tds[1].innerHTML.match(/<a href=".+\/(.+)\.torrent/i);
			var decoded = decodeURIComponent(midway[1]);
			var artist = getArtistBrowse(decoded);
			var album = getAlbumBrowse(decoded);
			
			if(ratingProvider == "MetaCritic") {
				getMetaRating(artist,album,addedCells[i]);
			}
			else if(ratingProvider == "RateYourMusic") {
				getRYMRating(artist,album,addedCells[i]);
			} 
		} 
	}
	
	function createColumn(rows) {
		for (var h=0; h<rows.length; h++) {
			var cell = rows[h].insertCell(-1);
			cell.align="center";
			addedCells[h] = cell;
			if(h == 0) {
				cell.innerHTML = "MetaRYM";
				cell.setAttribute("class", "colhead");
			}
			else {
				cell.innerHTML = headCode;
			}
		}
	}
	
	function getTable() {
		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++){
			if (tds[i].className == "rowhead") {
				centertable =  tds[i].parentNode.parentNode; 
				break;
			}
		}
	
		new_row = centertable.firstChild.nextSibling.cloneNode(true);
		
		if (new_row.firstChild.hasChildNodes()) {
				new_row.firstChild.innerHTML = '';
				new_row.lastChild.innerHTML = '';
		}
		
		if (ratingLocation == "beneath download") {
			new_row.firstChild.appendChild(document.createTextNode(' ' + 'MetaRYM'));
			new_row.firstChild.nextSibling.innerHTML = '<div id=\"MetaRYM\"></div>';
			new_row.firstChild.nextSibling.appendChild(newElement);
			var parent = centertable.firstChild.nextSibling;
			centertable.insertBefore(new_row,parent);
		}
		
		else {
			var h1s = document.getElementsByTagName("h1");
			if (h1s.length > 0) {
				var torrentHeading = h1s[0]
			}
			torrentHeading.innerHTML = torrentHeading.innerHTML + ' ' + headCode;
		}
	}
	
	function placeFrame() {
		addGlobalStyle(CSS_CODE);
		getTable();
	}
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) 
			return;
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	function getAlbum() {
		var h1s = document.getElementsByTagName("h1");
		if (h1s.length > 0) {
			var str = h1s[0].innerHTML;
			str = str.replace(/\\[[^\\]]*\\]/g, '');
			if (str.split(' - ').length > 1) {
				return str.split(' - ')[1].replace(/ {.+?\}+| \(.+?\)+| \[.+\]?.+| \[.+\]?.+/g,"");
			}
		}
		return '';
	}
	
	function getAlbumBrowse(slab) {
		var str = slab;
		str = str.replace(/\\[[^\\]]*\\]/g, '');
		if (str.split(' - ').length > 1) {
			return str.split(' - ')[1].replace(/ {.+?\}+| \(.+?\)+| \[.+\]?.+| \[.+\]?.+/g,"");
		}
	}
	
	function getArtist() {
		var h1s = document.getElementsByTagName("h1");
		if (h1s.length > 0) {
			var str = h1s[0].innerHTML;
			str = str.replace(/\\[[^\\]]*\\]/g, '');
			if (str.split(' - ').length > 1) {
				return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,"");
			}
		}
		return '';
	}
	
	function getArtistBrowse(slab) {
		var str = slab;
		str = str.replace(/\\[[^\\]]*\\]/g, '');
		if (str.split(' - ').length > 1) {
			return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,"");
		}
	}

	function getMetaRating(artist,album,cell) {
		if (!album) {
			noAlbumParse(cell);
		}
		else if (!artist) {
			noArtistParse(cell);
		}
		else {
			var src = 'http://www.metacritic.com/search/process?ty=2&tfs=album_all&sb=0&ts=' + encodeURIComponent(album);
			
			if (typeof(GM_xmlhttpRequest) === 'function') {
				GM_xmlhttpRequest({
					method: 'GET',
					url: src,
					headers: {
						'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
					},
					onload: function (response) {
						if (ratingLocation == "beneath download") {
							var theLink = response.responseText.match(/ <strong>Music:<\/strong> <a href="(.+)">/i);
						}
						else {
							var theLink = response.responseText.match(/ <strong>Music:<\/strong> <a href="(.+?)">/i);
						}
						var theArtist = response.responseText.match(/ <p>1+.+by <strong>(.+)<\/strong>/i);
						var theRating = response.responseText.match(/ <span class="(green|yellow|red|noscore)">[x 0-9]{1,3}<\/span>/i);

						if (theRating !== null)
						{
							if(theArtist.toString().match(artist) !== null) {
								//var newElement = document.createElement("span");
								newElement.innerHTML = "<a href=\"" + theLink[1] + "\">" + theRating[0] + "</a>";
								headCode = newElement.innerHTML;
								if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
									cell.innerHTML = headCode;
									return;
								}
								new_row.firstChild.nextSibling.appendChild(newElement);
								if (ratingLocation == "torrent title") {
									placeFrame();
								}
							}
							else {
								noRatingFound(cell);
							}
						}
						else if (theRating == null) {
							noRatingFound(cell);
						}
					}
				});
			}
		}
	}
	
	function getRYMRating(artist,album,cell) {
		if (!album) {
			noAlbumParse(cell);
		}
		else if (!artist) {
			noArtistParse(cell);
		}
		else {
			var src = 'http://rateyourmusic.com/search?searchterm=' + encodeURIComponent(album) + '&type=l';
			if (typeof(GM_xmlhttpRequest) === 'function') {
				var albumPage = "";
				GM_xmlhttpRequest({
					method: 'GET',
					url: src,
					headers: {
						'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
					},
					onload: function (response) {
						var re = new RegExp('class="artist">'+artist+'<\/a> - <i><a title=".+" href="([^a-z]+)" class="searchpage">'+album,'i');
						var theLink = response.responseText.match(re);
						if(theLink != null) {
							albumPage = "http://rateyourmusic.com"+ entityDecode(theLink[1]);
							GM_xmlhttpRequest({
								method: 'GET',
								url: albumPage,
								headers: {
									'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'
								},
								onload: function (response) {
									var theRating = response.responseText.match(/<span style=".+">([0-9.]+)<\/span> <span class=".+">([0-9]+)/i);
									
									//var newElement = document.createElement("span");
									if (theRating == null) {
										if(ratingLocation == "beneath download") {
											newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"noscore\">This album has not yet been rated!</span></a>";											
											headCode = newElement.innerHTML;
											if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
												cell.innerHTML = headCode;
												return;
											}
											new_row.firstChild.nextSibling.appendChild(newElement);
										}
										else {
												headCode = "<a href=\"" + albumPage + "\"><img title=\"ERROR: This album has not yet been rated!\" src=\"http://img23.imageshack.us/img23/2649/crossp.gif\"></a>";
												headCode = newElement.innerHTML;
												if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
													cell.innerHTML = headCode;
													return;
												}
												new_row.firstChild.nextSibling.appendChild(newElement);
												placeFrame();
											}
									}
									else {
										if(ratingLocation == "beneath download") {
											if(theRating[1] > 3.05) {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"green\">" + theRating[1] + "</span></a> from " + theRating[2] + " ratings";
											}
											else if(theRating[1] > 2) {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"yellow\">" + theRating[1] + "</span></a> from " + theRating[2] + " ratings";
											}
											else {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"red\">" + theRating[1] + "</span></a> from " + theRating[2] + " ratings";
											}
											headCode = newElement.innerHTML;
											if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
												cell.innerHTML = headCode;
												return;
											}	
											new_row.firstChild.nextSibling.appendChild(newElement);
										}
										else {
											if(theRating[1] > 3.05) {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"green\">" + theRating[1] + "</span></a>";
											}
											else if(theRating[1] > 2) {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"yellow\">" + theRating[1] + "</span></a>";
											}
											else {
												newElement.innerHTML = "<a href=\"" + albumPage + "\"><span class=\"red\">" + theRating[1] + "</span></a>";
											}
											headCode = newElement.innerHTML;
											if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
												cell.innerHTML = headCode;
												return;
											}
											
											new_row.firstChild.nextSibling.appendChild(newElement);
											placeFrame();
										}
									}
								}
							});
						}
						else {
							noRatingFound(cell);
						}
					}
				});
			}
		}
		
	}
	
	
	function entityDecode(strHTML) {
		var tmpTextArea = document.createElement("textarea");
		tmpTextArea.innerHTML = strHTML.replace(/</g,"<").replace(/>/g,">");
		var decodedStr = tmpTextArea.value;
		//document.removeChild(tmpTextArea);
		return decodedStr;
	}
	
	function noRatingFound(cell) {
		//var newElement = document.createElement("span");
		if(ratingProvider == "MetaCritic") {
			newElement.innerHTML = "<SPAN CLASS=\"noscore\">This album is not present in MetaCritic's database</SPAN>";
			headCode = newElement.innerHTML;
			if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
				cell.innerHTML = headCode;
				return;
			}
			new_row.firstChild.nextSibling.appendChild(newElement);
			if (ratingLocation == "torrent title") {
				headCode = "<img title=\"ERROR: This album is not present in MetaCritic's database\" src=\"http://img23.imageshack.us/img23/2649/crossp.gif\">";
				placeFrame();
			}
		}
		else {
			newElement.innerHTML = "<SPAN CLASS=\"noscore\">This album is not present in RateYourMusic's database</SPAN>";
			headCode = newElement.innerHTML;
			if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
				cell.innerHTML = headCode;
				return;
			}
			new_row.firstChild.nextSibling.appendChild(newElement);
			if (ratingLocation == "torrent title") {
				headCode = "<img title=\"ERROR: This album is not present in RateYourMusic's database\" src=\"http://img23.imageshack.us/img23/2649/crossp.gif\">";
				placeFrame();
			}
		}
		return;
	}
	
	function noAlbumParse(cell) {
		//var newElement = document.createElement("span");
		newElement.innerHTML = "<SPAN CLASS=\"noscore\">ERROR: Could not parse album title</SPAN>";
		headCode = "<img title=\"ERROR: Could not parse album title\" src=\"http://img23.imageshack.us/img23/2649/crossp.gif\">";
		if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
			cell.innerHTML = headCode;
			return;
		}
		if (ratingLocation == "torrent title") {
			placeFrame();
		}
		return;
	}
	
	function noArtistParse(cell) {
		//var newElement = document.createElement("span");
		newElement.innerHTML = "<SPAN CLASS=\"noscore\">ERROR: Could not parse artist title</SPAN>";
		headCode = "<img title=\"ERROR: Could not parse artist title\" src=\"http://img23.imageshack.us/img23/2649/crossp.gif\">";
		if(document.location.href.search(/browse.php/i) != -1 && browseRatings == "on") {
			cell.innerHTML = headCode;
			return;
		}
		if (ratingLocation == "torrent title") {
			placeFrame();
		}
		return;
	}
	
	main();
})();