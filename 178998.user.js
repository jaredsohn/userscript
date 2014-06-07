// ==UserScript==
// @name        volgistics Remove Checkboxes from Tab Order
// @namespace   http://www.volgistics.com/~SkipTabs
// @include     https://www.volgistics.com/ex/core.dll/Volunteers?TAB=Post
// @version     1
// ==/UserScript==

    var node_list = document.getElementsByTagName('input');
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
        if (node.getAttribute('type') == 'CHECKBOX') {
            node.tabIndex="-1";
        }
    } 

