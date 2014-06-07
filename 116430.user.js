{\rtf1\fbidis\ansi\ansicpg1256\deff0\deflang1025{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\ltrpar\lang1036\f0\fs20 // ==UserScript==\par
// @name        sixdollarclick  Account Login Continue\par
// @include       // ==/UserScript==\par
var allA = document.getElementsByTagName('a');\par
for (var i = 0; i < allA.length; i++) \{\par
\tab if ( allA[i].innerHTML.match('Continue') ) \{\par
\tab\tab window.location.href = allA[i].href;\par
\tab\}\par
\}\par
}
