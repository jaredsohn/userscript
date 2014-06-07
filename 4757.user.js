// 
// 
//
// ==UserScript==
// @name          Custom Google Page
// @namespace     Mr. Amazering
// @description	  A custom google homepage. (Personalized Home looks pretty lame)
// @include       http://*google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i21.photobucket.com/albums/b267/killaskittle/google.jpg');
//logo.setAttribute('height', '279');
//logo.setAttribute('width', '376');
logo.setAttribute('alt', 'Google');
logo.setAttribute('title', 'Google');

//replace the im felling lucky title
var lucky = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();
lucky.setAttribute('value', 'Take your chances');


// new stylesheet
s  = ".h{font-size: 20px;}\n";
s+= ".q{color:#0000cc;}\n";
s+= "a{color:white !important;}\n";
s+= "body,td,a,p,.h{font-family:tahoma; color:white;background-color:#666666;text-decoration:none;}\n";
s+= "a:hover{background-color:444444; border:3px; -moz-border-radius:15px; color:black !important;}\n";
s+= "input{background-color:#444444; border:3px; -moz-border-radius:15px; color:black !important;}\n";
s+= "input:hover{background-color:#444444; border:3px; -moz-border-radius:15px; color:white !important;}\n";
s+= "table tr td span{color:white !important;}\n";
s+= ".modbox, .modbox_e {margin-bottom:20px;background-color:#666666;}\n";
s+= "font{color:black !important;}\n";
s+= "#setupbox{-moz-border-radius:15px; border:3px;}\n";
s+= ".medit{background-color:#6666666 !important; border:3px; !important;border-left:0px black solid !important;}\n";
s+= ".mttl{background-color:#666666 !important; border:3px double white !important;border-right:0px black solid !important;}\n";




GM_addStyle(s);
