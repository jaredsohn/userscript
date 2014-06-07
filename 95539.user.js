// ==UserScript==
// @name           sha256
// @namespace      sha256
// @description    sha256 finish
// ==/UserScript==

function sha256(s){
 
	var chrsz   = 8;
	var hexcase = 0;
 
	function safe_add (x, y) {
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l) {
		var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
		var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
		var W = new Array(64);
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + 15] = l;
 
		for ( var i = 0; i<m.length; i+=16 ) {
			a = HASH[0];
			b = HASH[1];
			c = HASH[2];
			d = HASH[3];
			e = HASH[4];
			f = HASH[5];
			g = HASH[6];
			h = HASH[7];
 
			for ( var j = 0; j<64; j++) {
				if (j < 16) W[j] = m[j + i];
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str) {
		var bin = Array();
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
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
	}
 
	function binb2hex (binarray) {
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
		}
		return str;
	}
 
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
 
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
			var result = arr.split("");
			for (var i = 0; i < result.length; i++)
				result[i] = result[i].charCodeAt(0);
			return result;
		}
		
		RC4.prototype.arrIntToString = function(arr) {
			var result = "";
			for(var i=0; i<arr.length; i++) {
				result += arr[i].charCodeAt(0);
			}
			return result;
		}
		
		RC4.prototype.arrIntToString1 = function(arr) {
			var result = "";
			for (var i=0; i<arr.length; i++) {
				result += String.fromCharCode(arr[i]);
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
					result[i/3] = text.substring(i,i+3);
					
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
        string = string.replace(/\r\n/g,"\n");
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
	engine.setEncryptionKey(sha256(key));
	//alert(hex_sha512(key));
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
