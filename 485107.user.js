// ==UserScript==
// @name        Facebook - Remove Sidebar Ads
// @namespace   binota
// @include     /^(http|https)://www.facebook.com/.*$/
// @version     1.2
// @grant       none
// ==/UserScript==

setInterval(function(){live()},2000);

function live(){
    if(!location.pathname.match(/\/groups\/.*/)){
        sidebar = document.getElementById("rightCol");
        mywall = document.getElementById("contentArea");
        sidebar.style.display="none";
        mywall.style.width="100%";
        //改變照片預覽的寬度
        changeImage(document.getElementsByClassName("_4-eo"));
        //changeImage(document.getElementsByClassName("_46-h", true));
        changeImage(document.getElementsByClassName("_46-i"));
        changeImage(document.getElementsByClassName("fbStoryAttachmentImage"));
    }
}

function changeImage(elementName, noHeight = false){
    for(i = 0; i < elementName.length; i++){
        elementName[i].style.width="100%";
        elementName[i].style.height="auto";
    }
}