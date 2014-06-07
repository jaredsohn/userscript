{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Loan Scammer Status\par
// @namespace      d2jsp\par
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*\par
// @include       http://forums.d2jsp.org/user.php?i=*\par
// @include       http://forums.d2jsp.org/pm.php?c=*\par
// ==/UserScript==\par
\par
var LOANSCAMMER = [];\par
var ACTIVE = [];\par
var REGULAR = [];\par
var WELCHERPB = [];\par
var LATEPAYMENTUSER = [];\par
var BLACKLIST = [];\par
var MED = [];\par
\par
function getElementsByClassName(classname, par)\{\par
   var a=[];\par
   var re = new RegExp('\\\\b' + classname + '\\\\b');\par
   var els = par.getElementsByTagName("*");\par
   for(var i=0,j=els.length; i<j; i++)\{\par
      if(re.test(els[i].className))\{\par
         a.push(els[i]);\par
      \}\par
   \}\par
   return a;\par
\};\par
\par
function resolveBettorType(name)\{\par
\tab var i;\par
\tab\tab\par
\tab\par
\tab for(i=0;i<MED.length;i++)\{\par
\tab\tab if(name == MED[i])\{\par
\tab\tab\tab return 'med';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab for(i=0;i<BLACKLIST.length;i++)\{\par
\tab\tab if(name == BLACKLIST[i])\{\par
\tab\tab\tab return 'blacklist';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab for(i=0;i<LOANSCAMMER.length;i++)\{\par
\tab\tab if(name == LOANSCAMMER[i])\{\par
\tab\tab\tab return 'LOANSCAMMER';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab for(i=0;i<WELCHERPB.length;i++)\{\par
\tab\tab if(name == WELCHERPB[i])\{\par
\tab\tab\tab return 'welcherpaidback';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab for(i=0;i<REGULAR.length;i++)\{\par
\tab\tab if(name == REGULAR[i])\{\par
\tab\tab\tab return 'regular';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab for(i=0;i<LATEPAYMENTUSER.length;i++)\{\par
\tab\tab if(name == LATEPAYMENTUSER[i])\{\par
\tab\tab\tab return 'LATEPAYMENTUSER';\par
\tab\tab\}\par
\tab\}\par
\par
\tab for(i=0;i<ACTIVE.length;i++)\{\par
\tab\tab if(name == ACTIVE[i])\{\par
\tab\tab\tab return 'active';\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab return 'unknown';\par
\};\par
\par
function createHTML(div,user)\{\par
div.innerHTML += '<br/><b><a href="http://forums.d2jsp.org/forum.php?f=104"' + \par
\tab\tab ' title="Bar and Pub Games" target="_blank">Poker Status</a>: ';\par
\tab switch(resolveBettorType(user))\{\par
\tab\tab case 'med':\par
\tab\tab\tab div.innerHTML += '<font color="chartreuse"><b>Mediator</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'welcher':\par
\tab\tab\tab div.innerHTML += '<font color="red"><b>Welcher</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'active':\par
\tab\tab\tab div.innerHTML += '<font color="purple"><b>Active</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'welcherpaidback':\par
\tab\tab\tab div.innerHTML += '<font color="fuchsia"><b>Paid-Back</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'LOAN SCAMMER':\par
\tab\tab\tab div.innerHTML += '<font color="blue"><b>LOAN SCAMMER</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'blacklist':\par
\tab\tab\tab div.innerHTML += '<font color="black"><b>Blacklist</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'regular':\par
\tab\tab\tab div.innerHTML += '<font color="orange"><b>Regular</b></font>';\par
\tab\tab\tab break;\par
\tab\tab case 'unknown':\par
\tab\tab\tab div.innerHTML += '<font color="gray"><b>Unknown</b></font>';\par
\tab\tab\tab break;\par
\tab\}\par
\tab div.innerHTML += '</b>';\par
\};\par
\par
function doThePage()\{\par
\tab var divs = getElementsByClassName('bc1',document);\par
\tab var names = document.getElementsByTagName('legend');\par
\tab var name,str,nameOffset,divOffset;\par
\tab nameOffset = 0;\par
\tab divOffset = 0;\par
\tab\par
\tab for(var i=0;i<divs.length;i++)\{\par
\tab\tab if(names[i + nameOffset].innerHTML == 'User Poll')\{\par
\tab\tab\tab nameOffset++;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab if(window.location.href.indexOf('pm.php?') > 0)\{\par
\tab\tab\tab nameOffset = 2;\par
\tab\tab\tab divOffset = divs.length - 1;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab if(window.location.href.indexOf('index.php?act=Post&c') > 0)\{\par
\tab\tab\tab nameOffset = 1;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab str = names[i + nameOffset].firstChild;\par
\par
\tab\tab if(str.innerHTML.indexOf('<') == 0)\{\par
\tab\tab\tab str = str.firstChild;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab str = str.innerHTML;\par
\tab\tab\par
\tab\tab var idx = str.indexOf('<');\par
\tab\tab if(idx != -1)\{\par
\tab\tab\tab name = str.substring(0,idx)\par
\tab\tab\}else\{\par
\tab\tab\tab name = str;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab name = name.replace(/ /gi,'');\par
\tab\tab\par
\tab\tab createHTML(divs[i + divOffset],name.toUpperCase());\par
\tab\tab\par
\tab\tab if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0)\{\par
\tab\tab\tab break;\par
\tab\tab\}\par
\tab\}\par
\};\par
\par
function getNames()\{\par
\tab GM_xmlhttpRequest(\par
\tab\{\par
\tab     method: 'GET',\par
\tab     url: 'http://pokahustla2.angelfire.com/',\par
\tab     headers: \par
\tab\tab\{\par
\tab         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
\tab         'Accept': 'application/atom+xml,application/xml,text/xml',\par
\tab     \},\par
\tab     onload: function(response)\par
\tab\tab\{\par
\tab\tab\tab var str = response.responseText;\par
\tab\tab\tab\par
\tab\tab\tab var names = str.substring(str.indexOf('StArToFmYBETTORlIsT') + 19,str.indexOf('EnDoFmYBETTORlIsT'));\par
\tab\tab\tab eval(names);\par
\tab\tab\tab doThePage();\par
\tab\tab\}\par
\tab\});\par
\par
\};\par
\par
getNames();\par
}
