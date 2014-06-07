// ==UserScript==
// @name           nicoranking restyle
// @author         TNB
// @include        http://www.nicovideo.jp/ranking/*
// @version        1.5
// ==/UserScript==

var SETTING = {
	adComment: false,                        //falseでポップアップアドコメントとサムネ枠非表示
	trendTagRestyle: true,                   //trueでトレンドタグを上開閉に
	trendTagComment: false                   //falseでトレンドタグポップアップを非表示
}

var style = document.head.appendChild(document.createElement('style'));
style.innerHTML = '.btn{display:inline;position:absolute;cursor:pointer;}.up,.down{color:#666666;font-weight:bold;}.toFeedback{top:5px !important;}';
if(!SETTING.adComment) style.innerHTML += '.adComment,.itemThumbWrap:before{display:none !important;}';
var ads = document.getElementsByClassName('ads');
for(i = 0; i < ads.length; i++) ads[i].style.display = 'none';
var storage = localStorage,
    header = document.getElementsByClassName('content list ranking'),
    trendTag = document.getElementsByClassName('content list trendtag')[0],
    icon = ['↑', '↓'],
    classname = ['up', 'down', 'contents'],
    css =['right:22px;', 'right:6px;', 'right:266px;width:33px;height:33px;'],
    sistem = [
	function (){
		var header_A = this.parentElement.parentElement;
		if(header_A == header[0]) return;
		var headerClone_A = header_A.cloneNode(true);
		var headerName = header_A.previousElementSibling;
		if(headerName.className == 'content list ranking'){
			var header_B = headerName;
		}else{
			var header_B = headerName.previousElementSibling.previousElementSibling;
		}
		var headerClone_B = header_B.cloneNode(true);
		var number = JSON.parse(storage.getItem('obj')) || [0, 1, 2, 3, 4];
		for(i = 0; i < header.length; i++){
			if(header[i] == header_A){
				number.splice(i - 1, 2, number[i], number[i - 1]);
				if(!storage.getItem('hide' + i) && storage.getItem('hide' + (i - 1))){
					storage.removeItem('hide' + (i - 1));
					storage.setItem('hide' + i, 'true');
				}else if(storage.getItem('hide' + i) && !storage.getItem('hide' + (i - 1))){
					storage.removeItem('hide' + i);
					storage.setItem('hide' + (i - 1), 'true');
				}
			}
		}
		storage.setItem('obj', JSON.stringify(number));
		header_A.parentElement.replaceChild(headerClone_B, header_A);
		header_B.parentElement.replaceChild(headerClone_A, header_B);
		reset();
	},
	function (){
		var header_A = this.parentElement.parentElement;
		if(header_A == header[header.length-1]) return;
		var headerClone_A = header_A.cloneNode(true);
		var headerName = header_A.nextElementSibling;
		if(headerName.className == 'content list ranking'){
			var header_B = headerName;
		}else{
			var header_B = headerName.nextElementSibling.nextElementSibling;
		}
		var headerClone_B = header_B.cloneNode(true);
		var number = JSON.parse(storage.getItem('obj')) || [0, 1, 2, 3, 4];
		for(i = 0; i < header.length; i++){
			if(header[i] == header_A){
				number.splice(i, 2, number[i + 1], number[i]);
				if(!storage.getItem('hide' + i) && storage.getItem('hide' + (i + 1))){
					storage.removeItem('hide' + (i + 1));
					storage.setItem('hide' + i, 'true');
				}else if(storage.getItem('hide' + i) && !storage.getItem('hide' + (i + 1))){
					storage.removeItem('hide' + i);
					storage.setItem('hide' + (i + 1), 'true');
				}
			}
		}
		storage.setItem('obj', JSON.stringify(number));
		header_A.parentElement.replaceChild(headerClone_B, header_A);
		header_B.parentElement.replaceChild(headerClone_A, header_B);
		reset();
	},
	function (){
		var contentHead = this.parentElement.parentElement;
		if(contentHead.children[1].style.display != 'none'){
			contentHead.children[1].style.display = 'none';
			for(i = 0; i < header.length; i++){
				if(header[i] == contentHead) storage.setItem('hide' + i, 'true');
			}
			if(contentHead.id == 'trendtag') storage.setItem('trend', 'true');
		}else{
			contentHead.children[1].style.display = 'inline';
			for(i = 0; i < header.length; i++){
				if(header[i] == contentHead) storage.removeItem('hide' + i);
			}
			if(contentHead.id == 'trendtag') storage.removeItem('trend');
		}
	}
];

for(i = 0; i < header.length; i++){
	var fragment = document.createDocumentFragment();
	for(j = 0; j < classname.length; j++){
		var div = document.createElement('div');
		if(j < classname.length - 1) div.innerHTML = icon[j];
		div.className = 'btn ' + classname[j];
		div.style.cssText = css[j];
		div.onclick = sistem[j];
		fragment.appendChild(div);
		if(i == header.length - 1 && j > classname.length - 2){
			var tag = trendTag.children[0].appendChild(div.cloneNode(true));
			tag.onclick = sistem[2];
		}
	}
	header[i].children[0].appendChild(fragment);
}

if(SETTING.trendTagRestyle) trendTagRestyle();

function reset(){
	for(i = 0; i < header.length; i++){
		for(j = 0; j < classname.length; j++){
			document.getElementsByClassName(classname[j])[i].onclick = sistem[j];
		}
	}
}

function trendTagRestyle(){
	trendTag.children[1].style.cssText =
	'position:absolute;top:-297px;border-top:1px dotted #DBDBDB;border-radius:4px;';
	if(!SETTING.trendTagComment){
		var trendTagComment = document.getElementsByClassName('discriptionBox');
		for(i = 0; i < trendTagComment.length; i++) trendTagComment[i].style.display = 'none';
	}
}

(function(){
	var number = JSON.parse(storage.getItem('obj'));
	var clone = [];
	for(i = 0; i < header.length; i++) clone[i] = header[number[i]].cloneNode(true);
	for(i = 0; i < header.length; i++){
		header[i].parentElement.replaceChild(clone[i], header[i]);
		if(storage.getItem('hide' + i)) clone[i].children[1].style.display = 'none';
	}
	if(storage.getItem('trend')) trendTag.children[1].style.display = 'none';
	reset();
})();
