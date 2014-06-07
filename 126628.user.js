// ==UserScript==
// @name       redmine edit page tweak
// @namespace  http://hexaedge.net/
// @version    0.1
// @description  redmineの編集画面を便利にする
// @include    http://*/redmine*issues/*
// @require              http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2011+, iguu
// ==/UserScript==

jQuery("#update").show();//更新画面を最初から表示

//ワンボタン終了
jQuery("#issue_status_id").after("<button type='button' id='btn_finish_with_100'>100%にして終了</button>");
jQuery("#btn_finish_with_100").click(function(){
    jQuery("#issue_status_id").val("5");//終了
    jQuery("#issue_done_ratio").val("100");//100%
    jQuery("input[name=commit]").trigger("click");
});

//ワンボタン100%
jQuery("#issue_done_ratio").before("<button type='button' id='btn_100'>100%にする</button><br>");
jQuery("#btn_100").click(function(){
    jQuery("#issue_done_ratio").val("100");//100%
    jQuery("input[name=commit]").trigger("click");
});

//新規だったら色々勝手にセット
if(jQuery("#issue_subject").val()==""){
    jQuery("#issue_tracker_id").val("13");
    jQuery("#issue_assigned_to_id").val("23");
    //jQuery("#issue_category_id").val("32");//好きなid
    jQuery("#issue_category_id").val("34");
}