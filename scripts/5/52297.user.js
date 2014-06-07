// ==UserScript==
// @name					 Inline steering wheel
// @namespace			http://userscripts.org/users/26596
// @description		Inline editing and deleting of comments and posts
// @include				http://leprosorium.ru/my/inbox/*
// @include				http://leprosorium.ru/
// @include				http://leprosorium.ru/pages/*
// @include				http://leprosorium.ru/comments/*
// @include				http://*.leprosorium.ru/
// @include				http://*.leprosorium.ru/pages/*
// @include				http://*.leprosorium.ru/comments/*
// @include				http://*.leprosorium.ru/archive/*
// ==/UserScript==









var ISW = {};



ISW.getWTF = function(pid,qq) {
	ISW.gettingWTF = true;
	var url = 'http://' + document.location.hostname + '/mod/'+pid;
	if (qq) url += '/'+qq;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {},
		onload: function(responseDetails) {
			console.log(url);
			r = responseDetails.responseText;
			var pattern = /[0-9a-f]{32}/i;
			ISW.wtf = r.match(pattern);
		}
	});
};


ISW.opened = false;
comments = document.getElementById('js-commentsHolder');
if (window.location.href.indexOf('archive/2') > 0 && window.location.href.indexOf('iknowwhatiamdoing') > 0) {
	archive = document.getElementById('content_left_inner');
	posts = false;
} else {
	posts = document.getElementById('js-posts_holder');
	archive = false;
}
var h = comments || posts || archive;



if (h) {

	if (comments)
		ISW.mode = 'comments';
	if (posts)
		ISW.mode = 'posts';
	if (archive)
		ISW.mode = 'archive';

	ISW.editables = h.getElementsByClassName('post');

	for (var i = 0; i < ISW.editables.length; i++) {

		var ed = ISW.editables[i];
		var p = ed.childNodes[3].childNodes[1];


		if (!ISW.wtf && !ISW.gettingWTF) {
			if (ISW.mode=='comments') {
				var pid = ed.id;
				var q = document.location.pathname.split('/');
				var qq = q.pop();
				if (!qq)
					qq = q.pop();
			} else {
				var pid = ed.id.substr(1);
				var qq = false;
			}
			ISW.getWTF(pid,qq);
		}

		if (p.className == 'p' && (p.innerHTML.indexOf('onclick="javascript:open') > 0 || archive)) {

			var span = document.createElement('span');
			span.className = 'steering_wheel';
			span.style.cursor = 'pointer';
			span.style.verticalAlign = 'text-top';
			var wheel = document.createElement('img');
			wheel.src = 'http://pit.dirty.ru/lepro/2/2009/06/25/14772-152214-a09e4de0f81591a2aaac7997731539d4.png';
			wheel.title = 'Я — у руля!';
			span.appendChild(wheel);
			(function(ed) {
				span.addEventListener("click", function() { ISW.click(ed); }, false);
			})(ed);

			/*for (var j = 0; j < p.childNodes.length; j++ ) {
				if (p.childNodes[j].nodeType == '1' && p.childNodes[j].innerHTML && p.childNodes[j].innerHTML.indexOf('у руля!') > 0) {
					p.childNodes[j+1].parentNode.removeChild(p.childNodes[j+1]);
					p.childNodes[j].parentNode.removeChild(p.childNodes[j]);
					p.childNodes[j-1].parentNode.removeChild(p.childNodes[j-1]);
					break;
				}
			}*/

			p.appendChild(span);


		}


	}

}


ISW.click = function(obj) {

	if (ISW.opened && ISW.element) {
		if (ISW.element.id == obj.id) {
			ISW.textareaToPost();
			return;
		} else {
			ISW.textareaToPost();
		}
	}

	ISW.element = obj;
	if (!ISW.iframe)
		ISW.createIframe();
	ISW.postToTextarea();

}

ISW.createIframe = function() {

	var i = document.createElement('iframe');
	i.name = 'ISW_frame';
	i.style.display = 'none';
	i.style.position = 'absolute';
	document.body.appendChild(i);
	ISW.iframe = i;

}

