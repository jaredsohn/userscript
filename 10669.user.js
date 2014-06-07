// ==UserScript==
// @name           Highlight and Search
// @namespace      http://jtymes.net
// @description    Search a page and highlight selected words with specific colors
// @include        *
// ==/UserScript==
/*
 * THIS IS ALL TAKEN FROM http://www.nsftools.com/misc/SearchAndHighlight.htm SLIGHTLY MODIFIED
 * This is the function that actually highlights a text string by
 * adding HTML tags before and after all occurrences of the search
 * term. You can pass your own tags if you'd like, or if the
 * highlightStartTag or highlightEndTag parameters are omitted or
 * are empty strings then the default <font> tags will be used.
 */
function doHighlight(bodyText, searchTerm, foreColor, backColor) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if (!foreColor || !backColor) {
    foreColor = "blue";
    backColor = "yellow";
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
          newText += bodyText.substring(0, i) + '<span style="color:'+foreColor+'; background-color:'+backColor+';">' + bodyText.substr(i, searchTerm.length) + '</span>';
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return newText;
}


/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTerms(searchText, foreColor, backColor, treatAsPhrase)
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
  
  var bodyText = document.body.innerHTML;
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyText, searchArray[i], foreColor, backColor);
  }
  
  document.body.innerHTML = bodyText;
  return true;
}
function menu_search() {
	var searchTerms = prompt("What are you looking for?");
	var colors = prompt("fore color|back color");
	if(!colors || colors == null || colors == "" || typeof(colors) !== 'string') {
		var foreColor = 'blue';
		var backColor = 'yellow';
	} else {
		var foreColor = colors.split("|")[0];
		var backColor = colors.split("|")[1];
	}
	highlightSearchTerms(searchTerms, foreColor, backColor, true);
}
//check depending on the website you are at so you aren't highlighting on every page
if(window.location.href.indexOf("http://userscripts.org") == 0 || window.location.href.indexOf("http://www.userscripts.org") == 0) {
	highlightSearchTerms('like to', 'red', 'black', true);
	highlightSearchTerms('script', 'white', 'black');
}

GM_registerMenuCommand('Search...', menu_search);