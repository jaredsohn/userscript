// ==UserScript==
// @version       1.0.1
// @name          C&C:Tiberium Alliances Extended Chathelper
// @namespace     cncchathelp ext
// @description   press Alt+1 and write coordinates (with or without":"), Alt+2 for URLs, Alt+3 for players and Alt+4 for alliances
// @author        ChorniRojko
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*

// ==/UserScript==


/* Main function taken from the original Chathelper of ssnoop , https://userscripts.org/scripts/show/133479 , modified to insert ":",if needed, after the first 3 numbers */
(function (){
    var cncloot_main = function() {
        function sisosnop_create() {
			window.onkeypress = function (te) {
			/* Alt+1 for Coordinates */
				if (te.charCode == 49 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						var coordstext=prompt("Coordinates (Syntax: 123456 or 123:456)","");
						if (coordstext!== null){
							if (coordstext[3]==":") {inputField.value += '[coords]'+coordstext+'[/coords]';}
							else {
						coordstext=coordstext.substr(0,3) + ":" + coordstext.substr(3,5);
						inputField.value += '[coords]'+coordstext+'[/coords]';
							}
						}	
					}
				}
				/* Alt+2 for URLs */
					if (te.charCode == 50 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						var url=prompt("Website (Syntax: google.com or www.google.com)","");
						if (url!== null){
						inputField.value += '[url]'+url+'[/url]';
						}	
					}
				}	
				/* Alt+3 for players */
					if (te.charCode == 51 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						var playername=prompt("Playername (Syntax: playername)","");
						if (playername!== null){
						inputField.value += '[player]'+playername+'[/player]';
						}	
					}
				}	
				/* Alt+4 for alliances */
					if (te.charCode == 52 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						var alliancename=prompt("Alliancename (Syntax: alliance)","");
						if (alliancename!== null){
						inputField.value += '[alliance]'+alliancename+'[/alliance]';
						}	
					}
				}
			}

        }
    /* Nice load check (ripped from AmpliDude's LoU Tweak script) */
	function cnc_check_if_loaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				if (a) {
					sisosnop_create();
				} else {
					window.setTimeout(cnc_check_if_loaded, 1000);
                                }
			} else {
				window.setTimeout(cnc_check_if_loaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}

	if (/commandandconquer\.com/i.test(document.domain))
		window.setTimeout(cnc_check_if_loaded, 1000);

    }

    // injecting because I can't seem to hook into the game interface via unsafeWindow
    var script_block = document.createElement("script");
    txt = cncloot_main.toString();
    script_block.innerHTML = "(" + txt + ")();";
    script_block.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain))
        document.getElementsByTagName("head")[0].appendChild(script_block);

}
)();