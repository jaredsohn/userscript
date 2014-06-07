// ==UserScript==
// @name	Basecamp: Hide Dashboard Announcement
// @namespace	http://www.lysator.liu.se/~jhs/userscript
// @description	Adds the option to hide dashboard announcements within Basecamp. The announcement panel remembers when it has been zipped up but will open up again if the contents of the announcement gets changed, so you don't risk missing anything.
// @include	http://*.updatelog.com/*
// @include	http://*.projectpath.com/*
// @include	http://*.updatelog.com/*
// @include	http://*.clientsection.com/*
// @include	http://*.seework.com/*
// @include	http://*.grouphub.com/*
// ==/UserScript==

hash = ''; // SHA digest of announcement contents

function add_toggle_pane_button( div )
{
  var html = div.innerHTML;
  var hide = GM_getValue( 'hide', 0 );
  div.innerHTML = '<a>Hide this announcement</a>' +
    '<div id="hideshow">'+ html +'</div>';
  hash = hex_sha1( html );
  EventMgr.add( div.firstChild, 'click', toggle_announcement, false );
  if( hide && hide == hash )
    hide_announcement( div.firstChild );
}

function hide_announcement( a )
{
  a.innerHTML = 'Show this announcement';
  $( 'hideshow' ).style.display = 'none';
  GM_setValue( 'hide', hash );
}

function show_announcement( a )
{
  a.innerHTML = 'Hide this announcement';
  $( 'hideshow' ).style.display = 'block';
  GM_setValue( 'hide', 0 );
}

function toggle_announcement( e )
{
  var a = e.target;
  if( a.textContent.match( 'Hide' ) )
    hide_announcement( a );
  else
    show_announcement( a );
}

function $( id )
{
  return document.getElementById( id );
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root, type )
{
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, type, null ), result = [];
  while( next = got.iterateNext() )
    result.push( next );
  return result;
}

// run the passed cb( node, index ) on all nodes matching the expression
function foreach( xpath, cb, root )
{
  var nodes = $x( xpath, root ), i, e = 0;
  for( i=0; i<nodes.length; i++ )
    e += cb( nodes[i], i ) || 0;
  return e;
}

EventMgr = // avoid leaking event handlers
{
  _registry:null,
  initialize:function() {
    if(this._registry == null) {
      this._registry = [];
      EventMgr.add(window, "_unload", this.cleanup);
    }
  },
  add:function(obj, type, fn, useCapture) {
    this.initialize();
    if(typeof obj == "string")
      obj = document.getElementById(obj);
    if(obj == null || fn == null)
      return false;
    if(type=="unload") {
      // call later when cleanup is called. don't hook up
      this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
      return true;
    }
    var realType = type=="_unload"?"unload":type;
    obj.addEventListener(realType, fn, useCapture);
    this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
    return true;
  },
  cleanup:function() {
    for(var i = 0; i < EventMgr._registry.length; i++) {
      with(EventMgr._registry[i]) {
        if(type=="unload")
	  fn();
        else {
	  if(type=="_unload") type = "unload";
	  obj.removeEventListener(type,fn,useCapture);
        }
      }
    }
    EventMgr._registry = null;
  }
};

// A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
// in FIPS PUB 180-1 Version 2.1a Copyright Paul Johnston 2000 - 2002.
// Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet, Johan S
// Distributed under the BSD License. Details: http://pajhome.org.uk/crypt/md5

var chrsz = 16; // bits per input character. 8 - ASCII; 16 - Unicode

function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}

// Calculate the SHA-1 of an array of big-endian words, and a bit length
function core_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;

  var w=new Array(80);
  var a=1732584193, b=-271733879, c=-1732584194, d= 271733878, e=-1009589776;
  for(var i = 0; i < x.length; i += 16)
  {
    var oa = a, ob = b, oc = c, od = d, oe = e;
    for( var j = 0; j < 80; j++ )
    {
      w[j] = (j < 16) ? x[i + j] : rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d; d = c; c = rol(b, 30); b = a; a = t;
    }
    a = safe_add(a, oa); b = safe_add(b, ob); c = safe_add(c, oc);
    d = safe_add(d, od); e = safe_add(e, oe);
  }
  return [a, b, c, d, e];
}

// Perform the appropriate triplet combination function for current iteration
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}

// Determine the appropriate additive constant for the current iteration
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
}

// Add integers, wrapping at 2^32. This uses 16-bit operations internally
// to work around bugs in some JS interpreters.
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

// Bitwise rotate a 32-bit number to the left.
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

// Convert an 8-bit or 16-bit string to an array of big-endian words
// In 8-bit function, characters >255 have their hi-byte silently ignored.
function str2binb(str)
{
  var bin = [];
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

// Convert an array of big-endian words to a hex string.
function binb2hex( data )
{
  for( var hex='', i=0; i<data.length; i++ )
  {
    while( data[i] < 0 ) data[i] += 0x100000000;
    hex += ('0000000'+(data[i].toString(16))).slice( -8 );
  }
  return hex.toUpperCase();
}

foreach( '//div[@class="dashannouncement"]', add_toggle_pane_button );
