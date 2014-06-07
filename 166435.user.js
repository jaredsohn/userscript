// ==UserScript==
// @name           bangumi image uploader plugin v6
// @version 7.3.0
// @uso:version 7.3.0
// @namespace      com.ruocaled.bangumi
// @description    A simple image uploder for bgm.tv group/subject discussion thread, powered by bangumi blog
// @include        */rakuen/topic/group/*
// @include        */group/topic/*
// @include        */group/reply/*/edit
// @include        */ep/*
// @include        */subject/ep/edit_reply/*
// @include        */group/*

// @include        */subject/reply/*/edit
// @include        */subject/topic/*
// @include        */topic/subject/*
// @include        */blog/reply/edit/*


// ==/UserScript==

var base_url = 'http://lain.bgm.tv/pic/photo/';
var total_pics = 0;
var upload_counter = 0;

var buttonContainer = document.getElementById('submitBtnO');
var uploadContainer = document.createElement("div");
uploadContainer.style.position = "relative";
uploadContainer.style.display = "inline";
uploadContainer.style.marginLeft = "10px";


var fake_upload_button = document.createElement("input");
fake_upload_button.type = 'button';
fake_upload_button.className = 'inputBtn';
fake_upload_button.value = '上传图片';

var upload_button = document.createElement("input");
upload_button.type = 'file';
upload_button.style.opacity = 0;
upload_button.style.zIndex = 2;
upload_button.style.position = "absolute";
upload_button.style.top = "-10px";
upload_button.style.left = 0;
upload_button.style.width = "85px";
upload_button.style.height = "35px";
upload_button.accept = 'image/*';
upload_button.multiple = 'multiple';


var progress_report = document.createElement('h4');
progress_report.style.marginTop = '10px';
progress_report.style.height = '12px';
progress_report.style.display = 'none';


var progress = document.createElement('div');
progress.style.height = '5px';
progress.style.width = '400px';
progress.style.marginTop = '20px';
progress.style.display = 'none';
progress.style.backgroundColor = '#ccc';

var bar = document.createElement('div');
bar.style.backgroundColor = '#09F';
bar.style.width = "30%";
bar.style.height = '5px';


var previews = document.createElement('div');
previews.style.marginTop = '20px';

progress.appendChild(bar);

uploadContainer.appendChild(fake_upload_button);
uploadContainer.appendChild(upload_button);

buttonContainer.insertBefore(uploadContainer, buttonContainer.children[0].nextSibling);

buttonContainer.appendChild(progress_report);


buttonContainer.appendChild(progress);
buttonContainer.appendChild(previews);

function readCookie(name) {
	return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
}


function nagi_upload(file) {

	var post_url = window.location.host + '/blog/upload_photo';
	var sid = readCookie('chii_sid');
	var blog_id = Math.floor((Math.random() * 10000) + 1);
	var formData = new FormData();

	formData.append('Filename', file.name);
	formData.append('Filedata', file);
	formData.append('Upload', 'Submit Query')
	var xhr = new XMLHttpRequest();
	var path = 'http://' + post_url + '?' + 'folder=/blog/' + blog_id + '/files&sid=' + sid;
	xhr.open('POST', path);
	xhr.onload = function () {
		//bar.style.width =  '100%';

	};

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var src = xhr.responseText;
			src = src.replace(new RegExp("\\n", "gm"), "");


			var re = /o\('(.*)','(.*)'\)/gm
			re.exec(src);
			var id = RegExp.$1;
			var path = RegExp.$2;

			if (id && path){
				var preview = document.createElement('span');
				preview.className = 'preview photo_pre';
				preview.style.paddingRight = '10px';
				var a = document.createElement('a');
				a.className = 'cover';
				a.style.cursor = 'pointer';
				var img = document.createElement('img');
				img.className = 'cover';
				img.src = base_url+ 'g/'+ path;

				a.onclick = function(){
					var textareaNode = document.getElementById('content');
					insertTextAtCursor(textareaNode,'[photo=' + id + ']' + path + '[/photo]');
				}

				a.appendChild(img);
				preview.appendChild(a);


				previews.appendChild(preview);

				upload_counter++;
				updateReport();
			}

			//url_input.value = '[img]'+base_url + RegExp.$1 + '[/img]';

			//src = src.replace(new RegExp("<a.*photo_del.*<a", "gm"), "<a");
			//src = src.replace('insertPhoto','');
			//debugger;
			//re.exec(src);
			//url_input.value = '[img]'+base_url + RegExp.$1 + '[/img]';
			//previews.innerHTML = previews.innerHTML + '\n' + src + '\n';
			//previews.style.display = 'inline-block';
			//previews.style.display = 'block';

		}

	}


	xhr.send(formData);
}

function updateReport() {
	progress_report.innerText = upload_counter + ' / ' + total_pics;
	if (total_pics !== 0) bar.style.width = (upload_counter / total_pics) * 100 + '%';
	if (upload_counter !== total_pics) progress_report.innerText = progress_report.innerText + ' (上传中，请稍等⋯⋯)';
}


function insertTextAtCursor(el, text) {
	var val = el.value, endIndex, range, doc = el.ownerDocument;
	if (typeof el.selectionStart == "number"
		&& typeof el.selectionEnd == "number") {
		endIndex = el.selectionEnd;
		el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
		el.selectionStart = el.selectionEnd = endIndex + text.length;
	} else if (doc.selection != "undefined" && doc.selection.createRange) {
		el.focus();
		range = doc.selection.createRange();
		range.collapse(false);
		range.text = text;
		range.select();
	}
}



function insertPhoto2(id, path) {
	try {
		$(".newBlogEntry").focus();
		parent.$.markItUp({
			replaceWith: '[photo=' + id + ']' + path + '[/photo]'
		});
	} catch (e) {
		alert("!!!");
	}
}


upload_button.onchange = function (e) {
	if (this.files && this.files.length > 5) {
		alert('一次这么多⋯⋯身体会受不了的⋯⋯（请一次上传至多5张图片）');
		return;
	}
	total_pics = this.files.length;
	upload_counter = 0;

	progress_report.style.display = 'block';
	progress.style.display = 'block';

	updateReport();

	for (var i = 0; i < this.files.length; i++) {
		var f = this.files[i];
		if (f.size > 1000000) {
			alert(f.name + ': 好~好大~这么大的⋯⋯不行的啦⋯⋯');
		}
		else {
			nagi_upload(f);
		}
	}

	this.value = '';


}

