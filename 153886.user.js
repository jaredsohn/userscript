// ==UserScript==
// @name        百度贴吧文字图片化工具
// @description 将你输入的文字转换为图片，并插入到回复框中。
// @namespace   Hello, BTTTI!
// @version     1.3
// @grant       none
// @include     http://tieba.baidu.com/*
// @run-at      document-start
// @downloadURL https://ge.tt/api/1/files/9qnNLYO/2/blob?download
// ==/UserScript==


var usWin;

function getUnsafeWindow() {
    var div = document.createElement('div');

    div.setAttribute('onclick', 'return window;');
    return div.onclick();
}

function upload(dataURL) {
    function uploadedHandler(a, d) {
        var c = usWin.$.json.decode(d);
        if (c.error_code != 0) {
            alert("\u56FE\u7247\u4E0A\u4F20\u5931\u8D25\uFF01")
        } else {
            var b = c.info.pic_id_encode;
            var e = 'http://imgsrc.baidu.com/forum/pic/item/' + b + '.png';

            document.querySelector('#editor .tb-editor-editarea').focus();
            usWin.rich_postor._editor.execCommand("insertimage", e);
            usWin.FlashImageLoader.unbind('uploadComplete', arguments.callee);
        }
    }

    function callback(tbs) {
        usWin.FlashImageLoader.bind('uploadComplete', uploadedHandler);
        usWin.FlashImageLoader.uploadBase64('http://upload.tieba.baidu.com/upload/pic', dataURL.replace(/^.*?base64,/, ''), {
            tbs: tbs
        });
    }

    usWin.$.ajax({
        url: 'http://tieba.baidu.com/dc/common/imgtbs',
        dataType: 'json',
        success: function (c) {
            if (c && c.data && c.data.tbs) {
                callback(c.data.tbs);
            }
        }
    });
}

function $(queryString, dom) {
    return (dom || document).querySelector(queryString);
}

function $$(queryString, dom) {
    var doms = (dom || document).querySelectorAll(queryString),
        ret = [];

    for (var i = 0, l = doms.length; i < l; ++i) {
        ret.push(doms[i]);
    }
    return ret;
}

function DOM(name, props, attrs, style) {
    var elm = document.createElement(name);

    for (var p in props) {
        elm[p] = props[p];
    }
    for (var a in attrs) {
        elm.setAttribute(a, attrs[a]);
    }
    for (var c in style) {
        elm.style[c] = style[c];
    }
    return elm;
}

function CrystalBoard() {
    var main = this,
        container = DOM('div', {
            innerHTML: '<style type="text/css" charset="utf-8">#BTTTI_content{width:503px;height:200px}#BTTTI_main fieldset{border:2px groove threedface!important;width:500px;padding:0;margin:5px 0 0 0}#BTTTI_advanced label{margin-right:5px}#BTTTI_action button{margin:10px}#BTTTI_basic input,#BTTTI_basic select{width:80px;margin-right:10px}#BTTTI_main input[type="color"]{padding:0;border:none;background:rgba(0,0,0,0.5);border-radius:5px;margin-bottom:-5px}#BTTTI_add,#BTTTI_del{font-family:monospace;font-weight:bolder;border:1px solid black;margin-right:2px}</style><textarea id="BTTTI_content"></textarea><fieldset id="BTTTI_basic"><legend>&#26222;&#36890;&#35774;&#32622;</legend><label>&#23383;&#20307;&#65306;</label><span id="BTTTI_add">+</span><span id="BTTTI_del">-</span><select id="BTTTI_fFamily"type="text"></select><label>&#22823;&#23567;&#65306;(px)</label><input id="BTTTI_fSize"type="number"min="1"max="30"value="14"/><label>&#39068;&#33394;&#65306;</label><input id="BTTTI_fColor"type="color"/></fieldset><fieldset id="BTTTI_advanced"><legend>&#36827;&#38454;&#35774;&#32622;</legend><input id="BTTTI_bColor"type="color" value="#FFFFFF" /><label>&#32972;&#26223;&#39068;&#33394;</label><input id="BTTTI_transparent"type="checkbox" checked="true"/><label>&#36879;&#26126;&#32972;&#26223;</label><input id="BTTTI_fBold"type="checkbox"/><label>&#31895;&#20307;</label><input id="BTTTI_fItalic"type="checkbox"/><label>&#26012;&#20307;</label><label>&#36879;&#26126;&#24230;&#65306;(px)</label><input id="BTTTI_alpha"type="number"min="0.0"max="1.0"value="1.0"step="0.05"/></fieldset><section id="BTTTI_action"><button id="BTTTI_preview"type="button">&#36716;&#25442;&#20026;&#22270;&#29255;</button><button id="BTTTI_upload"type="submit">&#25554;&#20837;&#22270;&#29255;</button><button id="BTTTI_exit"type="button">&#36864;&#20986;</button></section>'
        }, {
            id: 'BTTTI_main'
        }, {
            outline: 'black double 3px',
            display: 'inline-block',
            position: 'absolute',
            left: '50%',
            top: window.scrollY + 15 + 'px',
            marginLeft: '-252px',
            background: 'white',
            fontSize: '14px',
            padding: '5px',
            zIndex: '99999'
        });

    this.container = container;
    this._options = JSON.parse(localStorage.getItem('BTTTI_options')) || {
        fSize: 14,
        fFamily: '\u5B8B\u4F53',
        fIndex: 0,
        fItalic: false,
        fBold: false,
        fColor: 'black',
        bColor: 'transparent',
        transparent: true,
        alpha: 1.0,
        fList: [
            '\u5B8B\u4F53',
            'Microsoft YaHei',
            '\u660E\u5170'
        ]
    };
    document.documentElement.appendChild(container);
    container.appendChild(DOM('canvas', null, {
        width: 0,
        height: 0
    }));
    this.init(container);
}

