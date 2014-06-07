// ==UserScript==
// @name         AcgZone Bypass
// @namespace    http://jixun.org/
// @version      1.0.1.0
// @description  喜闻乐见大快人心
// @match        http://acgzone.us/*
// @copyright    2012+, jixun66, http://jixun.org/
// ==/UserScript==

var wait;
var d         = document;
var body      = d.getElementsByTagName ('body')[0];
var localhref = d.location.toString();
var acgzoneId = location.pathname.match(/^\/(\d+)$/)[1];
var temp      = d.getElementsByClassName ('entry-content');
var server    = 'dl.jixun.org';
 // server    = 'localhost';
/*
 *  Notification box
 *    -- Display log etc.
 *         -- From: acfun.tv
 */
var notificationCSS = '/* Notification box CSS */';
var notification    = d.createElement("div");
notificationCSS += "#notify  { position: fixed; left: 16px; bottom: 32px; width: auto; text-align: left; z-index: 10000; background-color: rgba(0, 0, 0, 0.9); margin: 0; padding: 0; border-radius: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); }";
notificationCSS += "#notify .item { width: auto; min-height: 16px; height: auto!important; line-height: 16px; font-size: 14px; font-weight: bold; display: block; position: relative; color: white; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); padding: 0 4px; margin: 8px 4px; border-left: 4px solid #C00; z-index: 9998; word-wrap: break-word; -webkit-transition: opacity 5s ease-in; -moz-transition: opacity 5s ease-in; -o-transition: opacity 5s ease-in; }";
notificationCSS += '.comment-content {word-break: break-all;}';
GM_addStyle(notificationCSS);
notification.id = "notify";
body.appendChild (notification);
function removeElement (elementNode) { try { elementNode.parentNode.removeChild (elementNode); } catch (e) { /* Do nothing */ } }
function fade_out (Ele) { Ele.style.opacity = 0; setTimeout( function () { removeElement (Ele); } , 5100); }
function AddLog (Code, Delay) {
    if (Delay == undefined) { Delay = 500; /* 500 ms delay. */    } 
    var p = d.createElement("p");
    p.className = 'item';
    p.innerHTML = Code;
    p.addEventListener('click', function () { fade_out (this) }, true);
    notification.appendChild (p);
    if (Delay >= 0) { setTimeout (function () { fade_out (p) }, Delay); }
}
AddLog ('脚本开始执行 >.>');
/* 
 *  Google One plus fix - v2
 *    -- Horizontal scroller
 *         -- jixun66
 */
d.querySelector ('#secondary').style.overflow = 'hidden';
AddLog ('修正谷歌 One Plus 造成的横向滚动条错误 0v0');

/* 
 *  Acgzone Check Open Reg Menu
 *     -- jixun66
 */
var a = document.querySelectorAll ('li.menu-item');
var b = a[a.length-1];
var c = b.cloneNode(true).querySelector ('a');
c.href = "javascript:void(0);";
c.id="checkReg";
c.innerHTML = "检查是否开放注册";
c.addEventListener('click', function () { checkReg (); }, true);
b.parentNode.appendChild (c.parentNode);
function checkReg () {
    AddLog ('检查是否开放注册 >.>');
    GM_xmlhttpRequest({
    method : 'GET',
    synchronous : true,
    url : "http://acgzone.us/wp-login.php?action=register",
    onload : function (Response) {
        var r = Response.responseText;
        AddLog ((r.indexOf ('新用户注册暂时关闭。') != -1) ? '注册未开放 ╮(╯▽╰)╭' : '貌似开放注册了哦，赶快啊！');
    },
    onerror : function () {
        AddLog ('网络连接中断');
    }});
}
GM_registerMenuCommand('检查是否开放注册', checkReg);
function main_acgzone () {
    try {
        var entryContent = temp [0];
        if (    acgzoneId == ""
             || d.getElementById('wp-admin-bar-my-account') != null
           ) { AddLog ('乃已经有账号了啦 >.<'); return; } // 有权限或不在文章中则退出脚本
    } catch (e) { AddLog ('未找到网页内容 >.>'); return; }
    // entryContent.removeChild(entryContent.getElementsByTagName('div')[0]); // 移除登录提示
    AddLog ('开始传输网页内容，请稍后 >.>');
    wait = true;
    GM_xmlhttpRequest({
        method : 'GET',
        synchronous : true,
        url : "http://" + server + "/getACGZone.php?id=" + acgzoneId,
        onload : function (Response) {
            entryContent.innerHTML = Response.responseText.replace(/<(\/|)noscript>/gi, '');
            AddLog ('传输完毕，骚年不来一发么～');
        },
        onerror : function () {
            AddLog ('网络连接中断');
        }});
}
main_acgzone ();
if (!wait) { AddLog ('脚本执行完毕 0v0'); }