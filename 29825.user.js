// ==UserScript==
// @name		Better360
// @namespace	http://userscripts.org/scripts/show/24984
// @include		http://360.yahoo.com/*
// @include		http://*.360.yahoo.com/*
// @version		1.6

// ==/UserScript==
// RedPhoenix89 - 2008

const currentVersion = '1.6';

var prefs = {
	autoCheckForUpdate	:	true,
	debug : false,
}

if (prefs.autoCheckForUpdate) {
	var date = new Date();
	var today = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	lastCheck = GM_getValue('lastCheck');

	if (!lastCheck || lastCheck != today) {
		GM_xmlhttpRequest({
        	method: "GET",
        	url: 'http://360.huhiho.com/version.txt',
        	onload: function(results) {
				version = results.responseText;
				if (version.length && /^\S+$/.test(version) && version != currentVersion) {
					if (confirm('[ Greasemonkey ] Better360 đã có phiên bản mới. Bạn có muốn cập nhật không ?')) {
						GM_openInTab('http://360.huhiho.com');
					}
				}
			},
        });
	}
	GM_setValue('lastCheck',today);
}

var enable = 1;
var times = 0;
var stop = false;

var prevURL;
var nextURL;
var lastURL;

var currentURL = window.location.href;
var WHERE;
var currentSwitch;

var removeCmtNum = 0;
var removeCmtI = 0;


function getTimeInMilliseconds(date) {
	return date.getHours()*60*60 + date.getMinutes()*60 + date.getSeconds() + date.getMilliseconds()/1000;
}

if (prefs.debug) {
	var today = new Date();
	var firstTime = getTimeInMilliseconds(today);
}

var ads = $('ymgl-north-wrapper');
if (ads) {
	ads.innerHTML = '';
}

if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/guestbook\-[a-zA-Z0-9\-\_\.]+/.test(currentURL)) {
	WHERE = 'all_comments';
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/blog\/recent\_comments\.html/.test(currentURL)) {
	WHERE = 'recent_comments';
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/friends\/content\.html/.test(currentURL)) {
	WHERE = 'all_updates';
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/blog\-[a-zA-Z0-9\-\_\.]+/.test(currentURL)) {
	if (currentURL.indexOf('&p=') != -1 || currentURL.indexOf('?p=') != -1) {
		WHERE = 'post';
	}
	else {
		WHERE = 'blog';
	}
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/(my\_)?profile\-[a-zA-Z0-9\-\_\.]+/.test(currentURL)) {
	WHERE = 'profile';	
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/friends\-[a-zA-Z0-9\-\_\.]+/.test(currentURL)) {
	WHERE = 'friends';	
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/blog\/compose/.test(currentURL)) {
	WHERE = 'compose';
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/edit\/blast\.html/.test(currentURL)) {
	WHERE = 'blast';
}
else if (/^http\:\/\/([^\/]+\.)?360\.yahoo\.com\/msgr\/V1\/blast\_compose\.html/.test(currentURL)) {
	WHERE = 'blast';
}

else if ($('ymgl-edit-blast')) {
	WHERE = 'home';
}
else {
	WHERE = false;
}

addMenu();
if (!WHERE) return;

function $(id) {
	return document.getElementById(id);
}

function $$(name) {
	var elements = document.getElementsByName(name);
	if (!elements.length) return false;
	if (elements.length == 1) return elements[0];
	return elements;
}

function addMenu() {
	var masthead = $('ymgl-masthead');
	if (!masthead) return;
	var body = getElementsByClassName('body','div',masthead);
	var body = body[0];
	body.innerHTML += '|<a href="/blog/recent_comments.html">Blog Comments</a>|<a onclick="return false" id="b360_blast" href="/edit/blast.html">Blast</a>';
	$('b360_blast').addEventListener("mouseup",function() { showIFrame('http://360.yahoo.com/msgr/V1/blast_compose.html'); return false; }, false);
}

function showIFrame(url) {
	var iframe = $('b360_iframe');
	if (!iframe) {
		GM_addStyle('#b360_iframe { width:99%;height:40%;background:white;position:fixed;bottom:0px;z-index:2512;padding:0px;margin:auto;display:block}');
		var iframe = document.createElement('iframe');
		iframe.id = 'b360_iframe';
		iframe.src = url;
		document.body.appendChild(iframe);
	}
	if (iframe.style.display == 'block') {
		iframe.style.display = 'none';
		return;
	}
	iframe.style.display = 'block';
}

