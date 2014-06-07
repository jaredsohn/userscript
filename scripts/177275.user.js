// ==UserScript==
// @name            Pinterest Add-Ons
// @description     Makes some changes to the layout of the Board.
// @include         http://pinterest.com/*
// @include         http://www.pinterest.com/*
// @include         http://pinterest.com/pin/*
// @include         http://www.pinterest.com/pin/*
// @version         20140217a
// @updateURL		https://userscripts.org/scripts/source/177275.meta.js
// @downloadURL		https://userscripts.org/scripts/source/177275.user.js
// @icon  			http://s3.amazonaws.com/uso_ss/icon/177275/large.png?1378512285


// ==/UserScript==







// Function to add style
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Styles Added
addGlobalStyle(' .boardPicker {height: 700px!important; border: 1px solid #000000!important; box-shadow: 2px 5px 10px 5px #000!important;}');
addGlobalStyle(' .boardPickerInnerWrapper.visible {height: 700px!important; border: 1px solid #000000!important; box-shadow: 2px 5px 10px 5px #000!important; top: -180px!important;}');

//addGlobalStyle(' .Pin.summary .pinHolder:hover .hoverMask {background: rgba(255, 255, 255, 0.4)!important;}');
addGlobalStyle(' .Grid.hasFooter {background-color: #490E0E!important;}');

addGlobalStyle(' .App {height: 100%; \
				border-top: 1px solid #4B8CA8;\
				background-color: #0F0303;\
				background-image: linear-gradient(to bottom, #921E1E, #0F0303);\
				background-image: -webkit-gradient(linear, left top, left bottom, from(#921E1E), to(#0F0303));\
				background-image: -webkit-linear-gradient(top, #921E1E, #0F0303);\
				background-image: -moz-linear-gradient(top, #921E1E, #0F0303);\
				background-image: -webkit-linear-gradient(top, #921E1E, #0F0303);\
				background-image: -o-linear-gradient(top, #1E6F92, #921E1E);\
				background-image: ms-linear-gradient(to bottom, #921E1E, #0F0303);\
				-pie-background: linear-gradient(to bottom, #921E1E, #0F0303);}  ');


addGlobalStyle(' .Modal .modalMask {background-color: #490E0E !important;}');


if (document.URL.search('pin/create/extension') >= 0) {
    window.resizeTo(780,825);
    addGlobalStyle(' .boardPickerInnerWrapper.visible {height: 680px!important; border: 1px solid #000000!important; box-shadow: 2px 5px 10px 5px #000!important; top: 0px!important;}');
    addGlobalStyle(' .App {background-image: -webkit-linear-gradient(top, #921E1E, #0F0303);} ')
    
                   }
  
//Auto scroll to top when page is loaded
$(document).ready(function () {

            $(window).scrollTop(0);
            return false;

        });

/* 
//Looking for some help to sort boards. If you can do this and would like to add it to this script I would greatly appreciate it.
var myboards = $('item.gridSortable');
myboards.sort();*/