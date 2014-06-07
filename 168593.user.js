// ==UserScript==
// @name        sex
// @namespace   sex
// @description dex88
// @include     http://sex8.cc/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1
// ==/UserScript==

//style
   GM_addStyle("#cate_thread,.index-info,#header,#fc_guangGao_neiRong{display:none;}"
       +"*{background:#000 !important;border:0px !important;}"
       +"a.subject,a.subject font{color:#57FF00;}"
       );
$(function() {
    if($("#ajaxtable .tr2").length > 1){
        $("#ajaxtable tr.tr2:first").nextUntil("#ajaxtable tr.tr2").css({"display":"none"});
    }
   $('a.subject').attr({'target':'_blank'});
   $("#main .t5:first").nextAll("div").css({"display":"none"});
   $("#td_post1").hover(function(){
       window.close();
    });
});
