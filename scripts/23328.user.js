// ==UserScript==
// @name           AICN Spaz Filter
// @namespace      http://userscripts.org/users/46206
// @description    Helps prevent Talkback goofs on Ain't It Cool News
// @include        http://www.aintitcool.com/node/* 
// @include        http://www.aintitcool.com/talkback_display/*
// ==/UserScript==
//
// Author          Brand Loyalist 
// Released        Wed 2008-02-27 
// Update          Fri 2008-02-29 
//   Best practices nitpicks with checkBlankness().
//   Improved protection against blank posts in rare case where user unwisely
//   hits back after making a real post but then accidentally submits a blank
//   one (very very spazzy).
// Update          Sat 2008-04-12 
//   "Ready" checkbox showing up in talkback_display's login form (*blush*).
//   Roomier comment textbox.

// -- Declarations -----------------------------------------------------------

var AICNSpazFilter = {};

AICNSpazFilter.init = function () {

  this.subjectFieldMaxlength = 64;
    // Subject length limit enforced by the AICN posting script as evidenced 
    // by the truncated subject lines of countless hapless talkbackers

  this.subjectField = document.getElementById('edit-subject');
  this.commentField = document.getElementById('edit-comment');
  this.submitButton = document.getElementById('edit-submit');
  this.quickTBForm = document.getElementById('quicktalkback-form');
  this.safetyCheckbox = null;
}

AICNSpazFilter.tweakForm = function () {

  if (this.quickTBForm == null) return; // Short trip

  if (this.submitButton != null) {
    // Create the safety checkbox

    this.safetyCheckbox = document.createElement('input');
    this.safetyCheckbox.setAttribute('type','checkbox');
    this.safetyCheckbox.setAttribute('id','aicnspazfilter-safetycheckbox');
    this.safetyCheckbox.addEventListener('click', 
      function () { AICNSpazFilter.submitButton.disabled = !this.checked; },
      false);

    var cblabel = document.createElement('label');
    cblabel.innerHTML='Ready to post';
    cblabel.checked = false;
    cblabel.defaultChecked = false;
    cblabel.setAttribute('for','aicnspazfilter-safetycheckbox');
    cblabel.style.paddingLeft = '0.25em';
    cblabel.style.marginRight = '1em';
    cblabel.style.verticalAlign = 'baseline';

    var sbstyle = document.defaultView.getComputedStyle(this.submitButton,'');
    this.safetyCheckbox.style.marginLeft = sbstyle.marginLeft;
    this.submitButton.style.marginLeft = '0px';
      // The site stylesheet that sets the submit button margin to control its
      // position labels it a hack :) ... uphold hackery with added checkbox

    var pn = this.submitButton.parentNode;
    pn.insertBefore(cblabel,this.submitButton);
    pn.insertBefore(this.safetyCheckbox,cblabel);

    this.submitButton.disabled = true;
  }

  if (this.subjectField != null) {

    this.subjectField.setAttribute('maxlength',this.subjectFieldMaxlength);
      // One particularly cruel aspect of the current Talkback form at AICN is
      // the arbitrary value given to the maxlength attribute (1024!) of the
      // Subject field.  Set it to the real limit during load.

    this.subjectField.addEventListener('keypress',
      // Edits reset the safety; enter in subject advances to body.
      function (evt) { 
        AICNSpazFilter.resetSafety();
        if (evt.keyCode == 13 && AICNSpazFilter.commentField != null)
          AICNSpazFilter.commentField.focus(); 
      },
      false);
  }

  if (this.commentField != null && this.safetyCheckbox != null) {

    this.commentField.addEventListener('keypress',
      // Edits reset the safety
      function (evt) { AICNSpazFilter.resetSafety(); },
      false);
  }

  if ( this.subjectField != null && this.commentField != null) {

    this.origQuickTBAction = this.quickTBForm.action;
    this.quickTBForm.action = 'javascript:void(0);';
      // Neuter the form until after post is confirmed as non-blank.
      // Why this way?  Assigning/inserting an onClick attribute won't work
      // (well-known Greasemonkey limitation); and return values from
      // callbacks attached with addEventListener are ignored -- can't cancel
      // the submit event by returning false.  

    this.quickTBForm.addEventListener('submit', 
      function () { AICNSpazFilter.checkBlankness(); }, 
      false);

    // Embiggen the comment box - encourage huge posts no one will read ;)
    //
    var tbl = this.quickTBForm.parentNode.parentNode.parentNode; // (or tbody)
    var alignrow = tbl.getElementsByTagName('tr')[0];

    if (alignrow) {
      // (Won't help much if things change & can't find the sizing row)
      var aligntds = alignrow.getElementsByTagName('td');
      if (aligntds.length==2) { // (make sure things haven't changed)
        aligntds[0].setAttribute('width','0');
        aligntds[0].style.width = '0px';
        aligntds[1].setAttribute('width','100%');
      }
    }

    this.commentField.setAttribute('rows','8');
    this.commentField.style.width = '75%';
      // Manifesto size

    this.subjectField.style.width = '64ex';
    this.subjectField.style.maxWidth = '75%';
  }
}

AICNSpazFilter.resetSafety = function () {
  if (this.safetyCheckbox != null) {
    this.submitButton.disabled=true;
    this.safetyCheckbox.checked=false;
  }
}

AICNSpazFilter.checkBlankness = function () {
  // Called on submit event
 
  // Completely blank posts are automatically rejected
  //
  var subjecttext = this.subjectField.value;
  var commenttext = this.commentField.value;
  var onlyws = /^\s*$/;
  if (subjecttext.match(onlyws) && commenttext.match(onlyws)) {

    this.quickTBForm.action='javascript:void(0);';
      // Re-neuter the form, just in case: should already be set to this,
      // but if user posts a real post, hits back, and then accidentally
      // posts a blank post, the blank post might not be auto cancelled

    this.resetSafety();

    alert( "Greasemonkey Spaz Filter for AICN active.\n\n"
         + "Blank posts are automatically cancelled.");

    return;
  }

  // Not blank; reverse form's vasectomy and proceed with post 
  //
  this.quickTBForm.action=this.origQuickTBAction;
  this.resetSafety();
    // avoid double posts (won't cancel *current* event)
}

// One last thing to declare: 
// The midichlorian scene in Episode I was blasphemy!


// -- Body -------------------------------------------------------------------

AICNSpazFilter.init();
AICNSpazFilter.tweakForm();

// fin
