// ==UserScript==
// @name          Freerice Cheat
// @namespace     http://www.gorniplatz.com
// @description   Mash up dictionary.com and freerice.com
// @include       http://www.freerice.com
// ==/UserScript==

// This script is for educational purposes only.  Don't steal teh rice.
// And click on the ads, especially when you hit 50.

// Copyright (C) 2008 Gorniplatz.  Released under the
// Creative Commons BSD License.
// See http://creativecommons.org/licenses/BSD/ for details

(function() {
var Cheater = function() {}

var addGlobalStyle = function(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

Cheater.prototype.get_word = function() {
    try {
        var xpaths = [
            '/html/body/form/div/div[2]/div[3]/div/ol/li/strong', // first page
            '/html/body/form/div/div[2]/div[2]/div[2]/div/ol/li/strong'
        ];
        var xpath = xpaths[document.getElementById('ricePicture') ? 1 : 0];
        return document.evaluate(xpath, document, null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                     null).snapshotItem(0).textContent;
    } catch(ex) {
        GM_log("get_word: " + ex);
        return null;
    }
};

Cheater.prototype.dictcb = function(r) {
    if (r.readyState < 4) {
        return;
    }
    if (r.status != 200) {
        GM_log("dictcb: status = " + r.status);
        return;
    }
    var rt = r.responseText;
    var defStart = '<!--BOF_DEF-->';
    var defEnd = '<!--EOF_DEF-->';
    var stIdx = rt.indexOf(defStart);
    var endIdx = rt.lastIndexOf(defEnd);
    if (stIdx == -1 || endIdx == -1) {
        GM_log("can't find targets in the response text: " + rt);
        alert("Can't find a definition for " + this.orig_word);
        return;
    }
    var innerDiv = document.createElement("div");
    innerDiv.id = "cheatDiv";
    addGlobalStyle(["#cheatDiv",
                    "{",
                    "position: absolute;",
                    "top: 20px;",
                    "left: 30px;",
                    "margin: 10px 0px 10px;",
                    "border: solid GoldenRod;",
                    "background-color: white;",
                    "}"].join(" "));
    innerDiv.innerHTML = rt.substring(stIdx, endIdx);
    document.getElementById("contentSecRight").appendChild(innerDiv);
};

Cheater.prototype.do_cheat = function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.orig_word = this.get_word();
    if (!this.orig_word) return;
    if (!GM_xmlhttpRequest) {
        alert('Please upgrade to the latest version of Greasemonkey.');
        return;
    }
    var self = this;
    var request = {
        method : 'GET',
        url: 'http://dictionary.reference.com/browse/' + escape(this.orig_word),
        onreadystatechange: function(resp) { self.dictcb(resp); },
        onerrorCallback: function(responseDetails) {
            GM_log("onerrorCallback: " + responseDetails);
        }
    };
    GM_xmlhttpRequest(request);
};

Cheater.prototype.init_button = function() {
    var contentSecLeftBot = document.getElementById("contentSecLeftBot");
    if (!contentSecLeftBot) {
        GM_log("There is no contentSecLeftBot");
        return;
    }
    var target = contentSecLeftBot.getElementsByTagName("p")[0];
    if (!target) {
        GM_log("can't find the vocabLevel element, bailing out");
        return;
    }
    var button = document.createElement("button");
    button.id = 'gm_askHint';
    button.innerHTML = "<b>Hint...</b>";
    var self = this;
    button.addEventListener('click', function(event) { self.do_cheat(event); }, true);
    addGlobalStyle(["#gm_askHint {",
                    "display:inline;",
                    "width: 60px;",
                    "height: 24px;",
                    "margin-left: 210px;",
                    "margin-bottom: -10px;",
                    "background-color: #c2ce79;",
                    "border-right: 1px solid #ffffd8;",
                    "}"].join(" "));
    target.parentNode.insertBefore(button, target);
};
new Cheater().init_button();
})();