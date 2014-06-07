// ==UserScript==
// @version       2.0
// @name          C&C:Tiberium Alliances Extended Chathelper AutoCoords
// @namespace     cncchathelp ext auto
// @description   Automatically adding the [coords][/coords] tag to your coordinates in the chat. Автоматически добавляет тег [coords][/coords] для ваших координат в чате.
// @author        Rubbyx
// @include       http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*

// ==/UserScript==


/* Main function was taken from the Extended Chathelper of ChorniRojko, http://userscripts.org/scripts/show/151047,
which was taken from the original Chathelper of ssnoop, https://userscripts.org/scripts/show/133479*/

(function (){
    var cncloot_main = function() {
        function sisosnop_create() {
			window.onkeypress = function (te) {
			/* Here was Alt+1 for Coordinates */

			function getCaretPos(obj)
			{
				obj.focus();

				if(obj.selectionStart) return obj.selectionStart;//Gecko
				else if (document.selection)//IE
				{
					var sel = document.selection.createRange();
					var clone = sel.duplicate();
					sel.collapse(true);
					clone.moveToElementText(obj);
					clone.setEndPoint('EndToEnd', sel);
					return clone.text.length;
				}

			return 0;
			}

			function moveCaret(inputObject, pos)
			{
				if (inputObject.selectionStart)
				{
					inputObject.setSelectionRange(pos,pos);
					inputObject.focus();
				}
			}

				document.onkeydown = function (e)
				{
    					e = e || window.event;
    					if (e.keyCode === 13)
						{
							var inputField = document.querySelector('input:focus, textarea:focus');
							var pos = getCaretPos(inputField);
        					var re = new RegExp("([0-9]{3}[:][0-9]{3})","g");
							var input = inputField.value;
							var i = 0;							

							while(i < input.length)
							{
								if	(
									 i+7 <= input.length &&
									(i == 0 || input[i-1] != ']') &&
									(input[i] >= '0' && input[i] <= '9') &&
									(input[i+1] >= '0' && input[i+1] <= '9') &&
									(input[i+2] >= '0' && input[i+2] <= '9') &&
									(input[i+3] == ':') &&
									(input[i+4] >= '0' && input[i+4] <= '9') &&
									(input[i+5] >= '0' && input[i+5] <= '9') &&
									(input[i+6] >= '0' && input[i+6] <= '9') &&
									(input[i+7] != '[')
									)
										{
											input = input.substr(0,i) 
													+ "[coords]" 
													+ input.substr(i,7) 
													+ "[/coords]" 
													+ input.substr(i+7, input.length);
											
											if(pos >= i && pos < i+7){
												pos = pos - (pos-i);
											} else
											if(i <= pos){
												pos += 17;
											}
											
											i += 17;
								
										}
								i++;
							}						
						

						inputField.value = input;
						moveCaret(inputField, pos);
    					}

				}

				/*if (te.charCode == 49 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null){
						//var coordstext=prompt("Coordinates (Syntax: 123456, instead of 123:456)","");
						//if (coordstext!== null){
						//coordstext=coordstext.substr(0,3) + "" + coordstext.substr(3,5);
						//inputField.value += '[coords]'+coordstext+'[/coords]';
						//}
						var re = new RegExp("([0-9]{3}[:][0-9]{3})","g");
						inputField.value = inputField.value.replace(re,"[coords]"+"$1"+"[/coords]");
					}
				}*/
				/* Alt+2 for URLs */
					if (te.charCode == 50 && te.altKey && !te.altGraphKey && !te.ctrlKey)
					{
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null)
					{
						//var url=prompt("Website (Syntax: google.com or www.google.com)","");
						//if (url!== null)
						{
						var pos = getCaretPos(inputField);
						inputField.value = inputField.value.substr(0,pos) + "[url]" + "[/url]" + inputField.value.substr(pos,inputField.value.length);
						moveCaret(inputField, pos+5);
						}
					}
				}
				/* Alt+3 for players */
					if (te.charCode == 51 && te.altKey && !te.altGraphKey && !te.ctrlKey)
					{
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null)
					{
						//var playername=prompt("Playername (Syntax: playername)","");
						//if (playername!== null)
						{
						var pos = getCaretPos(inputField);
						inputField.value = inputField.value.substr(0,pos) + '[player]'+'[/player]' + inputField.value.substr(pos,inputField.value.length);
						moveCaret(inputField, pos+8);
						}
					}
				}
				/* Alt+4 for alliances */
					if (te.charCode == 52 && te.altKey && !te.altGraphKey && !te.ctrlKey) {
					var inputField = document.querySelector('input:focus, textarea:focus');
					if (inputField !== null)
					{
						//var alliancename=prompt("Alliancename (Syntax: alliance)","");
						//if (alliancename!== null)
						{
						var pos = getCaretPos(inputField);
						inputField.value = inputField.value.substr(0,pos) + '[alliance]'+'[/alliance]' + inputField.value.substr(pos,inputField.value.length);
						moveCaret(inputField, pos+10);
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