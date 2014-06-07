// 
// 
//
// ==UserScript==
// @name          Google customized
// @namespace     jimbo[dot]com
// @description	  Google kuztom
// @include       http://*google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i16.tinypic.com/6aung61.jpg');
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
s+= "a{color:aa0ea5 !important;}\n";
s+= "body,td,a,p,.h{font-family:comic sans ms; color:aa0ea5;background-color:white;text-decoration:none;}\n";
s+= "a:hover{background-color:aa0ea5; border:3px double white; -moz-border-radius:15px; color:white !important;}\n";
s+= "input{background-color:aa0ea5; border:3px double white; -moz-border-radius:15px; color:white !important;}\n";
s+= "input:hover{background-color:white; border:3px double aa0ea5; -moz-border-radius:15px; color:aa0ea5 !important;}\n";
s+= "table tr td span{color:aa0ea5 !important;}\n";
s+= ".modbox, .modbox_e {margin-bottom:20px;background-color:white;}\n";
s+= "font{color:aa0ea5 !important;}\n";
s+= "#setupbox{-moz-border-radius:15px; border:3px double aa0ea5;}\n";
s+= ".medit{background-color:white !important; border:3px double aa0ea5 !important;border-left:0px white solid !important;}\n";
s+= ".mttl{background-color:white !important; border:3px double aa0ea5 !important;border-right:0px white solid !important;}\n";




GM_addStyle(s);

