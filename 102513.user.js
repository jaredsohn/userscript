// ==UserScript==
// @name           CERN automatic log-on using certificate
// @namespace      local
// @author         Clemens Lange
// @description    Automatically use autologon on CERN login page using certificate
// @include        https://login.cern.ch/adfs/ls/?wa=*
// ==/UserScript==

// define link pattern to look for
linkstring = "CertificateAutologon";

links = document.getElementsByTagName("A");
link2follow = "";
for (var i=0;i<links.length;i++) {
  mystring = links[i].href;
  if ( mystring.indexOf(linkstring) != -1 ) { 
  link2follow = mystring;
  }
}
if ( link2follow.length > 0 ) {
  window.location = link2follow;
}
//else {
//  alert("Could not find link with string pattern: " + linkstring );
//}
