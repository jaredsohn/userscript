// ==UserScript==
// @name       Kaskus Lastpage Fix v0.1
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  mengganti link lastpage yg error
// @match      http://*.kaskus.co.id/forum/*
// @require    
// @copyright  2012+, Mr.Kravchenko
// ==/UserScript==
var temp = document.getElementsByClassName("jump");
var length = temp.length;
var head = "http://www.kaskus.co.id/post/";
for(var i=1; i<length; i++)
{
    if(temp[i].getAttribute("data-original-title") == "go to lastpost")
    {
        var postId = temp[i].href.substr(temp[i].href.indexOf("#post")+5);
        var linkFixed = head + postId + "#post" + postId;
   
        temp[i].href = linkFixed;
    }  
}

