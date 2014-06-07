// ==UserScript==
// @name      Fast URL image for Lightshot
// @namespace  
// @version   0.2
// @description Input form with URL image for fast copying to clipboard
// @include   *prntscr.com*
// @match http://prntscr.com*
// @copyright 2014, frantsm | http://vk.com/frantsm
// ==/UserScript==

var src =  document.getElementsByTagName('img')[0].src;

var s = document.createElement('div');
s.id = "style";

var d = document.createElement('div');
d.id = "textbox";

d.style.position='absolute';
d.style.top='8px';
d.style.right='58%';
d.style.width='1px';
d.style.height='1px';

var txt = document.createElement('input'); 
txt.setAttribute('type','text');
txt.setAttribute('value',src);
txt.style.marginRight = '10px';
txt.style.width='200px';
txt.style.height='25px';
txt.style.margin='2px';

document.body.appendChild(s);

document.getElementById('style').innerHTML = 
    
    '<style>'+
    'input{ '+
    'color: #FFF;'+
    'text-align:center;'+
    'box-shadow: 0 1px 0 rgba(255,255,255,.15), 0 2px 4px rgba(0,0,0,.2) inset, 0 0 12px rgba(255,255,255,.1); '+
    'background: rgba(0,0,0,.2);'+
    'border-radius: 2px;}'+
    '#textbox{z-index:99999999;}'+
    'div.header-social{display:none;}'+
    '</style>';

document.body.appendChild(d);
document.getElementById('textbox').appendChild(txt);

txt.focus();
txt.select();