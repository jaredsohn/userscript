// ==UserScript==
// -Original Author UnKnown
// -Edited By Izzuddin Noor for TheStar

// @name           SkinnedGoogle

// @include        *.google.*

// ==/UserScript==

//GM_addStyle("#sfcnt{margin-left:10px;}#leftnav,flt,#logo,.ws,.gbh{display:none;}#center_col{margin-left:10px;margin-top:10px;border:0px}")
document.getElementById("lga").innerHTML = "<div align='left' style='background: url(&quot;http://deancrevis.com/images/starheader.png&quot;) no-repeat scroll 0% 0% transparent; height: 110px; width: 625px;' title='Google' id='logo' onload='window.lol&amp;&amp;lol()'> </div>"
