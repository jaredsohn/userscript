// Copyright 2009 Google Inc. All Rights Reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// ==UserScript==
// @name           Favorite Doodle
// @namespace      http://www.google.com/
// @description    Change the Google logo to your favorite Google Doodle.
// @include        http://google.tld/webhp*
// @include        http://www.google.tld/webhp*
// @include        http://google.tld/#*
// @include        http://www.google.tld/#*
// @include        http://google.tld/search*
// @include        http://www.google.tld/search*
// @include        http://google.tld/
// @include        http://www.google.tld/
// @include        http://www.google.com/logos/*
// @include        http://www.google.com/holidaylogos*
// @exclude        http://www.google.com/logos/fan.html
// ==/UserScript==

/**
 * @fileoverview Greasemonkey script that lets you change the Google logo
 * to your favorite Google Doodle. There are several options that you can
 * configure in the Greasemonkey menu. You can choose whether or not you want
 * holiday doodles to override your favorite, you can turn off/on the update
 * checker, and you can go to the doodle gallery to select your favorite doodle.
 */

/**
 * The url of your favorite doodle. To manually change your favorite doodle
 * you can either change the url here or search for [favoritedoodle] in
 * about:config and edit it there. You can also view the doodle gallery by
 * going to 'Choose favorite doodle' in the Greasemonkey script menu.
 * @type {string}
 */
var FD_FAVORITE = GM_getValue('favoritedoodle');
if (!FD_FAVORITE) {
  GM_setValue('favoritedoodle', 'http://www.google.com/logos/lego08.gif');
  FD_FAVORITE = GM_getValue('favoritedoodle');
}

/**
 * This version number is compared to that listed in the latest version file
 * to determine whether an update is available. This should be incremented
 * when updates are made.
 * @type {number}
 */
var FD_VERSION = 1;

/**
 * The directory where the script can be downloaded.
 * @type {string}
 */
var FD_HOME_DIR =
    'https://gmsearchscripts.googlecode.com/files/';

/**
 * The url of the latest version file.
 * @type {string}
 */
var FD_LATEST_VERSION_URL = FD_HOME_DIR + 'latestversion';

/** The url where this script can be found.
 * @type {string}
 */
var FD_DOWNLOAD_LINK = FD_HOME_DIR + 'favoritedoodle.user.js';

/**
 * The name of the script.
 * @type {string}
 */
var FD_SCRIPT_NAME = 'Favorite Doodle';

/**
 * Url of the official Google doodle gallery.
 * @type {string}
 */
var FD_GALLERY_LINK = 'http://www.google.com/logos/';


/**
 * Class for handling updates to this script.
 * @param {string} latestVersionUrl This url has the latest version number.
 * @param {string} downloadLink Url of the latest version.
 * @param {number} currentVersion The current version.
 * @param {string} scriptName Name of this script.
 * @constructor
 */
function FD_Updater(latestVersionUrl,
                    downloadLink,
                    currentVersion,
                    scriptName) {
  /**
   * The current date.
   * @type {!Date}
   * @private
   */
  this.now_ = new Date();

  var lastCheck = parseInt(GM_getValue('lastcheck', '0'));

  /**
   * The date that we last checked for updates.
   * @type {!Date}
   * @private
   */
  this.lastCheck_ = lastCheck > 0 ? new Date(lastCheck) : new Date(0);

  /**
   * The url of the latest version file.
   * @type {string}
   * @private
   */
  this.latestVersionUrl_ = latestVersionUrl;

  /**
   * The url where this script can be found.
   * @type {string}
   * @private
   */
  this.downloadLink_ = downloadLink;

  /**
   * The version number of the script that we have.
   * @type {number}
   * @private
   */
  this.currentVersion_ = currentVersion;

  /**
   * The name of this script.
   * @type {string}
   * @private
   */
  this.scriptName_ = scriptName;

  // Adds a menu option that allows user to turn off/on the update notification.
  var menuText = scriptName +
      (GM_getValue('checkForUpdates', true) ?
       ' -> Never check for updates' : ' -> Check for updates daily');

  GM_registerMenuCommand(menuText, function() {
      GM_setValue('checkForUpdates', !GM_getValue('checkForUpdates', true));
      window.location.reload();
  });
}

