// ==UserScript==
// @name       RoulotteNinja
// @namespace  http://roulotte.im/
// @version    0.2
// @description  Work mode for Roulotte.im
// @match      https://roulotte.im/chat/*
// @copyright  2014+, Vince
// ==/UserScript==

console.log('Roulotte ninja started: ' + new Date());

var styleTag = document.createElement('style');

var styles = [];

// Hide left column
styles.push("header.header-wrapper {z-index: 0;} ");
styles.push(".room-wrapper {left: 0;} ");

// Hide top header
styles.push(".panel>section.content {top: 0} ");
styles.push(".room-main header {display: none} "); 
            
// limit image visual impact
styles.push(".room-wrapper .messages .message .callout .wrapper img:not(.emoticon) {max-width: 200px; opacity: 0.05; transition: all 2s;}");
styles.push(".room-wrapper .messages .message .callout .wrapper img:hover {max-width: 900px; opacity: 1.0;}");

styles.push("");

styles.push(".room-wrapper .messages .message .header {margin-left: 5px; margin-right: 5px;} ");
styles.push(".room-wrapper .messages .message .callout {margin-left: 5px; margin-right: 5px;} ");
styles.push(".room-wrapper .messages .message.me .header {background-color: lightyellow;} ");
styles.push(".room-wrapper .messages .message.me .callout {background-color: lightyellow;} ");
styles.push(".room-wrapper .messages .message.me .callout .wrapper {border-color: transparent;}");
styles.push(".room-wrapper .messages .message .meta { display: none; }");



styleTag.innerHTML = styles.join(' ');
document.head.appendChild(styleTag);
