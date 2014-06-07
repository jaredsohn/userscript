// ==UserScript==
// @name           Minus
// @namespace      Minus
// @description    Minuscorp
// @include        http://s4.gladiatus.it/game/index.php?mod=messages*
// @include        http://s4.gladiatus.it/game/index.php?mod=guild_warcamp*
// @include        http://s4.gladiatus.it/game/index.php?mod=guild_main*

// ==/UserScript==

window.onload = highlightSearchTerms('Iskan megalessandro rider pioniere87 matt94 KALLEUI ispanyco daddu Nikospartacus Oriken LadySky Joseph80 RealBlack golden_boy DaViDeEeEeE WOLFMANNARUS costantino9 Triskele sagale Murin CaiusCornelius Sils Giogogo');

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:blue; background-color:red;'>";
    highlightEndTag = "</font>";
  }

  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) 
{
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return newText;
}


function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
  if (treatAsPhrase) {
    searchArray = [searchText];
  } else {
    searchArray = searchText.split(" ");
  }
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Spiacente. La ricerca su questa pagina non funziona.");
    }
    return false;
  }
  
  var bodyText = document.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
  }
  
  document.body.innerHTML = bodyText;
  return true;
}