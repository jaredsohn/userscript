// ==UserScript==
 // @name           Google Nav Bar Remover
 // @namespace      JacquesP
 // @description    Removes the Google Navigation Bar (gBar)
 // @include        http*://*google.*/*
 // @version        1.0
// ==/UserScript==


var bar = document.getElementById("gbar");
var ubar = document.getElementById("guser");


if (bar != null)
{
  bar.style.display = 'none';
  bar.nextSibling.nextSibling.style.display = 'none';

  if ( ubar != null )
  {
    ubar.style.display = 'none';
    ubar.nextSibling.nextSibling.style.display = 'none';
  }
}
else
{
  // http://userscripts.org/scripts/show/28500
  // for gmail.

  var watchit =
    function(e)
    {
      if (gbar = document.getElementById('gbar'))
      {
        document.body.removeEventListener('DOMNodeInserted', watchit, false);
        gbar.style.display = 'none';
        gbar.nextSibling.nextSibling.style.display = 'none';

        if ( guser = document.getElementById('guser') )
        {
          guser.style.display = 'none';
          guser.nextSibling.nextSibling.style.display = 'none';
        }
      }
    }

    document.body.addEventListener('DOMNodeInserted', watchit, false);
}