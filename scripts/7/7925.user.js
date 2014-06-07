// ==UserScript==
// @name           Hide sports items in Facebook minifeed 
// @author         Paul Irish
// @namespace      http://paul.irish.aurgasm.us
// @description    Hide the sports news items in your facebook minifeed
// @include        http://*.facebook.com/home.php*
// @date           2007.03.13
// ==/UserScript==

var arr = document.getElementsByTagName('img');

for (i=0; i<arr.length; i++)
 {if (arr[i].src == 'http://static.ak.facebook.com/images/icons/madness.gif') 
     arr[i].parentNode.parentNode.parentNode.style.display='none';
  }

