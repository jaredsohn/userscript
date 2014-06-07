// ==UserScript==
// @name          DS Aktivitätsthread
// @version       1.1
// @author        Samuel Essig (http://c1b1.de)
// @description   Zählt die Posts in einem Thread und gibt eine Liste der Autoren in BBCodes aus
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/*forum.php*screen=view_thread*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

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

         twitter: http://twitter.com/c1b1se

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en




Beschreibung:
-------------

Zählt die Posts in einem Thread und gibt eine Liste der Autoren in BBCodes aus.
Jeder Post wird mit md5 gehasht und in den Firefox Einstellungen abgelegt.

DS Forum Thread: http://forum.die-staemme.de/showthread.php?t=120328


Das Script basiert auf meinem Script DS #Posts:
http://userscripts.org/scripts/review/52212


*/
const version = '1.1';

const text = {
  'de' : {
    '_name' : 'DS Aktivitätsthread',
    'showData_button' : 'Daten anzeigen',
    'clearData_button' : 'Daten zurücksetzen',
    'startCounting' : 'Zählen beginnen',
    'stopCounting' : 'Zählen stoppen',
    'finished_alert' : 'Fertig',
    'playername' : 'Name' ,
    'playerposts' : 'Posts' ,
    'countedPosts_heading' : 'Gezählte Posts',
    'convert2bbcodes' : 'Aktuelle Tabelle in BBCodes umwandeln',
    'desc' : 'Durch Klicken auf "Name" oder "Posts" kann die Tabelle (und damit auch die BBCodesausgabe) sortiert werden.',
    'back' : 'Zurück zum Thread',
    'active' : 'Aktiv',
    'inactive' : 'Inaktiv'
    }
  };

const world = document.location.href.split('.').shift().split('de').pop();
const lang = document.location.href.split('.')[0].split(/\/\/(\D+)\d+/)[1];

const thread_id = document.location.href.match(/thread_id=(\d+)/)[1];

const active = GM_getValue('active',false)?true:false;

var a1 = n('span',{'style':'font-weight:bolder; color:'+(active?'green':'red')+';'},false,false,active?text[lang].active:text[lang].inactive);
var a2 = n('a',{'href':'#'},['click',function() { clearData(); GM_setValue('active',false); GM_setValue('lastid',0); alert(text[lang].finished_alert); document.location.reload(); },false],false,text[lang].clearData_button);
if(!active)
  var a3 = n('a',{'href':'#','id':'bar_status_line'},['click',startIt,false],false,text[lang].startCounting);
else
  var a3 = n('a',{'href':'#','id':'bar_status_line'},['click',stopIt,false],false,text[lang].stopCounting);
bar(a1,a2,a3);


const dukeass = document.getElementById('adIntBar')?true:false;

if(thread_id && thread_id == GM_getValue('lastid',0) && active)
  {
  var posts = document.getElementsByClassName('post');
  for(var i = 1; i < posts.length; i++)
    {
    if(!dukeass)
      {
      var player_name = posts[i].getElementsByClassName('igmline small')[0].getElementsByTagName('a')[0].firstChild.data.substring(1);
      var post_hash = hex_md5(posts[i].innerHTML);

      var time_string = grabText(posts[i].getElementsByClassName('igmline small')[0].getElementsByTagName('a')[0].parentNode,1);
      var post_time = parseFromDSTime(time_string).getTime();
      }
    else
      {
      var player_name = posts[i].getElementsByClassName('igmline small')[0].getElementsByClassName('normal_link')[0].firstChild.data.substring(1);
      var post_hash = hex_md5(posts[i].innerHTML);

      var time_string = grabText(posts[i].getElementsByClassName('igmline small')[0].getElementsByClassName('normal_link')[0].parentNode,1);
      var post_time = parseFromDSTime(time_string).getTime();
      }

    var value_name = lang+world + '_' + post_time + '_' + player_name + '_' + post_hash;

    if(GM_getValue(value_name) !== true)
      GM_setValue(value_name,true);
    }
  }

function stopIt()
  {
  GM_setValue('active',false);
  document.getElementById('bar_status_line').parentNode.removeChild(document.getElementById('bar_status_line'));
  showData();
  }

function startIt()
  {
  GM_setValue('active',true);
  GM_setValue('lastid',thread_id);
  clearData();
  document.location.reload();
  }

