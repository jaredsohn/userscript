// ==UserScript==
// @name        Facebook Chat Unbubbler
// @namespace   https://userscripts.org/users/yokljo
// @description Fixes the Facebook chat boxes so the messages aren't in speech bubbles.
// @include     https://www.facebook.com/*
// @version     1
// @grant       none
// ==/UserScript==

var css = document.createElement("style");

css.type = "text/css";

css.innerHTML = "\
/* Me */\
._50dw {\
	background: #EEDDDD !important;\
	margin-left: 0 !important;\
	margin-right: 0 !important;\
	border-right: 4px solid red;\
	padding-left: 25px;\
	margin-bottom: 1px !important;\
}\
/* Them */\
._50kd {\
	background: #DDDDEE !important;\
	border-left: 4px solid blue;\
	border-right: none;\
	padding-left: 5px;\
	clear: both;\
}\
._kso {\
	background: none;\
}\
\
._kso:after, ._kso:before {\
	content: none;\
	visibility: hidden;\
	display: none;\
}\
\
._50kd ._kso {\
	background: none;\
}\
\
.conversation .messages ._kso {\
	max-width: 100% !important;\
	border: none;\
	-moz-border-radius: 0;\
	border-radius: 0;\
	box-shadow: none;\
	border-top: 1px solid #EEEEEE;\
	display: inline-block;\
}\
\
/* Person is writing message ... bubble */\
._51lq ._50kd ._510v {\
	margin-left: 35px;\
}\
\
.conversation .messages ._kso:first-of-type {\
	border-top: none;\
}\
\
._50dw .messages {\
	margin-left: 0px;\
}\
/* Profile icon */\
._50ke {\
	display: none;\
	visibility: hidden;\
	max-width: 38px;\
	display: block;\
	height: auto;\
}\
._50kd ._50ke {\
	display: block;\
	visibility: visible;\
	float: left;\
	max-width: 35px;\
	position: relative;\
	margin-right: 30px;\
}\
/*.profileLink, .profilePhoto {\
	visibility: hidden;\
	display: none;\
}*/\
/* Day separator */\
._511m {\
	background: none;\
}\
._511n {\
	background: none !important;\
	color: black !important;\
}\
._50x5 {\
	color: #8888BB;\
	top: -13px;\
}\
.fbDockChatTabFlyout .fbNubFlyoutBody {\
	background: #EEEEEE;\
}\
";

document.body.appendChild(css);
