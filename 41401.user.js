// Copyright (c) 2008 Eric Biven, Owen Barton

// Released under the BSD license:

// http://www.opensource.org/licenses/bsd-license.php

// Based on Based on "GMail Multiple From Address Extensions" by Eric Biven



// ==UserScript==

// @name           GMail from address magic auto-switcher script

// @namespace      grugnog@yahoo.com

// @description    Magically switches from addresses if the part between the @ and the "." is present in any of the to, cc or bcc addresses.

// @require        http://userscripts.org/scripts/source/49700.user.js

// @include        http://mail.google.com/*

// @include        https://mail.google.com/*

// ==/UserScript==


// You can set this variable here instead of using the GM_config setting.
// (this is useful with greasemonkey-for-prism, where GM_config does not save values yet).
warn_override = false


GM_config.init('Configuration for GMail from address magic auto-switcher script',{

  warn: { label: 'Let me know the from address if script can\'t autodetect what address to use?:', type: 'checkbox', default: false }

});

GM_registerMenuCommand('GMail magic from: Configuration', GM_config.open);



var gmail = null;

var lang = new gmail_i18n();



window.addEventListener('load', function() {

  if (unsafeWindow.gmonkey) {

    unsafeWindow.gmonkey.load('1.0', init);

  }

}, true);



function onClick(evt) {

  try {

    if (evt.target.innerHTML == lang.labels.sendButton) {

      // Gmail is ready, we know the user has just clicked send - let's do our stuff.

      var doc = gmail.getActiveViewElement().ownerDocument;
      // Search for a span "link" that shares a parent with a hidden from element.
      var change = doc.evaluate('//input[@type="hidden" and @name="from"]/../span[@role="link"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      // If we got one, and it is actually a "change" link.
      if (change && change.innerHTML == 'change') {
        // Simulate a click event on it.
        var clicker = document.createEvent("MouseEvents");
        clicker.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        change.dispatchEvent(clicker);
      }

      // We should be able to find the from element.

      var from = doc.evaluate('//select[@name="from"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

      // And the various "to" elements.

      var to = doc.evaluate('//textarea[@name="to"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

      var cc = doc.evaluate('//textarea[@name="cc"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

      var bcc = doc.evaluate('//textarea[@name="bcc"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

      // Concatenate them all, since we only care if the string exists, not where.

      found = to + cc + bcc;

      // Set a regular expression to extract the part we want to match.

      // This one extracts "domain" from user@domain.com.

      re = new RegExp('@([^.]*).');

      fromswitched = false;

      // Loop over each possible "from" address.

      for (var i = 0; i < from.options.length; i++) {

        // Extract the part we want, and see if it exists in any of the "to" addresses.

        if (found.indexOf(from.options[i].value.match(re)[1]) != -1) {

          // If so, then we select that from address in the dropdown.

          from.selectedIndex = i;

          // Add a visual cue for the user.

          from.setAttribute('style','color:green;');

          fromswitched = true;

          /* alert('Switched to ' + from.options[i].value); */

        }

      }

      if ((warn_override == true || GM_config.get('warn') == true) && fromswitched == false) {
        // Add a visual cue for the user.

        from.setAttribute('style','color:red;');

        // Give them a chance to fix before sending.

        // Note that we currently don't recheck a second time, or update the button.

        evt.target.innerHTML = lang.strings.fromAddressExtensions_SendAlert.replace('%s%', from.options[from.selectedIndex].value);

        evt.stopPropagation();

        evt.preventDefault();

      }

    }

  }

  catch (ex) { GM_log('2:'+ex.message); }

}



function getCanvas() {

  try {

    // We use mousedown because it occurs just before the click event.

    gmail.getCanvasElement().addEventListener('mousedown', onClick, true);

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

      case 'ca': // CatalÃ 

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

        this.fromAddressExtensions_SendAlert = 'Enviar la email de %s%. Â¿Continuar?';

        break;

      case 'tl': // Filipino

        this.labels.sendButton = 'Ipadala';

        this.fromAddressExtensions_SendAlert = 'Sending email from %s%.  Continue?';

        break;

      case 'fr': // FranÃ§ais

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

      case 'pt-BR': // PortuguÃªs (Brasil)

        this.labels.sendButton = 'Enviar';

        this.fromAddressExtensions_SendAlert = 'Enviar o e-mail de %s%. Continuar?';

        break;

    }

  }

}