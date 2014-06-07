// ==UserScript==
// @name           Link2Video
// @namespace      http://lambdaweb.awardspace.com/projects.html
// @description    Embed on GameFAQs!
// @include        http://www.gamefaqs.com/boards/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.11.6/jquery.js
// ==/UserScript==



var v = document.createElement("input");
v.setAttribute('type', 'button');
v.setAttribute('value', 'Embed');
v.setAttribute('name', 'enabler');
v.setAttribute('style', " -webkit-appearance: none; border: 1px solid red; margin-left: 20px; padding: 0 20px; border-radius: 5px; background-repeat: no-repeat; background-position-y: 8px; background: #FFF; color: red; font-family: 'Helvetica Neue', 'HelveticaNeue', Arial, sans-serif;  font-weight: 600; ");
document.getElementsByTagName("h2")[0].appendChild(v)

/*
var r = document.createElement("input");
r.setAttribute('type', 'button');
r.setAttribute('value', 'Remove');
r.setAttribute('name', 'enabler');
document.getElementsByTagName("h2")[0].appendChild(r);
//document.td.getElementById("sitelinks").appendChild(r);
*/


var YTEMPATTERN = '<object width="480" height="295"><param name="movie" value="http://www.youtube.com/v/$1&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/$1&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="295"></embed></object>';