function insertAfter(parent, newNode, refNode) {
	if(refNode.nextSibling) {
		return parent.insertBefore(newNode, refNode.nextSibling);
	}
	else {
		return parent.appendChild(newNode);
	}
}

//http://snipplr.com/view.php?codeview&id=1696
function getElementsByClassName(classname, tag, node)  {
	if (!tag) tag = '*';
	if(!node) node = document.getElementsByTagName('body')[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName(tag);
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function watchScroll(){
	if (stop) {
		$('b360_statusBox').style.display = "none";
		return;
	}
	
	try {
		if (enable) {
			var sc = document.body.scrollTop;
			var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
			var total = (document.body.scrollHeight - wh);
			var remain = total - sc;
			if (remain < 200) {
				showStatusBox('Loading...');
				fetchCmt();
				return;
			}
			var self = arguments.callee;
			setTimeout(self,1000);
		}
	}
	catch(e){
	}
};

function getURL(id) {
	d = $(id);
	if (d) {
		return d.href;
	}
}

function fetchCmt() {
	enable = 0;

	if (times == 0) {
		nextURL = getURL('num_next');
		prevURL = getURL('num_prev');
		lastURL = getURL('num_last');
		
		if (!nextURL) {
			stop = true;
			return;
		}
	}

	if (stop) {
		return;
	}

	GM_xmlhttpRequest({
		method: "GET",
		url: nextURL,
		onload: function(results) {
			++times;
			
			var content = results.responseText;
			var m = content.match(/href="([^"]+)" id="num\_next"/);
			if (!m) {
				stop = true;
			}
			else {
				nextURL = m[1];
			}

			var m = content.match(/href="([^"]+)" id="num\_prev"/);
			prevURL = m[1];
			var start = content.indexOf('<span class="pagination top">');
			var end_tp = content.indexOf('<span class="pagination bottom">',start);
			var end = content.indexOf('</span>\n</span>',end_tp);
			var newCmt = content.substr(start,end-start+15);
			if (times == 1) {
				var doc = $('doc-2');
			}
			else {
				var doc = $('cmt-'+(times-1));
			}
			var docHTML = doc.innerHTML;
			start = docHTML.indexOf('<span class="pagination bottom">');
			end = docHTML.indexOf("</span>\n</span>",start);
			var pag = docHTML.substr(start,end-start+15);
			
			doc.innerHTML = docHTML.replace(pag,"");
			
			var div = document.createElement("div");
			div.innerHTML = newCmt;
			div.id = 'cmt-'+times;
			
			if (times == 1) {
				switch (WHERE) {
					case 'all_comments':
						insertAfter($('ymgl-guestbook').parentNode,div,$('ymgl-guestbook'));
						break;
					case 'recent_comments':
						insertAfter($('ymgl-blog').parentNode,div,$('ymgl-blog'));
						break;
					case 'all_updates':
						insertAfter($('ymgl-friends-content').parentNode,div,$('ymgl-friends-content'));
						break;
					case 'blog':
						insertAfter($('ymgl-blog').parentNode,div,$('ymgl-blog'));
						break;
				}
					
			}
			else {
				insertAfter($('cmt-'+(times-1)).parentNode,div,$('cmt-'+(times-1)));
			}

			enable = 1;
			$('b360_statusBox').style.display = "none";
			setTimeout(watchScroll,1000);
		},
	});
}

function switchContent(i) {
	var content = $('cnt-'+i);
	var image = $('img-'+i);
	var sw = $$('switch-'+i);
	if (!content.style.display || content.style.display == 'block') {
		content.style.display = 'none';
		image.style.display = 'none';
		sw[0].textContent = '[+]';
		sw[1].textContent = '';
	}
	else {
		content.style.display = 'block';
		image.style.display = 'block';
		sw[0].textContent = '[-]';
		sw[1].textContent = '[-]';
	}
	return false;
}

function fixAvatar() {
	var photo = $('user-photos-full');
	if (photo && photo.src == currentURL) {
		photo.parentNode.removeChild(photo);
	}
	var thumbs = $('user-photos-thumbs');
	if (thumbs) {
		var imgs = thumbs.getElementsByTagName('img');
		for (var i=0;i<imgs.length;i++) {
			if (imgs[i].height <= 0 || imgs[i].src == currentURL) {
				imgs[i].parentNode.removeChild(imgs[i]);
			}
		}
	}
}

