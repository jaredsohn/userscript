//
// Citadel Posting Upgrade
//
// A tiny enhancement for the Strolen's Citadel (www.strolen.com), and my first 
// experiment with Greasemonkey. It's only purpose is to enlarge the posting area 
// a little, and put a focus on the 'title' field, so you can start typing right 
// away, while the idea is still hot. 
//
// Only intended for the Add Submission page for now, later there may be more.
//
//
// ==UserScript==
// @name           Citadel Posting Upgrade
// @namespace      http://www.strolen.com/
// @description    Enlarging the posting area and focusing on the first field.
// @include        http://www.strolen.com/node.php*
// ==/UserScript==

var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('textarea');
for (var i = 0; i < allTextareas.length; i++) {
    textarea = allTextareas[i];
    
    if(textarea.name=='desc1'){
        textarea.rows = 25;
        textarea.cols = 80;
    }
}


var titleFields = document.getElementsByTagName('input');
for (var i = 0; i < titleFields.length; i++) {
    tField = titleFields[i];
    
    if(tField.name=='title'){
        tField.focus();
        return;
    }
}
