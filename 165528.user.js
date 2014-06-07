// ==UserScript==
// @name        rtmpdump-cli-spitter
// @namespace   breakthescreen
// @include     http://rtl-now.rtl.de/*player=*
// @include     http://www.voxnow.de/*player=*
// @include     http://rtl2now.rtl2.de/*player=*
// @include     http://www.superrtlnow.de/*player=*
// @include     http://www.n-tvnow.de/*player=*
// @include     http://www.rtlnitronow.de/*player=*
// @include     http://www.n24.de/n24/Mediathek/*
// @include	http://www.ardmediathek.de/*
// @include	http://mediathek.daserste.de*
// @exclude	*/breakad_iframe.php
// @exclude	*flashplayer_debug.php*
// @exclude	*generate_film_xml.php*
// @version     1.2
// ==/UserScript==




var deleteProg;
var prefPlace;
var bashPlace;
var appName;
var pageUrl = "http://" + document.domain;
var flag;
var teaserImageUrl;
var tcUrl;
var playpath;
var swfUrl;
var bashCode;
var prefStyle;
var bashStyle;
var videoName;
var description;
var playTime;
var mp4File;



function request(url, data, type, callback) {

		GM_xmlhttpRequest({
			method  : type  ,
			url     : url     ,
			onload  : callback,

		});

	
}


function selecttxt(objId) {

	if (document.selection) {

		var range = document.body.createTextRange();
		range.moveToElementText(document.getElementById(objId));
		range.select();

	}

	else if (window.getSelection) {

		var range = document.createRange();
		range.selectNode(document.getElementById(objId));
		window.getSelection().addRange(range);
	}



}


function replaceChars(text) {

	if(text.indexOf(' |') != -1) {

		text=text.split(' |')[0];

	}

	return text.replace(/:/g, "_").replace(/,/g, "").replace(/!/g, "_").replace(/\?/g, "_").replace(/\(/g, "").replace(/\)/g, "").replace(/&/g, "und").replace(/ /g, "_").replace(/-/g, "_").replace(/\._/g, ".").replace(/___/g, "__").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/Ä/g, "Ae").replace(/Ö/g, "Oe").replace(/Ü/g, "Ue").replace(/ß/g, "ss").replace(/&amp;/g, "und").replace(/\(/g, "").replace(/\)/g, "").replace(/\\u00c4/g, "Ae").replace(/\\u00e4/g, "ae").replace(/\\u00d6/g, "Oe").replace(/\\u00f6/g, "oe").replace(/\\u00dc/g, "Ue").replace(/\\u00fc/g, "ue").replace(/\\u00df/g, "ss").replace(/"/g, "").replace(/'/g, "");

}

function saveOptions() {



	var proof = 1;

	if (document.getElementById('mkvmerge').value == "") {

		proof = 0;

	}

	if (document.getElementById('rtmpdump').value == "") {

		proof = 0;

	}

	if (document.getElementById('wget').value == "") {

		proof = 0;

	}

	if (document.getElementById('tmp').value == "") {

		proof = 0;

	}

	if (document.getElementById('target').value == "") {

		proof = 0;

	}

	if (proof) {
	
		GM_setValue("mkvmerge", document.getElementById('mkvmerge').value);
		GM_setValue("rtmpdump", document.getElementById('rtmpdump').value);
		GM_setValue("wget", document.getElementById('wget').value);
		GM_setValue("tmp", document.getElementById('tmp').value);
		GM_setValue("target", document.getElementById('target').value);

		document.getElementById('pref').style.visibility = "hidden";
		document.location.reload();
		

	

	} else {

		window.alert("Sie müssen alle Felder ausfüllen!");

	}

}


if(GM_getValue("tmp", "") != "") {

    if(GM_getValue("tmp", "").indexOf("\\") != -1)  {
    
    	deleteProg = "del";
    
    }
    else if(GM_getValue("tmp", "").indexOf("/") != -1) {
    
    	deleteProg = "rm";
    
    }
    
}
	





var image_gear = "<img id='gear' src='data:image/png;base64,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' />";



