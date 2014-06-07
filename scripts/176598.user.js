// ==UserScript==
// @name       Work Safe Browsing
// @namespace  http://cagy.org/work-safe-browsing/
// @version    0.2
// @description  Browse the web at work without colors or media. Hovering your mouse over media content to show only that specific media.
// @include    http://*
// @include    https://*
// @copyright  2013+, Cagy.org
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

console.log("Work Safe Browsing starting...");

/*
 * Images
 */
$( "img" ).each(function() {
    $(this).css({ opacity: 0.05 }).mouseenter(function(){
        $(this).css({ opacity: 1 });
    }).mouseleave(function(){
        $(this).css({ opacity: 0.05 });
    });
});

/*
 * Iframes
 */
$( "iframe" ).each(function() {
    $(this).css({ opacity: 0.05 }).mouseenter(function(){
        $(this).css({ opacity: 1 });
    }).mouseleave(function(){
        $(this).css({ opacity: 0.05 });
    });
});

/*
 * Neutral background color + text color for all objects
 */ 
$( "*" )
	.css( "background",	"#fff" )
	.css( "color", "#999" )
	.css( "border-color", "#fff" );

/*
 * Remove Objects (flash, adds, etc)
 */ 
$('object').remove();

/*
 * Pseudo Objects :after
 */
$('head').append("<style>*:after{ background: #fff; color: #999; border: 0px solid #fff; }</style>");
