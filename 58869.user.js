// ==UserScript==
// @name	ICE Quick Stream
// @version	6.2
// @namespace	http://icefilms.info
// @description	Enables video streaming from Mediafire, 2shared, and all file hosts based on the Xfilesharing script. Streams via icedivx.com. This script works closely with the high quality video links database www.icefilms.info

// @include	http://*

// ==/UserScript==

var version = "6.2";

// get url params
function gup(name){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(location.href);
	if (results == null)
		return "";
	else
		return results[1];
}

// url params
var w = gup('w');
var h = gup('h');

// defaults
if (!w) w = 638;
if (!h) h = 388;
var downloadlink = 0;
var flashlink = 0;
var timer = 0;


function iceVerify(url){
	if (typeof url === 'undefined') url = location.href;
	var iframe = document.createElement("iframe");
	iframe.src = 'http://www.icefilms.info/membersonly/components/com_iceplayer/verify.php?url='+escape(url);
	iframe.style.width = w+'px';
	iframe.style.height= h+'px';
	iframe.style.border= "0";
	iframe.style.margin= "0";
	iframe.style.position="relative";
	iframe.style.display="block";
	iframe.style.zIndex= "9999999999";
	iframe.setAttribute("scrolling","no");
	iframe.setAttribute("id","iceVerify");
	document.body.insertBefore(iframe, document.body.firstChild);
}

function hostLove(){
	var box = document.createElement("div");
	box.style.width = '300px';
	box.style.height= '100px';
	box.style.border= "0";
	box.style.margin= "0";
	box.style.position="absolute";
	box.style.left = (w+50)+"px";
	box.style.top = (h/2-50)+"px";
	box.style.textAlign = "center";
	box.style.zIndex= "9999999999";
	box.setAttribute("id","hostLove");
	box.innerHTML = "<h1>Enjoying this host? Show them some love by clicking an ad!<br>↓</h1>";
	document.body.insertBefore(box, document.body.firstChild);
}

function iceEmbed(){
	var iframe = document.createElement("iframe");
	iframe.src = 'http://www.icedivx.com/video.php?w='+w+'&h='+(h-18)+'&vurl='+escape(downloadlink)+'&flash='+flashlink+'&t='+timer+'&v='+version;
	iframe.style.width = w+'px';
	iframe.style.height= h+'px';
	iframe.style.border= "0";
	iframe.style.margin= "0";
	iframe.style.position="relative";
	iframe.style.display="block";
	iframe.style.zIndex= "9999999999";
	iframe.setAttribute("scrolling","no");
	iframe.setAttribute("id","iceQuickStream");
	document.body.insertBefore(iframe, document.body.firstChild);
}

function getDWPver(){
	var userAgent = navigator.userAgent;
	if (userAgent.search(/msie/i) != -1){ // IE
		var dwp = null;
		try{ dwp = new ActiveXObject('npdivx.DivXBrowserPlugin.1');
		} catch (e) { }

		if (dwp) return dwp.GetVersion();
	}
	else if (navigator.plugins != null && navigator.plugins.length > 0){ // FF, etc.
		var plugs = navigator.plugins;
		for (i in plugs){
			if (plugs[i].description && (results = plugs[i].description.match(/DivX(?: | Plus )Web Player[a-z ]*([0-9.]*)/)))
				return results[1];
		}
	}
	return "0";
}

