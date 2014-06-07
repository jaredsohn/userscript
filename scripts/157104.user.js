// ==UserScript==

// @name          PasteBin Ideone exec

// @namespace     http://www.sovas.lv

// @description   Exec PasteBin javascript codes. Try out example in http://pastebin.com/u6zFGfz2

// @include      http://pastebin.com/*

// ==/UserScript==

(function(){

		var siteUrl = "http://sovas.id.lv/ss/ideone.php";
		
		var ajaxQueue = [];
		
		var processAjaxQueue = function(){
		  if (ajaxQueue.length > 0) {
			for (ajax in ajaxQueue) {
			  var obj = ajaxQueue[ajax];
			  // http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html
			  GM_xmlhttpRequest(obj);
			}
			ajaxQueue = [];
		  }
		}
		setInterval(function(){
		  processAjaxQueue();
		}, 100);
		 
		function gmAjax(obj){
		  ajaxQueue.push(obj);
		}


  //boilerplate greasemonkey to wait until jQuery is defined...
  
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery , unsafeWindow); });
  }
  GM_wait();

  function letsJQuery($ , usw)
  {
	var ico = '<img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAqUExURX2Ch9Td55ektEZPWy42PbvH0uXm5vH1+uvx+PP3/OLb2+3u7tHSyv///7EjLhsAAAAOdFJOU/////////////////8ARcDcyAAAAJhJREFUeNqE0AkKAyEMBdD/s7nMeP/rVjum7UBpg0R8kASD8SXwEwWQOwIDpWDdL4RXIAKoLonqteyorolVeAQZB6UmDu3dYQbvXXc5gNNlvlT8xJq1Tmv+bDWbe2sbSYkLQ8gLzWbdLhc1y0EUiupMzEHDGEuXBS1R6PSImSiJw0Bd31TC3guZ3bHmmt1XZ7bl75I/4yHAAEWkDZnDccm2AAAAAElFTkSuQmCC" />';

	fullView = '<a title="Run Script" id= "imHereToRun" href="#">' + ico + '</a>';

	$('#code_buttons').append(fullView).find('#imHereToRun').click(
		function() {
			if (confirm('Run Script?')){
				try{
					var syntax = $('.paste_box_line2').find('a').html();
					/**if (syntax != 'NONE'){
						//Get language + post again
						console.log('Language not defined');
						gmAjax({
							  method: "POST",
							  url: siteUrl ,
							  headers: {'Content-type': 'application/x-www-form-urlencoded'},
							  data: "run=1&lang_name="+ syntax,
							  onload: function(response) {
								console.log(response);
							  }
						});	
					}else{**/
						if (syntax != 'NONE'){
							var syntax=prompt("Free Text input for Language to run","JavaScript (rhino)");
						}
						
						gmAjax({
							  method: "POST",
							  url: siteUrl /*+ "?run=1&lang_name=" + syntax */,
							  headers: {'Content-type': 'application/x-www-form-urlencoded'},
							  data: "run=1&lang_name="+ syntax,
							  onload: function(response) {
								try {
									obj = eval("(" + response.responseText + ")");
									if ($(obj.code).length == 1){
										runcode = obj.code[0].code;
										//send the code
										postCodeData($ , runcode);
									}else if ($(obj.code).length > 0){
										/*$(obj.code).each(
											function( index , value ) {
												console.log(index);
												console.log(value);												
											}
										);*/
										alert('Too many Language found');
									}else{
										alert('Language not found');
									}
								}catch(err){
									//Handle errors here
									alert('SomeHow can not parse Response');
								}
								
							  }
						});
						
					/*} */
				}
				catch(err){
				  //Handle errors here
				  alert(err);
				}
				
			}
		}
	);



  }
  
  
  function postCodeData($ , runcode){
		code = $('#paste_code').html();
		console.log(code);
		code = Base64.encode(code);
		console.log(code);
		gmAjax({
			  method: "POST",
			  url: siteUrl ,
			  headers: {'Content-type': 'application/x-www-form-urlencoded'},
			  data: "run=1&script_run="+ code + "&script_code=" + runcode ,
			  onload: function(response) {
				try {
					obj = eval("(" + response.responseText + ")");
					checkForResponse(obj.link , 1);
				}catch(err){
					//Handle errors here
					alert('SomeHow can not parse Response');
				}
			  }
		});	
  }
  
  function checkForResponse(link , runTime){
		gmAjax({
			  method: "POST",
			  url: siteUrl ,
			  headers: {'Content-type': 'application/x-www-form-urlencoded'},
			  data: "run=1&link="+ link ,
			  onload: function(response) {
				try {
					obj = eval("(" + response.responseText + ")");
					outPutData = obj.output.replace(/^\s+|\s+$/g, "");
					console.log(outPutData != '');
					
					//console.log(obj);
					if (outPutData == ''){
						if (runTime == 25){
							alert('Can not get outPut');
						}else{
							runTime = runTime + 1;
							checkForResponse(link , runTime);
						}
					}else{
						console.log(outPutData != '');
						alert(obj.output);
					}
				}catch(err){
					//Handle errors here
					console.log(response.responseText);
					alert('SomeHow can not parse Response');
				}
			  }
		});	
  }
  
  
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
})();