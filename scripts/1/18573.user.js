// Literal Unicode in Textarea 0.0.2 (alpha) 2008-01-01
// ------------------------------------------
// Copyright (c) 2008, Ilya Dogolazky
// Released under the GPL license, see http://www.gnu.org/copyleft/gpl.html for details
// ------------------------------------------
// ==UserScript==
// @name           Literal Unicode in Textarea
// @namespace      http://www.math.uni-bonn.de/people/ilyad/lj/literal
// @description    Replaces hexadecimal representations of non-ASCII characters in textareas by corresponding literal Unicode characters.
// @include        http://www.livejournal.com/editjournal.bml?*
// ==/UserScript==

for each(var area in xpath_list("descendant::textarea"))
  area.textContent = modify(area.textContent) ;

function modify(txt)
{
  var result = "" ;
  var re = /^([\s\S]*?)&#x([0-9A-Fa-f]+);([\s\S]*)$/ ;
  for(var x; x = txt.match(re); result+=x[1]+replacer(x[2])) 
    txt = x[3] ;
  return result + txt ;
}

function replacer(hex)
{
  var value = parseInt(hex, 16) ;
  if(isNaN(value))
    return hex ;
  if(value<128) // Do not replace ASCII!!!
    return "&#x" + hex + ";" ;
  return String.fromCharCode(value) ;
}

function xpath_list(xpath, root, order)
{
  if(!root)
    root = window.document ;
  var result = [] ;
  var snapshot = document.evaluate(xpath, root, null, (order ? XPathResult.ORDERED_NODE_SNAPSHOT_TYPE : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE), null) ;
  for(var i=0; i<snapshot.snapshotLength; ++i)
    result.push(snapshot.snapshotItem(i)) ;
  return result ;
}

// vim:tw=0:smartindent
