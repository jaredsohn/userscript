// ==UserScript==
// @name           Fabuloso Fixer
// @description	   Changes Ze Frank's "The Show" from an EMBED to an IFRAME, and plays it full-size instead of really small.
// @namespace      http://jes5199.livejournal.com
// @include        http://www.zefrank.com/theshow/archives/*
// @include        http://www.zefrank.com/theshow
// @include        http://www.zefrank.com/theshow/
// ==/UserScript==

function addGlobalStyle(css) {
	//from the official greasemonkey recipes
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function my_showQT(mediaid,id){
	//Most of this is stolen directly from Ze's javascript.
    var autoplay = "true";

    var path = 'http://media.revver.com/qt;sharer=14854/' + mediaid + '.mov';
    var result = '<iframe src="' + path + '" pluginspage="http://www.apple.com/quicktime/download/" scale="tofit" kioskmode="false" ';
    result += 'qtsrc="' + path + '" cache="false" height="375" width="490" controller="true" type="video/quicktime" autoplay="' + autoplay + '">\n';

	addGlobalStyle('#movie { height:375px ! important; position:relative; left:-28px; border: 2px solid transparent;}');

    unsafeWindow.setMovieDiv(result, id, true);
}


function my_showFlash(mediaid, id)
{
    var result =  '<div style="position: relative; top: 8px;"><embed ';
    result     += 'type="application/x-shockwave-flash" src="http://flash.revver.com/player/1.0/player.swf" ';
    result     += 'pluginspage="http://www.macromedia.com/go/getflashplayer" scale="noScale" salign="TL" bgcolor="#ffffff" ';
    result     += 'flashvars="width=320&height=259&mediaId=' + mediaid + '&affiliateId=14854&javascriptContext=true';
    result     += '&skinURL=http://flash.revver.com/player/1.0/skins/Default_Raster.swf';
    result     += '&skinImgURL=http://flash.revver.com/player/1.0/skins/night_skin.png';
    result     += '&actionBarSkinURL=http://flash.revver.com/player/1.0/skins/DefaultNavBarSkin.swf';
    result     += '&resizeVideo=False" width="490" height="375"></embed></div>';

	addGlobalStyle('#movie { height:425px ! important; position:relative; left:-28px; border: 2px solid transparent;}');

    unsafeWindow.setMovieDiv(result, id, false);
}

unsafeWindow.showQT = my_showQT;
unsafeWindow.showFlash = my_showFlash;

document.title = "who likes the little little duckies";


