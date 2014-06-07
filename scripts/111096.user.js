// ==UserScript==
// @name           MyTubeDownloader	
// @namespace      Created by Vimal Pillai							
// @description    Play & Download your favourite youtube videos
// @include        http://www.youtube.com/watch*
// @version        1.0
// ==/UserScript==

var blHelperInstalled=false; // Sorry, not available for public use. Helper finds the file size of video without downloading.

function init(){
	var divWatchPlayer=document.getElementById("watch-player");
	var divEmbed=document.getElementsByTagName("embed");
	if(divEmbed[0])
		divEmbed=divEmbed[0];
	else
		divEmbed=null;
	if(!divEmbed){
		for(var divChild=divWatchPlayer.firstChild;divChild;divChild=divChild.nextSibling){
			if(divChild.tagName && divChild.tagName.toLowerCase()=="embed"){
				divEmbed=divChild;
				break;
			}
		}
	}
	if(blHelperInstalled)
		addCSS(".download-link{padding:3px;font-family:Calibri;font-size:120%;}"+
			".download-link-optional-stuff{color:#000000;display:none;font-size:90%}"+
			".download-link:hover .download-link-optional-stuff{display:block}"+
			".download-link:hover{border:2px solid #000000;border-radius:3px;background:#000000}");
	else
		addCSS(".download-link{padding:3px;font-family:Calibri;font-size:120%;}"+
			".download-quality{color:#000000;display:none}"+
			".download-link:hover .download-quality{display:inline}");
	if(divEmbed){
		var flashVars=unescape(divEmbed.getAttribute("flashvars").replace(/&amp;/g,"&"));
		var fmt_list=flashVars.match(/&fmt_list=.*/g)[0].substring(10);
		fmt_list=fmt_list.substr(0,fmt_list.indexOf("&"));
		var fmt_list_s=fmt_list.split(",");
		var fmt_stream_map=flashVars.match(/&url_encoded_fmt_stream_map=url=http.*/ig)[0].substring(28);
		var fmt_stream_maps=fmt_stream_map.split(",");
		for(var i=0;i<fmt_list_s.length;i++){
			fmt_stream_maps[i]=fmt_stream_maps[i].match(/.*itag=[0-9]{1,2}/g)[0];
			var vid_vars=fmt_stream_maps[i].split("&");
			var url="";
			var type="";
			var quality="";
			var resolution=fmt_list_s[i].split("/")[1];
			for(var j=0;j<vid_vars.length;j++){
				var key=vid_vars[j].substr(0,vid_vars[j].indexOf("="));
				var value=unescape(vid_vars[j].substr(vid_vars[j].indexOf("=")+1));
				switch(key){
					case "url": url=value;break;
					case "type": type=value;break;
					case "quality": quality=value;break;
				}
			}
			addDownloadLink(url, type, resolution, quality);
		}
	}
	//             THIS PART IS ONLY FOR FIREFOX
	try{
		if(GM_xmlhttpRequest && navigator.vendor.indexOf("Google")==-1){
			var divWatchPanel=document.getElementById("watch-panel");
			var divWatchActions=document.getElementById("watch-actions");
			if(!divWatchPanel){ // cosmic panda
				divWatchPanel=document.getElementById("watch-frame-bottom");
				divWatchActions=document.getElementById("watch-content");
			}
			var divLQLink=document.createElement("div");
			divLQLink.className="download-link";
			divLQLink.id="fetch-lq-download-links";
			divWatchPanel.insertBefore(divLQLink,divWatchActions);
			
			var aFetchLQLink=document.createElement("a");
			aFetchLQLink.href="javascript:void(0);";
			aFetchLQLink.addEventListener("click",fetchLowQualityLinks,false);
			aFetchLQLink.innerHTML="Load Mobile Compatible Low Quality Video Download Links";
			divLQLink.appendChild(aFetchLQLink);
			
			var divStatus=document.createElement("span");
			divStatus.id="fetch-lq-download-status";
			divStatus.className="download-link";
			divStatus.style.display="none";
			divWatchPanel.insertBefore(divStatus,divWatchActions);
		}
	}catch(e){}
	//            END
}

// FUNCTION ONLY FOR FIREFOX
function fetchLowQualityLinks(){
	var divLQLink=document.getElementById("fetch-lq-download-links");
	divLQLink.style.display="none";
	var divStatus=document.getElementById("fetch-lq-download-status");
	divStatus.style.display="block";
	divStatus.innerHTML="Loading...";
	GM_xmlhttpRequest({
		method : "GET",
		url: "http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&v="+getVidId(),
		headers: {
			"User-Agent":"iPhone"
		},
		onload: function (res){
			try{
				var divLQLink=document.getElementById("fetch-lq-download-links");
				divLQLink.parentNode.removeChild(divLQLink);
				var divStatus=document.getElementById("fetch-lq-download-status");
				divStatus.parentNode.removeChild(divStatus);
				var strResponse=res.responseText;
				var strLinksPart=strResponse.substr(0,strResponse.indexOf("related_videos"));
				var strLinksString=strLinksPart.split("stream_url\": ");
				for(var i=1;i<strLinksString.length;i++){
					var strLQLinkURL=strLinksString[i].substr(0,strLinksString[i].indexOf("\"",1)+1);
					if(strLQLinkURL.length>2)
						addLink(eval(strLQLinkURL));
				}
			}catch(e){}
		},
		onerror: function (res){
			var divLQLink=document.getElementById("fetch-lq-download-links");
			divLQLink.style.display="block";
			var divStatus=document.getElementById("fetch-lq-download-status");
			divStatus.style.display="block";
			divStatus.innerHTML="Unable to fetch links.";
		}
	});
	return false;
}

