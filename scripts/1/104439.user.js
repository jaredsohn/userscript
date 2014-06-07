// ==UserScript==
// @name           GOnline Redirect Page
// @description    Creates a simple redirect page that automatically directs you to the page you are seeking.
// @include        http://www.gonline.com/*
// ==/UserScript==
<!--
 function getgoing()
  {
    top.location="[url]";
   }
 
   if (top.frames.length==0)
    {
     alert("Please note: You're leaving GOnline! Please don't fill out anything asking for your password or any account information. GOnline is not responsible for the hacking(s) of your account. Please proceed with caution.");
     setTimeout('getgoing()',5000);
     }
//--> 
