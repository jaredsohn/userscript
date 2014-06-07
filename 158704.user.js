// ==UserScript==
// @name	Remover
// @namespace	http://bit.ly/14VCzbr
// @version	3.8
// @description	With this Script you can edit every Website.
// @author	Joshiii98
// @copyright	2013+ , Joshiii98
// @include	http://*/*
// @include	https://*/*
// @match	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/*/*
// @icon	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/nmfu4e3y2S/Icon48x48.png
// @icon64	https://dl.dropbox.com/sh/dk38s1qw7ice7nq/FaeEFBlv4b/Icon64x64.png
// @updateURL	https://userscripts.org/scripts/source/158704.meta.js
// @downloadURL	https://userscripts.org/scripts/source/158704.user.js
// @priority	9999
// ==/UserScript==

// ==VAR==
var work = "<a class='158704' onMouseout='load()'>Remover by Joshiii98 is on!</a><span class='158704'>   <--- Mouseover to Stop.</span>";
var Stopped = "<span class='158704'>Remover by Joshiii98 is off!</span>";
// ==============

// ==START FUNCTION==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','first');
	div2.style.position = "fixed";
	div2.style.top = "0px";
	div2.style.right = "0px";
	div2.style.zIndex = "9999";
	div2.style.backgroundColor = "red";
	div2.style.opacity = 0.90;	
	div2.style.border = "1px solid #ffffcc";
	div2.style.padding = "3px";
	div2.innerHTML = "<div id='button'><a class='158704' href='javascript:on()'>Start</a></div>"
	body.appendChild(div2);
	}
unsafeWindow.on = function() {
    document.getElementById("hide").style.visibility='visible';
    document.getElementById('first').style.left = "0px";
    document.getElementsByTagName("title")[0].firstChild.data = "► Started.";
    (function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://file1scriptz.funpic.de/pic/icon.gif';
    document.getElementsByTagName('head')[0].appendChild(link);
}());
    location.href="javascript:document.body.contentEditable='true'; document.designMode='on'; void 0";
    document.getElementById('button').innerHTML = work;
    }
// ==============

// ==HIDE BUTTON==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','hide');
	div2.style.position = "fixed";
	div2.style.top = "40px";
	div2.style.right = "0px";
	div2.style.zIndex = "9999";
	div2.style.opacity = 0.90;	
	div2.style.visibility ="hidden"
	div2.innerHTML = "<div id='img'><img onMouseout='imgload()' src='http://www.awesometesters.com/images/hideButton.gif'></div>"
	body.appendChild(div2);
	}	
unsafeWindow.imgload = function() {
    document.getElementById("hide").style.visibility='hidden';
    document.getElementById("first").style.visibility='hidden';
    document.getElementById("show").style.visibility='visible';
    }
// ==============

// ==SHOW BUTTON==
body = document.body;
if(body != null) {
	div2 = document.createElement("div");
	div2.setAttribute('id','show');
	div2.style.position = "fixed";
	div2.style.top = "0px";
	div2.style.right = "0px";
	div2.style.zIndex = "9999";
	div2.style.opacity = 0.90;	
	div2.style.visibility ="hidden"
	div2.innerHTML = "<div id='img'><img onMouseout='loadone()' src='http://images.maps.nsw.gov.au/splash/support/images/screenshots/searchShowButton.png'></div>"
	body.appendChild(div2);
	}	
unsafeWindow.loadone = function() {
    document.getElementById("show").style.visibility='hidden';
    document.getElementById("first").style.visibility='visible';
    document.getElementById("hide").style.visibility='visible';
    }
// ==============

// ==STOP FUNCTION==
unsafeWindow.load = function() {
document.getElementsByTagName("title")[0].firstChild.data = "Stopped.";
location.href="javascript:document.body.contentEditable='false'; document.designMode='off'; void 0";
document.getElementById('button').innerHTML = Stopped;
window.setTimeout(function() { document.getElementById("first").style.visibility='hidden'; }, 10000);
window.setTimeout(function() { document.getElementById("hide").style.visibility='hidden'; }, 10000);
window.setTimeout(function() { document.getElementById("show").style.visibility='hidden'; }, 10000);
}
// ==============