/**
 * Message to display when an update is available.
 * @type {string}
 */
FD_Updater.UPDATE_MSG = 'An update is available!';

/**
 * One day in milleseconds.
 * @type {number}
 */
FD_Updater.DAY_IN_MS = 86400000;

/**
 * Checks for a new version if it's been a day since the last check.
 */
FD_Updater.prototype.checkForUpdates = function() {
  // Don't check if update notification is turned off or if we already checked
  // in the last day.
  if ((!GM_getValue('checkForUpdates', true)) ||
      (this.now_ - this.lastCheck_ < FD_Updater.DAY_IN_MS)) {
    return;
  }
  var updaterObject = this;
  // Checks if a newer version is available.
  GM_xmlhttpRequest({
      method: 'GET',
      url: this.latestVersionUrl_,
      onload: function(details) {
        GM_setValue('lastcheck', updaterObject.now_.getTime().toString());
        if (parseFloat(details.responseText) > updaterObject.currentVersion_) {
          updaterObject.displayNewVersion();
        }
      }
  });
};

/**
 * Displays notification that a new version is available and provides a link.
 */
FD_Updater.prototype.displayNewVersion = function() {
  var doc = document;
  var div = doc.createElement('div');
  div.style.cssText = 'position: fixed; bottom: 0px; right: 0px; ' +
                      'color: white; background: #cc0000; padding: 4px';
  div.appendChild(doc.createTextNode(this.scriptName_));
  div.appendChild(doc.createElement('br'));
  var a = doc.createElement('a');
  a.href = this.downloadLink_;
  a.appendChild(doc.createTextNode(FD_Updater.UPDATE_MSG));
  div.appendChild(a);
  doc.body.appendChild(div);
};


/**
 * Class for controlling the doodle that is shown.
 * @constructor
 */
function FD_Controller() {
  /**
   * Whether the user wants to let holiday doodles override their favorite.
   * @type {boolean}
   * @private
   */
  this.showNewDoodles_ = GM_getValue('show_new_doodles', true);

  var controller = this;
  // Add menu options for changing preferences.
  var menuText = FD_SCRIPT_NAME + ' -> ' +
      (this.showNewDoodles_ ?
          FD_Controller.ALWAYS_SHOW : FD_Controller.OVERRIDE);
  GM_registerMenuCommand(menuText, controller.toggleOverride);
  // Add a menu option for viewing different logos.
  menuText = FD_SCRIPT_NAME + ' -> Choose favorite doodle';
  GM_registerMenuCommand(menuText, function() {
    window.location.href = FD_GALLERY_LINK;
  });
}

/**
 * Menu text to always show my favorite doodle.
 * @type {string}
 */
FD_Controller.ALWAYS_SHOW = 'Always show my favorite doodle, even on holidays';

/**
 * Menu text to override my favorite doodle on holidays.
 * @type {string}
 */
FD_Controller.OVERRIDE = 'Override my favorite doodle on holidays';

/**
 * Toggles the user preference for allowing holiday doodles to override
 * their favorite.
 */
FD_Controller.prototype.toggleOverride = function() {
  GM_setValue('show_new_doodles',
              !GM_getValue('show_new_doodles', true));
  window.location.reload();
};

/**
 * Triggers an image swap if needed based on user preferences.
 */
FD_Controller.prototype.customizeLogo = function() {
  var doc = document;
  // Firt check to see if the logo element exists. This needs to happen first
  // because in most cases the logo element doesn't exist yet. Note that after
  // the logo swap is completed there is no longer an element with the id logo,
  // so this also prevents us from swapping repeatedly.
  var logo = doc.getElementById('logo');
  if (!logo) {
    return;
  }

  var resize = false;
  var holidayToday = false;
  // See if the current page is the search results page.
  if (window.location.href.search(/q=/) != -1) {
    // Ensures that the page has finished loading before we check styles.
    if (!doc.getElementById('xjsi')) {
      return;
    }
    resize = true;
    var styleArray = doc.getElementsByTagName('style');
    var styleArrayLength = styleArray.length;
    for (var i = 0; i < styleArrayLength; ++i) {
      if (styleArray[i].innerHTML.search(/logos/) != -1) {
        holidayToday = true;
      }
    }
  } else if (logo && (logo.src && logo.src.search(/logos/) != -1) ||
             (logo.style && logo.style.background.search(/logos/) != -1)) {
    // Current page is homepage.
    holidayToday = true;
  }

  if ((holidayToday && !this.showNewDoodles_) || !holidayToday) {
    this.swap(logo, resize);
  }
};

