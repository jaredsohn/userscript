// ==UserScript==
// @name          Javadoc Search Frame
// @namespace     http://userscripts.org/users/46156
// @description   Javadoc incremental search for packages and classes
// @copyright     2012, Steven G. Brown (http://code.google.com/p/javadoc-search-frame)
// @copyright     2006, KOSEKI Kengo (http://www.teria.com/~koseki/tools/gm/javadoc_isearch/index.html)
// @license       MIT License; http://www.opensource.org/licenses/mit-license.php
// @version       1.5
// @include       */allclasses-frame.html
// @include       */allclasses-frame.html#JavadocSearchFrameOptions
// @include       */package-frame.html
// @include       */package-frame.html#JavadocSearchFrameOptions
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// ==/UserScript==

/**
 * The MIT License
 *
 * Copyright (c) 2008 Steven G. Brown
 *
 * The initial (24th February 2008) release was a fork of the Javadoc
 * Incremental Search user script version 0.5 available at
 * http://www.teria.com/~koseki/tools/gm/javadoc_isearch/index.html
 * Copyright (c) 2006 KOSEKI Kengo
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */


/**
 * Entry point of this script; called when the script has loaded.
 */
function main() {

  if (document.location.hash === '#JavadocSearchFrameOptions') {
    OptionsPageGenerator.generate();
    return;
  }

  // Version of this script. This value is set by the build script.
  var version = '1.5';

  var startupLogMessage =
      '\nJavadoc Search Frame ' + version + ' (Greasemonkey User Script)\n' +
      'http://code.google.com/p/javadoc-search-frame\n' +
      navigator.userAgent + '\n';

  try {
    GM_log(startupLogMessage);
  } catch (ex) {
    console.log(startupLogMessage);
  }

  Storage.get(Option.HIDE_PACKAGE_FRAME, function(hidePackageFrame) {
    if (hidePackageFrame) {
      Frames.hideAllPackagesFrame();
    }
    init(hidePackageFrame);
  });
}


// Call the main method once the rest of the script has executed.
window.setTimeout(main, 0);

var messages =
    // remainder of file added by the build script


{
  "extName": {
    "message": "Javadoc Search Frame",
    "description": "Extension name."
  },
  "extDescription": {
    "message": "Javadoc incremental search for packages and classes.",
    "description": "Extension description."
  },
  "optionsAnchor": {
    "message": "Options",
    "description": "Label used for the options page anchor."
  },
  "helpAnchor": {
    "message": "Help",
    "description": "Label used for the help anchor."
  },
  "optionsTitle": {
    "message": "Options: Javadoc Search Frame",
    "description": "Title of the options page."
  },
  "autoOpenOptionTitle": {
    "message": "Open the top search result",
    "description": "Title of the options page section used to configure the auto-open option."
  },
  "autoOpenOptionOn": {
    "message": "Automatically after each search",
    "description": "Label displayed for the button to turn on the auto-open option."
  },
  "autoOpenOptionOff": {
    "message": "When the Enter key is pressed",
    "description": "Label displayed for the button to turn off the auto-open option."
  },
  "mergeFramesOptionTitle": {
    "message": "Page layout",
    "description": "Title of the options page section used to configure the merge frames option."
  },
  "mergeFramesOptionOn": {
    "message": "Merge the package list and class list",
    "description": "Label displayed next to the button to turn on the merge frames option."
  },
  "mergeFramesOptionOff": {
    "message": "Use separate frames for packages and classes",
    "description": "Label displayed next to the button to turn off the merge frames option."
  },
  "menuOptionTitle": {
    "message": "Menu displayed by pressing the @ key",
    "description": "Title of the options page section used to configure the menus."
  },
  "classOrMethodMenuOptionDescription": {
    "message": "When the top search result is a class or method:",
    "description": "Label for the class/method menu configuration."
  },
  "packageMenuOptionDescription": {
    "message": "When the top search result is a package:",
    "description": "Label for the package menu configuration."
  },
  "restoreDefault": {
    "message": "Restore Default",
    "description": "Label displayed on the buttons that reset a menu option to the default value."
  },
  "saveChanges": {
    "message": "Save Changes",
    "description": "Label displayed on the buttons that save a new value for an option."
  },
  "optionsReadOnly": {
    "message": "This browser does not support changing the options.",
    "description": "Error message displayed when the options cannot be configured."
  }
}

/*
 * ----------------------------------------------------------------------------
 * Messages
 * ----------------------------------------------------------------------------
 */


/**
 * @class Provides localised strings.
 */
Messages = {};


/**
 * Retrieve a localised string.
 * @param {string} key The key used to lookup the localised string.
 * @return {string} The localised string.
 */
Messages.get = function(key) {
  return messages[key].message;
};

/*
 * ----------------------------------------------------------------------------
 * Storage
 * ----------------------------------------------------------------------------
 */


/**
 * @class Provides storage functionality.
 */
Storage = {};


/**
 * @return {boolean} Whether storage is supported by this browser.
 */
Storage.isSupported = function() {
  return Storage._canGet() && Storage._canSet();
};


/**
 * @return {boolean} Whether retrieval of stored data is supported.
 */
Storage._canGet = function() {
  try {
    return Boolean(GM_getValue) &&
        GM_getValue('test', 'defaultValue') === 'defaultValue';
  } catch (ex) {
    return false;
  }
};


/**
 * Retrieve the current value of an option.
 * @param {Option} option the Option to retrieve.
 * @param {function(*)} callback Callback function that is provided with the
 *     value of this option. If the option cannot be retrieved, or has not yet
 *     been configured, then the default value will be returned.
 */
Storage.get = function(option, callback) {
  var value = undefined;
  if (Storage._canGet()) {
    value = GM_getValue(option.key);
    if (option.type === Boolean) {
      value = '' + value;
      value = (option.defaultValue ? value !== 'false' : value === 'true');
    }
  }
  if (value === undefined || value === null) {
    value = option.defaultValue;
  } else {
    var version = GM_getValue(option.key + '_version', '1.4.6');
    value = option.upgrade(value, version);
  }
  callback(value);
};


/**
 * @return {boolean} Whether modification of stored data is supported.
 */
Storage._canSet = function() {
  try {
    return Boolean(GM_setValue);
  } catch (ex) {
    return false;
  }
};


/**
 * Set an option to a new value.
 * @param {Option} option The option to configure.
 * @param {*} value The new value.
 * @throws An exception if this option cannot be set.
 */
Storage.set = function(option, value) {
  GM_setValue(option.key, value);
  var version = '1.5'; // The version number is set by the build script.
  GM_setValue(option.key + '_version', version);
};


/*
 * ----------------------------------------------------------------------------
 * Option
 * ----------------------------------------------------------------------------
 */



/**
 * Option which can be configured to change the behaviour of the script.
 * @param {{key: string, defaultValue: string, type,
 *        upgrade: function(string, string)}} properties The option properties.
 * @constructor
 */
Option = function(properties) {
  this.key = properties.key;
  this.defaultValue = properties.defaultValue;
  this.type = properties.type;
  this.upgrade = properties.upgrade;
};


/**#@+
 * Option recognised by this script.
 */


/**
 * @type {Option}
 */
Option.AUTO_OPEN = new Option({
  key: 'auto_open',
  defaultValue: false,
  type: Boolean,
  upgrade: function(value, lastSavedVersion) {
    return value;
  }
});


/**
 * @type {Option}
 */
Option.HIDE_PACKAGE_FRAME = new Option({
  key: 'hide_package_frame',
  defaultValue: true,
  type: Boolean,
  upgrade: function(value, lastSavedVersion) {
    return value;
  }
});


/**
 * @type {Option}
 */
Option.PACKAGE_MENU = new Option({
  key: 'package_menu',
  defaultValue:
      '@1:search(Ohloh) -> http://code.ohloh.net/?s=##PACKAGE_NAME##\n' +
      '@2:search(Docjar) -> http://www.docjar.com/s.jsp?q=##PACKAGE_NAME##',
  type: String,
  upgrade: function(value, lastSavedVersion) {
    return this._upgradeMenuOption(value, lastSavedVersion);
  }
});


/**
 * @type {Option}
 */
Option.CLASS_MENU = new Option({
  key: 'class_menu',
  defaultValue:
      '@1:search(Ohloh) -> http://code.ohloh.net/' +
      '?s=##PACKAGE_NAME##+##CLASS_NAME##+##MEMBER_NAME##\n' +
      '@2:search(Docjar) -> http://www.docjar.com/s.jsp?q=##CLASS_NAME##\n' +
      '@3:source(Docjar) -> http://www.docjar.com/html/api/' +
      '##PACKAGE_PATH##/##CLASS_NAME##.java.html\n' +
      '@4:search(grepcode) -> http://grepcode.com/' +
      'search/?query=##PACKAGE_NAME##.##CLASS_NAME##.##MEMBER_NAME##',
  type: String,
  upgrade: function(value, lastSavedVersion) {
    value = this._upgradeMenuOption(value, lastSavedVersion);
    if (lastSavedVersion === '1.4.6' && value.indexOf('grepcode') === -1) {
      for (var i = 1; i < 10; i++) {
        if (value.indexOf('@' + i + ':') === -1) {
          value += '\n@' + i + ':search(grepcode) -> http://grepcode.com/' +
                   'search/?query=' +
                   '##PACKAGE_NAME##.##CLASS_NAME##.##MEMBER_NAME##';
          break;
        }
      }
    }
    return value;
  }
});

/**#@-
 */


/**
 * Upgrade a configured menu option. This function performs the changes which
 * are used to upgrade both the class menu and package menu.
 * @param {string} value The current value of the option.
 * @param {string} lastSavedVersion The last version of the script to save the
 *                 option.
 * @return {string} The new value.
 */
Option.prototype._upgradeMenuOption = function(value, lastSavedVersion) {
  if (lastSavedVersion === '1.4.6') {
    if (value.indexOf('->') === -1) {
      value = this.defaultValue;
    } else {
      value = value.replace('search(koders)', 'search(Ohloh)');
      value = value.replace('//www.koders.com/', '//code.ohloh.net/');
    }
  }
  return value;
};


/*
 * ----------------------------------------------------------------------------
 * Frames
 * ----------------------------------------------------------------------------
 */


/**
 * @class Provides functions to interact with other frames.
 */
Frames = {};


/**
 * Hide the packages frame. If the packages frame does not exist, calling this
 * function will have no effect.
 */
