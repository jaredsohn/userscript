// ==UserScript==
// @name           shahterovCRsaver
// @namespace      shahterov.net
// @description    Save Ogame combat report at shahterov.net
// @include        http://*.ogame.ru/*
// @exclude		http://board.ogame.*
// @grant       none
// @version	1.0a
// ==/UserScript==

( function () {

         // The following "if" is not really necessary but with it this script will work for Opera too
		if (document.location.href.indexOf ("/game/index.php?page=messages") < 0)
			return;
		var myFunc = (function ()
		{
		
			var logger_domain = 'shahterov.net';
			var logger_path = '/tool/plugin.php';
			
			var unsafe;
			try { unsafe = unsafeWindow }
			catch (e) { unsafe = window }
		
			function onClick() {
				window.addEventListener('message', postCombat, false);
				addIFrame();
				this.style.display = 'none';
				document.getElementById('iframe').scrollIntoView();
			}
			
			function addIFrame() {
								
					var iframe = document.createElement('iframe');
					var div = document.createElement('div');
					div.style.height = "400px";
					var uni = document.location.href.match(/:\/\/([a-z0-9]+)\./i);
					uni = uni ? uni[1] : '0';

					iframe.src = 'http://' + logger_domain + logger_path + '?universe='+uni;
					iframe.id = "iframe";
					iframe.style.width = '100%';
					iframe.style.height = '100%';
					iframe.style.border = "none";
					div.appendChild(iframe);
					$ (".overlayDiv > .combatreport").append(div);					
			}
			
			function postCombat(e) {
				var server = e.origin.toString();
				if (!server.match( new RegExp(logger_domain, 'i') )) return;
								
				var html = $ (".overlayDiv > .combatreport").parent().html();				
				var iframe = unsafe.document.getElementById('iframe');
				iframe.contentWindow.postMessage(html, 'http://'+logger_domain);
			}
		
			if (document.location.href.indexOf("page=messages") < 0)
				return;
			$ (".mailWrapper").ajaxSuccess (function(e, xhr, settings)
			{
				if (settings.url.indexOf ("page=combatreport") >= 0)
				{
					$ (".overlayDiv > .combatreport").each (function ()
					{		
						var btndiv = document.createElement('div');
						btndiv.setAttribute("class", "textCenter");
						btndiv.style.height = '80px';
					
						var btn = document.createElement('input');
						btn.type = 'button';
						
						btn.setAttribute("class", "btn_blue");
						btn.value = 'Сохранить в shahterov.net';
						btn.border = '1px solid black';
						btn.addEventListener('click', onClick, false);
						
						btndiv.appendChild(btn);
						$ (this).append(btndiv);
					});
				}				
			});
		}).toString ();
		var script = document.createElement ("script");
		script.setAttribute ("type", "application/javascript");
		script.textContent = "(" + myFunc + ") ();";
		document.body.appendChild (script);

}) ();
