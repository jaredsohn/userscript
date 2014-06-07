// Copyright (c) 2008 Eric Biven

// Released under the BSD license:

// http://www.opensource.org/licenses/bsd-license.php

//

// ==UserScript==

// @name           GMail Multiple From Address Extensions

// @namespace      http://eric.biven.us/

// @description    Adds functionality during message composition to support multiple from addresses.

// @include        http://mail.google.com/*

// @include        https://mail.google.com/*

// ==/UserScript==



var gmail = null;

var lang = new gmail_i18n();



window.addEventListener('load', function() {

    if (unsafeWindow.gmonkey) {

        unsafeWindow.gmonkey.load('1.0', init);

    }

}, true);



function onClick(evt) {

    try {

        if (evt.target.innerHTML == '<b>' + lang.labels.sendButton + '</b>') {

            var doc = gmail.getActiveViewElement().ownerDocument;

            var ddl = doc.evaluate('//select[@name="from"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

            var send = confirm(lang.strings.fromAddressExtensions_SendAlert.replace('%s%', ddl.options[ddl.selectedIndex].value));

            if (!send) {

                evt.stopPropagation();

                evt.preventDefault();

                return false;

            }

        }

    }

    catch (ex) { GM_log('2:'+ex.message); }

}



function getCanvas() {

    try {

        gmail.getCanvasElement().addEventListener('click', onClick, true);

        lang.init();

    }

    catch (ex) {

        GM_log('3:'+ex.message);

        // This seems like a brutal hack, however the call to getCanvasElement

        // will sometimes fail when the page loads.  If that happens this seems 

        // to resolve it eventually.

        window.location.reload();

    }

}



function init(g) {

    try {

        gmail = g;

        // Calls to the gmail API seem to fail far less often if you wait

        // for a bit to actually start using it.

        window.setTimeout(getCanvas, 500);

    }

    catch (ex) {

        GM_log('1:'+ex.message);

    }

}



function gmail_i18n() {

    /*

     * Define labels as they appear on the standard GMail interface.  You 

     * should only define labels that you will need to interact with in 

     * your code, for instance searching for the string.

     */

    this.labels = new function() {

        this.sendButton = 'Send';

    }

    

    /*

     * Define any strings your application will be emitting.  You should 

     * consider using some sort of script-specific prefix on your property

     * names if they do or are likely to conflict with other scripts.

     */

    this.strings = new function() {

        this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

    }

    

    /*

     * Ensure the documents are completely loaded before calling this function.

     * You should create an instance of the gmail_i18n object first, then call

     * it's init.

     */

    this.init = function() {

        var lang = window.parent.document.getElementsByTagName('html')[0].getAttribute('lang');

        switch (lang) {

            case 'id': // Bahasa Indonesia

                this.labels.sendButton = 'Kirim';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'ms': // Bahasa Melayu

                this.labels.sendButton = 'Hantar';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'ca': // Català

                this.labels.sendButton = 'Envia';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'da': // Dansk

                this.labels.sendButton = 'Send';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'de': // Deutsch

                this.labels.sendButton = 'Senden';

                this.fromAddressExtensions_SendAlert = 'E-Mail von %s% wird versendet. Weiter?';

                break;

            case 'et': // Eesti keel

                this.labels.sendButton = 'Saada';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'en-GB': // English (UK)

                this.labels.sendButton = 'Send';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'en-US': // English (US)

                this.labels.sendButton = 'Send';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'es': // Espanol

                this.labels.sendButton = 'Enviar';

                this.fromAddressExtensions_SendAlert = 'Enviar la email de %s%. ¿Continuar?';

                break;

            case 'tl': // Filipino

                this.labels.sendButton = 'Ipadala';

                this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

                break;

            case 'fr': // Français

                this.labels.sendButton = 'Envoyer';

                this.fromAddressExtensions_SendAlert = "Vous allez envoyer le message avec l'adresse %s%. Continuer?";

                break;

            case 'nl': // Nederlands

                this.labels.sendButton = 'Verzenden';

                this.fromAddressExtensions_SendAlert = 'Email versturen van %s%.  Doorgaan?';

                break;

            case 'it': // Italiano

                this.labels.sendButton = 'Invia';

                this.fromAddressExtensions_SendAlert = "Inviare l'email da %s%. Continuare?";

                break;

            case 'pt-BR': // Português (Brasil)

                this.labels.sendButton = 'Enviar';

                this.fromAddressExtensions_SendAlert = 'Enviar o e-mail de %s%. Continuar?';

                break;

        }

    }

}
