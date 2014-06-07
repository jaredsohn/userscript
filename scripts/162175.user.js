
// ==UserScript==
// @name           d2jsp.org post blocker
// @namespace      http://userscripts.org/
// @author         .
// @description    block specific user post on d2jsp.org
// @include        http://forums.d2jsp.org/topic.php?*
// @include        http://forums.d2jsp.org/guild.php?*
// @include        http://forums.d2jsp.org/post.php*
// @grant          none
// @version        1.0
// @license        2013+, ?
// ==/UserScript==


(function () {

    (function () {
        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function (searchElement) {
                "use strict";
                if (this == null) {
                    throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (len === 0) {
                    return -1;
                }
                var n = 0;
                if (arguments.length > 1) {
                    n = Number(arguments[1]);
                    if (n != n) {
                        n = 0;
                    } else if (n != 0 && n != Infinity && n != -Infinity) {
                        n = (n > 0 || -1) * Math.floor(Math.abs(n));
                    }
                }
                if (n >= len) {
                    return -1;
                }
                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                for (; k < len; k++) {
                    if (k in t && t[k] === searchElement) {
                        return k;
                    }
                }
                return -1;
            }
        }
    })()

    function $(ar, r) {
        var root = r || document;
        var sS = ar.substr(0, 1);
        switch (sS) {
            case '#':
                return root.getElementById(ar.substring(1));
                break;
            case '.':
                var clas = root.getElementsByClassName(ar.substring(1));
                if (!clas.length) return 0;
                if (clas.length == 1) return clas[0];
                return clas;
                break;
            case '>':
                var name = root.getElementsByName(ar.substring(1));
                if (!name.length) return 0;
                if (name.length == 1) return name[0];
                return name;
                break;
            default:
                var temp = [],
                    tag = root.getElementsByTagName(ar);
                if (tag.length) {
                    tag.length == 1 ? tag = tag[0] : 0;
                    return tag;
                }
                var xpath = document.evaluate(".//" + ar, root, null, 5, null),
                    node;
                while (node = xpath.iterateNext()) {
                    temp.push(node);
                }
                temp.length == 1 ? temp = temp[0] : temp.length == 0 ? temp = 0 : temp;
                return temp;
        }
    }

    function each(obj, callback) {
        var i = 0,
            len = obj.length;
        for (var value = obj[0]; i < len && callback.call(value, i, value) !== false; value = obj[++i]) {}
    }

    function findParent(link, ln) {
        for (; link; link = link.parentNode) {
            if (link.localName == ln) return link;
        }
    }

    function addEvent(a, b, c) {
        if (a.addEventListener) {
            a.addEventListener(b, c, false);
        }
    }

    var blackKey = 'blacklist';

    function setter() {
        var val = JSON.stringify(S.blacklist);
        localStorage.clear();
        localStorage.setItem(blackKey, val);
    }

    function getter() {
        var val = localStorage.getItem(blackKey);
        if (val) return JSON.parse(val);
        return [];
    }

    var S = {};
    S.c = {};
    S.blacklist = [];
    S.target = null;

    S.markup = {
        show: '<a class="show hidden">Show Post</a>',
        block: '<a class="block">Block Post</a>',
        unblock: '<div class="unblock hidden"><span>Post by this user is blocked. </span><a>unblock</a></div>',
        collapse: '<a class="collapse">Collapse Post</a>'
    }

    S.style = (function () {
        return ['',
            '<style type="text/css">',
            '.hide, .show, .block, .collapse, .expand, .unblock a {',
            '   cursor: pointer;',
            '}',
            '.block {',
            '   color: green;',
            '	font-weight: bold;',
            '}',
            '.unblock {',
            '    text-align: center;',
            '    height: 16px;',
            '    line-height: 16px;',
            '    font-size: 11px;',
            '    font-wieght: bold;',
            '    position: relative;',
            '    color: #DD151E;',
            '    font-weight: bold;',
            '    padding: 2px 0;',
            '    border-top: 1px solid #232323;',
            '}',
            '.hidden {',
            '    display: none;',
            '}',
            '</style>',
            ''].join('\n');
    })()

    S.append = function (el, markup, opt) {
        el.insertAdjacentHTML(opt, markup);
        if (!/cursor/i.test(markup)) {
            var selector = '.' + /class=['"]([^'"]+)["']/i.exec(markup)[1];
            return $(selector, el);
        }
    }

    S.init = function () {
        S.blacklist = getter();
        S.append(document.head, S.style, 'beforeend');
        each($('dl/dt/a[contains(@href,"user")]'), function (i, link) {
            S.setup(link);
        });
    }

    function revert(el) {
        if (el.classList.contains('hidden')) el.classList.remove('hidden');
    }

    function hideme(el) {
        el.className += ' hidden';
    }

    S.setup = function (link) {
        var obj = S.aC(link),
            hideshow, block, unblock, collapse;

        hideshow = S.append(obj.parentSH, S.markup.show, 'afterbegin');
        block = S.append(obj.parentB, S.markup.block, 'beforeend');
        unblock = S.append(obj.parentUn, S.markup.unblock, 'beforeend');
        collapse = S.append(obj.parentSH, S.markup.collapse, 'afterbegin');

        if (S.blacklist.length > -1 && S.blacklist.indexOf(obj.user) > -1) {
            each([hideshow, unblock], function (i, el) {
                revert(el);
            });
            each([block, obj.content, collapse], function (i, el) {
                hideme(el);
            });
        }
        each([hideshow, block, unblock, collapse], function (i, el) {
            addHandler(el)
        })
        cacheKey++;
    }

    function toogleSH(el) {
        S.target = S.gC(el);
        if (el.className == 'show') {
            hideme(S.target.unblock);
            revert(S.target.content);
            el.className = 'hide';
            el.textContent = 'Hide Post';
            return;
        }
        if (el.className == 'hide') {
            hideme(S.target.content);
            revert(S.target.unblock);
            el.className = 'show';
            el.textContent = 'Show Post';
        }
    }

    function showHideHandler(e) {
        toogleSH(this);
        e.preventDefault();
    }

    function block(el) {
        S.target = S.gC(el);
        if (S.blacklist.indexOf(S.target.user) == -1) {
            S.blacklist.unshift(S.target.user);
            setter();
            for (var key in S.c) {
                if (S.c[key].user == S.target.user) {
                    block(S.c[key].unblock);
                }
            }
            return;
        }
        each([S.target.unblock, S.target.SH], function (i, el) {
            revert(el);
        });
        each([S.target.block, S.target.content, S.target.collapse], function (i, el) {
            hideme(el);
        })
    }

    function blockHandler(e) {
        block(this);
        e.preventDefault();
    }

    function unblock(el) {
        S.target = S.gC(el),
        pos = S.blacklist.indexOf(S.target.user);
        if (pos > -1) {
            S.blacklist.splice(pos, 1);
            setter();
            for (var key in S.c) {
                if (S.c[key].user == S.target.user) unblock(S.c[key].unblock);
            }
            return;
        }
        each([S.target.SH, S.target.unblock], function (i, el) {
            hideme(el);
        })
        each([S.target.block, S.target.content, S.target.collapse], function (i, el) {
            revert(el);
        })
        if (/expand/i.test(S.target.collapse.className)) {
            S.target.collapse.className = 'collapse';
            S.target.collapse.textContent = 'Collapse Post';
        }
    }

    function unblockHandler(e) {
        unblock(this);
        e.preventDefault();
    }

    function collapsePost(el) {
        S.target = S.gC(el);
        if (el.className == 'expand') {
            revert(S.target.content);
            el.className = 'collapse';
            el.textContent = 'Collapse Post';
            return;
        }
        if (el.className == 'collapse') {
            hideme(S.target.content);
            el.className = 'expand';
            el.textContent = 'Expand Post';
        }

    }

    function colHandler(e) {
        collapsePost(this);
        e.preventDefault();
    }

    function addHandler(el) {
        if (el[expand] == undefined) el[expand] = cacheKey;
        var obj = S.gC(el);
        if (/\bshow\b|\bhide\b/i.test(el.className)) {
            if (!obj.SH) S.c[cacheKey].SH = el;
            addEvent(el, 'click', showHideHandler);
        }
        if (/\bblock\b/i.test(el.className)) {
            if (!obj.block) S.c[cacheKey].block = el;
            addEvent(el, 'click', blockHandler);
        }
        if (/\bunblock\b/i.test(el.className)) {
            if (!obj.unblock) S.c[cacheKey].unblock = el;
            if (el.localName != 'a') {
                el = $('a', el);
                if (el[expand] == undefined) el[expand] = cacheKey;
            }
            addEvent(el, 'click', unblockHandler);
        }
        if (/\bcollapse\b|\bexpand\b/.test(el.className)) {
            if (!obj.collapse) S.c[cacheKey].collapse = el;
            addEvent(el, 'click', colHandler);
        }
    }

    var expand = 'cacheKey',
        cacheKey = 1;

    S.aC = function (link) {
        link = findParent(link, 'dl');
        var key = link[expand];
        if (key == undefined) {
            key = cacheKey;
            link[expand] = key;
        }
        var obj = S.mO(link);
        S.c[key] = obj;
        return obj;
    }

    S.gC = function (el) {
        var key = el[expand];
        return (key in S.c && S.c[key])
    };

    S.mO = function (link) {
        var obj = {
            container: link,
            user: $('a[contains(@href,"user")]', link).textContent,
            content: $('.ftb', link),
            parentSH: $('.fR', link),
            parentB: $('.bc1', link),
            parentUn: $('dd', link),
            unblock: null,
            block: null,
            SH: null,
            collapse: null
        };
        return obj;
    }

    S.init();

})(window);