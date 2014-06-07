// ==UserScript==
// @id             forums.whirlpool.net.au-9d98f12e-8abc-7248-a3d0-6141e8b0489f@scriptish
// @name           whirlpool - keyboard shortcut to account page
// @version        1.1
// @namespace      wp
// @author         Yansky
// @description    whirlpool - keyboard shortcut to account page
// @include        http://whirlpool.net.au/*
// @include        http://forums.whirlpool.net.au/*
// @include        https://whirlpool.net.au/*
// @include        https://forums.whirlpool.net.au/*
// @run-at         document-end
// ==/UserScript==


var uIlink = document.querySelector('#menu+.userinfo a[href^="//forums.whirlpool.net.au/user/"]');

if(!uIlink)
	return;

var uNum = uIlink.href.split("//forums.whirlpool.net.au/user/")[1];

if(document.URL === uIlink.href)
	return;

//default Shift+a
var keys = {
		comBkey:{
			useComb:true,
			combKeys:['shiftKey']
		},
		norMKey:65
};


var getStoredKeys = GM_getValue('storedKeys');

if(getStoredKeys){

	keys = JSON.parse(getStoredKeys);

}

var newB;
var settingKeys = false;
var keydownEvent;

window.addEventListener('keydown', function(e){

	if(settingKeys){

		var keyCombin = '';
		keydownEvent = e;

		if(e.ctrlKey){

			keyCombin += 'Ctrl+';

		}
		if(e.shiftKey){

			keyCombin += 'Shift+';

		}
		if(e.altKey){

			keyCombin += 'Alt+';

		}

		newB.textContent = 'Your new shortcut is: '+keyCombin+String.fromCharCode(e.keyCode).toLowerCase();

	}
	else{

		var acElnn = document.activeElement.nodeName;

		if(acElnn === "TEXTAREA" || acElnn === "INPUT" )
			return;

		if(keys.norMKey === e.keyCode){

			if(keys.comBkey.useComb && !keys.comBkey.combKeys.every(function(item){return e[item];}))
				return;

			window.location.href = uIlink.href;

		}

	}

},false);

function registerKeys(){

	settingKeys = true;

	var newDiv = document.createElement('div');
	newDiv.setAttribute('style','position:absolute;z-index:50;top:'+window.pageYOffset+'px;left:0;padding:15px;'+
						'border:5px solid grey;height:200px;width:300px;background-color: white;');

	newB = document.createElement('b');
	newB.innerHTML = '<b>Execute your new keyboard shortcut. It will be automatically recorded.</b>';
	newDiv.appendChild(newB);

	var newP = document.createElement('p');
	newDiv.appendChild(newP);

	var canB = document.createElement('button');
	canB.textContent = 'Cancel';
	newP.appendChild(canB);

	var canBMU = canB.addEventListener('mouseup',function(e){

		canB.removeEventListener('mouseup',canBMU,false);

		document.body.removeChild(newDiv);

	},false);

	var okB = document.createElement('button');
	okB.textContent = 'OK';
	newP.appendChild(okB);

	var okbMU = okB.addEventListener('mouseup',function(e){

		okB.removeEventListener('mouseup',okbMU,false);

		settingKeys = false;
		keys.comBkey.useComb = false;
		keys.comBkey.combKeys = [];

		if(keydownEvent.ctrlKey){

			keys.comBkey.useComb = true;
			keys.comBkey.combKeys.push('ctrlKey');

		}
		if(keydownEvent.shiftKey){

			keys.comBkey.useComb = true;			
			keys.comBkey.combKeys.push('shiftKey');

		}
		if(keydownEvent.altKey){

			keys.comBkey.useComb = true;			
			keys.comBkey.combKeys.push('altKey');

		}	

		keys.norMKey = keydownEvent.keyCode;

		GM_setValue('storedKeys', JSON.stringify(keys));

		document.body.removeChild(newDiv);

	},false);

	document.body.appendChild(newDiv);
	newDiv.focus();

}

GM_registerMenuCommand("WP register shortcut keys", registerKeys);





