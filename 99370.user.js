// ==UserScript==
// @name           MegaVideo and VideoBB to Cacaoweb Popup Player
// @version        0.2.7
// @namespace      megaCacaoPlayer
// @include        *
// @icon           http://www.cacaoweb.org/favicon.ico
// @description    Inserts a Pop-Up Cacaoweb player on any page which contains a Megavideo or VideoBB link or player.
// @copyright      John Parks
// ==/UserScript==



// CHANGE LOG
//
// ===Version 0.2.7===
// ADD* Added VideoBB to search.
//
// ===Version 0.2.6===
// FIX* Added support for Google Chrome
//
// ===Version 0.2.5===
// BUG* Fixed broken download link.
//
// ===Version 0.2.4===
// BUG* Fixed Page Video links startup oppacity
//
//
//
//
//
//
//

var invis="0.5", vis="1";
var videoIDs;
var creationTimeoutID, progressUpdaterID, rollDownTimerID;
var cacaoweb_known;
var flashElements;

if(window === parent){
	GM_setValue('playerAdded', false);
	window.addEventListener('load', main, false);
}

function main(){
	cacaoweb_known = '000';	
	creationTimeoutID=setTimeout(function(){cacaoweb_known = 'AA4';	buildCacao();},2000); // Backup incase GM_xmlhttpRequest doesn't work...
	if(!GM_getValue('playerAdded',  true))
	{
		GM_xmlhttpRequest({	// If this page responds, Cacaoweb is running.
			method: 'HEAD',
			url: 'http://127.0.0.1:4001/isrunning',
			onload: buildMain,
			onerror: function(e)
			{
				//clearTimeout(creationTimeoutID);
				cacaoweb_known = '999';
				buildDownloadButton();
			}
		});
	}
}

function buildMain(e){
	clearTimeout(creationTimeoutID);
	if(e.status == 200){
		//buildInfo('Running!');
		cacaoweb_known = 'AAA';	
		buildCacao();		
	}
	else{
		//buildInfo('Not running!');
		cacaoweb_known = '666';
		buildDownloadButton();
	}
}

function buildCacao(){
	clearTimeout(creationTimeoutID);
	if(document.body != null && !GM_getValue('playerAdded',  true))
	{
		GM_setValue('playerAdded',true)
		// Find either 
		// A video player -> http://www.megavideo.com/v/[--ID--]MD5 
		// or 
		// A link to a video -> http://www.megavideo.com/?v=[--ID--]
		// http:\/\/www\.videobb\.com\/(?:e\/|video\/)(\w{12})
		var megavidID = /http:\/\/www\.megavideo\.com\/(?:v\/|\?v=)(\w{8})/g;
		var videobbID = /http:\/\/www\.videobb\.com\/(?:e\/|video\/)(\w{12})/g;
		var megaMatches = document.body.innerHTML.match(megavidID);
		var videobbMatches = document.body.innerHTML.match(videobbID);
		
		var IDs=[];
		var ID;
		if(megaMatches != null)
		{	// If we have a match. Create the player.
			for(var matchID in megaMatches)
			{
				ID=convertMegavideoURLtoID(megaMatches[matchID]);
				if(!arrayContainsText(IDs,ID))
					IDs.push(ID);
			}
		}
		if(videobbMatches != null)
		{	// If we have a match. Create the player.
			for(var matchID in videobbMatches)
			{
				ID=convertVideoBBURLtoID(videobbMatches[matchID]);
				if(!arrayContainsText(IDs,ID))
					IDs.push(ID);
			}
		}
		if(megaMatches != null ||
		   videobbMatches != null)
		{
			findAllMegavideoPlayers();
			findAllVideoBBPlayers();
			createCacaoweb(IDs);
		}
	}	
}

function arrayContainsText(array,obj){
	if(array != null && (array instanceof Array))
	{
		for(var i in array)
			if(array[i].toString() == obj.toString())
				return i;
		return false;
	}
}

function convertMegavideoURLtoID(megavideoURL){
	megavideoURL=removeUrlBase(megavideoURL);// Remove the url base.
	return megavideoURL.match(/[A-Z0-9]{8}/);
}

