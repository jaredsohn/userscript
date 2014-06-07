// Coup d'Bungie
// version 1.1
// c r e a t e d   b y   C A V X
// 2008-06-09
// Copyright (c) 2005
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Coup d'Bungie", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Coup d'Bungie
// @namespace     http://www.bungie.net/Forums/posts.aspx?postID=21918952
// @description   An enhanced BNet experience.
// @include       http://*bungie.net/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(
'body {' +
'  background: #000 url(http://i326.photobucket.com/albums/k425/DYLEN13/Halo%203%20avatars/43491832-Medium.jpg) fixed repeat ! important;' +
'}' +'#userpostings {' +
' background-color:#3333ff !important; background:url( \\) repeat;  ! important;border-color:#3333ff ! important;border-style:solid ! important;border-width:1px ! important;' +
'}' +
'#usercontent {' +
'  color: #3333ff ! important;' +
'}');

function fixPageErrors()
	{
	var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
		if(divArray[i].getAttribute("class") == "block-a")
			{
			if(!(divArray[i].innerHTML.match(/<h5><strong>Topic not found.<.strong><.h5>/gi))){}
			else
				{
				var pageExtract = document.URL.split(/[=|#]/i);
				var q = pageExtract.length-1;
				var r = q-1;
				if (pageExtract[q] == "end") {newpage = pageExtract[r]-1;}
				else {newpage = pageExtract[q]-1;}
				newURL = document.URL.replace(/p=[0-9]+/gi, "p="+newpage);
				window.location = newURL
				}
			}
		}
	}
timeto = fixPageErrors();

function getdivHTML(){
var divArray = document.getElementsByTagName("div");
for (var i = 0; i<divArray.length; i++){
	if(divArray[i].getAttribute("class") == "list-db"){
		if(!(divArray[i].innerHTML.match(/img id=.*?dashboardAvatar/gi))){}
		else{
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/a href=.*?dashboardAvatar.*?><.a/gi, "a href='/Account/Profile.aspx' ><img src='http://i326.photobucket.com/albums/k425/DYLEN13/Halo%203%20avatars/43491832-Medium.jpg' style='border-style:None;height:64px;width:64px;border-width:0px;'/></a");
	}
	}
	if(divArray[i].getAttribute("class") == "forumpost"){
		if(!(divArray[i].innerHTML.match(/>snipermaster3000<.a><.li>/i))){
						if((divArray[i].innerHTML.match(/<li id=.* class=.title.>.*Member.*<.li>/i))){
				divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<li id=.* class=.title.>.*Member.*<.li>/gi, "<li class='title'>Member</li>");
				divArray[i].innerHTML =  divArray[i].innerHTML.replace(/background-color/gi, "null");
			}
						}
		else{
			divArray[i].innerHTML = divArray[i].innerHTML.replace(/div class=.forumavatar.>[\s\S]*style=.*><.a>[\s\S][\s\S]?<.div/gi, "div class='forumavatar'><a href='/Account/Profile.aspx'><img src='http://i326.photobucket.com/albums/k425/DYLEN13/Halo%203%20avatars/43491832-Medium.jpg' style='height:90px;width:90px;border-width:0px;'/></a></div");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<ul id=.* class=.author_header_block./gi, "<ul id='userpostings' class='author_header_block'");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<li id=.* class=.title.*>.*<.li>/gi, "<li class='title' style='color:#3333ff ! important;'>sniper king</li>");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<p id=.*postControl_skin_PostBlock./gi, "<p id='usercontent'");
	}
	}
}
}
whatsup = getdivHTML();



//
// o hai
// wat r u doin in hear
// r u messin with mai script
//
