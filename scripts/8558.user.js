// ==UserScript==
// @name          Improved TGP Direct Linker
// @description	  Bypasses bounces for TGP links, and always takes you direct to the destination. Props to Findlay Guy for the original script and rumkin.com for the base64 decoder.
// @include       http://*
// ==/UserScript==

var allHrefs, thisHref;
var numHtmls = 0;
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

allHrefs = document.getElementsByTagName('a');

var regexp, temp, nurl;
for (var i = 0; i < allHrefs.length; i++) //allHrefs.length
{
	var ar = null;
	thisHref = allHrefs[i];
  var url = thisHref.href;

	//Is it ROT13 and Base64 Encoded?
    regexp = /=nUE0([^&>"']+)/i;
    ar = url.match(regexp);
	if( ar ) {
		thisHref.href = plain(decode64(rot13(ar[0].substr(1))));
		continue;
    }

	//Is it Base64 Encoded? Style 1
    regexp = /[=|~]aHR0([^&>"']+)/i;
    ar = url.match(regexp);
	if( ar ) {
		thisHref.href = plain(decode64(ar[0].substr(1)));
		continue;
    }

	//Is it Base64 Encoded? Style 2
    regexp = /=cD0([^&>"']+)/i;
    ar = url.match(regexp);
	if( ar ) {
		thisHref.href = plain(decode64(ar[0].substr(1)));
		continue;
    }

  temp = url.substr(url.indexOf('='));
  temp2 = rot13(decode64(temp.substr(1)));
  var count = 0;
  var valid = true;
  while( count < temp2.length) {  //Check if we have any unicode characters
    code = temp2.charCodeAt(count);
    count++;
    if( code < 65 || code > 122){   //We have one! this link is invalid
       valid = false;
       break;
    }else    //We don't, it converted right
       valid = true;
  }
  if( valid == false ) {  //if it's fucked up, then it's likely a plain link
  	//Looks like it's a simple one
  	temp = thisHref.href.replace(/\?/,"&").split("&");
  	for(k=1; k<temp.length; k++) {
  		regexp = /http([^&>"']+)/i;
  		ar = temp[k].match(regexp);
  		if( ar ) {
  			thisHref.href = plain(ar[0]);
  			break;
  	    }
  	}
  }else  //if it didn't, then it likely fits the archetype
    thisHref.href = plain(temp2);	
	
}

function plain(nurl) {
	regexp = /http/gi;
	ar = nurl.match(regexp).length;
  if (ar > 1)
		return unescape(nurl.substr(nurl.indexOf("http", 1)));
	else if (ar == 1) 
		return unescape(nurl);
	else
	  return unescape("http:\\" + nurl);
}

function decode64(inp) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
   inp = inp.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   do {
      enc1 = keyStr.indexOf(inp.charAt(i++));
      enc2 = keyStr.indexOf(inp.charAt(i++));
      enc3 = keyStr.indexOf(inp.charAt(i++));
      enc4 = keyStr.indexOf(inp.charAt(i++));

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
   } while (i < inp.length);

   return output;
}

function rot13(inp)
{
  var map = new Array();
  var s = "abcdefghijklmnopqrstuvwxyz";
  
  for (p=0; p<s.length; p++)
    map[s.charAt(p)] = s.charAt((p+13)%26);
  for (p=0; p<s.length; p++)
    map[s.charAt(p).toUpperCase()] = s.charAt((p+13)%26).toUpperCase();

  var out = "";
  for (p=0; p<inp.length; p++) {
      var letter = inp.charAt(p);
		if(letter >='A' && letter <= 'Z' || letter >='a' && letter <='z')
			out += map[letter];
		else
			out += letter;
	}
  return out;
}