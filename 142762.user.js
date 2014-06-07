// ==UserScript==
// @name Tumblr Select Blog to share to
// @description http://stackoverflow.com/questions/8073805/how-can-i-modify-the-tumblr-bookmarklet-to-post-to-a-specific-tumblr-blog
// @version 0.01
// ==/UserScript==

var selectOption = function (elem, value) {
    var options = elem.options;
    for(var i = 0; i < options.length; i++){
        if(options[i].innerHTML === value){
            elem.selectedIndex = i;
        }
    }
};

window.onload = function (){
    if(location.href.indexOf('tumblr.com/share') !== -1){
        selectOption(document.getElementById('channel_id'), location.hash.slice(1));
    }
};