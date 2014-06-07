// ==UserScript==
// @name          Kill AddThis Mouseover
// @namespace     http://www.couldthou.com
// @description   Remove the AddThis mouseover effect from links, because you're not very social anyways
// @include       *
// ==/UserScript==

var a_list = document.getElementsByTagName('a');
var addthis=new RegExp('addthis_open');
for (var i = 0; i < a_list.length; i++) {
    var node = a_list[i];
    if (addthis.test(node.getAttribute('onmouseover'))) {
        node.setAttribute('onmouseover', '');
    }
}
