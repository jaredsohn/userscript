// ==UserScript==
// @name       DS-R fish all button
// @namespace  http://www.ds-revolution.net/fishing.php
// @version    0.3
// @description  enter something useful
// @match      http://www.ds-revolution.net/fishing.php
// @copyright  2012+, Krokador(121)
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$(document).ready(function()
{

    var $submit = $("input[type='submit']");
    $submit.hide();
    var btn = document.createElement("input");

    var $fishAllButton = $(btn);
    $fishAllButton.bind("click", fishAll).val("    Fish ALL!    ").attr("type", "button");
    $submit.parent().append($fishAllButton);
});
                  
function fishAll()
{
    var $aviv = $("#aviv");
    var turnsToUse = Math.min(60, $aviv.val());
    $("#setval").val(turnsToUse); 
    $aviv.val( $aviv.val() - turnsToUse);
    $("#fish").find("table").find("input[type='hidden']").val(1);
    $("#fish").find("td").css({
      "background-image": "url(http://www.ds-revolution.net/images/fishing/water_sel.png)", 
      "background-position": "initial initial", 
      "background-repeat": "initial initial"
    });
    $("input[type='submit']").trigger("click");
}