function insertImage() {
	if ($('rteHTMLSrc').checked) return;
	var src = prompt('Nhập đường dẫn ảnh :','http://');
	var rteEdit = $('rteEdit').contentWindow;
	rteEdit.focus();
	rteEdit.document.execCommand('InsertImage',false,src);
	rteEdit.focus();

}

function addMoreBtt() {
	if (!$('hilitecolor')) {
		setTimeout(addMoreBtt,500);
		return;
	}
	var a=new Array(6,16,24,76,77,102,106,107,108);
	var b=new Array(6,8,8,4,5,2,6,7,8);
	for(var i=0;i<a.length;i++){
		document.getElementById("s"+a[i]).parentNode.setAttribute("class","col"+b[i]);
	}
	
	var icon = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
				'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZPNS5RRFMZ/577v+L5jmlmN'+
				'oBgE4iLIWkgxmTtx4R8QLXLRB1GYG4lAwlWkCH1sShcRuIgWYUQoBIUVgojLyowWLSRhSCNtchzn'+
				'672nxYxT6hRBD/cuzuW5D+c5H6Kq/A9cgM6+0VtBTk4tJwM/kS7BspvDsAc7w4w8uXGyxwUIrHRe'+
				'v9AcqYlERMRFAS3+E1RBdSNWglyGs9eenwbyAsuJwIvsjUjX7QfU7duF51gC9cBUYYT8NYJjhM8f'+
				'Z+nvuUg2EClaSKbBGJfGhv0cjLbiGAfVAMQFEYwIIgZjDCHHYO2WGmzY9DwfP1yRz/cv0KLJLQLZ'+
				'TIpsah1EULVYDbDWIICq4khALpNE1W7PQBW+xmN8W4qTtTmsBvxIL5IJ6pECp8ZbYX0tDmpKC3xZ'+
				'LCe0kPr1oBFUU0XyCmEWFnT7HNgC3zhlGMcr6TtITJBLvKK6+jtX7z/ElDV4cGJzBn9COv6MPZXT'+
				'NDcfpX53I6/nnrL+ftKPdtfddAHUWgRYmp8rKRAKPabtSAeBCThc287Eh1GiTS3Mfxq75OZnLd+c'+
				'oYG+YvQ7rtzpJyQVdBw4B8DltnuMzw4DY74LsDNs4jaXqqotl3wLC4KFw+panLnYNG9jU/S2jzD4'+
				'4gx+vlYpF2CHZx6dH3h5LJnVJmtL7dJxf+bdtNdyqJXx2WHKxGXqzSTAkPzrOke76waBLqASWAWG'+
				'Z+7Gen8CJf/dMYh8E3AAAAAASUVORK5CYII=';
	
	var img = document.createElement('li');
	img.className = 'highlight';
	img.innerHTML = '<a style="background:url('+icon+');background-repeat:no-repeat;background-position:50%;cursor:pointer" title="Chèn ảnh" id="imgbtt"><span>Better360</span></a>';
	insertAfter($('hilitecolor').parentNode.parentNode,img,$('hilitecolor').parentNode);
	$('imgbtt').addEventListener('click',function() { insertImage(); },false);
	
	var emo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAANbY1E9YMgAAABl0RVh0'+
				'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJISURBVHjaYmQAgnUMDPKMDAwTgDiAAQr+'+
				'MzBsAOICEBuXXBADw0OAAGJcBdF8Qb8yS0A1PgSmhuH2wjUMF9unfQCxcckBDTEACCDmQAaGBQYl'+
				'yQaqUd4MDH9+wbGQjgoDl6Qoh5SjOYdSsBuGHAsPN8fTY+cVAAKIcRHQRbHHFzH8/ceAAZgYIfS/'+
				'/5hyzEwMDIst4xgAAojlN4j3/SPD/9+Yiv4y4Ab/WRkYQFoAAoiFkQ3IARrw7wcDSYCFA2IAQACx'+
				'fAV6ixFkwBeE5L+Prxn+Pb7K8O/1I4b/H15iaGYUEGdgU5MDGwAQQCx/GBgevLp5X4FPWJjhz+cv'+
				'DH8uHWD49/YpXttZP71keHX2JQNIL0AAMTszMAj8/fHdQUXiC8OXw3sY/n36wPAfGKD4MLcwA8PR'+
				'cwwML94yTAAIICYgf8L5Y/c/vLtyhoGN9TfDH6C78GE2TgaG90Dvnr/F8AGkFyCAmCoYGD4CQzth'+
				'w74/DKz8wKhjBob+b+wYJAdSs+EgOIYSQHoBAogZ5Kf9DAw3Db4zKLz5yGBgbsTA8A2Y/v78RHU2'+
				'KzsDg5gSA8NqoOJ7zxkWNDIwdIL0AgQQMyxgDjEwbFT7yKDw/B2DgaEu0AagAb++QjRzAm3lk2Fg'+
				'WHmAgeHaQ4YFbQwMiTB9AAHEjBy6R4CGKAMNufmUwcBEn4GBCxjXbFzAOBdhYJizk4HhLtDmbiTN'+
				'IAAQQFhRPhCVsTH8v+gGwSB2PlgYEwAEECMuQ7KAmRCUbaGKAqYxMFzEpg4gwACvjveOiIeCUwAA'+
				'AABJRU5ErkJggg==';
	
	var img = document.createElement('li');
	img.className = 'highlight';
	img.innerHTML = '<a style="background:url('+emo+');background-repeat:no-repeat;background-position:50%;cursor:pointer" title="Chèn emoticon" id="emobtt"><span>Better360</span></a>';
	insertAfter($('imgbtt').parentNode.parentNode,img,$('imgbtt').parentNode);
	$('emobtt').addEventListener('click',function() { showEmo(); },false);
	
	
	var tag_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
					'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVDjLY/j//z8DJZhhmBpg2POQn2wD'+
					'DDof8HvOe3osYtXzDzCxuM2vP3gvfn4MJIfXAP22e0Ies58eK9r2+r//3Kf3YOIhq17eK9v95j9I'+
					'Trv2jhBWA/Ra7kVEr375vXDrq/9+s57eUy+4IY0kJx2w6Nk9kFzE0uffgXIRKAboNtxlC1/+/GPl'+
					'jjdABc9+q+ZcM0Z3qmb5LWOQXOmml/8DZz7+qJB0hQ3FBerFNyNC5z/9nrXqxX+Pvgf35OMuSSPJ'+
					'SXtPfXQPJBc089F3oFwE1jBQTLkiZNtw51jq4qf/XVvuwsPAa9Kjexkrnv8HyclFXxTCGwsyERf4'+
					'LctvHvPuvAePBf8pDz/Y1N45BpIbKUmZFAwAR3nW32nUrY0AAAAASUVORK5CYII=';
	
	var tag_btt = document.createElement('li');
	tag_btt.className = 'highlight section';
	tag_btt.innerHTML = '<a style="background:url('+tag_icon+');background-repeat:no-repeat;background-position:50%;cursor:pointer" title="Chèn HTML Code" id="tagbtt"><span>Better360</span></a>';
	insertAfter($('emobtt').parentNode.parentNode,tag_btt,$('emobtt').parentNode);
	$('tagbtt').addEventListener('click',function() { insertHTML(); },false);
	
}

