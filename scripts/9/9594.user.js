// Google Reader Facebook Sharer
//
//Places an expandable Facebook Sharer into each Google Reader item so that websites 
//can be shared with Facebook friends and on a Facebook profile from Reader with a couple clicks (includes image attachment).
//
// Based on the Google Reader Preview Enhanced (GPE) by Julien CAROSI
// Known Issue: If you are not logged in Facebook will break out of the frame and take over your poor reader. Anyone think of a way to catch this?
//
// ==UserScript==
// @name           Facebook Sharer + Google Reader
// @description     Adds a "Preview button" that allows you to view actual article in a frame. Clicking again on that button goes back to RSS view. Does work both in List view and expanded view.
// @namespace      http://userscripts.org/scripts/show/9594
// @include        https://*.google.com/reader*
// @include        http://*.google.com/reader*
// ==/UserScript==

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

function catchEntryAdded(e)
{
    var el=e.target;
    if (el.nodeName=='DIV' && el.className.indexOf('entry')>-1)
    {
      if (el.className.indexOf('entry-actions')>-1)
      {
        // Expanding article in list view
        addFacebookButton(el);	
      }
      else if (getFirstElementMatchingClassName(el,'tbody','card-tbody'))
      {
        // Adding article in expanded view
        addFacebookButton(getFirstElementMatchingClassName(el,'div','entry-actions'));
      }
    }
}

function addFacebookButton(el)
{
  var entry=findParentNode(el,'div','entry');	
  var span=document.createElement('span');
  span.className='item-preview facebookSharer link';	
  span.innerHTML='Share to Facebook';
  if (entry && entry.className.indexOf('facebookSharer')>-1) { span.setAttribute('style',gpeStyles.facebookSharerActive); } else { span.setAttribute('style',gpeStyles.facebookSharerInactive); }
  var p=document.createElement('span');
  p.appendChild(span);
  el.appendChild(p);
  p.addEventListener('click', facebookSharer, false);	
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

function facebookSharer(e)
{
    var el=e.target;
    var entry=findParentNode(el,'div','entry');
    var index = calcEntryIndex(entry);
    var facebookSharer;
    
    // Update entry with preview mode, need to do it before scrolling, because scrolling will repaint preview button (list view only)
    if (entry.className.indexOf('facebookSharer')==-1)
    {
      entry.className=entry.className+' facebookSharer';
      facebookSharer=true;
    }
    else
    {
      entry.className=entry.className.replace('facebookSharer','');    	
      facebookSharer=false;
    }
    	    
    // Need to scroll before changing entry-body, because scrolling repaints article from scratch (list view only)
    scrollTo(index);
    
    root = getEntryDOMObject(index);
    var body = getFirstElementMatchingClassName(entry,'div','entry-body');
    var ins = body.getElementsByTagName('ins')[0];

    if (facebookSharer)
    {
       // classic mode-> epreview mode
       el.setAttribute('style',gpeStyles.facebookSharerActive);      

       // hide rss item
       ins.style.display='none';
       
       // iframe creation/display
       var iframe = getFirstElementMatchingClassName(entry,'iframe','facebookSharer');
       if (iframe)
       {
         // iframe already in document, display it
         iframe.style.display='block';
       }
       else
       {
         // iframe not in document, create it
         iframe = document.createElement('iframe');
         iframe.setAttribute('width','626px');
         iframe.setAttribute('height','438px');
	 iframe.setAttribute('name','fred');
	 iframe.setAttribute('target','fred');
	var f = 'http://www.facebook.com/share';
	var shareurl= getFirstElementMatchingClassName(entry,'a','entry-title-link')
	var e = encodeURIComponent;
	var p = '.php?src=bm&v=4&i=1180255471&u=' + e(shareurl) + '&t=' + e(shareurl.innerHTML);
	var fbsharer= f + 'r' + p;

         iframe.setAttribute('src',fbsharer);
         iframe.className='facebookSharer';
         body.appendChild(iframe);
       }		
       
       // Scale article container to fullwidth
       body.setAttribute('style',gpeStyles.entryBody);
    }
    else
    {
       // preview mode -> classic mode
       el.setAttribute('style',gpeStyles.facebookSharerInactive);      
       
       // hide iframe
       var iframe = getFirstElementMatchingClassName(entry,'iframe','facebookSharer');
       iframe.style.display='none';
       
       // show rss item
       ins.style.display='block';
       
       // Go back to initial width
       body.removeAttribute('style','');     
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
    //location.href = 'javascript:void(s.V=-1);';
    //location.href = 'javascript:void(s.pf('+index+'));';    
}      
       
var gpeStyles =
{      
  entryBody : 'max-width: 98%',
  facebookSharerInactive : 'background: url("data:image/gif,GIF89a%10%00%10%00%D5%13%00%D8%D8%D8%FA%FA%FA%CB%CB%CB%C8%C8%C8%D2%D2%D2%BA%BA%BA%C6%C6%C6%A1%A1%A1%9C%9C%9C%BD%BD%BD%C9%C9%C9%AB%AB%AB%F4%F4%F4%BF%BF%BF%FC%FC%FC%DB%DB%DB%AD%AD%AD%FF%FF%FF%CC%CC%CC%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%13%00%2C%00%00%00%00%10%00%10%00%00%06I%C0%89pH%2C%1A%8F%C8d%F1!i%3A%9F%8F%E1%03B%ADZ%A9%D1%89%04%12%E9z%BF%10%89p%FB-G%C2c%AE%D9%8B%D6%AA%03_%F8Y%EC%8E%C8%E3%F3%F4%9AM\'%7B%1D%0E%60t%00W%85%10%00RO%8A%12YJ%8E%8EA%00%3B") no-repeat; padding-left: 16px;',
  facebookSharerActive : 'background: url("data:image/gif,GIF89a%10%00%10%00%C2%05%00%3BY%98%AD%AD%AD%CC%CC%CC%D8%D8%D8%DB%DB%DB%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%07%00%2C%00%00%00%00%10%00%10%00%00%036x%BA%DC%FE06%22%AA%BDd%91%C0%BB%E7%D9!%04%40i%9E%81%A0%8Cg%0B%A4%2B%E9%9A%B0(%CF%AFj%E3e%CD%F2%BE%DB%AC6%F8%18%03%03%CDe)%08I%9E%CF%04%00%3B") no-repeat; padding-left: 16px;'
}      
       
document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
