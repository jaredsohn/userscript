// JDownloader Click N' Load user script
// version 1.1
// 2010-11-04
// Copyright (c) ObiOne
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// JDownloader Click N' Load user script
// version 1.1
// 2010-11-04
// Copyright (c) 2010, Andrew Jordan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "JDownloader Click N' Load", and click Uninstall.
//
// Please note that Google Chrome has built in support for Greasemonkey Scripts
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Click N' Load User Script
// @namespace     none
// @description   Turn links for file hosting sites into JDownloader Click N' Load Links
// @version 	  1.1.11082010
// @include       *
// @exclude 	  http://www.megaupload.com/*  
// @exclude		  http://www.rapidshare.com/*
// @exclude		  http://www.google.com/*
// @exclude		  http://www.yahoo.com/*
// @copyright     2010 Andrew Jordan
//
// @history		  1.1.11082010 Bug Fixes: Fixed the problem causing the script to break when no
//								password was found
//								Fixed the problem in Firefox causing individual links to not be added to JDownloader
// @history		  1.1.11042010 Added password extractor
// @history		  1.0.11032010 Script now works completly locally, no need for the server redirect. 
//							    Added button to add all links to Jdownloader
// @history		  0.5.06262010 Fixed auto-form submission bug, not passing all form parameters.
// @history		  0.4.06252010 Added redirection for all megaupload links on click.
// @history		  0.3.06252010 Added Javascript form generation based off of the megaupload link.
// @history 	  0.2.06242010 Added Javscript based encryption to eliminate use of the external PHP script.
// @history 	  0.0.06192010 Sniff Megaupload links and redirect to a custom download page.
//
// @todo		  Add Checkboxes next to links to make it easier to add multiple links
// @todo		  Create a method of making AJAX calls to JDownloader to eliminate a new window being opened.
// @todo		  Create a method of checking to see if JDownloader is running
// ==/UserScript==

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
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

	output = output +
	keyStr.charAt(enc1) +
	keyStr.charAt(enc2) +
	keyStr.charAt(enc3) +
	keyStr.charAt(enc4);
	chr1 = chr2 = chr3 = "";
	enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
}

function decode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	
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
		
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	
	} while (i < input.length);
	
	return output;
}
/*
 * ecmaScrypt - Cryptography Tools for JavaScript
 * 
 * Copyright (c) 2007 	Josh Davis ( http://www.josh-davis.org ),
 * 			Laurent Haan ( http://www.progressive-coding.com ),
 * 			Johan Sundstrom ( http://ecmanaut.blogspot.com ),
 * 			John Resig ( http://ejohn.org )
 * 
 * Licensed under the MIT License ( http://www.opensource.org/licenses/mit-license.php ) as follows:
 * 
 * sha2 portions adapted from jsSHA2 ( http://anmar.eu.org/projects/jssha2/ )
 * Copyright Angel Marin 2003-2004 - http://anmar.eu.org/
 * Distributed under the BSD License
 */

