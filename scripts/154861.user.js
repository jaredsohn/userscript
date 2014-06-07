// ==UserScript==
// @name		FiMFiction Image Fixer
// @description	Shows images in comments on FiMFiction
// @include		http*//www.fimfiction.net/blog/*
// @include		http*//www.fimfiction.net/story/*
// @include		http*//www.fimfiction.net/chapter/*
// @include		http*//www.fimfiction.net/user/*
// @include		http*//mobile.fimfiction.net/blog/*
// @include		http*//mobile.fimfiction.net/story/*
// @include		http*//mobile.fimfiction.net/chapter/*
// @include		http*//mobile.fimfiction.net/user/*
// @version		5
// @grant		none
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = 'function fixImages(){var e=document.body.getElementsByClassName("user_image_link");while(e.length>0){try{var t=e[0].href;var n=document.createElement("img");n.src=t;n.className="user_image";n.onclick=\'this.className=(this.className=="user_image"?"user_image user_image_expanded":"user_image");\';if(e[0].parentNode.previousElementSibling!=null){e[0].parentNode.previousElementSibling.appendChild(n);e[0].parentNode.parentNode.removeChild(e[0].parentNode)}else{e[0].parentNode.parentNode.replaceChild(n,e[0].parentNode)}}catch(r){console.log(r)}}}fixImages();$(document).off("click",".refresh_comments");$(document).on("click",".refresh_comments",function(){GoToCommentPage($("#story_comments"),page_num,function(){fixImages()},false)})';
document.body.appendChild(script);