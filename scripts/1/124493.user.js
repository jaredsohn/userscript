// ==UserScript==
// @name	ICE Quick Stream (VLC Edition)
// @version	4.5
// @namespace	http://icefilms.info
// @description	Version 4.5 Enables video streaming from RapidShare and 2shared via www.icedivx.com using VLC. This script works closely with the high quality video links database www.icefilms.info.

// @include	http://www.icefilms.info/*video.php*

// @include	http://www.2shared.com/file/*
// @include	http://2shared.com/file/*
// @include	http://www.2shared.com/video/*
// @include	http://2shared.com/video/*

// @include	https://rapidshare.com/*download*
// @include	https://*.rapidshare.com/*download*

// ==/UserScript==

	var version = "4.5";

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

    hideStuff('js_rs2011');
    hideStuff('js_panel');
    hideStuff('js_contactlist');

	function iceVerify(){
		var iframe = document.createElement("iframe");
		iframe.src = 'http://www.icefilms.info/components/com_iceplayer/verify.php?url='+escape(location);
		iframe.style.width = w+'px';
		iframe.style.height= h+'px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","iceVerify");
		document.body.insertBefore(iframe, document.body.firstChild);
	}

	function iceEmbed(){
		var iframe = document.createElement("iframe");
		iframe.src = 'http://www.icedivx.com/video.php?w='+w+'&h='+(h-18)+'&vurl='+downloadlink+'&flash='+flashlink+'&t='+timer+'&v='+version;
		iframe.style.width = w+'px';
		iframe.style.height= h+'px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","iceQuickStream");
		document.body.insertBefore(iframe, document.body.firstChild);
	}

	function hideStuff(id) {
		document.getElementById(id).style.display = 'none';
	}

	function loadingbox(){
		var box = document.createElement("div");
		box.style.width = w+'px';
		box.style.height= h+'px';
		box.style.border= "0";
		box.style.margin= "0";
		box.style.backgroundColor= "black";
		box.style.color= "white";
		box.style.position="relative";
		box.setAttribute("id","loadingbox");
		box.innerHTML = "<center><h1 style='padding-top:150px;'>\
			<img src=http://www.icedivx.com/images/ajax-loader.gif width=25><br><br>\
			Waiting on "+location.host+"...</h1>\
			<p><span id=countdown></span></p>";
		document.body.insertBefore(box, document.body.firstChild);
	}

	function iceInlineEmbed(){
		var showHideDivs = "\
			document.getElementById('fakeVidPlayer').style.visibility='hidden';\
			document.getElementById('buttons').style.visibility='hidden';\
			document.getElementById('divxPlayer').style.display='block';\
			return false;\
		";

		var box = document.createElement("div");
		box.style.width = w+'px';
		box.style.height= h+'px';
		box.style.border= "0";
		box.style.margin= "0";
		box.style.position="relative";
		box.setAttribute("id","iceQuickStream");
		box.innerHTML = "\
		\
		    <div id='fakeVidPlayer'> \
			 <img src='http://img251.imageshack.us/img251/149/2lwra5s.jpg' width='100%' height="+h+"px border='0' /> \
			<a onClick=\"document.getElementById('playbutton').onclick();return false;\" href='#'> \
			<div style='position:absolute; bottom:0; left:0; height:26px; width:100%; background-repeat: repeat-x; background-image: url(http://www.icefilms.info/images/divxcontrols2.png);'></div> \
			<div style='position:absolute; bottom:0; left:0; height:26px; width:71px; background-image: url(http://www.icefilms.info/images/divxcontrols1.png);'></div> \
			<div style='position:absolute; bottom:0; right:0; height:26px; width:264px; background-image: url(http://www.icefilms.info/images/divxcontrols3.png);'></div> \
			</a>\
		   		<div style='position:absolute; top:0; left:0;color:white;'> \
		   	     	<span style=font-size:10px;font-family:Impact;>This link brought to you by</span><br> \
				&nbsp;&nbsp;<a href='http://www.icefilms.info' target=_blank style=''><img src='http://a.imageshack.us/img210/7713/icebannerlogobot.png' width=100></a> \
			    </div> \
			    <div style='position:absolute;top:2px;right:2px;color:grey;'>IQS v"+version+"</div> \
			</div> \
		\
		    <div id='buttons' style='position: absolute; top:50%; left:50%; width:500px; height:250px; margin-left:-250px; margin-top:-138px; '> \
			<div style='width:500px; left:0px;'> \
			    <iframe src='http://www.icefilms.info/300x250ad' style='width:300px; height:250px; float:left; border:0; margin:0; padding:0;' scrolling=no></iframe>\
			    <a id='playbutton' onClick=\""+showHideDivs+"\" href='#' style='display: block; position: absolute; top: 88.375px; right: 76.5px; z-index: 1; width: 48px; height: 48px; background: url(http://www.icefilms.info/images/playbutton.png) top;' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a> \
			    <a id='downloadbutton' href='"+downloadlink+"' style='display: block; position: absolute; top: 152.375px; right: 28.5px; z-index: 1; width: 144px; height: 48px; background: url(http://www.icefilms.info/images/downloadbutton.png) top' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a> \
				</div> \
			</div> \
		\
			<div id='divxPlayer' style='display:none;top:0;position:absolute;'>\
				<span style='float:right;'> \
					<label id='currentStatus'></label>&nbsp;<label id='currentDownload'></label>&nbsp;<label id='totalDownload'></label>&nbsp;<label id='downloadSpeed'></label> \
				</span> \
		\
				<a href='http://www.icefilms.info' target=_blank><img border='0' height=16 src='http://www.icefilms.info/images/logosmall.png'></a> \
				<br> \
                <OBJECT id='ie_plugin' classid='clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921' \
					width='"+w+"' \
					height='"+(h-18)+"' \
					codebase='http://downloads.videolan.org/pub/videolan/vlc/latest/win32/axvlc.cab#Version=1,1,9,0'> \
		\
			  <param name='custommode' value='stage6' /> \
			  <param name='previewImage' value='http://img18.imageshack.us/img18/8372/playerbanner.jpg' /> \
			  <param name='autoPlay' value='true' /> \
			  <param name='MRL' value="+downloadlink+" /> \
			  <param name='toolbar' value='true' /> \
		\
			  <embed id='np_plugin' type='application/x-vlc-plugin' \
				   MRL="+downloadlink+" \
				   custommode='stage6' \
				   width='"+w+"' \
				   height='"+(h-18)+"' \
				   autoPlay='true'  \
                   toolbar='true'\
			  </embed> \
			</object> \
			</div> \
				<script type='text/javascript'> \
			</script> \
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
		myDivXPlugin = new DivXPluginSinks();
	}