var ecmaScrypt = {
	// encodes a unicode string to UTF8 (8 bit characters are critical to AES functioning properly)
	encode_utf8:function(s)
	{
		try{return unescape(encodeURIComponent(s));}
		catch(e){throw 'error during utf8 encoding: ecmaScrypt.encode_utf8.';}
	},
	
	// decodes a UTF8 string back to unicode
	decode_utf8:function(s)
	{
		try{return decodeURIComponent(escape(s));}
		catch(e){throw('error during utf8 decoding: ecmaScrypt.decode_utf8. The most likely cause of this is attempting to decrypt with incorrect key or iv, or with the wrong mode.');}
	},
	
	//convert a number array to a hex string
	toHex:function()
	{
		var array = [];
		if(arguments.length == 1 && arguments[0].constructor == Array)
			array = arguments[0];
		else
			array = arguments;
		var ret = '';
		for(var i = 0;i < array.length;i++)
			ret += (array[i] < 16 ? '0' : '') + array[i].toString(16);
		return ret.toLowerCase();
	},
	
	//convert a hex string to a number array
	toNumbers:function(s)
	{
		var ret = [];
		s.replace(/(..)/g,function(s){
			ret.push(parseInt(s,16));
		});
		return ret;
	},
	
	// get a random number in the range [min,max]
	getRandom:function(min,max)
	{
		if(min === null)
			min = 0;
		if(max === null)
			max = 1;
		return Math.round(Math.random()*max) + min;
	},
	
	generateSharedKey:function(len)
	{
		if(len === null)
			len = 16;
		var key = [];
		for(var i = 0; i < len*2; i++)
			key.push(this.getRandom(0,255));
		return key;
	},
	
	generatePrivateKey:function(s,size)
	{
		var sha = this.sha2.arr_sha256(s);
		return sha.slice(0,size);
	},
	
	sha2:{
		chrsz:8,  /* bits per input character. 8 - ASCII; 16 - Unicode      */
		hexcase:0,/* hex output format. 0 - lowercase; 1 - uppercase        */
		safe_add:function(x, y)
		{
			var lsw = (x & 0xFFFF) + (y & 0xFFFF);
			var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
			return (msw << 16) | (lsw & 0xFFFF);
		},
		S:function(X, n) {return ( X >>> n ) | (X << (32 - n));},
		R:function(X, n) {return ( X >>> n );},
		Ch:function(x, y, z) {return ((x & y) ^ ((~x) & z));},
		Maj:function(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));},
		Sigma0256:function(x) {return (this.S(x, 2) ^ this.S(x, 13) ^ this.S(x, 22));},
		Sigma1256:function(x) {return (this.S(x, 6) ^ this.S(x, 11) ^ this.S(x, 25));},
		Gamma0256:function(x) {return (this.S(x, 7) ^ this.S(x, 18) ^ this.R(x, 3));},
		Gamma1256:function(x) {return (this.S(x, 17) ^ this.S(x, 19) ^ this.R(x, 10));},
		core_sha256:function(m, l)
		{
			var K = [	0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,
					0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,
					0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,
					0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,
					0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,
					0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,
					0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,
					0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];
			var HASH = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
			var W = [];
			var a, b, c, d, e, f, g, h, i, j;
			var T1, T2;
			
			/* append padding */
			m[l >> 5] |= 0x80 << (24 - l % 32);
			m[((l + 64 >> 9) << 4) + 15] = l;
			
			for ( var i = 0; i<m.length; i+=16 )
			{
				a = HASH[0];
				b = HASH[1];
				c = HASH[2];
				d = HASH[3];
				e = HASH[4];
				f = HASH[5];
				g = HASH[6];
				h = HASH[7];
				
				for ( var j = 0; j<64; j++)
				{
					if (j < 16)
						W[j] = m[j + i];
					else
						W[j] = this.safe_add(this.safe_add(this.safe_add(this.Gamma1256(W[j - 2]), W[j - 7]), this.Gamma0256(W[j - 15])), W[j - 16]);
					
					T1 = this.safe_add(this.safe_add(this.safe_add(this.safe_add(h, this.Sigma1256(e)), this.Ch(e, f, g)), K[j]), W[j]);
					T2 = this.safe_add(this.Sigma0256(a), this.Maj(a, b, c));
					
					h = g;
					g = f;
					f = e;
					e = this.safe_add(d, T1);
					d = c;
					c = b;
					b = a;
					a = this.safe_add(T1, T2);
				}
				
				HASH[0] = this.safe_add(a, HASH[0]);
				HASH[1] = this.safe_add(b, HASH[1]);
				HASH[2] = this.safe_add(c, HASH[2]);
				HASH[3] = this.safe_add(d, HASH[3]);
				HASH[4] = this.safe_add(e, HASH[4]);
				HASH[5] = this.safe_add(f, HASH[5]);
				HASH[6] = this.safe_add(g, HASH[6]);
				HASH[7] = this.safe_add(h, HASH[7]);
			}
			return HASH;
		},
		
		str2binb:function(str)
		{
			var bin = [];
			var mask = (1 << this.chrsz) - 1;
			for(var i = 0; i < str.length * this.chrsz; i += this.chrsz)
			bin[i>>5] |= (str.charCodeAt(i / this.chrsz) & mask) << (24 - i%32);
			return bin;
		},
		
		binb2str:function(bin)
		{
			var str = "";
			var mask = (1 << this.chrsz) - 1;
			for(var i = 0; i < bin.length * 32; i += this.chrsz)
			str += String.fromCharCode((bin[i>>5] >>> (24 - i%32)) & mask);
			return str;
		},
		
		binb2arr:function(bin)
		{
			var array = [];
			var mask = (1 << this.chrsz) - 1;
			for(var i = 0; i < bin.length * 32; i += this.chrsz)
			array.push((bin[i>>5] >>> (24 - i%32)) & mask);
			return array;
		},
		
		binb2hex:function(binarray)
		{
			var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
			var str = "";
			for(var i = 0; i < binarray.length * 4; i++)
			{
				str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
				hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
			}
			return str;
		},

		hex_sha256:function(s){return this.binb2hex(this.core_sha256(this.str2binb(s),s.length * this.chrsz));},
		arr_sha256:function(s){return this.binb2arr(this.core_sha256(this.str2binb(s),s.length * this.chrsz));},
		str_sha256:function(s){return this.binb2str(this.core_sha256(this.str2binb(s),s.length * this.chrsz));}
	},
	
	/*
	 * START AES SECTION
	 */
	aes:{
		// structure of valid key sizes
		keySize:{
			SIZE_128:16,
			SIZE_192:24,
			SIZE_256:32
		},
		
		// Rijndael S-box
		sbox:[
		0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
		0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
		0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
		0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
		0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
		0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
		0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
		0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
		0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
		0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
		0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
		0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
		0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
		0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
		0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
		0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16 ],
		
		// Rijndael Inverted S-box
		rsbox:
		[ 0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb
		, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb
		, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e
		, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25
		, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92
		, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84
		, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06
		, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b
		, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73
		, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e
		, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b
		, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4
		, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f
		, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef
		, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61
		, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d ],
		
		/* rotate the word eight bits to the left */
		rotate:function(word)
		{
			var c = word[0];
			for (var i = 0; i < 3; i++)
				word[i] = word[i+1];
			word[3] = c;
			
			return word;
		},
		
		// Rijndael Rcon
		Rcon:[
		0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
		0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3,
		0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
		0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d,
		0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab,
		0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
		0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25,
		0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01,
		0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
		0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa,
		0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a,
		0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
		0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
		0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef,
		0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
		0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04,
		0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f,
		0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
		0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33,
		0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb ],
		
		// Key Schedule Core
		core:function(word,iteration)
		{
			/* rotate the 32-bit word 8 bits to the left */
			word = this.rotate(word);
			/* apply S-Box substitution on all 4 parts of the 32-bit word */
			for (var i = 0; i < 4; ++i)
				word[i] = this.sbox[word[i]];
			/* XOR the output of the rcon operation with i to the first part (leftmost) only */
			word[0] = word[0]^this.Rcon[iteration];
			return word;
		},
		
		/* Rijndael's key expansion
		 * expands an 128,192,256 key into an 176,208,240 bytes key
		 *
		 * expandedKey is a pointer to an char array of large enough size
		 * key is a pointer to a non-expanded key
		 */
		expandKey:function(key,size,expandedKeySize)
		{
			/* current expanded keySize, in bytes */
			var currentSize = 0;
			var rconIteration = 1;
			var t = [];   // temporary 4-byte variable
			
			var expandedKey = [];
			for(var i = 0;i < expandedKeySize;i++)
				expandedKey[i] = 0;
		
			/* set the 16,24,32 bytes of the expanded key to the input key */
			for (var j = 0; j < size; j++)
				expandedKey[j] = key[j];
			currentSize += size;
		
			while (currentSize < expandedKeySize)
			{
				/* assign the previous 4 bytes to the temporary value t */
				for (var k = 0; k < 4; k++)
					t[k] = expandedKey[(currentSize - 4) + k];
		
				/* every 16,24,32 bytes we apply the core schedule to t
				 * and increment rconIteration afterwards
				 */
				if(currentSize % size == 0)
					t = this.core(t, rconIteration++);
		
				/* For 256-bit keys, we add an extra sbox to the calculation */
				if(size == this.keySize.SIZE_256 && ((currentSize % size) == 16))
					for(var l = 0; l < 4; l++)
						t[l] = this.sbox[t[l]];
		
				/* We XOR t with the four-byte block 16,24,32 bytes before the new expanded key.
				 * This becomes the next four bytes in the expanded key.
				 */
				for(var m = 0; m < 4; m++) {
					expandedKey[currentSize] = expandedKey[currentSize - size] ^ t[m];
					currentSize++;
				}
			}
			return expandedKey;
		},
		
		// Adds (XORs) the round key to the state
		addRoundKey:function(state,roundKey)
		{
			for (var i = 0; i < 16; i++)
				state[i] ^= roundKey[i];
			return state;
		},
		
		// Creates a round key from the given expanded key and the
		// position within the expanded key.
		createRoundKey:function(expandedKey,roundKeyPointer)
		{
			var roundKey = [];
			for (var i = 0; i < 4; i++)
				for (var j = 0; j < 4; j++)
					roundKey[j*4+i] = expandedKey[roundKeyPointer + i*4 + j];
			return roundKey;
		},
		
		// galois multiplication of 8 bit characters a and b
		galois_multiplication:function(a,b)
		{
			var p = 0;
			for(var counter = 0; counter < 8; counter++)
			{
				if((b & 1) == 1)
					p ^= a;
				if(p > 0x100) p ^= 0x100;
				var hi_bit_set = (a & 0x80); //keep p 8 bit
				a <<= 1;
				if(a > 0x100) a ^= 0x100; //keep a 8 bit
				if(hi_bit_set == 0x80)
					a ^= 0x1b;
				if(a > 0x100) a ^= 0x100; //keep a 8 bit
				b >>= 1;
				if(b > 0x100) b ^= 0x100; //keep b 8 bit
			}
			return p;
		},
		
		/* substitute all the values from the state with the value in the SBox
		 * using the state value as index for the SBox
		 */
		subBytes:function(state,isInv)
		{
			for (var i = 0; i < 16; i++)
				state[i] = isInv?this.rsbox[state[i]]:this.sbox[state[i]];
			return state;
		},
		
		/* iterate over the 4 rows and call shiftRow() with that row */
		shiftRows:function(state,isInv)
		{
			for (var i = 0; i < 4; i++)
				state = this.shiftRow(state,i*4, i,isInv);
			return state;
		},
		
		/* each iteration shifts the row to the left by 1 */
		shiftRow:function(state,statePointer,nbr,isInv)
		{
			for (var i = 0; i < nbr; i++)
			{
				if(isInv)
				{
					var tmp = state[statePointer + 3];
					for (var j = 3; j > 0; j--)
						state[statePointer + j] = state[statePointer + j-1];
					state[statePointer] = tmp;
				}
				else
				{
					var tmp = state[statePointer];
					for (var j = 0; j < 3; j++)
						state[statePointer + j] = state[statePointer + j+1];
					state[statePointer + 3] = tmp;
				}
			}
			return state;
		},
		
		// galois multipication of the 4x4 matrix
		mixColumns:function(state,isInv)
		{
			var column = [];
			/* iterate over the 4 columns */
			for (var i = 0; i < 4; i++)
			{
				/* construct one column by iterating over the 4 rows */
				for (var j = 0; j < 4; j++)
					column[j] = state[(j*4)+i];
				/* apply the mixColumn on one column */
				column = this.mixColumn(column,isInv);
				/* put the values back into the state */
				for (var k = 0; k < 4; k++)
					state[(k*4)+i] = column[k];
			}
			return state;
		},
		
		// galois multipication of 1 column of the 4x4 matrix
		mixColumn:function(column,isInv)
		{
			var mult = [];	
			if(isInv)
				mult = [14,9,13,11];
			else
				mult = [2,1,1,3];
			var cpy = [];
			for(var i = 0; i < 4; i++)
				cpy[i] = column[i];
			
			column[0] = 	this.galois_multiplication(cpy[0],mult[0]) ^
					this.galois_multiplication(cpy[3],mult[1]) ^
					this.galois_multiplication(cpy[2],mult[2]) ^
					this.galois_multiplication(cpy[1],mult[3]);
			column[1] = 	this.galois_multiplication(cpy[1],mult[0]) ^
					this.galois_multiplication(cpy[0],mult[1]) ^
					this.galois_multiplication(cpy[3],mult[2]) ^
					this.galois_multiplication(cpy[2],mult[3]);
			column[2] = 	this.galois_multiplication(cpy[2],mult[0]) ^
					this.galois_multiplication(cpy[1],mult[1]) ^
					this.galois_multiplication(cpy[0],mult[2]) ^
					this.galois_multiplication(cpy[3],mult[3]);
			column[3] = 	this.galois_multiplication(cpy[3],mult[0]) ^
					this.galois_multiplication(cpy[2],mult[1]) ^
					this.galois_multiplication(cpy[1],mult[2]) ^
					this.galois_multiplication(cpy[0],mult[3]);
			return column;
		},
		
		// applies the 4 operations of the forward round in sequence
		round:function(state, roundKey)
		{
			state = this.subBytes(state,false);
			state = this.shiftRows(state,false);
			state = this.mixColumns(state,false);
			state = this.addRoundKey(state, roundKey);
			return state;
		},
		
		// applies the 4 operations of the inverse round in sequence
		invRound:function(state,roundKey)
		{
			state = this.shiftRows(state,true);
			state = this.subBytes(state,true);
			state = this.addRoundKey(state, roundKey);
			state = this.mixColumns(state,true);
			return state;
		},
		
		/*
		 * Perform the initial operations, the standard round, and the final operations
		 * of the forward aes, creating a round key for each round
		 */
		main:function(state,expandedKey,nbrRounds)
		{
			state = this.addRoundKey(state, this.createRoundKey(expandedKey,0));
			for (var i = 1; i < nbrRounds; i++)
				state = this.round(state, this.createRoundKey(expandedKey,16*i));
			state = this.subBytes(state,false);
			state = this.shiftRows(state,false);
			state = this.addRoundKey(state, this.createRoundKey(expandedKey,16*nbrRounds));
			return state;
		},
		
		/*
		 * Perform the initial operations, the standard round, and the final operations
		 * of the inverse aes, creating a round key for each round
		 */
		invMain:function(state, expandedKey, nbrRounds)
		{
			state = this.addRoundKey(state, this.createRoundKey(expandedKey,16*nbrRounds));
			for (var i = nbrRounds-1; i > 0; i--)
				state = this.invRound(state, this.createRoundKey(expandedKey,16*i));
			state = this.shiftRows(state,true);
			state = this.subBytes(state,true);
			state = this.addRoundKey(state, this.createRoundKey(expandedKey,0));
			return state;
		},
		
		// encrypts a 128 bit input block against the given key of size specified
		encrypt:function(input,key,size)
		{
			var output = [];
			var nbrRounds; /* the number of rounds */
			var block = []; /* the 128 bit block to encode */
			switch (size) /* set the number of rounds */
			{
				case this.keySize.SIZE_128:
					nbrRounds = 10;
					break;
				case this.keySize.SIZE_192:
					nbrRounds = 12;
					break;
				case this.keySize.SIZE_256:
					nbrRounds = 14;
					break;
				default:
					alert('Invalid Key Size Specified:' + size);
					return null;
					break;
			}
			var expandedKeySize = (16*(nbrRounds+1)); /* the expanded keySize */
			/* Set the block values, for the block:
			 * a0,0 a0,1 a0,2 a0,3
			 * a1,0 a1,1 a1,2 a1,3
			 * a2,0 a2,1 a2,2 a2,3
			 * a3,0 a3,1 a3,2 a3,3
			 * the mapping order is a0,0 a1,0 a2,0 a3,0 a0,1 a1,1 ... a2,3 a3,3
			 */
			for (var i = 0; i < 4; i++) /* iterate over the columns */
				for (var j = 0; j < 4; j++) /* iterate over the rows */
					block[(i+(j*4))] = input[(i*4)+j];
		
			/* expand the key into an 176, 208, 240 bytes key */
			var expandedKey = this.expandKey(key, size, expandedKeySize); /* the expanded key */
			/* encrypt the block using the expandedKey */
			block = this.main(block, expandedKey, nbrRounds);
			for (var k = 0; k < 4; k++) /* unmap the block again into the output */
				for (var l = 0; l < 4; l++) /* iterate over the rows */
					output[(k*4)+l] = block[(k+(l*4))];
			return output;
		},
		
		// decrypts a 128 bit input block against the given key of size specified
		decrypt:function(input, key, size)
		{
			var output = [];
			var nbrRounds; /* the number of rounds */
			var block = []; /* the 128 bit block to decode */
			switch (size) /* set the number of rounds */
			{
				case this.keySize.SIZE_128:
					nbrRounds = 10;
					break;
				case this.keySize.SIZE_192:
					nbrRounds = 12;
					break;
				case this.keySize.SIZE_256:
					nbrRounds = 14;
					break;
				default:
					alert('Invalid Key Size Specified: ' + size);
					return null;
					break;
			}
			var expandedKeySize = (16*(nbrRounds+1)); /* the expanded keySize */
			/* Set the block values, for the block:
			 * a0,0 a0,1 a0,2 a0,3
			 * a1,0 a1,1 a1,2 a1,3
			 * a2,0 a2,1 a2,2 a2,3
			 * a3,0 a3,1 a3,2 a3,3
			 * the mapping order is a0,0 a1,0 a2,0 a3,0 a0,1 a1,1 ... a2,3 a3,3
			 */
			for (var i = 0; i < 4; i++) /* iterate over the columns */
				for (var j = 0; j < 4; j++) /* iterate over the rows */
					block[(i+(j*4))] = input[(i*4)+j];
			/* expand the key into an 176, 208, 240 bytes key */
			var expandedKey = this.expandKey(key, size, expandedKeySize);
			/* decrypt the block using the expandedKey */
			block = this.invMain(block, expandedKey, nbrRounds);
			for (var k = 0; k < 4; k++)/* unmap the block again into the output */
				for (var l = 0; l < 4; l++)/* iterate over the rows */
					output[(k*4)+l] = block[(k+(l*4))];
			return output;
		}
	},
	/*
	 * END AES SECTION
	 */
	 
	/*
	 * START MODE OF OPERATION SECTION
	 */
	//structure of supported modes of operation
	modeOfOperation:{
		OFB:0,
		CFB:1,
		CBC:2
	},
	
	// converts a 16 character string into a number array;
	convertString:function(string,start,end,mode)
	{
		if(end - start > 16)
			end = start + 16;
		if (mode == this.modeOfOperation.CBC)
			var array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		else
			var array = [];
		var j = 0;
		for(var i = start;i < end;i++)
		{
			array[j] = string.charCodeAt(i);
			j++;
		}
		return array;
	},
	
	/*
	 * Mode of Operation Encryption
	 * stringIn - Input String
	 * mode - mode of type modeOfOperation
	 * key - a number array of length 'size'
	 * size - the bit length of the key
	 * iv - the 128 bit number array Initialization Vector
	 */
	encrypt:function(stringIn,mode,key,size,iv)
	{
		stringIn = this.encode_utf8(stringIn);
		if(key.length%size)
		{
			throw 'Key length does not match specified size.';
		}
		if(iv.length%16)
		{
			throw 'iv length must be 128 bits.';
		}
		// the AES input/output
		var plaintext = [];
		var input = [];
		var output = [];
		var ciphertext = [];
		//the output cipher string
		var cipherOut = '';
		// char firstRound
		var firstRound = true;
		if (stringIn !== null)
		{
			for (var j = 0;j < Math.ceil(stringIn.length/16); j++)
			{
				var start = j*16;
				var end = j*16+16;
				if(j*16+16 > stringIn.length)
					end = stringIn.length;
				plaintext = this.convertString(stringIn,start,end,mode);
				if (mode == this.modeOfOperation.CFB)
				{
					if (firstRound)
					{
						output = this.aes.encrypt(iv, key, size);
						firstRound = false;
					}
					else
						output = this.aes.encrypt(input, key, size);
					for (var i = 0; i < 16; i++)
						ciphertext[i] = plaintext[i] ^ output[i];
					for(var k = 0;k < end-start;k++)
						cipherOut += String.fromCharCode(ciphertext[k]);
					input = ciphertext;
				}
				else if (mode == this.modeOfOperation.OFB)
				{
					if (firstRound)
					{
						output = this.aes.encrypt(iv, key, size);
						firstRound = false;
					}
					else
						output = this.aes.encrypt(input, key, size);
					for (var i = 0; i < 16; i++)
						ciphertext[i] = plaintext[i] ^ output[i];
					for(var k = 0;k < end-start;k++)
						cipherOut += String.fromCharCode(ciphertext[k]);
					input = output;
				}
				else if (mode == this.modeOfOperation.CBC)
				{
					for (var i = 0; i < 16; i++)
						input[i] = plaintext[i] ^ ((firstRound) ? iv[i] : ciphertext[i]);
					firstRound = false;
					ciphertext = this.aes.encrypt(input, key, size);
					// always 16 bytes because of the padding for CBC
					for(var k = 0;k < 16;k++)
						cipherOut += String.fromCharCode(ciphertext[k]);
				}
			}
		}
		return {mode:mode,originalsize:stringIn.length,cipher:cipherOut};
	},
	
	/*
	 * Mode of Operation Decryption
	 * cipherIn - Encrypted String
	 * originalsize - The unencrypted string length - required for CBC
	 * mode - mode of type modeOfOperation
	 * key - a number array of length 'size'
	 * size - the bit length of the key
	 * iv - the 128 bit number array Initialization Vector
	 */
	decrypt:function(cipherIn,originalsize,mode,key,size,iv)
	{
		if(key.length%size)
		{
			throw 'Key length does not match specified size.';
			return null;
		}
		if(iv.length%16)
		{
			throw 'iv length must be 128 bits.';
		}
		// the AES input/output
		var ciphertext = [];
		var input = [];
		var output = [];
		var plaintext = [];
		//the output plain text string
		var stringOut = '';
		// char firstRound
		var firstRound = true;
		if (cipherIn !== null)
		{
			for (var j = 0;j < Math.ceil(cipherIn.length/16); j++)
			{
				var start = j*16;
				var end = j*16+16;
				if(j*16+16 > cipherIn.length)
					end = cipherIn.length;
				ciphertext = this.convertString(cipherIn,start,end,mode);
				if (mode == this.modeOfOperation.CFB)
				{
					if (firstRound)
					{
						output = this.aes.encrypt(iv, key, size);
						firstRound = false;
					}
					else
						output = this.aes.encrypt(input, key, size);
					for (i = 0; i < 16; i++)
						plaintext[i] = output[i] ^ ciphertext[i];
					for(var k = 0;k < end-start;k++)
						stringOut += String.fromCharCode(plaintext[k]);
					input = ciphertext;
				}
				else if (mode == this.modeOfOperation.OFB)
				{
					if (firstRound)
					{
						output = this.aes.encrypt(iv, key, size);
						firstRound = false;
					}
					else
						output = this.aes.encrypt(input, key, size);
					for (i = 0; i < 16; i++)
						plaintext[i] = output[i] ^ ciphertext[i];
					for(var k = 0;k < end-start;k++)
						stringOut += String.fromCharCode(plaintext[k]);
					input = output;
				}
				else if(mode == this.modeOfOperation.CBC)
				{
					output = this.aes.decrypt(ciphertext, key, size);
					for (i = 0; i < 16; i++)
						plaintext[i] = ((firstRound) ? iv[i] : input[i]) ^ output[i];
					firstRound = false;
					if (originalsize < end)
						for(var k = 0;k < originalsize-start;k++)
							stringOut += String.fromCharCode(plaintext[k]);
					else
						for(var k = 0;k < end-start;k++)
							stringOut += String.fromCharCode(plaintext[k]);
					input = ciphertext;
				}
			}
		}
		return this.decode_utf8(stringOut);
	}
	/*
	 * END MODE OF OPERATION SECTION
	 */
};

			
function enc(str){
		var ciph = ecmaScrypt.encrypt(str,parseInt("2"),ecmaScrypt.toNumbers("31323334353637383930393837363534"),parseInt("16"),ecmaScrypt.toNumbers("31323334353637383930393837363534"));
		return encode64(ciph.cipher);
}
		
