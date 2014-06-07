// ==UserScript==
// @name		SPiNchat.com Emote-Buttons
// @description		Adds the "old" Emote-Buttons above the text inputbox.
// @version		1.2.0
// @author		v2px <v2px@v2px.de> (modded by traditional/wb for spinchat.com)
// @license		GPLv3
// @include		*://*.spinchat.com/tabs/chatroom*
// ==/UserScript==

var EmoteButton = new Array();
EmoteButton['Untergrund']    = '/join _@g1902';
EmoteButton['Inter'] = '/join International';
EmoteButton['Flirt']  = '/join Flirt';
EmoteButton['Comp&Tech'] = '/join Computers and Technology';
EmoteButton['Away On']    = '/away on';
EmoteButton['Away Off']    = '/back';

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

ChatInput.setAttribute('style', 'width: 98%; height: 20px;');
ChatInput.setAttribute('arprops', ',,1225px,20px,static,auto,visible,,,');

FormDiv.appendChild(EmoButtDiv);
