// ==UserScript==
// @name Gmail Automatic Cc/Bcc
// @description This greasemonkey script automatically does cc and/or bcc of all your outgoing e-mails to specified addresses.
// @include https://mail.google.com/mail/*
// @include http://mail.google.com/mail/*
// ==/UserScript==

//  Copyright (c) 2009, SHIINO Yuki, All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions
//  are met:
//
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//   3. Neither the name of the authors nor the names of its contributors
//      may be used to endorse or promote products derived from this
//      software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
//  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
//  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
//  A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
//  OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
//  SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
//  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
//  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
//  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function() {  // anonymous namespace

var g_addresses_inited = GM_getValue('addresses_inited', false);
var g_init_setting_asked = false;
var g_should_set_cc = GM_getValue('should_set_cc', false);
var g_should_set_bcc = GM_getValue('should_set_bcc', false);
var g_sample_addresses = 'Alice <alice@example.org>, Bob <bob@example.net>';
var g_cc_addresses = GM_getValue('cc_addresses', g_sample_addresses);
var g_bcc_addresses = GM_getValue('bcc_addresses', g_sample_addresses);

function promptAddresses(cc_or_bcc, default_addresses) {
  var prompt_message = 'Gmail Automatic Cc/Bcc: What addresses would you like to ' +
    cc_or_bcc.toUpperCase() + ' all your outgoing e-mails?';
  do {
    var addresses =  window.prompt(prompt_message, default_addresses);
  } while (addresses == g_sample_addresses);
  return addresses;
}

function initCcBccAddresses() {
  if (g_init_setting_asked || g_addresses_inited)
    return;

  var bcc_addrs = promptAddresses('bcc', g_bcc_addresses);
  var cc_addrs = promptAddresses('cc', g_cc_addresses);
  g_init_setting_asked = true;
  if (cc_addrs == null && bcc_addrs == null) {
    // A user canceled the initial setting.  We will ask a user to set addresses
    // again when a user reloads the page.
    return;
  }

  GM_setValue('cc_addresses', g_cc_addresses = cc_addrs);
  GM_setValue('should_set_cc', g_should_set_cc = cc_addrs ? true : false);
  GM_setValue('bcc_addresses', g_bcc_addresses = bcc_addrs);
  GM_setValue('should_set_bcc', g_should_set_bcc = bcc_addrs ? true : false);
  GM_setValue('addresses_inited', g_addresses_inited = true);
}

function changeCcBccAddresses() {
  var cc_addrs = promptAddresses('cc', g_cc_addresses);
  if (cc_addrs != null) {
    GM_setValue('cc_addresses', g_cc_addresses = cc_addrs);
    GM_setValue('should_set_cc', g_should_set_cc = cc_addrs ? true : false);
  }
  var bcc_addrs = promptAddresses('bcc', g_bcc_addresses);
  if (bcc_addrs != null) {
    GM_setValue('bcc_addresses', g_bcc_addresses = bcc_addrs);
    GM_setValue('should_set_bcc', g_should_set_bcc = bcc_addrs ? true : false);
  }
  if (cc_addrs != null || bcc_addrs != null)
    GM_setValue('addresses_inited', g_addresses_inited = true);
}

// Make a new command so that a user is able to change cc/bcc addresses.
GM_registerMenuCommand('Gmail Automatic Cc/Bcc: Edit cc/bcc addresses', changeCcBccAddresses);

function gmailApiLoaded(gmail) {
  var done_marker = 'Gmail_automatic_cc_and_bcc_done';

  function setCcBccTextArea(dom_root, cc_or_bcc, addresses) {
    var dom_list = document.evaluate('//textarea[@name=\'' + cc_or_bcc + '\']', dom_root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < dom_list.snapshotLength; ++i) {
      var textarea = dom_list.snapshotItem(i);
      if (textarea.value ||
          textarea.className.indexOf(done_marker) != -1)
        continue;

      // Set the addresses.
      textarea.value = addresses;
      // Do not do this again even if a user removed addresses and
      // the textarea became empty.
      textarea.className += ' ' + done_marker;
      // Show up the textarea.
      for (var node = textarea.parentNode;
           node && node.style && node.style.display != 'none';
           node = node.parentNode)
        ;
      if (node && node.style && node.style.display == 'none')
        node.style.display = '';
    }
  }

  function setCcAndBcc(dom_root) {
    initCcBccAddresses();

    if (g_should_set_cc)
      setCcBccTextArea(dom_root, 'cc', g_cc_addresses);
    if (g_should_set_bcc)
      setCcBccTextArea(dom_root, 'bcc', g_bcc_addresses);
  }

  var cv_timer_id = null;  // timer ID for conversation view
  var cv_timer_interval = 1000;  // in msec

  function viewChanged() {
    var view = gmail.getActiveViewType();

    window.clearInterval(cv_timer_id);

    if (view == 'co') {  // compose view
      setCcAndBcc(gmail.getActiveViewElement());
    } else if (view == 'cv') {  // conversation view
      var dom_root = gmail.getActiveViewElement();
      cv_timer_id = window.setInterval(function() {
          setCcAndBcc(dom_root);
        },
        cv_timer_interval);
    }
  }

  gmail.registerViewChangeCallback(viewChanged);
}

function loadGmailGmonkey() {
  if (unsafeWindow && unsafeWindow.gmonkey)
    unsafeWindow.gmonkey.load('1.0', gmailApiLoaded);
}

window.addEventListener('load', loadGmailGmonkey, true);

})();  // anonymous namespace
