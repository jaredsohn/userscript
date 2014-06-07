// ==UserScript==
// @name          Fix Gmail Notifier Plus
// @author        Daniel Morrison
// @namespace     com.danstechstop.gmail
// @description   Makes Gmail Notifier Plus Auto Log in.
// @include       https://www.google.com/a/*/LoginAction2?*
// @include       https://www.google.com/accounts/ServiceLoginAuth?*
// ==/UserScript==

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

window.location.href += "&GALX=" + getCookie('GALX');
