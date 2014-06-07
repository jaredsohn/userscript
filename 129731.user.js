// ==UserScript== //
// @name           YouTube Mp3
// @description    Youtube player artık çığırından çıktı,Gelin onu değiştirelim! :)
// @include        *youtube.com/watch?*v=*
// @include        *youtube.com/watch?*v=*
// @include        *youtube.com/*
// @version        1.0
// @copyright      © 2012 Ali Deniz Özgül (Maxcod2)
// ==/UserScript== //

var s = location.href.split("&");
var url=s[0];

document.getElementById('watch-headline-user-info').innerHTML += '<style>#button {position: relative; top: -1.6em; left: 27.1em;}#link {padding: 4.0px;} #link:hover {text-decoration: none;}#watch-actions {height: 30px;}</style><button type="button" title="Mp3 Olarak İndir"><a href="http://www.youtube-mp3.org/redir?url='+ url +'&hq=1" id="link" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" target="_blank">MP3</a></div>';

var blHelperInstalled=false; // Helper finds the file size of video without downloading.

function $(id){
	return document.getElementById(id);
}
function isWatchPage(){
	return (location.pathname.indexOf("/watch")==0);
}
function isUserChannelPage(){
	return (location.pathname.indexOf("/user")==0);
}
function isGreasemonkey(){
	try{
		if(GM_getValue("test","test")){
			return true;
		} else {
			return false;
		}
	}catch(e){
		return false;
	}
}
function init(){
	if(blHelperInstalled && !isGreasemonkey())
		blHelperInstalled=false;
	if(isWatchPage()){
		fetchDownloadLinks();
	} else if (isUserChannelPage()){
		if(document.body.addEventListener)
			document.body.addEventListener("DOMNodeInserted",domChanged,false); // download links in user channel not supported in ie7pro
	}
}

function fetchDownloadLinks(){
	if($("table-download-menu"))
		return;
	var divEmbed=document.getElementsByTagName("embed");
	var divVideos=document.getElementsByTagName("video");
	if(divEmbed.length>0)
		divEmbed=divEmbed[0];
	else
		divEmbed=null;
	if(divEmbed && divEmbed.getAttribute("flashvars")) {
		putDownloadLinksFromFlashVars(divEmbed.getAttribute("flashvars"));
	} else if (window.yt || (unsafeWindow && unsafeWindow.yt)) {
		var yt;
		if(window.yt)
			yt=window.yt;
		else
			yt=unsafeWindow.yt;
		if(yt.config_ && yt.config_.PLAYER_CONFIG && yt.config_.PLAYER_CONFIG.args && yt.config_.PLAYER_CONFIG.args.fmt_list && yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map){
			putDownloadLinks(yt.config_.PLAYER_CONFIG.args.fmt_list, yt.config_.PLAYER_CONFIG.args.url_encoded_fmt_stream_map);
		}
	} else if(divVideos.length>0){
		for(var i=0;i<divVideos.length;i++){
			if(divVideos[i].src)
				addLink(divVideos[i].src);
		}
	} else {
		notifyUser("'Another YouTube Downloader' script has failed to fetch download links. Enable JavaScript if it's disabled and try again.");
	}
	if(isGreasemonkey()){
		putMobileCompatibleLinks();
	}
}

function notifyUser(strMessage){
	if(console && console.log)
		console.log(strMessage);
	else
		alert(strMessage);
}

function putDownloadLinksFromFlashVars(strFlashVars){
	strFlashVars=unescape(strFlashVars.replace(/&amp;/g,"&"));
	var fmt_list=strFlashVars.match(/fmt_list=.*/g)[0].substring(9);
	if(fmt_list.indexOf("&")!=-1)
		fmt_list=fmt_list.substr(0,fmt_list.indexOf("&"));
	var fmt_stream_map=strFlashVars.match(/url_encoded_fmt_stream_map=url=http.*/ig)[0].substring(27);
	putDownloadLinks(fmt_list, fmt_stream_map);
}

