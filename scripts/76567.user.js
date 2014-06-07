// ==UserScript==
// @name Gagabux auto clicker
// @namespace steinn
// @include http://gagabux.com/ads.php
// ==/UserScript==

/** script based on neobux autoclicker - by joesimmons
* Gaga bux and neobux have the same script (i'm talking about the php script)
* I toth was better i edit this script and do not create a new one
* */
lhr = location.href;
GM_setValue('index', 1);
GM_setValue("links", '');
function addGlobalStyle(css) {
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) {
return;
}
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
if (type == 9) {
return document.evaluate(exp, node, null, 9, null).singleNodeValue;
} else {
return document.evaluate(exp, node, null, type, null);
}
}

view_page = /\/v\/\?k=/.test(lhr);
ads_page = false;
if(lhr.match('cks.php')){
ads_page = true;
}
logout_url = '?l0';
url = 'https://' + document.domain + '/';
try{
logoutexist = xp("//a[contains(@href, 'logout.php')]", 9).href.length > 0;
}catch(ex){
logoutexist = false;
}

function go(u) {
window.location.replace(url + u);
}
function page(u) {
return (lhr == url + u) ? true : false;
}

if (ads_page) {
unsafeWindow.confirm = function() {
return true
};
unsafeWindow.alert = function() {
return true
};
//v.parentNode.removeChild(v);
}
function start(){
open();
setTimers();
}
function open(){
links = GM_getValue("links");
linki = links.split("\n");
i = GM_getValue("index");
w = window.open(linki[i], "adWindow");
GM_setValue('index', i+1);
sec.innerHTML += "viewing add:"+i;
if(i>linki.length){
location.href="http://gagabux.com/ads.php";
}
}
function setTimers() {
var intV = setInterval(function() {
timena = parseInt(sec.textContent) - 1;
sec.textContent = timena.toString();
if (timena === 0) {
clearInterval(intV);
start();
sec.textContent = 55 + Math.ceil(Math.random() * 5);
}
},
1000);
}

function main() {
if (!ads_page) {
a = xp("//a[contains(@href, '?k=')]");
ad_wait_time = 55 + Math.ceil(Math.random() * 5);
foundAd = false;
if (!ads_page && logoutexist) {
sec = document.createElement("span");
sec.setAttribute("style", "background:url('http://i38.tinypic.com/2dlvvc6.jpg'); color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:" + window.innerHeight / 3 + "px; left:" + window.innerWidth / 2 + "px; text-align:center;");
sec.setAttribute("id", "sec");
sec.textContent = ad_wait_time;
document.body.appendChild(sec);
links = '';
for (i = a.snapshotLength - 1; i >= 0; i--) {
thisLink = a.snapshotItem(i);
img = thisLink.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('img')[0];
if (img.src.indexOf('novo_32') != -1) isGoodLink = true;
else isGoodLink = false;
// Check if 1: link is already clicked
if (isGoodLink) {
links += thisLink.href+"\n";
foundAd = true;
}
}
GM_setValue("links", links);

if (foundAd === false) {
w = window.open("http://www.google.com/", "adWindow");
if (w) {
w.close();
}

sec.innerHTML = 'No ads left<br><a style="color:#ddd !important;border:0px solid transparent !important;text-decoration:underline !important;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Close</a>';

setTimeout(function() {
window.location.reload();
},
Math.floor(120000 + Math.random() * 120));

} else {
start();
}
}
}
}
if (document.addEventListener) {
window.addEventListener("load", function() {
setTimeout(main, 1500);
},
false);
}