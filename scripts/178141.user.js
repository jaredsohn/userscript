// ==UserScript==
// @name        萌妹大图预览
// @namespace   https://yande.re/post
// @include     https://yande.re/post*
// @description    关闭萌妹预览图的缩放
// @version     0.4
// ==/UserScript==

var div = document.getElementsByTagName("div");
for(var i=0;i<div.length-1;i++)
{
            for(var j=i+1;j<div.length;j++)
            {
                if(div[j].className =="inner" && div[i].className =="inner")
                {
                    var img = div[i].parentNode.getElementsByTagName("img");
                    var img1 = div[j].parentNode.getElementsByTagName("img");
                    if(img[0].height>img1[0].height)
                    {
                        var temp = div[i].parentNode.innerHTML;
                        div[i].parentNode.innerHTML = div[j].parentNode.innerHTML;
                        div[j].parentNode.innerHTML = temp;
                    }
                }
            }
            
    if(div[i].className =="inner")
    {
            var img = div[i].parentNode.getElementsByTagName("img");
            div[i].parentNode.style.width= img[0].width*2+10+"px";
            div[i].style.width= img[0].width*2+"px";
            //if(img[0].height *2<140) div[i].style.height= 140+"px";
            //else div[i].style.height= 300+"px";
            div[i].style.height= img[0].height *2 + "px";
            //img[0].style.marginTop = 150 - img[0].height +"px";
            img[0].removeAttribute("width");
            img[0].removeAttribute("height");
    }
}

/*
var img = document.getElementsByTagName("img");
for(var i=0;i<img.length;i++)
{
    if(img[i].className =="preview")
    {
         //alert(img[i].src);
         img[i].removeAttribute("width");
         img[i].removeAttribute("height");
         //img[i].width*=2;
         //img[i].height*=2;
    }
	
}
*/