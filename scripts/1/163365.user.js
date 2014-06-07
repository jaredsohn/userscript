// ==UserScript==
// @name           Thymer.com addons 
// @namespace      Daniel Unterberger 
// @description    added features to thymer.com 
// @version        1.1
// @include        http*://*thymer.com/*
// @grant          GM_addStyle
// ==/UserScript==
setTimeout( function(){
var $ = unsafeWindow.jQuery;

// init global status (jquery 1.4.4 is used)
$.separators_compact = 1; 

// register dblclick callback on double-arrows
$('#input_row .force_draggable').dblclick( function(){
	if ( $.separators_compact == 1) {
		$.todolist.ajaxEditSeparators('0,1,2,3,4,5,6,14,5000');
	} else {
		$.todolist.ajaxEditSeparators('0');
	}
	$.separators_compact = 1 - $.separators_compact; /* toggle 1/0 */
});

GM_addStyle('body, td, input, textarea {\
	font-family:helvetica neue !important; 	\
	zoom:0.95;\
}\
\
#todo_list {\
	overflow:auto; /* auto clear floats inside */\
}\
#control_menu {\
	opacity:0.0;\
}\
#control_menu:hover {\
	opacity:1.0;\
}\
#header {\
	padding-top:10px;\
	height:5px;\
	opacity:0;\
	overflow:hidden;\
}\
#header:hover, #header:focus {\
	height:auto;\
	opacity:1;\
	overflow:auto;\
}\
span.coltag {\
	float:right; \
	border-radius:6px;\
	margin-right:3px;\
	height:23px;\
}\
a.projecttag, \
span.projecttag {\
	border-radius:6px;\
	padding:2px !important;\
	float:right;\
	min-width:50px;\
	margin-left:3px;\
	margin-right:4px;\
	text-align:center;\
	background:#EEEECC !important;\
}\
\
a.usertag2, \
span.usertag2 {\
	border-radius:6px;\
	padding:2px !important;\
	float:right;\
	margin-left:3px;\
	margin-right:4px;\
}\
.large_separator, .large_separator_gray {\
	line-height:23px !important;\
	height:23px !important;\
	padding-top:5px !important;\
	margin-bottom:1px !important;\
	overflow-y:hidden;\
}\
.due img {\
	float:right; \
	padding-right:20px;\
}\
.large_separator span, .large_separator_gray span {\
	margin-left:2px;\
}\
#add {\
	background: #FEFEFE !important;\
}\
img.searchbutton, .button , .gobutton, .okbutton{\
	border-radius:4px;\
}\
.inactive_flag, .active_flag,  {\
	border-radius:3px;\
} ');

} , 500 ); 
