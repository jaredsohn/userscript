{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Just say NO!\par
// @namespace      http://schoolsux.tz/\par
// @description    Checks no on surveys, just enable whenever you need it; you should edit the @include.\par
// @include           http://www.eltpath.com/*\par
// @include           http://www.cashcrate.com/*\par
// @include           http://*.smileymedia.com/*\par
// @include           http://lgn*.coolsavings.com/*\par
// @include           http://lnktrckr.com/*\par
// @include           http://*quizjungle.com/?act_id=*\par
// @include           http://www.quizjumper.com/*\par
// @include           http://www.modpath.com/*\par
// @include           http://www.tnmtechnology.com/*\par
// @include           http://www.brandarama.com/*\par
// @include           http://www.topconsumergifts.com/*\par
// @include           http://offers.slwpath.com/*\par
// @include           http://us.quizrocket.com/*\par
// @include           http://www*.recipe4living.com/default*\par
// @include           http://www.premiumproductsonline.com/*\par
// @include           https://mysmokingrewards.com/*\par
// @include           http://www.eversave.com/*\par
// @include           http://www.thelaptopsaver.com/*\par
// ==/UserScript==\par
\par
inputs = document.getElementsByTagName("input");\par
var checkedyes = 0;\par
var radios=0;\par
var firstradio=0;\par
var foundradio=false;\par
var i=0;\par
for(i=0;i<inputs.length;i++)\par
\{\par
\tab if(inputs[i].type=="radio")\par
\tab\tab\{\par
\tab\tab\tab if(!foundradio)\par
\tab\tab\tab\{\par
\tab\tab\tab\tab firstradio = i;\par
\tab\tab\tab\tab foundradio = true;\par
\tab\tab\tab\}\par
\tab\tab\tab radios++;\par
\tab\tab\tab if(inputs[i].value.toLowerCase()=="no")\par
\tab\tab\tab\{\par
\tab\tab\tab\tab inputs[i].checked = true;\par
\tab\tab\tab\tab inputs[i].click();\par
\tab\tab\tab\tab document.body.focus();\par
\tab\tab\tab\}\par
\tab\tab\tab else\par
\tab\tab\tab\{\par
\tab\tab\tab\tab inputs[i].checked=true;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\par
\}\par
if (radios>2)\par
\{\par
\tab inputs[firstradio+2].checked=true;\par
\}\par
\par
next = document.getElementById("nextOffer");\par
if (next == null)\par
\{\par
\tab next = document.getElementById("pass");\par
\}\par
if (next == null)\par
\{\par
\tab next = document.getElementById("bt_cancel");\par
\}\par
if(next == null)\par
\{\par
\tab for(i=0;i<inputs.length;i++)\par
\tab\{\par
\tab\tab if((inputs[i].type=="submit") && (inputs[i].value.toLowerCase()=="skip"))\par
\tab\tab\{\par
\tab\tab\tab next = inputs[i];\par
\tab\tab\tab break;\par
\tab\tab\}\par
\tab\}\par
\}\par
if(next==null)\par
\{\par
\tab for(i=0;i<inputs.length;i++)\par
\tab\tab\{\par
\tab\tab\tab if((inputs[i].value.toLowerCase()=="submit") || (inputs[i].name.toLowerCase()=="submit"))\par
\tab\tab\tab\{\par
\tab\tab\tab\tab next = inputs[i];\par
\tab\tab\tab\tab break;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\}\par
if(next == null)\par
\{\par
\tab next = document.getElementById("submitbutton");\par
\}\par
next.focus();\par
next.click();\par
}
