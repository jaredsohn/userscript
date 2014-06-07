// Form color forcer, based on Boring CSS 0.2 (by Eric Talevich)
// version 0.1.1
// 2008-01-10
// Copyright (c) 2007,  Spayder26
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need 
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/ Then 
// restart Firefox and revisit this script.  Under Tools, there will be
// a new menu item to "Install User Script".  Accept the default
// configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select "Boring CSS",
// and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Form color forcer
// @description   Force all forms use OS colors.
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------
// Configuration
//
Skip_default_css = false;
// Remove the own webpage style (when page loads).
//
Use_custom_css   = true;
// Use the below-defined style.
//
Input_round_size = 0;
// Rounded corners size on forms.
//
Wait_for_load    = false;
// Wait page loads before apply style.
//
// --------------------------------------------------------------------
// Custom CSS
//
mystylesheet =  '/* Intrussive system color\'s css  */  \
input,select,textarea{                                  \
	-moz-border-radius: '+Input_round_size+'px;         \
	width: none !important;                             \
	height: none !important;                            \
	border: 1px solid ActiveBorder !important;          \
	}                                                   \
textarea,input[type="text"],input[type="file"],         \
input[type="password"],input[type="checkbox"],select{   \
	background-image: none !important;                  \
	background: Window !important;                      \
	color: WindowText !important;                       \
	padding: 2px 0px !important;                        \
	margin: 0;                                          \
	}                                                   \
input[type="button"],input[type="submit"],              \
input[type="reset"]{                                    \
	background-image: none !important;                  \
	background: ButtonFace !important;                  \
	color: ButtonText !important;                       \
	padding: 1px 6px !important;                        \
	margin: 0;                                          \
	}                                                   \
input[type="button"]:hover,input[type="submit"]:hover,  \
input[type="reset"]:hover{                              \
	background: Highlight !important;                   \
	color: HighlightText !important;                    \
	}';
//
// --------------------------------------------------------------------
// Hardcode. Do not edit below.
// 
function removeDefaultStyles(){
	// Remove the existing embedded and linked stylesheets
    var styles = document.getElementsByTagName('style');
    while (styles[0]) styles[0].parentNode.removeChild(styles[0]);
    var all_links = document.getElementsByTagName('link');
    for (var i=0; i < all_links.length; ++i ) {
        var link = all_links[i];
        if (link.getAttribute('rel').toLowerCase() == 'stylesheet') {
            link.parentNode.removeChild(link);
            i--; // Since we popped a node, the indexes shift by 1
        }
    }
}

function setMyOwnCSS(){
	// Define the new stylesheet for the page & attach it
    var newstyle = document.createElement("style");
    newstyle.type = "text/css";
    var css = document.createTextNode(mystylesheet);
    newstyle.appendChild(css);
    document.getElementsByTagName('head')[0].appendChild(newstyle);
}

window.addEventListener("load", function(e) {
	if (Skip_default_css) removeDefaultStyles();
	if ((Use_custom_css)&&(Wait_for_load)) setMyOwnCSS();
}, false);

if ((Use_custom_css)&&(!(Wait_for_load))) setMyOwnCSS();
//
// --------------------------------------------------------------------
