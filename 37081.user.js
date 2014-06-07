// ==UserScript==
// @name           OccupEx Auto Click
// @namespace      http://userscripts.org/users/23652
// @description    OccupEx AutoClicker
// @include        https://occupex.com/viewads.php
// @include        https://occupex.com/cashads.php?ad=*
// @include        http://occupex.com/viewads.php
// @include        http://occupex.com/cashads.php?ad=*

// ==/UserScript==

var close_window_when_done, logout_when_done, time;


close_window_when_done = false;
logout_when_done = false;
time = 30;


var i, a, aa, w, sec, timena, foundAd, url, logoutexist, adpage, surfpage, Url, lhr = location.href, intv;

a = document.evaluate("//a[starts-with(@onClick, 'javascript:window.open')]", document, null, 7, null);
logoutexist = /logout/i.test(document.body.textContent);
adpage = /cashads\.php\?ad=\d+/i.test(lhr);
Url = 'http://' + document.domain + '/';

function go(u) {
location.href=Url+u;
}

function page(u) {
return (lhr==url+u)?true:false;
}

// Switch to surf.php if you just logged in
if(logoutexist && page('index.php')) {go('viewads.php');}

	function setTimers() {
		intv = setInterval(function () {
			timena = parseInt(sec.textContent)-1;
			sec.textContent = timena.toString();
			if (timena == 0) {go('viewads.php');clearInterval(intv);}
		},1000);
	}

if(adpage) {
document.body.innerHTML = document.body.innerHTML.replace(/<iframe.*?>/gmi, '');
unsafeWindow.confirm = function(){return true};
unsafeWindow.alert = function(){return true};
unsafeWindow.t = 0;
}

function main() {

foundAd = false;
if(logoutexist && !adpage) {
sec = document.createElement("span");
sec.setAttribute("style", "background:#004262; color:#ddd; border:8px ridge #000; padding:5em; position:absolute; top:"+window.innerHeight/12+"px; left:"+window.innerWidth/2+"px; text-align:center;");
sec.setAttribute("id", "sec");
sec.appendChild(document.createTextNode(time.toString()));
document.body.appendChild(sec);

for(i=0; i<a.snapshotLength; i++) {
  aa = a.snapshotItem(i);
  if(!/cheat link/i.test(aa.innerHTML) && !/expired advert/i.test(aa.innerHTML)) {
  url = Url + 'cashads.php?ad=' + aa.getAttribute('onClick').match(/\d+/)[0];
	w = window.open(url, "adWindow");
	foundAd = true;
	break;
	}
	else {aa.parentNode.removeChild(aa);}
}

if(!foundAd) {
// Change the timer to say 'No ads left'
sec.innerHTML = 'No ads left<br><a style="color:#ddd;border:0px solid transparent;text-decoration:underline;background:transparent;" href=\'javascript:void(0);\' onClick=\'this.parentNode.style.display="none";\'>Close</a>';

// logout if option is true
if(logout_when_done) {go('logout.php');}

// close window if option is true
if(close_window_when_done) {window.close();}

w = window.open(Url, "adWindow");
w.close();
}
else setTimers();
}
}

if (document.addEventListener) {window.addEventListener("load", main, false);}
else {window.document.onLoad = main;}