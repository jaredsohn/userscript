// ==UserScript==
// @name           TiebaUsualSmilier
// @description    百度贴吧常用表情替换
// @author         congxz6688
// @include        http://tieba.baidu.com/*
// @exclude        http://tieba.baidu.com/mo/*
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @updateURL      https://userscripts.org/scripts/source/142404.meta.js
// @downloadURL    https://userscripts.org/scripts/source/142404.user.js
// @grant          GM_addStyle
// @version        2014.3.6.0
// ==/UserScript==

var $ = unsafeWindow.$;
var eery = document.createElement("style");
eery.type = "text/css";
eery.innerHTML = ".tbui_panel_content{min-height:200px}";
eery.innerHTML += "ul.s_tab_content li.s_tab_btn{margin-right: 0px !important;}";
eery.innerHTML += ".arrow.arrow_up,.arrow.down{display:none !important;}";
eery.innerHTML += ".s_layer_content{padding:3px 3px 0px 3px !important}";
eery.innerHTML += ".insertsmiley_holder>.tb_layer_wrapper{position:relative !important; top:-343px !important; left:-250px !important}";
eery.innerHTML += ".tb-editor-wrapper>.tb_layer_wrapper{top:-180px !important; }";
document.head.appendChild(eery);

//函数 元素精确定位
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//函数 元素精确定位取消绑定
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}

