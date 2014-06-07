// ==UserScript==
// @name           IsohuntOpenInNewTab
// @description    When you search for torrents, sometimes you want to open a result in a new tab, but middle-clicking on the result opens it in the same page. This script opens the results in a new tab, by default (left & middle click)
// @namespace      http://www.grechan.com/userscripts?name=isohuntmiddleclick
// @author         anonwins (http://www.facebook.com/anonwins) 
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version        0.3
// @include        *isohunt.com/torrents/*
// @history        0.3 added tooltip on top right of page, on link hovering
// @history        0.2 it works! first version
// @history        0.1 development has begun
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
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

// the guts of this userscript
function mainClick() {
	// clicking
	$(".hlRow").attr('onclick', '').click(function () {
		var linkid=$(this).attr('onmouseover');
		linkid=linkid.match(/[0-9]+/);
		linkid= $('#link'+linkid).attr('href');
		window.open(linkid);
		return false;
	});
	// tooltip
	$('<div class="dirs ydsf" id="ihNewTab"><div class="inner"><strong>Opens this torrent in a new tab</strong><br><br>IsohuntOpenInNewTab 0.3 <i>by anonwins</i></div></div>').insertAfter('#ihLeechers');
	$('.hlRow').each(function() {
		var msOver=($(this).attr('onmouseover')+";ShowTip('NewTab');");
		var msOut=($(this).attr('onmouseout')+";HideTip('NewTab');");
		$(this).attr('onmouseover',msOver);
		$(this).attr('onmouseout',msOut);
	});
}

// load jQuery and execute the main function
addJQuery(mainClick);