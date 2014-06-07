// ==UserScript==
// @name          DS Schnellleiste-Gruppen
// @description   Die Die Stämme Schnellleiste kann in Gruppen aufgeteilt werden
// @namespace     c1b1.de
// @include       http://de*.die-staemme.de/*
// ==/UserScript==

// ds.quickbarGroups.user.js

/*
Version 1.4.1

DS Schnellleiste-Gruppen

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

Uploaded @ http://userscripts.org/scripts/show/52318
DS Forum Thread @ http://forum.die-staemme.de/showthread.php?t=110324


Description:
------------

Dieses Script ist PA-0nly
Die Die Stämme Schnellleiste kann in Gruppen aufgeteilt werden. Zum Hinzufügen zu einer neuen oder vorhanden Gruppe einfach rechtsklicken auf den Schnellleisten Eintrag.
Die Schnellleiste sollte keine Zeilenumbrüche enthalten.
Wenn alle Einträge in Gruppen sind, verschwindet die normale Schnellleiste.

Wird ein Eintrag geändert (URL oder Name), dann muss der Eintrag erneut zu einer Gruppe hinzugefügt werden.


History:
--------

Version 1.4:
 - Die grafische Dorfübersicht und die Karte überdecken die Leiste (Dropdown) nicht mehr
 - auch auf Welt 6 (getestet ohne PA) einsetzbar


Version 1.3:
 - Löschen und Verschieben von Einträgen  unter den normalen Schnellleisteneinstellungen von DS

Version 1.2:
 - Einträge ohne Bild stoppen das Script nicht mehr
 - Reset Funktion unter den normalen Schnellleisteneinstellungen von DS
 - diverse Exceptions werden abgefangen/vermieden

Version 1.1:
 - Dropdown
 - Letzter Link rechts neben der Leiste


*/
const text = {
  'de' : {
    '_name' : 'DS Schnellleiste-Gruppen',
    '_author' : 'C1B1SE',
    '_contact' : 'mail:info@c1b1.de',
    '_support' : 'http://forum.die-staemme.de/showthread.php?t=110324',
    '_self' : 'http://userscripts.org/scripts/show/52318' ,
    'button_about' : 'Info',
    'confirm_addToAGroup' : 'Zu einer Gruppe hinzufügen?',
    'label_addToGroup' : 'Hinzufügen zu:',
    'button_ok' : 'OK',
    'label_name' : 'Gruppenname:',
    'caption_addToGroup' : 'Zu Gruppe hinzufügen',
    'button_cancel' : 'Abbrechen',
    'button_resetQuickbar' : ' Schnellleiste zurücksetzen (gespeicherte Daten löschen)',
    'confirm_resetQuickbar' : 'Alle Gruppen gehen verloren!\nWirklich alle Daten löschen und das Script reseten?',
    'confirm_deleteEntry' : 'Eintrag wirklich löschen?',
    'button_moveUp' : 'Nach oben verschieben',
    'button_moveDown' : 'Nach unten verschieben',
    'button_deleteEntry' : 'Eintrag löschen',
    'text_shortDesc' : 'Hinzufügen von neuen Einträgen bzw. von neuen Gruppen via Rechtsklick auf den Eintrag in der Schnellleiste'
    }
  };

const version = '1.4.1';
const url = document.location.href;
const world = url.split('.').shift().split('de').pop();
const lang = url.split('.')[0].split(/\/\/(\D+)\d+/)[1];
const say = text[lang]?text[lang]:{};

const srcs = {
  'fadout_804000' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAALCAYAAAC+jufvAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAABCSURBVAgdATcAyP8AgEAA/wIAAADjAgAAAOQCAAAA5AIAAADjAgAAAOQCAAAA5AIAAADkAgAAAOMAAAAAAAAAAAAAKBMI7fpgt0EAAAAASUVORK5CYII=',
  'close' : 'http://www.c1b1.de/close.png',
  'delete' : 'http://www.c1b1.de/smile/dsforum/trash.gif' }

var data = {};

