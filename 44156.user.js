// ==UserScript==
// @name           Rapid Response Twitter Script (RRTS)
// @namespace      http://adityamukherjee.com/geekaholic/
// @description    Adds a box on Twitter profiles to quickly respond to the user (who's profile you're on), right from his/her profile — without having to go back to your own.
// @include        http://twitter.com/*
// @exclude        http://twitter.com/home
// @exclude        http://twitter.com/replies
// @exclude        http://twitter.com/direct_messages
// @exclude        http://twitter.com/login
// @exclude        http://twitter.com/favorites
// @exclude        http://twitter.com/devices
// @exclude        http://twitter.com/account*
// ==/UserScript==

(function(){
// grabbed from https://developer.mozilla.org/en/Using_XPath (too lazy to code one out myself)
function evaluateXPath(aNode, aExpr) {var xpe = new XPathEvaluator();var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ? aNode.documentElement : aNode.ownerDocument.documentElement);var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);var found = [];var res;while (res = result.iterateNext()){found.push(res);}return found;}
function trim(str, chars){return ltrim(rtrim(str, chars), chars);}
function ltrim(str, chars){chars = chars || "\\s";return str.replace(new RegExp("^[" + chars + "]+", "g"), "");}
function rtrim(str, chars){chars = chars || "\\s";return str.replace(new RegExp("[" + chars + "]+$", "g"), "");}

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}}

//get stored values
var twitter_uname = GM_getValue('t2f_uname');var twitter_pass = GM_getValue('t2f_pass');
if(twitter_uname == undefined || twitter_pass == undefined){
	var t_name = prompt("Enter your Twitter username (for RRTS)");
	var t_pass = prompt("Enter your Twitter password (for RRTS)");
		GM_setValue('t2f_uname', t_name);
		GM_setValue('t2f_pass', t_pass);
}

var section = evaluateXPath(document, '//div[@class="section"]/ol');
	section = section[0];
	
	var name = evaluateXPath(document, '//h2[@class="thumb clearfix"]');
		name = trim(name[0].textContent);
	var textarea = document.createElement('textarea');
		textarea.setAttribute('style', 'width:100%;height:40px;margin-bottom:5px;-x-system-font:none;font-family:"Lucida Grande",sans-serif;font-size:1.15em;font-size-adjust:none;font-stretch:normal;font-style:normal;font-variant:normal;font-weight:normal;height:2.5em;line-height:1.1;overflow:auto;padding:5px;width:508px;');
		textarea.id = 'status';
	var submit = document.createElement('input');
		submit.setAttribute('type', 'submit');
		submit.setAttribute('value', 'Reply to ' + name);
		submit.addEventListener('click', function(){
			var status = '@' + name + ' ' + document.getElementById('status').value;
			
			GM_xmlhttpRequest({
			    method: 'POST',
				url: "https://" + twitter_uname + ":" + twitter_pass + "@twitter.com/statuses/update.xml",
				data: 'status=' + status,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + Base64.encode(twitter_uname + ":" + twitter_pass)
				},
				onload: function(responseDetails){
					document.getElementById('status').value = "";
					alert('Your reply was posted successfully!');
				}
			});
		}, true);
		
	section.parentNode.insertBefore(textarea, section);
	section.parentNode.insertBefore(submit, section);
})();