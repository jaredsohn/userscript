// ==UserScript==
// @name       Weibo simplify
// @namespace  http://uanguei.info/
// @version    0.1
// @description  A script wrote to simplify weibo portal. 
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match      http://*.weibo.com/*
// @copyright  2012+, Wayne Wang
// ==/UserScript==

var puzzlega = window.puzzlage || {};
puzzlega.weibo = {
    HIDE_PARTS : ['#pl_content_biztips','#pl_rightmod_yunying',
                  '#trustPagelet_recom_interestv5','#pl_rightmod_groups','#pl_business_enterpriseWeiboNew',
                  '#pl_rightmod_ads35','#trustPagelet_recom_memberv5','#trustPagelet_recom_allinonev5',
                  'div[node-type=recommendTopic]','div.gn_nav div.gn_title','#pl_leftnav_app',
                  'a.icon_sw_face','a.icon_sw_movie','a.icon_sw_music','a.icon_sw_vote','a.icon_sw_mood','a.icon_sw_welfare'],
    HideEverything: function(){
        for(var i =0 ; i< this.HIDE_PARTS.length; i++){
            $(this.HIDE_PARTS[i]).css('display','none');
        }},
    ResetCssStyle : function(){
        //float search box to right
        $('div.gn_search').css('float','right');
    },
    TriggerElements: function(){
        //TODO:
    },
    Main: function(){
        this.HideEverything();
        this.ResetCssStyle();
        this.TriggerElements();
    }
};

$(function(){
    puzzlega.weibo.Main();
});