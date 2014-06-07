// ==UserScript==
// @name           Delete Twitter Messages
// @namespace      victor.rodriguez.name
// @description    Delete your twitter direct messages. Victor Rodriguez Gil victor.rodriguez.gil@gmail.com
// @include        http://twitter.com/direct_messages*
// ==/UserScript==
var prevUrl = GM_getValue("previousUrl");
if(prevUrl && prevUrl!='' && prevUrl!=document.location.href){
    GM_setValue("previousUrl",'')
    document.location.href = prevUrl;
}

var aAs = document.getElementsByTagName("a");
for(var i=0;i<aAs.length;i++){
    var el = aAs[i];
    if(/twitter.com\/direct_messages\/destroy/.test(el.href)){
        document.location.href=el.href;
        GM_setValue("previousUrl",document.location.href);
        return;
    }
}
