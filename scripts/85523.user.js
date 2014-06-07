// ==UserScript==
// @name           OwaReLogon
// @namespace      OWAReLogon
// @description    Drops a button what points to the logon screen
// @include        https://*/owa/auth/logoff.aspx*
// ==/UserScript==

function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

var loc = window.location.href.replace(/logoff.aspx.*/i,'logon.aspx');

createEl({n: 'tr', c: [
{n: 'td', a: {'@colspan': 2, '@align': 'right', '@class': 'txtpad'}, c: [
	{n: 'form', a: { '@action': loc, '@id': 'reLogon'}, c:[
		{n: 'input', a: {'@type': 'submit', '@class': 'btn', '@value': 'Re-Logon'}}
	]}
]}
]}, document.getElementById('tdMsg').parentNode);

