// ==UserScript==
// @name           Rode Wiki auto block
// @namespace      http://userscripts.org/scripts/show/132437
// @description    Fills out block form and submits automatically for rode wiki
// @include        http://wiki.rodeonline.com/index.php/Special:Block/*
// ==/UserScript==
isBlocked1 = self.find('is already blocked.');
isBlocked2 = self.find('has been blocked.');
if(!isBlocked1 && !isBlocked2)
{
  document.getElementById('mw-input-wpExpiry').value = 'infinite';
  document.getElementById('mw-input-wpReason').value = 'Spamming links to external sites';
  document.forms[0].submit();
}
else if (isBlocked1 || isBlocked2)
{
  str = String(window.location);
  if(isBlocked1)
    window.location = 'http://wiki.rodeonline.com/index.php?title=User:' + document.getElementById('mw-bi-target').value + '&action=delete';
  else
    window.location = 'http://wiki.rodeonline.com/index.php?title=User:'+ str.substr(str.lastIndexOf("/")+1) +'&action=delete';
}