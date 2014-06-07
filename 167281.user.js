// ==UserScript==
// @name        B吧作死表情
// @namespace   http://bishi.tv
// @description 不怕死就做吧
// @include     http://tieba.baidu.com/*
// @version     Beta
// ==/UserScript==
var ax_collection_name = 'B吧做大死';
var ax_collection = ["http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C171%3Bap%3Dbilibili%B0%C9%2C90%2C179/sign=84d5ef47e4dde711e7d243fe97d4ad6b/d0c8a786c9177f3e36bea34f71cf3bc79e3d56ed.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=fa6f17af9d82d158bb8259b9b00b19d5/9345d688d43f87948fa4d96fd31b0ef41bd53a13.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=9343678cfd039245a1b5e107b795a4a8/4afbfbedab64034f287d5347aec379310a551d3a.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=789e140fcb8065387beaa41ba7dca115/cf1b9d16fdfaaf51185310fe8d5494eef01f7a3b.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=21b99063b21bb0518f24b320067bda77/a1ec08fa513d2697d120941c54fbb2fb4216d884.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=f016395ad50735fa91f04eb1ae510f9f/a8773912b31bb051a3172869377adab44aede044.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=56bfa23d500fd9f9a0175561152cd42b/caef76094b36acaf939a1bbd7dd98d1001e99c7d.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=9a3f5655b999a9013b355b3e2d950a58/7acb0a46f21fbe09ee6c49556a600c338744ad45.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=3908c88b503d26972ed3085565fab24f/c8ea15ce36d3d5392fe4fa823b87e950342ab092.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=8943ba850bd162d985ee621421dea950/8644ebf81a4c510f52b2165b6159252dd42aa579.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=f5ff91f9a71ea8d38a22740ca70a30cf/dcc451da81cb39db70f84114d1160924ab1830b3.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=210771a2f603918fd7d13dc2613c264b/2934349b033b5bb58bca06bc37d3d539b600bc56.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=f005b916024f78f0800b9afb49300a83/e824b899a9014c0865ee0fe70b7b02087af4f49e.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=1b2e6c4c6609c93d07f20effaf3cf8bb/e7cd7b899e510fb3dd1d51d5d833c895d1430c6f.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=345e1f418644ebf86d716437e9f8d736/d1a20cf431adcbef29375844adaf2edda3cc9f74.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=24bd1a56aa18972ba33a00c2d6cc7b9d/f703738da977391247b0a323f9198618377ae2da.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=f3915c646c224f4a5799731b39f69044/e850352ac65c10381229e480b3119313b07e8918.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=c0c8eaf264380cd7e61ea2e59145ad14/9c16fdfaaf51f3dec439ac2695eef01f3b2979ec.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=f8e1acc3ca1349547e1ee86c664f92dd/cc11728b4710b9126ec2e2bcc2fdfc0392452274.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=9be580f986d6277fe912323018391f63/472309f7905298226eea2d81d6ca7bcb0b46d492.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=4179d06dbf096b6381195e583c328733/96dda144ad345982f988f2d00df431adcbef8475.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=80459b734b90f60304b09c4f0913b370/8b13632762d0f7039b48829e09fa513d2797c5fd.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=4ae215a1d439b6004dce0fbfd9513526/55e736d12f2eb938c47c6cb0d4628535e5dd6f5a.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=86b12e27b219ebc4c0787691b227cf79/0b7b02087bf40ad19d59d6a1562c11dfa9ecce37.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=6e0427495ab5c9ea62f303ebe538b622/3801213fb80e7bec0e7812a32e2eb9389a506bd5.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=0303260903087bf47dec57e1c2d2575e/6a600c338744ebf804da7d7dd8f9d72a6159a7cc.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=56e6fe23f91986184147ef8c7aec2e69/503d269759ee3d6db006fc8942166d224e4adeb4.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=fa145bbc37d3d539c13d0fcb0a86e927/7aec54e736d12f2e8ac6d5224ec2d562843568b4.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=808375813b87e9504217f3642039531b/b8389b504fc2d562b3b6aaafe61190ef76c66c31.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=5b9577e558ee3d6d22c687c373176d41/37d3d539b6003af3302fb822342ac65c1138b6de.jpg","http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C245%3Bap%3Dbilibili%B0%C9%2C90%2C253/sign=f7489bf264380cd7e61ea2e5917fce44/3b292df5e0fe9925fb070d1235a85edf8db1716c.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=2fd0d86a377adab43dd01b4bbbd5b36b/58ee3d6d55fbb2fb94df33504e4a20a44723dcf8.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=6dd5d973a08b87d65042ab1737092860/21a4462309f7905246eb2c7c0df3d7ca7acbd5f8.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=c3ff6b58c75c1038247ececa8210931c/d4628535e5dde711ba4028b4a6efce1b9c1661e5.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=bef3d20ccb8065387beaa41ba7dca115/cf1b9d16fdfaaf51de3ed6fd8d5494eef11f7a96.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=feea199e55e736d158138c00ab514ffc/b2de9c82d158ccbf2a65e27818d8bc3eb0354192.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=3f6eebc3ca1349547e1ee86c664f92dd/cc11728b4710b912a94da5bcc2fdfc03934522e7.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=6c92bb26574e9258a63486e6ac83d1d1/c9fcc3cec3fdfc03f7f4b0fad53f8794a5c226e7.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=40c41cfb9f510fb37819779fe933c893/f9198618367adab4ece449018ad4b31c8701e4b8.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=0c4c956dbf096b6381195e583c338733/96dda144ad345982b4bdb7d00df431adcbef84b8.jpg","http://d.hiphotos.baidu.com/album/s%3D1100%3Bq%3D90/sign=280f7c57a08b87d65442af1e37381349/95eef01f3a292df57bed6273bd315c6034a873ae.jpg?v=tbs","http://imgsrc.baidu.com/forum/w%3D580/sign=60486b418644ebf86d716437e9f8d736/d1a20cf431adcbef7d212c44adaf2edda3cc9f5e.jpg","http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C312%3Bap%3Dbilibili%B0%C9%2C90%2C320/sign=68f3188283025aafd3327ec3cbd6c814/03087bf40ad162d94b333c5e10dfa9ec8b13cd97.jpg","http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C518%3Bap%3Dbilibili%B0%C9%2C90%2C526/sign=7ec76634f31fbe091c5ec31c5b5b6f43/b3b7d0a20cf431adcee31a7b4a36acaf2edd98ba.jpg","http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C230%3Bap%3Dbilibili%B0%C9%2C90%2C238/sign=2ec8cb9dcf1b9d168ac79a69c3e5d7ff/f9dcd100baa1cd112a852b62b812c8fcc3ce2d44.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=114ad74a9a504fc2a25fb00dd5dce7f0/6d81800a19d8bc3e8f515d88838ba61ea8d34512.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=997a350ccb8065387beaa41ba7dca115/cf1b9d16fdfaaf51f9b731fd8d5494eef01f7a1f.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=677e316a962bd40742c7d3f54b889e9c/728da9773912b31bde0b626b8718367adab4e109.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=744ca9da5fdf8db1bc2e7c6c3922dddb/d000baa1cd11728b6f3c2460c9fcc3cec3fd2c5a.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=624d9651dc54564ee565e43183df9cde/b812c8fcc3cec3fdd71a0d37d788d43f8794274f.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=084e508e1f178a82ce3c7fa8c602737f/562c11dfa9ec8a13e94ffda2f603918fa0ecc01f.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=adc5b1afa2cc7cd9fa2d34d109002104/8cb1cb1349540923dc3ec93c9358d109b3de4918.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=0e91627d4afbfbeddc59367748f1f78e/060828381f30e924eca76f734d086e061d95f775.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=5095552ad009b3deebbfe460fcbe6cd3/c2fdfc039245d688d2e440e6a5c27d1ed31b2489.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=ef42ce5fd52a283443a636036bb4c92e/a2cc7cd98d1001e9b61aca4db90e7bec54e7974a.jpg","http://imgsrc.baidu.com/forum/w%3D580%3Bcp%3Dtieba%2C10%2C298%3Bap%3Dbilibili%B0%C9%2C90%2C306/sign=65f15661b21bb0518f24b3200641b9c4/4e4a20a4462309f75cd4f751730e0cf3d7cad63e.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=b6c3d2475882b2b7a79f39cc01accb0a/95eef01f3a292df5f779e656bd315c6034a8733e.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=8d2851aea2cc7cd9fa2d34d109002104/8cb1cb1349540923fcd3293d9358d109b3de493e.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=0507ad26b219ebc4c0787691b227cf79/0b7b02087bf40ad11eef55a0562c11dfa9ecce6e.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=45fb62c1c8ea15ce41eee00186013a25/203fb80e7bec54e77011165ab8389b504ec26af0.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=b51bbd89fd039245a1b5e107b795a4a8/4afbfbedab64034f0e258942aec379310b551d8d.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=dd3aad9acf1b9d168ac79a69c3dfb4eb/fc1f4134970a304e8ee39fbfd0c8a786c8175cb5.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=14de67574e4a20a4311e3ccfa0539847/342ac65c10385343ac3ab8649213b07ecb8088f9.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=b3552c0a9f2f07085f052a08d925b865/91529822720e0cf3e34970be0b46f21fbe09aa3c.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=b3552c0a9f2f07085f052a08d925b865/91529822720e0cf3e34970be0b46f21fbe09aa3c.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=61150120b219ebc4c0787691b227cf79/0b7b02087bf40ad17afdf9a6562c11dfa9ecce5d.jpg","http://imgsrc.baidu.com/forum/w%3D580/sign=15a82c1854fbb2fb342b581a7f4b2043/b7003af33a87e950796cd72911385343fbf2b47f.jpg"]

