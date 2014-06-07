// ==UserScript==
// @name		SPiN.de Emote-Buttons
// @description		Adds the "old" Emote-Buttons above the text inputbox.
// @version		1.2.0
// @author		v2px <v2px@v2px.de>
// @license		GPLv3
// @include		*://*.spin.de/tabs*
// ==/UserScript==

var EmoteButton = new Array();
EmoteButton['Hi']    = "/me greets all.";
EmoteButton['Grins'] = '/me grins brazen.';
EmoteButton['Doof']  = '/me looks silly. Ô_____ö';
EmoteButton['OK']    = '/me agrees.';
EmoteButton['Lw']    = '/think Gegen Langeweile könnte Reallife helfen. ô.o';
EmoteButton['Rofl']  = '/me rolls over the floor laughing.';
EmoteButton['Befinden']  = "Schlechten Menschen geht's immer gut.";
EmoteButton['Bye']   = '/me waves farewell.';

var EmoButtDiv = document.createElement('div');
EmoButtDiv.align = 'left';

for (var button in EmoteButton) {
        var ButtonValue = EmoteButton[button];
	var SingleButton = document.createElement('button');
	SingleButton.appendChild(document.createTextNode(button));
	SingleButton.setAttribute('name', button);
	SingleButton.setAttribute('value', ButtonValue);
	SingleButton.setAttribute('title', ButtonValue);
	SingleButton.setAttribute('type', 'button');
	EmoButtDiv.appendChild(SingleButton);

	SingleButton.addEventListener('click', function(ButtonValue){
            return function(ev){
	       var ChatInput = document.getElementById('chatinp');
	       var CI_OldValue = ChatInput.value;
	       var InputForm = ChatInput.form;

	       var ValArr = ButtonValue.split('\n', 3);
	       for (var val in ValArr) {
		       ChatInput.value = ValArr[val];
		       FormButtons = InputForm.getElementsByTagName('button');
		       for (var button in FormButtons) {
				if (FormButtons[button].type == 'submit') {
					FormButtons[button].click();
				}
		       }
	       }
	       ChatInput.value = CI_OldValue;
	       ChatInput.focus();
	    };
        }(ButtonValue), false);
}

var InputForm = document.getElementsByTagName('form')[0];
var FormDiv = InputForm.getElementsByTagName('div')[1];
var ChatInput = document.getElementById('chatinp');

ChatInput.setAttribute('style', 'width: 98%; height: 30px;');
ChatInput.setAttribute('arprops', ',,1225px,30px,static,auto,visible,,,');

FormDiv.appendChild(EmoButtDiv);
