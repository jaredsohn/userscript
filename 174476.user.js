// ==UserScript==
// @id             video_in_vlc-plugin_on_black_background-ed7abaeb-b229-4426-9404-5c9a877d6994@scriptish
// @name           video in vlc-plugin on black background; resizeable; moveable; with downloadlink 
// @version        1.0
// @namespace      
// @author         Michael Palm
// @description    Waits the waitingtime (can't find a way to bypass this), goes to the actual video and displays it resizeable and moveable on a black backround with a download-link. Displays the video in video-plugin of your choice. Preferably displayed with the vlc-plugin. Works for streamcloud, sockshare, putlocker and flashx. On primeshare it gets you at least to the video by automatic.
// @include        http://primeshare.tv/download/*
// @include        http://streamcloud.eu/*
// @include        http://www.sockshare.com/*
// @include        http://flashx.tv/*
// @include        http://play.flashx.tv/*
// @-include        http://bitshare.com/* // doesn't work yet
// @include        http://www.putlocker.com/*
// @run-at         document-idle
// @resource       css http://dl.dropboxusercontent.com/s/akn7x8gxygrlyav/style.css?token_hash=AAGT9SBQswHU8CWf7gwjMHt35ZB432KzxaH148gEToGYuA&dl=1
// ==/UserScript==

// This is a script for scriptish which uses special scriptishAPI and special scriptish metakeys. Visit http://scriptish.org/

//-------------------------------------------- code starts here -------------------------------------------

// streamcloud?

if(document.URL.search("://streamcloud.eu") != -1)
{
    GM_log("detected document as streamcloud-site");
    
    if(document.getElementById("page").innerHTML.search("countdown") != -1)
    {
        GM_log("found \"countdown\" --> waiting --> forwarding");

		setTimeout(function(){document.getElementsByTagName("form")[0].submit();}, 10000); // can't bypass the waiting for some reason...
		// if the waitingtime doesn't work for you and the page keeps reloading all the time, change the value 10000. Its in miliseconds.
    }
    
    else
    {
        var player_code = GM_xpath({path: "script[2]", node: document.getElementById("player_code")}).text;
        
        //get title
        var title = document.getElementById("page").getElementsByTagName("h1")[0].childNodes[0].nodeValue;
        GM_log("found title: " + title);
        
        // get video
        var video = player_code.substring(player_code.search("file: \"")+7,player_code.search("image: \"")-4);
        GM_log("found video: " + video);
    }
}


// primeshare?

// doesn't work yet properly. At least it gets you to the video by automatic.

if(document.URL.search("://primeshare.tv") != -1)
{
    GM_log("detected document as primeshare-site");
    
    if(document.body.getElementsByTagName("script")[0].text.search("cWaitTime") != -1)
    {
        GM_log("found \"cWaitTime\" --> waiting --> forwarding");
    
        setTimeout(function(){document.request.submit()}, 7000); // can't bypass the waiting for some reason...
		// if the waitingtime doesn't work for you and the page keeps reloading all the time, change the value 7000. Its in miliseconds.
    }
    
    else
    {
        var player_code = document.getElementById("player").parentNode.getElementsByTagName("script")[0].text;
        
        //get title
        var title = document.getElementById("content").getElementsByTagName("h1")[0].childNodes[0].nodeValue;
        title = title.substring(title.search("[\(]")+1,title.search("[\)]"));
        GM_log("found title: " + title);
        
        // get video
		// the following two //'s are preventing the script from destroying the page and trying to build it up again.
		// since we can't get the right video-link yet.
        //video = player_code.substring(player_code.search("provider"),player_code.search("onBeforeBegin")-16);
        //video = video.substr(video.search("url")+6); // doesn't work at the moment
        GM_log("found video: " + video);
    }
}


// sockshare?