Frames.hideAllPackagesFrame = function() {
  var framesets = parent.document.getElementsByTagName('frameset');
  if (framesets) {
    var frameset = framesets[1];
    var framesetChildren = frameset.children;
    if (framesetChildren && framesetChildren[0].name === 'packageListFrame') {
      frameset.setAttribute('rows', '0,*');
      frameset.setAttribute('border', 0);
      frameset.setAttribute('frameborder', 0);
      frameset.setAttribute('framespacing', 0);
    }
  }
};


/**
 * Open the given URL in the summary frame. If the summary frame is not
 * displayed, the URL will not be opened.
 * @param {string} url The URL to open.
 */
Frames.openLinkInSummaryFrame = function(url) {
  if (window.top !== window) {
    window.open(url, 'classFrame');
  }
};


/**
 * Open the given URL in the summary frame. If the summary frame is not
 * displayed, the URL will be opened in a new tab or window.
 * @param {string} url The URL to open.
 */
Frames.openLinkInSummaryFrameOrNewTab = function(url) {
  if (window.top !== window) {
    window.open(url, 'classFrame');
  } else {
    Frames.openLinkInNewTab(url);
  }
};


/**
 * Open the given URL in a new tab.
 * @param {string} url The URL to open.
 */
Frames.openLinkInNewTab = function(url) {
  window.open(url);
};

/*
 * ----------------------------------------------------------------------------
 * OptionsPage
 * ----------------------------------------------------------------------------
 */


/**
 * @class Options page.
 */
OptionsPage = {};


/**
 * Open the options page.
 */
OptionsPage.open = function() {
  window.open(location + '#JavadocSearchFrameOptions');
};

/*
 * ----------------------------------------------------------------------------
 * HttpRequest
 * ----------------------------------------------------------------------------
 */



/**
 * Asynchronously loads resources from external URLs.
 * @constructor
 */
HttpRequest = function() {
  this.xmlHttpRequest = null;
  this.url = null;
  this.loadedResource = null;
  this.bytesDownloaded = 0;
  this.errorMessage = null;
  this.progressCallback = null;
};


/**
 * Loads the resource at the given URL. If the resource at the given URL is
 * already being loaded, calling this function will have no effect.
 * @param {string} url The URL.
 * @param {function()} progressCallback Function that is called when whenever
 *     progress has been made towards loading the resource.
 */
HttpRequest.prototype.load = function(url, progressCallback) {
  if (this.url === url) {
    // Already loading the resource at this URL.
    return;
  }
  this.abort();
  this.url = url;
  this.progressCallback = progressCallback;
  var thisObj = this;
  try {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onprogress = function(e) {
      thisObj._onprogress(e);
    };
    xmlHttpRequest.open('GET', url);
    xmlHttpRequest.onload = function(e) {
      thisObj._onload(e);
    };
    xmlHttpRequest.onerror = function(e) {
      thisObj._onerror(e);
    };
    xmlHttpRequest.overrideMimeType('text/plain; charset=x-user-defined');
    xmlHttpRequest.send(null);
  } catch (ex) {
    thisObj._onexception(ex);
  }
  this.xmlHttpRequest = xmlHttpRequest;
};


/**
 * @return {boolean} Whether the loading is complete.
 */
HttpRequest.prototype.isComplete = function() {
  return this.loadedResource !== null;
};


/**
 * @return {string} A status message on the progress made towards loading the
 *     resource.
 */
HttpRequest.prototype.getStatusMessage = function() {
  if (this.bytesDownloaded === -1) {
    return this.errorMessage;
  }
  if (this.bytesDownloaded > 1048576) {
    return 'loading... (' + Math.floor(this.bytesDownloaded / 1048576) + ' MB)';
  }
  if (this.bytesDownloaded > 1024) {
    return 'loading... (' + Math.floor(this.bytesDownloaded / 1024) + ' kB)';
  }
  if (this.bytesDownloaded > 0) {
    return 'loading... (' + this.bytesDownloaded + ' bytes)';
  }
  return 'loading...';
};


/**
 * @return {string} The loaded resource, or null if the loading is not
 *     complete.
 */
HttpRequest.prototype.getResource = function() {
  return this.loadedResource;
};


/**
 * Abort the current anchor load operation.
 */
HttpRequest.prototype.abort = function() {
  if (this.xmlHttpRequest) {
    this.xmlHttpRequest.abort();
  }
  this.xmlHttpRequest = null;
  this.url = null;
  this.loadedResource = null;
  this.bytesDownloaded = 0;
  this.errorMessage = null;
  this.progressCallback = null;
};


/**
 * @param {Event} e The progress event.
 */
HttpRequest.prototype._onprogress = function(e) {
  this.bytesDownloaded = e.position;
  this.errorMessage = null;
  this.progressCallback();
};


/**
 * @param {Event} e The load event.
 */
HttpRequest.prototype._onload = function(e) {
  this.loadedResource = this.xmlHttpRequest.responseText;
  this.progressCallback();
};


/**
 * @param {Event} e The error event.
 */
HttpRequest.prototype._onerror = function(e) {
  this.bytesDownloaded = -1;
  this.errorMessage = 'ERROR';
  this.progressCallback();
};


/**
 * @param {*} ex The exception.
 */
HttpRequest.prototype._onexception = function(ex) {
  this.bytesDownloaded = -1;
  this.errorMessage = ex;
  this.progressCallback();
};

/*
 * ----------------------------------------------------------------------------
 * OptionsPageGenerator
 * ----------------------------------------------------------------------------
 */


/**
 * @class Options page generator.
 */
OptionsPageGenerator = {};


/**
 * Generate the options page by replacing the current document.
 */
OptionsPageGenerator.generate = function() {
  document.title = Messages.get('optionsTitle');

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }

  var contents = OptionsPageGenerator._createContents(document);
  contents.forEach(function(pageElement) {
    document.body.appendChild(pageElement);
  });
};


/**
 * Create the contents of the options page.
 * @param {Document} pageDocument The options page document.
 * @return {Array.<Element>} The contents of the options page.
 */
OptionsPageGenerator._createContents = function(pageDocument) {
  var contents = [];
  var optionsTitleElement = OptionsPageGenerator._text(
      pageDocument, 'h1', Messages.get('optionsTitle'));
  optionsTitleElement.setAttribute('style', 'font-family: sans-serif; ' +
      'font-weight:normal; font-size:1.5em; margin-bottom:0.2em');
  contents.push(optionsTitleElement);
  contents.push(pageDocument.createElement('hr'));
  contents.push(pageDocument.createElement('p'));
  if (!Storage.isSupported()) {
    contents.push(
        OptionsPageGenerator._createOptionsCannotBeConfiguredErrorMessage(
            pageDocument));
    contents.push(pageDocument.createElement('p'));
  }
  contents.push(OptionsPageGenerator._title(
      pageDocument, Messages.get('autoOpenOptionTitle')));
  contents.push(OptionsPageGenerator._booleanOption(
      pageDocument, Option.AUTO_OPEN,
      'autoOpen',
      Messages.get('autoOpenOptionOn'),
      Messages.get('autoOpenOptionOff')));
  contents.push(pageDocument.createElement('p'));
  contents.push(OptionsPageGenerator._title(
      pageDocument, Messages.get('mergeFramesOptionTitle')));
  contents.push(OptionsPageGenerator._booleanOption(
      pageDocument, Option.HIDE_PACKAGE_FRAME,
      'hidePackageFrame',
      Messages.get('mergeFramesOptionOn'),
      Messages.get('mergeFramesOptionOff')));
  contents.push(pageDocument.createElement('p'));
  contents.push(OptionsPageGenerator._title(
      pageDocument, Messages.get('menuOptionTitle')));
  contents.push(OptionsPageGenerator._menuOption(
      pageDocument, Messages.get('classOrMethodMenuOptionDescription'),
      Option.CLASS_MENU));
  contents.push(pageDocument.createElement('p'));
  contents.push(OptionsPageGenerator._menuOption(
      pageDocument, Messages.get('packageMenuOptionDescription'),
      Option.PACKAGE_MENU));
  return contents;
};


/**
 * @param {Document} pageDocument The options page document.
 * @param {string} elementType The type of element to create.
 * @param {string} text The text content of the element.
 * @return {Element} The text element.
 */
OptionsPageGenerator._text = function(pageDocument, elementType, text) {
  var labelElement = pageDocument.createElement(elementType);
  labelElement.textContent = text;
  labelElement.setAttribute('style', 'font-family: sans-serif');
  return labelElement;
};


/**
 * @param {Document} pageDocument The options page document.
 * @param {string} title The title text.
 * @return {Element} An element that displays the title for an option.
 */
OptionsPageGenerator._title = function(pageDocument, title) {
  var titleElement = OptionsPageGenerator._text(pageDocument, 'h2', title);
  titleElement.setAttribute('style', 'font-family: sans-serif; ' +
      'font-weight:normal; font-size:1.3em; margin-top:1em');
  return titleElement;
};


/**
 * @param {Document} pageDocument The options page document.
 * @return {Element} An error message element.
 */
OptionsPageGenerator._createOptionsCannotBeConfiguredErrorMessage = function(
    pageDocument) {
  var errorMessageElement = pageDocument.createElement('p');
  errorMessageElement.innerHTML = Messages.get('optionsReadOnly');
  errorMessageElement.style.color = 'red';
  return errorMessageElement;
};


/**
 * @param {Document} pageDocument The options page document.
 * @param {Option} option A boolean option.
 * @param {string} name The option name, used to name the form elements.
 * @param {string} trueText The message to display when the option is true.
 * @param {string} falseText The message to display when the option is false.
 * @return {Element} An element that allows the option to be configured.
 */
