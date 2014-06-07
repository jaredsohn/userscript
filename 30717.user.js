// ==UserScript==
// @name           iGoogle Tab Default
// @namespace      http://userscripts.org/users/32758
// @description    Selects which iGoogle tab to use by Default.
// @include        http*://www.google.com/ig*
// Pending Updates: Whenever I or the script loads the tab, page refreshes, thus the script re-runs. Need to find a way to allow user to 
//                  select a differnt tab.                   
// ==/UserScript==

var ip = 'x.x.x.x';

if(ip=='x.x.x.x'){

 alert("Your at work");
 //alert(ip);  - Not needed as Alert now works. Saving until production ready.
 var evt=document.createEvent('MouseEvents');
 evt.initMouseEvent('click',true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
 document.getElementById('tab1_view').dispatchEvent(evt);
 var ip = null;

} else if(ip=='x.x.x.x2'){

 alert("Your not at work");
  //alert(ip);  - Not needed as Alert now works. Saving until production ready.
 var evt=document.createEvent('MouseEvents');
 evt.initMouseEvent('click',true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
 document.getElementById('tab0_view').dispatchEvent(evt);
 var ip = null;
}