// ==UserScript==
// @name          Hatena Rolling
// @namespace     http://antipop.gs/ns/greasemonkey/HatenaRolling
// @description   This script creates a tiny box in the bottom right corner of the browser's window when you are in "Hatena". It contains some links to other services of "Hatena" the user whose page is currently displayed may use.
// @include       http://*.hatena.ne.jp/*
// ==/UserScript==
// version        0.03
// author         kentaro <k_dot_kentaro_at_antipop_dot_gs>
// license        modified BSD License style
// thanks to      mala <http://la.ma.la/blog/>
//
// Changes
//     0.03       added links to Hatena::Map, Hatena::Idea
//     0.02       added link to Hatena::RSS
//     0.01       initial release

(function () {
    var hatenaUrlPattern = '^http:\/\/(a|b|d|f|i|map|r)\.hatena\.ne\.jp\/([^/]+)\/?(.*)$';
    var hatenaUrlRegExp  = new RegExp(hatenaUrlPattern);
    var hatenaServices   = {
        'a'   : 'Antenna',
        'b'   : 'Bookmark',
        'd'   : 'Diary',
        'f'   : 'Fotolife',
        'i'   : 'Idea',
        'map' : 'Map',
        'r'   : 'RSS',
    };

    if (location.href.match(hatenaUrlRegExp)) {
        var userPages = new Array();
        if (i != 'd' && RegExp.$3 != 'about') {
            userPages['About'] = 'http://d.hatena.ne.jp/' + RegExp.$2 + '/about';
        }

        for (var i in hatenaServices) {
            if(!hatenaServices.hasOwnProperty(i)) continue;
            if (!userPages['About'] || i != RegExp.$1) {
                userPages[hatenaServices[i]] =
                    'http://' + i + '.hatena.ne.jp/' + RegExp.$2 + '/';
            }
        }

        appendRollingBox(userPages);
    }

    function appendRollingBox (userPages) {
        var nodeUl = document.createElement('ul');
        with (nodeUl.style) {
            color           = '#333333';
            backgroundColor = '#fafad2';
            lineHeight      = '1.5em';
            border          = 'none';
            borderLeft      = 'solid 2px #333333';
            borderTop       = 'solid 2px #333333';
            position        = 'fixed';
            bottom          = '0';
            right           = '0';
            margin          = '0';
            padding         = '0.2em 1em';
        }

        for (var i in userPages) {
            if(!userPages.hasOwnProperty(i)) continue;
            nodeUl.appendChild(createLinkList(i, userPages[i]));
        }

        document.body.appendChild(nodeUl);
        nodeUl.addEventListener('dblclick', makeListener(nodeUl), false);
    }

    function createLinkList (text, url) {
        var nodeText = document.createTextNode(text);

        var nodeA = document.createElement('a');
        with (nodeA.style) {
            fontSize        = '90%';
            fontWeight      = 'normal';
            fontStyle       = 'normal';
            fontFamily      = '"trebuchet ms", sans-serif';
            textDecoration  = 'none';
            color           = '#333333';
            backgroundColor = '#fafad2';
            border          = 'none';
            margin          = '0 0.3em';
            padding         = '0';
        }
        nodeA.href = url;
        nodeA.appendChild(nodeText);

        var nodeLi = document.createElement('li');
        with (nodeLi.style) {
            display = 'inline';
            border  = 'none';
            margin  = '0';
            padding = '0';
        }
        nodeLi.appendChild(nodeA);

        return nodeLi;
    }

    function makeListener (node) {
        return function () {
            node.parentNode.removeChild(node);
        }
    }

})();
