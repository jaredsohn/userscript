// ==UserScript==
// @name           cosmiq - tag suggestion
// @namespace      tag:neokolor@gmx.de,2010-01-15:leobm
// @include        http://www.cosmiq.de/lili/my/add*
// @include        http://www.cosmiq.de/lili/my/add?*
// @version        20100922 1.3
// ==/UserScript==

(function(d){
	var _data = {};
	var urlInput = d.getElementById('url');
	var _ = unsafeWindow['window'];
	var fetchDeliciousHandler = function(e) {
		// clean up url:
		// - add trailing slash to url
		// - remove hash fragment
		urlInput.value = (new UriParser(urlInput.value)).rebuild().split('#')[0];
	    if (urlInput.value=='' || urlInput.value == urlInput.oldValue ) return;
		urlInput.oldValue = urlInput.value;
		var _url = urlInput.value;
    	if (!_url) return;
    	var obj_url = new UriParser(_url);
    	// console.log("url:", _url);
    	var pageDesc = '';
    	var pageTitle='';

    	if (obj_url.host=='github.com') {
    		// github project page
			getDOC(_url, function(doc) {
				var ps = query(doc, 'div#repository_description p');
      			if (ps.length>0) {
      				var tmpDesc = (ps[0].textContent || '')
   						.replace(/[\n\r\t]+/g,'')
   						.replace('— Read more', '')
   						.replace(/^\s+|\s+$/,'');
   					pageDesc = tmpDesc;
   					d.getElementById('desc').value = pageDesc;
      			}
	  		});
    	} else if (obj_url.host=='code.google.com') {
    		// goggle code project page
	    	_.updatepageTG = function(str) {
				d.getElementById('pagetitle').style.backgroundImage = 'none'; 
	    	};    		
    		getDOC(_url, function(doc) {
    			
    			var pn = query(doc, 'div#pname a');
    			if (pn.length>0) {
    				var tmpTitle = (pn[0].textContent || '')
    				.replace(/^\s+|\s+$/,'');
    				pageTitle = tmpTitle;
    				d.getElementById('pagetitle').value = tmpTitle;
    			}
    			var s = query(doc, 'a#project_summary_link');
    			if (s.length>0) {
    				var tmpDesc = (s[0].textContent || '')
    				.replace(/^\s+|\s+$/,'');
    				pageDesc = tmpDesc;
   					d.getElementById('desc').value = pageDesc;
    			} 
    		});
    	}
 				
		showAjaxIndicator(indicatordata, 'loading delicious tags...');
		GM_xmlhttpRequest({
		method: "GET",
	    url: 'http://feeds.delicious.com/v2/json/url/'+MD5(_url),
	    onload: function(res) {
	    		hideAjaxIndicator();
				var json = res.responseText;
				try {
					var data = eval(json);
					createDescriptionAutoSuggestion(data.map(function(item) {
						return item.d;
					}));
					var tagsObj = (data.map(function(item) {
						return item.t;
					}).reduce(function(a,b){
						return a.concat(b);	
					}).reduce(function(counts,word) {
						word = word.replace(/[^a-zA-Z0-9ÂâàÀáÁøØãÃõÕõÕĲĳ€ßäÄöÖüÜéèêæÆœŒçÇïÏëËñÑåÅÊÉÈ ]/g, '');
						counts[word] = (counts[word] || 0) + 1;
						return counts;
					},{}));
					var tagsList = (function(lst, tags) {
					 for(n in tags) lst.push([n, tags[n]]);
					 return lst;
					})([],tagsObj).sort(function(a,b) {
						return a[1]<b[1];
					});
					if (typeof _.GM_showSuggestion != 'function') {
						function GM_showSuggestion(tagsList) {
							var newTagP = new Element('p', { style: 'display:none'});
							newTagP.setAttribute('id','deliciousTags');
							tagsList.forEach(function(tag, idx) {
								var newTagA = Builder.node('span', [ Builder.node('a',{ href: '#'+tag[0], onclick: 'addCommonTag(\''+tag[0]+'\');' },[
									  Builder.node('img', {src: 'http://static.delicious.com/img/delicious.16.gif', border:'0', width:'16', height: '16'}),
									  tag[0]
									]),
									'('+tag[1]+')',
								    Builder.node('br')
								]);
							    newTagP.appendChild(newTagA);
							});
							$('commonTags').insert({after: newTagP});
							Effect.BlindDown(newTagP, { duration: 0.6 });
						}; // end showSuggestion
						appendJavascript(GM_showSuggestion.toString());
					}
					_.GM_showSuggestion(tagsList.slice(0,20));			
				} catch(ex) {
					_.console.log(ex);
					GM_log('Oops! evaluation error :' + json);
				}
	    },
	    onerror: function(res) {
			GM_log('Oops! Access error to delicious');
			hideAjaxIndicator();
	    }
	   });
	};
	urlInput.addEventListener('blur',fetchDeliciousHandler,true);
	d.getElementById('tags').addEventListener('click', fetchDeliciousHandler, true);
	
var createButton = function(text, elId, position) {
	if (typeof _.GM_createButton != 'function') {
	 function GM_createButton(text, elId, position) {
	   var elButton = Builder.node('div', {style: 'float:left; background: transparent url(/i/linkbar_bg2.gif) repeat-x scroll right top; -moz-border-radius: 10px; -moz-box-shadow: 4px 4px 5px #888;'},[
	        Builder.node('a',{href: '#titleSuggestion', style: 'padding:10px; height: 18px;'},[
	     	Builder.node('img',{src: 'http://static.delicious.com/img/delicious.16.gif', border:'0', width:'16', height: '16'}),
	     	text
	     ])	   	
	   ]);
	   $(elId).insert({after: elButton});
	 }
     appendJavascript(GM_createButton.toString());
	}
	_.GM_createButton(text, elId, position);
}

var createDescriptionAutoSuggestion = function(dataAsList) {

	if (typeof _.GM_createDescriptionAutoSuggestion != 'function') {
	  function GM_createDescriptionAutoSuggestion(dataAsList) {
	    var node = Builder.node('div',{id: 'desc_by_delicious', 'class': 'autocomplete', style:'display:none; position:absolute; margin:0; padding:0;'});
		$('desc').writeAttribute('autocomplete','off').insert({after: node});		
		var completer = new Autocompleter.Local('desc', 'desc_by_delicious', dataAsList, {frequency: 0.1, updatechoices: 5, ignoreCase: true, fullSearch: true});
	  }
	  appendCss('div.autocomplete { margin:0px; padding:0px; width:250px; background:#fff; border:1px solid #888; position:absolute;z-index: 1000; }'
	  +'div.autocomplete ul {margin:0px;  padding:0px; list-style-type:none;}'
	  +'div.autocomplete ul li.selected { background-color:#ffb;}'
	  +'div.autocomplete ul li {margin:0;padding:2px; height:32px; display:block; list-style-type:none; cursor:pointer;}');
      appendJavascript(GM_createDescriptionAutoSuggestion.toString());
 	}
    _.GM_createDescriptionAutoSuggestion(dataAsList);
}


_.onload = function() {
 //createButton("Titel Vorschlagen", 'pagetitle','after');
 //createDescriptionAutoSuggestion();
}

var showAjaxIndicator = function() {
	if (typeof _.GM_showAjaxIndicator != 'function') {
	  function GM_showAjaxIndicator(indicatordata) {
		if ($('deliciousTags')) Element.remove($('deliciousTags'));
	  	var newTagP = Builder.node('p', {id: 'GM_ajax_tagsuggest_indicator'}, [
	    	Builder.node('img', { src: indicatordata}),
	    	'Lade delicious Tag Vorschläge...'
	    ]);
	 	$('commonTags').insert({after: newTagP});
	  };
	  appendJavascript(GM_showAjaxIndicator.toString());
	}
	_.GM_showAjaxIndicator(indicatordata);
}
var hideAjaxIndicator = function() {
	var el = d.getElementById('GM_ajax_tagsuggest_indicator');
	if (el && el.parentNode) el.parentNode.removeChild(el);
}

var appendJavascript = function(scriptCode) {
	var script = d.createElement("script");
	script.type = "application/javascript";
	script.textContent = scriptCode; 
	d.getElementsByTagName('head')[0].appendChild(script);
}

var appendCss = function(cssOutput) {
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	var cssText = document.createTextNode(cssOutput);
	style.appendChild(cssText);
	document.getElementsByTagName('head')[0].appendChild(style);
}

function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}
function query(doc, selector) {
	try {
		var nodes = Array.prototype.slice.call(
   			doc.querySelectorAll(selector));
 		return nodes;	
	} catch(e){}
	return [];
}

var regexUri = /^([a-z0-9+.-]+):(?:\/\/(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*|\[(?:[0-9A-F:.]{2,})\])(?::(\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?|(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@\/]|%[0-9A-F]{2})*)?)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:\/?@]|%[0-9A-F]{2})*))?$/i;

