// ==UserScript==
// @name           IGCommunity Shoutbox Show/Hide
// @author         Simon Hartcher
// @namespace      deevus.greasemonkey.userscripts
// @description    Adds the ability to Show/Hide the shoutbox on IGCommunity forums
// @include        http://igcommunity.freeforums.org/*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var shoutBox = $('.table1');
	shoutBox.before('<div style="text-align:center;"><a target="_self" href="javascript:void;" onclick="$(\'.table1\').toggle();">Show/Hide Shoutbox</a></div></br>');
	
	//remove this line to show shoutbox by default
	shoutBox.hide();
}

// load jQuery and execute the main function
addJQuery(main);