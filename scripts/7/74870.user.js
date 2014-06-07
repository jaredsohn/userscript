// ==UserScript==
// @name           What.CD format filter
// @namespace      What
// @description    Allows you to apply custom styles to each different kind of release.
// @include        https://ssl.what.cd/*
// @include        http://what.cd/*
// ==/UserScript==

defaultCSS =  '.FLAC { } \n.MP3 { } \n.V0 { } \n.Ogg { } \n.AC3 { } \n.DTS { } \n.AAC { } \n.CD { } \n.Vinyl { } \n.Reported { } \n \n/* Format filter! Add any CSS to style format/bitrate/media types. \n Other classes: .V2 .b320 .b24bit .WEB .Cassette etc \n Some changes may take effect on next page load.*/'
filterCSS = GM_getValue('filterCSS', defaultCSS);
GM_addStyle(filterCSS);

releases = document.getElementsByClassName('group_torrent');
for (var x = 0; x < releases.length; x++) {
	var title = releases[x].querySelector('TD>A'); 
	if (title) {
		var format = title.textContent.match(/MP3|FLAC|Ogg|AAC|AC3|DTS/);
		var bitrate = title.textContent.match(/V0(?= \(VBR\) \/ )|V2(?= \(VBR\) \/)|320(?= \/)|24bit/);
		var media = title.textContent.match(/CD|DVD|Vinyl|Soundboard|SACD|DAT|Cassette|WEB/)
		var reported = title.textContent.match(/Reported/)
		releases[x].className += ((format)?' ' + format:'') + ((bitrate)?' ' + bitrate.toString().replace(/24bit/,'b24bit').replace(/320/,'b320'):'') + ((media)?' ' + media:'') + ((reported)?' ' + reported:'');
	}
}

function settings() {
	box = document.createElement('FORM');
	box.name = 'settings';
	box.innerHTML = '<textarea name="settingsCSS" class="box" style="width: 100%; height: 200px">' + filterCSS + '</textarea><input type="button" value="Save settings" name="settingsSave" /><input type="button" value="Reset" name="settingsReset" /><input type="button" value="Cancel" onclick="document.body.removeChild(this.form)" />'
	box.style.cssText = 'position: fixed; left: 50%; top: 50%; width: 500px; height: 400px; margin: -200px 0 0 -250px';
	document.body.appendChild(box);
	box.children[0].className = 'box';
	box.children[1].addEventListener("click", save, false)
	box.children[2].addEventListener("click", reset, false)
}

function save() {
	filterCSS = (box.children[0].value);
	GM_setValue('filterCSS', filterCSS);
	GM_addStyle(filterCSS);
	document.body.removeChild(box);
}

function reset() {
	box.children[0].value = defaultCSS;
}

GM_registerMenuCommand( 'Format filter settings', settings );
