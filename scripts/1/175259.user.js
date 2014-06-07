// ==UserScript==
// @name        munkvideo
// @namespace   video
// @description disable non-registred user limit in munkvideo.cz
// @include     http://www.munkvideo.cz/*
// @include	http://www.streamuj.tv/*
// @include     http://movies.sosac.ph/*
// @grant       none
// @version     1
// ==/UserScript==

var removed = false;

$("script[type='text/javascript']").each(function(){
    if ($(this).text().indexOf("jwplayer") >=0)
    {
        // check if found
        //console.log($(this).text());
        
        //regexp
        var r = /jwplayer[\s\S]*?\}\)\;/gm;
        
        var player = $(this).text().match(r)[0];       
        player =  player.replace(/(^(wait|gatespots):\s+)(\d*)(,)/gm, "$110000000$4");
        //console.log(player);
        
        eval(player);
        removed=true;
    }
});

if(removed)
{
    if(document.URL.indexOf("munkvideo")>=0)
    {
        alert("Limit odstraneny. Prajem prijemne pozeranie bez obmedzeni!");
    }
    else
    {
        alert("Limit odstraneny. Prajem prijemne pozeranie bez obmedzeni!");
        $("iframe[src*='munkvideo'], iframe[src*='streamuj.tv']").after('<div style="height:30px; width:100%; margin: 5px 0px; padding-top:10px; background:#b3d4fc;'+
           'color:#0769AD; font-size:1.5em; font-weight: 800; ">'+
           '<span style=" float: right; text-align: center; text-decoration: none; width: 100%;">'+
           'Limit odstraneny. Prajem prijemne pozeranie bez obmedzeni!</span></div>');

    }
}
