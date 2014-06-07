// --------------------------------------------------------------------------
// ==UserScript==
// @name           Show Bangumi Reply (another)
// @description    Show reply (another)
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
//
// --------------------------------------------------------------------------


var msg = document.getElementsByClassName("message");
for (var i = 0; i < msg.length; i++)
  {
  msg[i].style.zIndex = -2;
  msg[i].style.position = 'relative';
  }

var msgsub = document.getElementsByClassName("cmt_sub_content");
for (i = 0; i < msgsub.length; i++)
  {
  msgsub[i].style.zIndex = -2;
  msgsub[i].style.position = 'relative';
  }

var rowr = document.getElementsByClassName("row_reply"); 
var n = rowr.length;
for (var j = 0; j < rowr.length; j++)
  {if (j%2 == 0) { //偶数
   rowr[j].innerHTML = '<div style="z-Index: ' + n-- + '; position:relative" class="newre">' +
                                    rowr[j].innerHTML + '</div>';
   //n--;
   }
   else {//奇数
   rowr[j].style.zIndex = n--;
   rowr[j].style.position = 'relative';
   //n--;
   }
  }

var re_wrap = document.getElementById("reply_wrapper");
  re_wrap.style.zIndex = n + 1;
  re_wrap.style.position = 'relative';






