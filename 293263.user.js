// ==UserScript==
// @icon http://www.majstorov.info/images/prc.jpg
// @name       Ubi glupi Lajkuj da vidis!!!
// @version    0.22
// @author		r0073rr0r
// @namespace  http://userscripts.org/users/550051
// @downloadURL http://userscripts.org/scripts/source/293263.user.js
// @updateURL http://userscripts.org/scripts/source/293263.meta.js
// @description  Mrzim sajtove koji te teraju da lajkujes kako bi video sadrzaj. Eo male skripte koja Vam moze pomoci da izbegnete tako nesto.
// @match      http://*/*
// @match      https://*/*
// @copyright  2014+, Velimir Majstorov
// ==/UserScript==

/* Sajtovi poput Karabaja.Com*/
if (document.getElementById("cboxOverlay")) {
	document.getElementById("cboxOverlay").removeAttribute("style");
	document.getElementById("cboxOverlay").style.display="none";
}
if (document.getElementById("colorbox")) {
	document.getElementById("colorbox").removeAttribute("style");
	document.getElementById("colorbox").style.display="none";
}
if (document.getElementById("item_container")) {
	$("#item_container").hide();
}
if (document.getElementById("real_container")) {
	$("#real_container").show();
}

/* Secure.FejsApp */
if (document.getElementById("watermark")) {
	document.getElementById("watermark").removeAttribute("style");
	document.getElementById("watermark").style.display="none";
}
if (document.getElementById("imageHolder")) {
	document.getElementById("imageHolder").removeAttribute("style");
	document.getElementById("imageHolder").style.display="inline";
}
if (document.getElementById("canvasHolder")) {
	document.getElementById("canvasHolder").removeAttribute("style");
	document.getElementById("canvasHolder").style.display="none";
}

/*  gifovi.net */
if (document.getElementById("zt_locker")) {
	document.getElementById("ztimg").removeAttribute("style");
}
