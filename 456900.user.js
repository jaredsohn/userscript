// ==UserScript==
// @name botvaMiner
// @description botvaMiner by 221V
// @author 221V aka REMOX
// @license MIT
// @version 1.0
// @include http://*.botva.ru/mine.php?a=open*
// ==/UserScript==
function beginMining(keyword){
var mine_form=document.getElementById("mine_form");
if(!mine_form){
var link_take = Array();
link_take = takeMining("dig");
if(link_take!=''){
window.location.href = link_take;
}
}else{
document.getElementById("mine_form").submit();
}}

function takeMining(keyword){
var link_take=document.getElementsByTagName("a");
var outLinks = new Array();
    var linksCount = 0;
    for(var i = 0; i < link_take.length; i++)
    {
        if(link_take[i].href.indexOf(keyword) != -1)
        {
            outLinks[linksCount++] = link_take[i].href;
        }
    }
    return outLinks;
}

setInterval(beginMining, 8000);
