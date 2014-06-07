// ==UserScript==
// @name        百度贴吧图片放大
// @namespace   http://blog.sbw.so/
// @description 鼠标移动到上面时放大，移走还原。
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*
// @author      o丨Reborn <sbwtws@gmail.com>
// @updateURL   https://userscripts.org/scripts/source/156914.meta.js
// @downloadURL https://userscripts.org/scripts/source/156914.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// @version     14-03-19.1
// ==/UserScript==

//14-03-19.1    为了实现拖拽图片,将鼠标按下放大改为点击放大
//14-03-18.1    修复右键点击时关闭图片
//14-03-17.2	解决百度异步加载时图片无效
//13-01-29.1	解决楼中视频无法播放的bug
//13-01-25.1    防止图片缩过小无法关闭,解决个别图片脚本不生效,保留收藏图片功能,去除百度小图不能收藏的bug
//13-01-23.2    修复在看大图时不能右键下载,新增鼠标滚动调整大小功能:w
//13-01-23.1    应网友建议,将双击移除图片改为单击移除.
//13-01-22.1    去掉了一个ajax查询,应该能快点,图片显示从左上角改为居中
//13-01-21.4    一些小改动
//13-01-21.3    支持同时点开多个图片
//13-01-21.2    解决拖动卡
//13-01-21.1    解决图片位置错乱

(function(){
    var $=unsafeWindow.$;
    var _clock = null;

    function addPicture(img){
        if (img.width < 50)
            return ;
        
        $(img).css({
            'position':'fixed',
            'z-index':'999',
            'box-shadow':'0 0 50px #333',
            'border':'1px dashed hsl(40, 50%, 30%)',
            'top':'50%',
            'left':'50%',
            'margin-top':parseInt(img.height) / -2 + 'px',
            'margin-left':parseInt(img.width) / -2 + 'px'
        });

        document.body.appendChild(img);

        clearInterval(_clock);
    }
    
    function pictureScroll(e) {
        var width = $(this)[0].width - e.detail * 15;
    //    $(this)[0].width = width < 100 ? 100 : width;
        $(this).attr({
            'width' : width < 100 ? 100 : width,
            'height' : ''
        });

        $(this).css({
            'margin-top':parseInt($(this)[0].height) / -2 + 'px',
            'margin-left':parseInt($(this)[0].width) / -2 + 'px'
        });

        e.preventDefault();
        return false;
    }
    
    function picMouseDown(e){
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var oldX = parseInt($(this).css('left'));
        var oldY = parseInt($(this).css('top'));
        var close = true;
        
        $(document).bind('mousemove',function(e){
            $(this).css({
                'top':e.pageY - mouseY + oldY + 'px',
                'left':e.pageX - mouseX + oldX + 'px'
            });
            close = false;
        });
        
        $(document).mouseup(function(e){
            if (close)
                $(this).remove();
            $(document).unbind('mousemove');
        });
        
        e.preventDefault();
        return false;
    }

    function pictureView(e){
        if (e.button != 0)
            return true;
       
//        $(this).unbind('click');
       
        var reg=/\/[a-z0-9]{20,}\.[a-zA-Z]{3,}/;
        var match=$(this).attr("src").match(reg);
        
        if(!match)
           return;
        
        var img = document.createElement('img');
        img.src="http://imgsrc.baidu.com/forum/pic/item" + match[0];

//        $(img).one('load', function() {
//            $(img).css({
//                'margin-top':parseInt(this.height) / -2 + 'px',
//                'margin-left':parseInt(this.width) / -2 + 'px'
//            });
//        }).each(function() {
//              if(this.complete) 
//                  $(this).load();
//        });
        
        img.addEventListener('DOMMouseScroll', pictureScroll);
        $(img).mousedown(function(e){
            if (e.button != 0)
                return false;

            var mouseX=e.pageX;
            var mouseY=e.pageY;
            var oldX=parseInt($(this).css('left'));
            var oldY=parseInt($(this).css('top'));
            var remove = true;
            $(document).bind('mousemove',function(e){
                $(img).css({
                    'top':e.pageY - mouseY + oldY,
                    'left':e.pageX - mouseX + oldX
                });
                remove = false;
            });
            $(document).mouseup(function(e){
                if (remove)
                    $(img).remove();
                $(document).unbind('mousemove');
            });
    //		e.preventDefault();
            return false;
        });

        // 添加图片
        _clock = setInterval(function(){
            addPicture(img);
        }, 50);

        e.preventDefault();
        return false;
    }

    window.addEventListener('DOMContentLoaded', function(){
        $(document).on('mousedown', '.BDE_Image', function(){
            $(this).unbind('click');
            $(this).removeClass('BDE_Image');
            this.onclick = pictureView;
        });
    },false);
})();