// 当前网页类型：1, 通用表情页面；2，楼中楼表情页面
var this_page = 1;
if (location.href.indexOf("simplesmiley.html") != -1) {
	this_page = 2;
}

setTimeout(function () {
	//表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
	fun_UserDefinedSmiley(ax_collection_name, ax_collection, 'tab38', 'tab_38');
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
					text += '<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyInsertSmiley(\'' + image_src + '\')" onmouseover="over(this,\'' + image_src + '\',\'' + posflag + '\')" onmouseout="out(this)">';
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

unsafeWindow.FrozenFaceSmileyInsertSmiley = function (image_src) {
	var editorID = unsafeWindow.getSearchById('id');
	var P = parent.wrappedJSObject;
	if (typeof P === 'undefined') {
		P = parent;
	}
	
	if (this_page == 1) {
		var editor = P.TED.Editor.getInstanceById(editorID);
		editor.execCommand('insertsmiley', image_src);
		editor.overlay.close();
		return;
	}
	
	if (this_page == 2 && image_src.indexOf("http://static.tieba.baidu.com") != -1) {
		var editor = P.TED.SimpleEditor.getInstanceById(editorID);
		editor.execCommand('insertsmiley', image_src);
		editor.editorPlugins.insertsmiley.closeOverlay();
		return;
	}
}