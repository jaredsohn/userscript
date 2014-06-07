// ==UserScript==
// @name           zapshare
// @namespace      zapshare
// @description    ZapShare dexryptor
// ==/UserScript==

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
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
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_sha1(s){return binb2hex(core_sha1(str2binb(s),s.length * chrsz));}
function b64_sha1(s){return binb2b64(core_sha1(str2binb(s),s.length * chrsz));}
function str_sha1(s){return binb2str(core_sha1(str2binb(s),s.length * chrsz));}
function hex_hmac_sha1(key, data){ return binb2hex(core_hmac_sha1(key, data));}
function b64_hmac_sha1(key, data){ return binb2b64(core_hmac_sha1(key, data));}
function str_hmac_sha1(key, data){ return binb2str(core_hmac_sha1(key, data));}

/*
 * Perform a simple self-test to see if the VM is working
 */
function sha1_vm_test()
{
  return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function core_sha1(x, len)
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
      else w[j] = rol(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
      e = d;
      d = c;
      c = rol(b, 30);
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
 * Calculate the HMAC-SHA1 of a key and some data
 */
function core_hmac_sha1(key, data)
{
  var bkey = str2binb(key);
  if(bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);	//menggabungkan data ipad dengan data str2binb(data)
  return core_sha1(opad.concat(hash), 512 + 160);
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
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert an 8-bit or 16-bit string to an array of big-endian words
 * In 8-bit function, characters >255 have their hi-byte silently ignored.
 */
function str2binb(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i%32);
  return bin;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (32 - chrsz - i%32)) & mask);
  return str;
}

/*
 * Convert an array of big-endian words to a hex string.
 */
function binb2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of big-endian words to a base-64 string
 */