function putDownloadLinks(fmt_list, fmt_stream_map){
	var fmt_list_s=fmt_list.split(",");
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
function putMobileCompatibleLinks(){
	var btnMLinksButton=$("watch-low-quality-download");
	var divWatchActions=getWatchActionsEl();
	if(divWatchActions && !btnMLinksButton){
		btnMLinksButton=document.createElement("button");
		btnMLinksButton.id="watch-low-quality-download";
		btnMLinksButton.className="yt-uix-button";
		btnMLinksButton.title="Add mobile compatible links to download links";
		btnMLinksButton.addEventListener("click", fetchLowQualityLinks, false);
		divWatchActions.appendChild(btnMLinksButton);
	}
	if(btnMLinksButton)
		btnMLinksButton.innerHTML="<span class=\"yt-uix-button-content\">LQ Download</span>";
}
function fetchLowQualityLinks(){
	$("watch-low-quality-download").disabled=true;
	$("watch-low-quality-download").innerHTML="Loading";
	GM_xmlhttpRequest({
		method : "GET",
		url: "http://m.youtube.com/watch?ajax=1&layout=mobile&tsp=1&v="+getVidId(),
		headers: {
			"User-Agent":"iPhone"
		},
		onload: function (res){
			try{
				$("watch-low-quality-download").parentNode.removeChild($("watch-low-quality-download"));
				var strResponse=res.responseText;
				var strLinksPart=strResponse.substr(0,strResponse.indexOf("related_videos"));
				var strLinksString=strLinksPart.split("stream_url\": ");
				for(var i=1;i<strLinksString.length;i++){
					var strLQLinkURL=strLinksString[i].substr(0,strLinksString[i].indexOf("\"",1)+1);
					if(strLQLinkURL.length>2)
						addLink(eval(strLQLinkURL));
				}
			}catch(e){
			}finally{
				toggleDownloadMenu(true);
			}
		},
		onerror: function (res){
			$("watch-low-quality-download").disabled=false;
			putMobileCompatibleLinks();
			alert("Unable to fetch links. Try again.");
		}
	});
	return false;
}
function addLink(strLink){
	var itag=parseInt(strLink.substr(strLink.indexOf("itag=")+5));
	var itags={
		13 : { type: "video/3gp", resolution:"176x144", quality:"small" },
		17 : { type: "video/3gp", resolution:"176x144", quality:"medium" },
		18 : { type: "video/mp4", resolution:"320x240", quality:"small" }, // to do : need to change quality here
		36 : { type: "video/3gp", resolution:"320x240", quality:"high" }
	};
	if(itags[itag])
		addDownloadLink(strLink, itags[itag].type, itags[itag].resolution, itags[itag].quality);
	else
		addDownloadLink(strLink, "Unknown ("+itag+")", "Unknown ("+itag+")", "Unknown ("+itag+")");
}
function getVidId(){
	var strVidId;
	if(isWatchPage()){
		strVidId=location.search.substring(location.search.indexOf("v=")+2);
	} else if (isUserChannelPage()){
		var divPlayNavCurrentTitle=$("playnav-curvideo-title");
		if(!divPlayNavCurrentTitle)
			return "";
		var aVidLink=divPlayNavCurrentTitle.getElementsByTagName("a");
		if(aVidLink.length==0)
			return "";
		strVidId=aVidLink[0].search.substring(aVidLink[0].search.indexOf("v=")+2);
	}
	if(strVidId.indexOf("&")!=-1)
		strVidId=strVidId.substring(0,strVidId.indexOf("&"));
	return strVidId;
}
function getWatchActionsEl(){
	if(isWatchPage()){
		var divWatchActions=$("watch-actions");
		if(!divWatchActions){
			divWatchActions=$("watch-content");
		}
		if(divWatchActions)
			return divWatchActions;
	} else if (isUserChannelPage()){
		var divPlayNavInfoLine=$("playnav-curvideo-info-line");
		if(divPlayNavInfoLine)
			return divPlayNavInfoLine;
	}
	return null;
}
function toggleDownloadMenu(blForce){
	var divDLContainer=$("watch-download-area-container");
	if(blForce==true || divDLContainer.className=="hid"){
		divDLContainer.className="";
	} else if(blForce==false || divDLContainer.className==""){
		divDLContainer.className="hid";
	}
}
function getDownloadMenu(){
	var tblDownloadMenu=$("table-download-menu");
	if(!tblDownloadMenu){
		var divWatchActions=getWatchActionsEl();
		if(divWatchActions){
			addCSS(""+
				"#watch-download-area-container{margin-bottom:10px;height:auto}"+
				"#watch-download-area{border:1px solid #CCCCCC;padding:5px;position:relative}"+
				"#watch-download-area .close{cursor:pointer;position:absolute;right:5px;top:5px}"+
				"#table-download-menu{width:100%;}"+
				"#table-download-menu td{border:1px solid #E0E0E0;padding:3px 9px}"+
				"#table-download-menu td.bold{font-weight:bold}"+
			"");
		
			var btnDownloadButton=document.createElement("button");
			btnDownloadButton.id="watch-download";
			btnDownloadButton.className="yt-uix-button";
			btnDownloadButton.title="Download this video";
			btnDownloadButton.innerHTML="<span class=\"yt-uix-button-content\">Download</span>";
			if(btnDownloadButton.addEventListener)
				btnDownloadButton.addEventListener("click", toggleDownloadMenu, false);
			else if(btnDownloadButton.attachEvent)
				btnDownloadButton.attachEvent("onclick", toggleDownloadMenu);
			divWatchActions.appendChild(btnDownloadButton);
			
			var divDownloadContainer=document.createElement("div");
			divDownloadContainer.id="watch-download-area-container";
			divDownloadContainer.className="hid";
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
			if($("watch-download-close").addEventListener)
				$("watch-download-close").addEventListener("click", toggleDownloadMenu, false);
			else if($("watch-download-close").attachEvent)
				$("watch-download-close").attachEvent("onclick", toggleDownloadMenu);
				
			tblDownloadMenu=$("table-download-menu");
		}
	}
	return tblDownloadMenu;
}
function getType(type){
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
		case "3gp":
			type="3GP";
			break;
	}
	return type;
}
function getHeight(resolution){
	if(resolution.indexOf("x")!=-1)
		resolution=resolution.substring(resolution.indexOf("x")+1)+"p";
	return resolution;
}
function maintainTableCells(tblTable){
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
}
function addDownloadLink(url, type, resolution, quality){
	var tblMenu=getDownloadMenu();
	if(!tblMenu){
		notifyUser("This interface is not supported. Kindly report to 'Another YouTube Downloader' script author.");
		return;
	}
	var strHType=getType(type);
	var strHHeight=getHeight(resolution);
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
	maintainTableCells(tblMenu);
	var strNewLink=url;
	if(getVideoTitle()!="")
		strNewLink=url+"&title="+escape(getVideoTitle());
	else
		strNewLink=url;
	var tdCell=tblMenu.rows[intTypeIndex].cells[intHeightIndex];
	tdCell.innerHTML=""+
		"<a href=\""+strNewLink+"\" title=\""+resolution+", "+type.replace(/\"/g,"'")+", "+quality+" quality\">Download</a>"+
	"";
	
	if(blHelperInstalled){
		tdCell.appendChild(document.createTextNode(" ("));
		
		var aFileSizeLink=document.createElement("a");
		aFileSizeLink.href="javascript:void(0);"
		aFileSizeLink.setAttribute("url",url);
		aFileSizeLink.addEventListener("click",fetchFileSize,false);
		aFileSizeLink.innerHTML="?";
		aFileSizeLink.title="Find file size of this download link";
		tdCell.appendChild(aFileSizeLink);
		
		tdCell.appendChild(document.createTextNode(")"));
		
	}
}
function fetchFileSize(){
	var me=this;
	var url=me.getAttribute("url");
	me.innerHTML="...";
	me.title="Loading...";
	me.removeEventListener("click",fetchFileSize,false);
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
				me.innerHTML="!";
				me.title="Helper application was unable to connect. Check internet settings.";
				me.addEventListener("click",fetchFileSize,false);
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
				
			me.innerHTML=strFileSize;
		},
		onerror: function (res){
			me.innerHTML="!";
			me.title="Unable to fetch file size. Make sure Helper application is running and browser is online.";
			me.addEventListener("click",fetchFileSize,false);
		}
	});
}
function getVideoTitle(){
	var spanEowTitle;
	if(isWatchPage()){
		spanEowTitle=$("eow-title");
		if(spanEowTitle && spanEowTitle.title)
			return spanEowTitle.title;
	} else if (isUserChannelPage()){
		spanEowTitle=$("playnav-curvideo-title");
		if(spanEowTitle && spanEowTitle.textContent)
			return spanEowTitle.textContent.trim();
	}
	return "";
}

function domChanged(){
	setTimeout(function (){
		fetchDownloadLinks();
	},0);
}

function addCSS(css){
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		try{
			node.appendChild(document.createTextNode(css));
		}catch(e){}
		heads[0].appendChild(node); 
	}
}
init();