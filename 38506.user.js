// ==UserScript==
// @name           PTC sites autoclicker
// @namespace      http://userscripts.org/users/74921
// @description    Auto clicks ads on most Bux sites. Comes with 2 options that you change in the source. By JoeSimmons
// @include        http://*bux.to/surf.php
// @include        http://*bux.to/view.php?ad=*
// @include        http://cashmybux.com/surf.php
// @include        http://cashmybux.com/view.php?ad=*
// @include        http://clickmybux.com/surf.php
// @include        http://clickmybux.com/view.php?ad=*
// @include        http://earnmybux.com/surf.php
// @include        http://earnmybux.com/view.php?ad=*
// @include        http://makemybux.com/surf.php
// @include        http://makemybux.com/view.php?ad=*
// @copyright      CaloianCosmin
// ==/UserScript==



var close_window_when_done, logout_when_done, i, v, a, A, w, s, sec, timena, foundAd, url, logoutexist, adpage, ad_page_url, surf_page_url, surfpage, adURL, lhr=location.href;

// Adapted from CAzh"s script
/////////////////////////////////
// MADE BY JOESIMMONS
//
// DO NOT REMOVE THIS OR I WILL FIND
// YOUR SCRIPT AND HAVE IT DELETED
// FOR COPYRIGHT INFRINGEMENT

///////////////////////////////////////////////////////////////////////////
// Version history
// 1.0 - Script created
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
// OPTIONS ///////////////////////////////
close_window_when_done = false; // Close bux.to window when finished with ads (true/false)
logout_when_done = false; // Logout when finished with ads (true/false)
//////////////////////////////////////////
//////////////////////////////////////////

// addGlobalStyle
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName("head")[0];
    if (!head) { return; }
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    head.appendChild(style);
}

// XPath by JoeSimmons
function xp(exp, t, n) {
if(!exp || exp=="") {return;}
var type,node;
type = t || 6; // XPath type (e.g., 6=unordered node snapshot)
node = n || document; // XPath search node (only for advanced users; research it)
return type==9 ? document.evaluate(exp,node,null,9,null).singleNodeValue : document.evaluate(exp,node,null,type,null);
}

a = xp("//a[contains(@href, 'view.php?ad') or contains(@href, 'cks.php?k') or contains(@href, 'cashads.php?') or contains(@href, 'click.php?ad') or contains(@href, 'surfing.php?') or contains(@id, 'cks') or contains(@href, 'javascript:void')]", 7);
v = xp("//iframe");
s = xp("//strike");
url = "http://" + document.domain + "/";
adURL = url;
logoutexist = document.evaluate("//a[contains(@href, 'logout.php')]", document, null, 6, null).snapshotLength>0;
adpage = /(viewad|cks|cashads|view|surfing|click)\.php\?\w+=\w+/.test(lhr);
surfpage = /((surf|viewads|ads)\.php)|((index\.php)?\?p=surf)/.test(lhr);
if(!adpage) {
//ad_page_url = a.snapshotItem(0).href.match(/((view)\.php\?\w+=)|(^javascript:)/)[0].split("?")[0];
}
// Determine the surf page by domain
switch(document.domain) {
case "www4.bux.to":surf_page_url="surf.php";break;
case "cashmybux.com":surf_page_url="surf.php";break;
case "clickmybux.com":surf_page_url="surf.php";break;
case "earnmybux.com":surf_page_url="surf.php";break;
case "makemybux.com":surf_page_url="surf.php";break;
}

function go(u) {
window.location.replace(url+u);
}

function URL(u) {
window.location.replace(u);
}

function page(u) {
return (lhr==url+u)?true:false;
}

	function setTimers() {
	var intV = setInterval(function(){
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena===0) {clearInterval(intV);URL(surf_page_url);}
		},1000);
	}
	
if(adpage) {
for(i=0; i<v.snapshotLength; i++) {
var vv=v.snapshotItem(i);
if(vv.name != "success") {vv.parentNode.removeChild(vv);}
}
unsafeWindow.confirm = function(){return true};
unsafeWindow.alert = function(){return true};
}

addGlobalStyle(".strike,strike {color:#000;text-decoration:line-through;font-weight:normal;}".replace(/;/g,' !important;'));

function main() {
foundAd = false;
if(!adpage && page(surf_page_url) && logoutexist) {
sec = document.createElement("span");
sec.setAttribute("style", "background:url(\"http://i38.tinypic.com/2dlvvc6.jpg\"); color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-align:center;");
sec.setAttribute("id", "sec");
sec.textContent = 35 + Math.ceil(Math.random()*5);
document.body.appendChild(sec);

for(i=0; i<a.snapshotLength; i++) {
A = a.snapshotItem(i);
if(A.href!="") {
if(A.href.indexOf("javascript:void")!=-1 && A.id.indexOf("cks")!=-1) {
adURL = A.id + "&cdk=true";
}
else if(/javascript:window\.open.+cashads\.php/.test(A.getAttribute("onClick")) && A.className=="spreadlinks") {
adURL = url + "cashads.php?ad=" + A.getAttribute("onClick").match(/\d+/)[0];
}
else if(A.href.indexOf(".php?")!=-1) {
adURL = A.href;
}
if(adURL!=url && !/cheat link/i.test(A.innerHTML) && !/expired advert/i.test(A.innerHTML)) {
foundAd=true;
w = window.open(adURL, "adWindow");
A.removeAttribute("href");
A.setAttribute("class", "strike");
}
if(foundAd) {break;}
}
}

if(!foundAd) {
w = window.open("http://www.google.com/", "adWindow");
if(w) {w.close();}

sec.innerHTML = "No ads left<br><a style=\"color:#ddd;border:0px solid transparent;text-decoration:underline;\" href=\"javascript:void(0);\" onClick=\"this.parentNode.style.display='none';\">Close</a>";

if(logout_when_done && close_window_when_done) {
var ifr = document.createElement("iframe");
ifr.src = url+"logout.php";
ifr.setAttribute("style", "display:none;");
document.body.appendChild(ifr);
setTimeout("window.close();",3000);
}
else if(close_window_when_done) {window.close();}
else if(logout_when_done) {go("logout.php");}

}
else {setTimers();}
}
}

// Start script at DOMContentLoaded
main();

