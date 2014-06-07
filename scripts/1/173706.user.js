// ==UserScript==
// @name        vSphere no Timeout
// @namespace   http://userscripts.org/no
// @description This script refreshes vSphere when the mouse isn't moved after a period of time.
// @include     https://view.mst.edu/admin/*
// @version     0.2
// @run-at      document-end
// @updateURL   http://userscripts.org/scripts/source/173706.user.js
// @grant metadata
// ==/UserScript==

//TIME CONSTRAINTS
window.wlstartTime = 0730;
window.wlendTime = 1800;
window.timecheck = 0;
//use jquery included in vsphere
var myListener = function (e) {
    //document.removeEventListener('mousemove', myListener, false);
    window.msx = e.pageX; 
    window.msy = e.pageY;
};

document.addEventListener('mousemove', myListener, false);

function wakeLock( )
{
   if( window.lastmsx == window.msx && window.lastmsy == window.msy )
   {
     //idle
     if( window.timecheck >= 11 )
     {
        document.location.reload( true );
        window.timecheck = 0;
     }
     else
     {
        window.timecheck++;
     }
     
   }
   else
   {
      window.lastmsx = window.msx;
      window.lastmsy = window.msy;
      window.timecheck = 0;
   }
}

setInterval(wakeLock, 5000)