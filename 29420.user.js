// ==UserScript==
// @name           OSXDictionary
// @namespace      http://pc11.2ch.net/test/read.cgi/mac/1213839598/
// @description    Look up a word in Dictionary.app
// @include        *
// ==/UserScript==
// @version        1.0.1

(function() {
    var toggleModeWithComboKeys = true;
    var comboKeys = {
        metaKey: true
       ,altKey: false
       ,shiftKey: false
       ,ctrlKey: false
    };
    var prefixURI = 'dict:///';
    var convertTwoByteASCII = true;

    var activate = function (eventParams) {
        if (toggleModeWithComboKeys != checkComboKeys(eventParams)) return;
        var q = window.getSelection().toString().replace(/^\s+|\s+$/g, '');
        if (convertTwoByteASCII) {
            q = q.replace(/[\uff10-\uff19\uff21-\uff3a\uff41-\uff5a]/g, function (z) {return String.fromCharCode(z.charCodeAt(0) - 65248);});
        }
        if (q) {
            var URI = prefixURI + encodeURIComponent(q);
            window.open(URI, '_top');
            window.open(URI, '_top');
        }
    }
    var checkComboKeys = function(params) {
        for (var k in comboKeys) {
            if (params[k] != comboKeys[k]) return false;
        }
        return true;
    }

    window.addEventListener('dblclick', activate, false);
})();