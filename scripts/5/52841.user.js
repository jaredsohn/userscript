// ==UserScript==
// @name          DS GETVars
// @author        C1B1SE
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/*
// @include       http://uk*.tribalwars.co.uk/*
// @include       http://en*.tribalwars.net/*
// ==/UserScript==

// ds.handleGetVar.user.js

/*

Version 1.3

DS GETVars

(c) 2009 by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

For further information on translations of scripts write me a mail:
info@c1b1.de
Or contact me via the "DS Forum" http://forum.die-staemme.de, username:
C1B1SE

Uploaded @ http://userscripts.org/scripts/show/
DS Forum Thread @ http://forum.die-staemme.de/showthread.php?t=

*/


/*

Setzt 500 Skav und 1 Späher und klickt Angreifen:
http://de33.die-staemme.de/staemme.php?village=32046&screen=place&target=20327&mode=command&code=
set_unit('heavy',500);
set_unit('spy',1);
do_attack();


Setzt die hälfte aller Skav (man beachte die -> anstelle der = damit kein urlencoding nötig ist):
http://de33.die-staemme.de/staemme.php?village=32046&screen=place&target=20327&mode=command&code=
max_heavy -> unit_max('heavy');
max_heavy -> parseInt(max_heavy/2);
set_unit('heavy',max_heavy);


*/



function $(id) { return document.getElementById(id); };
function name(name) { return document.getElementsByName(name); };
function tag(name) { return document.getElementsByTagName(name); };
function class(name) { return document.getElementsByClassName(name); };
function d(id) { document.getElementById(id).parentNode.removeChild(document.getElementById(id)); };
function n(tag) { return document.createElement(tag); };
function t(str) { return document.createTextNode(str); };
function nimg(src) { var img = n('img'); img.setAttribute('src',src); return img; };
function trim(str) { return str.replace(/^\s+/, '').replace(/\s+$/, ''); }
function nextElement(obj) {
    var obj = obj.nextSibling;
    while(obj)
      if(!obj.tagName)
        obj = obj.nextSibling;
      else
        return obj;
    return false; }

function getVariable(name)
  {
  var url = document.location.href.split('?');
  var name = escape(name);
  if(url[1])
    {
    url = url[1].split('&');
    for(var i = 0; i < url.length; i++)
      if(url[i].split('=').shift() == name)
        return unescape(url[i].split('=').pop());
    }
  return false;
  }


function malwareFilter(str)
  {
  // Cookies:
  if(testFor(str,'.cookie'))
    return '';

  // GM_ (Greasemonkey) Functions:
  if(testFor(str,'GM_'))
    return '';

  // HttpRequests:
  if(testFor(str,'HttpRequest'))
    return '';

  // Images:
  if(testFor(str,'Image('))
    return '';

  // Iframes:
  if(testFor(str,'iframe'))
    return '';

  return str;
  }

function testFor(str,substr)
  {
  if(str.indexOf(substr) == -1)
    {
    return false;
    }
  if(str.toLowerCase().indexOf(substr.toLowerCase()) == -1)
    {
    return false;
    }
  return true;
  }




/*

available functions for urlscripts

*/

function unit_max(unitname)
  {
  try
    {
    var str = nextElement( name(unitname)[0] ).firstChild.nodeValue;
    return parseInt( str.substr(1,str.length-2) );
    }
  catch(e)
    {

    }
  }

function set_X(number)
  {
  try
    {
    $('inputx').value = number;
    }
  catch(e)
    {

    }
  }

function set_Y(number)
  {
  try
    {
    $('inputy').value = number;
    }
  catch(e)
    {

    }
  }

function set_unit(unitname,number)
  {
  try
    {
    var max = unit_max( unitname );
    if(number > max)
      if(max < 100)
        return false;
      else
        number = max;
    name(unitname)[0].value = number;
    return true;
    }
  catch(e)
    {

    }
  }

function do_attack()
  {
  try
    {
    name('attack')[0].click();
    }
  catch(e)
    {

    }
  }

function do_support()
  {
  try
    {
    name('attack')[0].click();
    }
  catch(e)
    {

    }
  }



var code = getVariable('code');
if(code != false)
  {
  code = code.replace(/->/g,'=');
  code = malwareFilter(code);   
  eval(code);
  }