function showData()
  {
  var arr = GM_listValues();
  var w_len = (lang+world).length;
  var res = {};
  // Count Posts
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i].substr(0,w_len) == (lang+world))
      {
      if(GM_getValue(arr[i]) === true)
        {
        // Extract name
        var a = arr[i].split('_');
        delete(a[0]);
        delete(a[1]);
        delete(a[3]);
        var p_name = ext_join(a,'_');
        // Add 1
        res[p_name]?res[p_name]++:res[p_name]=1;
        }
      }
    }


  // Write
  document.getElementsByClassName('main')[0].innerHTML = '';
  var h2 = n('h2',false,false,false,text[lang].countedPosts_heading);
  var tr = n('tr',false,false,false,n('th',{'class':'string'},['click',sortTable,false],false,text[lang].playername),n('th',{'class':'int'},['click',sortTable,false],false,text[lang].playerposts));
  var table = n('table',{'border':'0','class':'vis','id':'posts_output_table','style':{'border':'#804000 2px solid'}},false,false,tr);

  for (p in res)
    table.appendChild( n('tr',false,false,false,n('td',false,false,false,p),n('td',false,false,false,res[p])) );
  document.getElementsByClassName('main')[0].appendChild(h2);
  document.getElementsByClassName('main')[0].appendChild(table);
  document.getElementsByClassName('forum selected')[0].setAttribute('class','forum');

  var bbbutton = n('input',{'type':'button','value':text[lang].convert2bbcodes},['click',bbcode,false]);
  document.getElementsByClassName('main')[0].appendChild(bbbutton);
  document.getElementsByClassName('main')[0].appendChild(n('br'));

  document.getElementsByClassName('main')[0].appendChild(n('p',false,false,false,text[lang].desc));

  document.getElementsByClassName('main')[0].appendChild(n('br'));
  document.getElementsByClassName('main')[0].appendChild(n('br'));
  document.getElementsByClassName('main')[0].appendChild(n('br'));
  var back = n('a',{'href':'#'},['click',function() { document.location.reload(); },false],false,text[lang].back);
  document.getElementsByClassName('main')[0].appendChild(n('br'));
  document.getElementsByClassName('main')[0].appendChild(back);
  }

function bbcode()
  {
  var table = document.getElementById('posts_output_table');
  var elist = table.getElementsByTagName('tr');
  var i = 1;
  var arr = [];
  var index = 0;
  while(i < elist.length)
    {
    arr.push('[player]'+elist[i].getElementsByTagName('td')[index].firstChild.nodeValue+'[/player]');
    i++;
    }
  var output = arr.join('\n');
  var textarea = n('textarea',{'cols' : 70, 'rows' : 13});
  textarea.appendChild(t(output));
  document.getElementsByClassName('main')[0].appendChild(n('br'));
  document.getElementsByClassName('main')[0].appendChild(n('br'));
  document.getElementsByClassName('main')[0].appendChild(textarea);
  }

function sortTable()
  {
  var index = 0;
  var e = this.previousSibling;
  while(e) { index++; e = e.previousSibling; }

  var table = document.getElementById('posts_output_table');
  var elist = table.getElementsByTagName('tr');
  var last = tmp = 0;
  var i = 1;
  if(this.className.indexOf('int') != -1)
    {
    while(i < elist.length)
      {
      tmp = parseInt(elist[i].getElementsByTagName('td')[index].firstChild.nodeValue);
      if( tmp > last )
        {
        elist[i].parentNode.insertBefore(elist[i],elist[i-1<1?1:i-1]);
        i = 1;
        }
      last = tmp;
      i++;
      }
    }
  else if(this.className.indexOf('string') != -1)
    {
    while(i < elist.length)
      {
      tmp = elist[i].getElementsByTagName('td')[index].firstChild.nodeValue.toLowerCase().charCodeAt(0);
      if( tmp < last )
        {
        elist[i].parentNode.insertBefore(elist[i],elist[i-1<1?1:i-1]);
        i = 1;
        }
      last = tmp;
      i++;
      }
    }

  }


function clearData()
  {
  var arr = GM_listValues();
  var w_len = (lang+world).length;
  // Delete Data
  for(var i = 0; i < arr.length; i++)
    {
    if(arr[i].substr(0,w_len) == (lang+world))
      {
      GM_deleteValue(arr[i]);
      }
    }
  }



// Common functions
function ext_join(arr,d)
  {
  var x = 0;
  while(arr[x] == undefined)
    x++;
  var re = arr[x++];
  for(; x < arr.length; x++)
    if(arr[x] != undefined)
      re += d+arr[x];
  return re;
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
      if(!arguments[i] || !arguments[i].nodeType)
        e.appendChild(document.createTextNode(arguments[i]));
      else
        e.appendChild(arguments[i]);

  return e;
  }