if (document.getElementById('free_flash_player')) {


	prefPlace = document.getElementById("flash_layer");
	bashPlace = document.getElementById("flash_layer");


	var nodesSnapshot = document.evaluate('//div[contains(@class,"logo")]//img/@alt', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

		flag = nodesSnapshot.snapshotItem(i).textContent.split(' NOW')[0].split(' now')[0].replace(/ /g, "_") + "__";

	}

	videoName = flag + replaceChars(document.title);


	xmlUrl=document.body.innerHTML.split("'playerdata': '")[1].split("'")[0];
	swfUrl=document.body.innerHTML.split('swfobject.embedSWF("')[1].split('"')[0];
	number=swfUrl.split("=")[1];


	request(xmlUrl, '', 'get', function(xhr) {

		sessionStorage.setItem("tcUrl", xhr.responseText.split('<filename')[1].split('![CDATA[')[1].split(']]')[0].split('/' + xhr.responseText.split('<filename')[1].split('.de/')[1].split('/')[0])[0] + ":1935/" + xhr.responseText.split('<filename')[1].split('.de/')[1].split('/')[0] + "/");
		sessionStorage.setItem("playpath", "mp4:" + xhr.responseText.split('<filename')[1].split('![CDATA[')[1].split(']]')[0].split('/' + xhr.responseText.split('<filename')[1].split('.de/')[1].split('/')[0] + '/')[1]);
		sessionStorage.setItem("appName", xhr.responseText.split('<filename')[1].split('.de/')[1].split('/')[0] + "/");
		sessionStorage.setItem("app", xhr.responseText.split('<filename')[1].split('.de/')[1].split('/')[0]);
		
	});




	if(document.head.innerHTML.split('<meta property="og:image" content="')[1]) {

		teaserImageUrl = document.head.innerHTML.split('<meta property="og:image" content="')[1].split('"')[0];

	} else {

		array1 = document.body.innerHTML.split('"');


		for (var i = 0; i < array1.length; ++i) {

			if(array1[i].indexOf('autoimg.static-fra.de') != -1 && array1[i].indexOf('default') != -1 && array1[i].indexOf('384x216') != -1) {


				teaserImageUrl = array1[i].replace(/384x216/g, '1500x1500');


			}

		}

	}


	prefStyle = "color: #000000; font-size: 10pt; position: absolute; top: 0px; left: 0px; width: 714px; height: 397px; ";
	bashStyle = "";






} else if (document.getElementById('flash_video_container')) {


	var nodesSnapshot = document.evaluate('//div[contains(@class,"content_container")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

		prefPlace = nodesSnapshot.snapshotItem(i);
		bashPlace = nodesSnapshot.snapshotItem(i);

	}


	appName = "pssimn24";
	pageName = "n24.de";
	videoName = "N24__" + replaceChars(document.title).replace(/__N24.de/g, "");

	teaserImageUrl = document.body.innerHTML.split("_n24VideoCfg.html5.videoHTML5Poster = '")[1].split("'")[0];

	number = new Date().getTime();

	sessionStorage.setItem("tcUrl", document.body.innerHTML.split('_n24VideoCfg.flash.videoFlashconnectionUrl = "')[1].split('"')[0]);
	sessionStorage.setItem("playpath", document.body.innerHTML.split('_n24VideoCfg.flash.videoFlashSource = "')[1].split('"')[0]);
	sessionStorage.setItem("appName", document.body.innerHTML.split('_n24VideoCfg.flash.videoFlashconnectionUrl = "')[1].split('"')[0].split(':1935/')[1]);
	sessionStorage.setItem("app", document.body.innerHTML.split('_n24VideoCfg.flash.videoFlashconnectionUrl = "')[1].split('"')[0].split(':1935/')[1].split("/")[0]);
	swfUrl = "http://www.n24.de" + document.body.innerHTML.split("_n24VideoCfg.flash.SWFUrl = '")[1].split("'")[0];


	prefStyle = "color: #000000; font-size: 10pt; position: absolute; top: 125px; left: 20px; width: 892px; height: 497px; ";
	bashStyle = "font-size: 10pt; ";






} else if(document.title.indexOf('ARD Mediathek: Video-Clip') != -1) {



	request(document.location.href, '', 'get', function(xhr) {


		sessionStorage.setItem("hmtlContent", xhr.responseText);


	});



	var nodesSnapshot = document.evaluate('//meta[contains(@property,"video:release_date")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

			playTime = nodesSnapshot.snapshotItem(i).content.split(":")[0].replace(/T/g, "_").replace(/-/g, ".") + "Uhr" + nodesSnapshot.snapshotItem(i).content.split(":")[1];
	
	}


	var nodesSnapshot = document.evaluate('//meta[contains(@name,"description")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

			videoName = "ARD__" + playTime + "__" + replaceChars(nodesSnapshot.snapshotItem(i).content.replace(/ \| Video-Clip /g, "__").split(": ")[0]).replace(/_FSK/g, "").replace(/__tagesschau/g, "");

			if( typeof nodesSnapshot.snapshotItem(i).content.split(": ")[1] != 'undefined' ) {

				description = replaceChars(nodesSnapshot.snapshotItem(i).content.replace(/ \| Video-Clip /g, "__").split(": ")[1]).replace(/_/g, " ");

			}
		

	}


	
	var nodesSnapshot = document.evaluate('//div[contains(@class,"mt-player_container")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

		prefPlace = nodesSnapshot.snapshotItem(i);
		bashPlace = nodesSnapshot.snapshotItem(i);

	}





	prefStyle = "color: #000000; font-size: 10pt; position: absolute; top: 15%; left: 20%; width: 800px; height: 260px; ";
	bashStyle = "font-size: 8pt; ";





	var nodesSnapshot = document.evaluate('//meta[contains(@itemprop,"image")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

			teaserImageUrl = nodesSnapshot.snapshotItem(i).content
		
	}


	if(! sessionStorage.getItem("hmtlContent")) {

		window.location.reload();

	}


	if(sessionStorage.getItem("hmtlContent").indexOf("mp4:") != -1) {

		sessionStorage.setItem("tcUrl", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0]);
		sessionStorage.setItem("playpath", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("mp4:")).split('"')[0]);
		sessionStorage.setItem("appName", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split(".").pop().slice(sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split(".").pop().indexOf("/")+1));
		sessionStorage.setItem("app", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split("/").pop());
	
	} else if(sessionStorage.getItem("hmtlContent").indexOf('.mp4"') != -1) {

		mp4File = sessionStorage.getItem("hmtlContent").split("").reverse().join("").slice(sessionStorage.getItem("hmtlContent").split("").reverse().join("").indexOf('"4pm.')).split('"')[1].split("").reverse().join("");

	}


	swfUrl = "http://www.ardmediathek.de/ard/static/player/base/flash/PluginFlash.swf";

	number = document.location.href.split("documentId=")[1];



} else if(document.getElementById('box_video_player')) {


	request(document.location.href, '', 'get', function(xhr) {


		sessionStorage.setItem("hmtlContent", xhr.responseText);


	});


	videoName = "ARD__" + replaceChars(document.title.replace(/Das Erste Mediathek \[ARD\] - /g, "").replace(/\(FSK | tgl. 20 Uhr\) /g, "").replace(/\|/g, "").replace(/ - SENDUNG VERPASST\?/g, ""));

	prefPlace = document.getElementById("box_video_player");
	bashPlace = document.getElementById("main");

	prefStyle = "color: #000000; font-size: 10pt; position: absolute; top: 2px; left: 13px; width: 800px; height: 260px; ";
	bashStyle = "font-size: 8pt; color: #FFFFFF; ";


	var nodesSnapshot = document.evaluate('//link[contains(@rel,"image_src")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {

			teaserImageUrl = nodesSnapshot.snapshotItem(i).href
		
	}


	if(! sessionStorage.getItem("hmtlContent")) {

		window.location.reload();

	}


	if(sessionStorage.getItem("hmtlContent").indexOf("mp4:") != -1) {

		sessionStorage.setItem("tcUrl", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0]);
		sessionStorage.setItem("playpath", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("mp4:")).split('"')[0]);
		sessionStorage.setItem("appName", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split(".").pop().slice(sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split(".").pop().indexOf("/")+1));
		sessionStorage.setItem("app", sessionStorage.getItem("hmtlContent").slice(sessionStorage.getItem("hmtlContent").lastIndexOf("rtmp")).split('"')[0].split("/").pop());
	
	} else if(sessionStorage.getItem("hmtlContent").indexOf('.mp4"') != -1) {

		mp4File = sessionStorage.getItem("hmtlContent").split("").reverse().join("").slice(sessionStorage.getItem("hmtlContent").split("").reverse().join("").indexOf('"4pm.')).split('"')[1].split("").reverse().join("");

	}


	swfUrl = "http://mediathek.daserste.de/daserste/static/player/base/flash/PluginFlash.swf";

	number = document.location.href.split("/").pop().split("_")[0];
	

}









	

