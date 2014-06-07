// Google Weather Celsius
// Version 0.1.0
// 2005-12-20
// Copyright (c) 2005, Kyrlian
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Formula : C=(F-32)/9*5
// The layout may generate errors if Â°F outside the range 10-99
//
// ==UserScript==
// @name           Google Weather Celsius
// @namespace      http://www.google.com/
// @description    Converts Fahrenheit to Celsius on Google/ig weather module
// @include        *.google.*/ig*
// @exclude        
// ==/UserScript==
function ftoc(f){
 var c=(f-32)/9*5;
 return Math.round(c);
}
function converttoday(targettag){
 //<div>xxÂºF</div> to <div>xxÂºC</div> 
 //<div>xx&#186;F</div>
 var bs=document.getElementsByTagName(targettag);
 for (var i = 0; i < bs.length; i++) {
  var ci=bs[i]
  var ih=ci.innerHTML
  if ((ih.charCodeAt(2) == 186)|(ih.substr(ih.length-7,7) == "&#186;F")){
   ci.innerHTML=ftoc(ih.substr(0,2))+"&#186;C";
  }
 }
}
function convertnextdays(targettag){
 //<nobr>xxÂº | xxÂº</nobr> to <nobr>xxÂº | xxÂº</nobr>
 //<nobr>46&#186; | 37&#186;</nobr>
 var bs=document.getElementsByTagName(targettag);
 for (var i = 0; i < bs.length; i++) {
  var ci=bs[i]
  var ih=ci.innerHTML
  if (ih.charCodeAt(2) == 186 & ih.charCodeAt(8) == 186){
   ci.innerHTML=ftoc(ih.substr(0,2))+"&#186; | "+ftoc(ih.substr(6,2))+"&#186;";
  }
  if (ih.substr(2,9) == "&#186; | " & ih.substr(13,6) == "&#186;"){
   ci.innerHTML=ftoc(ih.substr(0,2))+"&#186; | "+ftoc(ih.substr(11,2))+"&#186;";
  }
 }
}
converttoday("div");
convertnextdays("nobr");
