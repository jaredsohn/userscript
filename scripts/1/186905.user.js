// ==UserScript==
// @name       ClickZan
// @namespace  http://ruiguo.me
// @version    0.11
// @description  ClickZan Plugin for Renren.com
// @match	   http://www.renren.com/*		
// @copyright  2013, ruiguo.me
// @require http://code.jquery.com/jquery-latest.js
// @contributor  ruiguo(github@ruiguo.me), GroundMelon(GroundMelon@gmail.com)
// @licence    MIT
// ==/UserScript==

//如果作用域变成*.renren.com，那么在加载人人网的时候，会同时运行十几次这个脚本，因为人人网中有些组件的域名是子域名，如photo.renren.me，这些地方与点赞无关，而且会把这个插件变得很卡

var zan = '启禀皇上!';
var afterZan = '朕知道了';

//用DFS来查找所有的"赞"
//用document.getElementsByClassName()或$('.classname')似乎没有办法改变每个元素的innerHTML
//这样DFS的效率很低，特别是用到了正则表达式来匹配id，但是人人网的主页元素并不多，所以说我懒得改了...
function IterateNode(node){
    	//if (/ILike/.test(node.id)) alert(node.innerHTML);    	
        console.log('a'+node.className);
    
    	//通过class来匹配
    	if (/ilike/.test(node.className)){
	        console.log(node.className);
            if (/取消赞/.test(node.innerHTML)){
            	node.innerHTML = afterZan;
            }
            else{
                if (/赞/.test(node.innerHTML))
                node.innerHTML = zan;
            }
        }

    	//search the children of the current node
        var childrens = node.childNodes;
        if(childrens == null ||
           typeof(childrens) == "undefined" ||
        childrens.length == 0) return;
        for(var i=0;i<childrens.length;i++){
            IterateNode(childrens[i]);
        }
}

//浏览器会先执行 on()注册的set_timer(),后执行原来的<a class = "ilick_icon">.onclick(),所以需要延时一下。 
function set_timer(){
    console.log('in set_timer()');
    setTimeout(start,1000); //比1000小有时候会加载不出来
    
    //??延迟较大，有没有办法先执行onclick()??
}

function start(){
	console.log('in start()');
    IterateNode(document);
}

// 滚动时可能会出现新新鲜事，产生新的的"赞",所以需要重新添加
function on_scroll(){
	$(".ilike_icon").unbind("click");//清除绑定函数，防止多次绑定
    $(".ilike_icon").on("click",function(){ set_timer() }); //给class = "ilike_icon"的元素添加click函数
	$(".ilike_comment ilike_comment_liked").unbind("click");//清除绑定函数，防止多次绑定
    $(".ilike_comment ilike_comment_liked").on("click",function(){ set_timer() }); //给class = "ilike_icon"的元素添加click函数
    IterateNode(document);
}

var loaded = false;//避免网页加载时重复执行(似乎没起作用）
$(document).ready(function() {
    if (!loaded){
        console.log('in ready()');
        loaded = true;
    	IterateNode(document);
    	$(".ilike_icon").on("click",function(){ set_timer() }); //给class = "ilike_icon"的元素添加click函数
    	$(".ilike_comment ilike_comment_liked").on("click",function(){ set_timer() }); //给class = "ilike_comment ilike_comment_liked"的元素添加click函数
        $(window).scroll(function(){ on_scroll() }); //滚动处理
    }
});
