// ==UserScript==
// @name       YouTube Center Layout
// @namespace  http://darrennolan.com
// @version    1.8
// @description Center YouTube's new Layout to the middle of your screen.
// @match      http://youtube.com/*
// @match      http://www.youtube.com/*
// @match      https://youtube.com/*
// @match      https://www.youtube.com/*
// @copyright  2012+, Darren Nolan
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==



if (window.location == window.parent.location) {
    // Disable silly CSS3 transitions that makes the page fly all over the place //
    $("#player").css("-webkit-animation", "none")
    	.css("-moz-animation", "none")
    	.css("-ms-animation", "none")
    	.css("animation", "none")
    
    	.css("-webkit-transition", "none")
    	.css("-moz-transition", "none")
    	.css("-ms-transition", "none")
    	.css("transition", "none");
    
    // Center the player, rid the padding on the left. //
    $("#player-api").css("margin", "0 auto 0 auto");
    $("#player").css("padding-left", "0");
    
    // After we get the player done, please fix up the comments a little. Nothing too fancy though, cause ant-eaters don't need fancy comments. //
 	$("[id$=-main-container]").css("-webkit-animation", "none")
    	.css("-moz-animation", "none")
    	.css("-ms-animation", "none")
    	.css("animation", "none")
    
    	.css("-webkit-transition", "none")
    	.css("-moz-transition", "none")
    	.css("-ms-transition", "none")
    	.css("transition", "none");
    
    $("[id$=-main-container]")
    	.css("margin", "0 auto 0 auto")
    	.css("padding-left", "0")
    	.css("width", $("#player-api").width());
    
}
