// ==UserScript==
// @name       2012 Fanfou Jumper
// @namespace  http://mooninsky.net/
// @version    0.2
// @description  Force to jump to 2012 Fanfou
// @match      http://fanfou.com/*
// @match      http://2012.fanfou.com/*
// @copyright  2012+, Claud 
// @run-at document-start
// ==/UserScript==

//Style and disable Ads
function filterSite(){

    GM_addStyle(
        "#header {background:rgba(20, 20, 20, 0.5)!important} " + 
        ".timeline-msg:nth-child(odd） {background:#eeeeee!important} " +
        "* {font-family:微软雅黑!important;} " +
        "#main-content {color:black;} " +
        ".former,.msg-author {color:darkblue;} " +
        ".label {color:darkKhaki;font-size:10px} " +
        ".msg-content {font-size:10pt!important;} " + 
        ".timeline-msg  {border-bottom:1px dotted #aaaaaa!important;} " +      
        ".misc-info {display:none!important} " 
    );
  
}

//Post handling
function endAction(){
   console.log("后续处理");
}

//Organized actions
function init(){
    //Get Current Page Url
    var strUrl=window.location.href;
    var patrn=/^http:\/\/fanfou.com/; 
    if (patrn.exec(strUrl)) {
        var jumpUrl = strUrl.replace(/^http:\/\/fanfou(.*)/, 'http://2012.fanfou$1/');
        window.location.href = jumpUrl;
    } else {
        console.log("调整2012版本页面...");
        filterSite();
    }
    
    document.addEventListener("DOMContentLoaded", endAction, false);
  
}


//Run!
init();
