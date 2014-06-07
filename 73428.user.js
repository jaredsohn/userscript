// ==UserScript==
// @name           Golem.de flexibles Layout
// @namespace      local
// @description    Layout mit flexibler Breite
// @include        http://www.golem.de/
// @include        http://www.golem.de/*
// ==/UserScript==
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i = 0, j = els.length; i < j; i ++) {
        if(re.test(els[i].className))a.push(els[i]);
    }
    return a;
}

function getSubNodes(node, nodename) {
    var returnarray = [];
    var meldung = "";
    if (node.childNodes.length > 0) {
        for (var i = 0; i < node.childNodes.length; i ++) {
            if (node.childNodes[i].nodeValue != "#text" && node.childNodes[i].nodeValue != "#comment") {
                if (nodename == "" || nodename.toUpperCase() == node.childNodes[i].nodeName) {
                    returnarray.push(node.childNodes[i]);
                } else {
                    meldung += " "+node.childNodes[i].nodeName;
                }
            }
        }
        return returnarray;
    } else {
        return null;
    }
}

var contentelement = getElementsByClassName("all");
for (var i = 0; (element = contentelement[i]) != null; i ++) {
    if (contentelement[i].nodeName == "TABLE") {
        contentelement[i].style.width = "100%";
        var tbody = getSubNodes(contentelement[i], "TBODY")[0];
        var firstcolumn = getSubNodes(tbody, "TR")[0];
        var adcell = getSubNodes(firstcolumn, "TD")[4];
        adcell.style.display = "none";
        firstcolumn.removeChild(adcell);
        var contentcolumn = getSubNodes(tbody, "TR")[3];
        var contentcell = getSubNodes(contentcolumn, "TD")[1];
        for (var j = 0, current = getSubNodes(contentcell, "TABLE"); j < current.length; j ++) {
            current[j].style.width = "100%";
        }
        for (var j = 0, current = getSubNodes(contentcell, "DIV"); j < current.length; j ++) {
            if (current[j].style.width.search(/480/) != -1) {
                current[j].style.width = "100%";
            }
        }
    }
}