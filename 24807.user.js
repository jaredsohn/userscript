// ==UserScript==
// @name           gReader-Comments
// @namespace      http://www.sixteenseven.com
// @description    Displays a Disqus.com comment system, Friendfeed comments, and Google Reader notes for every entry in Reader.
// @include         http://reader.google.com/*
// @include         https://reader.google.com/*
// @include         http://reader.google.com/reader/*
// @include         https://reader.google.com/reader/*
// @include         http://www.google.com/reader/*
// @include         https://www.google.com/reader/*
// ==/UserScript==
// GUID: 517529b8-95f3-4bfa-b9ee-554eb0e28c96
// version: 3.1.*

 var el2;
 var el;
 
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
        addpreviewsButton(el);	
      }
      else if (getFirstElementMatchingClassName(el,'tbody','card-tbody'))
      {
        // Adding article in expanded view
        addpreviewsButton(getFirstElementMatchingClassName(el,'div','entry-actions'));
      }
    }
}

var numcount;
var ran_number;
	
function thisisit()
{			

		//var url = "http://www.fourhourworkweek.com/blog/2008/03/25/anti-snob-wine-appreciation-7-tips-from-sonoma/";
		  var entry=findParentNode(el2,'div','entry');	
			var url=getFirstElementMatchingClassName(entry,'a','entry-title-link');
		 //var linkurl = url.split("#comment");
 
		 //var linkurl2 = "http://disqus.com/api/v1/get_num_posts/?forum_url=reader&thread_url=" + url;
		 var linkurl2 = "http://www.sixteenseven.com/gReader/urlcount.php?url=" + url;
		var previews2 = document.getElementById('prev'+ran_number);		
			previews2.innerHTML = " Comments &nbsp;";
			
GM_xmlhttpRequest({
   method:"GET",
   url:linkurl2,
   headers:{
     "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
     "Accept":"application/json",
   },
   onload:function(response) {
		var data = eval("(" + response.responseText + ")");
		numcount = data['num_posts'];
		
		var previews2 = document.getElementById('prev'+ran_number);
			
			var html;
			
			if(numcount == 0) {
				html = ' No comments &nbsp;';
            } else if (numcount == null) {
                html = ' Comments &nbsp;';
            }
            else if (numcount == 1) {
                html = ' 1 comment &nbsp;';
            } else {
				html = ' ' + numcount + ' comments &nbsp;';
			}
			
		previews2.innerHTML = html;
   }
 });
}

