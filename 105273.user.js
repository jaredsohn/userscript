// ==UserScript==
// @name			Diversify
// @description		Diversify generates a unique password per account you have, based on the master password and the name of the service you want to create an account for.
// @namespace		OlivierDeckersScripts
// @autor			Olivier Deckers
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include			*
// @date			21/06/2011
// @version			1.0
// ==/UserScript==

//base-64 version of the icon
var odeckers_diversify_image = "data:image/png;base64,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";


$(document).ready(function() {
	if($('input:password').size() == 0) // No password fields, so no need to bother the user with the icon
		return false;
	
	//add icon and form to the html page
	$('body').append('<div style="position:fixed; top:0px; right:10px; width:20px; height:20px; z-index:32;"><img id="odeckers_diversify_icon" src="'+odeckers_diversify_image+'"/></div>');
	$('body').append('<div id="odeckers_diversify_container" style="position:fixed; top:200px; background-color:white; z-index:32; border:5px solid black; -moz-border-radius:15px; -webkit-border-radius:15px; padding:5px;">' + 
	'<h1 class="test" style="text-align:center; width:100%;">Diversify</h1>' + 
	'<form name="odeckers_diversify_form" action="#" onSubmit="javascript:return false;">' + 
	'<table width="300" border="0"> ' +
    '<tr> ' +
    '    <td width="190">Master Password</td> ' +
    '    <td width="200" align="center">' +
	'		<input name="master" type="password" autocomplete="off" />' +
	'	</td> ' +
    '</tr> ' +
    '<tr> ' +
	'	<td>Service name</td> ' +
	'	<td align="center">' +
	'		<input name="site"/>' +
	'	</td> ' +
    '</tr> ' +
    '<tr> ' +
	'	<td>Password Length</td> ' +
	'	<td align="center"><input name="secnum" value="14" /></td> ' +
    '</tr> ' +
    '<tr> ' +
	'	<td align="center" colspan ="2"><input type="submit" value="Generate" /></td> ' +
    '</tr> ' +
    '</table> ' +
	'</form>' +
	'</div>');
	//position the form in the center of the page and hide it from sight
	$('div#odeckers_diversify_container').css('left', ''+$(window).width()/2 - $('div#odeckers_diversify_container').width()/2);
	$('div#odeckers_diversify_container').hide();
	//preset the service name based on the url
	getUrl(window.location.href);
	
	//when icon is clicked, show/hide the form and focus the password field
	$('img#odeckers_diversify_icon').click(function() {
		$('div#odeckers_diversify_container').toggle('slow');
		document.forms.namedItem("odeckers_diversify_form").elements.namedItem("master").focus();
	});
	
	//when form is submitted, put the hashed version of the password in every password field and hide the form
	$('div#odeckers_diversify_container form').submit(function() {
		var form = document.forms.namedItem("odeckers_diversify_form");
		var master = form.elements.namedItem("master");
		var site = form.elements.namedItem("site");
		var secnum = form.elements.namedItem("secnum");
		
		var hash = 
		(b64_hmac_sha1(b64_hmac_sha1(master.value,secnum.value) , site.value) + 
		b64_hmac_sha1(b64_hmac_sha1(master.value,site.value) , secnum.value) + 
		b64_hmac_sha1(b64_hmac_sha1(site.value,master.value) , secnum.value) + 
		b64_hmac_sha1(b64_hmac_sha1(site.value,secnum.value) , master.value) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,site.value) , master.value) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,master.value) , site.value) +
		b64_hmac_sha1(master.value,b64_hmac_sha1(secnum.value , site.value)) + 
		b64_hmac_sha1(master.value,b64_hmac_sha1(site.value , secnum.value)) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(master.value , secnum.value)) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(secnum.value , master.value)) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(site.value , master.value)) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(master.value , site.value)) +
		b64_hmac_sha1(b64_hmac_sha1(master.value,secnum.value) , b64_sha1(site.value)) + 
		b64_hmac_sha1(b64_hmac_sha1(master.value,site.value) , b64_sha1(secnum.value)) + 
		b64_hmac_sha1(b64_hmac_sha1(site.value,master.value) , b64_sha1(secnum.value)) + 
		b64_hmac_sha1(b64_hmac_sha1(site.value,secnum.value) , b64_sha1(master.value)) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,site.value) , b64_sha1(master.value)) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,master.value) , b64_sha1(site.value)) +
		b64_hmac_sha1(master.value,b64_hmac_sha1(secnum.value , b64_sha1(site.value))) + 
		b64_hmac_sha1(master.value,b64_hmac_sha1(site.value , b64_sha1(secnum.value))) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(master.value , b64_sha1(secnum.value))) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(secnum.value , b64_sha1(master.value))) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(site.value , b64_sha1(master.value))) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(master.value , b64_sha1(site.value))) +
		b64_hmac_sha1(b64_hmac_sha1(master.value,b64_sha1(secnum.value)) , site.value) +
		b64_hmac_sha1(b64_hmac_sha1(master.value,b64_sha1(site.value)) , secnum.value) +
		b64_hmac_sha1(b64_hmac_sha1(site.value,b64_sha1(master.value)) , secnum.value) + 
		b64_hmac_sha1(b64_hmac_sha1(site.value,b64_sha1(secnum.value)) , master.value) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,b64_sha1(site.value)) , master.value) + 
		b64_hmac_sha1(b64_hmac_sha1(secnum.value,b64_sha1(master.value)) , site.value) +
		b64_hmac_sha1(master.value,b64_hmac_sha1(b64_sha1(secnum.value) , site.value)) + 
		b64_hmac_sha1(master.value,b64_hmac_sha1(b64_sha1(site.value) , secnum.value)) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(b64_sha1(master.value) , secnum.value)) + 
		b64_hmac_sha1(site.value,b64_hmac_sha1(b64_sha1(secnum.value) , master.value)) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(b64_sha1(site.value) , master.value)) + 
		b64_hmac_sha1(secnum.value,b64_hmac_sha1(b64_sha1(master.value) , site.value)) +
		b64_hmac_sha1(b64_hmac_sha1(b64_sha1(secnum.value),b64_hmac_sha1(b64_sha1(master.value) , b64_sha1(site.value))),
		b64_hmac_sha1(b64_sha1(secnum.value),b64_hmac_sha1(b64_sha1(master.value) , b64_sha1(site.value))))
		).substr(0,secnum.value);

		$('input:password').val(hash);
		$('div#odeckers_diversify_container').hide();
	});
});

