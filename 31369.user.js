// ==UserScript==
// @name			QSS - add IMDB & Rottentomatoes scores
// @namespace		http://userscripts.org/users/6623/scripts
// @description		Adds scores from IMDB & Rottentomatoes to QSS title pages
// @version			1.0
// @include			http://quicksilverscreen.com/videos?c=*
// ==/UserScript==

findMovies();

function findMovies() {
// looks at the QSS page and adds a GM_QSS_ div to every other link (QSS provides 2 links to each title -- one the image and the second the link text)
// then calls a function to see if there are IMDB ids related to each title
	var allLinks, thisLink, watch_url, watch_url_count, added_div_id, qss_id;
	allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	watch_url_count = 0;
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		watch_url = thisLink.href;
		if (watch_url.indexOf("watch?video=") > 0)
		{
			watch_url_count++;
			if ((watch_url_count % 2) == 0) // this is the link we want to add our stuff near
			{
				qss_id = watch_url.substring(watch_url.length-5, watch_url.length);
				added_div_id = "GM_QSS_" + qss_id;
				addedDiv = document.createElement('div');
				addedDiv.setAttribute("id",added_div_id);
				addedDiv.setAttribute("class","GM_QSS_added_div");
				addedDiv.innerHTML = "";
				var qss_url = "http://quicksilverscreen.com/watch?video=" + qss_id;
				addedDiv.innerHTML += "<div id='GM_QSS_IMDB_" + qss_id + "'><a href='imdb_" + qss_id + "' id='GM_QSS_IMDB_" + qss_id + "_a'>imdb</a>: " + qss_id + "</div>";
				addedDiv.innerHTML += "<div id='GM_QSS_RT_" + qss_id + "'><a href='rt_" + qss_id + "' id='GM_QSS_RT_" + qss_id + "_a'>rt</a>: " + qss_id + "</div>";
				thisLink.parentNode.insertBefore(addedDiv, thisLink);
				var imdb_id = get_imdb_id(qss_id);
			}
		}
	}
}

function get_imdb_id(qss_id) {
// looks at each linked QSS page to see if it has an IMDB link
// -- if so, calls functions to get ratings from IMDB and from RT
// -- if not, removes the added div
	var search_string_start = "imdb.com/title/";
	var qss_url = "http://quicksilverscreen.com/watch?video=" + qss_id;
	var imdb_id = -1;
	var match = -1;
	var linkID;
	var div_ID;
	GM_xmlhttpRequest({
		method: 'GET',
		url: qss_url,
		onload: function(responseDetails) {
			match = responseDetails.responseText.search(search_string_start);
			if (match != -1)
			{
				linkID = "GM_QSS_IMDB_" + qss_id + "_a";
				var theLink = document.getElementById(linkID);
				imdb_id = responseDetails.responseText.substring(match + search_string_start.length + 2,match + search_string_start.length + 9);
				imdb_url = "http://imdb.com/title/tt" + imdb_id;
				theLink.href = imdb_url;
				getIMDBRating(imdb_id,qss_id);
				getRottenRating(imdb_id,qss_id);
			}
			if (match == -1)
			{
				div_ID = "GM_QSS_" + qss_id;
				var the_Div = document.getElementById(div_ID);
				the_Div.parentNode.removeChild(the_Div);
			}
		}
	});
}

function getIMDBRating(imdb_id,qss_id) {
// takes an IMDB title id, looks up that IMDB page and gets the IMDB rating, updates the QSS page for that title
	var IMDB_URL = "http://imdb.com/title/tt" + imdb_id;
	GM_xmlhttpRequest({
		method: 'GET',
		url: IMDB_URL,
		onload: function(responseDetails) {
			var search_string_start = "User Rating:";
			var match = responseDetails.responseText.search(search_string_start);
			var imdb_rating = responseDetails.responseText.substring(match + search_string_start.length + 9,match + search_string_start.length + 13);
			var number_imdb_rating = parseFloat(imdb_rating);
			var IMDB_div_id = "GM_QSS_IMDB_" + qss_id;
			var IMDB_link_id = "GM_QSS_IMDB_" + qss_id + "_a";
			var addedDivIMDB = document.getElementById(IMDB_div_id);
			if (match != -1) {
				// found an imdb_rating
				if ( number_imdb_rating == -1)
				{
					addedDivIMDB.parentNode.removeChild(addedDivIMDB);
				}
				else { // best default case
					addedDivIMDB.innerHTML = '<a id = "' + IMDB_link_id + '" title="IMDB link" href="' + IMDB_URL + '">IMDB: ' + number_imdb_rating + '</a>';
				}
			} 
		}
	});
}

