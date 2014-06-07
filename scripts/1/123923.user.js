// ==UserScript==
// @name           The Onion Fix
// @description    Removes Pay Screen
// @include        http://*theonion.*/*
// @copyright      Oliver Baker
// @version        1.0
// ==/UserScript==

function addCss(cssCode,javascriptCode) {
    
    var styleElement = document.createElement('style');
    
    styleElement.type = 'text/css';
    
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    
    document.getElementsByTagName('head')[0].appendChild(styleElement);
    var styleElement2 = document.createElement('script');
    
    styleElement2.type = 'text/javascript';

    styleElement2.appendChild(document.createTextNode(javascriptCode));
    
    document.getElementsByTagName('head')[0].appendChild(styleElement2);
}

var cssCode = '';

cssCode += '#gregbox-overlay, #gregbox-wrap{display:none !important;}';
var javascriptCode = '';

javascriptCode += 'initialize_ads = function(callback,group){callback()};';
javascriptCode += 'afns_video_ad.preroll = "";';
javascriptCode += 'var changePlayer = function(url)';
javascriptCode += '{';
javascriptCode += '	afns_video_id=url.substr(url.indexOf(",")+1);';
javascriptCode += 'afns_video_id=afns_video_id.substring(0,afns_video_id.indexOf("/"));';
javascriptCode += '	$.getJSON("/ajax/onn/embed/"+afns_video_id+".json",function(data){afns_player().setClip(data.video_url);});';
javascriptCode += '};';
//javascriptCode += '$("#browse A").each(function(index,item){$(item).click(changePlayer(",17966/"));$(item).attr("href","#");});';
addCss(cssCode,javascriptCode);