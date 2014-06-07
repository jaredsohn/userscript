// ==UserScript==
// @name           Newgrounds Review Links
// @namespace      http://userscripts.org/users/vitaminp
// @description    Adds a button to each review, allowing you to link to it directly
// @include        http://www.newgrounds.com/portal/reviews/*
// @include        http://www.newgrounds.com/portal/view/*
// @include        http://www.newgrounds.com/audio/listen/*
// @include        http://www.newgrounds.com/audio/reviews/*
// @include        http://www.newgrounds.com/art/view/*/*
// @include        http://www.newgrounds.com/art/reviews/*/*
// ==/UserScript==

// ---- Modified from 'Newgrounds BBS Direct Post Links' By Knugen --- http://userscripts.org/scripts/show/70271 ~ http://knugen.newgrounds.com/
// ---- Original idea by Jolly --- http://jolly.newgrounds.com/


// ---- Choose the position of the link bottom of review or top
var position = 'top'


var posts = document.getElementsByClassName('review');

for (i = 0; i < posts.length; i++)
{
	if (posts[i].className.match(/reviewbundle/)) continue;
	var btns = posts[i].getElementsByClassName('epicLinkBtn');
	if (btns.length > 0) continue; // Fix for Chrome (adding an extra button for each click)
	var e = document.createElement('span');	
	e.className = "mod";
	e.style.margin = "-5px -7px 0 5px"
	e.style.cssFloat = "right"
	e.innerHTML = '[<a href="#' + posts[i].id + '">Link</a>]'
	if(position == 'bottom'){
	try{
	posts[i].getElementsByClassName("foot")[0].insertBefore(e,posts[i].getElementsByClassName("foot")[0].firstChild)
	e.style.margin = "-1px -5px 23px 5px" 
	e.style.padding = "0 0 0 5px"
	}
	catch(err){posts[i].appendChild(e)}
	}else if(position == 'top'){
	posts[i].firstChild.nextSibling.insertBefore(e,posts[i].firstChild.nextSibling.firstChild)
	}else{
	alert("Please enter a position")
	break;
	}
}