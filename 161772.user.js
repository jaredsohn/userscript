// ==UserScript==
// @name        digit-icons
// @namespace   https://bitbucket.org/tkraos/tkraos_userscripts
// @match     *://*.digit-photo.com/*
// @require http://code.jquery.com/jquery-1.9.1.min.js
// @version     0.1
// @description Affiche la pĥoto devant chaque articles 
// ==/UserScript==

$("a[onmouseout][onmouseover]").each(function (){
    
    var data_raw =  $(this).attr("onmouseover");
    var data_split = data_raw.split("'");

    if(data_split[1] != ""){
        $(this).prepend("<img alt='"+data_split[1]+"' src='http://www.digit-photo.com/images/"+data_split[1]+"' style='width:50px;height:50px' />&nbsp;");    
    }
    
});