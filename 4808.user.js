// 
// 
//
// ==UserScript==
// @name          Google Kuztom
// @namespace     crazyskater[dot]com
// @description	  Google kuztom
// @include       http://*google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i30.photobucket.com/albums/c340/sageroberts/googleimageone.jpg');
//logo.setAttribute('height', '279');
//logo.setAttribute('width', '376');
logo.setAttribute('alt', 'Google');
logo.setAttribute('title', 'Google');

//replace the im felling lucky title
var lucky = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();
lucky.setAttribute('value', 'I\'m feeling queer');


// new stylesheet
s  = ".h{font-size: 20px;}\n";
s+= ".q{color:#0000cc;}\n";
s+= "a{color:black !important;}\n";
s+= "body,td,a,p,.h{font-family:tahoma; color:#12fcf8;background-color:#585e5e;text-decoration:none;}\n";
s+= "a:hover{background-color:none; border:opx; -moz-border-radius:0px; color:black !important;}\n";
s+= "input{background-color:white; border:0px; -moz-border-radius:0px; color:black !important;}\n";
s+= "input:hover{background-color:black; border:0px; -moz-border-radius:0px; color:white !important;}\n";
s+= "table tr td span{color:white !important;}\n";
s+= ".modbox, .modbox_e {margin-bottom:20px;background-color:black;}\n";
s+= "font{color:red !important;}\n";
s+= "#setupbox{-moz-border-radius:0px; border:0px double white;}\n";
s+= ".medit{background-color:white !important; border:0px !important;border-left:0px black solid !important;}\n";
s+= ".mttl{background-color:white !important; border:0px !important;border-right:0px black solid !important;}\n";




GM_addStyle(s);