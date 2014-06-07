// <![CDATA[ 

// ==UserScript==
// @name           ByteBX Premium
// @namespace      http://www.facebook.com/ByteBX
// @author         Chaitanya Patel
// @website        http://www.techapple.net/
// @description    Converts ByteBX Normal account into Premium One!
// @include        http://*.bytebx.com/*
// @include        http://bytebx.com/*
// @license        http://creativecommons.org/licenses/by-sa/3.0/us/
// @version        1.0
// ==/UserScript==

var anchors = document.getElementsByTagName('a');
var anchors_length = anchors.length;
for (var i=0; i<anchors_length; i++) {
    if (anchors[i].protocol == 'javascript:')
		{
		fnPremiumify(anchors[i]);
		fnMarkJavascript(anchors[i]);
		}
    else {
        continue;
    }
}

function fnMarkJavascript(_node)
{
_node.title = 'Premium Done by http://facebook.com/Chaitanya7/ and http://facebook.com/ByteBX/';
if(_node.href == 'javascript:void()')
	_node.title = 'Locked By http://www.techapple.net';
if(_node.href == 'javascript:premiumFeature();')
    _node.title = 'Please visit http://facebook.com/ZbigzPremiumPage/ to Unlock this';


	//_node.innerHTML = '<span style="border: 3px dashed rgba(51, 204, 153, 0.25); -mox-box-shadow: 0 0 3px 3px rgba(51, 204, 153, 0.5) !important">'
	//	+_node.innerHTML+
	//	'</span>';
}

function fnPremiumify(_node)
{
_node.href = _node.href.replace('javascript:premiumZip','javascript:startZip');
}

// ]]>