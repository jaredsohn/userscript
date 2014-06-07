// ==UserScript==
// @name           LUE Links(only)
// @namespace      categoryfilter
// @description    Makes the LUE Bar 2.0 shittier.
// @include        http://*endoftheinter.net/*
// @include        https://*endoftheinter.net/*
// @exclude        http://endoftheinter.net/
// @exclude        https://endoftheinter.net/
// @exclude        http://u.endoftheinter.net/u.php*
// @exclude        https://u.endoftheinter.net/u.php*
// ==/UserScript==

if (GM_getValue('ULBEDREREOD','error') == 'error' || GM_getValue('FEKDFIGGLEOGIRG','error') == 'error'){
	var userName = prompt("Please enter your username","Username");
	var userId = prompt("Please enter your userID","UserID");

	GM_setValue("ULBEDREREOD", userName);
	GM_setValue("FEKDFIGGLEOGIRG", userId);
}

if( location.href.indexOf('/resetluebar') != -1 ) {
	var userName = prompt("Please enter your username","Username");
	var userId = prompt("Please enter your userID","UserID");

	GM_setValue("ULBEDREREOD", userName);
	GM_setValue("FEKDFIGGLEOGIRG", userId);
}

if(window.location.href == "http://endoftheinter.net/main.php"  || window.location.href == "https://endoftheinter.net/main.php") {
	location.href= "https://links.endoftheinter.net/lsearch.php";
	
}

var username = GM_getValue("ULBEDREREOD");
var userID = GM_getValue("FEKDFIGGLEOGIRG");

//Remove old menu

var divs = document.getElementsByTagName('div');
	for(var i=0; i<divs.length; i++) {
		if (divs[i].className == 'menubar') {
		  	divs[i].parentNode.removeChild(divs[i]);
		}
		if (divs[i].className == 'userbar') {
		  	divs[i].parentNode.removeChild(divs[i]);
	}
}


// Create menu item

var logo = document.createElement("div");

logo.innerHTML = '<div id="navbar"><div id="centernav"><ul><li><a href="//links.endoftheinter.net/links.php?mode=new">New Links</a></li><li><a href="//links.endoftheinter.net/links.php?mode=topvotedweek">Links of the Week</a></li><li><a href="//links.endoftheinter.net/links.php?mode=topvoted">Top Voted Links</a></li><li><a href="//links.endoftheinter.net/links.php?mode=all">All Links</a></li><li><a href="//links.endoftheinter.net/lsearch.php">Search Links</a></li><li><a href="//endoftheinter.net/logout.php">Logout</a></li></ul></div></div>';

//Who the fuck has multiple body tags....
document.body.insertBefore(logo, document.body.firstChild);

//Style the menu items

function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

addGlobalStyle(' body { margin-top: 32px; }  #p-cactions { top: 4em;} #p-logo { top: 32px;} .body { margin-top: 40px; } #navbar, #navbar ul {  padding: 0;  margin: 0;  list-style: none; font-size: 9pt; font-family: "Arial",sans-serif; line-height: 14px;} #navbar a:link { text-decoration: none; color: #DDE3EB; } #navbar a:hover { text-decoration: none; color: #DDE3EB; background-color: #2E5A7F; } #navbar a:visited { text-decoration: none; color: #DDE3EB; } #navbar a:active { text-decoration: none; color: #DDE3EB; }  #navbar li:hover ul {  display: block; }  #navbar {  top: 0px;  left: 0px;  width: 100%;  height: 30px;  position: fixed;  background-color: #4B73AA;  z-index: 50; }  #navbar a {  display: block;  padding: 2px 0px; }  #navbar li {  width:200px;  margin: 4px 0px 0px 6px;  border: 2px solid #2E5A7F;  float: left;  text-align: center;  font-weight: bold; }  #navbar li ul {  display: none;  position: absolute;  width:200px;  background-color: #4B73AA;  margin-top: 2px;  margin-left: -2px;  border-left: 2px solid #2E5A7F;  border-bottom: 2px solid #2E5A7F;  border-right: 2px solid #2E5A7F;  z-index: 50; }  #navbar li ul li {  width:200px;  position: relative;  margin: 0px;  border: none;  text-align: left; } #navbar li ul li a {  padding: 2px 4px; }  #navbar li .divider {  border-bottom: 2px solid #2E5A7F; }  div.userbar {  top: 28px;  left: 0px;  width: 100%;  padding: 2px 0px;  position: fixed; z-index: 0; } #centernav { width:1300px; margin:0 auto; }');