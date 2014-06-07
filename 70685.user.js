// ==UserScript==
// @name           eRepublik Skinner
// @namespace      eskin
// @description    Customize eRepublik design easily :)
// @include        http://ww*.erepublik.com/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @author		   mobster1930
// ==/UserScript==

// Enter your skin map URL here
var mapURL = 'http://mafioso.nihplod.com/erepublik/map-erepublik-logged.png';

// Enter your advisor map here
var advisorURL = 'http://mafioso.nihplod.com/erepublik/advisor_bg_big.png';

var injectCSS = 
'#menu ul li#menu1 ul li a:hover, #menu ul li#menu2 ul li a:hover, #menu ul li#menu3 ul li a:hover, #menu ul li#menu4 ul li a:hover, \
background: url(' + mapURL + ') 0px -899px no-repeat;\
}\
#menu ul li#menu4 li.new_feature a {\
    background:url(/images/parts/nf_button.png) no-repeat;\
}\
#menu ul li#menu1 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu2 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu3 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu4 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu5 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu6 a {\
	background-image: url(' + mapURL + ');\
}\
#menu ul li#menu1 ul li a, #menu ul li#menu2 ul li a, #menu ul li#menu3 ul li a, #menu ul li#menu4 ul li a, #menu ul li#menu5 ul li a {\
	background: url(' + mapURL + ') 0px -940px no-repeat;\
}\
#logo a {\
background:url(' + mapURL + ') no-repeat 0px 0px;\
}\
#clock .time {\
background: url(' + mapURL + ') -755px -159px no-repeat;\
}\
#clock .date {\
background: url(' + mapURL + ') -755px -140px no-repeat;\
}\
#clock .eday{\
background: url(' + mapURL + ') -755px -178px no-repeat;\
}\
#searchholder input.field {\
background: url(' + mapURL + ') 0px -110px no-repeat;\
}\
#searchholder input.submit {\
background:url(' + mapURL + ') -261px -110px no-repeat;\
}\
#miniprofile .start {\
background: url(' + mapURL + ') no-repeat -153px -22px;\
}\
#miniprofile .core {\
background: url(' + mapURL + ') no-repeat -955px 0px;\
}\
#miniprofile .end {\
background: url(' + mapURL + ') no-repeat -153px -28px;\
}\
#wellnessmeter {\
background: url(' + mapURL + ') no-repeat 0px -143px;\
}\
#wellnessmeter.woman {\
background: url(' + mapURL + ') no-repeat -70px -143px;\
}\
#wellnessmeter .meter.sm {\
background: url(' + mapURL + ') no-repeat -140px -143px;\
}\
#wellnessmeter .meter.sw {\
background: url(' + mapURL + ') no-repeat -210px -143px;\
}\
ul.tabs li a {\
background: url(' + mapURL + ') left -768px #eee no-repeat;\
}\
ul.tabs li a span {\
background: url(' + mapURL + ') right -768px no-repeat;\
}\
ul.tabs li a:hover, ul.tabs li a.on {\
background: url(' + mapURL + ') left -801px #505050 no-repeat;\
}\
ul.tabs li a:hover span, ul.tabs li a.on span {\
background: url(' + mapURL + ') right -801px no-repeat;\
}\
.ico-shout-small{\
background: url(' + mapURL + ') -35px -466px no-repeat;\
}\
.ico-logo-ei{\
background: url(' + mapURL + ') -140px -194px no-repeat;\
}\
.btn-arrowspager-left{\
background: url(' + mapURL + ') -56px -488px no-repeat;\
}\
.btn-arrowspager-right{\
background: url(' + mapURL + ') -68px -488px no-repeat;\
}\
.round_btt-start {\
background:  url(' + mapURL + ') 0px -834px no-repeat;\
}\
.round_btt-end {\
background: url(' + mapURL + ') right -867px no-repeat;\
}\
#footer {\
background: url(' + mapURL + ') 0px -234px no-repeat;\
}\
.shoutsleft {\
background: url(' + mapURL + ') 0px -466px no-repeat;\
}\
#miniprofile a.msg, a.newmsg, a.alert, a.newalert, a.subs, a.newsubs {\
background:url(' + mapURL + ') no-repeat -199px 0px;\
}\
#miniprofile a.logout {\
background: url(' + mapURL + ') no-repeat -755px 0px;\
}\
#advisor{\
background:url(' + advisorURL + ') no-repeat;\
}'

// Thanks to "Dive into Greasemonkey"
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Inject our modified CSS
addGlobalStyle(injectCSS);

// Add the donate button
$("#menu5 ul li:eq(5)").after('<li><a href="http://www.erepublik.com/en/citizen/donate/items/1358808">Help eSkin!</a></li>');