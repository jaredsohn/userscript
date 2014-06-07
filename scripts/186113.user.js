// ==UserScript==
// @name        tieba_hide_message_scores
// @namespace   tieba
// @include     http://tieba.baidu.com/*
// @version     2.0
// @grant      GM_addStyle
// ==/UserScript==
 
//2013-12-14修复判断的逻辑问题
function display(){
		var $ = unsafeWindow.$;
		var div=$('.j_content.ui_bubble_content.ui_bubble_up');//消息框框
		$('#message_scores').hide();
		div.hide();
		
		if(typeof($(".ui_bubble_body.j_body li:not(#message_scores) span")[0])!='undefined'){
		if($(".ui_bubble_body.j_body li:not(#message_scores) span").length>0){
		div.show();
		}
		}
}
addNodeInsertedListener('#tb_message_tip_n',function(){
display();
 });  

setInterval(function() { 
display();
},1000); //修复新标签打开后，旧的标签还是会冒出提醒
 //函数 元素精确定位
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
    var animName = "anilanim",
        prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
        eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
        forEach = function(array, func) {
            for (var i = 0, l = array.length; i < l; i++) {
                func(array[i]);
            }
        };
    if (!noStyle) {
        var css = elCssPath + "{",
            css2 = "";
        forEach(prefixList, function(prefix) {
            css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
            css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
        });
        css += "}" + css2;
        GM_addStyle(css);
    }
    if (handler) {
        var bindedFunc = function(e) {
            var els = document.querySelectorAll(elCssPath),
                tar = e.target,
                match = false;
            if (els.length !== 0) {
                forEach(els, function(el) {
                    if (tar === el) {
                        if (executeOnce) {
                            removeNodeInsertedListener(bindedFunc);
                        }
                        handler.call(tar, e);
                        return;
                    }
                });
            }
        };
        forEach(eventTypeList, function(eventType) {
            document.addEventListener(eventType, bindedFunc, false);
        });
        return bindedFunc;
    }
}
//函数 元素精确定位取消绑定
function removeNodeInsertedListener(bindedFunc) {
    var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
        forEach = function(array, func) {
            for (var i = 0, l = array.length; i < l; i++) {
                func(array[i]);
            }
        };
    forEach(eventTypeList, function(eventType) {
        document.removeEventListener(eventType, bindedFunc, false);
    });
}