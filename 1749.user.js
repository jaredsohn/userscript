// ==UserScript==
// @name          FlashFix
// @description   Make sure that all flash movies will be viewable, correcting/adding the tag EMBED. Created by Nando Vieira - simplesideas.com.br.
// @namespace     http://simplesideias.com.br/greasemonkey/flashfix
// @include       *
// ==/UserScript==

(function() {
    setAttribute = function(element, attribute, value)
    {
        var attrib = document.createAttribute(attribute);
        attrib.value = value;
        element.attributes.setNamedItem(attrib);
    }
    
    var objects = document.getElementsByTagName('object');
    var len     = objects.length;
    var re      = /\.swf/mi
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
        setAttribute(embed, 'type', 'application/x-shockwave-flash');
        setAttribute(embed, 'pluginspage', 'http://www.macromedia.com/go/getflashplayer');
        
        for (var k = 0; k < params.length; k++) {
            var n = params[k].name.toLowerCase();
            var v = params[k].value;
            
            n = n == 'movie'? 'src' : n;
            
            setAttribute(embed, n, v);
        }
        o.parentNode.replaceChild(embed, o);
    }
    GM_log('Flashfix on ' + page);
    GM_log('Objects found: ' + len);
    GM_log('Objects replaced: ' + movies);
})();
