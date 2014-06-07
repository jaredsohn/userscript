// ==UserScript==
// @name            Prefill Deluxepass.com
// @namespace       deluxepass
// @include         http://*.deluxepass.com/*
// ==/UserScript==
var userpass = 'USER:PASS';


function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
        node.href = node.href.replace(match_re, replace_string);
    }
}

function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
        var allurls = doc.getElementsByTagName('A');
        for (var i = 0, url; url = allurls[i]; i++) {
            modify_single_url(doc, match_re, replace_string, url);
        }
    }
    else {
        modify_single_url(doc, match_re, replace_string, node);
    }
}

function do_platypus_script() {
    do_modify_url_it(window.document, '/HTML[1]', /http:\/\/members\.(.*?)\.deluxepass.com\//i, 'http://' + userpass + '@members.$1.deluxepass.com/', true);
}
window.addEventListener("load", function () {
    do_platypus_script();
}, false);