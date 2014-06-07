// ==UserScript==
// @name           make-a-face favorite photos
// @namespace      http://sekimura.typepad.com/
// @include        http://www.typepad.com/dashboard*
// @include        https://www.typepad.com/dashboard*
// ==/UserScript==

(function() {

  var elms = document.getElementsByTagName('div');

  for (var i=0; i < elms.length; i++) {
    if (elms[i].className === 'asset-title') {
      var anchor, url;
      try {
          anchor = elms[i].firstChild;
          url = anchor.getAttribute('href');
      } catch(err) {
        console.log('ERR: ' + err.description);
      }
      if (/^http:\/\/make-a-face\.org\/photo\//.test(url)) {
        url = url.replace(/make-a-face.org\/photo/, 'a0.typepad.com');
        anchor.innerHTML = '<img src="' + url + '-120pi" />';
      }
    }
  }
  
   
})();