if(document.URL.search("://www.sockshare.com") != -1)
{
    GM_log("detected document as socshare-site");
    
    if(document.head.getElementsByTagName("script")[6])
    {
        GM_log("found \"setTimeout\" --> waiting --> forwarding");
    
        setTimeout(function(){document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].click();}, 1000); // can't bypass the waiting for some reason...
		// if the waitingtime doesn't work for you and the page keeps reloading all the time, change the value 1000. Its in miliseconds.
    }
    
    else
    {
		if(document.getElementById("player")) {
			// there's an RSS-video-feed as intermediary
			var player_code = document.getElementById("player").parentNode.getElementsByTagName("script")[0].text;
			
			var playlistParam = player_code.substring(player_code.search("playlist")+11,player_code.search("plugins")-4);
			GM_log("found playlist-parameter: " + playlistParam);
			
			location.href = "http://www.sockshare.com" + playlistParam;
		}
		
		else {
			// now we're in the RSS-feed-code
			// get title
			var title = document.links[0].text;
			GM_log("found title: " + title);
			
			// get video
			var video = document.links[0];
			GM_log("found video: " + video);
		}
    }
}


// flashx?

if(document.URL.search("://flashx.tv") != -1 || document.URL.search("://play.flashx.tv") != -1)
{
    GM_log("detected document as flashx-site");
	
	// no waitingtime \o/ but a lot of iframes >_>
	
	if(document.getElementById("normal_player_cont")) {
		// getting into iframe
		GM_log("getting into iframe");
		location.href = document.getElementById("normal_player_cont").childNodes[1].src;
	}
	
	else {
		if(document.links[0]) {
			// getting to the video
			GM_log("getting to the player");
			location.href = document.links[0].href;
		}
			
		else {
			// getting player config
			GM_log("getting player config");
				
			var objectData = document.getElementsByTagName("object")[0].data;
			var configURL = objectData.substr(objectData.search("config=")+7);
			
			var ret = GM_xmlhttpRequest({
				method: "GET",
				url: configURL,
				onload: function(res) {
					title = res.responseText.substring(res.responseText.search("<url>")+5,res.responseText.search("</url>"));
					title = title.substr(title.search("video/")+6);
					title = title.substr(title.search("/")+1);
					GM_log("found title: " + title);
					
					//get video
					video = res.responseText.substring(res.responseText.search("<file>")+6,res.responseText.search("</file>"));
					GM_log("found video: " + video);
				},
				onerror: function(res) {
					var msg = "An error occurred."
				        + "\nresponseText: " + res.responseText
 				        + "\nreadyState: " + res.readyState
				        + "\nresponseHeaders: " + res.responseHeaders
				        + "\nstatus: " + res.status
				        + "\nstatusText: " + res.statusText
				        + "\nfinalUrl: " + res.finalUrl;
					GM_log(msg);
				}
			});
		}
	}
}

/*
// bitshare? - doesn't work at all...

if(document.URL.search("://bitshare.com") != -1)
{
    GM_log("detected document as bitshare-site");
    
	// get ajaxdl
	var ajaxdl = document.head.getElementsByTagName("script")[4].text;
	ajaxdl = ajaxdl.substr(ajaxdl.search("ajaxdl")+10)
	ajaxdl = ajaxdl.substring(0,ajaxdl.search("\""));
	GM_log("found ajaxdl: " + ajaxdl);
	
	// get title
	var tmp = document.URL.substr(document.URL.search("files")+6);
	tmp = tmp.split("/");
	var fileId = tmp[0];
	var title = tmp[1].substring(0,tmp[1].search(".html"));
	GM_log("found title: " + title);
	
	// get video
    var ret = GM_xmlhttpRequest({
		method: "POST",
				url: "http://bitshare.com/files-ajax/" + fileId + "/request.html",
				data: "request=getDownloadURL&ajaxid="+ajaxdl,
				onload: function(res) {
					var tmp = res.responseText.split("#");
					
					if(tmp[0] == 'ERROR') {
						GM__log("ERROR: " + tmp[1]);
					}
					
					else {
						GM_log(res.responseText);
						video = tmp[1].href;
						GM_log("found video: " + video);
					}
				},
				onerror: function(res) {
					var msg = "An error occurred."
				        + "\nresponseText: " + res.responseText
 				        + "\nreadyState: " + res.readyState
				        + "\nresponseHeaders: " + res.responseHeaders
				        + "\nstatus: " + res.status
				        + "\nstatusText: " + res.statusText
				        + "\nfinalUrl: " + res.finalUrl;
					GM_log(msg);
				}
			});
}*/


// putlocker?

