// ==UserScript==
// @name           Wikipedia -> Freebase
// @author         Zach Dwiel
// @namespace      http://dwiel.net
// @description    Provide link from wikipedia pages to the equivelent freebase topic
// @include        *://en.wikipedia.org/wiki/*
// @require        http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/**
*
*  URL encode / decode
*  http://www.webtoolkit.info/
*
**/

var Url = {

    // public method for url encoding
    encode : function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode : function (string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
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

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
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

function repeatString(strInput, intCount) {
         var arrTmp = new Array(intCount+1);
         return arrTmp.join(strInput);
     }

$(document).ready( function() {
	var url = document.location.href;
	var i = url.indexOf('.org/');
	var j = url.indexOf('#');
	if(j == -1) {
		j = url.length;
	}
	key = Url.decode(url.substring(i+10, j));
	newkey = key.replace(/[^-A-Za-z0-9_]/g,function(x) {
													s = ''+x.charCodeAt(0);
													s = parseInt(s).toString(16).toUpperCase();
													return '$'+repeatString('0',4-s.length)+s;
												}
											)
	$('#content .firstHeading').append('<a href="http://www.freebase.com/view/wikipedia/en/'+newkey+'"><img src="http://www.freebase.com/favicon.ico" style="margin-left:0.5em"></a>');
});
