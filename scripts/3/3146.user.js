// ==UserScript==
// @name GMaps Big Red Dot
// @namespace http://as1.servebeer.com/
// @description Ever felt the need for a Google Maps Crosshair Pointer? This script helps you point out little details dumping a Big Red Dot in the viewport's center.
// @include http://maps.google.tld/*
// @include http://*.google.tld/maps?*
// ==/UserScript==
// version 0.1
// This baby is GreaseMonkey 0.6.4 (Firefox 1.5) compatible.

/* 
 * (C) 2005, Zingus J. Rinkle
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; version 2 of the
 * License. NO WARRANTIES of ANY kind are granted, not even 
 * that of MERCHANTABILITY or of FITNESS FOR A PARTICULAR PURPOSE.
 * Help  yourself a copy of the License at:
 * http://creativecommons.org/licenses/GPL/2.0/legalcode
 */

/*
 * Instructions:
 * 
 * 1) Tools->Install this user script
 * 2) Open Google Maps
 * 3) Doubleclick yourself to some placed. Some *unnamed* place.
 * 4) Click "Link to this page"
 * 5) Enjoy
 * 6) Click "Link to this page" again
 * 7) Enjoy again
 * 8) Repeat step 4
 * 9) Enjoy
 */

(function () {

function parse_query(query)
{
  query=query.replace(/([^&=]*)=([^&]*)/g,function (zero,k,v) {
    k=unescape(k)
    v=unescape(v)
    k=k.replace(/([\\'])/g,'\\$1')
    v=v.replace(/([\\'])/g,'\\$1')
    v=v.replace(/\+/g,' ')
    return ("'"+k+"':'"+v+"'")
  })
  query=query.replace(/&/g,',')
  query='query={'+query+'}'
  eval(query)
  return query
}

function gen_query(object)
{
  var ret='',p;
  for (p in object) {
    ret+='&'+p+'='+object[p]
  }
  ret=ret.substr(1)
  return ret
}

function onClick(e) {
  var query,addr
  // cut url into little pieces
  addr=e.currentTarget.href
  addr=addr.split('?',2)
  query=parse_query(addr[1])

  // handle query structure
  if (query.ll == query.q) {
    query.q='ny'
  } else if (query.q.match(/^\d+\.\d+,\d+\.\d+$/) && !query.ll) {
    query.ll=query.q
    query.q='ny'
  } else if (query.ll) {
    query.q=query.ll
  }
  
  // merge little pieces to and url
  addr[1]=gen_query(query)
  addr=addr[0]+'?'+addr[1]
  e.currentTarget.href=addr
  return true
}

// add onClick to every anchor there is
// (to "Link this Page" alone, ideally.)
anchors=document.getElementsByTagName("A");
for(i=0;i<anchors.length;i++) {
  anchors[i].addEventListener('click',onClick,true)
}

})()
