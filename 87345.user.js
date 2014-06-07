// ==UserScript==
// @name			Developer Tools: Dialog
// @namespace		#Cletus
// @description		Developer tools to create and handle dialogs.
// @copyright		2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @license			(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// @exclude			*
//
// @version			1.1.1
// ==/UserScript==

// Init Developer Tools object
if (typeof devtools == 'undefined') {
	var devtools = {};
}
// Safe JSON: helps prevent problems with JSON in strings/attributes.
// Substitutes single and double quotes with unique strings.
if (typeof devtools.JSON == 'undefined') {
	devtools.JSON = {};
	devtools.JSON.stringify = function (obj) {
		obj = JSON.stringify(obj);
		return obj.replace(/"/g, '!~dq~!').replace(/'/g, '!~sq~!');
	};
	devtools.JSON.parse = function (str) {
		str = str.replace(/!~dq~!/g, '"').replace(/!~sq~!/g, "'");
		return JSON.parse(str);
	};
}
// Developer Tools: Dialog object.
devtools.dialog = {
	// Dialog creation/update function.
	// Updates the dialog if 'id' is passed and creates it if it doesn't exist.
	// Returns the id that was used during the creation/update.
	open: function (options, id) {
		// Set all options.
		this.__setVars(options);
		// Create an random ID if nothing was passed.
		if (!id) {id = (new Date()).getTime() + '-' + Math.floor(Math.random() * 100001);}
		// Hold ID so that the "quick-close" will work.
		this.__var.lastDialogId = id;
		// Creates wrapper element if it doesn't exist.
		var wrapper = document.getElementById('devtools-wrapper');
		if (!wrapper) {
			wrapper = document.createElement('div');
			wrapper.id = 'devtools-wrapper';
			wrapper.innerHTML =
				'<div class="grid">'+
					'<div id="devtools-cell-topleft" class="dialog-wrapper top left"><div><div></div></div></div>'+
					'<div id="devtools-cell-top" class="dialog-wrapper top"><div><div></div></div></div>'+
					'<div id="devtools-cell-topright" class="dialog-wrapper top right"><div><div></div></div></div>'+
					'<div id="devtools-cell-left" class="dialog-wrapper left"><div><div></div></div></div>'+
					'<div id="devtools-cell-center" class="dialog-wrapper center"><div><div></div></div></div>'+
					'<div id="devtools-cell-right" class="dialog-wrapper right"><div><div></div></div></div>'+
					'<div id="devtools-cell-bottomleft" class="dialog-wrapper bottom left"><div><div></div></div></div>'+
					'<div id="devtools-cell-bottom" class="dialog-wrapper bottom"><div><div></div></div></div>'+
					'<div id="devtools-cell-bottomright" class="dialog-wrapper bottom right"><div><div></div></div></div>'+
				'</div>';
			document.body.appendChild(wrapper);
			wrapper = document.getElementById('devtools-wrapper');
			// Start hooks only when wrapper is made.
			this.__handleHooks();
		}
		// Handle page masking.
		wrapper.className = (this.__setting.mask) ? 'mask' : '';
		// Creates dialog if it doesn't exist.
		var dialog = document.getElementById('devtools-dialog-' + id)
		if (!dialog || dialog.parentNode.parentNode.parentNode.id !== 'devtools-cell-' + this.__setting.location.replace('-', '')) {
			// Dialog was found but in the wrong location, remove it.
			if (dialog) {dialog.parentNode.removeChild(dialog);}
			// Create element and push HTML.
			dialog = document.createElement('div');
			dialog.id = 'devtools-dialog-' + id;
			dialog.className = 'dialog' + ((this.__setting.class && this.__setting.class != '') ? ' ' + this.__setting.class : '');
			dialog.innerHTML =
				'<div class="dialog-close"><span>X</span></div>'+
				'<div class="dialog-title"><span></span></div>'+
				'<div class="dialog-content"></div>'+
				'<div class="dialog-footer"></div>';
			// Add dialog to wrapper and get the dialog.
			wrapper.querySelector('#devtools-cell-' + this.__setting.location.replace('-', '') + ' > div > div').appendChild(dialog);
			dialog = document.getElementById('devtools-dialog-' + id);
			// Add listener for the close button.
			dialog.querySelector('.dialog-close').addEventListener('click', function () {
				devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/, ''));
			}, false);
		}
		// Set/update dialog's settings.
		dialog.querySelector('.dialog-close').style.display = (this.__setting.closeButton) ? 'block' : 'none';
		dialog.querySelector('.dialog-title').firstElementChild.textContent = this.__setting.title;
		dialog.querySelector('.dialog-content').innerHTML = this.__parseTokens(this.__setting.message);
		dialog.querySelector('.dialog-footer').textContent = '';
		// Create buttons in the footer.
		var button, buttonImg, i;
		for (i = 0; i < this.__setting.buttons.length; i++) {
			button = document.createElement('button');
			// Set button text.
			button.textContent = this.__setting.buttons[i].text;
			button.setAttribute('data-devtools-dialog-button', this.__setting.buttons[i].text);
			// Set button icon.
			if (this.__setting.buttons[i].icon) {
				buttonImg = document.createElement('img');
				buttonImg.setAttribute('src', this.__setting.buttons[i].icon);
				buttonImg.setAttribute('alt', '');
				button.insertBefore(buttonImg, button.firstChild);
			}
			// Set button tooltip.
			if (typeof this.__setting.buttons[i].tooltip == 'string') {
				button.setAttribute('title', this.__setting.buttons[i].tooltip);
			}
			// Add listener for button with the callback.
			button.addEventListener('click', this.__setting.buttons[i].callback, false);
			dialog.querySelector('.dialog-footer').appendChild(button);
		}
		// Create theme's style if it doesn't exist.
		var style = document.getElementById('devtools-dialog-style');
		if (!style || style.className != this.__setting.theme) {
			// Style was found but it is the wrong theme, remove it.
			if (style) {style.parentNode.removeChild(style);}
			// Create element and set it's attributes.
			style = document.createElement('style');
			style.id = 'devtools-dialog-style';
			style.className = this.__setting.theme;
			style.setAttribute('type', 'text/css');
			// Set style CSS and add to document.
			style.textContent = this.__themes[this.__setting.theme].finalcss || (this.__themes._base.css + '\n' + this.__themes[this.__setting.theme].css);
			document.querySelector('head').appendChild(style);
		}
		// Return the ID that was used for the dialog.
		return id;
	},
	// Closes a dialog with the correct 'id'. If 'id' is not passed, closes the last dialog created/modified.
	// Returns object containing the inputs and input values in the form of {inputName: inputValue}
	// Returns false if there are no dialogs found.
	close: function (id) {
		if (!id) {
			// No ID, try last dialog.
			if (!this.__var.lastDialogId) {
				// No last dialog set, exit.
				return false;
			}
			// Found last dialog, set ID.
			id = this.__var.lastDialogId;
		}
		var dialog = document.getElementById('devtools-dialog-' + id);
		if (!dialog) {
			// No dialog found, exit.
			return false;
		}
		else {
			// Found dialog, start closing.
			// Remove listener on close button.
			dialog.querySelector('.dialog-close').removeEventListener('click', function () {
				devtools.dialog.close(this.parentNode.getAttribute('id').replace(/^devtools-dialog-/, ''));
			}, false);
			// Get inputs and remove dialog element.
			var inputs = this.getInputs(id);
			dialog.parentNode.removeChild(dialog);
		}
		if (document.querySelector('div[id*="devtools-dialog-"]') == null) {
			// No dialogs on page, remove wrapper and style.
			var wrapper = document.getElementById('devtools-wrapper');
			wrapper.parentNode.removeChild(wrapper);
			var styles = document.querySelectorAll('head style[id^="devtools-dialog-theme-"]');
			for (var i = 0; i < styles.length; i++) {
				styles[i].parentNode.removeChild(styles[i]);
			}
		}
		// Return the inputs from the dialog.
		return inputs;
	},
	// Sets up the defaults. Calling this unsets previously set defaults.
	setDefaults: function (options) {
		this.__userDefaults = {};
		for (var i in options) {
			if (this.__defaults.hasOwnProperty(i)) {
				this.__userDefaults[i] = options[i];
			}
		}
	},
	// Creates a new token replacement.
	// Returns true if the token was created properly. Returns false if there was an error.
	defineToken: function (tag, attributes, replacement) {
		if (typeof tag != 'string' || /^\w+$/.test(tag) === false) {return false;}
		if (typeof this.__tokens[tag] != 'undefined') {return false;}
		if (typeof attributes == 'object' && attributes != null) {
			// Loop through attributes and make sure they validate.
			for (var a in attributes) {
				if (!attributes.hasOwnProperty(a)) {continue;}
				if (typeof attributes[a].validation == 'undefined') {return false;}
			}
		}
		else {
			// No attributes, create empty object.
			attributes = {};
		}
		// Replacement must be a function or string.
		if (typeof replacement != 'function' && typeof replacement != 'string') {return false;}
		// Push data to the token system.
		this.__tokens[tag] = {
			attributes: attributes,
			replacement: replacement
		};
		return true;
	},
	// Creates a theme.
	// Returns true if the theme was created properly. Returns false if there was an error.
	defineTheme: function (name, css, base) {
		if (typeof name != 'string' || typeof css != 'string') {return false;}
		if (!/^\w+$/.test(name) || name == 'default') {return false;}
		var cssOut = '';
		var bases = {};
		var baseTmp = base;
		if (typeof base == 'string') {
			// Get all prerequisite themes.
			for (var i = 0; i < 5; i++) {
				if (this.__themes[baseTmp] && !bases[baseTmp]) {
					cssOut = '/* devtools.dialog prerequisite theme: ' + baseTmp + ' */\n' + this.__themes[baseTmp].css + '\n\n' + cssOut;
					bases[baseTmp] = true;
					baseTmp = this.__themes[baseTmp].base;
				}
				else {
					break;
				}
			}
		}
		else {
			base = null;
		}
		// Finalize the CSS.
		cssOut = ('/* devtools.dialog base reset */\n' + this.__themes._base.css + "\n\n" + cssOut + '/* devtools.dialog theme: ' + name + ' */\n' + css).replace('%theme%', name);
		// Push data to the theme system.
		this.__themes[name] = {
			base: base,
			finalcss: cssOut,
			css: css
		};
		return true;
	},
	// Creates a hook.
	// Returns true if the hook was created properly. Returns false if there was an error.
	defineHook: function (name, func) {
		if (typeof this.__hooks[name] != 'undefined' || typeof func != 'function') {return false;}
		this.__hooks[name] = func;
		return true;
	},
	// Gets the inputs for the 'id' specificed. If 'id' is not passed, gets the inputs of the last dialog created/modified.
	// Returns object of elements or an empty object if.
	// Returns false if the dialog has no inputs or the dialog doesn't exist.
	getInputs: function (id) {
		if (!id) {
			// No ID, try last dialog.
			if (!this.__var.lastDialogId) {
				// No last dialog set, exit.
				return false;
			}
			// Found last dialog, set ID.
			id = this.__var.lastDialogId;
		}
		var dialog = document.querySelector('#devtools-dialog-' + id);
		if (dialog) {
			// Dialog found, get input elements.
			var out = {}, i, j;
			var simpleInputs = dialog.querySelectorAll('[data-devtools-input="text"], [data-devtools-input="select"]');
			for (i = 0; i < simpleInputs.length; i++) {
				out[simpleInputs[i].getAttribute('name')] = simpleInputs[i].value;
			}
			var checkboxInputs = dialog.querySelectorAll('[data-devtools-input="checkbox"]');
			for (i = 0; i < checkboxInputs.length; i++) {
				out[checkboxInputs[i].getAttribute('name')] = (checkboxInputs[i].checked) ? true : false;
			}
			var radioInputs = dialog.querySelectorAll('[data-devtools-input="radio"]');
			var radios;
			for (i = 0; i < radioInputs.length; i++) {
				radios = radioInputs[i].querySelectorAll('input');
				for (j = 0; j < radios.length; j++) {
					if (radios[j].checked) {
						out[radios[j].getAttribute('name').split('-')[0]] = radios[j].value;
						break;
					}
				}
			}
			// Return inputs as an object.
			return out;
		}
		return false;
	},
	// Reference for all misc settings. May be expanded or removed altogether in the future.
	__var: {
		lastDialogId: false
	},
	// Defaults for the settings. These are the base defaults and can't be changed.
	__defaults: {
		title: 'Script Notification',
		message: 'This is a dialog from a userscript.',
		mask: true,
		closeButton: true,
		location: 'center',
		buttons: null,
		theme: 'default',
		class: ''
	},
	// Validation for all options.
	__settingsValidation: {
		title: ['type', 'string'],
		message: ['type', 'string'],
		mask: ['type', 'boolean'],
		closeButton: ['type', 'boolean'],
		location: ['match', /^(top-left|top|top-right|left|center|right|bottom-left|bottom|bottom-right)$/],
		buttons: null,
		theme: null,
		class: ['match', /^[\w- ]+$/]
	},
	// Themes
	__themes: {
		// Reset included before all themes.
		'_base': {
			css:
				// Reset for grid and dialogs.
				'#devtools-wrapper,#devtools-wrapper *{-moz-border-radius:0 !important;-moz-box-shadow:none !important;background:transparent !important;border:none !important;border-collapse:separate !important;border-radius:0 !important;border-spacing:0 !important;box-shadow:none !important;color:#000 !important;float:none !important;font-family:Arial, sans-serif !important;font-size:12px !important;font-weight:400;height:auto !important;letter-spacing:normal !important;line-height:16px !important;margin:0 !important;max-height:none !important;max-width:none !important;min-height:0 !important;min-width:0 !important;opacity:1.0 !important;padding:0 !important;position:static !important;text-align:left !important;text-decoration:none !important;text-shadow:none !important;text-transform:none !important;vertical-align:baseline !important;visibility:hidden !important;white-space:normal !important;width:auto !important;}'+
				'#devtools-wrapper{background-color:rgba(0, 0, 0, 0.8) !important;display:block !important;height:100% !important;left:0 !important;overflow:auto !important;position:fixed !important;top:0 !important;visibility:hidden !important;width:100% !important;z-index:2147483640 !important;}'+
				'#devtools-wrapper.mask{background-color:rgba(0, 0, 0, 0.8) !important;visibility:visible !important;}'+
				'#devtools-wrapper .grid{display:table !important;height:100% !important;visibility:hidden !important;width:100% !important;}'+
				'#devtools-wrapper .dialog-wrapper{display:table !important;height:100% !important;left:1% !important;position:fixed !important;top:0 !important;width:98% !important;}'+
				'#devtools-wrapper .dialog-wrapper > div{display:table-cell !important;padding:15px !important;}'+
				'#devtools-wrapper .left{left:0 !important;}'+
				'#devtools-wrapper .right{left:2% !important;}'+
				'#devtools-wrapper .left > div,#devtools-wrapper .center > div,#devtools-wrapper .right > div{vertical-align:middle !important;}'+
				'#devtools-wrapper .top > div{vertical-align:top !important;}'+
				'#devtools-wrapper .bottom > div{vertical-align:bottom !important;}'+
				'#devtools-wrapper .left .dialog{clear:both !important;float:left !important;}'+
				'#devtools-wrapper .right .dialog{clear:both !important;float:right !important;}'+
				'#devtools-wrapper .center .dialog,#devtools-wrapper .bottom .dialog,#devtools-wrapper .top .dialog{margin-left:auto !important;margin-right:auto !important;}'+
				'#devtools-wrapper .dialog,#devtools-wrapper .dialog *{visibility:visible !important;}'+
				// Reset for all specific elements.
				'#devtools-wrapper .dialog fieldset{border:1px solid #000 !important;padding:5px !important;}'+
				'#devtools-wrapper .dialog legend{padding:0 5px !important;}'+
				'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-box-sizing:border-box !important;background-color:#fff !important;border:1px solid #000 !important;box-sizing:border-box !important;padding:2px !important;width:100% !important;}'+
				'#devtools-wrapper .dialog input[type="checkbox"],#devtools-wrapper input[type="radio"]{margin-right:3px !important;vertical-align:top !important;}'+
				'#devtools-wrapper .dialog input[type="radio"]+span{margin-right:7px !important;vertical-align:middle !important;}'+
				'#devtools-wrapper .dialog .progress-bar{-moz-box-sizing:border-box !important;background-color:#fff !important;border:1px solid #000 !important;box-sizing:border-box !important;height:20px !important;margin-left:auto !important;margin-right:auto !important;overflow:hidden !important;position:relative !important;width:100% !important;}'+
				'#devtools-wrapper .dialog .progress-bar-inner{background-color:#000 !important;height:100% !important;left:0 !important;position:absolute !important;top:0 !important;}'+
				'#devtools-wrapper .dialog .progress-bar-text{height:100% !important;position:relative !important;text-align:center !important;width:100% !important;z-index:1 !important;}'+
				'#devtools-wrapper .dialog .dialog-content br:first-child, #devtools-wrapper .dialog .dialog-content br:last-child{display:none !important;}'+
				'#devtools-wrapper .dialog strong{font-weight:bold !important;}'+
				'#devtools-wrapper .dialog em{font-style:italic !important;}'+
				'#devtools-wrapper .dialog ins{text-decoration:underline !important;}'+
				'#devtools-wrapper .dialog a:link,#devtools-wrapper .dialog a:hover{color:#EE0000 !important;text-decoration:underline !important;}'+
				'#devtools-wrapper .dialog a:visited{color:#74198b !important;}'
		},
		
		'default': {
			css:
				// Dialog specific styles.
				'#devtools-wrapper .dialog{-moz-border-radius:10px !important;-moz-box-shadow:0 0 50px #000 !important;background-color:#eee !important;border-radius:10px !important;box-shadow:0 0 50px #000 !important;margin-bottom:5px !important;margin-top:5px !important;padding:5px !important;position:relative !important;width:300px !important;}'+
				'#devtools-wrapper .dialog .dialog-close{-moz-border-radius:10px !important;background-color:#444 !important;border:5px solid #eee !important;border-radius:10px !important;cursor:pointer !important;height:25px !important;padding:0 !important;position:absolute !important;right:0 !important;text-align:center !important;top:0 !important;vertical-align:middle !important;width:25px !important;z-index:4 !important;}'+
				'#devtools-wrapper .dialog .dialog-close span{color:#eee !important;font-size:18px !important;font-weight:700;line-height:25px !important;vertical-align:middle !important;}'+
				'#devtools-wrapper .dialog .dialog-close:hover{border-color:orange !important;}'+
				'#devtools-wrapper .dialog .dialog-close:hover span{color:orange !important;}'+
				'#devtools-wrapper .dialog .dialog-title{-moz-border-radius:5px !important;background-color:#444 !important;border-radius:5px !important;color:#eee !important;height:15px !important;padding:5px !important;}'+
				'#devtools-wrapper .dialog .dialog-title span{color:#eee !important;font-size:14px !important;font-weight:700;}'+
				'#devtools-wrapper .dialog .dialog-content{color:#000 !important;margin:10px 5px !important;max-width:100% !important;}'+
				'#devtools-wrapper .dialog .dialog-footer{text-align:center !important;width:100% !important;}'+
				'#devtools-wrapper .dialog .dialog-footer button{-moz-border-radius:10px !important;background-color:#444 !important;border-radius:10px !important;color:#eee !important;cursor:pointer !important;display:inline-block !important;height:25px !important;margin-left:2px !important;margin-right:2px !important;padding:0 5px 3px !important;}'+
				'#devtools-wrapper .dialog .dialog-footer button:hover{background-color:orange !important;color:#444 !important;}'+
				'#devtools-wrapper .dialog .dialog-footer button img{margin-right:3px !important;vertical-align:top !important;}'+
				// Other elements.
				'#devtools-wrapper .dialog hr{background-color:#ddd !important;margin:7px 0 7px 0 !important;padding:0.5px !important;}'+
				'#devtools-wrapper .dialog fieldset{-moz-border-radius:4px !important;border:1px solid #aaa !important;border-radius:4px !important;}'+
				'#devtools-wrapper .dialog label{display:block !important;font-weight:bold !important;}'+
				'#devtools-wrapper .dialog label span{font-weight:normal !important;}'+
				'#devtools-wrapper .dialog legend{font-weight:bold !important;}'+
				'#devtools-wrapper .dialog input[type="text"],#devtools-wrapper input[type="password"],#devtools-wrapper textarea,#devtools-wrapper select{-moz-border-radius:4px !important;background-color:#fafafa !important;border:1px solid #ddd !important;border-radius:4px !important;}'+
				'#devtools-wrapper .dialog input[type="text"]:focus,#devtools-wrapper input[type="password"]:focus,#devtools-wrapper textarea:focus,#devtools-wrapper select:focus{border:1px solid #444 !important;}'+
				'#devtools-wrapper .dialog input[type="checkbox"] label{display:block !important;}'+
				'#devtools-wrapper .dialog .progress-bar{-moz-border-radius:5px !important;background-color:#fafafa !important;border:1px solid #ddd !important;border-radius:5px !important;}'+
				'#devtools-wrapper .dialog .progress-bar-inner{-moz-border-radius:5px !important;background-color:#444 !important;border-radius:5px !important;}'+
				'#devtools-wrapper .dialog .progress-bar-text{text-shadow:#f2f2f2 -1px 0 3px #f2f2f2 0 -1px 3px #f2f2f2 1px 0 3px #f2f2f2 0 1px 3px #f2f2f2 -1px -1px 3px #f2f2f2 1px 1px 3px !important;}'
		}
	},
	// Replacement tokens.
	__tokens: {
		// Progressbar element.
		// Either attribute 'percent' or 'calculate' must be present.
		'progressbar': {
			attributes: {
				// Raw percentage number to show. Must be in range of 0-100.
				'percent': {
					defaultValue: '',
					validation: /^(100|\d{1,2})$/
				},
				// Calculate the percent. (smallNum / bigNum)
				// Example: 50/160 = 0.3125, or 31.25%
				'calculate': {
					defaultValue: '',
					validation: /^\s*\d+\s*\/\s*\d+\s*$/
				}
			},
			// Tries to grab calculation before raw percentage.
			replacement: function (tag) {
				var p;
				if (tag.attributes.calculate != '') {
					// Calculate percentage and round to 2nd decimal if needed.
					p = /^\s*(\d+)\s*\/\s*(\d+)\s*$/.exec(tag.attributes.calculate);
					if (p) {
						p = (p[1] / p[2]) * 10000;
						p = Math.round(p) / 100;
					}
					else {
						p = 0;
					}
				}
				else if (tag.attributes.percent != '') {
					// Raw percent, just pass along.
					p = tag.attributes.percent;
				}
				else {
					// Neither method of percentage was done, exit.
					return false;
				}
				// Checks to make sure the percent is within normal ranges and add percent symbol.
				if (p > 100) {p = 100;}
				if (p < 0) {p = 0;}
				p += '%';
				// Returns HTML for the progress bar.
				return '<div class="progress-bar"><div class="progress-bar-text">' + p + '</div><div class="progress-bar-inner" style="width: ' + p + ' !important;"></div></div>';
			}
		},
		// Input elements.
		'input': {
			attributes: {
				// Standard HTML types.
				// REQUIRED
				'type': {
					validation: /^(text|textarea|radio|checkbox|select|password)$/
				},
				// Name used to identify the input. Must be unique otherwise values will be overwritten.
				// REQUIRED
				'name': { // name to be used with the input, this is what references the input when it is returned
					validation: /^\w+$/
				},
				// Text describing the input.
				'label': {
					defaultValue: '',
					validation: false
				},
				// Options to appear in inputs of type 'radio' or 'select'.
				// Must pass through 'devtools.JSON.stringify' in order to be parsed correctly.
				'options': {
					defaultValue: '',
					validation: /^{.+}$/
				},
				// Default value of the input.
				// For inputs of type 'text', 'textarea', and 'password', this is the text already in the box.
				// For inputs of type 'radio' or 'select', this is the value of the selected item.
				// For inputs of type 'checkbox', this is 'true' or 'false'.
				'defaultValue': { // used with radios and selects to specify which value is selected
					defaultValue: '',
					validation: false
				},
				// Name of hook to apply to the input.
				'hook': {
					defaultValue: '',
					validation: /^\w+$/
				}
			},
			replacement: function (tag) {
				var r = false;
				// Final output depends on type.
				switch (tag.attributes.type) {
					case 'text':
						r = '<label>' + tag.attributes.label + '<input type="text" name="' + tag.attributes.name + '" value="' + tag.attributes.defaultValue + '" data-devtools-input="text"/></label>';
					break;
					case 'password':
						r = '<label>' + tag.attributes.label + '<input type="password" name="' + tag.attributes.name + '" value="' + tag.attributes.defaultValue + '" data-devtools-input="text"/></label>';
					break;
					case 'textarea':
						r = '<label>' + tag.attributes.label + '<textarea name="' + tag.attributes.name + '" data-devtools-input="text">' + tag.attributes.defaultValue + '</textarea></label>';
					break;
					case 'checkbox':
						r = '<div><label><input type="checkbox" name="' + tag.attributes.name + '"' + ((tag.attributes.defaultValue == 'true') ? ' checked' : '') + ' data-devtools-input="checkbox"/><span>' + tag.attributes.label + '</span></label></div>';
					break;
					case 'radio':
						try {
							// Attempt to parse JSON options.
							var options = devtools.JSON.parse(tag.attributes.options);
							// Create random hash so inputs don't clash.
							var hash = Math.floor(Math.random() * 100000);
							// Start pushing the HTML out.
							r = '<div data-devtools-input="radio"><fieldset><legend>' + tag.attributes.label + '</legend>';
							for (var key in options) {
								r += '<label><input type="radio" name="' + tag.attributes.name + '-' + hash + '" value="' + options[key] + '"';
								r += ((tag.attributes.defaultValue == options[key]) ? ' checked' : '') + '/><span>' + key + '</span></label>';
							}
							r += '</fieldset></div>';
						}
						catch (e) {
							return false;
						}
					break;
					case 'select':
						try {
							// Attempt to parse JSON options.
							var options = devtools.JSON.parse(tag.attributes.options);
							// Start pushing the HTML out.
							r = '<div><label>' + tag.attributes.label + '</label>';
							r += '<select name="' + tag.attributes.name + '"' + ((tag.attributes.hook == 'color') ? ' data-devtools-hook="' + tag.attributes.hook + '"' : '') + ' data-devtools-input="select">';
							for (var key in options) {
								if (typeof options[key] == 'string') {
									r += '<option value="' + options[key] + '"';
									r += (tag.attributes.hook == 'color' && /^#[0-9a-f]{3,6}$/i.test(options[key])) ? ' style="background-color:' + options[key] + ' !important;"' : '';
									r += ((tag.attributes.defaultValue == options[key]) ? ' selected' : '') + '>' + key + '</option>';
								}
							}
							r += '</select></div>';
						}
						catch (e) {
							return false;
						}
					break;
				}
				return r;
			}
		}
	},
	// Hooks for elements. May be expanded or reworked in the future.
	__hooks: {
		'color': function () {
			var el = document.querySelectorAll('[data-devtools-hook="color"]');
			if (!el) {return;}
			// Set interval to adjust colors.
			setInterval(function () {
				var el = document.querySelectorAll('[data-devtools-hook="color"]');
				if (el) {
					// Look for hex code and set the background appropriately.
					for (var i = 0; i < el.length; i++) {
						if (/^#[0-9a-f]{3,6}$/i.test(el[i].value)) {
							el[i].setAttribute('style', 'background-color: ' + el[i].value + ' !important');
						}
					}
				}
			}, 500);
		}
	},
	// Reference for user-defined defaults from this.setDefaults()
	__userDefaults: {},
	// Reference to most current dialog settings.
	__setting: {},
	// Simple hook system. May be expanded or reworked in the future.
	__handleHooks: function () {
		for (var hook in this.__hooks) {
			this.__hooks[hook]();
		}
	},
	// Validates all settings and moves them to this.__setting.
	__setVars: function (options) {
		this.__setting = {};
		// Copy script defaults.
		var out = this.__copyObj(this.__defaults);
		var setting, validationCopy, validationCount, valid;
		// Copy user-defined defaults over the script defaults.
		for (setting in this.__userDefaults) {
			if (this.__defaults.hasOwnProperty(setting)) {
				out[setting] = this.__copyObj(this.__userDefaults[setting]);
			}
		}
		// Copy the run-time options over the other defaults.
		if (typeof options == 'object') {
			for (setting in options) {
				if (this.__defaults.hasOwnProperty(setting)) {
					out[setting] = options[setting];
				}
			}
		}
		// Loop through each setting and validate.
		for (setting in out) {
			if (setting == 'buttons') {
				// Requires special validation, pass to special function.
				this.__setting[setting] = this.__validateButtons(out[setting]);
				continue;
			}
			if (setting == 'theme') {
				// Requires special validation, pass to special function.
				this.__setting[setting] = this.__validateTheme(out[setting]);
				continue;
			}
			if (this.__settingsValidation.hasOwnProperty(setting)) {
				// Copy validation parameters.
				validationCopy = this.__copyObj(this.__settingsValidation[setting]);
				valid = false;
				// Validate depending on the method, either a typeof check or a regex check.
				switch(validationCopy.shift()) {
					case 'type':
						// Check the 'typeof' of the setting.
						for (validationCount = 0; validationCount < validationCopy.length; validationCount++) {
							// Special check for being an array.
							if (validationCopy[validationCount] == 'array') {
								if (out[setting] instanceof Array) {
									// Setting is an array, pass it along.
									valid = true;
									this.__setting[setting] = out[setting];
									break;
								}
								else if (this.__userDefaults[setting] instanceof Array) {
									// Setting isn't an array but user-defined default is, pass it along.
									valid = true;
									this.__setting[setting] = this.__userDefaults[setting];
									break;
								}
							}
							else if (typeof out[setting] == validationCopy[validationCount]) {
								// Setting has the correct type, pass it along.
								valid = true;
								this.__setting[setting] = out[setting];
								break;
							}
							else if (typeof this.__userDefaults[setting] == validationCopy[validationCount]) {
								// Setting doesn't have the correct type but user-defined default does, pass it along.
								valid = true;
								this.__setting[setting] = this.__userDefaults[setting];
								break;
							}
						}
					break;
					case 'match':
						for (validationCount = 0; validationCount < validationCopy.length; validationCount++) {
							if (validationCopy[validationCount].test(out[setting])) {
								// Setting matches up against the regex, pass it along.
								valid = true;
								this.__setting[setting] = out[setting];
								break;
							}
							else if (validationCopy[validationCount].test(this.__userDefaults[setting])) {
								// Setting doesn't match up against the regex but user-defined default does, pass it along.
								valid = true;
								this.__setting[setting] = this.__userDefaults[setting];
								break;
							}
						}
					break;
				}
				if (!valid) {
					// Setting doesn't validate, use script default.
					this.__setting[setting] = this.__copyObj(this.__defaults[setting]);
				}
			}
		}
	},
	// Used to validate the button object structure.
	// Returns array of validated buttons or an empty array if there were no valid buttons.
	__validateButtons: function (buttons) {
		var btns = [];
		if (typeof buttons == 'object' && buttons instanceof Array) {
			var btnNum, btnAttr, o;
			// Loop through buttons.
			button:
			for (btnNum = 0; btnNum < buttons.length; btnNum++) {
				// Button is the wrong type, skip it.
				if (typeof buttons[btnNum] != 'object') {continue button;}
				for (btnAttr in buttons[btnNum]) {
					// Short alias for the button attribute.
					o = buttons[btnNum][btnAttr];
					switch(btnAttr) {
						case 'text':
							// Text must be a string.
							if (typeof o != 'string') {o = '';}
						break;
						case 'tooltip':
							// Tooltip must be a string.
							if (typeof o != 'string') {o = false;}
						break;
						case 'icon':
							// Icon must be a string.
							if (typeof o != 'string') {o = false;}
						break;
						case 'callback':
							// Callback must be a function. Skip button if callback isn't correct.
							if (typeof o != 'function') {continue button;}
						break;
					}
				}
				// Button validates, add it to the final list.
				btns.push(buttons[btnNum]);
			}
		}
		// Return final list of buttons--it may be an empty array!
		return btns;
	},
	// Used to validate the theme object structure.
	// Returns the theme name to use.
	__validateTheme: function (theme) {
		if (typeof theme != 'string' || theme == '') {return this.__defaults.theme;}
		if (typeof this.__themes[theme] == 'object' && this.__themes[theme] !== null) {
			var t = this.__themes[theme];
			if (t.base) {
				if (typeof this.__themes[t.base] == 'object' && this.__themes[t.base] !== null) {return theme;}
				else {return this.__defaults.theme;}
			}
			else {return theme;}
		}
		return this.__defaults.theme;
	},
	// Finds any tokens in 'text' and parses it.
	// Returns the final HTML string to use.
	__parseTokens: function (text) {
		var tagSplitRegex = /({\s*\w+\s*(?:\w+(?:\s*=\s*(?:".*?"|'.*?'))?\s*)*})/;
		var tagRegex = /{\s*(\w+)/;
		var attrRegex = /(\w+)\s*=\s*(".*?"|'.*?')/g;
		// Splits text wherever a token is.
		var text_obj =  text.split(tagSplitRegex);
		var i, match, attr, tag, temptext;
		// Loop through tokens.
		token_search:
		for (i = 1; i < text_obj.length; i += 2) {
			tag = {};
			// Find token information.
			match = tagRegex.exec(text_obj[i]);
			temptext = text_obj[i].replace(tagRegex, '');
			tag.name = match[1];
			tag.attributes = {};
			// Token doesn't exist, skip it.
			if (typeof this.__tokens[tag.name] == 'undefined') {continue;}
			// Attribute exists, parse it.
			if (typeof temptext != '') {
				while ((attr = attrRegex.exec(temptext)) != null) {
					// Remove quotes.
					attr[2] = attr[2].substring(1, attr[2].length - 1);
					// Attribute isn't in token system, ignore it.
					if (typeof this.__tokens[tag.name].attributes[attr[1]] == 'undefined') {continue;}
					if (this.__tokens[tag.name].attributes[attr[1]].validation === false) {
						// No validation needed, pass it along.
						tag.attributes[attr[1]] = attr[2];
					}
					else if (this.__tokens[tag.name].attributes[attr[1]].validation.test(attr[2])) {
						// Validated by RegEx, pass it along.
						tag.attributes[attr[1]] = attr[2];
					}
					else if (typeof this.__tokens[tag.name].attributes[attr[1]].defaultValue == 'string') {
						// Didn't validate but there is a default, use that instead.
						tag.attributes[attr[1]] = this.__tokens[tag.name].attributes[attr[1]].defaultValue;
					}
					else {
						// Didn't validate and there is no default, meaning it is required. Skip the token completely.
						continue token_search;
					}
				}
			}
			// Loop through unused attributes and apply defaults.
			for (attr in this.__tokens[tag.name].attributes) {
				if (!this.__tokens[tag.name].attributes.hasOwnProperty(attr)) {continue;}
				if (typeof tag.attributes[attr] == 'undefined') {
					if (typeof this.__tokens[tag.name].attributes[attr].defaultValue == 'string') {
						// Default found, use it.
						tag.attributes[attr] = this.__tokens[tag.name].attributes[attr].defaultValue;
					}
					else {
						// No default, meaning it is required. Skip the token completely.
						continue token_search;
					}
				}
			}
			var rep = this.__tokens[tag.name].replacement;
			if (typeof rep == 'string') {
				// Use the replacement directly.
				text_obj[i] = rep;
			}
			else if (typeof rep == 'function') {
				// Run replacement function.
				var rep_result = rep(tag);
				// Replacement doens't return a string, must not have validated. Skip token completely.
				if (typeof rep_result != 'string') {continue token_search;}
				// Use the result of the replacement function.
				text_obj[i] = rep_result;
			}
		}
		// Joins the now tokenized string.
		return text_obj.join('');
	},
	// Copies an object to avoid aliases. May not work with special objects (Date and similar).
	__copyObj: function (obj) {
		if (obj == null || typeof(obj) != 'object' || obj instanceof RegExp) {return obj;}
		var c = new obj.constructor(); 
		for (var key in obj) {c[key] = this.__copyObj(obj[key]);}
		return c;
	}
};