if(url.indexOf('game.php') != -1)
  {
  var last_md5 = getValue('last','');
  var last = t(' ');

  var quickbar = document.getElementsByClassName('menu nowrap quickbar')[0];
  if(!quickbar)
    {
    for(var x in $('ds_body').childNodes)
      {
      var e = $('ds_body').childNodes[x];
      if(e.nodeType == 1 && e.tagName.toLowerCase() == 'table')
        {
        quickbar = e.getElementsByTagName('td')[0];
        break;
        }
      }

    }

  var a = tag('a',quickbar);
  var links = new Object();
  for(var i = 0; i < a.length; i++)
    {
    if(a[i].firstChild.src)
      var h = hex_md5(a[i].firstChild.src + a[i].firstChild.nextSibling.nodeValue);
    else
      var h = hex_md5('no_image' + a[i].firstChild.nodeValue);
    links[h] = a[i];
    a[i].rel = h;
    a[i].addEventListener('contextmenu',register2Group,false);
    a[i].addEventListener('click',setLast,false);

    if(h == last_md5)
      last = a[i].cloneNode(true);
    }
  var result = getValue('groups','{ }');
  eval('data = '+result);

  var n_quickbar = n('div',{'id':'quickbarGroups_n_quickbar','style':'cursor:default; border: 1px solid;border-color:#997733 #FFDD99 #FFEECC #BB9955;background-repeat: repeat-x;background-color: #F7EED3;'});
  quickbar.parentNode.appendChild(n_quickbar);
  for(var name in data)
    {
    var div = n('div',{ 'style':'z-index:101; display: inline; color: #804000; font-weight:bold; cursor:default;' });
    n_quickbar.appendChild(div);
    div.addEventListener('mouseover',function() { try {this.style.color = '#0082BE';}catch(e){} var elist = this.getElementsByTagName('a'); var top = rel_top(this) + this.offsetHeight + 0; var left = rel_left(this); for each (var x in elist ) { try {x.style.display = 'block'; x.style.top = top+'px'; x.style.left = left+'px'; top += x.offsetHeight-2;}catch(e){}  }  },false);
    div.addEventListener('mouseout',function() { try {this.style.color = '#804000';}catch(e){} var elist = this.getElementsByTagName('a'); for each (var x in elist ) try {x.style.display = 'none';}catch(e){} },false);
    div.appendChild(t(name));
    for(var i = 0; i < data[name].length; i++)
      {
      if(links[ data[name][i] ])
        {
        var e = links[ data[name][i] ];
        div.appendChild(e);
        e.style.padding = '2px';
        e.style.display = 'none';
        e.style.position = 'absolute';
        e.style.background = '#F7EED3';
        e.style.border = '2px solid #804000';
        e.style.zIndex = '101';
        }
      }
    if(e)
      e.style.borderBottom = '3px outside #804000';
    n_quickbar.appendChild(t(' - '));
    }
  //n_quickbar.removeChild(n_quickbar.lastChild);
  if(!tag('a',quickbar)[0])
    quickbar.parentNode.removeChild(quickbar);

  n_quickbar.appendChild(n('div',{ 'id':'quickbarGroups_registerGroup_last', 'style':'display: inline; ', 'title':'last used entry' },false,false,last));
  }

