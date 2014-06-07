// ==UserScript==
// @name           	Ikariam chatbar
// @namespace     	
// @description    	Chatbar for alliances in ikariam.
// @author       	alboltdrogo
//
// @include        	http://s*.*.ikariam.com/*
// @exclude        	http://board.ikariam.*/*
// 
// @require        	http://taft.no-ip.org/taft/tools/chat/js/jquery.js
// @require        	http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
//
// @version        	0.2
//
// @history        	0.2 Feature: lay-out change (requested)
// @history        	0.2 Bugfix: Auto-update
// @history             0.1 First release
// ==/UserScript==

//== Because of security reasons the update userscript is copied here ==
// name		Script Updater (userscripts.org)
// namespace		PhasmaExMachina
// description		Dead simple user script update checker for use with your user scripts. Includes simple means of showing your version history through meta tags.
// version			1.07
//== 

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
		// check the userscripts.org code review page	
		GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/" + ScriptUpdater.scriptId + '.meta.js',
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
				/*
				*/
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
//			$('#ScriptUpdater" + ScriptUpdater.scriptId + "Body')[0].style.marginTop = (unsafeWindow.scrollY + 125) + 'px';
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

// == end of update userscript ==

ScriptUpdater.check(102584, "0.2");

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function (key, value, options) {
    
    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var serverName = gameServerParts[0];

var head = document.getElementsByTagName('head')[0];
var newCss = document.createElement('link');
newCss.type = 'text/css';
newCss.rel = 'stylesheet';
newCss.href = 'http://taft.no-ip.org/taft/tools/chat/css/chat.css';
newCss.media = 'all';
head.appendChild(newCss);

var newCss2 = document.createElement('link');
newCss2.type = 'text/css';
newCss2.rel = 'stylesheet';
newCss2.href = 'http://taft.no-ip.org/taft/tools/chat/css/screen.css';
newCss2.media = 'all';
head.appendChild(newCss2);

var head = document.getElementsByTagName('head')[0];
var headCode = head.innerHTML;
head.innerHTML = headCode + '<!--[if lte IE 7]><link type="text/css" rel="stylesheet" media="all" href="css/screen_ie.css" /><![endif]-->';

var newJs = document.createElement('script');
newJs.type = 'text/javascript';
newJs.src = 'http://taft.no-ip.org/taft/tools/chat/js/jquery.js';
head.appendChild(newJs);

var body = document.getElementsByTagName('body')[0];
var newDiv = document.createElement('div');
newDiv.id = 'main_container';
body.appendChild(newDiv);

function getData() {
	if(GM_getValue('chatUser'+serverName,'chatUser')=='chatUser')
	{
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://"+ gameServer +"/index.php",
			data: "view=options",
			headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php'
			},
			
			onload: function(response) 
			{
				var hiddenDiv1 = document.createElement("div");
				hiddenDiv1.setAttribute("style", "display: none;");
				hiddenDiv1.setAttribute("id", "hiddenDiv1");
				document.body.appendChild(hiddenDiv1);
				hiddenDiv1.innerHTML = response.responseText;
			
				var xml = response.responseXML;
				string = String(hiddenDiv1.getElementsByTagName('table')[0].getElementsByTagName('input')[0].value);

				GM_setValue('chatUser' + serverName, string);
			}
		});
	}
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://"+ gameServer +"/index.php",
			data: "view=diplomacyAdvisorAlly",
			headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			'Referer': 'http://' + gameServer + '/index.php'
			},
			
			onload: function(response) 
			{
				var hiddenDiv2 = document.createElement("div");
				hiddenDiv2.setAttribute("style", "display: none;");
				hiddenDiv2.setAttribute("id", "hiddenDiv2");
				document.body.appendChild(hiddenDiv2);
				hiddenDiv2.innerHTML = response.responseText;
			
				var xml = response.responseXML;
				string = String(hiddenDiv2.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML);
				
				if (GM_getValue('chatAlly'+serverName,'chatAlly')!=string)
				{
					if (string.length != 0)
					{
						GM_setValue('chatAlly'+serverName, string);
					}
					else
					{
						GM_setValue('chatAlly'+serverName, 'undefined');
					}
				}
			}
		});
}
if (GM_getValue('chatAlly'+serverName,'chatAlly')=='chatAlly' || GM_getValue('chatUser'+serverName,'chatUser')=='chatUser')
{
	getData();
}
else
{
	
var newJs2 = document.createElement('script');
newJs2.type = 'text/javascript';
head.appendChild(newJs2);
newJs2.innerHTML = 'var user =\''+GM_getValue('chatUser' +serverName, 'chatUser')+ '\';\n var ally =\''+GM_getValue('chatAlly'+serverName,'chatAlly')+ '\';\n var world=\''+serverName+ '\';\n var land=\''+gameServerParts[1]+ '\';';

var user = GM_getValue('chatUser'+serverName,'chatUser');
var ally = GM_getValue('chatAlly'+serverName,'chatAlly');
var world = serverName;
var land = gameServerParts[1];

if(GM_getValue('chatAlly'+serverName,'chatAlly')!='chatAlly' && GM_getValue('chatAlly'+serverName,'chatAlly')!='undefined' && GM_getValue('chatUser'+serverName,'chatUser')!='chatUser')
{
document.addEventListener("click", function(event) {
	if (event.target.className=='toggleChatBoxGrowth')
	{
		if ($('#chatbox_'+event.target.id+' .chatboxcontent').css('display') == 'none') {  
			var minimizedChatBoxes = new Array();
			if ($.cookie('chatbox_minimized')) {
				minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
			}
			var newCookie = '';
			for (i=0;i<minimizedChatBoxes.length;i++) {
				if (minimizedChatBoxes[i] != event.target.id) {
					newCookie += event.target.id+'|';
				}
			}
			newCookie = newCookie.slice(0, -1);
			$.cookie('chatbox_minimized', newCookie);
			$('#chatbox_'+event.target.id+' .chatboxcontent').css('display','block');
			$('#chatbox_'+event.target.id+' .chatboxinput').css('display','block');
			$("#chatbox_"+event.target.id+" .chatboxcontent").scrollTop($("#chatbox_"+event.target.id+" .chatboxcontent")[0].scrollHeight);
		} else {
			var newCookie = event.target.id;
			if ($.cookie('chatbox_minimized')) {
				newCookie += '|'+$.cookie('chatbox_minimized');
			}
			$.cookie('chatbox_minimized',newCookie);
			$('#chatbox_'+event.target.id+' .chatboxcontent').css('display','none');
			$('#chatbox_'+event.target.id+' .chatboxinput').css('display','none');
		}
	} else {
		if (event.target.className=='closeChatBox')
		{
			$('#chatbox_'+event.target.id).css('display','none');
			restructureChatBoxes();
			$.post("http://taft.no-ip.org/taft/tools/chat/chat.php?action=closechat", { username: user, alliance: ally, world: world, land: land, chatbox: event.target.id} , function(data){	});
		} else {
			if (event.target.className=='chatWith')
			{
				createChatBox(event.target.id);
				$("#chatbox_"+event.target.id+" .chatboxtextarea").focus();
			}
		}
	}
 }, true);
 
 document.addEventListener("keydown", function(event) {
	if (event.keyCode==13)
	{
		if (event.target.className=='chatboxtextarea checkChatBoxInputKey chatboxtextareaselected' || event.target.className=='chatboxtextarea checkChatBoxInputKey')
		{
			if(event.keyCode == 13 && event.shiftKey === false)  {
				message = $(event.target).val();
				message = message.replace(/^\s+|\s+$/g,"");
				$(event.target).val('');
				$(event.target).css('height','44px');
				if (message !== '') {
					$.post("http://taft.no-ip.org/taft/tools/chat/chat.php?action=sendchat", {username: user, alliance: ally, world: world, land: land, to: event.target.id, message: message} , function(data) {
					message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
					$("#chatbox_"+event.target.id+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+'</span></div>');
					$("#chatbox_"+event.target.id+" .chatboxcontent").scrollTop($("#chatbox_"+event.target.id+" .chatboxcontent")[0].scrollHeight);
					});
				}
				chatHeartbeatTime = minChatHeartbeat;
				chatHeartbeatCount = 1;
				return false;
			}
			var adjustedHeight = event.target.clientHeight;
			var maxHeight = 94;
			if (maxHeight > adjustedHeight) {
				adjustedHeight = Math.max(event.target.scrollHeight, adjustedHeight);
				if (maxHeight)
				adjustedHeight = Math.min(maxHeight, adjustedHeight);
				if (adjustedHeight > event.target.clientHeight)
				$(event.target).css('height',adjustedHeight+8 +'px');
			} else {
			$(event.target).css('overflow','auto');
			}
		}
	}
 }, true);
  	

$(document).ready(function(){
	originalTitle = document.title;
	startChatSession();

	$([window, document]).blur(function(){
		windowFocus = false;
	}).focus(function(){
		windowFocus = true;
		document.title = originalTitle;
	});
});
	
}
	
// Library for chatbarscript for alliances in ikariam.

var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 12000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();

chatBoxes.push('userlist');

function restructureChatBoxes() {
	align = 0;
	for (x in chatBoxes) {
		chatboxtitle = chatBoxes[x];

		if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
			if (align == 0) {
				$("#chatbox_"+chatboxtitle).css('right', '20');
			} else {
				width = (align)*(225+7)+20;
				$("#chatbox_"+chatboxtitle).css('right', width+'px');
			}
			align++;
		}
	}
}

