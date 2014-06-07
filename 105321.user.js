// <![CDATA[ 

// ==UserScript==
// @name           Mark Javascript
// @namespace      http://html-apps.com/greasemonkey/markjavascript
// @author         htmlapps
// @website        http://html-apps.com/
// @description    Puts a dashed border around Javascript links.
// @include        *
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @version        1
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
var anchors_length = anchors.length;
for (var i=0; i<anchors_length; i++) {
    if (anchors[i].protocol == 'javascript:')
		fnMarkJavascript(anchors[i]);
    else {
        continue;
    }
}

function fnMarkJavascript(_node) {
	_node.title = _node.href;
	_node.innerHTML = '<span style="border: 3px dashed rgba(51, 204, 153, 0.25); -mox-box-shadow: 0 0 3px 3px rgba(51, 204, 153, 0.5) !important">'
		+_node.innerHTML+
		'</span>';
}

// ]]>