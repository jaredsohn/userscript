// ==UserScript==
// @name           Google Reader Feed All Content
// @namespace      http://hi.baidu.com/yfdyh000
// @description    Google Reader Feed All Content (zh-cn)
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// @version        0.15.1
// ==/UserScript==

/* 相关信息（请勿删除！）：
Google Reader Full Feed Changer yfdyh000 增强版
https://userscripts.org/scripts/show/48338

如果代码不完善 各位可以自己修改代码。
希望哪位高手能写成扩展

联系方式：
Email:yfdyh000@gmail.com(推荐)
QQ:443724716(较少上线)
*/

// == [Config] ======================================================
const KEY = "z"; // 手动获取触发按键(不分大小写)
//是否自动获取开关在“Greasemonker”菜单中“用户脚本命令”子菜单中
const OnTips = true; // 是否开启提示信息（推荐）
const OnlyOnErrorTips = false; // 是否仅仅开启错误提示（不推荐）
const OnAutoDel = false; // 是否允许自动删除（不允许时 提示信息永不删除）
//**********//
const OnCreateLargeButton = true; // 是否创建大按钮（未完成）
const OnCreateSmallButton = true; // 是否创建小按钮（未完成）
const OnEnhanceTips = false; // 是否使用增强提示（未完成）
const OnGetPages = true; // 是否允许获取多页（已完成。Beta）
const AutoGetTime = 500; // 自动获取延迟时间（请根据电脑&网速调整）

