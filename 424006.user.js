// ==UserScript==
// @name	Access Global Variables from Userscripts
// @description	Constructor/library to read and set globals from the content/userscript scope. Works in Google Chrome.
// @namespace	Makaze
// @version	1.2.1
// ==/UserScript==

// Initialization:
//
// 	var global = new GlobalHandler();
//
// Get current variable value:
//
//	global.get(variablename);
//
// Set new variable or value:
//
//	global.set(variablename, value);

function GlobalHandler() {
	var output;

	this.receiveEvent = function(event) {
		output = event.detail;
	};

	this.dispatch = function(variable, name) {
		document.dispatchEvent(
			new CustomEvent('getGlobalVar_' + name, {
				detail: variable
			})
		);
	};

	this.get = function(variable) {
		document.addEventListener('getGlobalVar_' + variable, this.receiveEvent, false);
		var getGlobalScript = document.createElement('script');
		getGlobalScript.type = 'text/javascript';
		getGlobalScript.id = 'getGlobalScript';
		getGlobalScript.appendChild(
			document.createTextNode(
				'(' + this.dispatch.toString() + ')(' + variable + ', \'' + variable + '\');'
				+ 'document.getElementById(\'getGlobalScript\').remove();'
			)
		);
		(document.body || document.documentElement).appendChild(getGlobalScript);
		document.removeEventListener('getGlobalVar_' + variable, this.receiveEvent, false);
		return output;
	};

	this.set = function(variable, value) {
		switch (typeof value) {
			case 'string':
				value = '\'' + value + '\'';
			break;
		}

		var setGlobalScript = document.createElement('script');
		setGlobalScript.type = 'text/javascript';
		setGlobalScript.id = 'setGlobalScript';
		setGlobalScript.appendChild(
			document.createTextNode(
				variable + ' = ' + value + ';'
				+ 'document.getElementById(\'setGlobalScript\').remove();'
			)
		);
		(document.body || document.documentElement).appendChild(setGlobalScript);
	};
}