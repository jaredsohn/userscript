// ==UserScript==
// @name           2chThreadTitleImagize
// @namespace      http://polygonpla.net/
// @description    Generate title list only about photos in 2ch threads
// @include        http://*.*2ch.net/*/subback*
// @include        http://*.bbspink.com/*/subback*
// ==/UserScript==
(function() {
  
  
  setTimeout(function() { appendButton() }, 2);
  
  
  function appendButton() {
      var button, div;
      div = document.createElement('div');
      div.setAttribute('style',
        'text-align: right;' +
        'margin: 8px 0;'
      );
      button = document.createElement('button');
      button.addEventListener('click', function() {
          toImageTitles();
          div.parentNode.removeChild(div);
      }, true);
      button.appendChild(document.createTextNode('画像スレ抽出'));
      div.appendChild(button);
      document.body.insertBefore(div, document.body.firstChild);
  }
  
  
  function toImageTitles() {
      var parent, idx = 0, item, items = [], names = [], pattern = /(?:画|写)/g;
      
      parent = document.getElementById('trad');
      
      [].slice.call(parent.getElementsByTagName('a')).forEach(function(a) {
        if (pattern.test(a.textContent)) {
            item = a.cloneNode(true);
            item.setAttribute('target', '_blank');
            items.push(item);
            names.push({
                idx: idx++,
                name: a.textContent.match(/[（(](\d+)[)）][\s\u3000]*$/)[1] - 0
            });
        }
        a.parentNode.removeChild(a);
      });
      
      names.sort(function(a, b) {
        return a.name === b.name ? 0 : a.name > b.name ? -1 : 11;
      });
      
      names.forEach(function(name) {
        items.forEach(function(item, j) {
            if (name.idx === j) {
                parent.appendChild(item);
                parent.appendChild(document.createElement('br'));
            }
        });
      });
      
      (function() {
        var div = document.createElement('div');
        div.setAttribute('style',
          'margin: 10px;' +
          'line-height: 1.5;' +
          'padding: 10px;'
        );
        parent.parentNode.insertBefore(div, parent);
        parent.parentNode.removeChild(parent);
        div.appendChild(parent);
      })();
  }
})();

