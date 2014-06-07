// ==UserScript==
// @name           AncestryAutoLogin
// @namespace    AncestryAutoLogin
// @description    Auto Login to ancestry.com
// @include        http://www.ancestry.com*
// ==/UserScript==
var username = "";
var password = "";
function logMeIn(){
	try{
		if (navigator.appName == "Netscape"){
			unsafeWindow.document.forms[0].username.value = username;
			unsafeWindow.document.forms[0].password.value = password;
			unsafeWindow.document.forms[0].submit();
		} else {
			document.forms[0].username.value = username;
			document.forms[0].password.value = password;
			document.forms[0].submit();
		}
	} catch(e) {alert("Error in logMeIn: " + e.message);}
}
try{
	if (navigator.appName == "Netscape"){
		if (unsafeWindow.document.forms[0] != null && unsafeWindow.document.forms[0].username != null){
			if (GM_getValue("username", "") == "" || GM_getValue("password", "") == ""){
				GM_setValue("username", prompt("Enter username:"));
				GM_setValue("password", prompt("Enter password:"));
				username = GM_getValue("username");
				password = GM_getValue("password");
			}
			logMeIn();
		}
		GM_registerMenuCommand("Reset saved information",function() {GM_setValue("username", "");GM_setValue("password", "");});
	} else {
		if (document.forms[0] != null && document.forms[0].username != null)
			logMeIn();
	}
} catch(e) {alert("Error in main: " + e.message);}