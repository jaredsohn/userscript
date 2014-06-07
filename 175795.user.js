// ==UserScript==
// @name           Anonymous search at shaadi.com
// @description    Makes the search working without the requirment to register at shaadi.com
// @version        1.0
// @include        http://www.shaadi.com/*
// @grant          none
// ==/UserScript==

/* Functions */

function removeByClassName(className) {
    setTimeout(function(){
        var elements = document.getElementsByClassName(className);
        if (elements.length == 0) {
            removeByClassName(className);
        } else {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                if (element.parentElement != null) {
                    element.parentElement.removeChild(element);
                }
            }
        }
    }, 10);
}

function updateProfileLinks(elements, id) {
    for (var i = 0; i < elements.length; ++i) {
        updateProfileLink(elements[i], id);
    }
}

function updateProfileLink(element, id) {
    if (element != null) {
        element.removeAttribute("onclick");
        element.setAttribute("href", "http://www.shaadi.com/profile?profileid=" + id);
    }
}

/* Remove blocking elements */

removeByClassName('blockUI blockOverlay');
removeByClassName('blockUI blockMsg blockPage');


/* Repair links */

var searchResultElement = document.getElementById("search");
var profileElements = searchResultElement.getElementsByClassName("result_box_nw");
for (var i = 0; i < profileElements.length; ++i) {
    var profileElement = profileElements[i];
    var id = profileElement.getAttribute("id");
    if (id != null && id.substring(0, 11) == "result_box_") {
        id = id.substring(11, id.length);
        updateProfileLink(document.getElementById("view_profile_" + id), id);
        updateProfileLinks(profileElement.getElementsByClassName("light_blue"), id);
        updateProfileLinks(profileElement.getElementsByClassName("secondary_link"), id);
    }
}