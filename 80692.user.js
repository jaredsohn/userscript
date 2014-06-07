// ==UserScript==
// @name           Pokec.sk - Manualne oznacovanie
// @namespace      Pokec.sk
// @author         MerlinSVK
// @include        http://www-pokec.azet.sk/miestnost/*
// @include        http://pokec.azet.sk/weroro*
// @date           2011-11-10
// @version        3.2
// ==/UserScript==
if(window.location.href.indexOf("weroro") != -1){
  var w = document.getElementsByClassName("css_niecoomne");
  w[0].innerHTML = "<a href='http://www.weroro.sk/' target='_self'><img src='http://www.weroro.sk/pokec_header.png' title='Oficiálna stránka'/></a>";
}
else{
var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.charset = "iso-8859-2";
newScript.src = "data:application/x-javascript;base64,ZnVuY3Rpb24gc2hvd1JlcG9ydChtZXNzYWdlVGltZSxpZE9kb3MsTmlja09kb3MsaWRNc2csaGFzaCxpZEVsbSxpc1ByaXZhdGUpe2lmKHR5cGVvZiBjaGF0TWVzc2FnZXNbaWRNc2ddPT0ndW5kZWZpbmVkJylyZXR1cm4gZmFsc2U7dmFyIHRleHRNc2c9Y2hhdE1lc3NhZ2VzW2lkTXNnXTt0cnl7aWYoY25mcm0pY25mcm0uY2xvc2UoKTt9Y2F0Y2goZSl7fXJlcG9ydEluZm89eydpZFJvb20nOmN1ckxPSywnbXNnVGltZSc6bWVzc2FnZVRpbWUsJ2lkVXNlcic6aWRPZG9zLCduaWNrJzpOaWNrT2RvcywnbXNnJzp0ZXh0TXNnLCdoYXNoJzpoYXNoLCdpZEVsbSc6aWRFbG0sJ3BydnQnOmlzUHJpdmF0ZX07dmFyIGNvbmZpcm1UZXh0PSc8c3Ryb25nPkNoY2UmIzM1Mzsgb3puYSYjMjY5O2kmIzM1NzsgcHLtc3Bldm9rIGFrbyBuZXZob2Ru/T88L3N0cm9uZz48c3BhbiBjbGFzcz0iY29udGVudCI+Jyt0ZXh0TXNnKyc8L3NwYW4+JztjbmZybT1ldF9jb25maXJtKCdOZXZob2Ru/SBwcu1zcGV2b2snLGNvbmZpcm1UZXh0LHNlbmRSZXBvcnQse3llc1RleHQ6J8FubywgY2hjZW0nLG5vVGV4dDonTmllLCBuZWNoY2VtJyxhZGRDbG9zZVg6dHJ1ZX0pO2NuZnJtLmh0bWwubWFpbkRpdi5zdHlsZS56SW5kZXg9NTAwMDA7cmV0dXJuIGZhbHNlO30=";
headID.appendChild(newScript);
}