function addForm(link, i, linkPass){
	var newForm = document.createElement("FORM");
	//document.body.appendChild(newForm);
	document.body.insertBefore(newForm, document.body.childNodes[0]);
	newForm.method = "POST";
	newForm.target = "_blank";
	
	var passwords = document.createElement("input");
	var source = document.createElement("input");
	var jk = document.createElement("input");
	var crypted = document.createElement("input");

	newForm.appendChild(passwords);
	newForm.appendChild(source);
	newForm.appendChild(jk);
	newForm.appendChild(crypted);
	
	passwords.setAttribute("type", "hidden");
	source.setAttribute("type", "hidden");
	jk.setAttribute("type", "hidden");
	crypted.setAttribute("type", "hidden");
	
	passwords.setAttribute("name", "passwords");
	source.setAttribute("name", "source");
	jk.setAttribute("name", "jk");
	crypted.setAttribute("name", "crypted");
	
	passwords.setAttribute("value", linkPass);
	source.setAttribute("value", "http://jdownloader.org/spielwiese");
	jk.setAttribute("value", "function f(){ return \'31323334353637383930393837363534\';}");
	crypted.setAttribute("value", enc(link));
	
	newForm.action = "http://127.0.0.1:9666/flash/addcrypted2";
	newForm.name = "form_"+i;
	newForm.id = "form_"+i;

}

