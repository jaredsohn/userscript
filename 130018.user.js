// ==UserScript==
// @name MLive Puppies
// @version 1.01
// @author Bennett Goble (Nivardus)
// @namespace http://userscripts.org/scripts/show/130018
// @description Replaces MLive comments with images of puppies.
// @include http://www.mlive.com/*/index.ssf/*
// ==/UserScript==

// Chrome does not support @require
// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function plopPups() {

    var PUPS = [
        'http://i.imgur.com/ISYzm.gif',
        'http://i.imgur.com/5BmBe.gif',
        'http://i.imgur.com/WkzIU.gif',
        'http://i.imgur.com/ZSQHh.gif',
        'http://i.imgur.com/f28Ue.gif',
        'http://i.imgur.com/Px4Jb.gif',
        'http://i.imgur.com/1BRhQ.gif',
        'http://i.imgur.com/dz9GB.gif',
        'http://i.imgur.com/PWeB5.gif',
        'http://i.imgur.com/s0jQr.gif',
        'http://i.imgur.com/ggybc.gif',
        'http://i.imgur.com/5FrSt.gif',
        'http://i.imgur.com/34rdx.gif',
        'http://i.imgur.com/jgmIU.gif',
        'http://i.imgur.com/USoiW.gif',
        'http://i.imgur.com/l7bxs.gif',
        'http://i.imgur.com/eLXjq.gif',
        'http://i.imgur.com/b4mv9.gif',
        'http://i.imgur.com/7KWOS.gif',
        'http://i.imgur.com/yTAVz.gif',
        'http://i.imgur.com/O48VW.gif',
        'http://i.imgur.com/3AHVC.gif'
    ];

    $(".comment .text_container").each(function(){
        $(this).html("<img src='" + PUPS[Math.floor((Math.random()*PUPS.length))] + "'/>");
    });

}

addJQuery(plopPups);