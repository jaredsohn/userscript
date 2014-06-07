// ==UserScript==
// @name       Taobao Review BigPicture 
// @namespace  http://userscripts.org/users/daniyyer
// @version    0.1
// @description  show big picture in the reviews of taobao item
// @match      http://item.taobao.com/item.htm?*
// @copyright  2012+, You
// ==/UserScript==

//修改缩略图像素为400x400
function ShowBig(){
var thumb=document.getElementsByClassName("tb-r-photos-thumb");
for (var i=0;i<thumb.length;i++)
{
    var myimg=thumb[i].getElementsByTagName("img");
    var myli=thumb[i].getElementsByTagName("li");
    for(var j=0;j<myimg.length;j++)
    {
        var imsrc=myli[j].getAttribute("data-src");
        myimg[j].setAttribute("style","width:400px;height:auto;");
        myimg[j].setAttribute("src",imsrc);
        
    }
}
}

var target01=document.getElementsByClassName("tb-tab-anchor").item(1);
target01.addEventListener("click", ShowBig);