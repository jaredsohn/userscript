// ==UserScript==
// @name           Hide zerolike.com ads
// @namespace      hide_images_zerolike.com
// @description    hide annoying ad images on zerolike.com
// @include        http://*zerolike.com*/*
// ==/UserScript==

function hide_imgs()
{
	for(i=0;i<9;i++)document.images.item(i).width=0;
}

window.addEventListener(
    'load', 
    hide_imgs(),
    true);
