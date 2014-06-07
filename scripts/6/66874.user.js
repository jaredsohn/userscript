// ==UserScript==
// @name           uncensored favotter
// @namespace      http://seaoak.cocolog-nifty.com/
// @include        http://favotter.matope.com/*
// @include        http://favotter.net/
// @include        http://favotter.net/home.php*
// @include        http://favotter.net/status.php*
// @include        http://www.favotter.net/
// @include        http://www.favotter.net/home.php*
// @include        http://www.favotter.net/status.php*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////
// ふぁぼったーの censored をかいくぐるスクリプト
// 
//                                                      by Seaoak (seaoak2003)
//                                            http://seaoak.cocolog-nifty.com/
//
// giginet 氏のスクリプトを参考にさせていただきました。
// (http://d.hatena.ne.jp/gigi-net/20090903)
//
// 文字列の差分を求めるアルゴリズムは津田伸秀氏のサイトを参考にしました。
// (http://hp.vector.co.jp/authors/VA007799/viviProg/doc5.htm)
//
//////////////////////////////////////////////////////////////////////////////

(function(e){e.text='(function(){var f='+(function(){

	var isDebug = false;

	try {

		var censoredMark = '<span class="censored">&lt;censored&gt;</span>';

		//========================================================================
		// Utilities
		//========================================================================

		function arrayEach(array, func) {
			if (! array) return;
			if (! ('length' in array)) throw('arrayEach: must be an array or like an array');
			if (typeof(func) != 'function') throw('arrayEach: must be a function');
			for (var i=0; i<array.length; i++) {
				func(array[i]);
			}
		}

		function replaceStringAll(str, pattern, replacement) {
			var temp = str;
			while (1) {
				var result = temp.replace(pattern, replacement);
				if (result == temp) return result;
				temp = result;
			}
		}

		function loadUrl(url, callback) {
			var fname = (function(s){do{var x=Math.floor(Math.random()*0x1fffffffffffff)}while(window[s+x]);return s+x})('uncensored_favotter_callback');

			window[fname] = function(r){delete window[fname];callback(r)};

			if (url.indexOf('?') == -1) {
				url += '?';
			}
			if (url.indexOf('=') != -1) {
				url += '&';
			}
			url += 'callback=' + fname;

			var elem = document.createElement('script');
			elem.setAttribute('type', 'text/javascript');
			elem.setAttribute('src', url);
			document.body.appendChild(elem);
		}

		//========================================================================
		// ふぁぼったーの HTML を解析
		//========================================================================

		var targetList = [];
		arrayEach(document.getElementsByTagName('div'), function(divElem) {
			if (! divElem.className.match(/^entry xfolkentry hentry\s*$/)) return;
			var spanElem = divElem.childNodes[3].childNodes[1];
			if (-1 == spanElem.innerHTML.toLowerCase().indexOf(censoredMark)) return;
			var id = divElem.id.substring(7);
			targetList.push({
			  spanElem:	spanElem,
			  url:      'http://api.twitter.com/1/statuses/show.json?id=' + id,
			});
		});

		//====================================================================
		// censored と元発言のマージ
		//====================================================================

		function diff(original, censored) {
			var a = ('\0' + original).split('');
			var b = ('\0' + censored).split('');

			var prev = {};
			(function() {
				// O(ND) アルゴリズム
				// see "http://hp.vector.co.jp/authors/VA007799/viviProg/doc5.htm"
				var V = {};	// 負のインデックスを使いたいので配列にはしない
				V[1] = 0;
				for (var D=0; D < a.length + b.length; D++) {
					for (var k=-D; k<=D; k+=2) {
						var x, y, axis;
						if ((k == -D) || ((k != D) && (V[k-1] < V[k+1]))) {
							y = V[k+1];
							axis = 'x';
						} else {
							y = V[k-1] + 1;
							axis = 'y';
						}
						x = y - k;
						prev[x + '_' + y] = axis;
						while ((x < a.length - 1) && (y < b.length - 1) && (a[x+1] == b[y+1])) {
							x++;
							y++;
							prev[x + '_' + y] = 'xy';
						}
						V[k] = y;
						if ((x >= a.length) && (y >= b.length)) return;
					}
				}
			})();

			var result = [];
			(function() {
				var x = a.length - 1;
				var y = b.length - 1;
				var diff_a = [];
				var diff_b = [];
				var same   = [];
				var last_axis;
				while ((x > 0) || (y > 0)) {
					var axis   = prev[x + '_' + y];
					if ((axis == last_axis) || (! last_axis)) {
						switch (axis) {
						  case 'x':
							diff_a.unshift(a[x]);
							x--;
							break;
						  case 'y':
							diff_b.unshift(b[y]);
							y--;
							break;
						  case 'xy':
							same.unshift(a[x]);
							x--;
							y--;
							break;
						  default:
							throw('diff(): unexpected path');
							break;
						}
					} else if (axis == 'xy') {
						result.unshift([diff_a.join(''), diff_b.join('')]);
						diff_a = [];
						diff_b = [];
						same   = [a[x]];
						x--;
						y--;
					} else {
						if (last_axis == 'xy') {
							result.unshift(same.join(''));
							same = null;
						}
						if (axis == 'x') {
							diff_a.unshift(a[x]);
							x--;
						} else if (axis == 'y') {
							diff_b.unshift(b[y]);
							y--;
						} else {
							throw('diff(): unexpected path');
						}
					}
					last_axis = axis;
				}
				if (last_axis == 'xy') {
					result.unshift(same.join(''));
				} else {
					if (last_axis == 'x') {
					} else if (last_axis == 'y') {
					} else {
						throw('diff(): unexpected path: "' + last_axis + '"');
					}
					result.unshift([diff_a.join(''), diff_b.join('')]);
				}
			})();

			return result
		}

		function merge(target) {
			// ※ Opera だとタグが大文字になってしまう
			var removedHtml  = replaceStringAll(target.spanElem.innerHTML.replace(/<SPAN /g, '<span ').replace(/<\/SPAN>/g, '</span>'), censoredMark, '\0');
			var originalHtml = target.original.replace(/<SPAN /g, '<span ').replace(/<\/SPAN>/g, '</span>');
			var diffList = diff(originalHtml, removedHtml);
			var result = '';
			arrayEach(diffList, function(val) {
				if (typeof(val) == 'string') {
					result += val;
				} else if ((typeof(val) == 'object') && ('length' in val)) {
					if (val.length != 2) throw('merge(): length of val must be 2.');
					if (val[1].match(/^\0+$/)) {
if (isDebug) alert('censored: "' + val[0] + '"');
						result += '<del>' + val[0] + '</del>';
					} else {
						result += val[0];
					}
				} else {
					throw('merge(): unexpected element in diff.');
				}
			});
			return result;
		}

		//====================================================================
		// メイン
		//====================================================================

		function execNextTarget() {
			if (targetList.length == 0) {
if (isDebug) alert('complete recovering from censored.');
				return;
			}
			var target = targetList.shift();
			loadUrl(target.url, function(response) {
				try {
					target.original = response.text;
					target.spanElem.innerHTML = merge(target);
					execNextTarget();
				} catch(e) {
					if (isDebug) alert('FATAL: ' + e);
				}
			});
		}

		execNextTarget();

	} catch(e) {
		if (isDebug) alert('FATAL: ' + e);
	}

}).toString()+';with(f){f()}})()';document.body.appendChild(e)})(document.createElement('script'));
