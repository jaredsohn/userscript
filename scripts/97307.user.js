// ==UserScript==
// @name           YouTube access keys
// @namespace  youtube.com
// @description    Adds access keys to YouTube.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// @version      0.04
// ==/UserScript==

//Access key / to search 
document.getElementById('masthead-search-term').setAttribute('accesskey','/')

//Access key c to comment 
if(document.getElementsByName('comment')[0]){ 
document.getElementsByName('comment')[0].setAttribute('accesskey','c') 
}

//Access key l to like 
if(document.getElementById('watch-like')){ 
document.getElementById('watch-like').setAttribute('accesskey','l') 

//Modifies the button's onclick attribute so spacebar can be used for page navigation after the accesskey is used
document.getElementById('watch-like').setAttribute('onclick',"this.blur()" + document.getElementById('watch-like').getAttribute('onclick')) 
}

//Access key d to dislike 
if(document.getElementById('watch-unlike')){ 
document.getElementById('watch-unlike').setAttribute('accesskey','d') 

//Modifies the button's onclick attribute so spacebar can be used for page navigation after the accesskey is used
document.getElementById('watch-unlike').setAttribute('onclick',"this.blur()" + document.getElementById('watch-unlike').getAttribute('onclick')) 
}

//Access comments page with t (think "talk") 
if(document.getElementsByClassName("comments-section-see-all")(document.getElementsByClassName("comments-section-see-all").length-1)){ 
document.getElementsByClassName("comments-section-see-all")(document.getElementsByClassName("comments-section-see-all").length-1).setAttribute('accesskey','t')
}

//Access key j to go to next playlist item 
if(document.getElementById('playlist-bar-next-button')){ 
document.getElementById('playlist-bar-next-button').setAttribute('accesskey','j') 
}

//Access key k to go to previous playlist item 
if(document.getElementById('playlist-bar-prev-button')){ 
document.getElementById('playlist-bar-prev-button').setAttribute('accesskey','k') 
} 