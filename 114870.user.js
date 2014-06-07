// ==UserScript==
// @name Pinboard - URL Cleaner
// @description On the posting page, highlights URLs with form params and anchors, and inserts a link that, when clicked, strips these out.
// @include http://pinboard.in/add*
// @include http://www.pinboard.in/add*
// @include https://pinboard.in/add*
// @include https://www.pinboard.in/add*
// ==/UserScript==

var urlInput = document.evaluate("//input[@name = 'url']", document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
if (urlInput.snapshotLength != 1) {
    GM_log("Couldn't find url input. Exiting script.");
    return;    
}

var urlInput = urlInput.snapshotItem(0);  
var cleanLinkDiv = createLink(urlInput);
toggleLink(urlInput);
urlInput.addEventListener("change", function(event) { toggleLink(urlInput); }, false);

function createLink(urlInput) {   	   
  var cleanLink = document.createElement("a");
  cleanLink.href="";
  cleanLink.innerHTML = "Clean URL";
  cleanLink.id = "gm_cleanUrlLink";
  cleanLink.style.paddingLeft = "3px";
  if (urlInput.nextSibling) {
    urlInput.parentNode.insertBefore(cleanLink, urlInput.nextSibling);
  }
  else {
    urlInput.parentNode.appendChild(cleanLink);
  }
  
  cleanLink.addEventListener("click", function(event) {
    event.stopPropagation();		
    event.preventDefault();
    urlInput.value = urlInput.value.replace(/^([^#|?]+)[#|?].*$/, "$1");
    toggleLink(urlInput);
  
  }, false);
  
  return cleanLinkDiv; 
}
  
function toggleLink(urlInput) {
  if (urlInput.value.match(/^([^#|?]+)[#|?].*$/)) {
    urlInput.style.backgroundColor = "#ffffd0";
    document.getElementById("gm_cleanUrlLink").style.display = "inline";
  }
  else {
    urlInput.style.backgroundColor = "#ffffff";
    document.getElementById("gm_cleanUrlLink").style.display = "none";
  }
}