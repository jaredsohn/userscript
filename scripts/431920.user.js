// ==UserScript==
// @name         5652 Comic
// @author       9尾雪狐
// @namespace    http://userscripts.org/scripts/show/431920
// @include      http://mh.5652.com/mh/*/index.shtml
// @description  5652多图脚本。
// @icon         http://mh.5652.com/favicon.ico
// @version      1.1
// @updateURL    https://userscripts.org/scripts/source/431920.meta.js
// @grant        none
// ==/UserScript==
var t=0;
var num=1;
/*var tog = document.createElement('a');
	tog.style.cssText = 'position:fixed; top:0px; color:#969696; z-index:10001; font-size:25px;';
	tog.innerHTML = 'S';
	tog.href = 'javascript:;';
$(tog).click(toggle);
$('body').append(tog);*/
var gdt = document.createElement('div');
	gdt.id = 'layer_multipic';gdt.className = 'viewer';
	gdt.style.cssText = "z-index: 10000; position: fixed; height:100%; width:100%; overflow: auto; top: 0px; left: 0px;display:none;text-align:center;";
$(gdt).click(toggle)
$('body').append(gdt);
$('body').append($('<div class="viewer" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 9999; opacity: 0.8; background: none repeat scroll 0px 0px rgb(0, 0, 0);display:none;"></div>'))
//每一话绑定事件
$('.links_lsit a').click(function(){
	if(this.parentElement.style.backgroundColor!=''){
		toggle();
	}else{
		$(this).parent().siblings().css('background-color','');
		$(this).parent().css('background-color','#FFFF99');
		$('.viewer').html('');
		clearTimeout(t);
		num=1;
		loadP(this);
	}
	return false
})
function loadP(tar){
	$.get(tar.href,function(data){getImg(data)})
	console.log(tar);
}
function getImg(data){
    var n = 0;
    var imgs = new Array();
    var myregexp = /page.add\('(\d+)','(.*?)'\)/g;
    var match = myregexp.exec(data);
    while (match != null) {
            imgs[n] = new Object();
    		imgs[n].id = match[1];
    		imgs[n].url = match[2];
    	n++;
    	match = myregexp.exec(data);
	}
	putImgIn(imgs);
	toggle();
	$(gdt).animate({
		scrollTop: 0
	},300);
}
function toggle(){
	if($('.viewer').css('display')=='block'){
		document.querySelector('html').style['overflow'] = 'auto';
		$('.viewer').css('display','none');
	}else{
		document.querySelector('html').style['overflow'] = 'hidden';
		$('.viewer').css('display','block');
		//gdt.style.height=$(window).height()+"px";
		//gdt.style.width=$(window).width()+"px";
	}
}
function putImgIn(imgs){
	var img = document.createElement('img');
		img.src = imgs.shift().url;
	var h1 = document.createElement('h1');
		h1.innerHTML = num++;
		h1.style.cssText = 'margin:20px auto 5px;color:#969696';
	gdt.appendChild(h1);
	gdt.appendChild(img);
	gdt.focus();
	if(imgs.length>0){
		t=setTimeout(function(){putImgIn(imgs)},500);
	}
}