// ==UserScript==
// @name           Pokec.sk - Pravy klik
// @namespace      http://userscripts.org/users/merlinsvk
// @description    Otvori okno RP po kliknuti pravym mysitkom
// @version        2.0
// @include        http://www-pokec.azet.sk/miestnost/*
// @include        http://pokec.azet.sk/*
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];         
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.charset = "windows-1250";
newScript.src = "data:application/x-javascript;base64,ZnVuY3Rpb24gY2xpY2tJRTQoKXtpZihldmVudC5idXR0b249PTIpe29wZW5ScCgpO3JldHVybiBmYWxzZTt9fWZ1bmN0aW9uIGNsaWNrTlM0KGUpe2lmKGRvY3VtZW50LmxheWVyc3x8ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQmJiFkb2N1bWVudC5hbGwpe2lmKGUud2hpY2g9PTJ8fGUud2hpY2g9PTMpe3Vuc2FmZVdpbmRvdy5vcGVuUnAoKTtyZXR1cm4gZmFsc2U7fX19aWYoZG9jdW1lbnQubGF5ZXJzKXtkb2N1bWVudC5jYXB0dXJlRXZlbnRzKEV2ZW50Lk1PVVNFRE9XTik7ZG9jdW1lbnQub25tb3VzZWRvd249Y2xpY2tOUzQ7fWVsc2UgaWYoZG9jdW1lbnQuYWxsJiYhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQpe2RvY3VtZW50Lm9ubW91c2Vkb3duPWNsaWNrSUU0O31kb2N1bWVudC5vbmNvbnRleHRtZW51PW5ldyBGdW5jdGlvbigib3BlblJwKCk7cmV0dXJuIGZhbHNlIik7";
headID.appendChild(newScript);
