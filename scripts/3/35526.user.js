// Fix feeds's links in Google Reader
//
// Version (?) - 2008-10-15
//
// Copyright (c) 2008, Alexandre Magno (alexandre.mbm@gmail.com)
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// Click on install.
//
// ==UserScript==
// @name           Fix feeds's links in Google Reader 
// @namespace      http://www.google.com/reader
// @description    Fix acidigital.com's links in Google Reader
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://reader.google.com/reader/*
// @include        https://reader.google.com/reader/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Feel free to address comments or improvement suggestions to alexandre.mbm@gmail.com
//
// --------------------------------------------------------------------
// Changelog :
//
// 
//
// --------------------------------------------------------------------
// Tested on Firefox 3.0
// --------------------------------------------------------------------
//
// Without the study of codes of the two scripts below, the construction of this would not be possible.
//
// GreaseMonkey para feed do InfoBlogs no GoogleReader, by Programando sem cafeína
// http://programandosemcafeina.blogspot.com/2008/03/greasemonkey-para-feed-do-infoblogs-no.html
//
// [Updated] Google Reader Preview Enhanced v1.07g
// http://userscripts.org/scripts/show/9455


function getFirstElementMatchingClassName(root,tag,class)
{
  var elements=root.getElementsByTagName(tag); var i=0;
  while (elements[i] && !elements[i].className.match(class)) { i++; }
  return ((!elements[i]) ? null : (elements[i]));
}

function findParentNode(el,tag,class)
{
  el=el.parentNode;
  if (arguments.length==3)
  {
    // Find first element's parent node matching tag and className
    while (el.nodeName.toLowerCase()!='body' && (el.nodeName.toLowerCase()!=tag || 
     (el.className!=class && el.className.indexOf(class+' ')==-1))) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }
  else
  {
    // Find first element's parent node matching tag
    while (el.nodeName.toLowerCase()!='body' && el.nodeName.toLowerCase()!=tag) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }	
}

function getLink(el) {
  var entry=findParentNode(el,'div','entry');	
  return getFirstElementMatchingClassName(entry,'a','entry-title-link');
}

function changeLink(a) {
  if( a.className=="entry-title-link" && a.href.indexOf("www.acidigital.com/noticia.php?n=")!=-1 ) 
  {  a.href = a.href.replace("noticia.php?n=","noticia.php?id="); }
}

function catchEntryAdded(e)
{
    var el=e.target;
    if (el.nodeName=='DIV' && el.className.indexOf('entry')>-1)
    {
      if (el.className.indexOf('entry-actions')>-1)
      {
        // Expanding article in list view
        changeLink( getLink(el) );
      }
      else if (getFirstElementMatchingClassName(el,'tbody','card-tbody'))
      {
        // Adding article in expanded view
        el = getFirstElementMatchingClassName(el,'div','entry-actions');
        changeLink( getLink(el) );
      }
    }
}  

document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