function insertHTML() {
	if ($('rteHTMLSrc').checked) return;
	var html = prompt('Nhập HTML Code :','');
	var rteEdit = $('rteEdit').contentWindow;
	rteEdit.focus();
	rteEdit.document.execCommand('insertHTML',false,html);
	rteEdit.focus();
	
	
}

function showEmo() {
	showIFrame('http://emo.huhiho.com');
}

function quickPreview() {
	var boundary = '---------------------------'+(new Date().getTime());
	
	var _tags = new Array([/<b>(.*?)<\/.>/gm,"<strong>$1</strong>"],[/<i>(.*?)<\/.>/gm,"<em>$1</em>"],[/<P>(.*?)<\/P>/gm,"<p>$1</p>"],[/<A(.*?)<\/A>/gm,"<a $1</a>"],[/<p align=center>(.*?)<\/p>/gm,"<div style=\"text-align:center;\">$1</div>"],[/<p align=right>(.*?)<\/p>/gm,"<div style=\"text-align:right;\">$1</div>"],[/<span style="font-weight: normal;">(.*?)<\/span>/gm,"$1"],[/<span style="font-weight: bold;">(.*?)<\/span>/gm,"<strong>$1</strong>"],[/<span style="font-style: italic;">(.*?)<\/span>/gm,"<em>$1</em>"],[/<span style="(font-weight: bold; ?|font-style: italic; ?){2}">(.*?)<\/span>/gm,"<strong><em>$2</em></strong>"],[/<([a-z]+)style="font-weight: normal;">(.*?)<\/.>/gm,"<$1>$2</$1>"],[/<([a-z]+)style="font-weight: bold;">(.*?)<\/.>/gm,"<$1><strong>$2</strong></$1>"],[/<([a-z]+)style="font-style: italic;">(.*?)<\/.>/gm,"<$1><em>$2</em></$1>"],[/<([a-z]+)style="(font-weight: bold; ?|font-style: italic; ?){2}">(.*?)<\/.>/gm,"<$1><strong><em>$3</em></strong></$1>"]);
	
	var isHTMLview = $('rteHTMLSrc').checked;
	if (!isHTMLview) {
		var html = $('rteEdit').contentWindow.document.body.innerHTML;
		html = escape(html);
		while (html.indexOf("%0D%0A")>-1) {
			html = html.replace("%0D%0A"," ");
		}
		while (html.indexOf("%0A")>-1) {
			html = html.replace("%0A"," ");
		}
		while (html.indexOf("%0D")>-1) {
			html = html.replace("%0D"," ");
		}
		while (html.indexOf("%26nbsp%3B")>-1) {
			html = html.replace("%26nbsp%3B","%20");
		}
		html = unescape(html);
		html = html.replace(/(?=<)[^> ]*/g,function(match){ return match.toLowerCase(); });
		for(var i=0;i<_tags.length;i++) {
			html=html.replace(_tags[i][0],_tags[i][1]);
		}
	}
	else {
		html = $('rteCnt').value;
		html = escape(html);
		while (html.indexOf("%0D%0A")>-1) {
			html = html.replace("%0D%0A"," ");
		}
		while (html.indexOf("%0A")>-1) {
			html=html.replace("%0A"," ");
		}
		while(html.indexOf("%0D")>-1){
			html=html.replace("%0D"," ");
		}
		html = unescape(html);
	}

	
	var title = $('subj').value;
	var crumb = $$('.crumb').value;
	
	var post_data = "--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\"title\"\r\n"+
					"\r\n"+
					title+"\r\n"+
					"--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\"contents\"\r\n"+
					"\r\n"+
					html+"\r\n"+
					"--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\"isrte\"\r\n"+
					"\r\n"+
					"\r\n"+
					"--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\"preview\"\r\n"+
					"\r\n"+
					"Preview\r\n"+
					"--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\".crumb\"\r\n"+
					"\r\n"+
					crumb+"\r\n"+
					"--"+boundary+"\r\n"+
					"Content-Disposition: form-data; name=\"form_submitted\"\r\n"+
					"\r\n"+
					"blog_compose\r\n"+
					"--"+boundary+"--";
	$('quick_preview').value = 'Đang nạp ...';
	GM_xmlhttpRequest({
		method: "POST",
		url: $$('blog_compose').action,
		headers:{'Content-Type': 'multipart/form-data; boundary='+boundary},
		data:post_data,
		onload: function(results) {
			$('quick_preview').value = 'Xem nhanh';
			
			var html = results.responseText;
			var fpos = html.indexOf('<div class="preview">');
			var lpos = html.indexOf('<div class="foot">');
			var preview = html.substr(fpos,lpos-fpos);
			if (preview == "\n") {
				preview = '<h1>Lỗi</h1>Bạn phải nhập nội dung';
			}
			
			if (!$('ymgl-blog-preview')) {
				var fpos = html.indexOf('<style type="text/css">');
				var lpos = html.indexOf('</style>',fpos);
				
				var style = html.substr(fpos+23,lpos-fpos-23);
				GM_addStyle(style);
				
				var div = document.createElement('div');
				div.className = 'container-0 message';
				div.id = 'ymgl-blog-preview';
				div.innerHTML = '<div class="body"><div class="preview">'+preview+'</div></div>';
				insertAfter($('ymgl-blog-compose').parentNode,div,$('ymgl-blog-compose'));
			}
			else {
				div = $('ymgl-blog-preview');
				div.innerHTML = '<div class="body"><div class="preview">'+preview+'</div></div>';
			}
			
		},
	});
}

