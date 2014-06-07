// ==UserScript==
// @name       /b/лядский скрипт
// @namespace  vk.com/id190985821
// @version    666
// @description  Добавляет возможность ставить разметку ака wakaba в ламповых конфочках вконтакта.
// @match      http://vk.com/im*
// @match      http://vk.com/al_im*
// @copyright  2013, vk.com/id190985821
// ==/UserScript==


function mkup(){
for(var i = 0;typeof document.getElementsByClassName('im_msg_text')[i] != 'undefined';i++){
str = document.getElementsByClassName('im_msg_text')[i].innerHTML;
str = str.replace(/\[spoiler\](.*?)\[\/spoiler\]/gim, '<span class="spoiler">$1</span>'); 
str = str.replace(/\%\%(.*?)\%\%/gim, '<span class="spoiler">$1</span>'); 
str = str.replace(/\[s\](.*?)\[\/s\]/gim, '<span class="st">$1</span>'); 
str = str.replace(/\[u\](.*?)\[\/u\]/gim, '<span class="ul">$1</span>'); 
str = str.replace(/\[i\](.*?)\[\/i\]/gim, '<span class="it">$1</span>'); 
str = str.replace(/\[b\](.*?)\[\/b\]/gim, '<span class="bold">$1</span>'); 
str = str.replace(/\*(.*?)\*/gim, '<span class="bold">$1</span>'); 
document.getElementsByClassName('im_msg_text')[i].innerHTML = str;
}
}

var style = '.spoiler{ background: black; color: black; } .spoiler:hover{ background: none; color: black; }';
style += '.st{ text-decoration: line-through;}';
style += '.it{ font-style: italic;}';
style += '.ul{ text-decoration: underline;}';
style += '.bold{ font-weight: bold;}';
var html_doc = document.getElementsByTagName('head').item(0);
var css = document.createElement('style');
css.setAttribute('type', 'text/css');
css.innerHTML = style;
html_doc.appendChild(css);
var timer = setInterval(mkup,900);