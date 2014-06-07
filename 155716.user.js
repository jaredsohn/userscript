// ==UserScript==
// @name        回0
// @namespace   b625561
// @description test0
// @include     http://bbs.dospy.com/forumdisplay.php?fid=29
// @version     1
// ==/UserScript==

//上面的是自动生成的说明, 脚本名字, 生效地址(http://bbs.dospy.com/forumdisplay.php?fid=29)等信息
//抄来的function和一堆括号什么的, 效果似乎是页面加载完了就会运行里面的内容
(function() {
//查找整个网页(document)里, "类名"为"xg1"的那个部分(查找方式为getElementsByClassName, 那个部分就是包含着"回N"的那部分), 并把找到的所有结果存到"t1"这个变量里
var t1=document.getElementsByClassName("xg1")
//设置5000毫秒(5秒), 自动执行"window.location.reload()"命令, 这个命令就是刷新当前页面
var t=setTimeout("window.location.reload()",5000)
//在之前存的"t1"里面,每个都...
for(var i=0,l=t1.length;i<l;i++){
//找找看有没有"回0"这个串字, 没有的话会得到"-1",
    if(t1[i].innerHTML.search("回0")!=-1){
//如果没得到"-1"("!="就是不等于)的话, 就是找到了, 那么把找到的这部分的"父节点"(包括标题链接, 日期, 回复数量)的第一个子节点(帖子标题链接)的打开方式设置为在"新标签页中打开"
        t1[i].parentElement.firstElementChild.target="_blank";
//然后模拟鼠标点击(click())这个链接
        t1[i].parentElement.firstElementChild.click();
//对应上面的括号
    }
}
})();