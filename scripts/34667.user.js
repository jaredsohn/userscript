// ==UserScript==
// @name		YouTube Downloader
// @author		Bret McDanel http://www.0xdecafbad.com
// @version		20081002.12
// @description		Creates a download link for youtube videos
// @include		*youtube.com/*
// @contributors        gmc
// @contributors        Imspiratio
// ==/UserScript==

(function(){
	// === Global Variables ===
	var Version = "20081002.12";
	var script_url = "http://userscripts.org/scripts/review/34667?format=txt";
	var install_url = "http://userscripts.org/scripts/source/34667.user.js";
	
	GM_setValue("version",Version);
	
	// === The Images ===
	var closeImage = "data:image/png;base64," +
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A" +
		"/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gKAQ4mCAcubToAAAL5SURBVDjL" +
		"bVO9j1RVHD33vq/Z3dk3gskuQdgFqgWjlY2rRGLilhbGwthoYYyN/4kVCTSaTGGBJCZEEY2JLkHB" +
		"QqOF2RjBiMO++XrDzJuZN7yPe+/v3p+FGwLEU53inNOccwSeQDpMn2eBD6IwfEMIsc7MgECia/VF" +
		"WZXnT5489Rf+D71eLx4PR+2iLLW1xNY5ds4xOWKyhslaLspCpcNxu5f048fM/X43zrLsW02KjSWe" +
		"l5odWbbOsrOOiYjn6r8gY2rOsuz6YH8YA4AEAN8PL6w2mzuAxK1kim96U/wxXUA4wMHhdl7hl9kD" +
		"/JkrwAsQN1fOyci7AAAi2e+9dHjt0I0oiLz2Xh+fpRLbx1o4ERq83JIgKXFbSbQaIQKncFgytlpL" +
		"0Fq7yWTymu8HeKsRhN5CEz75/R5+lcfxc5lj+8hTyFjDlwJ+2EBeCzT9CP1ZjlOrAaIokoEXvClm" +
		"0/mw2WquOwf8lEzw3o0O7i4fhQwa2IhD7Bxdxoov0PItYpXjbBzi2bUlBMJDns9TCcHrnpAIPIkX" +
		"jx3Cx68cxzNqAmsNOguDK0mNpLLQ+QLbcYDn1lYQSAkhAADrB4zBzPCkgIQHIQChKzApjJTBD2mF" +
		"BSRWfIIPBz5oTwgBn4hGzLzGEPjx3hjv7t5F162CIw0BCYAxMj6uYAnWMt4XFc48vQxAgoim0pK9" +
		"yuygiPDRzT30C4YwD+DXCmdohI15F8LUGM5n+DplXL4zhrUCzAxL9pLUpC/Xde0C4eHDF7awFeSA" +
		"1TjtzXDx7Aba5zZxohzClQrN6j5ePRKDpYVSNVV11T7Y/2BXa82lNvzlXpdf//Q7vvXPmJUhVkT8" +
		"/d8p71y6ydfuDFhpy9oYTtP0q0em3I+zLLumqeJaGx6VirW17CwzOcPKWB7UipUhNkbzeDy+3ul0" +
		"Hv9DkiRxOri/WxSlJSJ2zjE7x5aZnXVsreWiKHSapleTJHloFk++spvs7wSB/04QNd4WQgAMQLjC" +
		"1ObzSqnzm5ubvz2q/xesLe0otau2OAAAAABJRU5ErkJggg==";
	
	// === The Translations ===
	var defaultLanguage = "en";
	var translation = {
		'en':{
			'download':	'Download: ',
			'lowFlv':	'FLV(low)',
			'highFlv':	'FLV(high)',
			'mp4':		'mp4(best)',
			'new_ver':	'New Version of Youtube Downloader is available',
			'update':	'Update now',
			'remind':	'Remind me later',
			'ignore':	'Dont bother me again',
			'enableComments': 'Enable Comments',
			'disableComments': 'Disable Comments',
		},
		'nl':{
			'download':	'Downloaden: ',
			'lowFlv':	'FLV(lage)',
			'highFlv':	'FLV(hoge)',
			'mp4':		'mp4(beste)',
			'new_ver':	'Er is een nieuwe versie van Youtube Downloader beschikbaar',
			'update':	'Nu updaten',
			'remind':	'Herinner me later',
			'ignore':	'Stoor mij niet meer',
			'enableComments': 'opmerkingen inschakelen',
			'disableComments': 'opmerkingen uitschakelen',
		},
	};
	
	
	// === Standard Toolbox functions ===
	function isDefined(x) { return (typeof x != 'undefined' && x != null && x !== null); }
	
	// === The Code ===
	function getLanguage() {
		// first try to find the youtube language for best blending
		var language=unsafeWindow.ytLocale;
		if(isDefined(language)) {
			language = language.substr(0,2);
			if(isDefined(translation[language])) {
				return language;
			}
		}
		
		// next try the browser default language
		language=String.substr(window.navigator.language,0,2);
		if(isDefined(language) && isDefined(translation[language])) {
			return language;
		}
		
		if(isDefined(translation[defaultLanguage])) {
			return defaultLanguage;
		}
		
		// punt! return the first language defined
		for (var key in translation) {
			return key;
		}
		
	}
	
	
	function doUpdate() {
		top.location.href=install_url;
		closePane(updatePane);
	}
	
	function doIgnore() {
		GM_setValue('ignoreUpdates',true);
		closePane(updatePane);
	}
	
	function doRemind() {
		var today = (new Date()).getDay();
		GM_setValue('lastCheck',today);
		closePane(updatePane);
	}
	
	
	
	function buildUpdate() {
		var updatePane = document.createElement("div"); // this holds it all
		updatePane.setAttribute("style",
								"margin: 3em 15%; width: 70%; position: fixed; " +
								"top: 0; left: 0; border: thin solid black; " +
								"color: black; background: #ffc; opacity: 0.9; " +
								"-moz-border-radius: 10px; font-size: 12pt; " +
								"z-index: 99999; padding: 6px; display: none; " +
								"font-family: Arial, sans-serif;");
        updatePane.setAttribute("id", "youtube_downloader_update");
		
		// build a table to place the info in
		var table = document.createElement("table");
        table.setAttribute("style",
                           "width: 100%; margin: 5px; padding: 5px; " +
                           "border-spacing: 0;");
        table.setAttribute("id", "youtube_downloader_update_table");
        updatePane.appendChild(table);
		
		// build title bar
        var caption = document.createElement("caption");
        caption.setAttribute("style", "width: 100%; text-align: left");
        strong = document.createElement("strong");
		
		// close button
        var close = document.createElement("img");
        close.setAttribute("src", closeImage);
        close.setAttribute("style", "float: right; vertical-align: top; " +
                           "margin: 2px; width: 12px; height: 12px; " +
                           "background-color: #ffb; border: none;");
        close.setAttribute("title", "Click To Remove");
        close.setAttribute("id", "youtube_downloader_config_close");
		close.setAttribute('onclick','return false;');
        close.addEventListener('click',
                               function(e) { closePane(updatePane); },
                               false);
        strong.appendChild(close);
        strong.appendChild(document.createTextNode(translation[lang]['new_ver']));
        caption.appendChild(strong);
        table.appendChild(caption);
		
		// add the update info
		var row = document.createElement("tr");
		var cell = document.createElement("td");
        cell.setAttribute("style","width: 33%; text-align: center; padding-right: 3px");
		var link = document.createElement("a");
		link.href = "";
		link.setAttribute('onclick','return false;');
		link.addEventListener('click',function(e) { doUpdate(); }, false);
		link.style.textDecoration = "none";
		var txt   = document.createTextNode(translation[lang]['update']);	
		link.appendChild(txt);
		cell.appendChild(link);
		row.appendChild(cell);
		
		// remind me later
		var cell = document.createElement("td");
        cell.setAttribute("style","width: 33%; text-align: center; padding-right: 3px");
		var link = document.createElement("a");
		link.href = "";
		link.setAttribute('onclick','return false;');
		link.addEventListener('click',function(e) { doRemind(); }, false);
		link.style.textDecoration = "none";
		var txt   = document.createTextNode(translation[lang]['remind']);	
		link.appendChild(txt);
		cell.appendChild(link);
		row.appendChild(cell);
		
		// stop bothering me
		var cell = document.createElement("td");
        cell.setAttribute("style","width: 33%; text-align: center; padding-right: 3px");
		var link = document.createElement("a");
		link.href = "";
		link.setAttribute('onclick','return false;');
		link.addEventListener('click',function(e) { doIgnore(); }, false);
		link.style.textDecoration = "none";
		var txt   = document.createTextNode(translation[lang]['ignore']);	
		link.appendChild(txt);
		cell.appendChild(link);
		row.appendChild(cell);
		table.appendChild(row);
		
		updatePane.appendChild(table);
		return updatePane;
	}
	
	
	function closePane(pane) {
		pane.style.display = 'none';
	}
	
	
	function checkVersion() {
		var lastCheck = GM_getValue("lastCheck");
		var today = (new Date()).getDay();
		
		if(isDefined(lastCheck)) {
			GM_setValue("lastCheck",today);
			return;
		}
		
		if(lastCheck != today) {
			GM_xmlhttpRequest({ 
				method:"GET",url:script_url,
						onload:function(result) {
						var script = result.responseText;
						var script_ver = script.match(/version\W+([^\n]*)/)[1];
						if(Version < script_ver) {
							var updatePane = buildUpdate();
							var body = document.getElementsByTagName("body");
							body[0].appendChild(updatePane);
							updatePane.style.display = 'block'; // set it visible
						}
					}
				});
			GM_setValue("lastCheck",today);
		}
	}

	function deleteComments() {
		var comments = document.getElementById('watch-comments-stats');
		if(isDefined(comments)) comments.parentNode.removeChild(comments);
	}

	function addDownloadLinks() {
		var video_id;
		var t;
		var scripts = document.getElementsByTagName('script');
		for(var i=0; i < scripts.length; i++) {
			// I cant get the value of this, always comes back undefined
			// even if I post load so I just get the data another way
			if(scripts[i].innerHTML.indexOf('var\ swfArgs') != -1) {
				video_id = scripts[i].innerHTML.match(/"video_id": "([^"]*)"*/)[1];
		        t = scripts[i].innerHTML.match(/"t": "([^"]*)"*/)[1];
			}
		}
		
		
		// print out the link above the video
		if(t!="" && video_id!="") {
			p = document.createElement("div");
			p.setAttribute("style","float: left;");
			/*
						   "margin: 3em 15%; position: fixed; " +
						   "top: 0; left: 0; border: thin solid black; " +
						   "color: black; background: #ffc; opacity: 0.9; " +
						   "-moz-border-radius: 10px; font-size: 12pt; " +
						   "z-index: 99999; padding: 6px; display: none; " +
						   "font-family: Arial, sans-serif;");
			*/
			p.setAttribute("id", "watch-high-quality-link");

			var txt   = document.createTextNode(translation[lang]['download']);
			txt.className = 'hLink';
			p.appendChild(txt);
			
			// fmt=0  -> flv: 320x200 (flv1) / mp3
			var link  = document.createElement("a");
			link.href = "/get_video?fmt=0&video_id="+video_id+"&t="+t;
			link.className = 'hLink';
			link.style.textDecoration = "none";
			var txt   = document.createTextNode(translation[lang]['lowFlv']);
			link.appendChild(txt);
			p.appendChild(link);
			p.appendChild(document.createTextNode(" "));
			
			// fmt=6  -> flv: 480x360 (flv1) / mp3
			if(document.getElementById("watch-video-quality-setting")) {
				var link  = document.createElement("a");
				link.href = "/get_video?fmt=6&video_id="+video_id+"&t="+t;
				link.className = 'hLink';
				link.style.textDecoration = "none";
				var txt   = document.createTextNode(translation[lang]['highFlv']);	
				link.appendChild(txt);
				p.appendChild(link);
				p.appendChild(document.createTextNode(" "));
			}
			
			// fmt=18 -> mp4: 480x360 (H264) / AAC
			var link  = document.createElement("a");
			link.href = "/get_video?fmt=18&video_id="+video_id+"&t="+t;
			link.className = 'hLink';
			link.style.textDecoration = "none";
			var txt   = document.createTextNode(translation[lang]['mp4']);	
			link.appendChild(txt);
			p.appendChild(link);
			p.appendChild(document.createTextNode(" "));
			

			if (/watch/.test(window.location.href)) {
				document.getElementById('watch-player-div').appendChild(p);
			} else if(/user\//.test(window.location.href)) {
				document.getElementById('profile-player-div').appendChild(p);
			}

		}
	}


	function toggleComments() {
		var deleteComments = GM_getValue('deleteComments',false);
		if(deleteComments) {
			GM_registerMenuCommand("Youtube Downloader - " + translation[lang]['enableComments'],function() {
					GM_setValue('deleteComments',!deleteComments);
					location.reload();
				});
		} else {
			GM_registerMenuCommand("Youtube Downloader - " + translation[lang]['disableComments'],function() {
					GM_setValue('deleteComments',!deleteComments);
					location.reload();
				});
		}
	}


	
	// === The Program ===
	var lang = getLanguage();
	if(!GM_getValue('ignoreUpdates',false)) {
		// be nice and wait 1 second before checking
		setTimeout(checkVersion,1000);
	}

	if(GM_getValue('deleteComments',false)) {
		deleteComments();
	}

	addDownloadLinks();
	toggleComments(); 	// add the delete comment command to the menu

 })();
/* For Emacs:
 * Local Variables:
 * mode:c
 * indent-tabs-mode:t
 * tab-width:4
 * c-basic-offset:4
 * End:
 * For VIM:
 * vim:set softtabstop=4 shiftwidth=4 tabstop=4:
 */