ISW.postToTextarea = function() {

	var d = document.getElementById('reply_form');
	if (d)
			d.parentNode.removeChild(d);

	var r = document.getElementById('reply_link_default');
	if (r && r.style.display == 'none')
		r.style.display = 'block';

	var obj = ISW.element;
	var pid = ISW.mode=='comments'? obj.id : obj.id.substr(1);
	var q = document.location.pathname.split('/');
	var qq = q.pop();
	if (!qq)
	qq = q.pop();
	var post = obj.childNodes[1];
	ISW.post = post;
	ISW.oldContents = post.innerHTML;

	var d = document.createElement('div');
	d.id = 'reply_form';
	d.innerHTML = '<div class="ISW_closer" style="cursor:pointer;float:right;color:#ccc;font-size:smaller;border-bottom:1px dashed;margin-top:5px;">x</div>'+
	'<div class="header"><a onclick="return insert_text(\'b\');" href=""><b>Bold</b></a> &nbsp; <a onclick="return insert_text(\'i\');" href=""><i>Italic</i></a> &nbsp; <a onclick="return insert_text(\'u\');" href=""><u>Underline</u></a> &nbsp; <a onclick="return insert_text(\'sup\');" href="">x<sup>2</sup></a> &nbsp; <a onclick="return insert_text(\'sub\');" href="">x<sub>2</sub></a> &nbsp; <a onclick="return insert_text(\'irony\');" href=""><span class="irony">Irony</span></a> &nbsp; <a onclick="return insert_text(\'h2\');" href=""><span style="color: #326CCD;">h2</span></a> &nbsp; <a onclick="return insert_text(\'moderator\');" href=""><span style="font-style: italic; color: #666;">moderator</span></a> &nbsp; &nbsp; &nbsp; <a onclick="insert_link(); return false;" href=""><b>Link</b></a> &nbsp; <a onclick="insert_image(); return false;" href=""><b>Image</b></a> </div>'+
	'<form class="ISW_editForm" method="post" target="ISW_frame" onsubmit="return false;" action="/mod/'+pid+'/'+ (ISW.mode=='comments'?qq:'') +'"><input type="hidden" value="'+ISW.wtf+'" name="wtf"/><input type="hidden" value="edit" name="post2do"/><textarea id="comment_textarea" class="ISW_textarea" name="newbody" style="width:100%">' + trim(post.innerHTML.replace(/<br\>/gi,'\n')) + '</textarea>'+
	'<div class="bottom"><div class="bottom_right"><input type="image" alt="YARRR!" src="http://img.dirty.ru/lepro/yarrr.gif" class="image"/></div></div></form>'+
	'<form class="ISW_deleteForm" method="post" target="ISW_frame" action="/mod/'+pid+'/'+ (ISW.mode=='comments'?qq:'') +'" style="float:left;margin-top:-17px;width:30px;"><input type="hidden" value="'+ISW.wtf+'" name="wtf"/><input type="hidden" value="del" name="post2do"/><input type="image" alt="Удалить" class="image" onclick="return confirm(\'Ты хочешь удалить это? Точно?\');" src="data:image/gif;base64,R0lGODlhGAAUAMQRAPT08uDg3oCAgBUVFOXl41VVVTo6OeLi4re3tqemp3p7esTEw5WWl/Ly8JiYmMPDw7Cxsf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAYABQAAAVtYBSMZGmekRgAbOu+7ijCdB3Mdd4GwqrrPN/P1qMREATWMfkK1goGlqHQgDlph4FCMWA2izXEYAAhCmHZrjkHna5picFjMUjQri9CgcFyFA5WYEN3goNfZ4Y7PYiGIwIqJ5EnAo8plJeYmZoRIQA7"/></form>';

	//console.log(ISW);
	post.style.display = 'none';

	obj.insertBefore(d, obj.childNodes[0]);

	ISW.replyDiv = d;

	ISW.editForm = d.getElementsByClassName('ISW_editForm')[0];
	ISW.editForm.addEventListener("submit", ISW.doSubmit, false);
	ISW.editForm.addEventListener("keydown", ISW.ctrlEnter, false);

	ISW.deleteForm = d.getElementsByClassName('ISW_deleteForm')[0];
	ISW.deleteForm.addEventListener("submit", ISW.doDelete, false);

	ISW.closer = d.getElementsByClassName('ISW_closer')[0];
	ISW.closer.addEventListener("click", ISW.click, false);

	ISW.textarea = d.getElementsByClassName('ISW_textarea')[0];
	ISW.opened = true;

}

ISW.textareaToPost = function() {

	ISW.post.style.display = 'block';
	ISW.element.removeChild(ISW.replyDiv);

	ISW.opened = false;
	ISW.element = false;
	ISW.textarea = false;
	ISW.editForm = false;
	ISW.replyDiv = false;

}

ISW.doSubmit = function() {

	ISW.textarea.disabled = true;
	ISW.replyDiv.style.opacity = '.5';

	var t = trim(ISW.textarea.value.replace(/\n/gi,'<br>'));

	var req = new XMLHttpRequest();
	req.open('POST', ISW.editForm.action, true);
	req.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				ISW.post.innerHTML = t;
				ISW.textareaToPost();
			} else {
				ISW.textarea.disabled = false;
				ISW.replyDiv.style.opacity = '1';
				alert("Что-то пошло не так! :(\n"+req.status+' '+req.responseText);
			}
		}
	};
	req.send('post2do=edit&wtf='+ISW.wtf+'&newbody='+t+'&x=32&y=12');


}

ISW.doDelete = function() {

	ISW.textarea.disabled = true;
	ISW.replyDiv.style.opacity = '.5';

	var req = new XMLHttpRequest();
	req.open('POST', ISW.deleteForm.action, true);
	req.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				document.location.href="";
			} else {
				ISW.textarea.disabled = false;
				ISW.replyDiv.style.opacity = '1';
				alert("Что-то пошло не так! :(\n"+req.status+' '+req.responseText);
			}
		}
	};
	req.send('post2do=del');

}

ISW.ctrlEnter = function(e) {
	if (e.keyCode==13 && e.ctrlKey && ISW.editForm && ISW.opened)
		ISW.doSubmit();
}

function trim(string){
	return string.replace(/(^\s+)|(\s+$)/g, "");
}


