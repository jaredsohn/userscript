// ==UserScript==
// @name        Colg Instrumentality Project
// @namespace   http://moeto.comoj.com/
// @version     0.5.1.2.20131128
// @description 减少脑残程度
// @match       http://www.colg.cn/*
// @match       http://colg.cn/*
// @run-at      document-end
// @copyright   2012+, Excalibur
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
Element.prototype.remove = function()
{
    if(this.parentElement)
    {
    	this.parentElement.removeChild(this);
    }
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function()
{
    for(var i = 0, len = this.length; i < len; i++)
    {
        if(this[i] && this[i].parentElement)
        {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
//////////////////////////////////////////////////////////////////////////////// 对Discuz的界面元素进行简单封装
var url = location.href;    //首页滚蛋
if (url == 'http://www.colg.cn/' || url == 'http://colg.cn/' || url == 'http://www.colg.cn/portal.php' || url == 'http://colg.cn/portal.php')
{
    location.href = document.getElementById('mn_forum').children[0].href;
    return;
}

//黑名单列表
var blacklist = '15867,25069,61997,78260,220458,266394,283636,296151,339110,412393,428199,460462,508662,549631,560197,583434,608749,617482,620037,688792,730010,796828,838910,872847,906444';
//15867(囧毛の羊羊):10倍CPU寿命<http://www.colg.cn/thread-2494683-1-1.html>还有一个帖子说DNF会创建几千个线程,但找不到了
//25069(阿斯普洛斯):难以理解<http://www.colg.cn/thread-3247620-1-1.html>
//61997(Raism):愚蠢<http://www.colg.cn/thread-3353900-1-1.html>
//78260(熊的报恩):小学生<http://www.colg.cn/thread-3375116-1-1.html>
//220458(konakona):中国纯属一无是处<http://www.colg.cn/thread-3237699-1-1.html>
//266394(hanmingjun):小学生<http://www.colg.cn/thread-3303823-1-1.html>
//283636(小潴羊咩):我辩不赢他<http://www.colg.cn/forum.php?mod=viewthread&tid=3343814&authorid=283636>
//296151(wind6875):那么最好你不要生活在这个宇宙<http://www.colg.cn/thread-3353900-1-1.html>
//339110(Sasharwolf):神经病<http://www.colg.cn/thread-3373780-1-1.html>
//412393(那啥的百花):智商过低<http://www.colg.cn/thread-3364207-1-1.html>
//428199(默尐念):性格不合<http://www.colg.cn/thread-3122148-1-1.html>
//460462(带胡子渣的小顺):傻逼<http://www.colg.cn/thread-3313299-1-1.html>
//508662(白手坑爹觉醒):脑残傻逼<http://www.colg.cn/thread-1753265-1-1.html>
//549631(戲子):果然是性别不同怎么谈恋爱啊<http://www.colg.cn/thread-3398435-1-1.html>
//560197(soloの傲娇受):头签不喜<http://www.colg.cn/thread-3357331-1-1.html>
//583434(Jieer缤纷):傻逼<http://www.colg.cn/thread-3234230-1-1.html>
//608749(快乐的根号三):傻逼<http://www.colg.cn/thread-3237542-1-1.html>
//617482(Aoyama):原帖已删<http://www.colg.cn/thread-3084876-1-1.html><http://www.colg.cn/thread-3085500-1-1.html>
//620037(themental):沟通障碍<http://www.colg.cn/forum.php?mod=viewthread&tid=3237554&page=1#pid52932722>
//688792(如水):傻逼<http://www.colg.cn/thread-3373910-1-1.html>
//730010(黑眼球的猫):无聊<http://www.colg.cn/thread-3225030-1-1.html><http://www.colg.cn/thread-3233776-1-1.html>
//796828(抱抱和瞎子):傻逼<http://www.colg.cn/thread-3347206-1-1.html>
//838910(未完の梦):傻逼<http://www.colg.cn/thread-3357218-1-1.html>
//872847(初夏的雨点、):傻逼的马甲<http://www.colg.cn/thread-3357835-1-1.html>
//906444(野区养猪):小学生<http://www.colg.cn/thread-3315238-1-1.html>

GM_setValue('blocked_uid', blacklist);
var blocked_uid = GM_getValue('blocked_uid', '').split(',');
blocked_uid.sort();

var unlock = '本回复由[url=https://userscripts.org/scripts/show/175251]CIP[/url]自动发表';    //回复可见

var fontlist;	//字体
fontlist = document.getElementsByTagName('body');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}
fontlist = document.getElementsByTagName('input');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}
fontlist = document.getElementsByTagName('button');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}
fontlist = document.getElementsByTagName('select');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}
fontlist = document.getElementsByTagName('textarea');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}