function t(str) { return document.createTextNode(str); };
function test(fct,elsewise) { try {fct();} catch(error) {}; return typeof(elsewise) == 'undefined' ? void(0) : elsewise ; }
function getChilds(mother,tagname)
  {
  if(tagname)
    tagname = tagname.toUpperCase;
  var element = mother.firstChild;
  var childs = new Array();
  while(element)
    {
    if((tagname && element.tagName && element.tagName.toUpperCase == tagname) || (!tagname && element.tagName))
      childs.push(element);
    element = element.nextSibling;
    }
  return childs;
  }
function parseToDSTime(obj,secs)
  {
  var now = new Date();
  if(!secs)
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds());
    }
  else
    {
    if(now.getMonth() == obj.getMonth()  && now.getDate() == obj.getDate())
      return 'heute um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else if(now.getMonth() == obj.getMonth()  && (now.getDate()+1) == obj.getDate())
      return 'morgen um '+((obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds())) + ' Uhr';
    else
      return (obj.getDate()>9?obj.getDate():'0'+obj.getDate()) + '.' + ((obj.getMonth()+1)>9?(obj.getMonth()+1):'0'+(obj.getMonth()+1)) + '.'+ (String(obj.getFullYear()).substr(2)) + ' ' + (obj.getHours()>9?obj.getHours():'0'+obj.getHours()) + ':' + (obj.getMinutes()>9?obj.getMinutes():'0'+obj.getMinutes()) + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds() + ':' + (obj.getSeconds()>9?obj.getSeconds():'0'+obj.getSeconds()));
    }
  }
function parseFromDSTime(string)
  {
  // Create Date Object
  var now = new Date();

  // Extract Time
  var time = string.match(/(\d+):(\d+) Uhr/);

  // Hours
  if(time[1][0] == '0')
    var hours = parseInt(time[1][1]);
  else
    var hours = parseInt(time[1]);

  // Minutes
  if(time[2][0] == '0')
    var minutes = parseInt(time[2][1]);
  else
    var minutes = parseInt(time[2]);

  // Today
  if(string.indexOf('heute') != -1)
    {
    var days = now.getDate();
    var months = now.getMonth();
    }

  // Tomorrow
  else if(string.indexOf('morgen') != -1)
    {
    var days = now.getDate()+1;
    var months = now.getMonth();
    }
  // Other day
  else
    {
    // Extract Date e.g. "09.06."
    var date = string.match(/(\d+)\.(\d+)\./);

    // Day
    if(date[1][0] == '0')
      var days = parseInt(date[1][1]);
    else
      var days = parseInt(date[1]);

    // Month
    if(date[2][0] == '0')
      var months = parseInt(date[2][1]) -1;
    else
      var months = parseInt(date[2]) -1;
    }

  // Return Date Object
  return new Date(now.getFullYear(), months, days, hours, minutes, 0);
  }
function bar()
    {
    if($('dscountposts_bar'))
      return false;

    var div = n('div');
    div.setAttribute('id','dscountposts_bar');
    div.style.backgroundColor = 'rgb(243,237,223)';
    div.style.border = 'rgb(128,64,0) 2px solid';
    div.style.marginTop = '15px';
    div.style.padding = '5px';

    var leftfont = n('span');
    leftfont.setAttribute('style','float:left; ');

    for(var i = 0, len = arguments.length; len > i; i++)
      {
      leftfont.appendChild(arguments[i]);
      if(len - 1 != i)
        {
        var delimiter = n('span');
        delimiter.setAttribute('style','margin-left:5px; margin-right:5px; width:1px; border:1px #804000 solid; ')
        leftfont.appendChild(delimiter);
        }
      }

    div.appendChild(leftfont);

    var rightfont = n('span');
    rightfont.setAttribute('style','float:right; font-size:smaller; opacity:0.7; ');
    rightfont.appendChild(t( text[lang]._name +  ' (' + version+')'));
    div.appendChild(rightfont);

    var clearfont = n('div');
    clearfont.setAttribute('style','clear:both; ');
    div.appendChild(clearfont);

    return $('ds_body').appendChild(div);
    }
function grabText(node,maxDepth)
  {
  if(3 == node.nodeType)
    return node.nodeValue;
  else if((1 == node.nodeType) && (0 < maxDepth))
    {
    var result = '';
    for(var i = 0; i < node.childNodes.length; i++)
      result += grabText(node.childNodes[i],maxDepth - 1);
    return result;
    }
  return '';
  }




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