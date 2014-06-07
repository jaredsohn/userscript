function usodata_49231() {
// ==UserScript==
// @name           AutoLogin Permanent
// @description    Automatically submits login forms where FF saved your login data from, optionally checking the RememberMe/KeepMeIn checkbox before
// @namespace      http://projects.izzysoft.de/
// @uso:script     49231
// @version        1.1.8
// @include        *
// @require        http://userscripts.org/scripts/source/175299.user.js
// @require        http://userscripts.org/scripts/source/175301.user.js
// @require        http://userscripts.org/scripts/source/51513.user.js
// @history        1.1.8 Switched to the legacy branch of GM_config
// @history        1.1.7 Got rid of the E4X dependency to make the script compatible with FF17+, some more fixes
// @history        1.1.6 Made compatible for FF6 (not sure if it still works w/ older versions)
// ==/UserScript==
}
var GMSU_meta_49231 = usodata_49231.toString();

// This script provides a convenient auto-login. It will:
// - lookout for the checkbox defined for this domain and
//   - check it, if defined
//   - ignore it, if defined as "none"
//   - if not found, take the first checkbox in that form instead
// - lookout for the submit button and "hit" it
//
// Basically, this is a combination of RememberMeNot and AutoLoginJ, where
// most of the code is taken from. Having both in one script makes sure they
// are executed in the right order - amongs other things...

// =======================================[ Translations ]===
var trans = {
 en: {
  'FormValues':     'Form Values',
  'General':        'General',
  'Language':       'Language',
  'LanguageTooltip': 'Language of the configuration interface (change requires reload)',
  'Configuration':  'Configuration',
  'ConfigTitle':    'Settings for AutoLogin Permanent',
  'DomainPwds':     'Domain specific passwords',
  'DomainPwdsTooltip': 'Server and password (or "all") to ignore. One setting per line, separate by space.',
  'GlobalPwds':     'Global passwords',
  'GlobalPwdsTooltip': 'Passwords to ignore for every site. One password per line.',
  'CheckBoxes':     'Checkboxes',
  'CheckBoxesTooltip': 'Server and name of box to (un)check or "none" to skip. One server per line, separate checkbox name by space.',
  'RememberMe':     'Remember Me',
  'RememberMeTooltip': 'Check the box to have it checked, uncheck it to have it unchecked',
  'IgnoreDomains':  'Ignore Domains',
  'IgnoreDomainsTooltip': 'Domains to ignore completely (no form on them will ever be submitted).',
  'UpdateInterval': 'Update Interval',
  'UpdateIntervalTooltip': 'Days between update checks',
  'UpdateNow': 'Check Now',
  'UpdateNowTooltip': 'Click here to check for updates right now',
  'ForceDepCheck': 'Force check of dependencies?',
  'ForceDepCheckTooltip': 'Whether to check for dependency updates even if the main script was not updated'
 },
 de: {
  'General':        'Allgemein',
  'Language':       'Sprache',
  'Configuration':  'Konfiguration',
  'ConfigTitle':    'Einstellungen fuer AutoLogin Permanent',
  'DomainPwds':     'Domain-spezifische Passwoerter',
  'DomainPwdsTooltip': 'zu ignorierende Passwoeter per Server-Name. Ein Server pro Zeile, Passwort mit Leerzeichen getrennt.',
  'GlobalPwds':     'Globale Passwoerter',
  'GlobalPwdsTooltip': 'Passwoerter, die auf jeder Site ignoriert werden sollen. Ein Passwort pro Zeile.',
  'CheckBoxes':     'Checkboxen',
  'CheckBoxesTooltip': 'Name des Servers und der zu (de)markierenden Checkbox ("none" zum Ignorieren der Checkbox fuer diesen Server). Ein Server pro Zeile, Passwort mit Leerzeichen getrennt.',
  'RememberMeTooltip': 'Markieren oder de-markieren der jeweiligen Checkbox?',
  'IgnoreDomains':  'Ignoriere Domains',
  'IgnoreDomainsTooltip': 'Domains, die generell ignoriert werden sollen (hier wird keine Aktion ausgefuehrt).',
  'UpdateIntervalTooltip': 'Tage zwischen Pruefungen auf verfuebare Aktualisierungen',
  'UpdateNow': 'Jetzt pruefen',
  'UpdateNowTooltip': 'Hier klicken, um sofort nach verfuegbaren Updates zu suchen',
  'ForceDepCheck': 'Pruefung der Abhaengigkeiten erzwingen?',
  'ForceDepCheckTooltip': 'Abhaengigkeiten auf Updates pruefen, auch wenn das Haupt-Skript aktuell ist?'
 }
}

