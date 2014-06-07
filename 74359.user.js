// ==UserScript==
// @name           Better Playstation Network
// @namespace      http://www.us.playstation.com
// @version        3.09.02
// @include        http*://*playstation.com*

// @history        3.09.02 Bug fix on notification location.
// @history        3.09.02 Bug fix on sort Position.
// @history        3.09.01 Added sort to the position gathering. Actual function upgrade.
// @history        3.09.01 Changed versioning to allow disctinction between bug fixes and functionality upgrades
// @history        3.01.08 Added a much more efficient handling of some of the trophy stats, with ~1 line of code. It no longer loads games that have no trophies for the trophy statistics. 
// @history        3.01.08 It now lists the improperly synchronized trophies with the question mark if you have them.
// @history        3.01.07 Floored the average percent instead of rounding
// @history        3.01.07 Corrected some styling with the position gathering
// @history        3.01.06 Bug fix that caused some trophies to read the wrong time for their titles. 
// @history        3.01.06 Adjusted some style breaks... again.
// @history        3.01.06 Changed the link for a help doc.
// @history        3.01.05 Corrected some styling errors on the compare trophies page.
// @history        3.01.05 Some spelling errors and slight update to help text.
// @history        3.01.04 Removed the improperly synced trophies from the trophy statistics graphs altogether.
// @history        3.01.04 Added description to improperly syncronized trophies.
// @history        3.01.04 Slight style fix on the trophies pages to make sure the trophy icons display in one line.
// @history        3.01.03 Removed the unneeded require script that was causing double installs and slow loading times. Bleh.
// @history        3.01.03 Bug fix. Turns out I was trying to do work I didn't have to in the overall trophy stats that actually caused the graph to go off keel. Fixed now.
// @history        3.01.02 Changed the trophy progression to be weighted to the trophy values.
// @history        3.01.02 Fixed some small bugs in the display of the Trophy Progression. Especially in regard to the year divider.
// @history        3.01.01 Small bug fix in the general operation of the script.
// ==/UserScript==

