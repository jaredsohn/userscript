// ==UserScript==
// @name            What.CD Snatched Chrome
// @namespace       What.CD
// @description     Mark snatched torrents.
// @author          Chrome version by Mordred (original by jonls)
// @include 	    https://*what.cd/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL	    https://userscripts.org/scripts/source/95569.meta.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           GM_log
// @version         1.0.7
// @date            2013-2-25
// ==/UserScript==

// TODO: full_update and fullUpdateStarted should be re-enabled as needed depending on version changes. Disabling due to lots of updates recently

{
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// this code is used to get the server version so we can notify the user there is a new version available. The value returned from UserScript is stored in local storage
if( ! /opera/i.test(navigator.userAgent) ) {
	var now = new Date();
	var lastChecked = parseInt(GM_getValue('lastUpdateCheck', 0));
	req = GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/95569.meta.js',
		onload: function(response) {
			GM_setValue("lastUpdateCheck", now.getTime().toString());	// don't check again until tomorrow
			if (response.status == 200) {
				var m = response.responseText.match(/@version(?:\s*)(\d+)\.(\d+)\.(\d+)/);	// this code expects the version in format x.x.x
				if (m) GM_setValue("serverVersion", m[1] + '.' + m[2] + '.' + m[3]);
			}
		}
	});
	if( ! /firefox/i.test(navigator.userAgent) ) {	/* yes I know these three functions are also defined below. There are scoping issues at play here. */
		function GM_getValue (key, defaultValue) {
			var value = window.localStorage.getItem(key);
			if (value == null) value = defaultValue;
			return value;
		}
		function GM_setValue(key, value) {
			window.localStorage.setItem( key, value );
		}
	}
}

