// ==UserScript==
// @name           Amazon short URI (Fukuyo Edition)
// @namespace      http://amagrammer.org/
// @description    Short URI for amazon.
// @include        http://www.amazon.co.jp/*
// @include        http://amazon.co.jp/*
// @include        http://www.amazon.jp/*
// @include        http://amazon.jp/*
// ==/UserScript==
/*
Original version - http://www.foxking.org/oldsite/?20080424S1  by  Sugano `Koshian' Yoshihisa(E)
*/

(function() {
  function insertAfter(parent, node, referenceNode) {
        parent.insertBefore(node, referenceNode.nextSibling);
  }
  var asin = document.getElementById('ASIN');
  var base = 'http://amazon.jp/';
  var dirs = ['dp/', 'o/ASIN/', 'gp/product/'];
  var panel;

  if (asin) {
    var target = document.getElementById('buyboxDivId');
    var block = document.createElement('div');
    block.setAttribute('style', 'text-align: right;');

    panel = '<select id="ASUselect" onChange="' + 
      'document.getElementById(\'ASUtext\').value =\'' + base +'\'+' +
      'document.getElementById(\'ASUselect\').value + ' +
      'document.getElementById(\'ASIN\').value;' +
      'document.getElementById(\'ASUlink\').href = document.getElementById(\'ASUtext\').value;' +
      '">';

    for( var i = 0; i < dirs.length; i++ ){
		var el = '<option value="ASUValue" selected>ASUValue</option>';
		if(location.pathname.indexOf(dirs[i]) != 1) {
          el = el.replace(/ selected/g, "");
        }
		panel += el.replace(/ASUValue/g, dirs[i]);
	}

    panel += '</select>';
    panel += '<input type="text" size="18" id="ASUtext"' +
      'readonly="readonly" onfocus="this.select();">';
    panel = '<a href = "" id = "ASUlink">' + document.title + '</a><br>' + panel;
    block.innerHTML = panel;
    insertAfter(target.parentNode , block , target);
    
    var view = document.getElementById('ASUtext');
    var select = document.getElementById('ASUselect');
    var link = document.getElementById('ASUlink');

    view.value = base + select.value + asin.value;
    link.href = view.value;
  }
})();
