// ==UserScript==
// @name          onPageFavView
// @namespace     http://www.jbouchard.net/chris
// @description	  Open an area under "Favourites: #" with the list of favs
// @include       http://www.deviantart.com/deviation/*
// @include       http://www.deviantart.com/view/*
// ==/UserScript==

// ==UserDefinedSettings==
var maxListed = 40;	// Maximum number of deviants listed.
					// Set to -1 if you always want to view all (may cause slowness and lock-up on pages with many watches...)
// ==/UserDefinedSettings==

(function() {
	function getDeviantPlural(number) {
		if (number == 0) return '<strong>No</strong> deviants';
		if (number == 1) return '<strong>1</strong> deviant';
		else return '<strong>' + number + '</strong> deviants';
	}
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) return;
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	function getDeviationURL(currentURL) {
		if (currentURL.indexOf('/deviation/') > 0) return currentURL;
		else return currentURL.replace(new RegExp('/view/', ''), '/deviation/');
	}
	
	tds = document.getElementsByTagName('td');
 
	for (i = 0; i < tds.length; i++) {
		if (tds[i].className.indexOf('alt1 read') >= 0) {
			descriptTD = tds[i];
			break;
		}
	}
	
	if (descriptTD) {
		descriptTD.innerHTML += '<div style="text-align:center; margin:5px;" id="onPageFavDiv"><img class="category" src="http://s.deviantart.com/icons/misc/loading.gif" /> Loading favourites list...</div>';
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: getDeviationURL(window.location.href) + 'favourites',
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails)
			{
				temp = document.createElement('div');
				temp.innerHTML = responseDetails.responseText;
				
				lis = temp.getElementsByTagName('li');
				if (maxListed < 0) maxListed = lis.length;
				
				for (i = 0; i < Math.min(lis.length, maxListed); i++) {
					lis[i].getElementsByTagName('a')[0].target = '_top';
				}
				
				newUL = document.createElement('ul');
				newUL.className = 'beacon';
				
				
				for (i = 0; i < Math.min(lis.length, maxListed); i++) {
					newUL.innerHTML += '<li class="' + lis[i].className + '">' + lis[i].innerHTML + '</li>';
				}
				
				devTitle = document.getElementsByTagName('h2')[0].innerHTML;
				
				containingDiv = document.getElementById('onPageFavDiv');
				containingDiv.innerHTML = '<br />' + getDeviantPlural(lis.length) + ((lis.length == 1) ? ' has' : ' have') + ' added <strong>' + devTitle + '</strong> to their favourites.' +
											((maxListed < lis.length && maxListed > 0) ? '<br /><span style="font-size:smaller;">(' + maxListed + ' most recent currently shown)</span>' : '') +
											'<br /><br /><ul id="dummy"></ul>';
				containingDiv.style.textAlign = 'left';
				document.getElementById('dummy').parentNode.replaceChild(newUL, document.getElementById('dummy'));
				newUL.style.height = '150px';
				newUL.style.overflow = 'auto';
			}
		});
	}
	else {
		return;
	}
})();