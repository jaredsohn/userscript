// Google Reader Preview Enhanced
// version 1.07e
// 2008-04-08
// Copyright (c) 2007, Julien CAROSI (jcarosi@gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on install.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name            GPE
// @namespace       http://userscripts.org/scripts/show/9455
// @description     Adds a "Preview button" that allows you to view actual article in a frame. Clicking again on that button goes back to RSS view. Does work both in List view and expanded view.
// @include         http://reader.google.com/reader/*
// @include         https://reader.google.com/reader/*
// @include         http://www.google.com/reader/*
// @include         https://www.google.com/reader/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// This script adds a "Preview button" that allows you to view actual article in a frame.
// Clicking again on that button goes back to RSS view. Does work both in List view and expanded view.
//
// Feel free to address comments or improvement suggestions to jcarosi@gmail.com
//
// --------------------------------------------------------------------
// Changelog :
// v1.08e : fixes compatiblity with Google's new code
// v1.07d : makes scrolling to top of article work again because google's code was changed. Same for shortcut
// v1.07c : fixes problem with Shift V shortcut that prevented typing capital V in GR's dialog boxes
//          added support for https urls
// v1.07b : makes scrolling to top of article work again because google's code was changed. Same for shortcut
// v1.07a : makes the script work again because google's code was changed.
//          added a try/catch statement in order to make the script work even if the code changes again, though not scrolling to the top of article
//          so people can still use the script until an upgrade is released
// v1.07  : allows clicking on an article's title to show the preview, so you don't need to scroll it down to preview it (was opening the article in a new window previously, now not needed with preview functionnality)
// v1.06a : fixes compatibility with "find as you type" firefox functionality
// v1.06  : adds a keyboard shortcut for previewing an article. Now you can press Shift-V to go to preview mode or go back to rss view.
// v1.05a : adds better support for Better GReader extension.
// v1.05  : makes the script work again because offline functionnality broke it when it was added by Google.
// v1.0   : initial release.
// --------------------------------------------------------------------
// Tested on Firefox 1.5 and 2.0
// --------------------------------------------------------------------

function getFirstElementMatchingClassName(root,tag,class)
{
  var elements=root.getElementsByTagName(tag); var i=0;
  while (elements[i] && !elements[i].className.match(class)) { i++; }
  return ((!elements[i]) ? null : (elements[i]));
}

function getElementsByClassName(root,tag,class)
{
  var elements = root.getElementsByTagName(tag);
  var results = new Array();
  for(var i=0; i<elements.length; i++) { if(elements[i].className.indexOf(class)>-1) { results.push(elements[i]); } }
  return (results);
}

function findParentNode(el,tag,class)
{
  el=el.parentNode;
  if (arguments.length==3)
  {
    // Find first element's parent node matching tag and className
    while (el.nodeName.toLowerCase()!='body' && (el.nodeName.toLowerCase()!=tag || (el.className!=class && el.className.indexOf(class+' ')==-1))) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }
  else
  {
    // Find first element's parent node matching tag
    while (el.nodeName.toLowerCase()!='body' && el.nodeName.toLowerCase()!=tag) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }	
}

function addStyles(css)
{
  var head=document.getElementsByTagName('head')[0];
  if (head)
  {
    var style=document.createElement('style');
    style.type='text/css';
    style.innerHTML=css;
    head.appendChild(style);
  }
}

function catchEntryAdded(e)
{
    var el=e.target;
    if (el.nodeName=='DIV' && el.className.indexOf('entry')>-1)
    {
      if (el.className.indexOf('entry-actions')>-1)
      {
        // Expanding article in list view
        addPreviewButton(el);	
      }
      else if (getFirstElementMatchingClassName(el,'tbody','card-tbody'))
      {
        // Adding article in expanded view
        addPreviewButton(getFirstElementMatchingClassName(el,'div','entry-actions'));
      }
    }
}

function addPreviewButton(el)
{
  // Top link
  var entry=findParentNode(el,'div','entry');	
  var link=getFirstElementMatchingClassName(entry,'a','entry-title-link');
  link.addEventListener('click', previewMouseClick, false);
  // link.addEventListener('click', function(e) { if (e.ctrlKey) { previewMouseClick(e); }  }, false);
  	
  // Bottom button
  var preview=document.createElement('span');
  preview.className='item-preview preview link';
  preview.innerHTML='Preview';
  el.appendChild(preview);
  preview.addEventListener('click', previewMouseClick, false);	
}

function calcEntryIndex(e)
{
    var index=0;
    while (e.previousSibling)
    {
      index++;
      e=e.previousSibling;
    }
    return index;
}

