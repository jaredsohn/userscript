// ==UserScript==
// @name         Osc Face
// @namespace    http://userscripts.org/scripts/show/185430
// @updateURL    https://userscripts.org/scripts/source/185430.meta.js
// @downloadURL  https://userscripts.org/scripts/source/185430.user.js
// @description  oschina评论表情扩展
// @match        http://www.oschina.net/*
// @icon         http://www.oschina.net/img/favicon.ico
// @license      GPL version 3
// @encoding     utf-8
// @require      http://code.jquery.com/jquery-1.8.2.js
// @version      1.0
// @author       moxia
// @run-at       document-end
// ==/UserScript==

/**
* 系转载，原作者：http://www.oschina.net/code/snippet_1168115_22603
*/

(function() {
var d = document;
var code = function() {
	window._ = {
		Module: {
			define: function(data) { (function(list) {
					var dw = document.getElementsByTagName('iframe')[0];
					if (!dw) {
						var a = arguments.callee;
						return setTimeout(function() {
							a(list)
						},
						100);
					}
					function getPos(obj) {
						var _left = 0,
						_top = 0;
						obj = document.getElementById(obj) || obj;
						while (obj) {
							_left += obj.offsetLeft;
							_top += obj.offsetTop;
							obj = obj.offsetParent;
						}
						return {
							left: _left,
							top: _top
						};
					}
					function aImg(type, value, width, height) {
						var img = ct.appendChild(document.createElement(type));
						img.style.cssText = 'display:inline;position:relative;';
						img.src = img.innerHTML = value;
					}
					var ct = dw.contentDocument.getElementsByClassName('ke-content')[0];
					var bt = document.getElementsByClassName('ke-toolbar')[0].appendChild(document.createElement('img'));
					bt.style.cursor = 'pointer';
					bt.title = '贴吧表情';
					bt.src = 'http://static.tieba.baidu.com/tb/editor/images/face/i_f33.png';
					bt.width = bt.height = 18;
					bt.onmouseover = function() {
						this.style.border = '1px solid #116eae';
					};
					bt.onmouseout = function() {
						this.style.border = 'none';
					};
					bt.s = 1;
					bt.onclick = function() {
						cBox.style.top = (getPos(bt).top - 350) + 'px';
						cBox.style.display = ['block', 'none'][bt.s ^= 1];
					};
					ct.onclick = function() {
						cBox.style.display = ['block', 'none'][bt.s = 1];
					};
					var cBox = document.body.appendChild(document.createElement('div'));
					cBox.style.cssText = 'width:542px;display:none;height:340px;overflow-x:hidden;overflow-y:hidden;border:1px solid #c0c0c0;text-align:center;position:absolute;left:' + (getPos(bt).left - 460) + 'px;top:' + (getPos(bt).top - 350) + 'px;background-color:#ffffff;';
					var cBox2 = cBox.appendChild(document.createElement('div'));
					cBox2.style.cssText = 'position:relative;left:0px;top:0px;width:542px;height:300px;overflow:hidden;';
					for (var ix = 0; ix < 12; ix++) {
						cBox2.appendChild(create(ix));
						var tag = cBox.appendChild(document.createElement('a'));
						var obj = list.smileProperty[list.smileQueen[ix]];
						tag.innerHTML = obj.name;
						tag.href = '#bd_face_' + ix;
						tag.style.cssText = 'font-size:12px;color:#116eae;margin:7px;';
						if (ix == 8) cBox.appendChild(document.createElement('br'));
					}
					function create(i) {
						var cont = document.createElement('div');
						cont.id = 'bd_face_' + i;
						cont.style.cssText = 'width:542px;height:300px;overflow-x:hidden;overflow-y:scroll;border:1px solid #c0c0c0;position:relative;';
						var obj = list.smileProperty[list.smileQueen[i]];
						var htm = '';
						for (i = 1; i <= obj.num; i++) {
							var SRC = 'http://static.tieba.baidu.com/tb/editor/images/' + obj.folder + obj.prev + (i < 10 ? '0' + i: i) + '.' + (obj.suffix || 'gif');
							htm += '<div style="position:absolute;cursor:pointer;border:1px solid #ececec;left:' + ((i % 10 || 10) - 1) * 52 + 'px;top:' + Math.floor((i - 1) / 10) * 58 + 'px;background-color:#ffffff" title="' + obj.tip[i - 1] + '">' + (obj.type == 'img' ? '<img style="width:45px;height:45px;margin:2px;" onmouseover="clearInterval(this.o);this.L=20;var e=this;e.o=setInterval(function(){with(e.style)if((e.L-=.8)<0){clearInterval(e.o);marginLeft=marginTop=\'2px\'}else {marginLeft1=(Math.random()*e.L-e.L/2+2)+\'px\';marginTop=(Math.random()*e.L-e.L/2+8)+\'px\';}},15);" src="' + SRC + '">': ('<div style="width:50px;height:50px;line-height:50px;font-size:12px;text-align:center;overflow:hidden;">' + obj.tip[i - 1] + '</div>')) + '</div>';
						}
						cont.innerHTML = htm;

						var os = cont.children;
						for (var i = 0; i < os.length; i++) os[i].onclick = function() {
							var t1 = this.children[0],
							t = t1.tagName.match(/img/i);
							aImg(t ? 'img': 'div', t ? t1.src: t1.innerHTML);
						};

						return cont;
					}
				})(data.sub);
			}
		}
	};
	with(document) body.appendChild(createElement('script')).src = 'http://tieba.baidu.com/tb/_/editor_smiley_ff7ef4c4.js';
}
var exe = d.body.appendChild(d.createElement('div'));
exe.style.display = 'none';
exe.innerHTML = '<img src="?" onerror="this.onerror=null;eval(\'(\'+unescape(\'' + escape(code) + '\')+\')()\');">';
})();