// ==UserScript==
// @name       Saucenao Forge
// @namespace  http://saucenao.com/
// @version    1.0
// @description  Auto Repost to Pixiv or Google
// @match      http://saucenao.com/search.php?*
// @copyright  2012, XpAhH
// ==/UserScript==
var pp=document.querySelector(".descriptor").innerText.match(/\d+\.\d+/)/1;
if(history.length<3&&pp>85)GM_openInTab(document.querySelector("#primarytext a").href);
if(pp>60){
    var d=document.createElement("textarea");
    d.textContent=document.querySelector(".linkify").innerText+" - "+document.querySelector("#primarytext strong").innerText;
    document.querySelectorAll("#primarytext p")[1].appendChild(d);
    d.onfocus=function(a){a=this;setTimeout(function(){a.select()},1)};
}else {//匹配度60%以下
    location="http://www.google.com/searchbyimage?image_url="+location.href.match("url=(.+)$")[1];
    //GM_openInTab("http://www.google.com/searchbyimage?image_url="+location.href.match("url=(.+)$")[1]);//document.querySelector("#primaryimage img").src
    //parent.eval('window.opener=null;window.open("","_self");window.close();');
}
