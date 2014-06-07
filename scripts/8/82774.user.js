// ==UserScript==
// @name           Meebo Maximize Space
// @namespace      http://userscripts.org/users/74338
// @include        http://www.meebo.com/popup.html*
// @exclude        
// ==/UserScript==


GM_addStyle("*.uiImTopToolbar, *.uiImFontbar {display:none !important; visibility:hidden !important;}");
GM_addStyle("*.uiImHistory {top: 0px !important;}");

window.IM = {};

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",
            function () {
                window.setTimeout(function () {
                    var content = document.getElementById('content');
                    var divs = content.getElementsByTagName('div');
                    for (var i = 0; i < divs.length; i++) {
                        if (divs[i].className == 'uiImHistory') {                            
                            window.imHistory = divs[i];
							window.IM.x = 0;
							window.IM.y = 0;
							setInterval(checkImHistorySize, 1000);
                            break;
                        }
                    }
                }, 1000);

            }, false);


    document.addEventListener('keypress', function (e) {
        if (e.keyCode == 122 && e.ctrlKey) {
            resizeImHistory();
        }
    }, false);
}


function checkImHistorySize()
{
	if (window.IMisResizing) return;

	window.IMisResizing = true;
	var width = parseInt(window.imHistory.offsetWidth);
	var height = parseInt(window.imHistory.offsetHeight);
	
	if (width  != parseInt(window.IM.x) ||
		height != parseInt(window.IM.y))
	{
		resizeImHistory();
		window.IM.x = parseInt(window.imHistory.offsetWidth);
		window.IM.y = parseInt(window.imHistory.offsetHeight);
	}
	
	window.IMisResizing = false;
}

function resizeImHistory() {
    window.imHistory.style.height = (parseInt(window.imHistory.offsetHeight) + 23 + 30) + 'px';
}