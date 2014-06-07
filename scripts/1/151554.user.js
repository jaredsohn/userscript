// ==UserScript==
// @name			MThai SkipAD
// @description		MThai SkipAD v.1
// @author			Mr.birdmonter
// @include     http://video.mthai.com/*

// ==/UserScript==

function removeElement(id) 
{
var element = document.getElementById(id);
element.parentNode.removeChild(element);
}
removeElement('iframe-ad-topbanner');
removeElement('iframe-ad-rectangle');
removeElement('topbar_menu');
removeElement('topbar');
removeElement('header');
removeElement('head-block');
removeElement('head-bar');
removeElement('sidebar');
removeElement('comment-box');
removeElement('comment-list');
removeElement('ads0');
removeElement('footer');
removeElement('abgb');
removeElement('sidebar');
skipad();