function removeCmt() {
	var checkbox = $$('removeCmt');
	var checked = new Array();
	if (!checkbox) return;
	for (var i=0;i<checkbox.length;i++) {
		if (checkbox[i].checked) {
			checked.push(i);
		}
	}
	
	removeCmtNum = checked.length;
	removeCmtI = 0;
	
	if (!removeCmtNum) {
		alert('Bạn chưa chọn comment nào để xóa');
		return;
	}
	if (!confirm('Bạn muốn xóa '+ removeCmtNum +' comment này chứ ?')) {
		return;
	}
	
	showStatusBox('Đã xóa 0/'+removeCmtNum+' comment');
	
	
	for (var i=0;i<removeCmtNum;i++) {
		GM_xmlhttpRequest({
			method: "GET",
			url: $('cmt-checkbox-'+checked[i]).value,
			onreadystatechange: function(responseDetails) {
				if (responseDetails.readyState == 1) {
					++removeCmtI;
					if (removeCmtI % 2 == 0) {
						showStatusBox('Đã xóa '+(removeCmtI/2)+ '\/'+removeCmtNum+' comment');
					}
				}
			}
		});
	}
	
	for (var i=0;i<removeCmtNum;i++) {
		$('cmt-checkbox-'+checked[i]).checked = false;
		$('cmt-row-'+checked[i]).style.display = "none";
	}
	
}

