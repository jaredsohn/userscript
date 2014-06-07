// ==UserScript==
// @name          Buttons on Userscript Forums
// @description   Makes the edit post and delete post links into buttons so thay stand out more. 
// @include       http://userscripts.org/topics/*
// ==/UserScript==
GM_addStyle('\
table.posts tbody tr td a.utility {\
	color: black !important;\
	font-size: 11px !important;\
	border-width: 3px;\
	border-style: outset;\
	border-color: white;\
	padding-left: 5px;\
	padding-right: 5px;\
	padding-top: 0px !important;\
	padding-bottom: 0px !important;\
	text-decoration: none !important;\
	-moz-border-radius: 11px;\
	text-transform: lowercase;\
	background: lightgray;\
	width: 72px;\
	margin-top: 5px;\
}\
table.posts tbody tr td a.utility:active {\
	border-style: inset;\
}\
table.posts tbody tr td a.utility:hover {\
	color:white !important;\
	background: black;\
	text-transform: capitalize;\
}\
.useragent{\
	margin-top: 5px;\
}\
.edit{\
	position: relative;\
	top: -3px;\
}\
.edit img {\
	float:right !important;\
	padding-right: 30px;\
}\
.edit a.utility {\
	max-width: 8px !important;\
}');