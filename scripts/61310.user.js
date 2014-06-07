// ==UserScript==
// @name Zlo_Pic_Uploader
// @namespace http://zlo.rt.mipt.ru/xonix/gm/
// @description uploading images to bahus gallery from zlo board page
// @include http://zlo.rt.mipt.ru/*
// @include http://zlo.rt.mipt.ru./*
// @include http://board.rt.mipt.ru/*
// @include http://board.rt.mipt.ru./*
// @include http://bahus.3ka.mipt.ru/gallery/*
// ==/UserScript==
// @author xonix

/**
 * - Script uses postMessage() API (HTML 5), so it will work only with FF >= 3.0.X
 * - Must work under Google Chrome 2
 */

var DEBUG = false;
var C = unsafeWindow ? unsafeWindow.console : null;

//alert(C.info)

function info() {
 var args = [].slice.call(arguments);
 args.unshift('[ZLO PIC UPLOADER]');
 if (DEBUG) {
 if (C) C.info.apply(C, args)
 else alert(args.join(' '));
 }
}

//info('test')

try {
 var X = {
 apply: function (o, oo) {
 for (var k in oo) {
 o[k] = oo[k];
 }
 },
 byId: function (id) {
 return document.getElementById(id);
 },
 byName: function (name) {
 return document.getElementsByName(name);
 }
 }

 X.apply(String.prototype, {
 render: function (o) {
 var s = this;
 if (typeof o=='object') {
 if (o.length !== undefined) { // array
 for (var i = 0; i < o.length; i++) {
 s = s.split('{' + i + '}').join(o[i]);
 }
 } else {
 for (var k in o) {
 s = s.split('{' + k + '}').join(o[k]);
 }
 }
 } else if (['string', 'number'].contains(typeof o)) {
 return s.render(arguments);
 }
 return s;
 },
 swap: function (w1, w2) {
 return this == w1 ? w2 : w1;
 },
 trim: function () {
 return this.replace(/(^\s+)|(\s+$)/g, '');
 }
 });

 X.apply(Function.prototype, {
 bind: function (o) {
 var self = this;
 return (function() {
 self.apply(o, arguments)
 });
 }
 });

 X.apply(Array.prototype, {
 each: function (f) {
 for (var i = 0; i < this.length; i++) {
 if (f(this[i]) === false) break;
 }
 },
 map: function (f) {
 var res = [];
 this.each(function (el) {
 res.push(f(el))
 });
 return res;
 },
 contains: function (o) {
 var res = false;
 this.each(function (el) {
 if (o == el) {
 res = true;
 return false;
 }
 });
 return res;
 },
 any: function (f) {
 return this.map(f).contains(true);
 },
 all: function (f) {
 return !this.map(f).contains(false);
 }
 });

 var ZLO_HOSTS = ['zlo.rt.mipt.ru', 'board.rt.mipt.ru', 'zlo.rt.mipt.ru.', 'board.rt.mipt.ru.'];
 var ZLO_HOST = null;
 ZLO_HOSTS.each(function (h) {
 if (location.href.indexOf(h) != -1) {
 ZLO_HOST = h;
 return false;
 }
 });

 var ZLO_MSG_URLS = ['?read=', '?xpost=', '?form'];
 var BAHUS_HOST = 'bahus.3ka.mipt.ru';
 var SEP = ':::';

 var BAHUS_URL = 'http://bahus.3ka.mipt.ru/gallery/index.php';
 var BAHUS_URL_ADD = BAHUS_URL + '?add';
 var LOAD_FORM = '<style type="text/css">body {padding:0; margin:3px}</style>' +
 '<div align="center">' +
 '<form id="addFrm" enctype="multipart/form-data" action="{url}" method="post">' +
 'Выбрать картинку:<br/>' +
 '<input id="picFile" name="upload_photo" style="width:80%" size="60" type="file"><br/>' +
 '<input type="checkbox" id="make_private" value="make_private" name="make_private"/><label for="make_private">Приватная галерея</label>' +
 '</form>' +
 '<input type="button" id="sbmtBtn" value="Отправить" style="width: 100px;"> ' +
 '<input type="button" id="cancelBtn" value="Отменить"/></div>';
 var RE_ALREADY_IN_GALLERY = /Эта картинка уже есть в галерее: <a href="(.*?)" target="_blank">ссылка<\/a>/;
 var RE_ERROR_UPLOAD = /<img src="img\/error.gif" alt="Error" width="48" height="48">\s*<\/td>\s*<td class="p" align="center" bgcolor="#ffffff">\s*(.*?)\s*<br>\s*<\/td>/;
 var RE_IMG_URL = />\[pic\](.*?)\[\/pic\]<\/textarea>/;

 var U = function () {
 this.go();
 };

 U.prototype = {
 go: function () {
 info('go:', parent, location.href)
 if (window == parent && ZLO_HOST && ZLO_MSG_URLS.any(function (u) { return location.href.indexOf(u) != -1; })) {
 info(ZLO_HOST, location.href)
 new Z();
 } else if (window != parent && location.href.indexOf(BAHUS_HOST) != -1) {// iframe bahus
 info('bahus iframe', location.href)
 new B();
 } else {
 info('do nothing', parent, parent.location.href, location.href);
 }
 }
 }

 var Z = function () {
 this.go();
 }

 Z.prototype = {
 go: function () {
 this.createUploadButton();
 this.listenBahus();
 },
 createUploadButton: function () {
 var smilesButton = X.byName('styles')[0];
 if (smilesButton) { // we can reply
 var uplButtonSpan = document.createElement('span');
 uplButtonSpan.innerHTML = ' <input type="button" id="uplButton" class="qe_button" value="upload pic"' +
 ' title="Upload image to Bahus gallery"><div id="uplDiv"></div>' +
 ' <div id="loadedImgs" align="left" width=570 style="margin-bottom:-15px"></div>';
 smilesButton.parentNode.insertBefore(uplButtonSpan, smilesButton.nextSibling);
 this.uplButton = X.byId('uplButton');
 this.uplButton.addEventListener('click', this.showHideUploadImgForm.bind(this), true);
 this.uplDiv = X.byId('uplDiv');
 this.loadedImgsDiv = X.byId('loadedImgs');
 this.initUplDiv();
 this.replyTextArea = X.byName('body')[0];
// this.__test();
 }
 },
/* __test: function () {
 this.processImgLoaded('http://ya.ru/logo.png');
 this.processImgLoaded('http://habrahabr.ru/i/logo.gif');
 },*/
 showHideUploadImgForm: function () {
 if (this.afterSubmit) {
 this.afterSubmit = false;
 this.initUplDiv();
 }
 this.uplButton.style.fontWeight = this.uplButton.style.fontWeight.swap('bold', 'normal');
 this.uplDiv.style.display = this.uplDiv.style.display.swap('block', 'none');
 },
 initUplDiv: function () {
 var f = function (window) {
 var document = window.document,
 parent = window.parent;

 var tellParent = function (command, data) {
 var SEP = ':::';
 //parent.postMessage([command, data].join(SEP), '*');
 parent.postMessage([command, data].join(SEP), '*');
 }

 var addFrm = document.getElementById('addFrm');
 var cancelBtn = document.getElementById('cancelBtn');
 var sbmtBtn = document.getElementById('sbmtBtn');
 var picFile = document.getElementById('picFile');

 cancelBtn.addEventListener('click', function () {
 tellParent('showHideUploadImgForm');
 }, true);

 sbmtBtn.addEventListener('click', function () {
 if (!picFile.value) {
 tellParent('showError', 'Must select file!');
 } else {
 addFrm.submit();
 tellParent('processSubmit');
 }
 }, true);
 }

 var scrpt = '<script>({f})(window);</script>'.render({f: f.toString()});

 this.uplDiv.style.display = 'none';
 this.uplDiv.innerHTML = '<iframe id="picSelectIfr" width=570 height=115 style="margin:10px 0"' +
 ' src="data:text/html;charset=UTF-8,{loadForm}"></iframe>'.render(
 {
 loadForm: encodeURI(LOAD_FORM.render({url:BAHUS_URL_ADD}) + scrpt)
 });
 },
 processSubmit: function () {
 this.showHideUploadImgForm();
 this.afterSubmit = true;
 },
 listenBahus: function () {
 info('add message listener...')
 window.addEventListener('message', this.onMessage.bind(this), false);
 info('after add')
 },
 onMessage: function (e) {
 info('bahus message received', e, e.data)
 var a = e.data.split(SEP);
 var command = a[0],data = a[1];
 this[command](data);
 },
 showError: function (errTxt) {
 alert(errTxt);
 },
 processUploadError: function (errTxt) {
 this.showError(errTxt);
 },
 processImgLoaded: function (imgUrl) {
 info('Img loaded successfully ', imgUrl);
 this.imgNum = (this.imgNum || 0) + 1;
 var d = document.createElement('div');
 d.innerHTML = '<a href="{imgUrl}" target="_blank">{imgUrl}</a> <a href="#" id="{id}" style="color:green">[+]</a>'.render({
 imgUrl: imgUrl, id: 'add' + this.imgNum
 });
 this.loadedImgsDiv.appendChild(d);
 X.byId('add' + this.imgNum).addEventListener('click', function (e) {
 e.preventDefault();
 this.insertPicInReply(imgUrl)
 }.bind(this), true);
 this.insertPicInReply(imgUrl);
 },
 insertPicInReply: function (imgUrl) {
 var insertVal = '[pic]{0}[/pic]'.render(imgUrl);

 var ta = this.replyTextArea;

 var startPos = ta.selectionStart;
 var endPos = ta.selectionEnd;
 ta.value = ta.value.substring(0, startPos) + insertVal + ta.value.substring(endPos, ta.value.length);
 ta.focus();
 var newEndPos = startPos + insertVal.length;
 ta.setSelectionRange(newEndPos, newEndPos); // set cursor
 }
 }

 var B = function () {
 this.go();
 }

 B.prototype = {
 go: function () {
 
 info('bahus before postMessage', parent, window.parent, window, unsafeWindow, unsafeWindow.parent)
 var bahusTxt = document.body.innerHTML;
 var imgUrl;

 var alreadyExistsMatch = RE_ALREADY_IN_GALLERY.exec(bahusTxt);
 if (alreadyExistsMatch) {
 imgUrl = alreadyExistsMatch[1];
 info('Already exists:', imgUrl);
 imgUrl = imgUrl.replace('index.php?show=', 'data/');
 this.tellParent('processImgLoaded', imgUrl);
 return;
 }

 var errMatch = RE_ERROR_UPLOAD.exec(bahusTxt);
 if (errMatch) {
 var errTxt = errMatch[1].replace(/<br\/*>/ig, '\n');
 info('uploadError', errTxt)
 this.tellParent('processUploadError', errTxt);
 return;
 }

 var imgUrlMatch = RE_IMG_URL.exec(bahusTxt);
 if (imgUrlMatch) {
 imgUrl = imgUrlMatch[1];
 info('loaded:', imgUrl)
 this.tellParent('processImgLoaded', imgUrl);
 return
 }

 info('what???');
 },
 tellParent: function (command, data) {
 var parent = unsafeWindow.parent;
 parent.postMessage([command, data].join(SEP), '*');
 }
 }

 new U();

} catch (e) { info('Error!', e); }