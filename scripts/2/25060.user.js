// YouTube More Info Auto-click

// by Jared Branum (aka Maxx)
// April 12, 2008

// ==UserScript==
// @name           YouTube More Info Auto-click
// @namespace      http://studentweb.eku.edu/jeffrey_branum
// @description    Automatically displays the entire video description when viewing videos.
// @include        http://*.youtube.com/watch?v=* 
// @include        http://youtube.com/watch?v=*
// ==/UserScript==

(function()
{

function togglePanel(panel) {
        expandPanel(panel);
}

function expandPanel(panel) {
    addClass(panel, "expanded");
    fireInlineEvent(panel, "expanded");
}

function fireInlineEvent(element, eventName) {
    var target = ref(element);
    if (target[eventName] == null) {
        var attributeName = "on" + eventName.toLowerCase();
        var attribute = target.attributes.getNamedItem(attributeName);
        if (attribute) {
            target[eventName] = function () {eval(attribute.value);};
        }
    }
    if (target[eventName]) {
        target[eventName]();
    }
}

function addClass(element, _class) {
    element.className += element.className ? " " + _class : _class;
}

function ref(instance_or_id) {
    return typeof instance_or_id == "string" ? document.getElementById(instance_or_id) : instance_or_id;
}

togglePanel(ref('watch-video-details'));

})();