/**
 * Swaps in our replacement logo for the logoElement.
 * @param {Element} logoElement The element of the logo we want to replace.
 * @param {boolean} small Whether we are replacing the small sized logo.
 */
FD_Controller.prototype.swap = function(logoElement, small) {
  if (!logoElement) {
    return;
  }
  // Make an element for our special doodle.
  var doc = document;
  var customLogo = doc.createElement('a');
  customLogo.href = FD_GALLERY_LINK;
  customLogo.title = 'Go to Doodle Gallery';
  var image = doc.createElement('img');
  image.src = FD_FAVORITE;
  image.border = 0;
  if (small) {
    image.height = 50;
  }
  customLogo.appendChild(image);
  // Replace the logo with our doodle.
  logoElement.parentNode.replaceChild(customLogo, logoElement);
};


/**
 * Class for adding an interface on the doodle gallery page to
 * select a favorite doodle.
 * @constructor
 */
function FD_DoodleGallery() {
  // Find all the doodle images on the page.
  var doc = document;
  var images = doc.getElementsByTagName('img');
  var imagesLength = images.length;
  for (var i = 0; i < imagesLength; ++i) {
    var currentImage = images[i];
    if ('http://www.google.com/logos/' == currentImage.src.substring(0, 28)) {
      // Add a button under each doodle image.
      var divElement = doc.createElement('div');
      var formElement = doc.createElement('form');
      formElement.style.textAlign = 'center';
      var buttonElement = doc.createElement('input');
      buttonElement.type = 'button';
      buttonElement.value = 'Make This My Favorite Doodle!';
      buttonElement.id = 'save_' + currentImage.src;

      var thisObject = this;
      buttonElement.addEventListener('click',
                                     (function(url) {
                                       return function() {
                                         thisObject.save(url);
                                       }
                                     })(currentImage.src),
                                     true);
      divElement.appendChild(formElement);
      formElement.appendChild(buttonElement);
      currentImage.parentNode.insertBefore(formElement,
                                           currentImage.nextSibling);
    }
  }
}

/**
 * Saves the new favorite doodle.
 * @param {string} doodleUrl Url of the new favorite doodle.
 */
FD_DoodleGallery.prototype.save = function(doodleUrl) {
  GM_setValue('favoritedoodle', doodleUrl);
  FD_FAVORITE = doodleUrl;
  // Redirect to the Google homepage.
  window.location.href = 'http://google.com';
};


// GM_getValue and GM_setValue were the latest api functions added.
// This script will not work without them.
if (!GM_getValue) {
  alert ('Favorite Doodle script requires Greasemonkey version 0.3 or higher.');
} else {
  // Handles update notification.
  var FD_updateController = new FD_Updater(FD_LATEST_VERSION_URL,
                                           FD_DOWNLOAD_LINK,
                                           FD_VERSION,
                                           FD_SCRIPT_NAME);
  FD_updateController.checkForUpdates();

  if ((window.location.href.substring(0, 28) ==
       'http://www.google.com/logos/') ||
      (window.location.href.substring(0, 34) ==
       'http://www.google.com/holidaylogos')) {
    // Current page is the doodle gallery page.
    var FD_doodleGallery = new FD_DoodleGallery();
  } else {
    // Current page is either homepage or search results page.
    var FD_controller = new FD_Controller();
    FD_controller.customizeLogo();
    FD_callback = function() { FD_controller.customizeLogo(); };
    // The logo customizing function depends on the logo element existing
    // on the page already. Since some versions of the search results page
    // add DOM elements gradually we need to listen for these events and
    // try to customize the logo after each event.
    window.addEventListener('DOMNodeInserted', FD_callback, true);
  }
}
