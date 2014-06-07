// ==UserScript==
// @name	restore google bg
// @namespace   restoregooglebg
// @description 恢复你的Google主页背景！
// @version	1.1.9.1
// @downloadURL	https://userscripts.org/scripts/source/164175.user.js
// @icon	http://pic.yupoo.com/ttph1oc/CvxqhSvC/SszXf.png
// @author	ttph1oc
// @exclude	*www.google.*/reader/*
// @exclude	*www.google.*/trends/*
// @exclude	*www.google.*/about/*
// @exclude	*www.google.*/analytics/*
// @exclude	*www.google.*/elections/*
// @exclude	*www.google.*/ads/*
// @exclude	*www.google.*/videohp/*
// @exclude	*www.google.*/appsstatus/*
// @exclude	*www.google.*/ig/*
// @exclude	*www.google.*/finance/*
// @exclude	*www.google.*/news/*
// @exclude	*www.google.*/mobile/*
// @exclude	*www.google.*/patents/*
// @include	*www.google.com/imghp
// @include	*www.google.com*
// @include	*www.google.ad*
// @include	*www.google.ae*
// @include	*www.google.am*
// @include	*www.google.as*
// @include	*www.google.at*
// @include	*www.google.az*
// @include	*www.google.ba*
// @include	*www.google.be*
// @include	*www.google.bf*
// @include	*www.google.bg*
// @include	*www.google.bi*
// @include	*www.google.bj*
// @include	*www.google.bg*
// @include	*www.google.bs*
// @include	*www.google.by*
// @include	*www.google.ca*
// @include	*www.google.cd*
// @include	*www.google.cf*
// @include	*www.google.cg*
// @include	*www.google.ch*
// @include	*www.google.ci*
// @include	*www.google.co*
// @include	*www.google.cl*
// @include	*www.google.cm*
// @include	*www.google.cv*
// @include	*www.google.cz*
// @include	*www.google.de*
// @include	*www.google.dj*
// @include	*www.google.dk*
// @include	*www.google.dm*
// @include	*www.google.dz*
// @include	*www.google.ee*
// @include	*www.google.es*
// @include	*www.google.fi*
// @include	*www.google.fm*
// @include	*www.google.fr*
// @include	*www.google.ga*
// @include	*www.google.ge*
// @include	*www.google.gg*
// @include	*www.google.gl*
// @include	*www.google.gm*
// @include	*www.google.gp*
// @include	*www.google.gr*
// @include	*www.google.gy*
// @include	*www.google.hn*
// @include	*www.google.hr*
// @include	*www.google.ht*
// @include	*www.google.hu*
// @include	*www.google.ie*
// @include	*www.google.im*
// @include	*www.google.iq*
// @include	*www.google.is*
// @include	*www.google.it*
// @include	*www.google.je*
// @include	*www.google.jo*
// @include	*www.google.ki*
// @include	*www.google.kg*
// @include	*www.google.kz*
// @include	*www.google.la*
// @include	*www.google.li*
// @include	*www.google.lt*
// @include	*www.google.lu*
// @include	*www.google.lv*
// @include	*www.google.md*
// @include	*www.google.me*
// @include	*www.google.mg*
// @include	*www.google.mk*
// @include	*www.google.ml*
// @include	*www.google.mn*
// @include	*www.google.ms*
// @include	*www.google.mu*
// @include	*www.google.mv*
// @include	*www.google.mw*
// @include	*www.google.ne*
// @include	*www.google.nl*
// @include	*www.google.no*
// @include	*www.google.pl*
// @include	*www.google.pn*
// @include	*www.google.pr*
// @include	*www.google.ps*
// @include	*www.google.pt*
// @include	*www.google.sc*
// @include	*www.google.se*
// @include	*www.google.sh*
// @include	*www.google.si*
// @include	*www.google.sk*
// @include	*www.google.sn*
// @include	*www.google.so*
// @include	*www.google.sm*
// @include	*www.google.st*
// @include	*www.google.sv*
// @include	*www.google.td*
// @include	*www.google.tg*
// @include	*www.google.tk*
// @include	*www.google.tl*
// @include	*www.google.tm*
// @include	*www.google.tn*
// @include	*www.google.to*
// @include	*www.google.tt*
// @include	*www.google.vu*
// @include	*www.google.ws*
// @include	*www.google.rs*
// @include	*www.google.cat*
// @grant	none
// @run-at document-end
// ==/UserScript==
(function() {
	/*global console*/
	'use strict';
	var g = function(x) {
		return document.getElementById(x);
	};
	if (g('footer') || localStorage.always === 1) {
		var texts = {
			zhcn: [
				'更换背景图片', //0
				'使用本地图片', //1
				'拖放至此<br />或<br />', //2
				'选择图片', //3
				'使用网络图片', //4
				'使用此图片', //5
				'使用必应每日图片', //6
				'去除背景图片', //7
				'设置', //8
				'背景大小：', //9
				'背景透明度：', //10
				'背景纵向位置：', //11
				'背景横向位置：', //12
				'搜索结果页显示背景：', //13
				'删除背景的超时时间：', //14
				'毫秒', //15
				'图片载入中……', //16
				'查看今日徽标', //17
				'恢复背景', //18
				'粘贴图片网址', //19
				'设置已保存', //20
				'语言：', //21
				'自动检测', //22
				'正在处理', //23
				'检查更新…', //24
				'临时禁用背景（可在 Doodle 不正常工作时使用）…' //25
			],
			zhtw: [
				'變更背景圖片',
				'使用本地圖片',
				'拖放至此<br />或<br />',
				'選擇圖片',
				'使用網絡圖片',
				'使用此圖片',
				'使用必應每日圖片',
				'去除佈景圖片',
				'設置',
				'背景大小：',
				'背景透明度：',
				'背景縱向位置：',
				'背景橫向位置：',
				'搜索結果頁顯示背景：',
				'刪除背景的超時時間：',
				'毫秒',
				'圖片載入中……',
				'查看今日徽標',
				'恢復佈景',
				'粘貼圖片網址',
				'設置已保存',
				'語言：',
				'自動檢測',
				'正在處理',
				'檢查更新…',
				'臨時禁用背景（可在 Doodle 不正常工作時使用）…'
			],
			en: [
				'Change background image',
				'From local  file',
				'Drop here<br />or<br />',
				'Choose an Image',
				'From URL',
				'Use This Image',
				'Use the image from Bing',
				'Remove background image',
				'Option',
				'background size:',
				'background opacity:',
				'background position on the Y-axis:',
				'background position on the X-axis:',
				'show background image in search result pages:',
				'timeout of removing the background image:',
				'ms',
				'loading...',
				'View today\'s Doodle',
				'Restore the background image',
				'Paste image URL',
				'Opition saved',
				'language:',
				'Auto',
				'processing',
				'check for updates...',
				'Temporarily disable the background image (when the Doodle doesn\'t work)...'
			],
			es: [
				'Cambiar imagen de fondo',
				'Desde archivo local',
				'Soltar aquí<br />o<br />',
				'Escoger una imagen',
				'Desde URL',
				'Usar esta imagen',
				'Imagen desde Bing',
				'Quitar imagen de fondo',
				'Opciones',
				'tamaño del fondo:',
				'opacidad del fondo:',
				'posición según eje Y:',
				'posición según eje X:',
				'mostrar imagen de fondo en página de resultados:',
				'tiempo límite para descartar la imagen de fondo:',
				'ms',
				'cargando...',
				'Ver el Doodle del día',
				'Restaurar la imagen de fondo',
				'Pegar URL de imagen',
				'Opciones guardadas',
				'idioma:',
				'Auto',
				'procesando',
				'buscar actualizaciones...',
				'Desactivar temporalmente la imagen de fondo (cuando el Doodle no funcione)...'
			]
		};
		var text;
		var loaded;
		if (localStorage.lang && localStorage.lang !== 'auto') {
			text = texts[localStorage.lang];
		} else if (g('footer').innerHTML.indexOf('大全') > -1) {
			text = texts.zhcn;
		} else if (g('footer').innerHTML.indexOf('完全') > -1) {
			text = texts.zhtw;
		} else if (g('footer').innerHTML.indexOf('condiciones') > -1) {
			text = texts.es;
		} else {
			text = texts.en;
		}
		var style = document.createElement('style');
		style.innerHTML = 'a#rgstart{margin:0 0 0 44px;}' +
			'#rgbg{position:fixed;top:0;left:0;height:100%;width:100%;z-index:-1;opacity:0;transition:opacity 1.5s;-moz-transition:opacity 1.5s;-webkit-transition:opacity 1.5s;-o-transition:opacity 1.5s;-ms-transition:opacity 1.5s;}' +
			'#rgoutter{position:fixed;width:100%;height:100%;background:rgba(255,255,255,.7);top:0;left:0;z-index:989;}' +
			'#rgoutter a{color:blue;}' +
			'#rginner{position:absolute;top:50%;left:50%;width:auto;box-shadow:0 0 8px #aaa;border:1px solid #4D90FE;background:#fff;opacity:1;z-index:9999999;width:600px;}' +
			'.rginnersmall{height:200px;margin:-100px 0 0 -300px;}' +
			'.rginnerbig{height:350px;margin:-175px 0 0 -300px;}' +
			'#rgs{text-align:left;margin:10px 25px;font-size:13px;}' +
			'#rgbgi1{font-size:15px;color:#aaa;font-weight:bold;height:145px;margin:0 20px;background:#f3f7fd;border:1px solid #d3e1f9;line-height:30px;}' +
			'#rgbgi2{display:none;margin:55px 0 0 0;}' +
			'#rgform{text-align:center;}' +
			'#rgbgi3{display:none;text-align:left;padding:10px 40px;font-size:14px;}' +
			'.lst-d {opacity:.5;}' +
			'#rgiurl{padding:5px 4px;font-size:18px;width:380px;float:left;margin:0 0 0 25px;font-family:\'Arial\'}' +
			'.rgshadow,.rgshadow a{color:#fff!important;text-shadow:black 0 1px 3px!important;}' +
			'#fll{width:auto!important;}' +
			'.rginput{border:1px solid silver;box-shadow:0 0 1px #999 inset;outline:none}' +
			'.rginput:focus{border:1px solid #4D90FE;box-shadow:0 0 2px #888 inset}' +
			'.gb_ca{opacity:.8;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QkFAyoSxi40KwAAA5BJREFUSMfll79vE1kQxz/PaztZEnJJAJkfJ93pBAJEaNAJlFUqCgoX6U468R8gOstpLfE/XIVkQUXhk6ByYaVwhKzoZIViSwsFChrEj9XCxgv7NvZeMys9rWJnHa67lZ7e+vnNmzffmfnOLPzfHjXDHnNvkplnfoo5lCqgIEOJsrGMEytXx6xbcrkSUBblY0ADMXAIjE5yAWuKlUVRdgpYAlZktg25E0NuTVE6BywAy8C5ra2t9e3t7SdxHL/d3d0NDIXmOBHURyn9CTgDnNVa/10qlcpxHOtyufwH8An4DHwBhkAk0M98iYL48jRwAbgOOJ1O53EQBB8T4wmC4GOn03kMOLLvgsiV5JyZLC+KlRXgmuM493zf34+iaNjv99uNRuMR8Gej0XjU7/fbURQNfd/fdxznHnBN5E7JOWoWa+ckgH4D7vi+v+953ptarfYQuAtsiIUbwN1arfbQ87w3vu/vA7dFbsWI/lzWWnLbCrC2t7f3VGt9UK/XHwDrwA05+BeZbwDr9Xr9gdb6YGdn5y9gTeTTqFd5YV4EfgZuhWH43nXdF2Jd6sNl8eOyEQMbruu+CMPwPXBL5BfzwF04wnLLtu1Kt9t9KdF6AITAN+C7zKH8F3a73Ze2bVdS2bz+LWZSKaVEXNd9J4oiYapDgy51egnP83wjp81zcnFxUXyzApxNkmRPKXUH8CRXh4Zi0zWrwJkkSf5RSv0uez1B5XBaPh8VfenmkYxxhhQSw/KRKDDlVN40IlOBCkdcQmXKo5pwVm6oi8ZGS5inlKlMRSMWTKgtY2DIWhnlySTFBaMSzYuvkfc5mVPoE+OS2f9teS/LeSOjZE6EpyhCC61Wa1NrHUrwpOVwNS0WMq8aZXJRax22Wq1Nodz5DJITFRdSmNvt9ma1Wr0/GAxeiQVLoqQCXAQuyVyR9SXAHgwGr6rV6v12u71pwF04Lp3SEriaJMnrH27ilLoiKTWULmU8ycdjSYlvSqk1ocWyEelzsrYo1sTCZoGQS5puWtbSHB7n6ULmpeifB34FLgNXgZuA0+v1npn1uNfrPZNKdVP2XRa583LO/HH0mTZvsVDgV4Hpk9FheM1m83kYhh8AwjD80Gw2nxuslu71RP67AXGSp2c2W1lldCQLAvVpA+pAxjCjZJy3B1NTfhcMUklz1pLcjAzLRhl/JnmbgDzNvGWkyHgKj/9nnzCT+Dn50c+YfwHsPWG5cVI8sAAAAABJRU5ErkJggg==");}';
		document.body.appendChild(style);
		var a = document.createElement('a');
		var doodlehtml = '';
		var normalhtml = '<div style="padding-top:112px"><div style="background:url(images/srpr/logo3w.png) no-repeat;background-size:275px 95px;height:95px;width:275px" id="hplogo" title="Google" dir="ltr"></div></div>';
		var date = new Date();
		var url1 = 'javascri';
		var url2 = 'pt:;';
		var url = url1 + url2;
		var google_logo_url = 'http://lovejiani.qiniudn.com/logo6w.png';
		if (localStorage.opacity === undefined) {
			localStorage.opacity = 100;
		}
		if (localStorage.timeout) {
			localStorage.removeItem(localStorage.timeout);
		}
		if (localStorage.always === undefined) {
			localStorage.always = 0;
		}
		var toggle = function(x) { //把其他一些地方弄成有背景的时候的样式
			var i = 0;
			var hplogo = g('hplogo');
			var footer = g('footer');
			if (x === '' && g('rgbg')) {
				document.body.removeChild(g('rgbg'));
			} else {
				hplogo.innerHTML = '';
				hplogo.style.background = 'url("'+google_logo_url+'") no-repeat center center';
				hplogo.style.backgroundSize = 'contain';
			}
			for (i = 0; i < footer.getElementsByTagName('a').length; i++) {
				footer.getElementsByTagName('a')[i].className = x;
			}
			if (g('als')) {
				var j = 0;
				g('als').className = x;
				for (j = 0; j < g('als').getElementsByTagName('a').length; j++) {
					g('als').getElementsByTagName('a')[j].className = x;
				}
			}
			if (g('gbi4t')) {
				g('gbi4t').className = x;
			}
			if (g('prm')) {
				g('prm').className = x;
			}
			if (g('epb-notice')) {
				g('epb-notice').className = x;
			}
			if (document.getElementsByClassName('fbar')) {
				for (i = 0; i < g('footer').getElementsByClassName('fbar').length; i++) {
					var node = g('footer').getElementsByClassName('fbar')[i];
					node.style.background = x.length ? 'transparent' : '';
					node.style.borderTop = x.length ? 'none' : '1px solid #E4E4E4';
				}
			}
			if (g('gbg1') && g('gbg1').getElementsByClassName('gb_ca').length) {
				var ring_img_data = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QkFAyoSxi40KwAAA5BJREFUSMfll79vE1kQxz/PaztZEnJJAJkfJ93pBAJEaNAJlFUqCgoX6U468R8gOstpLfE/XIVkQUXhk6ByYaVwhKzoZIViSwsFChrEj9XCxgv7NvZeMys9rWJnHa67lZ7e+vnNmzffmfnOLPzfHjXDHnNvkplnfoo5lCqgIEOJsrGMEytXx6xbcrkSUBblY0ADMXAIjE5yAWuKlUVRdgpYAlZktg25E0NuTVE6BywAy8C5ra2t9e3t7SdxHL/d3d0NDIXmOBHURyn9CTgDnNVa/10qlcpxHOtyufwH8An4DHwBhkAk0M98iYL48jRwAbgOOJ1O53EQBB8T4wmC4GOn03kMOLLvgsiV5JyZLC+KlRXgmuM493zf34+iaNjv99uNRuMR8Gej0XjU7/fbURQNfd/fdxznHnBN5E7JOWoWa+ckgH4D7vi+v+953ptarfYQuAtsiIUbwN1arfbQ87w3vu/vA7dFbsWI/lzWWnLbCrC2t7f3VGt9UK/XHwDrwA05+BeZbwDr9Xr9gdb6YGdn5y9gTeTTqFd5YV4EfgZuhWH43nXdF2Jd6sNl8eOyEQMbruu+CMPwPXBL5BfzwF04wnLLtu1Kt9t9KdF6AITAN+C7zKH8F3a73Ze2bVdS2bz+LWZSKaVEXNd9J4oiYapDgy51egnP83wjp81zcnFxUXyzApxNkmRPKXUH8CRXh4Zi0zWrwJkkSf5RSv0uez1B5XBaPh8VfenmkYxxhhQSw/KRKDDlVN40IlOBCkdcQmXKo5pwVm6oi8ZGS5inlKlMRSMWTKgtY2DIWhnlySTFBaMSzYuvkfc5mVPoE+OS2f9teS/LeSOjZE6EpyhCC61Wa1NrHUrwpOVwNS0WMq8aZXJRax22Wq1Nodz5DJITFRdSmNvt9ma1Wr0/GAxeiQVLoqQCXAQuyVyR9SXAHgwGr6rV6v12u71pwF04Lp3SEriaJMnrH27ilLoiKTWULmU8ycdjSYlvSqk1ocWyEelzsrYo1sTCZoGQS5puWtbSHB7n6ULmpeifB34FLgNXgZuA0+v1npn1uNfrPZNKdVP2XRa583LO/HH0mTZvsVDgV4Hpk9FheM1m83kYhh8AwjD80Gw2nxuslu71RP67AXGSp2c2W1lldCQLAvVpA+pAxjCjZJy3B1NTfhcMUklz1pLcjAzLRhl/JnmbgDzNvGWkyHgKj/9nnzCT+Dn50c+YfwHsPWG5cVI8sAAAAABJRU5ErkJggg==")';
				g('gbg1').getElementsByClassName('gb_ca')[0].style.background = x.length ? ring_img_data : '';
				g('gbg1').getElementsByClassName('gb_ca')[0].style.opacity = x.length ? '.85' : '';
			}
		};
		var change = function(x) {
			var h = document.createElement('div');
			if (!localStorage.top) {
				localStorage.top = 50;
			}
			if (!localStorage.left) {
				localStorage.left = 50;
			}
			if (!localStorage.size) {
				localStorage.size = 100;
			}
			if (!localStorage.opacity) {
				localStorage.opacity = 100;
			}
			a.innerHTML = text[0];
			if ((x === 1) || (localStorage.date !== undefined && (localStorage.date !== date.getMonth() + '' + date.getDate()))) { //或者日期对不上号
				var tmp = document.createElement('script');
				tmp.src = 'https://script.google.com/macros/s/AKfycbzok4KSOuZ3Kkzn9WQ8NuAOJpwUFJqkJwf81iO_KAPSKe5Vmryt/exec';
				document.body.appendChild(tmp);
				if (g('rgcls')) {
					g('rgcls').onclick();
				}
				tmp.onload = function() {
					localStorage.date = date.getMonth() + '' + date.getDate();
					change();
					document.body.removeChild(this);
				};
				return !1;
			} else if (x === 2) {
				localStorage.bgurl = g('rgiurl').value;
				change();
				return !1;
			} else {
				if ((((g('hplogo').src && (g('hplogo').src.indexOf('/images/srpr/logo') == -1)) || g('hplogo').childNodes.length > 1)) && !g('doodlelink')) {
					var doodlelink = document.createElement('a');
					var normallink = document.createElement('a');
					var dsablink = document.createElement('a');
					doodlehtml = g('lga').innerHTML;
					doodlelink.onclick = function() {
						this.style.display = 'none';
						a.style.visibility = 'hidden';
						normallink.style.display = '';
						dsablink.style.display = '';
						g('lga').innerHTML = doodlehtml;
						toggle('');
					};
					normallink.onclick = function() {
						this.style.display = 'none';
						dsablink.style.display = 'none';
						a.style.visibility = '';
						doodlelink.style.display = '';
						g('lga').innerHTML = normalhtml;
						toggle('rgshadow');
						change();
					};
					dsablink.onclick = function() {
						location.replace(this.href);
						return !1;
					};
					doodlelink.innerHTML = text[17];
					normallink.innerHTML = text[18];
					dsablink.innerHTML = text[25];
					doodlelink.href = url;
					normallink.href = url;
					dsablink.href = location.href + ((location.href.indexOf('?') + 1) ? '&' : '?') + 'bg=false';
					doodlelink.id = 'doodlelink';
					normallink.id = 'normallink';
					normallink.style.display = 'none';
					dsablink.style.display = 'none';
					g('footer').firstChild.appendChild(doodlelink);
					g('footer').firstChild.appendChild(normallink);
					g('footer').firstChild.appendChild(dsablink);
					g('lga').innerHTML = normalhtml;
				}
				g('lga').innerHTML = normalhtml;
				if (localStorage.bgurl) {
					a.innerHTML = text[16];
				}
				if (g('rgoutter')) {
					document.body.removeChild(g('rgoutter'));
				}
				if (g('rgbg')) {
					document.body.removeChild(g('rgbg'));
				}
				h.id = 'rgbg';
				h.innerHTML = '<img id="rgbgiv" style="width:1px;height:1px;opacity:0;" src="' + localStorage.bgurl + '">';
				document.body.appendChild(h);
				g('rgbgiv').onload = function() {
					g('rgbg').style.backgroundSize = localStorage.size + '%';
					g('rgbg').style.backgroundImage = 'url("' + localStorage.bgurl + '")';
					g('rgbg').style.backgroundPosition = localStorage.left + '% ' + localStorage.top + '%';
					g('rgbg').style.opacity = localStorage.opacity / 100;
					g('rgstart').innerHTML = text[0];
					toggle('rgshadow');
				};
				if (g('rgbg')) {
					g('rgbg').removeChild(g('rgbgiv'));
				}
				g('hplogo').innerHTML = '';
				g('hplogo').style.background = 'url("http://pic.yupoo.com/ttph1oc/CoZhbWfd/TrwTk.png") no-repeat center center';
			}
		};
		var ifalways = function() {
			if (localStorage.always != 1) {
				window.onhashchange = function() {
					var clearbg = setInterval(function() {
						if (g('ignore') || g('hdtb_msb')) {
							if (g('rgbg')) {
								document.body.removeChild(g('rgbg'));
								clearInterval(clearbg);
							}
						} else if (g('gbqfq') && g('gbqfq').value === '') {
							change();
							clearInterval(clearbg);
						}
					}, 1);
				};
				if (g('gbqfq')) {
					g('gbqfq').addEventListener('keyup', function() {
						if (g('ignore') || g('gbqfq').value !== '') {
							toggle('');
							if (g('rgbg')) {
								document.body.removeChild(g('rgbg'));
							}
						}
					}, false);
				}
			} else {
				window.onhashchange = null;
			}
		};
		var afterload = function() {
			var href = location.href.replace(/&bg=false/g, '').replace(/bg=false/g, '');
			if (location.href.indexOf('bg=false') + 1) {
				if (g('rgstart')) {
					g('rgstart').innerHTML = '恢复背景';
					g('rgstart').href = href;
					g('rgstart').onclick = function() {
						location.replace(href);
						return !1;
					};
				}
				return !1;
			} else if (localStorage.bgurl && location.href.indexOf('#') === -1) {
				change();
			}
			loaded = 1;
		};
		if (g('ignore') && localStorage.always == 1) {
			var bgtmp = document.createElement('div');
			bgtmp.innerHTML = '<div style="opacity:' + localStorage.opacity / 100 + ';background:url(\'' + localStorage.bgurl + '\') center center;position:fixed;top:0;left:0;height:100%;width:100%;z-index:-1"></div>';
			document.body.appendChild(bgtmp);
		}
		a.href = url;
		a.innerHTML = text[0];
		a.id = 'rgstart';
		(g('fsl') || g('footer').firstChild).appendChild(a);
		a.onclick = function() {
			this.blur();
			var b = document.createElement('div');
			var c = document.createElement('div');
			var d = document.createElement('div');
			var e = document.createElement('div');
			var f = document.createElement('div');
			var rgbgi3 = document.createElement('div');
			this.blur();

			b.id = 'rgoutter'; //背景
			c.id = 'rginner'; //弹出来的那个框
			c.className = 'rginnersmall';
			d.id = 'rgs'; //选择
			e.id = 'rgbgi1'; //直接上传
			f.id = 'rgbgi2'; //粘贴图片网址
			rgbgi3.id = 'rgbgi3'; //其他设置
			d.innerHTML = '<a id="rgi" href="javascript:;" style="display:none;">' + text[1] + '</a><span id="rgi2">' + text[1] + '</span>  |  <a id="rgp" href="javascript:;">' + text[4] + '</a><span id="rgp2" style="display:none;">' + text[4] + '</span>  |  <a id="rgbing" href="javascript:;">' + text[6] + '</a><span id="rgbing2" style="display:none;">' + text[6] + '</span> ' +
				'<span id="rgon0"><span id="rgbingaft">  |  </span></span><span id="rgon"><a id="rgrm" href="javascript:;">' + text[7] + '</a>  |  <a id="rgset" href="javascript:;">' + text[8] + '</a><span id="rgset2" style="display:none" href="javascript:;">' + text[8] + '</span></span>' +
				'<a id="rgcls" href="javascript:;" style="float:right;margin:-3px -15px 0 0;"><img src="http://pic.yupoo.com/ttph1oc/Cp8aBT2v/3nI31.png"/></a>';
			e.innerHTML = '<form id="rgform" style="margin-top:15px;display:block;">' +
				'<input type="file" style="visibility:none;width:0;height:0;" id="rgfile" name="file" />' + text[2] +
				'<input id="rgul" type="button" style="box-shadow:0 0 5px;border:none;font-size:15px" value="' + text[3] + '" class="gbqfb" onclick="document.getElementById(\'rgfile\').click()" /></form>';
			f.innerHTML = '<input id="rgiurl" class="rginput" type="text" placeholder="' + text[19] + '"><input id="rgcf" type="button" class="gbqfb" value="' + text[5] + '" style="float:right;margin:0 25px 0 0">';
			rgbgi3.innerHTML = (text[9] + ' <input id="rgsettingsize" type="input" maxlength=3 class="rginput" style="padding:2px;font-size:13px;width:25px;box-shadow: 0 0 1px #999999 inset;"/> %<br /><br />' +
				text[10] + ' <input id="rgsetting3" type="input" maxlength=3 class="rginput" style="padding:2px;font-size:13px;width:25px;box-shadow: 0 0 1px #999999 inset;"/> %<br /><br />' +
				text[11] + ' <input id="rgsettingtop" type="input" maxlength=3 class="rginput" style="padding:2px;font-size:13px;width:25px;box-shadow: 0 0 1px #999999 inset;"/> %<br /><br />' +
				text[12] + ' <input id="rgsettingleft" type="input" maxlength=3 class="rginput" style="padding:2px;font-size:13px;width:25px;box-shadow: 0 0 1px #999999 inset;"/> %<br /><br />' +
				text[13] + ' <input id="rgsetting1" class="jfk-checkbox-checkmark" type="checkbox" /><br /><br />' +
				text[21] + ' <select id="rgsettinglang"><option value="auto">' + text[22] + '</option><option value="zhcn">简体中文</option><option value="zhtw">正體中文</option><option value="en">English</option><option value="es">español</option></select><br /><br />' +
				'<a href="' + location.href + ((location.href.indexOf('?') + 1) ? '&' : '?') + 'bg=false' + '">' + text[25] + '</a><br /><br /><a href="http://userscripts.org/scripts/show/152091" target="_blank" title="restore google bg for Greasemonkey" style="color:blue;">' + text[24] + '</a>');
			b.appendChild(c);
			c.appendChild(d);
			c.appendChild(e);
			c.appendChild(f);
			c.appendChild(rgbgi3);
			document.body.appendChild(b);
			if (!localStorage.bgurl) {
				g('rgon').style.display = 'none';
				g('rgon0').style.display = 'none';
			}
			document.onkeypress = function(e) { //按esc也能关闭
				if (e.keyCode === 27) {
					if (g('rgoutter')) {
						document.body.removeChild(g('rgoutter'));
					}
				}
			};
			g('rgi').onclick = g('rgi2').onclick = function() { //切换选择图片方式为使用本地图片
				this.style.display = 'none';
				g('rgi2').style.display = 'inline';

				g('rgp').style.display = 'inline';
				g('rgp2').style.display = 'none';

				g('rgset').style.display = 'inline';
				g('rgset2').style.display = 'none';

				g('rgbgi1').style.display = 'block';
				g('rgbgi2').style.display = 'none';
				g('rgbgi3').style.display = 'none';
				g('rginner').className = 'rginnersmall';
			};
			g('rgp').onclick = function() { //切换选择图片方式为使用网络图片
				this.style.display = 'none';
				g('rgp2').style.display = 'inline';

				g('rgi').style.display = 'inline';
				g('rgi2').style.display = 'none';

				g('rgset').style.display = 'inline';
				g('rgset2').style.display = 'none';

				g('rgbgi1').style.display = 'none';
				g('rgbgi2').style.display = 'block';
				g('rgbgi3').style.display = 'none';
				g('rginner').className = 'rginnersmall';
				if (!g('rgiurl').value && localStorage.bgurl && localStorage.bgurl.substring(0, 4) != 'data') {
					g('rgiurl').value = localStorage.bgurl;
				}
				g('rgiurl').select();
			};
			g('rgbing').onclick = function() { //使用必应每日图片
				this.blur();
				change(1);
			};
			g('rgset').onclick = function() { //其他设置
				var save = function() {
					if (g('rgsetting1').checked) { //是否在结果也也有背景
						localStorage.always = 1;
					} else {
						localStorage.always = 0;
					}
					ifalways();
					localStorage.opacity = parseInt(g('rgsetting3').value, 10);
					g('rgbg').style.opacity = localStorage.opacity / 100;
					localStorage.left = parseInt(g('rgsettingleft').value, 10);
					localStorage.top = parseInt(g('rgsettingtop').value, 10);
					localStorage.size = parseInt(g('rgsettingsize').value, 10);
					if (g('rgsettinglang').value) {
						localStorage.lang = g('rgsettinglang').value;
					} else {
						localStorage.removeItem('lang');
					}
					g('rgbg').style.backgroundPosition = localStorage.left + '% ' + localStorage.top + '%';
					g('rgbg').style.backgroundSize = localStorage.size + '%';
					if (!g('rgmsg')) {
						var msg = document.createElement('div');
						msg.id = 'rgmsg';
						msg.innerHTML = text[20];
						document.body.appendChild(msg);
						setTimeout(function() {
							document.body.removeChild(msg);
						}, 1500);
					}
					g('rgsetting3').onblur =
						g('rgsettingtop').onblur =
						g('rgsettingleft').onblur =
						g('rgsettingsize').onblur =
						null;
				};
				var blurcheck = function() {
					if (this.id == 'rgsettingleft' || this.id == 'rgsettingtop' || this.id == 'rgsettingsize') {
						if (parseInt(this.value, 10) >= 0 && parseInt(this.value, 10) <= 1000) {
							save();
						} else {
							if (this.id == 'rgsettingtop' || this.id == 'rgsettingleft') {
								this.value = '50';
							} else {
								this.value = '100';
							}
							save();
						}
					} else if (this.id == 'rgsetting3') {
						if (parseInt(this.value, 10) >= 0 && parseInt(this.value, 10) <= 100) {
							save();
						} else {
							this.value = '100';
						}
					}
				};
				g('rgbg').style.transition = 'all .5s';
				g('rgbg').style.webkitTransition = 'all .5s';
				g('rgbg').style.oTransition = 'all .5s';
				g('rgbg').style.msTransition = 'all .5s';
				this.style.display = 'none';
				g('rgset2').style.display = 'inline';

				g('rgp').style.display = 'inline';
				g('rgp2').style.display = 'none';

				g('rgi').style.display = 'inline';
				g('rgi2').style.display = 'none';

				g('rgbgi1').style.display = 'none';
				g('rgbgi2').style.display = 'none';
				g('rgbgi3').style.display = 'block';
				g('rgbgi3').style.display = 'block';
				g('rginner').className = 'rginnerbig';
				g('rgsetting1').onchange = function() {
					save();
				};
				g('rgsetting3').onkeydown =
					g('rgsettingtop').onkeydown =
					g('rgsettingleft').onkeydown =
					g('rgsettingsize').onkeydown = function(event) {
						var keyCode = event.keyCode;
						if (keyCode == 38) { //up
							this.value = parseInt(this.value, 10) + 1;
						} else if (keyCode == 40) { //down
							this.value = parseInt(this.value, 10) - 1;
						} else if ((keyCode >= 65 && keyCode <= 90)) {
							return !1;
						}
				};
				g('rgsetting3').onkeyup = function() {
					g('rgbg').style.opacity = this.value / 100;
					g('rgsetting3').onblur = blurcheck;
				};
				g('rgsettingtop').onkeyup = function() {
					g('rgsettingtop').onblur = blurcheck;
					g('rgbg').style.backgroundPosition = g('rgsettingleft').value + '% ' + g('rgsettingtop').value + '%';
				};
				g('rgsettingleft').onkeyup = function() {
					g('rgsettingleft').onblur = blurcheck;
					g('rgbg').style.backgroundPosition = g('rgsettingleft').value + '% ' + g('rgsettingtop').value + '%';
				};
				g('rgsettingsize').onkeyup = function() {
					g('rgsettingsize').onblur = blurcheck;
					g('rgbg').style.backgroundSize = g('rgsettingsize').value + '%';
				};
				g('rgsettinglang').onchange = function() {
					save();
				};
				if (localStorage.always == 1) {
					g('rgsetting1').checked = 1;
				}
				g('rgsetting3').value = localStorage.opacity;
				g('rgsettingtop').value = localStorage.top;
				g('rgsettingleft').value = localStorage.left;
				g('rgsettingsize').value = localStorage.size;
				g('rgsettinglang').value = localStorage.lang || 'auto';
			};
			g('rgcls').onclick = function() { //关闭弹出来的框
				this.blur();
				document.body.removeChild(g('rgoutter'));
			};
			g('rgrm').onclick = function() { //清除背景图片
				document.body.removeChild(g('rgbg'));
				document.body.removeChild(g('rgoutter'));
				toggle('');
				g('hplogo').style.background = 'url("/images/srpr/logo3w.png")';
				localStorage.removeItem('bgurl');
			};
			g('rgfile').onchange = function() { //上传了图片
				var reader = new FileReader();
				g('rgform').innerHTML = '<div style="font-size:25px;margin:45px 0 0 0">' + text[23] + '</div>';
				reader.readAsDataURL(this.files[0]);
				reader.onload = function() {
					localStorage.bgurl = this.result;
					change();
					localStorage.removeItem('date');
				};
			};
			g('rgcf').onclick = function() { //选择了网络图片
				this.blur();
				if (g('rgiurl').value !== '') {
					change(2);
					localStorage.removeItem('date');
				} else {
					g('rgrm').click();
				}
			};
			g('rgbgi1').ondrop = function(event) { //托进来了文件
				event.stopPropagation();
				event.preventDefault();
				this.style.background = '#F3F7FD';
				g('rgform').innerHTML = '<div style="font-size:25px;margin:45px 0 0 0;display:block">' + text[23] + '</div>';
				g('rgform').style.display = 'block';
				var reader = new FileReader();
				reader.readAsDataURL(event.dataTransfer.files[0]);
				reader.onload = function() {
					localStorage.bgurl = this.result;
					change();
					localStorage.removeItem('date');
				};
			};
			g('rgbgi1').ondragover = function(event) {
				event.stopPropagation();
				event.preventDefault();
			};
			g('rgbgi1').ondragenter = function() {
				this.style.background = '#bfd9ff';
				g('rgform').style.display = 'none';
			};
			g('rgbgi1').ondragleave = function() {
				this.style.background = '#F3F7FD';
				g('rgform').style.display = 'block';
			};
		};
		addEventListener('DOMContentLoaded', afterload, false);
		addEventListener('load', function() {
			if (typeof loaded == 'undefined') {
				afterload();
			}
		}, false);
		ifalways();
		console.log('restore google bg is working!');
	}
})();