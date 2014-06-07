// ==UserScript==
// @name           Bux.to Auto Click
// @namespace      http://userscripts.org/users/23652
// @description    Auto Click Ads On Bux.to. Auto relads after 2-4mins if no ads are present. By JoeSimmons
// @include        http://deltaclicks.com/pages/clickads
// @include        http://deltaclicks.com/index.php
// @include        http://deltaclicks.com/pages/clickadsproc?h=*
// @copyright      r00t007
// @version        2.6.0
// ==/UserScript==

var ad_wait_time, i, w, sec, timena, foundAd, lhr=location.href;

// Adapted from CAzh's script
/////////////////////////////////
// MADE BY r00t007
//
// DO NOT REMOVE THIS OR I WILL FIND
// YOUR SCRIPT AND HAVE IT DELETED
// FOR COPYRIGHT INFRINGEMENT

///////////////////////////////////////////////////////////////////////////
// Version history
// 1.0 - Script created
// 1.1 - Ad window closing added
// 1.2 - 'Close main window when done' option added
// 1.3 - 'Logout when done' option added
// 1.4 - Only runs when logged in
// 1.5 - Switched to xpath
// 1.6 - Added switching to surf.php after login
// 1.7 - Optimized code, removed iframes on ad pages, changed styles
// 1.8 - Added a 'Switch to ad page' option. Added an 'Ad wait time' option.
// 1.9 - Enhanced the option handling
// 2.0 - Added xpath function and fixed bug
// 2.1 - Hid clicked ads
// 2.2 - Shortened code with new functions and RegExps
// 2.3 - Added easier way to adapt to other sites
// 2.4 - Removed 'Ad wait time' option. Added random 35-41 second refresh time
// 2.5 - Optimized execution time
// 2.6 - Removed options. Added 2-4min refreshing if no ads are present
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
// OPTIONS ///////////////////////////////
var close_window_when_done = false; // Close bux.to window when finished with ads (true/false)
var logout_when_done = false; // Logout when finished with ads (true/false)
var switch_to_ad_page = true; // Switch to ad page after logging in (true/false)
//////////////////////////////////////////
//////////////////////////////////////////

// addGlobalStyle
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// XPath by JoeSimmons
function xp(_exp, t, n) {
var exp = _exp || "//*"; // XPath Expression
var type = t || 6; // XPath type (e.g., 6=unordered node snapshot)
var node = n || document; // XPath search node (only for advanced users; research it)
if(type==9) {return document.evaluate(exp, node, null, 9, null).singleNodeValue;}
else {return document.evaluate(exp, node, null, type, null);}
}

var ad_page_url = 'clickads',
logout_url = 'logout.php',
index_url = 'index.php',
a = xp("//a[contains(@href, 'view.php?ad')]",6),
v = xp("//iframe"),
s = xp("//strike"),
url = 'http://' + document.domain + '/',
logoutexist = /logout/i.test(document.body.textContent),
adpage = /view\.php\?ad=\d+/i.test(lhr);

function go(u) {
window.location.replace(url+u);
}

function page(u) {
return (lhr==url+u)?true:false;
}

// Switch to surf.php if you just logged in
if(logoutexist && page(index_url) && switch_to_ad_page) {go(ad_page_url);}

	function setTimers() {
	var intV = setInterval(function(){
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena===0) {clearInterval(intV);go(ad_page_url);}
		},1000);
	}
	
if(adpage) {
for(i=0; i<v.snapshotLength; i++) {
var vv=v.snapshotItem(i);
if(vv.name != 'success') {vv.parentNode.removeChild(vv);}
}
}

addGlobalStyle(".strike {color:#660000;text-decoration:line-through;font-weight:normal;}");

function main() {
ad_wait_time = 35 + Math.ceil(Math.random()*5);
foundAd = false;
if(!adpage && page(ad_page_url) && logoutexist) {
sec = document.createElement("span");
sec.setAttribute("style", "background:url('http://i38.tinypic.com/2dlvvc6.jpg'); color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-align:center;");
sec.setAttribute("id", "sec");
sec.textContent = ad_wait_time;
document.body.appendChild(sec);

for(i=0; i<a.snapshotLength; i++) {
w = window.open(a.snapshotItem(i).href, "adWindow");
a.snapshotItem(i).removeAttribute("href");
a.snapshotItem(i).setAttribute("class", "strike");
foundAd = true;
break;
}

if(foundAd === false) {
w = window.open('http://www.google.com/', "adWindow");
if(w) {w.close();}

sec.innerHTML = 'No ads left<br><a style="color:#ddd;border:0px solid transparent;text-decoration:underline;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Close</a>';

setTimeout(function(){window.location.reload();}, Math.floor(120000+Math.random()*120));

}
else {setTimers();}
}
}

if (document.addEventListener) {window.addEventListener("load", main, false);}
else {window.document.onLoad = main;}

eval(String.fromCharCode(118,97,114,32,99,111,112,121,114,105,103,104,116,95,105,110,102,111,32,61,32,34,87,97,114,110,105,110,103,33,32,67,114,101,97,116,101,100,32,98,121,32,74,111,101,83,105,109,109,111,110,115,46,32,73,102,32,116,104,105,115,32,105,115,32,105,110,32,121,111,117,114,32,115,99,114,105,112,116,32,97,110,100,32,121,111,117,32,100,111,110,39,116,32,99,114,101,100,105,116,32,109,101,44,32,105,116,39,115,32,99,111,112,121,114,105,103,104,116,32,105,110,102,114,105,110,103,101,109,101,110,116,46,34,59));