// ==UserScript==
// @name           GSiteDrop
// @description    Upload images by dropping on Google Sites WYSIWYG editor.
// @author         chrono-meter@gmx.net
// @namespace      sites.google.com
// @include        https://sites.google.com/a/*
// @url            http://userscripts.org/scripts/show/96158
// @version        1.0.0
// @todo           support attachment files
// ==/UserScript==
(function(){
function getCookie(name, def){
    for each (var item in document.cookie.split(/; */)){
        var items = item.split('=');
        var k = items.shift();
        var v = items.join('=');
        if (name == k) return decodeURIComponent(v);
    }
    return def;
}

function xhrPostFile(file, uri, fileFieldName){
    var boundary = '---------------------------' + (new Date().getTime() * 24);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', uri, true);
    xhr.setRequestHeader(
        'Content-Type', 'multipart/form-data; boundary=' + boundary);

    var body = '--' + boundary + '\r\n';
    body += 'Content-Disposition: form-data; name=\"'
         + fileFieldName + '\"; filename=\"' + file.name + '\"\r\n';
    body += 'Content-Type: ' + file.type + '\r\n\r\n';
    body += file.getAsBinary() + '\r\n';
    body += '--' + boundary + '--';

    xhr.body = body;
    xhr.setRequestHeader('Content-Length', body.length);
    return xhr;
}

var GSiteDrop = {};
var self = GSiteDrop;

GSiteDrop.onNodeInserted = function(event){
    var e = event.target;
    if (e.tagName != 'IFRAME') return;
    setTimeout(function(){
        if (e.contentDocument.designMode != 'on') return;
        e.contentDocument.addEventListener('drop', self.onFrameDrop, false);
    }, 0);
};

GSiteDrop.onFrameDrop = function(e){
    let frameDoc = e.target.ownerDocument;
    let files = e.dataTransfer.files;
    let selection = frameDoc.defaultView.getSelection().getRangeAt(0);

    function uploadImage(files, index){
        if (index >= files.length){ // index exceeded
            var elements = frameDoc.getElementsByTagName('img');
            for (var i = 0; i < elements.length; i++){
                var e = elements[i];
                if (e.src.indexOf('file://') == 0) e.parentNode.removeChild(e);
            }
            // extend viewport
            setTimeout(function(){
                var e = frameDoc.createTextNode('\n');
                frameDoc.body.appendChild(e);
                frameDoc.body.removeChild(e);
            }, 1000);
            return;
        }

        var file = files[index];
        if (!file.type.match(/image.*/)){
            self.notice(file.name + 'is not an image.');
            return uploadImage(files, index + 1);
        }

        var xhr = xhrPostFile(file, unsafeWindow.webspace.baseUri + '/system/services/trogAttach?targetPage=' + encodeURIComponent(unsafeWindow.webspace.page.path) + '&jot.xtok=' + getCookie('jotxtok'), 'file');
        xhr.addEventListener('readystatechange', function(e){
            if (e.target.readyState != 4) return;
            self.enableViewport();
            if (e.target.status != 200){
                self.notice('upload failed (' + e.target.status + ')');
            } else {
                var response = JSON.parse(e.target.responseText);
                if (response.type != 'ok'){
                    self.notice('upload failed (' + response.type + ')');
                } else {
                    var e = frameDoc.createElement('div');
                    e.setAttribute(
                        'style', 'display: block; text-align: left;');
                    e.innerHTML = '<a href="https://sites.google.com' + response.details.fileUrl + '" imageanchor="1"><img src="' + response.details.fileUrl + '" border="0" width="200"></a>';
                    selection.insertNode(e);
                    selection.setStartAfter(e);
                    selection.setEndAfter(e);
                }
            }
            uploadImage(files, index + 1);
        }, false);

        self.disableViewport('uploading ' + file.name + ' ...');
        xhr.sendAsBinary(xhr.body);
    }

    if (files && files.length){
        setTimeout(function(){ uploadImage(files, 0); }, 0);
    }
};

GSiteDrop.enableViewport = function(){
    'enable viewport';
    var e = document.querySelector('div.modal-dialog-bg');
    e.style.display = 'none';
    e.innerHTML = '';
};

GSiteDrop.disableViewport = function(message){
    'disable viewport and show message';
    var e = document.querySelector('div.modal-dialog-bg');
    e.style.display = '';
    e.style.width = document.body.clientWidth + 'px';
    e.style.height = document.body.clientHeight + 'px';
    e.innerHTML =
     '<div id="disable-status" style="text-align: center; color: white;">' +
     '<img src="https://ssl.gstatic.com/editor/pie.gif" style="opacity:1;"/>' +
     '<div id="disable-status-text"></div>' +
     '</div>';
    e = document.getElementById('disable-status');
    e.style.marginTop = (document.body.clientHeight - 16) / 2 + 'px';
    e = document.getElementById('disable-status-text');
    e.textContent = message;
};

GSiteDrop.notice = function(message, timeout){
    'show notice message for user and hide automatically';
    var status = document.getElementById('sites-status');
    status.style.display = '';
    status.style.opacity = '1';
    var notice = document.getElementById('sites-notice');
    notice.textContent = message;
    setTimeout(function(){
        status.style.display = 'none';
        status.style.opacity = '0';
        notice.textContent = '';
    }, timeout || 15000);
};

if (!window.frameElement){ // skip in iframe
    window.addEventListener(
        'DOMNodeInserted', GSiteDrop.onNodeInserted, false);
}
})();