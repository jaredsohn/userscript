// ==UserScript==
// @name Amazon image link
// @namespace http://d.hatena.ne.jp/MillyC/
// @version 1.1.0
// @include http://www.amazon.co.jp/*
// ==/UserScript==

(function() {
  var caption = document.getElementById('prodImageCaption');
  if (caption) {
    var postfix = (function() {
      var links = document.getElementsByTagName('link');
      for (var i = 0; i < links.length; ++i) {
        if ('image_src' == links[i].getAttribute('rel'))
          return (links[i].getAttribute('href').match(/^.*_(V\d+_)\.jpg$/) || {})[1];
      }
    })();

    function addLink(uri, text) {
      var a = document.createElement('a');
      a.setAttribute('href', uri);
      a.setAttribute('style', 'margin-left: 0.5em;');
      a.setAttribute('class', 'image_link');
      a.textContent = text;
      caption.appendChild(a);
    }

    function updateImageLink(id) {
      var links = caption.getElementsByTagName('a');
      for (var i = 0; i < links.length; ++i)
        if ((/\bimage_link\b/).test(links[i].className||'')) return;
      var cell = document.getElementById('prodImageCell');
      var image = cell && cell.getElementsByTagName('img')[0];
      if (image) {
        var m = image.src.match(/^(.*)\._.*_(\.jpg|\.gif)/);
        if (m) addLink(m[1] + m[2], '\u30A4\u30E1\u30FC\u30B8');
      }
      if (caption.innerHTML.match(/\bzoom\b/i)) {
        var uri = caption.getElementsByTagName('a')[0].href;
        var asin = uri.match(/images\/([A-Z0-9]{10})\b/)[1];
        var no = '';
        var m = uri.match(/dp_otherviews_z_\d+.*\bimg=(\d+)\b/);
        if (m) no = '.PT0' + m[1];
        uri = 'http://z2-ec2.images-amazon.com/images/P/'+asin+'.01'+no+'._SCRMZZZZZZ_'+postfix+'.jpg';
        addLink(uri, '(\u5927)');
      }
    }

    updateImageLink();

    if (unsafeWindow.displayImage) {
      unsafeWindow._displayImage = unsafeWindow.displayImage;
      unsafeWindow.displayImage = function(id) {
        unsafeWindow._displayImage(id);
        updateImageLink(id);
      }
    }
  }
})();

(function () {
  var viewer = document.getElementById('zoomViewerDiv');
  if (viewer) {
    var img_url = (function (elem) {
      for (var i = 0; i < elem.childNodes.length; i++) {
        child = elem.childNodes[i];
        if (child.nodeName == 'IMG') {
          if (child.src.match('http://z2-ec2.images-amazon.com/images/P/'))
            return child.src.replace(/_SX\d+_SCLZ/, '_SCRM');
        } else if (child.childNodes.length) {
          var img_url = arguments.callee(child);
          if (img_url) return img_url
        }
      }
    })(viewer);

    var img_tag = document.createElement('img');
    img_tag.setAttribute('src', img_url);
    img_tag.setAttribute('alt', 'big_image');
    var a_tag = document.createElement('a');
    a_tag.setAttribute('href', img_url);
    a_tag.innerHTML = '<p>' + img_url + '</p>';
    a_tag.appendChild(img_tag);
    var div_tag = document.createElement('div');
    div_tag.setAttribute('style', 'text-align: center');
    div_tag.appendChild(a_tag);
    document.getElementsByTagName('body')[0].appendChild(div_tag);
  }
})();
