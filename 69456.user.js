// ==UserScript==
// @name           Binary library
// @namespace      shoecream@luelinks.net
// @description    Lets you download files as a binary stream, and upload them as multipart/form-data. Userscript library.
// @include        *
// @license        cc-by-sa
// ==/UserScript==

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
  build.push('--' + boundary + '--');
  var data = build.join('\r\n');
  var request = {
    method: 'POST',
    url: obj.url,
    binary: true,
    headers: {
      "Content-Type": 'multipart/form-data; boundary=' + boundary,
      "Content-Length": data.length
    },
    data: data,
    onload: obj.callback
  };
  if (obj.override) {
    for (var attr in obj.override) request[attr] = obj.override[attr]
  }
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

