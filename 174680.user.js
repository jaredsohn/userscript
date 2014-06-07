// ==UserScript==
// @name       bytebx premium zip
// @namespace  http://bytebx.com/
// @version    0.2
// @description  bytebx premium zipping util
// @match      http://*.bytebx.com/*
// @match      http://bytebx.com/*
// @copyright  2013+, Kenneth Chua
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
_node.title = 'cracked by Ken';
if(_node.href == 'javascript:void()')
        _node.title = 'cracked By Ken';
if(_node.href == 'javascript:premiumFeature();')
    _node.title = 'Please wait for us to crack it';
 
 
        //_node.innerHTML = '<span style="border: 3px dashed rgba(51, 204, 153, 0.25); -mox-box-shadow: 0 0 3px 3px rgba(51, 204, 153, 0.5) !important">'
        //      +_node.innerHTML+
        //      '</span>';
}
 
function fnPremiumify(_node)
{
_node.href = _node.href.replace('javascript:premiumZip','javascript:startZip');
}
 
// ]]>