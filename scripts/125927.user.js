// ==UserScript==
// @name           Post Hider
// @namespace      wat
// @description    Allows you to hide posts
// @include        http://boards.4chan.org/*
// ==/UserScript==

/* I'm way too lazy to write my own cookie funcs, so I borrowed these from http://www.quirksmode.org/js/cookies.html */
function ph_createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function ph_readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return "none";
}


/*///////////////////////////////////////////////////////////////////////
//		Hide a post
///////////////////////////////////////////////////////////////////////*/
unsafeWindow.ph_hide = function(id){
	/* Old cookie */
	var old = ph_readCookie("ph_hidden");	
	old += (id + "|");
	
	ph_createCookie("ph_hidden", old, 100);
	
	var tds = document.getElementsByTagName("td");
	for(i = 0; i < tds.length; i++){
		if(tds[i].className == "reply"){
			if(tds[i].id == id){
				tds[i].innerHTML = "This post is hidden";
			}
		}
	}
}

/*///////////////////////////////////////////////////////////////////////
//		Process the posts
///////////////////////////////////////////////////////////////////////*/
var posts = document.getElementsByTagName("td");
var hp = ph_readCookie("ph_hidden");

for(i = 0; i < posts.length; i++){
	if(posts[i].className == "reply"){
		if(hp.indexOf(posts[i].id + "|") != -1){
			/* This post is hidden */
			posts[i].innerHTML = "This post is hidden";
		}else{
			for(j = 0; j < posts[i].childNodes.length; j++){
				if(posts[i].childNodes[j].tagName == "BLOCKQUOTE"){
					posts[i].childNodes[j].innerHTML = (posts[i].childNodes[j].innerHTML + "<hr><div style=\"text-align:right;\"><a style=\"color:#ac9485;\" href='javascript:ph_hide(" + posts[i].id + ");'>Hide this post</a></div>");
				}
			}	
		}			
	}
}



