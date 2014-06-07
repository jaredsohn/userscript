// ==UserScript==
// @name		YouTube Video Link Extractor
// @description	Adds a button to show the URL:s for the video feeds at YouTube and the ability to download them
// @version		2.3
// @icon		https://dl.dropbox.com/u/5448024/web/userscripts/ytvle/ytvle-32.png
// @include		http://www.youtube.com/watch?*
// @include		https://www.youtube.com/watch?*
// @grant		unsafeWindow
// @grant		GM_registerMenuCommand
// ==/UserScript==

try {	//Greasemonkey compatibility
	unsafeWindow;
} catch (e) {
	unsafeWindow=window;
}

unsafeWindow.ytvle=new Object();	//Create the object in normal window
ytvle=unsafeWindow.ytvle;			//Create a reference in GM's safe window for easier referencing

//Create language strings
	ytvle.strings=new Object();
	try {
		ytvle.strings.region=(unsafeWindow.yt.config_.HL_LOCALE ? unsafeWindow.yt.config_.HL_LOCALE : navigator.language);
		ytvle.strings.language=ytvle.strings.region.split("-");
	} catch(e) {
		ytvle.strings.language=["en"];
		try {
			console.warn("Language detection failed:", e, "Defaulting to \"en\"");
		} catch(e) {}
	}
	if (ytvle.strings.language[0]=="sv") {
		ytvle.strings.dlbtn="Ladda ner";
		ytvle.strings.dlurl="H�mtning";
		ytvle.strings.dlget="H�mta";
		ytvle.strings.quality="Kvalitet";
		ytvle.strings.type="Filtyp";
		ytvle.strings.dlnow="Ladda ner videoklipp";
		ytvle.strings.dlnowA="L";
		ytvle.strings.noUrls="Det h�r videoklippet finns inte tillg�ngligt f�r nerladdning.";
	} else {
		ytvle.strings.dlbtn="Download";
		ytvle.strings.dlurl="Download";
		ytvle.strings.dlget="Get";
		ytvle.strings.quality="Quality";
		ytvle.strings.type="File type";
		ytvle.strings.dlnow="Download video";
		ytvle.strings.dlnowA="D";
		ytvle.strings.noUrls="This video is not available for download.";
	}
//Add download button
	if (!ytvle.dlbtn) {
		ytvle.dlbtn=document.createElement("button");
		ytvle.dlbtn.type="button";
		ytvle.dlbtn.className="action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty";
		ytvle.dlbtn.title=ytvle.strings.dlbtn;
		ytvle.dlbtn.setAttribute("data-trigger-for", "action-panel-download");	//Setting element.dataset doesn't seem to work
		ytvle.dlbtn.setAttribute("data-button-toggle", "true");
		ytvle.dlbtn.innerHTML='<span class="yt-uix-button-content/icon-wrapper"><img alt="'+ytvle.strings.dlbtn+'" src="https://dl.dropbox.com/u/5448024/Web/userscripts/ytvle/dl.png" class="yt-uix-button-icon" /></span>';
		ytvle.dlbtnspan=document.createElement("span");
		ytvle.dlbtnspan.appendChild(ytvle.dlbtn);
		document.getElementById("watch7-secondary-actions").insertBefore(ytvle.dlbtnspan, document.getElementById("watch7-secondary-actions").children[3]);
	}
//Create styles
	ytvle.style=document.createElement("style");
	ytvle.style.innerHTML="#action-panel-download td { padding-top: 6px; display: table-cell; } #action-panel-download input { width: 400px; font-size: 90% } #action-panel-download td:not(:nth-child(1)),#action-panel-download th { padding-right: 0.4em; }";
	ytvle.style.type="text/css";
	document.head.appendChild(ytvle.style);
