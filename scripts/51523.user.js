// ==UserScript==
// @name           Flip ABBRs and ACRONYMs
// @namespace      http://www.w3.org/1999/xhtml
// @description    Flips the definition and acronym so that the definition is displayed.
// @include        *
// ==/UserScript==
try {
function displayTHINGS() {
 var acro, abbr, abba, abba2, temp_abbr_title, temp_abbr_inner, afro, afro2, temp_title, temp_inner;
 var r=0;
 abbr = document.getElementsByTagName("abbr");
 acro = document.getElementsByTagName("acronym");
  for(r=0;r<=abbr.length||r<=acro.length;r++) {

  if(abbr[r]) {
  abba=abbr[r];
  abba2=abba;
  temp_abbr_title = abba.title;
  temp_abbr_inner = abba.innerHTML;
  abba2.innerHTML = temp_abbr_title;
  abba2.title = temp_abbr_inner;
  abba.parentNode.replaceChild(abba2, abba);
  delete abba2;
  }

  if(acro[r]) {
  afro=acro[r];
  afro2=afro;
  temp_title = afro.title;
  temp_inner = afro.innerHTML;
  afro2.innerHTML = temp_title;
  afro2.title = temp_inner;  
  afro.parentNode.replaceChild(afro2, afro);
  delete afro2;
  }

  }
}
GM_registerMenuCommand("Flip ACRONYM", displayTHINGS);
} catch(e) { alert(e.description) }