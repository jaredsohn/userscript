// ==UserScript==
// @version        1.0
// @name           FireGAETaskqueue
// @author         Emilien Klein
// @namespace      http://emilien.klein.st/gmscripts/
// @description    Enables to automatically fire Google App Engine tasks in the SDK
// @include        http://*/_ah/admin/tasks?queue=*
// ==/UserScript==

/*

History:

12/02/2010 - v1.0 - First version of the script

*/

//unsafeWindow.console.log("XX");

"use strict";
var executeTask, countDown, checkedCheckbox, createElement, $;

function startProcess() {
    var contentNode, newPNode, newTextNode, newCheckboxNode, newTextNode2;
    contentNode = $("ae-content");
    newPNode = createElement("p");
    newTextNode = createElement("label", {for: "autoFire"});
    newTextNode.innerHTML = "You can activate the automatic execution of tasks with this checkbox:";
    newPNode.appendChild(newTextNode);
    newCheckboxNode = createElement("input", {type: "checkbox", id: "autoFire"});
    newPNode.appendChild(newCheckboxNode);
    newTextNode2 = createElement("span", {id: "countDownSpan", style: "display: none; color: red;"});
    newTextNode2.innerHTML = "&nbsp;The page will be refreshed in <span id='countDownValue'>5</span> seconds.";
    newPNode.appendChild(newTextNode2);
    contentNode.insertBefore(newPNode, contentNode.childNodes[4]);
    // Checkbox events
    $("autoFire").addEventListener("change", checkedCheckbox, true);
    // Check if we already want to auto fire
    if (GM_getValue("autoFire")) {
        $("autoFire").checked = "checked";
        // Verify if there is a task to execute
        executeTask();
    }
}

function executeTask() {
    var forms, childNodes, runButton, evt;
    // Detect if there is a task to execute
    forms = document.getElementsByTagName("form");
    if (forms.length > 0) {
        if (forms[0].id.substr(0, 12) === "runform.task") {
            // Get the "Run" button of that form
            childNodes = forms[0].childNodes;
            runButton = childNodes[childNodes.length - 2];
            // Create a click event (can't use forms[0].submit() because the onsubmit code will not get called)
            // Found this solution on http://objectmix.com/javascript/328949-simulate-button-click-javascript.html
            evt = unsafeWindow.document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            // "Click" the "Run" button
            runButton.dispatchEvent(evt);
            return;
        }
    }
    // No [suitable] form has been found, refresh the page in 5 seconds
    GM_setValue("countDownValue", 5);
    $("countDownSpan").style.display = "inline";
    window.setTimeout(countDown, 1000);
}

function countDown() {
    var countDownValue;
    // Only continue the countdown if we still want to automatically fire the tasks
    // i.e. you haven't unchecked the checkbox AFTER the countdown has been started.
    if (GM_getValue("autoFire")) {
        countDownValue = GM_getValue("countDownValue") - 1;
        GM_setValue("countDownValue", countDownValue);
        $("countDownValue").innerHTML = countDownValue;
        if (countDownValue > 0) { 
            window.setTimeout(countDown, 1000);
        } else {
            window.location.reload();
        }
    }
}

function checkedCheckbox() {
    if ($("autoFire").checked) {
        // Store that we want to auto fire
        GM_setValue("autoFire", true);
        // Show the countdown text
        $("countDownValue").innerHTML = 5;
        // Verify if there is a task to execute
        executeTask();
    } else {
        // Store that we don't want to auto fire
        GM_setValue("autoFire", false);
        // Hide the countdown text
        $("countDownSpan").style.display = "none";
    }
}

// From http://wiki.greasespot.net/Code_snippets#Build_a_DOM_node_with_attributes
function createElement(type, attributes) {
    var node, attr;
    
    node = document.createElement(type);
    for (attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            node.setAttribute(attr, attributes[attr]);
        }
    }
    return node;
}

// From http://wiki.greasespot.net/Code_snippets#document.getElementById_helper
function $() {
    var z=[], i=0, el;
    if (arguments.length==1) {
        return document.getElementById(arguments[0]);
    }
    while(el = document.getElementById(arguments[i++])) {
        if (el) {
            z.push(el);
        }
    }
    return z;
}

startProcess();
