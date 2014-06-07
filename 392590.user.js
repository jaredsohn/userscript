// ==UserScript==
// @name        YouTube Video Link Extractor [FORK]
// @description Adds a button to show the URL:s for the video feeds at YouTube and the ability to download them OR open pass it to embedded Player like VLC / Quicktime
// @version     2.6
//                  base on YouTube Video Link Extractor By AndreasSE93 Version 2.5 [Dec 4, 2013]
// @icon        https://dl.dropbox.com/u/5448024/web/userscripts/ytvle/ytvle-32.png
// @match       *://*.youtube.com/watch?*
// @grant       unsafeWindow
// @grant       GM_registerMenuCommand
// @downloadURL   http://userscripts.org/scripts/show/392590
// ==/UserScript==
//
// fork by Djamana 23.02.13

debugger;

function $(e) {
    return document.getElementById(e)
}

function $_create(e) {
    return document.createElement(e)
}


if (!window.console)
	window.console={warn: function() {}};

try {	//Greasemonkey compatibility
	unsafeWindow;
} catch (e) {
	unsafeWindow=window;
}

unsafeWindow.ytvle = new Object();	//Create the object in normal window
ytvle=unsafeWindow.ytvle;	//Create a reference in GM's safe window for easier referencing

//Create language strings
	try {
       
        ytvle= {
                strings : {
                
                    region		: unsafeWindow.yt.config_.HL_LOCALE ? 
                                            unsafeWindow.yt.config_.HL_LOCALE : 
                                            navigator.language ,
                
                    language	: ["en"]
                }
        }
        
        ytvle.strings.language = ytvle.strings.region.split("-");
            
	} catch(e) {
//		ytvle.strings.language=["en"];
        
		console.warn("Language detection failed:", e, "Defaulting to \"en\"");
	}
	if (ytvle.strings.language[0]=="sv") {
	
        ytvle.strings = {
			dlbtn   : "Ladda ner" ,
			ytvle   : "Hämtning",
            dlget   : "Hämta",
			quality : "Kvalitet",
			type 	: "Filtyp",
			dlnow 	: "Ladda ner videoklipp",
			dlnowA 	: "L",
			noUrls 	: "Det här videoklippet finns inte tillgängligt för nerladdning."
		}
			
	} else {
		ytvle.strings = {
			dlbtn 	: "Download",
			dlurl 	: "Download",
			dlget 	: "Get",
			quality : "Quality",
			type 	: "File type",
			dlnow 	: "Download video",
			dlnowA 	: "D",
			noUrls 	: "This video is not available for download."
		}
	}
