// ==UserScript==
// @name       Load Jquery
// @namespace  http://none/
// @version    0.2
// @description  enter something useful
// @include    *
// @copyright  2011+, wysa
// ==/UserScript==
(function(){
    var $=unsafeWindow.jQuery;
    //alert(typeof $);
    if(!$){
        var jquery_script=document.createElement("script");
        jquery_script.src="http://code.jquery.com/jquery.min.js";
        document.head.appendChild(jquery_script)
        
    }
})()