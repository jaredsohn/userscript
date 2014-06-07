// ==UserScript==
// @name           Redirection Chronos
// @namespace      redirection_chronos
// @description    Sert à afficher la feuille de temps seulement
// @include        http://chronos.grics.qc.ca/Tenterprise/Core/Base/MainFrame2.aspx*
// ==/UserScript==

    function Redirect() {                
		if (document.querySelectorAll('#mainTenroxDivContainer > div > div > div > .bd > iframe')[0] != null) {
            var IframeSrc = document.querySelectorAll('#mainTenroxDivContainer > div > div > div > .bd > iframe')[0];
            document.location = IframeSrc.getAttribute('src');
        } else { 
    		window.setTimeout(Redirect, 500);
    	}
    }
    Redirect();