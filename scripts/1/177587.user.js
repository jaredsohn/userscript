// ==UserScript==
// @name        xdgy
// @namespace   jiayuan
// @include     http://www.jiayuan.com/parties/2012/telepathy/*
// @version     1
// @grant       none
// ==/UserScript==


 document.getElementsByClassName('btn_next')[0].parentNode.innerHTML=""+document.getElementsByClassName('btn_next')[0].parentNode.innerHTML+"</br><div style='position:relative;top:-150px;'><a href='###' onclick='javascript:show_right();'>show_right</a></div>";

window.show_right=function()
{
     for(i=0;i<10;i++)
    {
        a=uid_hash_arr[document.getElementsByClassName("pngfix")[i].getAttribute("onclick").split(",")[0].split("(")[1]];
        if(a==uid_hash)
        {
            //alert(i);
            document.getElementsByClassName("pngfix")[i].click();
            break;
        }
    };
}

window.setTimeout(function(){

  

 },2000);