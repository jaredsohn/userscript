// ==UserScript==
// @name           google
// @namespace      Magewar
// @include        http://www.google.dk
// @include        http://www.google.com
// ==/UserScript==
var replaced = false;
try{
var billed = document.createElement("img");
billed.setAttribute("src" ,"http://3.bp.blogspot.com/_jjgksVeNn3c/SaXz1cKisSI/AAAAAAAABZ0/A1hP3DB3epI/s320/google-knows-infoniac.jpg");
var divs  = document.getElementsByTagName("div");
var imgs = document.getElementsByTagName("img");
var igoogle = document.getElementById("regular_logo");
//alert(igoogle.id);
if(igoogle)
{
    var width = igoogle.clientWidth;
    var height = igoogle.clientHeight;
    billed.setAttribute("height",height);
    billed.setAttribute("width",width);
    igoogle.parentNode.replaceChild(billed,igoogle);
    replaced = true;
   // for(var i =0;i<;i++)
    //{alert(igoogle.attributes[i]);                  }
}
if(!replaced){
    for(var i =0;i<divs.length;i++)
    {
        if(divs[i].title =="Google")
        {
        divs[i].parentNode.replaceChild(billed,divs[i]);
        replaced = true;
        }
    } 
}
if(!replaced) { 
    imgs[0].parentNode.replaceChild(billed,imgs[0]);
    }
}catch(e){alert(e.message);}