// ==UserScript==
// @name           Tieba_ShuiDao
// @description    百度贴吧水岛表情
// @version        1.0.0.1
// @include        http://tieba.baidu.com/*
// @updateURL      https://userscripts.org/scripts/source/167411.meta.js
// @downloadURL    https://userscripts.org/scripts/source/167411.user.js
// ==/UserScript==


//表情1
var acfun_collection_name = '水岛颜艺';
var acfun_collection = ["http://d.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=e978cf8c0bd162d981ee601821e4d8d1/5fdf8db1cb134954e253692c574e9258d1094a2d.jpg", "http://h.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=84c7365ecefc1e17f9bf8e357aab873e/7dd98d1001e93901e6510c767aec54e736d19623.jpg", "http://h.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=84c7365ecefc1e17f9bf8e357aab873e/7dd98d1001e93901e6510c767aec54e736d19623.jpg", "http://b.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=f3c96d4bc995d143de76e62743cbf33f/faf2b2119313b07e7beed1400dd7912397dd8c23.jpg", "http://a.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=4b8a36f3a71ea8d38e227600a7314173/8b13632762d0f703e9ff149409fa513d2697c52d.jpg", "http://c.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=b561249777c6a7efbd26aa22cdc1de6c/4b90f603738da9776b620763b151f8198618e32d.jpg", "http://d.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=7962d75f63d0f703e2b297d838c12000/d009b3de9c82d1583fced8f9810a19d8bc3e422e.jpg", "http://h.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=9ff37ef864380cd7e21ea0e9917fdc09/d50735fae6cd7b89b1dcbbcb0e2442a7d8330ec1.jpg", "http://d.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=c362c2bea6efce1bee2bcace9f6a82e3/f703738da9773912e0960429f9198618377ae2c2.jpg", "http://a.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=036b2353d50735fa95f04cbdae6a7e8e/d439b6003af33a8741238152c75c10385343b528.jpg", "http://b.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=a0d778c76d81800a6ae58b0a810e42c7/7af40ad162d9f2d326a3a5a7a8ec8a136227cccc.jpg", "http://e.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=65301933d01373f0f13f6d9b94343ac6/b17eca8065380cd7255023a5a044ad3459828128.jpg", "http://d.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=fc445d5cb999a9013f3559322dae7b46/f11f3a292df5e0fe7a5108495d6034a85edf7229.jpg", "http://g.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=1c175d28342ac65c63056477cbc9c32c/50da81cb39dbb6fd74f6646e0824ab18962b37cc.jpg", "http://f.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=9f67276bb17eca8016053be3a118e6e0/aa18972bd40735facbbbcff19f510fb30f24082a.jpg", "http://d.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=686a3379a08b87d65442a91b37335905/cf1b9d16fdfaaf5128a800f78d5494eef01f7a2b.jpg"];
//表情2
var acfun_collection_name2 = '水岛其他';
var acfun_collection2 = ["http://hiphotos.baidu.com/bqsweb/pic/item/0ad75fd062d9f2d336101157a9ec8a136327cc2d.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/b2ed96fcfc039245de92d4b78794a4c27d1e2502.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/7b76e618ebc4b7457bc382aecffc1e178b8215d2.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/89ff8401baa1cd1172914798b912c8fcc3ce2d02.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/b81e25ce3bc79f3d04d2d188baa1cd11728b297f.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/a07b99be6c81800affc1bcb6b13533fa828b4702.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/c23abec5b74543a9bb61cf741e178a82b9011437.jpg", "http://hiphotos.baidu.com/bqsweb/pic/item/faf7e61d8701a18bc84527f79e2f07082938fe84.jpg", "http://f.hiphotos.baidu.com/album/s%3D900%3Bq%3D90/sign=218fb9435ab5c9ea66f30fe3e502c73d/9345d688d43f8794b1d6c766d31b0ef41bd53a48.jpg", "http://g.hiphotos.baidu.com/album/s%3D1600%3Bq%3D90/sign=c32aef83b3fb43161e1f7e7c10947d52/314e251f95cad1c859c1736f7e3e6709c93d5104.jpg", "http://e.hiphotos.baidu.com/album/s%3D1000%3Bq%3D90/sign=18c93a7218d8bc3ec20802cab2bb9d6f/63d0f703918fa0ec7cb2eb45279759ee3d6ddb05.jpg", "http://b.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=a69db55c43a7d933bba8e6779d70a02e/11385343fbf2b2113a3d0a06cb8065380cd78e63.jpg", "http://b.hiphotos.baidu.com/album/s%3D1100%3Bq%3D90/sign=b1b69c6794cad1c8d4bbf8264f0e5c78/6c224f4a20a44623880f292a9922720e0df3d7b5.jpg", "http://c.hiphotos.baidu.com/album/s%3D1200%3Bq%3D90/sign=ea8db68c30adcbef05347a049c9f15ac/4afbfbedab64034f42df4d4eaec379310a551d63.jpg", "http://b.hiphotos.baidu.com/album/s%3D1200%3Bq%3D90/sign=7c8deba280cb39dbc5c06354e0263255/37d3d539b6003af39bce5328342ac65c1038b606.jpg", "http://c.hiphotos.baidu.com/album/s%3D1000%3Bq%3D90/sign=b7975d6991ef76c6d4d2ff2bad26c68b/b151f8198618367a88fef0952f738bd4b31ce507.jpg"];


