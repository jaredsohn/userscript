// ==UserScript==
// @name         uso. USER MENU
// @version      2014.0108.1339
// @description  userscripts.org: Get the user menu back and better for quick access to scripts, script upload etc. (configurable)
// @namespace    https://userscripts.org/104942
// @author       PATATE12 aka. jesus2099/shamo
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://userscripts.org/*
// @include      https://userscripts.org/*
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";
/* - --- - --- - --- - START OF CONFIGURATION - --- - --- - --- - 
fixedMenu      : menu is always accessible on top of window
hidedelay      : number of ms before the menu disappears when mouse quits
clickhidedelay : number of ms before the menu disappears at mouse click (usually less)
menuitems      : list your desired menu items here
                 you can use variables like %username%, %scriptid% %thirduserid%(detected third pardy user)
                 you can write headers instead of links, with "----"
userNameOrId   : used for public profile link instead of home link on your username : "userscripts.org/users/**userNameOrId here**" link.
                 leave blank and it will use your displayed name. if not satisfactory, specify here your user id or name */
var fixedMenu = true;
var hidedelay = 200;
var clickhidedelay = 100;
var menuitems = {
	"home": "/home",
	"%username%": "----",
	"my scripts": "/home/scripts",
	"new script (file upload)": "/scripts/new",
	"new script (code paste)": "/scripts/new?form=true",
	"settings": "/home/settings",
	"widgets": "/home/widgets",
	"their scripts": "----",
	"favourite scripts": "/home/favorites",
	"search “%username%” in scripts": "/scripts/search?q=%username%",
	"community": "----",
	"send new message to this user (%thirduserid%)": "/messages/new?user_id=%thirduserid%",
	"create new topic on this script (%scriptid%)": "/topics/new?script_id=%scriptid%",
	"comments": "/home/comments",
	"monitored topics": "/home/posts",
	"search “%username%” in forums": "/posts/search?kind=forums&q=%username%",
};
var userNameOrId = "";
/* - --- - --- - --- - END OF CONFIGURATION - --- - --- - --- - */
var divtop = document.getElementById("top");
var user = document.querySelectorAll("div#top ul.login_status li");
if (user.length > 2) { user = user[1]; } else { user = null; }
var to, usermenu;
if (divtop && user) {
	if (fixedMenu) {
		divtop.style.setProperty("position", "fixed");
		divtop.style.setProperty("top", "0px");
		divtop.style.setProperty("z-index", "666");
		divtop.style.setProperty("width", self.getComputedStyle(divtop.parentNode).getPropertyValue("width"));
		divtop.parentNode.insertBefore(document.createElement("div"), divtop).style.setProperty("height", self.getComputedStyle(divtop).getPropertyValue("height"));
	}
	var scriptid = location.href.match(/\/scripts\/.+\/([0-9]+)$/);
	var thirduserid = location.href.match(/\/users\/([0-9]+)/);
	var ulink = user.getElementsByTagName("a")[0];
	userNameOrId = ulink.textContent;
	ulink.setAttribute("href", "/users/"+userNameOrId);
	ulink.appendChild(document.createTextNode("+"));
	usermenu = document.createElement("ul");
	usermenu.setAttribute("id", "usermenu");
	usermenu.style.setProperty("background-color", "black");
	usermenu.style.setProperty("display", "none");
	usermenu.style.setProperty("font-weight", "bold");
	usermenu.style.setProperty("list-style-type", "none");
	usermenu.style.setProperty("padding", ".4em 1em");
	usermenu.style.setProperty("position", fixedMenu?"fixed":"absolute");
	for (var item in menuitems) { if (menuitems.hasOwnProperty(item)) {
		var contextual = menuitems[item].match(/%(scriptid|thirduserid)%/) || item.match(/%(scriptid|thirduserid)%/);
		var contextualok = false;
		var link = !menuitems[item].match(/^----$/);
		var li = document.createElement("li");
		var a = document.createElement(link?"a":"span");
		a.style.setProperty("color", link?"white":"orange");
		var txt = item.replace(/%username%/, userNameOrId);
		var url = menuitems[item].replace(/%username%/, userNameOrId);
		if (contextual) {
			a.style.setProperty("background-color", "maroon");
			if (scriptid && (menuitems[item].match(/%scriptid%/) || item.match(/%scriptid%/))) {
				txt = txt.replace(/%scriptid%/, scriptid[1]);
				url = url.replace(/%scriptid%/, scriptid[1]);
				contextualok = true;
			}
			if (thirduserid && (menuitems[item].match(/%thirduserid%/) || item.match(/%thirduserid%/))) {
				txt = txt.replace(/%thirduserid%/, thirduserid[1]);
				url = url.replace(/%thirduserid%/, thirduserid[1]);
				contextualok = true;
			}
		}
		if (link) { a.setAttribute("href", url); }
		a.appendChild(document.createTextNode(txt));
		li.appendChild(a);
		if (!(contextual&&!contextualok)) {usermenu.appendChild(li); }
	} }
	document.body.appendChild(usermenu);
	user.addEventListener("mouseover", showUserMenu, true);
	usermenu.addEventListener("mouseover", showUserMenu, true);
	user.addEventListener("mouseout", showUserMenu, true);
	usermenu.addEventListener("mouseout", showUserMenu, true);
	document.body.addEventListener("click", showUserMenu, false);
}
function showUserMenu(e) {
	if (to) { clearTimeout(to); to = null; }
	switch (e.type == "mouseover") {
		case true:
			usermenu.style.setProperty("left", (user.parentNode.parentNode.offsetLeft+800)+"px");
			usermenu.style.setProperty("top", self.getComputedStyle(divtop).getPropertyValue("height"));
			usermenu.style.setProperty("display", "block");
			break;
		case false:
			to = setTimeout("var um = document.getElementById(\"usermenu\"); if(um){um.style.setProperty(\"display\", \"none\");}", (e.type=="click")?clickhidedelay:hidedelay);
			if (e.type != "click") {
				e.cancelBubble = true;
				if (e.stopPropagation) e.stopPropagation();
			}
			break;
	}
}
})();