// ==UserScript==
// @name        ck-weibo
// @namespace   CK-WEIBO
// @description 写着玩儿~
// @include     http://weibo.com/caiknife*
// @version     1
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

$(function(){    
    // left
    $('#pl_leftnav_app').remove();
    // middle
    $('#pl_content_biztips').remove();
    // right
    $('#trustPagelet_recom_interestv5').remove();
    $('#trustPagelet_zt_hottopicv5').remove();
    $('#trustPagelet_recom_memberv5').remove();
    $('#trustPagelet_recom_allinonev5').remove();
    $('#pl_rightmod_noticeboard').remove();
    $('#pl_rightmod_ads35').remove();
});