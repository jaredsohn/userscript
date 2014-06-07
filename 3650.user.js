// ==UserScript==
// @name          D25Decrypter make a blog entry as private entry for Yahoo!360
// @namespace     
// @description	  D25Decrypter make a blog entry as private entry for Yahoo!360
// @include       http://blog.360.yahoo.com/*
// @include       http://360.yahoo.com/*
// ==/UserScript==


// IMPORTANT ! PLEASE MODIFY YOUR SECRET KEY HERE BEFORE INSTALLING !!!
var key = 'your_key_goes_here';

var s1 = "This is my private writing<i title=\"";
var s2 = "\">.</i>";

var mark = ",/,/";

/*
	Duc Nguyen Mar.25, 2006
	(ducjava@gmail.com) - URL: http://www.mog4b.com
	Version 1.0
	Download session number: 00003
*/



















function TEAencrypt(plaintext, password)
{
    if (plaintext.length == 0) return('');  // nothing to encrypt
    // 'escape' plaintext so chars outside ISO-8859-1 work in single-byte packing, but  
    // keep spaces as spaces (not '%20') so encrypted text doesn't grow too long, and 
    // convert result to longs
    var v = strToLongs(escape(plaintext).replace(/%20/g,' '));
    if (v.length == 1) v[1] = 0;  // algorithm doesn't work for n<2 so fudge by adding nulls
    var k = strToLongs(password.slice(0,16));  // simply convert first 16 chars of password as key
    var n = v.length;

    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = 0;

    while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum>>>2 & 3;
        for (var p = 0; p < n-1; p++) {
            y = v[p+1];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z)
            z = v[p] += mx;
        }
        y = v[0];
        mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z)
        z = v[n-1] += mx;
    }
    // note use of >>> in place of >> due to lack of 'unsigned' type in JavaScript 

    return escCtrlCh(longsToStr(v));
}

function TEAdecrypt(ciphertext, password)
{
    if (ciphertext.length == 0) return('');
    var v = strToLongs(unescCtrlCh(ciphertext));
    var k = strToLongs(password.slice(0,16)); 
    var n = v.length;

    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = q*delta;

    while (sum != 0) {
        e = sum>>>2 & 3;
        for (var p = n-1; p > 0; p--) {
            z = v[p-1];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z)
            y = v[p] -= mx;
        }
        z = v[n-1];
        mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z)
        y = v[0] -= mx;
        sum -= delta;
    }

    var plaintext = longsToStr(v);
    // strip trailing null chars resulting from filling 4-char blocks:
    if (plaintext.search(/\0/) != -1) plaintext = plaintext.slice(0, plaintext.search(/\0/));

    return unescape(plaintext);
}

// supporting functions
function strToLongs(s) {  // convert string to array of longs, each containing 4 chars
    // note chars must be within ISO-8859-1 (with Unicode code-point < 256) to fit 4/long
    var l = new Array(Math.ceil(s.length/4))
    for (var i=0; i<l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as 
        // it is the same in longsToStr() 
        l[i] = s.charCodeAt(i*4) + (s.charCodeAt(i*4+1)<<8) + 
               (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24);
    }
    return l;  // note running off the end of the string generates nulls since 
}              // bitwise operators treat NaN as 0

function longsToStr(l) {  // convert array of longs back to string
    var a = new Array(l.length);
    for (var i=0; i<l.length; i++) {
        a[i] = String.fromCharCode(l[i] & 0xFF, l[i]>>>8 & 0xFF, 
                                   l[i]>>>16 & 0xFF, l[i]>>>24 & 0xFF);
    }
    return a.join('');  // use Array.join() rather than repeated string appends for efficiency
}

function escCtrlCh(str) {  // escape control chars which might cause problems with encrypted texts
    return str.replace(/[\0\n\v\f\r\xa0!]/g, function(c) { return '!' + c.charCodeAt(0) + '!'; });
}

function unescCtrlCh(str) {  // unescape potentially problematic nulls and control characters
    return str.replace(/!\d\d?\d?!/g, function(c) { return String.fromCharCode(c.slice(1,-1)); });
}

