// ==UserScript==
// @name        asanusta Tumblr auto Blog seçme
// @description Belirli bir blog otomatik seçecek şekilde nasıl değiştirebilirsiniz? 
// @version 01.09.2012
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