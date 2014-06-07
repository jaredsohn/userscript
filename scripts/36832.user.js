// ==UserScript==
// @name           Ask for confirmation before closing a last.fm page
// @namespace      http://userscripts.org/users/72113
// @include        http://www.last*fm*/*
// ==/UserScript==

//----------------------user options----------------------------------------
button="on";                //give the value "on" or "off" to that variable to display the button or not
checkbox_text='Page locked'; //Text displayed next to the checkbox
button_caption='Toggle page protection';
//--------------------------------------------------------------------------

//Reading the url
url=document.location.href;
domain=url.split('/')[3];
var isautostart=url.substring(url.length-9);

//Automatic protection of radio page when streaming
if (domain=="listen") { 
document.body.setAttribute("onbeforeunload","return document.title.split('-').length==3?'Currently playing: '+document.title.split('-')[0]+'-'+document.title.split('-')[1]:null;");
}


//Manual protection of artist,album,track,user pages with the checkbox defined later
if (domain=="music" || domain=="user" || domain=="event" || domain=="tag" || domain=="label") {
 document.body.setAttribute("onbeforeunload","return document.form_protect.protect.checked==true?'This page may be streaming a track, and has been locked':null;");

//Definition of the checkbox to protect manually artist,album,track,user page
 var block=document.getElementById("lfmPlayer_container");

 var stri="";
 if (button=="on") {stri='&nbsp;&nbsp;<BUTTON id="lockbutton" name="LOCK" type="button" onClick="document.form_protect.protect.checked=document.form_protect.protect.checked==true?false:true;">&nbsp;&nbsp;&nbsp;'+button_caption+'&nbsp;&nbsp;&nbsp;</BUTTON>'}

 block.innerHTML += '<form name="form_protect"><INPUT TYPE=CHECKBOX NAME="protect"> '+checkbox_text+stri+'</form>';
}
