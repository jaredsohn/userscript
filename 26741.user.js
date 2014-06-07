// ==UserScript==
// @name          	I2 Direct Linker
// @description   	Improved by TruePath originally Improved TGP Direct linker.
// @description	  	Bypasses bounces for links when possible. (
// @credits        	spicyburrito (http://userscripts.org/users/25824) did the real work I just fixed some simple bugs.
// @credits		   	spicyburrito: Props to Findlay Guy for the original script and rumkin.com for the base64 decoder.
// @author			TruePath ( http://infiniteinjury.org) but see credits for real authors
// @resource	   	update http://www.infiniteinjury.org/javascript/I2-DirectLinker.user.js
// @version		   	1.1
// @namespace      	http://infiniteinjury.org/I2_direct_linker
// @include
// ==/UserScript==

var allHrefs, thisHref;
var numHtmls = 0;
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
allHrefs = document.getElementsByTagName('a');

var ar, arr, temp, tempurl;

var clear_regexp = []
clear_regexp[0] = /^.{4}.*(http:[^&>"']+)/i
clear_regexp[1] = /(?:[?&]u|url)=([^&>"']+)/i

var base64_regexp = []
base64_regexp[0] = /cD0([^&>"']+)/i



for (var i = 0; i < allHrefs.length; i++)
{
	thisHref = allHrefs[i];
    var url = thisHref.href;
	
	if ((ar = clearMatch(url))) {thisHref.href = ar;}
	if ((ar = base64Match(url))) {thisHref.href = ar;}
	
}


function clearMatch(url) {
	for (var regx = 0; regx < clear_regexp.length; regx++) {
		ar = clear_regexp[regx].exec(url);
		if( ar ) {
			return URLDecode(ar[1]);
	    }
	}
	return false;
}


function base64Match (url) {
	for (var regx = 0; regx < base64_regexp.length; regx++) {
		ar = base64_regexp[regx].exec(url);
		if( ar ) {
			return URLDecode(ar[1]);
	    }
	}
	return false;
}

function URLDecode(encoded) 
{
   var HEXCHARS = "0123456789ABCDEFabcdef"; 
   var plaintext = "";
   var i = 0;
   while (i < encoded.length) {
       var ch = encoded.charAt(i);
	   if (ch == "+") {
	       plaintext += " ";
		   i++;
	   } else if (ch == "%") {
			if (i < (encoded.length-2) 
					&& HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 
					&& HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {
				plaintext += unescape( encoded.substr(i,3) );
				i += 3;
			} else {
				alert( 'Bad escape combination near ...' + encoded.substr(i) );
				plaintext += "%[ERROR]";
				i++;
			}
		} else {
		   plaintext += ch;
		   i++;
		}
	} 
	regexp = /aHR([^&>"']+)/i;
	ar = regexp.exec(plaintext);
	if(ar){
		plaintext = decode64(plaintext);
	}
   return plaintext;
};

var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split("");

var base64inv = {}; for (var i = 0; i < base64chars.length; i++) { base64inv[base64chars[i]] = i; }



function decode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }
   } while (i < input.length);

   return output;
}

// 
// function base64_decode (s)
//  {
//     var r = ""; 
//  
//    // remove/ignore any characters not in the base64 characters list -- particularly newlines
//    // s = s.replace(new RegExp('[^'+base64chars.join("")+']', 'g'), "");
//  	s = s.replace(/[^A-Za-z0-9\+\/\=]/g, "");
//    // increment over the length of this encrypted string, four characters at a time
//    for (var c = 0; c < s.length; c += 4) {
//  
//      // each of these four characters represents a 6-bit index in the base64 characters list
//      //  which, when concatenated, will give the 24-bit number for the original 3 characters
//      var n = (base64inv[s.charAt(c)] << 18) + base64inv[s.charAt(c+3)] +
//       (base64inv[s.charAt(c+1)] << 12) + (base64inv[s.charAt(c+2)] << 6);
//  
//      // split the 24-bit number into the original three 8-bit (ASCII) characters
//      r += String.fromCharCode((n >>> 16) & 255, (n >>> 8) & 255, n & 255);
//  
//      // remove any zero pad that was added to make this a multiple of 24 bits
//    } return r.substring(0, r.length - p.length);
//  }
