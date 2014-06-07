// ==UserScript==
// @name		SPiN.de Emote-Buttons
// @description		Adds the "old" Emote-Buttons above the text inputbox.
// @version		1.2.0
// @author		v2px <v2px@v2px.de>
// @license		GPLv3
// @include		*://*.spin.de/tabs/chatroom*
// ==/UserScript==

var EmoteButton = new Array();
EmoteButton['hi']    = '/me begrüßt alle.';
EmoteButton['grins'] = '/me grinst frech.';
EmoteButton['bier']  = '/me macht eine Flasche Bier auf - FUMP!';
EmoteButton['seufz'] = '/me seufzt :-(';
EmoteButton['ok']    = '/me stimmt voll und ganz zu.';
EmoteButton['lach']  = '/me kugelt sich vor Lachen am Boden.';
EmoteButton['nasch'] = '/me vernichtet eine Packung Gummibärchen';
EmoteButton['kippe'] = '/me ist für ne Zigarettenlänge weg.';
EmoteButton['afk']   = '/me ist afk.';
EmoteButton['back']  = '/me ist wieder da.';
EmoteButton['bye']   = '/me winkt zum Abschied.';

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
