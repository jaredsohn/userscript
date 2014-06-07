// ==UserScript==
// @name           Customize Firefox Start
// @namespace      #aVg
// @description    Adds your custom links to Firefox Start
// @include        http://www.google.com/firefox*
// @version        0.2.1
// ==/UserScript==
document.title="Firefox | Start";
GM_addStyle("#sf {border:solid lightgrey;padding-left:5px;-moz-border-radius-bottomleft:7px;-moz-border-radius-topleft:7px} input[name=btnG] {top:5px;position:relative;-moz-border-radius:14px;-moz-border-left-colors:red;-moz-border-top-colors:darkred;color:white;background:darkBlue;border:medium solid grey;font-family:Calibri,Verdana;font-size:15px;font-weight:bold;} .gb1, .gb2, .gb3, a {color:darkBlue!important; font-weight:bold; font-family: Calibri, Verdana;font-size:14px;}");
var myLinks = {
	Gmail : "gmail.com",
	Userscripts : "userscripts.org",
	YouTube : "youtube.com",
	Facebook : "facebook.com"
};

var $=function(A) {return document.getElementById(A)};
var links=$("gbar").firstChild;
$("sf").setAttribute("autocomplete","on");
for(var myLink in myLinks) {
	var link=document.createElement("a");
	link.className="gb1";
	link.setAttribute("onclick","gbar.qs(this);");
	link.href="http://"+myLinks[myLink];
	link.textContent=myLink;
	links.insertBefore(link,links.childNodes[links.childNodes.length-2]);
}