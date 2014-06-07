// ==UserScript==
// @name          yearVip
// @namespace     http://www.dachie.com/userscript/
// @description   QQ年费会员每日礼包 自动抽奖脚本（2013）
// @include       http://vip.qq.com/clubact/2013/yearGift/*
// @license			Public Domain
// @developer		Dachie
// @version 		2.0.2
// @updateURL		http://www.dachie.com/userscript/yearVip.user.js
// ==/UserScript==
window.onload = function () {
    var __init = function () {
        (function () {
            var i = 0, l = 4, one, two,big=true;            
            one = setInterval(function () {      
                if(big){
                	document.querySelector(".y_mod_btn1").click();
                    big=!big;
                }else{
                    var I = document.querySelectorAll(".y_gift_show_col2")[0].firstElementChild.querySelectorAll(".y_mod_btn2")[i];
                    I.click();
                    i = i + 1;
                }
                two = setTimeout(function () {
                    document.querySelectorAll(".btn_fit_em_pop")[i].click();
                    if (i >= l) {
                        document.getElementById("prize_list_btn").click();
                        alert("今日抽奖已完成！");
                        clearInterval(one);
                        clearTimeout(two);
                    }
                }, 1000);
            }, 2000);
        })(window);
    };
    __init();
};
