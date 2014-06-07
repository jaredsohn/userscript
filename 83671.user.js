// ==UserScript==
// @name           upic.me drag drop upload
// @namespace      http://blog.dt.in.th/
// @description    Drag and drop pictures into upic.me website to upload it.
// @include        http://upic.me/
// ==/UserScript==

var drop = document.body;
var queue = [];
var queueIsRunning = false;
var fileNum = 0;

if (unsafeWindow.isDragDropSetup === undefined) {
	drop.addEventListener('dragenter', ondragenter, false);
	drop.addEventListener('dragleave', ondragleave, false);
	drop.addEventListener('dragover', ondragover, false);
	drop.addEventListener('drop', ondrop, false);
	document.querySelector('#firstboot div').innerHTML = 'drop here to upload picture';
	unsafeWindow.isDragDropSetup = true;
}

function getNextFileId() {
	return 'dttvb' + (++fileNum);
}

function ondragenter(e) {
	e.stopPropagation();
	e.preventDefault();
}

function ondragover(e) {
	e.dataTransfer.effectAllowed = 'copy';
	e.dataTransfer.dropEffect = 'copy';
	e.stopPropagation();
	e.preventDefault();
	document.querySelector('#firstboot').style.MozTransform = 'scale(1.2)';
	document.querySelector('#firstboot').style.WebkitTransform = 'scale(1.2)';
	document.querySelector('#firstboot').style.transform = 'scale(1.2)';
}

function ondragleave(e) {
	document.querySelector('#firstboot').style.MozTransform = '';
	document.querySelector('#firstboot').style.WebkitTransform = '';
	document.querySelector('#firstboot').style.transform = '';
}

function ondrop(e) {
	var dt, files;
	ondragleave (e);
	e.stopPropagation ();
	e.preventDefault ();
	dt = e.dataTransfer;
	files = dt.files;
	for (var i = 0; i < files.length; i ++) {
		handleFile(files[i]);
	}
}

function checkQueue() {
	if (queueIsRunning) return;
	if (queue.length > 0) {
		queueIsRunning = true;
		(queue.shift()) ();
	}
}
function handleFile(f) {

	var nfo = {
		'id': getNextFileId(),
		'name': f.name,
		'size': f.size,
		'type': f.type
	};

	unsafeWindow.uploadStart.call(unsafeWindow.swfu, nfo);
	queue.push(startUpload);
	checkQueue();

	function startUpload() {

		var xhr = new XMLHttpRequest();
		var finished = false;
		xhr.open ('POST', unsafeWindow.swfu.settings.upload_url);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				finished = true;
				unsafeWindow.uploadSuccess.call (unsafeWindow.swfu, nfo, xhr.responseText);
				queueIsRunning = false;
				checkQueue ();
			}
		};
		xhr.upload.addEventListener ('progress', function(e) {
			if (e.lengthComputable) {
				unsafeWindow.uploadProgress.call (unsafeWindow.swfu, nfo, e.loaded, e.total);
			}
		}, false);
		xhr.upload.addEventListener ('load', function(e) {
			if (!finished)
				unsafeWindow.uploadProgress.call (unsafeWindow.swfu, nfo, 100, 100);
		}, false);

		var formData = new FormData();
		var postfields = unsafeWindow.swfu.settings.post_params;
		
		for (var i in postfields) {
			formData.append (i, postfields[i]);
		}
		formData.append('Filedata', f, nfo.name);
		xhr.send(formData);

	}

}

