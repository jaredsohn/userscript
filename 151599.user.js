/*
 * REM:
 * appendChildしたあとにaddEventListenerすること。
*/

// ==UserScript==
// @name           Dot East高速化
// @namespace      http://www.usamimi.info/~anohp/
// @description    ドットイーストを軽量化
// @version        0.4.1.0
// @auther         hogepiyo
// @icon           http://dot-east.com/wp-content/uploads/2012/10/doteast.png
// @match          http://doteastark.happywinds.net/php/ark/gentoken.php?*
// @include        http://doteastark.happywinds.net/php/ark/gentoken.php?*
// @downloadURL    http://userscripts.org/scripts/source/151599.user.js
// @updateURL      http://userscripts.org/scripts/source/151599.meta.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
(function(){
	/*@cc_on
	if (!Element.prototype.addEventListener) {
		document.addEventListener = Window.prototype.addEventListener = Element.prototype.addEventListener = function(type, listener, useCapture) {
			return this.attachEvent('on' + type, listener);
		}
	}
	if (!Event.prototype.preventDefault) {
		Event.prototype.preventDefault = function() {
			this.returnValue = false;
		}
	}
	@*/
	if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
		this.GM_getValue = function (key, def) {
			var v = window.localStorage.getItem(key);
			return (v !== null)? v : def;
		};
		this.GM_setValue = function (key, value) {
			return window.localStorage.setItem(key, value);
		};
	}
	
	var body = document.body;
	
	var f = document.embeds[0];
	if (!f) return;
	
	// Flash再読み込みによる要素の移動を防ぐ
	var s = document.createElement('span');
	s.appendChild(body.removeChild(f));
	body.appendChild(s);
	
	var c = document.createElement('input');
	c.type = 'checkbox';
	var t = document.createElement('span');
	t.innerText = '高速化';
	
	c.addEventListener('click', function() {
		setLowQuality(c.checked);
		
		// F5効果の対策
		c.disabled = true;
		setTimeout(function() {c.disabled = false}, 3000);
		return;
	}, false);
	
	var d = document.createElement('div');
	d.appendChild(c);
	d.appendChild(t);
	body.appendChild(d);
	
	var qval = GM_getValue('qval', true);
	setLowQuality(myBooleanizer(qval));
	
	
	
	function setLowQuality(v) {
		c.checked = v;
		f.setAttribute('quality', v? 'low' : 'high');
		with(f.parentNode) f = appendChild(removeChild(f));
		GM_setValue('qval', v);
	};
	
	// v: string or boolean
	function myBooleanizer(v) {
		return Boolean(v === 'true' | v);
	}
})();

// evalによる内部データの誤参照を出来るだけ防ぐ
(function() {
	var calcDefstr = '数式(ex: 1+2)';
	
	var calc = document.createElement('input');
	calc.type = 'text';
	calc.size = '64';
	calc.value = calcDefstr;
	calc.addEventListener('click', function() {
		if (calc.value == calcDefstr) {
			calc.value = '';
		}
	}, false);
	calc.addEventListener('keypress', function(event) {
		// 13 Enter key
		if ((event.keyCode | event.charCode) == 13) {
			try {
				with (Math) calcres.value = eval(this.value);
			} catch (e) {
				calcres.value = e;
			} finally {
				event.preventDefault();
			}
		}
	}, false);
	document.body.appendChild(calc);
	
	var calcres = document.createElement('input');
	calcres.type = 'text';
	calcres.size = '64';
	calcres.value = '結果';
	document.body.appendChild(calcres);
	
	function isRanged(range, baseX, baseY, offsetX, offsetY) {
		with (Math) return pow(baseX - offsetX, 2) + pow(baseY - offsetY, 2) <= pow(range, 2);
	}
})();
