// 
// 
//
// ==UserScript==
// @name          Brandons Google
// @namespace     Www.myspace.com/dangerskater911
// @description	  Brandon
// @include       http://*google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i7.photobucket.com/albums/y257/dangerskater911/f.gif');
//logo.setAttribute('height', '68');
//logo.setAttribute('width', '269');
logo.setAttribute('alt', 'Google');
logo.setAttribute('title', 'Google');

//replace the im felling lucky title
var lucky = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();
lucky.setAttribute('value', 'Luckyness?');


// new stylesheet
s  = ".h{font-size: 20px;}\n";
s+= ".q{color:#0000cc;}\n";
s+= "a{color:Red !important;}\n";
s+= "body,td,a,p,.h{font-family:comic sans ms; color:red;background-color:black;text-decoration:none;}\n";
s+= "a:hover{background-color:Red; border:3px double black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input{background-color:Red; border:3px double black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input:hover{background-color:black; border:3px double Red; -moz-border-radius:15px; color:Red !important;}\n";
s+= "table tr td span{color:Red !important;}\n";
s+= ".modbox, .modbox_e {margin-bottom:20px;background-color:black;}\n";
s+= "font{color:Red !important;}\n";
s+= "#setupbox{-moz-border-radius:15px; border:3px double Red;}\n";
s+= ".medit{background-color:black !important; border:3px double Red !important;border-left:0px black solid !important;}\n";
s+= ".mttl{background-color:black !important; border:3px double Red !important;border-right:0px black solid !important;}\n";




GM_addStyle(s);
