// Copyright (c) 2008 Eric Biven

// Released under the BSD license:

// http://www.opensource.org/licenses/bsd-license.php

//

// $Rev: 23 $

//

// ==UserScript==

// @name           GMail Internationalization Object (i18n)

// @namespace      http://eric.biven.us/

// @description    This is an internationalization (i18n) object for GMail Greasemonkey scripts.  It is of no use as a script by itself and is meant for inclusion in other scripts by authors.

// @include        http://mail.google.com/*

// @include        https://mail.google.com/*

// ==/UserScript==



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



/*



Languages defined in the gmail drop-down

id = Bahasa Indonesia

ms = Bahasa Melayu

ca = Català

da = Dansk

de = Deutsch

et = Eesti keel

en-GB = English (UK)

en = English (US)

es = Español

tl = Filipino

fr = Français

hr = Hrvatski

it = Italiano

is = Íslenska

lv = Latvieu

lt = Lietuviu;

hu = Magyar

nl = Nederlands

no = Norsk (Bokmål)

pl = Polski

pt-BR = Português (Brasil)

pt-PT = Português (Portugal)

ro = Româna(

sk = Slovenský

sl = Slovenc(ina

fi = Suomi

sv = Svenska

vi = Tie^'ng Vie^.t

tr = Türkçe

cs = C(eský

el = ????????

ru = ???????

sr = ??????

uk = ??????????

bg = ?????????

iw = Hebrew

ur = Urdu

ar = Arabic

mr = ?????

hi = ??????

bn = ?????

gu = ???????

or = ???? (Oriya)

ta = ?????

te = ??????

kn = ?????

ml = ??????

th = ???????

zh-TW = ??(??)

zh-CN = ??(??)

ja = ???

ko = ???



*/
