// ==UserScript==
// @name           Symbaloo_Google_Search_Fix
// @namespace      Symbaloo_google_search_fix
// @description    Change symbaloos adsense search to a to regular search in turn adding the Web Images Maps News Shopping Gmail links to the top of the page.
// @include        http://www.symbaloo.com*
// ==/UserScript==

document.addEventListener('load',function() {
///////////////

var form = getNode( "//form[@action='http://www.google.com/cse']" );
if( form ) {
  form.setAttribute('action','http://www.google.com/search');
  var cxInput = getNode( "//input[@name='cx']", form );
  if( cxInput ) cxInput.parentNode.removeChild(cxInput);
}

// Returns the first result from the xpath query
function getNode(xpath,context,doc) {
  if( !doc ) doc = document;
  if( !context ) context = doc;
  return doc.evaluate(xpath,context,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null)
            .singleNodeValue;
}

/////////////
},true);
