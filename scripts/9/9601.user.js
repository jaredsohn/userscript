// ==UserScript==
// @name           Directory Index Image Viewer
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        *
// ==/UserScript==

(function() {
  var title = $t('title')[0];
  
  if(!!title && title.innerHTML.match(/Index of \//)) {
    imgs = Array.prototype.filter.apply($t('a'), [function(e) { return e.href.match(/png|gif|jpe?g/i) }]);

    var i = 0;
    setTimeout(function forEach() {
      if(!(i < imgs.length))
	return;
      var img = document.createElement('img');
      var e = imgs[i++];
      img.src = e.href;
      e.innerHTML = '';
      e.appendChild(img);
      setTimeout(forEach);
    });
  }
  
  function $t(tagname) {
    return document.getElementsByTagName(tagname);
  }
})();