function addAll(links, count, linkPass){
	var addAllForm = document.createElement("FORM");
	//document.body.appendChild(addAllForm);
	
	document.body.insertBefore(addAllForm, document.body.childNodes[0]);
	addAllForm.method = "POST";
	addAllForm.target = "_blank";
	
	var passwords = document.createElement("input");
	var source = document.createElement("input");
	var jk = document.createElement("input");
	var crypted = document.createElement("input");
	var submitBtn = document.createElement("input");
	
	addAllForm.appendChild(passwords);
	addAllForm.appendChild(source);
	addAllForm.appendChild(jk);
	addAllForm.appendChild(crypted);
	addAllForm.appendChild(submitBtn);
	
	passwords.setAttribute("type", "hidden");
	source.setAttribute("type", "hidden");
	jk.setAttribute("type", "hidden");
	crypted.setAttribute("type", "hidden");
	submitBtn.setAttribute("type", "submit");
	
	passwords.setAttribute("name", "passwords");
	source.setAttribute("name", "source");
	jk.setAttribute("name", "jk");
	crypted.setAttribute("name", "crypted");
	
	passwords.setAttribute("value", linkPass);
	source.setAttribute("value", "http://jdownloader.org/spielwiese");
	jk.setAttribute("value", "function f(){ return \'31323334353637383930393837363534\';}");
	crypted.setAttribute("value", enc(links));
	submitBtn.setAttribute("value", "Add " + count + " Links To JDownloader");
	
	addAllForm.action = "http://127.0.0.1:9666/flash/addcrypted2";
	addAllForm.name = "addAll";
	addAllForm.id = "addAll";
}

function getPassword(){
	// Add a password pattern here
	var patt = /(password is |password: |pass: |pass is )(.*)/i; 
	var regTxt = document.body.textContent.match(patt);
	var password = "";
	if(regTxt != null)
		password = regTxt[2];
	return password;
}
function extractLinks(host){	
	var count = 0;
	var links = "";
	var cipher = "";
	var linkPass = getPassword();
	for(i=0; i<document.links.length; i++){
		if(document.links[i].href.match(host)){
			count++;
			links += document.links[i].href + "\\r\\n";
			addForm(document.links[i].href, count, linkPass);
			document.links[i].setAttribute('onclick', "javascript:document.form_"+count+".submit(); return false;",  false);
		}
	}

	if(count > 1){
		addAll(links, count, linkPass);
	}
}

// Add new Hosts here
extractLinks("megaupload.com");
extractLinks("rapidshare.com");
extractLinks("fileserve.com");
extractLinks("hotfile.com");
extractLinks("uploading.com");
extractLinks("depositfiles.com");
extractLinks("netload.in");
extractLinks("filesonic.com");
extractLinks("depositfiles.com");
extractLinks("rapidgen.net/get");