//Add button listener
	ytvle.showLinks=function() {
		if (ytvle.dlbtn.classList.contains("yt-uix-button-toggled")) {
			if (!ytvle.panel) {
				ytvle.panel=document.createElement("div");
				ytvle.panel.id="action-panel-download";
				ytvle.panel.className="action-panel-content";
				if (!ytvle.urls)
					ytvle.getUrls();
				if (ytvle.raw.length!=1 || ytvle.raw[0]!="") {
					var tbody="";
					for (var i=0; i<ytvle.urls.length; i++) {
						url=ytvle.urls[i];
						tbody+='<tr><td><input type="text" class="yt-uix-form-input-textarea" value="'+url.url.replace(/"/g, "&quot;")+'" readonly="readonly" onfocus="ytvle.urlFocused(this)" /><td><button type="button" class="yt-uix-button yt-uix-button-default yt-uix-button-hh-default" data-ytvle-url="'+i+'" onclick="ytvle.download(this)">'+ytvle.strings.dlget+'</button></td><td class="yt-uix-tooltip" title="itag='+url.itag+'">'+url.quality+'</td><td class="yt-uix-tooltip" title="'+(url.codecs ? "codecs="+url.codecs.replace(/"/g, "&quot;") : "")+'">'+url.type+'</td>';
					}
					ytvle.panel.innerHTML='<table><thead><th colspan="2">'+ytvle.strings.dlurl+'</th><th>'+ytvle.strings.quality+'</th><th>'+ytvle.strings.type+'</th></thead><tbody>'+tbody+'</tbody></table>';
				} else {
					ytvle.panel.innerHTML=ytvle.strings.noUrls;
				}
				document.getElementById("watch7-action-panels").insertBefore(ytvle.panel, document.getElementById("action-panel-stats"));
			}
			var panels=document.getElementById("watch7-action-panels").children;
			for (var i=0; i<panels.length; i++) {
				if (panels[i].classList.contains("action-panel-content"))
					panels[i].classList.add("hid");
			}
			ytvle.panel.classList.remove("hid");
			ytvle.panel.style.display="";
		} else if (ytvle.panel)
			ytvle.panel.classList.add("hid");
	};
	ytvle.showLinksD=function() {
		setTimeout(ytvle.showLinks, 10);
	}
	document.getElementById("watch7-action-buttons").addEventListener("click", ytvle.showLinksD, false);	//Use deleyed function because showLinks checks for class changes not made yet
//Extract URLs
	ytvle.getUrls=function () {
		ytvle.urls=new Array();
		ytvle.Url=function(urlChunk, urlNum) {
			this.rawParams=urlChunk.split("&");
			for (var i=0; i<this.rawParams.length; i++) {
				var param=this.rawParams[i].split("=");
				param[1]=decodeURIComponent(param[1]);
				switch(param[0]) {
					case "itag":
						this.itag=param[1];
						break;
					case "url":
						this.url=param[1];
						break;
					case "type":
						this.type=param[1].split(";");
						if (this.type.length>=2)
							this.codecs=this.type[1].split("=")[1];
						this.type=this.type[0];
						break;
					//case "fallback_host":
					//	break;
					case "sig":
						this.signature=param[1];
						break;
					case "quality":
						this.quality=param[1];
				}
			}
			this.url+="&signature="+this.signature;
		};
		ytvle.raw=unsafeWindow.ytplayer.config.args.url_encoded_fmt_stream_map.split(",");
		for (var i=0; i<ytvle.raw.length; i++) {
			var url=new ytvle.Url(ytvle.raw[i], i);
			if (url.url)
				ytvle.urls.push(url);
		}
		return ytvle.urls;
	};
//Add event handles for the URL and download elements
	ytvle.urlFocused=function (e) {
		e.select();
	};
	ytvle.download=function (e) {
		location.href=ytvle.urls[e.dataset.ytvleUrl].url+"&title="+encodeURIComponent(unsafeWindow.ytplayer.config.args.title);
	};
//Register GM command
	ytvle.downloadNow=function() {
		if (!ytvle.urls)
			ytvle.getUrls();
		var getRank=function(url) {
			var rank=0;
			switch(url.quality) {
				case "highres":
					rank=50; break;
				case "hd1080":
					rank=40; break;
				case "hd720":
					rank=30; break;
				case "large":
					rank=20; break;
				case "medium":
					rank=10;
			}
			switch(url.type) {
				case "video/mp4":
					rank+=3; break;
				case "video/webm":
					rank+=2; break;
				case "video/flv":
					rank+=0; break;
				default:
					rank+=1;
			}
			url.rank=rank;
			return rank;
		}
		var best=new Object();
		best.id=-1;
		best.rank=-1;
		for (var i=0; i<ytvle.urls.length; i++) {
			var rank=getRank(ytvle.urls[i]);
			if (rank>best.rank) {
				best.id=i;
				best.rank=rank;
			}
		}
		if (best.id>-1) {
			location.href=ytvle.urls[best.id].url+"&title="+encodeURIComponent(unsafeWindow.ytplayer.config.args.title);
		}
	}
	try {
		GM_registerMenuCommand(ytvle.strings.dlnow, ytvle.downloadNow, ytvle.strings.dlnowA);
	} catch (e) {
		console.warn("Could not register GM menu handler. This is normal if run outside of Greasemonkey.", e);
	}