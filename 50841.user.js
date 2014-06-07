var metadata = <><![CDATA[
// ==UserScript==
// @name          DS Include DSTools'extendedNotes
// @version       1.3
// @author        Samuel Essig (http://c1b1.de)
// @description   Einbindung des Notizblocks von DS Extra, http://dsextra.net/
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     (c) 2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://dsextra.net/note/*
// @include       *.die-staemme.de*screen=memo*
// @exclude       *.die-staemme.de/*t=*
// @exclude       http://forum.die-staemme.de*
// ==/UserScript==
]]></>;

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################

@ http://userscripts.org/scripts/show/50841

Da das Die-Stämme Team es nicht schafft den Notizblock zu überarbeiten, fängt dieses Script den erweiterten Notizblock der
Seite http://dsextra.net direkt in das Spiel ein.

Das Script erstellt ein einfaches <iframe>, das die Internetseite im Spiel anzeigt. Die normalen Notizen werden nicht
überschrieben, aber sie sind, so lange das Script aktiv ist, nicht einsehbar.
Ist schon eine Notizblock auf dstools.redio.de vorhanden, sollte - vor der Installation dieses Scripts - die URL zum
Notizblock in die erste Zeile der normalen Notizen eingetragen werden.
Dadurch erkennt das Script die Notizen in der Regel sofort, und es müssen keine weiteren Einstellungen getätigt werden.

Vorteile:

    * grßere Textlängen möglich
    * keine Begrenzung für die Anzahl an BB-Codes (kein "more than 500 [")
    * erweiterte BB-Codes (zum Beispiel Countdown-Funktion)
    * Multiplayer Zugriff (zum Beispiel bei Dualaccounts kÃ¶nnen beide die gleichen Notizen einsehen)

*/

//################# Settings #########################

const pageHeight = '1000';

const text = {
  'de' : {
    '_author' : 'C1B1SE',
    '_contact' : 'mail:info@c1b1.de',
    '_support' : 'http://forum.die-staemme.de/showthread.php?t=',
    'info' : 'Info',
    'setURL' : 'URL einstellen',
    'cancel' : 'Abbrechen',
    'save' : 'Speichern',
    'saved' : 'Gespeichert',
    'typeNewURL' : 'Gib die neue URL ein:',
    'options' : 'Einstellungen'
    }
  };

const URL_ranking = [
  'DSNotesURL',
  'GMValueURL',
  'NewBlockURL' ];

const NewBlockURL = 'http://dsextra.net/notes';
const URLPattern = /http:\/\/dsextra\.net\/note\/.+/;

const GMVN = {
  'url' : 'url'
  };


// ########################################## Beware of changing something after this line ################

function $(id) { return document.getElementById(id); };
function t(c) { return document.createTextNode(c); };
function n(type,src,alt) { type = type.toLowerCase(); if('img' == type) { var img = new Image(); img.src = src; img.alt = alt; return img; } return document.createElement(type); };
function trim(str) { return str.replace(/^\s+/, '').replace(/\s+$/, ''); }
function setValue(key,value) { return GM_setValue(world+'_'+key,value); };
function getValue(key) { return GM_getValue(world+'_'+key); };
function test(fct,elsewise) { try { fct(); } catch(error) { return 'undefined' == typeof(elsewise) ? void(0) : elsewise ; } };

var world,lang = 'false';

var c = { };

var statuscode = load();
switch (statuscode)
  {
  case -2:
    trim_iFrame();
    break;
  case -1:
    if(c.newB)
      showBlock(NewBlockURL);
    else
      showBlock();
    break;
  case 0:
    error('Wrong Page');
    break;
  case 1:
    error('Script "DS Notes Manager" was detected','Disable "DS Notes Manager"');
    break;
  case 2:
    error('Const. URL_ranking damaged.','Reinstall Script');
    break;
  case 3:
    error('Const. text damaged.','Reinstall Script');
    break;
  case 4:
    error('Const. GMVN damaged.','Reinstall Script');
    break;
  case 5:
    error('No working URL found','Deinstall and update Script');
    break;
  }

