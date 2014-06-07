// ==UserScript==
// @name		Script Updater (userscripts.org)
// @namespace		PhasmaExMachina
// @description		Dead simple user script update checker for use with your user scripts. Includes simple means of showing your version history through meta tags.
// @version			1.04
//
// @history        	1.04 Fixed mis-handling of DOM elements on XML pages
// @history        	1.03 Screen mask now fills entire document height as intended
// @history        	1.03 Notice is now centered and fixed regardless of scrolling
// @history        	1.03 Fixed minor wording error
// @history        	1.03 Fixed implementation of ScriptUpdater.forceNotce()
// @history        	1.03 Fixed implementation of callback functions
// @history        	1.02 Improved code performance based on community feedback
// @history        	1.01 Removed requirement for current version
// @history			1.01 Cleaned up code
// @history			1.01 Simplified metadata retrieval
// @history			1.01 Updated license
// @history			1.00 Initial release
//
// ==/UserScript==

ScriptUpdater = {
	version:"1.04",
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
		ScriptUpdater.initVars(scriptId, callback, false, false);
		ScriptUpdater.checkRemoteScript();
	},
	forceNotice:function(scriptId, currentVersion, callback) {	
		ScriptUpdater.initVars(scriptId, currentVersion, callback, true, true);
		ScriptUpdater.checkRemoteScript();	
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
		// check the userscripts.org code review page	
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/" + ScriptUpdater.scriptId + '.meta.js',
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
			onload: function (response) {
				ScriptUpdater.meta = ScriptUpdater.parseHeaders(response.responseText);
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
		// taken from http://wiki.greasespot.net/Metadata_block - thanks to sizzlemctwizzle for the suggestion
		var headers = {};
		var line, name, prefix, header, key, value;
		
		var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
		for each (line in lines) {
			[, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
			
			switch(name) { case "licence": name = "license"; break; 	}
			
			[key, prefix] = name.split(/:/).reverse();
			
			if(prefix) {
				if(!headers[prefix])
					headers[prefix] = new Object;
				header = headers[prefix];
			} else
				header = headers;

			if(header[key] && !(header[key] instanceof Array))
				header[key] = new Array(header[key]);
			
			if(header[key] instanceof Array) 
				header[key].push(value);
			else
				header[key] = value;

		}	
		headers["licence"] = headers["license"];		
		return headers;
	},
	showNotice:function() {
		if(ScriptUpdater.meta.name && ScriptUpdater.meta.version) {	
			GM_addStyle(
				"#ScriptUpdaterMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; } \
				#ScriptUpdaterBody * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; } \
				#ScriptUpdaterBody { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#f9f9f9; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; } \
				#ScriptUpdaterBody a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; } \
				#ScriptUpdaterBody strong { font-weight:bold; } \
				#ScriptUpdaterBody h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; } \
				#ScriptUpdaterBody h2 { font-weight:bold; margin:.5em 1em; } \
				#ScriptUpdaterBody h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; } \
				#ScriptUpdaterBody h1 a:hover { text-decoration:underline; } \
				#ScriptUpdaterBody table { width:auto; margin:0 1em; } \
				#ScriptUpdaterBody table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; } \
				#ScriptUpdaterBody table tr td { line-height:2em; font-weight:bold; } \
				#ScriptUpdaterBody li { list-style-type:circle; } \
				#ScriptUpdaterBody p { font-size:12px; font-weight:normal; margin:1em; } \
				#ScriptUpdaterHistory { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; } \
				#ScriptUpdaterHistory ul { margin-left:2em; } \
				#ScriptUpdaterClose { float:right; cursor:pointer; height:14px; opacity:.5; } \
				#ScriptUpdaterClose:hover { opacity:.9; } \
				#ScriptUpdaterFooter { margin:.75em 1em; } \
				#ScriptUpdaterFooter input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; } \
				#ScriptUpdaterFooter input:hover { background-color:#f9f9f9; } \
				#ScriptUpdaterFooter select { border:1px inset #666; }"
			);
			
			var noticeBg = document.createElement('div');							
			noticeBg.id = "ScriptUpdaterMask";
			document.body.appendChild(noticeBg);
		
			var noticeWrapper = document.createElement('div');
			noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
			noticeWrapper.id = "ScriptUpdaterBodyWrapper";
				var html = new Array();
				var notice = document.createElement('div');
				notice.id = "ScriptUpdaterBody";
				html.push('<h1><img id="ScriptUpdaterClose" src="');
				html.push(ScriptUpdater.icons.close);
				html.push('" title="Close"/><img src="');
				html.push(ScriptUpdater.icons.uso);
				html.push('" align="absmiddle" style="margin-top:-2px;"/>');
				html.push(' Facebook Profile Enhancer for Mafia Wars Updater</h1>');
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
					html.push('<h2>Version History:</h2><div id="ScriptUpdaterHistory">');
					var history = new Array();
					var version, desc;
					for(var i = 0; i < ScriptUpdater.meta.history.length; i++) {
						[, version, change] = ScriptUpdater.meta.history[i].match(/(\S+)\s+(.*)$/);
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
				/*
				*/
				html.push('<div id="ScriptUpdaterFooter">');
				html.push('<input type="button" id="ScriptUpdaterCloseButton" value="Close" style="background-image:url(');
				html.push(ScriptUpdater.icons.close);
				html.push(')"/><input type="button" id="ScriptUpdaterBodyInstall');
				html.push(ScriptUpdater.scriptId);
				html.push('" value="Install" style="background-image:url(');
				html.push(ScriptUpdater.icons.install);
				html.push(');"/>');
				html.push('Check this script for updates ');

				html.push('<select id="ScriptUpdaterInterval"> \
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
			ScriptUpdater.$('ScriptUpdaterClose').addEventListener('click', ScriptUpdater.closeNotice, true);
			ScriptUpdater.$('ScriptUpdaterCloseButton').addEventListener('click', ScriptUpdater.closeNotice, true);
			ScriptUpdater.$('ScriptUpdaterBodyInstall' + ScriptUpdater.scriptId).addEventListener('click', function() {
				setTimeout(ScriptUpdater.closeNotice, 500);																								
				document.location = 'http://userscripts.org/scripts/source/' + ScriptUpdater.scriptId + '.user.js';
			}, true);
			window.addEventListener('keyup', ScriptUpdater.keyUpHandler, true);
			// set current interval in selector
			var selector = ScriptUpdater.$('ScriptUpdaterInterval');
			for(var i = 0; i < selector.options.length; i++) {
				if(selector.options[i].value.toString() == ScriptUpdater.getInterval().toString())
					selector.options[i].selected = true;
			}
			selector.addEventListener('change', function() {
				ScriptUpdater.setInterval(this.value);
			}, true);
			noticeWrapper.style.height = document.documentElement.clientHeigh + 'px';
//			$('#ScriptUpdaterBody')[0].style.marginTop = (unsafeWindow.scrollY + 125) + 'px';
			$('#ScriptUpdaterMask')[0].style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
		}
	},
	closeNotice:function() {
		document.body.removeChild(ScriptUpdater.$('ScriptUpdaterBodyWrapper'));
		document.body.removeChild(ScriptUpdater.$('ScriptUpdaterMask'));
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