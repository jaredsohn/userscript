// ==UserScript==
// @name          What.cd - Identicons
// @author        SuperSnout
// @version       1.2
// @namespace     http://what.cd
// @description   Replace default avatars with identicons
// @include       http://what.cd/forums.php*
// @include       https://ssl.what.cd/forums.php*
// @include       http://what.cd/user.php?action=edit&userid=*
// @include       https://ssl.what.cd/user.php?action=edit&userid=*
// @include       http://what.cd/torrents.php?id=*
// @include       https://ssl.what.cd/torrents.php?id=*
// @include       http://what.cd/torrents.php?*id=*
// @include       https://ssl.what.cd/torrents.php?*id=*
// @include       http://what.cd/comments.php?*action=my_torrents
// @include       https://ssl.what.cd/comments.php?*action=my_torrents
// @include       http://what.cd/userhistory.php?*action=subscriptions*
// @include       https://ssl.what.cd/userhistory.php?*action=subscriptions*
// ==/UserScript==

// Get the current URL
url = document.location;

// Define URL regexps
forum_url = /.*what\.cd\/forums\.php.*/;
settings_url = /.*what\.cd\/user\.php\?action=edit&userid=.*/;
comments_url = /what\.cd\/torrents\.php\?.*id=.*/;
my_torrents = /what\.cd\/comments\.php\?.*action=my_torrents/;
subscriptions = /what\.cd\/userhistory\.php\?.*action=subscriptions.*/;

// Load MD5 function //
MD5 = makeMD5();

// Default settings
default_settings = {
  "version" : "1.2",
  "replace_all" : "false",
  "identicon_type" : "identicon"
}

// Various settings //
var storage = "identicon_settings";
var version = default_settings.version;

// Load current settings
var settings = loadSettings();

// Decide what to do if anything
if (forum_url.test(url)) {
  main();
} else if (comments_url.test(url)) {
  main();
} else if (my_torrents.test(url)) {
  main();
} else if (subscriptions.test(url)) {
  main();
} else if (settings_url.test(url)) {
  settingsPage();
} 


// Main script //

function main() {

  var type = settings.identicon_type
  var posts = document.getElementsByClassName('forum_post');
  
  for(var i = 0; i < posts.length; i++) {
    var ele = posts[i];
    var avatar = ele.getElementsByClassName('avatar')[0].getElementsByTagName('img')[0];
    
    if(avatar.src.substr(-41) == "what.cd/static/common/avatars/default.png" || settings.replace_all == 'true' ) {
      avatar.src="";
      var username = ele.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('strong')[0].childNodes[0].textContent;
      var md5hash = MD5.hex(username);
      avatar.src = 'http://www.gravatar.com/avatar/'+md5hash+'?d='+type+'&s=150';
    }
  }
}

// Settings page //

