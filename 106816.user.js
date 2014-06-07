// ==UserScript==
// @name	Google Sign out button
// @description	Add a button in the upper-right corner to log out of Google pages (Gmail, Google+, Google...)
// @include	http*://*.google.*/*
// @exclude	http*://accounts.google.com/ServiceLogin?*
// @version	0.6.3
// @grant	none
// ==/UserScript==

(function(){
function createButton(signOutText, signOutLink) {
	var div = document.createElement('div');
	div.style.paddingLeft = "14px";
    div.style.display = "inline-block";
	div.id = "GoogleSignOutButtonUserscript";

	var a = document.createElement('a');

	if (location.host == 'mail.google.com') {
		a.href = "https://mail.google.com/mail/?logout";
	} else {
		a.href = signOutLink;
	}
	//ignore logout href and press the real logout button
	a.setAttribute('onclick',"document.getElementById('gb_71').click();");
	a.id = "GoogleSignOutButtonLink";
	a.style.color = "#404040";
	a.style.textDecoration = "none";

	var innDiv = document.createElement('div');
	innDiv.id = "GoogleSignOutButtonDiv";
	innDiv.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
	innDiv.style.width = "60px";
	innDiv.style.lineHeight = "30px";
	innDiv.style.textAlign = "center";
	innDiv.style.borderRadius = "2px";
	innDiv.innerHTML = signOutText;

	document.styleSheets[0].insertRule('#GoogleSignOutButtonDiv:hover { background-color: rgba(0, 0, 0, 0.08) !important }', 0);
	document.styleSheets[0].insertRule('#GoogleSignOutButtonLink:hover { cursor: default }', 0);
	document.styleSheets[0].insertRule('#GoogleSignOutButtonLink:hover, #GoogleSignOutButtonLink:focus, #GoogleSignOutButtonLink:active { outline: 0 }', 0);

	a.appendChild(innDiv);
	div.appendChild(a);

	return {div:div}
}

function addButton(ver) {
	try {
		var doc = window.top.document;
	} catch(e) { return; }

	if (document.getElementById('GoogleSignOutButtonUserscript')) {
		window.top.document.body.removeEventListener ("DOMNodeInserted", addButton, false);
		return;
	}

	// gb_70: "Sign In" button
	if (document.getElementById('gb_70'))
		return;

	var signOutText = "Sign out";
	var signOutLink = "https://www.google.com/accounts/Logout?continue="+location.protocol+"//"+location.host+"/";
	if (doc.getElementById('gb_71')) {
		signOutText = doc.getElementById('gb_71').innerHTML;
		signOutLink = doc.getElementById('gb_71').href;
	}
	var logoutButton = createButton(signOutText, signOutLink);
	document.getElementById('gbwa').parentNode.appendChild(logoutButton.div);

	//Remove the listener only if the button is added
	if (document.getElementById('GoogleSignOutButtonUserscript'))
		window.top.document.body.removeEventListener ("DOMNodeInserted", addButton, false);
}

try {
	if (location.host == 'mail.google.com') {
		window.top.document.body.addEventListener("DOMNodeInserted", addButton, false);
		addButton();
	} else {
		addButton();
	}
} catch(e){}

})()