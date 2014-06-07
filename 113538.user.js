// ==UserScript==
// @name           Wikipedia - hide username
// @namespace      wikipedia.org
// @include        http://*.wikipedia.org/*
// @description    hide the username at the top of wikipedia
// @version 1.01
//
// @require        http://userscripts.org/scripts/source/111583.user.js
// @history  1.00   Initial release
// @history  1.01   Fix for html change.  Now uses more broad regex.
// ==/UserScript==

//Check for new version
//ScriptUpdater.check(113538,/*currentVersion*/'1.01');

//Replace external link opening code
var html = document.body.innerHTML;

var regex = /<li.id="pt-userpage".+?>(.+?)<\/a>/;

//Extract username
var username;
username = html.match(regex);

if(username!=null){
	//Find username link
	//var keyword = ">" + username[1] + "<\/a>"
	//Convert text and variable to regexp
	//var re = new RegExp(keyword, 'gi');
	//Replace link
	//html = html.replace( re, ">user<\/a>" );
	//document.body.innerHTML = html;
	document.body.innerHTML = document.body.innerHTML.replace(regex,"<li id=\"pt-userpage\"><a href=\"\/wiki\/User:NeF\" class=\"new\" title=\"Your user page \[\.\]\" accesskey=\"\.\">User<\/a><\/li>");
}