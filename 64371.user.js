// ==UserScript==
// @name           Resized Image Checker
// @description    Shows the list of resized images on your site.
// @author         陈成 <sorrycc@gmail.com>
// @version        0.1
// @date           2009-12-17
// @namespace      http://www.chencheng.org/
// @include        *
// ==/UserScript==

(function() {

    var console = unsafeWindow.console,
        imgs = document.images,
        i = 0, len = imgs.length,
        count = 0,
        el;

    /**
     * 打印信息
     */
    function log() {
        var i = 0, len = arguments.length,
            msg = [];

        if (!el) {
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('br'));
            document.body.appendChild(document.createElement('hr'));

            el = document.createElement('div');
            el.style.textAlign = 'left';
            document.body.appendChild(el);
        }

        for (; i<len; i++) {
            if (arguments[i].src) {
                msg.push('<img src="'+arguments[i].src+'" />');
            } else {
                msg.push(arguments[i]);
            }
        }

        el.innerHTML += '<p>'+msg+'</p>';
        el.scrollIntoView(true);
    }

    /**
     * 检查图片尺寸是否和原始尺寸一致
     */
    function ShowResizedImages() {
        if (typeof console === 'undefined') {
            console = {
                log:    log,
                info:   log
            };
        }

        console.log('Checking "'+location.href+'" ...');

        for (; i<len; i++) {
            var img = imgs[i],
                width = img.width,
                height = img.height,
                newImg = new Image();

            // 过滤统计代码图片，通常统计代码宽高为0
            if (width === 0 || height === 0) continue;

            newImg.src = img.src;

            if (newImg.width > width || newImg.height > height) {
                count ++;
                console.info(img, '压缩尺寸：'+width+'x'+height, '实际尺寸：'+newImg.width+'x'+newImg.height);
            }
        }

        console.log(count === 0 ? 'resized images = 0, total images = '+len+' perfect!!!!!!!' : 'resized images = '+count+', total images = ' + len);
    };

    // 添加GM命令菜单
    GM_registerMenuCommand('Show Resized Images', ShowResizedImages);

})();