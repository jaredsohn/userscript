// ==UserScript==
// @name          Mail.Ru - Glass for 'Comics'
// @namespace     http://userstyles.org
// @version		2013.10.28
// @icon        http://i.imgur.com/MfoptX5.png
// @require    http://usocheckup.dune.net/179956.js
// @downloadURL		https://userscripts.org/scripts/source/179956.user.js
// @updateURL		https://userscripts.org/scripts/source/179956.meta.js
// @description	  glassy style for email - works best with Comics theme selected in the settings https://e.mail.ru/settings/themes
// @author        BskyB
// @homepage      http://userstyles.org/styles/94041
// @include       https://e.mail.ru/*
// @include       http://e.mail.ru/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".theme {\n    background-color: rgb(101, 110, 121) !important;\n    background-image: url(\"http://imgur.com/a5oIdvO.jpg\") !important;\n    background-repeat: repeat !important;\n    background-position: center center !important;\n    background-attachment: fixed !important;\n    background-size: cover !important;\n}\n.infobar_folder-description, #SpamBlackInfo, .page .footer_portal-footer {\ndisplay:none !important;\n}\n.portal-footer, #ReadMsgBottom, #ReadMsgBody, .mr_read__top, .x-ph, .messagelist-wrapper, .leftcol, .toolbar, .leftcol__sep-wrapper, .portal-menu {\nbackground:none repeat scroll 0% 0% rgba(26, 13, 25, 0.6) !important;\ncolor:white !important;\n}\n.w-x-ph {\nbackground:none repeat scroll 0% 0% transparent !important;\ncolor:white !important;\n}\n.portal-menu__search__label, .portal-menu__search__button, .portal-menu__search__advanced, .portal-menu__search__label__wrapper, .portal-menu__search__label__wrapper__inner-wrapper, .button-a, .button-a:focus, .button-a:link, .button-a:visited, .menu__item__link_act, .menu__item__link_act:active, .menu__item__link_act:focus, .menu__item__link_act:hover, .menu__item__link_act:link, .menu__item__link_act:visited {\nbackground:none repeat scroll 0% 0% rgba(126, 113, 125, 0.6) !important;\ncolor:white !important;\n}\n.messageline_unread, .menu__item__link:hover, .button-a:hover, .messageline:hover, .messageline_selected {\nbackground:none repeat scroll 0% 0% rgba(126, 113, 125, 0.8) !important;\n}\n.mr_read__title, .mr_read__fromf, .x-ph__menu__button__text, .x-ph__link, .x-ph__link:link, .menu__item__link, .menu__item__link:active, .menu__item__link:focus, .menu__item__link:hover, .menu__item__link:link, .menu__item__link:visited, .messageline__body__link, .messageline__body__link:link, .messageline__body__link:visited, .messageline__body__link:active, .messageline__body__link:focus {\n    color: rgb(253, 247, 242) !important;\n}\n.messageline:hover .messageline__body__link:hover .contactline__body__name, .messageline:hover .messageline__body__link:hover .messageline__body__name, .messageline:hover .messageline__body__link:hover .messageline__body__subject, .messageline:hover .messageline__body__link:hover .messageline__body__filesize, .messageline:hover .messageline__body__link:hover .messageline__folder {\n    color: rgb(243, 237, 232) !important;\n}";
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