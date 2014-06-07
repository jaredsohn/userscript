// ==UserScript==
// @name          b4rthta
// @namespace     http://www.graphicmedicine.com/greasemonkey/
// @description	Make b3ta more 4rthurian friendly - for those who like a little colour in their life
// @include       http://*.b3ta.com/*
// @include       http://b3ta.com/*
// @exclude       http://*.b3ta.com/
// @exclude       http://b3ta.com/
// ==/UserScript==

// change the page title
document.title = ':: 4rthur ::';

// Styling
var topbar = document.getElementById('topbar');

topbar.style.backgroundColor	= '#FF9900';
topbar.style.fontSize		= '12';
topbar.style.borderBottom	= '1px solid #996600';
topbar.style.borderTop		= '1px solid #FFCC33';
topbar.style.height		= '25px';
topbar.style.padding		= '3px 4px';

// create the grey bar

var nav = document.createElement('div');
nav.id = 'navigation';

var newstyle = document.createElement('style');
newstyle.innerHTML = '#navigation a { color: #FFFFFF; text-decoration: none; }';
document.getElementsByTagName('head')[0].appendChild(newstyle);

var linkelements = document.getElementsByTagName('a')
var logout = linkelements[3].href;
var username = linkelements[1].innerHTML;
var profile = linkelements[1].href;

nav.style.backgroundColor='#999999';
nav.style.borderTop	= '1px solid #CCCCCC';
nav.style.borderBottom	= '1px solid #666666';
nav.style.height		= '15px';
nav.style.padding			= '2px 10px';
nav.style.color		= '#FFFFFF';
nav.style.textAlign	= 'right';
nav.style.fontSize	= '10px';
nav.style.fontWeight	= 'bold';
nav.style.fontFamily	= 'Arial';
nav.innerHTML		= '<span style="float: left"><a href="'+profile+'">'+username+'</a></span> <a href="write.php">new post</a> | <a href="/gaz/">inbox</a> | </a><a href="http://www.b3ta.com/users/update.php">profile</a> | <a href="/calendar/">pub scheduler</a> | <a href="'+logout+'">logout</a> <a href="#" title="display official b3ta links bar" onclick="document.getElementById(\'navbar\').style.display=\'block\';">?</a>';
document.getElementsByTagName('body')[0].insertBefore(nav, document.getElementById('navbar'));
// hide the standard b3ta toolbar
//document.getElementById('mainbar').innerHTML = '';

//var logo = document.getElementById('logo');
//logo.style.fontSize = '14px';

// -- set the 4rthur style navigation -- //
topbar.innerHTML ='<a href="/"><img src="data:image/gif;base64,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" alt="4rthur" /></a>';


// -- use the 4rthur style post icon -- //
var postIconData = 'data:image/pn4thg;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAMAAACHgmeRAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAJUExURQAAAP///+7u7lf1b8YAAAADdFJOU///ANfKDUEAAAAxSURBVHjaYmBiYmIAASYGEIORkRHEZmIAUYxgCUYwhNHEsKCIAW4IzGCIHWALAAIMAA8yAD2G3NxyAAAAAElFTkSuQmCC';
var images = document.getElementsByTagName('img');
for (var i=0; i<images.length; i++) {
	var currentImg = images[i].src;
	if (currentImg == 'http://www.b3ta.com/images/board_posticon.gif') {
		images[i].setAttribute('width', '9');
		images[i].setAttribute('height', '12');
		images[i].src = postIconData;
	}
}

// -- Apply 4rthur post styles -- //

GM_addStyle("#navbar { display: none; }");

GM_addStyle("#navbar { text-align: center; }");
GM_addStyle("#navbar a { font-size: 10px; }");

GM_addStyle("body { font-size: 15px; font-family: Verdana, Arial, Helvetica, sans-serif; padding: 0px; margin: 0px;}");

GM_addStyle("div.post1 { padding: 8px; margin: 4px 0px; background-color: #DDDDDD; }");
GM_addStyle("div.post2 { padding: 8px; margin: 4px 0px; background-color: #EEEEEE; }");

GM_addStyle("a { font-family: Verdana, Arial, Helvetica, sans-serif; font-weight: bold; text-decoration: none; color:#666666; }");
GM_addStyle("a:visited { color:#666666; }");
GM_addStyle("a:hover { color:#FF6600; }");

//GM_addStyle(".edit { border: 1px solid #FF9900; background-color: #FFCC99; padding: 1px 2px;}");

