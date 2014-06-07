// ==UserScript==
// @name           Even Followers
// @namespace      Kamille
// @description    even followers
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard/*
// @include        http://www.tumblr.com/blog/*
// @include        http://www.tumblr.com/show/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
var $j = jQuery.noConflict();
function even_followers() {
	var notes = document.getElementsByClassName("hide_overflow");	
    if (notes != null) {
        for (var i=0; i<notes.length; i++) {            
           if (notes[i].innerHTML.indexOf("Following") != -1) {
				var innerHtmlVal = notes[i].innerHTML;
				var startIndex = innerHtmlVal.indexOf("Following") + "Following".length;
				var endIndex = innerHtmlVal.indexOf("blogs");
				var followerCountStr = innerHtmlVal.substring(startIndex, endIndex);
				var followerCount = parseInt(innerHtmlVal.substring(startIndex, endIndex));
				if (followerCount % 2 == 1)  {
					followerCount = followerCount - 1;
					innerHtmlVal = innerHtmlVal.replace(followerCountStr, " "+followerCount+" ");
					notes[i].innerHTML = innerHtmlVal;					
				}
				break;
		   }
        }
    }
	
}

even_followers();