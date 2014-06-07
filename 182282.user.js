// ==UserScript==
// @name            Dz_Avatar
// @author          aa65535
// @version         1.06
// @lastmodified    2013-12-02 20:29:17
// @run-at          document-end
// @description     自定义上传Discuz论坛长头像
// @namespace       Rin Satsuki
// @updateURL       https://userscripts.org/scripts/source/182282.meta.js
// @downloadURL     https://userscripts.org/scripts/source/182282.user.js
// @include         http://*/home.php?mod=spacecp&ac=avatar*
// @copyright       2013+ Rin Satsuki
// ==/UserScript==

(function($) {
    'use strict';
    var i,
        nm,
        hex,
        form,
        ascii,
        inputs,
        posturl,
        avatarfw,
        getAvatar,
        avatardata,
        tempelement,
        avatarstatus,
        insertelement;
    for (i = 0; i < document.forms.length; i++) {
        if (document.forms[i].action.indexOf('ac=avatar') > 0) {
            form = document.forms[i];
            break;
        }
    }
    if (!form) {
        throw new Error('Avatar Upload Form Not Found!');
    }
    hex = function(n) {
        return n < 16 ? '0' + n.toString(16) : n.toString(16);
    };
    ascii = function(o) {
        var i, arr, len, rst = '';
        arr = new Uint8Array(o);
        len = arr.length;
        for (i = 0; i < len; i++) {
            rst += hex(arr[i]);
        }
        return rst.toUpperCase();
    };
    getAvatar = function(e) {
        var time, input, reader, imgs, type;
        input = e.target;
        time = Date.now();
        imgs = input.files;
        type = new RegExp('^image\\/(?:bmp|gif|jpeg|png)$', 'i');
        if (imgs.length === 0) {
            return;
        }
        if (!type.test(imgs[0].type)) {
            avatarstatus.textContent = '你必须选择一个有效的图像文件！';
            return;
        }
        if (2097152 < imgs[0].size) {
            avatarstatus.textContent = '选择的图像文件体积过大，请调整至合理范围！';
            return;
        }
        reader = new FileReader();
        reader.readAsArrayBuffer(imgs[0]);
        reader.onload = function() {
            avatardata[input.id] = ascii(this.result);
            avatarstatus.textContent = nm[input.id] + '解析完成，用时 ' + (Date.now() - time) + '毫秒。';
        };
    };
    nm = {avatar1: '大头像', avatar2: '中头像', avatar3: '小头像'};
    avatardata = {};
    posturl = document.getElementsByName('mycamera')[0].src
        .replace('images/camera.swf', 'index.php')
        .replace(/&uploadSize=\d+/, '&m=user&a=rectavatar');
    tempelement = document.createElement('div');
    tempelement.innerHTML = '<table cellspacing="0" cellpadding="0" class="tfm"><caption>' +
        '<h2 class="xs2">上传自定义头像</h2><p>' +
        '选择好三张图片，待全部解析完成后点击上传头像按钮即可开始上传<br/>' +
        '支持的图片格式：JPG JPEG PNG GIF，图片总体积小于 1MB<br/>' +
        '注意：因为是直接上传原图，请在上传之前调整好你的图片尺寸，尺寸建议参考' +
        '<a href="//userscripts.org/scripts/show/182282" target="_blank" style="color:red">这里</a>' +
        '</p></caption><tbody><style type="text/css">' +
        '#avatar_status{font-size:12px;color:#F00}.avatar_input{outline:0}</style><tr><td>' +
        '<p><span>' + nm.avatar1 + '：</span><input type="file" class="avatar_input" id="avatar1"></p>' +
        '<p><span>' + nm.avatar2 + '：</span><input type="file" class="avatar_input" id="avatar2"></p>' +
        '<p><span>' + nm.avatar3 + '：</span><input type="file" class="avatar_input" id="avatar3"></p>' +
        '<p><span id="avatar_status"></span></p></td></tr>' +
        '<tr><td><button type="button" id="uploadavatar" class="pn pnc">' +
        '<strong>上传头像</strong></button></td></tr></tbody></table>';
    for (i = form.childNodes.length; 0 < i; i--) {
        insertelement = form.childNodes[i - 1];
        if (insertelement.className == 'tfm') {
            break;
        }
    }
    form.insertBefore(tempelement.firstChild, insertelement);
    avatarstatus = $('avatar_status');
    inputs = document.querySelectorAll('.avatar_input');
    for (i = 0; i < inputs.length; i++) {
        inputs[i].onchange = getAvatar;
    }
    $('uploadavatar').onclick = function() {
        if (!avatardata.avatar1 || !avatardata.avatar2 || !avatardata.avatar3) {
            avatarstatus.textContent = '错误：需要三张头像全部解析完成才能上传！';
            return;
        }
        avatarstatus.textContent = '正在上传头像，请等待一会……';
        var postdata = 'avatar1=' + avatardata.avatar1 + '&avatar2=' + avatardata.avatar2 + '&avatar3=' +
            avatardata.avatar3 + '0D0A55706C6F616420627920447A5F417661746172&urlReaderTS=' + Date.now();
        GM_xmlhttpRequest({
            method: 'POST',
            url: posturl,
            data: postdata,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-type': 'application/x-www-form-urlencoded'
            },
            onload: function(s) {
                if (s.responseText.indexOf('success="1"') > 0) {
                    avatarstatus.textContent = '头像上传成功！即将自动刷新页面……';
                    setTimeout(function() {location.reload();}, 3000);
                } else if (s.responseText.indexOf('success="0"') > 0) {
                    avatarstatus.textContent = '头像上传失败！文件格式错误，且当前头像已经被重置。';
                } else if (s.responseText.indexOf('value="-1"') > 0) {
                    avatarstatus.textContent = '头像上传失败！当前登录状态失效。';
                } else if (s.responseText.indexOf('value="-2"') > 0) {
                    avatarstatus.textContent = '头像上传失败！你可能上传了空文件。';
                } else {
                    avatarstatus.textContent = s;
                }
            }
        });
    };
} (function(id) {
    return document.getElementById(id);
}));