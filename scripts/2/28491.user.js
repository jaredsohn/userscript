// ==UserScript==
// @name           pornonauts friend
// @namespace      niewiem co to
// @description    it chanchegs urls to free galeries from through porno site link to the direct to galery link. It works with most porn sits like www.paradisenudes.com, www.famouspornstars.com etc
// @include        http://*
// ==/UserScript==

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
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

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

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

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

}

//encodes url from string format to the href format
function urlDecode(str){
     
      re = /%3a/gi;
      str = str.replace(re, ":");
      
      re = /%2f/gi;
      str = str.replace(re, "/");
      
      re = /%3f/gi;
      str = str.replace(re, "?");
      
      re = /%3d/gi;
      str = str.replace(re, "=");
      
      re = /%2c/gi;
      str = str.replace(re, ",");

      re = /%26/gi;
      str = str.replace(re, "&");
    
      return str;
}


a_Of_As = document.getElementsByTagName("a");
mod=0;

for(i=0; i < a_Of_As.length; i++){

//finding standard url
  if((posUrl = a_Of_As[i].href.lastIndexOf("=http")) > -1){

//makeing description
    alt = "";

    if(a_Of_As[i].firstChild.alt)
      alt = a_Of_As[i].firstChild.alt + " : ";
    else if (a_Of_As[i].firstChild.title){
      alt = a_Of_As[i].firstChild.title + " : ";
      a_Of_As[i].firstChild.removeAttribute("title");
    }
    a_Of_As[i].title =  alt + a_Of_As[i].href;

//url decoding
    a_Of_As[i].href = urlDecode(a_Of_As[i].href);
    
    //overwritenning original reference
    a_Of_As[i].href = a_Of_As[i].href.substr(posUrl+1);
    if((pos2 = a_Of_As[i].href.indexOf("&")) > -1){
      a_Of_As[i].href = a_Of_As[i].href.substr(0, pos2);
    }
    mod++;

    //testing if base 64 encoded
  }else if(a_Of_As[i].href.indexOf("aHR0cD") > -1) {
    //stripping from other stuff
    url = a_Of_As[i].href.substr(a_Of_As[i].href.indexOf("aHR0cD"));
    if((end64 = url.indexOf("&")) > -1) url = url.substr(0, end64);
    
    //base64 decoding
    url = Base64.decode(url);
    
    //makeing description
    alt = "";

    if(a_Of_As[i].firstChild.alt)
      alt = a_Of_As[i].firstChild.alt + " : ";
    else if (a_Of_As[i].firstChild.title){
      alt = a_Of_As[i].firstChild.title + " : ";
      a_Of_As[i].firstChild.removeAttribute("title");
    }
    a_Of_As[i].title =  alt + a_Of_As[i].href;
    
//url decoding
    a_Of_As[i].href = urlDecode(a_Of_As[i].href);
    
    
    //overwritenning original reference
    a_Of_As[i].href = url;

    mod++;
  }
}