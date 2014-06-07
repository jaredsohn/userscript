// ==UserScript==
// @name           fanfou Thick Pic
// @namespace      http://www.paopao.name
// @description    用 Thick Box 的方式来预览带图片的饭否消息的原图片
// @version        0.11
// @author         paopao
// @include        http://fanfou.com*
// @exclude        http://fanfou.com/photo/*
// ==/UserScript==

(function(){

        // 添加 CSS 样式
        var style = document.createElement("style");
        style.innerHTML = "div#greyBG{position:fixed;top:0;left:0;width:300px;height:300px;z-index:1001;background-color:#808080;opacity:0.6;display:none;}div#greyBG img.loading{position:fixed;top:50%;left:50%;}img#thickpic{position:absolute;top:0;left:0;z-index:1010;top:60px;left:25%;border:5px solid white;display:none;}";
        document.getElementsByTagName("head")[0].appendChild(style);
        
        // 准备灰色背景框
        var greyBG = document.createElement("div");
        greyBG.setAttribute("id","greyBG");
        greyBG.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />'
        document.getElementsByTagName("body")[0].appendChild(greyBG);
        var loading = greyBG.getElementsByTagName("img")[0]
        greyBG.addEventListener("click", hideAll, false);

        // 准备图片框
        var thickpic = document.createElement("img");
        thickpic.setAttribute("id","thickpic");
        thickpic.src = "";
        document.getElementsByTagName("body")[0].appendChild(thickpic);
        thickpic.addEventListener("click", hideAll, false);

        // 窗口大小变化时修改背景大小
        window.addEventListener("resize", stickBG, false);

        // 查找和遍历图片链接
        var spans = document.getElementsByTagName("a");
        for(var i=0; i < spans.length; i++) {
            if(spans[i].className == "photo") {
                var myimg = spans[i].getElementsByTagName("img")[0];
                myimg.addEventListener("click", fanfouThickPic, false);
            }
        }

        // 保持背景覆盖可视区域
        function stickBG() {
            // 背景层大小
            greyBG.style.width = window.innerWidth + "px";
            greyBG.style.height = window.innerHeight + "px";
            // loading图片位置
            loading.style.left = (window.innerWidth - 16) / 2 + "px";
            loading.style.top = (window.innerHeight - 16) / 2 + "px";
            // 修改图片位置至正中
            thickpic.style.top = ((window.innerHeight - thickpic.offsetHeight) / 2 + window.pageYOffset ) + "px";
            thickpic.style.left = ((window.innerWidth - thickpic.offsetWidth) / 2 + window.pageXOffset ) + "px";
        }

        // 点击时开始载入图片
        function fanfouThickPic(e) {
            stickBG();
            greyBG.style.display = "block";
            //loading.style.display = "block";
            srcs = this.src.match(/(http:\/\/photo\.fanfou\.com\/)[mt](\d?\/.*)/i);
            if(srcs) {
                thickpic.addEventListener("load", showpic, false);
                thickpic.src = srcs[1]+'n'+srcs[2];
                e.preventDefault();
            }
        }

        // 图片载入完成后显示图片
        function showpic() {
            if(greyBG.style.display == "block") {
                thickpic.style.top = 60 + window.pageYOffset + "px";
                thickpic.style.left = 60 + window.pageXOffset + "px";
                thickpic.style.display = "block";
                // 修改图片位置至正中
                thickpic.style.top = ((window.innerHeight - thickpic.offsetHeight) / 2 + window.pageYOffset ) + "px";
                thickpic.style.left = ((window.innerWidth - thickpic.offsetWidth) / 2 + window.pageXOffset ) + "px";
                // 隐藏 loading 图片
                loading.style.display = "none";
            }
        }

        // 隐藏背景和图片框
        function hideAll() {
            greyBG.style.display = "none";
            loading.style.display = "block";
            thickpic.style.display = "none";
            thickpic.src = '';
        }

})();