CrystalBoard.prototype = {
    get options() {
        return this._options;
    },
    set options(opts) {
        this._options = opts;
    },
    remove: function () {
        this.ready = false;
        this.container.parentNode.removeChild(this.container);
    },
    drawText: function (text) {
        this.canvas = this.container.querySelector('canvas');

        var opts = this.options,
            canvas = this.canvas,
            ctx,
            style = [
                (opts.fFamily ? 'font-family:"' + opts.fFamily + '"' : 'font-family:"\u5B8B\u4F53') + ',monospace',
                opts.fBold ? 'font-weight:bolder' : 'font-weight:normal',
                opts.fItalic ? 'font-style:oblique' : 'font-style:normal',
                opts.fSize ? 'font-size:' + opts.fSize + 'px' : 'font-size:14px',
                'line-height:' + opts.fSize * 1.1 + 'px'
            ].join(';'),
            metrix = this.measureText(text, style);

        canvas.width = 5 + metrix.width
            + (opts.fBold ? opts.fSize*0.1 : 0)
            + (opts.fItalic ? opts.fSize*0.38 : 0);
        canvas.height = 10 + metrix.height;
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = ((opts.alpha >= 0) && (opts.alpha <= 1)) ? opts.alpha : 1.0;
        ctx.setFillColor(opts.transparent ? 'transparent' : (opts.bColor || 'white'));
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = opts.fColor || 'black';
        ctx.font = (opts.fItalic ? 'italic ' : '') + (opts.fBold ? 'bold ' : '') + [
            (opts.fSize || 14) + 'px',
            opts.fFamily || '\u5B8B\u4F53',
            ', monospace'
        ].join(' ');
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        text.trim().split(/[\n\r]/).forEach(function (str, i) {
            ctx.fillText(str, 5, 5 + (opts.fSize || 14) * i + opts.fSize * 0.1 * (i > 0 ? 1 : 0));
        });
        this.ready = true;
    },
    measureText: function(content, style) {
        var body = document.body,
            dummy = DOM('div', {
                innerHTML: content.replace(/[\n\r]/g, '<br/>')
            }, {
                style: style
            }),
            result = {};

        dummy.style.zIndex = '-1';
        dummy.style.display = 'inline-block';
        dummy.style.whiteSpace = 'pre';
        body.appendChild(dummy);
        result.width = dummy.offsetWidth;
        result.height = dummy.offsetHeight;
        body.removeChild(dummy);

        return result;
    },
    init: function (container) {
        var main = this,
            opts = main.options,
            textarea = container.querySelector('#BTTTI_content'),
            fontFamily = container.querySelector('#BTTTI_fFamily'),
            fontSize = container.querySelector('#BTTTI_fSize'),
            fontColor = container.querySelector('#BTTTI_fColor'),
            fontBold = container.querySelector('#BTTTI_fBold'),
            fontItalic = container.querySelector('#BTTTI_fItalic'),
            backgroundColor = container.querySelector('#BTTTI_bColor'),
            tBackground = container.querySelector('#BTTTI_transparent'),
            alpha = container.querySelector('#BTTTI_alpha'),
            addBtn = container.querySelector('#BTTTI_add'),
            delBtn = container.querySelector('#BTTTI_del'),
            uploadBtn = container.querySelector('#BTTTI_upload'),
            previewBtn = container.querySelector('#BTTTI_preview'),
            exitBtn = container.querySelector('#BTTTI_exit'),
            fontList;
        
        if (opts.fList.length > 0) {
            fontList = opts.fList;
        } else {
            fontList = [
                '\u5B8B\u4F53',
                'Microsoft YaHei',
                '\u660E\u5170'
            ];
            opts.fIndex = 0;
        }
        fontList.forEach(function(name) {
            fontFamily.appendChild(DOM('option', {
                textContent: name
            }, {
                value: name
            }));
        });
        fontFamily.selectedIndex = opts.fIndex;

        [ fontSize, fontColor, backgroundColor, alpha ]
        .forEach(function (dom) {
            dom.value = opts[dom.id.substr(6)] || dom.value;
        });
        [ fontBold, fontItalic, tBackground ].forEach(function (dom) {
            var value = opts[dom.id.substr(6)];

            dom.checked = (value !== undefined) ? value : dom.checked;
        });

        delBtn.addEventListener('click', function () {
            fontFamily.removeChild(fontFamily.children[fontFamily.selectedIndex]);
        }, false);

        addBtn.addEventListener('click', function () {
            var name = prompt('\u8BF7\u8F93\u5165\u4F60\u8981\u6DFB\u52A0\u7684\u7CFB\u7EDF\u5B57\u4F53\u7684\u540D\u5B57');

            if (name !== null) {
                fontFamily.appendChild(DOM('option', {
                    textContent: name
                }, {
                    value: name
                }));
                fontFamily.selectedIndex = fontFamily.children.length - 1;
            }
        }, false);

        previewBtn.addEventListener('click', function () {
            var text = textarea.value;

            opts.fFamily = fontFamily.value;
            opts.fSize = fontSize.value;
            opts.fColor = fontColor.value;
            opts.bColor = backgroundColor.value;
            opts.alpha = alpha.value;
            opts.fBold = fontBold.checked;
            opts.fItalic = fontItalic.checked;
            opts.transparent = tBackground.checked;
            opts.fIndex = fontFamily.selectedIndex;
            opts.fList = Array.prototype.map.call(fontFamily.querySelectorAll('option'), function (o) {
                return o.value;
            });
            localStorage.setItem('BTTTI_options', JSON.stringify(opts));
            main.drawText(text);
        }, false);

        uploadBtn.addEventListener('click', function () {
            if (main.ready) {
                upload(main.canvas.toDataURL());
            }
            main.remove();
        }, false);

        exitBtn.addEventListener('click', function () {
            main.remove();
        }, false);
    }
};

function init() {
    // global
    usWin = window.unsafeWindow || getUnsafeWindow();

    if (!usWin.FlashImageLoader) {
        usWin.$.JsLoadManager.use("http://static.tieba.baidu.com/tb/static-frs/component/sign_shai/flash_image_loader.js");
    }

    var editor = $('#editor'),
        submitBtn = $('.subbtn_bg[type="submit"]', editor);

    var cbBtn = DOM('input', null, {
        type: 'button',
        id: 'BTTTI_start',
        class: 'subbtn_bg',
        value: '\u56FE\u7247\u5316'
    }, {
        marginRight: '5px'
    });

    if ($$('#BTTTI_start', editor).length === 0) {
        submitBtn.parentNode.insertBefore(cbBtn, submitBtn);
        cbBtn.addEventListener('click', function () {
            new CrystalBoard();
        }, false);
    }
}


// Let's go!
window.addEventListener('load', init, false);
