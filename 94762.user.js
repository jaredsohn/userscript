// ==UserScript==
// @name            ipTorrents Ratio
// @description     Displays ratio difference in GB on ipTorrents by demitrix
// @include           http://www.iptorrents.com*
// @include           http://iptorrents.com*
// ==/UserScript==

 if (location.href.match('iptorrents.com')) {
     var ratio = document.getElementsByTagName('font')[3];
    var uploaded = document.getElementsByTagName('font')[5].childNodes[0].innerHTML.replace(" GB","").replace(" TB","");
     var downloaded = document.getElementsByTagName('font')[7].childNodes[0].innerHTML.replace(" GB",""); 
    var diff = Math.round((uploaded * 1024 - downloaded)*100)/100;
   ratio.appendChild(document.createTextNode(" (" + diff + " GB)"));
 }