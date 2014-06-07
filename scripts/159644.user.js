// ==UserScript==
// @id             tieba_simple_picview
// @name           百度贴吧科学看图君
// @version        1.4
// @namespace      jiayiming
// @author         jiayiming
// @description    去除百度贴吧的连续看图模式，改为点击新标签打开无水印原图，同时支持帖子预览中“查看大图”按钮。
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?*
// @include        http://tieba.baidu.com/i/*
// @updateURL      https://userscripts.org/scripts/source/159644.meta.js
// @downloadURL    https://userscripts.org/scripts/source/159644.user.js
// @run-at         document-end
// ==/UserScript==


(function(){
//window.addEventListener('DOMContentLoaded', function () {
	var $ = unsafeWindow.$;


/*	$(".BDE_Image").each(function (index) {
		var match = $(this).attr("src").match(/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/);
                GM_log(match);
		if (!match) {
			return;
		}
		var picSrc = "http://imgsrc.baidu.com/forum/pic/item" + match[0] + ".jpg";
		$(this).attr("onclick", "window.open('" + picSrc + "');");
	});
*/

        $(document).on('mousedown', '.BDE_Image', function(){
                $(this).unbind('click');
                //$(this).removeClass('BDE_Image');
                this.onclick = function(e){
                        if (e.button != 0)
                                return true;

                        var match = $(this).attr("src").match(/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/);
                        //GM_log(match);
                        if (!match) {
                                return;
                        }
                        var picSrc = "http://imgsrc.baidu.com/forum/pic/item" + match[0] + ".jpg";
                        window.open(picSrc);

                        e.preventDefault();
                        return false;
                };
        });

	// 帖子列表预览中图片添加鼠标经过事件，还原“查看大图”按钮链接
	$('.tb_icon_ypic').live('mouseover', function (e) {
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = 'http://imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
			//window.open(pic);
		}
	});

	// i贴吧帖子预览中图片添加鼠标经过事件，还原“查看大图”按钮链接
	$('.j_full').live('mouseover', function (e) {
		var d = this.href;
		if (d.indexOf('pic_id') > 0) {
			var start = d.indexOf('pic_id') + 7;
			var end = d.indexOf('&', start);
			var pic = 'http://imgsrc.baidu.com/forum/pic/item/' + d.substring(start, end) + '.jpg'
			this.href = pic;
		}
	});

//}, false);
})();