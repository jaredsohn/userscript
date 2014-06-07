// ==UserScript==
// @name        LibraryThing make author combining easier
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description This script moves the "Improve this author" box to the top, always shows "(never)" links, always shows the search box, prepopulates it with the author name, etc.
// @include     http*://*librarything.tld/author/*
// @include     http*://*librarything.com/author/*
// @version     1
// ==/UserScript==

// Set up some stuff here that's used in multiple features (in case users want to delete/comment some features)
var improveAuthBox = getImproveAuth();
function getImproveAuth(){
  el = document.getElementById("searchcombine"); // a unique ID within the box we want
  if (el) {
    while (el = el.parentNode) {
      if ((" " + el.className + " ").indexOf(" greenbox ") > -1) { // the class of the top element we want
        return el;
      }
    }
  }
  return null;
}
var searchInput = document.getElementsByName("searchbox")[0];
var searchDiv = document.getElementById("searchcombine");
var nevers = document.getElementsByClassName("nevercombinelink");
var combineWith = document.getElementById("combinewith");
// Don't remove any of the above code.  If you want to delete or comment sections, start from here on down.


// Make the "Impove this author" the top box at right
var rightCol = document.getElementsByClassName("cColumn")[0];
if (rightCol && improveAuthBox) rightCol.insertBefore(improveAuthBox, rightCol.firstChild);


// Instead of the Header "Combine/separate works" followed by a link of the author's name, remove the header 
// and replace the link with the "Combine/separate works" text.
if (improveAuthBox) {
  var combSep = improveAuthBox.getElementsByTagName("h3")[0];
  var combSepLink = combSep.nextSibling.getElementsByTagName("a");
  if (combSepLink.length == 1) { // Skips this feature if it's disambiguated page, which has two links
    combSepLink[0].textContent = combSep.textContent;
    combSep.style.display = "none";
  }
}


// Always have the "Search for the author" input box showing instead of having to click "Search" each time
if (searchDiv) searchDiv.style.display = "block";
// in which case we don't really need that "Search" link anymore
if (combineWith) {
  var combineLinks = combineWith.getElementsByTagName("li");
  combineLinks[combineLinks.length - 1].style.display = "none";
}
// Always show the "(never combine)" links (especially because the above code hides the "Never?" link)
for (i=0; i<nevers.length; i++) nevers[i].style.display = "inline";


// If we're in English, shorten "never combine"  to "never" so that that we don't have so much wrapping
if (nevers.length && nevers[0].textContent.indexOf("never combine") > -1) {
  for (i=0; i<nevers.length; i++) {
    nevers[i].getElementsByTagName("a")[0].textContent = "never";
  }
}


// Right-align the "never" links to get through them more quickly while lowering the risk of clicking "combine"
for (i=0; i<nevers.length; i++) {
  par = nevers[i].parentNode;
  par.insertBefore(nevers[i], par.firstChild);
  nevers[i].style.cssFloat = "right";
  nevers[i].style.marginLeft = "10px"; // I think this is necessary in certain cases dues to some textIndent business
}


// Don't limit the search box to just 30 characters
if (searchInput) searchInput.removeAttribute("maxlength");


// Prepopulate the search box with the displayed author name
var authNameInVal = document.getElementsByName("combinewithfullname")[0]; // better than h1, which might have dates or disambiguation stuff
if (searchInput && authNameInVal) searchInput.setAttribute("value",authNameInVal.value); // .value here since certain pages error if authNameInVal not found


// Don't show combining options on disambiguated pages, as a reminder not to combine from there
var authorString = document.URL.match(/.*\/author\/\w*(-\d*)?(?:$|.*)/); // captures a disambiguation number if it exists
if (authorString[1] != undefined) { // testing if on a split page (i.e. if there was a disambiguation number in the URL)
  // Hide the search input
  if (searchDiv) searchDiv.style.display = "none";
  // Hide the "Combine with ..." section
  if (combineWith) {
    combineWith.previousSibling.style.display = "none";
    combineWith.style.display = "none";
  }
}
