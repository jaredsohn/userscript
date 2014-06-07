// ==UserScript==
// @name           FRD Medya Auto Click
// @namespace      http://userscripts.org/users/23652
// @description    Auto Click Ads On FRD Medya. Auto relads after 2-4mins if no ads are present. By Kadrius
// @include        http://*frdmedya.com/index.php?option=surf
// @include        http://*frdmedya.com/index.php
// @include        http://*frdmedya.com/view.php?ad=*
// @copyright      Kadrius
// @version        2.6.0
// ==/UserScript==

var ad_wait_time, i, w, sec, timena, foundAd, lhr=location.href;


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

var ad_page_url = 'index.php?option=surf',
logout_url = 'index.php?option=logout.php',
index_url = 'index.php',
a = xp("//a[contains(@href, 'view.php?ad')]",6),
v = xp("//iframe"),
s = xp("//strike"),
url = 'http://' + document.domain + '/',
logoutexist = /logout/i.test(document.body.textContent),
adpage = /view\.php\?ad=\d+/i.test(lhr);

function goPage(u) {
window.location.replace(url+u);
}

function page(u) {
return (lhr==url+u)?true:false;
}

// Switch to surf.php if you just logged in
if(logoutexist && page(index_url) && switch_to_ad_page) {goPage(ad_page_url);}

	function setTimers() {
	var intV = setInterval(function(){
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena===0) {clearInterval(intV);goPage(ad_page_url);}
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
if(!adpage) {
sec = document.createElement("span");
sec.setAttribute("style", "background:#000000; font-family:Lucida Console, Courier, Monotype; color:#33FF66; padding:5em; position:absolute; top:"+window.innerHeight/3+"px; left:"+window.innerWidth/2+"px; text-align:center;");
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


if(foundAd == false) {
w = window.open('http://www.google.com/', "adWindow");
if(w) {w.close();}

sec.innerHTML = 'Reklamlar bitti!..<br>'+ad_wait_time+'<br><a style="color:#ddd;border:0px solid transparent;text-decoration:underline;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Kapat</a>';

setTimeout(function(){window.location.reload();}, Math.floor(120000+Math.random()*120));

}
else {setTimers();}
}
}

if (document.addEventListener) {window.addEventListener("load", main, false);}
else {window.document.onLoad = main;}
