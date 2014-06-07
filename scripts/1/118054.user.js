// ==UserScript==
// @name           skydrive永久外链地址
// @version        0.0.5
// @description    生成skydrive外链，改自operachina yy的bookmarklet
// @include        https://skydrive.live.com/*
// @updateURL	   https://userscripts.org/scripts/source/118054.meta.js
// ==/UserScript==
var txtbox = document.createElement('div');
txtbox.innerHTML = '<textarea readonly="true" style="height:200px"  >Click Here!</textarea>';

var navbar = document.getElementById('LeftNavBar-2_0');
if (navbar) navbar.appendChild(txtbox);

// "http://storage.live.com/items/"+id;?filename=somename.mp3
var check = document.createElement('div');
check.innerHTML = '<input type="checkbox" name="vehicle" value="Bike" /> filename'
navbar.appendChild(check);


txtbox.addEventListener('click', function(ee) {
	var selected = document.querySelectorAll('.isSelected');
	var k = '';
	if (selected) {
		for (var i = 0; i < selected.length; i++) {
			var id = selected[i].parentNode.getAttribute('item-key');
			if(id==null){id = selected[i].parentNode.parentNode.getAttribute('item-key')};//preview mode
			try {
				id = id.match(/id=(.*?)&/)[1];
				if (check.firstChild.checked) id += "?filename=somename.mp3";
				k += "http://storage.live.com/items/" + id + '\n';
			} catch (err) {
				alert('if you sure you have selected shared file \nand still don\'t work, please post at userscript');
			}
		};
	}
	if (k) txtbox.firstChild.innerHTML = k;
}, false);