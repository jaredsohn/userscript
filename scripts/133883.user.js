// ==UserScript==
// @id             org.userscripts.users.warrenbank.facebook.fix_broken_css
// @name           facebook.com - fix broken css background images
// @description    facebook.com - fix broken css background images
// @version        2012.05.20
// @author         warrenbank
// @include        http*.facebook.com/*
// ==/UserScript==

(function(s){
	var head=document.getElementsByTagName('head')[0];
	var css=document.createElement('style');
	css.setAttribute('type','text/css');
	if(css.styleSheet){css.styleSheet.cssText=s;}
	else{var text=document.createTextNode(s);css.appendChild(text);}
	head.appendChild(css);
})(
	'.emote_img'																											+
		'{background-image:url("http://static.ak.fbcdn.net/rsrc.php/v2/yM/r/WlL6q4xDPOA.png") !important;}'					+
	'#fbRequestsJewel a.jewelButton,'																						+
	'.slimHeader #fbRequestsJewel a.jewelButton,'																			+
	'.slimHeader #fbRequestsJewel a.jewelButton:link,'																		+
	'.slimHeader #fbRequestsJewel a.jewelButton:active,'																	+
	'.slimHeader #fbRequestsJewel a.jewelButton:focus,'																		+
	'.slimHeader #fbRequestsJewel a.jewelButton:hover,'																		+
	'#fbMessagesJewel a.jewelButton,'																						+
	'.slimHeader #fbMessagesJewel a.jewelButton,'																			+
	'.slimHeader #fbMessagesJewel a.jewelButton:link,'																		+
	'.slimHeader #fbMessagesJewel a.jewelButton:active,'																	+
	'.slimHeader #fbMessagesJewel a.jewelButton:focus,'																		+
	'.slimHeader #fbMessagesJewel a.jewelButton:hover,'																		+
	'#fbNotificationsJewel a.jewelButton,'																					+
	'.slimHeader #fbNotificationsJewel a.jewelButton,'																		+
	'.slimHeader #fbNotificationsJewel a.jewelButton:link,'																	+
	'.slimHeader #fbNotificationsJewel a.jewelButton:active,'																+
	'.slimHeader #fbNotificationsJewel a.jewelButton:focus,'																+
	'.slimHeader #fbNotificationsJewel a.jewelButton:hover'																	+
		'{background-image:url("http://static.ak.fbcdn.net/rsrc.php/v2/yu/r/yo348KDuskF.png"); !important}'					+
	'.notifNegativeBase #fbRequestsJewel.openToggler a.jewelButton'															+
		'{background-image:url("http://static.ak.fbcdn.net/rsrc.php/v2/yn/r/B4dHZoy9k5r.png") !important;}'					+
	'.notifNegativeBase #fbMessagesJewel.openToggler a.jewelButton'															+
		'{background-image:url("http://static.ak.fbcdn.net/rsrc.php/v2/yT/r/u7q7zkpMqbd.png") !important;}'					+
	'.notifNegativeBase #fbNotificationsJewel.openToggler a.jewelButton'													+
		'{background-image:url("http://static.ak.fbcdn.net/rsrc.php/v2/y4/r/tPFmTGnotUu.png") !important;}'
);
