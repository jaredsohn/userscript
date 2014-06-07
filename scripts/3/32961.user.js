// ==UserScript==
// @name           Mark unread mail
// @namespace      http://javascriptadventures.blogspot.com
// @description    script to check unread messages at yahoo webmail (classic version)
// @include        http://*.mail.yahoo.com/*
// ==/UserScript==
window.checkUnreadMail = function(){
	var trNodes = document.getElementsByTagName('tr');
	for(var i=0; i<trNodes.length; i++){
		if(trNodes[i].className == 'msgnew'){
			trNodes[i].className = 'msgnew selected';

			var tdNodes = trNodes[i].getElementsByTagName('td');
			for(var j=0; j<tdNodes.length;j++){
				if(tdNodes[j].hasChildNodes() && tdNodes[j].firstChild.nodeType == 1){
					tdNodes[j].firstChild.checked = true;
				}
			}
		}
	}
}

window.classicMailUI = function(){
	var a = document.createElement('a');
	var text = document.createElement('span');
	text.innerHTML = 'Check Unread Mail';
	a.appendChild(text);
	a.href = '#';
	a.addEventListener('click', checkUnreadMail, false);

	var trc = document.createElement('span');
	trc.innerHTML = ' - ';

	var insertedElement = document.getElementById('checkclearall').insertBefore(a, document.getElementById('clearall'));
	var insertedElement = document.getElementById('checkclearall').insertBefore(trc, document.getElementById('clearall'));
}

window.newMailUI = function(){
}

if(document.getElementById('checkclearall') != null){
	window.addEventListener('load', classicMailUI, false);
}else{
	window.addEventListener('load', newMailUI, false);
}