// == [SITE_INFO] ===================================================
const SinaGoRssUrl = "(http://|http://go.rss.sina.com.cn/redirect.php?url=http://)";//对含新浪跳转网址匹配的特殊设置
const SITE_INFO = [//如果你有新的设置信息，可以自己扩充。大量知名网站的设置信息可以Email给我，我添加上去
    {
        url:    "http://www.911usa.com.cn/",//水煮沉浮
        xpath:  "//div[@class='textbox-content']/span",//完美
        charset:"UTF-8"
    },
    {
        url:    "http://www.lovehhy.net/",//后花园网文
        xpath:  "//div[@id='fontzoom']",//
        charset:"gb2312"
    },
    {
        url:    "http://www.x-beta.cn/",//
        xpath:  "//div[@class='entry']",//
        charset:"UTF-8"
    },
    {
        url:    "http://game.zol.com.cn/",//中关村在线游戏
        xpath:  "//div[@id='cotent_idd']",//
        Nxpath: "//a[contains(text(),'继续>>下一页')]",//下一页按钮
        charset:"gb2312"
    },
    {
        url:    "http://politics.people.com.cn/",
        xpath:  "//div[@id='p_content']",
        charset:"gb2312"
    },
    {
        url:    "http://jandan.net/",//煎蛋
        xpath:  "//div[@class='entry2']|//div[@id='ajax_comments_wrapper']",//正文&评论
        charset:"UTF-8"
    },
    {
        url:    "http://www.duotegame.com/",//多特游戏
        xpath:  "//div[@class='doin1']|//div[@id='doin3']/a/img|//div[@id='content_all']",//数据&截图&介绍
        charset:"gb2312"
    },
    {
        url:    "http://www.duote.com/",//多特
        xpath:  "//div[@class='doin1']/ul/li|//div[@class='doin2']/div/a/img|//div[@id='content_all']|//div[@id='dotx']",//数据&截图&介绍&提示（无格式）（介绍尾部很多空行待解决）
        charset:"gb2312"
    },
    {
        url:    "http://hi.baidu.com/",//百度博客
        xpath:  "//div[@id='blog_text']|//div[@id='in_comment']",//内容（含图片）&评论（无格式）
        charset:"gb2312"
    },
    {
        url:    "http://majun1988.cngxr.com/",
        xpath:  "//div[@class='content']",
        charset:"UTF-8"
    },
    {
        url:    "http://www.knowsky.com/",
        xpath:  "//div[@class='Content']",
        charset:"gb2312"
    },
    {
        url:    SinaGoRssUrl + "blog.sina.com.cn/",//新浪博客
        xpath:  "//div[@class='articleContent']",//需改进，难度大
        charset:"UTF-8"
    },
    {
        url: "http://www.cnbeta.com/",//cnBeta
        //xpath: "//div[@id='newsBox']",//OK
        xpath:  "//div[@id='news_content']",//
        charset: "gb2312"
    },
    {
        url:    "http://item.feedsky.com/~feedsky/x2009/|http://(www|feed).x2009.cn/", // 电脑知识技巧教程收藏夹
        xpath:  "//div[@class='post-content']/p", // OK
        charset:"UTF-8"
    },
    {
        url:    SinaGoRssUrl + "games.sina.com.cn/",//新浪游戏新闻
        xpath:  "//div[@class='artibody']",
        charset:"gb2312"
    },
    {
        url:    "http://www.laifu.org/wangwen?/",//来福岛爆笑娱乐网-经典网文
        xpath:  "//div[@class='movieContent2']",//OK
        charset:"gb2312"
    },
    {
        url:    "http://www.laifu.org/tupian?/",//来福岛爆笑娱乐网-搞笑图片
        xpath:  "//div[@class='picContent']",//OK
        charset:"gb2312"
    },
    {
        url:    "http://www.lengmo.net/",//冷漠' Blog
        xpath:  "//div[@class='textbox-content']",
        charset:"UTF-8"
    },
    {
        url:    "http://bbs.voc.com.cn/",//华声论坛
        xpath:  "//div[@class='t_msgfont']",//第一页全部，无格式，含图片
        charset:"gb2312"
    },
    {
        url:    "http://(www|me).xdowns.com/",//绿色软件联盟
        xpath:  "//div[@class='co5l']|//div[@class='co_content6']",//数据&介绍
        //xpath:  "//div[@class='co5l']|//span[@id='Softimage']/a/img|//div[@class='co_content6']",//数据&截图&介绍Error
        charset:"gb2312"
    },
    {
        url:    "http://bbs.pediy.com/",//看雪软件安全论坛
        xpath:  "//div[@class='tb']",//所有楼层内容
        charset:"UTF-8"
    },
    {
        url:    "http://softbbs.it168.com/",//软件乐园
        //xpath:  "//div[@class='t_msgfont']",//所有楼层纯内容
        xpath:  "//div[@class='postmessage defaultpost']",//所有楼层内容（文本+简单样式+附件）
        charset:"gbk"
    },
    {
        url:    "http://www.haha360.com/",//哈哈经典笑话大全网
        xpath:  "//div[@id='content']",//OK
        charset:"gb2312"
    },
    {
        url:    SinaGoRssUrl + "tech.sina.com.cn/",//新浪科技
        xpath:  "//div[@id='artibody']",//有 相关阅读 无法去除！
        charset:"gb2312"
    },
    {
        url:    "http://www.crxh.cn/",//成人笑话|最经典的成人笑话集中营
        xpath:  "//div[@class='post-body']",//
        charset:"gb2312"
    },
    {
        url:    "http://it.sohu.com/",//搜狐-IT频道-互联网
        xpath:  "//div[@id='sohu_content']",//
        charset:"GBK"
    },
    {
        url:    "http://www.xingfushenghuo.com/",//成人笑话 色色笑话
        xpath:  "//div[@id='contenttable' and @class='post-body']/div",//
        charset:"UTF-8"
    },
    {
        url:    "http://down.chinaz.com/",//站长下载
        xpath:  "//table[@cellpadding='0' and cellspacing='0']|//div[@class='intro-left']",//数据&介绍
        charset:"gb2312"
    },
    {
        url:    "http://blog.csdn.net/",//CSDN Blog
        xpath:  "//div[@class='blogstory']/p",//不完美
        charset:"UTF-8"
    },
    {
        url:    "http://www.it.com.cn/",//IT世界网
        xpath:  "//div[@id='art_text']",//完美
        charset:"gb2312"
    },
    {
        url:    "http://www.iplaysoft.com/",//异次元软件世界
        xpath:  "//div[@class='entry-content']",//OK
        charset:"UTF-8"
    },
    {
        url:    "http://forum.eviloctal.com/",//邪恶八进制信息安全团队技术讨论组
        xpath:  "//div[@class='postmessage defaultpost']",//
        charset:"UTF-8"
    },
    {
        url:    "http://www.downbank.cn/",//下载银行
        xpath:  "//div[@id='soft_name']/*/li|//div[@id='soft_intro']/p",//十分完美，改进了获取方法
        charset:"gb2312"
    },
    {
        url:    "http://item.feedsky.com/~feedsky/mian6/|http://www.mian6.net/",//免了网
        xpath:  "//div[@id='main']/*/*/*/*/*/*/*/div[@class='entry']",//等待改进
        charset:"UTF-8"
    },
    {
        url:    "http://www.rsdown.cn/",//红软基地
        xpath:  "//td/table/tbody/tr/td/div/table/tbody|//div[@id='softintro']",//OK
        charset:"gb2312"
    },
    {
        url:    "http://www.itxiazai.com/",//IT世界网  旗下网站：IT下载网
        xpath:  "//div[@class='property']|//div[@class='soft_content']",//数据&软件介绍
        charset:"gb2312"
    },
    {
        url:    "http://dl.pconline.com.cn/",//太平洋下载中心
        xpath:  "//div[@class='infobox']|//div[@class='pContent']",//数据&软件简介 
        charset:"gb2312"
    },
    {
        url:    "http://www.onlinedown.net/",//华军软件园
        xpath:  "//div[@class='']",//
        charset:"UTF-8"
    },
    {
        url:    "http://download.enet.com.cn/",//eNet下载
        xpath:  "//table[@class='softcon']|//div[@class='softtxt']",//数据&介绍(无格式)
        charset:"gb2312"
    },
    {
        url:    "http://item.feedsky.com/~feedsky/huohufirefox/|http://www.hellohuohu.com/",//火狐中文研究中心
        xpath:  "//div[@class='post-body']/p",//
        charset:"UTF-8"
    },
    {
        url:    SinaGoRssUrl + "down.tech.sina.com.cn/", // 新浪下载
        xpath:  "//p[span/@id='down_count']|//div[@class='b_rjgk']/p/label/a/img|//div[@class='b_rjjs']/p", // 概况&截图&介绍
        charset:"gb2312"
    },
/*
    {
        url:    "http://www.xxx.com", // 
        xpath:  "//div[@class='']", // 
        //Nxpath: "", // 下一页
        charset:"UTF-8"
    },
    {
        url:    "http://www.xxx.com", // 
        xpath:  "//div[@class='']", // 
        //Nxpath: "", // 下一页
        charset:"UTF-8"
    },
    {
        url:    "http://www.xxx.com", // 
        xpath:  "//div[@class='']", // 
        //Nxpath: "", // 下一页
        charset:"UTF-8"
    },
    {
        url:    "http://www.xxx.com", // 
        xpath:  "//div[@class='']", // 
        //Nxpath: "", // 下一页
        charset:"UTF-8"
    },
    {
        url:    "http://www.xxx.com", // 
        xpath:  "//div[@class='']", // 
        //Nxpath: "", // 下一页
        charset:"UTF-8"
    },

*/
/*
SITE_INFO example
          
              url:    'Regular Expression of Blog or Feed URL',
              xpath:  'xpath of contents'
              charset: 'Shift_JIS'    // optional
          
              // multi part xpath
              url:    'Regular Expression of Blog or Feed URL',
              xpath:  ['xpath of contents', 'more contents'],
              charset: 'Shift_JIS'    // optional
         
	url: 'http://(rssblog.ameba.jp|ameblo.jp)/',
*/
/*
    {
        url: '',
        xpath: '',
        charset: ''
    }
*/
];

