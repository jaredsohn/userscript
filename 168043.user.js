// ==UserScript==
// @name       115 快速拿空间
// @description 115 快速拿空间
// @license			MIT License
// @include     http://115.com/
// @include     http://115.com/?115
// @version     0.1.8
// @namespace   itkso.com
// @author			@nowind
// @grant		   unsafeWindow
// @updateURL https://userscripts.org/scripts/source/168043.meta.js
// @downloadURL https://userscripts.org/scripts/source/168043.user.js
// @run-at document-end
// ==/UserScript==
// 版本更新日志：
// 6.1 添加枫币摇摇功能
// 6.3  新界面修改
// 6.4  摇摇逻辑修改
// 6.15 取消外部读取jq
// 6.19 上传控件可用
// 8.23 添加 精简 和完整 
// 8.25 紧急修复兼容
// 10.22 支持新版本
// 10.24 去掉 脚本风险检测
// 11.19 新版
(function()
 {
     'use strict';
     var MustGetUnsafeWin=function()
     {
         if(window.unsafeWindow)return unsafeWindow;
         var c=document.createElement('div');
         c.setAttribute('onclick','return window');
         return c.onclick();
     };
     var uWin=MustGetUnsafeWin();
     if(!uWin)return;
     var $=uWin.jQuery;
     if (uWin.location.href=="about:blank")return;
     function Lite(){
         var a=$('<a/>',{href:'#',class:'Flag'}).html('拿空间');
         $('.nav a:first ').before(a);
         a.after('<em>|</em>');
         //a.appendTo('#js_link_box');
         a.click(function(){
             $.get('http://passport.115.com/?ct=ajax&ac=weibo_publish&task=1&js_return=TASK_KEY&flag=sina&text=1',null,null,'jsonp');
             $.get('http://passport.115.com/?ct=ajax&ac=weibo_publish&task=1&js_return=TASK_KEY&flag=tqq&text=1',null,null,'jsonp');
             $.get('http://115.com/?ct=ajax_user&ac=checkin');
             $.get('http://115.com/?ct=yao',function(s){
                 var r=s.match(/var take_to.en = '([^']*)/);
                 var s='';
                 if(r[1]!=''){
                     var z= $.ajax({url:'http://115.com/?ct=ajax_user&ac=pick_spaces&u=1&to'+'ken='+r[1],type:'get',async:false});
                     var j=JSON.parse(z.responseText);
                     s=j.picked;
                 }
                 uWin. Core.Message.Alert({
                     text: '已经尝试签到,发微博以及摇一摇',
                     content: (s=='')?'已经摇一摇':('摇一摇获得空间'+s),
                     type:'suc'
                 });
                 
             });
             
             
         });
         $('.nav a:first ').before('<a href="/?115">完整版</a><em>|</em>');
         $('object').not('#js_ocx_control_object').remove();
         $('embed').not('#js_ocx_control_object').remove(); 
         $('#JS_NAV_ID_T_SITE_MAP').remove()
         $('script').each(function(i,s){
             var src=$(s).attr('src');
             if(src==undefined)return;
             if(src.search(/pet|im|extends|list/)!=-1)
             {$(s).remove();}
         });
         
         
         
     }
     function Full()
     {
         $('.nav a:first ').before('<a href="/" class="Flag">精简版</a><em>|</em>');
     }
     function Main(){
         if($('.Flag').length>0)return;
         var isLite=(location.href.match(/115$/)==null);
         if(isLite){
             Lite();
         }
         else Full();
     }
     Main();
     //$(document).ready(Main);
     
     
     
 })();