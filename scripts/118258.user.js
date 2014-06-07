// ==UserScript==
// @name          Fark Comments
// @version       0.0.1
// @namespace     khoborerkagoj
// @description   Shows threads in a truly threaded fashion
// @match         http://*.fark.com/comments/*
// @include       http://*.fark.com/comments/*
// ==/UserScript==

function appendTo(parent, id, cls) {
    var node = document.getElementById(id);
    if (node == null) return;
    addClass(node, cls);
    if (node.parentNode != null)
        node.parentNode.removeChild(node);
    parent.appendChild(node);
}


function findMatchingAnchor(node, baseURL) {
    /* Find all "a" (anchor) elements in the given node whose href
     * property starts with the given baseURL. Return said URL or null */
    var anchors = node.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        var a = anchors[i];
        if (a.href.search(baseURL) >= 0)
            return a.href;
    }
    return null;
}

function addClass(node, cls) {
    /* add class cls to node if it does not already exist */
    var oldCls = node.getAttribute('class');
    if (oldCls == null)
        oldCls = cls;
    else if (oldCls.search(cls) < 0)
        oldCls += " " + cls;
    node.setAttribute("class", oldCls);
}

/* Find the element with id, and add it to the given node.
 * It's added as the first child. Return the added node. */
function addIdToNode(parent, id) {
    var node = document.getElementById(id);
    if (node != null)
        parent.insertBefore(node, parent.firstChild);
    return node;
}

/* Get rid of the top level table, */
function rearrangePage() {
    var cont = document.getElementById('container');
    addIdToNode(cont, "newsContainer");
    addIdToNode(cont, "catMenu");
    addIdToNode(cont, "headerMenuContainer");
    addIdToNode(cont, "header");
    var tb = document.getElementById("newLayoutTable");
    tb.parentNode.removeChild(tb);
}

function updateFark() {
    rearrangePage();
    var re = new RegExp("^http://www.fark.com/comments/(\\d+)/");
    var match = re.exec(document.location.href);
    var baseURL, pageID;

    if (match == null || match.length < 2) return;
    baseURL = match[0];
    pageID  = match[1];

    var comments = document.getElementsByClassName('ctext');
    st = document.createElement('style');
    st.type = 'text/css';
    st.innerHTML += ' .followup { margin-left: 10px; margin-top: 10px;}';
    st.innerHTML += ' .parent {border-left: 2px solid lightGrey !important;'
        + ' padding-left: 5px !important;}';
    document.getElementsByTagName('head')[0].appendChild(st);

    var re = new RegExp("^" + baseURL + "(\\d+)");

    for (var idx = 0; idx < comments.length; idx++) {
        var comment = comments[idx];
        var a = findMatchingAnchor(comment);
        if (a == undefined) continue;

        var match = re.exec(a);
        if (match == null || match.length < 2) continue;
        var parentID = "ct" + match[1];
        var thisID   = comment.id.substring(2);
        var parentDiv = document.getElementById(parentID);
        if (parentDiv == null) continue;
        addClass(parentDiv, "parent");
        var clsID = "followup";
        appendTo(parentDiv, "c"      + thisID, clsID);
        appendTo(parentDiv, "ctable" + thisID, clsID);
        appendTo(parentDiv, comment.id,        clsID);
    }
}

updateFark();
