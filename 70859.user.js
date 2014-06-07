// ==UserScript==
// @name           Google images direct link
// @namespace      Michael.27
// @description    Makes image thumbnails to be direct links to the big images, and the green domain names under the thumbnails will be links to the containing page.
// @include        http://images.google.*/images?*
// @include        http://www.google.*/images?*
// ==/UserScript==



//
// Grease the page on load
//
var thumbnail_anchors = $s("//table[@id='imgtb']/tbody/tr/td/a[img]");     // <a> elements containing the thumbnails
var cite_elements     = $s("//table[@id='imgtb']/tbody/tr/td/div//cite");  // the green domain names under the thumbnails

for (var i=0; i<thumbnail_anchors.snapshotLength; i++)
{
  var original_href = thumbnail_anchors.snapshotItem(i).href;

  thumbnail_anchors.snapshotItem(i).href = get_big_image_uri(original_href);
  replace_element_with_anchor(cite_elements.snapshotItem(i), get_container_page_uri(original_href));
}



//
// Grease the page when elements are added by Google's javascript
//
var last_original_href = { value:null };  // href attribute of the last added <a> element

document.addEventListener('DOMNodeInserted',
                          function (e) { grease_added_element(e.target, last_original_href); },
                          false);



//
// grease_added_element('added_element', 'original_href')
//  Handles two kinds of added elements:
//  - <a> which has a child <img>:
//    Saves the href attribute of the <a> to 'original_href',
//    and modifies the href attribute to point directly to the big image.
//  - <div> with a descendant <cite> element:
//    Replaces the <cite> element with an <a>, that points to the page containing the image.
//    Uses 'original_href' as an input value. Assumes that the previous call of the function
//    put the correct value into 'original_href'.
//  Remark:
//  - Google's javascript creates the thumbnails and the text under the thumbnails incrementally:
//    one thumbnail, one text, one thumbnail, one text, ...
//
function grease_added_element(added_element, original_href)
{
  if (a = $("self::a[img]", added_element))               // if this is an <a> with the thumbnail
  {
    original_href.value = a.href;
    a.href = get_big_image_uri(original_href.value);
  }
  else if (cite = $("self::div//cite", added_element))    // if this is a <div> with the <cite>
  {
    replace_element_with_anchor(cite, get_container_page_uri(original_href.value));
  }
}



//
// replace_element_with_anchor('element', 'href')
//  Replaces the given 'element' with an <a> with href attribute set to 'href'.
//
function replace_element_with_anchor(element, href)
{
  var a = document.createElement("a");
  a.href        = href;
  a.textContent = element.textContent;
  a.title       = element.title;
  a.style.color          = "green";
  a.style.textDecoration = "none";

  element.parentNode.replaceChild(a, element);
}



//
// get_big_image_uri('original_href')
//  Extracts the URI of the big image
//  from the original URI of the thumbnail.
//
function get_big_image_uri(original_href)
{
  /imgurl=([^&]*)/.test(original_href);
  return decodeURIComponent(RegExp.lastParen);
}



//
// get_container_page_uri('original_href')
//  Extracts the URI of the web page containing the big image
//  from the original URI of the thumbnail.
//
function get_container_page_uri(original_href)
{
  /imgrefurl=([^&]*)/.test(original_href);
  return decodeURIComponent(RegExp.lastParen);
}



//
// XPath functions
// MDC XPath documentation: https://developer.mozilla.org/en/XPath
//
// Parameters:
//  'xpath'   : XPath expression,
//  'context' : context node (optional)
//
// $ (xpath) returns Node; the 1st node matching the 'xpath'.
// $a(xpath) returns XPathResult.ANY_TYPE (NUMBER_TYPE, STRING_TYPE, BOOLEAN_TYPE, UNORDERED_NODE_ITERATOR_TYPE)
// $s(xpath) returns XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
//
function $ (xpath, context) { return $$(xpath, context, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; }
function $a(xpath, context) { return $$(xpath, context, XPathResult.ANY_TYPE); }
function $s(xpath, context) { return $$(xpath, context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE); }

function $$(xpath, context, result_type)
{
  if (context === undefined)  context = document;
  return document.evaluate(xpath, context, null, result_type, null);
}