fontlist = document.getElementsByClassName('xst');
for (var i = 0; i < fontlist.length; i++)
{
    fontlist[i].style.fontFamily = 'SimSun';
    fontlist[i].style.fontSize = '10px';
}

if (url.indexOf('home.php?mod=space')+1)	//用户空间
{
    var current_mode = 'userspace';

    var remove_visitor = document.getElementsByClassName('god');	//移除最近访客
}

if (current_mode == 'userspace')
{
    //谁他妈想要你知道我访问了
    for (var i = 0; i < remove_visitor.length; i++)
    {
        if (remove_visitor[i])
        {
            remove_visitor[i].click();
        }
    }
    return;
}

if (document.getElementById('mito_footer_login'))	//未登录
{
    var bLogin = false;
    
    var navbar = document.getElementById('dfsj_nv');	//导航栏
	var navbar_qqbind = navbar.children[0].children[0].children[0].children[0];
}
else
{
    var bLogin = true;
    
    var navbar = document.getElementById('dfsj_nv');	//导航栏
    var navbar_username = navbar.children[0].children[0].children[0].children[0].children[0];
    var username = navbar_username.text;
    var uid = navbar_username.href.substr(navbar_username.href.indexOf('uid=')+4);
    var navbar_qqbind = navbar.children[0].children[0].children[0].children[2];
}

var footer_login = document.getElementById('mito_footer_login');	//页尾登录

var thread_login = document.getElementsByClassName('attach_nopermission attach_tips');	//主题登录

var scrolltop = document.getElementById('scrolltop');	//浮动条

var mobile_visit = document.getElementById('sosv_dcode');	//手机访问

var ip_notice = document.getElementById('ip_notice');	//安全提醒

var mode_select = document.getElementsByClassName('xi1 bm bm_c');	//版本选择

if (url.indexOf('mod=viewthread')+1 || url.indexOf('colg.cn/thread-')+1)	//浏览帖子
{
    var current_mode = 'viewthread';
    
    var personal_info = document.getElementsByClassName('pls favatar');	//个人信息
    
    var threadstamp = document.getElementById('threadstamp');	//版主鉴定
    
    var comment = document.getElementsByClassName('cm');	//点评
    
    var next_page = document.getElementsByClassName('pgbtn');	//下一页按钮
    
    var post_list = document.getElementById('postlist');	//回复列表
    
    var related = document.getElementsByClassName('mtw mbw');	//相关帖子
    
    var share = document.getElementsByClassName('hm cl');	//分享
    
    var post_main = document.getElementsByClassName('t_fsz');	//主贴
    
    var bookmark = document.getElementsByClassName('dfsj_scfx');	//书签
}
else if (url.indexOf('mod=forumdisplay')+1 || url.indexOf('colg.cn/forum-')+1)	//浏览板块
{
    var current_mode = 'forumdisplay';
    
    var next_page = document.getElementsByClassName('bm_h');	//下一页按钮
    
    var icon = document.getElementsByTagName('img');	//图标
    
    var thread_list = document.getElementById('threadlisttableid');	//帖子列表
}
////////////////////////////////////////////////////////////////////////////////
if (bLogin)
{
    navbar_qqbind.innerText = '[+]';
    navbar_qqbind.href = 'http://moeto.comoj.com/';
    navbar_qqbind.title = 'CIP:已登录';
}
else
{
    navbar_qqbind.innerText = '[-]';
    navbar_qqbind.href = 'http://moeto.comoj.com/';
    navbar_qqbind.title = 'CIP:未登录';
}

//我他妈就正在用电脑
mode_select.remove();

//清除无用浮动广告
scrolltop.remove();

//没手机,你他妈烦不烦
mobile_visit.remove();

//去你妈的安全提醒
if (ip_notice)
{
    ip_notice.remove();
}

if (!bLogin)
{
    //老子他妈不爱登录要你管
    footer_login.remove();
    thread_login.remove();
}