var preferences = "<div id='pref' style='" + prefStyle + " opacity: 0.9; background-image: linear-gradient(left top, rgb(66,106,171) 16%, rgb(93,138,206) 58%, rgb(121,166,248) 79%) ;background-image: -o-linear-gradient(left top, rgb(66,106,171) 16%, rgb(93,138,206) 58%, rgb(121,166,248) 79%) ;background-image: -moz-linear-gradient(left top, rgb(66,106,171) 16%, rgb(93,138,206) 58%, rgb(121,166,248) 79%) ;background-image: -webkit-linear-gradient(left top, rgb(66,106,171) 16%, rgb(93,138,206) 58%, rgb(121,166,248) 79%) ;background-image: -ms-linear-gradient(left top, rgb(66,106,171) 16%, rgb(93,138,206) 58%, rgb(121,166,248) 79%) ; overflow: hidden; padding: 3px; border-style: solid; border-width: 1px; border-color: #FFFFFF; background-color: silver; visibility: hidden; z-index: 1000000;'><table><caption style='font-size: 24pt; text-align: left;'>Einstellungen</caption>&nbsp;<br/><br/><tr><td>mkvmerge:</td><td><input style='color: #000000;' id='mkvmerge' name='mkvmerge' value='" + GM_getValue( "mkvmerge", "" ) + "' type='text' size='50' maxlength='100000' accept='text/*'></td><td><a style='text-decoration: none; color: #FFFFFF;' target='_blank' href='http://www.bunkus.org/videotools/mkvtoolnix/downloads.html'>mkvtoolnix - DL &gt;</a></td></tr><tr><td>rtmpdump:</td><td><input style='color: #000000;' id='rtmpdump' name='rtmpdump' value='" + GM_getValue( "rtmpdump", "" ) + "' type='text' size='50' maxlength='100000' accept='text/*'></td><td><a style='text-decoration: none; color: #FFFFFF;' target='_blank' href='http://rtmpdump.mplayerhq.hu/'>rtmpdump - DL &gt;</a></td></tr><tr><td>wget:</td><td><input style='color: #000000;' name='wget' id='wget' value='" + GM_getValue( "wget", "" ) + "' type='text' size='50' maxlength='100000' accept='text/*'></td><td><a style='text-decoration: none; color: #FFFFFF;' target='_blank' href='http://users.ugent.be/~bpuype/wget/'>wget - DL &gt;</a></td></tr><tr><td>Temp-Ordner:</td><td><input style='color: #000000;' id='tmp' name='tmp' value='" + GM_getValue( "tmp", "Mit Slash bzw. Backslash am Ende des Pfades eintragen!" ) + "' type='text' size='50' maxlength='100000' accept='text/*'></td></tr><td>Ziel-Ordner:</td><td><input style='color: #000000;' id='target' name='target' value='" + GM_getValue( "target", "Mit Slash bzw. Backslash am Ende des Pfades eintragen!" ) + "' type='text' size='50' maxlength='100000' accept='text/*'></td></tr><tr><td></td><td><input style='color: #000000;' id='save' onclick=\"this.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility='hidden';\" name='save' type='button' value='Speichern'></td></tr></table></div>";


