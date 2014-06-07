// ==UserScript==
// @name           Frontpage Threads
// @namespace      www.bungie.net
// @description BUNGIE.NET HOMEPAGE/FRONTPAGE - Shows the most recently replied to thread from the Bungie community forum,Universe forum, The Flood and Reach forum. GROUP HOMEPAGES - Displays the most recently replied to thread.
// @include        http://*bungie.net/default.aspx
// @include        http://*bungie.net
// @include        http://*bungie.net/
// @include        http://*.bungie.net/fanclub/*/Group/GroupHome.aspx
// @version        1.3
// ==/UserScript==

var currentURL = document.URL;

if(currentURL.search("http://www.bungie.net/default.aspx") == 0 || currentURL == "http://www.bungie.net/"){

var stats = document.getElementsByClassName('colLast');
stats[1].innerHTML = '<div><span align="center" style="font-size:20px;">Recently Replied Threads</span><br><br>'+
'<div style="background-color:#103349;padding-top:7px;padding-left:7px;"><div><img src="http://www.bungie.net/images/Forums/ForumsSeptagon.gif"><span style="padding-left:3px;">Bungie Community Forum</span></div><div class="list-h" id="F1"></div><br /></div>'+
'<div style="background-color:#4C1160;padding-top:7px;padding-left:7px;"><div><img src="http://www.bungie.net/images/Forums/ForumsUnderground.gif"><span style="padding-left:3px;">Bungie Universe Forum</span></div><div class="list-h" id="F2"></div><br /></div>'+
'<div style="background-color:#244910;padding-top:7px;padding-bottom:7px;padding-left:4px;"><div><img src="http://www.bungie.net/images/Forums/ForumsFlood.gif"><span style="padding-left:3px;">The Flood Forum</span></div><div class="list-h" id="F3"></div></div></div>';

//Community forum
xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET","http://www.bungie.net/forums/default.aspx?mode=other",false);
xmlhttp.send(null);
var doc = document.implementation.createDocument ("", "", null);
var html = document.createElement ("html");
html.innerHTML = xmlhttp.responseText;
doc.appendChild (html);
//Community
var first_stats = doc.getElementsByClassName('list-h').item(6);
document.getElementById('F1').innerHTML = first_stats.innerHTML;
//UNIVERSE
var first_stats = doc.getElementsByClassName('list-h').item(3);
document.getElementById('F2').innerHTML = first_stats.innerHTML;
//THE FLOOD
var first_stats = doc.getElementsByClassName('list-h').item(9);
document.getElementById('F3').innerHTML = first_stats.innerHTML;
}
//wub cut ma code in halfz!


else if(currentURL.search("GroupHome.aspx") > -1){
var groupinfo = document.getElementsByClassName('block-a newsblock2');
groupinfo[0].innerHTML = groupinfo[0].innerHTML.replace('<div class="list-c">','<div class="list-c"><div><span align="center" style="font-size:16px;">Last Replied Thread</span><br><div class="list-h" id="F1"></div><hr></div>');
var groupforum = document.getElementById('ctl00_groupForumsLink').href;
//alert(groupforum);
xmlhttp=new XMLHttpRequest();
xmlhttp.open("GET", groupforum, false);
xmlhttp.send(null);
var doc = document.implementation.createDocument ("", "", null);
var html = document.createElement ("html");
html.innerHTML = xmlhttp.responseText;
doc.appendChild (html);
var first_stats = doc.getElementsByClassName('list-h').item(0);
var first_post = doc.getElementsByClassName('list-h').item(1);
document.getElementById('F1').innerHTML = first_stats.innerHTML+first_post.innerHTML;
}
