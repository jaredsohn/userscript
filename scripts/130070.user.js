// ==UserScript==
// @name           Drawception Extended Colors Pallet
// @creator        Draco18s
// @svc:version    [3.1]
// @version        3.1
// @namespace      http://www.drawception.com/*
// @include        http://drawception.com/play/*
// @description    Adds an additional 16 color swatches, including 1 dynamic one (alterable via hex value entry), and a quick text-entry tool (parameters are the text, it's x and y location in pixels (from the upper left corner) and the font size).  Now automagically finds the right div!
// ==/UserScript==
		
	var EnableText = true;  //change to false to disable text tool.
		
	function getElement( name ) {
		if( unsafeWindow.document.getElementById )
			elem = unsafeWindow.document.getElementById( name );
		else if( unsafeWindow.document.all )
		  elem = unsafeWindow.document.all[name];
		else if( unsafeWindow.document.layers )
			elem = unsafeWindow.document.layers[name];
		return elem;
	}
	
	function setup() {
		window.setTimeout(addColors, 50);
	}
	
	function highlightTimer(s) {
		s--;
		if(String(s) != "NaN") {
			unsafeWindow.setTimeout(function(){highlightTimer(s)},970);
			var m = Math.floor(s/60);
			var q = s % 60;
			if(m < 10) {
				m = "0" + m;
			}
			if(q < 10) {
				q = "0" + q;
			}
			getElement("timeleft").innerHTML = "<span class=\"countdown_row countdown_amount\">"+m+":"+q+"</span>";
		}
	}
	
	function addColors() {
		var findNode = 1;
		var form = getElement("gameForm");
		form.style.width = "570px";
		
		var re5 = /<a id="play-submit" class="btn btn-large btn-primary no-select button-form" value="Submit!" onclick="confirmPanelSubmit\(true\);">Submit!<\/a>/
		if(re5.test(form.innerHTML)) {
			form.innerHTML = form.innerHTML.replace(re5,'<a id="play-submit" class="btn btn-large btn-primary no-select button-form" value="Submit!" onclick="apprise(\'Ready to submit this panel?\', {verify: true}, function (t) {t && (e === undefined ? savePanelDrawing() : savePanelDrawing(true));})">Submit!<\/a>');
		}
		else {
			alert("Failed to find submit button.  Aborting changes.\nPlease alert the developer to this issue, draco18s@gmail.com");
		}
		
		var div;
		var val = 2;
		if(navigator.appName.indexOf("Microsoft") != -1) {
			val = 1;	
		}
		do { 
			div = form.childNodes[findNode];
			findNode+=val;
		} while(div.innerHTML.indexOf("DRAW THIS PHRASE") == -1);
		if(findNode > form.childNodes.length) {
			alert("Something went wrong: unable to locate proper div.\nAlert the developer, draco18s@gmail.com");
			return;
		}
		
		var timeleft=unsafeWindow.jQuery("#timeleft").text();
		var ar = timeleft.split(":");
		var saa;
		if(ar[0] == "10") {
			saa = 600;
		}
		else {
			saa = parseInt(ar[0].substring(1,2))*60 + parseInt(ar[1]);
		}
		if(String(saa) == "NaN") {
			saa = 600;
		}
		unsafeWindow.setTimeout(function(){highlightTimer(saa-1)},970);
		var colorsReplaced = false;
		if(form.innerHTML.indexOf("DRAW THIS PHRASE") > 0) {
			
			var re = /<a class=".+" data-color="#4+" style="background:#4+;" title="Dark Gray"><\/a>\n+(<a class=".+" data-color="#.+" style="background:#.+;( text-align: center;)*" title=".*"><\/a>[\n	+]+)*/;
			
			var rep = "<a class=\"colorPicker\" href=\"#\" onclick=\"drawApp.setColor('#fffdc9');\" style=\"background:#fffdc9; text-align: center;\" title=\"Eraser\"><img src=\"/img/draw_eraser.png\" alt=\"eraser\" style=\"margin-top: 5px;\" height=\"20\" width=\"20\"></a><a style='background:#6c4200;' onclick=\"drawApp.setColor('#6c4200');\" href='#' class='colorPicker'></a><a style='background:#c69c6d;' onclick=\"drawApp.setColor('#c69c6d');\" href='#' class='colorPicker'></a><a style='background:#ffdab9;' onclick=\"drawApp.setColor('#ffdab9');\" href='#' class='colorPicker'></a><a style='background:#800040;' onclick=\"drawApp.setColor('#800040');\" href='#' class='colorPicker'></a><a style='background:#ff0080;' onclick=\"drawApp.setColor('#ff0080');\" href='#' class='colorPicker'></a><a style='background:#ff00ff;' onclick=\"drawApp.setColor('#ff00ff');\" href='#' class='colorPicker'></a><a style='background:#c000ff;' onclick=\"drawApp.setColor('#c000ff');\" href='#' class='colorPicker'></a><a style='background:#c00080;' onclick=\"drawApp.setColor('#c00080');\" href='#' class='colorPicker'></a><a style='background:#800080;' onclick=\"drawApp.setColor('#800080');\" href='#' class='colorPicker'></a><a style='background:#000080;' onclick=\"drawApp.setColor('#000080');\" href='#' class='colorPicker'></a><a style='background:#0000ff;' onclick=\"drawApp.setColor('#0000ff');\" href='#' class='colorPicker'></a><a style='background:#0080ff;' onclick=\"drawApp.setColor('#0080ff');\" href='#' class='colorPicker'></a><a style='background:#008080;' onclick=\"drawApp.setColor('#008080');\" href='#' class='colorPicker'></a><a style='background:#00ffff;' onclick=\"drawApp.setColor('#00ffff');\" href='#' class='colorPicker'></a><a style='background:#00ffa0;' onclick=\"drawApp.setColor('#00ffa0');\" href='#' class='colorPicker'></a><a style='background:#000000;' onclick=\"drawApp.setColor('#000000');\" href='#' class='colorPicker selected'></a><a style='background:#404040;' onclick=\"drawApp.setColor('#404040');\" href='#' class='colorPicker'></a><a style='background:#808080;' onclick=\"drawApp.setColor('#808080');\" href='#' class='colorPicker'></a><a style='background:#bfbfbf;' onclick=\"drawApp.setColor('#bfbfbf');\" href='#' class='colorPicker'></a><a style='background:#ffffff;' onclick=\"drawApp.setColor('#ffffff');\" href='#' class='colorPicker'></a><a style='background:#ff5c80;' onclick=\"drawApp.setColor('#ff5c80');\" href='#' class='colorPicker'></a><a style='background:#ff0000;' onclick=\"drawApp.setColor('#ff0000');\" href='#' class='colorPicker'></a><a style='background:#800000;' onclick=\"drawApp.setColor('#800000');\" href='#' class='colorPicker'></a><a style='background:#c04000;' onclick=\"drawApp.setColor('#c04000');\" href='#' class='colorPicker'></a><a style='background:#ff6600;' onclick=\"drawApp.setColor('#ff6600');\" href='#' class='colorPicker'></a><a style='background:#f1a200;' onclick=\"drawApp.setColor('#f1a200');\" href='#' class='colorPicker'></a><a style='background:#ffd500;' onclick=\"drawApp.setColor('#ffd500');\" href='#' class='colorPicker'></a><a style='background:#ffff00;' onclick=\"drawApp.setColor('#ffff00');\" href='#' class='colorPicker'></a><a style='background:#80ff00;' onclick=\"drawApp.setColor('#80ff00');\" href='#' class='colorPicker'></a><a style='background:#00ff00;' onclick=\"drawApp.setColor('#00ff00');\" href='#' class='colorPicker'></a><a style='background:#008000;' onclick=\"drawApp.setColor('#008000');\" href='#' class='colorPicker'></a><a href='#' onclick=\"drawApp.setColor('#' + document.getElementById('customcolor').value);\" style='background:#123abc' class='colorPicker' id='choose'></a><label><input type='text' onkeyup=\"document.getElementById('choose').style.background = '#' + document.getElementById('customcolor').value;\" maxlength='6' value='123abc' id='customcolor' style='width: 55px;'>Custom</label><style>.colorPicker:not(.eraser) {width:28px !important;height:28px !important;border-radius:50% !important;} .eraser{}</style>"
			
			var rep3 = "<a href='#' onclick=\"drawApp.setColor('#' + document.getElementById('customcolor').value); \" style='background:#123abc; margin-top:3px;' class='colorPicker' id='choose'></a><label style='float:left;'><input type='text' onkeyup=\"document.getElementById('choose').style.background = '#' + document.getElementById('customcolor').value;\" maxlength='6' value='123abc' id='customcolor' style='width: 55px;'>Enter hex value for custom color</label><div style=\"clear:both;\"></div>"
			if(re.test(div.innerHTML)) {
				div.innerHTML = div.innerHTML.replace(re,rep);
				
				var reCol = /<div class="play-colors">/;
				var repCol = '<div class="play-colors" style="width:160px;">';
				
				if(reCol.test(div.innerHTML)) {
					div.innerHTML = div.innerHTML.replace(reCol,repCol);
					colorsReplaced = true
				}
			}
			else {
				div.innerHTML = rep3 + div.innerHTML;
				alert("Color swatch panel has been modified, unable to replace default swatches with custom swatches.\nIf you are using other scripts that add colors, app may be the case.\nIf not contact draco18s@gmail.com as Drawception may have updated, breaking app script.\nSingle dynamic color swatch applied in agnostic mode as fallback.");
			}
			
			var re3 = /(<a class="colorPicker)(" href="#" onclick=".*" style=".*" title="Eraser">.*<\/a>)/;
			if(re3.test(div.innerHTML)) {
				div.innerHTML = div.innerHTML.replace(re3,"$1"+" eraser"+"$2");
			}
			
			var re4 = /<div style="overflow: auto; float: left; margin-top: 2px; width: 80px;">/
			if(re4.test(div.innerHTML)) {
				div.innerHTML = div.innerHTML.replace(re4,"<div style=\"overflow: auto; float: left; margin-top: 2px; width: 160px;\">");
			}
			else {
				
			}
			
		}
		else {
			alert("Unable to modify colors palet. Alert the developer, draco18s@gmail.com");	
		}
		var rep2 = "<div id='customStringFloater' style=\"float:left\"><input type='text' id='customString' onkeyup='document.getElementById(\"text-preview-obj\").innerHTML=document.getElementById(\"customString\").value;document.getElementById(\"text-preview-obj\").style.color = $(\".selected.colorPicker\").css(\"backgroundColor\");' />(<input type='text' id='xpos' maxlemgth='3' style='width: 28px;' value='10' onkeyup='document.getElementById(\"text-preview-obj\").style.left=document.getElementById(\"xpos\").value+\"px\"' /><input type='text' id='ypos' maxlemgth='3' style='width: 28px;' value='10' onkeyup='document.getElementById(\"text-preview-obj\").style.top=parseInt(document.getElementById(\"ypos\").value)-(parseInt(document.getElementById(\"fontsize\").value)-32)*.25+\"px\"' />)<input type='text' id='fontsize' maxlemgth='2' style='width: 18px;' value='14' onkeyup='document.getElementById(\"text-preview-obj\").style.fontSize=document.getElementById(\"fontsize\").value+\"px\";document.getElementById(\"text-preview-obj\").style.top=parseInt(document.getElementById(\"ypos\").value)-(parseInt(document.getElementById(\"fontsize\").value)-32)*.25+\"px\"' />px<a onclick=\"var dc = document.getElementById('drawingCanvas').getContext('2d');dc.font=document.getElementById('fontsize').value+'px Comic Sans MS,Arial';dc.fillStyle = $('.selected.colorPicker').css('backgroundColor');dc.fillText(document.getElementById('customString').value,parseInt(document.getElementById('xpos').value), parseInt(document.getElementById('ypos').value)+parseInt(document.getElementById('fontsize').value)*.75);document.getElementById('customString').value='';document.getElementById('text-preview-obj').innerHTML='';\" class='brushPicker' style='float:right;height:18px;margin-left:5px;'><p style='padding-top:3px'>Add Text</p></a></div>";
		div = div.parentNode;
		var re2 = /<a href="#" onclick="drawApp.reset\(\);return false;" class="tool-undo" rel="tooltip" title="Clear Canvas"><img src="\/img\/draw_reset.png" alt="clear" height="25" width="25"><\/a>\n	+<\/p>\n	+<\/div>/;
		
		if(re2.test(div.innerHTML) && EnableText) {
			div.innerHTML = div.innerHTML.replace(re2,"$&"+rep2);
			if(colorsReplaced) {
				div.innerHTML = "<div style=\"position:absolute;left:27px;top:313px;float:left;width:99.9%\"><div style=\"position: relative;margin:0px auto;width:300px;\"><div id=\"text-preview-obj\" style=\"position: relative; left: 10px; top: 48.6px; font-family: Comic Sans MS,Arial; font-size: 14px;text-align:left;\"></div></div></div>" + div.innerHTML;
			}
			else {
				div.innerHTML = "<div style=\"position:absolute;left:-53px;top:286px;float:left;width:99.9%\"><div style=\"position: relative;margin:0px auto;width:300px;\"><div id=\"text-preview-obj\" style=\"position: relative; left: 10px; top: 48.6px; font-family: Comic Sans MS,Arial; font-size: 14px;text-align:left;\"></div></div></div>" + div.innerHTML;
			}
		}
		else if(EnableText) {
			alert("Could not find reset button.\nContact draco18s@gmail.com as Drawception may have updated.");
		}
		if(colorsReplaced) {
			getElement("customStringFloater").style.marginLeft = "65px";
		}
		
		var s = unsafeWindow.document.body.getElementsByTagName("script")[3];
		s.src = "";
		var canv = '<canvas id="drawingCanvas" width="350" height="292" class="panel" style="width:350px;height:292px;">Your browser doesn\'t support HTML5 Canvas. Please upgrade or try another browser (<a href="https://www.google.com/chrome">Chrome</a> is recommended).</canvas>';
		if(div.innerHTML.indexOf(canv) >= 0) {
			div.innerHTML = div.innerHTML.replace(canv,canv);
		}
		else {
			alert("Unable to replce canvas.  Alert the developer, draco18s@gmail.com");	
		}
		
		var fileref = unsafeWindow.document.createElement("script");
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", "http://www.pages.drexel.edu/~mmj29/draw-app-v3-mini.js?v3.08");
		div.appendChild(fileref);
		div.appendChild(fileref);
		unsafeWindow.jQuery(".clearCanvas").click(function(e) {
			unsafeWindow.jQuery(".colorPicker").removeClass("selected");
			unsafeWindow.jQuery(".brushPicker").removeClass("selected");
			unsafeWindow.jQuery(".default").addClass("selected");
			unsafeWindow.drawApp.setSize(10);
			unsafeWindow.drawApp.setColor("#000");
			e.preventDefault();
		});
		unsafeWindow.jQuery(".colorPicker").click(function(e) {
			unsafeWindow.jQuery(".colorPicker").removeClass("selected");
			unsafeWindow.jQuery(this).addClass("selected");
			e.preventDefault();
		});
		unsafeWindow.jQuery(".brushPicker").click(function(e) {
			unsafeWindow.jQuery(".brushPicker").removeClass("selected");
			unsafeWindow.jQuery(this).addClass("selected");
			e.preventDefault();
		});
		unsafeWindow.jQuery(".button-form .no-select").click(function(e) {
			unsafeWindow.confirmPanelSubmit();
		});
		unsafeWindow.jQuery.ctrl("U",function(){alert("saving");preventDefault();})
	}
	
