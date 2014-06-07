// ==UserScript==
// @name			Empornium 3-Column Tags List Layout
// @version			1.0.2
// @description		Displays the tags list on torrent details page in 3-column layout.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @match			http://*.empornium.me/*
// @match			https://*.empornium.me/*
// @match			http://empornium.me/*
// @match			https://empornium.me/*
// @match			http://*.empornium.sx/*
// @match			https://*.empornium.sx/*
// @match			http://empornium.sx/*
// @match			https://empornium.sx/*
// @namespace		LaMa
// ==/UserScript==
function runScript(){
	var $j = $.noConflict(true);
	
	var stylesheet = "<style type='text/css'>" + 
		"#taglist-container {margin-bottom:20px;}" +
		"#taglist-container .box_tags li {float: left; width: 29.5%; margin: 4px 15px;}" +
		"#taglist-container .box_tags li > a {max-width: 75%; overflow: hidden; text-overflow: ellipsis;}" +
		"#taglist-container .box_tags .tag_add {clear: both; text-align: center;}" +
		"#taglist-container .box_tags input#tagname {width: 150px; margin: 3px 1px;}" +
		"#taglist-container .box_tags li > div > span:last-child {display: none;}" +
		"</style>";
		
	(function init() {
		// only works on torrent details page
		if(!(/torrents\.php/.test(window.location.href) && /id\=/.test(window.location.href))) return;
		
		// add stylesheet
		$j(stylesheet).appendTo("head");
		
		// create new container
		$j("<div id='taglist-container'></div>").appendTo(".middle_column");
		// move all taglist elements into new container
		$j('.sidebar').children().slice(-3).appendTo("#taglist-container");
	}());
}

if(typeof jQuery == "undefined"){
	addJQuery(runScript);
}
else{
	runScript();
}

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}