
// ==UserScript==
// @name       Better EasySMS
// @namespace  http://andreaslysdal.com
// @version    0.1
// @description  Enhances EasySMS, by making it more resizeable
// @match      http://*:2511/*
// @copyright  2012+, Andreas Lysdal Andersen
// ==/UserScript==
function resize_width() {
    document.getElementById('threads').width="300px";
    var width = document.body.clientWidth;
    var width_showthread = width-310;
    document.getElementById('showthread').width=width_showthread+"px";
    
    // call EasySMS resize function
    doResize();
}
window.onresize = resize_width;


var loc = window.location.href;
if (loc.search("show") != -1) {
    // actions for the showthread page
    //alert(1);
    var tables = document.getElementsByTagName("table");
    tables[1].width = "100%";
    
    var textfield = document.getElementsByName("text")[0];
    
    textfield.cols="";
    textfield.style.width="98%";    
}