function showStatusBox(text) {
	var statusBox = $('b360_statusBox');
	if (!statusBox) {
		GM_addStyle("#b360_statusBox {cursor:default;border:1px solid #DDDDDD;padding:2px;font-family:Verdana;font-size: 9px;font-weight:bold;text-align: right;position: fixed; right: 5px; bottom: 5px; z-index: 100;color: black; background-color: #FFFFFF; opacity: 0.8;display:none}");
		var statusBox = document.createElement('div');
		document.body.appendChild(statusBox);
		statusBox.id = 'b360_statusBox';
	}
	statusBox.style.display = 'block';
	statusBox.textContent = text;
	
}

function checkAllCmt(type) {
	var check = (type)?true:false;
	
	var checkbox = $$('removeCmt');
	var len = checkbox.length;
	
	if (!checkbox) return;
	for (var i=0;i<len;i++) {
		if (type == 2) {
			var currCmt = $('comment-no-'+i).textContent;
			for (var j=i+1;j<len;j++) {
				var nextCmt = $('comment-no-'+j).textContent;
				if (currCmt == nextCmt) {
					checkbox[j].checked = true;
				}
			}
		}
		else {
			checkbox[i].checked = check;
			
		}
	}
}

function composeResizeImage() {
	var rteEdit = $('rteEdit').contentWindow;
	var img_xpath = rteEdit.document.evaluate("//img[contains(@style,'width') and contains(@style,'height')]",rteEdit.document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0;i<img_xpath.snapshotLength;i++) {
		var img = img_xpath.snapshotItem(i);
		var w = parseInt(img.style.width.substr(0,img.style.width.length-2));
		var h = parseInt(img.style.height.substr(0,img.style.height.length-2));
		img.width = w;
		img.height = h;
	}
	
}

function listenBlast() {
	if (!$('submitbutton')) {
		setTimeout(listenBlast,500);
		return;
	}
	$('submitbutton').addEventListener('mouseup',function() { fixBlast(); },false);
}

function fixBlast() {
	if (WHERE == 'profile') {
		var blast = $('blst');
		
	}
	else if (WHERE == 'home' || WHERE == 'blast') {
		var blast = $('blst_ff');
	}
	blast.value = blast.value.replace(/'/g,"\u02C8").replace(/"/g,"\u00A8").replace(/>/g,"\u02C3").replace(/</g,"\u02C2");
}

function fixQCmt() {
	var qcmt = $('comment_ff');
	qcmt.value = qcmt.value.replace(/>/g,"\u02C3").replace(/</g,"\u02C2");
}

function fixWord() {
	var rteEdit = $('rteEdit').contentWindow.document.body;
	//var html = rteEdit.innerHTML;
	
	rteEdit.innerHTML = rteEdit.innerHTML.replace(/<\!\-\-\[if [^\]]+\]>[\S\s]*?<\!\[endif\]\-\->/g,"").replace(/<style>\s+<!\-\-[\S\s]*?\-\->\s+<\/style>/g,"").replace(/<o\:p>[\S\s]*?<\/o\:p>/g,"");
	alert('Đã sửa xong');
}

