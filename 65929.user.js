// ==UserScript==
// @name          	Freelancer - Highligh Bid
// @namespace		http://www.vietcms.com
// @description    	
// @include       	https://www.getafreelancer.com/projects/*/*
// @include       	https://www.getafreelancer.com/projects/*
// @include       	https://www.freelancer.com/projects/*/*
// @include       	https://www.freelancer.com/projects/*
// ==/UserScript==

//region String

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param utf8encode optional parameter, if set to true Unicode string is encoded to UTF8 before 
 *                   conversion to base64; otherwise string is assumed to be 8-bit characters
 * @return           base64-encoded string
 */ 
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

String.prototype.encodeBase64 = function(utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
   
  plain = utf8encode ? this.encodeUTF8() : this;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into b64 string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param utf8decode optional parameter, if set to true UTF8 string is decoded back to Unicode  
 *                   after conversion from base64
 * @return           decoded string
 */ 
String.prototype.decodeBase64 = function(utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;

  coded = utf8decode ? this.decodeUTF8() : this;
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
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
  plain = d.join('');  // join() is far faster than repeated string concatenation
   
  return utf8decode ? plain.decodeUTF8() : plain; 
}

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only) (instance method extending String object).
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @return encoded string
 */
String.prototype.encodeUTF8 = function() {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var str = this.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  str = str.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return str;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 * (instance method extending String object).
 *
 * @return decoded string
 */
String.prototype.decodeUTF8 = function() {
  var str = this.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  str = str.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  return str;
}

//endregion

//region script
window.addEventListener("load", function(e) {
	try
	{
		currentUsername = "";
		var divs = document.getElementsByClassName('serviceProviderDetails');
		
		if("" + divs != 'null')
		{
			var lls = document.getElementsByTagName('a');
			for(var i = 0; i < lls.length; i++)
			{
				var a = lls[i];
				if(a.href == 'https://www.getafreelancer.com/users/manage.php')
				{
					var spans = a.getElementsByTagName('span');
					var span = spans[0];
					currentUsername = span.innerHTML;
					currentUsername = currentUsername.substr(0, currentUsername.length - 1);
					break;
				}
			}
			for(var i = 0; i < divs.length; i++)
			{
				var div = divs[i];
				var as = div.getElementsByTagName('a');
				var username = as[0].innerHTML;
				if(username == currentUsername)
				{
					div.style.backgroundColor = '#222222';
					div.style.color = 'red';
				}
			}
		}
		//*/
	}
	catch(e)
	{
		//alert(e.message);
	}
}, false);
//endregion