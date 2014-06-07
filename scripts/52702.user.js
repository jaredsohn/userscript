// ==UserScript==
// @name           DPP - current time
// @namespace      http://userscripts.org/users/97487
// @description    Updates the Time field with current time when user clicks on a dynamically inserted link.
// @include        http://idos.dpp.cz/idos/*
// ==/UserScript==

// find the text field with time
var inputField = document.getElementById("txtTime");

// helper function that creates a new (X)HTML element
// @param elm String    element name
function newElement(elm) {
    return document.createElementNS
        ? document.createElementNS("http://www.w3.org/1999/xhtml", elm)
        : document.createElement(elm);
}

// creates a link element that is going to update the text field value
function createLink() {
    var a = newElement("a");
    a.style.width = "40px";
    a.style.height = "20px";
    a.innerHTML = "[Teď]";
    a.href = "javascript:void();";
    return a;
}

// create the link and insert it into DOM
var link = createLink();
inputField.parentNode.appendChild(link);

// registers an onClick event listener
link.addEventListener("click",
    function(e) {
        var now = new Date();
        // build the time string with the correct format ...
        var currentTime = "" + now.getHours() + ":" + now.getMinutes();
        // ... and set it to the text field
        inputField.value = currentTime;
    }
, false);