function scrapeURL(src){
	var packed = src.match(/\(function\(p,a,c,k,e,d\).+\)/gi);
	for (x in packed){
		src += eval(packed[x]);
	}
	var match = src.match(/[\'\">](https?:\/\/[0-9a-z\:\.]{5,30}\/[0-9a-z]{1,2}\/[0-9a-z]{14,56}\/(?!video).+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]/i);
	if (!match){
		match = src.match(/[\'\">](https?:\/\/[0-9a-z\:\.]{5,30}\/[0-9a-z]{1,2}\/[0-9a-z]{14,56}\/.+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]/i);
	}
	if (match){
		return match[1];
	}
}
	
function iceInlineEmbed(){

	var showHideDivs = "\
		this.rel=1;\
		document.getElementById('fakeVidPlayer').style.visibility='hidden';\
		document.getElementById('VLCplaybutton').style.visibility='hidden';\
		document.getElementById('playbutton').style.visibility='hidden';\
		document.getElementById('downloadbutton').style.visibility='hidden';\
		document.getElementById('waiting').style.visibility='visible';\
		document.getElementById('action').innerHTML=this.id.substring(0,this.id.length-6)+'ing';\
		return false;\
	";
	
	if (location.host.match('rapidshare.com') || location.host.match('speedy')){
		// DL ONLY
		var playbutton = "<a id=VLCplaybutton style='display:none;'></a><a id='playbutton' style='display:none;'></a><span title='Streaming not available from this host. Download only.' style='display: block; position: absolute; top: 88.375px; right: 76.5px; z-index: 1; width: 48px; height: 48px; background: url(http://www.icedivx.com/images/playbutton-no1.png) top;'></span>";
		var fakeVidControls = "\
		<div style='position:absolute; bottom:0; left:0; height:26px; width:100%; background-repeat: repeat-x; background-image: url(http://www.icedivx.com/images/divxcontrols2.png);'></div> \
		<div style='position:absolute; bottom:0; left:0; height:26px; width:71px; background-image: url(http://www.icedivx.com/images/divxcontrols1.png);'></div> \
		<div style='position:absolute; bottom:0; right:0; height:26px; width:264px; background-image: url(http://www.icedivx.com/images/divxcontrols3.png);'></div> \
		";
	}else{
		// DL OR STREAM
		var playbutton = "<a id='VLCplaybutton' onClick=\""+showHideDivs+"\" href='#' title='Play in VLC Player' style='display: block; position: absolute; top: 88.375px; right: 76.5px; z-index: 1; width: 48px; height: 48px; background: url(http://www.icedivx.com/images/playbutton-vlc5.png) top;' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a>";
		playbutton += "<a id='playbutton' onClick=\""+showHideDivs+"\" href='#' title='Play in DivX Web Player' style='display: none; position: absolute; top: 88.375px; right: 46.5px; z-index: 1; width: 48px; height: 48px; background: url(http://www.icedivx.com/images/playbutton-dwp5.png) top;' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a>";
		var fakeVidControls = "<a onClick=\"document.getElementById('VLCplaybutton').onclick();return false;\" href='#' onmouseover=\"document.getElementById('VLCplaybutton').style.backgroundPosition='bottom'\" onmouseout=\"document.getElementById('VLCplaybutton').style.backgroundPosition='top'\"> \
		<div style='position:absolute; bottom:0; left:0; height:26px; width:100%; background-repeat: repeat-x; background-image: url(http://www.icedivx.com/images/divxcontrols2.png);'></div> \
		<div style='position:absolute; bottom:0; left:0; height:26px; width:71px; background-image: url(http://www.icedivx.com/images/divxcontrols1.png);'></div> \
		<div style='position:absolute; bottom:0; right:0; height:26px; width:264px; background-image: url(http://www.icedivx.com/images/divxcontrols3.png);'></div> \
		</a>";
	}
	
	var box = document.createElement("div");
	box.style.width = w+'px';
	box.style.height= h+'px';
	box.style.border= "0";
	box.style.margin= "0";
	box.style.position="relative";
	box.style.zIndex= "9999999999";
	box.setAttribute("id","iceQuickStream");
	box.innerHTML = "\
	\
	    <div id=waiting style='visibility:hidden; position:absolute; width:45%; right:0; text-align:center; top:50%; height:150px; margin-top:-75px; background-color:black;'>\
		[<b><label id=action></label></b>]<br><br>\
		<B style='font-size:24pt;'><i>Waiting</i> <img src=http://www.icedivx.com/images/ajax-loader.gif width=25></B><BR><BR>\
		<b style='font-size:20px;'><label id=countdown></label></b>\
		<p><br>Waiting for link to become active.\
	    </div>\
	\
	    <div id=downloading style='visibility:hidden; position:absolute; width:100%; text-align:center; top:50%; height:100px; margin-top:-50px; background-color:black;'>\
		<B style=font-size:24pt;>Downloading...</B><BR><BR>\
		<p><BR>If your download does not start automatically, click <a id=dlclickhere href='"+downloadlink+"'>here</a>.\
	    </div>\
	\
	    <div id=corners>\
		<div style='position:absolute; top:0; left:0;'>\
			<span style='font-size:10px;font-family:Impact;'>Thank you for choosing</span><br>\
			&nbsp; &nbsp;<a href='http://www.icedivx.com' target='_blank' style='text-decoration:none; font-weight:bold; font-size:25px;'><span style='color:#09F;'>Ice</span><span style='color:#dddddd;'>DivX</span></a>\
	    	</div>	\
		<div style='position:absolute;top:2px;right:5px;color:grey;'>IQS v"+version+"</div> \
	    </div>\
	\
	    <div id=fakeVidPlayer> \
	    	<div style='position:absolute; bottom:32px; right:10px;'><a href='http://www.videolan.org/vlc/' target='_blank'>Install VLC</a></div>\
		<img src='http://img251.imageshack.us/img251/149/2lwra5s.jpg' width='100%' height="+h+" border='0' /> \
		"+fakeVidControls+"\
	    </div>\
	\
	    <div id=buttons style='position: absolute; top:50%; left:50%; width:500px; height:250px; margin-left:-250px; margin-top:-138px; '> \
		<div style='width:500px; left:0px;'> \
		    <iframe src='http://www.icedivx.com/300x250ad' style='width:300px; height:250px; float:left; border:0; margin:0; padding:0;' scrolling=no></iframe>\
		    "+playbutton+"\
		    <a id='downloadbutton' onClick=\""+showHideDivs+"\" href='#' style='display: block; position: absolute; top: 152.375px; right: 28.5px; z-index: 1; width: 144px; height: 48px; background: url(http://www.icedivx.com/images/downloadbutton.png) top' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a> \
			</div> \
	    </div>\
	\
	    <div id=divxPlayer style='display:none;top:0;position:absolute;'>\
			<span style='float:right;'> \
				<label id='currentStatus'></label>&nbsp;<label id='currentDownload'></label>&nbsp;<label id='totalDownload'></label>&nbsp;<label id='downloadSpeed'></label> \
			</span> \
	\
			<a href='http://www.icefilms.info' target=_blank><img border='0' height=16 src='http://www.icefilms.info/images/logosmall.png'></a> \
			<br> \
			<object id='ie_plugin' classid='clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616' \
				width='"+w+"' \
				height='"+(h-18)+"' \
				codebase='http://go.divx.com/plugin/DivXBrowserPlugin.cab'> \
	\
		  <param name='custommode' value='stage6' /> \
		  <param name='previewImage' value='http://img18.imageshack.us/img18/8372/playerbanner.jpg' /> \
		  <param name='autoPlay' value='true' /> \
		  <param name='src' id='ie_param' value="+downloadlink+" /> \
		  <param name='bannerEnabled' value='false' /> \
		  <param name='timeCallback' value='myTimeCallback' /> \
		  <param name='statusCallback' value='myDivXPlugin.statusCallbackSink' /> \
		  <param name='bufferCallback' value='myBufferCallback' /> \
		  <param name='downloadCallback' value='myDownloadCallback' /> \
	\
		  <embed id='np_plugin' type='video/divx'\
			   src="+downloadlink+"\
			   custommode='stage6'\
			   width='"+w+"'\
			   height='"+(h-18)+"'\
			   autoPlay='true'\
			   bannerEnabled='false'\
			   previewImage='http://img18.imageshack.us/img18/8372/playerbanner.jpg'\
			   timeCallback='myTimeCallback'\
			   statusCallback='myDivXPlugin.statusCallbackSink'\
			   bufferCallback='myBufferCallback'\
			   downloadCallback='myDownloadCallback'\
			   pluginspage='http://go.divx.com/plugin/download/'>\
		  </embed>\
		  </object>\
	    </div>\
	";
	document.body.insertBefore(box, document.body.firstChild);


	var ss = document.createElement("script");
	ss.text = "\
		function myTimeCallback(current)\
		{\
			 document.getElementById('currentTime').innerHTML = current;\
		}\
		function myBufferCallback(current,total)\
		{\
			 document.getElementById('currentBuffer').innerHTML = current;\
			 document.getElementById('totalBuffer').innerHTML = total;\
		}\
		function myDownloadCallback(current,total)\
		{\
			 curSpeed = Math.round((current - lastKB) / 1000);\
			 document.getElementById('currentDownload').innerHTML = Math.round(current / 100000)/10;\
			 document.getElementById('totalDownload').innerHTML = 'of ' + Math.round(total / 100000)/10 + ' MB';\
			 document.getElementById('downloadSpeed').innerHTML = '(' + curSpeed + 'KB/s)';\
			 lastKB = current;\
		}\
		function DivXPluginSinks()\
		{\
			this.statusCallbackSink = function(status)\
			{\
				var s = parseInt(status);\
				var cs = document.getElementById('currentStatus');\
				switch(s)\
				{\
					 case 0:\
					 cs.innerHTML = 'Initialized';\
					 break;\
					 case 1:\
					 cs.innerHTML = 'Video Opened';\
					 break;\
					 case 2:\
					 cs.innerHTML = 'End of Video';\
					 onbeforeunload = '';\
					 break;\
					 case 10:\
					 cs.innerHTML = '';\
					 break;\
					 case 15:\
					 BScounter++;\
					 cs.innerHTML = 'Connect Attempt #'+BScounter;\
					 break;\
					 case 16:\
					 cs.innerHTML = 'Buffering Stop';\
					 break;\
					 case 17:\
					 cs.innerHTML = 'Download Start';\
					 break;\
					 case 18:\
					 cs.innerHTML = 'Download Failed';\
					 break;\
					 case 19:\
					 if ((document.getElementById('currentDownload').innerHTML == '' || document.getElementById('totalDownload').innerHTML == 'of 0 MB') && BScounter<=10)\
						setTimeout(function(){(navigator.userAgent.indexOf('MSIE') != -1)?plugin = document.getElementById('ie_plugin'):plugin = document.getElementById('np_plugin');plugin.Open(document.getElementById('np_plugin').src)},500);\
					 else if (BScounter>10)\
						cs.innerHTML = 'Failed to Connect';\
					 else\
					 	cs.innerHTML = 'Download Done';\
					 break;\
				}\
			}\
		}\
		var lastKB = 0;\
		var curSpeed = 0;\
		var plugin;\
		\
		var BScounter = 0;\
		myDivXPlugin = new DivXPluginSinks();\
	";
	var hh = document.getElementsByTagName('head')[0];
	hh.appendChild(ss);
	
	ss = document.createElement("style");
	ss.setAttribute("type","text/css");
	var def = "\
	    #iceQuickStream, #fakeVidPlayer, #divxPlayer {\
		background-color:black;\
		color:white;\
		font-family:Arial, Helvetica, sans-serif;\
		font-size:12px;\
	    }\
	";
	if (ss.styleSheet) {   // IE
	    ss.styleSheet.cssText = def;
	} else {                // the rest
	    var tt = document.createTextNode(def);
	    ss.appendChild(tt);
	}
	hh.appendChild(ss);
	
	//dwp inits
	var lastKB = 0;
	var curSpeed = 0;
	var BScounter = 0;
	var plugin;
}

function iceInlineEmbed_LinkReady(){

	var killDivs = "\
		document.getElementById('buttons').style.display = 'none';\
		document.getElementById('fakeVidPlayer').style.display = 'none';\
		document.getElementById('waiting').style.display = 'none';\
		document.getElementById('corners').style.display = 'none';\
	";
	var host='';
	if (document.referrer) host = document.referrer.match("^https?://(www\.)?([a-z0-9]+)\.[a-z]+/")[2];
	var xspfURL = "http://www.icedivx.com/url2xspf.php?url="+escape(downloadlink)+"&host="+host;
	var playXSPF = "location.href = '"+xspfURL+"'; ";
	var showDWP = killDivs+"document.getElementById('divxPlayer').style.display = 'block'; onbeforeunload = function(){return 'Streaming in progress'}; ";

	document.getElementById('VLCplaybutton').setAttribute('onclick',playXSPF+"return false;");
	document.getElementById('playbutton').setAttribute('onclick',showDWP+"return false;");
	//document.getElementById('playbutton').onclick = showDWP+"return false;";
	document.getElementById('ie_param').value = downloadlink;
	document.getElementById('np_plugin').src = downloadlink;
	document.getElementById('dlclickhere').href = downloadlink;
	document.getElementById('downloadbutton').href = downloadlink;
	document.getElementById('downloadbutton').setAttribute('onclick','');
	//document.getElementById('downloadbutton').onclick = '';
	
	if (document.getElementById('VLCplaybutton').rel==1){
		eval(killDivs);
		location.href = xspfURL;
	}
	else if (document.getElementById('downloadbutton').rel==1){
		eval(killDivs);
		document.getElementById('downloading').style.visibility = 'visible';
		location.href = downloadlink;
	}else{
		var DWPver = getDWPver();
		if ( (DWPver.substr(0,1) == 1 && downloadlink.match(/\.(avi|divx)(\?.+)?$/i))
		   ||(DWPver.substr(0,1) >= 2 && downloadlink.match(/\.(avi|divx|mkv|mp4|mov)(\?.+)?$/i))
		   ){
			document.getElementById('VLCplaybutton').style.right = "106.5px";
			document.getElementById('playbutton').style.display = "block";
		}
	}
}

function bad_content(content){
	content = content.replace(/No such file No such user exist File not found/gi,'');
	return content.match(/Copyright Infringement/i) ||
	content.match(/deleted for DMCA/i) ||
	content.match(/due to inactivity or DMCA/i) ||
	content.match(/file expired or deleted by /i) ||
	content.match(/File Not Found/i) ||
	content.match(/File was removed/i) ||
	content.match(/No such file with this filename/i) ||
	content.match(/No such user exist/i) ||
	content.match(/Reason of deletion/i) ||
	content.match(/The file expired/i) ||
	content.match(/The file was deleted by /i) ||
	content.match(/The file was removed by /i) ||
	content.match(/\.(001|002|003|rar|zip) ?[\'\"<]/i);
}

function get_html(){
	return document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
}

function needs_inline(){
	return location.hostname.match('movreel.com');
}

function space(){
	if (location.hostname.match('180upload.com')){
		var x,div = document.getElementsByTagName('div');
		for (x=0;x<2;x++){
			div[x].style.top = h+'px';
		}
	}
}



// icefilms
if (location.host.match('icefilms.info') && location.href.match('video.php') && !location.href.match('&sourceid=')){

	var currentVer = document.getElementById("CurrentIQSVersion");
	if (currentVer && version < currentVer.innerHTML){
		if (confirm("Your version of ICE Quick Stream (v"+version+") is out of date!\n\nPlease click OK to update your script to v"+currentVer.innerHTML+" now.") == true){
			location.href = "http://userscripts.org/scripts/source/58869.user.js";
		}
	}else{
		document.getElementById('iqs').value=1;
	}
}


// 2shared
else if (location.host.match('2shared.com') && (location.href.match('/file/') || location.href.match('/video/')) ){

	// 200mb filesize limit means not many useful links anymore
	
	document.body.style.margin = '0';
	document.getElementById("topNav").style.top = h+'px';
	
	// check for bad link
	var content = get_html();
	var bad = content.match("The file link that you requested is not valid") ||
	content.match("file is suspected of illegal or copyrighted content") ||
	content.match(/\.(001|002|003|rar|zip)<\/title>/i);

	if (bad && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		iceInlineEmbed();
		hostLove();
	
		function matchLoop(){
			var matched = 0;
			matched = content.match(/['">](https?:\/\/dc.+)['"<]/i);
			if (!matched){
				setTimeout(function(){matchLoop();},200);
			}else{
				downloadlink = matched[1];
				iceInlineEmbed_LinkReady();
			}
		}
		matchLoop();
	    
	}
}


// mediafire
else if (location.href.match('www.mediafire.com/download/.+')){

	// unable to identify original URL when 302 bad link is detected, so icefilms cant use mediafire :(
	// this may have changed, but also 200mb filesize limit means not many useful links.

	document.getElementById('header').style.position='relative';
	document.getElementById('container').style.paddingTop='0';

	// check for bad link
	var content = get_html();
	var bad = location.href.match("error.php\\?errno=") ||
	content.match(/\.(001|002|003|rar|zip)<\/title>/i);

	if (bad && !document.getElementById('iceVerify')){
		//iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		var match = document.body.innerHTML.match(/[\'\">](https?:\/\/[0-9\:\.]{5,30}\/[0-9a-z]{8,16}\/[0-9a-z]{8,16}\/.+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]/i);
		if (match){
			downloadlink = match[0].replace('"','');
			iceEmbed();
			hostLove();
		}
	}
}


// All Xfilesharing-based hosts
else if (location.pathname.match('^/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var bad = bad_content(get_html());

	if (bad && !document.getElementById('iceVerify')){
		space();
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			space();
			if (needs_inline()){
				iceInlineEmbed();
				iceInlineEmbed_LinkReady()
			}else{
				iceEmbed();
			}
			hostLove();
		}
	}
}


// run on rare 404.html dead link redirect
else if (location.pathname.match('^/404\.html$') && document.referrer.match('^http://[^/]{5,30}/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var bad = bad_content(get_html());

	if (bad && !document.getElementById('iceVerify')){
		iceVerify(document.referrer);
	}
}