function previewMouseClick(e)
{
    var el=e.target;
    var entry=findParentNode(el,'div','entry');
    var index = calcEntryIndex(entry);
    preview(entry,index);
    e.preventDefault();
}

function previewShortcut()
{
  var index=unsafeWindow.s.ma;
  if (index>-1)
  {
    // An article is selected, preview it
    preview(getEntryDOMObject(index),index);
  }
}

function preview(entry,index)
{
    var preview;
    
    // Update entry with preview mode, need to do it before scrolling, because scrolling will repaint preview button (list view only)
    if (entry.className.indexOf('preview')==-1)
    {
      entry.className=entry.className+' preview';
      preview=true;
    }
    else
    {
      entry.className=entry.className.replace('preview','');    	
      preview=false;
    }
    	    
    // Need to scroll before changing entry-body, because scrolling repaints article from scratch (list view only)
    scrollTo(index);
    
    root = getEntryDOMObject(index);
    var body = getFirstElementMatchingClassName(entry,'div','entry-body');
    var entryBody= getFirstElementMatchingClassName(body,'div','item-body');

    if (preview)
    {
       // classic mode-> preview mode

       // hide rss item
       entryBody.style.display='none';
       
       // iframe creation/display
       var iframe = getFirstElementMatchingClassName(entry,'iframe','preview');
       if (iframe)
       {
         // iframe already in document, display it
         iframe.style.display='block';
       }
       else
       {
         // iframe not in document, create it
         iframe = document.createElement('iframe');
         iframe.setAttribute('width','100%');
         iframe.setAttribute('height','500px');
         iframe.setAttribute('src',getFirstElementMatchingClassName(entry,'a','entry-title-link'));
         iframe.className='preview';
         body.appendChild(iframe);
       }		
       
       // Scale article container to fullwidth
       body.setAttribute('style','max-width: 98%');
    }
    else
    {
       // preview mode -> classic mode
       
       // hide iframe
       var iframe = getFirstElementMatchingClassName(entry,'iframe','preview');
       if (iframe) iframe.style.display='none';
       
       // show rss item
       ins.style.display='block';
       
       // Go back to initial width
       body.removeAttribute('style','');     
    }  
}      

function handleKeypress(e)
{
  // Handle a Shift-V keypress
  if (e.target.nodeName.toLowerCase()!='input' && e.shiftKey && e.keyCode==86)
  {
    previewShortcut();
    e.preventDefault();
  }
}

function getEntryDOMObject(index)
{
    // Because of repaint, entry doesn't point to correct DOM object, we need to find entry using index
    var entries=document.getElementById('entries');
    var i=0;
    entry=entries.firstChild;
    while ((i++)<index)
    {
      entry=entry.nextSibling;
    }	
    return entry;
}       

function scrollTo(index)
{   
    // Force scrolling to top of article
    try
    {
      location.href = 'javascript:void(s.ma=-1);';
      location.href = 'javascript:void(s.hf('+index+'));';    
    }
    catch(err) { }
}      
       
function restyle()
{
    // Overwrites Better GReader extension css modifications regarding entry-actions class.
    // Indeed, entry-actions was set to "float : right", thus div was not in document flow.
    // Then, clicking on preview button let entry actions div in place instead of going down automatically when iframe was added.
    // That's why I use here text-align: right. That has the same effect, but keeps div in document flow.
    // restyle() is called after document load, in order to ensure that Better GReader has already added its styles modifications
    var styles = document.getElementsByTagName('head')[0].getElementsByTagName('style');
    var i=0;
    
    while (i<styles.length)
    {
    	if (styles[i].innerHTML.indexOf('.entry-actions { float:right !important; }')>-1)
    	{
          styles[i].innerHTML=styles[i].innerHTML.replace('.entry-actions { float:right !important; }','.entry-actions { text-align: right; !important; }');
    	}
    	i++;
    }
}

function init()
{
  restyle();
  addStyles('span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat; padding-left: 16px; } div.entry.preview span.item-preview { background: url("data:image/gif,GIF89a%10%00%10%00%A2%05%00%D8%D8%D8%DB%DB%DB%AD%AD%AD%CC%CC%CC%FE%9A%20%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%10%00%10%00%00%03%3BX%BA%DC%FE0%B60%AA%BDa%05%C1%BB%E7Y1%08Di%9E%C2%A0%8C%A6%D7%AA%22Y%CA2%91%AE%B5%3B%C3%EC%7C%EE%B8%D6%CF%C6%AB%0D%89%0A%C0g)%00h.%D0AHB%A5%26%00%00%3B") no-repeat; padding-left: 16px; }');
}
      
document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
document.addEventListener('keydown',handleKeypress, false);
window.addEventListener('load',init,false);
