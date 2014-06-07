// ==UserScript==
// @name           IndianRailway
// @namespace      No Nags
// @include        *indianrail.gov.in*
// ==/UserScript==

// Rajesh Soni (rajeshgsoni@gmail.com)
// http://rajeshsoni.net


 // document.body.innerHTML = document.body.innerHTML.replace("validatepnr", "validatepnr_old");
 var s=document.createElement("script");

 s.innerHTML = ' function submitavailability(index) {  if(!validateday()) return false;  if(document.Accavl[0].value=="ZZ") { if (!checkclassselected()) { 	alert("Select Class"); 	return false; } }   if (document.Accavl.lccp_submitacc[index].value == "Wait For Availability!") { alert ("Please wait! availability query is in progress..."); return false; } document.Accavl.lccp_submitacc[0].value ="Wait For Availability!"; document.Accavl.lccp_submitacc[1].value = "Wait For Availability!"; document.Accavl.lccp_submitfare[0].value ="Wait For Availability!"; document.Accavl.lccp_submitfare[1].value ="Wait For Availability!"; document.Accavl.lccp_submitpath[0].value ="Wait For Availability!"; document.Accavl.lccp_submitpath[1].value ="Wait For Availability!"; document.Accavl.submit(); return true; } ';

 document.body.appendChild(s);