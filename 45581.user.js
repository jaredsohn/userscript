//
// Plurk Translator                       v1.2    2009.03.21
//
// A greasemonkey script by Peteris Krumins (peter@catonmat.net)
// http://www.catonmat.net  -  good coders code, great reuse
//
// --------------------------------------------------------------------
//
// Version history:
// v1.0, 2009.03.17 - adds 'translate' button to all plurks
// v1.1, 2009.03.18 - clicking 'translate' now translates responses
// v1.2, 2009.03.21 - made the code a little nicer
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
// @name          Plurk Translate
// @namespace     http://www.catonmat.net
// @description   Translates plurks to different languages
// @include       http://www.plurk.com/*
// ==/UserScript==

(function() {

function xpath(query) {
    var elems = document.evaluate(query, document, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var ret = []
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

function translate(str, lang, callback) {
    url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' +
          escape(str) + '&langpair=%7C' + lang;
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            Referer: document.location
        },
        onload: function(response) {
            callback(eval('(' + response.responseText + ')'));
        }
    });
}

function translate_plurk(text_holder) {
    txt = text_holder.innerHTML;
    translate(txt, 'en', function (response) {
        text_holder.innerHTML = response.responseData.translatedText;
    });
}

function translate_responses() {
    xpath_map("//div[@class='list']//*//div[@class='text_holder']",
        function(text_holder) {
            translate_plurk(text_holder);
        });
}

function create_translate_link(text_holder) {
    var div = document.createElement('div');
    div.style.textAlign='right';
    div.className = 'translate';
    var a = document.createElement('a');
    a.innerHTML = "translate";
    a.addEventListener('click', function(evt) {
            translate_plurk(text_holder);
            translate_responses();
            evt.stopPropagation();
    }, false);
    div.appendChild(a);
    text_holder.parentNode.insertBefore(div, text_holder.nextSibling);
}

function has_parent(elem, name, cls) {
    while (elem.parentNode) {
        if (elem.parentNode.tagName == name.toUpperCase() &&
            elem.parentNode.className == cls)
        {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
}

setInterval(function () {
    xpath_map("//div[contains(@class, 'text_holder')]",
        function(text_holder) {
            if (text_holder.nextSibling &&
                text_holder.nextSibling.className == "translate")
            {
                return;
            }
            if (has_parent(text_holder, 'div', 'plurk_box')) {
                return;
            }
            create_translate_link(text_holder);
    });
}, 500);

})();

