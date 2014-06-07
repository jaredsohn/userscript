// ==UserScript==
// @name       Autohide KissAnime
// @namespace  JewelNamespace
// @version    0.3
// @description  enter something useful
// @match      *kissanime.com/*
// @include      *kissanime.com/*
// @copyright  Jewel
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

iWantVideoPadding = true;

function removeAds()
{
    //Remove ads
    var ads = $( "iframe" );
    ads.remove();
    
    ads = $('img[src*="https://adprotected.com/public/images/close.png"]');
    
    if (ads.length > 0)
    {
        var par = ads.parent().parent().parent();
        par.remove();
    }
    
    var moreAds = $( "#adsIfrme2" );
    moreAds.remove();
}

function makeVideoAutoHide()
{
    //Remove lightswitch
    var lightswitch = $( "#switch" );
    lightswitch.remove();
    
    //Remove useless data
    var barcontent = $( ".barContent" );
    var barcontentFirstChild = barcontent.children();
    var childrenLayer2 = barcontentFirstChild.children();
    var childrenToCut = childrenLayer2.slice(1,9);
    childrenToCut.remove();
    
    var qua = $( "#divTextQua" );
    qua.remove();
    
    if (iWantVideoPadding)
    {
        //Pad the video out
        var dd = $( "#divDownload" );
        dd.css("padding-top", "100px");
        
        var pc = $( ".clear2:eq(2)" );
        pc.css("padding-bottom", "100px");
    }
    
    //Enable Autohide
    var player = $( "#embedVideo" );
    if (player.length == 0) return;
    
    player[0].src = "http://www.youtube.com/get_player?enablejsapi=1&modestbranding=1&autohide=1";
    
    //Refresh element to force change
    refreshElement(player);
    
    //Dim page
    //$('<div class="jewellight" style="height: 716px; top: 0px;    background-color: #000; position: absolute; left: 0px;    right: 0px;    display: block;"></div>').appendTo("body");
	//$('<div class="jewellight" style="height: 530px; top: 716px;  background-color: #000; position: absolute; left: 0px;    right: 1360px; display: block;"></div>').appendTo("body");
	//$('<div class="jewellight" style="height: 530px; top: 716px;  background-color: #000; position: absolute; left: 1365px; right: 0px;    display: block; bottom: 0px;"></div>').appendTo("body");
	//$('<div class="jewellight" style="height: 980px; top: 1246px; background-color: #000; position: absolute; left: 0px;    right: 0px;    display: block; bottom: 0px;"></div>').appendTo("body");
}

function refreshElement(e)
{
    var parent = e.parent();
    e.remove();
    e.appendTo(parent);
}

window.onload = function() {
	setTimeout(makeVideoAutoHide, 10);
    setTimeout(removeAds, 50);
    setTimeout(removeAds, 500);
    setTimeout(removeAds, 1000);
};