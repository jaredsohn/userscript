// ==UserScript==
// @name           JustHost cPanel Cleanup
// @namespace      http://scrolls.mafgani.net/2009/10/just-host-cpanel-cleanup-script-for-greasemonkey/
// @description    Remove affiliate links and ads from JustHost cPanel
// @include        *:2082/frontend/x3/*
// @include        *:2083/frontend/x3/*
// ==/UserScript==

// Get rid of id-less div annoyances 
function hideDivs() {
   var sidebar = document.getElementById("sub");
   var divs = sidebar.getElementsByTagName("div");

   for (var i = 0; i < divs.length; i++) {
      var divid = divs[i].getAttribute("id");
      if ( divid == null ) {
         divs[i].style.display = 'none';
      }
   }
}

document.getElementById('registerdomain').style.display = 'none';
document.getElementById('platinumplace').style.display = 'none';
document.getElementById('pipednsplace').style.display = 'none';
document.getElementById('designfusions').style.display = 'none';
document.getElementById('affiliate').style.display = 'none';
document.getElementById('addons').style.display = 'none';
document.getElementById('jdimarketing').style.display = 'none';
document.getElementById('partners').style.display = 'none';

document.addEventListener("DOMNodeInserted", hideDivs, true);