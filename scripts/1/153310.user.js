// ==UserScript==
// @name	unicodePost
// @version	1.0
// @include	http://tieba.baidu.com/*
// @run-at	document-end
// ==/UserScript==

var f = function() {
	var u = function(e) {
		e = e.replace(/<\/?a[^>]*>/g,'');
		for (var r = ['28'], k = ['&nbsp;', '&amp;', '&lt;', '&gt;'], p = q = '', n = i = 0, j = e.length; i < j; i++ )
			q = e[i], n = n == 1 || q == '<' || q == '@' ? 1 : 0, p += n == 1 ? q : (function() {
				var a = q.charCodeAt() + '', l, t;
				if ( q == '&' ) {
					for (l = k.length - 1; l > -1; l-- ) {
						if ( e.substring(i, i + k[l].length) == k[l] ) {
							i += k[l].length - 1;
							return k[l]
						}
					}
				} else if ( a.length > 4 ) {
					for (t = r.length - 1; t > -1; t-- ) {
						if ( a.indexOf(r[t]) != -1 )
							return q
					}
				}
				return '&#' + a + ';'
			})(), n = q == '>' ? 0 : n;
		return p
	};

	rich_postor._editor.getHtml = function() {
		var a = this.img2embed(TED.Editor.superclass.prototype.getHtml.call(this, this.editArea.innerHTML));
		a = document.querySelector('#useUnicode').checked ? u(u(a)) : a;
		a = document.querySelector('#useGraycolor').checked ? '<span class="apc_src_wrapper">' + a + '<img pic_type="3" class="BDE_Image" src="http://imgsrc.baidu.com/forum/pic/item/blank.jpg" height="1" width="1">' : a;
		return a
	};

	SimplePostor.prototype._getHtml = function() {
		var a = this._se.getHtml();
		a = document.querySelector('#useUnicode').checked ? u(u(a)) : a;
		return a.replace(/<br[^>]*>/gi, ' ').replace(/[\u3000\s]+/g, ' ').replace(/&nbsp;/g, ' ')
	};
},
i = function(b, d, t) {
	var s = document.querySelector('.editor_users').appendChild(document.createElement('span'));
	s.innerHTML = "<input type=checkbox " + ( b == 1 ? "checked=checked" : "" ) + " id=" + d + "><label for=" + d + ">" + t + "</label>&nbsp;";
},
s = document.documentElement.appendChild(document.createElement('script'));
s.textContent = '(' + f + ')()';
i(1, 'useUnicode', 'unicode\u7F16\u7801');
i(0, 'useGraycolor', '\u7070\u5B57');