function main() {
	var CURRENT_VERSION = "1.0.7";	// used for check after update
	var SCRIPT_URL = "http://userscripts.org/scripts/show/95569";
	var GROUP_SNATCHED = 'font-style:italic; font-weight:bolder; text-decoration:underline;';
	var T_SNATCHED = 'color: #E5B244 !important; text-decoration:line-through !important; display:inline; background:url(https://whatimg.com/i/xw6fo1.png) top right no-repeat; padding:0 18px 1px 0;';
	var UPLOADED = 'color: #63b708 !important; text-decoration:line-through !important; display:inline; background:url(https://whatimg.com/i/8oux68.png) top right no-repeat; padding:0 18px 1px 0;';
	var LEECHING = 'color: #F70000 !important; display:inline; background:url(https://whatimg.com/i/ay3zvb.png) top right no-repeat; padding:0 18px 1px 0;';
	var SEEDING = 'font-style:italic; text-decoration:none !important;';
	var BOOKMARKED = 'background:url(https://whatimg.com/i/4otnce.png) top right no-repeat; padding:0 18px 1px 0;';

	var HEADER_STYLE = '.sBoxTitle { color: white; } .sBoxTitle:visited { color: white; } .sboxTitleVersion { color: red; } .sboxTitleVersion:visited { color: red; }';
	var AUTO_UPDATE_INTERVAL = 20; /* minutes */

	var global_updateFreq = GM_getValue('update_freq', AUTO_UPDATE_INTERVAL);
	var global_hideStatusBox = GM_getValue('box_hidden', 'false');
	/* Inject CSS style */
	var style_groupsnatched = GM_getValue('style_groupsnatched',GROUP_SNATCHED);
	var style_tsnatched =     GM_getValue('style_tsnatched',T_SNATCHED);
	var style_uploaded =      GM_getValue('style_uploaded',UPLOADED);
	var style_leeching =      GM_getValue('style_leeching',LEECHING);
	var style_seeding =       GM_getValue('style_seeding',SEEDING);
	var style_bookmarked =    GM_getValue('style_bookmarked',BOOKMARKED);
	var scriptVersion =       GM_getValue('script_version','0.0.0');
	GM_addStyle('.group_snatched { ' + style_groupsnatched + ' }');
	GM_addStyle('.wcds_snatched { ' + style_tsnatched + ' }');
	GM_addStyle('.wcds_uploaded { ' + style_uploaded + ' }');
	GM_addStyle('.wcds_leeching { ' + style_leeching + ' }');
	GM_addStyle('.wcds_seeding { ' + style_seeding + ' }');
	GM_addStyle('.wcds_bookmark { ' + style_bookmarked + ' }');
	GM_addStyle(HEADER_STYLE);
	GM_addStyle(".wcds_button { cursor: pointer; margin-left:12px; float:right; -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; box-shadow:inset 0px 1px 0px 0px #ffffff; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #343536), color-stop(1, #a3a3a3) ); background:-moz-linear-gradient( center top, #343536 5%, #a3a3a3 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#343536', endColorstr='#a3a3a3'); background-color:#343536; -webkit-border-radius:6px; border-radius:6px; border:1px solid #a1a1a1; display:inline-block; color:#a8a8a8; font-family:arial; font-size:15px; font-weight:bold; padding:6px 24px; text-decoration:none; text-shadow:1px 1px 0px #575757; }");
	GM_addStyle(".wcds_button:hover { background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #a3a3a3), color-stop(1, #343536) ); background:-moz-linear-gradient( center top, #a3a3a3 5%, #343536 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3a3a3', endColorstr='#343536'); background-color:#a3a3a3; }");
	GM_addStyle(".wcds_button:active { position:relative; top:1px; }");
	GM_addStyle(".wcds_sm_button { cursor: pointer; margin-right:5px; -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; box-shadow:inset 0px 1px 0px 0px #ffffff; background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #343536), color-stop(1, #a3a3a3) ); background:-moz-linear-gradient( center top, #343536 5%, #a3a3a3 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#343536', endColorstr='#a3a3a3'); background-color:#343536; -webkit-border-radius:3px; border-radius:3px; border:1px solid #a1a1a1; display:inline-block; color:#a8a8a8; font-family:arial; font-size: 10px; font-weight:bold; padding:3px 6px; text-decoration:none; text-shadow:1px 1px 0px #575757; }");
	GM_addStyle(".wcds_sm_button:hover { background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #a3a3a3), color-stop(1, #343536) ); background:-moz-linear-gradient( center top, #a3a3a3 5%, #343536 100% ); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a3a3a3', endColorstr='#343536'); background-color:#a3a3a3; }");
	GM_addStyle(".wcds_sm_button:active { position:relative; top:1px; }");
	GM_addStyle(".wcds_subItem { margin: 0px 5px 0px 25px; }");
	GM_addStyle('.wcds_header { color:#ffffff; }');//padding: 5px 0px; }');
	GM_addStyle('.wcds_text { width: 68%; margin-right:10px; }');
	GM_addStyle('.wcds_small_text { font-size: .85em; }');
	GM_addStyle('.wcds_link { margin-left:3px; margin-right:3px; }');
	GM_addStyle('.wcds_class { display: inline-block; width:93px; margin-left:25px; margin-bottom:9px; font-size:8pt;}');
	GM_addStyle('.wcds_leftCol { width:50%; height:auto; display:table-cell; padding: 10px 0px 10px; }');
	GM_addStyle('.wcds_rightCol { width:auto; height:auto; display:table-cell; padding: 10px 0px 10px; }');
	
	function log(text) {
		GM_log(text);
	}

	/* Throttled proxy */
	function Proxy(url_base, delay) {
		var last_req = new Date(0);
		var queue = [];
		var processing = false;

		return {
			get: function(req) {
				var now = new Date();
				queue.push(req);
				if (!processing) {
					/* Race condition: atomic test and set would be appropriate here, to ensure thread safety (is it a problem?) */
					processing = true;
					var diff = last_req.getTime() + delay - now.getTime();
					if (diff > 0) {
						var that = this;
						window.setTimeout(function() { that.process_queue(); }, diff);
					} else {
						this.process_queue();
					}
				}
			},

			process_queue: function() {
				var req = queue.shift();
				this.do_request(req);
				processing = (queue.length > 0);
				if (processing) {
					var that = this;
					window.setTimeout(function() { that.process_queue(); }, delay);
				}
			},

			do_request: function(req) {
				last_req = new Date();
				var timer;
				var req_timed_out = false; /* We cannot abort a request, so we need keep track of whether it timed out */

				/* Create timeout handler */
				timer = window.setTimeout(function() {
					/* Race condition: what if the request returns successfully now? */
					req_timed_out = true;
					if (req.error) req.error(null, 'Network timeout');
				}, req.timeout || 20000);

				/* Do the actual request */
				GM_xmlhttpRequest({
					method: req.method || 'GET',
					url: url_base+req.url,
					headers: { /*'User-Agent': navigator.userAgent,*/ 'Accept': req.accept || 'text/xml' },
					onload: function(response) {
						window.clearTimeout(timer);
						if (!req_timed_out) req.callback(response);
					},
					onerror: function(response) {
						window.clearTimeout(timer);
						if (!req_timed_out && req.error) req.error(response, 'GM_xmlhttpRequest error');
					}
				});
			}
		};
	}
	
	function cmpVersion(v1, v2) {
		if(v1===v2) return 0;
		var a1 = v1.toString().split(".");
		var a2 = v2.toString().split(".");
		for( var i = 0; i < a1.length && i < a2.length; i++ ) {
			var diff = parseInt(a1[i],10) - parseInt(a2[i],10);
			if( diff>0 ) {
				return 1;
			}
			else if( diff<0 ) {
				return -1;
			}
		}
		diff = a1.length - a2.length;
		return (diff>0) ? 1 : (diff<0) ? -1 : 0;
	}

	
	/* Simple rounding (extracted from jQuery Corner) */
	jQuery.fn.rounding = function(radius) {
		radius = radius || "10px";
		return this.each(function(i) {
			//log ("IsMoz = " + $.browser.mozilla + " Agent: '" + navigator.userAgent + "' Version:"+ $.browser.version);
			if ($.browser.safari && cmpVersion($.browser.version,"3.0")>=0) {
				$(this).css('-webkit-border-radius', radius);
			}
			else {
				$(this).css('border-radius', radius);
			}
		});
	};

	/* Global status area - feel free to reuse in your own scripts :)
	   Requires jQuery and the round extension above. */
	function StatusBox(title, newVersion) {
		/* Setup status area */
		var status_area = $('#wcds_greasemonkey_status_area').eq(0);
		if (status_area.length == 0) {
			var statWidth = '20%';
			if (window.innerWidth < 1340)
				statWidth = 268;
			status_area = $('<div id="wcds_greasemonkey_status_area"></div>').css({
				'position': 'fixed',
				'margin': '20px',
				'width': statWidth,
				'z-index': 499
			});
			var boxPos = GM_getValue("box_position", "top_right");
			if (boxPos == "bottom_right")
				status_area.css({ 'bottom': '0', 'right': '0'});
			else if (boxPos == "top_left")
				status_area.css({ 'top': '0', 'left': '0'});
			else if (boxPos == "bottom_left")
				status_area.css({ 'bottom': '0', 'left': '0'});
			else /* top_right */
				status_area.css({ 'top': '0', 'right': '0'});
			$('body').append(status_area);
		}

		/* Create box */
		var box = $('<div id="status_content_area"></div>').hide();
		box.css({
			'color': 'white',
			'background-color': 'black',
			'opacity': 0.5,
			'margin': '0 0 10px 0',
			'padding': '10px 10px 20px 10px'}).rounding();
		if (newVersion == CURRENT_VERSION)
			box.append($('<div><a class="sBoxTitle" href='+SCRIPT_URL+' target="new">'+title+'</a></div>').css({'font-weight':'bold'}));
		else
			box.append($('<div><a class="sBoxTitle" href='+SCRIPT_URL+' target="new">'+title+' - <span class="sboxTitleVersion">Version '+newVersion+' available</span></a></div>').css({'font-weight':'bold'}));

		/* Create contents area */
		var contents = $('<div></div>');
		box.append(contents);

		var timer = null;
		var timeout = 0;
		var inhibit_fade = false;

		function set_visible(visible) {
			if (visible && box.is(':hidden')) box.fadeIn(500);				
			else if (!visible && box.is(':visible')) box.fadeOut(500);
		}

		function clear_timer() {
			if (timer) {
				window.clearTimeout(timer);
				timer = null;
			}
		}

		function set_timer() {
			if (!timer && timeout > 0) {
				timer = window.setTimeout(function() { clear_timer(); set_visible(false); }, timeout);
			}			
		}

		function update_timer(t) {
			clear_timer();
			timeout = t;
			if (!inhibit_fade) set_timer();
		}

		function set_inhibit_fade(inhibit) {
			inhibit_fade = inhibit;
			if (!inhibit_fade) { set_timer(); }
			else clear_timer();
		}

		/* Register event handlers */
		box.mouseenter(function(event) {
			set_inhibit_fade(true);
			jQuery(this).fadeTo(500, 0.8);
		});

		box.mouseleave(function(event) {
			set_inhibit_fade(false);
			jQuery(this).fadeTo(500, 0.5);
		});

		box.click(function(event) {
			clear_timer();
			jQuery(this).unbind('mouseenter');
			jQuery(this).unbind('mouseleave');
			set_visible(false);
		});

		/* Append to global status area */
		status_area.append(box);

		return {
			contents: function() {
				return contents;
			},

			show: function(t) {
				if (global_hideStatusBox != 'true' || newVersion != CURRENT_VERSION || /what\.cd\/torrents\.php.type/.test(document.URL)) {
					t = t || 0;
					update_timer(t);
					set_visible(true);
				}
			},

			hide: function() {
				clear_timer();
				set_visible(false);
			}
		};
	}

	function doOptionsMenu() {
		var options_menu = $('#js_options_menu').eq(0);
		if (options_menu.length == 0) {
			optHeight = 545;
			optWidth = 820;
			options_menu = $('<div id="js_options_menu"></div>').css({
				'background-color': 'rgba(40,40,40,0.96)',
				'position': 'fixed',
				'top': window.innerHeight,
				'left': '50%',
				'margin-left': -optWidth*.5,
				'width': optWidth,
				'height': optHeight,
				'z-index': 500,
				'font-family': 'Arial, sans-serif',
			}).hide().rounding();
			css_div = $('<div></div>').css({
				'width': '95%', 'height':'auto','margin': '20px 20px 15px','color':'#ffffff'//,'overflow': 'hidden'
			});
			refreshHeader = $('<h3 class="wcds_header">Update Frequency</h3>');
			refreshInput = $('<input class="wcds_subItem" type="text" name="interval" maxlength="3">Interval between updates in minutes (minimum of 10)<br>').css({'text-align':'right', 'width':'20px'});
			columns_div = $('<div></div>').css({ 'width':'100%', 'margin-top':'-18px', 'display':'table'});
			leftColumn = $('<div class="wcds_leftCol"></div>');
			leftColumn.append(refreshHeader);
			leftColumn.append(refreshInput);

			hideHeader = $('<h3 class="wcds_header">Visibility</h3>');
			check_box_hide = $('<input class="wcds_subItem" type="checkbox" name="visibility">Show the status box on all pages<br>');
			explanation_div = $('<div class="wcds_small_text wcds_subItem">The status box will always appear on \'/torrents.php?type=...\' and whenever a script update is available.</div>');
			leftColumn.append(hideHeader);
			leftColumn.append(check_box_hide);
			leftColumn.append(explanation_div);
			
			positionHeader = $('<h3 class="wcds_header">Status Box Position</h3>');
			radio_button_tl = $('<input class="wcds_subItem" type="radio" name="location" id="top_left"/>Top Left<br>');
			radio_button_tr = $('<input class="wcds_subItem" type="radio" name="location" id="top_right"/>Top Right<br>');
			radio_button_bl = $('<input class="wcds_subItem" type="radio" name="location" id="bottom_left"/>Bottom Left<br>');
			radio_button_br = $('<input class="wcds_subItem" type="radio" name="location" id="bottom_right"/>Bottom Right<br>');
			rightColumn = $('<div class="wcds_rightCol"></div>');
			rightColumn.append(positionHeader);
			rightColumn.append(radio_button_tl);
			rightColumn.append(radio_button_tr);
			rightColumn.append(radio_button_bl);
			rightColumn.append(radio_button_br);
			columns_div.append(leftColumn);
			columns_div.append(rightColumn);
			css_div.append(columns_div);

			full_div = $('<div></div>');		
			
			styleHeader = $('<h3 class="wcds_header">Link Style Settings</h3>');
			full_div.append(styleHeader);
			sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_gsnatched">Sample Group Snatched Torrent Link</a><br>');
			sampleText.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.group_snatched</span><input class="wcds_text" type="text" id="input_gsnatched" value="'+ style_groupsnatched +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_gsnatched', 'input_gsnatched'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () {	SetStyle('sample_gsnatched', GROUP_SNATCHED); jQuery("input[id='input_gsnatched']").val(GROUP_SNATCHED); return false; });
			full_div.append(sampleText);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);
			
			sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_tsnatched">Sample Snatched Torrent Link</a><br>');
			sampleText.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.wcds_snatched</span><input class="wcds_text" type="text" id="input_tsnatched" value="'+ style_tsnatched +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_tsnatched', 'input_tsnatched'); ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () { SetStyle('sample_tsnatched', T_SNATCHED); SetStyle('sample_seeding', T_SNATCHED + jQuery("input[id='input_seeding']").val()); jQuery("input[id='input_tsnatched']").val(T_SNATCHED); return false; });
			full_div.append(sampleText);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);
			
			sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_uploaded">Sample Uploaded Torrent Link</a><br>');
			sampleText.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.wcds_uploaded</span><input class="wcds_text" type="text" id="input_uploaded" value="'+ style_uploaded +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_uploaded', 'input_uploaded'); ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () { SetStyle('sample_uploaded', UPLOADED); SetStyle('sample_ul_seed', UPLOADED + jQuery("input[id='input_seeding']").val()); jQuery("input[id='input_uploaded']").val(UPLOADED); return false; });
			full_div.append(sampleText);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);
			
			//sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_seeding">Sample Seeding Snatched Torrent Link</a><span>&nbsp;&nbsp;(.wcds_snatched style is also applied to this link)</span><br>');
			//sampleTxt2 = $('<span class="wcds_class"></span><a href="#" id="sample_ul_seed">Sample Seeding Uploaded Torrent Link</a><span>&nbsp;&nbsp;(.wcds_uploaded style is also applied to this link)</span><br>');
			sampleText = $('<span class="wcds_class"></span>Seeding links will <i>always</i> have either the .wcds_snatched style or the .wcds_uploaded style applied<br><span class="wcds_class"></span>to them, so .wcds_seeding is commonly used to override those base styles.</br>');
			sampleTxt2 = $('<span class="wcds_class"></span><a href="#" id="sample_seeding">Sample Seeding Snatched Torrent Link</a>&nbsp;&nbsp;<a href="#" id="sample_ul_seed">Sample Seeding Uploaded Torrent Link</a><br>');
			//sampleText.click(function () { return false; });
			sampleTxt2.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.wcds_seeding</span><input class="wcds_text" type="text" id="input_seeding" value="'+ style_seeding +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding'); ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () { SetStyle('sample_seeding', jQuery("input[id='input_tsnatched']").val() + SEEDING); jQuery("input[id='input_seeding']").val(SEEDING); 
											SetStyle('sample_ul_seed', jQuery("input[id='input_uploaded']").val() + SEEDING); return false; });
			full_div.append(sampleText);
			full_div.append(sampleTxt2);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);

			sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_leeching">Sample Leeching Torrent Link</a><br>');
			sampleText.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.wcds_leeching</span><input class="wcds_text" type="text" id="input_leeching" value="'+ style_leeching +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_leeching', 'input_leeching'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () { SetStyle('sample_leeching', LEECHING); jQuery("input[id='input_leeching']").val(LEECHING); return false; });
			full_div.append(sampleText);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);

			sampleText = $('<span class="wcds_class"></span><a href="#" id="sample_bookmarked">Sample Bookmarked Torrent Link</a><br>');
			sampleText.click(function () { return false; });
			snatchedInput = $('<span class="wcds_class">.wcds_bookmark</span><input class="wcds_text" type="text" id="input_bookmarked" value="'+ style_bookmarked +'">');
			applyLink = $('<span class="wcds_sm_button">Test</span>');
			applyLink.click(function () { ApplyStyle('sample_bookmarked', 'input_bookmarked'); return false; });
			defaultLink = $('<span class="wcds_sm_button">Default</span>');
			defaultLink.click(function () { SetStyle('sample_bookmarked', BOOKMARKED); jQuery("input[id='input_bookmarked']").val(BOOKMARKED); return false; });
			full_div.append(sampleText);
			full_div.append(snatchedInput);
			full_div.append(applyLink);
			full_div.append(defaultLink);
			css_div.append(full_div);

			okay_button = $('<span id="js_ok_button" class="wcds_button">Submit</span>');
			okay_button.click(function () { CommitOptions(); DisplaySlideMenu(false); });
			cancel_button = $('<span id="js_close_button" class="wcds_button">Cancel</span>');
			cancel_button.click(function () { DisplaySlideMenu(false); });
			button_div = $('<div></div>').css({
				'width': '95%', 'margin': '15px','overflow': 'hidden'
			});

			options_menu.append(css_div);
			button_div.append(cancel_button);
			button_div.append(okay_button);
			options_menu.append(button_div);
			$('body').append(options_menu);
		}
		else {
			// we already created the div
			var boxPos = GM_getValue('box_position', 'top_right');
			jQuery("input[name='location'][id='" + boxPos + "']").attr('checked','checked');
			if (global_hideStatusBox != 'true')
				jQuery("input[name='visibility']").attr('checked','checked');
			jQuery("input[name='interval']").val(global_updateFreq);
			ApplyStyle('sample_gsnatched', 'input_gsnatched');
			ApplyStyle('sample_tsnatched', 'input_tsnatched');
			ApplyStyle('sample_uploaded', 'input_uploaded');
			ApplyStyle('sample_leeching', 'input_leeching');
			ApplyStyle('sample_seeding', 'input_tsnatched', 'input_seeding');
			ApplyStyle('sample_ul_seed', 'input_uploaded', 'input_seeding');
			ApplyStyle('sample_bookmarked', 'input_bookmarked');
		}
	}
	
	function ApplyStyle(textControl, styleControl, styleControl2) {
		css_style = jQuery("input[id='" + styleControl + "']").val();
		if (styleControl2)
			css_style += jQuery("input[id='" + styleControl2 + "']").val();
		SetStyle(textControl, css_style);
	}
	
	function SetStyle(textControl, css_style) {
		jQuery("a[id='" + textControl + "']").removeAttr('style');
		jQuery("a[id='" + textControl + "']").attr('style',css_style);
	}

	function CommitOptions() {
		var locRadio = jQuery("input[name='location']:checked").attr('id');
		if (locRadio.length != 0)
			GM_setValue('box_position',locRadio);
		var boxHide = jQuery("input[name='visibility']:checked");
		if (boxHide.length != 0)
			GM_deleteValue('box_hidden');		
		else {
			GM_setValue('box_hidden','true');
			global_hideStatusBox = true;
			status.hide();
		}
		var updateFreq = jQuery("input[name='interval']").val();
		if (jQuery.isNumeric(updateFreq) && updateFreq != global_updateFreq) {
			if (updateFreq < 10) updateFreq = 10;
			GM_setValue('update_freq', updateFreq);
			}
		AddOrDeleteCustomStyle('input_gsnatched',	GROUP_SNATCHED, 'style_groupsnatched',	'.group_snatched');
		AddOrDeleteCustomStyle('input_tsnatched',	T_SNATCHED, 	'style_tsnatched', 		'.wcds_snatched');
		AddOrDeleteCustomStyle('input_uploaded',	UPLOADED, 		'style_uploaded', 		'.wcds_uploaded');
		AddOrDeleteCustomStyle('input_leeching', 	LEECHING, 		'style_leeching', 		'.wcds_leeching');
		AddOrDeleteCustomStyle('input_seeding', 	SEEDING, 		'style_seeding', 		'.wcds_seeding');
		AddOrDeleteCustomStyle('input_bookmarked', 	BOOKMARKED, 	'style_bookmarked', 	'.wcds_bookmark');
	}
	
	function AddOrDeleteCustomStyle(inputName, def_css, storageVal, className) {
		css = jQuery.trim(jQuery("input[id='" + inputName + "']").val());
		if (css == def_css) {	// if the current css stripped of whitespace equals the default style, delete the custom style
			GM_deleteValue(storageVal);
			css = def_css;
			}
		else 
			GM_setValue(storageVal, css);
		GM_addStyle(className + '{' + css + '}');	// updates the page without reloading (at least on chrome)
	}
	
	function DisplaySlideMenu(showMenu) {
		if (showMenu) {
			if (!slideMenuShowing) {
				slideMenuShowing = 1;
				jQuery('#js_options_menu').show().animate({
					top:'-=' + (jQuery('#js_options_menu').innerHeight()-10) + 'px'
				});
			}
		} else {
			slideMenuShowing = 0;
			jQuery('#js_options_menu').animate({
				top:'+=' + (jQuery('#js_options_menu').innerHeight()-10) + 'px'
			}, function () { jQuery('#js_options_menu').hide(); });
		}
	}
	/*****************************/
	/*** END OPTIONS PAGE CODE ***/
	/*****************************/
	
	/* Cache */
	function Cache(name, def_value) {
		var cache;
		return {
			serialize: function() {
				GM_setValue(name, JSON.stringify(cache));
			},
			unserialize: function() {
				cache = jQuery.parseJSON(GM_getValue(name, 'false'));
				if (!cache) cache = jQuery.extend({}, def_value); /* clone */
				return cache;
			},
			clear: function() {
				cache = jQuery.extend({}, def_value); /* clone */
				this.serialize();
			}
		};
	}

	function registerMenuCommand(oText, oFunc) {
		if(/firefox/i.test(navigator.userAgent))
			GM_registerMenuCommand(oText, oFunc);
		MenuCommandArray[MenuCommandArray.length] = [oText.replace("What.CD Snatched: ",""),oFunc,oText.replace("What.CD Snatched: ","").replace(" ","_")];
	}
	
	/************************************/
	/*** SCRIPT EXECUTION STARTS HERE ***/
	/************************************/

	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|https:\/\/what\.cd)/)[1];

	/* Create proxy */
	var whatcd_proxy = Proxy(whatcd_url_base, 1000);

	/* Get user id of this user */
	var whatcd_id = (function() {
		var m = $('#userinfo_username .username').eq(0).attr('href').match(/user\.php\?id=(\d+)/);
		if (m) return m[1];
		return null;
	})();

	if (!whatcd_id) return; /* Exceptional condition: User ID not found */

	/* Create status box */
	var server_version = GM_getValue("serverVersion", CURRENT_VERSION);
	var status = StatusBox('What.CD Snatched', server_version);
	var options = doOptionsMenu();
	var slideMenuShowing = 0;

	/* Cache of snatched torrents */
	var snatch_cache = Cache('snatch_cache', { groups: {}, torrents: {} });
	var bookmark_cache = Cache('bookmark_cache', { groups: {} });

	var MenuCommandArray = [];
	var hasPageGMloaded = false;

	/* Reset command */
	registerMenuCommand('What.CD Snatched: Reset Snatched', function() { snatch_cache.clear(); bookmark_cache.clear(); GM_setValue('last_update', '0'); GM_setValue('full_update','1'); GM_setValue('fullUpdateStarted','1'); location.reload(); });
	/* Update w/o clear */
	registerMenuCommand('What.CD Snatched: Update', function() { GM_setValue('last_update', '0'); GM_setValue('full_update','1'); GM_setValue('force_all','1'); GM_setValue('fullUpdateStarted','1'); location.reload(); });	
	registerMenuCommand('What.CD Snatched: Options', function() { DisplaySlideMenu(true); });

	doGMMenu();
	doOptionsMenu();

		/* Scan torrent table in doc and mark links as type in cache */
	function scan_torrent_page(doc, type) {
		//log(type);
		var torrent_table = jQuery(doc).find('#content > .thin > table').eq(0);
		if (torrent_table.length == 0) return 0;
		var found = 0;

		/* Old version: {"groups":{"2417":{"name":"pg.lost - Yes I Am"}}, "torrents":{941290:{type:"snatched", seeding:true}}} */
		/* New version: {"groups":{"2417":{"nm":"pg.lost - Yes I Am"}}, "torrents":{941290:{ty:"snatched", sd:1}}} // this was changed to save space */
		var d = snatch_cache.unserialize();
		torrent_table.find('div.group_info').each(function(i) {
			/* Find group and torrent ID */
			var group_id;
			var torrent_id;
			var link = jQuery(this).children('a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
			if (m) {
				group_id = m[1];
				torrent_id = m[2];
			} else {
				/* I don't know if we can ever get here! */
				log("Not sure how What.CD Snatched got here. Please notify MordredKLB with what you were doing");
				m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
				if (m) {
					group_id = m[1];
					//link = jQuery(this).children('td').eq(1).children('span').eq(0).children('a').eq(0);
					link = jQuery(this).children('td').eq(1).find('span:first a:first').eq(0);
					m = link.attr('href').match(/torrents\.php\?action=download&id=(\d+)/);
					if (m) torrent_id = m[1];
				}
				if (!m) {
					status.contents().append('<div><span style="color: red;">Failed:</span> '+$(this).children('td').eq(1).text()+'</div>');
					z();	//purposely error out
				}
			}

			/* Save in cache */
			if (group_id && torrent_id) {
				// we are saving a type of "snatched" but when applying that class we have to apply it as "wcds_snatched" due to a What.CD having it's own .snatched style now
				if (!d.torrents[torrent_id] ||
						(type != 'seeding' && d.torrents[torrent_id].ty != type && !(type!='uploaded' && d.torrents[torrent_id].ty=='uploaded')) ||		// we have issues if you've snatched a torrent you uploaded, so uploaded takes precendence
						(type == 'seeding' && !d.torrents[torrent_id].sd)) {
					var reg = jQuery(this).text().match(/.*\s]\s+(.+)\s(\[\d{4}\])\s-/);
					if (!reg)
						reg = jQuery(this).text().match(/.*\s]\s+(.+)\s-?/);
					var nm = jQuery.trim(reg[1]);
					//trying alternate method
					//log(jQuery(this).clone().children('span, div, strong').remove().end().text());
					//var nm = jQuery.trim(jQuery(this).clone().children('span, div, strong').remove().end().text().match(/(.+)\s(\[|-)/)[1]);
					
					d.groups[group_id] = { nm: nm.replace(/"/g,"'") };
					if (type == 'seeding') { /* Special case seeding */
						if (d.torrents[torrent_id])
							d.torrents[torrent_id].sd = 1;
						else
							d.torrents[torrent_id] = { ty: 'seeding', sd: 1 };
					} else {
						if (d.torrents[torrent_id])
							d.torrents[torrent_id].ty = type;
						else 
							d.torrents[torrent_id] = { ty: type, sd: 0 };
					}
					//log ("adding:" + nm + " with group_id="+group_id+", torrent_id="+torrent_id);
					found += 1;
				}
			}
		});

		if (found == 0) return 0;

		snatch_cache.serialize();
		return found;
	}
	
	function scan_bookmark_page(doc) {
		//log ('scanning bookmark page');
		var torrent_table = jQuery(doc).find('#torrent_table').eq(0);
		if (torrent_table.length == 0) return 0;
		var found = 0;

		bookmark_cache.clear();		// makes sense not to save bookmarks because they get added/removed a lot and it's just one page
		var b = bookmark_cache.unserialize();
		torrent_table.find('tr.group.discog').each(function(i) {
			/* Find group and torrent ID */
			var group_id;
			
			var link = jQuery(this).find('strong a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
			if (m) {
				group_id = m[1];
				b.groups[group_id] = 1;
				found++;
				}
			//log (found + ". group_id:" + group_id + " - " + link.text());
		});
		torrent_table.find('tr.torrent').each(function(i) {	// single, non-music torrents show up not in a group
			/* Find group and torrent ID */
			var group_id;
			
			var link = jQuery(this).find('strong a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
			if (m) {
				group_id = m[1];
				b.groups[group_id] = 1;
				found++;
				}
			//log (found + ". group_id:" + group_id + " - " + link.text());
		});
		bookmark_cache.serialize();
		return found;
	}

	/* Fetch and scan all pages of type, call callback when done */
	function scan_all_torrent_pages(type, page_cb, finish_cb, forced_full) {
		var page = 1;
		var total = 0;
		var lastPage = 0;

		function request_url() {
			if (type == 'bookmark')
				return '/bookmarks.php?type=torrents';
			else
				return '/torrents.php?type='+type+'&userid='+whatcd_id+'&page='+page;
		}

		function error_handler(response, reason) {
			status.contents().append('<div><span style="color: red;">Error:</span> Unable to fetch '+type+' page '+page+' ('+reason+')</div>');
			status.show();
			finish_cb(total);
		}

		function page_handler(response) {
			if (response.status == 200) {
				//pageText = response.responseText.replace(/collageShow.*\);/g,";");
				//log (pageText);
				var doc = document.implementation.createHTMLDocument('');
				doc.documentElement.innerHTML = response.responseText; //.replace(/<head>[\s\S]*<\/head>/,"<head><\/head>");
				
				page_cb(type, page);
				
				if (forced_full == 1) {
					lastPage = 1;
					jQuery(doc).find('#content .linkbox').eq(0).find('a:last').each(function(i) {
						var pgVal = jQuery(this).attr('href').match(/torrents\.php\?page=(\d+)&type/);
						lastPage = pgVal[1];
					});
				}
				if (type == 'bookmark') {
					//log(doc); // There's a big <script> block that appears right before the torrent_table. This causes the XML parser fits, so we are just removing it up above
					var found = scan_bookmark_page(doc);
					}
				else
					var found = scan_torrent_page(doc, type);
				total += found;
				if ((found == 0 && forced_full == 0) || (forced_full == 1 && page >= lastPage) || (type == 'bookmark')) { finish_cb(type, total); return; } /* End of asynchronous chain */

				page += 1;
				whatcd_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
			} else {
				error_handler(response, 'HTTP '+response.status);
			}
		}

		whatcd_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
	}

	/* Mark all links to torrents that are snatched/uploaded/leeching/seeding/bookmarked */
	function mark_snatched_links() {
		var d = snatch_cache.unserialize();
		var b = bookmark_cache.unserialize();

		/* Go through all links */
		jQuery('#content a').each(function(i) {
			var href = jQuery(this).attr('href');
			if (href) {
				var group_id;
				var torrent_id;

				/* Find and mark links to snatched torrents */
				var m = href.match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
				if (m) {
					group_id = m[1];
					torrent_id = m[2];
				} else {
					m = href.match(/torrents\.php\?torrentid=(\d+)/);
					if (m) {
						torrent_id = m[1];
					} else {
						m = href.match(/torrents\.php\?id=(\d+)/);
						if (m) group_id = m[1];
					}
				}

				/* Add classes */
				if (group_id && d.groups[group_id] &&
						(!torrent_id || !jQuery(this).parent().parent().is('.group_torrent')) && !jQuery(this).is('.post_id')) {
					jQuery(this).addClass('group_snatched');
				}
				if (group_id && b.groups[group_id] && !(/what\.cd\/bookmarks\.php/.test(document.URL)) &&
						!(/what\.cd\/user\.php/.test(document.URL)) &&
						(!torrent_id || !jQuery(this).parent().parent().is('.group_torrent')) && !jQuery(this).is('.post_id')) {
					jQuery(this).addClass('wcds_bookmark');
				}
				if (torrent_id && d.torrents[torrent_id]) {
					if (d.torrents[torrent_id].ty == 'snatched')
						jQuery(this).addClass('wcds_snatched');	// we can't use .snatched anymore because what has now added it's own .snatched class
					else if (d.torrents[torrent_id].ty == 'uploaded')
						jQuery(this).addClass('wcds_uploaded');
					else if (d.torrents[torrent_id].ty == 'leeching')
						jQuery(this).addClass('wcds_leeching');
					if (d.torrents[torrent_id].sd) { 
						if (d.torrents[torrent_id].ty != 'uploaded') 
							jQuery(this).addClass('wcds_seeding wcds_snatched');	// we're really just marking seeding here, but you can't seed if you haven't snatched so adding that class as well
						else
							jQuery(this).addClass('wcds_seeding');
						}
				}

				/* Change text if text is url */
				if (('/'+jQuery(this).text()) == jQuery(this).attr('href')
					&& group_id && d.groups[group_id] && d.groups[group_id].nm) {
					jQuery(this).text(d.groups[group_id].nm);
				}
			}
		});

		/* Mark links on album page in torrent table */
		if (/what\.cd\/torrents\.php/.test(document.URL)) {
			/* Parse search */
			var search = {};
			var search_list = document.location.search.substring(1).split('&');
			for (var i = 0; i < search_list.length; i++) {
				var pair = search_list[i].split('=');
				search[pair[0]] = pair[1];
			}

			if (search.id) {
				/* Album page */
				jQuery('#content .torrent_table:first tr.group_torrent').each(function(i) {
					/* Find torrent id */
					var torrent_id;
					jQuery(this).find('td:first span:first a').each(function(i) {
						var href = jQuery(this).attr('href');
						if (href) {
							var m = href.match(/torrents\.php\?torrentid=(\d+)/);
							if (m) {
								// the permalink automatically gets the style applied to it, so we need to remove it here and then manually add it to the text below
								torrent_id = m[1];
								jQuery(this).removeClass('group_snatched wcds_snatched wcds_uploaded wcds_leeching wcds_seeding');
								return false;
							}
						}
					});

					if (torrent_id && d.torrents[torrent_id]) {
						var link = jQuery(this).find('td:first a:last');
						if (d.torrents[torrent_id].ty == 'snatched')
							link.addClass('wcds_snatched');	// we can't use .snatched anymore because what has now added it's own .snatched class
						else if (d.torrents[torrent_id].ty == 'uploaded')
							link.addClass('wcds_uploaded');
						else if (d.torrents[torrent_id].ty == 'leeching')
							link.addClass('wcds_leeching');
						if (d.torrents[torrent_id].sd) {
							if (d.torrents[torrent_id].ty != 'uploaded') 
								link.addClass('wcds_seeding wcds_snatched');	// we're really just marking seeding here, but you can't seed if you haven't snatched so setting that class too
							else
								link.addClass('wcds_seeding');
							}
					}
				});
			}
		}
		
		/* Show bookmark link on bookmarked album page */
		if (/what\.cd\/torrents\.php\?id/.test(document.URL)) {
			var albumName = jQuery('#content > .thin > .header > h2 > span').eq(0);
			if (albumName) {
				var m = document.URL.match(/torrents\.php\?id=(\d+)/);
				if (m) {
					group_id = m[1];
					if (b.groups[group_id])
						albumName.addClass('wcds_bookmark');
				}
			}
		}
	}

	/* Mark torrent as leeching when download link is clicked */
	function mark_download_links() {
		jQuery('#content').find('a').each(function(i) {
			var href = jQuery(this).attr('href');
			if (href) {
				/* Find download links */
				var m = href.match(/torrents\.php\?action=download&id=(\d+)/);
				if (m) {
					var torrent_id = m[1];
					jQuery(this).click(function(event) {
						var d = snatch_cache.unserialize();
						d.torrents[torrent_id] = { ty: 'leeching', sd: 0 };
						snatch_cache.serialize();
						mark_snatched_links();
					});
				}
			}
		});
	}

	function mark_bookmark_links() {
		jQuery('#content').find('a').each(function(i) {
			var id = jQuery(this).attr('id');
			if (id) {
				/* Find download links */
				var m = id.match(/bookmarklink_torrent_(\d+)/);
				if (m) {
					//log (m);
					var group_id = m[1];
					jQuery(this).click(function(event) {
						if (!/remove/i.test(jQuery(this).text()) && !/unbookmark/i.test(jQuery(this).text())) {
							var b = bookmark_cache.unserialize();
							b.groups[group_id] = 1;
							bookmark_cache.serialize();
							mark_snatched_links();
						} else {
							var b = bookmark_cache.unserialize();
							delete b.groups[group_id];
							bookmark_cache.serialize();
							jQuery('#content').find('a.wcds_bookmark').each(function(i) {
								var href = jQuery(this).attr('href');
								torrentString = 'torrents.php?id='+group_id;
								if (href && href=='torrents.php?id='+group_id) {
									jQuery(this).removeClass('wcds_bookmark');
								}
							});
							jQuery('#content > .thin > .header > h2 > span').eq(0).removeClass('wcds_bookmark');
						}
					});
				}
			}
		});
	}

	/* This function was hacked from a generic one and converted to jQuery to work better with What.CD Snatched.
	   If you'd like to see that version it's here: http://userscripts.org/scripts/show/68559 */
	function doGMMenu() {
		// jQuery Version
		if( !MenuCommandArray.length ) { return; }
		var mdiv = $('<div></div>'); 
		$.each(MenuCommandArray, function(i, value) {
			if (i+1<MenuCommandArray.length)
				var mEntry = $('<span><a href="#" id="'+ MenuCommandArray[i][2] +'">' + MenuCommandArray[i][0] + '</a>\u00A0\u00A0|\u00A0\u00A0</span>');
			else
				var mEntry = $('<a href="#" id="'+ MenuCommandArray[i][2] +'">' + MenuCommandArray[i][0] + '</a>');
			mEntry.click(function () { MenuCommandArray[i][1](arguments[0]); var e = arguments[0]; e.stopPropagation(); return false; });
			mdiv.append(mEntry);
		});
		status.contents().append(mdiv);
	}
	
	/* Scan current page */
	if (/what\.cd\/torrents\.php/.test(document.URL)) {
		/* Parse search */
		var search = {};
		var search_list = document.location.search.substring(1).split('&');
		for (var i = 0; i < search_list.length; i++) {
			var pair = search_list[i].split('=');
			search[pair[0]] = pair[1];
		}

		var full_update = GM_getValue('full_update','0');
		
		if ((search.type == 'snatched' || search.type == 'uploaded' || search.type == 'seeding' || search.type == 'leeching') && 
				search.userid == whatcd_id && full_update == 0) {
			var scan_status = $('<div>Scanning current page... <span></span></div>');
			status.contents().append(scan_status);
			status.show();
			
			/* Scan current page */
			var found = scan_torrent_page(document, search.type);
			scan_status.children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')');
			status.show(5000);
		}
	}
	if (/what\.cd\/bookmarks\.php(?!.action=edit)/i.test(document.URL)) {
		var scan_status = $('<div>Scanning current page... <span></span></div>');
		status.contents().append(scan_status);
		status.show();
		
		bookmark_cache.clear();
		var found = scan_bookmark_page(document);
		
		scan_status.children('span').text(((found > 0) ? (found+' bookmarks found') : 'no bookmarks found'));
		status.show(5000);
	}

	/* Mark links */
	mark_download_links();
	mark_bookmark_links();
	mark_snatched_links();
	
	/*******************************/
	/*** AUTO-UPDATE STARTS HERE ***/
	/*******************************/
	var now = new Date();
	var just_updated = 0;
	var last_update = parseInt(GM_getValue('last_update', '0'));
	var next_update = last_update + global_updateFreq*60*1000;
	var full_update = GM_getValue('full_update','0');
	var forced_full = GM_getValue('force_all','0');

	if (scriptVersion != CURRENT_VERSION) {
		log("Script was recently updated to " + CURRENT_VERSION);
		// the script was recently updated
		GM_setValue('script_version', CURRENT_VERSION);
		GM_deleteValue('custom_style');			// no longer used
		//GM_deleteValue('snatch_cache');		// Had to reset this due to changes in the cache structure. Will remove in a version or two.
		GM_deleteValue('serverVersion');		// we remove this just to make sure it will be properly retrieved in the future
		GM_deleteValue('lastUpdateCheck');
		GM_deleteValue('last_update');
		just_updated = 1;						// location.reload is called after we reach the end of this function so we don't want the script to continue executing before reloading first
		location.reload();
	}
	if (full_update == 1 /*&& !(/what\.cd\/torrents\.php/.test(document.URL))*/) {
		GM_deleteValue('full_update');
		GM_deleteValue('last_update');
		GM_deleteValue('force_all');
		next_update = 0;
		last_update = 0;
		}
	if (next_update < now.getTime() && just_updated!=1) {
		GM_setValue('last_update', now.getTime().toString());
		var fullUpdateFinished = GM_getValue('fullUpdateStarted', '0');
		var jobs = 5;
		var total_found = {};
		
		/* Show auto update status */
		last_update = 0;
		if (last_update == 0) {
			var update_status = {
				snatched: $('<div>Updating snatched: <span>Initializing...</span></div>'),
				uploaded: $('<div>Updating uploaded: <span>Initializing...</span></div>'),
				leeching: $('<div>Updating leeching: <span>Initializing...</span></div>'),
				seeding: $('<div>Updating seeding: <span>Initializing...</span></div>'),
				bookmark: $('<div>Updating bookmarks: <span>Initializing...</span></div>'),
			};
			for (var type in update_status) status.contents().append(update_status[type]);
			status.show();
		}

		function scan_page_handler(type, page) {
			if (last_update == 0) {
				update_status[type].children('span').text('Page '+page+'...');
				status.show();
			}
		}

		function scan_finished_handler(type, found) {
			if (last_update == 0) {
				if (type != 'bookmark')
					update_status[type].children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')');
				else
					update_status[type].children('span').text('Done ('+((found > 0) ? (found+' bookmarks found') : 'no bookmarks found')+')');
			}

			jobs -= 1;
			total_found[type] = found;

			if (jobs == 0) {
				mark_snatched_links();
				if (last_update == 0) {
					var total = [];
					for (var type in total_found) 
						if (total_found[type] > 0) 
							total.push(type+': '+total_found[type]);
					status.contents().append('<div>Auto update done</div>');
					GM_deleteValue('fullUpdateStarted');
					status.show(5000);
				}
			}
		}

		/* Rescan all types of torrent lists */
		if (fullUpdateFinished == 1)
			forced_full = 1;
		scan_all_torrent_pages('snatched', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('uploaded', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('leeching', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('seeding',  scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('bookmark', scan_page_handler, scan_finished_handler, 0);
	}

	/**********************************/
	/*** SCRIPT EXECUTION ENDS HERE ***/
	/**********************************/

	/*** Functions for Chrome ***/
	function quoteString(string){
		if(string.match(_escapeable)) {
		return'"'+string.replace(_escapeable,function(a){
			var c=_meta[a];
			//log(c + " - " + string);  // this was spitting out a bunch of logged stuff whenever there was a '\' in the torrent name
			if(typeof c==='string')return c;
			c=a.charCodeAt();
			return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';
		}return'"'+string+'"';
	};
	var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;
	var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};

	if( ! /firefox/i.test(navigator.userAgent)) {
		if (typeof GM_addStyle == 'undefined' ) {
			function GM_addStyle(css) {
				jQuery("<style type='text/css'>"+css+"</style>").appendTo('head');
			}
		}
		function GM_getValue (key, defaultValue) {
			var value = window.localStorage.getItem(key);
			if (value == null) value = defaultValue;
			return value;
		}
		function GM_setValue(key, value) {
			window.localStorage.setItem( key, value );
		}
		function GM_deleteValue(key) {
			window.localStorage.removeItem( key );
		}
		
		function GM_xmlhttpRequest(details) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				var responseState = {
					responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
					responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
					readyState:xmlhttp.readyState,
					responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
					status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
					statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
				}
				if (details["onreadystatechange"]) {
					details["onreadystatechange"](responseState);
				}
				if (xmlhttp.readyState==4) {
					if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
						details["onload"](responseState);
					}
					if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
						details["onerror"](responseState);
					}
				}
			}
			try {
			  //cannot do cross domain
			  xmlhttp.open(details.method, details.url);
			} catch(e) {
			  if( details["onerror"] ) {
				//simulate a real error
				details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
			  }
			  return;
			}
			if (details.headers) {
				for (var prop in details.headers) {
					xmlhttp.setRequestHeader(prop, details.headers[prop]);
				}
			}
			xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
		}
		function GM_log(message) { 
			console.log(message); 
		}
	}
	jQuery.noConflict();
}
// load jQuery and execute the main function
if( /opera/i.test(navigator.userAgent)) {
	console.log("What.CD Snatched: If this script is not working in Opera, make sure the filename ends in user.js");
	addJQuery(main);
}
else if( ! /firefox/i.test(navigator.userAgent) ) {	// chrome and safari
	addJQuery(main);
	}
else {
	this.$ = this.jQuery = jQuery.noConflict(true);
	main();
}
}