OptionsPageGenerator._booleanOption = function(
    pageDocument, option, name, trueText, falseText) {

  var trueRadioButtonElement = OptionsPageGenerator._radioButton(
      pageDocument, option, name, true);
  var trueLabelElement = OptionsPageGenerator._text(
      pageDocument, 'label', '   ' + trueText);
  var falseRadioButtonElement = OptionsPageGenerator._radioButton(
      pageDocument, option, name, false);
  var falseLabelElement = OptionsPageGenerator._text(
      pageDocument, 'label', '   ' + falseText);

  Storage.get(option, function(value) {
    var radioButtonToCheck =
        value ? trueRadioButtonElement : falseRadioButtonElement;
    radioButtonToCheck.setAttribute('checked', true);

    var clickEventListener = function() {
      Storage.set(option, trueRadioButtonElement.checked);
    };

    trueRadioButtonElement.addEventListener(
        'click', clickEventListener, false);
    falseRadioButtonElement.addEventListener(
        'click', clickEventListener, false);
  });

  var blockElement = pageDocument.createElement('div');
  blockElement.setAttribute('style', 'margin-left:20px');
  if (option.defaultValue) {
    blockElement.appendChild(trueRadioButtonElement);
    blockElement.appendChild(trueLabelElement);
    blockElement.appendChild(pageDocument.createElement('p'));
    blockElement.appendChild(falseRadioButtonElement);
    blockElement.appendChild(falseLabelElement);
  } else {
    blockElement.appendChild(falseRadioButtonElement);
    blockElement.appendChild(falseLabelElement);
    blockElement.appendChild(pageDocument.createElement('p'));
    blockElement.appendChild(trueRadioButtonElement);
    blockElement.appendChild(trueLabelElement);
  }
  return blockElement;
};


/**
 * @param {Document} pageDocument The options page document.
 * @param {Option} option A boolean option.
 * @param {string} name The name to display on the radio button.
 * @param {boolean} checked Whether to check the radio button.
 * @return {Element} A radio button element used to display the boolean option.
 */
OptionsPageGenerator._radioButton = function(
    pageDocument, option, name, checked) {
  var radioButtonElement = pageDocument.createElement('input');
  radioButtonElement.setAttribute('type', 'radio');
  radioButtonElement.setAttribute('name', name);
  radioButtonElement.setAttribute('value', checked);
  if (!Storage.isSupported()) {
    radioButtonElement.disabled = true;
  }
  return radioButtonElement;
};


/**
 * @param {Document} pageDocument The options page document.
 * @param {string} description A description of the option.
 * @param {Option} option A menu option.
 * @return {Element} An element that allows the option to be configured.
 */
OptionsPageGenerator._menuOption = function(pageDocument, description, option) {
  var restoreDefaultButtonElement = pageDocument.createElement('input');
  restoreDefaultButtonElement.setAttribute('type', 'button');
  restoreDefaultButtonElement.setAttribute('value',
      Messages.get('restoreDefault'));
  restoreDefaultButtonElement.disabled = true;

  var saveButtonElement = pageDocument.createElement('input');
  saveButtonElement.setAttribute('type', 'button');
  saveButtonElement.setAttribute('value', Messages.get('saveChanges'));
  saveButtonElement.disabled = true;

  var textAreaElement = pageDocument.createElement('textarea');
  textAreaElement.setAttribute('rows', 5);
  textAreaElement.setAttribute('cols', 100);
  textAreaElement.setAttribute('wrap', 'off');
  textAreaElement.disabled = true;

  Storage.get(option, function(value) {
    textAreaElement.value = value;

    if (Storage.isSupported()) {
      var savedValue = value;

      var updateEnabled = function() {
        var hasDefault = (textAreaElement.value === option.defaultValue);
        restoreDefaultButtonElement.disabled = hasDefault;
        var hasSaved = (textAreaElement.value === savedValue);
        saveButtonElement.disabled = hasSaved;
      };

      var save = function() {
        Storage.set(option, textAreaElement.value);
        savedValue = textAreaElement.value;
        updateEnabled();
      };

      restoreDefaultButtonElement.addEventListener('click', function() {
        textAreaElement.value = option.defaultValue;
        save();
      }, false);

      saveButtonElement.addEventListener('click', save, false);

      textAreaElement.addEventListener('input', updateEnabled, false);
      updateEnabled();

      textAreaElement.disabled = false;
    }
  });

  var blockElement = pageDocument.createElement('div');
  blockElement.setAttribute('style', 'margin-left:20px');
  blockElement.appendChild(OptionsPageGenerator._text(
      pageDocument, 'span', description));
  blockElement.appendChild(pageDocument.createElement('p'));
  blockElement.appendChild(restoreDefaultButtonElement);
  blockElement.appendChild(saveButtonElement);
  blockElement.appendChild(pageDocument.createElement('br'));
  blockElement.appendChild(textAreaElement);
  return blockElement;
};


/*
 * ----------------------------------------------------------------------------
 * Global variables
 * ----------------------------------------------------------------------------
 */


/**
 * Array of all package and class links.
 * @type {Array.<PackageLink|ClassLink>}
 */
var ALL_PACKAGE_AND_CLASS_LINKS = [];


/**
 * The window URL (cached).
 * @type {string}
 */
var LOCATION_HREF = location.href;



/*
 * ----------------------------------------------------------------------------
 * LinkType
 * ----------------------------------------------------------------------------
 */



/**
 * Package, class, class member and keyword link types.
 * @param {string} singularName The singular name of the link type.
 * @param {string} pluralName The plural name of the link type.
 * @constructor
 */
LinkType = function(singularName, pluralName) {
  this.singularName = singularName;
  this.pluralName = pluralName;
};


/**
 * @return {string} The singular name of this type.
 */
LinkType.prototype.getSingularName = function() {
  return this.singularName;
};


/**
 * @return {string} The plural name of this type.
 */
LinkType.prototype.getPluralName = function() {
  return this.pluralName;
};


/**
 * @return {string} A string representation of this type.
 */
LinkType.prototype.toString = function() {
  return this.singularName;
};


/**
 * Package link type.
 */
LinkType.PACKAGE = new LinkType('Package', 'Packages');


/**
 * Interface link type.
 */
LinkType.INTERFACE = new LinkType('Interface', 'Interfaces');


/**
 * Class link type.
 */
LinkType.CLASS = new LinkType('Class', 'Classes');


/**
 * Enum link type.
 */
LinkType.ENUM = new LinkType('Enum', 'Enums');


/**
 * Exception link type.
 */
LinkType.EXCEPTION = new LinkType('Exception', 'Exceptions');


/**
 * Error link type.
 */
LinkType.ERROR = new LinkType('Error', 'Errors');


/**
 * Annotation link type.
 */
LinkType.ANNOTATION = new LinkType('Annotation', 'Annotation Types');


/**
 * Class member link type.
 */
LinkType.CLASS_MEMBER = new LinkType('Method or Field', 'Methods and Fields');


/**
 * Keyword link type.
 */
LinkType.KEYWORD = new LinkType('Keyword', 'Keywords');


/**
 * Get the link type with the given singular name.
 * @param {string} singularName The singular name.
 * @return {LinkType} The link type.
 */
LinkType.getByName = function(singularName) {
  return LinkType[singularName.toUpperCase()];
};


/*
 * ----------------------------------------------------------------------------
 * PackageLink, ClassLink, MemberLink and KeywordLink
 * ----------------------------------------------------------------------------
 */


/**
 * Extract a URL from the given link.
 * @param {PackageLink|ClassLink|MemberLink|KeywordLink} link The link.
 * @return {string} The URL.
 */
function extractUrl(link) {
  var html = link.getHtml();
  // Assume that the HTML starts with <A HREF="..."
  var firstQuoteIndex = html.indexOf('"');
  var secondQuoteIndex = html.indexOf('"', firstQuoteIndex + 1);
  return html.substring(firstQuoteIndex + 1, secondQuoteIndex);
}


/**
 * Convert the given relative URL to an absolute URL.
 * @param {string} relativeUrl The relative URL.
 * @param {string=} opt_documentUrl The document's current URL, given by
 *     location.href (optional).
 * @return {string} The absolute URL.
 */
function toAbsoluteUrl(relativeUrl, opt_documentUrl) {
  var colonIndex = relativeUrl.indexOf(':');
  if (colonIndex != -1 && colonIndex < relativeUrl.indexOf('/')) {
    // Already an absolute URL.
    return relativeUrl;
  }
  if (!opt_documentUrl) {
    opt_documentUrl = LOCATION_HREF;
  }
  var documentUrlPath = opt_documentUrl.substring(
      0, opt_documentUrl.lastIndexOf('/') + 1);
  var relativeUrlPath = relativeUrl.substring(
      0, relativeUrl.lastIndexOf('/') + 1);
  if (endsWith(documentUrlPath, relativeUrlPath)) {
    documentUrlPath = documentUrlPath.substring(
        0, documentUrlPath.length - relativeUrlPath.length);
  }
  return documentUrlPath + relativeUrl;
}



/**
 * Link to a package. These links are of type {LinkType.PACKAGE}.
 * @param {string} packageName The package name.
 * @constructor
 */
PackageLink = function(packageName) {
  this.packageName = packageName;
  this.html = '<A HREF="' + packageName.replace(/\./g, '/') +
      '/package-summary.html" target="classFrame">' + packageName + '</A>';
};


/**
 * Determine whether this link matches the given regular expression.
 * @param {RegExp} regex The regular expression.
 * @return {boolean} Whether this link is a match.
 */
PackageLink.prototype.matches = function(regex) {
  return regex.test(this.packageName);
};


/**
 * @return {string} This link in HTML format.
 */
PackageLink.prototype.getHtml = function() {
  return this.html;
};


/**
 * @return {LinkType} The type of this link.
 */
PackageLink.prototype.getType = function() {
  return LinkType.PACKAGE;
};


/**
 * @return {string} The name of this package.
 */
PackageLink.prototype.getPackageName = function() {
  return this.packageName;
};


/**
 * @return {string} The URL of this link.
 */
PackageLink.prototype.getUrl = function() {
  return toAbsoluteUrl(extractUrl(this));
};


/**
 * Equals function.
 * @param {*} obj The object with which to compare.
 * @return {boolean} Whether this link is equal to the given object.
 */
PackageLink.prototype.equals = function(obj) {
  return obj instanceof PackageLink &&
      this.packageName === obj.packageName;
};


/**
 * @return {string} A string representation of this link.
 */
PackageLink.prototype.toString = function() {
  return this.packageName;
};



/**
 * Link to a class. These links are of type {LinkType.INTERFACE},
 * {LinkType.CLASS}, {LinkType.ENUM}, {LinkType.EXCEPTION}, {LinkType.ERROR} or
 * {LinkType.ANNOTATION}.
 * @param {LinkType} type The type of this link.
 * @param {string} packageName The package name.
 * @param {string} className The class name.
 * @constructor
 */
