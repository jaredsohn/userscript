// ==UserScript==
// @name          Note2be Propulse
// @description   Ajoute le bouton Propulse pour noter un professeur
// @include       http://www.note2be.com/professors/*
// ==/UserScript==

var myelement, newform, myprof;
myelement = document.getElementById('sheetProfile').childNodes[5];
newform = document.createElement('div');
myprof = myelement.childNodes[1].getAttribute("rel");

newform.innerHTML = '<form action="http://www.note2be.com/_professors.html?act=3&idProf=' +
  myprof +
  '&wantModify=0" method="post">' +
  '<input type="hidden" name="Note1" value="20" />' +
  '<input type="hidden" name="Note2" value="20" />' +
  '<input type="hidden" name="Note3" value="20" />' +
  '<input type="hidden" name="Note4" value="20" />' +
  '<input type="hidden" name="Note5" value="20" />' +
  '<input type="hidden" name="Note6" value="20" />' +
  '<input type="hidden" name="wantModify" value="0" />' +
  '<input type="submit" value="Propulse" />' +
  '</form>';

myelement.insertBefore(newform, myelement.lastChild);
