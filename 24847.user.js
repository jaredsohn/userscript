// ==UserScript==
// @name           Amazon short URI with hatena bookmark
// @namespace      http://www.misao.gr.jp/~koshian/
// @description    Short URI for amazon.
// @include        http://www.amazon.co.jp/*
// @include        http://amazon.co.jp/*
// @include        http://www.amazon.jp/*
// @include        http://amazon.jp/*
// ==/UserScript==

(function() {
  var asin = document.getElementById('ASIN');
  var base = 'http://amazon.jp/';
  var dirs = ['dp/', 'o/ASIN/', 'gp/product/'];
  var panel;

  if (asin) {
    var target = document.getElementById('nonmemberStripe');
    var block = document.createElement('div');
    block.setAttribute('style', 'text-align: right;');

    panel = '<select id="ASUselect" onChange="' + 
      'document.getElementById(\'ASUtext\').value =\'' + base +'\'+' +
      'document.getElementById(\'ASUselect\').value + ' +
      'document.getElementById(\'ASIN\').value; ">';

    for( var i = 0; i < dirs.length; i++ ){
		var el = '<option value="ASUValue" selected>ASUValue</option>';
		if(location.pathname.indexOf(dirs[i]) != 1) {
          el = el.replace(/ selected/g, "");
        }
		panel += el.replace(/ASUValue/g, dirs[i]);
	}

    panel += '</select>';
    panel += '<input type="text" size="30" id="ASUtext"' +
      'readonly="readonly" onfocus="this.select();">';
    panel += '<input type="button" value = "Go!" ' +
      'onClick="location.href = ASUtext.value;">';
    panel += ' <a href="http://b.hatena.ne.jp/add?mode=confirm&title=' +
      escape(document.title) + '&url=' +
      escape('http://www.amazon.co.jp/gp/product/' + asin.value) +
      '"><img src="data:image/gif;base64,' +
      'R0lGODlhEAAMAJECABhBzv///////wAAACH5BAEAAAIALAAAAAAQAAwAAAIm' +
      'FI6ZFu3/DgzKSWpBuxJtTYFKV4VbhnLoZ4baZcJZwk42YIy6UAAAOw=="' + 
      'alt="はてなブックマークに追加" style="border: none;"></a>';
    block.innerHTML = panel;
    target.appendChild(block);

    var view = document.getElementById('ASUtext');
    var select = document.getElementById('ASUselect');

    view.value = base + select.value + asin.value;
  }
})();
