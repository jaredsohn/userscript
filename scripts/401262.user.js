// ==UserScript==
// @name        wbo
// @namespace   komisaki
// @description 233
// @include     /^https?://(www.)?weibo.com/.*/
// @version     1.52
// @grant       none
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
//alert("hit");

$(".W_main").css({"background-image":"none","background-color":"rgba(255,255,255,0.3)"});

if(document.getElementsByClassName('W_main_a').length!=0)
    $(".W_main_a").css("background-color",rgb2rgba($(".W_main_a").css("background-color"),0.5));
if(document.getElementsByClassName('S_bg1').length!=0)
    $(".S_bg1").css("background-color",rgb2rgba($(".S_bg1").css("background-color"),0.5));
if(document.getElementsByClassName('S_bg4').length!=0)
    $(".S_bg4").css("background-color",rgb2rgba($(".S_bg4").css("background-color"),0.7));
if(document.getElementsByClassName('S_bg5').length!=0)
    $(".S_bg5").css("background-color",rgb2rgba($(".S_bg5").css("background-color"),0.7));
if(document.getElementsByClassName("S_profile_pic profile_pic_top")!=0)
    $(".S_profile_pic").css("opacity","0.8");

$("#pl_leftnav_app").remove();
$("#trustPagelet_indexright_recom").remove();
$("#trustPagelet_recom_memberv5").remove();

//$("div").remove(".WB_right_module");

function rgb2rgba(rgb,opc)
{
    var cl=rgb.replace(')',", "+opc+")");
    cl=cl.replace('rgb','rgba');
//    alert(cl);
    return cl;
}




/*



var col;

col=document.getElementsByClassName("WB_right_module");
//alert(col.length);
for(var i=0,len=col.length;i<len;++i)
{
   // if(col[i] && col[i].parentElement)
        col[i].parentNode.removeChild(col[i]);
}

//alert(document.getElementsByClassName("S_line1")[0].style.backgroundColor);
//document.getElementsByClassName("S_bg1")[0].style.backgroundColor='rgba(242,242,242,0.7)';
//alert("Hello World");
//alert("end");
*/