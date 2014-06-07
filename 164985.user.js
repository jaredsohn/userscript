// ==UserScript==
// @name        Recent Players CSR
// @namespace   http://mattster.newgrounds.com
// @include     https://live.xbox.com/*/Friends*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.0
// ==/UserScript==

$(document).load(function(){
	$('section[class="recent collapsed"]').prepend(' <a href="#" id="greasemonkeyButton" onclick="derp()" >View CSR</a> - Press after clicking <u>Find people I\'ve met online...</u>');
    addButtonListener();
    
    $('section[class="recent collapsed"]').insertBefore($('section[class="recent collapsed"]').prev());
});

function addButtonListener(){
  var button = document.getElementById("greasemonkeyButton");
  button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
    var timeToMatch = "";
    var gamertags = new Array();
    var total = 0
    $('section[class="recent"]').find("ol").find("li").each(function(idx, element){
        var lastMet = $(element).find('div[class="presence"]').html();
        if (idx == 0){
           timeToMatch = lastMet;
        }
        if (timeToMatch == lastMet){
            gamertags[idx] = element.getAttribute("data-gamertag");
        }
        total++;
    });
    
    if (total == 0){
        alert("No Gamertags found.  Make sure you click 'Find people I've met online...' first!");
        return;
    }
    var url = "http://mattster.netau.net/csr_recent/";
    document.location = url+"?gamertags="+JSON.stringify(gamertags);
}