function getRottenRating(imdb_id,qss_id) {
// takes an IMDB title id, looks up the RT page for that IMDB id and gets the RT rating, updates the QSS page for that title
// if RT doesn't match the title, deletes the RT div for the title
	var rottenTomatoesURL = "http://www.rottentomatoes.com/alias?type=imdbid&s=" + imdb_id;
	GM_xmlhttpRequest({
		method: 'GET',
		url: rottenTomatoesURL,
		onload: function(responseDetails) {
			var search_string_start = "critics_tomatometer_score";
			var search_substring_start = " fl'";
			var match = responseDetails.responseText.search(search_string_start);
			var match2 = responseDetails.responseText.indexOf(search_substring_start, match);
			var rotten_rating = responseDetails.responseText.substring(match2 + search_substring_start.length + 1,match2 + search_substring_start.length + 4);
			var number_rotten_rating = parseInt(rotten_rating);
			if (rotten_rating == "N/A")
			{
				rotten_rating = "n/a";
			} else
			{
				rotten_rating = number_rotten_rating + "%";
			}
			var rotten_rating_image_url, rotten_rating_text;
			var RT_div_id = "GM_QSS_RT_" + qss_id;
			var RT_link_id = "GM_QSS_RT_" + qss_id + "_a";
			var addedDivRotten = document.getElementById(RT_div_id);
			if (number_rotten_rating >= 60) { // it's fresh
				rotten_rating_image_url = 'data:image/png;base64,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';
				rotten_rating_text = "Fresh";
			}
			else { // it's rotten
				rotten_rating_image_url = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gHGAQ2MyTxzz0AAAMSSURBVDjLhZPra1tlHMe/z7nk0nPSpklz2WKTrra1J7Ht3FoliGJ1MMS51g3xnXgDwf0dDuYLwaHgfQr6SjfpXKkIKjjsVqKburZZ0NUu7Zo0adpkzTkn5zznPI8vpCLTzc+77w9+X35XglsYPirtj4W9x1zGjPWa8+7CF/RX3AHyT6FNyJ7RTLJ45MBzMcZcnPnmw/qlxVIyP0W3b2cg3aJ7wsH2mGXrAIBdXbGgsbE2BGBWm5AJgGEAAQBz+SlK/zbY+7Q8Gg2pz2w2jIvX14p5rXddEwUZ1Vod1avuljYhK1pv/PTQwOCjrmOKsz/npvPAYQCQMpOyNpq563ymb8S3Vik557679Hyoffb1+9IjkUpZLxs1XuhQybHsyNBBv08F0In+nt2Hbjyxendhml4TJInsj0cCPsZbiEc6pWiXV7vy+/WTLbuOZE9QHn8x8HJ/z+4XBJHBojdh0ZsggkO2SywFAESbkCN702runj3dKb+3A41tw7KpbUfDnQHOOWxKIcsyOHfhuBYazS3Mfl+y5740e10bNwgAaAc9w7Go5710OjiWTMQJEURQx4RNdQhEhEdWcOHiMvtt3ig2626psuS+Y+v8YwAQAAA+vlCYNx8/f2HjOOUmONEBwYTHK0DycDCio1ym3263nMcCveThnWQAINln1T5tIPSRqsi72vxSKBbxBwn5975blovaZqvW1J3V9apx7tofjTd/+bxVlgb7w8ezY4kH8T8oChAOBcIAwozxkctXKk/ZtDgmlCvGNCCxtjY/VlZM5OaqtiB6oKoKVFWBZRF89umSsVGjdCfW3q4ie38qLQpkXFou1j859f583NHJKwu5rRmryd/uekM9m30g2Q0A5XUTP/1QPSx2sH19fdHXfN6/jtcwKPQaU6T8FHWBzRMATuyUazsspyj+bgC4N5NAap8vsVzcOjmXW33ywPjAQy7jOHtmka3mnKvSf/X74+WVDzJaYjIWCQhfzRT44tdGqdXglrGxMDlzeunV5qajrRVap6iJ239qZFB8pDMlvCV5yUt3Gu6fwOFaILXvWhsAAAAASUVORK5CYII=';
				rotten_rating_text = "Rotten";
			}
			if (match != -1) {
				// found a rotten_rating
				if ( number_rotten_rating == -1)
				{
					addedDivRotten.parentNode.removeChild(addedDivRotten);
				}
				else { // best default case
					addedDivRotten.innerHTML = '<a id = "' + RT_link_id + '" title="Rotten Tomatoes link" href="' + rottenTomatoesURL + '">RT: ' + rotten_rating + ' \n<IMG SRC="' + rotten_rating_image_url + '" ALT="' + rotten_rating_text + '" title="' + rotten_rating_text + '"></a>';
					addedDivRotten.style.color='black';
				}
			} else {
				addedDivRotten.parentNode.removeChild(addedDivRotten);
			}
		}
	});
} // end function getRottenRating