gmc = GM_config;
gmc.setTranslations('en',trans.en);
gmc.setTranslations('de',trans.de);
alp_langs = ['de','en'];
if (gmc.gets('language')) gmc.initLocalization(gmc.gets('language'),true);
else gmc.initLocalization('en',true);

// =====================================[ Configuration ]===
gmc.init(gmc.lang('ConfigTitle'),{
 domainPasswords: { section: [gmc.lang('FormValues')], label: gmc.lang('DomainPwds'), title: gmc.lang('DomainPwdsTooltip'),type: 'textarea', cols:65, rows:7, default: ''},
 globalPasswords: { label: gmc.lang('GlobalPwds'), title: gmc.lang('GlobalPwdsTooltip'), type: 'textarea', cols:65, rows:4, default: 'password\nPassword\npass' },
 ignoreDomains: { label: gmc.lang('IgnoreDomains'), title: gmc.lang('IgnoreDomainsTooltip'), type: 'textarea', cols:65, rows:4, default: '' },
 checkBoxes: { label: gmc.lang('CheckBoxes'), title: gmc.lang('CheckBoxesTooltip'), type: 'textarea', cols:65, rows:4, default: 'userstyles.org remember' },
 rememberMe: { label: gmc.lang('RememberMe'), title: gmc.lang('RememberMeTooltip'), type: 'checkbox', default: true },
 language: { section: [gmc.lang('General')], label: gmc.lang('Language'), title: gmc.lang('LanguageTooltip'), type: 'select', options: alp_langs, default: 'en' },
 updateDepCheckForce: { label: gmc.lang('ForceDepCheck'), title: gmc.lang('ForceDepCheckTooltip'), type: 'checkbox', default: false },
 updaterInterval: { label: gmc.lang('UpdateInterval'), title: gmc.lang('UpdateIntervalTooltip'), type: 'int', size:3, default: 7 },
 updateNow: { label: gmc.lang('UpdateNow'), title: gmc.lang('UpdateNowTooltip'), type: 'button', script: 'forcedUpdate()' }
},GM_config.eCSS,{
 open: function() {
  GM_config.localizeButtons();
  GM_config.addBorder();
  GM_config.resizeFrame('75%','550px');
  GM_config.sections2tabs();
  adjustCheckButton();
 }
}
);

var checkboxName = {}, wrongPasswd = {};
for each (var i in gmc.get('checkBoxes').split('\n')) {
  checkboxName[i.split(' ')[0]] = i.split(' ')[1];
}
for each (var i in gmc.get('domainPasswords').split('\n')) {
  wrongPasswd[i.split(' ')[0]] = i.split(' ')[1];
}
var wrongPasswords = gmc.get('globalPasswords').split('\n'),
    rememberMe = gmc.get('rememberMe'),
    ignoreDomains = gmc.get('ignoreDomains').split('\n');

//==============================================[ Helpers ]===
// --------------------------------------[ Forced Update ]---
function forcedUpdate() {
  window.setTimeout(function() {
    GMSU.init(49231,true,GM_config.get('updateDepCheckForce'));
  },0);
}

// simple in_array check (is the item contained in the array?)
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}

