// ==UserScript==
// @name           MegaUpload Google OCR
// @namespace      blurg!
// @include        http://www.megaupload.com/?d=*
// @include        http://megaupload.com/?d=*
// @version        0.1
// ==/UserScript==

//http://userscripts.org/scripts/source/69456.user.js
BinaryRes = {};

BinaryRes.get = function (object) {
  var request = {
    method: 'GET',
    url: object.url,
    overrideMimeType: 'text/plain; charset=x-user-defined',
    binary: true,
    onload: object.callback,
  };

  if (object.override) {
    for (var attr in object.override) request[attr] = object.override[attr]
  }

  GM_xmlhttpRequest(request);
}

BinaryRes._clean = function (bytes) {
  var binarray = [];
  [].forEach.call(bytes, function (byte) {
      binarray.push(String.fromCharCode(byte.charCodeAt(0) & 0xff));
    });
  return binarray.join('');
}

BinaryRes._bound = function() {
  var z = 98729145294692;  var a = 12400722650394;
  return Array(28).join('-') + Math.floor(Math.random() * (z - a)) + a;
}

BinaryRes._typeof = function(value) {
  // from crockford
  var s = typeof value;
  if (s === 'object') {
    if (value) {
      if (typeof value.length === 'number' &&
        !(value.propertyIsEnumerable('length')) &&
        typeof value.splice === 'function') {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }
  return s;  
}

BinaryRes.post = function (obj) {
  // url, callback, data
  console.log(obj);
  var build = [];
  var boundary = BinaryRes._bound();  
  for (var name in obj.data) {
    if (obj.data.hasOwnProperty(name)) {
      build.push('--' + boundary);
      var disp = 'Content-Disposition: form-data; name="' + name + '"';
      if (BinaryRes._typeof(obj.data[name]) == 'object') {
        var value = BinaryRes._clean(obj.data[name].value);
        if (obj.data[name].filename)
          disp += '; filename="' + obj.data[name].filename + '"';
        build.push(disp);
        build.push('Content-type: ' + obj.data[name].type);
      } else {
        var value = obj.data[name];
        build.push(disp);
      }
      build.push('');
      build.push(value);
    }
  }
  console.log(build);
  build.push('--' + boundary + '--');
  var data = build.join('\r\n');
  console.log(data);
  var request = {
    method: 'POST',
    url: obj.url,
    binary: true,
    headers: {
      "Content-Type": 'multipart/form-data; boundary=' + boundary,
      "Content-Length": data.length
    },
    data: data,
    onload: obj.callback,
	onerror:function(e){console.log(e);}
  };
  if (obj.override) {
    for (var attr in obj.override) request[attr] = obj.override[attr]
  }
  console.log('GM_xmlhttpRequest');
  GM_xmlhttpRequest(request);
}

BinaryRes.guessType = function(stream) {
  if (!stream) return;
  var dict = [
    [0, 3, '\xFF\xD8\xFF', 'image/jpeg'],
    [1, 4, 'PNG', 'image/png'],
    [0, 3, 'GIF', 'image/gif'],
    [0, 4, '%PDF', 'application/pdf'],
  ]
  stream = BinaryRes._clean(stream);
  for (var ii = 0; ii < dict.length; ii++) {
    if (stream.slice(dict[ii][0], dict[ii][1]) === dict[ii][2])
      return dict[ii][3];
  }
}



var mugOCR={
		imgcheck:document.querySelector('img[src*="gencap"]')
	};

mugOCR.postImageTogdocs=function(imgData){
console.log(imgData);
//console.log(imgData.responseText);
	var params = {value: imgData.responseText};

	BinaryRes.post({
		method: "POST",
		url: "http://docs.google.com/feeds/default/private/full?ocr=true",
		data: params,
		headers: {
			"Host": "docs.google.com",
			"GData-Version": "3.0",
			"Authorization": "GoogleLogin auth="+mugOCR.auth,
			"Content-Type": "image/gif",
			"Slug": "OCRd Doc"																																						
		},
		onload: function(r) {
			//console.log(r);
			//var rt = r.responseText;
			//console.log(rt);
		}		
	});						

}



mugOCR.getCaptchaImg=function(){
	BinaryRes.get({
		url: mugOCR.imgcheck.src,
		callback: mugOCR.postImageTogdocs
	});
}

if(mugOCR.imgcheck){

	mugOCR.auth = GM_getValue('mugOCR');

	if(!mugOCR.auth){

		var sE = prompt("Enter Email Address");
		console.log(sE);
		if (sE.length>1){
		
			var sP = prompt("Enter Password");
			if (sP.length>1){
			
				GM_xmlhttpRequest({
					method: "POST",
					url: "https://www.google.com/accounts/ClientLogin",
					data: "Email="+sE+"&Passwd="+sP+"&accountType=GOOGLE&service=writely",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(r) {
						var rt = r.responseText;
						if(rt.indexOf('Auth=')>-1){
							var a =rt.split('Auth=')[1];
							mugOCR.auth = a;
							GM_setValue('mugOCR', a);
							mugOCR.getCaptchaImg();
						}
					}
				});
				

				
			}
		}
	
	}
	else{
		mugOCR.getCaptchaImg();
	}
	
}
