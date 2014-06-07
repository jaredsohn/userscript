// ==UserScript==
// @name          FB Gmail (NEW GMAIL)
// @namespace     http://singpolyma.net/greasemonkey/
// @description   For the new Gmail - Displays notifications from Facebook.com on your GMail view.
// @include       http://mail.google.com/mail/*
// @include       https://mail.google.com/mail/*
// ==/UserScript==

//(c) 2007 Stephen Paul Weber.  Code under the GPL unless otherwise noted.

unsafeWindow.facebook_gmail_stuff_container = {}

/* FACEBOOK API JS - GPL */
      var facebook_api_global_instance = {};
      unsafeWindow.facebook_api_global_instance = facebook_api_global_instance;

      function facebook_api(api_key, secret, session_key) {
         this.api_key = api_key;
         this.secret = secret;
         this.session_key = session_key;
      }//end class facebook_api

      facebook_api.prototype.api_key = '';
      facebook_api.prototype.secret = '';
      facebook_api.prototype.session_key = '';
      facebook_api.prototype.session_expires = '';
      facebook_api.prototype.auth_token = '';
      facebook_api.prototype.external_callback = '';

      facebook_api.prototype.make_sig = function(args) {
         return hex_md5(args.sort().join('') + this.secret);
      }//end function make_sig

      facebook_api.prototype.auth = function(link,external_callback) {
         if(this.auth_token) {this.start_session(external_callback); return;}
         facebook_api_global_instance = this;
         unsafeWindow.facebook_api_global_instance = facebook_api_global_instance;
         if(this.session_key) {
            this.external_callback = external_callback;
            this.infinite_auth(false);
//            this.session_key = '';
//            this.request('auth.createToken','facebook_api_global_instance.infinite_auth');
         } else {
            this.request('auth.createToken','facebook_api_global_instance.login');
            if(link) link.innerHTML = 'Click after FaceBook login';
         }//end if-else session_key
      }//end function auth

      facebook_api.prototype.infinite_auth = function(auth_token) {
         if(auth_token) {
            this.auth_token = auth_token;
            var ifr = document.createElement('img');
            ifr.style.display = 'none';
            ifr.src = 'http://www.facebook.com/login.php?api_key=' + this.api_key + '&v=1.0&auth_token=' + auth_token;
            document.body.appendChild(ifr);
            this.start_session(this.external_callback);
         } else {
            this.external_callback(this);
         }//end if-else auth_token
      }//end function login

      facebook_api.prototype.login = function(auth_token) {
         this.auth_token = auth_token;
         window.open('http://www.facebook.com/login.php?api_key=' + this.api_key + '&v=1.0&auth_token=' + auth_token);
      }//end function login

      facebook_api.prototype.start_session = function(external_callback) {
         this.external_callback = external_callback;
         facebook_api_global_instance = this;
         unsafeWindow.facebook_api_global_instance = facebook_api_global_instance;
         this.request('auth.getSession','facebook_api_global_instance.session_callback',['auth_token=' + this.auth_token]);
      }//end function start_session

      facebook_api.prototype.session_callback = function(data) {
         this.session_key = data.session_key;
         this.session_expires = data.expires;
         if(data.secret) this.secret = data.secret;
         this.external_callback(this);
      }//end function session_callback

      facebook_api.prototype.request = function(method_name,callback,args) {
         if(!args) args = [];
         args.push('method=' + method_name);
         args.push('api_key=' + this.api_key);
         args.push('v=1.0');
         args.push('format=json');
         args.push('callback=' + callback);
         if(this.session_key && method_name != 'auth.createToken' && method_name != 'auth.getSession') {
            args.push('session_key=' + this.session_key);
            args.push('call_id=' + (new Date()).getTime());
         }//end if this.session_key
         var sig = this.make_sig(args);
         args.push('sig=' + sig);
         var script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = 'http://api.facebook.com/restserver.php?' + args.join('&');
         document.body.appendChild(script);
      }//end function request
