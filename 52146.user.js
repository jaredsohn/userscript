// ==UserScript==
// @name           Winfuture No-Javascript Screenshot
// @namespace      winfuture
// @include        http://winfuture.de/*
// @include        http://www.winfuture.de/*
// ==/UserScript==

var useGallery = true;
/* 
Hier true oder false setzen. 
true = Html Seite zum Anzeigen des Screenshots inkl Gallery-Funktion mit vor und zurück Button.
false = nur das Bild Anzeigen.
*/

var galleryUrl = "/screenshot,__ID__.html";
var galleryUrlFull = "/?nolayout=1&page=wfv4/BSv2/scg.show.php&pic_id=___ID___";


function addScreenshotLink(element){
	var href = element.getAttribute('href');
	if (href == null){
		return false;
	}
    
    var pattern = 'javascript:scg(';
	var pos = href.indexOf(pattern,0);
	if (pos < 0){
		return false;
	}
    
    var hrefCut = href.substring(pattern.length,href.length);
    var pos2 = hrefCut.indexOf(',',0);
    if (pos2 < 0){
        return false;
    }
    var picId = hrefCut.substring(0,pos2);
    
	var img = element.getElementsByTagName('img');
	if (img.length != 1){
		return false;
	}
    
    var largeLink = "";
    
    if(useGallery){
        largeLink = galleryUrl.replace("__ID__",picId);
    }else{
        var imgSrc = img[0].getAttribute('src');
        pos = imgSrc.indexOf('_tn',0);
        if (pos < 0){
            return false;
        }
        largeLink = imgSrc.substring(0,pos);
        largeLink += imgSrc.substring(pos+3, imgSrc.length);
    }
    
    element.setAttribute("onClick", href+";return false;", 0);
    element.setAttribute("href", largeLink, 0);
	return true;
}


// Links @ News: Walktrough
var newsContent = document.getElementById('newsinhalt');
var links = newsContent.getElementsByTagName('a');
for(i=0; i<links.length; i++){
	addScreenshotLink(links[i]);
}