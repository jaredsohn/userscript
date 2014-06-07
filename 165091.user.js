// ==UserScript==
// @name        CSDN 免积分下载
// @description http://www.poboke.com/csdn 大大提供的免积分
// @license			MIT License
// @include     http://download.csdn.net/detail/*
// @include     http://download.csdn.net/download/*
// @include     http://www.poboke.com/csdn/unknown
// @namespace   itkso.com
// @version     0.0.5
// @require     http://pajhome.org.uk/crypt/md5/md5.js
// @updateURL https://userscripts.org/scripts/source/165091.meta.js
// @downloadURL https://userscripts.org/scripts/source/165091.user.js
// @grant			GM_xmlhttpRequest
// @grant			GM_setValue
// @grant			GM_getValue
// @grant		   unsafeWindow
// @author			@nowind
// ==/UserScript==
// 6-29 修正需验证码的接口

(function()
 {
     'use strict';
     // 调试开关 
     var _LOG=true;
     function Log(s){if(_LOG)console.log(s);};
     var MustGetUnsafeWin=function()
     {
         if(window.unsafeWindow)return unsafeWindow;
         var c=document.createElement('div');
         c.setAttribute('onclick','return window');
         return c.onclick();
     };
     var uWin=MustGetUnsafeWin();
     var $=uWin.jQuery;
     if(location.href.indexOf('http://www.poboke.com/csdn/unknown')>-1)
     {
         $('body *').remove();
         $('<img/>').attr('src','http://www.poboke.com/wp-content/themes/QQ/captcha/captchax.php?t='+new Date()).appendTo($('body'));
         return;
     }
     var node=$('.info li')[0];
     var sp=location.href.split('/');
     var id=sp[sp.length-1].match(/\d*/)[0];
     var isDownloaded=false;
     $(node).append('&nbsp;&nbsp;<iframe id="chk_img"  style="display:none;width:50px;height:25px;border-style:none;" /><input type="text" id="chk_code" style="display:none;width:35px;" /><a id="csdn_download" ref="nochk" href="#">获取免积分地址</a>');
     $('#csdn_download').click(function()
                               {
                                   if(isDownloaded)return;
                                   var ref=$(this).attr('ref');
                                   if(ref=='nochk')
                                       GM_xmlhttpRequest({
                                           method: "GET",
                                           url: "http://www.poboke.com/wp-content/themes/QQ/csdnformac.php?token="+hex_md5(hex_md5('sunofbeach'+id))+"&id="+id,
                                           onload: function(response) {
                                               Log(response);
                                               if(response.responseText.search('http')>-1){
                                                   $('#csdn_download').attr('href',response.responseText).html('开始下载');
                                                   isDownloaded=true;
                                               }
                                               else{
                                                   Log('获取失败');
                                                   $('#chk_img').attr('src','http://www.poboke.com/csdn/unknown').show();
                                                   $('#chk_code').show();
                                                   $('#csdn_download').html('来自破博客.点击').attr('ref','chk');
                                               }
                                           }
                                       } );
                                   else if(ref=='chk')
                                       GM_xmlhttpRequest({
                                           method: "GET",
                                           url: 'http://www.poboke.com/wp-content/themes/QQ/csdn20130605.php?id='+id+'&captcha='+encodeURI($('#chk_code').attr('value')),
                                           headers:
                                           {
                                               'Referer':'http://www.poboke.com/csdn'
                                           },
                                           onload: function(response) {
                                               if(response.responseText.search('http')>-1){
                                                   $('#csdn_download').attr('href',response.responseText).html('开始下载');
                                                   isDownloaded=true;
                                               }
                                               else{
                                                   alert('获取失败:'+response.responseText);
                                                   Log('获取失败:'+response.responseText);
                                               }
                                           }
                                       } );
                                       });
     
     
 })();