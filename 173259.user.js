// ==UserScript==
// @name        Mondofoot
// @namespace   mondofoot
// @include     http://www.mondofoot.com/*training*
// @version     1.0
// @grant       none
// @Description Train all your players in 1 click
// @copyright   2013 - Pastek
// @author      Pastek
// ==/UserScript==

$("#flash_coach_div").after('<a id="allTraining" href="">Tout entrainer</a>');

$(document).ready(function(){

  $("#allTraining").click(function(){
    $("#titulars_selector").click();
    select_all_titulars($("#titulars_selector"));
    $("#substitutes_selector").click();
    select_all_substitutes($("#substitutes_selector"));
    run_training("input.bsubmit2");
    return false;
  });

});