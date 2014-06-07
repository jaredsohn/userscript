//
// Delete Plurks                               v1.0  2009.11.29
//
// A greasemonkey script by Peteris Krumins (peter@catonmat.net)
// http://www.catonmat.net  --  good coders code, great reuse
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey:
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Delete Plurks
// @namespace     http://www.catonmat.net
// @description   Adds a button to delete plurks on individual plurk page.
// @include       http://www.plurk.com/p/*
// ==/UserScript==

(function() {

function xpath(query) {
    var elems = document.evaluate(query, document, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var ret = [];
    for (var i = 0; i < elems.snapshotLength; i++) {
        ret.push(elems.snapshotItem(i));
    }
    return ret;
}

function xpath_map(query, fn) {
    var elements = xpath(query);
    for (var i = 0; i < elements.length; i++) {
        fn(elements[i]);
    }
}

function delete_plurk(plurk_id, id, li)
{
    var url = 'http://www.plurk.com/Responses/deleteResponse';
    var data = 'plurk_id=' + plurk_id + '&id=' + id;
    GM_xmlhttpRequest({
        method: 'POST',
        url: url,
        data: data,
        headers: {
            Referer: 'http://www.plurk.com',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        onload: function(response) {
            li.style.display = "none";
        }
    });
}

function element_str(query, filter) {
    try {
        str = xpath(query)[0].textContent;
        if (str) {
            return filter(str);
        }
    }catch(e){}    
}

function get_my_nick() {
    return element_str('//a[@id="login_link"]',
            function(str){
                return str.match(/Sign out \[(.+)\]/)[1].toLowerCase();
            });
}

function get_owner_nick() {
    return element_str("//a[@class='user-nick']",
            function(str){
                return str.toLowerCase();
            });
}

var my_nick    = get_my_nick();
var owner_nick = get_owner_nick();

var plurk_id_36 = document.location.href.match(/\/p\/(.+)/)[1];
var plurk_id    = parseInt(plurk_id_36, 36);

xpath_map("//li[contains(@id, 'response')]",
    function(li) {
        var id = li.id.match(/\d+/);
        var div = li.childNodes[3];
        var nick = div.childNodes[3].textContent.toLowerCase();

        if (owner_nick == my_nick || nick == my_nick) {
            var a = document.createElement('a');
            a.href='#delete';
            a.innerHTML = "delete";
            a.addEventListener('click', function(evt) {
                delete_plurk(plurk_id, id, li);
            }, false);
            div.appendChild(a);
        }
    });
})();
