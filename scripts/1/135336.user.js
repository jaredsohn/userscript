// ==UserScript==
// @name           Script Options Dialog
// @description    Simple but elegant options dialog for inclusion in your scripts.
//
// @version        0.08
//
// @history        0.08 Added Config.footerHtml property to specify HTML to use in footer 
// @history        0.08 Added Config.reloadOnSave property (false by default)
// @history        0.08 Added "Cancel" button so you can now cancel without saving changes
// @history        0.08 Moved options window up a little on the screen
// @history        0.08 Increased default widht of options window to 600px
// @history        0.08 Options body now has a default max height of 300px and will scroll if taller 
// @history        0.07 Added 'html' type field to allow inserting of html within field list
// @history        0.06 Added Config.preloadData() method
// @history        0.05 Fixed a small glitch in field type recognition
// @history        0.04 Added "password" type
// @history        0.04 Added "select" type
// @history        0.03 Added Config.tabs to be used instead of Config.settings
// @history        0.02 Fixed reference to script updater in about tab
// @history        0.01 Initial release
//
// ==/UserScript==

Config = {
	data:null,
	callback:null,
	tempOptions:{},
	footerHtml:'<span style="font-size:.9em;">Note: You may need to refresh the page to see changes.</span>',
	reloadOnSave:false,
	init:function(settings) {
		Config.settings = settings;
	},
	preloadData:function() {
		Config.data = {};
		Config.settings = typeof(Config.tabs) != 'undefined' ? Config.tabs : Config.settings; 
		for(var tabName in Config.settings) {
			if(typeof(Config.settings[tabName].fields) == "object") {
				var fields = Config.settings[tabName].fields
				for(var fieldName in fields) {
					Config.data[fieldName] = Config.get(fieldName);
					
				}
			}
		}
	},
	close:function() {
		document.body.removeChild(Config.$('ConfigBodyWrapper'));
		document.body.removeChild(Config.$('ConfigMask'));
		window.removeEventListener('keyup', Config.keyUpHandler, true);
		if(typeof(Config.callback) == 'function')
			Config.callback();
	},
	show:function(callback) {
		Config.tempOptions = {};
		Config.settings = typeof(Config.settings) != 'undefined' ? Config.settings : Config.tabs;
		Config.callback = typeof(callback) == 'function' ? callback : null;
		if(typeof(Config.styleDrawn) == 'undefined') {				// apply styling
			GM_addStyle("\
					#ConfigMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; } \
					#ConfigBody * { border:none; font-size:12px; color:#333; font-weight:normal !important; margin:0 !important; padding:0 !important; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; line-height:1.2em; } \
					#ConfigBody { width:600px; margin:auto !important; top:30px; position:fixed; left:35%; text-align:left; background:#f9f9f9; border:1px outset #333; padding:0 !important; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em !important; } \
					#ConfigBody a { text-decoration:underline; color:#000099 !important; } \
					#ConfigBody strong, #ConfigContentBox strong { font-weight:bold !important; } \
					#ConfigBody h1 { font-size:13px; font-weight:bold !important; padding:.5em !important; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em !important; } \
					#ConfigBody h2 { font-weight:bold; margin:.5em 1em !important; } \
					#ConfigBody h1 { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; } \
					#ConfigBody h1 a:hover { text-decoration:underline; } \
					#ConfigBody li { list-style-type:circle; } \
					#ConfigBody p { font-size:12px; font-weight:normal; margin-bottom:1em !important; } \
					#ConfigContentPadding { margin:0 1em !important; }\
					#ConfigTabs { margin-top:20px !important; }\
					#ConfigTabs span { border:1px solid #666; -moz-border-radius:5px 5px 0 0; padding: 2px 10px !important; position:relative; top:-2px; background-color:#ddd; cursor:pointer; }\
					#ConfigTabs span:hover { background-color:#eee; }\
					#ConfigTabs span.active { background-color:#F9F9F9; top:-1px; border-bottom:none; padding-top:3px !important; font-weight:bold; cursor:inherit; }\
					#ConfigTabs span.active:hover { background-color:#F9F9F9; }\
					#ConfigContentBox { border:1px inset #666; padding:1.5em 1em 1em !important; max-height:300px; overflow:auto; }\
					#ConfigContentBox table { width:auto !important; }\
					#ConfigContentBox td { font-weight:normal; }\
					#ConfigContentBox input { border:1px inset #666 !important; }\
					#ConfigContentBox td.fieldLabel { text-align:right !important; padding-right:.5em !important; font-weight:bold !important; }\
					#ConfigContentBox td select { border:1px inset #666; }\
					#ConfigHistory { margin:0 1em 1em 1em !important; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em !important; width:448px; } \
					#ConfigHistory ul { margin-left:2em !important; } \
					#ConfigClose { float:right; cursor:pointer; height:14px; opacity:.5; } \
					#ConfigClose:hover { opacity:.9; } \
					#ConfigFooter { padding:1.5em 1em 0 !important; } \
					#ConfigFooter input { border:1px outset #666; padding:3px 5px 5px 20px !important; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:80px; float:right; margin-left:.5em !important; } \
					#ConfigFooter input:hover { background-color:#f9f9f9; } \
					#ConfigFooter select { border:1px inset #666; }\
					#ConfigContentBox #ConfigFieldTable { width:auto !important; margin-left:2em !important; }\
					#ConfigContentBox #ConfigFieldTable td { padding-bottom:.5em !important; }"
				);
			if(typeof(Config.css) != 'undefined')					// apply user specified styles if set
				GM_addStyle(Config.css);
			Config.styleDrawn = true;
		}
		// declare and apply config background mask
		var noticeBg = document.createElement('div');							
		noticeBg.id = "ConfigMask";
		noticeBg.style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
		document.body.appendChild(noticeBg);
		// declare and apply config window
		var noticeWrapper = document.createElement('div');
			noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
			noticeWrapper.id = "ConfigBodyWrapper";
				var notice = document.createElement('div');
				notice.id = "ConfigBody";
				var html = '<h1>\
								<img src="' + Config.icons.config + '" align="absmiddle" style="margin-top:-2px;"/>\
								' + (typeof(Config.scriptName) == 'string' ? Config.scriptName + ' - ' : '') + ' Settings\
							</h1>\
							<div id="ConfigContentPadding">\
								<div id="ConfigTabs">';
				// draw tabls
				var i = 0;
				var firstTabId = "";
				for(var label in Config.settings) {
					var id = 'configTab' + label.replace(/\s/g, '_');
					html += '<span id="' + id + '">' + label + '</span>';
					firstTabId = i == 0 ? id : firstTabId;
					i++;
				}
				html += '</div><div id="ConfigContentBox">';			
				html += '</div>';			
				html += '</div>';			
				html += '<div id="ConfigFooter">\
							<input type="button" id="ConfigCancelButton" value="Cancel" style="background-image:url(' + Config.icons.close + ')"/>\
							<input type="button" id="ConfigCloseButton" value="Save" style="background-image:url(' + Config.icons.save + ')"/>\
							' + Config.footerHtml + '\
						</div>';
				notice.innerHTML = html;;
			noticeWrapper.appendChild(notice);
		document.body.appendChild(noticeWrapper);
		// add tab change listeners
		for(var label in Config.settings) {
			var id = 'configTab' + label.replace(/\s/g, '_');
			Config.$(id).addEventListener('click', function() { Config.activateTab(this.id); }, false);
		}
		// add escape key press and other listener
		Config.activateTab(firstTabId);
		window.addEventListener('keyup', Config.keyUpHandler, true);
		Config.$('ConfigCloseButton').addEventListener('click', function() {
			Config.save();
			Config.close();
			if(Config.reloadOnSave)
				document.location = '';
		}, true);
		Config.$('ConfigCancelButton').addEventListener('click', Config.close, true);
	},
	//-------------------------------- "private" methods -----------------------------------------
	activateTab:function(id) {
		// deactivate current tab
		var elems = Config.$('ConfigTabs').getElementsByTagName('span');
		for(var i = 0; i < elems.length; i++) {
			elems[i].className = '';	
		}
		// set current tab
		Config.$(id).className = 'active';
		var key = id.replace(/^configTab/, '').replace(/_/g, ' ');
		var fields = Config.settings[key].fields;
		var html = typeof(Config.settings[key].html) == 'string' ? Config.settings[key].html : '';
		html += '<table cellpadding="0" cellspacing="0" border="0" id="ConfigFieldTable">';
		for(var fieldName in fields) {
			var field = fields[fieldName];
			var type = typeof(field.type) != 'string' ? 'html' : field.type;
			var tip = typeof(field.tip) == 'string' ? field.tip : '';
			if(type != 'html')
				html += '<tr title="' + tip + '"><td colspan="' + (type == 'html' ? '2' : '1') + '" class="fieldLabel">' + 
					(typeof(field.label) == 'string' ? field.label : '') + '</td><td>';
			else
				html += '<tr>';
			switch(type) {
				case 'select':
					html += '<select id="configInput_' + fieldName + '">';
					if(typeof(field.options) == 'undefined')
						alert('Options Error: ' + fieldName + ' of type "select" is missing the "options" property');
					else {
						for(var text in field.options) {
							var val = field.options[text];
							html += '<option value="' + val + '"' + (Config.get(fieldName) == val ? ' selected' : '') + '>' + text + ' &nbsp;</option>';
						}
					}
					html += '</select>';
					break;
				case 'password':
				case 'text':
					var width = typeof(fields[fieldName].width) != 'undefined' ? (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + 'px') : false;
					html += '<input id="configInput_' + fieldName + '" value="' + Config.get(fieldName) + '" style="' + (width ? 'width:' + width + ';' : '') + '" type="' + type + '"/>';
					break;
				case 'checkbox':
					html += '<input id="configInput_' + fieldName + '" type="checkbox" style="position:relative; top:2px;"' + (Config.get(fieldName) ? 'checked' : '' ) + '/>';
					break;
				case 'html':
					html += '<td colspan="2">' + field.value + '</td>';
					break;
			}
			if(type != 'html') {
				html += typeof(fields[fieldName].text) == 'string' ? ' &nbsp; - ' + fields[fieldName].text : '';
				html += '</td></tr>';
			} else
				html += '</tr>';
		}
		html += '</table>';
		// add check for updates
		if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
			html += '<p><br/><a href="javascript:void(0)" id="ConfigCheckUpdatesLink">Check for updates</a></p>';
		}
		Config.$('ConfigContentBox').innerHTML = html;
		// add event listeners
		for(var fieldName in fields) {
			switch(fields[fieldName].type) {
				case 'checkbox': 
					Config.$('configInput_' + fieldName).addEventListener('change', function() {
						Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.checked ? '1' : '0';															   
					}, false);
					break;
				case 'select': 
					Config.$('configInput_' + fieldName).addEventListener('change', function() {
						Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.value;															   
					}, false);
					break;
				case 'password':
				case 'text':
					Config.$('configInput_' + fieldName).addEventListener('keyup', function() {
						Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.value;															   
					}, false);
					break;
			}
		}
		if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
			$('#ConfigCheckUpdatesLink')[0].addEventListener('click', function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); }, false);
		}
	},
	keyUpHandler:function (e) {
		if(e.keyCode == 27) { Config.close(); }
	},
	icons:{
		install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
		config:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",
		close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
		save:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D",
	},
	getField:function(key) {
		Config.settings = typeof(Config.tabs) != 'undefined' ? Config.tabs : Config.settings;
		for(var tabName in Config.settings) {
			if(typeof(Config.settings[tabName].fields) == "object") {
				var fields = Config.settings[tabName].fields
				for(var fieldName in fields)
					if(fieldName == key)
						return fields[fieldName];
			}
		}
		return false;
	},
	get:function(key) {
		if(Config.data != null && typeof(Config.data[key]) != 'undefined')
			return Config.data[key];
		else {
			var field = Config.getField(key);
			key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;	
			switch(field.type) {
				case 'checkbox':
					if(typeof(field.value) == 'undefined' || !field.value)
						return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "1") ? true : false;	// false by default
					else 
						return (typeof(GM_getValue(key)) != 'undefined' && GM_getValue(key).toString() == "0") ? false : true;	// true by default
					break;
				case 'select':
				case 'password':
				case 'text':
					return typeof(GM_getValue(key)) == 'undefined' ? (typeof(field.value) != 'undefined' ?  field.value : '') : GM_getValue(key);
					break;
				default: 
					return 'unfound';
					return typeof(GM_getValue(key)) == 'undefined' ? false : GM_getValue(key);
			}	
		}
	},
	save:function() { 
		for(var x in Config.tempOptions)
			Config.set(x, Config.tempOptions[x]);
		Config.tempOptions = {};
	},
	set:function(key, value) {
		key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;	
		GM_setValue(key, value);
	},
	$:function(id) {
		return document.getElementById(id);
	},
};
