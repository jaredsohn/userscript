// ==UserScript==
// @name           Lock Out
// @namespace      Douglas
// @include        *
// ==/UserScript==

GM_registerMenuCommand("Lock Out - Change Password", function() {
	GM_setValue("pass", (prompt("Set the password:")||""));
});
if (GM_getValue("un_lock","") == "unlocked"){
	GM_registerMenuCommand("Lock Out - Lock It", function() {
		GM_setValue("un_lock","locked");
	});
}else{
	GM_registerMenuCommand("Lock Out - Unlock It", function() {
		GM_setValue("un_lock","unlocked");
	});
	while(GM_getValue("pass","default") != prompt("Password:")) {}
}