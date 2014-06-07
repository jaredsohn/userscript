// ==UserScript==
// @name        Case notes
// @namespace   http://userscripts.org/users/533474
// @include     https://*.visual.force.com/apex/*
// @version     0.1
// @description Case editable notes for the engineer to track
// @grant       none
// ==/UserScript==

var script_version = "0.1";
console.log("OverSun case notes " + script_version + " started");

unsafeWindow.casenotes_editNote = function(id) {
    var note = document.getElementById(id);
    if (note != null) {
        var casenote = localStorage.getItem(id);
        if (casenote == null) { casenote = ""; }
        note.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' id='"+id+"_input' value='"+casenote+"' width='320' onkeydown='if (event.keyCode == 13) { casenotes_addNote(\""+id+"\"); return false; }'>";
        var noteInput = document.getElementById(id + "_input");
        noteInput.focus();
    }
}

unsafeWindow.casenotes_addNote = function(id) {
    var noteInput = document.getElementById(id + "_input");
    if (noteInput != null) {
        var casenote;
        if (noteInput.value == "") {
            localStorage.removeItem(id);
            casenote = "add note";
        } else {
            localStorage.setItem(id, noteInput.value);
            casenote = noteInput.value;
        }
        var note = document.getElementById(id);
        if (note != null) {
            note.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<a style='text-decoration:none;' href='#' onClick='casenotes_editNote(\""+id+"\")'><font color='gray'>" + casenote + "</font></a>";
        }
    }
}

function casenotes_caseNotes() {
    var nodes;
    var elements = document.getElementsByClassName('x-grid-group-body');
    
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].id.match(/^.*newWorkType.*-bd$/) != null) {
            nodes = elements[i].childNodes;
            for(var b = 0; b < nodes.length; b++) {
                var divid = "casenotes_" + nodes[b].children[0].children[0].children[0].children[2].children[0].children[0].innerHTML;
                var div;
                div = document.getElementById(divid);
                if (div == null) {
                    div = document.createElement("div");
                    div.id = divid;
                }
                var casenote = localStorage.getItem(divid);
                if (casenote == null || casenote == "") { casenote = "add note"; }
                div.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;<a style='text-decoration:none;' href='#' onClick='casenotes_editNote(\"" + divid + "\")'><font color='gray'>" + casenote + "</font></a>";
                nodes[b].children[0].children[0].children[0].children[8].appendChild(div);
            }
        }
    }
}
/*
var _reloadDataBacklogQ = unsafeWindow.reloadDataBacklogQ;
unsafeWindow.reloadDataBacklogQ = function() {
    console.log("caseNotes()");
    _reloadDataBacklogQ();
    setTimeout(caseNotes, 1000);
};
*/

var _startBlogTimer = unsafeWindow.startBlogTimer;
unsafeWindow.startBlogTimer = function() {
    _startBlogTimer();
    console.log("caseNotes()");
    setTimeout(casenotes_caseNotes, 1000);
};
