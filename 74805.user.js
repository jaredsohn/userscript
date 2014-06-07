// ==UserScript==
// @name           fanfeedr++
// @namespace      http://www.cmurphycode.blogspot.com
// @description    removes share bar
// @include        http://www.fanfeedr.com/*
// ==/UserScript==
var sharebar = document.getElementById('share_bar');
if (sharebar) {
    sharebar.parentNode.removeChild(sharebar);
}
var feedback = document.getElementById('uservoice-feedback');
if (feedback) {
    feedback.parentNode.removeChild(feedback);
}
