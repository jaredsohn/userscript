// ==UserScript==
// @name           Google Adsense Login Drop-Down
// @namespace      75243
// @description    Allows to have multiple accounts to be chosen at the adsense login page, also hides the password field
// @include		http://*.google.co*
// @include		https://*.google.co*
// ==/UserScript==

names = new Array("Name1,","Name2");
email = new Array("login1","login2");
var i,k;
window.myLogin = null;
window.myPassw = null;
emailOptions = new Array();


function gm_xpath(what,where) {
	return document.evaluate(what,where,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

myLogin = gm_xpath("//input[@name='Email']",document);
myLogin = (myLogin)? myLogin.snapshotItem(0) : null;
myPassw = gm_xpath("//input[@name='Passwd']",document);
myPassw = (myPassw)? myPassw.snapshotItem(0) : null;


window.fillLogin = function() {
	var emailDrp = document.createElement("select");
	emailDrp.setAttribute("name","Email");
	emailDrp.setAttribute("style","width:15em");
	
	for (var i in names) {
		emailOptions[i] = document.createElement("option")
		emailOptions[i].setAttribute("value",(email[i]+"@gmail.com"));
		emailOptions[i].innerHTML = (names[i]);
		emailDrp.appendChild(emailOptions[i]);
		document.getElementById("Passwd").value = "**password here**";
		
	}
	emailDrp.appendChild(emailOptions[i]);
	myLogin.parentNode.replaceChild(emailDrp, myLogin);
	document.getElementById("Passwd").parentNode.parentNode.style.display = 'none';
}

window.killLogin = function(elm) {
	var drpText = document.createElement("input");
	drpText.setAttribute("type","text");
	drpText.setAttribute("name","Email");
	drpText.setAttribute("style","width:10em");	
	elm.parentNode.replaceChild(drpText, elm);
	drpText.focus();
}


if (myLogin && myPassw){ 
	fillLogin();
	myPassw.setAttribute("style","width:10em");
	setTimeout("myPassw.focus()",100);
}

