// ==UserScript==
// @name          ff.net filter embed
// @namespace     http://www.michellekhuu.com/scripts/ffembed
// @author     	  Michelle K
// @description   shows FF.Net filters to show on front page, because the button is annoying. 
// @grant       GM_getValue
// @grant       GM_setValue
// @include		  http://*.fanfiction.net/*/*/*
// @include		  https://*.fanfiction.net/*/*/*
// @require //ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version 1.3
// ==/UserScript==


$(document).ready(function() {
    var divList = document.getElementsByClassName('modal fade hide in');
    
    var divData = divList[0].innerHTML;
    
    //Want to pull out all the important filter data
    var selectionRawData = divData.split("</script>");
    var filterBodyAll = selectionRawData[1];
    var filterBodyRaw = filterBodyAll.split("</div>");
    
    //Remove all the end div-script stuff that we don't want. This is the good stuff.
    var filterWith = "<div class=\"filterSelections\">" + filterBodyRaw[0];
    var filterWithout = "</div><font color=red>Without: </font>" + filterBodyRaw[2];
    var applyButton = "<span class=\"btn btn-primary\" onclick=\"process_filter();\">Apply</span></div>";
    
    var filter = filterWith + filterWithout;
    var totalThing = filter + applyButton;
    
    $("center").eq(0).append(totalThing);
    $("select").css({'height': 29});
    $("select").css({'width': 180});
    
    //var ratingSel = $( "select[title='rating filter']" ).before('<br>');

    //Removes 'filter' button
    $("span[onclick^=\"$('#filters').modal()\"]").remove();
});