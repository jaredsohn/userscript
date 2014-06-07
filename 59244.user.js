// ==UserScript==
// @name           Wikipedia Languages Minimizer
// @namespace      local.wikipedia-languages-minimizer
// @include        http://*.wikipedia.org/*
// ==/UserScript==

(function(){
	var languages = ['en', 'ru'];
	var list = document.getElementById('p-lang').getElementsByTagName('ul').item(0);
	var items = list.getElementsByTagName('li');

	var allowed = function(lang) {
		for (var i in languages) {
			if (lang !== languages[i]) {
				continue;
			}

			return true;
		}

		return false;
	}

	var hasKnownLanguages = false;

	for (var i = 0; i < items.length; ++i) {
		var item = items.item(i);
		var lang = item.className.replace(/^interwiki-/, '');

		if (! allowed(lang)) {
			item.style.display = 'none';
		} else {
			hasKnownLanguages = true;
		}
	}

	if (! hasKnownLanguages) {
		var text = document.createElement('li');
		text.innerHTML = 'no known languages';
		text.style.color = '#ccc';
		list.appendChild(text);
	}

	var disable = document.createElement('li');
	disable.innerHTML = '<i>show all languages</i>';
	disable.style.cursor = 'pointer';
	disable.setAttribute('onclick', 'var s = this.parentNode.getElementsByTagName(\'li\');'
	                              + 'for (var i in s) { s.item(i).style.display = \'\'; };'
	                              + 'this.style.display = \'none\';');

	list.appendChild(disable);
})()

