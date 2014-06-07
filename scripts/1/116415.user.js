// ==UserScript==
// @name           shanbay_shortcus_rebind
// @namespace      dourok.info
// @description    E--> 下一个 ; A-->上一个
// @include        http://www.shanbay.com/review/
// ==/UserScript==

/*
 * learining_shortcuts 等等方法是render_review(review.js)的私有函数，目前无法重写。
 * 只能覆盖render_review,来重写shortcuts函数,但如果将代码直接写入到script标签中,则无法运行.
 * 控制台也没提示错误.难道是因为代码太多的缘故(900多行)?试过改成一句打印代码可以执行.
 * 用unsafeWindow来重写整个方法相当麻烦,还不一定能行.暂时放弃重绑.
 * 所以本来想改"Y --> 发音;N--> 下一个 ; P-->上一个",没有实现.
 * 只能改成下面的方法,来附加两个按钮"F--> 下一个 ; B-->上一个",应该和chrome不兼容
 * 或者更应该直接修改KEYLT和KEYGT的值到 F  和 B
 * 但又会覆盖掉另外的用F的快捷键,替换成E 和 A 不错.
 * 
 */

//$(document).bind('keyup',function(e){alert(e.which)});

/* 附加shortcut F--> 下一个 ; B-->上一个
var $=unsafeWindow.$;
var get_prev = unsafeWindow.get_prev;
var get_next = unsafeWindow.get_next;
var old=unsafeWindow.render_review;
var my_shortcuts = function(e){
        if ($(e.target).is("input") || $(e.target).is("textarea")) return;
        var code = e.which;
        if(code == 70){//KEY_F
            get_next();
        }else if(code == 66){//KEY_B
            get_prev();
        }
    };
unsafeWindow.render_review = function(id){
    alert("hijack!");
    old(id);
    $(document).bind('keyup',my_shortcuts);
}
END      */


var w=document.createElement("script"); 
w.setAttribute("id", "rebind");
w.setAttribute("type", "text/javascript")
w.innerHTML ="KEYGT=69;KEYLT=65;"//  '<' --> 'A' '>' --> 'E'
document.body.appendChild(w);



