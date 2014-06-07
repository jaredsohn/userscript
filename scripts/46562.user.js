// ==UserScript==
// @name           RAZ3R's Quake Live Training Map Launcher
// @version        raztrainql_beta3 userscriptfix4
// @namespace      http://userscripts.org/scripts/show/46562
// @include        http://www.quakelive.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=46562&show
// ==/UserScript==

function launch_movement_training() {
	var t = new unsafeWindow.LaunchGameParams({
			isTraining: true
		});
	
	t.Append('+com_backgroundDownload 1 +sv_quitOnExitLevel 1 +g_gametype 5 ');
	t.Append('+timelimit 322122 +capturelimit 0 +fraglimit 0 +bot_minplayers 0 g_minplayers_ctf 1');
	t.Append('+map raztrainql_beta3 ');
	t.Append('+addbot doom 1 b +wait 10');
	t.Append('+team r +wait +readyup +wait ');
	
	if (typeof unsafeWindow.LaunchGame !== "function") {
		alert("Error: LaunchGame not available.\nPlease tell vith");
	}
	
	unsafeWindow.LaunchGame(t);
}

function insert_raz3rlink() {
	if ( qlv_topLinks = document.getElementById('qlv_topLinks') ) {
		qlv_topLinks.innerHTML = "<a href='javascript:;' id='qlv_raz3rmap'>RAZ3R's map</a> | " + qlv_topLinks.innerHTML;
		document.getElementById('qlv_raz3rmap').addEventListener("click", launch_movement_training, true);
	}
	else { window.setTimeout(insert_raz3rlink, 250); }
}

insert_raz3rlink();
