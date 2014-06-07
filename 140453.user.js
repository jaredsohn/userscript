// ==UserScript==
// @name        ratebeer login
// @namespace   andydremeaux.com
// @include     http://www.ratebeer.com/forums/
// @version     1
// ==/UserScript==

var yourUserName = "username";
var yourPassword = "password";

var loggedIn = true;
var els = document.getElementsByTagName("a");
for (var i = 0, l = els.length; i < l; i++) {
    var el = els[i];
    if (el.href === 'http://www.ratebeer.com/login.asp') {
        loggedIn = false;
    }
}

if (loggedIn) return;

var firstLoad = false;
var count = 0;
var limit = 3;

unsafeWindow.loadComplete = function() {
	if (firstLoad) {
		finishUp();
		return;
	}
	firstLoad = true;
	login = ifrm.contentWindow.document.getElementById("UserName");
	login.value = yourUserName;
	pwd = ifrm.contentWindow.document.getElementById("pwd");
	pwd.value = yourPassword;
	form = ifrm.contentWindow.document.forms[0];
	form.submit();
}

function finishUp() {
	console.log(ifrm.contentWindow.document.URL);
	if (ifrm.contentWindow.document.URL == "http://www.ratebeer.com/signin/") {
		firstLoad = false;
		ifrm.parentNode.removeChild(ifrm);
		ifrm = null;
		
		if (++count == limit) return;
		console.log("c? " + count + " " + limit);
		
		createiFrame();
	} else {
		document.location.reload(true);
	}
}

function createiFrame() {
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("onload", 
		"loadComplete();");
	ifrm.setAttribute("src", "http://www.ratebeer.com/login.asp");
	ifrm.style.width = 640+"px";
	ifrm.style.height = 480+"px";
	ifrm.style.position = "absolute";
	ifrm.style.left = "0px";
	ifrm.style.top = "0px";
	document.body.appendChild(ifrm);
}

createiFrame();