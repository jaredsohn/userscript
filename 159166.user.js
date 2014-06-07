// ==UserScript==
// @name          Netflix Expiring
// @namespace     http://www.freespiritedsoftware.com/
// @description	  List expiring titles at top of Netflix Instant Queue page
// @version       1.0
// @match         http://*.netflix.com/*
// @match         http://netflix.com/*
// @match         https://*.netflix.com/*
// @match         https://netflix.com/*
// @grant         none
// ==/UserScript==

/** This script was written in response to titles disappearing from my queue due to
 ** Netflix's licensing of the titles expiring, without my being aware.
 ** 
 ** The script parses the Instant Queue page, and if any titles in your queue have
 ** notes indicating that the title will expiring, a list of expiring titles will be
 ** shown below the Your Queue page title.
 **
 ** Report issues at https://github.com/SamStephens/netflix-expiring/issues
 **
 ** This is a greasemonkey script, intended for use with Greasemonkey.
 ** Firefox: http://greasemonkey.mozdev.org/
 ** Chrome: http://www.chromium.org/developers/design-documents/user-scripts
 **/

(function() 
{
	var qbody = document.getElementById('qbody');
	if (!qbody) return;
	var qcontent = document.getElementById('queue-page-content');
	if (!qcontent) return null;
	var qcontainer = qcontent.parentNode;
	
	function getExpiring() {
		var expiring = [];
		var rows = qbody.getElementsByTagName('tr');
		for (var i = 0; i < rows.length; i++) {
			var note = rows[i].getElementsByClassName('av');
			if (note.length == 1) note = note[0]; else return null;
			var until = note.textContent;
			if (!until) continue;
			if (!until || until.indexOf('Until ') == -1) continue;
			var title = rows[i].getElementsByClassName('tt');
			if (title.length == 1) title = title[0]; else return null;
			expiring.push(title.textContent + '- ' + until);
		}
		return expiring;
	}
	
	function setAlert(container) {
		container.style.paddingTop = container.style.paddingBottom = '10px'; 
		container.style.background = '#B9090B';
		container.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.5)';
		container.style.color = '#CCC9C4';
		container.style.textShadow = '0 1px 1px rgba(0, 0, 0, 0.5)';
	}
	
	function showError(container) {
		setAlert(container);
		var message = document.createElement('div');
		message.innerHTML = 'Error in "Netflix Expiring". <a style="color: #FFF" href="https://github.com/SamStephens/netflix-expiring/issues">Report issue</a>.';
		container.appendChild(message);
	}
	
	function showNoneExpiring(container) {
		container.style.paddingTop = container.style.paddingBottom = '0'; 
		var message = document.createElement('div');
		message.textContent = 'None expiring';
		container.appendChild(message);
	}
	
	function showExpiring(container, expiring) {
		setAlert(container);
		var heading = document.createElement('h2');
		heading.textContent = 'Expiring';
		container.appendChild(heading);
		var list = document.createElement('ul');
		for (var i = 0; i < expiring.length; i++) {
			var el = document.createElement('li');
			el.textContent = expiring[i];
			list.appendChild(el);
		}
		
		container.appendChild(list);
	}
	
	var expiring = getExpiring();
	
	var container = document.createElement('div');
	container.className = 'nfpadding';
	if (expiring == null) {
		showError(container);
	} else if (expiring.length == 0) {
		showNoneExpiring(container);
	} else {
		showExpiring(container, expiring);
	}
	
	qcontainer.insertBefore(container, qcontent);
})();
