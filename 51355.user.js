// ==UserScript==
// @name           Kongregate chat typed history
// @namespace      http://www.kongregate.com/games/*
// @include        http://www.kongregate.com/games/*
// ==/UserScript==


var _holodeck, loaded = false, retainNumber = 500, messagesLog = [], curIndex=0;

function init(){

	if(this.holodeck && this.ChatDialogue){
		loaded = true;
                _holodeck = this.holodeck;

		unsafeWindow.Event.observe(window, 'keydown', function (event) {
			event = event ? event : window.event;

			if (event.keyCode == 38) {
				handleKey(1);
				event.stop();
			} else if (event.keyCode == 40) {
				handleKey(0);
				event.stop();
			}
		});


		this.ChatDialogue.prototype.oldSendInputHistory = this.ChatDialogue.prototype.sendInput;

		this.ChatDialogue.prototype.sendInput = function() {
			messagesLog.push(_holodeck.activeDialogue()._input_node.value);
			if (messagesLog.length > retainNumber) {
				messagesLog.shift();
			}
			curIndex = messagesLog.length;

			this.oldSendInputHistory();
		};
	}
};

function handleKey(up) {
	up ? curIndex-- : curIndex++;
	curIndex = Math.min(messagesLog.length-1, curIndex); 
	curIndex = Math.max(curIndex, 0);

	if (! messagesLog[curIndex]) {
		return;
	}

	_holodeck.activeDialogue()._input_node.value = messagesLog[curIndex];
};


if (!loaded) {
  setTimeout(init, 2000);
};