ClassLink = function(type, packageName, className) {
  this.type = type;
  this.className = className;
  this.canonicalName = packageName + '.' + className;

  this.innerClassNames = [];
  var name = className;
  while (true) {
    var index = name.indexOf('.');
    if (index === -1) {
      break;
    }
    name = name.substring(index + 1);
    this.innerClassNames.push(name);
  }

  var url = toAbsoluteUrl(packageName.replace(/\./g, '/') + '/' + className +
      '.html');
  var typeInHtml = type;
  if (type === LinkType.EXCEPTION || type === LinkType.ERROR) {
    typeInHtml = LinkType.CLASS;
  }
  var openingTag = '';
  var closingTag = '';
  if (type === LinkType.INTERFACE) {
    openingTag = '<I>';
    closingTag = '</I>';
  }
  this.html = '<A HREF="' + url + '" title="' +
      typeInHtml.getSingularName().toLowerCase() + ' in ' + packageName +
      '" target="classFrame">' + openingTag + className + closingTag +
      '</A>&nbsp;[&nbsp;' + packageName + '&nbsp;]';
};


/**
 * Determine whether this link matches the given regular expression.
 * @param {RegExp} regex The regular expression.
 * @return {boolean} Whether this link is a match.
 */
ClassLink.prototype.matches = function(regex) {
  return regex.test(this.className) || regex.test(this.canonicalName) ||
      this.innerClassNames.some(function(innerClassName) {
        return regex.test(innerClassName);
      });
};


/**
 * @return {string} This link in HTML format.
 */
ClassLink.prototype.getHtml = function() {
  return this.html;
};


/**
 * @return {LinkType} The type of this link.
 */
ClassLink.prototype.getType = function() {
  return this.type;
};


/**
 * @return {string} The simple name of this class.
 */
ClassLink.prototype.getClassName = function() {
  return this.className;
};


/**
 * @return {string} The name of the package that contains this class.
 */
ClassLink.prototype.getPackageName = function() {
  return this.canonicalName.substring(
      0, this.canonicalName.length - this.className.length - 1);
};


/**
 * @return {string} The canonical name of this class.
 */
ClassLink.prototype.getCanonicalName = function() {
  return this.canonicalName;
};


/**
 * @return {string} The URL of this link.
 */
ClassLink.prototype.getUrl = function() {
  return toAbsoluteUrl(extractUrl(this));
};


/**
 * Equals function.
 * @param {*} obj The object with which to compare.
 * @return {boolean} Whether this link is equal to the given object.
 */
ClassLink.prototype.equals = function(obj) {
  return obj instanceof ClassLink &&
      this.type === obj.type &&
      this.className === obj.className &&
      this.canonicalName === obj.canonicalName;
};


/**
 * @return {string} A string representation of this link.
 */
ClassLink.prototype.toString = function() {
  return this.canonicalName;
};



/**
 * Link to a method or field of a class.
 * @param {string} baseUrl The base URL of this link.
 * @param {string} name The method or field name.
 * @constructor
 */
MemberLink = function(baseUrl, name) {
  this.name = name;
  this.html = '<A HREF="' + baseUrl + '#' + name +
      '" target="classFrame" class="anchorLink">' +
      name.replace(/ /g, '&nbsp;') + '</A><BR/>';
};


/**
 * Determine whether this link matches the given regular expression.
 * @param {RegExp} regex The regular expression.
 * @return {boolean} Whether this link is a match.
 */
MemberLink.prototype.matches = function(regex) {
  return regex.test(this.name);
};


/**
 * @return {string} This link in HTML format.
 */
MemberLink.prototype.getHtml = function() {
  return this.html;
};


/**
 * @return {LinkType} The type of this link.
 */
MemberLink.prototype.getType = function() {
  return LinkType.CLASS_MEMBER;
};


/**
 * @return {string} The URL of this link.
 */
MemberLink.prototype.getUrl = function() {
  return extractUrl(this);
};


/**
 * @return {string} The name of this class member.
 */
MemberLink.prototype.getName = function() {
  if (this.name.indexOf('(') !== -1) {
    return this.name.substring(0, this.name.indexOf('('));
  } else {
    return this.name;
  }
};



/**
 * Keyword link found on a package or class page.
 * @param {string} baseUrl The base URL of this link.
 * @param {string} name The keyword name.
 * @constructor
 */
KeywordLink = function(baseUrl, name) {
  this.name = name;
  this.html = '<A HREF="' + baseUrl + '#' + name +
      '" target="classFrame" class="anchorLink" style="color:#666">' +
      name.replace(/ /g, '&nbsp;') + '</A><BR/>';
};


/**
 * Determine whether this link matches the given regular expression.
 * @param {RegExp} regex The regular expression.
 * @return {boolean} Whether this link is a match.
 */
KeywordLink.prototype.matches = function(regex) {
  return regex.test(this.name);
};


/**
 * @return {string} This link in HTML format.
 */
KeywordLink.prototype.getHtml = function() {
  return this.html;
};


/**
 * @return {LinkType} The type of this link.
 */
KeywordLink.prototype.getType = function() {
  return LinkType.KEYWORD;
};


/**
 * @return {string} The URL of this link.
 */
KeywordLink.prototype.getUrl = function() {
  return extractUrl(this);
};


/*
 * ----------------------------------------------------------------------------
 * View
 * ----------------------------------------------------------------------------
 */


/**
 * @class View Provides access to the UI elements of the frame containing the
 *     search field.
 */
View = {
  searchField: null,
  contentNodeParent: null,
  contentNode: null
};


/**
 * Access key that will focus on the search field when activated ('s').
 * This access key can be activated by pressing either Alt+s or Alt+Shift+s,
 * depending on the internet browser.
 * @type {string}
 */
View.searchAccessKey = 's';


/**
 * Access key that will clear the search field when activated ('a').
 * This access key can be activated by pressing either Alt+a or Alt+Shift+a,
 * depending on the internet browser.
 * @type {string}
 */
View.eraseAccessKey = 'a';


/**
 * Initialise the search field frame.
 * @param {EventHandlers} eventHandlers The event handlers.
 */
View.initialise = function(eventHandlers) {
  View._create(eventHandlers);
};


/**
 * Set the HTML contents of the area below the search field.
 * @param {string} contents The HTML contents.
 */
View.setContentsHtml = function(contents) {
  var newNode = View.contentNode.cloneNode(false);
  newNode.innerHTML = contents;
  View.contentNodeParent.replaceChild(newNode, View.contentNode);
  View.contentNode = newNode;
};


/**
 * Set the value displayed in the search field.
 * @param {string} value The value to display.
 */
View.setSearchFieldValue = function(value) {
  if (View.searchField.value !== value) {
    View.searchField.value = value;
  }
};


/**
 * @return {string} The current value displayed in the search field.
 */
View.getSearchFieldValue = function() {
  return View.searchField.value;
};


/**
 * Give focus to the search field.
 */
View.focusOnSearchField = function() {
  View.searchField.focus();
};


/**
 * Clear the search field.
 */
View.clearSearchField = function() {
  Query.update('');
  View.focusOnSearchField();
  Search.performIfSearchStringHasChanged();
};


/**
 * Create the view elements and add them to the current document.
 * @param {EventHandlers} eventHandlers The event handlers.
 */
View._create = function(eventHandlers) {
  var tableElement = document.createElement('table');
  var tableRowElementOne = document.createElement('tr');
  var tableDataCellElementOne = document.createElement('td');
  var tableRowElementTwo = document.createElement('tr');
  var tableDataCellElementTwo = document.createElement('td');

  View.searchField = View._createSearchField(eventHandlers);
  var webKitBrowser = RegExp(' AppleWebKit/').test(navigator.userAgent);
  if (View.searchField.type === 'text' || !webKitBrowser) {
    // Three cases:
    // 1) WebKit browsers, e.g. Google Chrome and Safari, will display an
    //    erase button on type="search" input fields once some text has been
    //    entered into the field. Do not manually add an erase button.
    // 2) If searchType.type === 'text', this is a pre-HTML5 browser that is
    //    unaware of the search type. Manually add an erase button.
    // 3) HTML5-aware versions of Mozilla Firefox will report that
    //    searchType.type is 'search', but will not change the behaviour of the
    //    field. Manually add an erase button.
    var eraseButton = View._createEraseButton(eventHandlers);
  }
  var optionsLink = View._createOptionsLink(eventHandlers);
  var helpLink = View._createHelpLink(eventHandlers);
  View.contentNodeParent = tableRowElementTwo;
  View.contentNode = tableDataCellElementTwo;

  tableElement.appendChild(tableRowElementOne);
  tableRowElementOne.appendChild(tableDataCellElementOne);
  tableDataCellElementOne.appendChild(View.searchField);
  if (eraseButton) {
    tableDataCellElementOne.appendChild(eraseButton);
  }
  tableDataCellElementOne.appendChild(document.createElement('br'));
  tableDataCellElementOne.appendChild(optionsLink);
  var nbsp = '\u00A0';
  tableDataCellElementOne.appendChild(document.createTextNode(nbsp + nbsp));
  tableDataCellElementOne.appendChild(helpLink);
  tableElement.appendChild(tableRowElementTwo);
  tableRowElementTwo.appendChild(tableDataCellElementTwo);

  [tableElement, tableRowElementOne, tableDataCellElementOne,
   tableRowElementTwo, tableDataCellElementTwo].forEach(function(element) {
    element.style.border = '0';
    element.style.width = '100%';
  });

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  document.body.appendChild(tableElement);
};


/**
 * @param {EventHandlers} eventHandlers The event handlers.
 * @return {Element} The search field element.
 */
View._createSearchField = function(eventHandlers) {
  var searchField = document.createElement('input');
  searchField.setAttribute('type', 'search');
  searchField.setAttribute('spellcheck', 'false');
  searchField.setAttribute('autofocus', 'true');
  searchField.addEventListener('keyup', eventHandlers.searchFieldKeyup, false);
  searchField.addEventListener(
      'keydown', eventHandlers.searchFieldKeydown, false);
  searchField.addEventListener(
      'input', eventHandlers.searchFieldChanged, false);
  searchField.addEventListener('focus', eventHandlers.searchFieldFocus, false);
  if (View.searchAccessKey) {
    searchField.setAttribute('accesskey', View.searchAccessKey);
  }
  return searchField;
};


/**
 * @param {EventHandlers} eventHandlers The event handlers.
 * @return {Element} The erase button element.
 */
