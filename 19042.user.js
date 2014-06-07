// AutoSave TextAreas
// version 1.1
// 2008-01-03
// Copyright (c) 2008-2012, Cory Johns <johnsca at gmail dot com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools -> Manage User Scripts,
// select "AutoSave TextAreas", and click Uninstall.
//
// Add appropriate @include URL patterns, when installing the script.
// After installation, go to Tools -> Manage User Scripts, select
// "AutoSave TextAreas" to add/edit URL patterns.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           AutoSave TextAreas
// @description    Automatically backup textareas in case of a crash
// @namespace      http://www.thig.com/cjohns/greasemonkey/
// @include        *
// ==/UserScript==
//
// --------------------------------------------------------------------
// 
// To enable/disable automatic backups, right-click on the Greasemonkey
// icon in the status bar, or select Tools -> Greasemonkey, and select
// User Script Commands -> Enable AutoSave TextAreas.  If you later
// return to the page and there is data saved, you will be prompted to
// restore from that data, or you can manually save / restore via the
// User Script Commands menu options.
//
// If you want automatic backups to always be on, change the value of
// AutoSaveByDefault below.  You will probably also want to change
// NotifyOnSave to false in that case, as well as add appropriate
// @include URL patterns.
// 
// --------------------------------------------------------------------


/*******  Begin Configuration Section  *******/

var NotifyOnSave = true;
var AutoSaveByDefault = false;
var AutoSaveInterval = 15000;  // millis
var SaveOnBlur = true;
var SaveOnKeypress = false;
var ClearOnFormSubmit = false; // note: this does not imply *successful* submission
var DataExpiryInterval = daysToMillis( 5 ); // 0 for no expiry

// This option controls how we determine what the "same" page is.
// The default, 'full', is the most restrictive, and the most prone
// to false negatives, especially for pages that have query parameters
// with session IDs in them.  The others, however, are likely to cause
// collisions which overwrite your saved data.  See UrlPatterns below
// to add custom patterns.
var UrlToUse = 'full'; // can be full, noquery, domain, custom1...

var NotificationStyles = {
  border: '1px solid black',
  background: '#e3e2ec',
  color: 'black',
  padding: '1em',
  font: 'bold 8pt Arial',
  height: '2em',
  right: '0',
};

/********  End Configuration Section  ********/













/***********  Begin Setup Section  ***********/

// set up aliases to access globalStorage since we don't have direct access
// to them this requires injecting code into the document, so if scripts are
// blocked, we're SOL
var getGS, setGS, delGS;
if(!setupAliases())
  return;


// Note that the url is compared exactly, so even the query parameters
// changing order can break it.  It may be necessary for some sites to
// reduce the url to only the bare minimum parameters that uniquely
// identify a page, but this can only be done on a page-by-page basis.
var UrlPatterns = {
  full: location,
  noquery: location.protocol+'//'+location.host+location.pathname,
  domain: location.hostname,
  custom1: location.toString().replace(/j?sessionid=[^&;]+/i, ''),
};


var saveNote = new Notification('AutoSaved textareas', {styles: NotificationStyles, increment: 1, autohide: 2000});
var loadNote = new Notification('Restored textareas', {styles: NotificationStyles});
var clearNote = new Notification('Cleared AutoSaved data', {styles: NotificationStyles});
var availNote = new Notification('AutoSaved textarea data available', {
  buttons: {'Restore': doLoad, 'Clear': doClear},
  autohide: 20000,
  styles: NotificationStyles,
  onClose: expireData,
});

GM_registerMenuCommand("Enable AutoSave TextAreas", startTimer);
GM_registerMenuCommand("Disable AutoSave TextAreas", stopTimer);
GM_registerMenuCommand("Save TextAreas Now", doSave);
GM_registerMenuCommand("Restore TextAreas", doLoad);
GM_registerMenuCommand("Clear Saved TextArea Data", doClear);

