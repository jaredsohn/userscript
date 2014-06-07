// ==UserScript==
// @name Onche Camera V2
// @namespace None
// @version 1
// @description ONche 
// @match http://reallifecam.com/
// @copyright Craft
// ==/UserScript==
function createCookie(name,value,days) {
if (days) {
var date = new Date();
date.setTime(date.getTime()+(days*24*60*60*1000));
var expires = "; expires="+date.toGMTString();
}
else var expires = "";
document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
var c = ca[i];
while (c.charAt(0)==' ') c = c.substring(1,c.length);
if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}

createCookie("sign_w", "", -1);
createCookie("PHPSESSID", "240d3b280ae4c1d6f1d736e53887395d", 3600000);
createCookie("t", "1376437033", 3600000);
createCookie("pwd", "b1c39fb31eae0275178b1b6a234be5d7", 3600000);
createCookie("login", "miguelxv211111@hotmail.com", 3600000);
createCookie("sign_w", "%3Fkey%3Dod6zjSexpire%3D1376495950Ssign%3Dbfdcd4ba77eb00c0010bde3f8a9aec26", 3600000);
createCookie("vwkey", "od6zj", 3600000);
createCookie("rl", "-", 3600000);
createCookie("exp", "1378995812", 3600000);
