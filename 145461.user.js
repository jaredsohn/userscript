// ==UserScript==
// @name        360搜索辅助
// @namespace   http://www.xsecure.cn/
// @description 360搜索反百度屏蔽脚本
// @include     http://so.360.cn/s?*
// @include     http://www.360sou.com/s?*
// @include     http://www.360so.com/s?*
// @include     http://www.360sou.net/s?*
// @include     http://www.sou.com/s?*
// @include     http://www.so.com/s?*
// @include     http://www.baidu.com/search/ressafe.html?*
// @grant       GM_openInTab
// @updateURL		https://userscripts.org/scripts/source/145461.meta.js
// @downloadURL		https://userscripts.org/scripts/source/145461.user.js
// @version     0.2.3
// ==/UserScript==


/*-----反百度重定向-----*/
function antiBaiduRedirect() {
    url = window.location.toString();
    try {
        true_url = url.match(/^http:\/\/www\.baidu\.com\/search\/ressafe\.html\?(|.+&)url=(.+?)(&.+|$)/)[2]
    }
    catch(err) {
        return false;
    }
    window.location = true_url;
    return true;
}
/*------反百度屏蔽------*/
function antiBaiduShield() {
    // 获取当前域名
    var href = window.location.host;
    
    // 如果依然被百度重定向，则直接刷新百度页面
    if(href == "www.baidu.com") {
        return antiBaiduRedirect();
    }
    
    // 获取360搜索页面容器节点
    var container = document.getElementById("container");
    
    var res = container.getElementsByTagName("a");
    var is_baidu_url;
    for(var i in res) {
        is_baidu_url = false;
        // 获取父节点信息
        var h3 = res[i].parentNode;
        try {
            if(h3.className.replace(/^\s*/, "").replace(/\s*$/, "") != "res-title") {
                // 类名不为res-title则直接跳过
                continue;
            }
        }
        catch(err) {
            // 无法获取类名一样跳过
            continue;
        }
        
        // 判断是否含有data-cache属性
        var data_cache = res[i].getAttribute("data-cache");
        if(data_cache) {
            // 移除data-cache属性，以免打开快照缓存页
            res[i].removeAttribute("data-cache");
            is_baidu_url = true;
        }
        else {
            try {
                // 获取所有带有360自己的direct.php跳转的链接(这个php就是为了反屏蔽，但显然不太成功)
                baidu_url = res[i].href.match(/^http:\/\/so\.360\.cn\/direct\.php\?f=360sou&u=(.+)$/)[1];
                // 一些必要的编码转换
                baidu_url = baidu_url.replace(/%3A/g, ":").replace(/%2F/g, "/").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&");
                // 将href替换为原始百度链接
                res[i].href = baidu_url;
                is_baidu_url = true;
            }
            catch(err) {
            };
        }
        
        if(is_baidu_url) {
            // 加入监听函数
            res[i].addEventListener("click", function(event) {
                    // 通过event.target获取目标，并解析出其中的url
                    if(event.target.tagName == "EM") {
                        targ_url = event.target.parentNode;
                    }
                    else {
                        targ_url = event.target.toString();
                    }
                    // 哥用GreaseMonkey调浏览器自己打开一个页面，有本事你连这个也给我屏蔽了！
                    GM_openInTab(targ_url);
                    event.preventDefault();
                }, false
            );
        }
    }
}

/*---------起始点----------*/
if(true) {
    antiBaiduShield();
}