function showURL()
  {
  window.scrollTo(0, 0);
  if($('extendedNotes_options'))
    $('extendedNotes_options').parentNode.removeChild($('extendedNotes_options'));
  if($('extendedNotes_url'))
    {
    error('Already open');
    return;
    }

  var div = n('div');
  div.setAttribute('id','extendedNotes_url');
  div.setAttribute('style','position:absolute; top:20px; left:30px;background-color:#F7EED3; color:#804000; border:1px solid #804000; padding:15px; ');

  var input0 = n('input');
  input0.setAttribute('type','text');
  input0.setAttribute('size','50');
  input0.setAttribute('id','extendedNotes_url_input');
  input0.setAttribute('value',('undefined' == typeof(getValue(GMVN.url))?'':getValue(GMVN.url)));

  var input1 = n('input');
  input1.setAttribute('type','button');
  input1.setAttribute('value',text[lang].cancel);
  input1.addEventListener('click',function() {
    $('extendedNotes_url').parentNode.removeChild($('extendedNotes_url'));
  },false);

  var input2 = n('input');
  input2.setAttribute('type','button');
  input2.setAttribute('value',text[lang].save);
  input2.addEventListener('click',function() {
    if(trim($('extendedNotes_url_input').value) != '')
      {
      setValue(GMVN.url,trim($('extendedNotes_url_input').value));
      alert(text[lang].saved);
      }
    else
      {
      error('Wrong URL','Try again');
      }
    $('extendedNotes_url').parentNode.removeChild($('extendedNotes_url'));
  },false);

  div.appendChild(t(text[lang].typeNewURL));
  div.appendChild(n('br'));
  div.appendChild(input0);
  div.appendChild(n('br'));
  div.appendChild(input1);
  div.appendChild(t(' '));
  div.appendChild(input2);

  document.getElementsByTagName('body')[0].appendChild(div);
  }


function showOptions(e)
  {
  window.scrollTo(0, 0);
  if($('extendedNotes_options'))
    {
    $('extendedNotes_options').parentNode.removeChild($('extendedNotes_options'));
    return false;
    }
  if($('extendedNotes_url'))
    {
    error('Already open');
    return;
    }

  var div = n('div');
  div.setAttribute('id','extendedNotes_options');
  div.setAttribute('style','position:absolute; top:20px; left:30px;background-color:#F7EED3; color:#804000; border:1px solid #804000; padding:15px; ');


  var input0 = n('input');
  input0.setAttribute('type','button');
  input0.setAttribute('value',text[lang].setURL);
  input0.addEventListener('click',showURL,false);

  var input1 = n('input');
  input1.setAttribute('type','button');
  input1.setAttribute('value',text[lang].info);
  input1.addEventListener('click',function() {
    var info = 'DS Include DSTools\'extendedNotes (Version 1) \n\n(c) by C1B1SE 2009\n\ninfo@c1b1.de\nhttp://c1b1.de\n\nDo not republish, use in other scripts, change or reproduce this code\nor a part/parts of this code without permission from C1B1SE\nThis script may be forbidden in TribalWars or DieStämme. Please look in the respective forum for further information!';
    alert(info);
    $('extendedNotes_options').parentNode.removeChild($('extendedNotes_options'));
  },false);

  var input2 = n('input');
  input2.setAttribute('type','button');
  input2.setAttribute('value',text[lang].cancel);
  input2.addEventListener('click',function() {
    $('extendedNotes_options').parentNode.removeChild($('extendedNotes_options'));
  },false);

  div.appendChild(t(text[lang].options));
  div.appendChild(n('br'));
  div.appendChild(n('br'));
  div.appendChild(input0);
  div.appendChild(t(' '));
  div.appendChild(input1);
  div.appendChild(t(' '));
  div.appendChild(input2);
  document.getElementsByTagName('body')[0].appendChild(div);
  }


function showBlock(src)
  {
  var iframe = n('iframe');
  iframe.setAttribute('width',$('memo_script').clientWidth+'px');
  iframe.setAttribute('height',pageHeight+'px');
  if(src)
    iframe.setAttribute('src',src);
  else
    iframe.setAttribute('src',c.url);
  iframe.setAttribute('style','border:0px; ');
  iframe.setAttribute('name','extendedNotes_iframe');
  iframe.setAttribute('id','extendedNotes_iframe');
  $('memo_script').parentNode.replaceChild(iframe,$('memo_script'));
  }