// 
//  MD5 (Message-Digest Algorithm)
var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8)}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8)}else{return(lResult^0x40000000^lX8^lY8)}}else{return(lResult^lX8^lY8)}}function F(x,y,z){return(x&y)|((~x)&z)}function G(x,y,z){return(x&z)|(y&(~z))}function H(x,y,z){return(x^y^z)}function I(x,y,z){return(y^(x|(~z)))}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray};function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue};function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()};

var indicatordata='data:image/gif;base64,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';

UriParser=function(uri){if(uri)this.parse(uri)};UriParser.prototype={_regExp:/^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/,username:null,password:null,port:null,protocol:null,host:null,pathname:null,url:null,querystring:{},fragment:null,_getVal:function(r,i){if(!r)return null;return(typeof(r[i])=='undefined'?null:r[i])},parse:function(uri){var r=this._regExp.exec(uri);if(!r)throw"UriParser::parse -> Invalid URI";this.url=this._getVal(r,0);this.protocol=this._getVal(r,2);this.username=this._getVal(r,4);this.password=this._getVal(r,5);this.host=this._getVal(r,6);this.port=this._getVal(r,7);this.pathname=this._getVal(r,8);this.querystring=new UriParser.QueryString(this._getVal(r,9));this.fragment=this._getVal(r,10);return r},rebuild:function(){var url=(this.protocol||'http')+'://'+([this.user,this.password].filter(function(item){return item}).join(':').replace(/(.+)$/,'$1@'))+(this.host||'')+(this.port||'').replace(/^(\d+)/,':$1')+'/'+(this.pathname||'').replace(/^\//,'')+(this.querystring.toString()||'').replace(/^(.+)/,'?$1')+(this.fragment||'').replace(/^(.+)/,'#$1');return url}};UriParser.QueryString=function(qs){if(!qs){this.rawQueryString='';this.length=0;return}this.rawQueryString=qs;var args=qs.split('&');this.length=args.length;for(var i=0;i<args.length;i++){var pair=args[i].split('=');this[unescape(pair[0])]=((pair.length==2)?unescape(pair[1]):pair[0])}};UriParser.QueryString.prototype={rawQueryString:'',length:0,toString:function(){return this.rawQueryString}};
}(document));