// 当前网页类型：1, 通用表情页面；2，楼中楼表情页面
var this_page = 1;
if (location.href.indexOf("simplesmiley.html") != -1) {
	this_page = 2;
}

setTimeout(function () {
	//表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
	fun_UserDefinedSmiley(acfun_collection_name, acfun_collection, 'tab34', 'tab_34');
	fun_UserDefinedSmiley(acfun_collection_name2, acfun_collection2, 'tab35', 'tab_35');
}, 0);

function fun_UserDefinedSmiley(collection_name, collection, content_id, menu_id) {
	var f1 = document.getElementById('tabContent');
	var f2 = document.getElementById('tabMenu');
	if (f1 && f2) {
		//添加自定义表情存储表格
		var node = document.createElement('div');
		node.id = content_id;
		node.setAttribute('style', 'display: none;');
		var text = '<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
		var number = 0;
		for (var i = 0; i < collection.length / 7; i++) {
			text += '<tr>';
			for (var j = 0; j < 7; j++) {
				var posflag = j > 3 ? 1 : 0;
				var image_src = collection[number++];
				if (image_src) {
					text += '<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyinsertimage(\'' + image_src + '\')" onmouseover="over(this,\'' + image_src + '\',\'' + posflag + '\')" onmouseout="out(this)">';
					text += '<img height=36px src="' + image_src + '">';
					text += '</td>';
				} else {
					text += '<td width=35px bgcolor="#FFFFFF"></td>';
				}
			}
			text += '</tr>';
		}
		text += '</tbody></table>';
		node.innerHTML = text;
		f1.appendChild(node);
		
		//添加自定义表情切换按钮
		var node = document.createElement('div');
		node.id = menu_id;
		node.setAttribute('class', 'menuDefault');
		node.setAttribute('onclick', 'FrozenFaceSwitchTab("' + content_id + '","' + menu_id + '");');
		node.innerHTML = '<u>' + collection_name + '</u>';
		f2.appendChild(node);
		
		//设置预览框大小
		document.getElementById('faceReview').setAttribute('style', 'width:150px;height:130px;');
	}
}
unsafeWindow.FrozenFaceSwitchTab = function (content_id, menu_id) {
	var f1 = document.getElementById(content_id);
	if (f1) {
		//显示自定义表情储存表格
		var f2 = document.getElementById('tabContent');
		if (f2) {
			for (var i = 0; i < f2.children.length; i++) {
				if (f2.children[i].getAttribute('style') == 'display: block;' ||
					f2.children[i].getAttribute('style') == 'display: block; ') {
					f2.children[i].setAttribute('style', 'display:none;');
				}
			}
		}
		f1.setAttribute('style', 'display: block;');
		
		//表情切换按钮调整
		var f3 = document.getElementById('tabMenu');
		if (f3) {
			for (var i = 0; i < f3.children.length; i++) {
				var item = f3.children[i];
				if (item.getAttribute('class') != 'menuDefault disable') {
					item.setAttribute('class', 'menuDefault');
				}
				var tab_number = item.id.match(/\d+/);
				if (parseInt(tab_number) < 16 && item.getAttribute('class') != 'menuDefault disable') { //假定16以下的序号已被百度贴吧占用，其他序号保留给小脸使用
					item.setAttribute('onclick', 'document.getElementById("' + content_id + '").setAttribute("style", "display:none;");document.getElementById("' + menu_id + '").setAttribute("class", "menuDefault");switchTab(' + tab_number + ')');
				}
			}
			document.getElementById(menu_id).setAttribute('class', 'menuFocus');
		}
	}
}

unsafeWindow.FrozenFaceSmileyinsertimage = function (image_src) {
	var editorID = unsafeWindow.getSearchById('id');
	var P = parent.wrappedJSObject;
	if (typeof P === 'undefined') {
		P = parent;
	}
	
	if (this_page == 1) {
		var editor = P.TED.Editor.getInstanceById(editorID);
		editor.execCommand('insertimage', image_src);
		editor.overlay.close();
		return;
	}
	
	if (this_page == 2 && image_src.indexOf("http://static.tieba.baidu.com") != -1) {
		var editor = P.TED.SimpleEditor.getInstanceById(editorID);
		editor.execCommand('insertimage', image_src);
		editor.editorPlugins.insertimage.closeOverlay();
		return;
	}
}