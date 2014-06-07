// ==UserScript==
// @name           Instant Deity Whistle
// @namespace      Alfie
// @include        http://*.newgrounds.com/*
// ==/UserScript==


var me="Alfie"; // Change to your username or leave blank for all users (eg. var me="";). This is case Sensitive, so be careful!
var userpage=me.toLowerCase() +'.newgrounds';
var match=document.location.href.match(userpage);

if(me=="" || match == userpage){
// Change uwhistle background image to Deity whistle
document.getElementById('uwhistle').style.backgroundImage = "url(http://img.ngfiles.com/wicons/w6.gif)";
// Use regular expression to change certain words in uwhistle.innerHTML to Deity
document.getElementById('uwhistle').innerHTML=document.getElementById('uwhistle').innerHTML.replace(/(Garbage)|(Normal)|(Bronze)|(Silver)|(Gold)/, 'Deity');
}