//determine the service name based on the url
function getUrl(url) {
	if(url.indexOf("://") != -1) {
		url = url.split('//');
		url = url[1];
	}
	if(url.indexOf("/") != -1) {
		url = url.split('/');
		url = url[0];
	}
	url = url.split('.');
	url = url[url.length-2]
	document.forms.namedItem("odeckers_diversify_form").elements.namedItem("site").value=url;
}

// everything below is a javascript implementation of SHA-1

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS 180-1
 * Version 2.2 Copyright Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */
 
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
 
/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s)    { return rstr2hex(rstr_sha1(str2rstr_utf8(s))); }
function b64_sha1(s)    { return rstr2b64(rstr_sha1(str2rstr_utf8(s))); }
function any_sha1(s, e) { return rstr2any(rstr_sha1(str2rstr_utf8(s)), e); }
function hex_hmac_sha1(k, d)
  { return rstr2hex(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function b64_hmac_sha1(k, d)
  { return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d))); }
function any_hmac_sha1(k, d, e)
  { return rstr2any(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)), e); }
 
/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc").toLowerCase() == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
 
/*
 * Calculate the SHA1 of a raw string
 */
function rstr_sha1(s)
{
  return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}
 
/*
 * Calculate the HMAC-SHA1 of a key and some data (raw strings)
 */
function rstr_hmac_sha1(key, data)
{
  var bkey = rstr2binb(key);
  if(bkey.length > 16) bkey = binb_sha1(bkey, key.length * 8);
 
  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }
 
  var hash = binb_sha1(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
  return binb2rstr(binb_sha1(opad.concat(hash), 512 + 160));
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
  var remainders = Array();
  var i, q, x, quotient;
 
  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for(i = 0; i < dividend.length; i++)
  {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }
 
  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. We stop when the dividend is zero.
   * All remainders are stored for later use.
   */
  while(dividend.length > 0)
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
    remainders[remainders.length] = x;
    dividend = quotient;
  }
 
  /* Convert the remainders to the output string */
  var output = "";
  for(i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);
 
  /* Append leading zero equivalents */
  var full_length = Math.ceil(input.length * 8 /
                                    (Math.log(encoding.length) / Math.log(2)))
  for(i = output.length; i < full_length; i++)
    output = encoding[0] + output;
 
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
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input)
{
  var output = Array(input.length >> 2);
  for(var i = 0; i < output.length; i++)
    output[i] = 0;
  for(var i = 0; i < input.length * 8; i += 8)
    output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
  return output;
}
 
/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input)
{
  var output = "";
  for(var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
  return output;
}
 
/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << (24 - len % 32);
  x[((len + 64 >> 9) << 4) + 15] = len;
 
  var w = Array(80);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  var e = -1009589776;
 
  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    var olde = e;
 
    for(var j = 0; j < 80; j++)
    {
      if(j < 16) w[j] = x[i + j];
      else w[j] = bit_rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = bit_rol(b, 30);
      b = a;
      a = t;
    }
 
    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
    e = safe_add(e, olde);
  }
  return Array(a, b, c, d, e);
 
}
 
/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t, b, c, d)
{
  if(t < 20) return (b & c) | ((~b) & d);
  if(t < 40) return b ^ c ^ d;
  if(t < 60) return (b & c) | (b & d) | (c & d);
  return b ^ c ^ d;
}
 
/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t)
{
  return (t < 20) ?  1518500249 : (t < 40) ?  1859775393 :
         (t < 60) ? -1894007588 : -899497514;
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
