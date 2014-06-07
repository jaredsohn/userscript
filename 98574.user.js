// ==UserScript==
// @name			Developer Tools: Config
// @namespace		#Cletus
// @description		Developer tools to create and handle configuration settings.
// @copyright		2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @license			(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
//
// @exclude			*
//
// @version			1.1.1
// ==/UserScript==

if (typeof GM_getValue == 'undefined' || typeof GM_getValue('a', 'b') == 'undefined') {
	function GM_listValues() {
		try {var prefix = devtools.config.__options.prefix;}
		catch (e) {var prefix = '';}
		var list = [];
		var reKey = new RegExp('^' + prefix + '-');
		for (var i = 0, il = window.localStorage.length; i < il; i++) {
			var key = window.localStorage.key(i);
			if (reKey.test(key)) {
				list.push(key.replace(reKey, ''));
			}
		}
		return list;
	}
	function GM_setValue(key, value) {
		try {var prefix = devtools.config.__options.prefix;}
		catch (e) {var prefix = '';}
		var type = typeof value;
		if (type == 'string' || type == 'boolean' || type == 'number') {
			value = (type).toUpperCase().substr(0,1) + ':' + value;
		}
		window.localStorage.setItem(prefix + '-' + key, value);
	}
	function GM_getValue(key, defValue) {
		try {var prefix = devtools.config.__options.prefix;}
		catch (e) {var prefix = '';}
		var value = window.localStorage.getItem(prefix + '-' + key);
		if (value === null) {
			return defValue;
		}
		switch (value.substr(0, 2)) {
			case 'S:':
				return value.substr(2);
			case 'B:':
				return value.substr(2) == 'true';
			case 'N:':
				return parseInt(value.substr(2));
		}
		return value;
	}
}

