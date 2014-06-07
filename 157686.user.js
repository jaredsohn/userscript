// ==UserScript==
// @name        APKTop direct link download
// @namespace   http://papktop.com/
// @description APKTop direct link download
// @include     http://www.*apktop.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.1
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function redirect(){
	$('a').each(function() {
		this.href = this.href.replace('?postid', 'getFile.php?postid');
	});
}

// load jQuery and execute the main function
addJQuery(redirect);