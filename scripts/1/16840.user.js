// ==UserScript==
// @name          Gmail_No_Ads
// @author        Madhusudhan Rao S
// @namespace     http://www.madhusudhan.info/
// @description   Removes the ads that appear on the right when viewing a message/conversation. The messages/reply-box occupy the entire width.
// @include       http*://mail.google.com/mail/*
// ==/UserScript==

window.addEventListener('load', function() {  
	if (unsafeWindow.gmonkey) {
		unsafeWindow.gmonkey.load('1.0', function(_gmail) {
			_gmail.registerViewChangeCallback(function() {
				if (_gmail.getActiveViewType() != 'cv') return;
				var adsArea = _gmail.getConvRhsElement();
				var msgTitle = adsArea.parentNode.previousSibling.previousSibling.getElementsByTagName('h1')[0];
				var msgs = msgTitle.parentNode.nextSibling;
				adsArea.parentNode.parentNode.removeChild(adsArea.parentNode);
				msgTitle.style.cssFloat = 'left';
				msgs.style.clear = 'both';
				msgs.parentNode.parentNode.parentNode.parentNode.style.width = '100%'; 
				Array.forEach(msgs.getElementsByTagName('textarea'), function(textAreas) {
					textAreas.style.width = '98%';
				});
				function moveNewWindowAndPrintToTitle() {
					var newWindowAndPrint = msgTitle.parentNode.appendChild(adsArea.firstChild);
					newWindowAndPrint.style.marginRight = '8px';
					newWindowAndPrint.style.cssFloat = 'left';
					Array.forEach(newWindowAndPrint.getElementsByTagName('div'), function(links) {
						links.style.cssFloat = 'left';
						if (links.firstChild && links.firstChild.nodeName === 'DIV') return;
						links.style.marginLeft = '4px';
						links.style.marginRight = '4px';
					});
				}
			});
		});
	}
}, true);