if(url.indexOf('screen=settings&mode=quickbar') != -1)
  {
  var content = document.getElementsByClassName('vis')[1].parentNode;

  content.appendChild(n('h3',false,false,false,'DS Schnellleiste-Gruppen '));
  content.appendChild(n('p',false,false,false,n('a',{'href':'#'},['click',resetData,false],false, String.fromCharCode('0187')+say.button_resetQuickbar)));

  var n_quickbar = content.appendChild($('quickbarGroups_n_quickbar').cloneNode(true));
  n_quickbar.setAttribute('id','quickbarGroups_n_quickbar_edit');
  var elist = n_quickbar.getElementsByTagName('a');
  for each(var x in elist)
    {
    x.removeAttribute('style');
    x.setAttribute('href','#');
    x.setAttribute('onclick','return false; ');
    x.removeEventListener('contextmenu',register2Group,false);
    x.removeEventListener('click',setLast,false);
    }

  n_quickbar.removeChild(n_quickbar.lastChild);

  var elist = n_quickbar.childNodes;
  for each(var x in elist)
    {
    if(x && x.nodeType == 3)
      n_quickbar.removeChild(x);
    }
  d('quickbarGroups_n_quickbar_edit');

  var elist = n_quickbar.getElementsByTagName('div');
  for each(var x in elist)
    {
    var table = n('table',{'border':1,'style':'float:left; margin-left:15px; '});
    var tr = n('tr',false,false,false,n('td',{'class':'groupname','colspan':3},false,false,x.firstChild));
    table.appendChild(tr);
    var alist = x.childNodes;
    var len = alist.length;
    for(var i = 0; 0 < alist.length; i++)
      {
      var tr = n('tr');

      var td0 = n('td',false,false,false, len==1?t():(i==0?n('img',{'alt':say.button_moveDown,'src':'graphic/unten.png?1'},['click',moveDownEntry,false]):n('img',{'alt':say.button_moveUp,'src':'graphic/oben.png?1'},['click',moveUpEntry,false])),len==1?t():(i==len-1?t():i==0?t():n('img',{'alt':say.button_moveDown,'src':'graphic/unten.png?1'},['click',moveDownEntry,false])) );
      var td1 = n('td',false,false,false,alist[0]);
      var td2 = n('td',false,false,false,n('img',{'alt':say.button_deleteEntry,'src':srcs.delete},['click',deleteEntry,false]));

      tr.appendChild(td0);
      tr.appendChild(td1);
      tr.appendChild(td2);

      table.appendChild(tr);
      }

    content.appendChild(table);
    }
  content.appendChild(n('br',{'style':'clear:left; '}));
  content.appendChild(n('p',false,false,false,say.text_shortDesc));

  }

function moveUpEntry()
  {
  var value = this.parentNode.parentNode.parentNode.getElementsByClassName('groupname')[0].firstChild.nodeValue;
  var hash = this.parentNode.nextSibling.firstChild.rel;
  moveEntry(value,hash,-1);
  }

function moveDownEntry()
  {
  var value = this.parentNode.parentNode.parentNode.getElementsByClassName('groupname')[0].firstChild.nodeValue;
  var hash = this.parentNode.nextSibling.firstChild.rel;
  moveEntry(value,hash,+1);
  }

function deleteEntry()
  {
  var value = this.parentNode.parentNode.parentNode.getElementsByClassName('groupname')[0].firstChild.nodeValue;
  var hash = this.parentNode.previousSibling.firstChild.rel;
  moveEntry(value,hash,0);
  }

function moveEntry(value,hash,d)
  {
  if(!data[value])
    throw new TypeError('moveEntry()  - Group doesn\'t exist');

  var index = data[value].indexOf(hash);

  if(index == -1)
    throw new TypeError('moveEntry()  - Entry doesn\'t exist in this group');

  if(d == 0)
    {
    if(!confirm(say.confirm_deleteEntry))
      return false;
    data[value].remove(index);
    }
  else
    {
    tmp_item = data[value][index+d];
    data[value][index+d] = data[value][index];
    data[value][index] = tmp_item;
    }
  var x = uneval(data);
  setValue('groups',x);
  document.location.reload();

  }


function setLast()
  {
  setValue('last',this.rel);
  return true;
  }

function resetData()
  {
  if(!confirm(say.confirm_resetQuickbar))
    return false;
  setValue('groups','');
  setValue('last','');
  alert(say.button_ok);
  document.location.reload();
  }


