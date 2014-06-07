// ==UserScript==
// @name        portfolio_nag
// @namespace   http://userscripts.org
// @description Portfolio.hu Ezt olvasta már? nag
// @include     http://www.portfolio.hu/*
// @run-at      document-start
// @grant       none
// @version     1
// ==/UserScript==

var changed = 0; // script need to be edited with

window.addEventListener('beforescriptexecute', function(e) {

    ///for external script:
	src = e.target.src;
	if (src.search(/bad\.js/) != -1) {
                changed++;
		e.preventDefault();
		e.stopPropagation();
		append(NewScript1);
	};

    ///for inline script:
        if(e.target===document.getElementsByTagName("script")[6]){
            changed++;
            e.stopPropagation();
            e.preventDefault();
            //todo
        }
        //tips: you could also run a regex search for the e.target.innerHTML
        //if the position of the inline script is not fixed.


    ///when done, remove the listener:
	if(changed == 2) window.removeEventListener(e.type, arguments.callee, true);

}, true);