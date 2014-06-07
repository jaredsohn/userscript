// ==UserScript==
// @name           removeTweetsByHashTag
// @namespace      http://mstssk.blogspot.com/
// @description    指定したハッシュタグを含む呟きをTLから削除します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

const propertyName="list";
GM_registerMenuCommand("Add hashtag[delTweetsByHashTag]", function(){
    var msg = "Type hashtag";
    var current_list = GM_getValue(propertyName,"");
    if(current_list){
        msg += "\nCurrent hashtag list: " + current_list;
    }
    var hashtag = prompt(msg).replace(/^#/,"");
    var msg = "add #"+hashtag+" ?";
    if(confirm(msg)){
        GM_setValue(propertyName, (current_list?current_list+",":"")+hashtag);
        execute();
    }
});
GM_registerMenuCommand("Remove hashtag[delTweetsByHashTag]", function(){
    var current_list = GM_getValue(propertyName,"");
    if(!current_list){
        alert("There is no hashtag in the list");
        return;
    }
    var hashtagsArray = current_list.split(",");
    var msg = "Type hashtag which you want to remove from the list."
            + "\nCurrent hashtag list: " + current_list;
    var hashtag = prompt(msg);
    if(!hashtag) return;
    for(var i=0;i<hashtagsArray.length;i++){
        if(hashtagsArray[i]==hashtag){
            if(confirm("remove #"+hashtag+" ?")){
                hashtagsArray.splice(i,1);
                GM_setValue(propertyName, hashtagsArray.join(","));
            }
            execute();
            return;
        }
    }
    alert("There is no #"+hashtag+" in the list.");
});
GM_registerMenuCommand("Reset hashtags[delTweetsByHashTag]", function(){
    if(confirm("Do you want to reset hashtag list?")){
        GM_deleteValue(propertyName);
        execute();
    }
});function execute(){
    var $=unsafeWindow.$;
    var hashtags=GM_getValue(propertyName,"").split(",");
    var selector="";
    for(var i=0;i<hashtags.length;i++){
        selector += ".hashtag"+"[title='#"+hashtags[i]+"'],";
    }
    $(selector).livequery(function(){
        var p=this.parentNode.parentNode.parentNode.parentNode;
        p.parentNode.removeChild(p);
    });}
execute();
