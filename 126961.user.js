// ==UserScript==
// @name          JavaFix
// @description   Make sure that all java object will load, correcting/adding the tag EMBED.
// @namespace     http://www.ingent.net/greasemonkey/javafix
// @include       *
// ==/UserScript==
//
// adapted from FlashFix http://userscripts.org/scripts/review/1749

(function() {
    setAttribute = function(element, attribute, value)
    {
        var attrib = document.createAttribute(attribute);
        attrib.value = value;
        element.attributes.setNamedItem(attrib);
    }

    var objects = document.getElementsByTagName('object');
    var len     = objects.length;
    var re      = /\.jar/mi
    var page    = location.href.split('/'); page = page[page.length-1];
    var movies  = 0;

    if (len == 0) return;

    for (var i = len-1; i >= 0; i--) {
        if(!re.test(objects[i].innerHTML)) continue
        movies++;
        var o       = objects[i];
        var embed   = document.createElement('embed');
        var params  = objects[i].getElementsByTagName('param');

        setAttribute(embed, 'width', o.width);
        setAttribute(embed, 'height', o.height);
        setAttribute(embed, 'id', o.id);
        setAttribute(embed, 'type', 'application/x-jinit-applet;version=1.3.1.9');
        setAttribute(embed, 'pluginspage', 'http://edmappoas.aecd.gov.ab.ca/prs/webhtml/jinit1319.exe');

        for (var k = 0; k < params.length; k++) {
            var n = params[k].name.toLowerCase();
            var v = params[k].value;

            n = n == 'archive'? 'java_archive' : n;
            n = n == 'code'? 'java_code' : n;
            n = n == 'codebase'? 'java_codebase' : n;

            setAttribute(embed, n, v);
        }
        o.parentNode.replaceChild(embed, o);
    }
    GM_log('Flashfix on ' + page);
    GM_log('Objects found: ' + len);
    GM_log('Objects replaced: ' + movies);
})();