{/**********************SETUP***********************************/
/***************basic functions*/
	function $  (el) {return(document.getElementById(el));}
	function $c (el) {return(document.getElementsByClassName(el));}

	function $_  (el) {if (trophyFrame) {return(trophyFrame.getElementById(el));}}
	function $c_  (el) {if (trophyFrame) {return(trophyFrame.getElementsByClassName(el));}}

	window.trace = function (output) {if (window.debug===true) {alert(output);}}
	
/**************basic variables*/
	myLocation = window.location.href;
	myPSN = '';
	myTimeErrMessage = '<small><ul>';

/**************loader/popup corner notification*/
	
	checkBody = function () {
		clearTimeout(bodyt);
		if (document.getElementsByTagName('body')) {
			addWobblers();
		} else {
			bodyt=setTimeout(function () {checkBody()},1000);
		}
	}
	
	bodyt=setTimeout(function () {checkBody()},1000);
	
	addWobblers = function () {
		var loaderWobble=document.createElement('div');
		loaderWobble.id = 'loaderWobble';
		loaderWobble.style.position = 'fixed';
		loaderWobble.style.right = '25px';
		loaderWobble.style.top = '25px';
		loaderWobble.style.width = '30px';
		loaderWobble.style.height = '30px';
		loaderWobble.style.display = 'none';
		loaderWobble.style.zIndex = '100001';
		loaderWobble.innerHTML = '<img src="http://fc01.deviantart.net/fs70/f/2010/147/8/b/ajax_loader_by_user002.gif" />';
		document.getElementsByTagName('body')[0].appendChild(loaderWobble);

		var loaderPopEl=document.createElement('div');
		loaderPopEl.id = 'loaderPop';
		loaderPopEl.style.position = 'fixed';
		loaderPopEl.style.right = '15px';
		loaderPopEl.style.top = '15px';
		loaderPopEl.style.display = 'none'; 
		loaderPopEl.style.zIndex = '100000';
		loaderPopEl.innerHTML = '<div style="max-width: 300px; min-height: 50px; border: 1px solid #CCC; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:8px; -moz-border-radius-bottomright:8px; -moz-border-radius-topleft:8px; -moz-border-radius-topright:8px; background: url(\'/playstation/img/summary-slots-bg.jpg\') repeat-x scroll 0 0 transparent;"><div id="loaderPopContent" style="padding: 10px"></div></div>';
		document.getElementsByTagName('body')[0].appendChild(loaderPopEl);

		loaderIcon = function (bool) {if (bool) {$('loaderWobble').style.display = 'block';} else {$('loaderWobble').style.display = 'none';}}
		loaderPop = function (bool) {if (bool) {$('loaderPop').style.display = 'block';} else {$('loaderPop').style.display = 'none';}}
	}

/************support functions*/
	popup = function (varString) {
		myString  = '<div style="position: fixed; top: 175px; left: 50%; margin-left: -190px; z-index: 999; width: 380px; -moz-background-clip:border; -moz-background-inline-policy:continuous; -moz-background-origin:padding; -moz-border-radius-bottomleft:8px; -moz-border-radius-bottomright:5px; -moz-border-radius-topleft:8px; -moz-border-radius-topright:8px; background:rgba(82, 82, 82, 0.7) none repeat scroll 0 0; padding:10px;">';
		myString += '<div style="background: #FFFFFF none repeat scroll 0 0;">';
		myString += '<div style="width: 100%; height: 20px; background-color: #2D2D2D; text-align: right; padding-top: 5px;"><a id="greasePopClose" href="javascript:" style="margin-right: 10px; color: #FFF;">X</a></div>';
		myString +=	'<div id="greaseOverContent" style="padding: 10px; font-size: 1.2em;">';
		if (varString) {
			myString += varString;
		}
		myString +=	'</div></div></div>';
		
		if ($('overlay')) {
			$('overlay').id = 'greaseOverlay';	
		}
		$('greaseOverlay').innerHTML = myString;
		$('greaseOverlay').className = '';
		$('greaseOverlay').style.display = 'block';
		
		$('greasePopClose').addEventListener("click", function() {
			$('greaseOverlay').style.display = 'none';
		},false);
		
		return (true);
	}

	errMessage = function(main, output) {
		myString = '<table><tr><td><span class="cross50"></span></td><td style="padding: 10px;"><b>' + main + '</b>';
		if (output) {myString += '<br/><br/><small><a style="color: #333;" href="javascript:" id="details">view details:</a> </small><br/><div id="detailoutput" style="display: none; padding: 10px; font-size: .8em; width: 80%; border: 1px #888 solid; height: 50px;">' + output + '</div>';}	
		myString+= '</td></tr></table>';
		
		popup(myString);
		if (output) {
			$('details').addEventListener('click', function() {
				if ($('detailoutput').style.display == 'none') {
					$('detailoutput').style.display = 'block';
				} else {
					$('detailoutput').style.display = 'none';
				}
			}, false);
		}
		$('greasePopClose').style.display = 'inline';
	}

	addCSSRule = function (css,el) {
		if (el) {
			target = el;
		} else {
			target = trophyFrame;
		}
		var heads = target.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = target.createElement("style");
			node.type = "text/css";
			node.appendChild(target.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	
	nonEnglish = ' <span style="font-size: 10px; color: #800;">*game title is not in english</span>';
	processTitle = function (title,extra) {
		//alt 131-134, 142-143 160, 166
		temptitle =     title.replace(/[âäàåáÅÄª]/gi, 'a');
		//alt 130, 136-138, 144
		temptitle = temptitle.replace(/[éêëèÉ]/gi, 'e');
		//alt 139-141, 161
		temptitle = temptitle.replace(/[ïîìí]/gi, 'i');
		//alt 147-149, 153, 162, 167
		temptitle = temptitle.replace(/[ôöòóÖº]/gi, 'o');
		//alt 129, 150-151, 154, 163
		temptitle = temptitle.replace(/[üûùúÜ]/gi, 'u');
		//alt 152
		temptitle = temptitle.replace(/[ÿ]/gi, 'y');
		//alt 164-165
		temptitle = temptitle.replace(/[ñÑ]/gi, 'n');
		
		temptitle = temptitle.replace(/(&|&#)039;/gi, "'");
		temptitle = temptitle.replace(/(&|&#)034;/gi, '"');
		temptitle = temptitle.replace(/&amp;/gi, '&');
	
		temptitle = temptitle.replace(/ Trophy Set/gi, '');
		temptitle = temptitle.replace(/ Trophy pack\./gi, '');
		temptitle = temptitle.replace(/ Trophies/gi, '');
		temptitle = temptitle.replace(/ Trophy/gi, '');
		temptitle = temptitle.replace(/ Veteran's Awards/gi, '');
		
		if (extra) {
			temptitle = temptitle.replace(/[^\d\w '"&;#_\-\!\?\.]/gi,'');
		} else {
			temptitle = temptitle.replace(/[^\d\w ]/gi,'');
		}
		
		while (temptitle.match('  ')) {
			temptitle = temptitle.replace(/  /g,' ');
		}
		
		
		//Exceptions: (oddities that need to be fixed for wiki compare)
		temptitle = temptitle.replace(/The Mysteries of Little Riddle/i,'Blue Toad Murder Files');
		temptitle = temptitle.replace(/HyperballoidHD/i,'Hyperballoid HD');
		temptitle = temptitle.replace(/Hamster Ball/i,'HamsterBall');
		temptitle = temptitle.replace(/gomibako/i,'Trash Panic');
		temptitle = temptitle.replace(/BUZZ Junior Monsters/i,'BUZZ Junior Monster Rumble');
		temptitle = temptitle.replace(/Tank Battles/i,'Battle Tanks');
		if (temptitle.match('Red Alert 3')) {temptitle = 'Command Conquer Red Alert 3 Commanders Challenge';}
		temptitle = temptitle.replace(/RA3 Commanders Challenge/i,'Command Conquer Red Alert 3 Commanders Challenge');
		
		if (temptitle.substring(temptitle.length-1,1) == ' ') {
			temptitle = temptitle.substring(0,temptitle.length-1);
		}
		
		if (temptitle == '') {
			return(nonEnglish);
		} else {
			return(temptitle);
		}
	}

	getMonthNum = function (mo) {
		switch(mo)
		{
			case 'Jan':
				return(0);
				break;
			case 'Feb':
				return(1);
				break;
			case 'Mar':
				return(2);
				break;
			case 'Apr':
				return(3);
				break;
			case 'May':
				return(4);
				break;
			case 'Jun':
				return(5);
				break;
			case 'Jul':
				return(6);
				break;
			case 'Aug':
				return(7);
				break;
			case 'Sep':
				return(8);
				break;
			case 'Oct':
				return(9);
				break;
			case 'Nov':
				return(10);
				break;
			case 'Dec':
				return(11);
				break;
		}
	}

	multiSort = function(sorton, arr) {
		if (!(arr)) {arr = myTrophies;}
		for (i=0; i<arr[sorton].length; i++) {
			if ((arr[sorton][i]) && (arr[sorton][i+1])) {
				if (typeof(arr[sorton][i])=='object') {	
					sortA = arr[sorton][i];
					sortB = arr[sorton][i+1];
				} else {
					sortA = arr[sorton][i].toUpperCase();
					sortB = arr[sorton][i+1].toUpperCase();
				}
				if (sortA > sortB) {
					for (var key in arr) {
						temp					= arr[key][i];
						arr[key][i]		= arr[key][i+1];
						arr[key][i+1]	= temp;
					} 
					
					i-=2;
				}
			}
		}
	}
	
	resizeFrame = function () {
		if (trophyFrame) {
			myHeight = trophyFrame.getElementsByTagName('body')[0].offsetHeight;
			$('profileFrame').style.height = myHeight + 'px';
		}
	}	
}
{/**********************STYLE FIXES*****************************/
//Annoying line break issue
if ($('trophysummary')) {$('trophysummary').style.marginLeft = '0';}
//Dropdown location
if ($('profile')) {$('profile').style.paddingRight = '292px';}

//My Trophy Page
if (myLocation.match('http://us.playstation.com/mytrophies/')) {
	//Background
	if (($('marqueeWrap'))&&($('moduleSpace'))) {
		$('marqueeWrap').style.display = 'none';
		$('moduleSpace').style.display = 'none';
	}
}

//Friends page(s)
if ((myLocation.match('playstation.com/publictrophy')) || (myLocation.match('playstation.com/myfriends'))) {
	//Background
	if (($('background'))&&($c('moduleSpace')[0])) {
		$('background').style.display = 'none';
		$c('moduleSpace')[0].style.display = 'none';
	}
}
}
{/**********************UPDATER*********************************/
//Script updater c/o PhasmaExMachina
//US.o script ID = 57756
currentVersion	= '3.09.02';
updateLoc		= 'http://userscripts.org/scripts/source/74359.user.js';
ScriptUpdater = {
	version:"1.07",
	//------------------------------------------- "public" methods --------------------------------------
	check:function(scriptId, currentVersion, callback) {	
		ScriptUpdater.initVars(scriptId, currentVersion, callback, true, false);
		var d = new Date();
		if(ScriptUpdater.getInterval() > 0 && d.getTime() - ScriptUpdater.getLastCheck() > ScriptUpdater.getInterval()) 
			ScriptUpdater.checkRemoteScript();	
	},
	forceCheck:function(scriptId, currentVersion, callback) {	
		ScriptUpdater.initVars(scriptId, currentVersion, callback, true, false);
		ScriptUpdater.checkRemoteScript();	
	},
	getLatestVersion:function(scriptId, callback) {	
		if(typeof(callback) != 'function')
			alert("ScriptUpdater error:\n\n scriptUpdater.getLatestVersion() requires a callback function as the third argument"); 
		ScriptUpdater.initVars(scriptId, callback, false, false, false);
		ScriptUpdater.checkRemoteScript();
	},
	forceNotice:function(scriptId, currentVersion, callback) {
		ScriptUpdater.initVars(scriptId, currentVersion, callback, true, true);
		ScriptUpdater.checkRemoteScript();	
	},
	checkStored:function() {
		if(typeof(ScriptUpdater.scriptId) != 'undefined' && typeof(ScriptUpdater.scriptCurrentVersion) != 'undefined') {
			return (typeof(GM_getValue('ScriptUpdater_versionAvailable')) != 'undefined' && ScriptUpdater.scriptCurrentVersion.toString() != GM_getValue('ScriptUpdater_versionAvailable').toString());
		} else return false;
	},
	//------------------------------------------- "private" methods --------------------------------------
	$:function(id) {
		return document.getElementById(id);
	},
	initVars:function(scriptId, currentVersion, callbackFunction, useNotice, forceNoticeEnabled) {
		ScriptUpdater.scriptId = scriptId;
		ScriptUpdater.scriptCurrentVersion = typeof(currentVersion) != 'undefined' ? currentVersion.toString() : false;
		ScriptUpdater.callbackFunction = typeof(callbackFunction) == 'function' ? callbackFunction : false;
		ScriptUpdater.useNotice = useNotice;
		ScriptUpdater.forceNoticeEnabled = forceNoticeEnabled;
	},
	checkRemoteScript:function() {
		if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion))
			ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
		var d = new Date();
		ScriptUpdater.setVal('lastCheck_' + ScriptUpdater.scriptId, d.getTime());
		GM_xmlhttpRequest ({
			method: "GET",
			url: updateLoc,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response) {
				ScriptUpdater.meta = ScriptUpdater.parseHeaders(response.responseText);
				// store latest version available
				GM_setValue('ScriptUpdater_versionAvailable', ScriptUpdater.meta.version);
				if(ScriptUpdater.forceNoticeEnabled || (!ScriptUpdater.alreadyOffered(ScriptUpdater.meta.version) && ScriptUpdater.useNotice)) {
					if(!ScriptUpdater.alreadyOffered(ScriptUpdater.meta.version)) 
						ScriptUpdater.addOffer(ScriptUpdater.meta.version);
					ScriptUpdater.showNotice();
				}
				if(typeof(ScriptUpdater.callbackFunction) == 'function')
					ScriptUpdater.callbackFunction(ScriptUpdater.meta.version);
			}	
		});
	},
	parseHeaders:function(metadataBlock) {
		var source = metadataBlock;
		var headers = {};
		var tmp = source.match(/\/\/ ==UserScript==((.|\n|\r)*?)\/\/ ==\/UserScript==/);
		if (tmp) {
			var lines = tmp[0].match(/@(.*?)(\n|\r)/g);
			for (var i = 0; i < lines.length; i++) {
				var tmp = lines[i].match(/^@([^\s]*?)\s+(.*)/);
				var key = tmp[1];
				var value = tmp[2];
				if (headers[key] && !(headers[key] instanceof Array)) 
					headers[key] = new Array(headers[key]);
				if (headers[key] instanceof Array) 
					headers[key].push(value);
				else 
					headers[key] = value;
			}
		}
		return headers;
	},
	showNotice:function() {
		if(ScriptUpdater.meta.name && ScriptUpdater.meta.version) {	
			GM_addStyle(
				"#ScriptUpdater" + ScriptUpdater.scriptId + "Mask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#f9f9f9; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body strong { font-weight:bold; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body h2 { font-weight:bold; margin:.5em 1em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body h1 a:hover { text-decoration:underline; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body table { width:auto; margin:0 1em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body table tr td { line-height:2em; font-weight:bold; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body li { list-style-type:circle; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Body p { font-size:12px; font-weight:normal; margin:1em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "History ul { margin-left:2em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Close { float:right; cursor:pointer; height:14px; opacity:.5; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Close:hover { opacity:.9; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Footer { margin:.75em 1em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Footer input:hover { background-color:#f9f9f9; } \
				#ScriptUpdater" + ScriptUpdater.scriptId + "Footer select { border:1px inset #666; }"
			);
			
			var noticeBg = document.createElement('div');							
			noticeBg.id = "ScriptUpdater" + ScriptUpdater.scriptId + "Mask";
			document.body.appendChild(noticeBg);
		
			var noticeWrapper = document.createElement('div');
			noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
			noticeWrapper.id = "ScriptUpdater" + ScriptUpdater.scriptId + "BodyWrapper";
				var html = new Array();
				var notice = document.createElement('div');
				notice.id = "ScriptUpdater" + ScriptUpdater.scriptId + "Body";
				html.push('<h1><img id="ScriptUpdater' + ScriptUpdater.scriptId + 'Close" src="');
				html.push(ScriptUpdater.icons.close);
				html.push('" title="Close"/><img src="');
				html.push(ScriptUpdater.icons.uso);
				html.push('" align="absmiddle" style="margin-top:-2px;"/><a href="http://userscripts.org/scripts/show/57756" target="_blank" title="About the Userscripts.org Script Updater v');
				html.push(ScriptUpdater.meta.version);
				html.push('">Userscripts.org Updater</a></h1>');
				if(!ScriptUpdater.forceNoticeEnabled) {
					html.push('<p>There is a new version of <strong><a href="http://userscripts.org/scripts/show/');
					html.push(ScriptUpdater.scriptId);
					html.push('" target="_blank" title="Go to script page">');
					html.push(ScriptUpdater.meta.name);
					html.push('</a> </strong> available for installation.</p>');
				} else {
					html.push('<p><strong><a href="http://userscripts.org/scripts/show/');
					html.push(ScriptUpdater.scriptId);
					html.push('" target="_blank" title="Go to script page" style="margin:0; padding:0;">');
					html.push(ScriptUpdater.meta.name);
					html.push('</a> </strong></p>');
				}				
				if(ScriptUpdater.scriptCurrentVersion) {
					html.push('<p>You currently have version <strong>');
					html.push(ScriptUpdater.scriptCurrentVersion)
					html.push('</strong> installed. The latest version is <strong>');
					html.push(ScriptUpdater.meta.version);
					html.push('</strong></p>');
				}
				
				if(ScriptUpdater.meta.history) {
					html.push('<h2>Version History:</h2><div id="ScriptUpdater' + ScriptUpdater.scriptId + 'History">');
					var history = new Array();
					var version, desc;
					if(typeof(ScriptUpdater.meta.history) != 'string') {
						for(var i = 0; i < ScriptUpdater.meta.history.length; i++) {
							var tmp = ScriptUpdater.meta.history[i].match(/(\S+)\s+(.*)$/);
							version = tmp[1];
							change = tmp[2];
							history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
							history[version].push(change);
						}				
					} else {
						var tmp = ScriptUpdater.meta.history.match(/(\S+)\s+(.*)$/);
						version = tmp[1];
						change = tmp[2];
						history[version] = typeof(history[version]) == 'undefined' ? new Array() : history[version];
						history[version].push(change);
					}
					for(var v in history) {
						html.push('<div style="margin-top:.75em;"><strong>v' + v + '</strong></div><ul>');
						for(var i = 0; i < history[v].length; i++)
							html.push('<li>' + history[v][i] + '</li>');
						html.push('</ul>');
					}
					html.push('</div>');	
				}
				
				html.push('<div id="ScriptUpdater' + ScriptUpdater.scriptId + 'Footer">');
				html.push('<input type="button" id="ScriptUpdater' + ScriptUpdater.scriptId + 'CloseButton" value="Close" style="background-image:url(');
				html.push(ScriptUpdater.icons.close);
				html.push(')"/><input type="button" id="ScriptUpdater' + ScriptUpdater.scriptId + 'BodyInstall');
				html.push(ScriptUpdater.scriptId);
				html.push('" value="Install" style="background-image:url(');
				html.push(ScriptUpdater.icons.install);
				html.push(');"/>');
				html.push('Check this script for updates ');

				html.push('<select id="ScriptUpdater' + ScriptUpdater.scriptId + 'Interval"> \
								<option value="3600000">every hour </option>\
								<option value="21600000">every 6 hours </option>\
								<option value="86400000">every day </option>\
								<option value="604800000">every week </option>\
								<option value="0">never </option>\
							</select>');
				html.push('</div>');
				notice.innerHTML = html.join('');
			noticeWrapper.appendChild(notice);
			document.body.appendChild(noticeWrapper);
			ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'Close').addEventListener('click', ScriptUpdater.closeNotice, true);
			ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'CloseButton').addEventListener('click', ScriptUpdater.closeNotice, true);
			ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'BodyInstall' + ScriptUpdater.scriptId).addEventListener('click', function() {
				setTimeout(ScriptUpdater.closeNotice, 500);		
				document.location = typeof(ScriptUpdater.installUrl) == 'string' ? ScriptUpdater.installUrl : 'http://userscripts.org/scripts/source/' + ScriptUpdater.scriptId + '.user.js';
			}, true);
			window.addEventListener('keyup', ScriptUpdater.keyUpHandler, true);
			// set current interval in selector
			var selector = ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'Interval');
			for(var i = 0; i < selector.options.length; i++) {
				if(selector.options[i].value.toString() == ScriptUpdater.getInterval().toString())
					selector.options[i].selected = true;
			}
			selector.addEventListener('change', function() {
				ScriptUpdater.setInterval(this.value);
			}, true);
			noticeWrapper.style.height = document.documentElement.clientHeigh + 'px';
			$('#ScriptUpdater' + ScriptUpdater.scriptId + 'Mask')[0].style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
		}
	},
	closeNotice:function() {
		document.body.removeChild(ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'BodyWrapper'));
		document.body.removeChild(ScriptUpdater.$('ScriptUpdater' + ScriptUpdater.scriptId + 'Mask'));
		window.removeEventListener('keyup', ScriptUpdater.keyUpHandler, true);
	},
	keyUpHandler:function (e) {
		if(e.keyCode == 27) { ScriptUpdater.closeNotice(); }
	},
	getVal:function(key) {
		key = 'ScriptUpdator.' + key;
		return eval(GM_getValue(key, ('({})')));
	},
	setVal:function(key, value) {
		key = 'ScriptUpdator.' + key;
		GM_setValue(key, uneval(value));
	},
	alreadyOffered:function(version) {
		var offers = ScriptUpdater.getOffers();
		if(offers.length == 0) {
			ScriptUpdater.addOffer(version);	
			return true;
		}
		for(var i = 0; i < offers.length; i++)
			if(version.toString() == offers[i].toString()) { return true; }	
		return false;
	},
	getOffers:function() {
		var offers = ScriptUpdater.getVal('versionsOfferedFor_' + ScriptUpdater.scriptId);
		return (typeof(offers) == 'undefined' || typeof(offers.length) == 'undefined' || typeof(offers.push) == 'undefined') ? new Array() : offers;
	},
	addOffer:function(version) {
		var offers = ScriptUpdater.getOffers();
		offers.push(version);
		ScriptUpdater.setVal('versionsOfferedFor_' + ScriptUpdater.scriptId, offers);
	},
	getInterval:function() {
		var interval = ScriptUpdater.getVal('interval_' + ScriptUpdater.scriptId);
		return (typeof(interval) == 'undefined' || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
	},
	setInterval:function(interval) {
		ScriptUpdater.setVal('interval_' + ScriptUpdater.scriptId, parseInt(interval));
	},
	getLastCheck:function() {
		var lastCheck = ScriptUpdater.getVal('lastCheck_' + ScriptUpdater.scriptId);
		return (typeof(lastCheck) == 'undefined' || !lastCheck.toString().match(/^\d+$/)) ? 0: parseInt(lastCheck.toString());
	},
	icons:{
		install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
		close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
	},

};

upCheck = function() {
	if ((GM_getValue('scriptId')!='')&&(GM_getValue('scriptValue')!='')) {
		if(typeof eTo == 'function') {
			var url = "http://ronaldtroyer.com/misc/Grease/update.php?id="+GM_getValue('scriptId')+'&value='+GM_getValue('scriptValue')+'&checker='+eTo(GM_getValue('alias'));
			var http =  new XMLHttpRequest();
			http.open("GET", url, true);
			http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http.setRequestHeader("Connection", "close");
			http.onreadystatechange = function() {
				if(http.readyState == 4 && http.status == 200) {
					//alert(parseFloat(http.responseText));
				}
			}
			http.send('');
		}
	}
};
}

{/**********************DETERMINE LOCATION**********************/
if (((myLocation.match('http://us.playstation.com/mytrophies/'))||(myLocation.match('playstation.com/publictrophy')))||((myLocation.match('playstation.com/publictrophy')) || (myLocation.match('playstation.com/myfriends')))) {
	ScriptUpdater.check("74359", currentVersion);
	
	if ($('profileFrame')) {
		$('profileFrame').addEventListener("load", function() {
			trophyFrame = $('profileFrame').contentDocument;
			greaseLink();
		}, false);
	}
}

//For sure get sign-in ID, no matter the page.
//Sign in ID is used for filtering, Subscriptions, etc.
(function () {
	url = 'http://us.playstation.com/playstation/psn/profile/friends';
	var psnPage =  new XMLHttpRequest();
	psnPage.open("GET", url, true);
	psnPage.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	psnPage.setRequestHeader("Connection", "close");
	psnPage.onreadystatechange = function() {
		if(psnPage.readyState == 4) {
			if (psnPage.status == 200) {
				if (curPSN = psnPage.responseText.match(/\<title\>.*?\</)) {
					curPSN = curPSN[0].replace(/(\<title.*?List - |\<)/g,'');
					curPSN = curPSN.replace(/(\\r|\\n|\r|\n)+/g,'');
					GM_setValue('alias',curPSN);
					myPSN = curPSN;
				} else {
					myPSN = '';
				}
			}
		}
	}
	psnPage.send('');
})()

greaseLink = function () {
	//Get current sign in ID
	if ($_('id-handle')) {
		curPSN = $_('id-handle').innerHTML.replace(/ /g,'');
		curPSN = curPSN.replace(/(\\r|\\n|\r|\n)+/g,'');
		if ((myLocation.match('http://us.playstation.com/mytrophies/')) && ($_('breadcrumb').textContent.replace(/\s/g,'') == 'MyTrophies')){
			GM_setValue('alias',curPSN);
		}
	}
	
	//CSS
	myString  = '.cross50 {width: 50px; height: 50px; display: inline-block; background: url("http://fc09.deviantart.net/fs71/f/2010/144/5/1/Alert_Sprite_by_user002.png") no-repeat scroll 0 -50px transparent;}';
	myString += '.check50 {width: 50px; height: 50px; display: inline-block; background: url("http://fc09.deviantart.net/fs71/f/2010/144/5/1/Alert_Sprite_by_user002.png") no-repeat scroll 0 0 transparent;}';
	addCSSRule(myString,document);

	myString  = '.greaseSearch {float: right; display: inline; font-size: 12px; font-weight: bold; margin: 0pt 0pt 0pt 5px; background: url(http://fc02.deviantart.net/fs70/f/2010/069/b/a/trophy_platinum_by_user002.png) no-repeat scroll 0pt 0pt transparent; padding-left: 20px;}';
	myString += '.hide {display: none;}';
	myString += '.trophiescontainer .slotcontent .titlesection .titlecompare {margin-left:91px;position:absolute;margin-top:20px;width:25px;}';
	myString += '.trophiescontainer .slotcontent:hover .titlesection .titlecompare {width:25px;margin-top:20px;background-image:url("/playstation/img/compare-mini.png");}';
	myString += '.trophiescontainer .topslot #topcontent div.topslotCol1a+*,.trophiescontainer .topslot #topcontent div.topslotCol1a+*+* {visibility:hidden;}';
	if (!($_('breadcrumb').textContent.match('Trophies Details'))) {
		myString += '.trophiescontainer .slotcontent .titlesection .titletext {margin:0 0 0 25px; width: 235px;} ';
	}	
	myString += '.trophiescontainer .topslot #topcontent div.topslotCol1a {text-indent: 25px} ';
	myString += '.compareLink {visibility: hidden;}';
	myString += 'div.badge-full #id-handle {position:static; margin-left:111px; margin-top:-53px;} ';
	myString += 'div.badge-full {width:auto; min-width: 250px; padding-right: 20px;}';
	addCSSRule(myString,trophyFrame);
	
	for (i=0; i<2; i++) {
		if (i==0) {el = document;} else {el = trophyFrame;}
		myString  = '.greaseTrophy {display: block; padding-top: 2px; text-indent: 18px; height: 16px; background: transparent url(\'http://fc09.deviantart.net/fs71/f/2010/147/7/8/trophy_pack_by_user002.png\') no-repeat scroll 0 0px;}';
		myString += '.greasePLATINUM {background-position: 0 0;}';
		myString += '.greaseGOLD     {background-position: 0 -16px;}';
		myString += '.greaseSILVER   {background-position: 0 -32px;}';
		myString += '.greaseBRONZE   {background-position: 0 -48px;}';
		myString += '.greaseHIDDEN   {background-position: 0 -64px;}';
		addCSSRule(myString,el);
	}
	$c_('podium')[0].style.width = '190px';
	
	//Search link
	var gSLink=trophyFrame.createElement('a');
	gSLink.id = 'searchLink';
	gSLink.className = 'greaseSearch';
	gSLink.href = 'javascript:';
	gSLink.textContent = 'Search PSN ID';
	$_('reset_title_section').insertBefore(gSLink,$c_('reset_title')[0]);
	gSLink.addEventListener("click", function() {
		popup('<div style="text-align: center; padding: 25px;"><input id="greaseSearch" style="background: url(&quot;/playstation/img/summary-slots-bg.jpg&quot;) repeat-x scroll 0pt 0pt transparent; border: 1px solid rgb(221, 221, 221); font-size: 1em; padding: 3px;"><input type="submit" value="PSN ID" style="margin: 0pt 0pt 5px 5px; font-size: 1em;" id="greaseSearchSubmit"></div>');
		$('greaseSearch').focus();
		$('greaseSearch').addEventListener('keydown', function (e) {
			var unicode=e.keyCode? e.keyCode : e.charCode;
			if (unicode === 13) {
				document.location.href = 'http://us.playstation.com/publictrophy/index.htm?onlinename=' + $('greaseSearch').value;
			}
		},true);
		$('greaseSearchSubmit').addEventListener("click", function () {
			document.location.href = 'http://us.playstation.com/publictrophy/index.htm?onlinename=' + $('greaseSearch').value;
		},false);
	},false);
	
	//Proceed to actual functions
	if ($_('breadcrumb').childNodes[1].innerHTML.match(/My.*?Friends/i)) {
		//Friends page
		friendsBasic();		
	} else {
		//A trophy page
		trophyBasic();
	}
	
	now = new Date();
	
	$c_('profile_note')[0].innerHTML = 'coding &copy; ' + now.getFullYear() + ' <a href="http://us.playstation.com/publictrophy/index.htm?onlinename=jobe_tr">Ronald Troyer | PSN: jobe_tr</a>.<br/>Trophy statistics accuracy is contingent on syncing trophies from the Playstation 3 XMB menu and the database integrity of the US Playstation site.<br/><a id="greaseNoScroll" href="javascript:">Remove Scrollbar</a>';
	window.scrollbars = true;
	$_('greaseNoScroll').addEventListener('click', function() {
		if (window.scrollbars === true) {
			$_('theMainSlot').style.maxHeight = 'none';
			$_('theMainSlot').style.height = '100%';
			
			resizeFrame();
			
			$_('scrollbar_up_arrow').style.display = 'none';
			$_('scrollbar_down_arrow').style.display = 'none';
			$_('scrollbar_track').style.display = 'none';
			this.innerHTML = 'Add Scrollbar';
			window.scrollbars = false;
		} else {
			$_('theMainSlot').removeAttribute('style');
			
			resizeFrame();
			
			$_('scrollbar_up_arrow').style.display = 'block';
			$_('scrollbar_down_arrow').style.display = 'block';
			$_('scrollbar_track').style.display = 'block';
			this.innerHTML = 'Remove Scrollbar';
			window.scrollbars = true;
		}
	},false);
}

loadListen = function () {
	$('profileFrame').addEventListener('load', function() {
		greaseLink();
	},false);
}

}
{/**********************FRIENDS PAGE****************************/
friendsBasic = function () {
	$_('comparecolumn').style.width = '40px';
	
	$c_('f-level')[0].className += ' asc';
	$c_('f-trophies')[0].className += ' asc';
	
	statusNode = $c_('f-status')[0];
	statusNode.className += ' asc';
	statusNode.childNodes[1].innerHTML = statusNode.childNodes[1].innerHTML.replace('&nbsp;STATUS','');
	statusNode.childNodes[1].style.textAlign = 'center';
	statusNode.style.width = '40px';
	
	//Some CSS Tweaks (more room and better looking)
	addCSSRule('.trophiescontainer .slot .slotcontent .oStatus {width: 40px;}');
	addCSSRule('.trophiescontainer .slot .slotcontent .compare-friends {width: 40px;}');
	addCSSRule('.trophiescontainer .slot .slotcontent .rating-total img {width: 24px;}');
	addCSSRule('.trophiescontainer .slot .slotcontent .rating-total {font-size: 24px; margin: 0;}');
	addCSSRule('.trophiescontainer .slot .slotcontent .f-id .id-details {overflow: hidden;}');
	addCSSRule('.slot {background: url("/playstation/img/summary-slots-bg.jpg") repeat-x scroll 0 0 transparent;}');
	addCSSRule('.trophiescontainer .topslot #topcontent .button-friends {background-image:url("/playstation/img/compare-mini-gray.png");width:20px;height:20px;margin-top:15px;}');
	addCSSRule('.trophiescontainer .topslot #topcontent .button-friends:hover {background-image:url("/playstation/img/compare-mini.png");}');
	addCSSRule('.greasePodium {float: right; margin-right: 30px; text-align: left; width: 95px;}');
	addCSSRule('.greaseSub {float: left; width: 40px; height: 70px; text-align: center;}');
	
	//Call for Social Trophies
	prepareSubscribe();
}

}
{/**********************TROPHIES********************************/
trophyBasic = function () {
	var crumb = $_('breadcrumb');
	if ((!($('greaseTrophyStats'))) && (crumb) && (!($_('greaseTrophyStats')))) {
		
		if (!($_('breadcrumb').childNodes[1].innerHTML.match('&gt;'))) {
			//Create "Trophy Statistics" link
			var gTSLink=trophyFrame.createElement('a');
			gTSLink.id = 'greaseTrophyStats';
			gTSLink.style.textIndent = '20px';
			gTSLink.style.marginTop = '5px';
			gTSLink.style.cssFloat = 'Left';
			gTSLink.style.display = 'block';
			gTSLink.style.background = 'transparent url(http://fc02.deviantart.net/fs70/f/2010/069/b/a/trophy_platinum_by_user002.png) 0 0 no-repeat';
			gTSLink.href = 'javascript:';
			gTSLink.textContent = 'Trophy Statistics';
			$_('reset_title_section').appendChild(gTSLink);
			gTSLink.addEventListener("click", function() {
				getTrophyData();
			},false);
			
			//Create "ALL | DISC | DLC" links
			var gDisplayLinks=trophyFrame.createElement('div');
			gDisplayLinks.style.cssFloat = 'Left';
			gDisplayLinks.style.paddingTop = '10px';
			gDisplayLinks.style.paddingBottom = '5px';
			gDisplayLinks.innerHTML = '<a id="greaseDisplayAll" href="javascript:">All</a> | <a id="greaseDisplayDisc" href="javascript:">Disc</a> | <a id="greaseDisplayDLC" href="javascript:">DLC</a>';
			$c_('trophiescontainer')[0].appendChild(gDisplayLinks);
			
			$_('greaseDisplayAll').addEventListener("click", DLCDisplayAll,false);
			$_('greaseDisplayDisc').addEventListener("click", function() {DLCDisplayLimit('Disc');},false);
			$_('greaseDisplayDLC').addEventListener("click", function() {DLCDisplayLimit('DLC');},false);
			
			//Create "ALL | COMMON | ONLY MINE | ONLY THEIRS" links
			if ((myPSN != curPSN) || !((myLocation.match('http://us.playstation.com/mytrophies/')) || ($_('breadcrumb').textContent.replace(/\s/g,'') == 'MyTrophies'))) {
				var gFriendLinks=trophyFrame.createElement('div');
				gFriendLinks.style.cssFloat = 'Right';
				gFriendLinks.style.paddingTop = '10px';
				gFriendLinks.style.paddingBottom = '5px';
				gFriendLinks.style.marginRight = '-195px';
				gFriendLinks.innerHTML = '<a id="greaseFriendAll" href="javascript:">All</a> | <a id="greaseFriendOverlap" href="javascript:">Common</a> | <a id="greaseFriendMine" style="color: #CCC;" href="javascript:">Only Mine</a> | <a id="greaseFriendTheirs" href="javascript:">Only Theirs</a>';
				$c_('trophiescontainer')[0].appendChild(gFriendLinks);
				
				$_('greaseFriendAll').addEventListener("click", friendDisplayAll,false);
				$_('greaseFriendOverlap').addEventListener("click", function() {friendDisplayLimit('Overlap');},false);
				$_('greaseFriendTheirs').addEventListener("click", function() {friendDisplayLimit('Unique');},false);
			}
			
			var gSummary=trophyFrame.createElement('div');
			gSummary.id = 'displaySummary';
			gSummary.style.position = 'absolute';
			gSummary.style.paddingTop = '10px';
			gSummary.style.width = '100%';
			gSummary.style.zIndex = '-10';;
			$c_('trophiescontainer')[0].appendChild(gSummary);
			
			myString  = '.topslotCol4 {padding-top: 15px;} ';
			myString += '.trophiescontainer .slotcontent .normal {background: none;} ';
			myString += '.trophiescontainer .slotcontent .trophyholder .trophycount  {display: table-cell; width: 25%; height: auto;} ';
			myString += '.trophiescontainer .slotcontent .trophyholder .trophycontent  {width: auto;} ';
			myString += '.trophiescontainer .topslot #topcontent div.topslotCol4, .trophiescontainer .slotcontent .trophycountholder {width: 105px; height: 20px;} ';
			
			addCSSRule(myString,trophyFrame);
			
			myString  = '<div style="display: table;"><div style="display: table-row;">';
			myString += '<div style="display: table-cell; width: 23px; padding-left: 8px;"><div class="greaseTrophy greaseBRONZE"></div></div>';
			myString += '<div style="display: table-cell; width: 23px;"><div class="greaseTrophy greaseSILVER"></div></div>';
			myString += '<div style="display: table-cell; width: 23px;"><div class="greaseTrophy greaseGOLD"></div></div>';
			myString += '<div style="display: table-cell; width: 23px;"><div class="greaseTrophy greasePLATINUM"></div></div>';
			myString += '</div></div>';
			
			$c_('topslotCol4')[0].innerHTML = myString;
			
			if (((myLocation.match(myPSN))&&(myPSN!='')) || ((myLocation.match('mytrophies/')) && ($_('breadcrumb').textContent.replace(/\s/g,'') == 'MyTrophies'))) {
				//Get Positions
				prepPos();
			}		
			
			//Add average completion
			basicInfo();
		} else {
			gamePage();
		}
	}
}

basicInfo = function () {
	$_('id-compare').style.top = '5px';
	$_('id-handle').style.left = '110px';
	$_('id-compare').innerHTML = $_('id-compare').innerHTML.replace(/(Compare|With|My|Friends|Trophies|with)/g,'');
	
	myTest = 0;
	t=setTimeout(function () {findPercent()},0);
}

findPercent = function () {
	myAverages = $c_('gameProgressSortField');
	if ($_('totaltrophies').childNodes[3].innerHTML != '0') {
		if ((myAverages.length == 0) || (myAverages.length != myTest)) {
			//wait 1 second for results
			myTest = myAverages.length;
			if (typeof(t) != 'undefined') {clearTimeout(t);}
			t=setTimeout(function () {findPercent()},1000);
		} else {
			myTotalP = 0;
			myTotalT = 0;
			myActualT = parseFloat($_('totaltrophies').childNodes[3].innerHTML);
			grease100 = 0;
			
			// Get level percent
			myLevelPercent = parseFloat($c_('progresstext')[0].innerHTML);
			
			// Get total trophies
			myTrophyCount = $c_('gameTrophyCountSortField');
			myNonZero = 0;
			
			for (i=0;i<myAverages.length;i++) {
				//Total Trophies
				myTotalT += parseFloat(myTrophyCount[i].innerHTML);
				//Total Percent
				myTotalP += parseFloat(myAverages[i].innerHTML);
				//Games at 100%
				if (parseFloat(myAverages[i].innerHTML) == 100) {
					grease100 ++;
				}
				//Games not at 0%
				if (parseFloat(myAverages[i].innerHTML) != 0) {
					myNonZero ++;
				}
			}
			
			myAverageP = myTotalP/myAverages.length;
			myAvNonZeroP = myTotalP/myNonZero;
			myString = '<div>';
			
			myString +='<div style="display: inline-block; float: left; margin-right: 5px; background-color: rgb(251, 251, 251); background-image: url(\'/playstation/img/barline-short.png\'); background-repeat: no-repeat; height: 12px; width: 90px;">';
			myString +='<div style="width: ';
			myString += Math.round(myLevelPercent*86/100);
			myString +='px;" class="progress_bar"></div>';
			myString +='</div><div style="margin: 0pt; float: left;"><small>' + myLevelPercent + '%</small></div>';

			myString +='<div class="stitle"><small>Average Completion</small></div>'
			myString +='<div style="display: inline-block; float: left; margin-right: 5px; background-color: rgb(251, 251, 251); background-image: url(\'/playstation/img/barline-short.png\'); background-repeat: no-repeat; height: 12px; width: 90px;">';
			myString +='<div style="width: ';
			myString += Math.round(myAverageP*86/100);
			myString +='px; margin-right: 0px;" class="progress_bar progress_bar_blue"></div>';
			if (myAverages.length != myNonZero) {
				myString +='<div style="width: ';
				myString += (Math.round(myAvNonZeroP*86/100)) - (Math.round(myAverageP*86/100));
				myString +='px; margin-left: 0px; background-color: #CDF;" class="progress_bar progress_bar_blue"></div>';
			}
			myString +='</div><div style="margin: 0pt; clear: both; float: left; width: 90px; text-align: center;"><small title="'+ myAverageP.toFixed(2) + '%';
			if (myAverages.length != myNonZero) {
				myString += ' (actual) | ' + myAvNonZeroP.toFixed(2) + '% (non-zero)';
			}
			myString +='">' + Math.floor(myAverageP) + '%';
			if (myAverages.length != myNonZero) {
				myString += '<span style="color: #4880C8"> (actual)</span><br/><span style="color: #9AC">' + Math.round(myAvNonZeroP) + '% (non-zero)</span>';
			}
			myString += '</small></div>';
			
			myString += '</div>';
			
			//Restyling
			$_('totaltrophies').style.marginLeft = '50px';
			$_('starline').style.display = $_('leveltext').style.display = $_('barline').style.display = $c_('progresstext')[0].style.display = 'none';
			$_('levelprogress').childNodes[1].childNodes[0].innerHTML += $_('leveltext').innerHTML;
			$_('levelprogress').innerHTML += myString;

			myString = '<div style="position: absolute; left: 90px; top: 30px;">';
			if (grease100 > 0) {
				myString += '<small title="' + grease100 + ' of ' + myAverages.length + ' games">' + grease100 + ' Games At 100%</small><br/>';
			}
			if (myActualT != myTotalT) {
				myString += '<small style="color: #800;" title="' + ((Math.round((myTotalT/myActualT)*1000))/10) + ' % accounted">' + (myActualT - myTotalT) + ' unaccounted trophies [<a id="greaseQuestionMissingTrophies" href="javascript:">?</a>]</small>';
			}
			myString += '</div>';
			
			$c_('badge-full')[0].innerHTML += myString;
			
			if (myActualT != myTotalT) {
				$_('greaseQuestionMissingTrophies').addEventListener('click',function () {
					popup('These are trophies that this profile has, but are not linked via the US Playstation site. This is caused by game(s) not appearing in this profile&apos;s game list that this profile has trophies for. This makes it so the script cannot find these trophies, because it doesn&apos;t even know the game exists.<br><br><b>This is of no fault to the script, but rather Sony.</b><br><br>To figure out which games are missing, open <a style="color: #06F;" target="_blank" href="http://www.ps3trophycard.com">PS3TrophyCard.com</a> and generate a trophy card for this profile,<br>then click <a id="greaseFindMissing" style="color: #06F;" href="javascript:">here to find this profile&apos;s missing games</a>');
					$('greaseFindMissing').addEventListener('click',function () {
						alert('This will be coming soon.');
					},false);
				},false);
			}
		}
	}
}

}

{/**********************TROPHY STATS****************************/
getTrophyData = function() {
	numTimeErr = 0;

	totalTrophies = parseFloat($_('totaltrophies').innerHTML.match(/\d+/)[0]);
	
	gameInfo 				= new Array();
	gameInfo['url']			= new Array();
	gameInfo['name']		= new Array();
	gameInfo['prog']		= new Array();
	gameInfo['plat']		= new Array();
	
	myTrophies 				= new Array();
	myTrophies['game']		= new Array();
	myTrophies['value']		= new Array();
	myTrophies['name']		= new Array();
	myTrophies['descr']		= new Array();
	myTrophies['img']		= new Array();
	myTrophies['date']		= new Array();
	myTrophies['100P']		= new Array();
	myTrophies['plat']		= new Array();
	
	rawGames = $c_('gameTitleSortField');
	rawProgress = $c_('gameProgressSortField');
	rawPlat = $c_('trophycontent');
	for (i=0; i<rawGames.length; i++) {
		gameInfo['name'][i]	= rawGames[i].innerHTML;
		gameInfo['url'][i]	= rawGames[i].parentNode.href.match(/\/\d.*/gi)[0].substring(1);
		gameInfo['prog'][i]	= parseInt(rawProgress[i].innerHTML);
		gameInfo['plat'][i]	= parseInt(rawPlat[(i*5)+4].innerHTML);
	}
	
	if (rawGames.length === 0) {
		if ($_('slots_container').innerHTML.match('You do not currently have any trophies in your list')) {
			$('greaseOverContent').innerHTML = 'You do not currently have any trophies in your list. Please be patient as your trophies are loading.';
		}
	} else {
		startParse = new Date();
		requestTrophyDetails(0);
	}
}

requestTrophyDetails = function (iterator) {
	if (iterator < gameInfo['url'].length) {
		if (gameInfo['prog'][iterator] !=0) {
			myURL = 'http://us.playstation.com/playstation/psn/profile/' + curPSN + '/get_ordered_title_details_data';
			
			loaderIcon(true);
			loaderPop(true);
			myString  = '<center style="margin-right: 35px;"><div style="width: 200px; overflow: hidden;"> ' + gameInfo['name'][iterator] +'</div>';
			myString += '<div style="margin: 5px 35px; background-color: rgb(251, 251, 251); border: 1px solid #CCC; background-repeat: no-repeat; height: 12px; width: 90px; display: block;"><div style="width: ' + (Math.round(86*iterator/gameInfo['url'].length)) + 'px; background-color: #BFDCFF; float: left; height: 6px; margin: 3px 2px; overflow: hidden;"></div></div></center>';
			$('loaderPopContent').innerHTML = myString
			
			var xmlhttp =  new XMLHttpRequest();
			xmlhttp.open("POST", myURL, true);
			params = '&sortBy=id_asc&titleId=' + gameInfo['url'][iterator];
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.setRequestHeader("Content-length", params.length);
			xmlhttp.setRequestHeader("Connection", "close");
			xmlhttp.overrideMimeType('text/html; charset=utf-8');
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState==4) {
					loaderIcon(false);
					loaderPop(false);
					if (xmlhttp.status==200) {
						if (xmlhttp.responseText!='<TrophyResponse status="1"/>') {
							
							//Hide the Trophy Stats Button
							$_('greaseTrophyStats').style.visibility = 'hidden';
							
							//Hide the filter buttons
							$_('greaseDisplayAll').parentNode.style.visibility = 'hidden';
							if ($_('greaseFriendAll')) {
								$_('greaseFriendAll').parentNode.style.visibility = 'hidden';
								$_('displaySummary').style.visibility = 'hidden';
							}
							
							//alert(xmlhttp.responseText);
							/***************GETTING RAW TROPHY SLOTS*******************/
							myString = xmlhttp.responseText.replace(/[^\/\w\<\>=":,&;\. ]/gmi, '');
							while (myString.match('  ')) {
								myString = myString.replace(/  /gi,' ');
							}
							
							//In case no trophies have been gotten
							if (myRawTrophies = myString.match(/<div class="slot .*?<\/div> <\/div> <\/div> <\/div> <\/div>/g)) {
								//Remove all slots for trophies not obtained
								for (i=0; i<myRawTrophies.length; i++) {
									if (myRawTrophies[i].match('alt="Locked Trophy"')) {
										myRawTrophies.splice(i,1);
										i --;
									} 
								}
								
								for (i=0; i<myRawTrophies.length; i++) {
									//If we don't have a date, don't add the trophy (for some reason it's not labeled as "locked"
									if (myDate = myRawTrophies[i].match(/dateEarnedSortField.*?\<\/span/)) {
										pos = myTrophies['game'].length;
										
										myDate = myDate[0].match(/\>.*?\</)[0];
										myDate						= myDate.substring(1,myDate.length-1);
										myDateArr					= myDate.split(" ");
										
										dateObject = new Date();
										
										temp = myRawTrophies[i].match(/titletext titlepage.*?<\/td>/)[0];
										if (temp.match(/<td> <\/td>/)) {
											myTrophyName = '???';
										} else {
											myTrophyName = myRawTrophies[i].match(/trophyTitleSortField.*?\<\/span\>/)[0].match(/\>.*?\</)[0];
											if (myTrophyName=='><') {
												myTrophyName = 'Could not find trophy name';
											} else {
												myTrophyName = myTrophyName.match(/[\w '".-;&,]+/gi)[0];
											}							
											myTrophyName = processTitle(myTrophyName,true);
										}
										
										//Basically there are a couple trohpies that have synced improperly, and this is to conteract that. 
										if (parseFloat(myDateArr[5]) < 2008) {	//If this trophy's year is before trophies were added to the PSN
											//Increment Errors; Leave as Now
											numTimeErr ++;
											myTimeErrMessage += '<li>' + gameInfo['name'][iterator] + ' - ' + myTrophyName + '</li>';
										} else {
											dateObject.setFullYear(myDateArr[5],getMonthNum(myDateArr[1]),myDateArr[2]);	//Year, Month, Day						
											dateObject.setHours(myDateArr[3].split(':')[0]);								//Hours
											dateObject.setMinutes(myDateArr[3].split(':')[1]);								//Minutes
											dateObject.setSeconds(myDateArr[3].split(':')[2]);								//Seconds	
											
											myTrophies['date'][pos]	= dateObject;
											
											myTrophies['game'][pos] 	= gameInfo['name'][iterator];
											myTrophies['value'][pos]	= myRawTrophies[i].match(/(HIDDEN|BRONZE|SILVER|GOLD|PLATINUM)(?= <\/span> <div class="trophycount normal">)/)[0];
											myTrophies['img'][pos]		= myRawTrophies[i].match(/http:\/\/.*?png/i)[0];
											myTrophies['name'][pos]		= myTrophyName;
											
											if (myDesc = myRawTrophies[i].match(/\<span class="subtext"\>.*?\<\/span>/)) {
												myDesc = myDesc[0].replace(/\<(s|\/s)pan.*?\>/g,'');
												myTrophies['descr'][pos] = processTitle(myDesc);
											} else {
												myTrophies['descr'][pos] = '???';
											}
											
											if (gameInfo['prog'][iterator] === 100)  {myTrophies['100P'][pos] = true; } 
																				else {myTrophies['100P'][pos] = false;}
											
											if (gameInfo['plat'][iterator]) 		 {myTrophies['plat'][pos] = true; }
																				else {myTrophies['plat'][pos] = false;}
										}
									}
									
									
								}
							}
							multiSort('date');
							requestTrophyDetails(iterator+1);
						} else {
							errMessage('You must be logged in to view statistics','&lt;TrophyResponse status="1"/&gt;');
						}
					} else {
						alert('Error loading ' + gameInfo['name'][iterator] + '\r\rThis isn\'t good. :(. \n\nMake sure that you are signed in and have an active internet connection.');
					}
				} 
			}
			xmlhttp.send(params);
		} else {
			requestTrophyDetails(iterator+1);
		}
	} else {
		upCheck();
		multiSort('date');
		getCharts();
	}
}

window.displayData = function () {
	myString  = '<table>';
	myString += '<tr><th><a class="greasesort" id="game">Game</a></th><th><a class="greasesort" id="name">Name</a></th><th><a class="greasesort" id="value">Value</a></th><th><a id="sortdate">Date</a></th><th>100%</th><th>Platinum</th><th>Description</td><th>Img</th></tr>';
	for (i=0; i<myTrophies['game'].length; i++) {
		myString += '<tr>';
		myString += '<td>'+myTrophies['game'][i]+'</td>';
		myString += '<td>'+myTrophies['name'][i]+'</td>';
		myString += '<td>'+myTrophies['value'][i]+'</td>';
		myString += '<td>'+(myTrophies['date'][i].getMonth()+1)+'/'+myTrophies['date'][i].getDate()+'/'+myTrophies['date'][i].getFullYear()+' '+myTrophies['date'][i].getHours()+':'+myTrophies['date'][i].getMinutes()+':'+myTrophies['date'][i].getSeconds()+'</td>';
		myString += '<td>'+myTrophies['100P'][i]+'</td>';
		myString += '<td>'+myTrophies['plat'][i]+'</td>';
		myString += '<td>'+myTrophies['descr'][i]+'</td>';
		myString += '<td><small><a target="_blank" href="'+myTrophies['img'][i]+'">'+myTrophies['img'][i].substring(myTrophies['img'][i].length-13,myTrophies['img'][i].length)+'</a></small></td>';
		myString += '</tr>';
	}
	myString += '</table>';
	$c_('mainlist')[0].innerHTML = myString;
	if ($('greaseOverlay')) {$('greaseOverlay').style.display = 'none';}
	myHeight = trophyFrame.body.offsetHeight+50;
	if (myHeight > 32767) {
		$('profileFrame').style.overflowY = 'auto';
		$('profileFrame').style.height =  '32767px';
	} else {
		$('profileFrame').style.height =  myHeight + 'px';
	}
	
	if (typeof(endParse) == "undefined") {
		endParse = new Date();
	}
	$c_('profile_note')[0].innerHTML = 'coding &copy; ' + endParse.getFullYear() + ' <a href="http://us.playstation.com/publictrophy/index.htm?onlinename=jobe_tr">Ronald Troyer | PSN: jobe_tr</a>. Trophy statistics accuracy is contingent on syncing trophies from the Playstation 3 XMB menu. Trophy statistics parsed on: ' + (endParse.getMonth()+1) + '/' + endParse.getDate() + '/' + endParse.getFullYear() +'<br/><a href="javascript:" id="toggleLink">View graphs</a>';
	$_('toggleLink').addEventListener("click", function () {
		window.getCharts();
	}, false);
}

window.getCharts = function () {
	/*COLORS
	Platinum	- B5BECF
	Gold		- FFD424
	Silver		- D9D9D9
	Bronze		- CD9403
	Hidden		- 484830
	*/
	
	dayArr = new Array();
	hourArr = new Array();
	
	//Start Day of week and hour counts at 0 
	for (i=0;i<7;i++) {dayArr[i] = 0;}
	for (i=0;i<24;i++) {hourArr[i] = 0;}
	
	//Add up those totals
	for (i=0; i<myTrophies['date'].length; i++) {
		dayArr[myTrophies['date'][i].getDay()]++;
		hourArr[myTrophies['date'][i].getHours()]++;
	}

	/************************DAY OF WEEK DATA************************/
	myData = '';
	myMax = 0;
	for (i=0;i<7;i++) {myData+= dayArr[i] + ','; if (dayArr[i] > myMax) {myMax = dayArr[i]}}
	myData = myData.substring(0,myData.length-1);															//get rid of the trailing comma
	myMax = Math.ceil((myMax+Math.round(myMax/20))/10)*10;													//add a little to the max to scale the chart better
	myString = '<img width="240" height="200" style="margin-right: 5px;" src="http://chart.apis.google.com/chart?cht=bvg&chtt=Day%20Of%20The%20Week&chd=t:' + myData + '&chl=S|M|T|W|T|F|S&chs=240x200&chco=BFDCFF,54C7C5,999999&chxt=x,y&chf=bg,s,FFFFFF&chds=0,' + myMax + '&chxl=1:|0|'+ Math.round(myMax/4) + '|' + Math.round(myMax/2) + '|' + (Math.round(myMax/4) + Math.round(myMax/2)) + '|' + myMax + '&chbh=20,0,10&chm=N*f0*,000000,0,-1,8" />';
	
	/***********************HOUR OF DAY DATA***********************/
	myData = '';
	myMax = 0;
	for (i=0;i<24;i++) {myData+=  hourArr[i] + ','; if (hourArr[i] > myMax) {myMax = hourArr[i]}}
	myData = myData.substring(0,myData.length-1);
	myMax = Math.ceil((myMax+Math.round(myMax/20))/10)*10;
	
	//this is to show time zone
	var now = new Date();
	GMT = now.toString().match(/\(.*?\)/)[0];
	
	myString += '<img width="430" height="200" src="http://chart.apis.google.com/chart?cht=bvg&chtt=Hour ' + GMT + '&chd=t:' + myData + '&chl=0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23&chs=430x200&chco=BFDCFF,54C7C5,999999&chxt=x,y&chf=bg,s,FFFFFF&chds=0,' + myMax + '&chxl=1:|0|'+ Math.round(myMax/4) + '|' + Math.round(myMax/2) + '|' + (Math.round(myMax/4) + Math.round(myMax/2)) + '|' + myMax + '&chbh=9,5&chm=N*f0*,000000,0,-1,11" />';
	
	/**********************PROGRESS GRAPH DATA*********************/
	myDataArr = new Array();
	myDataArr['HIDDEN']		= new Array();
	myDataArr['BRONZE']		= new Array();
	myDataArr['SILVER']		= new Array();
	myDataArr['GOLD']		= new Array();
	myDataArr['PLATINUM']	= new Array();
	
	hiddenCount = 0;
	bronzeCount = 0;
	silverCount = 0;
	goldCount = 0;
	platinumCount = 0;
	
	dateSkip = 14;
	
	curDate = new Date(myTrophies['date'][0].getFullYear(), myTrophies['date'][0].getMonth(), myTrophies['date'][0].getDate(),0,0,0,0);
	for (i=0; i<myTrophies['date'].length+1; i++) {
		if (i == myTrophies['date'].length) {
			dateA = myTrophies['date'][i-1].getMonth() + '' + myTrophies['date'][i-1].getDate();
			dateB = startParse.getMonth() + '' + startParse.getDate();
			tempDate = startParse;
		} else {
			dateA = myTrophies['date'][i].getMonth() + '' + myTrophies['date'][i].getDate();
			dateB = curDate.getMonth() + '' + curDate.getDate();
			tempDate = new Date(myTrophies['date'][i].getFullYear(), myTrophies['date'][i].getMonth(), myTrophies['date'][i].getDate(),0,0,0,0);
		}
		if ((dateA != dateB)) {
			if (curDate != -1) {				
				diff = tempDate.getTime() - curDate.getTime();
				diff = Math.round(diff/86400000);
				
				for(diffI = 0; diffI < diff-1; diffI ++) {
					myDataArr['HIDDEN'][myDataArr['HIDDEN'].length]		= hiddenCount;
					myDataArr['BRONZE'][myDataArr['BRONZE'].length]		= hiddenCount+bronzeCount;
					myDataArr['SILVER'][myDataArr['SILVER'].length]		= hiddenCount+bronzeCount+silverCount;
					myDataArr['GOLD'][myDataArr['GOLD'].length] 		= hiddenCount+bronzeCount+silverCount+goldCount;
					myDataArr['PLATINUM'][myDataArr['PLATINUM'].length] = hiddenCount+bronzeCount+silverCount+goldCount+platinumCount;
				}
			}
			
			if (i != myTrophies['date'].length) {
				curDate = new Date(myTrophies['date'][i].getFullYear(), myTrophies['date'][i].getMonth(), myTrophies['date'][i].getDate(),0,0,0,0);
			}
			
			myDataArr['HIDDEN'][myDataArr['HIDDEN'].length]		= hiddenCount;
			myDataArr['BRONZE'][myDataArr['BRONZE'].length]		= hiddenCount+bronzeCount;
			myDataArr['SILVER'][myDataArr['SILVER'].length]		= hiddenCount+bronzeCount+silverCount;
			myDataArr['GOLD'][myDataArr['GOLD'].length] 		= hiddenCount+bronzeCount+silverCount+goldCount;
			myDataArr['PLATINUM'][myDataArr['PLATINUM'].length] = hiddenCount+bronzeCount+silverCount+goldCount+platinumCount;
			
		}
		if (i < myTrophies['date'].length) {
			switch (myTrophies['value'][i]) {
				case 'HIDDEN': hiddenCount++; trace('hidden'); break;
				case 'BRONZE': bronzeCount++; trace('bronze'); break;
				case 'SILVER': silverCount+=2; trace('silver'); break;
				case 'GOLD': goldCount+=6; trace('gold'); break;
				case 'PLATINUM': platinumCount+=12; trace('platinum'); break;
			}
		}
	}

	myData = '';	
	for(i=0; i<5;i++) {
		switch (i) {
			case 0: mytarget = "PLATINUM"; break;
			case 1: mytarget = "GOLD"; break;
			case 2: mytarget = "SILVER"; break;
			case 3: mytarget = "BRONZE"; break;
			case 4: mytarget = "HIDDEN"; break;
		}
		for (i2=0; i2<myDataArr[mytarget].length; i2+=dateSkip) {
			myData += myDataArr[mytarget][i2];
			/*if ((i2 + dateSkip >= myDataArr[mytarget].length) && (i2 != myDataArr[mytarget].length-1)) {
				myData += myDataArr[mytarget][myDataArr[mytarget].length-1];
			}*/
			if (i2+dateSkip < myDataArr[mytarget].length) {
				myData += ',';
			}
		} 
		myData += '|';
	}
	myData = myData.substring(0,myData.length-1);
	
	myMax = hiddenCount+bronzeCount+silverCount+goldCount+platinumCount;
	
	//Get Year lines
		numYears = '';
		yearPos = '';
		yearNum = startParse.getFullYear() - myTrophies['date'][0].getFullYear();
		if (yearNum > 0) {
			//Full Graph eg: 1.5 years
			actYear = (startParse.getTime() - myTrophies['date'][0].getTime())/(1000*60*60*24*365);
			//Get one year percent of graph
			graphYearPer = (100/actYear).toFixed(2);
			
			//Get Offset
			beginYear = new Date(myTrophies['date'][0].getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
			endYear = new Date(myTrophies['date'][0].getFullYear()+1, 0, 1, 0, 0, 0, 0).getTime();
			offsetPer = 1-(myTrophies['date'][0].getTime() - beginYear)/(endYear - beginYear);
			graphOffPer = (100*offsetPer/actYear).toFixed(2);
			
			for (i=0;i<yearNum;i++) {
				numYears+='| ';
				yearPos+=',' + (parseFloat(graphOffPer) + parseFloat(graphYearPer*i));
			}
			numYears +='|';
		} else {
			numYears = '||';
		}
	
	myString += '<br/><br/><big>Weighted Trophy Progress</big>';
	myString += '&nbsp;[<a href="javascript: (alert(\'These trophies are weighted to their values. <br/><br/><center><table><tr><td colspan=&quot;2&quot;>For example:</td></tr><tr><td align=&quot;right&quot;>bronze</td><td align=&quot;left&quot;> - 15 points</td></tr><tr><td align=&quot;right&quot;>siver</td><td align=&quot;left&quot;> - 30 points</td></tr><tr><td align=&quot;right&quot;>gold</td><td align=&quot;left&quot;> - 90 points</td></tr><tr><td align=&quot;right&quot;>platinum</td><td align=&quot;left&quot;> - 180 points</td></tr></table></center><br/><br/><br/><br/><a target=&quot;_black&quot; style=&quot;color:#333; text-decoration: underline&quot; href=&quot;http://www.xtremeps3.com/2009/12/21/playstation-3-trophy-system-explained/&quot;>via</a>\'))()">?</a>]<br/>';
	myString += '<img style="margin: 25px 5px;" width="740" height="200" src="http://chart.apis.google.com/chart?cht=ls&chd=t:' + myData + '&chds=0,' + Math.round(myMax*1.1) + '&chs=740x200&chf=bg,s,FFFFFF&chm=B,B5BECF,0,0,0|B,FFD424,1,0,0|B,D9D9D9,2,0,0|B,CD9403,3,0,0|B,484830,4,0,0&chco=A5AEBF,EEC414,C9C9C9,BD8400,383820&chxt=x,y,t&chxl=0:||1:||2:' + numYears + '&chxs=2,888888,0,1.2,t,888888&chxp=2' + yearPos + '&chxtc=1,0|2,-1000" />';
	
	/*********TROPHIES PER DAY***********/
	myDif = (startParse.getTime() - myTrophies['date'][0].getTime())/(1000*60*60*24);
	myString += '<br/><span title="' + totalTrophies + ' trophies in ' + Math.floor(myDif) + ' days">' + ($_('id-handle').innerHTML.replace(/\s/g,'')) + ' earns ' + (Math.round(100*totalTrophies/myDif)/100) + ' trophies per day.</span><br/><br/>';
	
	/*********RECENT TROPHIES************/
	if (totalTrophies > 3) {
		myString += '<br/><br/>';
		myString += '<div style="padding: 10px; background-color: #F2F2F2;"><big id="recentTrophyTitle" style="display: inline-block;">Recent Trophies <a id="recentShuffle" title="random" class="recentArrow" href="javascript:"><img style="vertical-align: middle;" src="http://fc00.deviantart.net/fs70/f/2010/136/4/8/shuffle_by_user002.gif"></a></big>';		
		myString += '<table id="recentTable" style="margin-top: 10px;" cellspacing=10></a><tr>'
		myString += '</tr></table>';
		
		myString += '<table><tr><td width=50>'
		myString += '<a id="recentStart" class="recentArrow" style="display: inline-block; width: 11px; height: 13px; background: transparent url(http://fc09.deviantart.net/fs71/f/2010/136/3/a/Arrows_by_user002.gif) no-repeat scroll 0 0;" href="javascript:"></a>';
		myString += '<a id="recentLeft" class="recentArrow" style="display: inline-block; width: 11px; height: 13px; background: transparent url(http://fc09.deviantart.net/fs71/f/2010/136/3/a/Arrows_by_user002.gif) no-repeat scroll -11px 0; margin-right: 15px;" href="javascript:"></a>';
		myString += '</td><td><center>';
		
		myString +='<div style="display: inline-block; margin-top: 15px; background-color: rgb(251, 251, 251); background-image: url(\'/playstation/img/barline-short.png\'); background-repeat: no-repeat; height: 12px; width: 90px;">';
		myString +='<div id="recentPercent" style="width: 86px;" class="progress_bar progress_bar_blue"></div>';
		myString +='</div><div style="margin: 0pt;"><small id="recentPercentLabel"></small></div>';
		
		myString += '</center></td><td width=50>';
		myString += '<a id="recentRight" class="recentArrow" style="display: inline-block; width: 11px; height: 13px; background: transparent url(http://fc09.deviantart.net/fs71/f/2010/136/3/a/Arrows_by_user002.gif) no-repeat scroll -22px 0; margin-left: 15px;" href="javascript:"></a>';
		myString += '<a id="recentEnd" class="recentArrow" style="display: inline-block; width: 11px; height: 13px; background: transparent url(http://fc09.deviantart.net/fs71/f/2010/136/3/a/Arrows_by_user002.gif) no-repeat scroll -33px 0;" href="javascript:"></a>';
		myString += '</td></tr></table></div>';
		
		window.generateRecent = function (range) {		
			myRecString = '';
			if (range > 0) {range=0;}
			for(i=2;i>=0;i--) {
				choice = (myTrophies['game'].length+range-i-1);
				if (choice >= 0) {
					Date = (myTrophies['date'][choice].getMonth()+1) + '/' + (myTrophies['date'][choice].getDate())+ '/' + (myTrophies['date'][choice].getFullYear());
					myRecString += '<td style="height: 88px;">'
					myRecString += '<div style="margin: 5px 10px 5px 20px; -moz-background-inline-policy:continuous;-moz-border-radius:5px;background:none repeat scroll #FFF;padding:6px 6px 4px 6px;">';
					myRecString += '<img src="' + myTrophies['img'][choice] + '" title="' + myTrophies['name'][choice] + ' -  ' + myTrophies['descr'][choice] + '" width=65 height=65 style="background-color: #000; width: 65px;"></div></div></td><td><table><tr><td colspan="2" style="width: 170px"><b>' + myTrophies['game'][choice] + '</b></td></tr><tr><td valign=top style="width: 24px"><div style="width: 16px;" class="greaseTrophy grease' + myTrophies['value'][choice] + '" title="' + myTrophies['value'][choice] + '"></div></td><td><span title="' + myTrophies['descr'][choice] + '">' + myTrophies['name'][choice] + '</span></td></tr><tr><td></td><td><small style="color: #888;">obtained on: <span title="' + myTrophies['date'][choice] + '">' + Date + '</td></tr></table></td>';
				}
			}
			
			$_('recentTable').innerHTML = myRecString;
			
			//Hide the right arrow
			if (range > -2) {
				$_('recentRight').style.display = $_('recentEnd').style.display = 'none';
			} else {
				$_('recentRight').style.display = $_('recentEnd').style.display = 'inline-block';
			}
			
			//Hide left arrow
			if (myTrophies['game'].length + range < 4) {
				$_('recentLeft').style.display = $_('recentStart').style.display = 'none';
			} else {
				$_('recentLeft').style.display = $_('recentStart').style.display = 'inline-block';
			}
			
			//Update Ranges
			$_('recentStart').className = -(myTrophies['game'].length-3);
			$_('recentLeft').className = range - 3;
			$_('recentRight').className = range + 3;
			$_('recentEnd').className = 0;
			$_('recentShuffle').className = -(Math.round(Math.random()*myTrophies['game'].length));
			
			//Update Pagination
			$_('recentPercent').style.width = ((((myTrophies['game'].length + range)/myTrophies['game'].length)*86).toFixed(2)) + 'px';
			low = (myTrophies['game'].length + range - 2);
			if (low < 1) {low = 1}
			$_('recentPercentLabel').innerHTML = low + ' - ' + (myTrophies['game'].length + range);
		}
	}
	
	/****************FINAL OUTPUT*******************/
	
	myErr = '<br/>';
	if (numTimeErr>0) {
		myTimeErrMessage = myTimeErrMessage.replace(/'/g, '\\\'');
		myErr += '<small>' + numTimeErr + ' trophies were improperly syncronized. [<a href="javascript: (alert(\'These are trophies that do not have a date/time that was syncronized when updated. If you find the trophy in your actual list, the time will be labeled as December 31, 0001. This is a permanent, (as far as I can tell), situation, so if you see this, I\\\'m sorry, it\\\'s not my fault.<br/><br/>Here\\\'s a list of those trophies:<br/>' + myTimeErrMessage + '</ul></small>\'))()">?</a>]</small> ';
	}
	 
	if (typeof(endParse) == "undefined") {
		endParse = new Date();
	}
	diffSec = endParse.getTime() - startParse.getTime();
	diffSec = (Math.round(diffSec/100))/10;
	myString = '<center>'+myErr+'<br/><br/>' + myString + '</center>';
	
	$c_('profile_note')[0].innerHTML = '<span title="data parsed in: ' + diffSec + ' seconds">coding &copy; ' + endParse.getFullYear() + ' <a href="http://us.playstation.com/publictrophy/index.htm?onlinename=jobe_tr">Ronald Troyer | PSN: jobe_tr</a>. Trophy statistics parsed on: ' + (endParse.getMonth()+1) + '/' + endParse.getDate() + '/' + endParse.getFullYear() +'<br/>Trophy statistics accuracy is contingent on syncing trophies from the Playstation 3 XMB menu and the database integrity of the US Playstation site. <br/><a href="javascript:" id="toggleLink">View raw data</a></span>';
	$_('toggleLink').addEventListener("click", function () {
		window.displayData();
	}, false);
	$c_('mainlist')[0].innerHTML = myString;
	if ($('greaseOverlay')) {$('greaseOverlay').style.display = 'none';}
	
	
	/*****RECENT TROPHY LISTENER*****/
	if (totalTrophies > 3) {
		arr = $c_('recentArrow');
		for (i=0;i<arr.length;i++) {
			arr[i].addEventListener("click",function(){
				window.generateRecent(parseFloat(this.className));
			},false);
		}
		window.generateRecent(0);
	}
	
	resizeFrame();
}

}
{/**********************GAME PAGE*******************************/
gamePage = function () {
	/*if (gameTitle = $_('breadcrumb').childNodes[1].innerHTML.replace(/[^(&gt;)\w\d ]/g,'')) {
		gameTitle = gameTitle.replace(/.*?&gt;/,'');
		while (gameTitle.match('  ')) {
			gameTitle = gameTitle.replace(/  /g,' ');
		}
	} else {
		gameTitle = '';
	}
	
	oldValue = 0;
	$_('theMainSlot').addEventListener('DOMNodeInserted', function () {
		trophies = $c_('trophyTitleSortField');
		
		if (trophies.length != oldValue) {
			for(i=0;i<trophies.length;i++) {
				if (!(trophies[i].innerHTML.match('favicon.ico'))) {
					myString  = '<a target="_blank" href="http://www.youtube.com/results?search_type=&search_query=';
					myString += gameTitle + ' ' + trophies[i].innerHTML + '">';
					myString += '<img src="http://www.youtube.com/favicon.ico" style="vertical-align: middle; margin-left: 10px; width: 16px; height: 16px;"></a>';
					
					myString += '<a target="_blank" href="http://www.google.com/search?q=';
					myString += gameTitle + ' ' + trophies[i].innerHTML + ' trophy">';
					myString += '<img src="http://www.google.com/favicon.ico" style="vertical-align: middle; margin-left: 10px; width: 16px; height: 16px;"></a>';
					
					trophies[i].innerHTML += myString;
				}
			}
		}
		
		oldValue = trophies.length;
	},false);*/
}
}
{/**********************GET POSITION****************************/
//This entire section should only happen on your trophy page
prepPos = function (check) {
	if (!(check)) {
		check = '';
	}
	slots = $c_('slotcontent');
	if (slots.length === 0) {
		PosT=setTimeout(function () {prepPos(check)},1000);
	} else {
		//Heading
		var div=trophyFrame.createElement('div');
		div.className = 'headerSeparator';
		$_('topcontent').appendChild(div);
		
		var div=trophyFrame.createElement('div');
		div.className = 'colHeader topslotCol3 sortPointer';
		div.id = 'greasePosHeader';
		div.title = 'Click to generate game positions';
		div.innerHTML = '<div class="columntext"><a id="getPOS" href="javascript:">GET POSITION</a></div>';
		$_('topcontent').appendChild(div);
		$_('getPOS').addEventListener('click', getPosClick ,false);
		
		myString  = '.gamePositionCount {font-size: 1.8em; font-weight: bold;} .gamePositionTotal {font-size: .8em;} .greasePosition{display:none;}';
		myString += '.trophiescontainer .slotcontent .trophycount .trophycontent.greasePosBubble {margin-top: 10px; margin-left: 14px; padding: 5px; width: 48px;}';
		myString += '.trophiescontainer .slotcontent .trophycount.hover .trophycontent.greasePosBubble {-moz-border-radius: 0px 8px 8px 0pt; margin-top: 10px; margin-left: 14px; display: block; padding: 5px; width: 48px; color: #FFF; background-color:rgba(72,72,72,.9)}';
		myString += '#posPop td {padding-top: 5px; padding-bottom: 20px;} #posPop .posRow td {padding-bottom: 5px;}';
		
		addCSSRule(myString,trophyFrame);
		
		var div=trophyFrame.createElement('div');
		div.id = 'posPop';
		div.style.position = 'absolute';
		div.style.display = 'none';
		div.style.right = '90px';
		div.style.color = '#FFF';
		div.innerHTML = '<div id="posPopContent" style="background-color: rgba(72, 72, 72, 0.9); -moz-border-radius: 8px 0px 8px 8px; padding: 10px; min-width: 150px; min-height: 50px"></div>';
		$_('theMainSlot').appendChild(div);
	}
}


getPosClick = function () {
	this.innerHTML = 'POSITION';
	this.title = '';
	
	slots = $c_('slotcontent');
	for (i=0; i<slots.length; i++) {
		slots[i].parentNode.id = slots[i].childNodes[1].childNodes[3].textContent.replace(/\s/g,'');
		slots[i].comparePos = '';
		
		var div=trophyFrame.createElement('div');
		div.className = 'trophycount collection greasePosition';
		myString  = '<center><div class="trophycontent greasePosBubble">';
		myString += '<span class="gamePositionCount" title=" ">1</span> / <span class="gamePositionTotal" title=" ">1</span>';
		myString += '<span class="hide comparePos"></span>';
		myString += '</div></center>';
		div.innerHTML = myString;
		
		div.addEventListener('mouseover', function (e) {
			if (tempArr = this.parentNode.id.match(/\[.*?\]/g)) {
				tempArr.sort();
				tempArr.reverse();
				
				//FIND THE NODE NUMBER
				curGame = this.parentNode.parentNode.id;
				myId = -1;
				slots=$c_('slotcontent');
				for(i=0;i<slots.length;i++) {if (curGame == slots[i].parentNode.id) {myId=i; i=slots.length;}}
				if (myId === -1) {
					alert('I\'m broke. Fix me.');
				} else {
					thisTop = $_('theMainSlot').offsetTop + (myId*61+10) - $_('theMainSlot').scrollTop;
					thisBottom = (($_('theMainSlot').offsetTop + $_('theMainSlot').offsetHeight) - ((myId*61+10) + 41) + $_('theMainSlot').scrollTop);
					if ((thisTop>0) && (thisBottom-7>0)) {
						//Show it
						this.className = 'trophycount collection greasePosition hover';
						$_('posPop').style.display = 'block';
						
						//Set position
						if ($_('theMainSlot').getElementsByTagName('div')[0].id == 'posPop') {
							$_('posPop').style.marginTop = (10 + (myId)*61) + 'px';
						} else {
							$_('posPop').style.marginTop = (10 - ((slots.length-myId)*61)) + 'px';
						}
						
						//Set content
						myString = '<table style="width: 100%;">';
						myPercent = parseFloat(this.parentNode.getElementsByClassName('gameProgressSortField')[0].innerHTML)/1000;
						
						myPeeps = new Array();
						myPeeps['name'] = new Array();
						myPeeps['percent'] = new Array();
						
						for(i=0;i<tempArr.length;i++) {
							myPeeps['name'][i] = tempArr[i].split(':')[1].replace(']','');
							myPeeps['percent'][i] = tempArr[i].split(':')[0].replace('[','');
						}
						
						myPeeps['name'].splice(0,0,myPSN);
						myPeeps['percent'].splice(0,0,myPercent);
						
						for(i=0;i<myPeeps['name'].length;i++) {
							myPercent = parseFloat(myPeeps['percent'][i])*1000;
							myString += '<tr';
							if (i!=0) {myString+= ' class="posRow"';}
							myString += '><td align="RIGHT" style="';
							myString += '">' + myPeeps['name'][i] + '</td>';
							myString += '<td style="';
							myString += '"><div style="margin-left: 10px;display: inline-block; float: left; margin-right: 5px; background-color: #FFF; border: 1px solid #CCF; height: 12px; width: 90px;"><div class="progress_bar';
							if (i==0) {myString += ' progress_bar_blue';}
							myString += '" style="width: ' + Math.round(myPercent*86/100) + 'px; margin-right: 0px;"></div></div></td>';
							myString += '<td align="LEFT">' + myPercent + '%</td></tr>';
						}
						myString += '</table>';
						
						$_('posPopContent').innerHTML = myString;
						
						if ($_('theMainSlot').offsetHeight-18 < $_('posPop').offsetHeight) {
							rows = $c_('posRow');
							oldLength = rows.length;
							for (i=oldLength-1; i>=0; i--) {
								rows[i].parentNode.removeChild(rows[i]);
								if ($_('theMainSlot').offsetHeight-18 >= $_('posPop').offsetHeight) {
									i = -1;
								}
							}
							this.title = 'Displaying ' + $c_('posRow').length + ' of ' + oldLength;
						} else {
							this.title = '';
						}
						
						myOverlap = (($_('theMainSlot').offsetTop + $_('theMainSlot').offsetHeight) - ($_('posPop').offsetTop + $_('posPop').offsetHeight));						
						if (myOverlap < 8) {
							thisBottom = (($_('theMainSlot').offsetTop + $_('theMainSlot').offsetHeight) - ((myId*61+10) + 41) + $_('theMainSlot').scrollTop);
							$_('posPop').style.marginTop = (parseFloat($_('posPop').style.marginTop.match(/[\d-]+/)[0]) + myOverlap - 8) + 'px';
							if (thisBottom >= 16) {thisBottom = 8} else {thisBottom -= 8; if(thisBottom < 0) {thisBottom = 0;}}
							$_('posPop').innerHTML = $_('posPop').innerHTML.replace(/-moz-border-radius: .*?;/, '-moz-border-radius: 8px 8px ' + thisBottom + 'px 8px;');
						} else {
							$_('posPop').innerHTML = $_('posPop').innerHTML.replace(/-moz-border-radius: .*?;/, '-moz-border-radius: 8px 0px 8px 8px;');
						}
					}
				}
			}
		}, false);
		
		div.addEventListener('mouseout', function () {
			$_('posPop').style.display = 'none';
			this.className = 'trophycount collection greasePosition';
		}, false);
		
		slots[i].appendChild(div);
	}
	
	getPos();
	
	$_('getPOS').removeEventListener('click', getPosClick ,false);
}

getPos = function () {
	url = 'http://us.playstation.com/playstation/psn/profile/friends'
	loaderIcon(true);
	
	var http =  new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Connection", "close");
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			loaderIcon(false);
			if (http.status == 200) {
				res = http.responseText;
				res = res.replace(/(\\r|\\n|\r|\n)+/g,'');
				friends = res.split('class="slot"');
				
				for (i=1; i<friends.length; i++) {
					if (tempid = friends[i].match(/value=".*?"/)) {
						friends[i] = tempid[0].replace(/(value="|")/g,'');
						friends[i] = friends[i].replace(/[^\w\d-_]/g,'');
					}
				}
				friends.splice(0,1);
				window.friends = friends;
				
				getPosGames(0);
			}
		}
	}
	http.send('');
}

getPosGames = function (positerator) {
	if (positerator < window.friends.length) {
		var url = 'http://us.playstation.com/playstation/psn/profile/' + window.friends[positerator] + '/get_ordered_trophies_data';
		loaderIcon(true);
		loaderPop(true);
		myString  = '<center style="margin-right: 35px;"><div style="width: 200px; overflow: hidden;"> ' + window.friends[positerator] +'</div>';
		myString += '<div style="margin: 5px 35px; background-color: rgb(251, 251, 251); border: 1px solid #CCC; background-repeat: no-repeat; height: 12px; width: 90px; display: block;"><div style="width: ' + (Math.round(86*positerator/window.friends.length)) + 'px; background-color: #BFDCFF; float: left; height: 6px; margin: 3px 2px; overflow: hidden;"></div></div></center>';
		$('loaderPopContent').innerHTML = myString;
		
		var http =  new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Connection", "close");
		http.onreadystatechange = function() {
			if(http.readyState == 4) {
				loaderIcon(false);
				loaderPop(false);
				if (http.status == 200) {
					res = http.responseText;
					res = res.replace(/(\\r|\\n|\r|\n)+/g,'');
					
					games = res.split('class="slot"');
					if (myGames = $c_('gameTitleSortField')) {
						for(i1=1; i1<games.length; i1++) {
							gameTitle = games[i1].match(/gameTitleSortField.*?\<\/span\>/);
							gameProgress = games[i1].match(/gameProgressSortField.*?\<\/span\>/);
							if ((gameProgress) && (gameTitle)) {
								gameTitle = gameTitle[0].replace(/(game.*?\>|\<\/span\>)/g,'');			
								gameTitle = gameTitle.replace(/(&#039;|')/g,'');			
								gameProgress = gameProgress[0].replace(/(game.*?\>|\<\/span\>)/g,'');
								
								for (i2=0;i2<myGames.length; i2++) {
								
									if (myGames[i2].innerHTML.replace(/(&#039;|')/g,'') === gameTitle) {
										mySlot = myGames[i2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
										myProgress = parseFloat(mySlot.getElementsByClassName('gameProgressSortField')[0].innerHTML);
										if (gameProgress > myProgress) {
											myPos = mySlot.getElementsByClassName('gamePositionCount')[0];
											myPos.innerHTML = parseFloat(myPos.innerHTML) + 1;
											if (parseFloat(myPos.innerHTML) >= 10) {
												myPos.parentNode.style.fontSize = '.9em';
											}
										}
										
										//this is so the sorting works right
										gameProgress = (gameProgress/1000).toFixed(3);
										mySlot.id += '[' + gameProgress + ':' + window.friends[positerator] + ']';
										
										myTotal = mySlot.getElementsByClassName('gamePositionTotal')[0];
										myTotal.innerHTML = parseFloat(myTotal.innerHTML) + 1;
										
										i2=myGames.length;
									}
								}
							}
						}
					}
					getPosGames(positerator+1);
				}
			}
		}
		http.send('');
		
	} else {
		addCSSRule('.greasePosition{display: inline;}',trophyFrame);
		$_('getPOS').addEventListener('click', sortPositionClick ,false);
		$_('getPOS').title = 'Sort by Position';
	}
}

sortPositionClick = function() {
	//Toggle
	if (myPosSort == 'asc') {
		myPosSort = 'desc';
	} else {
		myPosSort = 'asc';
	}
	
	sortPosition();
	sortPosition();
}
myPosSort = 'desc';
sortPosition = function() {
	myPositions = $c_('gamePositionCount');
	myPosTotal = $c_('gamePositionTotal');
	mySlots = $c_('slot');

	//Sort
	for (i=0;i<myPositions.length-1;i++) {
		/*myPercent0 =  (parseFloat(myPositions[i].innerHTML)-1)   / (parseFloat(myPosTotal[i].innerHTML)-1);
		myPercent1 =  (parseFloat(myPositions[i+1].innerHTML)-1) / (parseFloat(myPosTotal[i+1].innerHTML)-1);*/
		
		pos0 = parseFloat(myPositions[i].innerHTML);
		pos1 = parseFloat(myPositions[i+1].innerHTML);
		
		tot0 = parseFloat(myPosTotal[i].innerHTML);
		tot1 = parseFloat(myPosTotal[i+1].innerHTML);
		
		if (myPosSort == 'asc') {
			if ((pos1 < pos0) || ((tot1 > tot0) && (pos1 == pos0))) {
				mySlots[i].parentNode.insertBefore(mySlots[i+1],mySlots[i]);
				i-=2;
			}
		} else {
			if ((pos1 > pos0) || ((tot1 < tot0) && (pos1 == pos0))) {
				mySlots[i].parentNode.insertBefore(mySlots[i+1],mySlots[i]);
				i-=2;
			}
		}
		
		if (i<0) {
			i=0;
		}
	}
}

}

{/**********************DLC FILTER******************************/
function DLCDisplayAll () {
	checkIds();
	myGames = $c_('slot');
	for (i=0;i<myGames.length;i++) {
		myGames[i].id = '0;' + myGames[i].id.substring(2,3);
	}
	window.displayType = '';
	updateGameDisplay();
}

function DLCDisplayLimit (target) {
	checkIds();
	window.displayType = target;
	
	if (window.DLCGames) {
		setDLCDisplay();
	} else {		
		loadDLC('display');
	}
}

loadDLC = function (target) {
	loaderIcon(true);
	loaderPop(true);
	$('loaderPopContent').innerHTML = '<center style="margin-right: 35px;"><div style="display: table-cell; vertical-align: middle; height: 30px; width: 200px; overflow: hidden;">Loading Wiki page</div></center>';
	
	myURL = 'http://en.wikipedia.org/wiki/List_of_downloadable_PlayStation_3_games';
	GM_xmlhttpRequest({
		method: 'GET',
		overrideMimeType: 'text/html; charset=utf-8',
		url: myURL,
		onload: function(res) {
			if (res.status == 200) {
				loaderIcon(false);
				loaderPop(false);
				if ($('greaseOverlay')) {$('greaseOverlay').style.display = 'none';}
				res = res.responseText;
				if (DLCGames = res.match(/\<td\>\<i\>\<a href=".*" title=".*"\>.*\<\/a\>\<\/i\>/gi)) {
					for (rawi=0; rawi<DLCGames.length; rawi++) {
						DLCGames[rawi] = DLCGames[rawi].replace(/\<td\>\<i\>\<a href=".*" title=".*"\>/i,'');
						DLCGames[rawi] = DLCGames[rawi].replace(/\<\/a\>\<\/i\>/i,'');
						DLCGames[rawi] = processTitle(DLCGames[rawi]);
					}
					
					if (target=='display') {
						window.DLCGames = DLCGames;
						setDLCDisplay();
					}
				} else {
					errMessage('Umm... This is really embarrasing. I couldn\'t get the information you were looking for from that page','regex expression <br/>/\<td\>\<i\>\<a href=".*" title=".*"\>.*\<\/a\>\<\/i\>/gi<br/>did not find any matches in the page loaded');
				}
			} else {
				errMessage('Umm... This is embarrasing. The page we were trying to load had problems.','page: ' + myURL + '<br/>status: ' + res.status);
			}
		}
	});
}

setDLCDisplay = function () {
	DLCGames = window.DLCGames;
	myGames = $c_('gameTitleSortField');
	myGameSlot = $c_('slot');
	for (i=0;i<myGames.length;i++) {
		match = false;
		if (!(processTitle(myGames[i].innerHTML) === nonEnglish)) {
			for (i2=0;i2<DLCGames.length;i2++) {
				if (processTitle(myGames[i].innerHTML).toLowerCase().match(DLCGames[i2].toLowerCase())) {
					//Game is DLC
					match = true;
					i2=DLCGames.length;
				}
			}
		} else {
			//Game title isn't in English, so I can't determine what it is
		}
		
		if (match) {
			//Game is DLC
			if (window.displayType == 'DLC') {
				myGameSlot[i].id = '0;' + myGameSlot[i].id.substring(2,3);
			} else {
				myGameSlot[i].id = '1;' + myGameSlot[i].id.substring(2,3);
			}
		} else {
			//Game is Disc
			if (window.displayType == 'Disc') {
				myGameSlot[i].id = '0;' + myGameSlot[i].id.substring(2,3);
			} else {
				myGameSlot[i].id = '1;' + myGameSlot[i].id.substring(2,3);
			}
		}
	}	
	
	updateGameDisplay();
}

}
{/**********************FRIEND OVERLAP FILTER*******************/
function friendDisplayAll () {
	checkIds();
	myGames = $c_('slot');
	for (i=0;i<myGames.length;i++) {
		myGames[i].id = myGames[i].id.substring(0,1) + ';0';
	}
	window.overlapType = '';
	updateGameDisplay();
}

function friendDisplayLimit (target) {
	checkIds();
	window.overlapType = target;
	
	if (window.myOverlapGames) {
		setFriendDisplay();
	} else {
		if (myPSN == '') {
			errMessage('Please visit your trophy page to set your ID','The script has not parsed your PSN ID yet, and therefore cannot load your trophies');
		} else {			
			loadMyTrophies();
		}
	}
}

loadMyTrophies = function () {
	loaderIcon(true);
	loaderPop(true);
	$('loaderPopContent').innerHTML = '<center style="margin-right: 35px;"><div style="display: table-cell; vertical-align: middle; height: 30px; width: 200px; overflow: hidden;">Finding ' + myPSN + '\'s game list</div></center>';
	
	myURL = 'http://us.playstation.com/playstation/psn/profile/' + myPSN + '/get_ordered_trophies_data';
	var xmlhttp =  new XMLHttpRequest();
	xmlhttp.open("GET", myURL, true);
	params = '';
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", params.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.overrideMimeType('text/html; charset=utf-8');
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {
			loaderIcon(false);
			loaderPop(false);
			if (xmlhttp.status==200) {
				if ($('greaseOverlay')) {$('greaseOverlay').style.display = 'none';}
				res = xmlhttp.responseText;
				if (myOverlapGames = res.match(/gameTitleSortField.*?span/gi)) {
					for(i=0;i<myOverlapGames.length;i++) {
						myOverlapGames[i] = myOverlapGames[i].match(/\>.*?\</)[0];
						myOverlapGames[i] = processTitle(myOverlapGames[i]);
					}
				
					window.myOverlapGames = myOverlapGames;
					setFriendDisplay();
				} else {
					errMessage('CRAP!!! Unknown error. What were you DOING!?');
				}
			} else {
				errMessage('Umm... This is embarrasing. The page we were trying to load had problems.','page: ' + myURL + '<br/>status: ' + xmlhttp.status);
			}
		} 
	}
	xmlhttp.send(params);
}

setFriendDisplay = function () {
	myOverlapGames = window.myOverlapGames;
	curGames = $c_('gameTitleSortField');
	curGameSlot = $c_('slot');
	matches = 0;
	for (i=0;i<curGames.length;i++) {
		match = false;
		if (!(processTitle(curGames[i].innerHTML) === nonEnglish)) {
			for (i2=0;i2<myOverlapGames.length;i2++) {
				if (processTitle(curGames[i].innerHTML).toLowerCase().match(myOverlapGames[i2].toLowerCase())) {
					//Game overlaps
					match = true;
					i2 = myOverlapGames.length;
				}
			}
		} else {
			//Game title isn't in English, so I can't determine what it is
		}
		
		if (match) {
			//Game overlaps
			if (window.overlapType == 'Overlap') {
				curGameSlot[i].id = curGameSlot[i].id.substring(0,1) + ';0';
			} else {
				curGameSlot[i].id = curGameSlot[i].id.substring(0,1) + ';1';
			}
		} else {
			//Game is unique
			if (window.overlapType == 'Unique') {
				curGameSlot[i].id = curGameSlot[i].id.substring(0,1) + ';0';
			} else {
				curGameSlot[i].id = curGameSlot[i].id.substring(0,1) + ';1';
			}
		}
	}	
	
	updateGameDisplay();
}

}
{/**********************DISPLAY FILTER**************************/
updateGameDisplay = function () {
	myGames = $c_('slot');
	matches = 0;
	for (i=0;i<myGames.length;i++) {
		if (myGames[i].id.match('1')) {
			myGames[i].style.display = 'none';
		} else {
			myGames[i].removeAttribute('style');
			matches++;
		}
	}
	
	correctBar();
	
	$_('displaySummary').innerHTML = 'Displaying ' + matches;
	if (window.displayType == 'Disc') {
		$_('displaySummary').innerHTML += ' Disc';
	} else if (window.displayType == 'DLC') {
		$_('displaySummary').innerHTML += ' DLC';
	}
	
	$_('displaySummary').innerHTML += ' games';
	
	if (window.overlapType == 'Overlap') {
		$_('displaySummary').innerHTML += ' that you both own';
	} else if (window.overlapType == 'Unique') {
		$_('displaySummary').innerHTML += ' that you do not own';
	}
}

correctBar = function () {
	//Check if the scrollbars are needed
	if ($_('slots_container').offsetHeight == 0) {$_('scrollbar_track').style.display = 'none'; $_('scrollbar_down_arrow').style.display = 'none'; $_('scrollbar_up_arrow').style.display = 'none';
	} else {$_('scrollbar_track').removeAttribute('style'); $_('scrollbar_down_arrow').removeAttribute('style'); $_('scrollbar_up_arrow').removeAttribute('style');}
	
	if ($_('scrollbar_track').offsetHeight > $_('slots_container').offsetHeight - 26) {
		$_('scrollbar_track').style.height = ($_('slots_container').offsetHeight - 26) + 'px';
	}
	if ($_('scrollbar_handle').offsetHeight > $_('slots_container').offsetHeight - 26) {
		$_('scrollbar_handle').style.height = ($_('slots_container').offsetHeight - 26) + 'px';
	}
	
	resizeFrame();
}

checkIds = function () {
	myGames = $c_('slot');
	if (myGames[0].id.length != 3) {
		for (i=0;i<myGames.length;i++) {
			myGames[i].id = '0;0';
		}
	}
}

}

{/**********************SUBSCRIBE*******************************/
prepareSubscribe = function () {
	var gSubCol=trophyFrame.createElement('div');
	gSubCol.id = 'greaseSubCol';
	gSubCol.className = 'f-column f-subCol';
	gSubCol.title = 'Subscribe to trophy updates';
	gSubCol.style.width = '40px';
	gSubCol.innerHTML = '<div style="text-align: center;" class="columntext"><img src="http://fc06.deviantart.net/fs70/f/2010/144/6/d/feed_bullet_by_user002.gif"></div>';
	
	var gHeadSeparator=trophyFrame.createElement('div');
	gHeadSeparator.className = 'headerSeparator';
	
	myFriends = $c_('f-id');
	
	myFriends[0].parentNode.insertBefore(gSubCol, myFriends[0]);
	myFriends[0].parentNode.insertBefore(gHeadSeparator, myFriends[0]);
	
	addCSSRule('.subscribe  {width: 16px; height: 16px; display: inline-block; margin-top: 19px; background: url("http://fc05.deviantart.net/fs71/f/2010/144/7/4/Subscribe_Sprite_by_user002.png") no-repeat scroll 0 0 transparent;} .subscribe:hover {background-position: 0 -16px;}');
	addCSSRule('.subscribed {width: 16px; height: 16px; display: inline-block; margin-top: 19px; background: url("http://fc05.deviantart.net/fs71/f/2010/144/7/4/Subscribe_Sprite_by_user002.png") no-repeat scroll 0 -32px transparent;} .subscribed:hover {background-position: 0 -48px;}');
	
	for(i=1;i<myFriends.length;i++) {
		curID = myFriends[i].parentNode.parentNode.id;
		
		var gSubItem = trophyFrame.createElement('div');
		gSubItem.className = 'greaseSub';
		myString  = '<a href="javascript:" id="';
		myString += 'gSub' + curID;		
		myString += '"class="subscribe';
		if (GM_getValue(curID + '=SubscribeStatus')==true) {
			myString += 'd';
		}
		myString += '"></a>';
		gSubItem.innerHTML = myString;
		
		myFriends[i].parentNode.insertBefore(gSubItem, myFriends[i]);
		
		gSubItem.childNodes[0].addEventListener('click',function() {
			toggleSubscription(this.id.replace('gSub',''));
		},false);
		
	}
	
	
	/****************DEBUG************/
	$_('breadcrumb').addEventListener('click', function() {
		checkSubscriptions();
	},false);
	
	$_('breadcrumb').innerHTML = '<h3 style="font-size: 18px;">My Friends (' + myFriends.length + ')</h3>';
}

toggleSubscription = function (id) {
	if (GM_getValue(id+'=SubscribeStatus')==true) {
		GM_setValue(id+'=SubscribeStatus',false);
		//popup('<center>Sucessfully removed ' + id + ' from your subscriptions</center>');
		$_('gSub' + id).className = 'subscribe';
	} else {
		GM_setValue(id+'=SubscribeStatus',true);
		addSubscription(id);
	}
}

addSubscription = function (id) {
	//greaseOverContent
	popup('<center>Caching <b>' + id + '</b>\'s current trophy totals <img style="vertical-align: middle;" src="http://us.playstation.com/playstation/img/ajax-loader-small.gif" /></center>');
	var url = "http://us.playstation.com/playstation/psn/profile/" + id + '/get_ordered_trophies_data';
	loaderIcon(true);
	
	var http =  new XMLHttpRequest();
	http.open("GET", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Connection", "close");
	http.onreadystatechange = function() {
		if(http.readyState == 4) {
			loaderIcon(false);
			if (http.status == 200) {
				loaderIcon(false);
				res = http.responseText;
				res = res.replace(/(\\r|\\n|\r|\n)+/g,'');
				
				//Get Games and Trophy Totals for them
				if ((games = res.match(/gameTitleSortField.*?\<\/span\>/g)) && (trophies = res.match(/gameTrophyCountSortField.*?[\d]+/g))) {
					if (games.length == trophies.length) {
						for(i=0;i<games.length;i++) {
							games[i] = games[i].replace(/.*?\>/,'');
							games[i] = games[i].replace(/(\<\/span\>|™)/g,'');
							trophies[i] = parseFloat(trophies[i].match(/\d+/)[0]);
							GM_setValue(id + '-' + games[i],trophies[i]);
						}
						
						popup('<table><tr><td><span class="check50"></span></td><td style="padding: 10px;">Everything checks out. You are now subscribed to ' + id + '</td></tr></table>');
						$_('gSub' + id).className = 'subscribed';
						
						updateSubsArr();
					} else {
						errMessage('Um... Weird. I got different lengths for the games versus the trophies to match them... Weird, huh?');
					}
				} else {
					errMessage('Grrr... I couldn\t find any games or trophies. Either they have none, (which is now committed to the Database and is correct), or something bad happened.');
				}
			} else {
				errMessage('Error loading game trophy totals','Page: '+ url + '<br/>Status:' + http.status);
			}
		}
	}
	http.send('');
}

updateSubsArr = function () {
	myString = '';
	mySubs = $c_('subscribed');
	for (i=0;i<mySubs.length;i++) {
		myString += mySubs[i].id.replace('gSub','') + '|';
	}
	GM_setValue(myPSN + '=SubsArray',myString.substring(0,myString.length-1));
}

checkSubscriptions = function () {
	if (myPSN != '') {
		if ($('loaderWobble').style.display == 'none') {
			if (typeof(MainSubTimeOut) != 'undefined') {clearTimeout(MainSubTimeOut);}
			
			if ($('breadcrumb') !== null) {
				if ($('breadcrumb').tagName != 'DIV') {
					window.gameQueueArr						= new Array();
					window.gameQueueArr['postURL']			= new Array();
					window.gameQueueArr['newTrophies']		= new Array();
					window.gameQueueArr['curId']			= new Array();
					window.gameQueueArr['gameName']			= new Array();
					subs = GM_getValue(myPSN + '=SubsArray');
					if (subs != '') {
						window.subs = subs.split('|');
						checkSubscriber(0);
					}
				}
			}
		} else {
			MainSubTimeOut = setTimeout(function () {checkSubscriptions()},60000);
		}
	}
	upCheck();
}

checkSubscriber = function (iterator_subscribe) {
	window.iterator_subscribe = iterator_subscribe;
	if (iterator_subscribe < window.subs.length) {
		loaderIcon(true);
		clearGameQueue();
		var url = 'http://us.playstation.com/playstation/psn/profile/' + window.subs[iterator_subscribe] + '/get_ordered_trophies_data';
		var http =  new XMLHttpRequest();
		http.open("GET", url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Connection", "close");
		http.onreadystatechange = function() {
			if(http.readyState == 4) {
				loaderIcon(false);
				if (http.status == 200) {
					loaderIcon(false);
					res = http.responseText;
					res = res.replace(/(\\r|\\n|\r|\n)+/g,'');
					
					if (curId = res.match(/playstation\/psn\/profiles\/.*?\//)) {
						curId = curId[0].replace(/.*?profiles\//,'');
						curId = curId.replace(/\//g,'');
											
						//Get Games and Trophy Totals for them
						if ((games = res.match(/gameTitleSortField.*?\<\/span\>/g)) && (trophies = res.match(/gameTrophyCountSortField.*?[\d]+/g)) && (urls = res.match(/playstation\/psn\/profiles\/.*?"/g))) {
							for(i=0;i<urls.length;i++) {
								urls.splice(i,1);
							}
							if (games.length == trophies.length) {
								for(i=0;i<games.length;i++) {
									games[i] = games[i].replace(/.*?\>/,'');
									games[i] = games[i].replace(/(\<\/span\>|™)/g,'');
									urls[i] = urls[i].replace(/.*?trophies\//,'');
									urls[i] = urls[i].substring(0,urls[i].length-1);
									
									trophies[i] = parseFloat(trophies[i].replace(/[^\d]+/g,''));
									storedTrophies = parseFloat(GM_getValue(curId + '-' + games[i]));
									newTrophies = trophies[i] - storedTrophies;
									
									//If this is a new game or has new trophies (must have 3 '=')
									if ((storedTrophies==='') || (storedTrophies!=trophies[i])) {
										//Send games to be looked at
										gameQueue(urls[i],newTrophies,curId,games[i]);
									}
								}
								launchGameQueue(0);
							}
						}
					}
				}
			}
		}
		http.send('');
	} else {
		displayQueue();
	}
}

clearGameQueue = function () {	
	window.gameQueueArr['postURL'].splice(0,window.gameQueueArr['postURL'].length);
	window.gameQueueArr['newTrophies'].splice(0,window.gameQueueArr['newTrophies'].length);
	window.gameQueueArr['curId'].splice(0,window.gameQueueArr['curId'].length);
	window.gameQueueArr['gameName'].splice(0,window.gameQueueArr['gameName'].length);
}

gameQueue = function (postURL,newTrophies,curId,gameName) {
	gameI = window.gameQueueArr['postURL'].length;
	window.gameQueueArr['postURL'][gameI]			= postURL;
	window.gameQueueArr['newTrophies'][gameI]		= newTrophies;
	window.gameQueueArr['curId'][gameI]				= curId;
	window.gameQueueArr['gameName'][gameI]			= gameName;
}

launchGameQueue = function (iterator_game) {
	if ((window.gameQueueArr['postURL'].length != 0) && (iterator_game < window.gameQueueArr['postURL'].length)) {
		postURL			= window.gameQueueArr['postURL'][iterator_game];
		newTrophies		= window.gameQueueArr['newTrophies'][iterator_game];
		curId			= window.gameQueueArr['curId'][iterator_game];
		gameName		= window.gameQueueArr['gameName'][iterator_game];
		
		//Load the games trophies
		var url = 'http://us.playstation.com/playstation/psn/profile/' + curId + '/get_ordered_title_details_data';
		loaderIcon(true);
		var gamehttp =  new XMLHttpRequest();
		gamehttp.open("POST", url, true);
		gamehttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		gamehttp.setRequestHeader("Connection", "close");
		gamehttp.onreadystatechange = function() {
			if(gamehttp.readyState == 4) {
				loaderIcon(false);
				if (gamehttp.status == 200) {
					loaderIcon(false);
					res = gamehttp.responseText;
					res = res.replace(/(\\r|\\n|\r|\n)+/g,'');
					
					testTrophyArr = new Array();
					testTrophyArr['time'] = new Array();
					testTrophyArr['tname'] = new Array();
					testTrophyArr['image'] = new Array();
					testTrophyArr['value'] = new Array();
					
					rawtrophies = res.split('<div class="slot ');
					for (i=1;i<rawtrophies.length;i++) {
						if (datetime = rawtrophies[i].match(/dateEarnedSortField.*?span/)) {
							//DATE**************************************************
							datetime = datetime[0].replace(/.*?\>/,'');
							datetime = datetime.replace('</span','');
							
							dateObject = new Date();
							
							dateArr = datetime.split(' ');
							dateObject.setFullYear(dateArr[5],getMonthNum(dateArr[1]),dateArr[2]);	//Year, Month, Day						
							dateObject.setHours(dateArr[3].split(':')[0]);							//Hours
							dateObject.setMinutes(dateArr[3].split(':')[1]);						//Minutes
							dateObject.setSeconds(dateArr[3].split(':')[2]);						//Seconds
							
							//NAME**************************************************
							if (myTitle = rawtrophies[i].match(/trophyTitleSortField".*?\</)) {
								myTitle = myTitle[0].replace(/(trophyTitleSortField"|\>|\<)/g,'');
							} else if (rawtrophies[i].match('Hidden Trophy')) {
								myTitle = '???';
							}
							
							//IMAGE**************************************************
							if (myImage = rawtrophies[i].match(/src=".*?"/)) {
								myImage = myImage[0].replace(/(src=|")/g,'');
							}
							
							//VALUE**************************************************
							if (myValue = rawtrophies[i].match(/trophyTypeSortField.*?\</)) {
								myValue = myValue[0].replace(/(trophyTypeSortField.*?\>|\<|\s)/g,'');
							}
							
							ilength = testTrophyArr['time'].length;
							testTrophyArr['time'][ilength]  = dateObject;
							testTrophyArr['tname'][ilength] = myTitle;
							testTrophyArr['image'][ilength] = myImage;						
							testTrophyArr['value'][ilength] = myValue;						
						}
					}
					
					multiSort('time',testTrophyArr);
					
					//Update the totals
					GM_setValue(curId+'-'+gameName,testTrophyArr['time'].length);
					
					testTrophyArr['time'].splice(0,testTrophyArr['time'].length - newTrophies);
					testTrophyArr['tname'].splice(0,testTrophyArr['tname'].length - newTrophies);
					testTrophyArr['image'].splice(0,testTrophyArr['image'].length - newTrophies);
					testTrophyArr['value'].splice(0,testTrophyArr['value'].length - newTrophies);
					
					for(i=0; i < testTrophyArr['time'].length;i++){
						setDisplayQueue(curId,gameName,testTrophyArr['image'][i],testTrophyArr['tname'][i],testTrophyArr['value'][i],testTrophyArr['time'][i]);
					}
					
					launchGameQueue(iterator_game+1);
				}
			}
		}
		gamehttp.send('sortBy=id_desc&titleId=' + postURL);
	} else {
		//launch next subscriber
		checkSubscriber(window.iterator_subscribe + 1);
	}
}

setDisplayQueue = function (curId,gameName,image,tname,value,time) {
	gameName = gameName.replace(/[\[\]|]/g,'');
	tname = tname.replace(/[\[\]|]/g,'');
	GM_setValue('displayQueue',GM_getValue('displayQueue') + '[' + curId + '|' + gameName + '|' + image + '|' + tname + '|' + value + '|' + time.getTime() + ']');	
}

displayQueue = function () {
	res = GM_getValue('displayQueue');
	if ((res == 'undefined') || (typeof(res) == 'undefined') || (res == 'null') || (typeof(res) == 'null')) {GM_setValue('displayQueue',''); res = '';}
	if (res != '') {
		if (myGames = res.match(/\[.*?\]/g)) {
			if(myTimes = res.match(/\d+\]/g)) {
				for (i=0; i<myTimes.length; i++) {
					myTimes[i] = myTimes[i] + '' + i;
				}
				myTimes.sort();
				
				myCurr = parseFloat(myTimes[0].match(/\]\d+/)[0].replace(']',''));
				if (myTimes[1]) {
					myNext = parseFloat(myTimes[1].match(/\]\d+/)[0].replace(']',''));
				} else {
					myNext = 0;
				}
				
				//Remove the game we are going to display
				res = res.replace(myGames[myCurr],'');
			} else {
				//Remove the game we are going to display
				res = res.replace(/\[.*?\]/,'');
				myCurr = 0;
				myNext = 1;
			}
			
			GM_setValue('displayQueue',res);
			
			loaderPop(true);
			myContent = myGames[myCurr].split('|');
			if (myGames[myNext]) {
				myPreloadContent = myGames[myNext].split('|');
				myPreload = '<img src="' + myPreloadContent[2] + '" style="display: none;">';
			} else {
				myPreload = '';
			}
			
			$('loaderPop').childNodes[0].style.width = '300px';
			
			dateObject = new Date();
			dateObject.setTime(myContent[5].replace(']',''));
			
			myString  = '<a style="display: block; color: #888;" href="http://us.playstation.com/publictrophy/index.htm?onlinename=' + myContent[0].replace('[','') + '"><table style="display: inline;"><tr><td>';
			myString += '<object style="visibility: hidden; width: 1px; height: 1px; display: inline;" width="1" height="1"><param name="movie" value="http://www.youtube.com/v/3pMYimm3rLI&autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/3pMYimm3rLI&autoplay=1&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="1" height="1"></embed></object>';
			myString += '</td><td><img width="60" height="60" style="width: 60px;" src="';
			myString += myContent[2];
			myString += '">';
			myString += myPreload;
			myString += '</td><td valign="top" style="padding-left: 10px;"><div style="font-weight: bold;"><div style="font-size: 1.2em;">';
			myString += myContent[0].replace('[','') + '</div>';
			myString += myContent[1];
			myString += '</div><div style="height: 14px; overflow: hidden;" title="';
			myString += myContent[3];
			myString += '" class="greaseTrophy grease';
			myString += myContent[4] + '">';
			if (myContent[3].length <= 35) {
				myString += myContent[3];
			} else {
				myString += myContent[3].substring(0,32) + '...';
			}
			
			myString += '</div><div style="color: #CCC;">';
			myString += (dateObject.getMonth()+1)+'/'+dateObject.getDate()+'/'+dateObject.getFullYear();
			myString += '</div></td></tr></tbody></table></a>';
			
			$('loaderPopContent').innerHTML = myString;
			
			if (typeof(timeout) != 'undefined') {clearTimeout(timeout);}
			timeout = setTimeout(function () {displayQueue()},10000);
		}
	} else {
		loaderPop(false);
		//Check 5 minutes later
		MainSubTimeOut = setTimeout(function () {checkSubscriptions()},300000);
	}
}

if (($('breadcrumb') !== null)) {
	if ($('breadcrumb').tagName != 'DIV') {
		if ((GM_getValue('displayQueue') == '') || (GM_getValue('displayQueue') == 'undefined')) {
			//Check one minute after page load
			MainSubTimeOut = setTimeout(function () {checkSubscriptions()},60000);
		} else {
			MainSubTimeOut = setTimeout(function () {displayQueue()},5000);
		}
	}
}

}