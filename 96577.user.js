// ==UserScript==
// @name           douban_help
// @namespace      org.su27
// @description    for helpcenter
// @include        http://svn.douban.com/projects/helpcenter/ticket/*
// ==/UserScript==

/* 自己修改下面的话。如果要加回车，要用\\n代替 */
var ws=[

'这个bug我们正在处理中。',
'具体情况是什么，有没有显示歌曲名、封面、时间，时间是否在走？',
'是说网页版还是桌面客户端？',
'具体的报错信息是什么？\\n如果安装目录下有DoubanRadio.exe.log,请提供这个文件给我们。',
'请提供错误时的截图。',
'请先删除安装目录（xp下是C:/\Documents and Settings/\Administrator/\Local Settings/\Application Data/\Douban，win7下是C:/\Users/\你的名字/\AppData/\Local/\Douban），再重新安装。',
'请下载 www.douban.com\/static\/DoubanNurse_win.zip 这个文件，解开之后执行bat文件，结束之后把日志发回来我们分析一下。',

], cmt = document.getElementById('comment');
unsafeWindow.ins = function(txt){
document.getElementById('comment').value = txt}
var words = document.createElement('div');
words.style.position = 'absolute';
words.style.left = '-230px';
words.style.width = '220px';
var inner = '';
for (var i=0;i<ws.length;i++){
inner += '<div style="border:1px solid #ddd;'+
'margin:2px;padding:2px;cursor:pointer" '+
'onclick="ins(\''+ws[i]+'\')">'+ws[i]+'</div>';
}
words.innerHTML = inner;
cmt.parentNode.insertBefore(words, cmt);