window.addEventListener('load', promptLoad, false);
window.addEventListener('beforeunload', expireData, false);

/************  End Setup Section  ************/


var AutoSaveIntervalId;
function startTimer() {
  doSave();
  AutoSaveIntervalId = setInterval(doSave, AutoSaveInterval);
}

function stopTimer() {
  clearInterval(AutoSaveIntervalId);
}

function promptLoad() {
  var ta = document.getElementsByTagName('textarea');

  if(getSavedDate())
    availNote.show();

  if(AutoSaveByDefault)
    startTimer();

  if(ClearOnFormSubmit)
    for(var i=0; i<document.forms.length; i++) {
      var form = document.forms[i];
      form._oldFormSubmit = form.submit;
      form.addEventListener('submit', function() { doClear(form) }, false);
      form.submit = function() { doClear(form); form._oldFormSubmit(); };
    }

  if(SaveOnKeypress || SaveOnBlur)
    for(var i=0; i<ta.length; i++) {
      var elem = ta[i];
      if(SaveOnKeypress)
        ta[i].addEventListener('keypress', function() { doSave(elem) }, false);
      if(SaveOnBlur)
        ta[i].addEventListener('blur', function() { doSave(elem) }, false);
    }
}

function expireData() {
  if(!DataExpiryInterval)
    return;

  var now = new Date();
  var then = getSavedDate();

  if(!then) return;

  if((now - then) > DataExpiryInterval)
    doClear();
}

function doLoad() {
  var ta = document.getElementsByTagName('textarea');
  for(var i=0; i<ta.length; i++) {
    var key = getKey(ta, i);
    var val = getGS(key);
    if(val)
      ta[i].value = val;
  }
  loadNote.show();
}

function doSave(elem) {
  if(!elem || !elem.tagName || !elem.getElementsByTagName)
    elem = document;

  var ta = elem.tagName == 'TEXTAREA' ? [elem] : elem.getElementsByTagName('textarea');

  if(ta.length == 0)
    return;

  for(var i=0; i<ta.length; i++) {
    var key = getKey(ta, i);
    setGS(key, ta[i].value);
  }
  setSavedDate(new Date());

  if(NotifyOnSave)
    saveNote.show();
}

function doClear(form) {
  if(!form || form.tagName != 'FORM')
    form = document;

  var ta = form.getElementsByTagName('textarea');

  if(ta.length == 0)
    return;

  for(var i=0; i<ta.length; i++) {
    var key = getKey(ta, i);
    delGS(key);
  }
  clearSavedDate();

  clearNote.show();
}

function daysToMillis(days) {
  return days * 24*60*1000;
}

function firstNE() {
  for(var i=0; i<arguments.length; i++)
    if(arguments[i] !== undefined && arguments[i] !== null && arguments[i] !== '')
      return arguments[i];
}

function getKey(ta, i) {
  var url = UrlPatterns[UrlToUse];
  return url + ';' + firstNE(ta[i].form.id, ta[i].form.action) + '#' + firstNE(ta[i].id, ta[i].name, i);
}

function getSavedDate() {
  var url = UrlPatterns[UrlToUse];
  var lastSaved = getGS(url+';lastSaved');
  if(lastSaved)
    return new Date(lastSaved);
  return null;
}

function setSavedDate(date) {
  var url = UrlPatterns[UrlToUse];
  setGS(url+';lastSaved', date.toString());
}

function clearSavedDate() {
  var url = UrlPatterns[UrlToUse];
  delGS(url+';lastSaved');
}

function embedFunction(name, code) {
  document.body.appendChild(document.createElement('script')).innerHTML = 'var '+name+' = '+code.toString();
}