function register2Group()
  {
  if(!confirm(say.confirm_addToAGroup))
    return false;
  this.style.border = 'red 2px dashed';
  var div = n('div',{'id': 'quickbarGroups_registerGroup_holder', 'style': {'position':'absolute', 'height':'200px', 'width':'300px', 'top':'15px', 'background':'#F7EED3 repeat-x url('+srcs.fadout_804000+')', 'border':'3px solid #804000', 'padding': '5px', 'MozBorderRadius':'10px' }});
  $('ds_body').appendChild(div);
  dragable(div,'10');

  var bottom = n('div',{'style':'position:absolute; bottom:2px; right:10px; '});
  var cancel = n('a',{'href':'#'},['click',function(){d('quickbarGroups_registerGroup_holder')},false],false,t(say.button_cancel));

  var about = n('a',{'href':'#'},['click',aboutMe,false],false,t(say.button_about));
  bottom.appendChild(about);
  bottom.appendChild(t(' - '));
  bottom.appendChild(cancel);
  div.appendChild(bottom);

  var caption = n('h3',{'style':{'margin-top':'10px'}},false,false,t(say.caption_addToGroup));
  div.appendChild(caption);

  var input_hidden = n('input',{'type':'hidden','value':this.rel,'id':'quickbarGroups_registerGroup_md5'});
  div.appendChild(input_hidden);

  var select = n('select',{'id':'quickbarGroups_registerGroup_select','name':'quickbarGroups_registerGroup_select'});
  var i = 1;
  for(var name in data)
    {
    var option = n('option',{ 'value' : name });
    option.appendChild(t( '#'+(i>9?i:'0'+i)+' - '+name+' ('+data[name].length+')' ));
    select.appendChild(option);
    i++;
    }

  var option = n('option',{ 'value' : '[[new]]' });
  option.appendChild(t( ' [Neue Gruppe]' ));
  select.appendChild(option);

  var table = n('table',{'id':'quickbarGroups_registerGroup_table'},false,false,n('tr',false,false,false,n('td',false,false,false,t(say.label_addToGroup)),n('td',false,false,false,select)),n('tr',false,false,false,n('td',{'colspan':2},false,false,n('input',{'value':say.button_ok,'type':'button'},['click',register2Group_save,false]))));

  div.appendChild(table);
  }

function register2Group_save()
  {
  this.removeEventListener('click',arguments.callee,false);
  this.addEventListener('click',register2Group_save_new,false);
  var value = $('quickbarGroups_registerGroup_select').options[$('quickbarGroups_registerGroup_select').selectedIndex].value;
  var hash = $('quickbarGroups_registerGroup_md5').value;
  if(value == '[[new]]')
    {
    $('quickbarGroups_registerGroup_select').setAttribute('disabled','disabled');
    var tr = n('tr',false,false,false,n('td',false,false,false,t(say.label_name)),n('td',false,false,false,n('input',{'type':'text','id':'quickbarGroups_registerGroup_newname'})));
    $('quickbarGroups_registerGroup_table').appendChild(tr);
    $('quickbarGroups_registerGroup_table').appendChild(this.parentNode.parentNode);
    }
  else
    {
    data[value].push(hash);
    var x = uneval(data);
    setValue('groups',x);
    document.location.reload();
    }
  }

function register2Group_save_new()
  {
  this.removeEventListener('click',arguments.callee,false);

  var value = $('quickbarGroups_registerGroup_newname').value;
  var hash = $('quickbarGroups_registerGroup_md5').value;

  if(data == 'undefined')
    data = new Object();
  data[value] = [hash];
  var x = uneval(data);
  setValue('groups',x);
  document.location.reload();
  }

function aboutMe()
  {
  var div = n('div',{'id':'about_me_52318','style':'font-family:sans-serif; color:Darkblue; position:absolute; top:30%; left:30%; background:url(http://c1b1.de/images/gm_logo.png) no-repeat Silver bottom right ; border:solid black 2px;'},false,[say._name+' ('+version+')',
  '(c) by '+say._name+' 2008-2009',
  '<a href="'+say._contact+'"> - Email me - </a>',
  '<a href="http://c1b1.de">http://c1b1.de</a>',
  '',
  'Do not republish, use in other scripts, change or reproduce this code',
  'nor a part/parts of this code without permission from C1B1SE',
  '',
  'This script may be forbidden in TribalWars or DieStämme.',
  'Please look in the respective forum for further information!',
  '',
  '<a href="'+say._support+'"> - Support Forum - </a>',
  '<a href="'+say._self+'"> - Hosted here - </a>'].join('<br />'));
  tag('body')[0].appendChild(div);
  div.appendChild(n('img',{'src':'http://www.c1b1.de/close.png','alt':'Close()','style':'position:absolute; top:5px; right:5px; '},['click',function(){d(this.parentNode.id);},false]));
  dragable(div,1000);
  }



// Common functions
function setValue(key,value)
  {
  return GM_setValue(''+lang+world+'_'+key,value);
  }
function getValue(key,defaultValue)
  {
  return GM_getValue(''+lang+world+'_'+key,defaultValue);
  }
