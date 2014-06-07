// ==UserScript==
// @name           SkyDrive永久外链地址（论坛贴图专用）
// @version        0.0.5.1
// @description    生成SkyDrive外链，改自operachina yy的bookmarklet。改动dindog的脚本为论坛贴图专用。
// @include        https://skydrive.live.com/*
// @updateURL	   https://userscripts.org/scripts/source/118054.meta.js
// ==/UserScript==
var txtbox = document.createElement('div');
txtbox.innerHTML = '<textarea readonly="true" style="height:200px"  >点击获取图片外链！</textarea>';

var navbar = document.getElementById('LeftNavBar-2_0');
if (navbar) navbar.appendChild(txtbox);

// "http://storage.live.com/items/"+id;?filename=somename.mp3
var check = document.createElement('div');
check.innerHTML = '<input type="checkbox" name="vehicle" value="Bike" />';


txtbox.addEventListener('click', function(ee) {
	var selected = document.querySelectorAll('.isSelected');
	var k = '';
	if (selected) {
		for (var i = 0; i < selected.length; i++) {
			var id = selected[i].parentNode.getAttribute('item-key');
			if(id==null){id = selected[i].parentNode.parentNode.getAttribute('item-key')};//preview mode
			try {
				id = id.match(/id=(.*?)&/)[1];
				k += "[IMG]http://storage.live.com/items/" + id + "[/IMG]" + '\n' + '\n';
			} catch (err) {
				alert('if you sure you have selected shared file \nand still don\'t work, please post at userscript');
			}
		};
	}
	if (k) txtbox.firstChild.innerHTML = k;
}, false);