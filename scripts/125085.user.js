// ==UserScript==
// @name           Final Transition Bungie - Halo
// @namespace      www.bungie.net
// @description    Adds Final Transition Countdown to Bungie.net
// @include        http://*.bungie.net/*
// ==/UserScript==
var forums, newElement;
forums = document.getElementById('aspnetForm');
if (forums) {
    newElement = document.createElement('div');
    newElement.innerHTML='<div style="margin: 0 auto 0 auto;' +
    'border-bottom: 0px solid #bbbbbb; margin-bottom: 0px;margin-left: 43px;margin-right:53px;' +
    'font-size: small; background-color: #242223; ' +
    'color: #ffffff;"><p style="margin: 0px 0 0px 0;"> ' +
    '<a href="http://www.bungie.net/News/content.aspx?type=topnews&cid=32028">Countdown to Final Transition: </a> </p>' +
	'<script type="text/javascript" src="http://east.paxsite.com/countdown.js" defer="defer"></script>' +
	'<span id="countdown1">2012-03-31 00:00:00 PST+00:00</span>' +
	
    '</p></div>';
 newElement.style.textAlign="center";
 forums.parentNode.insertBefore(newElement, forums);
 
}
