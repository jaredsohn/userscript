// ==UserScript==
// @name            MyYaGoogle
// @namespace       http://www.ragweed.net/
// @description     Use Google Search for My Yahoo
// @include         http*://my.yahoo.com/*
// ==/UserScript==

el = document.getElementById('mhh2');
while (el.hasChildNodes()) {
el.removeChild(el.lastChild); }
  
var GoogleForm = document.createElement("div");
GoogleForm.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'font-size: small; background-color: #FFFFFF;" id="NewDiv">' +
    '<FORM method=GET name="Formy" action="http://www.google.com/search" style="z-index: -1> \
    <TABLE bgcolor="#FFFFFF"><tr><td> \
    <A HREF="http://www.google.com/"> \
    <IMG SRC="http://www.google.com/logos/Logo_40wht.gif" \
    border="0" ALT="Google" align="absmiddle"></A> \
    <INPUT TYPE=text name=q size=25 maxlength=255 value=""> \
    <INPUT type=submit name=btnG VALUE="Google Search" style="border: 1px solid #A4A4A4;"> \
    &nbsp;&nbsp;&nbsp;<a href="https://login.yahoo.com/config/login?logout=1"><font style="font-size: x-small">Logout</font></a> \
    &nbsp;<a href="http://edit.yahoo.com/config/eval_profile"><font style="font-size: x-small">My Account</font></a> \
    </td></tr></TABLE></FORM>' +
    '</div>';

el.appendChild(GoogleForm);
el.style.background = "#FFFFFF";

ygma = document.getElementById('ygma');
ymadbn = document.getElementById('ymadbn');
while (ygma.hasChildNodes()) {
ygma.removeChild(ygma.lastChild); }
while (ymadbn.hasChildNodes()) {
ymadbn.removeChild(ymadbn.lastChild); }

// Yahoo why do you torture me?

  links = document.getElementsByTagName('A');
  for (i=0; i<links.length; i++) {
    link = links[i];
    if (link.href.match("/navbar\/promo/")) {
      link.style["display"] = "none";
    }
  } 

document.forms[0].q.focus();
