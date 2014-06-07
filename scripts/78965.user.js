// ==UserScript==
// @name           Amazon List Prices
// @namespace      muckl.com
// @description    Adds list price to article view, if it isn't already displayed.
// @include        http*://*amazon.at*/dp/*
// @include        http*://*amazon.de*/dp/*
// @copyright      2010, Muckl (http://userscripts.org/users/Muckl)
// @license        GPL (http://www.gnu.org/copyleft/gpl.html)
// @version        0.0.1
// ==/UserScript==

/**

   ChangeLog       [REL] v0.0.1 (initial release) [2010-06-12]

   DevLog          [ADD] More Amazon domains

**/

//////////////////////////////////////////////////////////////////////////////////////////
//        PARAMETERS NEED TO BE FILLED UP, OTHERWISE THIS SCRIPT DOESN'T WORK!          //
//////////////////////////////////////////////////////////////////////////////////////////

// user Amazon Access Key ID
var AWSAccessKeyId = '';

// user Amazon Secret Access Key
var AWSSecretAccessKey = '';

//////////////////////////////////////////////////////////////////////////////////////////
//                       END OF CONFIG BLOCK, SCRIPT STARTS                             //
//////////////////////////////////////////////////////////////////////////////////////////

// get current domain & asin
var TLD = '', d, ASIN = '', a, TABLE = document.getElementById('priceBlock').getElementsByTagName('tbody')[0];
if (TABLE.firstChild.childNodes[3].childNodes[0].nodeName === 'B') {
	if ((d = window.location.href.match(/amazon\.([a-z\.]+?)\//)) !== null && (a = window.location.href.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/)) !== null) {
		TLD = d[1];
		if (TLD === 'at') {
			TLD = 'de';
		} else if (TLD === 'co.jp') {
			TLD = 'jp';
		}
		ASIN = a[1];
		window.addEventListener('load', getProductDetails, false);
	}
}

function getProductDetails() {
	sendRequest('&Operation=ItemLookup&ItemId=' + ASIN + '&ResponseGroup=ItemAttributes', function (r) {
		if (r.status === 200) {
			var m = r.responseText.match(/<FormattedPrice>([^<]*?)<\/FormattedPrice>/i);
			if (m !== null) {
				addListPrice(m[1]);
			}
		} else {
			alert('Error: getProductDetails() wasn\'t successful!');
		}
	});
}

function sendRequest(params, handler) {
	var url = 'http://ecs.amazonaws.' + TLD + '/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=' + AWSAccessKeyId + params, 
		signedUrl = AWSQS.signQuery(url, AWSSecretAccessKey);
	GM_xmlhttpRequest({
		method: 'GET',
		url: signedUrl,
		headers: {
			'Accept': 'text/xml'
		},
		onload: handler
	});
}

function addListPrice(price) {
	var listPrice = parseInt(price.split(' ')[1].replace(/,/, ''), 10), 
		saved = listPrice - parseInt(TABLE.firstChild.childNodes[3].childNodes[0].innerHTML.split(' ')[1].replace(/,/, ''), 10);
	insertRow(0, 'Statt:', 'listprice', price);
	insertRow(2, 'Sie sparen:', 'price', price.split(' ')[0] + ' ' + saved.toString(10).slice(0, -2) + ',' + saved.toString(10).slice(-2) + ' (' + Math.round(saved * 100 / listPrice) + '%)');
	TABLE.getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML = 'Jetzt:';
}

function insertRow(nr, txt, cName, val) {
	var tr = document.createElement('tr'), td = document.createElement('td');
	td.className = 'priceBlockLabel';
	td.innerHTML = txt;
	tr.appendChild(td);
	td = document.createElement('td');
	td.className = cName;
	td.innerHTML = val;
	tr.appendChild(td);
	TABLE.insertBefore(tr, TABLE.getElementsByTagName('tr')[nr]);
}

//////////////////////////////////////////////////////////////////////////////////////////
//                         AWS QUERY & HELPER FUNCTIONS                                 //
//////////////////////////////////////////////////////////////////////////////////////////

/*
    AWSQS = Amazon Web Services / Product Advertising API Query Signer (JavaScript)

    2009.08.19, SowaCS: fixed "bug" for POST - do not encode Signature in this case (affected fnSignatureFromArray only)
    2009.06.25, SowaCS: added getSignatureFromArray: fnSignatureFromArray.  this provides much better signing
    2009.06.12, SowaCS: adjust for ff back button / form state / dom "bug" (better this way anyway)
    2009.06.02, SowaCS: fixed 1 digit day of month handling (for ie)
    2009.05.24, SowaCS: added "getSignature" method (allows explicit verb to be passed))
    2009.05.21, SowaCS: fixed some errors picked up by http://jslint.com/
    2009.05.18, SowaCS: tweaks
    2009.05.17, SowaCS: factored more generic form & query methods
    2009.05.16, SowaCS: mods for SRE
    2009.05.11, SowaCS: original; with thanks for assistance to the folks at
        http://developer.amazonwebservices.com/connect/thread.jspa?threadID=31701

    All customary licenses and disclaimers for code posted in open forums apply.

    ============================================================================


    Dependencies - you will need to download, save & reference the following:

    - ecmanaut.base64.js from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
*/

// Based on public domain code by Tyler Akins <http://rumkin.com/>
// Original code at http://rumkin.com/tools/compression/base64.php

var Base64 = (function() {
	function encode_base64(data) {
		var out = "", c1, c2, c3, e1, e2, e3, e4;
		for (var i = 0; i < data.length; ) {
			c1 = data.charCodeAt(i++);
			c2 = data.charCodeAt(i++);
			c3 = data.charCodeAt(i++);
			e1 = c1 >> 2;
			e2 = ((c1 & 3) << 4) + (c2 >> 4);
			e3 = ((c2 & 15) << 2) + (c3 >> 6);
			e4 = c3 & 63;
			if (isNaN(c2))
				e3 = e4 = 64;
			else if (isNaN(c3))
				e4 = 64;
			out += tab.charAt(e1) + tab.charAt(e2) + tab.charAt(e3) + tab.charAt(e4);
		}
		return out;
	}

	function decode_base64(data) {
		var out = "", c1, c2, c3, e1, e2, e3, e4;
		for (var i = 0; i < data.length; ) {
			e1 = tab.indexOf(data.charAt(i++));
			e2 = tab.indexOf(data.charAt(i++));
			e3 = tab.indexOf(data.charAt(i++));
			e4 = tab.indexOf(data.charAt(i++));
			c1 = (e1 << 2) + (e2 >> 4);
			c2 = ((e2 & 15) << 4) + (e3 >> 2);
			c3 = ((e3 & 3) << 6) + e4;
			out += String.fromCharCode(c1);
			if (e3 != 64)
				out += String.fromCharCode(c2);
			if (e4 != 64)
				out += String.fromCharCode(c3);
		}
		return out;
	}

	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return { encode:encode_base64, decode:decode_base64 };
})();

/*

    - jssha256.js from http://point-at-infinity.org/jssha256/
*/

/*
 *  jssha256 version 0.1  -  Copyright 2006 B. Poettering
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License as
 *  published by the Free Software Foundation; either version 2 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307 USA
 */

/*
 * http://point-at-infinity.org/jssha256/
 *
 * This is a JavaScript implementation of the SHA256 secure hash function
 * and the HMAC-SHA256 message authentication code (MAC).
 *
 * The routines' well-functioning has been verified with the test vectors 
 * given in FIPS-180-2, Appendix B and IETF RFC 4231. The HMAC algorithm 
 * conforms to IETF RFC 2104. 
 *
 * The following code example computes the hash value of the string "abc".
 *
 *    SHA256_init();
 *    SHA256_write("abc");
 *    digest = SHA256_finalize();  
 *    digest_hex = array_to_hex_string(digest);
 * 
 * Get the same result by calling the shortcut function SHA256_hash:
 * 
 *    digest_hex = SHA256_hash("abc");
 * 
 * In the following example the calculation of the HMAC of the string "abc" 
 * using the key "secret key" is shown:
 * 
 *    HMAC_SHA256_init("secret key");
 *    HMAC_SHA256_write("abc");
 *    mac = HMAC_SHA256_finalize();
 *    mac_hex = array_to_hex_string(mac);
 *
 * Again, the same can be done more conveniently:
 * 
 *    mac_hex = HMAC_SHA256_MAC("secret key", "abc");
 *
 * Note that the internal state of the hash function is held in global
 * variables. Therefore one hash value calculation has to be completed 
 * before the next is begun. The same applies the the HMAC routines.
 *
 * Report bugs to: jssha256 AT point-at-infinity.org
 *
 */

/******************************************************************************/

/* Two all purpose helper functions follow */

/* string_to_array: convert a string to a character (byte) array */

function string_to_array(str) {
	var len = str.length;
	var res = new Array(len);
	for(var i = 0; i < len; i++)
		res[i] = str.charCodeAt(i);
	return res;
}

/* array_to_hex_string: convert a byte array to a hexadecimal string */

function array_to_hex_string(ary) {
	var res = "";
	for(var i = 0; i < ary.length; i++)
		res += SHA256_hexchars[ary[i] >> 4] + SHA256_hexchars[ary[i] & 0x0f];
	return res;
}

/******************************************************************************/

/* The following are the SHA256 routines */

/* 
   SHA256_init: initialize the internal state of the hash function. Call this
   function before calling the SHA256_write function.
*/

function SHA256_init() {
	SHA256_H = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 
		0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
	SHA256_buf = new Array();
	SHA256_len = 0;
}

/*
   SHA256_write: add a message fragment to the hash function's internal state. 
   'msg' may be given as string or as byte array and may have arbitrary length.

*/

function SHA256_write(msg) {
	if (typeof(msg) == "string")
		SHA256_buf = SHA256_buf.concat(string_to_array(msg));
	else
		SHA256_buf = SHA256_buf.concat(msg);
	for(var i = 0; i + 64 <= SHA256_buf.length; i += 64)
		SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf.slice(i, i + 64));
	SHA256_buf = SHA256_buf.slice(i);
	SHA256_len += msg.length;
}

/*
   SHA256_finalize: finalize the hash value calculation. Call this function
   after the last call to SHA256_write. An array of 32 bytes (= 256 bits) 
   is returned.
*/

function SHA256_finalize() {
	SHA256_buf[SHA256_buf.length] = 0x80;

	if (SHA256_buf.length > 64 - 8) {
		for(var i = SHA256_buf.length; i < 64; i++)
			SHA256_buf[i] = 0;
		SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);
		SHA256_buf.length = 0;
	}

	for(var i = SHA256_buf.length; i < 64 - 5; i++)
		SHA256_buf[i] = 0;
	SHA256_buf[59] = (SHA256_len >>> 29) & 0xff;
	SHA256_buf[60] = (SHA256_len >>> 21) & 0xff;
	SHA256_buf[61] = (SHA256_len >>> 13) & 0xff;
	SHA256_buf[62] = (SHA256_len >>> 5) & 0xff;
	SHA256_buf[63] = (SHA256_len << 3) & 0xff;
	SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);

	var res = new Array(32);
	for(var i = 0; i < 8; i++) {
		res[4 * i + 0] = SHA256_H[i] >>> 24;
		res[4 * i + 1] = (SHA256_H[i] >> 16) & 0xff;
		res[4 * i + 2] = (SHA256_H[i] >> 8) & 0xff;
		res[4 * i + 3] = SHA256_H[i] & 0xff;
	}

	delete SHA256_H;
	delete SHA256_buf;
	delete SHA256_len;
	return res;
}

