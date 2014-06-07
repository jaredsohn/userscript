// ==UserScript==
// @name          Google Send to Phone
// @namespace     http://www.devdive.com/
// @include       http://*
// @include       https://*
// @description	  Use the Google Send to Phone service without having to install the Firefox extension.
//                Select some text and press Ctrl+Q to use the script. You can change this key by going to 
//                Use Tools > User Script Commands > Google Send to Phone Set Key. (Ctrl is fixed, you can change
//                the other key). On the Google Send to Phone page, click on the "« Back"
//                link to arrive at the page you were in. This is because the Google Send to Phone page uses
//                redirects, which ultimately breaks the back button.
// ==/UserScript==

var ctrlPressed = false;
GM_registerMenuCommand("Google Send to Phone Set Key",updateKey);

function updateKey() {
	var k = window.prompt("Enter key to be used with Ctrl for Google Send to Phone");
	k=k.toUpperCase();
	GM_setValue("key",k);
}

document.addEventListener('keydown', function(event) {
	var k=GM_getValue("key","Q");
	k=k.charCodeAt(0);
	if(event.keyCode==17) {
		ctrlPressed = true;
		return;
	}
	if(event.keyCode==k && ctrlPressed) {
		var selObj = window.getSelection();
		var text = escape(selObj.toString());
		if(text==null || text.length<1) return;
		var URI="http://toolbar.google.com/send/sms/index.php?msgsms="+text;
		window.location.href=URI;		
	}	
}, true);

document.addEventListener('keyup', function(event) {
	if(event.keyCode==17) {
		ctrlPressed = false;
	}	
}, true);



if(window.location=="http://www.google.com/sendtophone") {
	var h1= document.getElementsByTagName("h1");
	h1[0].innerHTML = "Google Send To Phone" + "&nbsp;&nbsp;&nbsp;&nbsp;<small><a href='javascript:history.go(-2);'>&laquo; Back</a></small>";
}




