// ==UserScript==
// @name           Bootleggers Rotating Barrel
// @namespace      bl_rotating_barrel
// @description    Enables the old school rotating barrel for new bootmail messages
// @include        http://www.bootleggers.us/*
// ==/UserScript==

newBMCheck();

function newBMCheck() {

    var bm_img = document.getElementById("messages").firstChild;
    var bm_img_name = bm_img.firstChild.src.substr(bm_img.firstChild.src.lastIndexOf('/') + 1);

    if (bm_img_name == 'barrel_full_2.gif') {
        bm_img.firstChild.src = 'http://i.imgur.com/EMxhG.gif';
    }

    setTimeout(newBMCheck, 750);
}