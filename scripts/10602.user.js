// ==UserScript==
// @name          deviantTIDY
// @namespace     http://boffinbrain.deviantart.com
// @description   Performs a variety of functions on deviantART pages to improve its look and usability.  deviantTIDY also consists of a stylesheet.  For full details, see http://www.deviantart.com/deviation/45622809/
// @version       4.6.0
// @icon          http://i.deviantart.net/icons/favicon.png
// @match         *://*.deviantart.com/*
// @grant         GM_log
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         unsafeWindow
// ==/UserScript==


"use strict";


// Gain access to deviantART's jQuery API
var $ = unsafeWindow.jQuery;


// Create a DOM element (tag, [properties,] children)
var $E = function() {
	if (arguments.length === 0) {return;}

	function applyObj(to, obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (typeof obj[prop] === 'object') {
					applyObj(to[prop], obj[prop]);
				}
				else {
					to[prop] = obj[prop];
				}
			}
		}
	}

	var elm = document.createElement(arguments[0]);

	[arguments[1], arguments[2]].forEach(function(arg, idx, ary) {
		if (typeof arg === 'object') {
			if (arg instanceof Array) {
				arg.forEach(function(append, idx, ary) {
					elm.appendChild((typeof append === 'string') ? document.createTextNode(append) : append);
				});
			}
			else {
				for (var prop in arg) {
					if (arg.hasOwnProperty(prop)) {
						if (prop === 'events') {
							var events = arg[prop];
							for (var evt in events) {
								if (events.hasOwnProperty(evt)) {
									elm.addEventListener(evt.replace(/^on/, ''), events[evt], false);
								}
							}
						}
						else {
							if (typeof arg[prop] === 'object') {
								applyObj(elm[prop], arg[prop]);
							}
							else {
								elm[prop] = arg[prop];
							}
						}
					}
				}
			}
		}
	});
	return elm;
};


// Determines whether we're within a dynamically-created deviation page
var inDynamicPage = function() {return document.getElementById('dv7') !== null;};


// Gets the logged-in user name, or '' if not logged in
var getUsername = function() {var d = unsafeWindow.deviantART.deviant; return d && d.loggedIn ? d.username : '';};


