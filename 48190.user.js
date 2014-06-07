// ==UserScript==
// @name           Center Box
// @namespace      http://userscripts.org/users/23652
// @description    Creates a box in the exact center of the page and moves itself when the browser is resized
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// alignCenter by JoeSimmons
// Instructions: Supply an id string or node element as a first argument
function alignCenter(e) {
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
if(!window || !node || !node.style) {return;}
var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
if(style.display=='none') style.opacity='0';
if(style.display!='') style.display = '';
style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
style.display = beforeDisplay;
style.opacity = beforeOpacity;
}

// Create box with certain style
var box = document.createElement('div');
	box.id = 'center_div';
	box.textContent = 'This is the center box.';
	box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/2+'px; left:'+window.innerWidth/2+'px; border:2px solid #0083C1; background:#D7F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;');

// Add it to page
document.body.appendChild(box);

// Center it right after it's added
alignCenter('center_div');

// Center it when page resizes
window.addEventListener('resize', function(e){alignCenter('center_div')}, false);