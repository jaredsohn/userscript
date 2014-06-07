// ==UserScript==
// @name         Baidu Zhidao Thread Notification
// @version      1.1
// @description  在贴吧对来自百度知道的贴子进行提醒和删除。
// @match        http://tieba.baidu.com/p/*
// @match        http://tieba.baidu.com/f?*z=*
// @include      http://tieba.baidu.com/p/*
// @include      http://tieba.baidu.com/f?*z=*
// @author       864907600cc
// @grant        none
// @run-at       document-end
// @icon	     http://1.gravatar.com/avatar/147834caf9ccb0a66b2505c753747867
// ==/UserScript==

// 贴子判断方式由 8qwe24657913 提供
// 本脚本基于 GPLv3 协议开源 http://www.gnu.org/licenses/gpl.html‎
// (c) 86497600cc. Some Rights Reserved.


var context='警告：该贴子来自百度知道！'; // 此处定义提醒文字
var class_name='zhidao_thread_notification'; // 此处定义框架的 class
var stylesheet='.zhidao_thread_notification{-webkit-animation:"kill_17" 1s ease-in;animation:"kill_17" 1s ease-in;width:100%;height:75px;line-height:75px;position:fixed;z-index:99999;bottom:0px;left:0px;pointer-events:none;background:rgba(255,0,0,0.5);font-size:32px;color:#FFF;text-shadow:0 0 5px #F00;text-align:center}@-webkit-keyframes kill_17{from{opacity:0;bottom:-50px}to{opacity:1;bottom:0px}}@keyframes kill_17{from{opacity:0;bottom:-50px}to{opacity:1;bottom:0px}}'; // 此处定义样式表（请使用完整样式表，而不是仅提供属性）
var kill=0; // 此处定义是否自动删除来自知道的贴子，0 为不删除，1 为删除，需要吧务权限，默认不开启
var kill_timeout=3000; // 此处定义执行删除操作的等待时间，单位为毫秒，需开启自动删除
var close_tiemout=3000; // 此处定义执行删除操作成功后关闭页面的等待时间，单位为毫秒，需开启自动删除

// 下面的内容除非特殊需要请不要修改
// GM_addStyle(stylesheet) // 为什么加上这货在 Firefox 上就显示不了，即便设定了 @grant _(:з」∠)_
var ss=document.createElement('style');
ss.textContent=stylesheet;
document.head.appendChild(ss);

if(PageData.thread.thread_type=='17'){
    var node=document.createElement('div');
    node.textContent=context;
    node.className=class_name;
    document.body.appendChild(node);
    if(kill==1&&(PageData.user.bawu==1||PageData.user.bawu==2)){
        var xhr=new XMLHttpRequest(),
            form=new FormData();
        setTimeout(function(){
            node.textContent='正在删除贴子……';
            form.append('commit_fr','pb');
            form.append('ie','utf-8');
            form.append('kw',PageData.forum_name);
            form.append('fid',PageData.forum_id);
            form.append('tid',PageData.thread.id);
            form.append('tbs',PageData.tbs); // 居然不需要额外获取 tbs……
            xhr.onreadystatechange=function(){
		    	if(xhr.readyState==4&&xhr.status==200){
                    var callback=JSON.parse(xhr.responseText);
                    if(callback.err_code==0){
                        node.textContent='该贴子已删除，稍后关闭该页面……';
                        setTimeout(function(){
                            window.open('','_self','');
                            window.close();
                        },close_tiemout)
                    }
                    else{
                        node.textContent='贴子删除失败，错误码：'+callback.err_code;
                        console.error('贴子删除失败，错误码：'+callback.err_code+'，错误信息：'+callback.error);
                    }
                }
            }
            xhr.open('POST','http://tieba.baidu.com/f/commit/thread/delete');
            xhr.send(form);
        },kill_timeout)
    }
}