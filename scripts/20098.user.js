// Krakozabra Remover 0.0.2 (alpha) 2008-01-13
// ------------------------------------------
// Copyright (c) 2008, Ilya Dogolazky
// Released under the GPL license, see http://www.gnu.org/copyleft/gpl.html for details
// ------------------------------------------
// ==UserScript==
// @name           Krakozabra Remover
// @namespace      http://www.math.uni-bonn.de/people/ilyad/gm/krakozabra
// @description    Fixes some badly composed Russian pages. The script is not very fast. Don't use it unless you know what you do
// @include        *
// ==/UserScript==

for each(var area in xpath_list("descendant::textarea"))
  area.textContent = recode(area.textContent, from_win1251) ;

for each(var area in xpath_list("//input[@type = 'text']/@value"))
  area.textContent = recode(area.nodeValue, from_win1251) ;

for each(var text in xpath_list("//text()[not(ancestor::script) and not(ancestor::style)]"))
  text.nodeValue = recode(text.nodeValue, from_win1251) ;



function from_win1251(code)
{
  const shift = 0x410 - 0xC0 ;
  if(0xC0<=code && code<=0xFF)
    return code+shift ;
  else if(code==0xB8) // yo
    return 0x451 ;
  else if(code==0xA8) // capital yo
    return 0x401 ;
  else
    return code ;
}

function recode(str, mapping)
{
  for(var i=0, res=""; i<str.length; ++i)
    res += String.fromCharCode(mapping(str.charCodeAt(i))) ;
  return res ;
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