// ==UserScript==
// @name           4chan black and blue
// @description    Changes the 4chan boards to a black and blue theme
// @namespace      http://userscripts.org/users/201444
// @include        *boards.4chan.org/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('\
html body form table#postForm.postForm {\
	margin-left: 15pt !important;\
}\
\
html body hr.abovePostForm, hr {\
	color: #0072BF !important;\
	border-color: #0072BF !important;\
}\
\
div#boardNavDesktop a, div#boardNavDesktopFoot a {\
    color: #8BCFFF;\
}\
\
div#boardNavDesktop, div#boardNavDesktopFoot {\
    color: #8BCFFF;\
}\
\
table.postForm > tbody > tr > td:first-child {\
	background-color: #0072BF;\
	border: 1px solid #001A2B;\
	color: #8BCFFF;\
}\
\
#content div[style="font-weight: bold; color: rgb(191, 0, 191);"] {\
	color: #BF00BF !important;\
	background-color: #BF00BF !important;\
}\
\
.replyContainer .highlight {\
	background-image: url(http://img51.imageshack.us/img51/5185/postgradhighlight.png) !important;\
	border-color: -moz-use-text-color #000B13 #000B13 -moz-use-text-color !important;\
	color:	#8BCFFF;\
}\
\
.boardTitle {\
	color:#8BCFFF;\
}\
\
.globalMessage {\
	color: green !important;\
}\
\
div.post {\
	margin: 20px 0;\
}\
\
a, a:visited, a:link {\
	color: #0072BF !important;\
}\
\
div.pagelist {\
    background: none repeat scroll 0 0 #1A1A1A;\
    border-color: #0072BF;\
	color: #8BCFFF;\
}\
\
div.sideArrows {\
	color: #0072BF;\
}\
\
div.postingMode {\
	background-color: #0072BF;\
}\
\
blockquote > span.quote {\
	color: #32CD32;\
}\
\
div.post div.postInfo span.postNum a:hover {\
	color: #8BCFFF !important;\
	text-shadow: 0 0 0.2em #0E5B8E;\
}\
\
a:hover, a link:hover {\
	color: #8BCFFF !important;\
	text-shadow: 0 0 0.2em #0E5B8E;\
}\
\
div#absbot, div#absbot a {\
	color: #8BCFFF !important;\
}\
\
span.spoiler {\
	background: none repeat scroll 0 0 #0E5B8E !important;\
	color: #0E5B8E !important;\
	box-shadow: 0 0 0.2em #004677;\
}\
\
div.post div.postInfo span.subject {\
	color: brown;\}');