// ==UserScript==
// @name TechCrunch Douchebag
// @namespace http://www.alekseykorzun.com
// @description Removed any material posted by MG Siegler
// @include http://*techcrunch.com/*
// ==/UserScript==
 

//------------ Find and kill useless posts
var posts = document.getElementsByTagName('a');
for (var i=0; i<posts.length; i++) {
    var post = posts[i].getAttribute('title');
    
    if(typeof(post) === 'string' && post == 'Posts by MG Siegler') {
	    posts[i].parentNode.parentNode.parentNode.style.display="none";
	}
}

//------------ Remove banners
var posts = document.getElementsByClassName('post_sponsor_unit');
for (var i=0; i<posts.length; i++) {
    posts[i].style.display="none";
}
document.getElementById('header_leaderboard').style.display="none";
document.getElementsByClassName('ad').style.display="none";
document.getElementById('col2_medrec').style.display="none";

//------------ Remove any other content where posts might be displayed
document.getElementById('header_features').style.display="none";
document.getElementById('col2').style.display="none";
document.getElementById('col1').style.width="99%";
document.getElementsByClassName('post').style.width="99%";