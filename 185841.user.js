// ==UserScript==
// @name		Battlelog Loadout Randomizer
// @version		0.2.1
// @author		Jack Wickham
// @description	Adds a Randomize Loadout button to the battlelog loadout selection screen to enable random loadout selection
// @include		http://battlelog.battlefield.com/bf4/*
// @include    	https://battlelog.battlefield.com/bf4/*
// @grant       none
// @updateURL	https://userscripts.org/scripts/source/185841.meta.js
// @downloadURL	https://userscripts.org/scripts/source/185841.user.js
// ==/UserScript==


function mainCode(){
    $("#content").bind("DOMSubtreeModified",function(){
       $("#content").unbind("DOMSubtreeModified");
       var uri = document.URL;
       if(uri.indexOf("battlelog.battlefield.com/bf4/loadout") !== -1 && uri.indexOf("#overview")==-1){
          var checkExist = setInterval(function() {
             if ($('#loadout-actions').length) {
                 if(!$("#loadout-randomizer").length){
                   $("#loadout-actions").prepend("<div id='loadout-randomizer' class='btn btn-small'>Randomize Loadout</div>");
                 }
                clearInterval(checkExist);
       
                //Set event handler to check for button press
                $("#loadout-randomizer").click(function(){
                   var weapons = new Array($(".items-select-item:not(.locked)"));
                   var selected = weapons[0][Math.floor(Math.random()*weapons[0].length)];
                   var guid = $(selected).attr("data-guid");
                   $("[data-guid='"+guid+"']").click();
                });
             }
          }, 500);
       } //TODO: Add else statement to remove randomize button from loadout #overview screen. However, this causes the next bit of code to never run :(
       setTimeout (mainCode, 100);
    });
}

mainCode();


