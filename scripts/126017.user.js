// ==UserScript==
// @name           Fanshawe Online Tweaks
// @include        https://www.fanshaweonline.ca/*
// @include        https://fanshaweonline.ca/*
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant       	none
// ==/UserScript==+


function derp(){
    var apple = $('img[id="Rotating1"]');
    apple.attr("id", "derp1");
    apple.attr("src", "http://img.pandawhale.com/post-11713-Hello-Yes-This-Is-Dog-gif-5LzJ.gif");
    apple.parent().parent().parent().find('p[id="textTag2"]').find("b").html("Hello!  I am Dog!");
    apple.parent().parent().parent().find('p[id="textTag"]').find("span").html("Need Help with Dog? </br>Look no further, I am Dog!");	
}
derp();