function setupAliases() {
  // workaround for FF security restriction not allowing "TLDs" aka domains w/o '.'
  var domain = location.hostname + (location.hostname.indexOf('.') == -1 ? '.localdomain' : '');

  embedFunction('domain', '"'+domain+'"');
  embedFunction('getGS', function(key)      { return globalStorage[domain].getItem(key) });
  embedFunction('setGS', function(key, val) { return globalStorage[domain].setItem(key, val) });
  embedFunction('delGS', function(key)      { return globalStorage[domain].removeItem(key) });

  // make sure it worked, i.e. scripts are not blocked
  if(!unsafeWindow.getGS || !unsafeWindow.setGS || !unsafeWindow.delGS)
    return false;

  getGS = unsafeWindow.getGS;
  setGS = unsafeWindow.setGS;
  delGS = unsafeWindow.delGS;
  return true;
}



/**************************  Notification Class  **************************/

function Notification(message, options) {
  // *** Methods ***
  this.init = function(message, options) {
    // set defaults
    this.setOptions({
      note: document.createElement('div'),
      autohide: 3000,
      interval: 1,
      increment: 3,
      side: 'bottom',
      styles: {
        display: 'none',
        position: 'fixed',
        cursor: 'default',
      },
    });

    this.note.innerHTML = message;
    this.setOptions(options);

    this.note.parseUnits = function(style) {
      var match = this.style[style].match(/^(-?\d+(?:\.\d+)?)(.*)/);
      if(!match)
        return {};
      var value = new Number(match[1]);
      var units = match[2];
      return {'value': value, 'units': units};
    };

    document.body.appendChild(this.note);
    this.note.addEventListener('click', this.bound('hide'), false);

    // calculate the amount we need to slide off before we're hidden
    // (this won't work with display: none nor before the element's insert into the DOM)
    this.setStyles({visibility: 'hidden', display: 'block'});
    var dim = (this.side == 'left' || this.side == 'right') ? this.note.clientWidth : this.note.clientHeight;
    this.hidden = -(dim + this.increment);
    this.note.style[this.side] = this.hidden + 'px';
    this.setStyles({visibility: 'visible', display: 'none'});
  };

  this.setStyles = function(styles) {
    if(!this.note) return;
    for(var i in styles)
      this.note.style[i] = styles[i];
  };

  this.setButtons = function(buttons) {
    if(!this.note) return;

    for(var label in this.buttons)
      this.note.removeChild(this.buttons[label]);
    this.buttons = [];

    for(var label in buttons) {
      var button = document.createElement('input');
      button.type = 'button';
      button.value = label;
      button.style.marginLeft = '0.5em';
      button.addEventListener('click', buttons[label], false);
      this.note.appendChild(button);
      this.buttons[label] = button;
    }
  };

  this.setOptions = function(options) {
    for(var opt in options)
      if(opt != 'styles' && opt != 'buttons')
        this[opt] = options[opt];

    if(options.styles)
      this.setStyles(options.styles);

    if(options.buttons)
      this.setButtons(options.buttons);
  };

  this.show = function() {
    this.note.style.display = 'block';

    var slide = this.note.parseUnits(this.side);
    var old = slide.value;
    if(slide.value >= 0) {
      if(this.autohide)
        setTimeout(this.bound('hide'), this.autohide);
      return;
    }
    slide.value += this.increment;
    this.note.style[this.side] = slide.value+slide.units;
    setTimeout(this.bound('show'), this.interval);
  };

  this.hide = function() {
    if(this.note.style.display == 'none') return;

    var slide = this.note.parseUnits(this.side);
    var height = this.note.parseUnits('height');
    if(slide.value <= this.hidden) {
      this.note.style.display = 'none';
      if(this.onClose)
        this.onClose();
      return;
    }

    slide.value -= this.increment;
    this.note.style[this.side] = slide.value+slide.units;

    setTimeout(this.bound('hide'), this.interval);
  };

  this.destroy = function() {
    document.removeElement(this.note);
  };

  this.bound = function(func) {
    var caller = this;
    return function() { caller[func]() };
  };

  // *** Setup ***
  this.init(message, options);
}
