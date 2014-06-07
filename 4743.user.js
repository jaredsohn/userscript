// 
// 
//
// ==UserScript==
// @name          Google
// @namespace     google
// @description	  Google
// @include       http://*www.google.com/*
// ==/UserScript==



// redirect away from the collect server
if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

var logo = document.evaluate("//img[@alt='Google'] | //img[@alt='Go to Google Home']", document, null, 0, null).iterateNext();
//var logo = document.evaluate("//img[@border='0']", document, null, 0, null).iterateNext();

//the new logo
logo.setAttribute('src', 'http://i6.photobucket.com/albums/y244/skoolsucks74/google.png');
//logo.setAttribute('height', '110');
//logo.setAttribute('width', '276');
logo.setAttribute('alt', 'Google');
logo.setAttribute('title', 'Google');

//replace the im felling lucky title
var lucky = document.evaluate("//input[@name='btnI']", document, null, 0, null).iterateNext();
lucky.setAttribute('value', 'Who uses this button?');


// new stylesheet
s  = ".h{font-size: 20px;}\n";
s+= ".q{color:#0000cc;}\n";
s+= "a{color:black !important;}\n";
s+= "body,td,a,p,.h{font-family:tahoma; color:black;background-color:6B8E23;text-decoration:none;}\n";
s+= "a:hover{background-color:458B00; border:3px solid black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input{background-color:458B00; border:3px solid black; -moz-border-radius:15px; color:black !important;}\n";
s+= "input:hover{background-color:458B00; border:3px solid black; -moz-border-radius:15px; color:black !important;}\n";




GM_addStyle(s);