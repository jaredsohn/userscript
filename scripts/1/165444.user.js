// ==UserScript==
// @name           OSU AnotherDownload Plus
// @author         9尾雪狐, Modified by Jixun
// @namespace      OSU.Another.Dl.Plus
// @description    Download Beatmaps with no limit！|无限制下图！
// @icon           http://osu.ppy.sh/favicon.ico
// @include        *://osu.ppy.sh/s/*
// @include        *://osu.ppy.sh/b/*
// @include        *://osu.ppy.sh/p/beatmap?*
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// @version        0.9.2-c3
// ==/UserScript==

// 声明: 该脚本为自用修改备份，并非有意侵权。
// 若侵犯了您了权益，请发表到讨论区，我会移除 ASAP。

// 本体
addEventListener ('DOMContentLoaded', function () {
	var eUn = document.querySelector('.content-infoline a[href^="\/u\/"]'),
		sUsername = "&username=" + (eUn ? eUn.textContent : 'Guest'),
		acc = eUn;

	var arrLinks = [], nupdate = '';
	var songid = document.querySelector('img[src*="beatmap-rating-graph"]').src.match (/\d+/);

	// 生成适用于所有浏览器前缀的 css 代码
	function makeCpfCss (a, b) {
		return (function(c){return c.substr(0,c.length-1)})('-'+['o','ms','moz','webkit',''].join('-'+a+':'+b+';-'))
	}

	// 创建元素 nEle (tagName, textContent, { Attribute: Value })
	function nEle () {
		var ret = document.createElement (arguments[0] || 'div');
		ret.textContent = (arguments[1]||'');
		
		for (i in (arguments[2]||{}))
			ret.setAttribute (i, arguments[2][i]);
		return ret
	}

	var contInfoline = document.querySelector ('.content-infoline'),
		toDown = nEle ('select');
	
	toDown.innerHTML += '<option value="0">不自动下载 // No auto dl</option>';
	toDown.innerHTML += '<option value="1">　自动下载 // Auto Download</option>';
	toDown.innerHTML += '<option value="bloodcat.com">BloodCat</option>';
	toDown.innerHTML += '<option value="osu.uu.gl">Osu.uu.gl</option></select>';
	toDown.value = localStorage.todown;
	contInfoline.parentNode.insertBefore (toDown, contInfoline.nextSibling);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://osuosz.duapp.com/osuAD.php?id=' + songid + sUsername,
		headers: {
			'Referer': location.href,
		},
		onload: function (response) {
			// 服务器端 php 文件应该为 UTF-8 无签名 >.>
			var eDiv = nEle ('','',{style:'font-size: 16px;padding: 0 20px 10px 0;text-align: right'}),
				aInfo = JSON.parse (response.responseText.match(/{.+}/)),
				mapSize = (aInfo.size || '?? MB'),
				uploader = aInfo.usern;
			
			console.log (aInfo);
			
			// MF
			if (aInfo.mf)
				arrLinks.push ({
					'disp': 'Mediafire',
					'addr': 'http://mediafire.com/download.php?' + aInfo.mf
				});
			
			// BloodCat
			if (aInfo.blood)
				arrLinks.push ({
					'disp': 'BloodCat',
					'addr': 'http://bloodcat.com/osu/d/' + aInfo.blood
				});
			
			// Osu.uu.gl
			if (aInfo.uugl)
				arrLinks.push ({
					'disp': 'Osu.uu.gl',
					'addr': 'http://osu.uu.gl/pid/' + aInfo.uugl
				});
			
			// 1000eb
			if (aInfo.n1000eb)
				arrLinks.push ({
					'disp': '1000eb',
					'addr': 'http://1000eb.com/' + aInfo.n1000eb,
					'title': (aInfo.usern?('上传者: '+aInfo.usern):'')
				});
			else if (acc)
				arrLinks.push ({
					'disp': '上传到 1000EB',
					'addr': 'javascript:window.open("http://osuosz.duapp.com/1000eb.php?songid=' + songid + sUsername
					+ '","_blank","width=616,height=563,scrollbars=no,resizable=no,location=no,status=no,menubar=no,toolbar=no");',
					'title': 'Upload to 1000eb, OSU.Another.Dl needs your help.\n上传地图到 1000eb 网盘, 无限制下图需要您的帮助。'
				});
				
			arrLinks.push ({
				'disp': 'Report!',
				'addr': 'http://weibo.com/gameclamp',
				'title': 'Please report if you found beat map mismatching.\n如果 osz 文件不对的话还请报告。'
			});
			
			eDiv.appendChild (nEle('span', mapSize, {
				'title': 'Size: ' + mapSize
			}));
			
			arrLinks.forEach (function(e){
				eDiv.appendChild(nEle('a', e.disp, {
					'href': e.addr,
					'class': 'link',
					'title': (e.title||'')
				}))
			});
			
			var tabList = document.querySelector ('#tablist');
			tabList.parentNode.insertBefore (eDiv, tabList);
			
			document.head.appendChild(nEle('style', '.link:hover,.link:active{display:inline;padding:3px;border:3px solid #beceeb;background:white;'
											+ makeCpfCss('box-shadow','0 0 8px rgba(72,106,170,.5)')
											+ 'margin-left: 18px;text-decoration: none}.link:active{background:#dee6ff;}.link{margin-left: 30px}')
			);
			
			// 调用页面上的 jQuery
			try { var $ = unsafeWindow.$ } catch (e) { var $ = window.$ }
			
			var autoDl = function (){
				var iAutoDl = parseInt (localStorage.todown);
				if (iAutoDl && 0 != parseInt (iAutoDl)) {
					// 自动下载
                    var tLink = $('a[href*="' + (
						1!=iAutoDl?
						localStorage.todown:
						'bloodcat.com"],a[href*="osu.uu.gl'
					) + '"]').first().attr ('href');
                    if (tLink)
                        location.href = tLink;
				}
			};
			
			$(toDown).change(function () {
				localStorage.todown = this.value;
				autoDl ();
			}).css({
				'float': 'right',
				'margin': '-10px 5px 0 0'
			});
			
			autoDl ();
		}
	})
}, false);