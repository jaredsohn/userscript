// ==UserScript==
// @name        weibo cleaner
// @namespace   com.daydream.kevin
// @description clean the AD and disturbing items
// @include     http://www.weibo.com/*
// @include     http://weibo.com/*
// @version     1
// ==/UserScript==

function remove_element_by_id(id_str)
{
    var item_to_remove = document.getElementById(id_str);
    if (item_to_remove)
    {
        item_to_remove.parentNode.removeChild(item_to_remove);
    }
}

ids_to_remove = new Array("pl_rightmod_yunying",
                 "pl_business_enterpriseWeiboNew",
                 "pl_rightmode_ads35",
                 "trustPagelet_zt_hottopicv5",    //热门话题
                 "trustPagelet_recom_memberv5",   //推荐会员
                 "trustPagelet_recom_allinonev5",  
                 "pl_rightmode_ads36",
                 "pl_rightmode_vservice",         //客服信息
                 "pl_rightmode_noticeboard"
                 );
var i =0;
for ( ; i<ids_to_remove.length; i++)
{
    remove_element_by_id(ids_to_remove[i]);
}