function convertVideoBBURLtoID(videobbURL){
	videobbURL=removeUrlBase(videobbURL);// Remove the url base.
	return videobbURL.match(/[a-zA-Z0-9]{12}/);
}

function removeUrlBase(url){
	return url.replace(url.match(/http:\/\/www\..*?\.com\//),'');}

function buildDownloadButton(){
	var downloadBtn = document.createElement('input');
	downloadBtn.id = downloadBtn.name = 'downloadCacaoweb';
	downloadBtn.type='button';
	downloadBtn.addEventListener('click',downloadCacaoweb,false);
	downloadBtn.addEventListener('mouseover',function(){downloadBtn.style.opacity=vis;},true);
	downloadBtn.addEventListener('mouseout',function(){downloadBtn.style.opacity=invis;},true);
	downloadBtn.value = 'Download Cacaoweb';
	downloadBtn.setAttribute(
		'style',
		'cursor: pointer; \
		position:fixed; \
		top:0px; \
		left:5px; \
		z-index: 2147483647; \
		opacity: 0.6; \
		border:0px solid #000; \
		border-left-width:2px; \
		border-right-width:2px; \
		border-bottom-width:2px; \
		background-color: #'+cacaoweb_known+'; \
		padding:1px 2px; \
		-moz-border-radius:1px 1px 10px 10px; \
		-webkit-border-radius:1px 1px 10px 10px; \
		font-size:11px; \
		font-family:Verdana;\
		color:#BBB !important; \
		text-decoration:none;');
	downloadBtn.style.marginLeft='-'+(downloadBtn.width/2)+'px';
	document.body.appendChild(downloadBtn);
}

function buildInfo(status){
	var downloadBtn = document.createElement('input');
	downloadBtn.id = downloadBtn.name = 'downloadCacaoweb';
	downloadBtn.type='button';
	downloadBtn.value = 'Cacaoweb\n'+status;
	downloadBtn.addEventListener('mouseover',function(){downloadBtn.style.opacity=vis;},true);
	downloadBtn.addEventListener('mouseout',function(){downloadBtn.style.opacity=invis;},true);
	running='A33';
	if(status=='Running!') running='3A3';
	downloadBtn.setAttribute(
		'style',
		'cursor: default; \
		position:fixed; \
		top:0px; \
		right:5px; \
		z-index: 2147483646; \
		opacity: 0.6; \
		border:0px solid #000; \
		border-left-width:2px; \
		border-right-width:2px; \
		border-bottom-width:2px; \
		background-color: #'+running+'; \
		padding:1px 2px; \
		-moz-border-radius:1px 1px 10px 10px; \
		-webkit-border-radius:1px 1px 10px 10px; \
		font-size:11px; \
		font-family:Verdana;color:#000 !important; \
		text-decoration:none;');
	downloadBtn.style.marginLeft=(downloadBtn.style.width/2)+'px';
	document.body.appendChild(downloadBtn);
}

function hideVideoPopup(id){
	if(videoIDs != null)
	{
		clearInterval(progressUpdaterID);
		showAllVideoPlayers();
		document.getElementById('CacaoVideoTint').style.display = 'none';
		document.getElementById('CacaoVideoPopup').style.display = 'none';
		document.getElementById('videoPlayer'+id).style.display = 'none';
		document.getElementById('close'+id).style.display = 'none';
		document.getElementById('delete'+id).style.display = 'none';
		document.getElementById('progressBar'+id).style.display = 'none';
		document.getElementById('title'+id).style.display = 'none';
		document.getElementById('openBtnCont').style.display = 'block';
	}
	else 
		alert("How did you do that?");
}
function showVideoPopup(id){
	if(videoIDs != null)
	{
		CacaowebDownloadsXML();
		hideAllVideoPlayers();
		progressUpdaterID=setInterval(function(){CacaowebDownloadsXML();},2000);
		document.getElementById('CacaoVideoTint').style.display = 'block';
		document.getElementById('CacaoVideoPopup').style.display = 'block';
		document.getElementById('videoPlayer'+id).style.display = 'block';
		document.getElementById('close'+id).style.display = 'block';
		document.getElementById('delete'+id).style.display = 'block';
		document.getElementById('progressBar'+id).style.display = 'block';
		document.getElementById('title'+id).style.display = 'block';
		document.getElementById('openBtnCont').style.display = 'none';
	}
	else 
		alert("How did you do that?");
}

function addHideEvent(id){
	var ele = document.getElementById('close'+id);
	if(ele!=null)
		ele.addEventListener('click',function(){hideVideoPopup(id);},true);
	else
		alert('hide:'+id);
}
function addShowEvent(id){
	var ele = document.getElementById('open'+id);
	if(ele!=null)
		ele.addEventListener('click',function(){showVideoPopup(id);},true);
	else
		alert('show:'+id);
}

function deleteID(id){
	if(videoIDs != null){		
		name=document.getElementById('title'+id).innerHTML;
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://127.0.0.1:4001/' + (/[A-Z0-9]{8}/.test(id)?'megavideo':'videobb') + '/delete.caml?videoid='+id,
		onload: function(e) 
		{
			if(e.status == 200 && e.responseText.match(/OK/))
				alert('Deleted "'+name+'" from Cacaoweb downloads list.');
			else
				alert('Error: Unable to delete "'+name+'" video.');
		},
		onerror: function(e)
		{
			alert('Error: Unable to delete "'+name+'" video.');
		}
		});
		hideVideoPopup(id);
	} 
	else 
		alert('WTF!\nHow did you do that?');
}
function addDeleteEvent(id){
	var ele = document.getElementById('delete'+id);
	if(ele!=null)
		ele.addEventListener('click',function(){deleteID(id);},true);
	else
		alert('delete:'+id);
}

function openManagement(){
	window.open('http://127.0.0.1:4001/admin.html','Management','').focus();
}

function createCacaoweb(ids){
	videoIDs=ids;
	
	var width = 670, height = 360, tint, videoDIV, openDIV, videosDIV, controlsDIV, managementBtn;
	
	tint = document.createElement('div');
	tint.id = 'CacaoVideoTint';
	tint.setAttribute(
		'style',
		'display:none;\
		position:fixed;\
		opacity: 0.9;\
		top:0px;\
		left:0px;\
		width:100%;\
		height:100%;\
		z-index: 2147483645;\
		background-color: #000;'
	);
	 
	videoDIV = document.createElement('div');
	videoDIV.id = 'CacaoVideoPopup';	  
	videoDIV.setAttribute(
		'style',
		'display:none;\
		position:fixed; \
		opacity: 1;\
		top:50%; \
		left:50%; \
		margin-left:-'+(width/2)+'px; \
		margin-top:-'+((height+10)/2)+'px; \
		z-index: 2147483646; \
		border:1px solid #FFF;\
		background-color: #000;\
		padding:2px 2px 25px 2px;\
		-moz-border-radius:10px; \
		-webkit-border-radius:10px; \
		width:'+width+'px; \
		height:'+(height+10)+'px;'
	);
		  
	managementBtn = document.createElement('input');
	managementBtn.id = managementBtn.name = 'CacaoManagement';
	managementBtn.type='button';
	managementBtn.addEventListener('click',openManagement,false);
	managementBtn.addEventListener('mouseover',function(){managementBtn.style.opacity=vis;},false);
	managementBtn.addEventListener('mouseout',function(){managementBtn.style.opacity=invis;},false);
	managementBtn.value = 'Management';
	managementBtn.setAttribute(
		'style',
		'cursor: pointer; \
		float:right; \
		margin-left:2px; \
		margin-bottom:2px; \
		z-index: 2147483647; \
		border:0px solid #000; \
		background-color: #999; \
		padding:1px 2px; \
		-moz-border-radius:2px 2px 2px 2px; \
		-webkit-border-radius:2px 2px 2px 2px; \
		font-size:11px; \
		font-family:Verdana;color:#000 !important; \
		text-decoration:none;'
	);
	managementBtn.style.opacity=invis;
	
	openDIV = document.createElement('div');
	openDIV.id='openBtnCont';
	openDIV.setAttribute(
		'style',
		'position:fixed; \
		top:0px; \
		left:5px; \
		z-index: 2147483645; \
		opacity: '+invis+'; \
		border:0px solid #000; \
		border-left-width:2px; \
		border-right-width:2px; \
		border-bottom-width:2px; \
		background-color: #'+cacaoweb_known+'; \
		padding:0px; \
		-moz-border-radius:1px 1px 10px 10px; \
		-webkit-border-radius:1px 1px 10px 10px; \
		font-size:11px; \
		font-family:Verdana;color:#000 !important; \
		text-decoration:none;\
		text-shadow: #222 2px 2px 2px;'
	);
	openDIV.addEventListener('mouseover',function(){openDIV.style.opacity=vis;},true);
	openDIV.addEventListener('mouseout',function(){openDIV.style.opacity=invis;},true);
	videosDIV = document.createElement('div');
	controlsDIV = document.createElement('div');
	videosDIV.setAttribute(
		'style',
		'z-index: 2147483646;'
	);
	controlsDIV.setAttribute(
		'style',
		'z-index: 2147483647;\
		height:25px;'
	);
	videoDIV.appendChild(controlsDIV);
	videoDIV.appendChild(videosDIV);
	
	for(var i=0;i<videoIDs.length; ++i){
		var videoID=videoIDs[i];
		var type = (/[A-Z0-9]{8}/.test(videoID)?'megavideo/megavideo.caml':'videobb/videobb.caml');
		
		var hr = document.createElement('hr');
		hr.setAttribute(
			'style',
			'height:1px;\
			margin:0px;\
			color:#000;\
			border:1px solid;'
		);
		hr.addEventListener('mouseover',function(){openDIV.style.opacity=vis;},true);
		hr.addEventListener('mouseout',function(){openDIV.style.opacity=invis;},true);
		openDIV.appendChild(hr);
		
		var showBtn = document.createElement('input');
		showBtn.id = showBtn.name = 'open'+videoID;
		showBtn.type='button';
		//showBtn.addEventListener('click',function(){addShowEvent(videoID);},true);
		showBtn.value = 'Watch '+videoID;
		showBtn.setAttribute(
			'style',
			'cursor: pointer; \
			opacity: '+invis+'; \
			border:none;\
			background-color:transparent;\
			padding:5px 2px; \
			font-size:11px; \
			font-family:Verdana;\
			color:#000 !important; \
			text-decoration:none;');
		openDIV.appendChild(showBtn);
		  
		var downloadProg=document.createElement('img');
		downloadProg.id='progressBar'+videoID;
		downloadProg.src='http://127.0.0.1:4001/progressbar.gif';
		downloadProg.setAttribute('alt','0%');
		downloadProg.setAttribute('title','0%');
		downloadProg.setAttribute(
			'style',
			'display:none;\
			float:left;\
			width:120px;\
			height: 12px;\
			-moz-border-radius:2px;\
			-webkit-border-radius:2px;\
			padding: 2ps; \
			margin: 2px;\
			margin-top:4px;\
			background-image:url("http://127.0.0.1:4001/progressbg_red.gif");\
			background-position:-120px 50%;'
		);
		controlsDIV.appendChild(downloadProg);
		var title=document.createElement('span');
		title.id='title'+videoID;
		title.innerHTML=videoID;
		title.setAttribute(
			'style',
			'display:none;\
			float:left;\
			left:0px;\
			width:305px;\
			height:14px\
			margin-top:4px;\
			font-size:12px;\
			font-family:Verdana;\
			color:#DDD !important;\
			text-decoration:none;\
			overflow:hidden;'
		);
		controlsDIV.appendChild(title);
		
		var deleteBtn = document.createElement('input');
		deleteBtn.id = deleteBtn.name = 'delete'+videoID;
		deleteBtn.type='button';
		//deleteBtn.addEventListener('click',function(){addDeleteEvent(videoID);},true);
		deleteBtn.value = 'Close and Delete';
		deleteBtn.setAttribute(
			'style',
			'display:none;\
			cursor: pointer; \
			float:right; \
			margin-left:2px; \
			margin-bottom:2px; \
			border:0px solid #000; \
			background-color: #999; \
			padding:1px 2px; \
			-moz-border-radius:2px 8px 2px 2px; \
			-webkit-border-radius:2px 8px 2px 2px; \
			font-size:11px; \
			font-family:Verdana;color:#000 !important; \
			text-decoration:none;');
		deleteBtn.style.opacity=invis;
		controlsDIV.appendChild(deleteBtn);
		  
		var closeBtn = document.createElement('input');
		closeBtn.id = closeBtn.name = 'close'+videoID;
		closeBtn.type='button';
		//closeBtn.addEventListener('click',function(){addHideEvent(videoID);},true);
		closeBtn.value = 'Close';
		closeBtn.setAttribute(
			'style',
			'display:none;\
			cursor: pointer; \
			float:right; \
			margin-left:2px; \
			margin-bottom:2px; \
			border:0px solid #000;\
			background-color: #999;\
			padding:1px 2px;\
			-moz-border-radius:2px 2px 2px 2px; \
			-webkit-border-radius:2px 2px 2px 2px; \
			font-size:11px;\
			font-family:Verdana;\
			color:#000 !important;\
			text-decoration:none;');
		closeBtn.style.opacity=invis;
		controlsDIV.appendChild(closeBtn);
		//controlsDIV.appendChild(managementBtn);
		
		var video = document.createElement('object')
		video.id='videoPlayer'+videoID;
		video.setAttribute(
			'style',
			'display:none;\
			width:'+width+'px; \
			height:'+height+'px;');
		video.innerHTML='<param name="allowFullScreen" value="true" />\
			<param name="flashvars" value="file=http://127.0.0.1:4001/' + type + '?videoid='+videoID+/*'&dontplay=1*/'" />\
			<param name="movie" value="http://127.0.0.1:4001/player.swf" />\
			<embed src="http://127.0.0.1:4001/player.swf" \
				flashvars="file=http://127.0.0.1:4001/' + type + '?videoid='+videoID+/*'&dontplay=1*/'" \
				width="'+width+'" height="'+height+'" \
				allowFullScreen="true" \
			/>';
		videosDIV.appendChild(video);
	}
	controlsDIV.appendChild(managementBtn);
	
	document.body.appendChild(videoDIV);
	document.body.appendChild(tint);
	document.body.appendChild(openDIV);
	
	for(var i=0;i<videoIDs.length; ++i){
		addHideEvent(videoIDs[i]);
		addShowEvent(videoIDs[i]);
		addDeleteEvent(videoIDs[i]);
		
		addShowOpacityEvent(videoIDs[i]);
		addOpacityEvent('close', videoIDs[i]);
		addOpacityEvent('delete', videoIDs[i]);
	}
	
	CacaowebDownloadsXML();
}

function addShowOpacityEvent(id){
	var ele = document.getElementById('open'+id); cont = document.getElementById('openBtnCont');
	if(ele!=null)
	{
		ele.addEventListener('mouseover',function(){cont.style.opacity=vis; ele.style.opacity=vis;},true);
		ele.addEventListener('mouseout',function(){cont.style.opacity=invis; ele.style.opacity=invis;},true);
	}
	else
		alert('open:'+id);
}
function addOpacityEvent(type, id){
	var ele = document.getElementById(type+id);
	if(ele!=null)
	{
		ele.addEventListener('mouseover',function(){ele.style.opacity=vis;},true);
		ele.addEventListener('mouseout',function(){ele.style.opacity=invis;},true);
	}
	else
		alert(type+':'+id);
}

function downloadCacaoweb() {
	var platform = "Windows";
	
	if ( navigator.platform != null ) {
		if ( navigator.platform.indexOf( "Win32" ) != -1 ) {
			platform = "Windows";
		} else if ( navigator.platform.indexOf( "Win64" ) != -1 ) {
			platform = "Windows";
		} else if ( navigator.platform.indexOf( "Win" ) != -1 ) {
			platform = "Windows";
		} else if ( navigator.platform.indexOf( "Linux" ) != -1 ) {
			platform = "Linux";
		} else if ( navigator.platform.indexOf( "Mac" ) != -1 && navigator.platform.indexOf( "Intel" ) != -1 ) {
			platform = "Mac OSX Intel";
	} else if ( navigator.platform.indexOf( "Mac" ) != -1 && navigator.platform.indexOf( "PPC" ) != -1 ) {
			platform = "Mac OSX PPC";
		} else if ( navigator.platform.indexOf( "Mac" ) != -1 ) {
			platform = "Mac OSX" ;
		} else
			platform = navigator.platform;
	}
	
	var uri = 'http://www.cacaoweb.org/download/cacaoweb.';
	
	if (platform == "Windows"){
		uri += "exe";
	} else if (platform == "Mac OSX" || platform == "Mac OSX Intel") {
		uri += "dmg";
	} else if (platform == "Linux") {
		uri += "linux";
	} else {
		alert("cacaoweb is not available for your platform");
	}
	
	setTimeout(function() { window.open(uri, '_newtab') },  0 ); // timeout could be 500 in case of direct download to make the user at ease
}

function CacaowebDownloadsXML(){
	var xml = null;
	if(videoIDs != null){
		GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://127.0.0.1:4001/downloads',
		onload: function(e) 
		{
			if(e.status == 200){
				xml=e.responseText;
				getAllVideoProgressInfo(xml);
			}
		}
		});
	} 
	else 
		alert('WTF!\nHow did you do that?');
	return xml;
}

