// ==UserScript==
// @name           fanfouRF
// @namespace      http://www.paopao.name
// @description    为饭否的 home 页留言添加一个 RF (转自)键
// @version        0.2
// @author         paopao
// @include        http://fanfou.com*
// @resource       IMG_FANFOURF http://paosha.net/demo/img/fanfourf.gif
// ==/UserScript==

(function(){
        // 添加 CSS 样式
        var style = document.createElement("style");
        style.innerHTML += ".fanfourt{display:inline-block;display:-moz-inline-stack;width:40px;height:16px;overflow:hidden;background:url(http://paosha.net/demo/img/fanfourf.gif) 0 0 no-repeat;font-size:0!important;line-height:0;text-indent:-999em;vertical-align:middle;*zoom:1;}.fanfourt:hover{background-position:-40px 0;}#stream li .op a {margin-top:2px;}";
        document.getElementsByTagName("head")[0].appendChild(style);
        
        var stream = document.getElementById("stream");
        // 单个消息页面
        if(!stream) {
            var info = document.getElementById("info");
            if(!info) return false;
            var content = info.getElementsByTagName("h2")[0].innerHTML.replace(/<span.*/i, "");
            // 处理 @xx 的链接
            content = content.replace(/<a href="[^"]*" class="former">([^<]*)<\/a>/ig,"$1");
            // 处理被截断的 url
            content = content.replace(/<a href="([^"]*)"[^>]*>[^<]*<\/a>/ig, "$1");
            // 处理 HTML 标签
            content = content.replace(/<.*?>/ig,"");
            var author = '';
            var spans = info.getElementsByTagName("h2")[0].getElementsByTagName("span");
            for(var j=0; j < spans.length; j++) {
                if(spans[j].className == "op") {
                    // 不处理自己发出的消息
                    if (spans[j].getElementsByTagName("a")[0].className != "reply") {
                        continue;
                    }
                    // 消息的作者
                    author = spans[j].getElementsByTagName("a")[0].innerHTML.replace("回复","RF @");
                    // 添加 RF 键
                    var a = document.createElement("a");
                    a.className="fanfourt";
                    a.innerHTML="转自";
                    a.rel = author + " " + content;
                    // 截断超过140个字的消息
                    if(a.rel.length > 140) {
                        a.rel = a.rel.substring(0,137) + "...";
                    }
                    sendstatus(a);
                    spans[j].appendChild(a);
                }
            }
            return true;
        }

        // 查找和遍历消息
        var els = stream.getElementsByTagName("li");
        for(var i=0; i < els.length; i++) {
            if(els[i].className == "unlight" || els[i].className == "") {
                var spans = els[i].getElementsByTagName("span");
                var content = '', author = '';
                for(var j=0; j < spans.length; j++) {
                    if(spans[j].className == "content") {
                        // 处理 @xx 的链接
                        content = spans[j].innerHTML.replace(/<a href="[^"]*" class="former">([^<]*)<\/a>/ig,"$1");
                        // 处理被截断的 url
                        content = content.replace(/<a href="([^"]*)"[^>]*>[^<]*<\/a>/ig, "$1");
                        // 处理 HTML 标签
                        content = content.replace(/<.*?>/ig,"");
                    } else if(spans[j].className == "op") {
                        // 消息的作者
                        author = spans[j].getElementsByTagName("a")[0].innerHTML.replace("回复","RF @");
                        // 添加 RF 键
                        var a = document.createElement("a");
                        a.className="fanfourt";
                        a.innerHTML="转自";
                        a.rel = author + " " + content;
                        // 截断超过140个字的消息
                        if(a.rel.length > 140) {
                            a.rel = a.rel.substring(0,137) + "...";
                        }
                        sendstatus(a);
                        spans[j].appendChild(a);
                    }
                }
            }
        }

        // 发送消息的函数
        function sendstatus(a){
            var url = window.location.toString();
            // 如果在自己的 home 页
            if(url.indexOf("/home")>=0) {
                // 为 RF 键绑定点击事件
                a.addEventListener("click",function(){
                        // 修改消息发表框的内容为转帖内容
                        document.getElementById("update").getElementsByTagName("textarea")[0].value = this.rel;
                        // 转至发表框
                        var url = window.location.toString();
                        var myindex = url.indexOf('#');
                        if(myindex >= 0 ) {
                            window.location = url.substring(0,myindex) + "#update";
                        } else {
                            window.location += "#update";
                        }
                        // 提交表单
                        //document.getElementById("message").submit();
                    },false);
            } else {
                // 不在自己的 home 页
                a.href = '/home?status=' + encodeURIComponent(a.rel);
            }
        }
})();