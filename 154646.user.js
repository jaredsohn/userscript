// ==UserScript==
// @name           argus bypass
// @description    bypasses argus
// @version        1.0
// @author         Noah Witt
// @license        all rights reserved
// @grant          none
// @include        http://www.argusleader.com/
// ==/UserScript==
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
setcookie("EMETA_NCLICK",1,1);
console.log("EMETA_NCLICK reset to 1");