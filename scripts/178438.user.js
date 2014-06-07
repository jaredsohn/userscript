// ==UserScript==
// @name        tieba_hide_by_level
// @namespace   tieba
// @description 根据条件隐藏某些人的发言
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*
// @version     1
// ==/UserScript==

//指定要生效的贴吧
var ActTbName=["firefox","chrome","opera","windows8"];

//指定分割等级(包含该等级)
var ActLevel=8;


/** 以下函数执行，改动请注意(￣︶￣)↗*/
//逻辑函数库
Array.prototype.Exists=function(v){var b=false;for(var i=0;i<this.length;i++){if(this[i]==v){b=true;break;}}return b;}

//贴吧名
var TBname=(document.getElementById('tab_forumname').innerHTML).replace('吧','');

//检测到生效贴吧
if(ActTbName.Exists(TBname)){
var posts=document.getElementsByClassName('l_post');
css='';
for(n=0;n<=ActLevel;n++){
css+='.l_post[data-field*=\'\"grade_level\":'+n+',\']> *{\
height:0px!important;\
padding:0!Important;\
opacity:0;\
}\n\
.l_post[data-field*=\'\"grade_level\":'+n+',\']:hover > *{\
display:block;\
opacity:1;\
height:auto !important;\
-moz-transition:1s;\
}\n\
.l_post[data-field*=\'\"grade_level\":'+n+',\']:before{\
content:\"此楼被人工隐藏，划过重新显示(￣︶￣)↗\";\
display:block;\
background-color:#B2B2B2;\
text-align:center;\
line-height:2;\
cursor:pointer;\
}\n\
';
}
GM_addStyle(css);
}