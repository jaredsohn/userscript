// ==UserScript==
// @name           MMPanel
// @namespace      http://cubancomplex.kodingen.com/userscripts
// @description    adds an informative news feed to the MM local city page
// @include        http://mafiamatrix.com/*
// ==/UserScript==


		

var $ = unsafeWindow.jQuery;
 
$("body").append(
        "<div id='mmpanel' style='position: absolute; width: 221px; background: none repeat scroll 0 0 #225277; top: 48px; border-bottom: 1px solid #000; border-top: none; border-right: 1px solid #000000; left: 0%; padding: 2px 0; text-align: center;'>" +
                "<a href='#' class='title' title='News' style='display: block;'>News & Analysis</a>" +
                "<div class='content' style='background-color: rgba(4,33,56,0.8); display: none; width: 100%; height: 800px;'>" +
                "</div>" +
        "</div>"
);
 
$("#mmpanel > a.title").bind("click", function(e) {
        e.preventDefault();
        $(this).siblings(".content").slideToggle();
});