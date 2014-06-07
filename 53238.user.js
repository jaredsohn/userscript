// ==UserScript==
// @name           All
// @namespace      All
// @description    All
// @include        http://*
// ==/UserScript==

if(window.location.href==window.top.location.href) {
var btn = document.createElement("input");
btn.type = "button";
btn.value = "Ricerca termini";
btn.addEventListener("click", function searchPrompt (defaultText, textColor, bgColor)
{
  {
    defaultText = "";
  
  if ((!textColor) || (!bgColor)) {
    highlightStartTag = "";
    highlightEndTag = "";
  } else {
    highlightStartTag = "<font style='color:" + textColor + "; background-color:" + bgColor + ";'>";
    highlightEndTag = "</font>";
  }
  
    promptText = "Scrivi le parole che vuoi cercare, separate da uno spazio:";
  
  
  searchText = prompt(promptText, defaultText);

  if (!searchText)  {
    alert("Nessun termine digitato. Uscita.");
    return false;
  }
  
  return highlightSearchTerms2(searchText, true, highlightStartTag, highlightEndTag);}}, false); 
document.body.insertBefore(btn, document.body.firstChild);
  
var btn = document.createElement("input");
btn.type = "button";
btn.value = "Ricerca frase";
btn.addEventListener("click", function searchPrompt (defaultText, textColor, bgColor)
{
 {
    defaultText = "";
  
  if ((!textColor) || (!bgColor)) {
    highlightStartTag = "";
    highlightEndTag = "";
  } else {
    highlightStartTag = "<font style='color:" + textColor + "; background-color:" + bgColor + ";'>";
    highlightEndTag = "</font>";
  }

    promptText = "Scrivi la frase che vuoi cercare:";
  
  
  searchText = prompt(promptText, defaultText);

  if (!searchText)  {
    alert("Nessun termine digitato. Uscita.");
    return false;
  }
  
  return highlightSearchTerms(searchText, true, highlightStartTag, highlightEndTag);}}, false); 
document.body.insertBefore(btn, document.body.firstChild);
  }

function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
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


function highlightSearchTerms(searchText, warnOnFailure, highlightStartTag, highlightEndTag)
{
  
    searchArray = [searchText];
 
  
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

function highlightSearchTerms2(searchText, warnOnFailure, highlightStartTag, highlightEndTag)
{
 
    searchArray = searchText.split(" ");
 
  
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