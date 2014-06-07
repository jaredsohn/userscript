// ==UserScript==
// @name           camelegg.com - camelizer
// @namespace      http://camelegg.com
// @description    Embeds price history charts and tracking functionality into Newegg product pages.
// @include http://*newegg.com/*
// ==/UserScript==

var CAMEL_VERSION = "1";

// detect ASIN
var regex=/(N[A-Z0-9]{3,})/;
var asin="";

if(regex.test(window.location.href)){
  var m=regex.exec(window.location.href);
  asin=m[1];
}

// detect subdomain / locale
subdomain = "US";

// request data from camelcamelcamel
var murl = "http://" + subdomain.toLowerCase() + ".camelegg.com/grease/" + String(asin) + 
"?locale=" + subdomain + "&ver=" + CAMEL_VERSION + "&url=" + escape(window.location.href);

GM_xmlhttpRequest({
  method: "GET", 
  url: murl, 
  onload: function(response)
  {
    nb = unsafeWindow.document.createElement("DIV");
    nb.innerHTML = response.responseText;
    document.body.appendChild(nb);
  }
});