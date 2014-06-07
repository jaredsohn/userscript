// ==UserScript==
// @name       FetLife video exposer
// @namespace  http://userscripts.org/users/548266
// @version    0.1
// @description  Provides direct download links for vids
// @match      https://*.fetlife.com/users/*/videos/*
// @copyright  2014+, MyFLuscripts
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

// Define our main function
$(function(){
	console.log("FLVE GOGO");
    var url = document.getElementsByTagName("source")[0].getAttribute("src")
    
    var linky = document.createElement('a');
    linky.setAttribute('href',url);
    linky.innerText = "(DIRECT LINK)";
    
    var caption = document.getElementById("title_description_credits");
    caption.appendChild(linky);
    
    console.log(url);
});