function load()
  {
  var obj = URLPattern;
  if(obj.test(document.location.href))
    {
    var tmp = $('world').firstChild.nodeValue.match(/(\D+)(\d+)/);

    world = tmp[2];
    lang = tmp[1];
    return -2;
    }
  delete(obj);

  world = document.location.href.split('.').shift().split('de').pop();
  lang = document.location.href.split('.')[0].split(/\/\/(\D+)\d+/)[1];

  if(!$('edit_link'))
    return 0;

  if(!$('edit_link').parentNode.getElementsByTagName('a')[1])
    return 1;

  if(!URL_ranking[0] || !URL_ranking[1] || !URL_ranking[2])
    return 2;

  if(!text)
    return 3;

  if(!GMVN)
    return 4;

  // Get URL:
  var t = getURL(0);
  if(! t)
    {
    t = getURL(1);
      if(! t)
      {
      t = getURL(2);
      }
    }
  if(true === t)
    {
    c.url = NewBlockURL;
    c.newB = true;
    }
  else if(false === t)
    {
    return 5;
    }
  else
    {
    c.url = t;
    c.newB = false;
    }
  return -1;
  }


function getURL(i)
  {
  switch(URL_ranking[i])
    {
    case 'DSNotesURL':
      var value = $('message').value.split('\n').shift();
      var obj = URLPattern;
      if(obj.test(value) && value.match(obj))
        return value.match(obj);
      else
        return false;
      break;

    case 'GMValueURL':
      if('undefined' == typeof(getValue(GMVN.url)))
        return false
      return getValue(GMVN.url);
      break;

    case 'NewBlockURL':
      return true;
      break;
    }
  return false;
  }

function trim_iFrame()
  {
  if(document.location.href.substr(8).split('//')[1])
    {
    var tmp = document.location.href.split('//');
    setValue(GMVN.url,tmp[0]+'//'+tmp[1]);
    }
  else
    {
    setValue(GMVN.url,document.location.href);
    }

  $('pgbody').style.width = '99%';
  $('pgbody').style.background = 'transparent';
  $('title').parentNode.removeChild($('title'));
  $('footer').parentNode.removeChild($('footer'));
  $('note_box').style.background = '#F7EED3';
  document.getElementsByTagName('body')[0].style.background = 'url(http://www.die-staemme.de/graphic/background/content.jpg) #F1EBDD';




  var block = $('note_box');


  var span = n('span');
  span.appendChild(t('aktiv'));
  span.setAttribute('style','border-bottom: 1px solid rgb(0,255,128);');
  span.addEventListener('click',showOptions,false);

  var copy = document.createElement('span');

  copy.appendChild(t('| Script '));
  copy.appendChild(span);

  document.getElementsByClassName('small text_right')[0].appendChild(copy);


  if(document.location.href.indexOf('edit') == -1 && document.location.href.indexOf('add') == -1)
    {
    var a = block.getElementsByTagName('a');
    for(var i = 0, len = a.length; i < len; i++)
      {
      if(a.className != 'link_ext')
        {
        a[i].setAttribute('target','_top');
        }
      }
    }

  }

function error(message,hint)
  {
  var id = 'extendedNotes_error_'+Math.round(Math.random()*100);

  var div = n('div');
  div.setAttribute('style','position:absolute; top:0px; left:0px; background-color:rgb(255,128,128); color:Black; border:1px solid #804000; padding:15px; ');
  div.setAttribute('id',id);


  var span = n('div');
  span.setAttribute('style','text-decoration:underline; color:#804000; text-align:center; ');
  span.appendChild(t(text[lang].cancel));
  span.addEventListener('click',function() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  },false);

  div.appendChild(t(message));
  if(hint)
    {
    div.appendChild(n('br'));
    div.appendChild(n('br'));
    div.appendChild(t(hint));
    }
  div.appendChild(n('br'));
  div.appendChild(n('br'));
  div.appendChild(span);

  document.getElementsByTagName('body')[0].appendChild(div);
  setTimeout('fadeOut(\''+id+'\',100,0)',3000);
  };


unsafeWindow.changeO = function(opacity, id)
  {
  $(id).style.opacity = (opacity / 100);
  $(id).style.MozOpacity = (opacity / 100);
  }

unsafeWindow.fadeOut = function(id, start, end)
  {
  var speed = Math.round(3000 / 100);
  var timer = 0;

  for(i = start; i >= end; i--)
    {
    setTimeout('changeO(' + i + ',\'' + id + '\')',(timer * speed));
    timer++;
    }
  setTimeout('document.getElementById(\''+id+'\').parentNode.removeChild(document.getElementById(\''+id+'\')); ',3200);
  }