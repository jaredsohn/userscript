// ==UserScript==
// @name           Disable Alliance + Leicester Rapport Splash
// @summary        This script will block the irritating alliance and leicester nag screen which tries to get you to install rapport everytime you login
// @namespace      http://gcthompson.co.uk/aandl
// @include        https://www.mybank.alliance-leicester.co.uk/index.asp?ct=mybankrhnlogin&
// ==/UserScript==


    function should_display_splash() {
        return false;
    }


function embedFunction(s) {
document.body.appendChild(document.createElement('script'))
.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

embedFunction(should_display_splash);
