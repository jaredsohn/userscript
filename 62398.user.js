// ==UserScript==
// @name           TwitterSuggest
// @namespace      http://userscripts.org/users/118388/scripts
// @include        http://search.twitter.com/search?q=*
// ==/UserScript==
var script = document.createElement('script');
script.type = 'text/javascript';
script.textContent = [
    '(function(){',
        'var $ = (function(element){',
            'return function(selectors){',
                'if (element[selectors]) return element[selectors];',
                'element[selectors] = document.querySelector(selectors);',
                'return element[selectors];',
            '};',
        '})({});',
        'var name = $("#searchBox").name;',
        '$("#searchBox").removeAttribute("name");',
        'var onfocus = function(){',
            'this.name = name;',
        '};',
        'var onblur = function(){',
            'this.removeAttribute("name");',
        '};',
        '$("#searchBox").addEventListener("focus", onfocus, false);',
        '$("#searchBox").addEventListener("blur", onblur, false);',
        '$("#searchBox").setAttribute("autocomplete", "off");',
        'var oq = $("#searchBox").value;',
        'window.setInterval(function(){',
            'var q = $("#searchBox").value;',
            'if (q == oq) return;',
            'var script = document.createElement("script");',
            'script.src =',
                '"http://clients1.google.com/complete/search?q="',
              '+ encodeURIComponent(q);',
            'script.type = "text/javascript";',
            'document.body.appendChild(script);',
            'oq = q;',
        '}, 1);',
        // callback
        'window.google = {',
            'ac: {',
                'h: function(array){',
                    'array[1].forEach(function(array){',
                        'var dupNode = $("#searchBox").cloneNode(true);',
                        'dupNode.value = array[0];',
                        'dupNode.removeAttribute("name");',
                        'dupNode.addEventListener("focus", onfocus, false);',
                        'dupNode.addEventListener("blur", onblur, false);',
                        'if ($("#searchBox").nextElementSibling) {',
                            '$("#searchEntry").insertBefore(',
                                'dupNode,',
                                '$("#searchBox").nextElementSibling',
                            ')',
                        '} else {',
                            '$("#searchEntry").appendChild(dupNode);',
                        '}',
                    '});',
                '}',
            '}',
        '};',
    '})();'
].join('');
document.body.appendChild(script);
