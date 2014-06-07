// ==UserScript==
// @name           Another YouTube Downloader
// @version        1.1.7
// @updateURL      http://userscripts.org/scripts/source/109643.meta.js?1.1.7
// @namespace      iampradip
// @description    Download now playing video in available formats.
// @license        BSD License; http://www.opensource.org/licenses/bsd-license.php
// @copyright      2011, iampradip (http://userscripts.org/users/iampradip1)
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @exclude        http://m.youtube.com/*
// @exclude        https://m.youtube.com/*
// ==/UserScript==


AnotherYouTubeDownloaderTranslation={ // You can add your own translation. Debug strings, video properties and helper application strings are not translated.
	strTranslations: {
		"en":{ // English
			0: "LQ Download button is shown.\n\nPress OK to hide.",
			1: "LQ Download button is not shown.\n\nPress OK to show.",
			2: "Add mobile compatible links to download links",
			3: "LQ",
			4: "LQ Download",
			5: "Loading",
			6: "Unable to fetch links. Try again.",
			7: "Unknown",
			8: "Download this video",
			9: "Download",
			10: "Stream",
			11: "Show/Hide LQ Download Button"
		}
	},
	getTranslation:function (id){
		var strUserLang=navigator.language.toLowerCase();
		if(strUserLang.indexOf("-")!=-1 && !AnotherYouTubeDownloaderTranslation.strTranslations[strUserLang]){
			strUserLang=strUserLang.substring(0,strUserLang.indexOf("-"));
		}
		if(!AnotherYouTubeDownloaderTranslation.strTranslations[strUserLang]){
			strUserLang="en";
		}
		return AnotherYouTubeDownloaderTranslation.strTranslations[strUserLang][id];
	}
};

Logger={
	blLog: false, 
	LOG_TYPE_CONSOLE: 0,
	LOG_TYPE_ALERT: 1,
	LOG_TYPE_GM_ALERT: 2,
	log: function (strMessage, intType){
		if(Logger.blLog==false)
			return;
		switch(intType){
			case Logger.LOG_TYPE_CONSOLE:
				if(typeof console != "undefined" && console.log)
					console.log(strMessage);
				break;
			case Logger.LOG_TYPE_ALERT:
				if(typeof unsafeWindow!="undefined" && unsafeWindow.alert){
					unsafeWindow.alert(strMessage);
					break; // if not, next case will be used
				}
			case Logger.LOG_TYPE_GM_ALERT: // Don't use for too many alerts
				alert(strMessage); 
				break;
		}
	}
};

