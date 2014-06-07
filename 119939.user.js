// ==UserScript==
// @name           rghost-thumbs
// @description    rghost.ru thumbs with direct download option for search,tags and files pages.
// @version        1.0.1.8
// @namespace      VIP
// @include        http://rghost.ru/search?*
// @include        http://rghost.ru/tags/*
// @include        http://rghost.ru/files
// @include        http://rghost.ru/files?*
// @include        http://rghost.net/search?*
// @include        http://rghost.net/tags/*
// @include        http://rghost.net/files
// @include        http://rghost.net/files?*
// ==/UserScript==

(function() {
	// DIRECT_DOWNLOAD_LINK constant:
	//   true - use AJAX to get direct download links
	//   false - only adds thumbnails; no direct download link added
	const DIRECT_DOWNLOAD_LINK = true;

	// DOWNLOAD_LINK_SEPARATE constant:
	//   true - place download link near filename
	//   false - do not add additional links, but replace address in filename link
	const DOWNLOAD_LINK_SEPARATE = true;

	const d = ((typeof unsafeWindow === "object") ? unsafeWindow : window).document;
	if (!d) return;

	function remove(node) {if (node) node.parentNode.removeChild(node);}
	function $text(text) {return d.createTextNode(text);}
	function $elem(tag) {return d.createElement(tag);}
	function $attr(el, attrs) {
		for (var key in attrs) {
			if (key == 'html') {el.innerHTML = attrs[key]; continue}
			if (key == 'text') {el.textContent = attrs[key]; continue}
			if (key == 'value') {el.value = attrs[key]; continue}
			el.setAttribute(key, attrs[key]);
		}
		return el;
	}

	function putcss (css) {
		d.getElementsByTagName('head')[0].appendChild($attr($elem('style'), {'type': 'text/css', 'text': css}));
	}

	function ajaxLoad(addr, trycount, doneCallback, failCallback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) doneCallback(xhr.responseText); // everything went good
				else {
					if (trycount && trycount > 1)
						ajaxLoad(addr, trycount-1, doneCallback, failCallback);
					else failCallback();
				}
			}
		};
		xhr.open('GET', addr, true);
		xhr.send(null);
	}

	function addThumb(node) {
		const title = node.title;
		if (!title) return;
		const match = title.match(/\.([^.]*)$/);
		if (!match) return
		const ext = match[1];
		if (!ext) return;
		switch(ext.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'png':
				const link = $attr($elem('a'), { 'href': node.href+'/image.png' });
				link.appendChild($attr($elem('img'), { 'src': node.href+'/thumb.png' }));
				node.parentNode.appendChild(link);
		}
		if (DIRECT_DOWNLOAD_LINK) {
			const status = $attr($elem('img'), { 'src': WAITIMG, 'class': 'vip_status' });
			node.parentNode.insertBefore(status, node.nextElementSibling);
			ajaxLoad(node.href, 3,
				function(text) {
					const result = text.match(new RegExp('\\shref="([^"]*\\.'+ext+')"', 'i'));
					if (result && result[1]) {
						if (DOWNLOAD_LINK_SEPARATE)
							node.parentNode.insertBefore($attr($elem('a'), { 'href': result[1], 'text': 'download', 'class': 'file_link vip_download' }), status.nextElementSibling);
						else $attr(node, { 'href': result[1] });
						$attr(status, { 'src': DONEIMG });
					}
					else {
						$attr(status, { 'src': FAILIMG });
					}
				},
				function() {
					$attr(status, { 'src': FAILIMG });
				});
		}
	}

	const WAITIMG = 'data:image/gif;base64,R0lGODlhEAAPAIQAAP%2F%2F%2FwAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6%2BviYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJCwAfACwAAAIAEAALAAAFLeAnjmRpnmg6Cqwgtu4HCwQxiEN9f7nd7z%2BcLsjTCX3Gou04aDZfLShLRaWGAAAh%2BQQJCwAfACwAAAIAEAALAAAFKOAnjmT5FUFQmGZwHAFburBM0rEt4rpovIbe53cI9ohGHVJYMBhWvRAAIfkECQsAHwAsAAACABAACwAABTrgJ45kaX5LECwmkiSIGDBMYCaKksi0XeI6Xu2W231mw19RZKAZiMFPk%2FFURqdVkgvGdJ5KC4OBVQoBACH5BAkLAB8ALAAAAgAQAAsAAAU04CeOZGmeUBRBZuM4jRhJUmQ6z%2BPItF3iOl7tltt9ZsNfUegjAY3I5ujJbL1ix96plFqFAAAh%2BQQJCwAfACwAAAIAEAALAAAFL%2BAnjmRpnihqLYtlThQ1iYskLSZVVRRt4yUdz3fL7XqfWjF4JAJJMJkzNVq1qKYQACH5BAkLAB8ALAAAAgAQAAsAAAU04CeOZGmeaDoS10WIrCtmmpZdGHaJuC5qm42mt%2FsQf8Fhrnj8AIXN5lMTe32qs1pGxeWGAAAh%2BQQJCwAfACwAAAIAEAALAAAFLeAnjmRpnmg6ThQ1iawLtyzHUSJl459%2B%2Bzxgbifs7Ya%2Fo%2FGGdNFmsk%2FspaqqQgAh%2BQQBCwAfACwAAAIAEAALAAAFLeAnjmRpnmg6ThQ1iawLtyzHUSJl459%2B%2Bzxgbifs7Ya%2Fo%2FGGdNFmsk%2FspaqqQgA7';
	const DONEIMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw%2FeHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24%2BCiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI%2BCiAgICAgICAgIDxkYzpmb3JtYXQ%2BaW1hZ2UvcG5nPC9kYzpmb3JtYXQ%2BCiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAADqSURBVDiNY%2Fz%2F%2Fz8DJYCJIt20MGAqAwPDfwJ4KrIGRrQw%2BL%2Fy8QKGgotJWG0Ll01gmKA%2Fj4GBgYERpwGSW5gYDntgD1jbHYwMz33%2BoRjAgk3h%2FZ%2BYYlrscxgYGFIxxLEG4r2fqFiUuZ1BmgW7t3AaEMJ3m%2BHeTwYGXqZwBj2OEoal78OxGoDdCz8YGHiZpRkKRW4ziLMqM2z40MGw8cNqBiSvE3ZBwF01ht%2F%2FGRg2fpjL0PqiiuEelnDB6oKJBvMZ8i8kMjxleMpgdkMNKgqxOVw2AdOE%2F%2F%2F%2FI%2BOp%2FwmDqch60NMByWDgMxMAkVmJnkX0LJQAAAAASUVORK5CYII%3D';
	const FAILIMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw%2FeHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BCjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24%2BCiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI%2BCiAgICAgICAgIDxkYzpmb3JtYXQ%2BaW1hZ2UvcG5nPC9kYzpmb3JtYXQ%2BCiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY%2BCjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAACUSURBVDiNxZMxDoMwDEX%2FR8xcpifgJA0ng5N07NaNkzCF6bNQZJxCREHCkod85z%2FZjkJJOBPFKfflAJIAGUBqI9uEIGnJCIQIKJOt9dAucSBXG63m2kDC6YtQ2kJ03VUZPQGMyYD7%2BvUA32rvZj%2FcwWNe4mcH5AEBQPc9v38bO3tYPSNJvICnv2TNtdRsAv6J%2Bz%2FTBMuCUtS9gEARAAAAAElFTkSuQmCC';

	var items = d.evaluate('//a[@class="file_link"]', d.body, null, 6, null);
	if (!items) return;
	var i = items.snapshotLength;
	if (i < 1) return;
	putcss('.vip_status{padding-right:2px;position:relative;top:2px;}.vip_download{padding-right:2px;}');
	while (i--)
		addThumb(items.snapshotItem(i));
})()