// ==UserScript==
// @name        GameFAQs - Private Board invite link on message list
// @namespace   http://userscripts.org/scripts/source/181911.user.js
// @description GameFAQs - Private Board invite link on message list descr
// @include     http://www.gamefaqs.com/boards/*
// @version     1.1
// @grant       none
// ==/UserScript==

var board = ""; //Enter the board number you are admin of here
var left=0;//Set this to 1 if you display the poster name to the left of the message, set it to 0 for above message

//Do not edit below this line unless you know what you're doing.
if(!left){
var msg_stats_arr = document.getElementsByClassName('msg_stats');
}else{
var msg_stats_arr = document.getElementsByClassName('msg_stats_left');
}
var user_key = document.forms[1].key.value;
for(var i=0; i<msg_stats_arr.length;i++){
var username_b_arr = msg_stats_arr[i].getElementsByClassName('name');
username_b = username_b_arr[0].innerHTML;
username = username_b.replace("<b>", "");
username = username.replace("</b>", "");
if(!left){
msg_stats_arr[i].innerHTML+=' | ';
}
msg_stats_arr[i].innerHTML+='<form action="/boards/'+board+'-?action=addmember&amp;admin=1" method="post" style="display:inline;margin:0;padding:0;" name="gm_invite_'+i+'">'
+ '<input type="hidden" name="username" value="'+username+'" /><input type="hidden" name="key" value="'+user_key+'"></form>'
+ '<a href="#" onclick="document.forms[\'gm_invite_'+i+'\'].submit();">invite</a>';
}