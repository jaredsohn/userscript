// ==UserScript==
// @name           /a/ - Animoe & Mangar
// @namespace      4chan.org
// @description    Change /a/'s title to "/a/ - Animoe & Mangar"
// @include        http://boards.4chan.org/a/*
// ==/UserScript==

GM_addStyle("div.logo input {font-size:21px;}");

title_text = GM_getValue('title', "/a/ - aniMOE & manGAR");

title = document.querySelector('div.logo font b span');
title_text_node = title.firstChild;

title_text_node.nodeValue = title_text;
document.querySelector('title').firstChild.nodeValue = title_text;

title.addEventListener('dblclick', function(e) {
    input = document.createElement('input');
    input.value = title_text_node.nodeValue;

    input.addEventListener('blur', function(e) {
        GM_setValue('title', this.value);
        title_text_node.nodeValue = this.value;
        document.querySelector('title').firstChild.nodeValue = this.value;

        this.parentNode.replaceChild(title_text_node, input);
    }, true);

    this.replaceChild(input, title_text_node);
    input.select();
}, true);

