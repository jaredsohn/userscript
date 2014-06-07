// ==UserScript==
// @name           Better Youku
// @namespace      http://mybeky.cn/
// @include        http://v.youku.com/v_show/*
// @version        0.1
// ==/UserScript==

GM_addStyle(".s_main{width:960px}.col3_852 .left{width:640px}.videoPlay .player{width:640px;height:374px;}ul.userAction{margin-left:25px;}li.paste{margin-left:10px;}li.pFri,li.download,li.rePost,li.music{display:none;}");
var player = document.getElementById("movie_player");
var flashvars = player.getAttribute("flashvars");
flashvars = flashvars.replace(/interior/, "index");
flashvars += "&isShowRelatedVideo=false"
player.setAttribute("flashvars", flashvars);
player.parentNode.insertBefore(player, player.nextSibling);
