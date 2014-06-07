// ==UserScript==
// @version       1.0.0
// @name          C&C:Tiberium Alliances Chathelper
// @namespace     cncchathelp
// @description   press Alt+1 and write coordinates
// @author        SiSoSnooP
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*

// ==/UserScript==



(function (){
    var cncloot_main = function() {
        function sisosnop_create() {
			window.onkeypress = function (te) {
				if (te.charCode == 49 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						var coordstext=prompt("Koordinaten (Syntax: 123:344)","");
						if (coordstext!== null){
							inputField.value += '[coords]'+coordstext+'[/coords]';
						}	
					}
				}
			};

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
