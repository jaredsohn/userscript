// ==UserScript==
// @name            FeedlyTool mini Save For Later
// @version         0.0.1
// @author          kik0220
// @namespace       https://sites.google.com/site/feedlytool/
// @description     Display "Save for Later" count. This is the edition that was limited to Save For Later feature Chrome extension of "FeedlyTool".
// @description:ja  「Save for Later」の件数を表示します。これはChrome拡張「FeedlyTool」のSave For Later機能に限定したものです。
// @icon            http://feedlytool.kk22.jp/icon.png
// @match           http://feedly.com/*
// @match           https://feedly.com/*
// @exclude         http://feedly.com/#welcome
// @exclude         https://feedly.com/#welcome
// @copyright       2013+, kik0220
// ==/UserScript==

var accessToken = '';
var userId = '';
var location = '';
var currentDir = '';
var CSS = [
  '#feedlyTool_savedTab_count { float: right; font-size: 10px; opacity: 0.75; }',
  '#savedtab_label { float: left; }'
].join('');

GM_addStyle(CSS);
document.addEventListener("DOMSubtreeModified", getCookie, false);
document.body.addEventListener("DOMSubtreeModified", function (e) {
    if (location !== document.location.href) {
        location = document.location.href;
        getSaved();
    }
}, false);

function getCookie(){
    var all = document.cookie;
    if(all === null){return;}
    all = all.split(';');
    for(var i = 0; i < all.length; i++){
        var cookie = all[i];
        if(cookie.indexOf('session@cloud=') < 0){continue;}
        var json;
        try{
            json = JSON.parse(cookie.replace('session@cloud=', ''));
            accessToken = json.feedlyToken;
            userId = json.feedlyId;
        } catch(e) {return;}
        document.removeEventListener("DOMSubtreeModified", getCookie, false);
        getSaved();
        return;
    }
}

function getSaved(){
    if(!accessToken||!userId){return;}
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://cloud.feedly.com/v3/markers/tags',
        headers: {
            'Authorization': 'OAuth '+accessToken,
        },
        onload: function(responseDetails) {
            if(responseDetails.status !== 200){return;}
            var response = JSON.parse(responseDetails.responseText);
            var count = response.taggedEntries['user/'+userId+'/tag/global.saved'].length;
            var target = document.getElementById('feedlyTool_savedTab_count');
            var targetParent = document.getElementById('savedtab');
            if(target){
                target.innerText = count;
            } else if(targetParent) {
                targetParent.innerHTML += '<div id="feedlyTool_savedTab_count">'+ count +'</div>';
            }
        }
    });
}
