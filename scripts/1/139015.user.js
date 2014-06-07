// ==UserScript==
// @name           BITS WILP lecture highlight
// @namespace      venkatram
// @include        http://vu.bits-pilani.ac.in/onlineLecture/LectSchedule.htm
// @include        https://wilp-bits-pilani.webex.com/*
// @description    This script highlights the subj code and also appends the subj name for the specified Subject codes
// ==/UserScript==

//Search function used from http://www.nsftools.com/misc/SearchAndHighlight.htm

//Enter your subject codes with a space in between
var subjCodes = 'ZC361 ZG531 ZG553 ZG562';

function returnSubName(sTerm){

switch(sTerm){

case 'ZG553': return 'RTS';

case 'ZC361': return 'DS&A';

case 'ZG531': return 'PC';

case 'ZG562': return 'SE&M';

default: alert('Sub name undefined for '+sTerm);
	return '';

}

}


highlightSearchTerms(subjCodes,false);

//Map subject code with subject name for easy identification on Lecture page


// Below functions from http://www.nsftools.com/misc/SearchAndHighlight.htm
// Modified to map sub code to sub name
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = "<font style='color:blue; background-color:yellow;'>";
    highlightEndTag = "</font>";
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
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
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          subName= returnSubName(searchTerm);
          
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + subName + highlightEndTag;
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
  // if the treatAsPhrase parameter is true, then we should search for 
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
  if (treatAsPhrase) {
    searchArray = [searchText];
  } else {
    searchArray = searchText.split(" ");
  }
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
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


