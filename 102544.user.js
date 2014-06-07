// ==UserScript==
// @name test
// @include *
// ==/UserScript==
var Corruptions = {
    'image/jpeg': function() {
      return this.replace(/0/g, Math.floor(Math.random() * 10));
    },
    'image/gif': function() {
      return this.replace(/x/ig, Math.floor(Math.random() * 10));
    },
    'image/png': function() {
      return this.replace(/x/ig, Math.floor(Math.random() * 10));
    }
};

Array.filter(document.images, is_glitchable).forEach(glitch);

document.addEventListener("DOMNodeInserted", function(e){
	if (!e.target.tagName) return;
	Array.filter(e.target.getElementsByTagName('img'), is_glitchable).forEach(function(el){
		setTimeout(function(){ glitch(el); },0);
	});
}, false);

function glitch(element) {
  GM_xmlhttpRequest({
    method: "GET",
    overrideMimeType: "text/plain; charset=x-user-defined",
    url: element.src,
    onload: function (res) {
    if (debug) console.log(res);
      var type = contentType(res.responseHeaders);
      var oldsrc = element.src;
      
      if(typeof Corruptions[type] != 'undefined') {
				element.addEventListener('error', function() {
					this.src = oldsrc;
				}, false);

				element.src =
					[
					 'data:',
					 type,
					 ';base64,',
					 base64encode(Corruptions[type].apply(res.responseText)),
					 ].join('');
      }
    }
  });
}

function contentType(headers) {
  return headers.match(/Content-Type: (.*)/i)[1];
}

function base64encode(data) {
  return btoa(data.replace(/[\u0100-\uffff]/g, function(c) {
    return String.fromCharCode(c.charCodeAt(0) & 0xff);
  }));
}

function is_glitchable(img) {
  return img.src.match(/\.(gif|jpe?g)/i);
}