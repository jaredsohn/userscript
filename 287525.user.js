// ==UserScript==
// @name       FetLife photo exposer
// @namespace  http://userscripts.org/users/548266
// @version    0.1
// @description  Provides direct download links for pics
// @match      https://*.fetlife.com/users/*/pictures/*
// @copyright  2014+, MyFLuscripts
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

// Define our main function
$(function(){
	console.log("FLPE GOGO");
    var urlstring = window.getComputedStyle(document.getElementsByClassName("fake_img")[0]).backgroundImage;
    var len = urlstring.length;
    var url = urlstring.substr(4,len-5);
    
    var linky = document.createElement('a');
    linky.setAttribute('href',url);
    linky.innerText = "(DIRECT LINK)";
    
    var caption = document.getElementsByClassName("caption_container")[0];
    caption.appendChild(linky);
    
    console.log(url);
});