// ==UserScript==
// @name         CS2 Map Outpost Titles
// @namespace    http://use.i.E.your.homepage/
// @version      1.0
// @description  Something useful
// @include      http://*.chosenspace.com/view/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// @copyright    2012+, Scott 'Descention' Mundorff
// ==/UserScript==

var outposts = {"1c":"Dry Dock"
                ,"2c":"Shipyard"
                ,"3c":"Space Dock"
                ,"4c":"Iridium Refinery"
                ,"5c":"Tetrium Refinery"
                ,"6c":"Zirconium Refinery"
                ,"7c":"Quadrium Refinery"
                ,"8c":"Gold Refinery"
                ,"9c":"Fullerite Refinery"
                ,"10c":"Starbase"
                ,"11c":"Scrapyard"
                ,"12c":"Manufactory (Components)"
                ,"13c":"Manufactory (Parts)"
                ,"14c":"Manufactory (Navigation)"
                ,"15c":"Manufactory (Targeting)"
                ,"16c":"Manufactory (Scanner)"
                ,"17c":"Manufactory (Jump Drive)"
                ,"18c":"Manufactory (Shield Gen)"
                ,"19c":"Manufactory (Reactor)"
                ,"20c":"Manufactory (Engine)"
                ,"21c":"Manufactory (Units)"
                ,"22c":"Manufactory (Plating)"
                ,"23c":"Manufactory (Weapon)"
                ,"24c":"Manufactory (External)"
               };


var images = $('img[src*="outpost"]');

for(i in images){
    var image = images[i];
    if(image.src != undefined && image.src.indexOf("outpost") >= 0){
        var code = image.src.replace("http://g1.chosenspace.com/view/images/sector/outpost/","").replace(".gif","");
        
        if(outposts[code] != undefined){
            code = outposts[code];
            $('div[style*="top: '+image.parentNode.style.top+'; left: '+image.parentNode.style.left+'"] img').attr("title",code);
        }
    }
}
