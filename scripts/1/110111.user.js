// ==UserScript==
// @name		Newbie helper
// @description		very simple script for newbie administration
// @version		1.0.0
// @include		http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js    
// @require        http://nicneumel.zaridi.to/jquery.dateFormat.js
// ==/UserScript==

$(document).ready(function() {

    $("#loadNewbies").click(function() {    
      window.location =  "http://erep.maxihellas.com/citizens/cnewplayers.aspx?Country=%27Slovakia%27&Date=%27" + $.format.date(new Date(), "yyyy-MM-dd") + "%27";
    });
    
    $("#prepareMessage").click(function() {    
      $("#citizen_subject").val("test");
      $("#citizen_message").val("testuju skript");
    });    
});


$("#menu > ul > li#menu5 > ul").append("<li><a id=\"loadNewbies\" href=\"javascript:void(0);\">Show today newbies</a></li>");

if (document.location.toString().indexOf("/main/messages-compose")!=-1) {
  $("#message_form").append("<a id=\"prepareMessage\" class=\"fluid_blue_dark_medium\" href=\"javascript:void(0);\"><span class=\"bold\">Insert newbie message</span></a>");
}