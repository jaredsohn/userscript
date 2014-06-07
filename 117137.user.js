// ==UserScript==
// @name           LetMeRead : Google Reader
// @namespace      http://whyareyoureadingthisurl.wordpress.com
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

var $;
var showing = false;

// Eye images
var image_eye_closed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAABHNCSVQICAgIfAhkiAAAAaFJREFUOI2l00GIzVEUBvDfeQ1vRcqGshqNImVFykYp2ZgFsaBMI1KMd4dmhw0bG3lXs0CajZUNiSYLW7ZiIdNgdmxmJYuZYd61eP9X/3lTIzl1656ve77znb5zo5SiP1JKWzCCPdiBITTwuTozeJxznumvjTphSmkfruA41q3qtDIKXqOdc55eRZhSGsedSkkH3/ALm7Gxev8T86WUEhHbak3vYiLn3IlWq9WIiGellOG/KFpbbilvIuJQA0f/lwwi4gBONHChwj7ojviv8RvvqvvoAA5WyUhEfMdeXVeHSilnm81mc2lpSc28BUxhLiLmIuJtp9PZhI/YP4AXOInhdrt9Ey97lSmlsri4eLFP0VTO+VIdSCmdq67PG3hQJTdSSufrD5eXlzNma9BshdXJTuFar1mUUqSUruNWBT7C7ZzzF4iIGBsbOwKTk5OvSjV7SmkQV9FTew/j9T0cxUMM6O7hU0zjU6VyAwaxHcdwGKFryuWc831W/5RdmMBprLd2LOAJcs655/JKwhrxVpzBbuzUdf0H5vAV73X/8nx/7R8pIqIclfQFWQAAAABJRU5ErkJggg==";

var image_eye_open = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAABHNCSVQICAgIfAhkiAAAAXtJREFUOI2F0z9rFFEUBfDfTGMZWC3UTmUXVgRJ459CCGqjKVJopaJYKJYWFhbqFxAEwSSsgggBxVjYSRCs/ASysJAg5gu4W4jif5/F3kleZkccOAzv3nPPfe+dd4uUkvpXFMVOXMJBdNBGifeBVSyllFYnilNKG8AhPMMPpP/gD17j9BaNTOw6fgX5J5ZxHoexHVOYxlks4nMmfg9lddoSD7Oud7E7a1RiNlBm8SncwLeofYltMBeBLzhTu4JuWZbrrVar2sk6ujXOMQwjfwFexeJmTgzyQq/XS8PhMLXb7Up0oYF3NXJvSsyEPysTjjHX7/cNBgOj0Wgj1sB7G/8j8DzU7zR0njfp7nwD73bknsJxm85eqRE7WMvE1tCpcc5lxpysgreyokfYlxUUOBUosvhePMjq7qPIO12OXSb8xouIHcUO7MGJMGDF+IlVJ7s28bBDdD8e43vD3dXxFU8wnWsU/5jlXbiIA+gaz/In43f4Ae+MZ/ljvfYvUEYrnL4/YooAAAAASUVORK5CYII=";


// Load jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		main();
	}
}

// Reduce padding and add a border to the right of the sidebar
function reduce_padding() {
    $("#lhn-add-subscription-section, #sections-header, #viewer-header-container, #viewer-header").css("height", "50px");
    $("#scrollable-sections-bottom-shadow").css("display", "none");
    $("#scrollable-sections-holder").css("border-right", "1px solid #eee");
}

function toggle_button() {
    if (showing == true) {
        $("div#show-hide").addClass("jfk-button-focused jfk-button-checked");
        $("div#show-hide").css("background-image", "url("+ image_eye_open +")");
	} else {
        $("div#show-hide").removeClass("jfk-button-focused jfk-button-checked");
        $("div#show-hide").css("background-image", "url("+ image_eye_closed +")");
	}
}

function toggle_top_bar() {
    if (showing == true) {
        $("#lhn-add-subscription-section, #viewer-header-container").show();
        showing = false;
	} else {
        $("#lhn-add-subscription-section, #viewer-header-container").hide();
        showing = true;
	}
}

function main() {
    reduce_padding();
	$("div#search").append("<div id='show-hide' class='jfk-button jfk-button-standard goog-inline-block'></div>");
	$("div#show-hide").css({
        "background-image"    : "url("+ image_eye_closed +")",
        "background-repeat"   : "no-repeat",
        "background-position" : "center center",
	    'width'               : '50px',
	    'height'              : '27px',
	    'float'               : 'left',
	});
	$("div#show-hide").hover(
	    function() { $("div#show-hide").addClass("jfk-button-hover");},
	    function() { $("div#show-hide").removeClass("jfk-button-hover");}
	);
	$("div#show-hide").click(function() {
	    toggle_button();
	    toggle_top_bar();
	});
	
	toggle_top_bar();
}