// ==UserScript==
// @name	ICE Quick Stream
// @version	5.5
// @namespace	http://icefilms.info
// @description	Version 5.5 Enables video streaming from BillionUploads, JumboFiles, Movreel, UploadOrb, Sharebees, SpeedyShare, 180Upload, Mediafire, Furk, RapidShare, and 2shared via www.icedivx.com. This script works closely with the high quality video links database www.icefilms.info

// @include	http://www.icefilms.info/*video.php*

// @include	http://www.2shared.com/file/*
// @include	http://2shared.com/file/*
// @include	http://www.2shared.com/video/*
// @include	http://2shared.com/video/*

// @include	https://rapidshare.com/#!download*
// @include	https://*.rapidshare.com/#!download*

// @include	http://www.mediafire.com/*

// @include	http://www.furk.net/df/*
// @include	https://www.furk.net/df/*

// @include	http://www.speedyshare.com/file/*.*
// @include	http://www.speedyshare.com/files/*.*
// @include	http://www.speedy.sh/*/*.*
// @include	http://speedy.sh/*/*.*

// @include	http://www.180upload.com/*
// @include	http://180upload.com/*

// @include	http://www.sharebees.com/*
// @include	http://sharebees.com/*

// @include	http://www.uploadorb.com/*
// @include	http://uploadorb.com/*

// @include	http://www.jumbofiles.com/*
// @include	http://jumbofiles.com/*

// @include	http://www.movreel.com/*
// @include	http://movreel.com/*

// @include	http://www.billionuploads.com/*
// @include	http://billionuploads.com/*

// ==/UserScript==

	var version = "5.5";
	
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
		box.innerHTML = "<h1>Enjoying this host? Show them some love by clicking on an ad!<br>?</h1>";
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
		var match = src.match(RegExp("[\'\">](https?://[0-9a-z\:\.]{5,30}/[0-9a-z]{1,2}/[0-9a-z]{14,56}/(?!video).+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]","i"));
		if (!match) {
			match = src.match(RegExp("[\'\">](https?://[0-9a-z\:\.]{5,30}/[0-9a-z]{1,2}/[0-9a-z]{14,56}/.+?\.(?:mkv|ogm|divx|avi|mp4|flv|webm|mov))[\'\"<]","i"));
		}
		if (match) {
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
	   		<div style='position:absolute; top:0; left:0;color:white;'> \
	   	     	<span style=font-size:10px;font-family:Impact;>This link brought to you by</span><br> \
			&nbsp;&nbsp;<a href='http://www.icefilms.info' target=_blank style=''><img src='http://phaseplay.com/images/phasescriptlogotopsmall.png' width=100 style='border:0;'></a> \
			</div> \
			\
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
				<a href='http://www.icefilms.info' target=_blank><img border='0' height=16 src='http://phaseplay.com/images/phasescriptlogosmall.png'></a> \
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
	
	document.body.style.margin = '0';
	document.getElementById("topNav").style.top = h+'px';
	
	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.getElementById('overall').innerHTML;
	var bad = pagecontent.search("The file link that you requested is not valid") +
	pagecontent.search("file is suspected of illegal or copyrighted content") +
	pagecontent.search(/\.(001|002|003|rar|zip)<\/title>/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		iceInlineEmbed();
		hostLove();
	
		function matchLoop(){
			var matched = 0;
			matched = document.getElementsByTagName("head")[0].innerHTML.match(/'http:\/\/dc(.*)'/i);
			if (!matched) matched = document.body.innerHTML.match(/>http:\/\/dc(.*)<\/div>/i);
			if (!matched){
				setTimeout(function(){matchLoop();},200);
			}else{
				downloadlink = "http://dc" + matched[1];
				iceInlineEmbed_LinkReady();
			}
		}
		matchLoop();
	    
	}
}


// rapidshare
else if(location.host.match('rapidshare.com')){
	
	// check for bad link
	var bad = location.hash.search("File not found") +
	location.hash.search("This file is marked as illegal") +
	location.hash.search(/\.(001|002|003|rar|zip)\|/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		setTimeout(function(){iceVerify();},2000);
	}
}


// mediafire
else if (location.href.match('www.mediafire.com/\\?.+') || location.href.match('www.mediafire.com/error.php.+')){

	// unable to identify original URL when 302 bad link is detected, so icefilms cant use mediafire :(

	document.getElementById('header').style.position='relative';
	document.getElementById('container').style.paddingTop='0';

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = location.href.search("error.php\\?errno=") +
	pagecontent.search(/\.(001|002|003|rar|zip)<\/title>/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		//iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		var match = document.body.innerHTML.match(RegExp("http://\\S+/"+location.search.substring(1)+"/\\S+\"","i"));
		if (match){
			downloadlink = match[0].replace('"','');
			iceEmbed();
			hostLove();
		}
	}
}


