// ==UserScript==
// @name           QuickLinks
// @namespace      vaevictus.net
// @description    A Set of quicklinks for urbandead
// @include        http://urbandead.com/*
// @include        http://www.urbandead.com/*
// @require        http://vaevictus.net/gm/gmlib.js
// ==/UserScript==

var www = "";
var target;
if(document.location.href.match(/^http:\/\/www\.urbandead\.com\//))
{
  GM_log('found www');
  www = "www.";
}
else
{
  GM_log('didn\'t find www');
}
if(document.location.href.match('logout'))
{
  GM_log('logging out');
}
else if( document.location.href.match(/map\.cgi/) && document.title.match (/Urban Dead - The City/))
{
  GM_log('starting map insert');

  var newTop = document.createElement('ul');
      newTop.setAttribute('id','quicklinks');
      newTop.setAttribute('style','width: 100%; padding: 0; margin:0;border-bottom: 1px solid #;background-color: #666;');
  var dpt = '<li class="left" style="display: inline-block; width:50px; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;"><div>&nbsp;</div></li>';
      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://'+www+'urbandead.com/map.cgi?rise">RISE</a></li>';
      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://'+www+'urbandead.com/map.cgi?fixgen">FIXGEN</a></li>';
      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://'+www+'urbandead.com/map.cgi?zoom">REFRESH</a></li>';
      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://'+www+'urbandead.com/map.cgi?dump">DUMP</a></li>';

  newTop.innerHTML = dpt;
  document.body.insertBefore(newTop,document.body.firstChild);
  document.body.setAttribute('style','margin:0;padding:0;');

  var cadelink = document.createElement('div');
  var cadeli = document.createElement('li');
      cadelink.innerHTML = 'CADE';
      cadelink.setAttribute('class','ql-link');
      cadelink.setAttribute('style','color: white; background-color: #666; cursor: pointer;  ');
      cadeli.setAttribute('style','display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;');

  newTop.appendChild(cadeli);
  cadeli.appendChild(cadelink);

  var cades = xpath('//form[@action and contains(@action,"barricade")]');
  if(cades.snapshotLength == 0)
  {
    GM_log('no barricade button');
    var st = cadelink.getAttribute('style');
    if(st)
    {
      st += " text-decoration: line-through; ";
    }
    else
    {
      st = " text-decoration: line-through; ";
    }
    cadelink.setAttribute('style',st);
    //cadelink.setAttribute('style','text-decoration: line-through');
  }
  else
  {
    target = cades.snapshotItem(0);
    cadelink.addEventListener('click',docade,false);
  }
 
}
else if (document.title.match (/Urban Dead - Profile/))
{ 
  GM_log('starting profile insert');
  ProfileID = location.href.match(/\d+/) ;
 
  var styles = document.createElement('link');
  styles.setAttribute('rel','stylesheet');
  styles.setAttribute('type','text/css');
  styles.setAttribute('href','http://www.vaevictus.net/craskers/quicklinks.css');
  styles.setAttribute('media','screen');
  document.getElementsByTagName('head')[0].appendChild(styles);

  var newTop = document.createElement('ul');
      newTop.setAttribute('id','quicklinks');
      newTop.setAttribute('style','width: 100%; padding: 0; margin:0;border-bottom: 1px solid #;background-color: #666;');
	  var dpt = '<li class="left" style="display: inline-block; width:50px; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;"><div>&nbsp;</div></li>';
	      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://'+www+'urbandead.com/contacts.cgi?add='+ProfileID+'">Add Contact</a></li>';
	      dpt+='<li style="display: inline-block; border-left: 1px solid #888; border-right: 1px solid #000; color: white; background-color: #666; padding: 2px 1em;" ><a style="color: white; background-color: #666;" href="http://ud-malton.info/rg/i/'+ProfileID+' ">RG Lookup</a></li>';
  
  newTop.innerHTML = dpt;
  document.body.insertBefore(newTop,document.body.firstChild);
  document.body.setAttribute('style','margin:0;padding:0;');
}
else
{
  GM_log('skipping insert: ' + document.title);
}

function docade(e)
{
  target.submit();
}

