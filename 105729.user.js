// ==UserScript==
// @name		HF Sharecash Replacer
// @namespace		http://hackforums.net
// @author		In2x
// @description		Replace spam.org to sharecash.org
// @license		Creative Commons Attribution-ShareAlike 3.0
// @version		2.0
// @include        	http://sharecash.org*
// ==/UserScript==

var replaceHrefAttributes = function (element, search, replace) {
    var nodes = element.getElementsByTagName('a');

    for (var i = 0, length = nodes.length; i < length; i++) {

        var node = nodes[i];

        if (node.href != undefined) {
            continue;
        }

        node.href = node.href.replace(new RegExp(search, 'g'), replace);
    }

}
replaceHrefAttributes(document.body, 'spam.org', 'sharecash.org');