(function() {
	var SVC = {
		currentVersion: "3.1", // Needed to compare working version with the download version at userscript.org
		scriptName: "Drawception Extended Colors Pallet", // Used in the message to users of any version changes to the script
		scriptNum: 130070, // Needed to connect to the download page at userscript.org
		
		// GLOBAL SETTINGS
		currentDate: null, userRequestCheck: null, timer: null, current:false,
		
		init: function () {
			SVC.currentDate = new Date();
			var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));
	
			// INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)
			if (!GM_getValue("latest")) GM_setValue("latest", cv );
			if (!GM_getValue("notified")) GM_setValue("notified", false);
			if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
			
			// UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER VERSION)
			if (GM_getValue("latest") < cv) {
				GM_setValue("latest", cv);
				GM_setValue("notified", false);
				GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			}
		},
		verify: function () {
			SVC.userRequestCheck = false;
			var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
			
			// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
			
			if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) {
				SVC.getInfo();
			}
				
			// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
			else if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) {
				SVC.getInfo();
			}
		},
		getInfo: function () {
			var uso = 'http://userscripts.org';
			function retrieve(url, re, count) {
				SVC.xhr.get(url, function (status, text) {
					window.clearTimeout(SVC.timer);
					if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
					if (status == 200) {
						if (re.test(text)) var uv = re.exec(text)[1];
						if (uv) SVC.compare(uv);
						if (!uv && count == 1) {
							retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
						} else if (!uv && SVC.userRequestCheck) {
							SVC.manualErrorMsg();
						}
					}
				});
				SVC.timer = setTimeout(function () { 
					if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					if (count == 2) 
						if (SVC.userRequestCheck) SVC.manualErrorMsg(); // *new in v0.3.0* notify only if it is a user request check
						else GM_setValue("lastChecked", SVC.currentDate.getTime() + ""); // *new in v0.3.0* the next check will be on the next day
				}, 3000); // *new in v0.3.0* change to 3secs to allow more time for heavy loaded sites
			};
			retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
		},
		xhr: {
			get: function (url, process) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					onload: function (res) { process(res.status, res.responseText); },
				});
			},
		},
		compare: function (version) {
				
				var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));		
				
				// *NEW IN v0.3.0* 
				// IF UPDATEDVERSIONINT IS NOT A NUMBER...
				if (isNaN(updatedVersionInt)) {
					current = true;
					if (SVC.userRequestCheck) SVC.manualErrorMsg();
					else GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
					return;
				}
				
				// DO NOTHING IF NO CHANGE IN VERSIONS
				if (updatedVersionInt <= GM_getValue("latest")) {
					current = true;
					if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
					return;
				}
				
				GM_setValue("notified", true);
				GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
				
				// NOTIFY USER
				if (SVC.userRequestCheck) {
					
					var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
					
					if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
					
				} else {
				
					var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
					
					if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
				
				}
			},
		versionInfo: {
			autoChecking: function () {
				SVC.init();
				SVC.verify();
			},
			manualChecking: function () {
				SVC.userRequestCheck = true;
				SVC.getInfo();
			},
		},
		manualErrorMsg: function () {
			var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscript.org now?\n\n  ');
			if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
		},
	};
	SVC.versionInfo.autoChecking();
	setup();
})();