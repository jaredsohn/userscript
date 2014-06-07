// ==UserScript==
// @name iK2's MegaUpload Glitch (Direct Download without captcha or wait time)
// @author K2
// @namespace
// @description No Captcha, Wait time or anything just download
// @include http://www.megaupload.com/*
// ==/UserScript==

window.location.href=window.location.href.split("?")[0]+'mgr_dl.php?'+window.location.href.split("?")[1];