AnotherYouTubeDownloader={
	blHelperInstalled: false, // Helper finds the file size of video without downloading.
	$: function(id){
		if(document && document.getElementById)
			return document.getElementById(id);
		else
			return null;
	},
	$$: function(tag){
		if(document && document.getElementsByTagName)
			return document.getElementsByTagName(tag);
		else
			return null;
	},
	isWatchPage: function(){
		return (location.pathname.indexOf("/watch")==0);
	},
	isUserChannelPage: function(){
		return (!AnotherYouTubeDownloader.isWatchPage() && (location.pathname.indexOf("/user")==0 || AnotherYouTubeDownloader.$("playnav-title-bar")));
	},
	isGreasemonkey: function(){
		try{
			if(typeof GM_getValue!="undefined" && GM_getValue("test","test")){
				return true;
			} else {
				return false;
			}
		}catch(e){
			return false;
		}
	},
	fetchDownloadLinks: function(){
		if(AnotherYouTubeDownloader.$("table-download-menu"))
			return;
		if (AnotherYouTubeDownloader.isUserChannelPage()){
			if(document.body.removeEventListener)
				document.body.removeEventListener("DOMNodeInserted",AnotherYouTubeDownloader.domChanged,false);
		}
		var divEmbed=AnotherYouTubeDownloader.$$("embed");
		var divVideos=AnotherYouTubeDownloader.$$("video");
		if(divEmbed.length>0)
			divEmbed=divEmbed[0];
		else
			divEmbed=null;
		var blLinksAdded=false;
		if(divEmbed && divEmbed.getAttribute("flashvars")) {
			try{
				AnotherYouTubeDownloader.putDownloadLinksFromFlashVars(divEmbed.getAttribute("flashvars"));
				if(AnotherYouTubeDownloader.$("table-download-menu"))
					blLinksAdded=true;
			}catch(e){
				Logger.log("Error while adding links from embed->flashvars: "+e, Logger.LOG_TYPE_ALERT);
			}
		}
		if (blLinksAdded==false && (window.yt || (typeof unsafeWindow != "undefined" && unsafeWindow.yt))) {
			try{
				var yt;
				if(window.yt)
					yt=window.yt;
				else
					yt=unsafeWindow.yt;
				if(yt.config_ && yt.config_.PLAYER_CONFIG && yt.config_.PLAYER_CONFIG.args && yt.config_.PLAYER_CONFIG.args.fmt_list && yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map){
					AnotherYouTubeDownloader.putDownloadLinks(yt.config_.PLAYER_CONFIG.args.fmt_list, yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map);
				}
				if(AnotherYouTubeDownloader.$("table-download-menu"))
					blLinksAdded=true;
			}catch(e){
				Logger.log("Error while adding links from embed->flashvars: "+e, Logger.LOG_TYPE_ALERT);
			}
		}
		if (blLinksAdded==false && divVideos.length>0){
			try{
				for(var i=0;i<divVideos.length;i++){
					if(divVideos[i].src)
						AnotherYouTubeDownloader.addLink(divVideos[i].src);
				}
				if(AnotherYouTubeDownloader.$("table-download-menu"))
					blLinksAdded=true;
			}catch(e){
				Logger.log("Error while adding links from embed->flashvars: "+e, Logger.LOG_TYPE_ALERT);
			}
		}
		if(blLinksAdded==true && AnotherYouTubeDownloader.isGreasemonkey()){
			AnotherYouTubeDownloader.putMobileCompatibleLinks();
		}
		if (AnotherYouTubeDownloader.isUserChannelPage()){
			if(document.body.addEventListener)
				document.body.addEventListener("DOMNodeInserted",AnotherYouTubeDownloader.domChanged,false);
		}
	},
	putDownloadLinksFromFlashVars: function(strFlashVars){
		strFlashVars=unescape(strFlashVars.replace(/&amp;/g,"&"));
		var fmt_list=strFlashVars.match(/fmt_list=.*/g)[0].substring(9);
		if(fmt_list.indexOf("&")!=-1)
			fmt_list=fmt_list.substr(0,fmt_list.indexOf("&"));
		var fmt_stream_map=strFlashVars.match(/url_encoded_fmt_stream_map=.*/ig)[0].substring(27);
		AnotherYouTubeDownloader.putDownloadLinks(fmt_list, fmt_stream_map);
	},
	putDownloadLinks: function(fmt_list, fmt_stream_map){
		var fmt_list_s=fmt_list.split(",");
		var fmt_stream_maps=fmt_stream_map.split(",");
		Logger.log("fmt_list:\n"+fmt_list, Logger.LOG_TYPE_CONSOLE);
		Logger.log("fmt_list_s:\n"+fmt_list_s, Logger.LOG_TYPE_CONSOLE);
		Logger.log("fmt_stream_map:\n"+fmt_stream_map, Logger.LOG_TYPE_CONSOLE);
		Logger.log("fmt_stream_maps:\n"+fmt_stream_maps, Logger.LOG_TYPE_CONSOLE);
		for(var i=0;i<fmt_list_s.length;i++){
			var vid_vars=fmt_stream_maps[i].split("&");
			var url="";
			var conn="";
			var stream="";
			var type="";
			var quality="";
			var stereo3d=0;
			var itag=-1;
			var resolution="";
			
			for(var j=0;j<vid_vars.length;j++){
				var key=vid_vars[j].substr(0,vid_vars[j].indexOf("="));
				var value=unescape(vid_vars[j].substr(vid_vars[j].indexOf("=")+1));
				switch(key){
					case "itag": if(itag==-1) itag=value;break;
					case "url": if(url=="" && conn=="") url=value;break;
					case "conn": if(conn=="") conn=value; break;
					case "stream": if(stream=="") stream=value; break;
					case "type": if(type=="") type=value;break;
					case "quality": if(quality=="") quality=value;break;
					case "stereo3d": if(stereo3d==0) stereo3d=value;break;
					case "fallback_host": break;
					default: if(i!=fmt_list_s.length-1){
						Logger.log("New parameter found. To help make script better, please report this video URL at http://userscripts.org/scripts/discuss/109643.\n\nMore details:\n\nparameter name: "+key+"\nparameter value: "+value+"\nfmt_stream_maps["+i+"]: "+fmt_stream_maps[i], Logger.LOG_TYPE_ALERT);
					};break;
				}
			}
			if(itag==fmt_list_s[i].split("/")[0]){
				resolution=fmt_list_s[i].split("/")[1];
			} else {
				Logger.log("fmt_list and fmt_stream_maps mismatch. Please report this video URL at http://userscripts.org/scripts/discuss/109643.", Logger.LOG_TYPE_ALERT);
			}
			if(url.length!=0)
				AnotherYouTubeDownloader.addDownloadLink(url, type, resolution, quality, stereo3d, itag);
			else if(conn.length!=0)
				AnotherYouTubeDownloader.addDownloadLink(conn+(stream.length!=0?"?"+stream:""), type, resolution, quality, stereo3d, itag);
			else {
				Logger.log("Unsupported protocol found. To help make script better, please report this video URL at http://userscripts.org/scripts/discuss/109643.\n\nMore details:\n\ntype: "+type+"\nresolution: "+resolution+"\nquality:"+quality+"\nfmt_stream_maps["+i+"]: "+fmt_stream_maps[i], Logger.LOG_TYPE_ALERT);
			}
		}
	},
	gmShowHideLQLinks: function(){
		var blShowLQLinks=GM_getValue("LQDownload",true);
		if(blShowLQLinks){
			if(confirm(AnotherYouTubeDownloaderTranslation.getTranslation(0)))
				blShowLQLinks=!blShowLQLinks;
		} else {
			if(confirm(AnotherYouTubeDownloaderTranslation.getTranslation(1)))
				blShowLQLinks=!blShowLQLinks;
		}
		GM_setValue("LQDownload",blShowLQLinks);
		if(!blShowLQLinks && AnotherYouTubeDownloader.$("watch-low-quality-download")){
			AnotherYouTubeDownloader.$("watch-low-quality-download").parentNode.removeChild(AnotherYouTubeDownloader.$("watch-low-quality-download"));
		}
	},
	putMobileCompatibleLinks: function(){
		var btnMLinksButton=AnotherYouTubeDownloader.$("watch-low-quality-download");
		if(GM_getValue("LQDownload",true)==false){
			if(AnotherYouTubeDownloader.$("watch-low-quality-download"))
				AnotherYouTubeDownloader.$("watch-low-quality-download").parentNode.removeChild(AnotherYouTubeDownloader.$("watch-low-quality-download"));
			return;
		}
		var divWatchActions=AnotherYouTubeDownloader.getWatchActionsEl();
		if(divWatchActions && !btnMLinksButton){
			btnMLinksButton=document.createElement("button");
			btnMLinksButton.id="watch-low-quality-download";
			btnMLinksButton.className="yt-uix-button b";
			btnMLinksButton.title=AnotherYouTubeDownloaderTranslation.getTranslation(2);
			btnMLinksButton.addEventListener("click", AnotherYouTubeDownloader.fetchLowQualityLinks, false);
			divWatchActions.appendChild(btnMLinksButton);
		}
		if(btnMLinksButton){
			btnMLinksButton.innerHTML="<span class=\"yt-uix-button-content\">"+(AnotherYouTubeDownloader.isCosmicPanda()?AnotherYouTubeDownloaderTranslation.getTranslation(3):AnotherYouTubeDownloaderTranslation.getTranslation(4))+"</span>";
			if(AnotherYouTubeDownloader.isCosmicPanda() && AnotherYouTubeDownloader.$("watch-like") && AnotherYouTubeDownloader.$("watch-like").getElementsByClassName("yt-uix-button-content").length>0){
				AnotherYouTubeDownloader.$("watch-like").getElementsByClassName("yt-uix-button-content")[0].innerHTML="";
			}
		}
	},
	fetchLowQualityLinks: function(){
		AnotherYouTubeDownloader.$("watch-low-quality-download").disabled=true;
		AnotherYouTubeDownloader.$("watch-low-quality-download").innerHTML="<span class=\"yt-uix-button-content\">"+(AnotherYouTubeDownloader.isCosmicPanda()?"...":AnotherYouTubeDownloaderTranslation.getTranslation(5))+"</span>";
		GM_xmlhttpRequest({
			method : "GET",
			url: "http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&v="+AnotherYouTubeDownloader.getVidId(),
			headers: {
				"User-Agent":"iPhone"
			},
			onload: function (res){
				try{
					AnotherYouTubeDownloader.$("watch-low-quality-download").parentNode.removeChild(AnotherYouTubeDownloader.$("watch-low-quality-download"));
					var strResponse=res.responseText;
					var strLinksPart=strResponse.substr(0,strResponse.indexOf("related_videos"));
					var strLinksString=strLinksPart.split("stream_url\": ");
					for(var i=1;i<strLinksString.length;i++){
						var strLQLinkURL=strLinksString[i].substr(0,strLinksString[i].indexOf("\"",1)+1);
						if(strLQLinkURL.length>2)
							AnotherYouTubeDownloader.addLink(eval(strLQLinkURL));
					}
				}catch(e){
				}finally{
					AnotherYouTubeDownloader.toggleDownloadMenu(true);
				}
			},
			onerror: function (res){
				AnotherYouTubeDownloader.$("watch-low-quality-download").disabled=false;
				AnotherYouTubeDownloader.putMobileCompatibleLinks();
				alert(AnotherYouTubeDownloaderTranslation.getTranslation(6));
			}
		});
		return false;
	},
	addLink: function(strLink){
		var itag=parseInt(strLink.substr(strLink.indexOf("itag=")+5));
		var itags={
			13 : { type: "video/3gpp", resolution:"176x144", quality:"small" },
			17 : { type: "video/3gpp", resolution:"176x144", quality:"medium" },
			18 : { type: "video/mp4", resolution:"320x240", quality:"small" },
			36 : { type: "video/3gpp", resolution:"320x240", quality:"high" }
		};
		if(itags[itag])
			AnotherYouTubeDownloader.addDownloadLink(strLink, itags[itag].type, itags[itag].resolution, itags[itag].quality, 0, itag);
		else
			AnotherYouTubeDownloader.addDownloadLink(strLink, AnotherYouTubeDownloaderTranslation.getTranslation(7)+" ("+itag+")", AnotherYouTubeDownloaderTranslation.getTranslation(7)+" ("+itag+")", AnotherYouTubeDownloaderTranslation.getTranslation(7)+" ("+itag+")", 0, itag);
	},
	getVidId: function(){
		var strVidId;
		if(AnotherYouTubeDownloader.isWatchPage()){
			strVidId=location.search.substring(location.search.indexOf("v=")+2);
		} else if (AnotherYouTubeDownloader.isUserChannelPage()){
			var divPlayNavCurrentTitle=AnotherYouTubeDownloader.$("playnav-curvideo-title");
			if(!divPlayNavCurrentTitle)
				return "";
			var aVidLink=divPlayNavCurrentTitle.getElementsByTagName("a");
			if(aVidLink.length==0)
				return "";
			strVidId=aVidLink[0].search.substring(aVidLink[0].search.indexOf("v=")+2);
		}
		if(strVidId.indexOf("&")!=-1)
			strVidId=strVidId.substring(0,strVidId.indexOf("&"));
		if(strVidId.indexOf("#")!=-1)
			strVidId=strVidId.substring(0,strVidId.indexOf("#"));
		return strVidId;
	},
	getWatchActionsEl: function(){
		if(AnotherYouTubeDownloader.isWatchPage()){
			var divWatchActions=AnotherYouTubeDownloader.$("watch-actions");
			if(!divWatchActions){
				divWatchActions=AnotherYouTubeDownloader.$("watch-content");
			}
			if(!divWatchActions){
				divWatchActions=AnotherYouTubeDownloader.$("vo");
			}
			if(divWatchActions)
				return divWatchActions;
		} else if (AnotherYouTubeDownloader.isUserChannelPage()){
			var divPlayNavInfoLine=AnotherYouTubeDownloader.$("playnav-curvideo-info-line");
			if(divPlayNavInfoLine)
				return divPlayNavInfoLine;
		}
		return null;
	},
	isCosmicPanda: function(){
		return AnotherYouTubeDownloader.$("watch-content")!=null;
	},
	toggleDownloadMenu: function(blForce){
		var divDLContainer=AnotherYouTubeDownloader.$("watch-download-area-container");
		if(blForce==true || divDLContainer.className=="hid"){
			divDLContainer.className="";
		} else if(blForce==false || divDLContainer.className==""){
			divDLContainer.className="hid";
		}
	},
	getDownloadMenu: function(){
		var tblDownloadMenu=AnotherYouTubeDownloader.$("table-download-menu");
		if(!tblDownloadMenu){
			var divWatchActions=AnotherYouTubeDownloader.getWatchActionsEl();
			if(divWatchActions && divWatchActions.nextSibling){
				var divDownloadContainer=document.createElement("div");
				divDownloadContainer.id="watch-download-area-container";
				divDownloadContainer.className=(navigator.userAgent.indexOf("Opera Mini")==-1)?"hid":"";
				divDownloadContainer.innerHTML=""+
					"<div class=\"yt-rounded\" id=\"watch-download-area\">"+
						"<div class=\"watch-actions-panel\" id=\"watch-download-display\">"+
							"<table id=\"table-download-menu\" cellspacing=0 cellpadding=0>"+
								"<tr>"+
									"<td width=40></td>"+
								"</tr>"+
							"</table>"+
						"</div>"+
						"<div class=\"close\">"+
							"<img class=\"close-button\" id=\"watch-download-close\" src=\"http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\">"+
						"</div>"+
					"</div>"+
				"";
				if(divWatchActions.nextSibling)
					divWatchActions.parentNode.insertBefore(divDownloadContainer, divWatchActions.nextSibling);
				else
					divWatchActions.parentNode.appendChild(divDownloadContainer);
					
				AnotherYouTubeDownloader.addCSS(""+
					"#watch-download-area-container{margin-bottom:10px;height:auto}"+
					"#watch-download-area{border:1px solid #CCCCCC;padding:5px;position:relative}"+
					"#watch-download-area .close{cursor:pointer;position:absolute;right:5px;top:5px}"+
					"#table-download-menu{width:100%;}"+
					"#table-download-menu td{border:1px solid #E0E0E0;padding:3px 9px}"+
					"#table-download-menu td.bold{font-weight:bold}"+
					"#watch-download{margin-left:10px}"+
					"#watch-low-quality-download{margin-left:4px}"+
				"");
			
				var btnDownloadButton=document.createElement("button");
				btnDownloadButton.id="watch-download";
				btnDownloadButton.className="yt-uix-button b";
				btnDownloadButton.title=AnotherYouTubeDownloaderTranslation.getTranslation(8);
				btnDownloadButton.innerHTML="<span class=\"yt-uix-button-content\">"+AnotherYouTubeDownloaderTranslation.getTranslation(9)+"</span>";
				if(btnDownloadButton.addEventListener)
					btnDownloadButton.addEventListener("click", AnotherYouTubeDownloader.toggleDownloadMenu, false);
				else if(btnDownloadButton.attachEvent)
					btnDownloadButton.attachEvent("onclick", AnotherYouTubeDownloader.toggleDownloadMenu);
				else if(btnDownloadButton)
					btnDownloadButton.onclick=AnotherYouTubeDownloader.toggleDownloadMenu;
				divWatchActions.appendChild(btnDownloadButton);
				
				if(AnotherYouTubeDownloader.$("watch-download-close") && AnotherYouTubeDownloader.$("watch-download-close").addEventListener){
					AnotherYouTubeDownloader.$("watch-download-close").addEventListener("click", AnotherYouTubeDownloader.toggleDownloadMenu, false);
				} else if(AnotherYouTubeDownloader.$("watch-download-close") && AnotherYouTubeDownloader.$("watch-download-close").attachEvent){
					AnotherYouTubeDownloader.$("watch-download-close").attachEvent("onclick", AnotherYouTubeDownloader.toggleDownloadMenu);
				} else if(AnotherYouTubeDownloader.$("watch-download-close")){
					AnotherYouTubeDownloader.$("watch-download-close").onclick=AnotherYouTubeDownloader.toggleDownloadMenu;
				}
					
				tblDownloadMenu=AnotherYouTubeDownloader.$("table-download-menu");
			}
		}
		return tblDownloadMenu;
	},
	getType: function(type){
		if(type.indexOf(";")!=-1)
			type=type.substring(0,type.indexOf(";"));
		if(type.indexOf("/")!=-1)
			type=type.substring(type.indexOf("/")+1);
		switch(type){
			case "webm":
				type="WebM";
				break;
			case "mp4":
				type="MP4";
				break;
			case "x-flv":
				type="FLV";
				break;
			case "3gpp":
				type="3GP";
				break;
		}
		return type;
	},
	getHeight: function(resolution){
		if(resolution.indexOf("x")!=-1)
			resolution=resolution.substring(resolution.indexOf("x")+1)+"p";
		return resolution;
	},
	maintainTableCells: function(tblTable){
		var intCols=0;
		var i=0;
		for(i=0;i<tblTable.rows.length;i++){
			if(intCols<tblTable.rows[i].cells.length)
				intCols=tblTable.rows[i].cells.length;
		}
		for(i=0;i<tblTable.rows.length;i++){
			while(tblTable.rows[i].cells.length<intCols){
				tblTable.rows[i].insertCell(tblTable.rows[i].cells.length).innerHTML="";
			}
		}
	},
	addDownloadLink: function(url, type, resolution, quality, stereo3d, itag){
		var tblMenu=AnotherYouTubeDownloader.getDownloadMenu();
		if(!tblMenu){
			return;
		}
		var strHType=AnotherYouTubeDownloader.getType(type);
		var strHHeight=AnotherYouTubeDownloader.getHeight(resolution);
		var rowHeights=tblMenu.rows[0];
		var i;
		
		var intHeightIndex=-1; 
		for(i=1;i<rowHeights.cells.length;i++){
			if(rowHeights.cells[i].innerHTML==strHHeight)
				intHeightIndex=i;
		}
		if(intHeightIndex==-1){
			intHeightIndex=rowHeights.cells.length;
			rowHeights.insertCell(intHeightIndex).innerHTML=strHHeight;
			rowHeights.cells[intHeightIndex].className="bold";
		}
		
		var intTypeIndex=-1; 
		for(i=1;i<tblMenu.rows.length;i++){
			if(tblMenu.rows[i].cells[0] && tblMenu.rows[i].cells[0].innerHTML==strHType)
				intTypeIndex=i;
		}
		if(intTypeIndex==-1){
			intTypeIndex=tblMenu.rows.length;
			var curRow=tblMenu.insertRow(intTypeIndex);
			curRow.insertCell(0).innerHTML=strHType;
			curRow.cells[0].className="bold";
		}
		AnotherYouTubeDownloader.maintainTableCells(tblMenu);
		var strNewLink=url;
		if(AnotherYouTubeDownloader.getVideoTitle()!="")
			strNewLink=strNewLink.substring(0,strNewLink.indexOf("?")+1)+"title="+escape(AnotherYouTubeDownloader.getVideoTitle())+"&"+strNewLink.substring(strNewLink.indexOf("?")+1)
		var tdCell=tblMenu.rows[intTypeIndex].cells[intHeightIndex];
		tdCell.innerHTML=""+
			"<a href=\""+strNewLink+"\" title=\""+resolution+", "+type.replace(/\"/g,"'")+", "+quality+" quality"+(stereo3d==1?", stereo3d audio":"")+", itag "+itag+"\">"+(url.indexOf("rtmpe://")==0?AnotherYouTubeDownloaderTranslation.getTranslation(10):AnotherYouTubeDownloaderTranslation.getTranslation(9))+"</a>"+(url.indexOf("rtmpe://")==0?"/<a href=\""+location.protocol+strNewLink.substr(6)+"\" title=\""+resolution+", "+type.replace(/\"/g,"'")+", "+quality+" quality"+(stereo3d==1?", stereo3d audio":"")+", itag "+itag+"\">"+AnotherYouTubeDownloaderTranslation.getTranslation(9)+"</a>":"")+
		"";
		
		if(AnotherYouTubeDownloader.blHelperInstalled){
			tdCell.appendChild(document.createTextNode(" ("));
			
			var aFileSizeLink=document.createElement("a");
			aFileSizeLink.href="javascript:void(0);";
			aFileSizeLink.setAttribute("url","http:"+url.substr(6));
			aFileSizeLink.addEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
			aFileSizeLink.innerHTML="?";
			aFileSizeLink.title="Find file size of this download link";
			tdCell.appendChild(aFileSizeLink);
			
			tdCell.appendChild(document.createTextNode(")"));
			
		}
	},
	fetchFileSize: function(){
		var me=this;
		var url=me.getAttribute("url");
		me.innerHTML="...";
		me.title="Loading...";
		me.removeEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
		GM_xmlhttpRequest({
			method : "GET",
			url: "http://127.0.0.1:9688/"+url,
			headers: {
				"Referer": location.href // If cookies are cleared after page is loaded, this will lead to 403 Forbidden. Better disable cookies.
			},
			onload: function (res){
				var lngFileSize=parseInt(res.responseText);
				var strFileSize="";
				if(lngFileSize==-2){
					me.innerHTML="!2";
					me.title="Helper application was unable to connect. Check internet settings.";
					me.addEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
					return;
				}
				if(lngFileSize==-3){
					me.innerHTML="!3";
					me.title="Helper application does not support this protocol.";
					me.addEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
					return;
				}
				if(lngFileSize==-4){
					me.innerHTML="!4";
					me.title="Helper application denied checking file size for this url.";
					me.addEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
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
				me.removeAttribute("href");
				me.style.textDecoration="none";
				me.style.color="auto";
				me.innerHTML=strFileSize;
				me.title=strFileSize;
			},
			onerror: function (res){
				me.innerHTML="!1";
				me.title="Unable to fetch file size. Make sure Helper application is running and browser is online.";
				me.addEventListener("click",AnotherYouTubeDownloader.fetchFileSize,false);
			}
		});
	},
	getVideoTitle: function(){
		var spanEowTitle;
		var strReturnValue="";
		if(AnotherYouTubeDownloader.isWatchPage()){
			spanEowTitle=AnotherYouTubeDownloader.$("eow-title");
			if(spanEowTitle && spanEowTitle.title)
				strReturnValue=spanEowTitle.title;
		} else if (AnotherYouTubeDownloader.isUserChannelPage()){
			spanEowTitle=AnotherYouTubeDownloader.$("playnav-curvideo-title");
			if(spanEowTitle && spanEowTitle.textContent)
				strReturnValue=spanEowTitle.textContent.trim();
		}
		return strReturnValue.replace(/(\"|\*|\:|\<|\>|\?|\||\\|\/)/g,"_");
	},
	domChanged: function(){
		setTimeout(function (){
			AnotherYouTubeDownloader.fetchDownloadLinks();
		},0);
	},
	addCSS: function(css){
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = AnotherYouTubeDownloader.$$("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				try{
					node.appendChild(document.createTextNode(css));
				}catch(e){}
				heads[0].appendChild(node); 
			}
		}
	},
	runScript: function(){
		if(!document.body.innerHTML)
			return;
		if(AnotherYouTubeDownloader.blHelperInstalled && !AnotherYouTubeDownloader.isGreasemonkey())
			AnotherYouTubeDownloader.blHelperInstalled=false;
		if(AnotherYouTubeDownloader.isGreasemonkey()){
			GM_registerMenuCommand("Another YouTube Downloader -> "+AnotherYouTubeDownloaderTranslation.getTranslation(11),AnotherYouTubeDownloader.gmShowHideLQLinks);
		}
		if(AnotherYouTubeDownloader.isWatchPage()){
			AnotherYouTubeDownloader.fetchDownloadLinks();
		} else if (AnotherYouTubeDownloader.isUserChannelPage()){
			if(document.body.addEventListener)
				document.body.addEventListener("DOMNodeInserted",AnotherYouTubeDownloader.domChanged,false);
		}
	}
};

AnotherYouTubeDownloader.runScript();