// icefilms
if (location.host.match('icefilms.info') && location.href.match('video.php') && !location.href.match('&sourceid=')){

	var currentVer = document.getElementById("CurrentIQSVersion");
	if (currentVer && version < currentVer.innerHTML){
		if (confirm("Your version of ICE Quick Stream (v"+version+") is out of date!\n\nPlease click OK to update your script to v"+currentVer.innerHTML+" now.") == true){
			location = "http://userscripts.org/scripts/source/124493.user.js";
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
	pagecontent.search(".rar</title>") +
	pagecontent.search(".zip</title>");

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}

	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{

		function matchLoop(){
			matched = document.getElementsByTagName("head")[0].innerHTML.match(/'http:\/\/dc(.*)'/i);
			if (!matched) matched = document.body.innerHTML.match(/>http:\/\/dc(.*)<\/div>/i);
			if (!matched){
				setTimeout(function(){matchLoop();},200);
			}else{
				downloadlink = "http://dc" + matched[1] + "&.avi";
				iceInlineEmbed();
			}
		}

		var matched = 0;
		matchLoop();

	}
}

// rapidshare
else if(location.host.match('rapidshare.com')){

	// check for bad link
	var bad = location.hash.search("File not found") +
	location.hash.search(/\.(rar|zip)\|/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}

	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{

		loadingbox();

		function wait4avi(){
			if (!document.getElementById('js_dlpage_dlbtn') || document.getElementById('js_dlpage_dlbtn').href.search("http://")==-1){
				setTimeout(function(){wait4avi();},200);
				if (document.getElementById('js_dlpage_freetimer_container')){
					timer = document.getElementById('js_dlpage_freetimer_container').innerHTML.replace(/\s/g,'');
					if (timer) document.getElementById('countdown').innerHTML = 'Wait remaining: '+timer;
				}
			}else{
				downloadlink = document.getElementById('js_dlpage_dlbtn').href;
				document.body.removeChild(document.getElementById('loadingbox'));
				iceInlineEmbed();
			}
		}
		wait4avi();

	}
}