/*
   SHA256_hash: calculate the hash value of the string or byte array 'msg' 
   and return it as hexadecimal string. This shortcut function may be more 
   convenient than calling SHA256_init, SHA256_write, SHA256_finalize 
   and array_to_hex_string explicitly.
*/

function SHA256_hash(msg) {
	var res;
	SHA256_init();
	SHA256_write(msg);
	res = SHA256_finalize();
	return array_to_hex_string(res);
}

/******************************************************************************/

/* The following are the HMAC-SHA256 routines */

/*
   HMAC_SHA256_init: initialize the MAC's internal state. The MAC key 'key'
   may be given as string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_init(key) {
	if (typeof(key) == "string")
		HMAC_SHA256_key = string_to_array(key);
	else
		HMAC_SHA256_key = new Array().concat(key);

	if (HMAC_SHA256_key.length > 64) {
		SHA256_init();
		SHA256_write(HMAC_SHA256_key);
		HMAC_SHA256_key = SHA256_finalize();
	}

	for(var i = HMAC_SHA256_key.length; i < 64; i++)
		HMAC_SHA256_key[i] = 0;
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] ^=  0x36;
	SHA256_init();
	SHA256_write(HMAC_SHA256_key);
}

/*
   HMAC_SHA256_write: process a message fragment. 'msg' may be given as 
   string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_write(msg) {
	SHA256_write(msg);
}

/*
   HMAC_SHA256_finalize: finalize the HMAC calculation. An array of 32 bytes
   (= 256 bits) is returned.
*/

