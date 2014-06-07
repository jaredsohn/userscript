// ==UserScript==
// @name           LoginPasswordManager
// @namespace      *
// @description    Login and Password Manager -Cookie based
// @author         Giuseppe Borzi <gborzi AT ieee DOT org>
// @copyright      2009 by Giuseppe Borzi
// @license        GPL
// @version        0.2
// @include        http://*/*
// @include        https://*/*
// ==/UserScript==


/* Taken from http://www.movable-type.co.uk/scripts/tea-block.html */

/*----------------------------------------------- */
/*  Block TEA (xxtea) Tiny Encryption Algorithm implementation in JavaScript */
/* (c) Chris Veness 2002-2009: www.movable-type.co.uk/tea-block.html */
/*----------------------------------------------- */

/*----------------------------------------------- */
/* Algorithm: David Wheeler & Roger Needham, Cambridge University Computer Lab */
/* http://www.cl.cam.ac.uk/ftp/papers/djw-rmn/djw-rmn-tea.html (1994) */
/* http://www.cl.cam.ac.uk/ftp/users/djw3/xtea.ps (1997) */
/* http://www.cl.cam.ac.uk/ftp/users/djw3/xxtea.ps (1998) */
/*----------------------------------------------- */

var Tea = {};  // Tea namespace

/*
 * encrypt text using Corrected Block TEA (xxtea) algorithm
 *
 * @param {string} plaintext String to be encrypted (multi-byte safe)
 * @param {string} password  Password to be used for encryption (1st 16 chars)
 * @returns {string} encrypted text
 */
Tea.encrypt = function(plaintext, password) {
    if (plaintext.length == 0) return('');  // nothing to encrypt
    
    // convert string to array of longs after converting any multi-byte chars to UTF-8
    var v = Tea.strToLongs(Utf8.encode(plaintext));
    if (v.length <= 1) v[1] = 0;  // algorithm doesn't work for n<2 so fudge by adding a null
    // simply convert first 16 chars of password as key
    var k = Tea.strToLongs(Utf8.encode(password).slice(0,16));  
    var n = v.length;
    
    // ---- <TEA coding> ---- 
    
    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = 0;
    
    while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum>>>2 & 3;
        for (var p = 0; p < n; p++) {
            y = v[(p+1)%n];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
            z = v[p] += mx;
        }
    }
    
    // ---- </TEA> ----
    
    var ciphertext = Tea.longsToStr(v);
    
    return Base64.encode(ciphertext);
}

/*
 * decrypt text using Corrected Block TEA (xxtea) algorithm
 *
 * @param {string} ciphertext String to be decrypted
 * @param {string} password   Password to be used for decryption (1st 16 chars)
 * @returns {string} decrypted text
 */
Tea.decrypt = function(ciphertext, password) {
    if (ciphertext.length == 0) return('');
    var v = Tea.strToLongs(Base64.decode(ciphertext));
    var k = Tea.strToLongs(Utf8.encode(password).slice(0,16)); 
    var n = v.length;
    
    // ---- <TEA decoding> ---- 
    
    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = q*delta;

    while (sum != 0) {
        e = sum>>>2 & 3;
        for (var p = n-1; p >= 0; p--) {
            z = v[p>0 ? p-1 : n-1];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
            y = v[p] -= mx;
        }
        sum -= delta;
    }
    
    // ---- </TEA> ---- 
    
    var plaintext = Tea.longsToStr(v);

    // strip trailing null chars resulting from filling 4-char blocks:
    plaintext = plaintext.replace(/\0+$/,'');

    return Utf8.decode(plaintext);
}

/*----------------------------------------------- */

// supporting functions

Tea.strToLongs = function(s) {  // convert string to array of longs, each containing 4 chars
    // note chars must be within ISO-8859-1 (with Unicode code-point < 256) to fit 4/long
    var l = new Array(Math.ceil(s.length/4));
    for (var i=0; i<l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as 
        // it is the same in longsToStr() 
        l[i] = s.charCodeAt(i*4) + (s.charCodeAt(i*4+1)<<8) + 
               (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24);
    }
    return l;  // note running off the end of the string generates nulls since 
}              // bitwise operators treat NaN as 0

Tea.longsToStr = function(l) {  // convert array of longs back to string
    var a = new Array(l.length);
    for (var i=0; i<l.length; i++) {
        a[i] = String.fromCharCode(l[i] & 0xFF, l[i]>>>8 & 0xFF, 
                                   l[i]>>>16 & 0xFF, l[i]>>>24 & 0xFF);
    }
    return a.join('');  // use Array.join() rather than repeated string appends for efficiency in IE
}


