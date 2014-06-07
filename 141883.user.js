// ==UserScript==
// @name           All Bux Sites Auto Click
// @namespace      http://userscripts.org/users/23652
// @description    Ð˜ÑÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ñ‹Ð¹ ÑÐºÑ€Ð¸Ð¿Ñ‚ Ð¾Ñ‚ JOESIMMONS'a.
// @include        http://*bux.to/surf.php
// @include        http://*bux.to/view.php?ad=*
// @include        http://07bux.net/ads.php
// @include        http://07bux.net/cks.php?k=*
// @include        http://bux.to/ads.php
// @include        http://bux.to/cks.php?k=*
// @include        http://dingobux.com/surf.php
// @include        http://dingobux.com/click.php?ad=*
// @include        http://www.famebux.com/viewads.php
// @include        http://www.famebux.com/cashads.php?*
// @include        http://www.rocashbux.info/viewads.php
// @include        http://www.rocashbux.info/cashads.php?ad=*
// @include        http*://www.smithbux.com/*?p=surf
// @include        http*://www.smithbux.com/surfing.php?ad=*
// @include        http://www.beanybux.com/surf.php
// @include        http://www.beanybux.com/view.php?ad=*
// @copyright      JoeSimmons
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://userscripts.org/scripts/source/51532.user.js
// ==/UserScript==

// Adapted from CAzh"s script
/////////////////////////////////
// MADE BY JOESIMMONS Ð¸ÑÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¾ Ruki-Salat
//
// DO NOT REMOVE THIS OR I WILL FIND
// YOUR SCRIPT AND HAVE IT DELETED
// FOR COPYRIGHT INFRINGEMENT
// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    document.getElementsByTagName('head')[0].appendChild(style).innerHTML=css;
}

function delCookie(name, path, domain) {
document.cookie = name+"="+(path?";path="+path:"")+(domain?";domain="+domain:"")+";expires=Thu, 01-Jan-1970 

00:00:01 GMT";
}

// Create by avg, modified by JoeSimmons
function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(/^(style|accesskey|id|name|src|href|class)$/.test(prop)) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

addGlobalStyle("strike {font-color:#660000 !important;}");

var a = $g("//a[contains(@href, 'view.php?ad') or contains(@href, 'cks.php?k') or contains(@href, 'cashads.php?') 

or contains(@href, 'click.php?ad') or contains(@href, 'surfing.php?') or contains(@id, 'cks') or contains(@href, 

'javascript:void')]",{type:7}),
s = $g("//strike"),
url = window.location.protocol+"//"+window.location.host+"/",
adURL = url,
lhr = window.location.href,
logoutexist = $g("//a[contains(@href, 'logout.php') or contains(@href, '?action=logout')]").snapshotLength>0,
adpage = /(viewad|cks|cashads|view|surfing|click)\.php\?\w+=\w+/.test(lhr),
surfpage = /((surf|viewads|ads)\.php)|((index\.php)?\?p=surf)/.test(lhr);
// Determine the surf page by domain
switch(document.domain) {
case "www.beanybux.com":case "dingobux.com":case "www4.bux.to":case "www.bux.to":surf_page_url="surf.php";break;
case "07bux.net":case "bux.to":surf_page_url="ads.php";break;
case "www.famebux.com":case "www.rocashbux.info":surf_page_url="viewads.php";break;
case "www.smithbux.com":surf_page_url="?p=surf";break;
	default:surf_page_url="surf.php";
}

function go(u) {
window.location.replace(url+u);
}

function URL(u) {
window.location.replace(u);
}

function page(u) {
return lhr==url+u;
}

function clearCookies() {
// Clear certain cookies that disallow you to view multiple ads in 30 seconds
delCookie("__utma", "/");
delCookie("__utmb", "/");
delCookie("__utmc", "/");
delCookie("__utmz", "/");
}

function setTimers() {
var sec=$g("#sec"), intV = setInterval(function(){
		timena = parseInt(sec.textContent)-1;
		sec.textContent = timena.toString();
		if(timena===0) {
		clearInterval(intV);
		URL(surf_page_url);
		}
	},1000);
}
	
if(adpage) {
unsafeWindow.confirm = function(){return true};
unsafeWindow.alert = function(){return true};
var iframes = $g("//iframe");
for(var i=iframes.snapshotLength-1,item; (item=iframes.snapshotItem(i)); i--) if(item.name!="success" && !/

(extra10)/.test(lhr)) item.parentNode.removeChild(item);
}

function main() {
var foundAd=false,
	cashads=/javascript:window\.open.+cashads\.php/,
	expired_cheat=/(expired advert|cheat)/i,
	num=/\d+/;
if(!adpage && page(surf_page_url) && logoutexist) {
document.body.appendChild(create("span", {textContent:(35+Math.round(Math.random()*5)),id:"sec",style:

("background:url(\"http://i015.radikal.ru/1101/5b/0dc3866677e2.jpg\"); color:#ddd; border:4px ridge #000; 

padding:3em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-

align:center;")}));

for(var i=0,item; (item=a.snapshotItem(i)); i++) {
if(item.href!="") {
if(item.href.indexOf("javascript:void")!=-1 && item.id.indexOf("cks")!=-1) {
adURL = item.id + "&cdk=true";
}
else if(cashads.test(item.getAttribute("onClick")) && item.getAttribute("class")=="spreadlinks") {
adURL = url + "cashads.php?ad=" + item.getAttribute("onClick").match(num)[0];
}
else if(item.href.indexOf(".php?")!=-1) {
adURL = item.href;
}
if(adURL!=url && !expired_cheat.test(item.textContent)) {
foundAd=true;
clearCookies();
w = window.open(adURL, "adWindow");
item.parentNode.replaceChild(create("strike", {textContent:item.textContent,style:"font-color:#660000;"}), item);
}
if(foundAd) break;
}
}

if(!foundAd) {
w = window.open("http://www.google.com/", "adWindow");
if(w) w.close();

sec.innerHTML = "No ads left<br><a style=\"color:#ddd;border:0px solid transparent;text-decoration:underline;\" 

href=\"javascript:void(0);\" onClick=\"this.parentNode.style.display='none';\">Close</a>";

setTimeout(function(){window.location.reload();}, Math.floor(120000+Math.random()*120));

}
else setTimers();
}
}

// Start script at DOMContentLoaded
main();

eval(String.fromCharCode

(118,97,114,32,99,111,112,121,114,105,103,104,116,95,105,110,102,111,32,61,32,34,87,97,114,110,105,110,103,33,32,67

,114,101,97,116,101,100,32,98,121,32,74,111,101,83,105,109,109,111,110,115,46,32,73,102,32,116,104,105,115,32,105,1

15,32,105,110,32,121,111,117,114,32,115,99,114,105,112,116,32,97,110,100,32,121,111,117,32,100,111,110,39,116,32,99

,114,101,100,105,116,32,109,101,44,32,105,116,39,115,32,99,111,112,121,114,105,103,104,116,32,105,110,102,114,105,1

10,103,101,109,101,110,116,46,34,59));