function addpreviewsButton(el)
{	
	el2 = el;
    var previews=document.createElement('span');
	
	var ran_unrounded=Math.random()*5000;
	ran_number=Math.floor(ran_unrounded);
	
	previews.id = 'prev'+ran_number;

thisisit;
setTimeout(thisisit, 100);

			var html;	
			
			if(numcount == 0) {
				html = ' No comments &nbsp;';
            } else if (numcount == null) {
                html = ' Comments &nbsp;';
            }
            else if (numcount == 1) {
                html = ' 1 comment &nbsp;';
            } else {
				html = ' ' + numcount + ' comments &nbsp;';
			}
	
  previews.className='item-comments link';
  previews.innerHTML = html;
  el.appendChild(previews);
  previews.addEventListener('click', previewsMouseClick, false);	
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


function previewsMouseClick(e)
{
    var el=e.target;
    var entry=findParentNode(el,'div','entry');
    var index = calcEntryIndex(entry);
    previews(entry,index);
	 e.preventDefault();
}

function previewsShortcut()
{
  var index=unsafeWindow.s.ma;
  if (index>-1)
  {
    // An article is selected, previews it
    previews(getEntryDOMObject(index),index);
  }
}

function previews(entry,index)
{
    var previews;
    var button = getFirstElementMatchingClassName(entry,'span','item-comments');
    
    // Update entry with previews mode, need to do it before scrolling, because scrolling will repaint previews button (list view only)
    if (entry.className.indexOf('previews')==-1)
    {
      entry.className=entry.className+' previews';
      previews=true;
    }
    else
    {
      entry.className=entry.className.replace('previews','');    	
      previews=false;
    }
    	    
    // Need to scroll before changing entry-body, because scrolling repaints article from scratch (list view only)
    scrollTo(index);
    
    root = getEntryDOMObject(index);
    var body = getFirstElementMatchingClassName(entry,'div','entry-body');
    //var ins = body.getElementsByTagName('ins')[0];

    if (previews)
    {
       // classic mode-> previews mode

       // hide rss item
       //ins.style.display='none';
       
       // iframe creation/display
       var iframe = getFirstElementMatchingClassName(entry,'iframe','previews');
 		 var link2 = getFirstElementMatchingClassName(entry,'a','entry-title-link');
		 var e = encodeURIComponent;
		 var ttitle = e(link2.innerHTML);
		 var title = new Array();
		 var linkurl = e(link2);
		 title = ttitle.split('%3Cimg');
		 
       if (iframe)
       {
         // iframe already in document, display it
         iframe.style.display='block';
       }
       else
       {
         // iframe not in document, create it
		title[0] = title[0].replace("%0A", "");
		 //linkurl = linkurl.replaceAll("&","?-?");
         iframe = document.createElement('iframe');
         iframe.setAttribute('width','100%');
         iframe.setAttribute('height','300');
		 iframe.setAttribute('frameborder','0');
		 iframe.setAttribute("src","http://www.sixteenseven.com/gReader/comments_disqus.php?url="+linkurl+"&title="+title[0]);
         iframe.className='previews';
         body.appendChild(iframe);
       }		
       
       // Scale article container to fullwidth
       body.setAttribute('style','max-width: 98%');
    }
    else
    {
       // previews mode -> classic mode
       
       // hide iframe
       var iframe = getFirstElementMatchingClassName(entry,'iframe','previews');
       if (iframe) iframe.style.display='none';
       
       // show rss item
       //ins.style.display='block';
       
       // Go back to initial width
       body.removeAttribute('style','');     
    }  
}      

function handleKeypress(e)
{
  // Handle a Shift-V keypress
  if (e.target.nodeName.toLowerCase()!='input' && e.shiftKey && e.keyCode==86)
  {
    previewsShortcut();
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

function scrollTo(entry)
{   
    // Force scrolling to top of article
    try
    {
		// Navigate through DOM until reaching "entries" item, in order to compute current entry's top coordinate relative to entries' main container
		var top=0;
		while (entry.id!='entries') { top+=entry.offsetTop; entry=entry.parentNode; }
		document.getElementById('entries').scrollTop=top;
    }
    catch(err) { }
}         
       
function restyle()
{
    // Overwrites Better GReader extension css modifications regarding entry-actions class.
    // Indeed, entry-actions was set to "float : right", thus div was not in document flow.
    // Then, clicking on previews button let entry actions div in place instead of going down automatically when iframe was added.
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

// Replaces all instances of the given substring.
String.prototype.replaceAll = function( 
	strTarget, // The substring you want to replace
	strSubString // The string you want to replace in.
	){
	var strText = this;
	var intIndexOfMatch = strText.indexOf( strTarget );
	 
	// Keep looping while an instance of the target string
	// still exists in the string.
	while (intIndexOfMatch != -1){
		// Relace out the current instance.
		strText = strText.replace( strTarget, strSubString )
		 
		// Get the index of any next matching substring.
		intIndexOfMatch = strText.indexOf( strTarget );
	}
	 
	// Return the updated string with ALL the target strings
	// replaced out with the new substring.
	return( strText );
}

function init()
{
  restyle();
  addStyles('span.item-comments { background: url("data:image/gif;base64,R0lGODlhDQANANU8AHh4eIuLi/7+/u7u7vf3942Njenp6f39/YmJiYeHh5SUlIKCgvn5+ZWVlejo6Kurq62trcXFxcbGxuXl5c/Pz6GhocjIyOvr6+zs7IaGhnV1dbOzs4qKisPDw9HR0Xt7e9XV1cTExNTU1Nvb25iYmFZWVufn56CgoMvLy3BwcPb29pCQkHp6euDg4Nzc3PX19ZOTk7+/v/Ly8pqamuLi4urq6qKioqWlpeHh4aOjo9nZ2f///////wAAAAAAAAAAACH5BAEAADwALAAAAAANAA0AAAZqQN6OIWkEEAFFh7ATThYn3WF3GNkWtB3mA9p5vzsdyzCLgc8hWEJwPicy7TNiJYp7dYWWxhSvAVw7HgARMioEDDs4AChNOwM3HCQVAQMPFk08mTsvFw4bBTk6maOkOxAlCgKkqwIUKQY8QQA7") no-repeat; padding-left: 14px; margin-left: 7px; } div.entry.previews span.item-comments { background: url("data:image/gif;base64,R0lGODlhDQANANUoAHx8fH9/f3p6ent7e8XFxZiYmPj4+NDQ0Pn5+f7+/qSkpPX19be3t+np6a2trfT09Lq6us/Pz////8HBwfLy8pOTk319fVdXV8vLy6enp8TExPHx8Zubm3BwcOjo6Pf398jIyOXl5ZSUlNra2qioqHh4eHl5eXd3d////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACgALAAAAAANAA0AAAZbQNTGwxmYjoNCiIJaaASl0mkaFUw+oJNpyp1uCZZtt2sCiMfkM9prXlMHkJMULWUgHNqxNINAGQ4BJSZQAAEKBiiJKA8jGAQVAQUHipSJEiQXIgmVlAkRHQ0oQQA7") no-repeat; padding-left: 14px; margin-left: 7px; }');
}

document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
window.addEventListener('load',init,false);