if(document.URL.search("://www.putlocker.com") != -1)
{
    GM_log("detected document as putlocker-site");
    
    if(document.head.getElementsByTagName("script")[7])
    {
        GM_log("found \"setTimeout\" --> waiting --> forwarding");
    
        setTimeout(function(){document.getElementsByTagName("form")[0].getElementsByTagName("input")[1].click();}, 1000); // can't bypass the waiting for some reason...
		// if the waitingtime doesn't work for you and the page keeps reloading all the time, change the value 1000. Its in miliseconds.
    }
    
    else
    {
		//get title
		var title = document.title;
		GM_log("found title: " + title);
			
		//get video
		var video = document.links[13];
		GM_log("found video: " + video);
    }
}



loop = setInterval(function(){
	if(title && video)
	{
		clearInterval(loop);
		
		// -------------destroy page-------------
		
		GM_log("destroying page");
		
		while(document.head.getElementsByTagName("*")[0])
		{
			document.head.removeChild(document.head.getElementsByTagName("*")[0]);
		}
		
		while(document.body.getElementsByTagName("*")[0])
		{
			document.body.removeChild(document.body.getElementsByTagName("*")[0]);
		}
		
		GM_log("finished destroying");
		
		// -------------build new page-------------
		
		GM_log("build new page");
		
		var playerCfg = {x: 0, y: 0, width: 640, height: 360, playerLink: 'http://streamcloud.eu/player/player.swf'};
		s = document.createElement('link');
		s.href = GM_getResourceURL("css");
		s.rel  = 'stylesheet';
		s.type = 'text/css';
		document.getElementsByTagName('head').item(0).appendChild(s)
		
		// build div
		var box = document.createElement("div");
		document.body.appendChild(box);
		box.id = "box";
		box.style.width = playerCfg.width + "px";
		box.style.height = playerCfg.height + "px";
		GM_log("build box");
		
		// build title
		var newTitle = document.createElement("h2");
		box.appendChild(newTitle);
		newTitleTxt = document.createTextNode(title);
		newTitle.appendChild(newTitleTxt);
		GM_log("build title");
		
		// build player
		var player = document.createElement("embed");
		box.appendChild(player);
		player.src = video;
		player.width = playerCfg.width;
		player.height = playerCfg.height;
		player.type = "application/x-vlc-plugin";
		
		GM_log("build player");
		
		// setting up download-, drag & drop- and scale-tools
		GM_log("setting up drag & drop- and scale-tools");
		var dragAndDrop = false;
		var scale = false;
		
		var moveBox = document.createElement("div");
		box.appendChild(moveBox);
		moveBox.id = "moveBox";
		txt = document.createTextNode("move");
		moveBox.appendChild(txt);
		
		var scaleBox = document.createElement("div");
		box.appendChild(scaleBox);
		scaleBox.id = "scaleBox";
		txt = document.createTextNode("scale");
		scaleBox.appendChild(txt);
		
		var downloadBox = document.createElement("div");
		box.appendChild(downloadBox);
		downloadBox.id = "downloadBox";
		var downloadLink = document.createElement("a");
		downloadBox.appendChild(downloadLink);
		downloadLink.href = video;
		txt = document.createTextNode("download");
		downloadLink.appendChild(txt);
		downloadBox.onclick = function() { location.href = video; };
		
		moveBox.onmousedown = function(e) {
			last = e;
			dragAndDrop = true;
		};
		
		var player_wrapper = document.getElementById("player_wrapper");

		scaleBox.onmousedown = function(e) {
			last = e;
			scale = true;
		};
		
		document.onmousemove = function(now) {
			if(dragAndDrop)
			{
				playerCfg.x = playerCfg.x + (now.pageX - last.pageX);
				playerCfg.y = playerCfg.y + (now.pageY - last.pageY);
				
				box.style.top = playerCfg.y + "px";
				box.style.left = playerCfg.x + "px";
			}
			if(scale)
			{
				playerCfg.width = playerCfg.width + (now.pageX - last.pageX);
				playerCfg.height = playerCfg.height + (now.pageY - last.pageY);
				
				box.style.width = playerCfg.width + "px";
				box.style.height = playerCfg.height + "px";
				player.width = playerCfg.width;
				player.height = playerCfg.height;
			}
			
			last = now;
		};
		document.onmouseup = function(e) {
			dragAndDrop = false;
			scale = false;
		};
	}
},1000); // some waiting-time, so the flashx.xmlhttpRequest can do it's work.
// if the waitingtime doesn't work for you and the script can't find the video, change the value 1000. Its in miliseconds.