// ==UserScript==
// @name           Cover
// @namespace      Cover
// @description    Covercorp
// @include        http://s4.gladiatus.it/game/*
// ==/UserScript==

window.onload = highlightSearchTerms('magni street1975 atrebor ramoncina77 CSC-Zinga CSC-DiaboliK Hispanico69 Jaff kndo Raven76 avecanem cacique Claire JakeLaFuria plastikman92 ALCAFONE albertus84 CISCO.BBR sib80 marius75 King_Wolf FRED madprofessor Axel_Gladiator Lord_of_Terror Finixus CAIVSMVTIVS terminetor68x Xaverius roberto_81 peppep mamy gladiator71 herasmus CIALTRONE Mutt');

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:yellow; background-color:blue;'>";
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
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
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