// ==UserScript==
// @name          onPageWatchView
// @namespace     http://www.jbouchard.net/chris
// @description	  Opens the "Watched By" pop-up in the the "Watched By" area.
// @include       http://*.deviantart.com/
// @exclude       http://www.deviantart.com/
// @exclude       http://my.deviantart.com/
// @exclude       http://chat.deviantart.com/
// @exclude       http://forum.deviantart.com/
// @exclude       http://help.deviantart.com/
// ==/UserScript==

// ==UserDefinedSettings==
var maxListed = 20;	// Maximum number of deviants listed.
					// Set to -1 if you always want to view all (may cause slowness and lock-up on pages with many watches...)
// ==/UserDefinedSettings==

(function() {
	function getDeviantPlural(number) {
		if (number == 0) return 'No Deviants';
		if (number == 1) return '1 Deviant';
		else return number + ' Deviants';
	}
	
	uls = document.getElementsByTagName('ul');
 
	for (i = 0; i < uls.length; i++) {
		if (uls[i].className.indexOf('watch') >= 0) {
			watchUL = uls[i];
			break;
		}
	}
	
	if (watchUL) {
		watchUL.innerHTML = '<li><div style="text-align:center;"><img class="icon" src="http://s.deviantart.com/icons/misc/loading.gif" /> Loading watch list...</div></li>';
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: window.location.href + '/friends/',
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
				newUL.className = 'trailing section-block beacon';
				
				for (i = 0; i < Math.min(lis.length, maxListed); i++) {
					newUL.innerHTML += '<li class="' + lis[i].className + '">' + lis[i].innerHTML + '</li>';
				}
				
				watchUL.parentNode.replaceChild(newUL, watchUL);
				newUL.parentNode.getElementsByTagName('h2')[0].innerHTML = '<img class="icon" src="http://i.deviantart.com/icons/userpage/friends.gif" width="19" height="18" alt="" /> Watched By ' + getDeviantPlural(lis.length) +
																			((maxListed < lis.length && maxListed > 0) ? '<br /><span style="font-size:small;">(' + maxListed + ' most recent currently shown)</span>' : '');
				newUL.style.height = '300px';
				newUL.style.overflow = 'auto';
			}
		});
	}
	else {
		return;
	}
})();