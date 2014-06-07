// ==UserScript==
// @name           Danbooru IQDB
// @namespace      danbooru_iqdb
// @description    Adds IQDB Button to Danbooru upload page.
// @include        http://danbooru.donmai.us/post/upload*
// ==/UserScript==

var danbooruURL = 'http://danbooru.donmai.us/post/create';
var iqdbURL = 'http://danbooru.iqdb.hanyuu.net/';
// var iqdbURL = 'http://danbooru.iqdb.yi.org/';

function add_after(e, newe) {
    e.parentNode.insertBefore(newe, e.nextSibling);
}

function add_before(e, newe) {
    e.parentNode.insertBefore(newe, e);
}

function onclick_iqdb(e) {
    document.getElementById('post_source').name = "url";
    document.getElementById('post_file').name = "file";    
    document.forms[0].action = iqdbURL;
    // document.forms[0].target = "_blank";
    document.forms[0].target = "iqdbframe";
}


function onclick_commit(e) {
    document.getElementById('post_source').name = "post[source]";
    document.getElementById('post_file').name = "post[file]";    
    document.forms[0].action = danbooruURL;
    document.forms[0].target = "";
}


function add_button() {
    var allInputs = document.getElementsByTagName('input');
    for (var i = 0; i < allInputs.length; i++) {
        var commit = allInputs[i];

        if (commit.name != "commit") {
            continue;
        }
        
        var iqdb = document.createElement('input');
        iqdb.type = 'submit';
        iqdb.value = 'IQDB';
        iqdb.addEventListener('click', onclick_iqdb, true);
        commit.addEventListener('click', onclick_commit, true);
        add_after(commit, iqdb);
    }

    var iframe = document.createElement("iframe");
    iframe.src = "about:blank";
    iframe.name = "iqdbframe";
    iframe.width = 500;
    iframe.height = 400;
    iframe.align = "right";
    

    var element = document.getElementById("edit-form");
    add_before(element, iframe);

    
}

window.addEventListener('load', add_button, true);
