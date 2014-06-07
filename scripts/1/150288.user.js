// ==UserScript==
// @name       转到百度空间
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, EDU
// ==/UserScript==

//http://hi.baidu.com/pub/show/createtext

var tip = document.createElement("div");
tip.innerHTML="<style>"
+".tip-box{height:20px; position:fixed;text-align:right;top:320px;right:20px;width:100%;"
+"_position:absolute; _top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight);"
+"padding-right:10px;margin-bottom:10px;overflow:visible;"
+"border-top:1px solid #999;border-bottom:1px solid #999;width:79px;background:#FFF}"
+" .tip-box .tip-item .feedback-tip{height:25px;font-size:12px;display:block;line-height:25px;text-align:center;width:79px}"
+"</style>"
+"<div class=tip-box>"
+"<div class=tip-item><a href='http://hi.baidu.com/pub/show/createtext' target=_blank class=feedback-tip>发布文字</a><div class=tip-border></div></div>"
+"</div>";

document.body.insertBefore(tip, document.body.firstChild);