var AUTO_FETCH = new Boolean(true); // 自动读取开关（禁用时按Z读取）（默认开启）
AUTO_FETCH = GM_getValue('AUTO_FETCH',AUTO_FETCH); // 读取设置，如果没找到设置则使用代码里的默认设置
GM_registerMenuCommand("改变“自动读取开关”设置", SetAutoFetch, '', '', 'A'); // 增加菜单
// ↑读取“自动读取开关”设置↑
var FullFeed = {};
FullFeed.link = '';
FullFeed.getFocusedLink = function() {
    return getStringByXPath('//div[@id="current-entry"]//a[@class="entry-title-link"]/@href');
};

var link; // 当前链接

FullFeed.getCurrentEntry = function() { // 获取当前的项目全文内容
    //var link = this.getFocusedLink();
    link = this.getFocusedLink();
    this.link = link;
    var body = getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body"]');
    if (!body) { // 如果对象不存在
        body = getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body entry-body-empty"]');
    }
    var source = ''; // 清空项目链接
    if (location.href.match(/#stream\/user/)) { // 文件夹浏览（获取项目链接）OK
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');
    }
    else if (location.href.match(/#search\//)) { // 搜索结果（获取项目链接）OK
        source = getStringByXPath('//div[@id="current-entry"]//a[@class="entry-source-title"]/@href');//同文件夹
    }
    else if (location.href.match(/#stream\/feed/)) { // Feed浏览（获取项目链接）
        source = getStringByXPath('//span[@id="chrome-title"]//a/@href'); // 标题链接（Feed链接）OK
    }
    if (!source) {
        Display_Tips_message("错误！代码:1<BR>获取链接出错！",10000,"red");
        //Display_Tips_message("Error! Code:1 Get Link Error!",-1,"red"); // 错误！代码:1 获取链接出错！
        return false; // 无匹配，返回false
    }
    source = decodeURIComponent(source.replace(/^\/reader\/view\/feed\//, '')); //清除不需要的字符(留下Feed)
    for (var i in SITE_INFO) { // 循环匹配设置信息
        var reg = new RegExp(SITE_INFO[i].url); // 获取URL匹配的正则
        if (source.match(reg) || link.match(reg)) { // 匹配URL
            if (OnlyOnErrorTips == false) {
                Display_Tips_message("找到了相关的设置信息。获取中...",10000,"green");
            }
            //Display_Tips_message("Url OK!",10000,"green"); // 找到了网址设置信息！
            this.request(i, link, body);
            break;
        } else {
            if(i >= SITE_INFO.length - 1) { // 如果最后一个循环依然不是则等于没有此网址设置信息
                Display_Tips_message("未在设置信息中找到相关设置。请更新或修正设置信息！",10000,"red");
                //Display_Tips_message("Null Url Info!!!",-1,"red");
            }
        }
    }
};

FullFeed.request = function(i, link, body) {//设置信息编号,实际网址,内容对象
    httpGetNum = 0;
    GM_xmlhttpRequestFun(i, body)
};
/*
function Right(Str,n) { return Str.substr(Str.length-n); }
function Left(Str,n) { return Str.substr(0,n); }
function Mid(Str,Start,End) { return Str.substring(Start,End); }
*/
var httpGetNum = 0; // 取内容次数

function GM_xmlhttpRequestFun(i, body) {
    var text;
    var mime = "text/html; charset="; // 数据包 头
    if (SITE_INFO[i].charset) { // 判断是否指定了charset
        mime += SITE_INFO[i].charset; // 指定了charset
    } else {
        mime += "UTF-8"; // 如不指定则默认UTF-8
    }
    var NextButton = new Boolean; // 是否有下一页按钮
    GM_xmlhttpRequest({
        method: "GET",//POST未测试
        url: link,//网址
        overrideMimeType: mime,
        onload: function(r) {//成功回调函数
        /*
        responseDetails   是有五个域的对象
        status            整数，HTTP 应答的状态代码。200 意为请求正常完成。 
        statusText        字符串，HTTP 状态文字。状态文字是依赖于服务器的。 
        responseHeaders   字符串，应答包含的 HTTP 头部。 
        responseText      字符串，应答的主体。
        */
        /*******************************/
        text = r.responseText;//页面代码
        text = text.replace(/(<[^>]*?)on(?:(?:un)?load|(?:db)?click|mouse(?:down|up|over|out|move)|key(?:press|down|up)|abort|blur|change|error|focus|re(?:size|set)|select|submit)\s*?=\s*?["'][^"']*?["']/ig, "$1");
        text = text.replace(/<\s*?script[^>]*?>[\s\S]*?<\s*?\/script\s*?>/ig, "");
        var htmldoc = createHTMLDocumentByString(text); // 取网页源码
        //var contents = getFirstElementByXPath(SITE_INFO[i].xpath, htmldoc);//为支持多Xpath禁用此行,取内容
        //var contents = getElementsByXPath(SITE_INFO[i].xpath, htmldoc);//支持多Xpath,取内容
        //GM_log("Test3");
        var Temp = getElementsByXPath(SITE_INFO[i].xpath,htmldoc); // 支持多Xpath,取内容
        //GM_log("Test2");
        var Oldlink = link; // 旧链接
        if (SITE_INFO[i].Nxpath) {//判断是否指定了Nxpath
            var NextXPath = getFirstElementByXPath(SITE_INFO[i].Nxpath, htmldoc);//取下一页按钮
            //GM_log(NextXPath);
            if (NextXPath == null) { // 下一页对象是否不存在
                NextButton = false; // 没有下一页按钮
                //GM_log("Test1-1");
            } else {
                //GM_log(link);
                link = testing(link, NextXPath.href); // 获取下一页链接（急需改进为获取绝对路径！！！）
                //GM_log(link);
                NextButton = true;
                //GM_log("Test1-2");
            }
        } else {
            NextButton = false;//没有下一页按钮
            //GM_log("Test1-3");
        }
//GM_log("Test1");
        if (Temp == null) {//检测内容是否为空
            Display_Tips_message("错误！代码:3<BR>未获取到内容！请检查设置信息和对目标网站的网络连接！",15000,"red");
            NextButton = false;
            //Display_Tips_message("Error! Code:3 Contents=Null",-1,"red"); // 错误！代码:3 获取到的内容为空！
        }
        if (!Temp.length) {//检测内容长度是否不为0
            body.appendChild(addTargetAttr(relativeToAbsolute(Temp, link))); // ???
            Display_Tips_message("错误！代码:2",-1,"red"); // 从未发生过
            NextButton = false;
            //Display_Tips_message("Error! Code:2",-1,"red");//错误！代码:2。（从未发生过）
        }
        //GM_log("test3")
        if (httpGetNum == 0) { // 成功 删除原内容为新内容作准备
            while (body.firstChild) { body.removeChild(body.firstChild);} // 移除原内容
            AddSeparated(body, 0, "") // 添加最顶瞄
        }
        if (OnlyOnErrorTips == false) {
            httpGetNum++
            Display_Tips_message("内容" + httpGetNum + "获取完毕,显示中...",3000,"green");
        }
        //Display_Tips_message("Get OK! Show Ing...",3000,"green"); // 获取完毕,显示中...，3秒，绿色
        for (var Cnum = 0; Cnum < Temp.length; Cnum++) {//循环
            body.appendChild(addTargetAttr(relativeToAbsolute(Temp[Cnum], link))); // 节点列表尾添加新子节点
        }
        if (OnGetPages == false) { return; } // 检查是否不允许获取多页
        if (NextButton == true) { // 如果有下一页按钮
            AddSeparated(body, httpGetNum, Oldlink); // 添加分隔条
            GM_xmlhttpRequestFun(i, body);
        } else {
            AddSeparated(body, httpGetNum, "End"); // 添加最底瞄（急需改进！！）
        }
        /*******************************/
        },onerror: function(r) { // 出错回调函数
        /*******************************/
        //GM_log("Http Error!" + r.status,1);
        //Display_Tips_message("Http Error!" + r.status,-1,"red"); // 出错，返回状态码
        switch (r.status) { // 根据状态码显示相应提示
            case 200:
                GM_log("返回状态码200？") // 不可能 200 是成功
                break;
            case 404:
                Display_Tips_message("出错！状态码：" + r.status + "。目标网页不存在！",15000,"red"); // 出错
                break;
            default:
                Display_Tips_message("出错！状态码：" + r.status,-1,"red"); // 出错，返回状态码
        }
        /*******************************/
        },onreadystatechange: function(r) { // 反复回调函数
            // 预留
        }});
}

function Display_Tips_message(message,AutoDelTime,color){ // 显示提示信息(插入在正文前)
    if (OnTips == false) {return;}// 不允许显示提示信息则退出
    if (OnEnhanceTips == true) { // 是否使用增强提示
        hide_msg_area() // 隐藏现在的提示
        show_prog_msg(message,color) // 显示新的提示
        setTimeout(function(){hide_msg_area();},AutoDelTime); // 延时隐藏
    } else {
        var body = getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body"]');
        if (!body) {
        body = getFirstElementByXPath('//div[@id="current-entry"]//div[@class="entry-body entry-body-empty"]');
        }
        // 上方获取正文对象,下方插入提示信息
        // alert(message);//直接使用提示框显示，仅用于调试！
        var LargeDiv = document.createElement('div')
        var SmallDiv = document.createElement('div')
        // red 红色；green 绿色
        if (!color) { // 是否提供了参数
            var s ="<STRONG>" + message + "</STRONG><BR>"//粗体OK
        } else {
            var s ="<STRONG style='color:" + color + "'>" + message + "</STRONG><BR>"
        } // 颜色&粗体OK
        // s += ''
        SmallDiv.innerHTML = s
        LargeDiv.appendChild(SmallDiv)
        var TotalObject = body.insertBefore(LargeDiv,body.childNodes[0]); // OK
        /* 旧版，已舍弃不用
        var pElement = document.createElement("BR");//一次换行，当时无更好办法
        var New1 = body.insertBefore(pElement,body.childNodes[0]);//很完美，正文前加入
        pElement = document.createElement("STRONG");//粗体
        var messageNode = document.createTextNode(message);//中文乱码&当时不会添加<BR>换行
        pElement.appendChild(messageNode);//提示信息节点
        //body.appendChild(pElement);//正文后加入
        var New2 = body.insertBefore(pElement,body.childNodes[0]);//很完美，正文前加入
        */
        if (AutoDelTime > 0 && OnAutoDel == true) { // 判断是否延时删除
            setTimeout(function(){if(TotalObject){body.removeChild(TotalObject);}},AutoDelTime);//延时执行，删除对象（删除前判断是否还存在，防止出错）
    }}
}
/*
function AddSeparated() { // 添加分隔条（待改进）
    var LargeDiv = document.createElement('div')
    var SmallDiv = document.createElement('div')
    var s = "<hr width=80% size=5>" // 分隔条代码（待改进）
    // 分割条待实现功能：到最顶/底，上/下一个
    SmallDiv.innerHTML = s
    LargeDiv.appendChild(SmallDiv)
    var TotalObject = body.appendChild(LargeDiv,body.childNodes[0]); // 添加到最后一个需appendChild
}
*/
function AddSeparated(body, PageNum, link) { // 添加分隔条
    var LargeDiv = document.createElement('div')
    var SmallDiv = document.createElement('div')
    if (PageNum == 0) { // 添加最顶瞄
        s = '<a name="GReaderAC_0"></a>' // 添加最顶的瞄
        s += '<a name="GReaderAC_Home"></a>'
    } else if (link == "End") { // 添加最底瞄
        s = '<a name="GReaderAC_' + PageNum + '"></a>' // 添加最底瞄
        s += '<a name="GReaderAC_End"></a>'
    } else { // 添加分隔条
    var TopPic = "data:image/png;base64,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%3D" // 内容顶部图片
    var BottomPic = "data:image/png;base64,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" // 内容底部图片
    var UpPic = "data:image/png;base64,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%3D%3D" // 上一个图片
    var DownPic = "data:image/png;base64,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" // 下一个图片
    var s = '<a name="GReaderAC_页面数"></a>' + // 瞄
    '<div style="background: rgb(230, 230, 230) none repeat scroll 0% 0%; clear: both; line-height: 20px;       -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; text-align: center; margin-top: 20px; margin-bottom: 20px;" class="GReaderAC"><span><a href="javascript:alert(\'这是个内容分隔条。\n用来分隔由多个页面获取的内容。\n\n暂无更详细帮助。\');">内容分隔条</a>&nbsp;&nbsp;当前页(<a href="当前页链接" target="_blank">第 &nbsp;&nbsp;&nbsp;' + PageNum + '&nbsp;&nbsp;&nbsp; 页</a>)<a id="GReaderAC_页面数" name="GReaderAC_页面数">&nbsp;&nbsp;</a><a href="#GReaderAC_Home" title="跳到内容顶部"><img style="border: 0pt none ; height: 18px;" src="内容顶部图片" alt="跳到内容顶部" align="top"></a>&nbsp;&nbsp;<a href="#GReaderAC_页面数-1" title="上一个项目"><img style="border: 0pt none ; height: 18px;" src="上一个图片" alt="上一个项目" align="top"></a>&nbsp;&nbsp;<a href="#GReaderAC_页面数+1" title="下一个项目"><img style="border: 0pt none ; height: 18px;" src="下一个图片" alt="下一个项目" align="top"></a>&nbsp;&nbsp;<a href="#GReaderAC_End" title="跳到内容底部"><img style="border: 0pt none ; height: 18px;" src="内容底部图片" alt="跳到内容底部" align="top"></a></span></div>' // 分隔条代码
    s = s.replace("页面数+1", PageNum + 1);
    s = s.replace("页面数-1", PageNum - 1);
    //s = s.replace("页面数", PageNum); // 因未知原因无法发挥效果
    s = s.replace("当前页链接", link);
    s = s.replace("内容顶部图片", TopPic);
    s = s.replace("内容底部图片", BottomPic);
    s = s.replace("上一个图片", UpPic);
    s = s.replace("下一个图片", DownPic);
    //s = s.replace("", );
    }
    SmallDiv.innerHTML = s
    LargeDiv.appendChild(SmallDiv)
    var TotalObject = body.appendChild(LargeDiv,body.childNodes[0]); // 添加到最后一个需appendChild
}

var msg_container = document.getElementById("message-area-outer");
var msg_area = document.getElementById("message-area-inner");

function replace_class(node, old_cls, new_cls)
{ node.className = node.className.replace(new RegExp("\s?" + old_cls), new_cls); }

function show_prog_msg(msg) { // 淡黄色提示
	msg_area.textContent = msg; // 设置显示文字
	msg_container.className = "message-area progress-message";
	msg_container.style.marginLeft = -msg_container.clientWidth / 2 + "px"; // 让提示居中
	msg_container.style.width = null;
}

function show_info_msg(msg) { // 深黄色提示
	msg_area.textContent = msg; // 设置显示文字
	msg_container.className = "message-area info-message";
	msg_container.style.marginLeft = -msg_container.clientWidth / 2 + "px"; // 让提示居中
	msg_container.style.width = null;
}
//message-area-text
//message-area-inner message-area-text-container
//message-area-inner message-area-bottom-1
function hide_msg_area() { // 隐藏提示
	// 隐藏文字容器
	replace_class(msg_container, "$", " hidden");
	// 恢复文字范围风格？
	msg_area.removeAttribute("style");
}

function SetAutoFetch() { // 改变“自动读取开关”设置
    AUTO_FETCH = !AUTO_FETCH; // 改变值
    GM_setValue('AUTO_FETCH',AUTO_FETCH); // 保存设置
    AUTO_FETCH = GM_getValue('AUTO_FETCH',true); // 如果读取出错则设置为自动（基本不可能出错）
    alert("“自动读取开关”设置已改变为：" + AUTO_FETCH + "\n当前版本因为一些原因无法即时生效\n\n刷新页面后才能生效！"); // 提示
}

function testing(url1,url2) { // 组合绝对路径&相对路径（急需改进！！！）
    var temp = new RegExp("[^/]+$");
//    GM_log(url1.length);
//    GM_log(temp.exec(url1).length);
    var temp1 = url1.replace(temp,""); //http://www.xxx.com/htm/
    //var temp1 = url1.substring(0,url1.length - temp.exec(url1).length); //http://www.xxx.com/htm/
    var temp2 = url2.match(temp);
//    GM_log(temp2);
//    var temp2 = temp.exec(url2); //xxx.asp?x=123
    //var temp2 = temp.exec(url2); //xxx.asp?x=123
    if (temp1.substr(-1,1) == "/") {
        return temp1 + temp2;
    } else {
        return temp1 + "/" + temp2;
    }
}

function CreateLargeButton() { // 添加大按钮
    // 上/下方
}

function CreateSmallButton() { // 项目内下方添加小按钮（Ing）
    var SmallButton = document.createElement('span');
    SmallButton.className = "Item-Get_All_Content";
    SmallButton.innerHTML = "获取";
    el.appendChild(SmallButton); // Error
    SmallButton.addEventListener("click", SmallButtonClick, false);	
}

function SmallButtonClick() { // 小按钮点击

}

function relativeToAbsolute(node, link) { // 相关到不限制?
    var imgs = getElementsByXPath('//img', node);
    if (imgs.length) {
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute('src');
            if (src) {
                imgs[i].setAttribute('src', toAbsolutePath(src, link));
            }
        }
    }
    return node;
}
function addTargetAttr(node) { // 获取目标属性
    var anchors = getElementsByXPath('//a', node);
    if (!anchors) {
        return false;
    }
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].setAttribute('target', '_blank');
    }
    return node;
}
function createHTMLDocumentByString(str) { //code from URL:"http://www.firefox.net.cn/forum/viewtopic.php?t=29349"
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '');
    var htmlDoc;
    try {
        // works for 3.6
        htmlDoc = document.cloneNode(false);
        htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));
    } catch (e) {
        htmlDoc  = document.implementation.createDocument(null, 'html', null);
    }
    var fragment = createDocumentFragmentByString(html);
    try {
        fragment = htmlDoc.adoptNode(fragment); // ownerDocument changed from HTMLDocument(document) => XMLDocument(htmlDoc)
    } catch(e) {
        fragment = htmlDoc.importNode(fragment, true);
    }
    htmlDoc.documentElement.appendChild(fragment);
    return htmlDoc;
}

