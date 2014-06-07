// Orkut - confirm profile view
// version 0.1 BETA
// 2007-05-13
// Copyright (c) 2007, Leandro Koiti Sato
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Orkut - confirm profile view
// @namespace       http://shogunbr.blogspot.com
// @description     Displays a confirmation box when clicking on a orkut profile link
// @include         http://www.orkut.com/*
// ==/UserScript==

function getMyOwnUID()  {
  re = /=ID=\d+:/
  var result = null;
  try {
    result = document.cookie.match(re);
    result = result[0].substring(4, result[0].length-1);
  } catch (e) {}
  return(result);
}

function getMyLanguageNumber()  {
  re = /:LNG=\d+:/
  var result;
  try {
    result = document.cookie.match(re);
    result = result[0].substring(5, result[0].length-1);
  } catch (e) {
    result = '0';
  }
  return(parseInt(result));
}


document.addEventListener ('click', function(event) {
  var target = event.target;
  while (target)  {
    try {
      if (target.href.match(/Profile\.aspx/i) != null) {
        try{
          if (target.href.match("uid=" + getMyOwnUID()) != null)
            return;
         }
         catch(e){}
      break;
     }
     else return;

    } catch (e)  {}
    target = target.parentNode;
  }

  if (target) {
    if (event.which < 3) {
      var txt;
      switch (getMyLanguageNumber()) {
        case 79:
          txt = "Visitar o perfil dessa pessoa?";
          break;
        default:
          txt = "Confirm profile view?";
      }
      var go = confirm(txt);
      if (!go)
        event.preventDefault();
    }
  }

}, true);
