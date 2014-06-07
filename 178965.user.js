// ==UserScript==
// @name        Career Cup
// @author      Opensuse
// @namespace   opensuse
// @description Clear Career Cup
// @version     1.0
// @include     *careercup*
// ==/UserScript==

window.onload = function()
{
    document.getElementById("sidebar").style.display='none';
    document.getElementById("services").style.display='none';
    document.getElementById("page_footer").style.display='none';
    document.getElementById("addCommentMain").style.display='none';
    document.getElementById("page_head").style.display='none';
  
    var row_ele = document.getElementsByClassName("row");
    for (i=0;i<row_ele.length;i++){
        row_ele[i].style.width = "800px";
    }
    
    var ele = document.getElementsByClassName("grid_9");
    for (i=0;i<ele.length;i++){
        ele[i].style.width = "98%";
    }
    
    var share_ele = document.getElementsByClassName("social_share_buttons");
    for (i=0;i<share_ele.length;i++){
        share_ele[i].style.display = "none";
    }
}