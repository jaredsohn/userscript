// ==UserScript==
// @name        Drop Images into Tieba Editor 3
// @description 贴吧拖放粘贴上传图片 huhu修改
// @version     3.1.1
// @grant       none
// @include     http://tieba.baidu.com/f*
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com.cn/f*
// @include     http://tieba.baidu.com.cn/p/*
// @include     http://tieba.baidu.cn/f*
// @include     http://tieba.baidu.cn/p/*
// @run-at      document-end
// @updateURL   https://userscripts.org/scripts/source/179754.meta.js
// @downloadURL	https://userscripts.org/scripts/source/179754.user.js
// @copyright 5B4B huhu修改
// @icon	http://imgsrc.baidu.com/forum/pic/item/911e12087bf40ad13d03ebde552c11dfa8ecce89.jpeg
// ==/UserScript==


'use strict';


function init() {
    'use strict';
//////
//// Basic Functions
//
    function failedCallback() {
        if ( gFilesNumSum > 0 ) {
            --gFilesNumSum;
        }
    }

    function progressCallback(e) {
        if ( !e.lengthComputable ) {
            progress.hide();
            return;
        }
        progress.show();
        progress.update(e.loaded / e.total / gFilesNumSum, gFilesNum, gFilesNumSum);
    }

    function upload(blob, type, name) {
        var xhr = new XMLHttpRequest(),
            size = blob.size;

        gUploading = true;
        xhr.open('GET', 'http://tieba.baidu.com/dc/common/imgtbs?t=' + new Date().getTime(), true);
        xhr.onload = function () {
            var res = $.json.decode(this.responseText);

            if ( res.no !== 0 ) {
                failedCallback();
            }

            var tbs = res.data.tbs,
                formData = new FormData();

            xhr.abort();
            xhr.open('POST', 'http://upload.tieba.baidu.com/upload/pic?is_wm=1&tbs=' + tbs, true);
            xhr.withCredentials = true;
            xhr.upload.onprogress = progressCallback;
            xhr.onload = function () {
                var res = $.json.decode(this.responseText);

                ++gFilesNum;
                if ( res.error_code !== 0 ) {
                    showMsg(name + ' \u56FE\u7247\u4E0A\u4F20\u5931\u8D25\uFF01');
                } else {
                    var pic_url = 'http://imgsrc.baidu.com/forum/pic/item/' + res.info.pic_id_encode + '.' + type;
                    test_editor.execCommand('inserthtml', '<img class="BDE_Image" type="2" src="http://imgsrc.baidu.com/forum/pic/item/' + res.info.pic_id_encode + '.jpg">');
                    //editor.execCommand('insertimage', [ pic_url ], '2');
                }
                if ( gFilesNum === gFilesNumSum ) {
                    gUploading = false;
                    progress.hide();
                }
            };
            formData.append('fid', PageData.forum.id);
            formData.append('Filename', name);
            formData.append('file', blob);
            xhr.send(formData);
        };
        xhr.onerror = failedCallback;
        xhr.send();
    }

    function uploadImages(files) {
        Array.prototype.forEach.call(files, function (file) {
            if ( /^image\/(png|jpe?g|gif)$/i.test(file.type) ) {
                var type = RegExp.$1,
                    r = new FileReader();

                r.onload = function () {
                    var blob = new Blob([ new Uint8Array(r.result) ], {
                        type: file.type
                    });

                    if ( !gUploading ) {
                        gFilesNum = 0;
                    }
                    upload(blob, type, file.name);
                };
                r.readAsArrayBuffer(file);
            }
        });
    }

    function createProgressBar(id) {
        var div = document.createElement('div'),
            label = document.createElement('label'),
            p = document.createElement('progress');

        div.id = id;
        div.style.display = 'none';
        p.max = 1;
        p.value = 0;
        p.style.width = '200px';
        p.style.marginRight = '5px';
        div.appendChild(p);
        div.appendChild(label);
        div.update = function (percent, num, sum) {
            p.value = percent;
            label.textContent = '\u5DF2\u4E0A\u4F20 ' + num + '/' + sum + '\u7684\u56FE\u7247';
        };
        div.hide = function () {
            this.style.display = 'none';
        };
        div.show = function () {
            this.style.display = '';
        };
        return div;
    }


//////
//// Initialization
//
    try {
        var isTarget = /^http:\/\/tieba\.baidu\.com\/(?:f\?.*?\b(?:kw|kz|z)=[^&]|p\/)/i;

        if ( !isTarget.test(location.href) ) {
            return;
        }

        var gFilesNumSum = 0,
            gFilesNum = 0,
            gUploading = false,
            intprogress = true;
        var usWin = window,
            $ = usWin.$,
            PageData = usWin.PageData,
            editor = usWin.test_editor,
            textarea = document.querySelector('#ueditor_replace'),
            ttp=document.querySelector('.tb_rich_poster_container'),pt='#ueditor_replace',
            progress = createProgressBar('DITE2_progress'),
            showMsg = function (msg) {
                var dialog = usWin.$.dialog.open(msg, {
                    showTitle: false,
                    modal: false,
                    top: textarea.getClientRects().item(0).top + window.scrollY,
                    left: textarea.getClientRects().item(0).left + window.scrollX,
                    fixed: false
                });
                setTimeout(function (){
                    dialog.element.fadeOut(400, function () {
                        dialog.close();
                    });
                }, 1000);
            };

        //textarea.parentNode.insertBefore(progress, textarea.nextElementSibling);

        window.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, true);

        ttp.addEventListener('dragover', function (e) {
            e.preventDefault();
        }, true);
        ttp.addEventListener('drop', function (e) {
            if(intprogress){textarea = document.querySelector('#ueditor_replace');textarea.parentNode.insertBefore(progress, textarea.nextElementSibling);intprogress=false;}
            var files = e.dataTransfer.files;

            if ( files.length === 0 ) {
                return;
            }

            e.preventDefault();
            if ( gUploading ) {
                gFilesNumSum += files.length;
                showMsg('\u51C6\u5907\u518D\u4E0A\u4F20 ' + files.length + ' \u5E45\u56FE\u7247\u2026\u2026');
            } else {
                gFilesNum = 0;
                gFilesNumSum = files.length;
                showMsg('\u51C6\u5907\u4E0A\u4F20 ' + files.length + ' \u5E45\u56FE\u7247\u2026\u2026');
            }
            uploadImages(files);
        },false);
        ttp.addEventListener('paste', function (e) {
            if(intprogress){textarea = document.querySelector('#ueditor_replace');textarea.parentNode.insertBefore(progress, textarea.nextElementSibling);intprogress=false;}
            if ( !e.clipboardData ) {
                showMsg('\u4F60\u7684\u706B\u72D0\u6D4F\u89C8\u5668\u6682\u65F6\u4E0D\u652F\u6301\u526A\u8D34\u677F\u7C98\u8D34\u4E0A\u4F20\u529F\u80FD\u3002');
                throw 'DITE2: e.clipboardData, Firefox not supported.';
                return;
            }
            var clipboard = e.clipboardData,
                items = clipboard.items;

            Array.prototype.forEach.call(items, function (item, i) {
                if ( item.kind === 'file' ) {
                    e.preventDefault();
                    if ( gUploading ) {
                        ++gFilesNumSum;
                        showMsg('\u51C6\u5907\u518D\u4E0A\u4F20 1 \u5E45\u56FE\u7247\u2026\u2026');
                    } else {
                        gFilesNumSum = 1;
                        showMsg('\u51C6\u5907\u4E0A\u4F20 1 \u5E45\u56FE\u7247\u2026\u2026');
                    }
                    uploadImages([ item.getAsFile() ]);
                }
            });
        });
    } catch (err) {
        throw new Error('DITE3: ' + err.message);
    }
}


var script = document.createElement('script');
script.id = '__5B4B_DITE3__';
script.charset = 'utf-8';
script.type = 'text/javascript';
script.innerHTML = 'try{(' + init.toString() + ')()}catch(e){}';
document.body.appendChild(script);
