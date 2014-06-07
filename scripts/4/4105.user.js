// ==UserScript==
 // @name           ShareBigFile.com-NoWait
 // @namespace      none
 // @description    Kills the lame 15 second delay (supposed to make you view ads)
 // @include http://www.sharebigfile.com/*
 // ==/UserScript==
(
    function() {
	    function doneWaiting() {
            document.getElementById("countbar").style.display = 'none';
            document.getElementById("downloadfile").style.display = '';
    	}

	doneWaiting();

    }
)();