function binb2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * (3 -  i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * (3 - (i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * (3 - (i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}



	function RC4(arg1) {
		this._text = arg1;
		this._m_sEncryptionKey		 = "";
		this._m_sEncryptionKeyAscii = "";
		this._m_nBoxLen = 255;
		this._m_nBox = new Array(this._m_nBoxLen);
		this._m_sInClearText	= "";
		this._m_sCryptedText	= "";
	}
	
	RC4.prototype._text;
	RC4.prototype._m_sEncryptionKey;
	RC4.prototype._m_sEncryptionKeyAscii;
	RC4.prototype._m_nBox;
	RC4.prototype._m_nBoxLen;
	RC4.prototype._m_sInClearText;
	RC4.prototype._m_sCryptedText;

	RC4.prototype.encrypt = function()
		{
			var toRet = true;
			var i=0;
			var j=0;

				//Encoding enc_default = Encoding.Default;
				//var input  = copyArray(this.getBytes(this._m_sInClearText));
				var input  = this._m_sInClearText;
				input = this.parseText(input);
				//alert (input);
				//print_r(input);
				// 
				// Output byte array
				//
				//byte[] output = new byte[input.Length];
				
				//
				// Local copy of m_nBoxLen
				//
				var n_LocBox = copyArray(this._m_nBox);
				
				//
				//	Len of Chipher
				//
				var ChipherLen = input.length + 1;

				//
				// Run Alghoritm
				//
				var output = new Array(input.length);
				for (var offset=0; offset<input.length; offset++)
				{
					i = ( i + 1 ) % this._m_nBoxLen;
					j = ( j + n_LocBox[i] ) %  this._m_nBoxLen; 
					temp =  n_LocBox[i];
					n_LocBox[i] = n_LocBox[j];
					n_LocBox[j] = temp;
					a = input[offset];
					b = n_LocBox[(n_LocBox[i]+n_LocBox[j])% this._m_nBoxLen];
					output[offset] = a^b;	
					//echo "output[offset] <br/>";
				}	
				
				//
				// Put result into output string ( CryptedText )
				//
				//outarrchar = new char[enc_default.GetCharCount(output,0,output.Length)];
				//enc_default.GetChars(output,0,output.Length,outarrchar,0);
				this._m_sCryptedText = this.arrIntToString1(output);
			

			//
			// return retcode
			//
			return  toRet ;

		}
		
		RC4.prototype.decrypt = function()
		{
			//
			// toRet is used to store function retcode
			//
			toRet = true;

				//this._m_sInClearText = this._m_sCryptedText;
				this._m_sCryptedText = "";
				this.encrypt();
				//m_sInClearText = m_sCryptedText;
			
		}
		
		RC4.prototype.getBytes = function(arr) {
			var result = arr.split("");		//split("") misal datanya -> "how are you?" menjadi "h,o,w, ,a,r,e, ,y,o,u,?"
			for (var i = 0; i < result.length; i++)
				result[i] = result[i].charCodeAt(0); //charCodeat(0) -> mengambil nilai unicode (misal A=65, B=66 ; a=97, b=98) dari string
			return result;
		}
		
		RC4.prototype.arrIntToString = function(arr) {
			var result = "";
			for(var i=0; i<arr.length; i++) {
				result += arr[i].charCodeAt(0);		//charCodeat(0) -> mengambil nilai unicode (misal A=65, B=66 ; a=97, b=98) dari string
			}
			return result;
		}
		
		RC4.prototype.arrIntToString1 = function(arr) {
			var result = "";
			for (var i=0; i<arr.length; i++) {
				result += String.fromCharCode(arr[i]);	//menkoversi nilai unicode ke karakter
			}
			return result;
		}
		
		RC4.prototype.setEncryptionKey = function(value)
		{
				//
				// assign value only if it is a new value
				//
				if ( this._m_sEncryptionKey != value )
				{	
					this._m_sEncryptionKey = value;

					//
					// Used to populate m_nBox
					//
					var index2 = 0;

					

					//
					// Perform the conversion of the encryption key from unicode to ansi
					//
					var asciiBytes = Utf8.decode(this._m_sEncryptionKey);
					//var asciiBytes = this._m_sEncryptionKey;
//alert(asciiBytes);
					//
					// Convert the new byte[] into a char[] and then to string
					//
					
					/*char[] asciiChars = new char[ascii.GetCharCount(asciiBytes,0,asciiBytes.Length)];
					ascii.GetChars(asciiBytes,0,asciiBytes.Length,asciiChars,0);
					this.m_sEncryptionKeyAscii = new string(asciiChars);*/
					this._m_sEncryptionKeyAscii = this.arrIntToString(asciiBytes.split(""));
					var asciiChars = this._m_sEncryptionKeyAscii;
					//alert(asciiChars);
					//print_r(asciiChars);
					//alert(asciiChars);

					//
					// Populate m_nBox
					//
					var KeyLen = this._m_sEncryptionKey.length;
					//alert(KeyLen);
					//
					// First Loop
					//
					for (var count=0; count<this._m_nBoxLen ; count++)
					{
						this._m_nBox[count] = count;
					}
					//alert(this._m_nBox);
					//
					// Second Loop
					//
					var a;
					for (var count=0; count<this._m_nBoxLen ;count++)
					{//if (count <10) alert(index2) ;
						//if (count <10) alert("index2="+index2+";"+"this._m_nBox[count]="+this._m_nBox[count]+";"+"asciiChars[count%KeyLen]="+asciiChars[count%KeyLen]) ;
						index2 = (index2 + this._m_nBox[count] + parseInt(asciiChars[count%KeyLen]))%this._m_nBoxLen;
						//if (count <10) alert("index2="+index2+";"+"this._m_nBox[count]="+this._m_nBox[count]+";"+"asciiChars[count%KeyLen]="+asciiChars[count%KeyLen]) ;
						//alert(asciiChars[count%KeyLen]);
					var temp		= this._m_nBox[count];
						this._m_nBox[count]	= this._m_nBox[index2];
						this._m_nBox[index2]	= temp;
						
						//echo count;
					}
					//alert(this._m_nBox);
				}
		}

		RC4.prototype.setInClearText = function(value)
		{
				//
				// assign value only if it is a new value
				//
				if (this._m_sInClearText	!= value)
				{	
					this._m_sInClearText	= value;
				}
		}

		RC4.prototype.setCryptedText = function(value)
		{
				//
				// assign value only if it is a new value
				//
				if ( this._m_sCryptedText != value )
				{	
					this._m_sCryptedText = value;
				}
		}
		
		RC4.prototype.getCryptedText = function()
		{
				return this._m_sCryptedText;
		}
		
		RC4.prototype.parseText = function(text)
		{
				var result = new Array(text.length/3);
				for (var i=0; i<text.length; i+=3)
					result[i/3] = text.substring(i,i+3);	//substring mengekstrak karakter dari sebuah string antara dua indikasi
					
				return result;
		}
		
		function copyArray(inArr)
		{
			var outArr = new Array(inArr.length);
			var i;
			for (i=0; i<outArr.length; i++)
			{
				outArr[i] = inArr[i];
			}
			return outArr;
		}
		
		function decodeBody()
		{
			var engine = new RC4("");
			var key = prompt("Please insert your key: ","");
			//engine.setEncryptionKey(key);
			var text = document.getElementById("body");
			text = text.substring(text.indexOf(":")+1,text.lastIndexOf(":"));
			engine.setInClearText(text);
			//alert (document.getElementById(id1).innerHTML);
			engine.decrypt();
			document.getElementById("body").innerHTML = engine.getCryptedText();
		}
		
		/**
*
* UTF-8 data encode / decode
* http://www.webtoolkit.info/
*
**/

var Utf8 = {

    // public method for url encoding
    encode : function (string) {
        string = string.replace(/\r\n/g,"\n");		//replace("micro","macro") mengganti tulisan micro dengan macro
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // public method for url decoding
    decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}

function GetInputKey() {
	var temp = prompt("Please insert your key: ","");
	return temp;
}

function Construct(hdtxt, bdtxt) {
	oScript = document.createElement('script');
	//oScript.setAttribute('type', 'text/javascript');
	//var txt = "function returnHome() {window.location.href='http://localhost/TA/php/index.php';}";
	//alert(hdtxt);
	oScript.appendChild( document.createTextNode(hdtxt));
	var o = document.getElementsByTagName("head")[0];
	o.appendChild(oScript);
	document.getElementById("body").innerHTML = bdtxt;
}

var engine = new RC4("");
var key = GetInputKey();
var destination = document.getElementById("destination").innerHTML;
destination = destination.substring(destination.indexOf(":")+1,destination.lastIndexOf(":"));
if(key == null) {
	window.location.href = destination+"index.php";
}/* else if (key == "") {
	window.location.href = destination+"index.php";
} */else {
	engine.setEncryptionKey(hex_sha1(key));
	//alert(hex_sha1(key));
	var headText = document.getElementById("head").innerHTML;
	headText = headText.substring(headText.indexOf(":")+1,headText.lastIndexOf(":"));
	engine.setInClearText(headText);
	//alert (document.getElementById(id1).innerHTML);
	engine.decrypt();
	var decryptedHead = engine.getCryptedText();
	
	var text = document.getElementById("body").innerHTML;
	text = text.substring(text.indexOf(":")+1,text.lastIndexOf(":"));
	engine.setInClearText(text);
	//alert (document.getElementById(id1).innerHTML);
	engine.decrypt();
	var decryptedBody = engine.getCryptedText();
	Construct(decryptedHead,decryptedBody);
	
}