//Add download button
	if (!ytvle.dlbtn) {
        
		ytvle.dlbtn=$_create("button");
		ytvle.dlbtn.type="button";
		ytvle.dlbtn.className="action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty";
		ytvle.dlbtn.title=ytvle.strings.dlbtn;
		ytvle.dlbtn.setAttribute("data-trigger-for", "action-panel-download");	//Setting element.dataset doesn't seem to work
		ytvle.dlbtn.setAttribute("data-button-toggle", "true");
		ytvle.dlbtn.innerHTML='<span class="yt-uix-button-content/icon-wrapper"><img alt="' + ytvle.strings.dlbtn + 
            				  '" src="https://dl.dropbox.com/u/5448024/Web/userscripts/ytvle/dl.png" class="yt-uix-button-icon" /></span>';
        
		ytvle.dlbtnspan=$_create("span");
		ytvle.dlbtnspan.appendChild(ytvle.dlbtn);
        
		$( "watch7-secondary-actions")
        		.insertBefore( ytvle.dlbtnspan, 
                  			   $("watch7-secondary-actions").children[3]);
                               
        
 /*       ytvle2.dlbtn=$_create("button");
		ytvle2.dlbtn.type="button";
		ytvle2.dlbtn.className="action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-tooltip yt-uix-button-empty";
		ytvle2.dlbtn.title="Open in BetterPlayer";
		ytvle.dlbtn.setAttribute("data-trigger-for", "action-panel-download");	//Setting element.dataset doesn't seem to work
		ytvle2.dlbtn.setAttribute("data-button-toggle", "true");
        ytvle.getUrls();
		ytvle2.dlbtn.innerHTML='<a href="' +  ytvle.urls[1].url.replace(/"/g, "&quot;") + '"><img alt="' + ytvle.strings.dlbtn + 
            				  '" src="https://dl.dropbox.com/u/5448024/Web/userscripts/ytvle/dl.png" class="yt-uix-button-icon" /></span>';
        
		ytvle2.dlbtnspan=$_create("span");
		ytvle2.dlbtnspan.appendChild(ytvle2.dlbtn);
        */
	}
 // Create styles
	ytvle.style=$_create("style");
	ytvle.style.innerHTML = "\
#action-panel-download td { padding-top: 6px; display: table-cell; } \
#action-panel-download input { width: 400px; font-size: 90% } \
#action-panel-download td:not(:nth-child(1)), \
#action-panel-download th { padding-right: 0.4em; } \
";
	ytvle.style.type="text/css";
	document.head.appendChild(ytvle.style);

 // Add button listener
	ytvle.showLinks=function() {
        
		if (ytvle.dlbtn.classList.contains("yt-uix-button-toggled")) {
            
			if (!ytvle.panel) {
				ytvle.panel=$_create("div");
				ytvle.panel.id="action-panel-download";
				ytvle.panel.className="action-panel-content";
                
				if (!ytvle.urls)
					ytvle.getUrls();
                
				if (ytvle.raw.length != 1 || 
                    ytvle.raw[0]     != "" ) {
                    
					var tbody="";
                    
					for (var i = 0; i < ytvle.urls.length; i++) {
                       
						url = ytvle.urls[i];
						tbody += '\
                                    <tr>\
                                    <td><input type="text" \
                                        class="yt-uix-form-input-textarea" \
                                        value=" ' + url.url.replace(/"/g, "&quot;") + '" \
                                        readonly="readonly" \
                                        onfocus ="ytvle.urlFocused(this)" />\
                                    <td> \
                                        <button type="button" \
                                            class="yt-uix-button yt-uix-button-default yt-uix-button-hh-default" \
                                            data-ytvle-url="' + i + '" \
                                            onclick="ytvle.download(this)">' +ytvle.strings.dlget + '\
                                        </button>\
                                    </td>\
                                    <td class="yt-uix-tooltip" \
                                        title="itag=' + url.itag + '">' + url.quality + '</td>\
                                    <td class="yt-uix-tooltip" \
                                        title="' + (url.codecs ? " \
                                        codecs=" + url.codecs.replace(/"/g, "&quot;") : "") + '">\
                                        <a onclick="ytvle.Open(\'' + url.url.replace(/"/g, "&quot;")  + '\', \'' + url.type + '\')" href="#" >' + url.type + '</a>\
                                    </td> \
                                    ';
                        
					}
                    ytvle.panel.innerHTML='<table><thead><th colspan="2">' + 
                    ytvle.strings.dlurl + '</th><th>' + 
                    ytvle.strings.quality + '</th><th>' + 
                    ytvle.strings.type + '</th></thead><tbody>' + tbody + '</tbody></table>';
                    
				} else {
					ytvle.panel.innerHTML=ytvle.strings.noUrls;
				}
				$("watch7-action-panels").insertBefore(ytvle.panel, $("action-panel-stats"));
			}
			var panels=$("watch7-action-panels").children;
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
    
 // Use delayed function because .showLinks checks for class changes not made yet
	$("watch7-action-buttons").addEventListener("click", ytvle.showLinksD, false);	


//Extract URLs
	ytvle.getUrls=function () {
        
		ytvle.urls=new Array();
        
		ytvle.Url=function(urlChunk, urlNum) {
			this.rawParams=urlChunk.split("&");
			for (var i=0; i<this.rawParams.length; i++) {
                
				var param= this.rawParams[i].split("=");
                
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
						this.signature = param[1];
						break;
                        
					case "quality":
						this.quality = param[1];
				}
			}
			this.url += "&signature=" + this.signature;
		};
        
		ytvle.raw = unsafeWindow.ytplayer.config.args.
        			url_encoded_fmt_stream_map.split(",");
        
		for (var i=0; i<ytvle.raw.length; i++) {
            
			var url=new ytvle.Url(ytvle.raw[i], i);
            
			if (url.url)
				ytvle.urls.push(url);
		}
		return ytvle.urls;
	};


//Get title and replace illegal filename characters

	ytvle.getFileName=function() {
        
		var filename=unsafeWindow.ytplayer.config.args.title;
        
		filename=filename.replace("/", "\u2215", "g");	//DIVISION SLASH
		if (navigator.platform.indexOf("Win")!=-1 || 
            navigator.platform.indexOf("Mac")!=-1) {
			filename=filename.replace(" : ", " - ", "g");
			filename=filename.replace(": ", " - ", "g");
			filename=filename.replace(":", "-", "g");
		}
		if (navigator.platform.indexOf("Win")!=-1) {
			while (filename.indexOf("\"")!=-1) {
				filename=filename.replace("\"", "\u201C");	//LEFT DOUBLE QUOTATION MARK
				filename=filename.replace("\"", "\u201D");	//RIGHT DOUBLE QUOTATION MARK
			}
			filename=filename.replace("\"", "'", "g");
			filename=filename.replace("*", "\u2217", "g");	//ASTERISK OPERATOR
			filename=filename.replace("<", "\uFF1C", "g");	//FULLWIDTH LESS-THAN SIGN
			filename=filename.replace(">", "\uFF1E", "g");	//FULLWIDTH GREATER-THAN SIGN
			filename=filename.replace("?", "\uFF1F", "g");	//FULLWIDTH QUESTION MARK
			filename=filename.replace("\\", "\u2216", "g");	//SET MINUS
			filename=filename.replace(" | ", " - ", "g");
			filename=filename.replace("|", " - ", "g");
		}
		return filename;
	}
//Add event handles for the URL and download elements
	ytvle.urlFocused=function(e) {
		e.select();
	};
	ytvle.download=function(e) {
		location.href = ytvle.urls[e.dataset.ytvleUrl].url
        				.replace("http:", location.protocol)+
            			"&title="+encodeURIComponent(ytvle.getFileName());
	};

ytvle.Open = function(url, type) {

	var NewDoc = 'Please Wait - if video is high quality loading might take 10-20 seconds ... | <a onclick= "self.close()" href="#"  >close</a> with <b>ctrl + w</b>  | Fullscreen - F11'
        NewDoc += '<embed width="100%" height="100%" name="plugin" \
                      src="' + url + '" type="' + type + '"> </embed>'
    var w = window.open( url );
    w.document.write( NewDoc )
    
    var myPlayer = document.getElementById('playerid');
	myPlayer.stopVideo();
}

//Register GM command

	ytvle.downloadNow=function() {
        
		if (!ytvle.urls)
			ytvle.getUrls();
        
		var getRank = function(url) {
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
			location.href=ytvle.urls[best.id].url
            	.replace("http:", location.protocol)+"&title="
            	+ encodeURIComponent(ytvle.getFileName());
		}
	}
	try {
		GM_registerMenuCommand(ytvle.strings.dlnow, ytvle.downloadNow, ytvle.strings.dlnowA);
	} catch (e) {
		console.warn("Could not register GM menu handler. This is normal if run outside of Greasemonkey.", e);
	}