View._createEraseButton = function(eventHandlers) {
  var eraseButton = document.createElement('input');
  eraseButton.setAttribute('type', 'image');
  eraseButton.setAttribute('src', 'data:image/gif;base64,' +
      'R0lGODlhDQANAJEDAM%2FPz%2F%2F%2F%2F93d3UpihSH5BAEAAAMALAAAAAANAA0AAAI' +
      'wnCegcpcg4nIw2sRGDZYnBAWiIHJQRZbec5XXEqnrmXIupMWdZGCXlAGhJg0h7lAAADs%' +
      '3D');
  eraseButton.setAttribute('style', 'margin-left: 2px');
  eraseButton.addEventListener('click', eventHandlers.eraseButtonClick, false);
  if (View.eraseAccessKey) {
    eraseButton.setAttribute('accesskey', View.eraseAccessKey);
  }
  return eraseButton;
};


/**
 * @param {EventHandlers} eventHandlers The event handlers.
 * @return {Element} The options page link element.
 */
View._createOptionsLink = function(eventHandlers) {
  var anchorElement = document.createElement('a');
  anchorElement.setAttribute('href', 'javascript:void(0);');
  anchorElement.textContent = Messages.get('optionsAnchor');
  anchorElement.addEventListener(
      'click', eventHandlers.optionsLinkClicked, false);
  var fontElement = document.createElement('font');
  fontElement.setAttribute('size', '-2');
  fontElement.appendChild(anchorElement);
  return fontElement;
};


/**
 * @param {EventHandlers} eventHandlers The event handlers.
 * @return {Element} The help link element.
 */
View._createHelpLink = function(eventHandlers) {
  var anchorElement = document.createElement('a');
  anchorElement.setAttribute('href', 'javascript:void(0);');
  anchorElement.textContent = Messages.get('helpAnchor');
  anchorElement.addEventListener(
      'click', eventHandlers.helpLinkClicked, false);
  var fontElement = document.createElement('font');
  fontElement.setAttribute('size', '-2');
  fontElement.appendChild(anchorElement);
  return fontElement;
};


/*
 * ----------------------------------------------------------------------------
 * Query
 * ----------------------------------------------------------------------------
 */


/**
 * @class Query Constructs the text entered into the search field into a search
 *     query.
 */
Query = {
  packageOrClassSearchString: '',
  memberOrKeywordSearchString: null,
  menuSearchString: null,
  timeoutId: null
};


/**
 * @return {string} The portion of the search query that relates to the
 *     packages and classes search.
 */
Query.getPackageOrClassSearchString = function() {
  return Query.packageOrClassSearchString;
};


/**
 * @return {string} The portion of the search query that relates to the class
 *     members and keywords search.
 */
Query.getMemberOrKeywordSearchString = function() {
  return Query.memberOrKeywordSearchString;
};


/**
 * @return {string} The portion of the search query that relates to the
 *     package menu or class menu.
 */
Query.getMenuSearchString = function() {
  return Query.menuSearchString;
};


/**
 * @return {string} The entire search query.
 */
Query.getEntireSearchString = function() {
  var searchString = Query.packageOrClassSearchString;
  if (Query.memberOrKeywordSearchString !== null) {
    searchString += '#';
    searchString += Query.memberOrKeywordSearchString;
  }
  if (Query.menuSearchString !== null) {
    searchString += '@';
    searchString += Query.menuSearchString;
  }
  return searchString;
};


/**
 * Update this query based on the contents of the search field.
 * @param {string} searchFieldContents The contents of the search field.
 */
Query.update = function(searchFieldContents) {
  Query._processInput(searchFieldContents);

  /*
   * Update the view on a timer (see r204) as a workaround for a Webkit bug:
   * https://bugs.webkit.org/show_bug.cgi?id=34374
   *
   * This workaround is no longer necessary since at least Google Chrome
   * 12.0.742.112 and Safari 5.1.
   *
   * However, it shouldn't be removed, because the script may be running under
   * an older version of Safari. This isn't a problem for Google Chrome, which
   * will only install extensions that are compatible with the browser version.
   */
  if (Query.timeoutId !== null) {
    window.clearTimeout(Query.timeoutId);
  }
  Query.timeoutId = window.setTimeout(function() {
    Query._updateView.apply(Query);
  }, 0);
};


/**
 * Process the search field input.
 * @param {string} searchFieldContents The contents of the search field.
 */
Query._processInput = function(searchFieldContents) {
  var searchString;
  if (Query.menuSearchString !== null) {
    searchString = Query.packageOrClassSearchString;
    if (Query.memberOrKeywordSearchString !== null) {
      searchString += '#' + Query.memberOrKeywordSearchString;
    }
    if (searchFieldContents.indexOf('@') !== -1) {
      searchString += searchFieldContents;
    }
  } else if (Query.memberOrKeywordSearchString !== null) {
    searchString = Query.packageOrClassSearchString + searchFieldContents;
  } else {
    searchString = searchFieldContents;
  }

  var tokens = [];
  var splitOnPrefix;
  ['@', '#'].forEach(function(prefix) {
    if (searchString.indexOf(prefix) !== -1) {
      splitOnPrefix = searchString.split(prefix, 2);
      tokens.push(splitOnPrefix[1]);
      searchString = splitOnPrefix[0];
    } else {
      tokens.push(null);
    }
  });

  Query.packageOrClassSearchString = searchString;
  Query.memberOrKeywordSearchString = tokens[1];
  Query.menuSearchString = tokens[0];
};


/**
 * Update the view.
 */
Query._updateView = function() {
  var fieldValue = Query.getEntireSearchString();
  ['#', '@'].forEach(function(prefix) {
    if (fieldValue.indexOf(prefix) !== -1) {
      fieldValue = prefix + fieldValue.split(prefix, 2)[1];
    }
  });

  View.setSearchFieldValue(fieldValue);
};


/*
 * ----------------------------------------------------------------------------
 * RegexLibrary
 * ----------------------------------------------------------------------------
 */


/**
 * @class RegexLibrary Library of regular expressions used by this script.
 */
RegexLibrary = {};


/**
 * Create and return a function that will take a {PackageLink}, {ClassLink},
 * {MemberLink} or {KeywordLink} as an argument and return whether that link
 * matches the given search string.
 * @param {string} searchString The search string.
 * @return {function(PackageLink|ClassLink|MemberLink|KeywordLink): boolean}
 *     The condition function.
 */
RegexLibrary.createCondition = function(searchString) {
  if (searchString.length === 0 || searchString === '*') {
    return function(link) {
      return true;
    };
  }

  var pattern = RegexLibrary._getRegex(searchString);

  return function(link) {
    return link.matches(pattern);
  };
};


/**
 * Create and return a function that will take a {PackageLink}, {ClassLink},
 * {MemberLink} or {KeywordLink} as an argument and return whether that link
 * is a case-sensitive exact match for the given search string.
 * @param {string} searchString The search string.
 * @return {function(PackageLink|ClassLink|MemberLink|KeywordLink): boolean}
 *     The condition function.
 */
RegexLibrary.createCaseInsensitiveExactMatchCondition = function(searchString) {
  return RegexLibrary._createExactMatchCondition(searchString, false);
};


/**
 * Create and return a function that will take a {PackageLink}, {ClassLink},
 * {MemberLink} or {KeywordLink} as an argument and return whether that link
 * is a case-sensitive exact match for the given search string.
 * @param {string} searchString The search string.
 * @return {function(PackageLink|ClassLink|MemberLink|KeywordLink): boolean}
 *     The condition function.
 */
RegexLibrary.createCaseSensitiveExactMatchCondition = function(searchString) {
  return RegexLibrary._createExactMatchCondition(searchString, true);
};


/**
 * @param {string} searchString The search string.
 * @param {boolean} caseSensitive True for a case-sensitive match, false for
 *                  case-insensitive.
 * @return {function(PackageLink|ClassLink|MemberLink|KeywordLink): boolean}
 *     The condition function.
 */
RegexLibrary._createExactMatchCondition = function(
    searchString, caseSensitive) {
  if (searchString.length === 0 || searchString.indexOf('*') !== -1) {
    return function(link) {
      return false;
    };
  }

  var pattern = RegexLibrary._getExactMatchRegex(searchString, caseSensitive);

  return function(link) {
    return link.matches(pattern);
  };
};


/**
 * @param {string} searchString The search string.
 * @return {RegExp} The regular expression for the search string.
 */
RegexLibrary._getRegex = function(searchString) {

  // Replace repeated wildcards with a single wildcard character.
  searchString = searchString.replace(/\*{2,}/g, '*');
  // If the search string ends with a wildcard, remove it.
  searchString = searchString.replace(/\*$/, '');

  // Construct the camel case regular expression.
  var camelCasePattern = '';
  var i = 0;
  while (i < searchString.length) {
    if (searchString[i] === '*') {
      // The '*' character is a wildcard.
      i++;
      camelCasePattern += '.*';
    } else if (searchString[i] === '.') {
      // The '.' character is matched directly. The next character (unless it
      // is a wildcard) starts a new camel case expression. This allows, e.g.
      // "j.l.O" to match "java.lang.Object".
      i++;
      camelCasePattern += '\\' + '.';
    } else {
      // A camel case expression, which continues until an uppercase or digit
      // character starts the next camel case expression, or a '*' or '.'
      // character is found. Digits can start a new camel case expression, so
      // that e.g. "P2D" will match "Point2D".
      var endOfCamelCase = searchString.substring(i + 1).search(
          /[A-Z\d\*\.]/);
      var expression;
      if (endOfCamelCase === -1) {
        expression = searchString.substring(i);
      } else {
        expression = searchString.substring(i, i + endOfCamelCase + 1);
      }
      i += expression.length;

      camelCasePattern += RegexLibrary._escape(expression[0]) +
          RegexLibrary._caseInsensitivePattern(expression.substring(1));
      // The camel case regular expression will match any number of lowercase
      // or digit characters following the search term. Digits are accepted so
      // that, e.g. "PD" will match "Point2D".
      camelCasePattern += '[a-z\\d]*';
      if (/[A-Z]/.test(expression[0])) {
        // This camel case expression starts with an uppercase character, so
        // it will match classes. Accept an optional trailing '.' character to
        // make it easier to search for inner classes, e.g. "CUB" will match
        // "Character.UnicodeBlock".
        camelCasePattern += '\\.?';
      }
    }
  }

  // The search term can also be matched without camel case.
  var textPattern = RegexLibrary._caseInsensitivePattern(searchString, '*');
  textPattern = textPattern.replace(/\*/g, '.*');

  var pattern = '^((' + camelCasePattern + ')|(' + textPattern + ')).*$';
  return new RegExp(pattern);
};


/**
 * @param {string} searchString The search string.
 * @param {boolean} caseSensitive True for a case-sensitive match, false for
 *                  case-insensitive.
 * @return {RegExp} The exact match regular expression for the search string.
 */