// The deviantTIDY-specific modal interface
var devianttidydialog = {
	node: null,
	timer: null,

	open: function(header, body, autoClose) {
		// Reset timer and set a new one if requested.
		clearTimeout(this.timer);
		if (autoClose) {
			this.timer = window.setTimeout(this.close.bind(this), autoClose);
		}

		// If dialog is open, close it and start a new one
		this.close();

		if (typeof header !== 'string') {return;}
		if (typeof body === 'string') {
			body = [$E('div', {className: 'ppp c'}, [body])];
		}

		body = $E('div', {className: 'ppp dialog-body'}, body);
		var node = this.createPopup(header, body);
		devianttidy.da.appendChild(node);
		this.resizePopup(node, body);
		this.node = node;
		this.addCSSWarning();
		document.getElementById('devianttidy-dialog-close').focus();
	},

	createPopup: function(header, body) {
		return $E('div', {className:'devianttidy-dialog', style:{display:'none'}}, [
			$E('div', [
				$E('div', {className:'gr-box gr-genericbox'}, [
					$E('i', {className:'gr1'}, [$E('i')]),
					$E('i', {className:'gr2'}, [$E('i')]),
					$E('i', {className:'gr3'}, [$E('i')]),
					$E('div', {className:'gr-top'}, [
						$E('i', {className:'tri'}),
						$E('div', {className:'gr'}, [
							$E('h2', [
								$E('a', {href:devianttidy.homepage, title:"deviantTIDY Homepage"}, [
									$E('img', {className:'dialog-icon', src:devianttidyicons.dt})
								]),
								header
							]),
							$E('img', {className:'dialog-close', id:'devianttidy-dialog-close', src:devianttidyicons.close, events:{
								'click':this.close.bind(this) // TODO need to wrap image in a link to allow focus
							}})
						])
					]),
					$E('div', {className:'gr-body'}, [body]),
					$E('i', {className:'gr3 gb'}),
					$E('i', {className:'gr2 gb'}),
					$E('i', {className:'gr1 gb gb1'})
				])
			])
		]);
	},

	resizePopup: function(node, body) {
		var maxPanelHeight = 900;
		var minWindowHeight = 250;

		// Set maximum body height given window height
		var ih = window.innerHeight;
		var h = ih && ih > minWindowHeight ? (ih < maxPanelHeight ? ih : maxPanelHeight) : minWindowHeight;
		body.style.maxHeight = (h * 0.9 - 60) + 'px';

		// Set vertical alignment, given popup height
		var gr = node.childNodes[0];
		gr.style.marginTop = (gr.offsetHeight ? -gr.offsetHeight / 2 : -minWindowHeight) + 'px';
	},

	close: function() {
		if (this.node) {
			var oldNode = this.node;
			this.node = null;
			$(oldNode).remove();
		}
	},

	addCSSWarning: function() {
		// Display warning about lack of CSS. The warning is hidden by the CSS when active.
		var id = 'devianttidy-no-css-452';

		if (!document.getElementById(id)) {
			devianttidy.da.appendChild($E('div', {
				id: id,
				style: { position:'fixed', top:'50%', left:'20%', right:'20%', zIndex:300, background:'#fed', textAlign:'center', padding:'1em' },
				events: {'click': function() {$("#" + id).remove();}}
			}, [
				"deviantTIDY CSS not loaded, or your CSS is not up to date!",
				$E('br'), "To get the CSS, install ",
				$E('a', { href: 'https://addons.mozilla.org/en-US/firefox/addon/2108' }, ["Stylish"]),
				" and go to the ",
				$E('a', { href: devianttidy.homepage }, ["deviantTIDY Homepage"]),
				" to grab the stylesheet."
			]));
		}
	}
};


// Embedded image data for interface.
var devianttidyicons = {
	dt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADA1LzI1LzA5eCfTMQAAAPJJREFUeJzllD2KQkEQhL8SE4UNvIEnMBNTYSM9x7KHMDbyAkYaGnkHAxEWI28gwmK2ZsZtoGj7GN4vA8oWdDDTPVXM1HTLzIiJWlT2/yMgaSppI2lfVEB5TJZ0LzIzFRGI/kT10KakHjAAusCwkoKZ3QPoAzPAbvEHLNzabnVbYAl8+/Oh8OQjTwRMXC4p8LTOFAC+EuTjxM3KCwBt4OQO/QaKSgvUgTnQcrY0JK14/LB2moeSTsAHcAyk1wLOQDONxMPM5PsiA4casMtLXgI/uTq5CoKNloUio+M1pmkVlHoioAN8ch0tqYhu8vt7EF3gAq5S40Q1cBgMAAAAAElFTkSuQmCC',
	close: 'data:image/gif;base64,R0lGODlhDwAPAJEAAP///9vg2kdSS////yH5BAUUAAMALAAAAAAPAA8AAAIrnC2Zx6O/GJxnWpRAUAEox2lCt1mjJpoJqa5oabHsp6TnB7ZC1TZqw8MdCgA7',
	down: 'data:image/gif;base64,R0lGODlhDwAPAKIAAP///9zh29vg2trf2UhTTEdSS0ZRSv///yH5BAEHAAcALAAAAAAPAA8AAAMyeKrVvfC4+SC962pFNJVeWAABYQpAdw0kgQrqSgICFTds/d3FgB28DUcUMdkIkcUtkgAAOw==',
	up: 'data:image/gif;base64,R0lGODlhDwAPAJEAAP///9vg2kdSS////yH5BAEHAAMALAAAAAAPAA8AAAIknC2Zx6O/GJxnWgQDnQFoq3QiKIyj5YUAyTps9EYu2dANpjQFADs='
};


