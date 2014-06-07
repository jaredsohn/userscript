// ==UserScript==
// @name           MockBaidu
// @namespace      http://userscripts.org/users/74739
// @include        http://www.baidu.com/
// @description    在我心中，百度不是一家值得尊重的公司，所以，我想通过这种方法来表达我对它的厌恶。这段脚本不会对您的电脑产生任何危害，它的用途只是使您在访问百度首页时让整个页面看起来和原来不同而已。
// ==/UserScript==

var ary_anchor = document.getElementsByTagName('a');
var logo = document.getElementsByTagName('img')[0];
var title_of_page = document.title;

document.getElementById('su').value = '忍耐一下';

if(title_of_page.indexOf('百度一下') >= 0) {
    fixIndexPage();
} else if(title_of_page.indexOf('百度搜索') == 0) {
    fixSearchPage();
}

function fixIndexPage() {
    document.title += '为什么聪明人都用Google';

    /*
    var logo_original_src = logo.src;
    var logo_new_src = 'http://upload2007.cnool.net/files2007/20090408/2009040810305407559.gif';
    logo.src = logo_new_src;
    logo.width = '187';
    logo.height = '168';
    */
    
    var links_html = document.getElementById('lk').innerHTML;
    document.getElementById('lk').innerHTML = links_html
                                            + "<p style='padding-top: 15px;'>"
                                            + "<a href='http://www.williamlong.info/archives/2587.html' target='_blank'>《百度百科：游荡在中国的窃贼》</a>"
                                            + " | <a href='http://www.wangxiaofeng.net/?p=7285' target='_blank'>《李彦宏：我爸是李刚》</a>"
                                            + " | <a href='http://blog.sina.com.cn/s/blog_4701280b01017ijd.html' target='_blank'>《为了食油，声讨百度》</a>"
                                            + "</p>";

    for(a in ary_anchor) {
        switch(ary_anchor[a].innerHTML) {
            case '贴&nbsp;吧':
                ary_anchor[a].innerHTML = "<font color='#ff0000'>没有鸡吧</font>";
                break;
            case '加入百度推广':
                ary_anchor[a].innerHTML = '加入百度推广，不如去街头贴广告';
                break;
            case '关于百度':
                ary_anchor[a].innerHTML = '谷歌香港';
                ary_anchor[a].href = 'http://google.com.hk/';
                break;
            case 'About Baidu':
                ary_anchor[a].innerHTML = '反百度联盟';
                ary_anchor[a].href = 'http://www.fanbaidu.com/';
                break;
            case '京ICP证030173号':
                ary_anchor[a].innerHTML = '备你妹啊！';
                break;
        }
    }
}

function fixSearchPage() {
    var e_head = document.getElementById('head');
    var e_head_html = e_head.innerHTML;
    var keyword = encodeURI(document.getElementById('kw').value);
    
    e_head.innerHTML = e_head_html + "<a href='http://www.google.com.hk/search?hl=zh-cn&q=" + keyword + "' target='_blank'>点击这里：看看同样的关键字，Google 会给你什么</a>";
    
    for(a in ary_anchor) {
        switch(ary_anchor[a].innerHTML) {
            case '<font color="#666666">推广链接</font>':
                ary_anchor[a].innerHTML = '【小心这里的链接，很多是骗子！】';
                break;
            case '百度快照':
                ary_anchor[a].innerHTML = '百度快照（为什么谷歌的快照就被屏蔽呢？）';
                break;
        }
    }
    
    document.getElementById('foot').innerHTML = '&copy;2012 Baidu <span>此内容系百度根据您付钱的多少人工调整后的搜索结果，没有什么公平和准确可言，建议您改用 Google 搜索</span>';
}