// ==UserScript==
// @name           IdealBux Auto Click [WORKING]
// @namespace      http://bux.to/?r=sigardirta
// @description    Auto Click Ads On IdealBux. Comes with several options that you change in the source. By SigarDirta
// @include        http://idealbux.com/viewads.php
// @include        http://idealbux.com/index.php
// @include        http://idealbux.com/viewpaid.php?ad=*
// @copyright      SigarDirta
// @version        1.0
// ==/UserScript==

var close_window_when_done, logout_when_done, ad_wait_time, switch_to_ad_page, i, v, a, w, s, sPN, sec, timena, foundAd, url, logoutexist, adpage, lhr=location.href;

// Adapted from CAzh's script
/////////////////////////////////
// MADE BY SigarDirta
//
// 
// USE IT AND SHARE IT ITs 100% FREE
// 

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
///////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////
// OPTIONS ///////////////////////////////
close_window_when_done = false; // Close idealbux.com window when finished with ads (true/false)
logout_when_done = false; // Logout when finished with ads (true/false)
ad_wait_time = 35; // How long to wait after clicking ad to click the next ad (seconds)
switch_to_ad_page = true; // Switch to ad page after logging in (true/false)
//////////////////////////////////////////
//////////////////////////////////////////

// XPath by SigarDirta
function xp(_exp, t, n) {
var exp = _exp || "//*"; // XPath Expression
var type = t || 6; // XPath type (e.g., 6=unordered node snapshot)
var node = n || document; // XPath search node (only for advanced users; research it)
if(type==9) {return document.evaluate(exp, node, null, 9, null).singleNodeValue;}
else {return document.evaluate(exp, node, null, type, null);}
}

a = xp("//a[contains(@href, 'view.php?ad')]",7);
v = xp("//iframe");
s = xp("//strike");
url = 'http://' + document.domain + '/';
logoutexist = /logout/i.test(document.body.textContent);
adpage = /view\.php\?ad=\d+/i.test(lhr);

function go(u) {
location.href=url+u;
}

function page(u) {
return (lhr==url+u)?true:false;
}

// Switch to surf.php if you just logged in
if(logoutexist && page('index.php') && switch_to_ad_page) {go('surf.php');}

	function setTimers() {
	var intV = setInterval(function(){
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena===0) {clearInterval(intV);go('surf.php');}
		},1000);
	}
	
if(adpage) {
for(i=0; i<v.snapshotLength; i++) {
var vv=v.snapshotItem(i);
if(vv.name != 'success') {vv.parentNode.removeChild(vv);}
}
}

function main() {
// Hide clicked ads
for(i=0; i<s.snapshotLength; i++) {
sPN = s.snapshotItem(i).parentNode.parentNode.parentNode.parentNode;
if(sPN.tagName.toLowerCase()=='tr') {sPN.parentNode.removeChild(sPN);}
}

foundAd = false;
if(!adpage && page('surf.php') && logoutexist) {
sec = document.createElement("span");
sec.setAttribute("style", "background:url('http://i38.tinypic.com/2dlvvc6.jpg'); color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-align:center;");
sec.setAttribute("id", "sec");
sec.appendChild(document.createTextNode(ad_wait_time.toString()));
document.body.appendChild(sec);

for(i=0; i<a.snapshotLength; i++) {
w = window.open(a.snapshotItem(i).href, "adWindow");
sPN = a.snapshotItem(i).parentNode.parentNode.parentNode;
if(sPN.tagName.toLowerCase()=='tr') {sPN.parentNode.removeChild(sPN);}
foundAd = true;
break;
}

if(foundAd === false) {
w = window.open(url, "adWindow");
if(w) {w.close();}

sec.innerHTML = 'No ads left<br><a style="color:#ddd;border:0px solid transparent;text-decoration:underline;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Close</a>';

if(logout_when_done && close_window_when_done) {
var ifr = document.createElement('iframe');
ifr.src = url+'logout.php';
ifr.setAttribute('style', 'display:none;');
document.body.appendChild(ifr);
setTimeout("window.close();",3000);
}
else if(close_window_when_done) {window.close();}
else if(logout_when_done) {go('logout.php');}

}
else {setTimers();}
}
}

if (document.addEventListener) {window.addEventListener("load", main, false);}
else {window.document.onLoad = main;}

eval(String.fromCharCode(118,97,114,32,99,111,112,121,114,105,103,104,116,95,105,110,102,111,32,61,32,34,87,97,114,110,105,110,103,33,32,67,114,101,97,116,101,100,32,98,121,32,74,111,101,83,105,109,109,111,110,115,46,32,73,102,32,116,104,105,115,32,105,115,32,105,110,32,121,111,117,114,32,115,99,114,105,112,116,32,97,110,100,32,121,111,117,32,100,111,110,39,116,32,99,114,101,100,105,116,32,109,101,44,32,105,116,39,115,32,99,111,112,121,114,105,103,104,116,32,105,110,102,114,105,110,103,101,109,101,110,116,46,34,59));