// Bundle up these utility methods into a single container object that can be passed to other scripts
var devianttidyutils = {
	$: $,
	$E: $E,
	inDynamicPage: inDynamicPage,
	getUsername: getUsername,
	devianttidyicons: devianttidyicons,
	devianttidydialog: devianttidydialog
};


// The deviantTIDY application
var devianttidy = {
	version: '4.6.0',
	debug: false,
	extension: typeof GM_isExtension !== 'undefined',
	homepage: 'http://www.deviantart.com/deviation/45622809/',
	da: document.getElementById('deviantART-v7'),

	log: function(message, alertme) {
		if (!this.debug) {return;}
		GM_log(message);
		if (alertme) {
			alert("deviantTIDY Debug Message:\n\n" + message);
		}
	},

	start: function() {
		if (!devianttidy.da) {
			this.log("deviantTIDY only works on v7 pages."); return;
		} else if (unsafeWindow.devianttidy) {
			this.log("Another instance of deviantTIDY has already loaded!"); return;
		} else if (!Function.prototype.bind) {
			alert("deviantTIDY requires an up-to-date browser in order to function."); return;
		} else if (!$) {
			this.log("Cannot load jQuery!"); return;
		}

		// Allow this application and its utilities to be accessed by other scripts through unsafeWindow
		unsafeWindow.devianttidy = this;
		unsafeWindow.devianttidyutils = devianttidyutils;

		// Fresh update?
		if (GM_getValue('version') !== this.version) {
			GM_setValue('version', this.version);

			var changes = [
				"Fixed: keyboard navigation triggering in rich text editors when it shouldn't.",
				"Fixed: floating comment box trigger should more reliably focus the text field.",
				"Fixed: floating comment box would appear under deviation images."
			];

			devianttidydialog.open('deviantTIDY ' + this.version + ' Installed', [
				$E('div', {className: 'pp'}, [
					"You can view all available options by clicking 'deviantTIDY' on the footer of any deviantART page, or ",
					$E('a', {href: "javascript:;", className: 'a', events: {click: devianttidy.preferences}}, ["set your preferences right away"]),
			   		"."
				]),
				$E('hr'),
				$E('div', {className: 'pp'}, changes.map(function(c){return $E('div', [c]);})),
				$E('hr'),
				$E('div', {className: 'pp'}, ["You will not see this message again.  Close this panel to continue browsing."]),
				$E('div', {className: 'pp c'}, [$E('button', {events: {'click': function() {devianttidydialog.close();}}}, ['Thanks!'])])
			]);
		}

		// Run through all options
		this.dispatch();

		// Silently look for updates every 2 days - alert user if new version is available
		if (location.href.indexOf('http://my.deviantart') === 0 || location.href.indexOf('http://www.deviantart') === 0) {
			var now = new Date();
			var last = GM_getValue('last_updated', 0);
			if (!last || Date.parse(last).valueOf() < now - 48 * 3600 * 1000) {
				this.update(true);
			}
		}

		// Add Greasemonkey menu item
		GM_registerMenuCommand("deviantTIDY Options", this.preferences);

		// Add the Options link to the page footer
		var depths = $('#depths div.footer_tx_links')[0];
		if (depths) {
			depths.insertBefore($E('span', null, [' | ']), depths.childNodes[0]);
			depths.insertBefore($E('a', {id: 'devianttidy-options-link', href: 'javascript:;', events: {click: this.preferences}}, ['deviantTIDY']), depths.childNodes[0]);
		}
		
		devianttidydialog.addCSSWarning();
	},

	preferences: function() {
		var controls = [];

		// Generate options controls
		for (var o in devianttidy.options) {
			// Options without descriptions are hidden functions, but their preferences can be set manually
			var option = devianttidy.options[o];

			if (option.category) {
				controls.push($E('div', {className: 'p dialog-category'}, [option.category]));
			}

			if (option.description) {
				var control;
				var control_id = 'devianttidy-control-' + o;
				var description = [option.description, $E('b', [(option.custom ? ' (add-on)' : '')])];

				if (option.choices) {
					// If a list of choices is provided, the options form a drop-down list
					var selections = [];

					for (var c in option.choices) {
						selections.push($E('option', {value: c}, [option.choices[c]]));
					}
					
					selections[option.pref !== undefined ? option.pref : option.initial].selected = true;

					control = [
						$E('select', {id: control_id, name: o, events: {change: function() {devianttidy.options[this.name].pref = this.value;}}}, selections),
						$E('label', {htmlFor: control_id}, description)
					];
				}
				else {
					// Otherwise, use a checkbox
					control = [
						$E('input', {type: 'checkbox', id: control_id, name: o, checked: option.pref, events: {change: function() {devianttidy.options[this.name].pref = this.checked ? 1 : 0;}}}),
						$E('label', {htmlFor: control_id}, description)
					];
				}

				if (option.hint) {
					control.push($E('div', {className: 'hint'}, [option.hint]));
				}

				controls.push($E('div', {className: 'p dialog-control'}, control));
			}
		}

		devianttidydialog.open("Options", [
			$E('div', {className: 'p r'}, [
				$E('a', {href: devianttidy.homepage}, ["deviantTIDY"]),
				" for " + (devianttidy.extension ? "Firefox" : "Greasemonkey") + "; version " + devianttidy.version + ". ",
				$E('a', {href: "javascript:;", events: {'click': function() {devianttidy.update();}}}, ["Look for updates"])
			]),
			$E('div', {className: 'p'}, controls),
			$E('div', {className: 'dialog-buttons c'}, [
				$E('button', {events: {'click': function() {devianttidy.save();devianttidy.reload();}}}, ['Save']),
				$E('button', {events: {'click': function() {devianttidy.reset();}}}, ['Reset']),
				$E('button', {events: {'click': function() {devianttidydialog.close();}}}, ['Cancel'])
			])
		]);
	},

	load: function() {
		for (var o in this.options) {
			this.options[o].pref = parseInt(GM_getValue("options." + o, this.options[o].initial));
		}
	},

	save: function() {
		for (var o in this.options) {
			GM_setValue("options." + o, this.options[o].pref);
		}
	},

	reset: function() {
		if (confirm("This will reset all deviantTIDY options to their default values.")) {
			for (var o in this.options) {
				this.options[o].pref = this.options[o].initial;
			}
			this.save();
			this.reload();
		}
	},

	dispatch: function() {
		this.load();

		var dispatch_start = new Date();
		var dispatch_log = [];
		var dispatch_count = 0;
		var dispatch_fails = 0;

		for (var o in this.options) {
			var option = this.options[o];

			// A lazy option should only run when the pref is not 0.
			// If dispatcher is run again, don't repeat functions that were already run.
			if ((option.lazy && option.pref === 0) || option.dispatched) {
				continue;
			}

			try {
				var dispatch_time = new Date();
				var dispatch_result = option.method(option.pref);
				dispatch_log.push("  + " + o + ": " + dispatch_result + " (" + (new Date() - dispatch_time) + "ms)");
			}
			catch (e) {
				dispatch_fails++;
				dispatch_log.push("  ! " + o + ": FAILED (" + e.message + " - line " + e.lineNumber + ")");
			}

			option.dispatched = true;
			dispatch_count++;
		}

		if(this.debug) {
			var elapsed = new Date() - dispatch_start;
			this.log("Dispatched " + dispatch_count + " function(s) in " + elapsed + "ms.\n" + dispatch_log.join("\n"));

			if (dispatch_fails > 0) {
				this.log(dispatch_fails + " dispatch method(s) failed.  Check the Error Console for details.", true);
			}
		}
	},

	reload: function() {
		devianttidydialog.open('Reloading...', "Reloading page.  Please wait...");
		location.reload();
	},

	update: function(quiet) {
		this.log("Looking for updates...");
		GM_setValue('last_updated', new Date().toString());

		if (!quiet) {
			devianttidydialog.open('Looking for Updates...', "Checking for a new version of deviantTIDY.  Please wait...");
		}

		var update_error = function(jqXHR, message) {
			if (!quiet) {
				devianttidydialog.open('Error', [
					$E('div', {className: 'ppp c'}, [
						"Unable to get the version information from ",
						$E('a', {href: devianttidy.homepage}, [devianttidy.homepage]),
						".  Please try visiting the page yourself to check for updates."
					]),
					$E('div', {className: 'ppp c'}, [
						(typeof message === "string") ? message : "No error details available."
					])
				]);
			}
		};

		var update_success = function(html) {
			var version_text = html.match(/<b><\/b><b><i>version ([\d.]+)<\/i><\/b><b><\/b>/i);
			if (!version_text) {
				update_error(null, "Couldn't find version number string on the page.");
				return;
			}

			var message;
			var version_number = version_text[1];

			if (version_number === devianttidy.version) {
				devianttidy.log("No newer version available.");
				if (quiet) {return;}
				message = ["Your version of deviantTIDY is up to date!"];
			}
			else {
				message = [$E('b', ["deviantTIDY " + version_number + " is available. "])];
				if (devianttidy.extension) {
					message.push("Open your Firefox Add-Ons window and click 'Check For Updates'.");
				}
				else {
					message.push($E('a', {href: devianttidy.homepage}, ["Go to the deviantTIDY homepage"]));
					message.push(" to update your style and script.");
				}
			}
			devianttidydialog.open('Update Status', [$E('div', {className: 'ppp c'}, message)]);
		};

		//$.ajax({type: "GET", url: devianttidy.homepage, dataType: "html"}).done(update_success).fail(update_error);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: devianttidy.homepage,
			onload: function(response) {
				if (response.status === 200) {update_success(response.responseText);}
				else {update_error(null, "Response code: " + response.status);}
			},
			onerror: update_error
		});
	},

	extend: function(object) {
		// Use this function to add your own options to deviantTIDY.
		// Review the example add-on which comes with the Firefox extension for documentation.
		if (typeof object.name !== 'string' || typeof object.method !== 'function' || typeof object.description !== 'string') {
			this.log("Attempt to extend with a malformed add-on");
			alert("deviantTIDY doesn't like the structure of the option you tried to add.\n" +
				  "Please check that you set the required parameters and that their types are correct.");
			return;
		}
		else if (this.options[object.name]) {
			this.log("Attempt to extend resulted in a name-clash.");
			alert("The deviantTIDY option '" + object.name + "' already exists.  You cannot extend it.");
			return;
		}

		if (typeof object.initial === 'undefined') {
			object.initial = 1;
		}
		object.custom = true;
		this.options[object.name] = object;
		this.log("Extended with custom function '" + object.name + "'");

		// We must delegate this to a timeout because executing it under unsafeWindow will
		// result in access violations when calling GM functions
		window.setTimeout(function() {devianttidy.dispatch();}, 1);
	},

	options: {
		'hide_forum_icons': {
			category: "Hidden Elements",
			description: "Hide forum thread icons",
			initial: 1,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass("dt-hide-forum-icons");
				return true;
			}
		},
		'hide_nav_labels': {
			description: "Hide text labels on the sticky navigation bar",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$('#more7-main').addClass("dt-hide-nav-labels");
				return true;
			}
		},
		'no_group_box': {
			description: "Hide the blue 'Contribute' box at the top of all group pages",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass('dt-hide-group-box');
				return true;
			}
		},
		'no_share_buttons': {
			description: "Hide the social sharing buttons on deviation pages",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass('dt-hide-share-buttons');
				return true;
			}
		},
		'hide_morelikethis': {
			description: "Hide the 'More like this' links on gallery thumbnails",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass('dt-hide-morelikethis');
				return true;
			}
		},
		'hide_sidebar_thumbs': {
			description: "Hide 'More from...' thumbnails in the deviation page sidebar",
			initial: 1,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass('dt-hide-sidebar-thumbs');
				return true;
			}
		},
		'collapse_sidebar': {
			category: "UI Tweaks",
			description: "Collapse the folders/categories sidebar on galleries and browse pages",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$(devianttidy.da).addClass('dt-collapse-sidebar');
				return true;
			}
		},
		'top_nav_fixed': {
			description: "Fix the top navigation bar to always be visible at the top of the screen",
			initial: 0,
			lazy: true,
			method: function(pref) {
				$('#overhead-collect').addClass('dt-top-nav-fixed');
				return true;
			}
		},
		'scroll_comments': {
			description: "Add scrollbars to long comments and notes",
			initial: 2,
			lazy: true,
			choices: ["Disabled", "Small (approx 15 lines)", "Large (approx 30 lines)"],
			method: function(pref) {
				$(devianttidy.da).addClass("dt-scroll-comments s" + pref);
				return true;
			}
		},
		'limit_width': {
			description: "Limit the maximum width of deviantART pages on wide screens",
			initial: 0,
			lazy: true,
			choices: ["No limit", "1200 pixels", "1400 pixels", "1600 pixels"],
			method: function(pref) {
				$(devianttidy.da).addClass("dt-limit-width l" + pref);
				return true;
			}
		},
		'short_titles': {
			category: "Page Titles",
			description: "Shorten page titles by removing deviantART prefixes and suffixes",
			hint: "For instance, a window or tab named 'Spyed on deviantART' will be shortened to 'Spyed'.",
			initial: 1,
			lazy: true,
			method: function(pref) {
				document.title = document.title.replace(/^(deviantART): where ART meets application!$|^deviantART: | on deviantART$| deviantART( \w+)$/i, '$1$2');
				return true;
			}
		},
		'message_center_title': {
			description: "Show message count in the Message Center page title",
			hint: "This feature only works when the Messages area is not in 'splintered' mode.",
			initial: 1,
			lazy: true,
			method: function(pref) {
				if (window.location.href.indexOf('http://my.deviantart.com/messages/') < 0) {return 0;}

				var link = $("#overhead td > a[href='http://my.deviantart.com/messages/']")[0];
				if (!link) {return -3;}

				var msgs_node = link.childNodes[1];
				if (!msgs_node || !msgs_node.data) {return -2;}

				var msgs = msgs_node.data.replace(',', '') - 0;
				if (isNaN(msgs)) {return -1;}

				document.title = msgs + " Message" + (msgs === 1 ? "" : "s");
				return msgs;
			}
		},
		'strip_outgoing_links': {
			category: "Extra Features",
			description: "Strip deviantART redirects from external links",
			initial: 1,
			choices: ["No", "Yes", "Prompt"],
			lazy: true,
			method: function(pref) {
				var prefix = 'http://www.deviantart.com/users/outgoing?';

				// Check every link that gets focus and apply rules based on its href.
				$(devianttidy.da).on('focus', 'a', function(evt) {
					var link = $(this);
					var href = link.attr('href');
					if (href && href.indexOf(prefix) === 0) {
						var new_href = href.substring(prefix.length);
						link.attr('href', new_href);
						link.addClass('dt-external-link');
					}
				});

				// If prompt mode is on, add a click listener to external links.
				if (pref === 2) {
					$(devianttidy.da).on('click', 'a.dt-external-link', function(evt) {
						var href = $(this).attr('href');
						var msg = "This external link redirects to:\n\n" + href + "\n\n" + "Press OK to follow.";
						return confirm(msg);
					});
				}

				return true;
			}
		},
		'redirect_on_login': {
			description: "Redirect to a specific page after logging in",
			initial: 0,
			lazy: true,
			choices: ["Disabled", "Message Center", "Channels", "My Profile Page"],
			method: function(pref) {
				var username = getUsername();
				var username_old = GM_getValue('username', username);
				GM_setValue('username', username);

				if (!username || username_old === username) {return -2;}

				var redirects = {
					1: {url: 'http://my.deviantart.com/messages/', name: 'Message Center'},
					2: {url: 'http://www.deviantart.com/channels/', name: 'Channels'},
					3: {url: 'http://' + username.toLowerCase() + '.deviantart.com/', name: 'your profile page'}
				};

				var url = redirects[pref].url;
				if (location.href.indexOf(url) === 0) {return -1;}

				devianttidydialog.open("Logged In", "Going to " + redirects[pref].name + "...");
				location.href = url;
				return true;
			}
		},
		'disable_dnd': {
			description: "Disable drag-and-drop thumbnail collecting",
			hint: "Note that while drag-and-drop is disabled, you will be unable to perform actions like selecting and moving items in your messages or gallery.",
			initial: 0,
			lazy: true,
			method: function(pref) {
				if (unsafeWindow.DDD) {return delete unsafeWindow.DDD;}
				return false;
			}
		},
		'floating_comment_key': {
			description: "Shortcut key for the Floating Comment feature (ALT + SHIFT + ...)",
			initial: 2,
			choices: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
			lazy: false,
			method: function(pref) {
				var comment_toggle = function() {
					try {
						var form = $('form[id="cooler-comment-submit"]:last')[0];
						var textarea = $(form).find('.writer,textarea')[0];

						if (!form || !textarea) {
							devianttidydialog.open("Unavailable", [$E('p', {className: 'p c'}, ["No comment box found."])], 1500);
							return false;
						}

						devianttidydialog.close();
						if (form.className.indexOf('dt-floating-comment') >= 0) {
							form.className = form.className.substr(0, form.className.length - 20);
							textarea.blur();
						}
						else {
							form.className += ' dt-floating-comment';
							textarea.focus();
							textarea.click();
						}

						return false;
					}
					catch (e) {
						devianttidy.log("Error getting floating comment box: " + e.message, true);
					}
				};

				// Make an invisible link with access key C to listen for this keystroke.
				devianttidy.da.appendChild($E('a', {
					id: 'dt-floating-comment-link',
					href: 'javascript:;',
					style: {display: 'none'},
					accessKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')[pref],
					events: {'click': comment_toggle}
				}));

				return 1;
			}
		},
		'keyboard_browsing': {
			description: "Use left/right arrow keys to browse galleries and messages",
			initial: 1,
			lazy: true,
			method: function(pref) {
				$(unsafeWindow).bind('keyup', function(e) {
					// Respond only to keystrokes without modifiers.
					if (e.ctrlKey || e.shiftKey || e.altKey) {return;}

					// Determines whether we're within a dynamically-created deviation page.
					// If viewing a deviation, don't override deviation key listeners.
					if (inDynamicPage()) {return;}

					var evt = e || window.event;
					var target = evt.target;

					while (target.nodeType === 3 && target.parentNode !== null) {
						target = target.parentNode;
					}

					var node = target.nodeName;
					if (node === 'TEXTAREA' || node === 'SELECT' || target.hasAttribute('contenteditable')) {
						return;
					}
					else if (node === 'INPUT') {
						// On browse pages, the search box is always focused on load.
						// Continue anyway if the search box is empty, or if its value is
						// exactly equal to the current search criteria.
						if (target.name !== 'q') {return;}
						var urldecode = function(str) {
						   return decodeURIComponent((str+'').replace(/\+/g, '%20'));
						};
						if (target.value && !urldecode(location.href).match('q=' + target.value + "($|&)")) {return;}
					}

					var find;

					switch (evt.keyCode) {
						case 37: find = ".shadow a.l:eq(0), .pagination li.prev a"; break;
						case 39: find = ".shadow a.r:eq(0), .pagination li.next a, .pagination .load_more"; break;
						default: return;
					}

					var link = $(find);
					if (!link.length) {
						devianttidy.log("No link found ", true);
						return;
					}

					link[0].click();
				});

				return true;
			}
		}
	}
};


// Go!
devianttidy.start();
