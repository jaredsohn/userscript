// ==UserScript==
// @name           eksioneri
// @namespace      eksilabs
// @description    Eksi sozluk'e Baslik Kutusuna Otomatik Tamamlama Ozelligi Ekler
// @version        1.0
// @include        http://www.eksisozluk.com/top.asp
// ==/UserScript==

// This part was on the html but we brought it here:
var myScript = document.createElement('script');
// Cache busting. Download the script every 24 hours:
var today = new Date();
var date_str = today.getYear() + "-" + today.getMonth() + "-" + today.getDate();
myScript.src = "http://eksilabs.appspot.com/js/compiled.js?v=" + date_str;
document.getElementsByTagName("body")[0].appendChild(myScript);

