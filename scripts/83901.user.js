// ==UserScript==
// @name           Mantis User Help for lvbing
// @namespace      http://www.zhangjingwei.com
// @description    Mantis User Help for lvbing
// @include        http://misc.intra.leju.com/mantis/view.php?id=*
// ==/UserScript==

var ljlvbing = {};
ljlvbing.select = document.getElementsByTagName("select");
for(var i=0; i<=ljlvbing.select.length; i++){
    if(ljlvbing.select[i].name == "handler_id"){
        changeOptions(ljlvbing.select[i]);
        return false;
    }
}

function changeOptions(obj){
    var option = '<option value="16" >HJF-韩佳锋-1136</option>';
    option += '<option value="185" >ZJW-张经纬-1095</option>';
    option += '<option value="316" >ZSY-张所勇-1776</option>';
    option += obj.innerHTML;
    obj.innerHTML = option;
}