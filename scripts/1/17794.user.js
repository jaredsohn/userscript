// ==UserScript==
// @name          google_directory
// @namespace     http://zzo38computer.cjb.net/userjs/
// @include http://*.google.com/Top/*
// ==/UserScript==

// Makes Google directory links redirect to DMOZ.

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/google_directory.user.js

l=/\/Top\/(.*)/.exec(unsafeWindow.location);
u="http://dmoz.org/"+l[1];
document.body.innerHTML="Loading... <a href='"+u+"'>"+u+"</a>";
GM_xmlhttpRequest({
  method:"GET",
  url:u,
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/html",
    },
  onload:function(details) {
    document.body.innerHTML="<base href='"+u+"'>"+details.responseText;
var links = document.links;
 
for(var i = 0; i < links.length; i++) {
s=links[i].href.replace(/^(.*)\.com\//,"http://dmoz.org/");
links[i].href=s;
 
} 
  }
});