function createHTMLDocumentByString_bug(str) { // 创建HTML文件字符串?(取网页源码)// Firefox 3.6 Bug!
    var html = str.replace(/<!DOCTYPE.*?>/, '').replace(/<html.*?>/, '').replace(/<\/html>.*/, '')
    var htmlDoc  = document.implementation.createDocument(null, 'html', null)
    var fragment = createDocumentFragmentByString(html)
    htmlDoc.documentElement.appendChild(htmlDoc.importNode(fragment, true))
    return htmlDoc
}
function createDocumentFragmentByString(str) { // 创建文件碎片字符串?
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
}
function getStringByXPath(xpath, node) { // 获取字符串(XPath)
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var str = doc.evaluate(xpath, node, null, XPathResult.STRING_TYPE, null)
    return (str.stringValue) ? str.stringValue : ''
}
function getElementsByXPath(xpath, node) {//获取元素(支持多元素)
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var nodesSnapshot = doc.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}
function getFirstElementByXPath(xpath, node) {//获取第一元素
    var node = node || document
    var doc = node.ownerDocument ? node.ownerDocument : node
    var result = doc.evaluate(xpath, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    return result.singleNodeValue ? result.singleNodeValue : null
}
function toAbsolutePath(url, base) {//获取绝对路径
    // absolute path
    if (url.match(/^https?:\/\//)) {
        return url;//符合标准，直接返回
    }

    var head = base.match(/^https?:\/\/[^\/]+\//)[0];//
    if (url.indexOf('/') == 0) {
        return head + url;
    }

    var basedir = base.replace(/\/[^\/]+$/, '/');
    if (url.indexOf('.') == 0) {
        while (url.indexOf('.') == 0) {
            if (url.substr(0, 3) == '../') {
                basedir = basedir.replace(/\/[^\/]+\/$/, '/');
            }
            url = url.replace(/^\.+\//, '');
        }
    }
    return basedir + url;
}

// GM_log(AUTO_FETCH);

if (AUTO_FETCH) { // 判断“是否自动获取”设置
    var interval = window.setInterval( // 自动获取
        function() { // 触发函数
            var focusedLink = FullFeed.getFocusedLink();
            if (focusedLink != FullFeed.link) {
                FullFeed.getCurrentEntry(); // 开始获取
            }
        }
    ,AutoGetTime); // 延时500毫秒（半秒），可能是防止卡死
}

document.addEventListener( // 添加手动触发快捷键
    "keydown", // 事件为按下键
    function(event) { // 触发函数
        var key = String.fromCharCode(event.keyCode); // KeyCode -> KeyStr
        if (key.toLowerCase() == KEY) { // 按键为z则获取(不分大小写)
            FullFeed.getCurrentEntry(); // 开始获取
        }
    },false
);

//AddKeytoken = document.addEventListener
//document.RemoveEventListener('keydown',AddKeytoken)

//********************************************************//

/* 未完成功能（各位帮帮忙）
    自动获取网站编码功能（UTF-8/GB2312/GBK/...）【较简单】【暂无思路】
    希望将设置信息存入文件，能在脚本命令中添加/修改【工作量大，意义重大】 设置信息和更新、发布【需服务器支持】
    或者直接编写成扩展（高手写一个吧，我不会...）（Name:GReader All Content）【学习中，难度大】
    增加设置（下一页按钮位置(XPath)），在含此设置的网址循环寻找下一页的内容循环添加（添加的内容阅读超过百分之？再添加下一个）。【工作量大，意义重大】【进行中，但大量错误，调试困难】【部分完成！！】
    更改设置无需重新刷新页面来载入脚本【意义十分重大，尚无思路】
    多语言（简体中文/繁体中文/英文/...）【暂无需要】
    将自动删除改为替换为空白行【暂无方法】
    提前预读上/下X条项目到缓存【工作量大，意义重大】【急需！】
    添加大/小获取按钮（风格和其他按钮一样）【进行中】
    改进提示信息显示方式（Google上方的提示的完整调用方法）
    
*/

/* 汉字乱码问题（已解决）
    【改一下编码就OK了。不需要了】
    汉字编码 = \u + 十六进制Unicode编码
    http://www.zch123.cn/_test_/PNGtest2/utf8-gb2.htm
    http://www.nengcha.com/code/unicode/
*/

/* 备忘
    可从其他脚本借鉴代码：
    Preview Item (Click button)
        借鉴添加小按钮，替换正文
    http://www.greywyvern.com/code/php/binary2base64
    图像转编码
*/
/* 更新日志：
0.15
    改进分隔条和增强其功能
    改进获取后的显示，尽量防止突然大规模添/删内容
    增加自动获取延时设置。使用自动获取的朋友如果电脑慢可以加大一些延迟时间，电脑快的话小一点
0.14
    增加只显示错误信息开关（感谢建议！）
    大幅改进代码（基本完成！）
    增加获取多页功能（待完善）
    增加多页获取设置。设置后可以获取多个页面的内容（例：RSS项目目标为第一页可自动获取第二、三、四页...）
0.13
    自动读取开关改变存储位置，在脚本命令中可直接改变（点击后提示框内提示）
    将设置信息格式调整为双引号扩外，单引号扩内
    增加提示信息开关&自动删除开关（感谢建议！）
0.12
    调整了显示的提示信息内容
    自动延时删除提示信息的功能可以正常运行了！
    调整了一下显示提示信息中使用的对象名（虽然不知道调整后的是否合适-_-|）
    其他一些修改
0.11
    修正了中文乱码问题
    调整了设置信息的charset与其他不并列的问题
    一些小的修改
0.10
    第一次发布
    增加了提示信息（自定颜色，自动粗体）
*/