/*----------------------------------------------- */
/* Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2009 */
/* note: depends on Utf8 class */
/*----------------------------------------------- */

var Base64 = {};  // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded 
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */ 
Base64.encode = function(str, utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
  var b64 = Base64.code;
   
  plain = utf8encode ? str.encodeUTF8() : str;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation in IE
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded 
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */ 
Base64.decode = function(str, utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
  var b64 = Base64.code;

  coded = utf8decode ? str.decodeUTF8() : str;
  
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));
      
    bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;
    
    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation in IE
   
  return utf8decode ? plain.decodeUTF8() : plain; 
}


/*----------------------------------------------- */
/* Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple */
/* single-byte character encoding (c) Chris Veness 2002-2009 */
/*----------------------------------------------- */

var Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  var strUni = strUtf.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  return strUni;
}

/*----------------------------------------------- */


var Cookie = { 
  PREFIX:'_loginpassword', 
  get: function( name ){ 
    var nameEQ = escape(Cookie._buildName(name)) + "=", ca = document.cookie.split(';'); 
    for (var i = 0, c; i < ca.length; i++) { 
      c = ca[i]; 
      while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
      if (c.indexOf(nameEQ) == 0) {
         var str = c.substring(nameEQ.length, c.length); var values = str.split('-');
         for( var i = 1; i < values.length; i++ ) {
            values[i] = Tea.decrypt(unescape(values[i]),LogPwd.mypassword);
         }
         return values;
      }
    }
    var values = new Array();
    return values;
  }, 
  set: function( name, values, options ){ 
    value = values[0];
    for( var i = 1; i < values.length; i++ ) value += '-'+Tea.encrypt(values[i],LogPwd.mypassword);
    options = (options || {}); 
    var today = new Date(); 
    var tenYearsLater = new Date( today.getFullYear() + 10, today.getMonth(), today.getDay() );
    options.expires = tenYearsLater;
    var curCookie = escape(Cookie._buildName(name)) + "=" + escape(value) + 
      ((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
      ((options.path)    ? "; path="    + options.path : "") + 
      ((options.domain)  ? "; domain="  + options.domain : "") + 
      ((options.secure)  ? "; secure" : ""); 
    document.cookie = curCookie; 
  }, 
  hasCookie: function( name ){ 
    return document.cookie.indexOf( escape(Cookie._buildName(name)) ) > -1; 
  }, 
  _buildName: function(name){ 
    return Cookie.PREFIX + '_' + name; 
  } 
}; 

getValue = Cookie.get; 
setValue = Cookie.set; 

var LogPwd = {};

// define you master password below
LogPwd.mypassword = "the password you want";
// it'll be used to encrypt your login and password
LogPwd.askstore = "Store Login/Password for this site?",
LogPwd.askneverstore = "Click Yes to never store Login/Password for this site",
LogPwd.askpasstore = "Store new password for login: ",

LogPwd.il = -1;
LogPwd.ip = -1;
LogPwd.inptg = null;

LogPwd.findlp = function(doc) {
   var inptg = doc.getElementsByTagName("input"), ip = -1;
   for ( var i = 0; i < inptg.length; i++ )
      if ( inptg[i].type == "password" ) { ip = i; break; }
   var found = ip > -1;
   if ( found ) {
      this.ip = ip; this.inptg = inptg;
      for( var i = ip-1; i > -1; i--) if ( inptg[i].type == "text" ) { this.il = i; break; }
   }
   return found;
};

LogPwd.buildLoginMenu = function( np, lp ) {
   var oSel=document.createElement("SELECT");
   oSel.addEventListener('change', function() {}, false);
   var oOpt=document.createElement("OPTION"); oOpt.innerHTML = "Which Login?";
   oSel.appendChild(oOpt);
   for( var i = 0 ; i < np; i++ ) {
      var oOpt=document.createElement("OPTION");
      oOpt.innerHTML = lp[2*i+1]; oSel.appendChild(oOpt);
   }
   var oOpt=document.createElement("OPTION"); oOpt.innerHTML = "Delete entry";
   oSel.appendChild(oOpt);
   return(oSel);
};

LogPwd.fillp = function( np, lp ) {
   if ( this.il > -1 ) this.inptg[this.il].value = lp[1];
   this.inptg[this.ip].value = lp[2];
   if ( np > 1 ) {
      var il = this.il, ip = this.ip, inptg = this.inptg;
      fUL = inptg[ip].parentNode; var del = false;
      oSel = this.buildLoginMenu(np,lp); var oLi = document.createElement("LI");
      oLi.className  = 'lgn_menu'; fUL.appendChild(oLi); oLi.appendChild(oSel);
      oSel.addEventListener('change', function(){
            var isel = oSel.selectedIndex; var jl = 2*isel-1;
            if ( jl == 2*np+1 ) {
               del = !del; temp = oSel.getElementsByTagName("option");
               temp[isel].innerHTML = del ? "Don't Delete": "Delete entry";
               oSel.selectedIndex = 0;
            } else if ( jl > -1 ) {
              if ( del ) {
                 np--; var lptemp = new Array(2*np+1); lptemp[0] = np+'';
                 for( var i = 1; i < jl; i++ ) lptemp[i] = lp[i];
                 for( var i = jl+2; i < lp.length; i++ ) lptemp[i-2] = lp[i]; lp = lptemp;
                 setValue("logpass",lp,null);
                 if ( np == 1 ) oLi.removeChild(oSel);
                 else {
                    temp = oSel.getElementsByTagName("option"); oSel.removeChild(temp[isel]);
                    oSel.selectedIndex = 0;
                 }
              } else { inptg[il].value = lp[jl]; inptg[ip].value = lp[jl+1]; }
            } else { inptg[il].value = ""; inptg[ip].value = "" }
         },false);
   }
};

LogPwd.storelp = function( np, lp ) {
   var newlog = ( this.il == -1 ) ? "dummy": this.inptg[this.il].value,
       newpass = this.inptg[this.ip].value;
   if ( newpass.length == 0 ) {
      var foundlog = newlog.length > 0;
      for( var i = this.ip+1; i < this.inptg.length; i++ )
         if ( this.inptg[i].value.length > 0 ) {
            if ( foundlog ) { newpass = this.inptg[i].value; break; }
            else { foundlog = true; newlog = this.inptg[i].value; }
         }
   }
   if( newpass.length == 0 || newlog.length == 0 ) return;
   var jl = 0, jp;
   for( var i = 0; i < np; i++ ) {
      if( lp[2*i+1] == newlog ) { jl = 2*i+1; jp = jl+1; break; }
   }
   if ( jl == 0 ) {
      if( confirm(this.askstore) ) {
         var np1 = np+1; lp[0] = np1+'';
         lp.push(newlog,newpass); setValue("logpass",lp,null);
      } else {
         if( confirm(this.askneverstore) ) {
             var nostore = ["0"]; setValue("logpass",nostore,null);
         }
      }
   } else {
      if ( lp[jp] !== newpass && confirm(this.askpasstore+newlog) ) {
            lp[jp] = newpass; setValue("logpass",lp,null);
      }
   }
};

LogPwd.searchframes = function(doc) {
   var frtg = doc.getElementsByTagName("iframe");
   for ( var i = 0; i < frtg.length; i++ )
      var framedoc = frtg[i].contentDocument;
   var frtg1 = doc.getElementsByTagName("frame");
   for ( var i = 0; i < frtg1.length; i++ )
      var framedoc = frtg1[i].contentDocument;
};

LogPwd.dologpass = function(doc) {
   if ( this.findlp(doc) ) {
      var lp = getValue("logpass"), storepass = true, np = 0;
      if ( lp.length > 0 ) {
         np = parseInt(lp[0]); storepass = np > 0;
         if ( storepass ) this.fillp( np, lp );
      }
      if ( storepass ) {
         var frmdoc = doc.getElementsByTagName("form"), lpfrm = doc;
         for ( var i = 0; i < frmdoc.length; i++ ) {
            var frinp = frmdoc[i].getElementsByTagName("input"), found = false;
            for( var j = 0; j < frinp.length; j++ )
               if ( frinp[j].type == "password" ) { lpfrm = frmdoc[i]; found = true; break; }
            if ( found ) break;
         }
         lpfrm._onsubmit = lpfrm.onsubmit; lpfrm.onsubmit = null;
         lpfrm.addEventListener('submit',function() { LogPwd.storelp(np,lp); lpfrm._onsubmit(); }, false );
      }
   } else LogPwd.searchframes(doc);
};

LogPwd.fillogpwd = function( doc, login, pwd ) {
   if ( this.findlp(doc) ) {
      if ( this.il > -1 ) this.inptg[this.il].value = login;
      this.inptg[this.ip].value = pwd;
   } else LogPwd.searchframes(doc);
};

/*if(location.href.indexOf("http://www.averystrangelogin.com")==0) {
   LogPwd.fillogpwd(document,"mylogin","mypassword");
} else {*/
   LogPwd.dologpass(document);
//}


