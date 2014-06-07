// ==UserScript==
// @name         山东大学数据库实验辅助脚本
// @namespace   www.cnblogs.com/findxiaoxun
// @description 写数据库实验的时候，提交的时候只能点击那个按钮，这个脚本就是解放鼠标，用Ctrl+回车来实现命令提交的功能的
// @include     https://211.87.224.23:1158/em/console/database/instance/*
// @version     0.1
// ==/UserScript==
document.onkeydown=function press(oEvent) 
        { 
            if(oEvent.ctrlKey && oEvent.keyCode==13) 
            { 
            document.getElementById("executeBtn").click(); 
            return false; 
            } 
} 