/* END FACEBOOK API JS */

/* MD5 JS - BSD */
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = "="; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
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
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
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

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

/* END MD5 JS */

/* MAIN SCRIPT - GPL */
var fb, fb_err_times = 0, wrap = {};
function render_view(data) {
   if(data.error_code) {
      if(data.error_code == 102) {
         if(fb_err_times < 2) {
            fb.auth('',function() {fb.request('notifications.get','facebook_gmail_stuff_container.gmail_facebook_render_view');});
         } else {
            fb.auth_token = '';
            fb.session_key = '';
            document.getElementById('facebook-gmail-view').innerHTML = '<a style="display:block;margin:2px;" href="#" id="facebook-gmail-link" onclick="facebook_gmail_stuff_container.gmail_facebook_fb.auth(this,facebook_gmail_stuff_container.gmail_facebook_authpross); return false;"><img src="http://static.ak.facebook.com/images/devsite/facebook_login.gif" style="border-width:0px;"></a>';
         }//end if fb_err_times < 2
         fb_err_times++;
         return;
      }//end if 102
      document.getElementById('facebook-gmail-view').innerHTML = 'Error ' + data.error_code;
//      unsafeWindow.console.log(data);
      return;
   }//end if error
   var txt = '';
   if(data.messages.unread > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/inbox/">'+data.messages.unread+' Unread Messages</a></li>';
   if(data.pokes.unread > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/home.php?">'+data.pokes.unread+'New Pokes</a></li>';
   if(data.shares.unread > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/inbox/">'+data.shares.unread+'New Shares</a></li>';
   if(data.event_invites.length > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/reqs.php#event">'+data.event_invites.length+' Event Invites</a></li>';
   if(data.friend_requests.length > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/reqs.php#friend">'+data.friend_requests.length+' Friend Requests</a></li>';
   if(data.group_invites.length > 0) txt += '<li style="margin-left:2px;padding:0px;"><a href="http://www.facebook.com/reqs.php#group">'+data.group_invites.length+' Group Invites</a></li>';
   if(txt.length < 1) txt = "No new notifications.";
   wrap.setContent(txt);
}//end function render_view
unsafeWindow.facebook_gmail_stuff_container.gmail_facebook_render_view = render_view;

function authpross(fb) {
   if(fb.session_expires == 0 && fb.session_key) {
      GM_setValue('facebook_gmail_session_key',fb.session_key);
      GM_setValue('facebook_gmail_secret',fb.secret);
   }//end if infinite
   fb.request('notifications.get','facebook_gmail_stuff_container.gmail_facebook_render_view');
}//end function authpross
unsafeWindow.facebook_gmail_stuff_container.gmail_facebook_authpross = authpross;

function init(gmailapi) {
   fb = new facebook_api('1a6f00026a3134b4088b119a0d79708a',GM_getValue('facebook_gmail_secret','bf8a9a8bf0914d2e079399217fffcf41'),GM_getValue('facebook_gmail_session_key',false));
   unsafeWindow.facebook_api_global_instance = fb;
   unsafeWindow.facebook_gmail_stuff_container.gmail_facebook_fb = fb;
   wrap = gmailapi.addNavModule("<b>Facebook</b>","<i>Loading...</i>","lightblue");
   if(!fb.session_key) {//if not authed, display log in link
      wrap.setContent('<a style="display:block;margin:2px;" href="#" onclick="parent.facebook_gmail_stuff_container.gmail_facebook_fb.auth(this,facebook_gmail_stuff_container.gmail_facebook_authpross); this.innerHTML = \'Click after Facebook login\'; return false;" id="facebook-gmail-link"><img src="http://static.ak.facebook.com/images/devsite/facebook_login.gif" style="border-width:0px;"></a>');
   } else {
      fb.auth('',function() {fb.request('notifications.get','facebook_gmail_stuff_container.gmail_facebook_render_view');});
   }//end if-else session key
}

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init);
  }
}, true);

/* END MAIN SCRIPT */
