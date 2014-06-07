// ==UserScript==
// @name           ShahButton
// @description    This script will change the text of facebook "likes" to Shah!
// @author         Naail A. Rahman [kudanai]
// @version        0.2
// @namespace      ShahButton
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// ==/UserScript==

// quick shout-out to the me-gusta guys.

// TODO: find a better binding than "mouseover"
//window.addEventListener("load", shahLikes, false);
//window.addEventListener("click", shahLikes, false);
window.addEventListener("mouseover", shahLikes, false);

var like_text = "<img width='15px' height='15px' src='http://dl.dropbox.com/u/5385653/sha-icon.png' />Sha!";
var unlike_text = "Chee!";


function shahLikes(){
    var likes = document.getElementsByClassName('default_message');
    for (var i = 0; i<likes.length; i++){
		
		like = likes[i];
		message = like.innerHTML;

		if (message == 'Like'){
		    like.innerHTML = like_text;
		}
		else if (message == 'Unlike'){
		    like.innerHTML = unlike_text;
		}
    }
}

