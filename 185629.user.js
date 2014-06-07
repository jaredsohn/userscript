// ==UserScript==
// @name       Report to Tibit
// @namespace  http://megaviews.net/
// @version    0.1
// @description  This allows you to report posts from the Empire SF directly to Tibit
// @include      *hackforums.net*
// @require      http://code.jquery.com/jquery-1.10.2.min.js
// @grant       GM_xmlhttpRequest
// @copyright  2013, 1n9i9c7om
// ==/UserScript==

function getUserId()
{
    return $("a[href*='member.php']").first().attr("href").split("&")[1].split("=")[1];   
}

function injectButtons()
{
    var postData, tid, i, pid, id, button, uid;
    if($('a[href="forumdisplay.php?fid=242"]').length <= 0){ //make the button only appear in the empire subforum
        return;
    }
    postData = $('#posts .tborder');
    tid = document.URL.split('tid=')[1].split('&')[0];
    uid = getUserId();
    for(i=0; i<postData.length; i++){
        if(postData[i].outerHTML.indexOf('id="post_meta_') != -1){                
            pid = postData[i].outerHTML.split('id="post_meta_')[1].split('">')[0];
            button = '<a href="javascript:void(0);" onClick=\'MyBB.popupWindow("http://megaproducts.org/empire/report.php?pid='+pid+'&tid='+tid+'&uid='+uid+'", "reportPost", 400, 300);\' class="bitButton" id="'+id+'" title="Report to Tibit">Report to Tibit</a>';
            $($('.post_management_buttons')[i]).prepend(button); 
        }
    }
}
$(document).ready(function() {
    injectButtons();
}); 