if(prefPlace) {

	prefPlace.innerHTML = preferences + prefPlace.innerHTML;

}





if(GM_getValue( "mkvmerge", "" ) == "" || GM_getValue( "rtmpdump", "" ) == "" || GM_getValue( "wget", "" ) == "" || GM_getValue( "tmp", "" ) == "" || GM_getValue( "target", "" ) == "" ) {

	bashCode = image_gear +  "&nbsp;<span id='noparams' style='position: relative; top: -8px; color: red; font-size: 16pt;'>Es M&uuml;ssen alle Programm- bzw. Ordner-Pfade angegeben werden!</span>";

} else {

	if(mp4File) {

		bashCode =  image_gear + "<div onclick=\"var range = document.createRange();range.selectNode(document.getElementById('codediv'));window.getSelection().addRange(range);\" id='codediv' style='" + bashStyle + " border-style: solid; border-width: 1px; border-color: #FFFFFF;'>\"" + GM_getValue( "wget", "" ) + "\" \"" + mp4File + "\" -O \"" + GM_getValue( "tmp", "" ) + "mp4_" + number + "_video.mp4\" && \"" + GM_getValue( "wget", "" ) + "\" \"" + teaserImageUrl + "\" -O \"" + GM_getValue( "tmp", "" ) + "mp4_" + number + "_teaserimage.jpg\" && \"" + GM_getValue( "mkvmerge", "" ) + "\" -o \"" + GM_getValue( "target", "" ) + videoName + ".mkv\"  --forced-track 0:no --forced-track 1:no -a 1 -d 0 -S -T --no-global-tags --no-chapters \"" + GM_getValue( "tmp", "" ) + "mp4_" + number + "_video.mp4\" --track-order 0:0,0:1 --attachment-mime-type image/jpeg --attachment-name teaserimage.jpg --attach-file \"" + GM_getValue( "tmp", "" ) + "mp4_" + number + "_teaserimage.jpg\" && " + deleteProg + " \"" + GM_getValue( "tmp", "" ) + "mp4_" + number + "_" + "\"*</div>";

	} else {

		bashCode = image_gear + "<div onclick=\"var range = document.createRange();range.selectNode(document.getElementById('codediv'));window.getSelection().addRange(range);\" id='codediv' style='" + bashStyle + " border-style: solid; border-width: 1px; border-color: #FFFFFF;'>\"" + GM_getValue( "rtmpdump", "" ) + "\" -r \"#tcUrl#\" -a \"#appName#\" -f \"LNX 11,2,202,275\" -W \"" + swfUrl + "\" -p \"" + pageUrl + "\" -y \"#playpath#\" -o \"" + GM_getValue( "tmp", "" ) + "#app#_" + number + "_out.flv\" && \"" + GM_getValue( "wget", "" ) + "\" \"" + teaserImageUrl + "\" -O \"" + GM_getValue( "tmp", "" ) + "#app#_" + number + "_teaserimage.jpg\" && \"" + GM_getValue( "mkvmerge", "" ) + "\" -o \"" + GM_getValue( "target", "" ) + videoName + ".mkv\"  --forced-track 0:no --forced-track 1:no -a 1 -d 0 -S -T --no-global-tags --no-chapters \"" + GM_getValue( "tmp", "" ) + "#app#_" + number + "_out.flv\" --track-order 0:0,0:1 --attachment-mime-type image/jpeg --attachment-name teaserimage.jpg --attach-file \"" + GM_getValue( "tmp", "" ) + "#app#_" + number + "_teaserimage.jpg\" && " + deleteProg + " \"" + GM_getValue( "tmp", "" ) + "#app#_" + number + "_" + "\"*</div>";

	}

}


if(bashPlace) {

	bashPlace.innerHTML = bashPlace.innerHTML + bashCode;

}

if(bashPlace && prefPlace) {

	if(document.getElementById("codediv")) {

		document.getElementById("codediv").addEventListener("mouseover", function(event) { document.getElementById("codediv").innerHTML = document.getElementById("codediv").innerHTML.replace(/#app#/g, sessionStorage.getItem("app")).replace(/#appName#/g, sessionStorage.getItem("appName")).replace(/#tcUrl#/g, sessionStorage.getItem("tcUrl")).replace(/#playpath#/g, sessionStorage.getItem("playpath")); sessionStorage.clear(); }, false);

	}
	document.getElementById("gear").addEventListener("click", function(event) { document.getElementById('pref').style.visibility = "visible"; }, false);
	document.getElementById("noparams").addEventListener("click", function(event) { document.getElementById('pref').style.visibility = "visible"; }, false);
	document.getElementById("save").addEventListener("click", function(event) { saveOptions(); }, false);



}