function chatWith(chatuser) {
	createChatBox(chatuser);
	$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox) {
	if ($("#chatbox_"+chatboxtitle).length > 0) {
		if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
			$("#chatbox_"+chatboxtitle).css('display','block');
			restructureChatBoxes();
		}
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		return;
	}

	$(" <div />" ).attr("id","chatbox_"+chatboxtitle)
	.addClass("chatbox")
	.html('<div class="chatboxhead"><div class="chatboxtitle">'+chatboxtitle+'</div><div class="chatboxoptions"><a href="javascript:void(0)" class="toggleChatBoxGrowth" id="'+chatboxtitle+'">-</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="closeChatBox" id="'+chatboxtitle+'">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea checkChatBoxInputKey" id="'+chatboxtitle+'"></textarea></div>')
	.appendTo($( "body" ));
			   
	$("#chatbox_"+chatboxtitle).css('bottom', '0px');
	
	chatBoxeslength = 0;

	for (x in chatBoxes) {
		if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
			chatBoxeslength++;
		}
	}

	if (chatBoxeslength == 0) {
		$("#chatbox_"+chatboxtitle).css('right', '20px');
	} else {
		width = (chatBoxeslength)*(225+7)+20;
		$("#chatbox_"+chatboxtitle).css('right', width+'px');
	}
	
	chatBoxes.push(chatboxtitle);

	if (minimizeChatBox == 1) {
		minimizedChatBoxes = new Array();

		if ($.cookie('chatbox_minimized')) {
			minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
		}
		minimize = 0;
		for (j=0;j<minimizedChatBoxes.length;j++) {
			if (minimizedChatBoxes[j] == chatboxtitle) {
				minimize = 1;
			}
		}

		if (minimize == 1) {
			$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
			$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
		}
	}

	chatboxFocus[chatboxtitle] = false;

	$("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
		chatboxFocus[chatboxtitle] = false;
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
	}).focus(function(){
		chatboxFocus[chatboxtitle] = true;
		newMessages[chatboxtitle] = false;
		$('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
		$("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
	});

	$("#chatbox_"+chatboxtitle).click(function() {
		if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {
			$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
		}
	});

	$("#chatbox_"+chatboxtitle).show();
}


function chatHeartbeat() {

	var itemsfound = 0;
	
	if (windowFocus == false) {
 
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in newMessagesWin) {
			if (newMessagesWin[x] == true) {
				++blinkNumber;
				if (blinkNumber >= blinkOrder) {
					document.title = x+' says...';
					titleChanged = 1;
					break;	
				}
			}
		}
		
		if (titleChanged == 0) {
			document.title = originalTitle;
			blinkOrder = 0;
		} else {
			++blinkOrder;
		}

	} else {
		for (x in newMessagesWin) {
			newMessagesWin[x] = false;
		}
	}

	for (x in newMessages) {
		if (newMessages[x] == true) {
			if (chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				$('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
			}
		}
	}
	
	$.ajax({
	  type: "POST",
	  url: "http://taft.no-ip.org/taft/tools/chat/chat.php?action=chatheartbeat",
	  data: "username="+user+"&alliance="+ally+"&world="+world+"&land="+land,
	  cache: false,
	  dataType: "json",
	  success: function(data) {
		$.each(data.items, function(i,item){
			if (item)	{ // fix strange ie bug

				chatboxtitle = item.f;

				if ($("#chatbox_"+chatboxtitle).length <= 0) {
					createChatBox(chatboxtitle);
				}
				if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
					$("#chatbox_"+chatboxtitle).css('display','block');
					restructureChatBoxes();
				}
				
				if (item.s == 1) {
					item.f = username;
				}

				if (item.s == 2) {
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
				} else {
					newMessages[chatboxtitle] = true;
					newMessagesWin[chatboxtitle] = true;
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
				}

				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
				itemsfound += 1;
			}
		});
		
		$.ajax({
		type: "POST",
		url: "http://taft.no-ip.org/taft/tools/chat/chat.php?action=getonlineusers",
		data: "username="+user+"&alliance="+ally+"&world="+world+"&land="+land,	  
		cache: false,
		dataType: "json",
		success: function(response) {
		if( typeof(response.items) != 'undefined' && response.items != '') {
			for(var k=0; k<response.items.length; k++) {
				 var item2 = response.items[k];
					var onlineUser = item2.n;
					var content = document.getElementById('userlist_content');
					content.innerHTML = '<div class="chatboxmessage"><img class="source-image" src="http://nl.gameforge.com/img/avatars/default_male/small.jpg" width="25px" height="25px" alt="" /><span class="username"><a href="javascript:void(0)" class="chatWith" id="'+onlineUser+'">'+onlineUser+'</a></span></div>';
			}
		} else {
		var content = document.getElementById('userlist_content');
		content.innerHTML = '<div class="chatboxmessage"><span class="chatboxinfo">Er zijn geen alliantieleden online</span></div>';

		}
	}});

		chatHeartbeatCount++;

		if (itemsfound > 0) {
			chatHeartbeatTime = minChatHeartbeat;
			chatHeartbeatCount = 1;
		} else if (chatHeartbeatCount >= 10) {
			chatHeartbeatTime *= 2;
			chatHeartbeatCount = 1;
			if (chatHeartbeatTime > maxChatHeartbeat) {
				chatHeartbeatTime = maxChatHeartbeat;
			}
		}
		
	}});
}

