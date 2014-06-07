// ==UserScript==
// @name         DS-Farmassistent
// @namespace    FileFace
// @description  Assistiert unter anderem beim Farmen
// @version      5.63
// @author       Zorbing
// @copyright    (C) 2013 Zorbing
// @license      CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include      http://de*.die-staemme.de/game.php?*
// @include      http://des*.ds.ignames.net/game.php?*
// @include      http://ch*.staemme.ch/game.php?*
// @include      http://en*.tribalwars.net/game.php?*
// @include      http://uk*.tribalwars.co.uk/game.php?*
// @include      http://us*.tribalwars.us/game.php?*
// @updateURL    https://userscripts.org/scripts/source/134048.meta.js
// ==/UserScript==
(function () {
	if ($('#script_warning').length) {
		var description = 'The script {dsfa} is outdated and will not be supported any more.<br>Please got to {ff-link} to get the latest version of the new script {dsplus}.';
		var server = document.location.host.split('.')[0];
		var res = server.match(/^([a-z]{2})[ps]?\d+/);
		var lang = 'de';
		if (res)
			lang = res[1];
		if (lang == 'de' || lang == 'ch')
			description = 'Das Script {dsfa} ist veraltet und wird nicht länger unterstützt.<br>Auf {ff-link} lässt sich die aktuelle Version {dsplus} herunterladen.';
		description = description.replace('{dsfa}', '„<a href="http://userscripts.org/scripts/show/134048" target="_blank">DS-Farmassistent</a>“');
		description = description.replace('{ff-link}', '<a href="http://www.fileface.de/" target="_blank">fileface.de</a>');
		description = description.replace('{dsplus}', '„<a href="http://www.fileface.de/index.php?title=Changelog" target="_blank">DS+</a>“');
		$('#script_warning').after('<div class="hint-box" id="update_warning" style="font-size: 1.5em;">'+ description +'</div>');

		var height = [$('#update_warning').height(), 50];
		height[1] += height[0];
		var num = 1;
		var startAnimation = function() {
			setTimeout(function() {
				$('#update_warning').animate({
					height: height[num] +'px'
				}, 500, function() {
					num = (num+1) % 2;
					startAnimation();
				});
			}, 800);
		};
		startAnimation();
	}
})();