RegexLibrary._getExactMatchRegex = function(searchString, caseSensitive) {
  var pattern = '^' + RegexLibrary._escape(searchString) + '$';
  return caseSensitive ? new RegExp(pattern) : new RegExp(pattern, 'i');
};


/**
 * Return a regular expression pattern that will perform a case-insensitive
 * match of the given string.
 * @param {string} str The input string.
 * @param {string} charactersToIgnore These characters will be left in the
 *                 string without being replaced.
 * @return {string} The regular expression pattern.
 */
RegexLibrary._caseInsensitivePattern = function(str, charactersToIgnore) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (charactersToIgnore && charactersToIgnore.indexOf(c) !== -1) {
      result.push(c);
    } else {
      if (/[A-Za-z]/.test(c)) {
        result.push('[' + c.toUpperCase() + c.toLowerCase() + ']');
      } else {
        result.push(RegexLibrary._escape(c));
      }
    }
  }
  return result.join('');
};


/**
 * Escape the given string so that it will be treated as a literal within a
 * regular expression.
 * @param {string} str The input string.
 * @return {string} The escaped string.
 */
RegexLibrary._escape = function(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
};


/*
 * ----------------------------------------------------------------------------
 * Callback
 * ----------------------------------------------------------------------------
 */



/**
 * A callback function in the context of a specified object.
 * @param {function(*): *} callbackFunction The callback function.
 * @param {*} thisObject The "this" object used when calling the function.
 * @constructor
 */
Callback = function(callbackFunction, thisObject) {
  this.callbackFunction = callbackFunction;
  this.thisObject = thisObject;
};


/**
 * Invoke this callback function with the given arguments.
 * @param {Array.<*>=} opt_argsArray An array of arguments to pass to the
 *     callback function. If not provided, no arguments will be passed to the
 *     callback function.
 * @return {*} The function result.
 */
Callback.prototype.invoke = function(opt_argsArray) {
  return this.callbackFunction.apply(this.thisObject, opt_argsArray);
};


/*
 * ----------------------------------------------------------------------------
 * Search
 * ----------------------------------------------------------------------------
 */


/**
 * @class Search The searching functionality.
 */
Search = {
  previousEntireSearchString: null,
  timeoutId: null,
  topLink: null
};


/**
 * Perform a search.
 */
Search.perform = function() {
  var entireSearchString = Query.getEntireSearchString();
  Search._performSearch(entireSearchString);
  Search.previousEntireSearchString = entireSearchString;
};


/**
 * Perform a search after a short delay only if the search string has changed.
 */
Search.performIfSearchStringHasChanged = function() {
  var entireSearchString = Query.getEntireSearchString();
  if (entireSearchString !== Search.previousEntireSearchString) {
    if (Search.timeoutId !== null) {
      window.clearTimeout(Search.timeoutId);
    }
    Search.timeoutId = window.setTimeout(function() {
      Search.perform.apply(Search);
    }, 100);
  }
  Search.previousEntireSearchString = entireSearchString;
};


/**
 * @return {string} The URL of the link currently displayed at the top of the
 *     list, or null if no links are currently displayed.
 */
Search.getTopLinkUrl = function() {
  if (Search.topLink) {
    return Search.topLink.getUrl();
  }
  return null;
};


/**
 * @param {string} entireSearchString The search string.
 */
Search._performSearch = function(entireSearchString) {
  Storage.get(Option.CLASS_MENU, function(classMenu) {
    Storage.get(Option.PACKAGE_MENU, function(packageMenu) {
      var searchContext = {};
      searchContext.classMenu = classMenu;
      searchContext.packageMenu = packageMenu;

      Search._PackagesAndClasses._perform(
          searchContext, Query.getPackageOrClassSearchString());
      Search._ClassMembersAndKeywords._perform(
          searchContext, Query.getMemberOrKeywordSearchString());
      Search._Menu._perform(searchContext, Query.getMenuSearchString());

      if (searchContext.getContentsHtmlCallback) {
        var contentsHtml = searchContext.getContentsHtmlCallback.invoke();
        View.setContentsHtml(contentsHtml);
      }

      Search.topLink = searchContext.topMemberOrKeywordLink ||
          searchContext.topPackageOrClassLink;
      Search._autoOpen();

      if (searchContext.menuPageOpened) {
        Search._collapseMenu();
      }

    });
  });
};


/**
 * Collapse the menu after an external page has been opened.
 */
Search._collapseMenu = function() {
  Query.update('');
  Search.perform();
};


/**
 * If the option is configured, automatically open the top link.
 */
Search._autoOpen = function() {
  var url = Search.getTopLinkUrl();
  if (url) {
    Storage.get(Option.AUTO_OPEN, function(autoOpen) {
      if (autoOpen) {
        Frames.openLinkInSummaryFrame(url);
        self.focus();
      }
    });
  }
};


/*
 * ----------------------------------------------------------------------------
 * Search._PackagesAndClasses
 * ----------------------------------------------------------------------------
 */


/**
 * @class Search._PackagesAndClasses Component of the search functionality that
 *     deals with package and class links.
 */
Search._PackagesAndClasses = {
  previousQuery: null,
  currentLinks: null,
  bestMatch: null,
  topLink: null
};


/**
 * Perform this portion of the search.
 * @param {Object} searchContext Object which allows this search component to
 *     store a result and to inspect results provided by earlier search
 *     components.
 * @param {string} searchString The search string.
 */
Search._PackagesAndClasses._perform = function(searchContext, searchString) {
  var module = Search._PackagesAndClasses;

  if (module.previousQuery === null || module.previousQuery !== searchString) {

    if (module.previousQuery !== null &&
        searchString.indexOf(module.previousQuery) === 0) {
      // Characters have been added to the end of the previous query. Start
      // with the current search list and filter out any links that do not
      // match.
    } else {
      // Otherwise, start with the complete search list.
      module.currentLinks = ALL_PACKAGE_AND_CLASS_LINKS.concat();
    }

    var condition = RegexLibrary.createCondition(searchString);
    module.currentLinks = module.currentLinks.filter(condition);
    module.bestMatch = module._getBestMatch(searchString, module.currentLinks);
    module.topLink = module._getTopLink(module.currentLinks, module.bestMatch);
  }

  module.previousQuery = searchString;

  searchContext.topPackageOrClassLink = module.topLink;
  searchContext.getContentsHtmlCallback = new Callback(
      module._constructHtml, module);
};


/**
 * @param {Array.<PackageLink|ClassLink>} links The package and class links
 *     matched by the current search.
 * @param {PackageLink|ClassLink} bestMatch The best match link.
 * @return {PackageLink|ClassLink} The top link.
 */
Search._PackagesAndClasses._getTopLink = function(links, bestMatch) {
  if (bestMatch) {
    return bestMatch;
  }
  if (links.length > 0) {
    return links[0];
  }
  return null;
};


/**
 * Get the best match (if any) from the given array of links.
 * @param {string} searchString The search string.
 * @param {Array.<PackageLink|ClassLink>} links The package and class links
 *     matched by the current search.
 * @return {PackageLink|ClassLink=} The best match.
 */
Search._PackagesAndClasses._getBestMatch = function(searchString, links) {
  var caseInsensitiveExactMatchCondition =
      RegexLibrary.createCaseInsensitiveExactMatchCondition(searchString);
  var exactMatchLinks = links.filter(caseInsensitiveExactMatchCondition);
  // If all of the links displayed in the search list are exact matches, do
  // not display a best match.
  if (exactMatchLinks.length === links.length) {
    return null;
  }
  // Attempt to reduce the matches further by performing a case-sensitive match.
  var caseSensitiveExactMatchCondition =
      RegexLibrary.createCaseSensitiveExactMatchCondition(searchString);
  var caseSensitiveExactMatchLinks =
      exactMatchLinks.filter(caseSensitiveExactMatchCondition);
  if (caseSensitiveExactMatchLinks.length > 0) {
    exactMatchLinks = caseSensitiveExactMatchLinks;
  }
  // Keep only the links with the lowest package depth.
  var bestMatchLinks = [];
  var bestMatchPackageDepth;
  var name;
  var packageDepth;
  exactMatchLinks.forEach(function(link) {
    name = (link.getType() === LinkType.PACKAGE ?
        link.getPackageName() : link.getCanonicalName());
    packageDepth = name.split('.').length;
    if (!bestMatchPackageDepth || packageDepth < bestMatchPackageDepth) {
      bestMatchLinks = [link];
      bestMatchPackageDepth = packageDepth;
    } else if (packageDepth === bestMatchPackageDepth) {
      bestMatchLinks.push(link);
    }
  });
  // Finally, select the first link from the remaining matches to be the best
  // match.
  return bestMatchLinks.length > 0 ? bestMatchLinks[0] : null;
};


/**
 * @return {string} The HTML to display the search results.
 */
Search._PackagesAndClasses._constructHtml = function() {
  var module = Search._PackagesAndClasses;
  if (module.currentLinks.length === 0) {
    return 'No search results.';
  }
  var html = '';
  if (module.bestMatch && module.currentLinks.length > 1) {
    html += '<br/><b><i>Best Match</i></b><br/>';
    html += module.bestMatch.getType().getSingularName().toLowerCase();
    html += '<br/>';
    html += module.bestMatch.getHtml();
    html += '<br/>';
  }
  var type;
  var newType;
  module.currentLinks.forEach(function(link) {
    newType = link.getType();
    if (type !== newType) {
      html += '<br/><b>' + newType.getPluralName() + '</b><br/>';
      type = newType;
    }
    html += link.getHtml();
    html += '<br/>';
  });
  return html;
};


/*
 * ----------------------------------------------------------------------------
 * Search._ClassMembersAndKeywords
 * ----------------------------------------------------------------------------
 */


/**
 * @class Search._ClassMembersAndKeywords Component of the search functionality
 *     that deals with class members and keyword links.
 */
Search._ClassMembersAndKeywords = {
  httpRequest: new HttpRequest(),

  keywords: {
    'navbar_top': 1,
    'navbar_top_firstrow': 1,
    'skip-navbar_top': 1,
    'field_summary': 1,
    'nested_class_summary': 1,
    'constructor_summary': 1,
    'constructor_detail': 1,
    'method_summary': 1,
    'method_detail': 1,
    'field_detail': 1,
    'navbar_bottom': 1,
    'navbar_bottom_firstrow': 1,
    'skip-navbar_bottom': 1
  },

  keywordPrefixes: [
    'methods_inherited_from_',
    'fields_inherited_from_',
    'nested_classes_inherited_from_'
  ]
};


