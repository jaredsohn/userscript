// ==UserScript==
// @run-at document-start
// @name           Mouse Gestures By Sing Chu
// @description    修改自SilvanT Mouse Gestures脚本 增加 向上向下移动 移至页顶页尾功能 主要是自用 安装方便
// @author         Sing Chu
// @version        1.1
// @include        *
// @exclude        account.spacetimestudios.*
// ==/UserScript==


var BTN_RIGHT = 2;
var SENSITIVITY = 15; //Pixels moved until gesture is registered
var startX;
var startY;
var gesture = "";
var preventContextMenu = false;
var gestures = {
        
        u: function(){window.scrollBy(0,45-window.innerHeight);}, //向上移动
        d: function(){window.scrollBy(0,window.innerHeight-45);}, //向下移动
        l : function(){window.history.back()},                    //后退
        r : function(){window.history.forward()},                 //前进
        rd:function(){top.window.scrollBy(0,top.document.body.scrollHeight);window.scrollBy(0,document.body.scrollHeight);},                                          //移至页尾
        ru:function(){top.window.scrollBy(0,-top.document.body.scrollHeight);window.scrollBy(0,-document.body.scrollHeight);},                                          //移至页顶
        ud : function(){window.location.reload()},                //刷新
        udu : function(){window.location.reload(true)},           //忽略缓存刷新
}

function mgMouseDown(e)
{
        if(e.button == BTN_RIGHT) {
                startX = e.clientX;
                startY = e.clientY;
                gesture = "";
                window.addEventListener("mousemove",mgMouseMove,true);
                window.addEventListener("mouseup",mgMouseUp,true);
        }
}

function mgMouseMove(e)
{
        checkMove(startY - e.clientY, 'u', e);
        checkMove(e.clientX - startX, 'r', e);
        checkMove(e.clientY - startY, 'd', e);
        checkMove(startX - e.clientX, 'l', e);
}

function checkMove(p, t, e)
{
        if (p >= SENSITIVITY) {
                startX = e.clientX;
                startY = e.clientY;
                if (gesture[gesture.length-1] != t) {
                        gesture += t;
                }
        }
}

function mgMouseUp(e)
{
        //alert(gesture);
        preventContextMenu = false;
        if (gestures[gesture]) {
            
                gestures[gesture]();
                preventContextMenu = true;
        }
        window.removeEventListener("mousemove",mgMouseMove,true);
        window.removeEventListener("mouseup",mgMouseUp,true);
}

function mgContextMenu(e)
{
        if(preventContextMenu)
                e.preventDefault();
}

window.addEventListener("mousedown",mgMouseDown,true);
window.addEventListener("contextmenu",mgContextMenu,true);