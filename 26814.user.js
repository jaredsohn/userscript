// ==UserScript==
// @name	UnCapsLock
// @namespace	http://www.zbychu.org/
// @description	Removes CapsLock from comments on Onet.pl :)
// @include	http://wiadomosci.onet.pl/*
// ==

function decapitalize(dobject)
{
  var y = dobject.childNodes.length
  if (y > 0)
  {
    for (var i = 0; i < y; i++)
    {
      if (dobject.childNodes[i].nodeName != 'SCRIPT' && dobject.childNodes[i].nodeName != 'STYLE')
      {
        decapitalize(dobject.childNodes[i]);
      }
    }
  }
  else
  {
    if (dobject.nodeValue)
    {
      var textArr = dobject.nodeValue.split('.');
      dobject.nodeValue = '';
      for (var z=0; z < textArr.length; z++)
      {
        dobject.nodeValue += textArr[z].substring(0,1)+textArr[z].substring(1).toLowerCase();
        if (textArr.length > 1)
          dobject.nodeValue += '.';
      }
    }
  }
}

if (document.body)
{
  decapitalize(document.body);
}