function decodeMyHtml(text) {     
     text = text.replace(/&amp;/g,"&");     
     return (text);
   } 

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

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

var Type = 'Z';
function StartFloat() {
	if(document.all) {
		document.all.AdFloater.style.pixelLeft = document.body.clientWidth - document.all.AdFloater.offsetWidth;
		document.all.AdFloater.style.visibility = 'visible';
		Type = 'A';
		}
	else if(document.layers) {
		document.AdFloater.left = window.innerWidth - document.AdFloater.clip.width - 16;
		document.AdFloater.visibility = 'show';
		Type = 'B';
		}
	else if(document.getElementById) {
		document.getElementById('AdFloater').style.left = (window.innerWidth - 35) + 'px';
		document.getElementById('AdFloater').style.visibility = 'visible';
		Type = 'C';
		}
	if (document.all) { window.onscroll = Float; }
	else { setInterval('Float()', 100); }
	}
	function Float() {
	if (Type == 'A') { document.all.AdFloater.style.pixelTop = document.body.scrollTop; }
	else if (Type == 'B') { document.AdFloater.top = window.pageYOffset; }
	else if (Type == 'C') { document.getElementById('AdFloater').style.top = window.pageYOffset + 'px'; }
}

function addEvent(oTarget, sEventName, fCallback, bCapture) {
	var bReturn = false;
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventName, fCallback, bCapture);
		bReturn = true;
	} else if (oTarget.attachEvent) {
		bReturn = oTarget.attachEvent('on' + sEventName, fCallback);
	}
	return bReturn;
}

function encr()
{
	var si = document.getElementById('sinput');	
	var s = TEAencrypt(si.value, document.getElementById('key').value);			
	s = s1 + mark + encode64(s) + mark + s2;
	
	si.value = s;
	si.focus();
	si.select();
}

function decr() {
	var si = document.getElementById('sinput').value;
	// Remove heads & tails, only remain encrypted text
	si = si.replace(mark, '').replace(mark, '').replace(s1, '').replace(s2, '');
	si = decode64(si);

	var s = TEAdecrypt(si, document.getElementById('key').value);			
	// s = s.replace(/<br>/, '\n');
	
	document.getElementById('sinput').value = s;
}
	
/* Decrypt private msg on Blog */

var arr = document.getElementsByTagName ("div");
for (var i=0; i < arr.length; i++)
{
	var innerH = arr [i].innerHTML;
	
	// inject floating form into Edit Blog page.
	if ( location.href.indexOf("compose") >= 0 && arr [i].className == "foot" ) {
		// document.getElementsByTagName ("head")[0].innerHTML += "<script type='text/javascript' language='JavaScript' src='http://www.mog4b.com/y360.js'></script>";
		
		// arr [i].innerHTML += "<table width='90%' bgcolor='white' border=1><tr><td>";
		arr [i].innerHTML += "Your key: <input type='password' id='key' value=''><br>";
		arr [i].innerHTML += "Paste your HTML here & encrypt it !<br>";
		arr [i].innerHTML += "<textarea cols=40 rows=5 id='sinput' onclick='this.select();'></textarea><br>";
		arr [i].innerHTML += "<input id='bencr' type='button' value='Encrypt'>&nbsp;&nbsp;&nbsp;";
		arr [i].innerHTML += "<input type='button' id='bdecr' value='Decrypt'><br>";
		// arr [i].innerHTML += "</td></tr></table>";
		
		addEvent(document.getElementById("bencr"), 'click', encr, true);
		addEvent(document.getElementById("bdecr"), 'click', decr, true);
	}
	
	// find private msg & decrypt them
	if ( arr [i].className == "content-wrapper" )
	{	
		var pos = innerH.indexOf (mark);
		if ( pos >= 0 )
		{
			var pos2 = innerH.lastIndexOf (mark);
			var encryptedText = innerH.substring (pos + mark.length, pos2);
			
			arr [i].innerHTML = innerH + "<HR>" + TEAdecrypt (decode64 (encryptedText), key);
		}
	}
}