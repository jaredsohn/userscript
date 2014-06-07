// ==UserScript==
// @author: cool@elvista.ru
// @name           iZayac
// @namespace      iZayac
// @include http://ixbt.com/*
// @include http://*.ixbt.com/*
// @title: Hiding annoying iNews by Andrey Zayac at ixbt.com
// @description: Hiding annoying iNews by Andrey Zayac at ixbt.com
// @version: 0.0.1
// ==/UserScript==

function substr_count (haystack, needle, offset, length) {
    // Returns the number of times a substring occurs in the string  
    // 
    // version: 1009.2513
    // discuss at: http://phpjs.org/functions/substr_count
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);
    // *     returns 2: 0
    // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false
    var pos = 0, cnt = 0;
 
    haystack += '';
    needle += '';
    if (isNaN(offset)) {offset = 0;}
    if (isNaN(length)) {length = 0;}
    offset--;
 
    while ((offset = haystack.indexOf(needle, offset+1)) != -1){
        if (length > 0 && (offset+needle.length) > length){
            return false;
        } else{
            cnt++;
        }
    }
 
    return cnt;
}

window.addEventListener('load', function(){

for(var i=0;i<document.getElementsByTagName('div').length;i++){
   if(document.getElementsByTagName('div')[i].className == 'news_item'){
    var str = document.getElementsByTagName('div')[i].innerHTML;
      if (substr_count(str,"andriy@ixbt.com")) document.getElementsByTagName('div')[i].style.display = 'none';
      
   }
}


}, false);