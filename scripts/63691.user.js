// ==UserScript==
// @name           Facebook Chat Phrases
// @description   Tiered of typing "lol" and "nm"???? Then install the Facebook Chat Phrases.

// @version        1.0
// @author         Matt Besser

// ==/UserScript==
//




// List of emoticons
// lol  haha  nm  whats up?  how r u?  sorry  

	var emotsInfo = new Array();
	emotsInfo[0] = 'lol';		emotsInfo[1] = 590;
	emotsInfo[2] = 'haha';		emotsInfo[3] = 606;
	emotsInfo[4] = 'nm';		emotsInfo[5] = 622;
	emotsInfo[6] = 'whats up?';     emotsInfo[7] = 638;
	emotsInfo[8] = 'how r u?';	emotsInfo[9] = 718;
	emotsInfo[10] = 'sorry';	emotsInfo[11] = 846;
	

	var fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	fEmotBarDom.setAttribute('style','padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-bottom-style: solid; border-bottom-width: 1px; border-color: #EEEEEE;');
	
	
		fEmotsDom.setAttribute('class','emote_img');
		fEmotBarDom.appendChild(fEmotsDom);
	}
	
	document.addEventListener("DOMNodeInserted", fInsertedNodeHandler, false);





	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('chat_window')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('chat_window')[0].getElementsByClassName('toolbox')[0];
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		for(i=0;i<fNewEmotBar.childNodes.length;i++) fNewEmotBar.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.firstChild);
		else fChatToolBox.appendChild(fNewEmotBar);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.getElementsByClassName('chat_input_div')[0].getElementsByClassName('chat_input')[0];
               

		if (event.target.getAttribute('alt') == 'popout') {

                window.open('http://www.facebook.com/presence/popout.php');

		}

		else {
		fChatInput.value += ' ' + event.target.getAttribute('alt')+' ';
		fChatInput.focus();

                }
	}