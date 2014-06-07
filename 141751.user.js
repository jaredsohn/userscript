// ==UserScript==
// @name        R-Cubed: Redirect Remover Redux
// @namespace   *
// @description Website redirect remover, TGP redirect cleaner, Link cleaner, URL cleaner
// @include     http://*
// @include     https://*
// @include     //*
// @version     1
// ==/UserScript==

(function(window, undefined) {
    var rot13 = function(s){
        return s.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    };

    var Base64 = {
     
        // private property
        _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
     
        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
     
            input = Base64._utf8_encode(input);
     
            while (i < input.length) {
     
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
                Base64._keyStr.charAt(enc1) + Base64._keyStr.charAt(enc2) +
                Base64._keyStr.charAt(enc3) + Base64._keyStr.charAt(enc4);
     
            }
     
            return output;
        },
     
        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
     
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     
            while (i < input.length) {
     
                enc1 = Base64._keyStr.indexOf(input.charAt(i++));
                enc2 = Base64._keyStr.indexOf(input.charAt(i++));
                enc3 = Base64._keyStr.indexOf(input.charAt(i++));
                enc4 = Base64._keyStr.indexOf(input.charAt(i++));
     
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
     
            }
     
            output = Base64._utf8_decode(output);
     
            return output;
     
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
     
    };

    var removeEquals = function(str) {
        return str.replace(/=/g, '');
    };
    
    var removeNonAlpha = function(str) {
        return str.replace(/[^a-zA-Z0-9=]+/g, '');
    };

    var looksLikeAUrl = function(candidate) {
        return candidate && candidate.match(/^https?:\/\//i);
    };

    var urldecode = function(url) {
        return decodeURIComponent(url.replace(/\+/g, ' '));
    };

    var permutations = [
        [],
        [Base64.decode],
        [Base64.decode, rot13],
        [rot13, Base64.decode],
        [removeEquals, rot13, Base64.decode],
        [removeEquals, Base64.decode, rot13],
        [rot13],
        [removeNonAlpha, Base64.decode],
        [removeNonAlpha, rot13, Base64.decode],
        [removeNonAlpha, Base64.decode, rot13]
    ];

    var permutationsLength = permutations.length;

    var extractUrl = function(text) {
        text = urldecode(text);
        for (var i = 0; i < permutationsLength; ++i) {
            var permutation = permutations[i];
            var permutationLength = permutation.length;
            var result = text;
            for (var j = 1; j < permutationLength; ++j) {
                result = permutation[j](result);
            }
            if (looksLikeAUrl(result)) {
                return result;
            }
        }
        return '';
    };

    var urlRe = /.*[&?]u(?:rl)?=(.+)$/;

    var cleanedAny = false;

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; ++i) {
        var result = urlRe.exec(links[i]);
        if (result && looksLikeAUrl(result[1])) {
            links[i].href = result[1];
            cleanedAny = true;
        } else if (result) {
            var deciphered = extractUrl(result[1]);
            if (deciphered != '') {
                links[i].href = deciphered;
                cleanedAny = true;
            }
        }
    }

    if (cleanedAny === true) {
        var create = function(htmlStr) {
            var frag = document.createDocumentFragment(), temp = document.createElement('div');
            temp.innerHTML = htmlStr;
            while (temp.firstChild) {
                frag.appendChild(temp.firstChild);
            }
            return frag;
        }

        var note = create('<div style="border:3px solid #00cc33;color:#00cc33;background-color:#ffffff;margin:4px;padding:0 5px 0 5px;font-weight:bolder;width:20px;z-index:99999;font-size:24px">&#x2713;</div>');
        document.body.insertBefore(note, document.body.childNodes[0]);
    }

})(window);

