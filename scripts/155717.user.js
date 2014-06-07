// ==UserScript==
// @name        Dospy Rapid Reply
// @namespace   b625561
// @description Dospy Rapid Reply
// @include     http://bbs.dospy.com/*
// @version     1
// ==/UserScript==

//上面的是自动生成的说明, 脚本名字, 生效地址(http://bbs.dospy.com/forumdisplay.php?fid=29)等信息
//抄来的function和一堆括号什么的, 效果似乎是页面加载完了就会运行里面的内容
(function() {
//定义要回复的内容为"#ReplyTest#", 安装后可手动修改
	var rcontent = "#ReplyTest#";
//查找整个网页(document)里, "类名"为"editp"的部分(查找方式为getElementsByClassName), 并把查找到的所有结果存到"redit"这个变量里. 当有"编辑"这个链接的时候就会有"editp"这个名字出现
	var redit = document.getElementsByClassName("editp");
//如果找到的内容长度(.length)为零, 即没有找到"编辑"链接的话
	if (redit.length==0){
//说明这个帖子你还没有回复过, 那么尝试回复...
		try {
//查找整个网页(document)里, "ID名"为"fastpostmessage"的那个部分(查找方式为getElementById, 那个部分就是回复的那个文本框), 并把他的内容(innerHTML)改成之前设定的"要回复的内容"
			document.getElementById("fastpostmessage").innerHTML = rcontent;
//查找整个网页(document)里, "ID名"为"fastpostsubmit"的那个部分(查找方式为getElementById, 那个部分就是那个回复按钮), 并模拟鼠标点击(.click())它
			document.getElementById("fastpostsubmit").click();
//出现什么奇怪的错误的话就算了
		}catch(ee){};
//对应上面的括号
	};
})(); 