// Main

switch (WHERE) {
	case 'home':
	case 'blast':
		$$('save').addEventListener('mouseup',function() { fixBlast(); },false);
		break;
	case 'all_comments':
	case 'recent_comments':
	case 'all_updates':
		watchScroll();
		break;
	case 'compose':

		var rteCnt = $('rteCnt');
		
		if (rteCnt) {
			GM_addStyle('.b360_switch { cursor:pointer; }');
			GM_addStyle('#rteWrapper.rte-wrapper .button-wrapper li .emoticon-sub table.smileys td a { display:block; width:90%; }');
		
			var div = document.createElement("div");
			div.innerHTML = '<div style="text-align:right"><font style="font-family:\'Courier New\';font-size:14px"><b class="b360_switch" id="b360_inc">[+]</b> <b class="b360_switch" id="b360_dec">[-]</b></b></div>';
			insertAfter(rteCnt.parentNode,div,rteCnt);
			$('b360_inc').addEventListener('click',function () { var rteEdit = $('rteEdit');var rteCnt = $('rteCnt');rteCnt.style.height = rteEdit.style.height = parseInt(rteEdit.style.height.substr(0,rteEdit.style.height.length-2))+100+"px"; },false);
			$('b360_dec').addEventListener('click',function () { var rteEdit = $('rteEdit');var rteCnt = $('rteCnt');rteCnt.style.height = rteEdit.style.height = parseInt(rteEdit.style.height.substr(0,rteEdit.style.height.length-2))-100+"px"; },false);
			
			$$('preview').addEventListener('mouseup', function () { composeResizeImage(); },false);
			if ($$('edit')) $$('edit').addEventListener('mouseup', function () { composeResizeImage(); },false);
			else $$('post').addEventListener('mouseup', function () { composeResizeImage(); },false);
			
			var quick_preview = document.createElement('input');
			quick_preview.id = 'quick_preview';
			quick_preview.className = 'active';
			quick_preview.value = 'Xem nhanh';
			quick_preview.type = 'button';
			quick_preview.addEventListener('click',function() { quickPreview(); },false );
			
			var fix_word = document.createElement('input');
			fix_word.id = 'fix_word';
			fix_word.className = 'active';
			fix_word.value = 'Sửa lỗi MS Word';
			fix_word.type = 'button';
			fix_word.addEventListener('click',function() { fixWord(); },false );
			
			var preview = $$('preview');
			if (preview.parentNode) {
				preview.parentNode.insertBefore(quick_preview,preview);
				preview.parentNode.insertBefore(fix_word,quick_preview);
			}
		}
		
		window.addEventListener("load", function(event) { if ($('rteContainer')) setTimeout(addMoreBtt,500); }, false);
		
		break;
	case 'profile':
		if ($('ymgl-blast-quote')) $('ymgl-blast-quote').addEventListener('click',function() { listenBlast();  }, false);
		if ($('comment_ff')) $$('post').addEventListener('mouseup',function() { fixQCmt(); },false);
	case 'friends':
		fixAvatar();
		break;

	case 'post':
		var p = document.location.search.match(/p=([0-9]+)/);
		var admin = false;
		if (p && $('edit-tag-'+p[1])) {
			var admin = true;
			GM_addStyle(".b360_removeCmtBtt {text-align:right;margin:10px;clear:both;padding-bottom:20px;}");
		}
		GM_addStyle(".b360_removeCmt {font-size:10px;float:right;width:20px;text-align:right;padding-bottom:15px}");
		
		var cmtNo = document.location.search.match(/&l=([0-9]+)&/);
		if (cmtNo) {
			cmtNo = cmtNo[1];
		}
		else {
			var cmtNo = 1;
		}
		
		var comments_xpath = document.evaluate("id('comments')/div[not(@class='head')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		for (var i=0;i<comments_xpath.snapshotLength;i++) {
			var row = comments_xpath.snapshotItem(i);
			var html = row.innerHTML;

			if (admin) {
				var m = html.match(/<a href="([^"]+)">Remove Comment<\/a>/);
				if (!m) break;
				var link = m[1];
			}
			var div = document.createElement('div');
			div.className = 'b360_removeCmt';
			div.innerHTML = '#'+(cmtNo++);
			if (admin) {
				div.innerHTML += '<input id="cmt-checkbox-'+i+'" type="checkbox" value="'+link+'" name="removeCmt" />';
			}
			
			var wrapper = getElementsByClassName('wrapper','div',row);
			insertAfter(row,div,wrapper[0]);
			
			var comment = getElementsByClassName('comment','p',wrapper[0]);
			comment[0].id = 'comment-no-'+i;
			
			if (admin && i == comments_xpath.snapshotLength - 1) {
				var div = document.createElement('div');
				div.className = 'b360_removeCmtBtt';
				div.innerHTML = '<input id="b360_removeCmtSCABtt" type="button" value="Chọn spam" class="inactive" /> <input id="b360_removeCmtCABtt" type="button" value="Chọn hết" class="inactive" /> <input id="b360_removeCmtUCABtt" type="button" value="Bỏ chọn hết" class="inactive" /> <input id="b360_removeCmtBtt" type="button" value="Xóa" class="active" name="removeCmtBtt" />';
				insertAfter(row.parentNode,div,row);
				$('b360_removeCmtBtt').addEventListener('click',function() { removeCmt(); },false);
				$('b360_removeCmtSCABtt').addEventListener('click',function() { checkAllCmt(2); },false);
				$('b360_removeCmtCABtt').addEventListener('click',function() { checkAllCmt(1); },false);
				$('b360_removeCmtUCABtt').addEventListener('click',function() { checkAllCmt(0); },false);
				
			}
		}

	case 'blog':

		fixAvatar();
		
		var sticky = $('ymgl-sticky-post');
		if (sticky) {
			var a = sticky.getElementsByTagName('a');
			for (var i=0;i<a.length;i++) {
				var href = a[i].href;
				if (!href.match(/p=[0-9]+/)) {
					a[i].removeAttribute('href');
					a[i].style.textDecoration = 'underline';
				}
			}
		}
		
		var blog = $('ymgl-blog');
		if (!blog) break;
		var blogHTML = blog.innerHTML;
		
		var heads_xpath = document.evaluate("id('ymgl-blog')/div[@class='thm-box']/dl[@class='body']/dt[@class='post-head']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var contents_xpath = document.evaluate("id('ymgl-blog')/div[@class='thm-box']/dl[@class='body']/dd[contains(@class,'post-body')]/div[@class='post-head' or @class='content-wrapper' or @class='image-wrapper' or @class='foot']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var post_links_xpath = document.evaluate("id('ymgl-blog')//div[@class='foot']/span/a[contains(@href,'#comments')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

		
		var len = contents_xpath.snapshotLength/3;
		
		GM_addStyle('.b360_switch { cursor:pointer; }');
		
		for (var i=0;i<len;i++) {
			var s = i*3;
			//content
			contents_xpath.snapshotItem(s).id = 'cnt-'+i;
			//image
			contents_xpath.snapshotItem(s+1).id = 'img-'+i;
			//footer
			contents_xpath.snapshotItem(s+2).innerHTML += '<dt class="post-head"><b class="b360_switch" name="switch-' + i + '">[-]</b></a>';
			
			if (WHERE == 'post') {
				var post_link = currentURL;
			}
			else {
				var post_link = post_links_xpath.snapshotItem(i).href.replace('#comments','');
			}
			var head = heads_xpath.snapshotItem(i);
			head.innerHTML = '<b class="b360_switch" name="switch-' + i + '">[-]</b> <a href="' + post_link + '">' + head.innerHTML + '</a>';
			
			eval("$$('switch-" + i + "')[0].addEventListener('click',function () { switchContent(" + i + ");},false);");
			eval("$$('switch-" + i + "')[1].addEventListener('click',function () { switchContent(" + i + "); $$('switch-" + i + "')[0].scrollIntoView(); },false);");
		}

		break;
}

if (prefs.debug) {	
	var today = new Date();
	var lastTime = getTimeInMilliseconds(today);
	var runningTime = lastTime - firstTime;
	runningTime = (Math.round(runningTime*1000))/1000; 

	GM_log(runningTime);
}