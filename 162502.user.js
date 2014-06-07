// ==UserScript==
// @include      *read*tid*
// @include      *thread*
// @include      *forum*fid*
// @include      *tieba.baidu.com/p/*
// @exclude      *.google.*
// @name BBS NoWater
// @author tumuyan
// @version 0.2
// @namespace   http://userscripts.org/users/tumuyan
// @description 
// ==/UserScript==
var posttext=document.querySelectorAll(".l_post")

i=posttext.length
if (i)
{
    for (i=i-1;i>0;i--)
    {
    	try {if (posttext[i].querySelectorAll(".d_post_content")[0].innerText.match(/^\s*$/)) {posttext[i].innerHTML='' }}catch(err){}     
     }
}


var posttext=document.querySelectorAll("div[id^='post_']")

i=posttext.length
if (i)
{
    for (i=i-1;i>0;i--)
    {
        try {if (posttext[i].querySelectorAll("div[id^='postmessage_']")[0].innerText.match(/^\s*$/)) {posttext[i].innerHTML='' } }catch(err){}     

    }
}



var posttext=document.querySelectorAll('div[class="mainbox viewthread"]')

i=posttext.length
if (i)
{
    for (i=i-1;i>0;i--)
    {
        try {if (posttext[i].querySelectorAll("div[id^='postmessage_']")[0].innerText.match(/^\s*$/)) {posttext[i].innerHTML='' } }catch(err){}     

    }
}


var posttext=document.querySelectorAll(".read_t")

i=posttext.length
if (i)
{
    for (i=i-1;i>0;i--)
    {
        try {if (posttext[i].querySelectorAll(".tpc_content")[0].innerText.match(/^\s*$/i)) {posttext[i].innerHTML='' } }catch(err){}     
     }
}