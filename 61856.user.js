// Group Forum Menu
// c r e a t e d   b y   the eNeME
// 11/11/2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Group Forum Menu", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Group Forum Menu
// @version		1.1
// @namespace		http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description		Adds a menu with links to your private gorup forums to the "Groups" link on Bungie.netgroups link.
// @include		*bungie.net/*
// ==/UserScript==

var navlogin = document.getElementById('ctl00_dashboardNav_loggedInNormal').innerHTML;
if(navlogin.toUpperCase().indexOf('<a class="list-db-update" href="http://www.bungie.net/Account/Profile.aspx?page=Chapters">Groups</a>'.toUpperCase())!=-1) {
	var startpos = navlogin.toUpperCase().indexOf('<a class="list-db-update" href="http://www.bungie.net/Account/Profile.aspx?page=Chapters">Groups</a>'.toUpperCase());
	var skiplen = '<a class="list-db-update" href="http://www.bungie.net/Account/Profile.aspx?page=Chapters">Groups</a>'.length;
}
else {
	var startpos = navlogin.toUpperCase().indexOf('<a class="list-db-update" href="/Account/Profile.aspx?page=Chapters">Groups</a>'.toUpperCase());
	var skiplen = '<a class="list-db-update" href="/Account/Profile.aspx?page=Chapters">Groups</a>'.length;
}
var groupLinks = new Array;

var links = new Array;
var newDiv = document.createElement("div");
var doc, html, doc1, html1;
var forumLink;
var newLink;
var index, totalIndex=0;

var listcontents = '<ul id="groups_list" class="groups_list"><li><a class="list-db-update" href="/Account/Profile.aspx?page=Chapters">Groups</a><ul>';
var groupName;

if(startpos != -1) {
	GM_xmlhttpRequest ({
		method: "GET",
		url: "http://www.bungie.net/Account/Profile.aspx?page=Chapters",
		headers: {
			"User-agent": "Mozilla/5.0",
			"Accept": "text/html",
		},
		onload: function (response1) {
			doc1 = document.implementation.createDocument ("", "", null);
			html1 = document.createElement ("html");
			html1.innerHTML = response1.responseText;
			doc1.appendChild (html1);
			//doc1 contains source of groups page.
			groupLinks = doc1.getElementById('ctl00_mainContent_chaptersPanel').getElementsByTagName("a"); //links to group main pages
			for (var i = 0; i < groupLinks.length-2; i++) {
				GM_xmlhttpRequest ({
					method: "GET",
					url: "http://www.bungie.net"+groupLinks[i].href,
					headers: {
						"User-agent": "Mozilla/5.0",
						"Accept": "text/html",
					},
					onload: function (response){
						doc = document.implementation.createDocument ("", "", null);
						html = document.createElement ("html");
						html.innerHTML = response.responseText;
						doc.appendChild (html);
						//doc contains HTML source from group's home page
						forumLink = doc.getElementById('ctl00_groupForumsLink').href;
						groupName = doc.getElementById('ctl00_groupHomeLink').innerHTML.substr(0,doc.getElementById('ctl00_groupHomeLink').innerHTML.length-" Home".length);
						newLink = "<a href='"+forumLink+"'>"+groupName+"</a>";
						listcontents+="<li>"+newLink+"</li><br>";
						newDiv.innerHTML = listcontents+"</ul></li></ul>";
						//FORMATED LIST IS IN newDiv!
						document.getElementById('ctl00_dashboardNav_loggedInNormal').innerHTML = navlogin.substr(0,startpos)+newDiv.innerHTML+navlogin.substr(startpos+skiplen);
						}
				});
			}
		}
	});
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
"ul#groups_list li ul {"+
"	background:#000000;"+
"	opacity:0.8;"+
"	display:none;"+
"	height:auto;"+
"	padding-bottom:5px;padding-top:10px;"+
"	margin-bottom:0px;"+
"	border-right:thin solid #757575;border-bottom: thin solid #757575;border-left: thin solid #757575;"+
"	position:absolute;"+
"	width:225px;"+
"	z-index:200;"+
"	}"+
"ul#groups_list li:hover > ul {"+
"    display: block;"+
"}"+
"ul#groups_list li ul:hover > li {"+
"    background:000000;"+
"}"
);

//		  GTFO nao APX FLYB
//		d[(**)]T
//	      MAI SCRIPT
//
//		 jk <3