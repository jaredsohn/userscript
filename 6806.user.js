// 
// 
//
// ==UserScript==
// @name          louggle customized
// @namespace     louggle[dot]com
// @description	 louiggle custom
// @include       http://*google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i17.tinypic.com/49jszg2.jpg');
//logo.setAttribute('height', '68');
//logo.setAttribute('width', '269');
logo.setAttribute('alt', 'Google');
logo.setAttribute('title', 'Google');

//replace the im felling lucky title
var lucky = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();
lucky.setAttribute('value', 'I\'m feeling myself lol');


// new stylesheet
s  = ".h{font-size: 20px;}\n";
s+= ".q{color:#0000cc;}\n";
s+= "a{color:326278 !important;}\n";
s+= "body,td,a,p,.h{font-family:comic sans ms; color:326278;background-color:black;text-decoration:none;}\n";
s+= "a:hover{background-color:326278; border:3px double black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input{background-color:326278; border:3px double black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input:hover{background-color:black; border:3px double 326278; -moz-border-radius:15px; color:326278 !important;}\n";
s+= "table tr td span{color:326278 !important;}\n";
s+= ".modbox, .modbox_e {margin-bottom:20px;background-color:black;}\n";
s+= "font{color:326278 !important;}\n";
s+= "#setupbox{-moz-border-radius:15px; border:3px double 326278;}\n";
s+= ".medit{background-color:black !important; border:3px double 326278 !important;border-left:0px black solid !important;}\n";
s+= ".mttl{background-color:black !important; border:3px double 326278 !important;border-right:0px black solid !important;}\n";




GM_addStyle(s);