/**
 * Perform this portion of the search.
 * @param {Object} searchContext Object which allows this search component to
 *     store a result and to inspect results provided by earlier search
 *     components.
 * @param {string} searchString The search string.
 */
Search._ClassMembersAndKeywords._perform = function(
    searchContext, searchString) {
  var module = Search._ClassMembersAndKeywords;
  var topPackageOrClassLink = searchContext.topPackageOrClassLink;
  if (searchString === null || !topPackageOrClassLink) {
    module.httpRequest.abort();
    return;
  }

  var progressCallback = function() {
    Search.perform.apply(Search);
  };

  module.httpRequest.load(topPackageOrClassLink.getUrl(), progressCallback);
  if (module.httpRequest.isComplete()) {
    var packageOrClassPageHtml = module.httpRequest.getResource();
    var memberAndKeywordLinks = module._getMemberAndKeywordLinks(
        topPackageOrClassLink.getUrl(), packageOrClassPageHtml);
    var condition = RegexLibrary.createCondition(searchString);

    var matchingMemberAndKeywordLinks = memberAndKeywordLinks.filter(condition);
    searchContext.topMemberOrKeywordLink =
        matchingMemberAndKeywordLinks.length > 0 ?
        matchingMemberAndKeywordLinks[0] : null;

    searchContext.getContentsHtmlCallback = new Callback(function() {
      var html = '';
      if (matchingMemberAndKeywordLinks.length === 0) {
        html += 'No search results.';
      } else {
        matchingMemberAndKeywordLinks.forEach(function(memberOrKeywordLink) {
          html += memberOrKeywordLink.getHtml();
        });
      }
      return topPackageOrClassLink.getHtml() + '<p>' + html + '</p>';
    }, module);
  } else {
    searchContext.getContentsHtmlCallback = new Callback(function() {
      return topPackageOrClassLink.getHtml() + '<p>' +
          module.httpRequest.getStatusMessage() + '</p>';
    }, module);
    searchContext.memberAndKeywordLinksLoading = true;
  }
};


/**
 * Retrieve the member and keyword links from the given package or class page.
 * @param {string} baseUrl The URL of the page.
 * @param {string} packageOrClassPageHtml The contents of the page.
 * @return {Array.<MemberLink|KeywordLink>} The links.
 */
Search._ClassMembersAndKeywords._getMemberAndKeywordLinks = function(
    baseUrl, packageOrClassPageHtml) {
  var names = Search._ClassMembersAndKeywords._getAnchorNames(
      packageOrClassPageHtml);
  return Search._ClassMembersAndKeywords._createMemberAndKeywordLinks(
      baseUrl, names);
};


/**
 * Retrieve the anchor names from the given package or class page.
 * @param {string} packageOrClassPageHtml The contents of the page.
 * @return {Array.<string>} The anchor names.
 */
Search._ClassMembersAndKeywords._getAnchorNames = function(
    packageOrClassPageHtml) {
  var anchorRegex = /<a name=\"([^\"]+)\"/gi;
  var matches;
  var names = [];
  while ((matches = anchorRegex.exec(packageOrClassPageHtml)) !== null) {
    names.push(matches[1]);
  }
  return names;
};


/**
 * Create member and keyword links from the given anchor names.
 * @param {string} baseUrl The URL of the package or class page.
 * @param {names} names The anchor names.
 * @return {Array.<MemberLink|KeywordLink>} The links.
 */
Search._ClassMembersAndKeywords._createMemberAndKeywordLinks = function(
    baseUrl, names) {
  var links = [];
  var keywordLinks = [];
  names.forEach(function(name) {
    if (Search._ClassMembersAndKeywords._isKeywordName(name)) {
      keywordLinks.push(new KeywordLink(baseUrl, name));
    } else {
      links.push(new MemberLink(baseUrl, name));
    }
  }, Search._ClassMembersAndKeywords);
  keywordLinks.forEach(function(keywordLink) {
    links.push(keywordLink);
  });
  return links;
};


/**
 * @param {string} name The anchor name.
 * @return {boolean} Whether the anchor is a keyword.
 */
Search._ClassMembersAndKeywords._isKeywordName = function(name) {
  if (Search._ClassMembersAndKeywords.keywords[name] === 1) {
    return true;
  }
  return Search._ClassMembersAndKeywords.keywordPrefixes.some(
      function(keywordPrefix) {
        if (name.indexOf(keywordPrefix) === 0) {
          return true;
        }
      });
};


/*
 * ----------------------------------------------------------------------------
 * Search._Menu
 * ----------------------------------------------------------------------------
 */


/**
 * @class Search._Menu Component of the search functionality that deals with
 *     the package menu and class menu.
 */
Search._Menu = {
  menuReplacement: null
};


/**
 * Perform this portion of the search.
 * @param {Object} searchContext Object which allows this search component to
 *     store a result and to inspect results provided by earlier search
 *     components.
 * @param {string} searchString The search string.
 */
Search._Menu._perform = function(searchContext, searchString) {
  var module = Search._Menu;
  var topPackageOrClassLink = searchContext.topPackageOrClassLink;
  var topMemberOrKeywordLink = searchContext.topMemberOrKeywordLink;

  var performMenuSearch = searchString !== null && topPackageOrClassLink &&
      !searchContext.memberAndKeywordLinksLoading &&
      topMemberOrKeywordLink !== null;
  if (!performMenuSearch) {
    return;
  }

  var menuReplacement = module._getMenuReplacement();
  var menu = module._constructMenu(searchContext, menuReplacement,
      topPackageOrClassLink, topMemberOrKeywordLink);

  searchContext.getContentsHtmlCallback = new Callback(function() {
    var html = topPackageOrClassLink.getHtml();
    if (topMemberOrKeywordLink) {
      html += '<br/>' + topMemberOrKeywordLink.getHtml();
    }
    html += '<p>' + module._constructMenuHtml(menu) + '</p>';
    return html;
  }, module);

  if (!searchString) {
    return;
  }

  for (var i = 0; i < menu.length; i++) {
    var menuElement = menu[i];
    if (menuElement.mnemonic === '@' + searchString) {
      Frames.openLinkInNewTab(menuElement.url);
    }
  }

  searchContext.menuPageOpened = true;
};


/**
 * Construct the menu.
 * @param {Object} searchContext The search context.
 * @param {{Object.<function(ClassLink|PackageLink,MemberLink)>}}
 *     memberReplacement An object containing, for each placeholder value, a
 *     function to resolve that value.
 * @param {ClassLink|PackageLink} classOrPackageLink The current class link or
 *     package link.
 * @param {MemberLink|KeywordLink} memberOrKeywordLink The current member link
 *     or keyword link.
 * @return {Array.<{mnemonic: string, label: string, url: string}>} The menu
 *     items.
 */
