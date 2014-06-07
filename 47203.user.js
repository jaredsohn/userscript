// ==UserScript==
// @name           Dizionario Latino
// @namespace      localhost
// @include        *
// ==/UserScript==

function getSelectedText() { //legge il testo selezionato e rimuove i simboli
    var words = window.getSelection();
    words = String(words).replace(/(^\s+|\s+$)/g, '');
    return words.replace(/"/g, "'").replace(/>/g, '&gt').replace(/</g, '&lt');
}

function getKeyCode(e){
	e= window.event || e;
	e= e.charCode || e.keyCode;
	if (e !== 108) return; 
	if (window.getSelection() == '') return;
	var Text = getSelectedText();
	window.open('http://www.dizionario-latino.com/dizionario-latino.php?s=adv&parola=' + Text + '&md=ff','blank');
}

function setkeypresshandler(){
	var d= document;
	if(d.addEventListener) d.addEventListener('keypress', getKeyCode, false);
	else if(d.attachEvent){
		d=(d.documentElement.clientHeight)? d.documentElement: d.body;		
		d.attachEvent('onkeypress',getKeyCode);
	}
}
setkeypresshandler()