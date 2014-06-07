// ==UserScript==
// @name       SinaWeibo ads remove
// @namespace  https://github.com/stormslowly/myuserscript 
// @version    0.3.2
// @require    http://lib.sinaapp.com/js/jquery/2.0/jquery.min.js
// @description  新浪微博去广告脚本，https://github.com/stormslowly/myuserscript
// @match      http://www.weibo.com/*
// @match      http://weibo.com/*
// @updateURL https://userscripts.org/scripts/source/176158.meta.js
// @downloadURL https://userscripts.org/scripts/source/176158.user.js
// @copyright  The MIT License (MIT)
// ==/UserScript==

(function(){

  $(func)

  setInterval(function(){
    remove_ad_in_main_content();
  },4000)
  
  remove_ad_in_main_content();

  function func(){
    $("#pl_content_homeFeed").bind("DOMNodeInserted",function(e){
      remove_ad_in_main_content();
    })
    // show all groups    
    var ele = document.querySelector("div[node-type=moreList]");
    if(ele!==null){
      ele.style.cssText="";
    }
    blockBySelector("a[node-type=moreBtn]");  
  }

  function remove_ad_in_main_content(){
    // remove noise divs
    var block_id_list =[ 
      "pl_content_setSkin",
      "pl_business_enterpriseWeiboNew",
      "trustPagelet_checkin_lotteryv5",
      "pl_rightmod_userguide",
      "trustPagelet_indexright_recom",
      "trustPagelet_recom_memberv5",
      "pl_rightmod_ads36",
      "pl_rightmod_vservice",
      "pl_rightmod_noticeboard",
      "pl_content_bubBox",
      "pl_content_biztips",
      "pl_leftnav_app",
      "trustPagelet_indexright_recom"
    ]

    for (var i = block_id_list.length - 1; i >= 0; i--) {
       blockElementById(block_id_list[i]);
    }  
      
    blockBySelector("div[node-type=feed_spread]");
    blockBySelector("div[feedtype=ad]");
    blockBySelector("div[node-type=recommendTopic]");  

  }

  function blockElementById(id){
    if(document.getElementById(id)!==null){
      document.getElementById(id).remove();
    }
  }

  function blockBySelector(sel){
    var sels = document.querySelectorAll(sel);
    if(sels!==null){
      for(var i = 0; i<sels.length;i++){
        sels[i].remove();
      }
    }
  }

})()