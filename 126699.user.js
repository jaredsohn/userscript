// ==UserScript==
// @name	ICE Quick Stream
// @version	4.6
// @namespace	http://icefilms.info
// @description	Version 4.6 Enables video streaming from RapidShare, 2shared, megaupload, and megaporn/cum.com via www.icedivx.com. This script works closely with the high quality video links database www.icefilms.info

// @include	http://www.icefilms.info/*video.php*

// @include	http://www.megaupload.com/*d=*
// @include	http://megaupload.com/*d=*

// @include	http://www.megaporn.com/*d=*
// @include	http://megaporn.com/*d=*
// @include	http://www.cum.com/*d=*
// @include	http://cum.com/*d=*

// @include	http://www.2shared.com/file/*
// @include	http://2shared.com/file/*
// @include	http://www.2shared.com/video/*
// @include	http://2shared.com/video/*
// @include	https://www.wupload.com/d=*

// @include	https://rapidshare.com/#!download*
// @include	https://*.rapidshare.com/#!download*

// ==/UserScript==

	var version = "4.6";
	
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

	function iceInlineEmbed(){
		var showHideDivs = "\
			this.rel=1;\
			document.getElementById('fakeVidPlayer').style.visibility='hidden';\
			document.getElementById('playbutton').style.visibility='hidden';\
			document.getElementById('downloadbutton').style.visibility='hidden';\
			document.getElementById('waiting').style.visibility='visible';\
			document.getElementById('action').innerHTML=this.id.substring(0,this.id.length-6)+'ing';\
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
			&nbsp;&nbsp;<a href='http://www.icefilms.info' target=_blank style=''><img src='http://a.imageshack.us/img210/7713/icebannerlogobot.png' width=100 style='border:0;'></a> \
			</div> \
			\
			<div style='position:absolute;top:2px;right:5px;color:grey;'>IQS v"+version+"</div> \
		    </div>\
		\
		    <div id=fakeVidPlayer> \
			 <img src='http://img251.imageshack.us/img251/149/2lwra5s.jpg' width='100%' height="+h+" border='0' /> \
			<a onClick=\"document.getElementById('playbutton').onclick();return false;\" href='#'> \
			<div style='position:absolute; bottom:0; left:0; height:26px; width:100%; background-repeat: repeat-x; background-image: url(http://www.icefilms.info/images/divxcontrols2.png);'></div> \
			<div style='position:absolute; bottom:0; left:0; height:26px; width:71px; background-image: url(http://www.icefilms.info/images/divxcontrols1.png);'></div> \
			<div style='position:absolute; bottom:0; right:0; height:26px; width:264px; background-image: url(http://www.icefilms.info/images/divxcontrols3.png);'></div> \
			</a>\
		    </div>\
		\
		    <div id=buttons style='position: absolute; top:50%; left:50%; width:500px; height:250px; margin-left:-250px; margin-top:-138px; '> \
			<div style='width:500px; left:0px;'> \
			    <iframe src='http://www.icedivx.com/300x250ad' style='width:300px; height:250px; float:left; border:0; margin:0; padding:0;' scrolling=no></iframe>\
			    <a id='playbutton' onClick=\""+showHideDivs+"\" href='#' style='display: block; position: absolute; top: 88.375px; right: 76.5px; z-index: 1; width: 48px; height: 48px; background: url(http://www.icefilms.info/images/playbutton.png) top;' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a> \
			    <a id='downloadbutton' onClick=\""+showHideDivs+"\" href='#' style='display: block; position: absolute; top: 152.375px; right: 28.5px; z-index: 1; width: 144px; height: 48px; background: url(http://www.icefilms.info/images/downloadbutton.png) top' onMouseOver=this.style.backgroundPosition='bottom' onMouseOut=this.style.backgroundPosition='top'></a> \
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
		var showDWP = killDivs+"document.getElementById('divxPlayer').style.display = 'block';";

		document.getElementById('playbutton').setAttribute('onclick',showDWP+"return false;");
		//document.getElementById('playbutton').onclick = showDWP+"return false;";
		document.getElementById('ie_param').value = downloadlink;
		document.getElementById('np_plugin').src = downloadlink;
		document.getElementById('dlclickhere').href = downloadlink;
		document.getElementById('downloadbutton').href = downloadlink;
		document.getElementById('downloadbutton').setAttribute('onclick','');
		//document.getElementById('downloadbutton').onclick = '';
		
		if (document.getElementById('playbutton').rel==1){
			eval(showDWP);
		}
		else if (document.getElementById('downloadbutton').rel==1){
			eval(killDivs);
			document.getElementById('downloading').style.visibility = 'visible';
			location = downloadlink;
		}
	}


// icefilms
if (location.host.match('icefilms.info') && location.href.match('video.php') && !location.href.match('&sourceid=')){

	var currentVer = document.getElementById("CurrentIQSVersion");
	if (currentVer && version < currentVer.innerHTML){
		if (confirm("Your version of ICE Quick Stream (v"+version+") is out of date!\n\nPlease click OK to update your script to v"+currentVer.innerHTML+" now.") == true){
			location = "http://userscripts.org/scripts/source/58869.user.js";
		}
	}else{
		document.getElementById('iqs').value=1;
	}
}