function HMAC_SHA256_finalize() {
	var md = SHA256_finalize();
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] ^= 0x36 ^ 0x5c;
	SHA256_init();
	SHA256_write(HMAC_SHA256_key);
	SHA256_write(md);
	for(var i = 0; i < 64; i++)
		HMAC_SHA256_key[i] = 0;
	delete HMAC_SHA256_key;
	return SHA256_finalize();
}

/*
   HMAC_SHA256_MAC: calculate the HMAC value of message 'msg' under key 'key'
   (both may be of type string or byte array); return the MAC as hexadecimal 
   string. This shortcut function may be more convenient than calling 
   HMAC_SHA256_init, HMAC_SHA256_write, HMAC_SHA256_finalize and 
   array_to_hex_string explicitly.
*/

function HMAC_SHA256_MAC(key, msg) {
	var res;
	HMAC_SHA256_init(key);
	HMAC_SHA256_write(msg);
	res = HMAC_SHA256_finalize();
	return array_to_hex_string(res);
}

/******************************************************************************/

/* The following lookup tables and functions are for internal use only! */

SHA256_hexchars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
	'a', 'b', 'c', 'd', 'e', 'f');

SHA256_K = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 
	0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 
	0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 
	0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 
	0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 
	0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 
);

function SHA256_sigma0(x) {
	return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}

