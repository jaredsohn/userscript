// ==UserScript==
// @name        GameFAQs Post Form Hotkeys
// @namespace   OTACON120
// @author      OTACON120
// @version     1.0.2
// @description Adds old GameFOX post form hotkeys to stock GameFAQs post form submit buttons
// @updateURL   http://userscripts.org/scripts/source/172992.meta.js
// @downloadURL http://userscripts.org/scripts/source/172992.user.js
// @website     http://otacon120.com/user-scripts/gamefaqs-related/post-form-hotkeys
// @include     http://www.gamefaqs.com/boards/*-*
// @include     http://www.gamefaqs.com/boards/post.php?*
// @match       http://www.gamefaqs.com/boards/*-*
// @match       http://www.gamefaqs.com/boards/post.php?*
// ==/UserScript==

/**
 * Compare version numbers
 * @param  string v1 Version number to compare
 * @param  string v2 Version number to check against
 * @return bool      true if v1 > v2, false if v1 <= v2
 */
function versionNewer(v1, v2) {
	var v1parts = v1.toString().split('.'),
		v2parts = v2.toString().split('.'),
		i;

	for (i = 0; i < v1parts.length; ++i) {
		v1parts[i] = parseInt(v1parts[i]);
		v2parts[i] = parseInt(v2parts[i]);

		if (v2parts.length === i) {
			return true;
		}

		if (v1parts[i] === v2parts[i]) {
			continue;
		} else if (v1parts[i] > v2parts[i]) {
			return true;
		} else {
			return false;
		}
	}

	if (v1parts.length !== v2parts.length) {
		return false;
	}

	return false;
}

var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			var i,
				dataString,
				dataString;
			for (i = 0; i < data.length; i++)	{
				dataString = data[i].string;
				dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Waterfox",
				identity: "Firefox"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]
	},
	userOS,
	userBrowser,
	userBrowserVersion,
	postForm			= document.getElementById('content').querySelector('.span8 > form .pod .body .details, .span8 > .body form .pod .body .details'),
	btnPreview			= postForm.querySelector('.btn[value="Preview Message"]'),
	btnPreviewNew,
	btnPreviewSpell		= postForm.querySelector('.btn[value="Preview and Spellcheck Message"]'),
	btnPreviewSpellNew,
	btnNoPreview		= postForm.querySelector('.btn[value="Post without Preview"]'),
	btnNoPreviewNew,
	btnReset			= postForm.querySelector('.btn[type="reset"]'),
	btnResetNew,
	akHotkey;

	BrowserDetect.init();

	userOS				= BrowserDetect.OS;
	userBrowser			= BrowserDetect.browser;
	userBrowserVersion	= BrowserDetect.version + (BrowserDetect.version.toString().indexOf('.') === -1 ? '.0' : '');

	if (userOS === 'Windows' || userOS === 'Linux') {
		switch (userBrowser) {
			case 'Firefox':
				akHotkey = 'Alt + Shift + ';
				break;

			case 'Chrome':
				akHotkey = 'Alt + ';
				break;
		}
	}

	if (userOS === 'Mac') {
		switch (userBrowser) {
			case 'Firefox':
				akHotkey = !versionNewer(userBrowserVersion, '13.0') ? 'Ctrl + ' : 'Ctrl + Alt + ';
				break;

			case 'Chrome':
				akHotkey = 'Ctrl + Alt + ';
		}
	}

if (btnPreview) {
	btnPreviewNew		= btnPreview.cloneNode(false);
	btnPreviewNew.title	= 'Preview Message [' + akHotkey + 'X]';
	btnPreviewNew.setAttribute('accesskey', 'x');
	postForm.replaceChild(btnPreviewNew, btnPreview);
}

if (btnPreviewSpell) {
	btnPreviewSpellNew			= btnPreviewSpell.cloneNode(false)
	btnPreviewSpellNew.title	= 'Preview and Spellcheck Message [' + akHotkey + 'C]';
	btnPreviewSpellNew.setAttribute('accesskey', 'c');
	postForm.replaceChild(btnPreviewSpellNew, btnPreviewSpell);
}

if (btnNoPreview) {
	btnNoPreviewNew			= btnNoPreview.cloneNode(false);
	btnNoPreviewNew.title	= 'Post Message [' + akHotkey + 'Z]';
	btnNoPreviewNew.setAttribute('accesskey', 'z');
	postForm.replaceChild(btnNoPreviewNew, btnNoPreview);
}

if (btnReset) {
	btnResetNew			= btnReset.cloneNode(false);
	btnResetNew.title	= 'Reset [' + akHotkey + 'V]';
	btnResetNew.setAttribute('accesskey', 'v');
	postForm.replaceChild(btnResetNew, btnReset);
}