// Check if Developer Tools: Dialog exists.
if (typeof devtools.dialog != 'undefined') {
	// Define the Config object.
	devtools.config = {
		// Opens the Config utility.
		open: function () {
			var msg = (typeof this.__options.html == 'string') ? this.__options.html + '<hr/>' : '';
			for (var name in this.__options.settings) {
				msg += this.__options.settings[name].input;
			}
			devtools.dialog.open({
				message: msg,
				title: this.__options.title,
				mask: true,
				buttons: [
					{text: 'Save', icon: this.__icons.save, callback: function () {
						devtools.config.__save();
						devtools.config.__options.callback();
					}},
					{text: 'Save & Close', icon: this.__icons.save, callback: function () {
						devtools.config.__save();
						devtools.config.close();
						devtools.config.__options.callback();
					}},
					{text: 'Close', icon: this.__icons.close, callback: this.close}
				],
				theme: (typeof this.__options.theme.css == 'string') ? 'devtoolsconfig' : 'default'
			}, 'devtools-config');
		},
		// Closes the Config utility.
		close: function () {
			devtools.dialog.close('devtools-config');
		},
		// Get a setting (name) from the Config utility.
		get: function (name) {
			if (this.__options.settings[name] !== null && typeof this.__options.settings[name] != 'undefined') {
				return GM_getValue('devtools-config-' + name, this.__options.settings[name].defaultValue);
			}
			return undefined;
		},
		// Get all settings used by the config. Returns object: {key1: value, key2: value}
		getAll: function () {
			var vals = {}, val;
			var allVals = GM_listValues();
			for (var i = 0; i < allVals.length; i++) {
				val = allVals[i];
				if (/^devtools-config-/.test(val)) {
					vals[val.replace(/^devtools-config-/, '')] = this.get(val.replace(/^devtools-config-/, ''));
				}
			}
			return vals;
		},
		// Initialize the settings.
		init: function (options) {
			if (typeof options != 'object' || !options) {
				return false;
			}
			if (!options.settings) {
				return false;
			}
			if (options.prefix) {
				this.__options.prefix = options.prefix;
			}
			if (typeof options.callback == 'function') {
				this.__options.callback = options.callback;
			}
			else {
				this.__options.callback = function () {};
			}
			this.__options.title = (typeof options.title == 'string') ? options.title : 'Configuration Options';
			var setting, name;
			for (name in options.settings) {
				if (!/^\w+$/.test(name) || !options.settings.hasOwnProperty(name)) {continue;}
				this.__options.settings[name] = {};
				setting = options.settings[name];
				if (typeof setting.type == 'string') {
					if (setting.type == 'text' || setting.type == 'textarea' || setting.type == 'password') {
						this.__options.settings[name].defaultValue = (typeof setting.defaultValue == 'string') ? setting.defaultValue : '';
						this.__options.settings[name].input = '{input type="' + setting.type + '" name="' + name + '" defaultValue="' + (this.get(name) || this.__options.settings[name].defaultValue) + '" label="' + ((typeof setting.label == 'string') ? setting.label : '') + '"}';
					}
					if (setting.type == 'checkbox') {
						this.__options.settings[name].defaultValue = (setting.defaultValue == true || setting.defaultValue == 'true') ? true : false;
						this.__options.settings[name].input = '{input type="' + setting.type + '" name="' + name + '" defaultValue="' + ((typeof this.get(name) == 'boolean') ? this.get(name) : this.__options.settings[name].defaultValue) + '" label="' + ((typeof setting.label == 'string') ? setting.label : '') + '"}';
					}
					if (setting.type == 'radio' || setting.type == 'select') {
						this.__options.settings[name].defaultValue = (typeof setting.defaultValue == 'string') ? setting.defaultValue : '';
						this.__options.settings[name].input = '{input type="' + setting.type + '" name="' + name + '" defaultValue="' + (this.get(name) || this.__options.settings[name].defaultValue) + '" label="' + ((typeof setting.label == 'string') ? setting.label : '') + '"';
						this.__options.settings[name].input += ' options="' + ((typeof setting.options == 'object') ? devtools.JSON.stringify(setting.options) : '') + '"';
						this.__options.settings[name].input += ((setting.colorHook === true && setting.type == 'select') ? ' hook="color"' : '') + '}';
					}
				}
			}
			this.__options.html = (typeof options.html == 'string') ? options.html : false;
			this.__options.theme.useBase = (options.useBase === false) ? false : true;
			this.__options.theme.css = (typeof options.css == 'string') ? options.css : null;
			if (typeof this.__options.theme.css == 'string') {
				devtools.dialog.defineTheme('devtoolsconfig', this.__options.theme.css, ((this.__options.theme.useBase) ? 'default' : null));
			}
			this.__initSettings = options;
			return true;
		},
		// Internal holder for initial settings.
		__initSettings: null,
		// Save current settings.
		__save: function (options) {
			options = devtools.dialog.getInputs('devtools-config');
			for (var name in options) {
				if (!options.hasOwnProperty(name)) {continue;}
				GM_setValue('devtools-config-' + name, options[name]);
			}
			var img = document.querySelector('#devtools-dialog-devtools-config [data-devtools-dialog-button="Save"] img');
			img.src = devtools.config.__icons.savecomplete;
			setTimeout(function () {img.src = devtools.config.__icons.save;}, 2000);
			devtools.config.init(devtools.config.__initSettings);
			return true;
		},
		// Internal holder for current settings.
		__options: {title: '', html: '', theme: {useBase: true, css: false}, settings: {}, prefix: 'my_storage_prefix'},
		// Internal object used for icons.
		__icons: {
			save: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKCSURBVHjaYjTL3lPIwMAgD8Q2QKwExDwMDP9ZgDQjw38GMGBmYmRgAuL///8x/PvH8IGNleHO95+/O09N81wDEEAghVqzS61SQOrVpdnBev7/+8/w6w8Q//4H1szJzsTAyMjA8OX7P4YvP/7y33v+xWDhzrszzLK28QMEEBNQvS1I1/pTnxiA+oC2/GfIm3waaBOQA9TFygKxHWTgd6CBf/4xMP5lYGKJd1cW5mRnmwoQQCADJEC2gjT8Bsr+/gNx928gn4WZAWwASO77L6gc0IIDlz8zsLEyM3z/+YcNIIBAXuD68w/scLAiEGACufc/SDPQ6UD4A2jz95//gS78D3YliH729gfIMEaAAGIBBdhfoAAQMfyE2l6bYADWDEQMv//+Z/j2E+R0cAACzQXCfyDX/AUHKkAAgUP7318GsNOaF5wHehvoZ0aY7QwMINf9AXoNGiFgICAgBDSAGawHIIBYGMBOApn+l0FMXBoUGZD4A+uAOhlo4///UC+AnAG05PfvP6DoYgAIIJALGP7+BRsGBoxwBgPEyf8h4QOh/oPlQU7//RuSLgACCGzAn7//GKBWgv0ICjgGsEKIf8H+Btv+F5xGgCyGn7//g10AEECgQGT4+w/i5LpIGQZiQOnsq8BwgbgEIIBYQFH2Fxa6QEMmHkvBqznPcjbQy3/ACQukASCAWCB+/Q8OcRCwkokl6IJ/QBv//gYnPwaAAGIB+u0/0AuMsDA49mQxXs0msnZAF/wFpw+QXoAAYgFa/uDXn3+Kxspc4AxTYD2HoAvEeYEu+Au28D1AADGaZe3qBxqkBnSBJdBIQZCzwFH3/x84kJBpWMxAIv3/ZwZGpssAAQYAIXxui1/HoMEAAAAASUVORK5CYII%3D',
			savecomplete: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuNtCDrVoAAAN6SURBVDhPTZLrT5tlGIf7HziDi/GLZsk0ZsYYDq0YsrEAbrq5KPvieWEwOk6DSWYmh204YYByBoHCKO06oIVWThaEopgFNrp1DOQwgoMhOg6FVqDjVA6XT19j4ocrT94373397vt+H5kitusLQYHAJnAK3IpYy64ARcy/vBXXRUD8z/gk6tibHbLpVfz6yt7SA917dV57ZKKgcnBqjcGpdTa2dlkXrG3usLS6jX3JjWNlS3qedTl46eY+Tna+x7leJaHifFH92phHMDb4eI20+nnW3KLYvcOZnD6cri3sy1usrG1L4qQ7Vwg2B1I4kkXS/QQKR7M5YNyPR7A0IASX9XMsi489eATzy26cT7dYF8K+2X72aJ4hdySDRJtSouBhphC8IgnctolVIZhlTrTsQZlrZV6cro0dNkRXQS1vE289S/F4NlH3PqFqsoTPb32Id36UR2DZtT56yqW6Wf5Y3JT407Ep0rel9MoRLT6Nb6CZKuOr4VhKJ3LIGL7EoaZgfGMbJAFa221OaPIJzbtBpEg/m2clrugeyqJunlO/QJFILp7MJGciDe10OYfbAkhv/xE/ZSuy56+eZH/NPt5tC8FL8yzyqghSbk6TopvGX3uKUz0fUfvkOlmTyfxgryHaGk6oPpUK8wR+kc3IZKUyrg1cJl8sKG/0mtSuj/pjwnQmXm14GeOcjpK/MjEuaCl5nMOhxqMkXO/n+6ZxfM80CkGZjCLxS1IenCdt6Etp1qMdQYhLQvbYVfT2KqrtRTQ76njHEoxS3cF51Sh5DSP4RpjECN+E4t/sh+r3AjJGk/hu/Ar6mWrShpNodRhQLxTS5WrhwkAcqocV0p04VzrEt3W/4RMulugvlnjE9CmB5gC0U+XkT6STKeZtWdRTs6ii3WWkeqaM4+2BZP0aLt3KmOIHpOv68TldLwRxFtpsThSazzhuOYJhRkPFkzwKZ9Ix/F1Fh6uRD345hmGklluPuiVBVMF9vlbbhECP7M3Yzt3Wuw6Sb0wR35vAQbM/hjkNRqeG7lUzyUOJRFrel9L/6yAy9y6plVa8w+p2ZfKYzknT7QVMvXZpvovWixyzhNDiNKCaLiCyJ1x6/39SK/pIKr/jEThkipjOfHl0h1ke/ZNTHtWOPMqMPCeRg02HCTKdQHFBhU+EUSysXrRsEEV6Kdk7rHbZ+7S+5x96SM+LUN/dOQAAAABJRU5ErkJggg==',
			close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII%3D'
		}
	}
}