function settingsPage() {

  var form = document.getElementById('userform');
  var table = form.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
  var row = document.createElement('tr');
  var label = document.createElement('td');
  row.appendChild(label);
  label.className = 'label';
  label.innerHTML = '<p><strong>Identicons</strong></p>';
  var cont = document.createElement('td');
  cont.id = 'identicon_options'
  row.appendChild(cont);
  input = document.createElement('input');
  
  table.insertBefore(row,table.getElementsByTagName('tr')[14]);
  
  // Make replace-all setting selection menu

  var select_replace_all = document.createElement('select');
     select_replace_all.id = "replace_all";

     var replace_all_option_0 = document.createElement('option');
        replace_all_option_0.value = 0;
        replace_all_option_0.appendChild( document.createTextNode("Replace default avatars") );
     select_replace_all.appendChild( replace_all_option_0 );


     var replace_all_option_1 = document.createElement('option');
        replace_all_option_1.value = 1;
        replace_all_option_1.appendChild( document.createTextNode("Replace all avatars") );
     select_replace_all.appendChild( replace_all_option_1 );

     // Make identicon type selection menu

     var select_identicon_type = document.createElement('select');
        select_identicon_type.id = "replace_all";
     
        var select_identicon_type_option_0 = document.createElement('option');
           select_identicon_type_option_0.value = 0;
           select_identicon_type_option_0.appendChild( document.createTextNode("Use identicons") );
        select_identicon_type.appendChild( select_identicon_type_option_0 );
     
     
        var select_identicon_type_option_1 = document.createElement('option');
           select_identicon_type_option_1.value = 1;
           select_identicon_type_option_1.appendChild( document.createTextNode("Use monsterIDs") );
        select_identicon_type.appendChild( select_identicon_type_option_1 );



   var input_0 = document.createElement('input');
      input_0.value = "Save Settings";
      input_0.type = "button";


      var savemsg = document.createElement('div');
         savemsg.className = "save_message";
         savemsg.appendChild( document.createTextNode("Identicon settings saved.") );
      
      content = document.getElementById('content');

      function saveSettings() {
        if (select_replace_all.value == 0) {
          if (settings.replace_all != "false") {
            settings.replace_all = "false";
          }
        } else if (select_replace_all.value == 1) {
          if (settings.replace_all != "true") {
            settings.replace_all = "true";
          }
        }

        if (select_identicon_type.value == 0) {
          if (settings.identicon_type != "identicon") {
            settings.identicon_type = "identicon";
          }
        } else if (select_identicon_type.value == 1) {
          if (settings.identicon_type != "monsterid") {
            settings.identicon_type = "monsterid";
          }
        }

        setObject('identicon_settings', settings);
        content.insertBefore(savemsg,content.getElementsByClassName('thin')[0]);
      }

      if (input_0.addEventListener){ 
      input_0.addEventListener('click', saveSettings, false); 
      } else if (input_0.attachEvent){ 
      input_0.attachEvent('onclick', saveSettings); 
      } 


// Display current settings
  if (settings.replace_all == "false") {
    replace_all_option_1.selected = "";
    replace_all_option_0.selected = "selected";
  } else if (settings.replace_all == "true") {
    replace_all_option_1.selected = "selected";
    replace_all_option_0.selected = "";
  }

  if (settings.identicon_type == "identicon") {
    select_identicon_type_option_1.selected = "";
    select_identicon_type_option_0.selected = "selected";
  } else if (settings.identicon_type == "monsterid") {
    select_identicon_type_option_1.selected = "selected";
    select_identicon_type_option_0.selected = "";
  }

  space = document.createTextNode(' ');
  space2 = document.createTextNode(' ');

  cont.appendChild(select_replace_all);
  cont.appendChild(select_identicon_type);
  cont.appendChild(input_0);
  cont.insertBefore(space,input_0);
  cont.insertBefore(space2,select_identicon_type);

}

// Functions //

function loadSettings() {
  var settings = getObject('identicon_settings');
  if (!settings || settings.version != version) {
    setObject('identicon_settings', default_settings);
    settings = default_settings;
  }
  return settings;
}

function setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getObject(key) {
    var obj = localStorage.getItem(key);
    if (obj) {
      return JSON.parse(obj);
    } else {
      return null;
    }
}


// MD5 function //

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

function makeMD5() {
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16) {
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
  return [a, b, c, d];
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data) {
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * MD5.chrsz);

  var ipad = [], opad = [];
  for(var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * MD5.chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str) {
  var bin = [], chrsz = MD5.chrsz;
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin) {
  var str = "", chrsz = MD5.chrsz;
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray) {
  var hex_tab = MD5.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray) {
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3) {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++) {
      if(i * 8 + j * 6 > binarray.length * 32) str += MD5.b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}

  return {
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
    hexcase: 0, // hex output format. 0 - lowercase; 1 - uppercase
    b64pad: "", // base-64 pad character. "=" for strict RFC compliance
    chrsz: 8,   // bits per input character. 8 - ASCII; 16 - Unicode

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
    hex:function( s ) { 
      return binl2hex( core_md5( str2binl( s ), s.length * MD5.chrsz ) );
    },

    base64:function( s ) {
      return binl2b64( core_md5( str2binl( s ), s.length * MD5.chrsz ) );
    },

    string:function( s ) {
      return binl2str( core_md5( str2binl( s ), s.length * MD5.chrsz ) );
    },

    hmac:{
      hex:function( key, data ) {
        return binl2hex( core_hmac_md5( key, data ) );
      },

      base64:function( key, data ) {
        return binl2b64( core_hmac_md5( key, data ) );
      },

      string:function( key, data ) {
        return binl2str( core_hmac_md5( key, data ) );
      }
    },

    test:function() { // Perform a simple self-test to see if the VM is working
      return this.hex("abc") == "900150983cd24fb0d6963f7d28e17f72";
    }
  };
}