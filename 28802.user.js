// ==UserScript==
// @name           Player Image Changer for Replays
// @namespace      GLB
// @description    Updates the background of your existing player icon for replays from transparent to a solid color
// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*
// ==/UserScript==


window.setTimeout( function()
{
if(document.getElementById('68216')){
document.getElementById('68216').style.backgroundColor = 'maroon';
}

if(document.getElementById('69365')){
document.getElementById('69365').style.backgroundColor = 'navy';
}

if(document.getElementById('77953')){
document.getElementById('77953').style.backgroundColor = 'maroon';
}

if(document.getElementById('105087')){
document.getElementById('105087').style.backgroundColor = 'navy';
}

if(document.getElementById('105115')){
document.getElementById('105115').style.backgroundColor = 'maroon';
}

if(document.getElementById('250872')){
document.getElementById('250872').style.backgroundColor = 'navy';
}

if(document.getElementById('264021')){
document.getElementById('264021').style.backgroundColor = 'maroon';
}

if(document.getElementById('273476')){
document.getElementById('273476').style.backgroundColor = 'navy';
}

if(document.getElementById('427652')){
document.getElementById('427652').style.backgroundColor = 'maroon';
}

if(document.getElementById('599200')){
document.getElementById('599200').style.backgroundColor = 'maroon';
}

}
)