// ==UserScript==
// @id             greasemonkey-1b827958-e057-4e8c-83b6-eed2a66af1f5-hangout-maximizer
// @name           Hangout Maximizer
// @version        0.1
// @namespace      https://plus.google.com/hangouts/*
// @author         Sayantan Chaudhuri
// @description    This script implements a shortcut that maximizes the central area of the Google Hangout web-app. Hangouts has no useful full-screen option to speak of, which is espcially a problem while using apps like Screenshare or Roll20. This script simply hides everything other than the central app-area, including all video thumbnails, etc. Element selectors last checked on 2013/01/02.
// @include        https://plus.google.com/hangouts/*
// @run-at         document-end
// ==/UserScript==



/* Config and Settings */

// The shortcut key used with ctrl+shift to toggle maximization. 
// Defaults to f, for ctrl+shift+f, same as in Google Drive.
var keycode = 70;

// The elements to hide for maximization.
// Comment out any to not hide that.
// Google's apps are the most extension unfriendly, as you'd expect from them, so these selectors may change in the future, requiring fixes.
// Last checked on 2014/01/02.
var maximizingCss = '';
maximizingCss += '.Za-ma-R.Za-R { display: none; } '; // Top bar.
maximizingCss += '.Za-R.Za-Yc-m { display: none; } '; // Bottom bar.
maximizingCss += '.Za-Ha-ya.Za-fd-J.Za-jf { display: none; } '; // Left bar.
maximizingCss += '.Za-fd-J.Za-ya-J { display: none; } '; // Right bar.
maximizingCss += '.g-gb-T.j-Lb-Qc.g-gb { padding-left: 0; } '; // Center area container margined for the right bar.



/* Functionality */

var maximizingCssId = "greasemonkey-1b827958-e057-4e8c-83b6-eed2a66af1f5-hangout-maximizer";
function maximize() {
    var css = maximizingCss;
    var head = document.getElementsByTagName('head')[0];
    if ( !head || document.getElementById(maximizingCssId) ) { return; }
    var style = document.createElement('style');
    style.id = maximizingCssId;
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);    
}
function unmaximize() {
    var style = document.getElementById(maximizingCssId);
    style.parentNode.removeChild(style);
}

var maximized = false;
function toggleMaximize(e) {
    if ( ( e.ctrlKey && e.shiftKey ) && e.keyCode == 70 ) {
        console.log("Toggling Hangout maximization.");
        if (!maximized) {
            maximize();
            maximized = true;
        } else {
            unmaximize();
            maximized = false;
        }
        e.preventDefault();
        return false;
    };
}
document.addEventListener('keydown', function(e){toggleMaximize(e)}, false);