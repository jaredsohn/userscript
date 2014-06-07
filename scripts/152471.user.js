// ==UserScript==
// @name           Google Reader - Minimal Layout
// @description    Remove the top menu (can be reactivated by pressing 'w') and remove extra items on the left menu
// @version        2012-11-14
// @updateURL      http://userscripts.org/scripts/source/152471.user.js
// @author         Kenijo
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://reader.google.com/reader/*
// @include        https://reader.google.com/reader/*
// ==/UserScript==

/**
* 2012-11-14
*  Remove the top menu (can be reactivated by pressing 'w')
*  Remove extra items on the left menu
**/

document.getElementById('scrollable-sections').removeChild(document.getElementById('home-section'));
document.getElementById('lhn-selectors').removeChild(document.getElementById('lhn-selectors-minimize'));
document.getElementById('lhn-selectors').removeChild(document.getElementById('lhn-selectors-menubutton'));
var e = document.getElementById('star-selector');
var p = e.parentNode;
p.removeChild(e);
if (p.childNodes.length != 0) {
    var pp = p.parentNode;
    pp.removeChild(p);
}
document.getElementById('scrollable-sections').removeChild(document.getElementById('lhn-recommendations'));
document.getElementById('scrollable-sections-holder').removeChild(document.getElementById('scrollable-sections-top-shadow'));
document.getElementById('scrollable-sections-holder').removeChild(document.getElementById('scrollable-sections-bottom-shadow'));

function KeyDownEvent(event) {
    element = event.target;
    elementName = element.nodeName.toLowerCase();
    if (elementName == "input") {
        userIsTyping = (element.type == "text" || element.type == "password");
    } else {
        userIsTyping = (elementName == "textarea");
    }
    if (userIsTyping) return true;
    if (String.fromCharCode(event.which) == "W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
        toggle_visibility();
        try {
            event.preventDefault();
        } catch (e) {
        }
        return false;
    }
    return true;
}

function toggle_visibility () {
    var is_visible = document.getElementById("gb").style.display != "none";
    document.getElementById('gb').style.display = is_visible?"none":"block";
}

document.addEventListener("keydown", KeyDownEvent, false);
toggle_visibility();