// ==UserScript==
// @name        Grafikart fixed topbar
// @namespace   http://wtlink.be
// @description Fix the Grafikart.fr topbar to top
// @include     http://*.grafikart.fr*
// @grant	none
// @version     1.1
// @copyright   2012+, bendem
// ==/UserScript==
function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
var header = getElementsByClassName('header')[0];
var subhead = getElementsByClassName('subhead')[0];
header.style.position = 'fixed';
header.style.zIndex = 4;
header.style.left = 0;
header.style.right = 0;
header.style.top = 0;
subhead.style.marginTop = '53px';