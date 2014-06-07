// ==UserScript==
// @name           [Vid] Player only
// @namespace      Vinicius W
// @include        *www.animeshippuuden.com*
// @include        *www.animehere.com*
// ==/UserScript==

var videoobject;
var videoobject2;
var videoobjectlenght=99999999;
var newpage="";

var SubLinks="";
var allthelinks = document.getElementsByTagName('a');
for(var i=0; i<allthelinks.length; i++){
	if(allthelinks[i].href.indexOf(document.location) != -1){
		if(allthelinks[i] != document.location){ // avoid others scripts loops
	       if(document.body.innerHTML.indexOf(allthelinks[i]) != -1){ // avoid duplicated links
    			SubLinks+='<a href="' + allthelinks[i].href + '">   ' + allthelinks[i].href.replace(document.location,"").replace("/","") + '   </a>';
           }
		}
	}
}

videoobject = getFirstResult("//div[@id='postcontent']");extractembed(videoobject);
videoobject = getFirstResult("//div[@id='playbox']");extractembed(videoobject);
videoobject = getFirstResult("//div[@id='mytab']");extractembed(videoobject);
videoobject = getFirstResult("//div[@id='vid']");extractembed(videoobject);
videoobject = getFirstResult("//div[@id='flowplayer1']");extractembed(videoobject);

	
	
//videoobject = getFirstResult("//div[@id='mytab']/p/img[@src='http://i312.photobucket.com/albums/ll351/baokychen/EpisodeNotOutYet.jpg']");			if(videoobject)newpage=videoobject.innerHTML;

newpage+=videoobject2.outerHTML;
newpage+="<br>";



videoobject = getFirstResult("//div[@class='wprp_wrapper']");
			if(videoobject)newpage+="<br><br>" + videoobject.outerHTML;
videoobject = getFirstResult("//iframe[@class='fb_ltr']");
			if(videoobject)newpage+=videoobject.outerHTML;


if(location.href != "http://www.animeshippuuden.com/")
if(location.href != "http://www.animeshippuuden.com/anime-list/")
if(location.href != "http://www.animehere.com/")
if(location.href != "http://www.animehere.com/anime-all.html")
{
document.body.innerHTML=SubLinks+"<br>"+newpage;
document.head.innerHTML="";
}


function getFirstResult(expr, node){
    if (!node) {node = document;}
	var result = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}

function extractembed(objecttomanipulate){
	if(objecttomanipulate){//alert("A");
		if(getFirstResult("//embed",objecttomanipulate)){
		//	alert("B" + ("" + objecttomanipulate.innerHTML + "").lenght +"|"+ videoobjectlenght);
		//	if(objecttomanipulate.innerHTML.lenght < videoobjectlenght){alert("C");
				videoobject2=objecttomanipulate;
				videoobjectlenght = objecttomanipulate.innerHTML.lenght;
		//	}
		}
	}
}



// NOT MINE 

//http://userscripts.org/scripts/review/93724 STUFF
/*
var remove = ['pinit-cdn.pinterest.com','sharethis.com/','facebook.com/extern','facebook.com/widgets','facebook.com/plugins','facebook.com/connect/','platform0.twitter.com/','platform.twitter.com/','twitter.com/widgets/','tweetmeme.com','plusone.google.com/','yimg.com/b/social_buttons/','fbshare.me','api.flattr.com/button','addthis.com/static/','stumbleupon.com/badge/','widgets.backtype.com','widget.collecta.com/','reddit.com/static/button/'];

if(unsafeWindow.top == unsafeWindow.self){
	document.addEventListener('DOMNodeInserted',function(e){
		window.setTimeout(function(){
			var findLink = document.evaluate('//*[contains(@class, "IN-widget")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //LinkedIn is dynamic
			for (var j = 0; j < findLink.snapshotLength; j++)
				findLink.snapshotItem(j).parentNode.removeChild(findLink.snapshotItem(j));
			
			var iFrames = document.querySelectorAll('iframe');
			if (iFrames.length > 0)	{
				for (var i = 0; i < iFrames.length; i++) {
					for (var j = 0; j < remove.length; j++){
						if (iFrames[i].src.toLowerCase().match(remove[j].toLowerCase())== remove[j].toLowerCase())
							if (iFrames[i].parentNode) 
								iFrames[i].parentNode.removeChild(iFrames[i]);
					}
				}
			}
		}, 250);}
	, false);
	setTimeout(removefb,250);
}*/