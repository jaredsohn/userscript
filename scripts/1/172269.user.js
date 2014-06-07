// ==UserScript==
// @name       localhost
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http*://*/*
// @include      *
// @require      http://code.jquery.com/jquery-latest.js
// @copyright  2012+, You
// ==/UserScript==

//源码
//http://userscripts.org/scripts/edit_src/172269

$(function(){
    reg=/^http:\/\/localhost.*\/zh-cn\/user\/.*/;  
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        objUserName.value = "admin@sigilsoft.com";
        objPassword.value = "1";
        $('input#Login').click();
    }
})
//移动库存 - 本地68 
$(function(){
    reg=/^http:\/\/localhost:68.*\/zh-cn\/user\/.*/;  
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        objUserName.value = "admin@sigilsoft.com";
        objPassword.value = "1";
        $('input#Login').click();
    }
})
//旅游地接 - 本地60
$(function(){
  reg=/^http:\/\/localhost:60.*\/zh-cn\/user\/.*/;  
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        objUserName.value = "tadmin@dixontravelandtour.com.au";
        objPassword.value = "Sigil2017,";
        $('input#Login').click();
    }
})
//移动库存-服务器
$(function(){
    reg = /^http:\/\/sig68\.sigilsoft\.com\/.*zh-cn\/user\/$/;
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        
        objUserName.value = "admin@sigilsoft.com";
        objPassword.value = "1";
        
        $('input#Login').click();
    }
})
//旅游地接-服务器
$(function(){
    reg = /^http:\/\/sig60\.sigilsoft\.com.*$/;
    if(reg.test(window.location)){
    	window.location.href="http://www.dixontravelandtour.com.au";
    }
    reg = /^http:\/\/www\.dixontravelandtour\.com\.au\/.*$/;
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        
        objUserName.value = "tadmin@dixontravelandtour.com.au";
        objPassword.value = "Sigil2017,";
        
        $('input#Login').click();
    }
})
//汽车人才网-服务器
$(function(){
    reg = /^http:\/\/sig52\.sigilsoft\.com\/sigil\/zh-cn\/user\/$/;
    if(reg.test(window.location)){
        var objUserName = document.getElementById("UserName");
        var objPassword = document.getElementById("Password");
        
        objUserName.value = "admin@sigilsoft.com";
        objPassword.value = "20082008,";
        
        $('input#Login').click();
    }
})