Search._Menu._constructMenu = function(searchContext, menuReplacement,
    classOrPackageLink, memberOrKeywordLink) {
  var classMemberLink;
  if (memberOrKeywordLink &&
      memberOrKeywordLink.getType() === LinkType.CLASS_MEMBER) {
    classMemberLink = memberOrKeywordLink;
  }

  var menuDefinition;
  if (classOrPackageLink &&
      classOrPackageLink.getType() === LinkType.PACKAGE) {
    menuDefinition = searchContext.packageMenu;
  } else {
    menuDefinition = searchContext.classMenu;
  }

  var menu = [];
  menuDefinition.split('\n').forEach(function(menuAnchorDefinition) {
    var splitOnArrow = splitOnFirst(menuAnchorDefinition, '->');
    if (splitOnArrow.length === 2) {
      var mnemonicAndLabel = splitOnFirst(splitOnArrow[0], ':');
      if (mnemonicAndLabel.length === 2) {
        var mnemonic = mnemonicAndLabel[0];
        var label = mnemonicAndLabel[1];
        var url = splitOnArrow[1];

        var matches;
        while ((matches = /##(\w+)##/.exec(url)) !== null) {
          var f = menuReplacement[matches[1]];
          var rx2 = new RegExp(matches[0], 'g');
          if (f) {
            url = url.replace(rx2, f(classOrPackageLink, classMemberLink));
          } else {
            url = url.replace(rx2, '');
          }
        }

        menu.push({mnemonic: mnemonic, label: label, url: url});
      }
    }
  });

  return menu;
};


/**
 * Placeholder values that can be entered into the class_menu or package_menu
 * options and will, when the menu is opened, be replaced with data relevant
 * to the current package or class.
 * @return {Object.<function(ClassLink|PackageLink,MemberLink)>} An object
 *     containing, for each placeholder value, a function to resolve that
 *     value.
 */
Search._Menu._getMenuReplacement = function() {
  if (!Search._Menu.menuReplacement) {
    var memberNameFunction = function(classOrPackageLink, classMemberLink) {
      return classMemberLink ? classMemberLink.getName() : '';
    };
    Search._Menu.menuReplacement = {
      CLASS_NAME: function(classLink) {
        return classLink ? classLink.getClassName() : '';
      },
      PACKAGE_NAME: function(classOrPackageLink) {
        return classOrPackageLink ? classOrPackageLink.getPackageName() : '';
      },
      PACKAGE_PATH: function(classOrPackageLink) {
        return classOrPackageLink ?
            classOrPackageLink.getPackageName().replace(/\./g, '/') : '';
      },
      MEMBER_NAME: memberNameFunction,
      METHOD_NAME: memberNameFunction, // Synonym for MEMBER_NAME.
      FIELD_NAME: memberNameFunction,  // Synonym for MEMBER_NAME.
      ANCHOR_NAME: memberNameFunction  // Deprecated synonym for MEMBER_NAME.
    };
  }
  return Search._Menu.menuReplacement;
};


/**
 * @param {{Array.<{mnemonic: string, label: string, url: string}>}} menu The
 *     menu items.
 * @return {string} An HTML representation of the menu items.
 */
Search._Menu._constructMenuHtml = function(menu) {
  var menuHtml = '';
  menu.forEach(function(menuElement) {
    menuHtml += '<A HREF="' + menuElement.url + '">' + menuElement.mnemonic +
        ':' + menuElement.label + '</A><BR/>';
  });
  return menuHtml;
};


/*
 * ----------------------------------------------------------------------------
 * Main script
 * ----------------------------------------------------------------------------
 */


/**
 * Initialise this script.
 * @param {boolean} packageFrameHidden Whether the package frame has been
 *     hidden.
 */
function init(packageFrameHidden) {

  // Retrieve the inner HTML of the class frame.
  var classesInnerHtml = getClassesInnerHtml();

  // Initialise stored package and class links.
  var classLinks = getClassLinks(classesInnerHtml);
  var packageAndClassLinks;
  if (packageFrameHidden) {
    var packageLinks = getPackageLinks(classLinks);
    packageAndClassLinks = packageLinks.concat(classLinks);
  } else {
    packageAndClassLinks = classLinks;
  }
  if (packageAndClassLinks.length === 0) {
    // Another instance of this script is already running and it has not yet
    // added the package and class links to the page.
    return;
  }
  ALL_PACKAGE_AND_CLASS_LINKS = packageAndClassLinks;

  // Initialise class frame.
  View.initialise(EventHandlers);

  // Perform an initial search. This will populate the class frame with the
  // entire list of packages and classes.
  Search.perform();

  // If the autofocus attribute is not supported, manually give focus to the
  // search field.
  if (!('autofocus' in document.createElement('input'))) {
    View.focusOnSearchField();
  }
}


/**
 * Parse packages from the given array of {ClassLink} objects.
 * @param {Array.<ClassLink>} classLinks The class links.
 * @return {Array.<PackageLink>} The package links.
 */
function getPackageLinks(classLinks) {
  var packageLinks = [];
  var packageLinksAdded = {};
  var packageName;

  classLinks.forEach(function(classLink) {
    packageName = classLink.getPackageName();
    if (!packageLinksAdded[packageName]) {
      packageLinks.push(new PackageLink(packageName));
      packageLinksAdded[packageName] = true;
    }
  });

  packageLinks.sort(function(packageLinkOne, packageLinkTwo) {
    var packageNameOneComponents = packageLinkOne.getPackageName().split(/\./);
    var packageNameTwoComponents = packageLinkTwo.getPackageName().split(/\./);
    var smallerLength = Math.min(
        packageNameOneComponents.length, packageNameTwoComponents.length);
    for (i = 0; i < smallerLength; i++) {
      if (packageNameOneComponents[i] < packageNameTwoComponents[i]) {
        return -1;
      }
      if (packageNameOneComponents[i] > packageNameTwoComponents[i]) {
        return 1;
      }
    }
    return packageNameOneComponents.length - packageNameTwoComponents.length;
  });

  return packageLinks;
}


/**
 * @return {string} The inner HTML of the body element of the classes list
 *    frame, or undefined if the element does not exist.
 */
function getClassesInnerHtml() {
  var classesInnerHtml;
  if (document && document.body) {
    classesInnerHtml = document.body.innerHTML;
  }
  return classesInnerHtml;
}


/**
 * Parse interfaces, classes, enumerations, and annotations from the inner HTML
 * of the body element of the classes list frame.
 * @param {string} classesInnerHtml The inner HTML of the body element of the
 *     classes list frame.
 * @return {Array.<ClassLink>} The class links.
 */
function getClassLinks(classesInnerHtml) {
  if (!classesInnerHtml) {
    return [];
  }

  var matches;
  var classLinksMap = {};
  var classLinkTypes = [
    LinkType.PACKAGE, LinkType.INTERFACE, LinkType.CLASS, LinkType.ENUM,
    LinkType.EXCEPTION, LinkType.ERROR, LinkType.ANNOTATION
  ];
  classLinkTypes.forEach(function(type) {
    classLinksMap[type] = [];
  });

  function checkForExceptionOrErrorType(type, className) {
    if (type === LinkType.CLASS) {
      if (endsWith(className, 'Exception')) {
        type = LinkType.EXCEPTION;
      } else if (endsWith(className, 'Error')) {
        type = LinkType.ERROR;
      }
    }
    return type;
  }

  var classesRegexWithTitle =
      /<a\s+href\s*=\s*\"([^\"]+)\.html?\"\s*title\s*=\s*\"\s*([^\s]+)\s/gi;
  var anchorWithTitleFound = false;
  while ((matches = classesRegexWithTitle.exec(classesInnerHtml)) !== null) {
    var hrefTokens = matches[1].split('/');
    if (hrefTokens.length >= 2) {
      var packageName = hrefTokens.slice(0, -1).join('.');
      var className = hrefTokens[hrefTokens.length - 1];
      var type = LinkType.getByName(matches[2]);
      type = checkForExceptionOrErrorType(type, className);

      var classLink = new ClassLink(type, packageName, className);
      classLinksMap[type].push(classLink);
      anchorWithTitleFound = true;
    }
  }

  if (!anchorWithTitleFound) {
    // Javadoc created with Java 1.2 or 1.3. The anchors do not have title
    // attributes, but the interfaces can be identified by looking for a
    // surrounding italic element. There are no enumerations or annotations.
    var classesWithoutTitleRegex =
        /<a\s+href\s*=\s*\"([^\"]+)\.html?\"\s*[^>]*>(\s*<i\s*>)?\s*(?:[^<]+)(?:<\/i\s*>\s*)?<\/a\s*>/gi;
    while ((matches = classesWithoutTitleRegex.exec(classesInnerHtml)) !==
        null) {
      var hrefTokens = matches[1].split('/');
      if (hrefTokens.length >= 2) {
        var packageName = hrefTokens.slice(0, -1).join('.');
        var className = hrefTokens[hrefTokens.length - 1];
        var openingItalicTag = matches[2];
        var type = openingItalicTag ? LinkType.INTERFACE : LinkType.CLASS;
        type = checkForExceptionOrErrorType(type, className);

        var classLink = new ClassLink(type, packageName, className);
        classLinksMap[type].push(classLink);
      }
    }
  }

  var classLinks = [];
  classLinkTypes.forEach(function(type) {
    classLinks = classLinks.concat(classLinksMap[type]);
  });
  return classLinks;
}


/**
 * Determine whether stringOne ends with stringTwo.
 * @param {string} stringOne The first string.
 * @param {string} stringTwo The second string.
 * @return {boolean} Whether stringOne ends with stringTwo.
 */
function endsWith(stringOne, stringTwo) {
  if (!stringOne) {
    return false;
  }
  var strIndex = stringOne.length - stringTwo.length;
  return strIndex >= 0 && stringOne.substring(strIndex) === stringTwo;
}


/**
 * Trim whitespace from the start of the given string.
 * @param {string} stringToTrim The string to trim.
 * @return {string} The trimmed string.
 */
function trimFromStart(stringToTrim) {
  return stringToTrim.replace(/^\s+/, '');
}


/**
 * Trim whitespace from the end of the given string.
 * @param {string} stringToTrim The string to trim.
 * @return {string} The trimmed string.
 */
function trimFromEnd(stringToTrim) {
  return stringToTrim.replace(/\s+$/, '');
}


/**
 * Split the given string on the first occurence of the given separator string.
 * Any whitespace surrounding the first occurence of the separator will be
 * removed.
 * @param {string} stringToSplit The string to split.
 * @param {string} separator The separator string.
 * @return {Array.<string>} An array containing two elements: the portion of
 *     the string found before the first occurence of the separator, and the
 *     portion of the string found after the first occurence of the separator.
 */
function splitOnFirst(stringToSplit, separator) {
  var firstOccurrence = stringToSplit.indexOf(separator);
  if (firstOccurrence === -1) {
    return [stringToSplit, ''];
  }
  return [
    trimFromEnd(stringToSplit.substring(0, firstOccurrence)),
    trimFromStart(stringToSplit.substring(
          firstOccurrence + separator.length, stringToSplit.length))
  ];
}


/*
 * ----------------------------------------------------------------------------
 * EventHandlers
 * ----------------------------------------------------------------------------
 */


/**
 * @class EventHandlers Called by the view to handle UI events.
 */
EventHandlers = {};


/**
 * Called on a 'keyup' event while the search field has focus.
 * @param {Event} evt The event.
 */
EventHandlers.searchFieldKeyup = function(evt) {
  var code = evt.keyCode;
  if (code === 13) {
    EventHandlers._returnKeyPressed(evt.ctrlKey);
  } else if (code === 27) {
    EventHandlers._escapeKeyPressed();
  }
};


/**
 * Called on a 'keydown' event while the search field has focus.
 * @param {Event} evt The event.
 */
EventHandlers.searchFieldKeydown = function(evt) {
  // Disable the default behaviour of completely clearing the search field when
  // the ESCAPE key is pressed. Instead, the ESCAPE key will clear only the
  // currently displayed portion of the search query.
  if (evt.keyCode === 27) {
    evt.preventDefault();
  }
};


/**
 * Called when the contents of the search field has changed.
 */
EventHandlers.searchFieldChanged = function() {
  var searchFieldContents = View.getSearchFieldValue();
  Query.update(searchFieldContents);
  Search.performIfSearchStringHasChanged();
};


/**
 * Called when the search field has gained focus.
 */
EventHandlers.searchFieldFocus = function() {
  document.body.scrollLeft = 0;
};


/**
 * Caled when the erase button has been clicked.
 */
EventHandlers.eraseButtonClick = function() {
  View.clearSearchField();
};


/**
 * Called when the Options link has been clicked.
 * @param {Event} evt The event.
 */
EventHandlers.optionsLinkClicked = function(evt) {
  OptionsPage.open();
  evt.preventDefault();
};


/**
 * Called when the help link has been clicked.
 * @param {Event} evt The event.
 */
EventHandlers.helpLinkClicked = function(evt) {
  var url = 'https://code.google.com/p/javadoc-search-frame/wiki/Features';
  Frames.openLinkInNewTab(url);
  evt.preventDefault();
};


/**
 * Called when the return key has been pressed while the search field has
 * focus.
 * @param {boolean} ctrlModifier Whether the CTRL key was held down when the
 *     return key was pressed.
 */
EventHandlers._returnKeyPressed = function(ctrlModifier) {
  var searchFieldValue = View.getSearchFieldValue();
  Query.update(searchFieldValue);
  Search.performIfSearchStringHasChanged();

  var url = Search.getTopLinkUrl();
  if (url) {
    if (ctrlModifier) {
      Frames.openLinkInNewTab(url);
    } else {
      Frames.openLinkInSummaryFrameOrNewTab(url);
    }
  }
};


/**
 * Called when the escape key has been pressed while the search field has
 * focus.
 */
EventHandlers._escapeKeyPressed = function() {
  View.clearSearchField();
};