// ----------------------------[ Adjust the Purge button ]---
function adjustCheckButton() {
  pb = GM_config.frame.contentDocument.getElementById('field_updateNow');
  pd = GM_config.frame.contentDocument.getElementById('field_updaterInterval');
  pb.parentNode.parentNode.removeChild(pb.parentNode);
  pd.parentNode.appendChild(pb);
  pb.style.position = 'relative';
  pb.style.left = '10px';
}

//==============================================[ Menu ]===
GM_registerMenuCommand('AutoLogin Permanent: ' + gmc.lang('Configuration'),gmc.open);

//=============================================[ Tasks ]===
// ---- Handle the CheckBox ----
function handleCheckBox() {
  var passBox, loginForm, submitBtn, rememberBox;
  passBox = document.evaluate("//input[@type='password']", document,
      null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(passBox){
    loginForm = document.evaluate("ancestor::form", passBox,
        null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // Submit button - input or button
    submitBtn = document.evaluate("//*[@type='submit']", loginForm,
        null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var domain = window.location.host;
    if(checkboxName[domain]){
      if(checkboxName[domain] != "none"){
        rememberBox = loginForm.elements.namedItem(checkboxName[domain]);
      }
    }else{
      rememberBox = document.evaluate("//input[@type='checkbox']", loginForm,
          null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    // (Un)check box
    if ( rememberMe ) {
      if(rememberBox) rememberBox.checked = true;
    } else {
      if(rememberBox && rememberBox.checked) rememberBox.checked = false;
    }
    // Focus the submit button - just in case the second part fails
    if(submitBtn) submitBtn.focus();
  }
}

// ---- Handle FormSubmit ----
function submitFirstPasswordForm() {
  var domain = window.location.host;
  if (in_array(domain,ignoreDomains)) return;
  if (wrongPasswd[domain]=="all") return; // skip disabled domain
  for (var form, i=0; form=document.forms[i]; ++i) {
    var numPasswordElements = 0;
    var filledPasswordElements = 0;
    var submitButton = null;
    var formElement, j;
    var elems = form.elements;

    for (j=0; formElement=form.elements[j]; ++j)
      if (formElement.type == "password") { // we got a password element here
        ++numPasswordElements;
        if (formElement.value // stored password
            && formElement.value != wrongPasswd[domain] // not in exclusion list
            && !in_array(formElement.value,wrongPasswords)  // not a global exclude
            && formElement.value.toLowerCase() != "password") // not default dummy pwd
          ++filledPasswordElements;
      }

    // is it a login form (and not a change-password form or something like that)?
    if (numPasswordElements == 1 && filledPasswordElements == 1) {

      // Care for (Non-)Permanent Login
      handleCheckBox();

      /*
       * The obvious way to submit a login form is form.submit().  However, this doesn't
       * work with some forms, such as the Google AdWords login.  Instead, find a
       * submit button and bonk it.
       */

      // look for a submit button
      for (j=0; formElement=form.elements[j]; ++j)
        if (formElement.type == "submit") {
          submitButton = formElement;
          break;
        }

      // also look for (and prefer) <input type=image>
      // why this extra loop? <input type=image> isn't form[j] for any j
      // (see bug 113197 or http://whatwg.org/specs/web-forms/current-work/#additions)
      for (j=0; formElement=form.getElementsByTagName("input")[j]; ++j)
        if (formElement.type == "image") {
          submitButton = formElement;
          break;
        }

      if (submitButton) {
        // Give a visual indication that we're submitting the login form automatically.
        submitButton.focus();
        submitButton.style.MozOutline = "2px solid purple";

        // Submit the form by calling click() on the submit button.
        submitButton.click();

        // Break out of both loops.
        return;
      }
    }
  }
}

//===============================================[ Main ]===
window.addEventListener(
  "load",
  function() {
    // Use a setTimeout so Firefox's password manager has a chance to fill in the password.
    setTimeout(submitFirstPasswordForm, 0);
  },
  false
);
GMSU.init(49231);
