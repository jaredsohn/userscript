// ==UserScript==
// @name       Baidu Tieba Quote and Post 
// @version    2.2.2.0
// @downloadURL	https://userscripts.org/scripts/source/167852.user.js
// @updateURL	https://userscripts.org/scripts/source/167852.meta.js
// @icon	http://imgsrc.baidu.com/forum/pic/item/911e12087bf40ad13d03ebde552c11dfa8ecce89.jpeg
// @description	百度贴吧图片引用 作者:铅笔、修正:huhu
// @include      http://tieba.baidu.com/p/*
// @include      http://tieba.baidu.com.cn/p/*
// @include      http://tieba.baidu.cn/p/*
// @include      http://tieba.baidu.com/f*
// @include      http://tieba.baidu.com.cn/f*
// @include      http://tieba.baidu.cn/f*/f?*
// @copyright 5B4B
// ==/UserScript==

function init() {

    //////
    //// 设置
    //
    var font_family = '"微软雅黑"',
        font_size = '14px',
        line_height = '16px',
        font = font_size + ' ' + font_family,
        colour='';//自定义颜色，默认随机
    //////
    //// 产生引用内容
    //

    function addQuote(textarea, content, pid) {
        var canvas = $('<canvas>').attr({
            width: 0,
            height: 0
        }).get(0);
        var ctx,
            style = [
                'font-family:' + font_family,
                'font-weight:normal',
                'font-style:normal',
                'font-size:' + font_size,
                'line-height:' + line_height
            ].join(';'),
            metrix = measureText(content, style, 540);
            content=metrix.content;
        canvas.width = metrix.width + 10;
        canvas.height = metrix.height + 10;
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        ctx.setFillColor('transparent');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = font;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        content.trim().split(/[\n\r]/).forEach(function(str, i) {
            ctx.fillText(str, 5, 5 + 14 * i + 2 * i);
        });
        ctx.lineWidth=3;
        ctx.strokeStyle = colour||('#'+(Math.random()*0xffffff<<0).toString(16));
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        var savedURL = LetItGo.get('BTQP-PID-' + pid);
        if (savedURL) {
            addQuotePic(savedURL);
        } else {
            uploadPic({
                pid: pid,
                blob: dataURLtoBlob(canvas.toDataURL())
            }, addQuotePic);
        }
    }

    function addQuotePic(url, pid) {
        LetItGo.set('BTQP-PID-' + pid, url);
        $(textarea).find('.BDE_Image[pic_type="9"]:first')
            .attr('src', url).attr('pic_type', 1).attr('onload', 'EditorUI.resizeImage(this, 560)');
        //.removeAttr('pic_type');
        textarea.focus();
        var html = textarea.innerHTML;    
        document.execCommand('selectAll', false, null);    
        document.execCommand('insertHTML', false, html);
    }

    function uploadPic(data, callback) {
        var blob = data.blob,
            pid = data.pid;
        var xhr = new XMLHttpRequest(),
            size = blob.size;
        xhr.open('GET', 'http://tieba.baidu.com/dc/common/imgtbs?t=' + new Date().getTime(), true);
        xhr.onload = function() {
            var res = JSON.parse(this.responseText);
            if (res.no !== 0) {
                failedCallback();
            }
            var tbs = res.data.tbs,
                formData = new FormData();
            xhr.abort();
            xhr.open('POST', 'http://upload.tieba.baidu.com/upload/pic?is_wm=1&tbs=' + tbs, true);
            xhr.withCredentials = true;
            xhr.onload = function() {
                var res = JSON.parse(this.responseText);
                if (res.error_code !== 0) {
                    alert('上传图片失败！');
                    return;
                }
                var pic_url = 'http://imgsrc.baidu.com/forum/pic/item/' + res.info.pic_id_encode + '.jpg';
                callback(pic_url, pid);
            };
            formData.append('fid', PageData.forum.id);
            formData.append('Filename', 'blob.png');
            formData.append('file', blob);
            xhr.send(formData);
        };
        xhr.onerror = function() {
            alert('上传准备失败！');
        };
        xhr.send();
    }

    function dataURLtoBlob(dataURL) {
        var data = atob(dataURL.split(",")[1]),
            arrayBuffer = new ArrayBuffer(data.length),
            byteArray = new Uint8Array(arrayBuffer);
        for (var i = 0, l = data.length; i < l; ++i) {
            byteArray[i] = data.charCodeAt(i)
        }
        return new window.Blob([byteArray], {
            type: 'image/png'
        });
    }

    function measureText(content, style, width) {
        var res = '',
            text = content,
            maxwidth = 0;
        var canvas = $('<canvas>').attr({
            width: width,
            height: 100
        }).get(0),
            ctx;
        ctx = canvas.getContext('2d');
        ctx.font = font;
        for (var i = 0, l = text.length, line = '', tl, th, thx = 0; i < l; ++i) {
            tl = line + text[i];
            th = thx + ctx.measureText(tl).width;
            if (th <= width) {
                thx = th;
                res += tl
            } else {
                thx = ctx.measureText(text[i]).width;
                res += '\n' + text[i];
                line = '';
            }
            if (maxwidth < thx) maxwidth = thx;//console.log(maxwidth,res);
        }
        var body = window.document.body,
            dummy = $('<div>').html(res.replace(/[\n\r]/g, '<br/>')).attr('style', style).get(0),
            result = {};
        dummy.style.zIndex = '-1';
        dummy.style.display = 'block';
        dummy.style.width = '-webkit-fit-content';
        dummy.style.whiteSpace = 'pre';
        body.appendChild(dummy);
        result.width = maxwidth; //dummy.offsetWidth;
        result.height = dummy.offsetHeight;
        result.content = res;
        dummy.remove();
        return result;
    }


    //////
    //// 引用按钮
    //

    function addBtnsEvents() {
        $('.l_post').on('mouseover.btqp', '.j_lzl_wrapper', function(e) {
            var $self = $(e.currentTarget || this);
            if ($self.find('.btqp_btn_a').length <= 0) {
                var $partOne = $self.find('.p_tail');
                $partOne.append($('<li><span><a class="btqp_btn_a" btqp_n="false">简引</a> <a class="btqp_btn_a">引用</a></span></li>').find('a').css({
                    cursor: 'pointer'
                }).on('click.btqp', btnEventA).end());
            }
            if ($self.find('.btqp_btn_b').length <= 0) {
                var $partTwo = $self.find('.lzl_s_r');
                $partTwo.before($('<span><a class="btqp_btn_b" btqp_n="false">简引</a> | <a class="btqp_btn_b">引用</a> | </span>').find('a').css({
                    color: '#666',
                    cursor: 'pointer'
                }).on('click.btqp', btnEventB).end());
            }
        });
    }

    function btnEventA(e) {    
        e.stopPropagation();    
        e.preventDefault();

            
        var $self = $(e.currentTarget || this),
                  $post = $self.closest('.l_post'),
            toQuote = !$self.attr('btqp_n'),
                  content = $post.find('.d_post_content').html(),
                  info = JSON.parse($post.attr('data-field')),
            pid = info.content.id,
                  floor = info.content.floor,
                  user = info.author.name,
                  toAuthor = (PageData.thread.author === user),
            toSelf = (PageData.user.name === user),
                  atUser = ((toAuthor || toSelf) ? '@\u202D' : '@') + user + '&nbsp;';    
        modify(floor, atUser, content, pid, toQuote);

        return false;
    }

    function btnEventB(e) {    
        e.stopPropagation();    
        e.preventDefault();

            
        var $self = $(e.currentTarget || this),
               content = $self.closest('.lzl_content_reply').prevAll('.lzl_content_main').html(),
                  infoA = JSON.parse($self.closest('.l_post').attr('data-field')),
                  infoB = JSON.parse($self.closest('.lzl_single_post').attr('data-field')),
            toQuote = !$self.attr('btqp_n'),
                  floor = infoA.content.floor,
            pid = infoB.spid,
                  userB = infoB.user_name,
                  toAuthor = (PageData.thread.author === userB),
            toSelf = (PageData.user.name === userB),
                  atUser = ((toAuthor || toSelf) ? '@\u202D' : '@') + userB + '&nbsp;';    
        modify(floor, atUser, content, pid, toQuote);

        return false;
    }

      

    function modify(floor, atUser, content, pid, toQuote) {
        $textarea = $('#tb_rich_poster_container').find('#ueditor_replace');
        textarea = $textarea.get(-1);    
        var html = textarea.innerHTML,
            quote = '';    
        var reg = new RegExp('^回\\d+楼.+?\\u202D{2}.*?\\u202D{2}|^回\\d+楼(?: |&nbsp;)@\u202D?.+?(?: |&nbsp;)', 'i');    
        textarea.scrollIntoViewIfNeeded();    
        textarea.focus();    
        content = content.replace(/^回(?:<a[^>]+>)?\d+楼(?:<\/a>)?.+?<br>/g, '').replace(/<br.*?>/gi, '').replace(/<img.*?>/gi, '[图片]').replace(/<embed.*?>/gi, '[影音]').replace(/<div class="video_src_wrapper.*?<\/a><\/span><\/div>/gi, '[视频]').replace(/<div class="voice_player.*?<\/div>/gi, '[语音]').replace(/\u202D{2}.*?\u202D{2}/, '').replace(/\u202D/g, '').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/　/g, ' ');
        content = flat(content);    
        if (content.length > 250) {      
            content = content.substr(0, 250) + '\n...[省略N字]';    
        }
        //content = setWidth(content, 520);
        if (toQuote) {    
            quote = '<br>\u202D\u202D<img pic_type="9" class="BDE_Image" src="http://imgsrc.baidu.com/forum/pic/item/32645c086e061d958b03f63f7af40ad163d9cad2.png">\u202D\u202D';
        }    
        if (html.replace(/<br>|&nbsp;|&emsp;|\s/g, '') !== '') {      
            if (reg.test(html)) {        
                html = html.replace(reg, '回' + floor + '楼 ' + atUser + quote);      
            } else {        
                html = '回' + floor + '楼 ' + atUser + quote + '<br><br>' + html;      
            }    
        } else {      
            html = '回' + floor + '楼 ' + atUser + quote + '<br><br>&nbsp;';    
        }    
        document.execCommand('selectAll', false, null);    
        document.execCommand('insertHTML', false, html);
        if (toQuote) {
            addQuote(textarea, content, pid);
        }  
    }

    function flat(content) {
        content = content.replace(/<.+?>(.*?)<\/.+?>/gi, '$1');
        if (/<.+?>.*?<\/.+?>/.test(content)) {
            return flat(content);
        }
        return content.trim();
    }

    function byteLength(c) {
        return /[\x00-\xFF]/.test(c) ? 0.5 : 1;
    }


    //////
    //// 初始化
    //
    var LetItGo = {
        set: function(key, val) {
            sessionStorage.setItem(key, JSON.stringify(val));
        },
        get: function(key, def) {
            return JSON.parse(sessionStorage.getItem(key)) || def;
        }
    };  
    var $textarea, textarea;
    $(function() {   //$textarea = $('#editor').find('.tb-editor-editarea');
             //textarea = $textarea.get(-1);
        addBtnsEvents();
    });
}


//////
//// Initialization
//
var script = document.createElement('script');
script.id = '__5B4B_BTQP__';
script.charset = 'utf-8';
script.type = 'text/javascript';
script.innerHTML = 'try{(' + init.toString() + ')()}catch(e){console.log(e)}';
document.body.appendChild(script);