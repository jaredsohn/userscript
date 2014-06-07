// ==UserScript==
// @author	  idea: zqqou  made: Dris
// @name          Travian Message Signature creater
// @namespace     http://userscripts.org/
// @description   This script add automatically signature to your messages.
// @include       http://*.travian.*/nachrichten.php*
// @version		  1.2
// ==/UserScript==

// Standard, dont change
var sig3 = GM_getValue("hi")
var sig2 = GM_getValue("sign")
var sig = GM_getValue("name")


var mess = document.getElementById('igm');
if (mess) {
	mess.innerHTML = sig3 + "\n\n\n\n"+sig2 + "\n"+sig + mess.innerHTML;
}
// Thx for Dream1
// GM_registerMenuCommand

	GM_registerMenuCommand("Your Name", promptName);
	GM_registerMenuCommand("Your Signature", promptSign);
	GM_registerMenuCommand("Your Hi", promptHi);

				function promptName(){
			var name1 = prompt("Name",GM_getValue("name"));
			GM_setValue("name",name1)
		}
		
					function promptSign(){
			var sign1 = prompt(Have a nice day:)",GM_getValue("sign"));
			GM_setValue("sign",sign1)
		}
		
					function promptHi(){
			var hi1 = prompt("Hello,"",GM_getValue("hi"));
			GM_setValue("hi",hi1)
		}