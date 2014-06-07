// ==UserScript==
// @name	ICE Quick Stream
// @version	4.1
// @namespace	http://icefilms.info
// @description	Version 4.1 Enables video streaming from 2shared, and megaupload/megaporn via www.icedivx.com. This script works closely with the high quality video links database www.icefilms.info

// @include	http://www.icefilms.info/*video.php*

// @include	http://www.megaupload.com/*d=*
// @include	http://megaupload.com/*d=*

// @include	http://www.megaporn.com/*d=*
// @include	http://megaporn.com/*d=*

// @include	http://www.2shared.com/file/*
// @include	http://2shared.com/file/*
// @include	http://www.2shared.com/video/*
// @include	http://2shared.com/video/*

// ==/UserScript==

	var version = "4.1";
	var whatsnew = "- FIXED Megaupload countdown timer\n- UPDATED code for removing dead & unstreamable links\n- ADDED update prompt to make future updates easier";
	
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
		
	
	function iceVerify(){
		var normalizedURL = 'http://';
		if (!location.host.match(/www\./i)) normalizedURL += "www.";
		normalizedURL += location.host + location.pathname;
		if (gup('d')) normalizedURL += "?d="+gup('d');
		
		var iframe = document.createElement("iframe");
		iframe.src = 'http://www.icefilms.info/components/com_iceplayer/verify.php?url='+normalizedURL;
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
		iframe.src = 'http://www.icedivx.com/video.php?w='+w+'&h='+(h-18)+'&vurl='+downloadlink+'&flash='+flashlink+'&t='+5+'&v='+version;
		iframe.style.width = w+'px';
		iframe.style.height= h+'px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","iceQuickStream");
		document.body.insertBefore(iframe, document.body.firstChild);
	}
	
	
// icefilms
if (location.host.match('icefilms.info') && location.href.match('video.php') && !location.href.match('&sourceid=')){

	var currentVer = document.getElementById("CurrentIQSVersion");
	if (currentVer && version < currentVer.innerHTML){
		if (confirm("Your version of ICE Quick Stream (v"+version+") is out of date!\n\nChanges in v"+currentVer.innerHTML+":\n"+whatsnew+"\n\nPlease click OK to update your script now.") == true){
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
	pagecontent.search(".mkv</title>") +
	pagecontent.search(".ogm</title>") +
	pagecontent.search(".001</title>") +
	pagecontent.search(".002</title>") +
	pagecontent.search(".003</title>") +
	pagecontent.search(".rar</title>") +
	pagecontent.search(".zip</title>");	

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		
	    function ice2haredEmbed(){
	    
		downloadlink = "http://dc" + matched + "&.avi";

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
		   	     	<span style=font-size:10px;font-family:Impact;>This video brought to you by</span><br> \
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
				<object id='ie_plugin' classid='clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616' \
					width='"+w+"' \
					height='"+(h-18)+"' \
					codebase='http://go.divx.com/plugin/DivXBrowserPlugin.cab'> \
			\
			  <param name='custommode' value='stage6' /> \
			  <param name='previewImage' value='http://img18.imageshack.us/img18/8372/playerbanner.jpg' /> \
			  <param name='autoPlay' value='true' /> \
			  <param name='src' value="+downloadlink+" /> \
			  <param name='bannerEnabled' value='false' /> \
			  <param name='timeCallback' value='myTimeCallback' /> \
			  <param name='statusCallback' value='myDivXPlugin.statusCallbackSink' /> \
			  <param name='bufferCallback' value='myBufferCallback' /> \
			  <param name='downloadCallback' value='myDownloadCallback' /> \
			\
			  <embed id='np_plugin' type='video/divx' \
				   src="+downloadlink+" \
				   custommode='stage6' \
				   width='"+w+"' \
				   height='"+(h-18)+"' \
				   autoPlay='true'  \
				   bannerEnabled='false'\
				   previewImage='http://img18.imageshack.us/img18/8372/playerbanner.jpg'  \
				   timeCallback='myTimeCallback'\
				   statusCallback='myDivXPlugin.statusCallbackSink'\
				   bufferCallback='myBufferCallback'\
				   downloadCallback='myDownloadCallback'\
				   pluginspage='http://go.divx.com/plugin/download/'> \
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
			var lastKB = 0;\
			var curSpeed = 0;\
			function myDownloadCallback(current,total)\
			{\
				 curSpeed = Math.round((current - lastKB) / 1000);\
				 document.getElementById('currentDownload').innerHTML = Math.round(current / 100000)/10;\
				 document.getElementById('totalDownload').innerHTML = 'of ' + Math.round(total / 100000)/10 + ' MB';\
				 document.getElementById('downloadSpeed').innerHTML = '(' + curSpeed + 'KB/s)';\
				 lastKB = current;\
			}\
			var plugin;\
			if(navigator.userAgent.indexOf('MSIE') != -1)\
			{\
				plugin = document.getElementById('ie_plugin');\
			}\
			else\
			{\
				plugin = document.getElementById('np_plugin');\
			}\
		\
			var BScounter = 0;\
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
					toLowerCase	 break;\
						 case 19:\
						 if (document.getElementById('totalDownload').innerHTML == '' && BScounter<=10)\
							setTimeout(function(){plugin.Open('"+downloadlink+"')},5000);\
						 else if (document.getElementById('totalDownload').innerHTML == '' && BScounter>10)\
							cs.innerHTML = 'Failed to Connect';\
						 else\
						 	cs.innerHTML = 'Download Done';\
						 break;\
					}\
				}\
			}\
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
	    }
	    
	    function matchLoop(){
		matched = document.getElementsByTagName("head")[0].innerHTML.match(/'http:\/\/dc(.*)'/i);
		if (!matched) matched = document.body.innerHTML.match(/>http:\/\/dc(.*)<\/div>/i);
		if (!matched){
			setTimeout(function(){matchLoop();},200);
		}else{
			matched = matched[1];
			ice2haredEmbed();
		}
	    }
	    
	    var matched = 0;
	    matchLoop();
	    
	}
}


// mega
else if ((location.host.match('megaupload.com') || location.host.match('megaporn.com')) && location.href.match('\\?d=')){

	// check for bad link
	var pagecontent = document.body.innerHTML;
	var bad = pagecontent.search("the link you have clicked is not available") +
	pagecontent.search("download is larger than") +
	pagecontent.search("download is password protected") + 
	pagecontent.search("Invalid link") + 
	pagecontent.search("has been deleted") + 
	pagecontent.search(".mkv\"") +
	pagecontent.search(".ogm\"") +
	pagecontent.search(".001\"") +
	pagecontent.search(".002\"") +
	pagecontent.search(".003\"") +
	pagecontent.search(".rar\"") +
	pagecontent.search(".zip\"");
	
	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}
	
	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		if (document.body.innerHTML.indexOf('megavideo.com/?d=')>-1){
			flashlink = gup('d');
		}
		
		if (document.getElementById('countertime')){
			timer = document.getElementById('countertime').innerHTML.replace(/00:00:|\s/g,'');
		}

		var a = document.getElementsByTagName('a');
		for (var i=0;i<a.length;i++){
			if (a[i].href.indexOf('megaupload.com/files/') > 0){
				downloadlink = escape(a[i].href);
				iceEmbed();
				break;
			}
		}
		 		
	}
	
}
