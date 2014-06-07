//
// ==UserScript==
// @name            Quoted printable decoding
// @namespace       http://www.maxwolf.ru/qpd
// @description     Decode quoted printable encoded strings from spamcop reporting page
// @include         http://www.spamcop.net/*
// ==/UserScript=

// Based on hrc4.js Copyright (c) 2006 Henk Reints, http://henk-reints.nl


// ================================================================================================
// First we must compensate for the weird behaviour of Windows that converts some characters with
// byte values in range 128..159 to 16-bit Unicode characters, such as the Euro-symbol "�". Using
// a translation table (simply being the 128..159 range) we can counteract this unwanted behaviour.
// The  Object uses the 'fromByte' and 'byteAt' methods defined below instead of the standard
// 'fromCharCode' and 'charCodeAt' methods of the String Object.
// The 'fromByte' method is defined without arguments, but it can be called with any number of
// arguments, each one being a byte value (same behaviour as the built-in String.fromCharCode).
// ------------------------------------------------------------------------------------------------
	String.ByteChars = "��������������������������������"

	String.fromByte = function ()
	{	var c, x = "", i = 0
		while (i < arguments.length)
		{	c = arguments[i++]
			if (c < 128 || c > 159) x += String.fromCharCode(c)
			else x += String.ByteChars.charAt(c-128)
		}
		return x
	}
	String.prototype.byteAt = function (i)
	{	var c = String.ByteChars.indexOf(this.charAt(i))
		return (c < 0 ? this.charCodeAt(i) : c+128)
	}


var W1251 = "\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044a\u044b\u044c\u044d\u044e\u044f";
//var KOI8 =  "\u0431\u0432\u0447\u0437\u0434\u0435\u0446\u044a\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u0440\u0442\u0443\u0444\u0445\u0436\u0438\u0433\u044e\u044b\u044d\u044f\u0449\u0448\u044c\u0430\u0441\u0411\u0412\u0427\u0417\u0414\u0415\u0426\u042A\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0422\u0423\u0424\u0425\u0416\u0418\u0413\u042E\u042B\u042D\u042F\u0429\u0428\u042C\u0410\u0421";
var KOI8 =  "\u044e\u0430\u0431\u0446\u0434\u0435\u0444\u0433\u0445\u0438\u0439\u043a\u043b\u043c\u043d\u043e\u043f\u044f\u0440\u0441\u0442\u0443\u0436\u0432\u044c\u044b\u0437\u0448\u044d\u0449\u0447\u044a\u042e\u0410\u0411\u0426\u0414\u0415\u0424\u0413\u0425\u0418\u0419\u041a\u041b\u041c\u041d\u041e\u041f\u042f\u0420\u0421\u0422\u0423\u0416\u0412\u042c\u042b\u0417\u0428\u042d\u0429\u0427\u042a";

function GetUChar(code, encoding) {

	switch(encoding) {
	case "windows-1251":
	case "Windows-1251":
	case "WINDOWS-1251":
	    if (code >= 0xc0 && code <= 0xff) {
	     	return W1251.charAt(code - 0xc0);
	    } else {
	    	return String.fromCharCode(code);
	    }
		break;

    case "koi8-r":
    case "Koi8-r":
    case "Koi8-R":
    case "KOI8-R":
	    if (code >= 0xc0 && code <= 0xff) {
	     	return KOI8.charAt(code - 0xc0);
	    } else {
	    	return String.fromCharCode(code);
	    }
		break;

    default:
		return String.fromCharCode(code);
    	break;
    }
}


// ================================================================================================
// STATIC methods for encoding a String of byte values in hexadecimal notation and vice versa.
// Arguments:
//	msg	String with message to be encoded or decoded.
//	sep	optional, String to be used as separator between individual hex byte values,
//		any hexadecimal digits are removed from this separator before use.
//		if omitted all hexadecimal digits will be concatenated without separation.
// Returns:
//	String with encoded or decoded result.
// Note:
//	The 'fromHex' method allows a reasonably free format. Every single comma or non-hex
//	pattern is interpreted as a separator of hexadecimal substrings. If such a substring
//	is blank (i.e. nothing between 2 consecutive commas) it is interpreted as a single zero
//	byte (so ",,," is converted to 4 consecutive null bytes). If a substring has odd length a
//	"0" will be PREpended to it, mainly to allow bytes to be represented by single hex digits
//	separated by non-hex characters (longer substrings SHOULD have an even length).
// ------------------------------------------------------------------------------------------------
	function fromHex(msg, encoding)
	{	var i,j,L,H,A=msg.replace(/[^a-f0-9,]+/gi,",").split(",")
		var result = [], temp = "", m = 0
		for (i=0; i<A.length; i++)
		{	L=A[i].length, H=(L<1?"00":L%2==1?"0"+A[i]:A[i])
			for (j=0; j<H.length; )
			{	temp+=GetUChar(parseInt(H.slice(j++,++j),16), encoding)
				if (temp.length >= 1024) {result[m++] = temp, temp = ""}
			}
		}
		if (temp.length > 0) result[m] = temp
		return result.join("")
	}


