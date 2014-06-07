// ==UserScript==
// @name        Assignment fixer
// @namespace   jaredforsyth.com
// @include     https://plt-etc.byu.edu:9000/assignment/basic/self/edit*
// @version     1
// ==/UserScript==

jQuery(function(){
var left = document.body.getElementsByClassName('left')[0];
left.style['height']='100%';
left.style['overflow-y']='scroll';

var fnname = $('div.side-by-side-inner p')[0].innerHTML.split('&gt;')[1].replace(/^\s*/, '').replace(/\s*$/, '');
var item = $("div[class=line]:contains('define'):contains('" + fnname + " ')")[0];
$('div.left')[0].scrollTop += $(item).position().top-100;
});
