// ==UserScript==
// @name	Auto Insert Image
// @author	googleGuard
// @version	1.2
// @include	http://tieba.baidu.com/*
// @run-at	document-end
// @grant	GM_xmlhttpRequest
// ==/UserScript==

var imageList = [],
albumName  = '测试test',         // 相册名字
insertSize = 50,                  // 插入几张图片
inserText  = '',                 // 图片前的内容
picType    = 0,                  // 迷之变量
f = function(t) {
	UE.getEditor("ueditor_replace", {topOffset: PosterContext.getContext().product == 'frs' ? 40 : 0}).getContent = function() {
		return UE.Editor.prototype.getContent.call(UE.getEditor("ueditor_replace", {topOffset: PosterContext.getContext().product == 'frs' ? 40 : 0})).replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/(^(<br\/>)+)|((<br\/>)+$)/g,"") + (document.getElementById('GM_AII').checked && t);
	};
},
r = function(t) {
	var p = new Image(), m = t.length - 1, n = Math.round(Math.random() * m), k = [];
	p.onload = function() {
		var w = this.width, h = this.height;
		(w > 560) && (h = 560 * h / w, w = 560);
		inserText += '<br><img pic_type="' + picType + '" class="BDE_Image" src="' + this.src + '" width="' + w + '" height="' + h + '" changedsize="true">';
		for (var j = 0; m > -1; m--)
			(m != n) && (k[j] = t[m], j++);
		imageList = k;
		(--insertSize > 0 && imageList.length > 0) ? r(imageList) : (
			s(1, 'GM_AII', '插入图片'),
			document.documentElement.appendChild(document.createElement('script')).textContent = '(' + f + ')(\'' + inserText + '\')'
		)
	};
	p.src = t[n];
},
g = function(u, c) {
	var a = new XMLHttpRequest();
	a.open('GET', u);
	a.onreadystatechange = function() {
		(a.readyState == 4) && c(JSON.parse(a.responseText))
	};
	a.send()
},
s = function(b, d, t) {
	var s = document.querySelector('.poster_signature').appendChild(document.createElement('span'));
	s.innerHTML = '<input type=checkbox ' + ( b == 1 ? 'checked=checked' : '' ) + ' id=' + d + '><label for=' + d + '>' + t + '</label>&nbsp;'
};

g('http://tieba.baidu.com/photo/interface/alblist', function(d) {
	if (d.data.length == 0)
		return;
	for (var l = d.data.album_list, i = l.length - 1, id = '', f; i > -1; i--) {
		if (l[i].name == albumName) {
			id = l[i].id;
			break
		}
	}
	if (id == '')
		return;
	f = function(p) {
		g('http://tieba.baidu.com/photo/interface/piclist?album_id=' + id + '&pn=' + p, function(d) {
			var l = d.data.pic_list, i;
			if (l.length == 0)
				return r(imageList);
			for (var i = l.length - 1; i > -1; i--)
				imageList.push(l[i].big_pic);
			f(++p)
		})
	};
	f(1)
})