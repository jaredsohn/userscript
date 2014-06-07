// ==UserScript==
// @name        Tweetdeck Column Variable Size
// @namespace   http://userscripts.org/users/nisi
// @include     https://web.tweetdeck.com/*
// @version     0.1.2
// @grant       unsafeWindow
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var defaultWidth = 350;
var minWidth = 200;
var cookieWidth = readCookie('lastSetWidth');
currentWidth = cookieWidth ? cookieWidth : defaultWidth;

setColumnWidth(currentWidth);

// Change menu to have an entry for column width instead of just "use narrow columns"
$(document).ready(function() {

    // Hack that emulates unsafeWindow for non-Greasemonkey-uses
    // http://mths.be/unsafewindow
    window.unsafeWindow || (
        unsafeWindow = (function() {
            var el = document.createElement('p');
            el.setAttribute('onclick', 'return window;');
            return el.onclick();
        }())
    );

    // Add CSS class
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.custom-column-input { width: 40px; height: 1.8em; }';
    document.getElementsByTagName('head')[0].appendChild(style);

    // Add event listener to the input field
    $('body').on('keyup', '#custom-column-size', function(){
        var newWidth = $(this).val();
        if (newWidth >= minWidth) {
            setColumnWidth(newWidth);
        }
    });

    // Change menu
    // old pattern = /<label for="use-narrow-columns"(?:.*?)<\/label>/m;
    var pattern = /<label class="[a-zA-Z\- ]{1,}">\{\{_i\}\}Column size:(?:.*?)\{\{_i\}\}Regular\{\{\/i\}\} <\/label>/;
    replacement = '<label for="custom-column-size" class="checkbox">'
        + "{{_i}}Column size (min " + minWidth + "): {{/i}}\t"
        + '<input type="text" name="custom-column-size" id="custom-column-size" '
        + 'class="custom-column-input" maxlength="4" value="' + currentWidth + '" />'
        + ' px'
        + '</label>';
    unsafeWindow.TD_mustaches["settings/global_setting_general.mustache"] =
        unsafeWindow.TD_mustaches["settings/global_setting_general.mustache"].replace(pattern, replacement);
});

// Set width of columns
function setColumnWidth(newWidth) {
    columnClass = getCSSRule('.column');
    if (columnClass) {
        columnClass.style.width = newWidth + 'px';
        currentWidth = newWidth;
        createOrUpdateCookie('lastSetWidth', newWidth, 730);
    } else {
        alert('No css rule for .column found');
    }
}

// Modified version of http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
function getCSSRule(ruleName) {
    ruleName = ruleName.toLowerCase();
    cssClass = null;

    if (document.styleSheets) {
        var i = 0;
        while (!cssClass && i < document.styleSheets.length) {
            var styleSheet = document.styleSheets[i];

            var j = 0;
            while (!cssClass && j < styleSheet.cssRules.length) {
                var currCssRule = null;

                if (styleSheet.cssRules) {
                    currCssRule = styleSheet.cssRules[j];
                } else {
                    currCssRule = styleSheet.rules[j];
                }

                if (currCssRule)  {
                    if (currCssRule != null && currCssRule.selectorText != undefined
                        && currCssRule.selectorText.toLowerCase() == ruleName) {
                        cssClass = currCssRule;
                    }
                }
                j++;
            }
            i++;
        }
    } else {
        // No document.styleSheets
        return false;
    }
    // Returns CssClass when found, null otherwise
    return cssClass;
}

function createOrUpdateCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}