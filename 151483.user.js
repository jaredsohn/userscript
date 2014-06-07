// ==UserScript==
// @name       MK Toys Fix
// @namespace  http://www.str.org.in/
// @version    0.1
// @description  Fix for MK Toys website
// @match      http://www.mktoys.com/*
// @copyright  2012+, Vivek Khandelwal
// @require http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==
function addJavascript(jsname,pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',jsname);
    th.appendChild(s);
}
//addJavascript("http://code.jquery.com/jquery-1.8.2.min.js", "body");
GM_log("run!");
window.addEventListener("DOMContentLoaded", function() {
    GM_log("jQuery().jquery: " + jQuery().jquery);
    
    GM_log('changing type');
    console.log($(document.forms));
    $(document.forms).each(function() {
       var name = $(this).attr('name');
       console.log('$(this).attr(name) = ' + name); 
       if(name == 'input_form')
       {
           var button = jQuery($(this)).find('input[name="Submit1"]');
           console.log(button);
           button.clone().attr('type','submit').insertAfter(button).prev().remove();
           GM_log('type changed');
       }
    });
    
}, false);
/*var rrr = function() {
    try {
    GM_log("jQuery().jquery: " + jQuery().jquery);
    GM_log("$().jquery: " + $().jquery);    
    } catch (e) {
        console.log(e);
    }
    
    
    // window.setTimeout(rrr, 2000);
};
rrr();*/
