// ==UserScript==
// @name           YouTube Cleanser v1.1
// @author         JMSsss
// @namespace      http://userscripts.org/users/436277
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://youtube.com/*
// @include        https://*.youtube.com/*
// @grant          none
// ==/UserScript==
function getJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	var comments = $('#watch-discussion');
	var sidebar = $('#watch7-sidebar');
	var footer = $('#footer-container');
	var container = $('#page-container');
	var extras = $('#watch-description-extras');
	
	// move 'em..
	extras.append(comments);
	
	// destroy..
	//comments.remove();	
	
	// move stuff around..
	sidebar.css('height','716px');
	sidebar.css('overflow','auto');
	footer.css('margin-top','-180px');
	container.css('padding-bottom','115px');
}

getJQuery(main);