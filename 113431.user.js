// ==UserScript==
// @name           nightly mode
// @namespace      com.mozest.keijack
// @auther                Keijack
// @version        1.0.0
// @description    减低页面的亮度, 在黑暗中查看页面有助于保护眼镜(?)
// @include        *
// ==/UserScript==
/**
 * 以下是默认配置修改
 */
var showCoverDefault = true; //  true 为默认打开遮罩, false为默认不打开
var coverOpacity = 0.50; // 默认暗度
var link = true; // 为true, 会把所有的文字链接置到遮罩前方(可以点击文字链接), false 相反

/**
 * 以下是实现代码
 */
// 变量的定义
var cover = null; // 底层遮盖
var created = false; // 是否已经建立遮盖
var show = false; 

// 遮盖显示方法
function showCover(){
        if(!created){
                cover = document.createElement('div');
                cover.setAttribute('style', 'background: black; width: 100%; height: 100%; position: fixed; left: 0; bottom: 0; overflow: hidden; z-index: 100;');
                cover.style.opacity = new String(coverOpacity);
                document.body.appendChild(cover);
                // 链接的处理
                if(link){
                        var as = document.getElementsByTagName('a');
                        for(var i = 0; i < as.length; i++){
                                // 只处理文字链接
                                var aimgs = as.getElementsByTagName('img');
                                if(aimgs.length == 0 ){
                                        as.style.position = 'relative'; 
                                        as.style.zIndex = '101';
                                }
                        }
                }
                // 标识已创建
                created = true;
        } else {
                cover.style.display = '';
        }
        show = true;
}

// 遮盖的隐藏
function hideCover(){
        if(!created){
                return;
        }
        cover.style.display = 'none';
        show = false;
}

// 增加事件处理
window.addEventListener('keydown', function(e){
        if(e.altKey && e.keyCode == 116){ // alt + F5, 打开/关闭遮罩
                if(!show)
                        showCover();
                else
                        hideCover();
        } else if(e.altKey && e.keyCode == 38){ // alt + UP, 暗度升高
                if(!created){
                        return;
                }
                if(cover.style.opacity >= 1){
                        return;
                }
                var opacity = new Number(cover.style.opacity);
                opacity += 0.05;
                cover.style.opacity = new String(opacity);
        } else if(e.altKey && e.keyCode == 40){ // alt + DOWN, 暗度降低
                if(!created){
                        return;
                }
                if(cover.style.opacity <=0){
                        return;
                }
                var opacity = new Number(cover.style.opacity);
                opacity -= 0.05;
                cover.style.opacity = new String(opacity);
        } else if(e.altKey && e.keyCode == 117){ // alt + F6, 默认暗度
                if(!created){
                        return;
                }
                cover.style.opacity = new String(coverOpacity);
        }
}, true);

// 默认打开遮罩
if(showCoverDefault){
        showCover();
}