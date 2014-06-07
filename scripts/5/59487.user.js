// ==UserScript==
// @author		Arias
// @name		Travian Signature (works on every server) Arabic
// @Translation         Dream1 (مـنـصـور الـعـتـيـبـي)
// @namespace		http://userscripts.org/
// @description		Use it to make auto signature when writing msg.
// @include		http://*.travian.*/nachrichten.php*
// @version		1.0
// ==/UserScript==



/*
Edit please
*/
var sig3 = GM_getValue("hi")
var sig2 = GM_getValue("sign")
var sig = GM_getValue("name")

// Standard, dont change
var mess = document.getElementById('igm');
if (mess) {
	mess.innerHTML = sig3 + "\n\n\n\n"+sig2 + "\n"+sig + mess.innerHTML;
}

// GM_registerMenuCommand

	GM_registerMenuCommand("توقيع ترافيان: تغيير الأسم", promptName);
	GM_registerMenuCommand("توقيع ترافيان: تغيير التوقيع", promptSign);
	GM_registerMenuCommand("توقيع ترافيان: تغيير الترحيب", promptHi);

				function promptName(){
			var name1 = prompt("أكتب أسمك",GM_getValue("name"));
			GM_setValue("name",name1)
		}
		
					function promptSign(){
			var sign1 = prompt("أكتب توقيعك",GM_getValue("sign"));
			GM_setValue("sign",sign1)
		}
		
					function promptHi(){
			var hi1 = prompt("أكتب \"ترحيبك\"",GM_getValue("hi"));
			GM_setValue("hi",hi1)
		}