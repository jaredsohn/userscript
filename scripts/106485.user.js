// ==UserScript==
// @name          Megaupload Fix Arnet
// @description	  Baja a las chapas en Megaupload con Arnet!
// @include       http://www.megaupload.com/?d=*
// @include       http://www.megaupload.com/*?d=*
// @include       http://megaupload.com/?d=*
// @include       http://megaupload.com/*?d=*
// ==/UserScript==

link = document.getElementById('downloadlink');
domain = link.innerHTML.split('http://')[1].split('/files')[0];

GM_xmlhttpRequest({
  method: "GET",
  url: "http://nunix.com.ar/mu/?m=plain&d="+domain,
  onload: function(response) {
    link.innerHTML = link.innerHTML.split(domain).join(response.responseText);
  }
});