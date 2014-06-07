// ==UserScript==
// @name        English-Japanese Dictionary
// @description display English-Japanese dictionary using POP jisyo(http://www.popjisyo.com/)
// @namespace   http://d.hatena.ne.jp/youpy/
// @include     *
// ==/UserScript==

/*
  based on http://d.hatena.ne.jp/amachang/20061111/1163250638
*/

(function () {
    document.addEventListener('dblclick', function() {
	    var t = document.getSelection();
	    if (t.match(/^[\w\d_\-\. ]+$/)) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.popjisyo.com/WebHint/QuickWord.aspx?d=1&w=' + t,
				onload: function(response) {
					response.responseText.match(/wordGroups\['dy'\]=([\s\S]+?)};/m);
					var json = eval('(' + RegExp.$1 + '})');
					var str = '';
					json.arRead.forEach(function(item, index) {
						str += json.arRead[index] + ': ' + json.arWordDat[index][1][1] + "\n";
					});
					alert(str);
				}
			});
		}
    }, false);
})();