//常用表情
var usual_collection = ['http://static.tieba.baidu.com/tb/editor/images/face/i_f29.gif', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f27.gif', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon33.png', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon19.png', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon6.png', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon28.png', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon27.png', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0001.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0002.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0003.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0004.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0005.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0006.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0009.gif', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f02.png', 'http://static.tieba.baidu.com/tb/editor/images/client/image_emoticon24.png', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f30.png', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f09.png', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f11.png', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f13.png', 'http://static.tieba.baidu.com/tb/editor/images/face/i_f15.png', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0012.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0011.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0013.gif', 'http://static.tieba.baidu.com/tb/editor/images/tsj/t_0025.gif', 'http://static.tieba.baidu.com/tb/editor/images/tsj/t_0035.gif', 'http://static.tieba.baidu.com/tb/editor/images/tsj/t_0030.gif', 'http://static.tieba.baidu.com/tb/editor/images/tsj/t_0023.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_011.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_029.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_031.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_035.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_040.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_052.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_020.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0015.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0018.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0017.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0019.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0020.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0023.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0025.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_037.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_002.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_012.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_022.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_042.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_069.gif', 'http://static.tieba.baidu.com/tb/editor/images/ali/ali_063.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0045.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0024.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0029.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/j_0028.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0019.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0020.gif', 'http://static.tieba.baidu.com/tb/editor/images/ldw/w_0021.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0003.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0004.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0005.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0006.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0011.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0012.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0013.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b06.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b13.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b09.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b15.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b11.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b54.gif', 'http://static.tieba.baidu.com/tb/editor/images/qpx_n/b21.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0014.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0021.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0025.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0026.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0037.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0039.gif', 'http://static.tieba.baidu.com/tb/editor/images/bobo/B_0052.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0001.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0002.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0003.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0004.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0005.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0006.gif', 'http://static.tieba.baidu.com/tb/editor/images/jd/sdxl_0007.gif'];
var acfun_collection = ["http://imgsrc.baidu.com/forum/pic/item/f26fbd8f8c5494eea9c80a562ff5e0fe9b257ec3.jpg","http://imgsrc.baidu.com/forum/pic/item/352a0a3b5bb5c9ea096406acd739b6003bf3b31e.jpg","http://imgsrc.baidu.com/forum/pic/item/c24cf5039245d68847e8b7eba6c27d1ed01b24c3.jpg","http://imgsrc.baidu.com/forum/pic/item/d848de2a6059252dc280184b369b033b5ab5b91e.jpg","http://imgsrc.baidu.com/forum/pic/item/ac855082b2b7d0a2395e01d2c9ef76094a369a1e.jpg","http://imgsrc.baidu.com/forum/pic/item/83b353afa40f4bfb4c3a9b1b014f78f0f53618c3.jpg","http://imgsrc.baidu.com/forum/pic/item/ac855082b2b7d0a2392c01d2c9ef760949369acc.jpg","http://imgsrc.baidu.com/forum/pic/item/99937b0e0cf3d7ca7d133a39f01fbe096963a9cc.jpg","http://imgsrc.baidu.com/forum/pic/item/87a93f7adab44aedfaabbbabb11c8701a38bfbcd.jpg","http://imgsrc.baidu.com/forum/pic/item/e895b199a9014c088dde2dea087b020879f4f4cd.jpg","http://imgsrc.baidu.com/forum/pic/item/06b921381f30e9245841997e4e086e061f95f7cd.jpg","http://imgsrc.baidu.com/forum/pic/item/349bcf5c10385343dc2a826e9113b07ec88088cc.jpg","http://imgsrc.baidu.com/forum/pic/item/f6b2988fa0ec08faa49716e85bee3d6d54fbda1f.jpg","http://imgsrc.baidu.com/forum/pic/item/585f346d55fbb2fbb8bc5d5d4d4a20a44723dc1f.jpg","http://imgsrc.baidu.com/forum/pic/item/77b84236acaf2edd9f674ca68f1001e93801931f.jpg","http://imgsrc.baidu.com/forum/pic/item/4a87a5af2edda3cc4172bd6f03e93901203f921f.jpg","http://imgsrc.baidu.com/forum/pic/item/50bed0f9d72a605930f4e4552a34349b013bbacd.jpg","http://imgsrc.baidu.com/forum/pic/item/807a30dbb6fd526671bd395ba918972bd507361f.jpg","http://imgsrc.baidu.com/forum/pic/item/53d7d9160924ab183380e47837fae6cd7a890b1f.jpg","http://imgsrc.baidu.com/forum/pic/item/349bcf5c10385343dc28826e9113b07ec88088ce.jpg","http://imgsrc.baidu.com/forum/pic/item/b88992504fc2d562ceecd5a2e51190ef74c66ccd.jpg","http://imgsrc.baidu.com/forum/pic/item/e14f9025bc315c6054716ea08fb1cb134b5477cd.jpg","http://imgsrc.baidu.com/forum/pic/item/084699529822720e085fe7b579cb0a46f31fab18.jpg","http://imgsrc.baidu.com/forum/pic/item/b8b04390f603738d62db096db11bb051f919ec19.jpg","http://imgsrc.baidu.com/forum/pic/item/208eb10e7bec54e7737d1f51bb389b504ec26a18.jpg","http://imgsrc.baidu.com/forum/pic/item/8484ecdde71190ef396a9790cc1b9d16fcfa6018.jpg","http://imgsrc.baidu.com/forum/pic/item/a15d01fa513d2697ae370d1257fbb2fb4116d8ce.jpg","http://imgsrc.baidu.com/forum/pic/item/b7b133f33a87e95016f0f62312385343f9f2b4ce.jpg","http://imgsrc.baidu.com/forum/pic/item/a8b045086e061d95efd7327779f40ad163d9ca19.jpg","http://imgsrc.baidu.com/forum/pic/item/e6a099ef76c6a7ef9fc1ad69fffaaf51f1de66ce.jpg","http://imgsrc.baidu.com/forum/pic/item/f3625e2c11dfa9ec64bf535860d0f703908fc119.jpg","http://imgsrc.baidu.com/forum/pic/item/24ae9ccad1c8a786b6cd4f416509c93d72cf50ce.jpg","http://imgsrc.baidu.com/forum/pic/item/c94dcacec3fdfc03039fe6f7d63f8794a6c226ce.jpg","http://imgsrc.baidu.com/forum/pic/item/f687a6c379310a550cc3dbbbb54543a9802610ce.jpg","http://imgsrc.baidu.com/forum/pic/item/351957df8db1cb132dfa395cdf54564e93584b1a.jpg","http://imgsrc.baidu.com/forum/pic/item/b2ad8e01a18b87d6fda5ae50050828381d30fdcf.jpg","http://imgsrc.baidu.com/forum/pic/item/b0843afa828ba61ede7ecd604334970a314e5919.jpg","http://imgsrc.baidu.com/forum/pic/item/6361fe03918fa0ecfc216142249759ee3f6ddbc8.jpg","http://imgsrc.baidu.com/forum/pic/item/a15d01fa513d2697ae340d1257fbb2fb4116d8cf.jpg","http://imgsrc.baidu.com/forum/pic/item/b9bf72ec54e736d169f5894799504fc2d76269cf.jpg","http://imgsrc.baidu.com/forum/pic/item/f6b2988fa0ec08faa49016e85bee3d6d54fbda1a.jpg","http://imgsrc.baidu.com/forum/pic/item/86672e7f9e2f0708f5952f4feb24b899a801f21a.jpg","http://imgsrc.baidu.com/forum/pic/item/0d66982397dda1449c9a69fdb0b7d0a20df4861a.jpg","http://imgsrc.baidu.com/forum/pic/item/a962f41f4134970a4ae0156097cad1c8a6865d1a.jpg","http://imgsrc.baidu.com/forum/pic/item/e46cee1190ef76c6f740fe649f16fdfaae51671b.jpg","http://imgsrc.baidu.com/forum/pic/item/0bca0b087bf40ad18b77c2ac552c11dfa8ecce1b.jpg","http://imgsrc.baidu.com/forum/pic/item/1fa68382b9014a903fad43f2ab773912b21bee1b.jpg","http://imgsrc.baidu.com/forum/pic/item/52f2f2f2b21193139aa2faff67380cd793238dc8.jpg","http://imgsrc.baidu.com/forum/pic/item/6d30890a19d8bc3ec3e90385808ba61eaad345c8.jpg","http://imgsrc.baidu.com/forum/pic/item/351957df8db1cb132d88395cdf54564e90584bc8.jpg","http://imgsrc.baidu.com/forum/pic/item/2e9fb0389b504fc29fbfb54ae7dde71192ef6dc9.jpg","http://imgsrc.baidu.com/forum/pic/item/52f2f2f2b21193139ad1faff67380cd790238d1b.jpg","http://imgsrc.baidu.com/forum/pic/item/0e02062442a7d9336649e13caf4bd11371f001c8.jpg","http://imgsrc.baidu.com/forum/pic/item/b2ad8e01a18b87d6fda3ae50050828381d30fdc9.jpg","http://imgsrc.baidu.com/forum/pic/item/cca07b8b4710b9124553f3b1c1fdfc039345221b.jpg","http://imgsrc.baidu.com/forum/pic/item/52f2f2f2b21193139aa3faff67380cd793238dc9.jpg","http://imgsrc.baidu.com/forum/pic/item/f9a88f18367adab499421e0c89d4b31c8601e424.jpg","http://imgsrc.baidu.com/forum/pic/item/42a764224f4a20a4b9d9398892529822700ed0ef.jpg","http://imgsrc.baidu.com/forum/pic/item/544abbfb43166d22b29710db442309f79252d2ca.jpg","http://imgsrc.baidu.com/forum/pic/item/508c2f9759ee3d6dac54828441166d224e4ade24.jpg","http://imgsrc.baidu.com/forum/pic/item/f26fbd8f8c5494eea9af0a562ff5e0fe98257e24.jpg","http://imgsrc.baidu.com/forum/pic/item/83b353afa40f4bfb4c309b1b014f78f0f53618c9.jpg","http://imgsrc.baidu.com/forum/pic/item/e46cee1190ef76c6f75ffe649f16fdfaae516724.jpg","http://imgsrc.baidu.com/forum/pic/item/acdfd4c451da81cba76b86825066d01608243124.jpg","http://imgsrc.baidu.com/forum/pic/item/569d18dfa9ec8a138712598bf503918fa1ecc086.jpg","http://imgsrc.baidu.com/forum/pic/item/106ea0ec8a13632787e5cc58938fa0ec09fac786.jpg","http://imgsrc.baidu.com/forum/pic/item/a85d8313632762d01136aad4a2ec08fa503dc686.jpg","http://imgsrc.baidu.com/forum/pic/item/8ba26a2762d0f70376ba9bb70afa513d2797c586.jpg","http://imgsrc.baidu.com/forum/pic/item/62966bd0f703918f48d933a1533d269758eec486.jpg","http://imgsrc.baidu.com/forum/pic/item/6361fe03918fa0ece1cf6a66249759ee3c6ddb86.jpg","http://imgsrc.baidu.com/forum/pic/item/f6b2988fa0ec08fabb081dcc5bee3d6d54fbda86.jpg","http://imgsrc.baidu.com/forum/pic/item/903ea9ec08fa513dcda262b53f6d55fbb3fbd986.jpg","http://imgsrc.baidu.com/forum/pic/item/a15d01fa513d2697b5db063657fbb2fb4216d886.jpg","http://imgsrc.baidu.com/forum/pic/item/028a52b5c9ea15ce247aee62b4003af33b87b271.jpg","http://imgsrc.baidu.com/forum/pic/item/5a04c0ea15ce36d3c6908d5b38f33a87e850b171.jpg","http://imgsrc.baidu.com/forum/pic/item/c85b1cce36d3d539a2a901a83887e950342ab071.jpg","http://imgsrc.baidu.com/forum/pic/item/147f3fd3d539b6002f5a01dceb50352ac75cb771.jpg","http://imgsrc.baidu.com/forum/pic/item/3762dc39b6003af32c2ed20b372ac65c1138b671.jpg","http://imgsrc.baidu.com/forum/pic/item/d488bf003af33a87fef90e71c45c10385243b571.jpg","http://imgsrc.baidu.com/forum/pic/item/b7b133f33a87e9502d83fd0712385343faf2b471.jpg","http://imgsrc.baidu.com/forum/pic/item/3b423387e950352adff52b635143fbf2b3118b71.jpg","http://imgsrc.baidu.com/forum/pic/item/3b36e050352ac65c0a916818f9f2b21192138a71.jpg","http://imgsrc.baidu.com/forum/pic/item/f7b27a8da977391271cf8b0afa198618377ae225.jpg","http://imgsrc.baidu.com/forum/pic/item/723ca0773912b31b7385c3428418367adbb4e125.jpg","http://imgsrc.baidu.com/forum/pic/item/a8c63012b31bb0513ccdbd43347adab44bede025.jpg","http://imgsrc.baidu.com/forum/pic/item/38a3ba1bb051f81943cc0d21d8b44aed2f73e725.jpg","http://imgsrc.baidu.com/forum/pic/item/b2aab951f8198618f0aee1ef48ed2e738ad4e625.jpg","http://imgsrc.baidu.com/forum/pic/item/b1e0f1198618367a1d6071b62c738bd4b21ce525.jpg","http://imgsrc.baidu.com/forum/pic/item/f9a88f18367adab48239152889d4b31c8601e425.jpg","http://imgsrc.baidu.com/forum/pic/item/87a93f7adab44aede7a7b08fb11c8701a08bfb25.jpg","http://imgsrc.baidu.com/forum/pic/item/37cbd3b44aed2e73410088478501a18b86d6fa25.jpg","http://imgsrc.baidu.com/forum/pic/item/acdfd4c451da81cbaa3d8da65066d01608243136.jpg","http://imgsrc.baidu.com/forum/pic/item/dc7558da81cb39db221b693dd2160924aa183036.jpg","http://imgsrc.baidu.com/forum/pic/item/506b88cb39dbb6fdc780eb4d0b24ab18962b3736.jpg","http://imgsrc.baidu.com/forum/pic/item/807a30dbb6fd526646f0327fa918972bd5073636.jpg","http://imgsrc.baidu.com/forum/pic/item/386abffd5266d0169ec29043952bd40734fa3536.jpg","http://imgsrc.baidu.com/forum/pic/item/b74c5b66d016092433feac70d60735fae7cd3436.jpg","http://imgsrc.baidu.com/forum/pic/item/53d7d9160924ab180ecdef5c37fae6cd7a890b36.jpg","http://imgsrc.baidu.com/forum/pic/item/d1a70024ab18972b4ee10ea1e4cd7b899f510a36.jpg","http://imgsrc.baidu.com/forum/pic/item/0895a218972bd407ae1cdd9679899e510eb30936.jpg","http://imgsrc.baidu.com/forum/pic/item/3762dc39b6003af32fe3d50b372ac65c1138b6b4.jpg","http://imgsrc.baidu.com/forum/pic/item/d488bf003af33a87ff340971c45c10385243b5b4.jpg","http://imgsrc.baidu.com/forum/pic/item/b7b133f33a87e950224efa0712385343faf2b4b4.jpg","http://imgsrc.baidu.com/forum/pic/item/3b423387e950352ade382c635143fbf2b3118bb4.jpg","http://imgsrc.baidu.com/forum/pic/item/3b36e050352ac65c095c6f18f9f2b21192138ab4.jpg","http://imgsrc.baidu.com/forum/pic/item/e8e13c2ac65c10384927c7a9b0119313b17e89b4.jpg","http://imgsrc.baidu.com/forum/pic/item/349bcf5c10385343e0968e4a9113b07ecb8088b4.jpg","http://imgsrc.baidu.com/forum/pic/item/c7ed19385343fbf2ae75af48b27eca8064388fb4.jpg","http://imgsrc.baidu.com/forum/pic/item/11895a43fbf2b2118e778c25c88065380dd78eb4.jpg","http://imgsrc.baidu.com/forum/pic/item/c88c79cf3bc79f3d823bed5bb8a1cd11738b2937.jpg","http://imgsrc.baidu.com/forum/pic/item/717e32c79f3df8dcaae786facf11728b46102837.jpg","http://imgsrc.baidu.com/forum/pic/item/3a76963df8dcd100c646f14a708b4710b8122f37.jpg","http://imgsrc.baidu.com/forum/pic/item/9e8cf1dcd100baa1b0f64ed04510b912c9fc2e37.jpg","http://imgsrc.baidu.com/forum/pic/item/f96dd800baa1cd110c6c7b4bbb12c8fcc2ce2d37.jpg","http://imgsrc.baidu.com/forum/pic/item/d0b1b3a1cd11728b38f78549cafcc3cec2fd2c37.jpg","http://imgsrc.baidu.com/forum/pic/item/bb10c411728b471039f5f4a7c1cec3fdfd032337.jpg","http://imgsrc.baidu.com/forum/pic/item/cca07b8b4710b912491bff95c1fdfc0393452237.jpg","http://imgsrc.baidu.com/forum/pic/item/733a4e10b912c8fc4129ffa6fe039245d7882137.jpg","http://imgsrc.baidu.com/forum/pic/item/d3aa07f41bd5ad6e52186d8183cb39dbb7fd3c2c.jpg","http://imgsrc.baidu.com/forum/pic/item/0f4512d5ad6eddc4c106bd903bdbb6fd5366332c.jpg","http://imgsrc.baidu.com/forum/pic/item/1a64a46eddc451da10170580b4fd5266d116322c.jpg","http://imgsrc.baidu.com/forum/pic/item/acdfd4c451da81cbab078aa65066d0160824312c.jpg","http://imgsrc.baidu.com/forum/pic/item/dc7558da81cb39db25216e3dd2160924aa18302c.jpg","http://imgsrc.baidu.com/forum/pic/item/506b88cb39dbb6fdc6baec4d0b24ab18962b372c.jpg","http://imgsrc.baidu.com/forum/pic/item/807a30dbb6fd526645ca357fa918972bd507362c.jpg","http://imgsrc.baidu.com/forum/pic/item/386abffd5266d0169ff89743952bd40734fa352c.jpg","http://imgsrc.baidu.com/forum/pic/item/b74c5b66d01609243cc4ab70d60735fae7cd342c.jpg","http://imgsrc.baidu.com/forum/pic/item/a8b045086e061d95d22f3f5379f40ad163d9caa5.jpg","http://imgsrc.baidu.com/forum/pic/item/4db967061d950a7bdb5c46af08d162d9f3d3c9a5.jpg","http://imgsrc.baidu.com/forum/pic/item/6fb714950a7b0208a1a0378a60d9f2d3562cc8a5.jpg","http://imgsrc.baidu.com/forum/pic/item/1c24037b02087bf4d1855f82f0d3572c10dfcfa5.jpg","http://imgsrc.baidu.com/forum/pic/item/0bca0b087bf40ad1be8dcf88552c11dfa8eccea5.jpg","http://imgsrc.baidu.com/forum/pic/item/03b972f40ad162d92f876a7713dfa9ec8b13cda5.jpg","http://imgsrc.baidu.com/forum/pic/item/7a4503d162d9f2d389782c84abec8a136227cca5.jpg","http://imgsrc.baidu.com/forum/pic/item/0b606bd9f2d3572cce8b94b78813632763d0c3a5.jpg","http://imgsrc.baidu.com/forum/pic/item/6368fbd3572c11df49b8b748612762d0f603c2a5.jpg","http://imgsrc.baidu.com/forum/pic/item/833aaf1ea8d3fd1f2a42aa51324e251f94ca5f46.jpg","http://imgsrc.baidu.com/forum/pic/item/a7afa1d3fd1f4134fb7c0d15271f95cad0c85e46.jpg","http://imgsrc.baidu.com/forum/pic/item/a962f41f4134970a5d38184497cad1c8a6865d46.jpg","http://imgsrc.baidu.com/forum/pic/item/fcae4834970a304e4b69a891d3c8a786c8175c46.jpg","http://imgsrc.baidu.com/forum/pic/item/40859e0a304e251ffabcec93a586c9177e3e5346.jpg","http://imgsrc.baidu.com/forum/pic/item/96bb394e251f95caa1be9addcb177f3e66095246.jpg","http://imgsrc.baidu.com/forum/pic/item/31ff2c1f95cad1c8d6f0f44c7d3e6709c83d5146.jpg","http://imgsrc.baidu.com/forum/pic/item/24ae9ccad1c8a786bb6142656509c93d71cf5046.jpg","http://imgsrc.baidu.com/forum/pic/item/947bd8c8a786c9170c485a52cb3d70cf3ac75746.jpg","http://imgsrc.baidu.com/forum/pic/item/c88c79cf3bc79f3d81baec5bb8a1cd11738b29b6.jpg","http://imgsrc.baidu.com/forum/pic/item/717e32c79f3df8dcab6687facf11728b461028b6.jpg","http://imgsrc.baidu.com/forum/pic/item/3a76963df8dcd100c1c7f04a708b4710b8122fb6.jpg","http://imgsrc.baidu.com/forum/pic/item/9e8cf1dcd100baa1b1774fd04510b912c9fc2eb6.jpg","http://imgsrc.baidu.com/forum/pic/item/f96dd800baa1cd110fed7a4bbb12c8fcc2ce2db6.jpg","http://imgsrc.baidu.com/forum/pic/item/d0b1b3a1cd11728b39768449cafcc3cec2fd2cb6.jpg","http://imgsrc.baidu.com/forum/pic/item/bb10c411728b4710c674f5a7c1cec3fdfd0323b6.jpg","http://imgsrc.baidu.com/forum/pic/item/cca07b8b4710b912489afe95c1fdfc03934522b6.jpg","http://imgsrc.baidu.com/forum/pic/item/733a4e10b912c8fc42a8fea6fe039245d78821b6.jpg","http://imgsrc.baidu.com/forum/pic/item/83b353afa40f4bfb516a963f014f78f0f6361857.jpg","http://imgsrc.baidu.com/forum/pic/item/5b1ead0f4bfbfbed00e33e147af0f736aec31f57.jpg","http://imgsrc.baidu.com/forum/pic/item/a5be42fbfbedab64afc845abf536afc378311e57.jpg","http://imgsrc.baidu.com/forum/pic/item/4a4af2edab64034fd577ca6dadc379310b551d57.jpg","http://imgsrc.baidu.com/forum/pic/item/fa5ca264034f78f059b192987b310a55b2191c57.jpg","http://imgsrc.baidu.com/forum/pic/item/aad50a4f78f0f7360044446a0855b319eac41357.jpg","http://imgsrc.baidu.com/forum/pic/item/02fe71f0f736afc3c9b6370eb119ebc4b6451257.jpg","http://imgsrc.baidu.com/forum/pic/item/7941fe36afc37931bbd28e42e9c4b74542a91157.jpg","http://imgsrc.baidu.com/forum/pic/item/f687a6c379310a55019ed69fb54543a983261057.jpg","http://imgsrc.baidu.com/forum/pic/item/b34a4a166d224f4ad15e7b780bf790529a22d1c3.jpg","http://imgsrc.baidu.com/forum/pic/item/42a764224f4a20a4b4d934ac92529822700ed0c3.jpg","http://imgsrc.baidu.com/forum/pic/item/6c93464a20a44623fa0dad099a22720e0ef3d7c3.jpg","http://imgsrc.baidu.com/forum/pic/item/4efb29a4462309f764a8a579700e0cf3d5cad6c3.jpg","http://imgsrc.baidu.com/forum/pic/item/21154f2309f790526dd84f550ef3d7ca79cbd5c3.jpg","http://imgsrc.baidu.com/forum/pic/item/479200f79052982284f431a8d5ca7bcb0846d4c3.jpg","http://imgsrc.baidu.com/forum/pic/item/084699529822720efb09ea9179cb0a46f01fabc3.jpg","http://imgsrc.baidu.com/forum/pic/item/91e39122720e0cf32f3046900846f21fbc09aac3.jpg","http://imgsrc.baidu.com/forum/pic/item/99937b0e0cf3d7ca8231371df01fbe096963a9c3.jpg","http://imgsrc.baidu.com/forum/pic/item/40859e0a304e251ffb28ef93a586c9177e3e532a.jpg","http://imgsrc.baidu.com/forum/pic/item/96bb394e251f95cabe2a99ddcb177f3e6609522a.jpg"];


//关闭表情框
function closeSmilies(){
	$(".edui-dropdown-menu").attr("style","z-index: 1; display: none; top: 44px; left: -3px; position: absolute;");
}

addNodeInsertedListener('.s_layer_table,.ffs_s_layer_table', function () {
	//判断是不是楼中楼
	if (this.parentNode.parentNode.parentNode.parentNode.parentNode.className == "edui-popup-body" || this.parentNode.parentNode.parentNode.parentNode.parentNode.className == "tb-editor-wrapper") {
		var this_page = 1;
		if ($('#tb_rich_poster').css('position')=='fixed') {//兼容原子的悬浮窗 调整下表情弹出的位置
			GM_addStyle("#tb_rich_poster .edui-dropdown-menu{top:auto !important; bottom:-50px !important;}");
		}
	}
	if (this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className.indexOf("insertsmiley_holder") != -1) {
		var this_page = 2;
	}

	//插入函数
	unsafeWindow.usualSmileyInsertSmiley = function (image_src) {
		if (this_page == 1) {
			var ssdd='<img class="BDE_Smiley" onload="EditorUI.resizeImage(this, 560)" src="' + image_src + '">'
			unsafeWindow.test_editor.execCommand("inserthtml", ssdd);
			closeSmilies();
		}
		if (this_page == 2 && image_src.indexOf("http://static.tieba.baidu.com") != -1) {
			unsafeWindow.LzlEditor._s_p._se.execCommand("insertsmiley", image_src);
			unsafeWindow.LzlEditor._s_p._se.editorPlugins.insertsmiley.closeOverlay();
		}
	}
	unsafeWindow.usualSmileyInsertImage = function (image_src) {
		if (this_page == 1) {
			var ssdd='<img class="BDE_Image" onload="EditorUI.resizeImage(this, 560)" src="' + image_src + '">';
			unsafeWindow.test_editor.execCommand("inserthtml", ssdd);
			closeSmilies();
			$("#ueditor_replace .BDE_Image").each(function () {
				if (this.width == "150" && this.height == "130") {
					this.width = "105";
					this.height = "91";
				}
			});
		}
	}
	//建常用表情列表
	var newText = '<table class="usualSmileyTb" cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="95%"><tbody>';
	var numb = 0;
	for (var s = 0; s < usual_collection.length / 14; s++) {
		newText += '<tr>';
		for (var r = 0; r < 14; r++) {
			if (numb < usual_collection.length) {
				var image_srcc = usual_collection[numb];
				newText += '<td width="38px" height="42px" border="1" style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="usualSmileyInsertSmiley(\'' + image_srcc + '\')">';
				newText += '<img height="32px" src="' + image_srcc + '">';
				newText += '</td>';
				numb++;
			} else {
				break;
			}
		}
		newText += '</tr>';
	}
	newText += '</tbody></table>';

	var newText2 = '<table class="usualSmileyTb" cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="95%"><tbody>';
	var numb2 = 0;
	for (var s = 0; s < acfun_collection.length / 9; s++) {
		newText2 += '<tr>';
		for (var r = 0; r < 9; r++) {
			if (numb2 < acfun_collection.length) {
				var image_srcc = acfun_collection[numb2];
				newText2 += '<td width="60px" height="52px" border="1" style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="usualSmileyInsertImage(\'' + image_srcc + '\')">';
				newText2 += '<img height="50px" src="' + image_srcc + '">';
				newText2 += '</td>';
				numb2++;
			} else {
				break;
			}
		}
		newText2 += '</tr>';
	}
	newText2 += '</tbody></table>';

	//替换
	if (this_page == 1 && $(this.parentNode.parentNode.parentNode.parentNode).find(".selected").attr("data-index") == "1") {
		$(this).html(newText);
	}
	if (this_page == 2 && $(this.parentNode.parentNode.parentNode.parentNode).find(".selected").attr("data-index") == "0") {
		$(".insertsmiley_holder").find(this).html(newText);
	}
	//AC娘替换
	if (this_page == 1 && $(this.parentNode.parentNode.parentNode.parentNode).find(".selected").attr("data-index") == "2") {
		$(".edui-popup-body").find(this).html(newText2);
	}
});

addNodeInsertedListener('.ffs_s_tab_btnbg,.s_tab_btnbg', function () {
	if (this.innerHTML == "颜表情" && this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.className == "edui-popup-body") {
		this.innerHTML = "AC娘";
	}
});