function SHA256_sigma1(x) {
	return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}

function SHA256_Sigma0(x) {
	return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ 
		((x >>> 22) | (x << 10));
}

function SHA256_Sigma1(x) {
	return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ 
		((x >>> 25) | (x << 7));
}

function SHA256_Ch(x, y, z) {
	return z ^ (x & (y ^ z));
}

function SHA256_Maj(x, y, z) {
	return (x & y) ^ (z & (x ^ y));
}

function SHA256_Hash_Word_Block(H, W) {
	for(var i = 16; i < 64; i++)
		W[i] = (SHA256_sigma1(W[i - 2]) +  W[i - 7] + 
			SHA256_sigma0(W[i - 15]) + W[i - 16]) & 0xffffffff;
		var state = new Array().concat(H);
		for(var i = 0; i < 64; i++) {
			var T1 = state[7] + SHA256_Sigma1(state[4]) + 
			SHA256_Ch(state[4], state[5], state[6]) + SHA256_K[i] + W[i];
			var T2 = SHA256_Sigma0(state[0]) + SHA256_Maj(state[0], state[1], state[2]);
			state.pop();
			state.unshift((T1 + T2) & 0xffffffff);
			state[4] = (state[4] + T1) & 0xffffffff;
		}
		for(var i = 0; i < 8; i++)
			H[i] = (H[i] + state[i]) & 0xffffffff;
}

function SHA256_Hash_Byte_Block(H, w) {
	var W = new Array(16);
	for(var i = 0; i < 16; i++)
		W[i] = w[4 * i + 0] << 24 | w[4 * i + 1] << 16 | 
			w[4 * i + 2] << 8 | w[4 * i + 3];
	SHA256_Hash_Word_Block(H, W);
}

/*


    Usage:

    - Reference the dependencies and this file, e.g.:

        <script language="javacript" src="jssha256.js"></script>
        <script language="javacript" src="ecmanaut.base64.js"></script>
        <script language="javacript" src="AWSQuerySigner.js"></script>

    - Call as follows, e.g.:

        AWSQS.signForm( theForm, strAWSSecretAccessKey );

        --- OR ---

        strSignedQuery = AWSQS.signQuery( strOriginalQuery, strAWSSecretAccessKey );


        Can also retrieve timestamp & signature:

        var oSign = AWSQS.getFormSignature( theForm, strAWSSecretAccessKey );
        --- OR ---
        var oSign = AWSQS.getQuerySignature( strOriginalQuery, strAWSSecretAccessKey );
        --- OR ---
        var oSign = AWSQS.getSignature( "POST", strOriginalQuery, strAWSSecretAccessKey );

        where oSign = { Timestamp: (timestamp), Signature: (signature) }



        --- OR (PREFERRED) (added 2009.06.25) ---

        var oSign = AWSQS.getSignatureFromArray( "POST", strEndpointUri, aOriginalQueryAssociativeArray, strAWSSecretAccessKey );
        where oSign = { Timestamp: (timestamp), Signature: (signature), parameters: (array of encoded "key=value") }

    Notes:

    - Intended to assist with retro-fitting existing JavaScript code for the new AWS query signing requirement
    - No error handling is provided

*/

