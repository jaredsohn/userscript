// ==UserScript==
// @name           Google Maps Streetview Thumbnail
// @description    On the Google Maps streetview, shows the panorama thumbnail (with a link to the larger one).
// @namespace      http://userscripts.org/users/ucnv
// @include        http://maps.google.tld/*
// @include        http://www.google.tld/maps*
// ==/UserScript==

var link = document.getElementById('links');
link && (function() {
  var makeLink = (function() {
    var zoom = 2;   // 0-3
    var mx = [[0, 0], [1, 0], [3, 1], [6, 3], /*[12, 6], [25, 12]*/];
    var link = '<div style="white-space:nowrap;">';
    for(var y = 0; y <= mx[zoom][1]; y++) {
      for(var x = 0; x <= mx[zoom][0]; x++) {
        link += '<img src="http://cbk3.google.com/cbk?output=tile&panoid={panoid}&zoom='      
             + zoom + '&x=' + x + '&y=' + y + '" />';
      }
      link += '<br/>';
    }
    link += '</div>';
    link = 'data:text/html;,' + encodeURIComponent(link);
    return function(panoid) {
      return link.replace(/%7Bpanoid%7D/g, encodeURIComponent(panoid));
    }
  })();

  var thumb = document.createElement('div');
  thumb.style.cssText = 'position:absolute;right:1px;top:25px;';
  thumb.innerHTML = '<a href="" target="_blank" id="link-thumb"><img style="height:65px;" src="" /></a>';
  var href = 'http://cbk3.google.com/cbk?output=thumbnail&panoid=';
  
  var show = function(e) {
    if(e.attrName != 'href') return;
    var m = e.target.href.match(/panoid=([^&]+)/);
    if(!m) {
      document.body.removeChild(thumb);
    } else {
      if(document.getElementById('link-thumb') == null) document.body.appendChild(thumb);
      var target = document.getElementById('link-thumb');
      target.childNodes[0].src = href + m[1];
      target.href = makeLink(m[1]);
    }
  };
  
  link.addEventListener('DOMAttrModified', show, false);
  show({target: link, attrName: 'href'});
})();
