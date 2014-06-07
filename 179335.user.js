// ==UserScript==
// @name        One Click Download Patch 1.0 [Filenuke.Net]
// @namespace   http://localhost
// @include     http://axp.zedo.com/*
// @include     http://*.filenuke.*/*
// @include     http://filenuke.com/*
// @include     http://www.filenuke.*/*
// @require     http://pblg1.zzl.org/hlib.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @version
// @grant       none
// ==/UserScript==

//If you havent downloaded the original One Click Download Userscript
//You may download it @ http://userscripts.org/scripts/show/174442

var src=document.documentElement.innerHTML;

if(window.location.toString().match(/filenuke/ig)){
    if(window.location.toString().match(/zedo/)){
        sel('iframe').style.display='none';
    }
    
iframe=selAll('iframe');
iframe[0].style.display='none';
iframe[1].style.display='none';



if(sel('INPUT.btn-big2-2')!=null){
    sel('INPUT.btn-big2-2').id='play';
    $('#play').click();
}

window.scrollTo(0,310);
$('#vid_play').click();

}