// furk
else if (location.host.match('www.furk.net')){

	// free user limit prevents icefilms from using furk :(

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = location.href.search("File not found") +
	pagecontent.search(/\.(001|002|003|rar|zip) :: Furk.net<\/title>/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		//iceVerify();
	}

	else if (location.href.match("http://")) {
		location.href = location.href.replace('http://','https://');
	}

	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		var a = document.getElementsByTagName('a');
		for (var i=0;i<a.length;i++){
			if (a[i].innerHTML == "Play"){
				downloadlink = a[i].href.replace('/pls/','/d/R/').replace('.xspf','');
				iceEmbed();
			}
		}
	}
}


// speedyshare
else if ( location.host.match('speedyshare.com') || location.host.match('speedy.sh') ){

	document.getElementsByTagName('table')[0].style.top = (h+2)+'px';
	document.getElementById('logopart2').style.top = (h+11)+'px';

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">not found<") +
	pagecontent.search("File not found.") +
	pagecontent.search("can only be downloaded with SpeedyShare Premium.") +
	pagecontent.search("Check the download URL for spelling errors") +
	location.href.search(/\.(001|002|003|rar|zip)$/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		iceInlineEmbed();
		downloadlink = location.href.match('(http://.+/.+/)[^/]+$')[1] + 'download' + location.href.match('/[^/]+$');
		iceInlineEmbed_LinkReady();
	}
}


// 180upload
else if (location.host.match('180upload.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	function space(){
		var x,div = document.getElementsByTagName('div');
		for (x=0;x<2;x++){
			div[x].style.top = h+'px';
		}
	}
			
	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found[<,]") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("No such file with this filename") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search("Copyright infringement issue") +
	pagecontent.search("file expired or deleted by its owner") +
	pagecontent.search(RegExp("http://180upload.com/"+location.href.match('180upload\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)\.html","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		space();
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			space();
			iceEmbed();
			hostLove();
		}
	}
}


// sharebees
else if (location.host.match('sharebees.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search(RegExp("http://(www\.)?sharebees.com/"+location.href.match('sharebees\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		var src = '';
		if (document.getElementById('flvplayer')){
			eval('src = ' + document.getElementById('player_code').childNodes[4].innerHTML.substring(4) + ';');
		}else{
			src = document.body.innerHTML;
		}

		downloadlink = scrapeURL(src);
		if (downloadlink){
			iceEmbed();
			hostLove();
		}
	}
}


// uploadorb
else if (location.host.match('uploadorb.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("file was removed") +
	pagecontent.search("Reason for deletion") +
	pagecontent.search(RegExp("http://(www\.)?uploadorb.com/"+location.href.match('uploadorb\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		if (document.forms[0] && document.forms[0].action && document.forms[0].action != location.href){
			downloadlink = document.forms[0].action;
			iceEmbed();
			hostLove();
		}
	}
}


// jumbofiles
else if (location.host.match('jumbofiles.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search("File Not Found or Deleted") +
	pagecontent.search("due to inactivity or DMCA") +
	pagecontent.search(">No such user exist<") +
	pagecontent.search(">File Not Found<") +
	pagecontent.search(">Deleted or DMCA<") +
	pagecontent.search(RegExp("\.(001|002|003|rar|zip) ?<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		if (document.forms[0] && document.forms[0].action && document.forms[0].action != location.href){
			downloadlink = document.forms[0].action;
			iceEmbed();
			hostLove();
		}
	}
}


// movreel
else if (location.host.match('movreel.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search(">No such file with this filename<") +
	pagecontent.search(RegExp("http://(www\.)?movreel.com/"+location.href.match('movreel\.com/([0-9a-z]{12})')[1]+"/.+\.(001|002|003|rar|zip)<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			iceInlineEmbed();
			iceInlineEmbed_LinkReady()
			hostLove();
		}
	}
}


// billionuploads
else if (location.host.match('billionuploads.com') && location.href.match('/[0-9a-z]{12}(/.+)?(\.html)?(#.*)?$')){

	// check for bad link
	var pagecontent = document.getElementsByTagName('head')[0].innerHTML + document.body.innerHTML;
	var bad = pagecontent.search(">File Not Found<") +
	pagecontent.search("sorry for any inconvenience") +
	pagecontent.search("Possible causes of this error could be") +
	pagecontent.search("File was removed") +
	pagecontent.search(RegExp("\.(001|002|003|rar|zip)<","i"));

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		downloadlink = scrapeURL(document.body.innerHTML);
		if (downloadlink){
			iceEmbed();
			hostLove();
		}
	}
}