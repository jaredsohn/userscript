// ==UserScript==
// @name		YouTube Like/Dislike Rating in Search Results
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.0.2
// @description		YouTubeの検索結果に高評価/低評価の棒グラフを表示する。 / Shows a bar graph of like/dislike rating in YouTube search results.
// @include		http://www.youtube.com/results/?*
// @include		http://www.youtube.com/results?*
// @include		https://www.youtube.com/results/?*
// @include		https://www.youtube.com/results?*
// ==/UserScript==

/* ****************************************************************

	Related Article:
		http://jankokutou.blog133.fc2.com/blog-entry-15.html

	Last Update:
		2011-01-30

**************************************************************** */

if (location.host == "www.youtube.com" && /^\/results\/?$/.test(location.pathname)) {
(function () {

var _version = "0.0.2";

var _rating = {};
var _type_function = typeof Function();
var _rating_icon, _rating_menu;
var _rating_video_id;
var _rating_target_node;
var _rating_icon_hide_timerID = 0;
var _rating_like, _rating_dislike;
var _rating_chart_like, _rating_chart_dislike;

/* **************** MAIN FUNCTIONS **************** */

function requestAPI(video_id, onload) {
	GM_xmlhttpRequest({
			method: "GET",
			url: "http://gdata.youtube.com/feeds/api/videos/" + video_id,
			onload: function (xhr) {
					readAPIJSON(xhr, video_id);
					if (typeof onload == _type_function) {
						onload();
					}
				}
		});
}

function readAPIJSON(xhr, video_id) {
	var xml;
	var rating;
	var rating_average, rating_max, rating_min, rating_count;
	var likes = 0;
	var dislikes = 0;
	if (xhr.status == 200) {
		xml = (new DOMParser()).parseFromString(xhr.responseText, "application/xml");
		if (rating = xml.getElementsByTagName("gd:rating")[0]) {
			rating_average = Number(rating.getAttribute("average"));
			rating_max = Number(rating.getAttribute("max"));
			rating_min = Number(rating.getAttribute("min"));
			rating_count = Number(rating.getAttribute("numRaters"));
			likes = Math.round((rating_average - rating_min) / (rating_max - rating_min) * rating_count);
			dislikes = Math.round(rating_count - likes);
			if (likes >= 0 && dislikes >= 0) {
				_rating[video_id] = {
						D: dislikes,
						L: likes
					};
			}
		}
		if (!_rating[video_id]) {
			_rating[video_id] = {
					D: 0,
					L: 0
				};
		}
	}
}

function showRatingIcon(node, video_id) {
	clearTimeout(_rating_icon_hide_timerID);
	if (node != _rating_icon.parentNode) {
		hideRatingIcon();
	}
	_rating_video_id = video_id;
	node.appendChild(_rating_icon);
}

function setRatingChart() {
	var like = 0, dislike = 0, sum, max;
	var base_length = 0;
	if (_rating[_rating_video_id]) {
		/*
		like = _rating[_rating_video_id].L;
		dislike = _rating[_rating_video_id].D;
		sum = like + dislike;
		base_length = Math.ceil(10 * Math.LOG10E * Math.log(sum || 1) + 1);
		_rating_chart_like.style.width = (Math.ceil(like / (sum || 1) * base_length) || 1) + "px";
		_rating_like.innerHTML = addCommas(like);
		_rating_chart_like.setAttribute("alt", addCommas(like));
		_rating_chart_dislike.style.width = (Math.ceil(dislike / (sum || 1) * base_length) || 1) + "px";
		_rating_dislike.innerHTML = addCommas(dislike);
		_rating_chart_like.setAttribute("alt", addCommas(dislike));
		*/
		like = _rating[_rating_video_id].L;
		dislike = _rating[_rating_video_id].D;
		max = like > dislike ? like : dislike;
		base_length = Math.ceil(10 * Math.LOG10E * Math.log(max || 1) + 1);
		_rating_chart_like.style.width = (Math.ceil(like / (max || 1) * base_length) || 1) + "px";
		_rating_like.innerHTML = addCommas(like);
		_rating_chart_like.setAttribute("alt", addCommas(like));
		_rating_chart_dislike.style.width = (Math.ceil(dislike / (max || 1) * base_length) || 1) + "px";
		_rating_dislike.innerHTML = addCommas(dislike);
		_rating_chart_like.setAttribute("alt", addCommas(dislike));
	}
	else {
		_rating_like.innerHTML = "???";
		_rating_chart_like.setAttribute("alt", "???");
		_rating_chart_like.style.width = "1px";
		_rating_dislike.innerHTML = "???";
		_rating_chart_like.setAttribute("alt", "???");
		_rating_chart_dislike.style.width = "1px";
	}
	if (_rating_menu.parentNode != _rating_icon.parentNode) {
		_rating_icon.parentNode.insertBefore(_rating_menu, _rating_icon);
	}
}
function hideRatingIcon(delay) {
	if (delay > 0) {
		_rating_icon_hide_timerID = setTimeout(hideRatingIcon, delay);
	}
	else {
		delete _rating_video_id;
		if (_rating_icon.parentNode) {
			_rating_icon.parentNode.removeChild(_rating_icon);
		}
		if (_rating_menu.parentNode) {
			_rating_menu.parentNode.removeChild(_rating_menu);
		}
	}
}

/* **************** /MAIN FUNCTIONS **************** */
/* **************** SUB FUNCTIONS **************** */

function addCommas(num) {
	var str1, str2, str3;
	var matched = num.toString().match(/^(\-?\d{1,3})((?:\d{3})*)((?:\.\d+)?)$/);

	if (matched) {
		return matched[1] + matched[2].replace(/\d{3}/g, function(n) {return "," + n;}) + matched[3];
	}
	else {
		return null;
	}
}

/* **************** /SUB FUNCTIONS **************** */
/* **************** INIT FUNCTIONS **************** */

/* menu CSS */
function setMenuCSS() {
	GM_addStyle([
			"div.result-item {position: relative;}",
			"#x_gmjct_ytldrating_icon {position: absolute; bottom: 0; right: 0; margin: 0; padding: 0; border: 0; width: 49px; height: 18px;}",
			"#x_gmjct_ytldrating_menu {position: absolute; bottom: 0; right: 50px; z-index: 1; margin: 0; padding: 0; border: solid 1px #808080; background-color: #F0F0E8; opacity:0.9; -moz-opacity:0.9; white-space: nowrap;}",
			"#x_gmjct_ytldrating_menu caption {caption-side: top; margin: 0; padding: 3px 0.25em; border-width: 1px 1px 0 1px; border-color: #808080; border-style: solid; background-color: #F0F0E8; line-height: 1em; opacity:0.9; -moz-opacity:0.9; text-align: left;}",
			"#x_gmjct_ytldrating_menu tr {margin: 0; padding: 3px 0; border: 0;}",
			"#x_gmjct_ytldrating_menu th, #x_gmjct_ytldrating_menu td {font-weight: normal; margin: 0; padding: 0 3px; border: 0;}",
			"#x_gmjct_ytldrating_menu td.x_gmjct_ytldrating_rating {min-width: 2em; text-align: right;}",
			"#x_gmjct_ytldrating_menu td.x_gmjct_ytldrating_chart {min-width: 40px;}",
			"#x_gmjct_ytldrating_like, #x_gmjct_ytldrating_dislike {height: 0.8em; width: 1px;}"
		].join("\n"));
}

function setRatingMenu() {
	var target_nodes;
	var target_node;
	var rating_icon;
	var rating_menu;
	var row_node, cell_node, node;
	var matched;
	var i, count;

	rating_icon = document.createElement("p");
	rating_icon.id = "x_gmjct_ytldrating_icon";
	node = document.createElement("img");
	node.src = "data:image/gif;base64,R0lGODlhMQASAMwAANnZ2fHx8eDg4NDQ0Ojo6ElJScjIyFFRUXh4eJGRkWRkZMDAwKurq7Gxsf///2hoaHFxcZiYmLq6uoCAgKCgoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAA4ALAAAAAAxABIAAAX/oEMIZGmeaKquhBMIQyzPdG3fuBAAeO//NIBwCFAUjscDcUlEKJnQKNNpACQKkOiAInRKv1IqQIKNJhLgdPgwsBYkQmMBjUheD4I6xIh2I/tLKHVHDCUMBQtOAg1zAkV4AAUHBgp4hwxFCCg8gmxGCyZ1bAuNApWOBZqnl6Z4JzGdA6SukYmjpaeRqq5XkgMosCdOvxGpBMULlQMGuAcEuq0jECMqMQTX1w9IoNoHjAcTjdoJxanhB2RzzEhK2NfW7vHy8/Tx2n/x8PX7/NgNCf4a5BsQoKDBgwgTKlRIAEmBCAmXLZxIseJEAwQMWNzIMSFGBwIMiBxJsqTJkyhTBApwEAIAOw==";
	node.setAttribute("alt", "Show Rating");
	addRatingIconEvent(node);
	rating_icon.appendChild(node);

	_rating_icon = rating_icon;

	rating_menu = document.createElement("table");
	rating_menu.id = "x_gmjct_ytldrating_menu";
	node = document.createElement("caption");
	node.appendChild(document.createTextNode("Rating [ver " + _version + "]"));
	rating_menu.appendChild(node);

	row_node = document.createElement("tr");
	cell_node = document.createElement("th");
	cell_node.appendChild(document.createTextNode("Likes"));
	row_node.appendChild(cell_node);
	cell_node = document.createElement("td");
	cell_node.className = "x_gmjct_ytldrating_rating";
	_rating_like = cell_node;
	cell_node.appendChild(document.createTextNode("???"));
	row_node.appendChild(cell_node);
	cell_node = document.createElement("td");
	cell_node.className = "x_gmjct_ytldrating_chart";
	node = document.createElement("img");
	node.id = "x_gmjct_ytldrating_like";
	node.src = "data:image/gif;base64,R0lGODlhAQABAIgAAACqAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
	node.setAttribute("alt", "???");
	_rating_chart_like = node;
	cell_node.appendChild(node);
	row_node.appendChild(cell_node);
	rating_menu.appendChild(row_node);

	row_node = document.createElement("tr");
	cell_node = document.createElement("th");
	cell_node.appendChild(document.createTextNode("Dislikes"));
	row_node.appendChild(cell_node);
	cell_node = document.createElement("td");
	cell_node.className = "x_gmjct_ytldrating_rating";
	_rating_dislike = cell_node;
	cell_node.appendChild(document.createTextNode("???"));
	row_node.appendChild(cell_node);
	cell_node = document.createElement("td");
	cell_node.className = "x_gmjct_ytldrating_chart";
	node = document.createElement("img");
	node.id = "x_gmjct_ytldrating_dislike";
	node.src = "data:image/gif;base64,R0lGODlhAQABAIgAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
	node.setAttribute("alt", "???");
	_rating_chart_dislike = node;
	cell_node.appendChild(node);
	row_node.appendChild(cell_node);
	rating_menu.appendChild(row_node);

	_rating_menu = rating_menu;

	target_nodes = document.getElementsByClassName("result-item");
	for (i = 0, count = target_nodes.length; i < count; i++) {
		target_node = target_nodes[i];
		if ((node = target_node.getElementsByTagName("a")[0]) && (matched = node.search.match(/[\?\&]v=([\w\-]+)(?:$|&)/))) {
			addVideoBoxEvent(target_node, matched[1]);
		}
	}

	//target_nodes = document.getElementsByClassName("result-item");
}

function addVideoBoxEvent(node, video_id) {
	node.addEventListener("mouseover", function (event) {showRatingIcon(node, video_id);}, false);
	node.addEventListener("mouseout", function (event) {hideRatingIcon(100);}, false);
}

function addRatingIconEvent(node) {
	node.addEventListener("mouseover", function () {
				if (_rating[_rating_video_id] !== undefined) {
					setRatingChart();
				}
				else {
					_rating[_rating_video_id] = null;
					requestAPI(_rating_video_id, setRatingChart);
				}
			}, false);
}

function init() {
	setMenuCSS();
	setRatingMenu();
}

/* **************** /INIT FUNCTIONS **************** */

/* start */
init();

})();
}