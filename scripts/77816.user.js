scr_meta=<><![CDATA[
// ==UserScript==
// @name           Aiming in Motion Quake Live Training Map Launcher
// @version        aiming_in_motiona_ql userscriptfix3
// @namespace      http://userscripts.org/users/170896
// @description    Launches the map Aiming in Motion in Quake Live
// @include        http://www.quakelive.com/*
// ==/UserScript==
]]></>.toString();

function launch_aim_training() {
	var cmdString = "";
	cmdString += '+com_backgroundDownload 1 +g_gametype 2 ';
	cmdString += '+timelimit 10 +capturelimit 0 +fraglimit 0 +bot_minplayers 0 +bot_nochat 1 ';
	cmdString += '+devmap f1 ';
	cmdString += '+addbot Anarki 4 red 0 Target01 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target02 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target03 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target04 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target05 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target06 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target07 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target08 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target09 +wait ';
	cmdString += '+addbot Anarki 4 red 0 Target10 +wait ';
	cmdString += '+wait +readyup +wait ';
	if (typeof unsafeWindow.LaunchGame !== "function") {
		alert("Error: LaunchGame not available.");
	}
	if (typeof unsafeWindow.BuildCmdString !== "function") {
		alert("Error: BuildCmdString not available.");
	}
	unsafeWindow.LaunchGame(unsafeWindow.BuildCmdString() + cmdString, true);
}

function insert_aiming_in_motion_link() {
	if ( qlv_topLinks = document.getElementById('qlv_topLinks') ) {
		qlv_topLinks.innerHTML = "<a href='javascript:;' id='qlv_aiming_in_motion'>Aiming in Motion</a> | " + qlv_topLinks.innerHTML;
		document.getElementById('qlv_aiming_in_motion').addEventListener("click", launch_aim_training, true);
	}
	else { window.setTimeout(insert_aiming_in_motion_link, 250); }
}

insert_aiming_in_motion_link();