function startChat() {
  chatHeartbeat();
  window.setTimeout(startChat, chatHeartbeatTime);
}

function startChatSession(){
	$.ajax({
	  type: "POST",
	  url: "http://taft.no-ip.org/taft/tools/chat/chat.php?action=startchatsession",
	  data: "username="+user+"&alliance="+ally+"&world="+world+"&land="+land,	  
	  cache: false,
	  dataType: "json",
	  success: function(data) {
		username = data.username;
		
		if( typeof(data.items) != 'undefined' && data.items != '') {
			for(var i=0; i<data.items.length; i++) {
				var item = data.items[i];
				if (item)	{ // fix strange ie bug

					var chatboxtitle = item.f;

					if ($("#chatbox_"+chatboxtitle).length <= 0) {
						createChatBox(chatboxtitle,1);
					}
				
					if (item.s == 1) {
						item.f = username;
					}

					if (item.s == 2) {
						$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
					} else {
						$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
					}
				}
			}
		
			for (i=0;i<chatBoxes.length;i++) {
				chatboxtitle = chatBoxes[i];
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollHeight);
			}
		}
		
		var userlist = document.createElement('div');
		userlist.id = 'chatbox_userlist';
		userlist.className = 'chatbox';
		userlist.style.bottom = '0px';
		userlist.style.right = '20px';
		userlist.style.display = 'block';
		body.appendChild(userlist);

		userlist.innerHTML = '<div class="chatboxhead"><div class="chatboxtitle">Online alliantieleden</div><div class="chatboxoptions"><a href="javascript:void(0)" id="userlist" class="toggleChatBoxGrowth">-</a>&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" id="userlist" class="closeChatBox">X</a></div><br clear="all"></div><div class="chatboxcontent" id="userlist_content" style="display: none;"></div></div>';		
	}});
	
	$.ajax({
		type: "POST",
		url: "http://taft.no-ip.org/taft/tools/chat/chat.php?action=getonlineusers",
		data: "username="+user+"&alliance="+ally+"&world="+world+"&land="+land,	  
		cache: false,
		dataType: "json",
		success: function(response) {
		if( typeof(response.items) != 'undefined' && response.items != '') {
			for(var k=0; k<response.items.length; k++) {
				 var item2 = response.items[k];
					var onlineUser = item2.n;
					var content = document.getElementById('userlist_content');
					content.innerHTML = '<div class="chatboxmessage"><img class="source-image" src="http://nl.gameforge.com/img/avatars/default_male/small.jpg" width="25px" height="25px" alt="" /><span class="username"><a href="javascript:void(0)" class="chatWith" id="'+onlineUser+'">'+onlineUser+'</a></span></div>';
			}
		} else {
		var content = document.getElementById('userlist_content');
		content.innerHTML = '<div class="chatboxmessage"><span class="chatboxinfo">Er zijn geen alliantieleden online</span></div>';

		}
	}});
	
	startChat();

}
}