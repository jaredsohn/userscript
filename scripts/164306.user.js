// ==UserScript==
// @name        Gmail Preview Pane Arrow Scrolling
// @namespace   http://userscripts.org/users/109864
// @include     https://mail.google.com/*
// @grant       none
// @version     0.2.2013.604
// ==/UserScript==

function getElementsByClassName(className, parentNode)
{
    var elements = [];
    var parent = parentNode;
    if (parentNode == undefined) {
        parent = document.body;
    }
    if (parent.getElementsByClassName != undefined) {
        return parent.getElementsByClassName(className);
    }

    if (parent.getElementsByTagName == undefined) {
        return elements;
    }
    var children = parent.getElementsByTagName('*');
    for (var i = 0; i < children.length; i ++) {
        var child = children[i];
        if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
            elements[elements.length] = child;
        }
    }
    return elements;
}

function handleKeyPress(e)
{
    var targAttr = e.target.attributes;
    var targRole = "";
    var targToolTip = "";
    try {
        targRole = targAttr.getNamedItem("role").value;
        targToolTip = targAttr.getNamedItem("data-tooltip").value;
    }
    catch(err) {
        //do nothing
    }
    if (e.target.nodeName.match(/^(textarea|input)$/i) ||
         e.target.className.match(/(^|\\s)editable(\\s|$)/i) ||
         targRole === "textbox" ||
         (targRole === "button" && targToolTip === "Show trimmed content"))
    {
        return;
    }
    var override = true;
    var keyCombo = "";
    if (e.keyCode) {
        switch(e.keyCode) {
        case 38: //up arrow
            keyCombo = "UP";
            break;
        case 40: //down arrow
            keyCombo = "DOWN";
            break;
        default:
            return;
        }
    }else{
        keyCombo = String.fromCharCode(e.charCode||e.which).toLowerCase();
    }
    if (e.shiftKey) { 
        keyCombo = "Shift+" + keyCombo;
    }
    if (e.altKey) { 
        keyCombo = "Alt+" + keyCombo;
    }
    if (e.ctrlKey) { 
        keyCombo = "Ctrl+" + keyCombo;
    }

    switch(keyCombo) {
    case "UP":
        ScrollPreviewPane(-25);
        break;
    case "DOWN":
        ScrollPreviewPane(25);
        break;
    default:
if (e.charCode||e.which) {console.log(keyCombo + " (" + (e.charCode||e.which) + ")\r\n");}
        return;
    }
    if (override) {
        e.preventDefault();
        e.stopPropagation();
    }
}

function ScrollPreviewPane(scrollValue)
{
    var elemsPreviewPanes = getElementsByClassName("apN");
    for (var x = 0; x < elemsPreviewPanes.length; x++) {
        if (elemsPreviewPanes[x].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display != "none") {
            elemPreviewPane = elemsPreviewPanes[x];
        }
    }
    elemPreviewPane.scrollTop += scrollValue;
}

document.addEventListener('keypress', handleKeyPress, true);
document.addEventListener('keydown', handleKeyPress, true);