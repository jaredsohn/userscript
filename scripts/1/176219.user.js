// ==UserScript==
// @name       Feeldy Share To Weibo
// @namespace  http://altenli.diandian.com/
// @version    0.9
// @author     AltenLi
// @description  When You Use Feedly, Expand one news, Then You Can Click the Sina Button On the right top to share it. 当你使用Feedly并展开着某一个新闻的时候，点击右上角的新浪小图标来分享到微薄
// @include    http://cloud.feedly.com*
// @include    https://cloud.feedly.com*
// @include    http://feedly.com*
// @include    https://feedly.com*
// @updateURL      https://userscripts.org/scripts/source/176219.meta.js
// @downloadURL    https://userscripts.org/scripts/source/176219.user.js
// @copyright  2013+, AltenLi
// @run-at     document-end
// ==/UserScript==


// 自造 selector

function $$(w) {
    return document.querySelectorAll(w);
}

function $(select) {
    var name = select.substring(1);
    switch (select.charAt(0)) {
        case '#':
            return document.getElementById(name);
        case '.':
            return document.getElementsByClassName(name);
        case '/':
            return document.getElementsByTagName(name);
        default:
            return document.getElementsByName(select);
    }
}

//组成参数串

function addParam(param) {
    var temp = [];
    for (var p in param) {
        temp.push(p + '=' + encodeURIComponent(param[p] || ''))
    }
    return temp;
}

//分享的链接

function getLink(link, param) {
    return link + addParam(param).join('&');
}


//check if the next sibling node is an element node

function get_nextsibling(n) {
    var x = n.nextSibling;
    while (x.nodeType != 1) {
        x = x.nextSibling;
    }
    return x;
}

function ShareToWeibo() {
    console.log("ShareToWeibo");
    var i, j;
    var c = $(".entryTitle title read");
    //console.log("c0 " + c[0]);
    for (i = 0; i < c.length; i++) {
        var d = get_nextsibling(c[i]);
        //console.log("d " + d);
       
            var param = {
                url: c[i].href,
                type: '3',
                title: c[i].innerHTML.replace("&nbsp;"," "),
                /**分享的文字内容(可选，默认为所在页面的title)*/
                language: 'zh_cn',
                appkey:'1774990684',
                dpc: 1
            }
            window.open(getLink("http://service.weibo.com/share/share.php?", param));
       
    }

}


function addPageButton(c, d) {

    var share2Weibo = document.createElement('a');
    //<a title="分享到新浪微博" onclick="ShareToWeibo();return false;" href="#" hidefocus="true"><img src="http://simg.sinajs.cn/platformstyle/images/common/transparent.gif" class="icon" alt=""></a>
    share2Weibo.innerHTML='<img src=\"http://www.sinaimg.cn/blog/developer/wiki/16x16.png\" class=\"pageAction\" alt=\"分享至新浪微博\">';
    share2Weibo.class = "pageAction";
    share2Weibo.title = "分享至新浪微博";
    share2Weibo.width = "18";
    share2Weibo.height = "18";
    share2Weibo.border = "0";
    share2Weibo.onclick=function(){ShareToWeibo();return false;};

    // add sharing link to page
    var htmlContent = c.insertBefore(share2Weibo, null);
}

try
{
setTimeout(function() {
    var i;
    var c = $(".pageActionBar");
    console.log("clength:"+c.length);
    if (c.length<=0) 
    {
        console.log("exit");
        return false;
        
    }
    for (i = 0; i < c.length; i++) {
        d = c[i].getElementsByTagName("img");
        if (d.length <= 0) break;
       // console.log(c[i] + "\n" + d[0]);
        addPageButton(c[i], d[0]);

    }
    console.log("Added OK");
}, 10000);
}
catch(e)
{
    console.log("Can't find pageActionBar");
}