function rel_top(e)
  {
  var y = 0;
  while(e)
    y += e.offsetTop + e.clientTop,e = e.offsetParent;
  return y;
  }
function rel_left(e)
  {
  var x = 0;
  while(e)
    x += e.offsetLeft + e.clientLeft,e = e.offsetParent;
  return x;
  }
function dragable(element,pixel)
  {
  var click_position,clone = false,active = false,current_position = new Array(rel_left(element),rel_top(element));
  with(element) {
    style.position = 'absolute';
    style.left = current_position[0] + 'px';
    style.top = current_position[1] + 'px';
    addEventListener('mousedown',function(e) {
      if(clone) { try {
        clone.parentNode.removeChild(clone);
        clone = false; } catch(e){} }
      current_position[0] = parseInt(this.style.left);
      current_position[1] = parseInt(this.style.top);
      click_position = new Array(e.pageX - current_position[0],e.pageY - current_position[1]);
      if(pixel?(click_position[1] > pixel):(click_position[1] > this.clientHeight / 7))
        return;
      clone = element.cloneNode(true);
      element.parentNode.insertBefore(clone,element);
      element['style']['opacity'] = 0.5;
      this.style.cursor = 'move';
      active = true;
      },false);
    addEventListener('mouseup',function() {
      this.style.cursor = 'default';
      active = false;
      this.style.opacity = 1.0;
      try { clone.parentNode.removeChild(clone); clone = false; } catch(e){};
      },false);
    }
  document.addEventListener('mousemove',function(e) {
    if(active)
      with(element) {
        style.left = (e.pageX - click_position[0]) + 'px';
        style.top = (e.pageY - click_position[1]) + 'px'; }
    },false);
  }
function $(id) { return document.getElementById(id); };
function name(name) { return document.getElementsByName(name); };
function tag(name, parent)
  {
  if(!parent)
    return document.getElementsByTagName(name);
  return parent.getElementsByTagName(name);
  }
function d(id) { document.getElementById(id).parentNode.removeChild(document.getElementById(id)); };
function n(type,attrs,evt,html,args)
  {
  var e = document.createElement(type);

  if(attrs)
    for(var attr in attrs)
      if(attr == 'style' && typeof(attrs[attr]) == 'object')
        for(var property in attrs[attr])
          e.style[property] = attrs[attr][property];
      else
        e.setAttribute(attr,attrs[attr]);

  if(evt)
    e.addEventListener(evt[0],evt[1],evt[2]);

  if(html)
    e.innerHTML = html;

  if(html === false)
    for(var i = 4; i < arguments.length; i++)
      if(!arguments[i].nodeType)
        e.appendChild(document.createTextNode(arguments[i]));
      else
        e.appendChild(arguments[i]);

  return e;
  }
function t(str) { return document.createTextNode(str!=undefined?str:''); };
function test(fct,elsewise) { try { return fct(); } catch(error) { return 'undefined' == typeof(elsewise) ? void(0) : elsewise ; } }



// Array Remove - By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};




/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2-beta Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
function hex_hmac_md5(k, d)
  { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_md5(k, d)
  { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_md5(k, d, e)
  { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s)
{
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data)
{
  var bkey = rstr2binl(key);
  if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input)
{
  try { hexcase } catch(e) { hexcase=0; }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for(var i = 0; i < input.length; i++)
  {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F)
           +  hex_tab.charAt( x        & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input)
{
  try { b64pad } catch(e) { b64pad=''; }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for(var i = 0; i < len; i += 3)
  {
    var triplet = (input.charCodeAt(i) << 16)
                | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding)
{
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for(j = 0; j < full_length; j++)
  {
    quotient = Array();
    x = 0;
    for(i = 0; i < dividend.length; i++)
    {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if(quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input)
{
  var output = "";
  var i = -1;
  var x, y;

  while(++i < input.length)
  {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
    {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if(x <= 0x7F)
      output += String.fromCharCode(x);
    else if(x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
    else if(x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                    0x80 | ((x >>> 12) & 0x3F),
                                    0x80 | ((x >>> 6 ) & 0x3F),
                                    0x80 | ( x         & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                  (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input)
{
  var output = "";
  for(var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                   input.charCodeAt(i)        & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}