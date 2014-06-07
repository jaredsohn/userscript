{\rtf1\ansi\ansicpg1252\deff0\deflang18441{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.21.2507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Facebook - Mousehunt Smart Autohunter\par
// @namespace      Wr3cktangle\par
// @description    A smart autohunter for the Mousehunt Facebook App\par
// @include        http://apps.facebook.com/mh_longtail/*\par
// ==/UserScript==\par
\par
var inputs = document.getElementsByTagName("input");\par
var timervalue = -1;\par
\par
if(inputs)\par
\{\par
   //loop through and find the horn timer hidden input box and get it's value\par
   for(i = 0; i < inputs.length; i++)\par
   \{\par
      if(inputs[i].id.indexOf("hornWaitValue") != -1)\par
      \{\par
         timervalue = inputs[i].value;         \par
         break;\par
      \}\par
   \}\par
   \par
\}\par
\par
inputs = null;\par
\par
if(timervalue > 0)\par
\{\par
   //calculate timeoutvalue in milliseconds\par
   //timervalue is in seconds, so convert that, and add on [3,33) seconds randomly \par
   //the random time is to help keep it less obvious mostly.\par
   timeoutvalue = (parseInt(timervalue) + Math.round(Math.random() * 30) + 3) * 1000;\par
   \par
   //alert("refresh in " + timeoutvalue );\par
   setTimeout(function() \{document.location = 'http://apps.facebook.com/mh_longtail/soundthehorn.php';\} , timeoutvalue);\par
\}\par
}