if (current_mode == 'viewthread')
{
    //清除脑残鉴定
    if (threadstamp)
    {
        threadstamp.remove();
    }

    //清除快速回复和书签
    while (post_main[0].children[1])
    {
        post_main[0].children[1].remove();
    }
    
    //清除没人要的书签
    for (var i = 0; i < bookmark.length; i++)
    {
        if (bookmark[i])
        {
            bookmark[i].remove();
        }
        if (bookmark[i])
        {
            bookmark[i].remove();
        }
    }
    
    //清除侧边栏垃圾
    function do_nothing() {}
    for (var i = 0; i < personal_info.length; i++)
    {
        if (personal_info[i].children[0].name == 'newpost')
        {
            personal_info[i].children[0].remove();
        }
        if (personal_info[i].children[0].name == 'lastpost')
        {
            personal_info[i].children[0].remove();
        }
        if (personal_info[i].children[1])
        {
            personal_info[i].children[1].remove();
            personal_info[i].children[1].children[0].onmouseover = do_nothing;	//头像
        }
        while (personal_info[i].children.length > 2)
        {
            if (personal_info[i].children[2])
            {
                personal_info[i].children[2].remove();
                
            }
        }
    }
    
    //清除无聊相关帖子
    for (var i = 0; i < related.length; i++)
    {
        related[i].remove();
    }
    
    //清除傻逼分享
    for (var i = 0; i < share.length; i++)
    {
        if (share[i].parentNode.children[0])
        {
            share[i].parentNode.children[0].remove();
        }
    }

    //清除剧透点评
    for (var i = 0; i < comment.length; i++)
    {
        comment[i].innerHTML = '';
    }
    //清除大而无当下一页
    for (var i = 0; i < next_page.length; i++)
    {
        next_page[i].innerHTML = '';
    }
    
    //清除黑名单的帖子
    if (blocked_uid.length)
    {
        var block_count = 0;
        for (var i = 1; i < post_list.children.length; i++)
        {
            var post = post_list.children[i];
            if (post.id == 'postlistreply')	//已经检索完毕
            {
                break;
            }
            var poster = post.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
            var poster_uid = poster.href.substr(poster.href.indexOf('uid=')+4);
            
            for (j = 0; j < blocked_uid.length; j++)
            {
                if (poster_uid == blocked_uid[j])
                {
                    post.remove();
                    block_count++;
                    i--;	//不然会跳过当前帖子的下一条
                    break;	//配对上了即可跳出循环
                }
            }
        }
        if (block_count)
        {
            navbar_qqbind.innerText='[' + block_count + ']';
            navbar_qqbind.title='CIP:已拦截' + block_count + '条回复';
        }
    }

    if (bLogin)
    {
        //无节抄:https://userscripts.org/scripts/source/155071.user.js
        var sshot = document.evaluate('//div[@class="locked"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        if(sshot.snapshotLength > 0)
        {
            document.getElementById('fastpostmessage').value = unlock;
            document.getElementById('fastpostsubmit').click();
        }
    }
}
else if (current_mode == 'forumdisplay')
{
    //清除大而无当下一页
    for (var i = 0; i < next_page.length; i++)
    {
        if ( next_page[i].href == 'javascript:;')
        {
            next_page[i].remove();
        }
    }
    //清除谁也不关心的图标
    for (var i = 0; i < icon.length; i++)
    {
        if (icon[i].src.indexOf('colg.cn/static/image/stamp/011.small.gif')+1 || icon[i].src.indexOf('colg.cn/static/image/common/hot_')+1)
        {
            icon[i].remove();
        }
    }
    //清除黑名单的帖子
    if (blocked_uid.length)
    {
        var block_count = 0;
        for (var i = 0; i < thread_list.children.length; i++)
        {
            var post = thread_list.children[i];
            if (post.id == 'separatorline')	//清除分割线以便清除黑名单的帖子
            {
                post.remove();
                continue;
            }
            else if (post.id == 'forumnewshow')	//清除傻缺新回复通知
            {
                post.remove();
                continue;
            }
                
            var poster = post.children[0].children[2].children[0].children[0];
            var poster_uid = poster.href.substr(poster.href.indexOf('uid=')+4);
            
            for (j = 0; j < blocked_uid.length; j++)
            {
                if (poster_uid == blocked_uid[j])
                {
                    post.remove();
                    block_count++;
                    i--;	//不然会跳过当前帖子的下一条
                    break;	//配对上了即可跳出循环
                }
            }
        }
        if (block_count)
        {
            navbar_qqbind.innerText='[' + block_count + ']';
            navbar_qqbind.title='CIP:已拦截' + block_count + '个帖子';
        }
    }
}