// ==UserScript== 
// Based on a script in Mark Pilgram's upcoming "Dive into Greasemonkey",

// @name         WHERE IS IT
// @namespace     http://userscripts.org/userscripts
// @description   Making VALS more useful
// @include        http://*.vermont.gov/*
 
// ==/UserScript== 

(function() {
    var replacements, regex, key, textnodes, node, s; 

    replacements = { 
        "VSQ9 ": "Franklin",
 "VSQ& ": "Hinesburg",
 "VSRS ": "Vernon",
 "VTK9 ": "Montpelier",
    }; 

    regex = {}; 
    for (key in replacements) { 
        regex[key] = new RegExp(key, 'g'); 
    } 

    textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

    for (var i = 0; i < textnodes.snapshotLength; i++) { 
        node = textnodes.snapshotItem(i); 
        s = node.data; 
        for (key in replacements) { 
            s = s.replace(regex[key], replacements[key]); 
        } 
        node.data = s; 
    } 

})();