function getAllVideoProgressInfo(xml){
	var data=[];
	var parser = new DOMParser();
    var dom = parser.parseFromString(xml, "application/xml");
	var downloads = dom.getElementsByTagName('downloaditem');
	
	for(var i=0; i<downloads.length; ++i){
		var itemData={'videoid':downloads[i].getElementsByTagName('videoid')[0].textContent,
					  'progress':downloads[i].getElementsByTagName('progress')[0].textContent,
					  'length':downloads[i].getElementsByTagName('length')[0].textContent,
					  'title':downloads[i].getElementsByTagName('title')[0].textContent,
					  'isOnPage':arrayContainsText(videoIDs,downloads[i].getElementsByTagName('videoid')[0].textContent)};
		data.push(itemData);
	}
	
	var element, offset;
	for(var i in data)
	{
		if(data[i].isOnPage)
		{
			element=document.getElementById('progressBar'+data[i].videoid);
			offset='-'+(element.width-((data[i].progress/100)*element.width))+'px 50%';
			element.style.backgroundPosition=offset;
			element.setAttribute('alt',data[i].progress+'%');
			element.setAttribute('title',data[i].progress+'%');
			document.getElementById('title'+data[i].videoid).innerHTML=data[i].title;
		}
	}
}


function findAllMegavideoPlayers(){
	var videoRegex =/http:\/\/www\.megavideo\.com\/v\/(\w{8})/g;
	flashElements = [];
	var flashes =  document.getElementsByTagName('*');
	for(var i=0; i< flashes.length; ++i)
	{
		if(videoRegex.test(flashes[i].src))
		{
			flashElements.push(flashes[i]);
		}
	}
}

function findAllVideoBBPlayers(){
	var videoRegex =/http:\/\/www\.videobb\.com\/e\/(\w{12})/g;
	var flashes =  document.getElementsByTagName('*');
	for(var i=0; i< flashes.length; ++i)
	{
		if(videoRegex.test(flashes[i].src))
		{
			flashElements.push(flashes[i]);
		}
	}
}

function hideAllVideoPlayers(){
	for(var i=0; i< flashElements.length; ++i)
	{
		flashElements[i].style.display='none';
	}
}

function showAllVideoPlayers(){
	for(var i=0; i< flashElements.length; ++i)
	{
		flashElements[i].style.display='block';
	}
}









