// ==UserScript==
// @name        Drop Images into Tieba Editor
// @description Drop images from your computer into Tieba editor.
// @namespace   Hello, DITE!
// @version     3.4
// @grant       none
// @include     http://tieba.baidu.com/*
// @run-at      document-end
// @updateURL   https://ge.tt/api/1/files/9qnNLYO/0/blob?download
// ==/UserScript==


function upload(dataURL, type, id) {
    id = 'DITE_FIL_' + id;
    addPath(id);
    usWin._.Module.use('frs/component/SignShai/FlashImageLoader_' + id, null, function (a) {
        var DITE_FIL = usWin[id] = a;
        
        usWin.$.ajax({
            type: 'GET',
            url: 'http://tieba.baidu.com/dc/common/imgtbs',
            dataType: 'json',
            success: function (c) {
                if (c && c.data && c.data.tbs) {
                    callback(c.data.tbs)
                }
            }
        });
        
        function uploadedHandler(a, d) {
            var c = usWin.$.json.decode(d);
            
            if (c.error_code != 0) {
                alert("\u56FE\u7247\u4E0A\u4F20\u5931\u8D25\uFF01")
            } else {
                var b = c.info.pic_id_encode;
                var e = 'http://imgsrc.baidu.com/forum/pic/item/' + b + '.' + type;
                
                if (++count === max) {
                    usWin.$.SimplePopupMsg.show(
                        max + '\u5E45\u56FE\u7247\u4E0A\u4F20\u5B8C\u6BD5\uFF01',
                        '_DITE_' + new Date().getTime(),
                        700
                    );
                }
                document.querySelector('#editor .tb-editor-editarea').focus();
                usWin.rich_postor._editor.execCommand('insertimage', e);
                
                var obj = DITE_FIL.flashObj.object.parentNode;
                obj.parentNode.removeChild(obj);
                DITE_FIL.unbind('uploadComplete', arguments.callee);
                usWin[id] = undefined;
                DITE = undefined;
            }
        }
        
        function callback(tbs) {
            DITE_FIL.bind('uploadComplete', uploadedHandler);
            DITE_FIL.uploadBase64('http://upload.tieba.baidu.com/upload/pic', dataURL.replace(/^.*?base64,/, ''), {
                tbs: tbs
            })
        }
    });
}

function uploadImages(files) {
    Array.prototype.forEach.call(files, function (file) {
        var type = file.type.match(/^image\/(.*)$/i)[1];
        
        if (/^(?:png|jpe?g|gif)$/i.test(type)) {
            var r = new FileReader();
            
            r.onload = function () {
                upload(r.result, type, new Date().getTime() + Math.random());
            };
            r.readAsDataURL(file);
        }
    });
}

function getUnsafeWindow() {
    var div = document.createElement('div');
    div.setAttribute('onclick', 'return window;');
    return div.onclick();
}

function addPath(id) {
    usWin._.Module.define({
        path: 'frs/component/SignShai/FlashImageLoader_' + id,
        sub: {
            flashPath: "http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/Base64ImageLoader.swf?v=1.0",
            flashObj: null,
            isReady: false,
            options: null,
            initial: function (a) {
                this.options = usWin.$.extend({}, a)
            },
            _createFlash: function () {
                var b = this;
                if (this.flashObj) {
                    return
                }
                var a = usWin.$('<div id="' + id + '" style="line-height: 0; font-size: 0px;"></div>');
                a.appendTo('body');
                this.flashObj = new usWin.$.swf(this.flashPath, {
                    container: a,
                    width: 1,
                    height: 1,
                    params: {
                        quality: 'high',
                        allowScriptAccess: 'always',
                        wMode: 'transparent',
                        swLiveConnect: true,
                        menu: false
                    },
                    callBacks: {
                        completeHandler: function (c) {
                            b._completeHandler(c)
                        },
                        errorHandler: function (c) {
                            b._errorHandler(c)
                        },
                        isReady: function () {
                            return b._isReady()
                        },
                        flashReady: function () {
                            b._flashReady()
                        },
                        uploadBase64Complete: function (c) {
                            b._uploadBase64Complete(c)
                        },
                        uploadBase64Error: function () {
                            b._uploadBase64Error()
                        }
                    }
                })
            },
            _completeHandler: function (a) {
                if ("onComplete" in this.options && typeof this.options.onComplete == "function") {
                    this.options.onComplete(a)
                }
                this.trigger("loadComplete", a)
            },
            _errorHandler: function (a) {
                if ("onError" in this.options && typeof this.options.onError == "function") {
                    this.options.onError(a)
                }
                this.trigger("loadError")
            },
            _isReady: function () {
                return true
            },
            _flashReady: function () {
                this.isReady = true;
                if ("onFlashReady" in this.options && typeof this.options.onFlashReady == "function") {
                    this.options.onFlashReady()
                }
                this.trigger("flashReady")
            },
            _uploadBase64Complete: function (a) {
                this.trigger("uploadComplete", a)
            },
            _uploadBase64Error: function () {
                this.trigger("uploadError")
            },
            _remote: function () {
                var a = this,
                    b = arguments;
                this._createFlash();
                if (this.isReady) {
                    a.flashObj.remote.apply(a.flashObj, b)
                } else {
                    this.bind("flashReady", function () {
                        a.flashObj.remote.apply(a.flashObj, b)
                    })
                }
            },
            load: function (a) {
                this._remote("loadImage", a)
            },
            uploadBase64: function (a, b, c) {
                this._remote("uploadBase64", a, b, c)
            }
        }
    });
}



///// Initialization /////

try {
    var usWin = window.unsafeWindow || getUnsafeWindow(),
        textarea = document.querySelector('#editor .tb-editor-editarea');
    
    var isTarget = /^http:\/\/tieba\.baidu\.com\/(?:f\?.*?\b(?:kw|kz|z)=[^&]|p\/)/i;
    
    if (!isTarget.test(location.href)) {
        return;
    }
    
    var count, max;
    
    textarea.addEventListener('drop', function (e) {
        var files = e.dataTransfer.files;
        
        if (files.length === 0) {
            return
        }
        
        e.preventDefault();
        count = 0;
        max = files.length;
        usWin.$.SimplePopupMsg.show(
            '\u51C6\u5907\u4E0A\u4F20 ' + max + ' \u5E45\u56FE\u7247\u2026\u2026',
            '_DITE_' + new Date().getTime(),
            2000
        );
        uploadImages(files);
    }, false);
    
    textarea.addEventListener('paste', function (e) {
        if (!e.clipboardData) {
            throw 'DITE.user.js: e.clipboardData, Firefox not supported.';
            return;
        }
        
        var clipboard = e.clipboardData,
            items = clipboard.items;
        
        Array.prototype.forEach.call(items, function (item, i) {
            if (item.kind === 'file') {
                usWin.$.SimplePopupMsg.show(
                    '\u51C6\u5907\u4E0A\u4F20 ' + 1 + ' \u5E45\u56FE\u7247\u2026\u2026',
                    '_DITE_' + new Date().getTime(),
                    2000
                );
                uploadImages([ item.getAsFile() ]);
            }
        });
    }, false);
} catch (err) {
    throw new Error('DITE: ' + err.message);
}