var AWSQS = (function() {

	/* ------ privates ------ */

	function array_to_string( ary ) {
		var str = "";
		for( var i = 0; i < ary.length; i++ ) {
			str += String.fromCharCode( ary[i] );
		}
		return str;
	}

	// uses http://point-at-infinity.org/jssha256/
	function local_HMAC_SHA256_MAC( strKey, strMsg ) {
		HMAC_SHA256_init( strKey );
		HMAC_SHA256_write( strMsg );
		var aHash = HMAC_SHA256_finalize();
		return array_to_string( aHash );
	}

	function fnTranslate( str, aTranslate ) {
		for ( var i = 0; i < aTranslate.length; i++ ) {
			str = str.replace( aTranslate[i][0], aTranslate[i][1] );
		}
		return str;
	}

	function encodeURIComponentAWS( str ) {
		return fnTranslate( encodeURIComponent( str ),
			[ [/!/g, "%21"], [/'/g, "%27"], [/\(/g, "%28"], [/\)/g, "%29"], [/\*/g, "%2A"] ] );
		//'<=because the single quote in the line above messes with my syntax highlighter
	}

	function toZString( dt ) {
		// "Sun, 10 May 2009 18:45:50 UTC" to "2009-05-10T18:45:50Z":
		//  note: ff toUTCString returns "Sun, 17 May 2009 23:31:11 GMT" - !
		return dt.toUTCString().replace( /.{3}, (\d{1,2}) .{3} (\d{4}) (\d{2}:\d{2}:\d{2}) .{3}/,
			function(strMatch, strDay, strYear, strTime) {
				var strDate = (dt.getUTCDate()).toString().replace( /^(\d)$/, "0$1" );
				var strMonth = (dt.getUTCMonth()+1).toString().replace( /^(\d)$/, "0$1" );
				return strYear + "-" + strMonth + "-" + strDate + "T" + strTime + "Z";
			});
	}

	function timestamp() { return toZString( new Date() ); }

	// given method ( "POST" or "GET" ), AWS query (in GET form) and "secret access key",
	// return object with Timestamp and Signature
	// NOTE: you're better off using fnSignatureFromArray (below) !
	function fnSignature( strMethod, strQuery, strKey ) {
		var bEncode = strMethod == "GET";

		var strTimestamp = timestamp();
		strQuery += "&Timestamp=" + ( bEncode ? strTimestamp : encodeURIComponentAWS( strTimestamp ) );

		var strToSign = strQuery.replace( /(https?:\/\/)([^\/]*)(\/.*)\?(.*)/i,
			function( strMatch, strScheme, strHost, strUri, strParams ) {
				var aParams = strParams.split("&").sort();
					if ( bEncode ) {
						for ( var i = 0; i < aParams.length; i++ ) {
							var aKV = aParams[i].split("=");
							for ( var j = 0; j < aKV.length; j++ ) {
								aKV[j] = encodeURIComponentAWS( aKV[j] );
							}
							aParams[i] = aKV.join("=");
						}
					}
				strParams = aParams.join("&");
				strHost = strHost.toLowerCase();
				return ([ strMethod, strHost, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: strTimestamp, Signature: strSignature };
	}

	// given method ( "POST" or "GET" ), EndpointUri string,
	// AWS query parameters _in_an_associative_array_,
	// and "secret access key",
	// return object with Timestamp and Signature
	function fnSignatureFromArray( strMethod, strEndpointUri, aQuery, strKey ) {
		var bEncode = strMethod == "GET";

		if ( aQuery["Timestamp"] == undefined )
			aQuery["Timestamp"] = timestamp();

		if ( aQuery["Signature"] != undefined )
			delete aQuery["Signature"];

		var aParams = [];
		var strToSign = strEndpointUri.replace( /([^\/]*)(\/.*)/i,
			function( strMatch, strEndpoint, strUri ) {
				for ( key in aQuery ) {
					var aKV = [ encodeURIComponentAWS(key), encodeURIComponentAWS(aQuery[key]) ];
					aParams.push( aKV.join("=") );
				}
				strParams = aParams.sort().join("&");
				strEndpoint = strEndpoint.toLowerCase();
				return ([ strMethod, strEndpoint, strUri, strParams ]).join("\n");
			});

		// Base64 from http://ecmanaut.blogspot.com/2007/11/javascript-base64-singleton.html
		var strSignature = Base64.encode( local_HMAC_SHA256_MAC( strKey, strToSign ) );
		if ( bEncode ) {
			strSignature = encodeURIComponentAWS( strSignature );
		}

		return { Timestamp: aQuery["Timestamp"], Signature: strSignature, parameters: aParams };
	}


	/* ------ form helpers ------ */

	function encodeKV( strKey, strVal )  {
		var strK = encodeURIComponentAWS( strKey );
		var strV = encodeURIComponentAWS( strVal );
		return strK + "=" + strV;
	}

	function getKV( elem )  {
		return encodeKV( elem.name, elem.value );
	}

	// getQuery collects up all field values to be POSTed from form,
	// constructs _uri_encoded_ GET style query with form's action
	// _all_ fields must be collected, even if empty (except those not sent).
	// 2009.06.12, fn: all except for the _signature_ & _timestamp_ fields, if present !
	function getQuery( oForm )  {
		var aQuery = [];

		var colElements = oForm.elements;
		for ( var i = 0; i < colElements.length; i++ )  {
			var elem = colElements[i];
			var strType = elem.type ? elem.type.toLowerCase() : "";
			var strTag = elem.tagName.toLowerCase();

			switch( true ) {

				case elem.name == "Signature":
				case elem.name == "Timestamp":
					// SKIP!
					break;

				case strType == "hidden":
				case strType == "text":
				case strType == "checkbox" && elem.checked:
				case strType == "radio" && elem.checked:
				case strTag == "textarea":

					aQuery.push( getKV( elem ) );
					break;

				case strTag == "select":
					var bDone = false;
					for ( var j = 0; j < elem.options.length; j++ ) {
						if ( !bDone && elem.options[j].selected ) {
							aQuery.push( encodeKV( elem.name, elem.options[j].value ) );
							bDone = true;
						}
					}
					if ( !bDone ) { // or are empty selects not POSTed ?
						aQuery.push( encodeKV( elem.name, "" ) );
					}
					break;

				default:
					// nothin'
			}
		}
		return oForm.action + "?" + aQuery.join("&");
	}

	function setHidden( oForm, strName, strValue ) {
		var elem = oForm.elements[ strName ];
		if ( !elem ) {
			elem = document.createElement("input");
			elem.type = "hidden";
			elem.name = strName;
			oForm.appendChild(elem);
		}
		elem.value = strValue;
	}


	/* ------ publics ------ */

	//  get timestamp & signature for form
	function fnFormSignature( oForm, strKey ) {
		return fnSignature( oForm.method.toUpperCase(), getQuery( oForm ), strKey );
	}

	//  get timestamp & signature for query
	function fnQuerySignature( strQuery, strKey ) {
		return fnSignature( "GET", strQuery, strKey );
	}

	// sign form with key: add signature & timestamp
	function fnSignForm( oForm, strKey ) {
		var oSign = fnFormSignature( oForm, strKey );
		setHidden( oForm, "Timestamp", oSign.Timestamp );
		setHidden( oForm, "Signature", oSign.Signature );
	}

	// sign query with key: add signature & timestamp
	function fnSignQuery( strQuery, strKey ) {
		var oSign = fnQuerySignature( strQuery, strKey );
		return strQuery + "&Timestamp=" + oSign.Timestamp + "&Signature=" + oSign.Signature;
	}


	/* ------ expose publics here ------ */
	return {
				signForm: fnSignForm,
				signQuery: fnSignQuery,
				getFormSignature: fnFormSignature,
				getQuerySignature: fnQuerySignature,
				getSignature: fnSignature,
				getSignatureFromArray: fnSignatureFromArray
			};
})();