// FUNCTION ONLY FOR FIREFOX
function addLink(strLink){
	var itag=parseInt(strLink.substr(strLink.indexOf("itag=")+5));
	var quality="";
	switch(itag){
		case 36:
			quality="3gp hq";
			break;
		case 18:
			quality="mp4 hq";
			break;
		case 17:
			quality="3gp standard";
			break;
		case 13:
			quality="3gp lq";
			break;
		default:
			quality="unknown ("+itag+")";
			break;
	}
	addDownloadLink(strLink, quality, "Unknown", quality);
}

// FUNCTION ONLY FOR FIREFOX
function getVidId(){
	var strVidId=location.search.substring(location.search.indexOf("v=")+2);
	if(strVidId.indexOf("&")!=-1)
		strVidId=strVidId.substring(0,strVidId.indexOf("&"));
	return strVidId;
};

function getVideoTitle(){
	var spanEowTitle=document.getElementById("eow-title");
	if(spanEowTitle && spanEowTitle.title)
		return spanEowTitle.title;
	return "";
};

function addDownloadLink(url, type, resolution, quality){
	var divWatchPanel=document.getElementById("watch-panel");
	var divWatchActions=document.getElementById("watch-actions");
	if(!divWatchPanel){ // cosmic panda
		divWatchPanel=document.getElementById("watch-frame-bottom");
		divWatchActions=document.getElementById("watch-content");
	}
	var divDownloadLink=document.createElement("div");
	divDownloadLink.className="download-link";
	var strNewLink=url;
	if(getVideoTitle()!="")
		strNewLink=url+"&title="+escape(getVideoTitle());
	else
		strNewLink=url;
	if(!blHelperInstalled)
		divDownloadLink.innerHTML="<a href=\""+strNewLink+"\">Download : "+resolution+" : "+type+"</a> <span class=download-quality>Quality: "+quality+"</span>";
	divWatchPanel.insertBefore(divDownloadLink,divWatchActions);
	
	if(blHelperInstalled){
		var aLink=document.createElement("a");
		aLink.href=strNewLink;
		aLink.innerHTML="Download : "+resolution+" : "+type;
		divDownloadLink.appendChild(aLink);
		
		var spanFileSize=document.createElement("span");
		spanFileSize.innerHTML="";
		spanFileSize.style.display="inline";
		divDownloadLink.appendChild(spanFileSize);
		
		var divOptionalStuff=document.createElement("div");
		divOptionalStuff.className="download-link-optional-stuff";
		divDownloadLink.appendChild(divOptionalStuff);
		
		//             THIS PART IS ONLY FOR FIREFOX
		try{
			if(GM_xmlhttpRequest && navigator.vendor.indexOf("Google")==-1){
				var aFileSizeLink=document.createElement("a");
				aFileSizeLink.href="javascript:void(0);"
				aFileSizeLink.setAttribute("url",url);
				aFileSizeLink.addEventListener("click",fetchFileSize,false);
				aFileSizeLink.innerHTML="Fetch File Size";
				divOptionalStuff.appendChild(aFileSizeLink);
				
				var spanFileSizeLinkSeparator=document.createElement("span");
				spanFileSizeLinkSeparator.innerHTML=" | ";
				divOptionalStuff.appendChild(spanFileSizeLinkSeparator);
			}
		}catch(e){}
		// END
		
		var spanDownloadQuality=document.createElement("span");
		spanDownloadQuality.innerHTML="Quality: "+quality;
		divOptionalStuff.appendChild(spanDownloadQuality);
	}
}

function fetchFileSize(){
	var url=this.getAttribute("url");
	var me=this;
	me.style.display="none";
	me.nextSibling.style.display="none";
	me.parentNode.previousSibling.innerHTML=" : Fetching File Size...";
	GM_xmlhttpRequest({
		method : "GET",
		url: "http://127.0.0.1:9688/"+url,
		onload: function (res){
			var lngFileSize=parseInt(res.responseText);
			var strFileSize="";
			if(lngFileSize==-2){
				me.style.display="inline";
				me.nextSibling.style.display="inline";
				me.parentNode.previousSibling.innerHTML=" : Helper application was unable to connect. Check internet settings.";
				return;
			}
			if(lngFileSize==-1){
				strFileSize="Unknown";
			} else if(lngFileSize<9999){
				strFileSize=lngFileSize+" bytes";
			} else if(lngFileSize<9999*1024){
				strFileSize=(Math.round(lngFileSize/10.24)/100)+" KB";
			} else if(lngFileSize<9999*1024*1024){
				strFileSize=(Math.round(lngFileSize/(10.24*1024))/100)+" MB";
			} else {
				strFileSize=(Math.round(lngFileSize/(10.24*1024*1024))/100)+" GB";
			}
				
			me.parentNode.previousSibling.innerHTML=" : "+strFileSize;
		},
		onerror: function (res){
			me.style.display="inline";
			me.nextSibling.style.display="inline";
			me.parentNode.previousSibling.innerHTML=" : Unable to fetch file size. Make sure Helper application is running and browser is online.";
		}
	});
}

var addCSS=function (css){
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
};

init();
try{
	console.log("Another YouTube Downloader loaded");
}catch(e){}