// ==UserScript==
// @name       融都投标
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://www.hexindai.com/invest/detail.html?*
// @include    http://www.sxrong.com/invest/*
// @include    http://www.herodai.com/touzi/detail.html?*
// @include    http://www.wzdai.com/invest/detail.html?*
// @copyright  2012+, You
// ==/UserScript==
var num=投标金额，流转标填份数;
var hasPage = false;


var toubiao = document.getElementById("invest_dialog");
if(toubiao!=null){
    hasPage = true;
    toubiao.click();

    var money = document.getElementById("flow_count");
    if(money!=null){
        money.value=num;
    }else{
        money = document.getElementById("money");
        if(money!=null){
            money.value=num;
        }
    }
    
    var pass = document.getElementsByName("paypassword");
    if(pass!=null){
        hasPage = true;
        pass[0].value="你的密码";
    } 
    
    var valicode = document.getElementsByName("valicode");
    if(valicode!=null){
        valicode[0].focus();
        valicode[0].value=""
    }  
}
