// ==UserScript==
// @name		O-O-D SaveReport
// @namespace		localhost
// @description		Save Combat report at O-O-D.COM; Greasemonkey script for quick uploading combat reports in OGame v0.x and v1.x ("redesign")
// @include        http://*.ogame.ru/game/index.php?page=combatreport*
// @copyright		2010, 4LIFE
// @license		GNU
// @version 		1.4
// @author 		DEMON
// @homepage 		http://wym.clan.su
// ==/UserScript==

( function () {
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=combatreport') == -1)
		return;
	var unsafe;
	try { unsafe = unsafeWindow }
	catch (e) { unsafe = window }
	
	function addIFrame() {
			var iframe = document.createElement('iframe');
			var div = document.createElement('div');
			div.style.height = "550px";
			var uni = document.location.href.match(/:\/\/([a-z0-9]+)\./i);
			uni = uni ? uni[1] : '0';

			iframe.src = 'http://o-o-d.com/tool/processcombatreport.php';
			iframe.id = "iframe";
			iframe.style.width = '100%';
			iframe.style.height = '100%';
			iframe.style.border = "none";
			div.appendChild(iframe);
			document.body.appendChild(div);
	}

	function postCombat(e) {
		var server = e.origin.toString();
		if (!server.match( new RegExp(logger_domain, 'i') )) return;
		
		var html = unsafe.document.getElementsByTagName('html')[0].innerHTML;
		var iframe = unsafe.document.getElementById('iframe');
		iframe.contentWindow.postMessage(html, 'http://'+logger_domain);
	}
	
	function onClick() {
		window.addEventListener('message', postCombat, false);
		addIFrame();
		this.style.display = 'none';
	}

	function createButton() {
		var btn = document.createElement('input');
		btn.type = 'button';
		btn.width = '10em';
		btn.value = 'O-O-D.COM';
		btn.border = '1px solid black';
		btn.addEventListener('click', onClick, false);
		document.body.appendChild(btn);
	}
	
	createButton();

}) ();
