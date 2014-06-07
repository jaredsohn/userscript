// ==UserScript==
// @name          Anti-Privacy
// @namespace     http://w-shadow.com/
// @description   Posts every visited URL to Twitter
// @exclude       https://*
// @exclude       http://localhost/* 
// ==/UserScript==

(function(){
	//Insert your Twitter details below
	var twitter_username = 'change this';
	var twitter_password = 'change this';
	
	//----------------------------------
	
	//Don't run in frames
	if ( top != self ) { 
		return;
	}

	//Generate a short URL using the TinyURL API
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://tinyurl.com/api-create.php?url="+encodeURIComponent(document.location.href),
		headers:{
			"User-Agent":navigator.userAgent,
		},
		onload:function(response) {
			if (response.status == 200){ //Note : unreliable error checking, should check the response itself
				twitter_update(twitter_username, twitter_password, document.title, response.responseText);
			}
		}
	});
	
	function twitter_update(username, password, status, url){
		//Clip the text if it's longer than 140 chars
		//(assumes a tinyurl is always shorter than 136 characters)
		if (status.length + url.length + 1 > 140){
			status = status.substr(0, 140 - 4 - url.length) + '...';
		}
		
		//base64-encode username & password for use with Basic HTTP authentication
		var base64string = Base64.encode(username + ":" + password);
		//Tweet
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://twitter.com/statuses/update.json',
			headers: {
				'User-agent': navigator.userAgent,
				'Authorization':'Basic ' + base64string,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			data : 'status='+encodeURIComponent(status + ' ' + url),
			onload : function(response){
				if (response.status == 200){
					//successfuly posted to Twitter
				} else {
					//an error occured and I don't care
				}
			}
		});
	}
			  
})();

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

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