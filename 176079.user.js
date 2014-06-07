// ==UserScript==
// @name       Log Into ODN
// @namespace  http://theplaceboeffect.com/
// @version    0.1
// @description  enter something useful
// @match      http://onlinedebate.net
// @copyright  2012+, TPE
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

if (GM_getValue("OdnUsername") === undefined)
{
	var name = prompt("Enter ODN Username", "Type you name here");
    GM_setValue("OdnUsername",name);
}

if (GM_getValue("OdnPassword") === undefined)
{
	var name = prompt("Enter ODN Password", "******");
    GM_setValue("OdnPassword",name);
}

$("#navbar_username").val(GM_getValue("OdnUsername"));
$("#navbar_password").val(GM_getValue("OdnPassword"));
$("#cb_cookieuser_navbar").click()