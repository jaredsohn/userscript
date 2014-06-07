// ==UserScript==
// @name       隐藏奇虎问答没有金币的
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://wenda.qihoo.com/*
// @exclude    http://wenda.qihoo.com/q/*
// @copyright  2012+, You
// ==/UserScript==



function $(tid){
    return document.getElementById(tid);
}

var bd = $("bd");

//定义一个选取class的函数
document.getElementsByClassName = function(className, parentElement) {
    var children = (parentElement || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
 
};

//问题列表
var list=document.getElementsByClassName("title",bd);
 
//循环 删除没有金币的列表 或者回答数不为0的
for (var i = 0; i < list.length; i++) {
        sw=document.getElementsByClassName("wealth",list[i]);  
        
        //删除没有金币的
        if(sw.length==0)
        {
            v = list[i].parentNode; //定位到tr 
            v.parentNode.removeChild(v);//删除tr
        }  
}
 