// mega
else if ((location.host.match('megaupload.com') || location.host.match('megaporn.com') || location.host.match('cum.com')) && location.href.match('\\?d=')){
	
	// display embed
	if (!document.getElementById('iceQuickStream'))
	{
		if (document.body.innerHTML.indexOf('megavideo.com/?d=')>-1){
			flashlink = gup('d');
		}
		
		if (document.getElementById('countertime')){
			timer = document.getElementById('countertime').innerHTML.replace(/00:00:|\s/g,'');
		}

		var a = document.getElementsByTagName('a');
		for (var i=0;i<a.length;i++){
			if (a[i].href.indexOf('.com/files/') > 0){
				downloadlink = escape(a[i].href);
				var ss = document.createElement("script");
				ss.text = "function setTimeout(){}";
				el = document.getElementsByTagName("script"); i=0;
				while(s=el[i++]){
					if(s.text.search(/function\s(\s|\S)+(location|ice|iframe)/) > -1){
						for (x in mat=s.text.match(/function\s+(\w+)\s*\(/g)){
							ss.text += "function "+mat[x].match(/function\s+(\w+)\s*\(/)[1]+"(){}";
						}
					}
				}
				var hh = document.getElementsByTagName('head')[0];
				hh.appendChild(ss);
				document.body.style.backgroundColor = "#222";
				if (downloadlink.search(/\.(mkv|ogm|001|002|003|rar|zip)$/i)>-1 && !document.getElementById('iceVerify')){
					iceVerify();
				}else{
					iceEmbed();
				}
				break;
			}
		}
				
		// check for bad link
		if (!downloadlink){
			var pagecontent = document.body.innerHTML;
			var bad = pagecontent.search("the link you have clicked is not available") +
			pagecontent.search("download is larger than") +
			pagecontent.search("download is password protected") + 
			pagecontent.search("Invalid link") + 
			pagecontent.search("has been deleted");

			if (bad > 0 && !document.getElementById('iceVerify')){
				iceVerify();
			}
		}
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
		iceInlineEmbed();
	
		function matchLoop(){
			var matched = 0;
			matched = document.getElementsByTagName("head")[0].innerHTML.match(/'http:\/\/dc(.*)'/i);
			if (!matched) matched = document.body.innerHTML.match(/>http:\/\/dc(.*)<\/div>/i);
			if (!matched){
				setTimeout(function(){matchLoop();},200);
			}else{
				downloadlink = "http://dc" + matched[1] + "&.avi";
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
	location.hash.search(/\.(mkv|ogm|001|002|003|rar|zip)\|/i);

	if (bad > 0 && !document.getElementById('iceVerify')){
		iceVerify();
	}

	// display embed
	else if (!document.getElementById('iceQuickStream'))
	{
		function wait4ajax(){
			if (!document.getElementById('pro-area'))
				setTimeout(function(){wait4ajax();},200);
			else
				setTimeout(function(){getDlLink();},2000);
		}
		
		function do_countdown(){
			if (timer>0){
				var min = Math.floor(timer / 60);
				var sec = timer - (min * 60);
				document.getElementById('countdown').innerHTML = min+":"+((sec<10)?"0"+sec:sec);
				timer-=1;
				setTimeout(function(){do_countdown();},1000);
			}
			else{
				iceInlineEmbed_LinkReady();
			}
		}
		
		function getDlLink(){
			var param = location.hash.split("|",4);
			
			if (document.getElementById('pro-area').className.indexOf("has-pro")>-1
			 && document.cookie.indexOf("enc=")>-1 
			){
				downloadlink = "https://rs" + param[1] + ".rapidshare.com/cgi-bin/rsapi.cgi?sub=download&cookie=" + document.cookie.match(/enc=(.*?)(?:;|$)/)[1] + "&editparentlocation=0&fileid=" + param[2] + "&filename=" + param[3] + "&bin=1&dlauth=0&wantpremdl=1";
				iceInlineEmbed_LinkReady();
			}
			else{
				var r;
				if (window.XMLHttpRequest){r = new XMLHttpRequest();}
				else if (window.ActiveXObject){r = new ActiveXObject("Microsoft.XMLHTTP");}

				r.open("GET", ("https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=download&fileid="+param[2]+"&filename="+param[3]), true);
				r.onreadystatechange = function(){
					if (r.readyState == 4 && r.status == 200){
						rsapi = r.responseText.substr(3).split(",");
						downloadlink = "http://"+rsapi[0]+"/cgi-bin/rsapi.cgi?sub=download&fileid="+param[2]+"&filename="+param[3]+"&dlauth="+rsapi[1];
						timer = rsapi[2];
						do_countdown();
					}
				};
				r.send();
			}
		}
		
		iceInlineEmbed();
		wait4ajax();
	}