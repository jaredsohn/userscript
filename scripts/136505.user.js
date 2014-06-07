﻿// ==UserScript==
// @name           TurnPageByKeyboardForTieba
// @description    百度贴吧键盘左右键翻页
// @include        http://tieba.baidu.com/*


// ==/UserScript==
document.onkeydown = KeyPress;
 
function KeyPress(){   
    var key;   
    key = KeyPress.arguments[0].keyCode;   
    var prev;
    var next;

    if(key==37){
      aA=document.getElementsByTagName('a');
      for(i=0; i<aA.length; i++){if(aA[i].className=='pre'|| aA[i].innerHTML=='上一页'){prev=aA[i];break;}}
      if(prev!=null){
      location.href=prev;
      }
    }
    if(key==39){
      aA=document.getElementsByTagName('a');
      for(i=0; i<aA.length; i++){if(aA[i].className=='next' || aA[i].innerHTML=='下一页'){next=aA[i];break;}}
      if(next!=null){
      location.href=next;
      }
    }
} 