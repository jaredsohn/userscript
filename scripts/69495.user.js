// ==UserScript==
// @name           greendown
// @namespace      http://userscripts.org
// @description	  直接显示下载链接, 不过有乱码, 硬替换的
// @include        http://www.greendown.cn/soft/*
// ==/UserScript==

(function() {

    function getScript(src) {
        GM_xmlhttpRequest({
            method : 'get',
            url : src,
            onload : function(detail) {
                var txt = detail.responseText
                
                // 分析找到下载地址的 div 段代码, 扔到原位置
                var start = txt.indexOf('<div class="cp-main">')
                var end = txt.indexOf('</div>', start) + 6
                var tmp = document.createElement('span')
                tmp.innerHTML = txt.substring(start, end).replace(/<li><a.*?href="#".*?\/li>/g, '')
                var aList = tmp.getElementsByTagName('a')
                for(var j = 0; j < aList.length; j++) {
                    var a = aList[j]
                    if(a.href.indexOf('soft1.greendown') > 0)
                        a.innerHTML = '上海阳光互联'
                    else if(a.href.indexOf('soft3.greendown') > 0)
                        a.innerHTML = '常州电信下载'
                    else if(a.href.indexOf('soft4.greendown') > 0)
                        a.innerHTML = '四川电信下载'
                    else if(a.href.indexOf('soft5.greendown') > 0)
                        a.innerHTML = '江苏电信下载'
                    else if(a.href.indexOf('soft6.greendown') > 0)
                        a.innerHTML = '安徽炎黄数据'
                    else if(a.href.indexOf('soft8.greendown') > 0)
                        a.innerHTML = '浙江电信下载'
                    else if(a.href.indexOf('ckdown.greendown') > 0)
                        a.innerHTML = '青岛长宽下载'
                    else if(a.href.indexOf('ydsoft.greendown') > 0)
                        a.innerHTML = '浙江移动下载'
                    else if(a.href.indexOf('wtdown1.greendown') > 0)
                        a.innerHTML = '河南网通下载'
                    else if(a.href.indexOf('ltdown1.greendown') > 0)
                        a.innerHTML = '河北联通下载'
                    else
                        a.innerHTML = '我不知道下载'
                }
                rightScript.parentNode.appendChild(tmp)
            }
        })
    }
    
    // 找到那个输出下载地址的 script 标签, 通过 ajax 获取文本
    var script_list = document.getElementsByTagName('script')
    var rightScript
    for(var i = 0; i < script_list.length; i++) {
        var script = script_list[i]
        if(script.src.indexOf('view_down.asp') > 0) {
            rightScript = script
            getScript(script.src)
        }
    }
    
})()