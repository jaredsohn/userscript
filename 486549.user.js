// ==UserScript==
// @name       Nacion Paywall Remover Pro
// @namespace  http://www.nacion.com/
// @version    2.0
// @description  Remueve el panel de registro obligatorio de los sitios del Grupo Nacion (La Nacion, Al Dia, El Financiero y Yuplon). Version PRO: unico que funciona en todos los sitios y elimina el panel de registro TOTALMENTE antes que la pagina sea desplegada.
// @include http://*.nacion.com/*
// @include http://*.aldia.cr/*
// @include http://*.elfinancierocr.com/*
// @include http://*.yuplon.com/*
// @run-at document-start
// @copyright  2014+, Jonathan Calderon
// ==/UserScript==
    
    function addGlobalStyle(css) {
        
        var head = document.getElementsByTagName('head')[0];
        
        if (!head) { return; }
        
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        
        head.appendChild(style);
    }

    addGlobalStyle('\
        #LNA_background, #LNA_contenidoTotal,\n\
        #ADI_background, #ADI_contenidoTotal,\n\
        #EFI_background, #EFI_contenidoTotal,\n\
        #mail_lightbox_background, #mail_lightbox\n\
        { display:none !important; }\
    ');
