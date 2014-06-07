// ==UserScript==
// @name        编辑框撤消恢复功能
// @include     http://tieba.baidu.com/*
// @updateURL   http://userscripts.org/scripts/source/151374.meta.js
// @downloadURL http://userscripts.org/scripts/source/151374.user.js
// @version     1
// ==/UserScript==

var t=2;    //记录间隔，单位秒，默认两秒


var _window = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var $ = _window.$;

t*=1000;
window.stack1=[];   //撤消栈
window.stack2=[];   //恢复栈
window.ehtml=$("#edit_parent").find("div .tb-editor-editarea"); 
stack1[0]=ehtml.html();

//按钮
var button='<a id="back" href="javascript:void(0)" title="撤消">←</a>'+
'<a id="adv" href="javascript:void(0)" title="恢复">→</a>';
$('.tb-editor-wrapper').after(button);


//撤消
window.Back=function() 
{
if(stack1.length!=1) 
{
stack2.push(stack1.pop());
ehtml.html(stack1[stack1.length-1]);
} 
//ehtml.html(ehtml.html()+'长度1：'+stack1.length+'长度2：'+stack2.length)
}
//恢复
window.Adv=function()
{
if(stack2.length!=0) 
{
ehtml.html(stack2[stack2.length-1]);
stack1.push(stack2.pop()); 
}
//ehtml.html(ehtml.html()+'长度1：'+stack1.length+'长度2：'+stack2.length)
}

//按钮事件监听
var back= document.getElementById("back");
back.addEventListener("click",Back,false);
var adv= document.getElementById("adv");
adv.addEventListener("click",Adv,false);


//记忆
window.rem=function()
{
if(ehtml.is(":focus"))
{
if(ehtml.html()!=stack1[stack1.length-1]&&ehtml.html()!=stack2[stack2.length-1])
{
stack1.push(ehtml.html());
stack2=[];
}
}
}
setInterval(function(){rem();},t);

GM_addStyle(
  '#adv{\
position:relative;\
left:30px;\
bottom:30px;\
z-index:999;\
color:#B7CA79 !important;\
text-decoration: none !important;\
  }\
  #back{\
position:relative;\
left:10px;\
bottom:30px;\
z-index:999;\
color:#B7CA79 !important;\
text-decoration: none !important;\
  }')