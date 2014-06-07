// ==UserScript==
// @name           camelcamelcamel.com - camelizer
// @namespace      http://camelcamelcamel.com
// @description    Embeds price history charts and tracking functionality into Amazon product pages.
// @include http://*amazon.com/*
// @include http://*amazon.co.uk/*
// @include http://*amazon.fr/*
// @include http://*amazon.de/*
// @include http://*amazon.ca/*
// @include http://*amazon.co.jp/*
// ==/UserScript==

var CAMEL_VERSION = "2";

// detect ASIN
var regex=/\/([A-Z0-9]{10})(\/|$|\?|\%|\#)/;
var asin="";

if(regex.test(window.location.href)){
  var m=regex.exec(window.location.href);
  asin=m[1];
}

// detect subdomain / locale
arr = document.domain.split(".");
subdomain = arr[arr.length - 1];

if (subdomain == "com")
  subdomain = "US";
else
  subdomain = subdomain.toUpperCase();

// request data from camelcamelcamel
var murl = "http://" + subdomain.toLowerCase() + ".camelcamelcamel.com/grease/" + String(asin) + "?locale=" + subdomain + "&ver=" + CAMEL_VERSION + "&url=" + escape(window.location.href);

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