var YTSRPATTERN = /http:\/\/www\.youtube\.com\/watch\?v=([0-9A-Za-z_-]+[0-9A-Za-z=&#;_]*)/g;

var YTSRPATTERN2 = /https:\/\/www\.youtube\.com\/watch\?v=([0-9A-Za-z_-]+[0-9A-Za-z=&#;_]*)/g;

var YTOBJPATTERN = /(<[Oo][Bb][Jj][Ee][Cc][Tt]\s+[^>]+>).+"(http:\/\/www\.youtube\.com\/v\/([0-9A-Za-z_-]+[0-9A-Za-z=&#]*))".+(<\/[Oo][Bb][Jj][Ee][Cc][Tt]>)/gm;

var VEOHEMPATTERN = '<object width="410" height="341" id="veohFlashPlayer" name="veohFlashPlayer"><param name="movie" value="http://www.veoh.com/static/swf/webplayer/WebPlayer.swf?version=AFrontend.5.4.2.22.1011&permalinkId=$2&player=videodetailsembedded&videoAutoPlay=0&id=anonymous"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.veoh.com/static/swf/webplayer/WebPlayer.swf?version=AFrontend.5.4.2.22.1011&permalinkId=$2&player=videodetailsembedded&videoAutoPlay=0&id=anonymous" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="410" height="341" id="veohFlashPlayerEmbed" name="veohFlashPlayerEmbed"></embed></object>';

var VEOHSRPATTERN = /http:\/\/www\.veoh\.com\/browse\/videos\/category\/([A-Za-z0-9_&#-]+)%3D([A-Za-z0-9_&#-]*)/g;

var VEOHSRPATTERN2 = /http:\/\/www\.veoh\.com\/.+\/watch\/([A-Za-z0-9_&#-]+)/g;

var VEOHEMPATTERN2 = '<object width="410" height="341" id="veohFlashPlayer" name="veohFlashPlayer"><param name="movie" value="http://www.veoh.com/static/swf/webplayer/WebPlayer.swf?version=AFrontend.5.4.2.22.1011&permalinkId=$1&player=videodetailsembedded&videoAutoPlay=0&id=anonymous"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.veoh.com/static/swf/webplayer/WebPlayer.swf?version=AFrontend.5.4.2.22.1011&permalinkId=$1&player=videodetailsembedded&videoAutoPlay=0&id=anonymous" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="410" height="341" id="veohFlashPlayerEmbed" name="veohFlashPlayerEmbed"></embed></object>';

var VEOHSRPATTERN3 = /http:\/\/www\.veoh\.com\/.+#watch%3D([A-Za-z0-9_&#-]+)/g;

var ASSRPATTERN = /http:\/\/www\.adultswim\.com\/video\/\?episodeID=([a-zA-Z0-9_]+)/g;

var ASEMPATTERN = '<style>div#main{overflow:visible;}</style><div style="background-color: #d53000; text-align:center;vertical-align: middle;width:425px;z-index:500;overflow:visible"><a href="http://www.adultswim.com/video/index.html" style="display:block;"><img src="http://www.adultswim.com/video/embeded_header.jpg" alt="" width="425" height="30" border="0"></a><object width="425" height="350" type="application/x-shockwave-flash" data="http://www.adultswim.com/video/vplayer/index.html"><param name="allowFullScreen" value="true" /><param name="movie" value="http://www.adultswim.com/video/vplayer/index.html"/><param name="FlashVars" value="id=$1" /><embed src="http://www.adultswim.com/video/vplayer/index.html" type="application/x-shockwave-flash" FlashVars="id=$1" allowFullScreen="true" width="425" height="350"></embed></object></div>';

var GOOGSRPATTERN = /http:\/\/video\.google\.com\/videoplay\?docid=([a-zA-Z0-9_-]+)(&hl=en)*/g;

var GOOGEMPATTERN = '<embed id="VideoPlayback" src="http://video.google.com/googleplayer.swf?docid=$1&hl=en&fs=true" style="width:400px;height:326px" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';

var VIMSRPATTERN = /http:\/\/vimeo\.com\/([0-9]+)/g;

var VIMEMPATTERN = '<object width="400" height="225"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=$1&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" /><embed src="http://vimeo.com/moogaloop.swf?clip_id=$1&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="400" height="225"></embed></object><p><a href="http://vimeo.com/$1">Underwater Opera</a> from <a href="http://vimeo.com/escapetonature">Escape to Nature</a> on <a href="http://vimeo.com">Vimeo</a>.</p>';

function L2VReplace(x) {
	var divs = document.getElementsByClassName("msg_body");
	for (i=0; i<divs.length; i++) {
		var div = divs[i];
		//td.innerHTML.appendChild(v);
		div.innerHTML = div.innerHTML.replace(YTSRPATTERN, YTEMPATTERN); //YT SWAP
        div.innerHTML = div.innerHTML.replace(YTSRPATTERN2, YTEMPATTERN); //YT SWAP
		div.innerHTML = div.innerHTML.replace(VEOHSRPATTERN, VEOHEMPATTERN); //VEOH SWAP
		div.innerHTML = div.innerHTML.replace(VEOHSRPATTERN2, VEOHEMPATTERN2); //VEOH SWAP
		div.innerHTML = div.innerHTML.replace(VEOHSRPATTERN3, VEOHEMPATTERN2); //VEOH SWAP
		div.innerHTML = div.innerHTML.replace(ASSRPATTERN, ASEMPATTERN); //[adutlswim] SWAP
		div.innerHTML = div.innerHTML.replace(GOOGSRPATTERN, GOOGEMPATTERN); //Google SWAP
		div.innerHTML = div.innerHTML.replace(VIMSRPATTERN, VIMEMPATTERN); //Vimeo
       
		//alert(div.innerHTML.replace(YTSRPATTERN, YTEMPATTERN));
	}
}

/*
function UndoL2VReplace(x) {
	var tds = document.getElementsByTagName("td");
	for (i=0; i<tds.length; i++) {
		var td = tds[i];
		td.innerHTML = td.innerHTML.replace(YTOBJPATTERN, '$2');
		//alert(td.innerHTML);
	}
}



function UndoL2VReplace2(x) {
	var bd = document.getElementsByTagName("div");
	for (i=0; i<bd.length; i++) {
		var br = bd[i];
		br.innerHTML = br.innerHTML.replace(YTOBJPATTERN, '$2');
		//alert(td.innerHTML);
	}
}
*/

v.addEventListener('click', function() {
	L2VReplace(document);
	},
	false
);


//v.removeEventListener('click', function() { UndoL2VReplace2(document); }, false );


//r.addEventListener('click', function() { UndoL2VReplace2(document); }, false );
//r.removeEventListener('click', function() { L2VReplace(document); }, false );