// ================================================================================================
// STATIC methods for encoding a String of byte values in Base64 notation and vice versa.
// Arguments:
//	msg	String with message to be encoded or decoded.
//	wrap	optional argument,
//		if boolean true then the result will be wrapped at a width of 76, which is the default
//		wrap width according to the MIME specifications, if boolean false then it will not be
//		wrapped (which is default if this arg. is omitted), else the wrap width will be set to
//		1*wrap (which might result in NaN if it is not a number, causing no wrapping)
//	nopad	optional argument,
//		if evaluated as true then the result will not be padded with equals signs (the MIME
//		specification prescribes padding with equals signs until the result length equals a
//		multiple of 4 characters).
// Returns:
//	String with Base64 encoded or decoded result.
//	if wrapped, the line separator will be "\r\n", the good old carriage return + linefeed.
// Notes:
//	o according to the MIME specification, Base64 encoded data should be split into lines of 76
//	  characters, with CR+LF as line separator.
//	o the 'fromBase64' method ignores any invalid characters in the input string.
//	o if the 'nopad' argument is given, then 'wrap' should also be specified as true, false, or a number.
// Reference:
//	RFC2045: Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies
//	http://www.rfc-editor.org/rfc/rfc2045.txt
// ------------------------------------------------------------------------------------------------
	function fromBase64(msg, encoding)
	{	var D = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
		var c,i,j,k,m,K, L = msg.length
		var result = [], temp = "", mm = 0
		for (i=0; i<L; )
		{	for (j=0,K=0; j<4 && i<L;) {c=D.indexOf(msg.charAt(i++)); if (c>=0) {K<<=6,K|=(c),j++} }
			for (m=j; m<4; K<<=6,m++);
			for (k=16; j>1; k-=8,j--)
			{	temp+=GetUChar((K>>>k)&255, encoding)
				if (temp.length >= 1024) {result[mm++] = temp, temp = ""}
			}
		}
		if (temp.length > 0) result[mm] = temp
		return result.join("")
	}


// ================================================================================================
// STATIC methods for encoding and decoding a String in Quoted Printable notation.
// Arguments:
//	msg		String with message to be encoded or decoded.
//	multiline	(toQuotPr only), optional Boolean to indicate msg is multiline.
// Returns:
//	String with encoded or decoded result.
// Notes:
//	o The 'multiline' argument of the 'toQuotPr' method causes the following:
//	  - each CR+LF pair is treated as a line separator,
//	    as well as every single CR or LF (after converting every CR+LF to LF);
//	  - the message is split into separate lines at the line separators;
//	  - each line is encoded;
//	  - the result is concatenated to a single result with "\r\n" (CRLF) as line separotor.
//	  If multiline is False or omitted then all CR's and LF's in the message are encoded
//	  as '=0D' and '=0A' respectively.
//	o In Quoted Printable, an 'equals' sign at the very end of a line indicates a 'soft'
//	  linebreak, i.e. the decoded result of the next line should be appended to it without
//	  an intermediate line separator. If the input message of fromQuotPr does not end with a
//	  trailing 'equals' sign, then fromQuotPr appends a CRLF to the result, indicating a hard
//	  end of line. This means that a decoded result should be output using a 'Write' method
//	  instead of a 'WriteLine' method.
//	o Both methods use the CRLF character pair as linebreak in the result, as required by the
//	  MIME specification.
//	o Quoted Printable is intended to encode plain text containing SOME non-printable and/or
//	  special non-7-bit characters. For encoding true binary data, Base64 is recommended.
// Reference:
//	RFC2045: Multipurpose Internet Mail Extensions (MIME) Part One: Format of Internet Message Bodies
//	http://www.rfc-editor.org/rfc/rfc2045.txt
// ------------------------------------------------------------------------------------------------
	function fromQuotPr(msg, encoding)
	{	var  c, i=0, y=msg.replace(/\r\n/g,"\n").replace(/\r/g,"\n").replace(/=\n/g,"")
		var result = [], temp = "", m = 0
		var soft = y.search(/=$/); if (soft>=0) y=y.replace(/=$/,"")
		for (; i<y.length; )
		{	c=y.charAt(i++)
			temp+=(c!="="?c:fromHex(y.slice(i++,++i), encoding))
			if (temp.length >= 1024) {result[m++] = temp, temp = ""}
		}
		if (soft<0) temp += "\r\n"
		if (temp.length > 0) result[m] = temp
		return result.join("")
	}


//
//
//
//
var elems = document.getElementsByTagName("div");
var lower = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


for(var i =0; i< elems.length; i++) {
    var elem = elems[i];
    var src = elem.innerHTML;
    var encoding;
    if (src.length > 0) {
    	var reQ = /=\?([^\?]+)\?(Q|q)\?([^\?]+)\?=/g;
    	var reB = /=\?([^\?]+)\?(B|b)\?([^\?]+)\?=/g;
        var again;

	    do {
                again = false;
		if (src.search(reQ) > 0) {
			while ((matchArray = reQ.exec(src)) != null) {
				src = src.slice(0, matchArray.index) + "<i>" +  fromQuotPr(matchArray[3], matchArray[1])  + "</i>" + src.slice(reQ.lastIndex, -1);
			}
		    elem.innerHTML = src;
		    again = true;
		} else if (src.search(reB) > 0) {
			while ((matchArray = reB.exec(src)) != null) {
				src = src.slice(0, matchArray.index) + "<i>" + fromBase64(matchArray[3], matchArray[1])  + "</i>" + src.slice(reB.lastIndex, -1);
			}
		    elem.innerHTML = src;
                    again = true;
		}
            } while (again);
    }
}
