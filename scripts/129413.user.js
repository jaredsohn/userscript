// ==UserScript==
// @name           wiki menus
// @namespace      menus/
// @include        *ibm.com/communities*
// @include        *ibm.com/blogs*
// @include        *ibm.com/wikis*
// @exclude        *auth/login*
// @exclude        *ibm.com/blogs/roller-ui/login*
// @exclude        *ibm.com/files/login*
// @exclude        *ibm.com/wikis/login*
// @exclude        *auth/error*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @description    This scripts adds dynamic, customized drop-down menus to IBM Lotus Connections pages on ibm.com/communities and you can customize it for use with your own installations. These menus make it much easier to jump between sections and pages.
// ==/UserScript==


$(document).ready(function(){
  	/*
    * The Wikis and Files sections load their content dynamically. Need to detect when the page is truly ready
    * by listening for the inclusion of the <div id="lotusFrame"/> object.    
  	*/
$('#nav li').hover(
        function () {
            //show its submenu
            $('ul', this).slideDown(100);
 
        },
        function () {
            //hide its submenu
            $('ul', this).slideUp(100);        
        }
    );
$("a#show-panel").click(function(){
   $("#lightbox, #lightbox-panel").fadeIn(300);})
   $("a#close-panel").click(function(){
   $("#lightbox, #lightbox-panel").fadeOut(300);
})

});



});


