// ==UserScript==
// @name           Amazon Search International
// @namespace      http://cecidozoa.org/
// @description    Insert international Amazon sites into the search category select-box.
// @include        http://www.amazon.*
// ==/UserScript==

(function() {
    var sites = {
        'Amazon.com': "http://www.amazon.com/",
        'Amazon.ca': "http://www.amazon.ca/",
        'Amazon.co.uk': "http://www.amazon.co.uk/",
        'Amazon.de': "http://www.amazon.de/",
        'Amazon.co.jp': "http://www.amazon.co.jp/",
        'Amazon.fr': "http://www.amazon.fr/",
    };
    var delegateSubmit = function(event) {
        var form = event.target;
        var select = form.getElementsByTagName('SELECT')[0];
        var target = select.options[select.selectedIndex];
        if(target.className != 'international') return true;
        var url = (function(s) {
            for(var name in s) if(target.innerHTML == name) return s[name];
            return "/";
        })(sites);
        form.action = url + 's';
        return true;
    };
    var selects = document.getElementsByName('url');
    for(var i = 0; i < selects.length; i++) {
        var element = selects[i];
        if(!element.tagName || element.tagName.toLowerCase() != 'select') return;
        var current = element.options[0];
        var next = current.nextSibling;
        for(var name in sites) {
            if(current.innerHTML == name) continue;
            var opt = document.createElement('option');
            opt.setAttribute('value', 'search-alias=aps');
            opt.setAttribute('class', 'international');
            opt.setAttribute('style', 'background:#efe;');
            opt.innerHTML = name;
            element.insertBefore(opt, next);
        }
        var form = element.form;
        form.addEventListener('submit', delegateSubmit, false);
    }
})();
