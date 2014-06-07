// ==UserScript==
// @name           Digg widget right-click bury
// @namespace      http://jordi.degroof.googlepages.com/
// @description    Bury digg stories directly from a widget embedded on the site
// @include        http://digg.com/*/diggthis.php?u=*
// @exclude        *s=compact*
// @source       http://userscripts.org/scripts/show/10942
// @identifier http://userscripts.org/scripts/review/10942?format=txt
// @version     1.0
// @date        2007-07-25
// ==/UserScript==

// update automatically (http://userscripts.org/scripts/show/2296)
var SCRIPT = {
		name: "Digg widget right-click bury",
		namespace: "http://jordi.degroof.googlepages.com/",
		source: "http://userscripts.org/scripts/show/10942",			// script homepage
		identifier: "http://userscripts.org/scripts/review/10942?format=txt",
		version: "1.0",								// version
		date: (new Date(2007, 7 -1, 25))		// update date
		.valueOf()
};
try {
	window.addEventListener("load", function () {
		try {
			unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
		} catch (ex) {}
	}, false);
} catch (ex) {}


// Digg's rjp-function (used for burying items), modified for use without jQuery
function bury(id,code)
{
	var params= 'id='+id+'&code='+code;
	var req = new XMLHttpRequest();
	req.open('POST', '/reportj', true);
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", params.length);
	req.setRequestHeader("Connection", "close");
	req.onload= function(xh)
				{
					document.getElementById('diglink1').className='buried-it';
					document.getElementById('diglink1').innerHTML='<span>buried</span>';
				}
	req.send(params);
	document.getElementById('menu').style.visibility='hidden';
}

function addOption(id, code, tekst, parent)
{
	var list= document.createElement("li");
	list.className= "d-item";
	var link= document.createElement("a");
	link.href= "javascript:void(null);";

	link.innerHTML= tekst;
	link.addEventListener("click", function(){bury(id, code);}, false);
	link= list.appendChild(link);
	parent.appendChild(list);
}

function addGlobalStyle(css)
{
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
}

// Add stylesheets
var style= "#menu {position:absolute;top:0px;}";
style+= "#options {padding: 0;margin: 0;list-style: none;}";
style+= ".d-item a {display: block;width: 50px;font-size: 10px;text-decoration: none;background: #fff;border-bottom: 1px solid #DDEAF6; padding:2.5px;}";
style+= ".d-item a:hover {background-color: #D8E6F3;}";
addGlobalStyle(style);

// Find the id of the story
var xpath= "/html/body/form/input[2]/@value";
var value = document.evaluate ( xpath, document, null, XPathResult.NUMBER_TYPE, null ).numberValue;

// Append menu to the widget
var menu= document.createElement("li");
menu.id= "menu";
menu.style.visibility="hidden";

var options= document.createElement("ul");
options.id= "options";
addOption(value, 8, "Duplicate", options);
addOption(value, 9, "Spam", options);
addOption(value, 14, "Inaccurate", options);
addOption(value, 12, "Lame", options);
menu.appendChild(options);

document.getElementsByTagName('ul')[0].appendChild(menu);


// Add event listeners
// Show menu when right-mouse button is clicked on the diggthis-button
// this has to happen through unsafeWindow, since we want to override the default functionality, not just append our function to it
unsafeWindow.document.getElementById("diglink1").oncontextmenu=new Function("if(document.getElementById('diglink1').innerHTML.indexOf('digg it') != -1){document.getElementById('menu').style.visibility='visible';return false;}");
// Hide on mousout
options.addEventListener("mouseout", function(){document.getElementById("menu").style.visibility="hidden";}, false)
// Mouseover event need to be captured to, because else the options are hidden when you move outside the text
options.addEventListener("mouseover", function(){document.getElementById("menu").style.visibility="visible";}, false)
