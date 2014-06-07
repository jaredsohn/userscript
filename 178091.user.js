// ==UserScript==
// @name       Uurrooster highlighter
// @namespace  http://whitebird.sinners.be
// @version    0.1
// @description  Highlights the appropriate time of the eduphp timetable
// @match      http://eduphp.khk.be/PR/server.php*
// @match      http://eduphp.khk.be/PR2/server.php*
// @copyright  2013+, Whitebird
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$("div h4").hide();
$("table").attr("border","1");
$("table").css("border-collapse","collapse");
$("body").css("font-family","\"Helvetica Neue\", Helvetica, Arial, sans-serif");
$( "tr" ).hover(
  function() {
    $( this ).css("background-color","#E5E5E5");
  }, function() {
    $( this ).css("background-color","#fff");
  }
);
