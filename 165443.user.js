// ==UserScript==
// @name        Scroll To Top Button for Reddit
// @namespace   http://userscripts.org/users/SystemDisc
// @description Adds a button to Reddit to scroll to the top of the page
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include     /^http[s]?:\/\/([a-z0-9]+\.)?reddit(\.[a-z]+)+\//
// @grant       none
// @downloadURL	https://userscripts.org/scripts/source/165443.user.js
// @updateURL	https://userscripts.org/scripts/source/165443.meta.js
// @version     0.10
// ==/UserScript==

var bGreasemonkeyServiceDefined = false;

try {
	if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
		bGreasemonkeyServiceDefined = true;
	}
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
	unsafeWindow = ( function () {
		var dummyElem   = document.createElement('p');
		dummyElem.setAttribute ('onclick', 'return window;');
		return dummyElem.onclick ();
    } ) ();
}

$ = jQuery.noConflict(true); //stop jQuery from breaking the page if it already uses a $ var

$('<style>.uix-button-default {\
    background-color: #F8F8F8;\
    background-image: linear-gradient(to bottom, #FCFCFC 0px, #F8F8F8 100%);\
    border-color: #D3D3D3;\
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);\
}\
.uix-button-default {\
    color: #333333;\
}\
.uix-button-default:hover {\
    background-image: linear-gradient(to bottom, #F8F8F8 0px, #EEEEEE 100%);\
    border-color: #C6C6C6;\
}\
.uix-button-default:focus {\
    border-color: #3F76B7;\
    box-shadow: 0 0 5px rgba(63, 118, 183, 0.5), 0 0 10px #FFFFFF inset;\
    outline: medium none;\
}\
.uix-button-default:active {\
    background-color: #E9E9E9;\
    background-image: none;\
    border-color: #C6C6C6;\
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2) inset;\
}\
.uix-button-default {\
    color: #333333;\
}\
.uix-button {\
    border-radius: 2px 2px 2px 2px;\
    border-style: solid;\
    border-width: 1px;\
    cursor: pointer;\
    font-size: 11px;\
    font-weight: bold;\
    height: 2.00em;\
    outline: 0 none;\
    padding: 0 0.9em;\
    vertical-align: middle;\
    white-space: nowrap;\
    word-wrap: normal\
}</style>').appendTo('html > head');
var scrollButton = unsafeWindow.document.createElement("button");
var scrollButtonImg = unsafeWindow.document.createElement("img");
$(scrollButtonImg).attr("class","uix-button-arrow");
$(scrollButtonImg).attr("src","//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif");
$(scrollButton).append(scrollButtonImg);
$(scrollButton).attr("title","Scroll to top");
$(scrollButton).attr("class"," uix-button uix-button-default uix-button-empty");
$(scrollButton).attr("role","button");
$(scrollButton).attr("type","button");
$(scrollButton).attr("id","testb");
$(scrollButton).css("position","fixed");
$(scrollButton).css("top","2px");
$(scrollButton).css("right","2px");
style = $(scrollButton).attr("style");

$(scrollButton).css("z-index","100");
$(scrollButton).click(function() {
	$('html, body').animate({
        scrollTop: 0
    }, 250);
});
$('body').append(scrollButton);

function setButton() {
	page = 'html, body';
	if($('body').scrollTop() > $('html').scrollTop())
	{
		page = 'body';
	}
	else if($('html').scrollTop() > $('body').scrollTop())
	{
		page = 'html';
	}
	if($(page).scrollTop() == 0)
	{
		if($(scrollButtonImg).css("style") != "border-bottom-color: #555555;border: #555555 4px solid !important;border-radius: 4px;-moz-border-radius: 4px;height: 0;width: 0;")
		{
			//$(scrollButtonImg).attr("style","border-bottom-color: #555555;border: #555555 4px solid !important;border-radius: 4px;-moz-border-radius: 4px;height: 0;width: 0;");
			// hide the button instead
			$(scrollButton).attr("style",style + "display: none;");
		}
	}
	else
	{
		if($(scrollButtonImg).css("style") != "height: 0;width: 0;")
		{
			$(scrollButton).attr("style",style);
			$(scrollButtonImg).attr("style","height: 0;width: 0;border-bottom: 5px solid #555555;border-right: 5px solid transparent;border-left: 5px solid transparent;");
		}
	}
}
setButton();

unsafeWindow.onscroll = setButton; // fix the direction of the arrow on the button

unsafeWindow.scrolltoloaded = 1; // let similar scripts know this script is loaded
