// ==UserScript==
// @name       Hearts Galore
// @namespace  http://userscripts.org/users/480630
// @version    0.1
// @description  For Miranda. ;)
// @copyright  2012+, Miguel Chateloin
// @run-at         document-start
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js

// ==/UserScript==
jQuery(document).ready(function() {
    alert("Script started running");
    var heart = jQuery('<div>').attr("id","heart");
    var i = 0;
    jQuery("body").append("<style> #heart{ position:relative; width:100px; height:90px; } #heart:before, #heart:after{ position:absolute; content:''; left:50px; top:0; width:50px; height:80px; background:red; -moz-border-radius:50px50px00; border-radius:50px50px00; -webkit-transform:rotate(-45deg); -moz-transform:rotate(-45deg); -ms-transform:rotate(-45deg); -o-transform:rotate(-45deg); transform:rotate(-45deg); -webkit-transform-origin:0100%; -moz-transform-origin:0100%; -ms-transform-origin:0100%; -o-transform-origin:0100%; transform-origin:0100%; } #heart:after{ left:0; -webkit-transform:rotate(45deg); -moz-transform:rotate(45deg); -ms-transform:rotate(45deg); -o-transform:rotate(45deg); transform:rotate(45deg); -webkit-transform-origin:100%100%; -moz-transform-origin:100%100%; -ms-transform-origin:100%100%; -o-transform-origin:100%100%; transform-origin:100%100%; } </style>");
    for (i=0; i<100; i++)
    {
        jQuery("body").append(heart);
    }
    alert("Script terminated.");
    
});