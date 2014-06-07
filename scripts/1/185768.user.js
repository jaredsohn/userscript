// ==UserScript==
// @name        Google Plus fH Style
// @namespace   NoNameSpace
// @homepage      http://userstyles.org/styles/89565
// @include       http://plus.google.com/*
// @include       https://plus.google.com/*
// @include       http://*.plus.google.com/*
// @include       https://*.plus.google.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "\
.CQb {\
	background-image: url('https://lh3.googleusercontent.com/-w2lqck_ksNg/Uy8ln0tw6VI/AAAAAAAAi_A/suaZxqHDYTU/w369-h294-no/40400680_big_p0.png');\
	background-repeat: no-repeat;\
	background-size: auto 300px;\
	background-position: center;\
}\
.axb.m4a {\
	visibility: hidden;\
}\
.Kza {\
	position: relative;\
	top: -45px;\
}\
#contentPane, .o-xc-Sya.tSa {\
	background-color:rgba(40, 40, 40, 0.2)!important;\
	background:url('https://lh5.googleusercontent.com/-AkkivI96alc/UEJQzeZ9MAI/AAAAAAAAAW8/5QYIYFGLjiM/s0-I/Old%2Bentrance%2Bof%2Bthe%2BAperture%2BScience%2BInnovators.jpg') fixed no-repeat 0px 51px !important;\
}\
#gbq1, .gb_hb, .gb_na, .rw.Uc.ZJ.YJ.pr, .zgc.YZb, .Ege.qMc{\
	background-color:rgba(245, 245, 245, 1)!important;\
}\
.Pza.B3a.QA.mw.ti, .Ypa.jw.Yc.am {\
	background-color:rgba(245, 245, 245, 0)!important;\
}\
.d-k-l.b-c.b-c-U.JFd.JZ, .d-k-l.b-c.b-c-U.Yic.JZ, .F4 {\
	display:none!important;\
}﻿\
";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
