// ==UserScript==
// @name       Otaku-Streamers (Beta) Episode Automator
// @namespace  http://userscripts.org/users/500138/
// @description  Automates addition and removal of anime episodes on http://beta.otaku-streamers.com
// @version    0.1
// @date       2013-01-08
// @author     forknbeans
// @match      http://beta.otaku-streamers.com/streaminfo.php?id=*
// @require    http://beta.otaku-streamers.com/js/osv3.1.js
// ==/UserScript==
$(document).ready(function () {
	// store anime id and episode selection id
	var $osid = $('#osid').val(),
		$selectedEpisode = 1;

	// customize interface
	$('.strinfo ul').prepend('<li id="info_head">Mass Edit Episodes</li><li id="strtitle"><p><form><select id="massEpisodes" style="width: 80%";></select></form></li>');
	$('#massEpisodes').after("<br /><input type='button' id='btnAdd' value='Add' style='width: 40%';/><input type='button' id='btnRemove' value='Remove' style='width: 40%';/></p>");

	// remove 'preview' episode if found then populate episode list
	if ($('#' + $osid + 'ep0').length === 0) {
		$('#eplist li').each(function (i) {
			$('#massEpisodes').append("<option value='" + (i + 1) + "'>Episode " + (i + 1) + "</option>");
		});
	} else {
		$('#eplist li').slice(0, -1).each(function (i) {
			$('#massEpisodes').append("<option value='" + (i + 1) + "'>Episode " + (i + 1) + "</option>");
		});
	}

	// update $selectedEpisode when user changes episode selection
	$('#massEpisodes').change(function () {
		$selectedEpisode = $('#massEpisodes option:selected').val();
	});

	// add episodes when user clicks Add button
	$('#btnAdd').click(function () {
		for (var i = 0; i < $selectedEpisode; i++) {
			wal_add($osid, i + 1);
		}
	});

	// remove episodes when user clicks Remove button
	$('#btnRemove').click(function () {
		for (var i = 0; i < $selectedEpisode; i++) {
			wal_remove($osid, i + 1);
		}
	});
});