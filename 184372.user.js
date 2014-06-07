// ==UserScript==
// @name         	sjtu.so_plus.user.js
// @description  	修改sjtu.so主页，添加自己的链接
// @downloadurl  	http://userscripts.org/scripts/source/184372.user.js
// @version			1.0.1			
// @include     	http://sjtu2.xiaolvwa.com/
// ==/UserScript==

(function () {
    /*
     *   a => 原始「点击阅读按钮」的 Li 列表元素
     *   b => 复制后的 Li 元素
     *   c => 用于修改 b 属性的元素
     */
    var a = document.querySelector('a[href="http://dict.youdao.com"]');		//获取节点
	var c = a.cloneNode(true);												//复制节点
    c.textContent = '射手字幕';												//返回或设置选定元素的文本
    c.href = 'http://www.shooter.cn/';
    //c.removeAttribute("onclick");											//移除节点
    //c.title = c.title.replace('百度视频', 'hao123');						//节点属性title
    c.target = '_blank';	// 如果需要默认在新窗口开启请注释。
	a.parentNode.appendChild(c);
}) ();

(function () {
	//此处没有复制节点，直接覆盖修改
    var a = document.querySelector('div[id="right"] a[href="http://blog.renren.com/blog/bp/Q7465QWrqV"]');		//获取节点
    a.href = a.href.replace('blog.renren.com/blog/bp/Q7465QWrqV', 'heysam.duapp.com');
	a.textContent = 'Sam主页';
}) ();

(function () {
    var a = document.querySelector('a[href="http://tieba.baidu.com/"]');		//获取节点
	var b = a.cloneNode(true);
    b.href = b.href.replace('tieba', 'pan');
	b.textContent = '百度网盘';
	a.parentNode.appendChild(b);
}) ();

(function () {
	//此处没有复制节点，直接覆盖修改
    var a = document.querySelector('a[class="con"][href="http://weixin.qq.com"]');		//获取节点
    a.href = a.href.replace('weixin.qq.com', 'www.mop.com');
	a.textContent = '猫扑';
}) ();

(function () {
    var a = document.querySelector('a[href="http://www.yyets.com"]');		//获取节点
	var b = new Array(5);
	for(var i=0;i<b.length;i++){
		b[i] = a.cloneNode(true);}
    b[0].href = b[0].href.replace('www.yyets.com','bt.shu6.edu.cn');
	b[0].textContent = '乐乎PT';
	b[1].href = b[1].href.replace('www.yyets.com','pt.sjtu.edu.cn');
	b[1].textContent = '葡萄PT';
	b[2].href = b[2].href.replace('www.yyets.com','pt.zhixing.bjtu.edu.cn');
	b[2].textContent = '知行PT';
	b[3].href = b[3].href.replace('www.yyets.com','tracker.ipv6.scau.edu.cn');
	b[3].textContent = '红满堂PT';
	b[4].href = b[4].href.replace('www.yyets.com','bt.buaa6.edu.cn');
	b[4].textContent = '未来花园PT';
	for(i=0;i<b.length;i++){
		a.parentNode.appendChild(b[i]);}
}) ();