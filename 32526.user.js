// ==UserScript==
// @name           Greader Sohu share
// @namespace      http://icyflash.blog.sohu.com
// @description    Add link to Sohu share in Google reader
// @include        http://reader.google.com/reader/*
// @include        https://reader.google.com/reader/*
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
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
    while (el.nodeName.toLowerCase()!='body' && (el.nodeName.toLowerCase()!=tag || (el.className!=class && el.className.indexOf(class+' ')==-1))) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }
  else
  {
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
        addSHSButton(el);	
      }
      else if (getFirstElementMatchingClassName(el,'tbody','card-tbody'))
      {
        addSHSButton(getFirstElementMatchingClassName(el,'div','entry-actions'));
      }
    }
}

function addSHSButton(el)
{
  var shs=document.createElement('span');
  shs.className='item-shs shs link';
  shs.innerHTML='Sohu Share';
  el.appendChild(shs);
  shs.addEventListener('click', SHSMouseClick, false);	
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

function SHSMouseClick(e)
{
    var el=e.target;
    var entry=findParentNode(el,'div','entry');	
	var slink=getFirstElementMatchingClassName(entry,'a','entry-title-link');
	var d=document,f='http://share.blog.sohu.com/submit.jhtml',l=d.location,ec=encodeURIComponent,
	p='?url='+ec(slink)+'&title='+escape(slink.text);
	if(!window.open(f+p,'','toolbar=0,status=0,resizable=0,width=530,height=300'))l.href=f+p;
	
    e.preventDefault();
}

function getEntryDOMObject(index)
{
    var entries=document.getElementById('entries');
    var i=0;
    entry=entries.firstChild;
    while ((i++)<index)
    {
      entry=entry.nextSibling;
    }	
    return entry;
}       
       
function restyle()
{
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
  addStyles('span.item-shs { background: url("data:image/gif,GIF89a%10%00%10%00%E6%00%00%00%00%00%FF%FF%FF%11w%11%1C%82%1C\'%8D\'*%90*.%94.0%960%3A%A0%3A%3C%A2%3CD%AADG%ADGM%B3MQ%B7QU%BBUZ%C0Za%C7aj%D0js%D9s%7C%E2%7C~%E4~%83%E9%83%88%EE%88O%A0KD%94%3FY%B4RL%A7DM%A7D%3E%9733%8B%25%FF%FA%BE%FF%FB%C1%FF%F8%B9%FF%FA%D8%FF%F5%B4%FF%F2%AD%FF%FA%E2%FF%EC%A0%FF%EF%A7%FF%E8%98%FF%F5%CF%FF%F7%DB%FF%E5%91%FF%F5%D6%FF%F6%D9%FF%DE%84%FF%E1%8A%FF%F0%C3%F7%C9Y%FF%D7s%FF%D9x%FF%DB%7D%FF%EB%BA%FF%F2%D0%FF%F2%D2%FF%F3%D4%F4%C1R%F4%C2S%F5%C4U%F6%C6V%F0%B7J%F2%BAL%F3%BDO%F3%BFQ%EE%B2E%EF%B5H%EA%A7%3C%EC%AB%3F%ED%ADA%EE%AFC%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00F%00%2C%00%00%00%00%10%00%10%00%00%07%BC%80F0%83%84%85%85%828%1F%8A%8B%8C%8A80%3B%1E%92%93%94%94%3B%3A%20%99%99%19%0A%0A%19%9A%99%3A9%22%A4%A4%0B%16%16%0B!%A5%229%3F%23%B0%B0%0C%15%15%0C%24%B1%23%3F%3E%26%26%1A%09%0B%0D%13%13%0D%0B%09%1B%BC%3E%3D%25%25%06%A8%14%12%12%14%A8%06(%25%3D%3C\'\'%04%11%DC%DD%DC%04)\'%3CA**%1C%04%07%08%10%10%08%07%04%17%2C*A%40.%F5%2F%2B%05%0F%0F%05%2B%FD%2F.%40%8A%B4%188p%80%03%07%03n%10lQ%84%C8%8C%87%0F%3B%08%10%80%C1%06%C4%19D%86%C8%D8%C8%91F%8D%1A48%CA%18%02%03G%8C%93(S%9E%7C%24H%88%CB%970%5D%C20%12%08%00%3B") no-repeat; padding-left: 16px; }');
}
      
document.body.addEventListener('DOMNodeInserted', catchEntryAdded, false);
window.addEventListener('load',init,false);