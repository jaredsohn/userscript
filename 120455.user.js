///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// vBulletin4 Thread Hider and More
// Version 3.0.0rc5, 2014-02-05
// Coded by Paul Oliver.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// Script can be found at http://userscripts.org/scripts/show/120455
// 
// ==UserScript==
// @name      vBulletin4 Thread Hider and More
// @namespace http://userscripts.org/users/187006
// @author    Paul Oliver
// @grant     none
// @version   3.0rc5
// @require   https://userscripts.org/scripts/source/145813.user.js
// @require   https://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js
// @description Hides threads you do not want to read again.
// @include */search.php?searchid=*
// @include */search.php?&searchid=*
// @include */forumdisplay.php*
// @include */forum.php*
// @include */forum/search*
// @include */forum/threads/*
// @include */showthread.php*
// @include *vbseo.com*
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script allows you hide vBulletin4 threads that you don't want to see
// any more.  You can manage your ignored threads. It also allows you to ignore posts
// by users and ignore threads started by users.
// 
// It has a feature that helps you browse some boards that have a voting system
// enabled. It will hide all posts that don't meet a particular threshold (disabled
// by default). It only works on one board that I know of, please send me links
// to boards with different voting systems so that I can try to support other 
// voting methods.
//
///////////////////////////////////////////////////////////////////////////////
//
// Version 3.0.0rc5 2014-02-05
// [*] Allowed for the dbtech thanks upvote/downvote system to be considered by
//     the post hiding logic. (Rating threshold).
//
// Version 3.0.0rc4 2013-07-25
// [*] Changed the way I store and retreive settings to be more robust
//
// Version 3.0.0rc3 2013-07-13
// [*] Styling updated for the options dialog
// [*] Bug fixes
// 
// Version 3.0.0rc2 2013-07-13
// [*] Fixed some bugs that came about when pointing at board with a different layout.
// [*] Moved the ignore icon before the thread name to help when the thread name is too long to display the ignore button.
//
// Version 3.0.0rc1 2013-07-12
// [*] Got it working with Firefox only again. I'm going to focus on Firefox only going forward--supporting both Chrome and Firefox took too much effort.
// [*] Much better styling for the look and feel. I want this to be a beautiful script. We'll get there someday. :)
// [*] To encourage reviews or donations, I added a donate and review link.
// [*] Removed ZeptoJS from the top of the script, going back to using jQuery as a require.
// [*] Made changes to make our sandbox a little more comfortable for the script.
//
// Version 2.0.7 2012-11-12
// [*] Experimental Option, ignore downvotes when in rating threshold mode.
// [*] Author whitelist--don't ignore posts from these authors
// [*] UI updates.
// 
// Version 2.0.6 2012-11-10
// [*] Fixed bug where there were hotkey conflicts for temporarily hiding threads
//     that conflicted between Windows, Mac, and Linux browsers. Now using 
//     ALT-Up Arrow, which looks like a safe key combination to use.
// [*] More UI updates...better look and feel
// [*] Fixed bug where the gray background behind the modal multiplied and multiplied.
//
// Version 2.0.5 2012-10-31
// [*] Fixed bug introduced with the last version, where enabling the 
//     experimental feature caused everything to break.
// 
// Version 2.0.4 2012-10-31
// [*] Removed the checkbox to show hidden posts because that's in the header bar already.
// [*] Better looking buttons next to the thread titles
// [*] Added a hotkey for showing hidden/unhiding threads (ALT-H)
//
// Version 2.0.3 2012-10-17
// [*] Use zepto.js instead of jQuery to make the script about half of the size of the previous version.
// [*] Rewrote the script in CoffeeScript (compiled to JavaScript) which results
//     in better JavaScript that is jsLint compatible.
// [*] Trying to show the hidden posts in a different way so that it is more obvious.
// [*] If you are using the experimental rating theshold, you can just use your arrow keys
//     to update the threshold instead of typing it in.
// [*] Fewer times where a screen refresh is necessary...should be faster.
// [*] Added a gray background behind the options popup to make it easier to see. You can
//     also close the dialog by clicking anywhere outside the options window.
//
// Version 2.0.2 2011-12-16
// [*] Including jQuery in the script, so it now runs in Chrome
//
// Version 2.0.1
// [*] Added the ability to show/remove posts from the button bar
//
// Version 2.0.0
// [*] Now using jQuery. This breaks compatibility with Chrome.
// [*] Changed the name to vBulltin4 Thread Hider and More
// [*] Hides threads/posts by user
// [*] Shows posts that meet a certain rating criteria (only compatible with
//     a few rating systems. Contact me at userscripts AT paultastic DOT com to
//     request your board's rating system to be supported.
// 
// Version 1.0.2 (vBulletin4 Thread Hider)
// [*] Added the ability to filter threads based on a string
// [*] Added a popup screen to manage your filters
// [*] Added a feature that lets you show hidden threads (faded out)
//
///////////////////////////////////////////////////////////////////////////////
// Generated by CoffeeScript 1.6.3
(function() {
  var Extend, IgnoredAuthors, IgnoredStrings, IgnoredThreads, Params, Strings, TEMP_DISABLE, TEMP_ENABLE, WhitelistAuthors, error, image_ban, image_unban,
    _this = this;

  Params = {
    scriptName: "vBulletin4 Thread Hider and More",
    versionMajor: 3,
    versionMinor: 0,
    versionBuild: "0rc5",
    debug: false,
    enabled: true,
    screenNeedsRefresh: false,
    defaultSettings: {
      sortBy: 'title',
      showIgnored: false,
      temporaryShowIgnored: false,
      hlr: false,
      hd: false
    },
    showRatingThreshold: false,
    ignoreDownvotes: false,
    ratingThreshold: -10,
    ratingThresholdEnabled: false,
    env: {},
    settings: {}
  };

  this.reviewUrl = "http://userscripts.org/reviews/new?script_id=120455";

  Strings = {};

  IgnoredThreads = [];

  IgnoredStrings = [];

  IgnoredAuthors = [];

  WhitelistAuthors = [];

  image_ban = "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjIxOUI3OUUyNzUxMUUyOEMwODlCQzVBNDNEQjkxQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjIxOUI3QUUyNzUxMUUyOEMwODlCQzVBNDNEQjkxQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCMjE5Qjc3RTI3NTExRTI4QzA4OUJDNUE0M0RCOTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCMjE5Qjc4RTI3NTExRTI4QzA4OUJDNUE0M0RCOTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SEj4pAAAAEJQTFRFmZmZ5eXlzMzMvLy8W1tbi4uLQkJCs7OzUlJSS0tLZmZmJSUlh4eH8vLy2tra7e3t6Ojog4ODenp6MzMz////////qenVDAAAABZ0Uk5T////////////////////////////AAHSwOQAAACHSURBVHjaJM/RFoQgCARQQsXC1swZ//9Xl4on7gEOICuCmyYlI5NHKRvs3vjyt8OyH0BlkBneyZ4b6hImeHSxAPBLhlsP3cCcVkUt89VJxSl6OD+tjilbPjRUoiWhCAX7q3VFQTisYUbtOmMg9laDq9YdPp6rqI7WYGV8N6+fnrf054W/AAMAkY8LE8+Sq60AAAAASUVORK5CYII=";

  image_unban = "iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjIxOUI3REUyNzUxMUUyOEMwODlCQzVBNDNEQjkxQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjIxOUI3RUUyNzUxMUUyOEMwODlCQzVBNDNEQjkxQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCMjE5QjdCRTI3NTExRTI4QzA4OUJDNUE0M0RCOTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCMjE5QjdDRTI3NTExRTI4QzA4OUJDNUE0M0RCOTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vMvqnAAAADlQTFRF////Q0NDZmZmMzMzzMzMmZmZJCQkVlZWGRkZhYWFfHx8rq6upqamJiYmS0tL8PDwIiIiKCgo////BoUKyAAAABN0Uk5T////////////////////////ALJ93AgAAACCSURBVHjaLI4LCgQxCEPV9D8ztXr/w66WFYQEMXnk7lplc68aktzLxp1d0haMlu4MFCftA/8ZXamm+IC1+KCS3DdMonUg1A38lElOEyZxPanTwXpY42xYLQKEXqBx0fl9MLyk0iJYzKJZNDD2sUCAncBKSOEsY7mQsa90WU/KnwADAHweBjYJky8OAAAAAElFTkSuQmCC";

  TEMP_DISABLE = "Show Hidden";

  TEMP_ENABLE = "Re-hide";

  Extend = function(target, source) {
    var property;
    if (typeof source === 'object') {
      for (property in source) {
        if (source.hasOwnProperty(property)) {
          if (source[property] != null) {
            if (/Object/.test(source[property].constructor)) {
              if (property in target) {
                void 0;
              } else {
                target[property] = {};
              }
              Extend(target[property], source[property]);
            } else {
              try {
                target[property] = source[property];
              } catch (_error) {}
            }
          }
        }
      }
    }
    return target;
  };

  this.trim = function(stringToTrim, excessCharacter) {
    var regEx, trimmed;
    trimmed = '';
    if (excessCharacter != null) {
      regEx = new RegExp("^" + excessCharacter + "|" + excessCharacter + "$", "gim");
      trimmed = stringToTrim.replace(regEx, '');
    } else {
      trimmed = stringToTrim.replace(/^\s+|\s+$/g, '');
    }
    return trimmed;
  };

  this.stopIgnoringCallback = function(btn) {
    var $btn, id, ignoreBy, ignoreKey, match, regEx, threadLi;
    $btn = $(btn);
    id = $btn.attr('id');
    regEx = /^si\[(\S+)\](.*)$/;
    match = regEx.exec(id);
    ignoreBy = match[1];
    ignoreKey = trim(match[2], '"');
    if (ignoreBy === "thread") {
      this.removeIgnoredThreadById(parseInt(ignoreKey));
      this.saveIgnoredThreads();
    } else if (ignoreBy === "author") {
      this.removeIgnoredAuthor(ignoreKey);
      this.saveIgnoredAuthors();
    }
    threadLi = $btn.closest('li');
    if (threadLi) {
      return this.showThread(threadLi, true, true, '', '');
    } else {
      return this.updatePage();
    }
  };

  this.alreadyHasIgnoreButton = function($rootNode) {
    return $rootNode.find('.ignoreButton').length > 0;
  };

  this.closeButton_clicked = function() {
    Params.screenNeedsRefresh = true;
    $('.gm-vbh-modal-backdrop').hide();
    $('#modalBg').remove();
    return this.updatePage();
  };

  this.initEnv = function() {
    var isFirefox, isGecko, isMacintosh, isPostlist, isThreadlist, userAgent;
    userAgent = navigator.userAgent.toLowerCase();
    isGecko = /gecko/.test(userAgent);
    isFirefox = isGecko && /firefox/.test(userAgent);
    isThreadlist = $('#threadlist').length !== 0 || $('#searchbits').length !== 0;
    isPostlist = $('#postlist').length !== 0;
    isMacintosh = /macintosh/.test(userAgent);
    return Extend(Params.env, {
      userAgent: userAgent,
      isGecko: isGecko,
      isFirefox: isFirefox,
      isThreadlist: isThreadlist,
      isPostlist: isPostlist
    });
  };

  this.setKey = function(key, value) {
    var exception, retVal;
    try {
      console.log("--> Saving " + key + " = " + value);
      retVal = window.localStorage['vBulletin4ThreadHider_' + key] = value;
      console.log("--> *** Success. " + retVal);
      return retVal;
    } catch (_error) {
      exception = _error;
      return console.error("Fatal error: Can't store value " + key);
    }
  };

  this.getKey = function(key, defaultValue) {
    var exception, g;
    try {
      console.log("<-- retrieving key[" + key + "] which defaults to " + defaultValue);
      g = window.localStorage['vBulletin4ThreadHider_' + key];
      console.log("<-- *** Success. Using " + (g != null ? g : defaultValue));
      return g != null ? g : defaultValue;
    } catch (_error) {
      exception = _error;
      console.error("Fatal error: Can't get stored value " + key);
      return defaultValue;
    }
  };

  this.removeIgnoreIdCallback = function(button) {
    var $btn, id;
    $btn = $(button);
    id = $btn.attr('id');
    this.removeIgnoredThreadById(parseInt(id));
    this.saveIgnoredThreads();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.removeIgnoreAuthor_clicked = function(button) {
    var $btn, stopIgnoring;
    $btn = $(button);
    stopIgnoring = $btn.attr("id");
    this.removeIgnoredAuthor(stopIgnoring);
    this.saveIgnoredAuthors();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.removeWhitelistAuthor_clicked = function(button) {
    var $btn;
    $btn = $(button);
    this.stopIgnoring = $btn.attr("id");
    this.removeWhitelistAuthor(stopIgnoring);
    this.saveWhitelistAuthors();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.removeIgnoreString_clicked = function(evt, button) {
    var $btn, stopIgnoring;
    evt.stopPropagation();
    $btn = $(button);
    stopIgnoring = $btn.attr("id");
    this.removeIgnoredString(stopIgnoring);
    this.saveIgnoredStrings();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.txtRatingThreshold_changed = function(e) {
    var $txt, k, threshold;
    if (window.event) {
      k = window.event.keyCode;
    } else {
      k = e.keyCode;
    }
    $txt = $('#gm-vbh-txt-rating-threshold');
    threshold = parseInt($txt.val());
    if (k === 37 || k === 40) {
      threshold = threshold - 1;
      $txt.val(threshold);
    } else if (k === 38 || k === 39) {
      threshold = threshold + 1;
      $txt.val(threshold);
    }
    Params.settings.ratingThreshold = threshold;
    this.saveSettings();
    if (Params.env.isPostlist) {
      return updatePage();
    }
  };

  this.chkEnableRatingThreshold_clicked = function() {
    var $chk, $txt, enabled;
    $chk = $('#gm-vbh-chkenable');
    enabled = $chk.prop('checked');
    $txt = $('#gm-vbh-txt-rating-threshold');
    Params.settings.ratingThreshold = parseInt($txt.val());
    Params.settings.ratingThresholdEnabled = enabled;
    this.saveSettings();
    if (Params.env.isPostlist) {
      return this.updatePage();
    }
  };

  this.temporarilyDisable_clicked = function() {
    var $btn;
    $btn = $($('.gm-vbh-disable').first());
    if ($btn.val() === TEMP_DISABLE) {
      Params.settings.temporaryShowIgnored = true;
      this.saveSettings();
      this.updatePageShowAll();
      return $('.gm-vbh-disable').val(TEMP_ENABLE);
    } else {
      Params.settings.temporaryShowIgnored = false;
      this.saveSettings();
      if (Params.env.isThreadlist) {
        this.rehideHiddenThreads();
      } else if (Params.env.isPostlist) {
        this.rehideHiddenPosts();
      }
      return $('.gm-vbh-disable').val(TEMP_DISABLE);
    }
  };

  this.sortByCallback = function(button) {
    var $btn, sortBy;
    $btn = $(button);
    sortBy = $btn.attr('id');
    Params.settings.sortBy = sortBy;
    this.saveSettings();
    return this.manageHide_clicked();
  };

  this.ignoreDownvotesCallback = function(checkbox) {
    var $chk;
    $chk = $(checkbox);
    if ($chk.prop('checked')) {
      Params.settings.ignoreDownvotes = true;
    } else {
      Params.settings.ignoreDownvotes = false;
    }
    this.saveSettings();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.showRatingThesholdCallback = function(checkbox) {
    var $chk;
    $chk = $(checkbox);
    if ($chk.prop('checked')) {
      Params.settings.showRatingThreshold = true;
    } else {
      Params.settings.showRatingThreshold = false;
    }
    this.saveSettings();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.btnAddWhitelistAuthor_clicked = function(button) {
    var $btn, d, newWhitelistAuthor, stringToWhitelist,
      _this = this;
    $btn = $(button);
    stringToWhitelist = $('#gm-vbh-txt-add-whitelist-author').val();
    d = new Date();
    newWhitelistAuthor = {
      string: stringToWhitelist,
      addedAt: d.getTime() / 1000
    };
    WhitelistAuthors[WhitelistAuthors.length] = newWhitelistAuthor;
    Params.screenNeedsRefresh = true;
    window.setTimeout(function() {
      return _this.saveWhitelistAuthors();
    }, 0);
    this.manageHide_clicked();
    return $('#gm-vbh-txt-add-whitelist-author').focus();
  };

  this.btnAddAuthor_clicked = function(button) {
    var $btn, d, newIgnoreAuthor, stringToIgnore,
      _this = this;
    $btn = $(button);
    stringToIgnore = $('#gm-vbh-txt-add-ignore-author').val();
    d = new Date();
    newIgnoreAuthor = {
      string: stringToIgnore,
      addedAt: d.getTime() / 1000
    };
    IgnoredAuthors[IgnoredAuthors.length] = newIgnoreAuthor;
    Params.screenNeedsRefresh = true;
    window.setTimeout(function() {
      return _this.saveIgnoredAuthors();
    }, 0);
    this.manageHide_clicked();
    return $('#gm-vbh-txt-add-ignore-author').focus();
  };

  this.btnAddIgnoreString_clicked = function(evt, button) {
    var d, newIgnoreString, stringToIgnore,
      _this = this;
    evt.stopPropagation();
    stringToIgnore = $('#txtAddIgnoreString').val();
    d = new Date();
    newIgnoreString = {
      string: stringToIgnore,
      addedAt: d.getTime() / 1000
    };
    IgnoredStrings[IgnoredStrings.length] = newIgnoreString;
    Params.screenNeedsRefresh = true;
    window.setTimeout(function() {
      return _this.saveIgnoredStrings();
    }, 0);
    this.addIgnoreStringToDom(stringToIgnore, $(".gm-vbh-tbl-ignored-strings"));
    return $('#txtAddIgnoreString').focus();
  };

  this.btnRemoveAllIgnoredStrings_clicked = function() {
    IgnoredStrings = [];
    this.saveIgnoredStrings();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.btnRemoveAllWhitelistAuthors_clicked = function() {
    WhitelistAuthors = [];
    this.saveWhitelistAuthors();
    Params.screenNeedsRefresh = true;
    return manageHide_clicked();
  };

  this.btnRemoveAllIgnoredAuthors_clicked = function() {
    IgnoredAuthors = [];
    this.saveIgnoredAuthors();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.btnRemoveAllIgnoredThreads_clicked = function() {
    IgnoredThreads = [];
    this.saveIgnoredThreads();
    Params.screenNeedsRefresh = true;
    return this.manageHide_clicked();
  };

  this.saveSettings = function() {
    return this.setKey('settings', stringify(Params.settings));
  };

  this.stringify = function(object) {
    try {
      if (_this['uneval']) {
        return uneval(object);
      } else if (_this['JSON']) {
        if (typeof object === 'object') {
          return '(' + JSON.stringify(object) + ')';
        } else {
          return JSON.stringify(object);
        }
      }
    } catch (_error) {}
  };

  this.sortIgnoredThreadsByTitle = function(a, b) {
    var sortVal;
    if (a.title === b.title) {
      sortVal = 0;
    } else {
      sortVal = a.title < b.title ? -1 : 1;
    }
    return sortVal;
  };

  this.sortIgnoredThreadsByDate = function(a, b) {
    var sortVal;
    sortVal = parseInt(b.addedAt) - parseInt(a.addedAt);
    return sortVal;
  };

  this.domCreate_closeBar = function($dialog) {
    var $btn, $div, $h3, $paypalButton;
    $div = $('<div>').addClass('GM-vBh-modal-header');
    $btn = $('<button>').addClass('GM-vBh-close').html('×');
    $div.append($btn);
    $paypalButton = "<form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top' class='GM-vBh-donate-form GM-vBh-sd'>\n<input type='hidden' name='cmd' value='_s-xclick'>\n<input type='hidden' name='hosted_button_id' value='9AMY7TJ8WBDQS'>\n<input type='submit' name='submit' value=\"Donate\" class=\"vbh-btn vbh vbh-btn-danger GM-vBh-donate-btn\" alt='Donate' title='Want to contribute to this script? I like being encouraged to make it better.'/>\n<img alt='' border='0' src='https://www.paypalobjects.com/en_US/i/scr/pixel.gif' width='1' height='1'>\n</form>";
    $div.append($paypalButton);
    $h3 = $('<h3>').html("" + Params.scriptName + " V" + Params.versionMajor + "." + Params.versionMinor + "." + Params.versionBuild);
    if (Params.screenNeedsRefresh === true) {
      $btn.attr('id', 'needsRefresh').click(function() {
        return closeButton_clicked();
      });
    } else {
      $btn.click(function() {
        $('#gm-vbh-manage-hides').hide();
        return $('.gm-vbh-modal-backdrop').remove();
      });
    }
    $div.append($h3);
    return $dialog.append($div);
  };

  this.domCreate_modalBody = function($dialog) {
    var $div;
    $div = $('<div>').addClass('GM-vBh-modal-body');
    $div.appendTo($dialog);
    return $div;
  };

  this.domCreate_manageHidesWindow = function() {
    var $manageHidesWindow;
    if ($('#gm-vbh-manage-hides').length === 0) {
      $manageHidesWindow = $('<div>').attr('id', 'gm-vbh-manage-hides').addClass("vbh GM-vBh-modal");
      $('html body').append($manageHidesWindow);
      $manageHidesWindow.hide();
    }
    return $('#gm-vbh-manage-hides');
  };

  this.domCreate_helperScript = function() {
    var scriptString;
    return scriptString = "pressButtonIfEnter = function(e, btnToClick) {var k; if (window.event) {k=window.event.keyCode;} else {k=e.keyCode} if (k==13) {btnToClick.click();}}";
  };

  this.domCreate_insertHelperScript = function() {
    var dlg, helperScript, s;
    helperScript = domCreate_helperScript();
    s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    s.text = helperScript;
    dlg = document.getElementById('gm-vbh-manage-hides');
    return dlg.appendChild(s);
  };

  this.sd = function() {
    if (Params.settings.hlr || Params.settings.hd) {
      return $('.GM-vBh-sd').hide();
    } else {
      return $('.GM-vBh-sd').show();
    }
  };

  this.domCreate_topContent = function($dialog) {
    var $div, chks, dt;
    dt = "<p class='GM-vBh-sd' style=\"margin-top: 20px\"><span class=\"GM-vBh-heading3\">Want to make the Donate button go away?</span><br>\n  It's easy: You could contribute to future development by donating $5 to the cause. Fixing bugs and adding features takes time \n  so a little somethin' somethin' makes this project fun. If you don't want to contribute, I'd really appreciate a review \n  on userscripts.org (<a target=\"_top\" href='" + this.reviewUrl + "'>here</a>).  I've got a lot of downloads but only one person\n  (thanks BrianTerance!) has taken\n  the time to review it yet. <b>Crazy right?</b> I'd really dig a few reviews to get the word out.</p>\n  \n<p class='GM-vBh-sd' style=\"margin-top: 20px\">If you've been generous enough to donate or write a reivew, then check one or both of the boxes below:</p>";
    chks = "<p style=\"margin-top: 20px\">\n  <input type='checkbox' class=\"GM-vBh-chk-donated\" name='chk-have-donated' " + (Params.settings.hd ? "CHECKED" : "") + "/>\n  <label for='chk-have-donated'>I have donated</label>\n  <input type='checkbox' class=\"GM-vBh-chk-reviewed\" name='chk-have-reviewed' " + (Params.settings.hlr ? "CHECKED" : "") + "/>\n  <label for='chk-have-reviewed'>I have left a review <a href=\"" + this.reviewUrl + "\" target=\"_top\">here</a></label>\n</p>";
    $div = $('<div>').addClass('vbh-well').html("<p>vBulletin Thread Hider and More allows you to ignore threads based on individual\nthread IDs, or strings in the title of the thread. It also will ignore threads\nstarted by any user on your Ignore User List.</p>\n\n<p>Visit the script's homepage at <a class=\"vbh-link\" href=\"http://userscripts.org/scripts/show/120455\">Userscripts.org</a>.</p>" + dt + chks);
    return $dialog.append($div);
  };

  this.domCreate_sectionHeader = function($dialog, headerText) {
    var $h3;
    $h3 = $('<div>').addClass('vbh-secheader').html(headerText);
    return $dialog.append($h3);
  };

  this.domCreate_miscOptions = function($dialog) {
    var $chk, $chk2, $div, $div2, $lbl, $lbl2, $spacerDiv;
    $div = $('<div>');
    $chk = $('<input>').attr('type', 'checkbox').addClass("vbh").attr('title', 'Experimental: Show Rating Theshold Control on the control bar');
    if (Params.settings.showRatingThreshold) {
      $chk.prop('checked', true);
    }
    $chk.click(function() {
      return showRatingThesholdCallback(this);
    });
    $lbl = $('<span>').html("<span class='vbh-alert'>Experimental:</span> Show Post Rating Theshold Box on the Control Bar (Don't turn this on unless you know what you're doing)");
    $chk.appendTo($div);
    $lbl.appendTo($div);
    $div2 = $('<div>');
    $chk2 = $('<input>').attr('type', 'checkbox').addClass("vbh").attr('title', 'Ignore downvotes when calculating rating threshold (only applies if you check the checkbox above)');
    if (Params.settings.ignoreDownvotes) {
      $chk2.prop('checked', true);
    }
    $chk2.click(function() {
      return ignoreDownvotesCallback(this);
    });
    $lbl2 = $('<span>').html("<span class='vbh-alert'>Experimental:</span> Ignore downvotes when calculating the rating threshold. This only applies when the above checkbox is checked.");
    $chk2.appendTo($div2);
    $lbl2.appendTo($div2);
    $spacerDiv = $('<div>').attr('style', 'margin-bottom: 25px;');
    $dialog.append($div);
    $dialog.append($div2);
    return $dialog.append($spacerDiv);
  };

  this.domCreate_whitelistUsers = function($dialog) {
    var $btn, $cell0, $cell1, $commandsDiv, $explanation, $listing, $lnk, $row, $span, $tbl, $td, $tr, $txt, i, thisWhitelist, thisWl, _i, _len;
    $commandsDiv = $('<div>').attr('style', 'width:50%');
    $txt = $('<input>').attr('type', 'text').attr('id', 'gm-vbh-txt-add-whitelist-author').addClass('vbh').attr('onKeyUp', "pressButtonIfEnter(event, getElementById('btnAddWhitelistAuthor'))");
    $btn = $('<button>').addClass('vbh-btn vbh-btn-primary').attr('id', 'btnAddWhitelistAuthor').html('Add');
    $btn.click(function() {
      return btnAddWhitelistAuthor_clicked(this);
    });
    $lnk = $('<a>').html('Remove All').addClass('vbh-link vbh-removeall').click(function() {
      if (confirm('Are you sure?')) {
        return btnRemoveAllWhitelistAuthors_clicked();
      }
    });
    $commandsDiv.append($txt);
    $commandsDiv.append($btn);
    $commandsDiv.append($lnk);
    $listing = $('<div>').addClass('vbh-list-box');
    $tbl = $('<table>').attr('style', 'font-size: x-small');
    if (WhitelistAuthors.length === 0) {
      $span = $('<span>').addClass('vbh-watermark').html("You don't have anyone in your whitelist. You may want to add your username to this list.");
      $tr = $('<tr>');
      $td = $('<td>');
      $tbl.append($tr);
      $tr.append($td);
      $td.append($span);
    } else {
      for (i = _i = 0, _len = WhitelistAuthors.length; _i < _len; i = ++_i) {
        thisWl = WhitelistAuthors[i];
        thisWhitelist = thisWl.string;
        $row = $('<tr>');
        $tbl.append($row);
        $cell0 = $('<td>').attr('style', 'width: 25px;');
        $btn = $('<input>').attr('type', 'button').val('X').attr('title', "Remove '" + thisWhitelist + "' from your whitelist.");
        $btn.attr('id', thisWhitelist);
        $btn.attr('style', 'width: 20px; height: 20px;');
        $btn.click(function() {
          return removeWhitelistAuthor_clicked(this);
        });
        $cell0.append($btn);
        $row.append($cell0);
        $cell1 = $('<td>').attr('style', 'width: 95%');
        $span = $('<span>').attr('style', 'font-weight: bold; color: #a00;').html(thisWhitelist);
        $row.append($cell1);
        $cell1.append($span);
      }
    }
    $listing.append($tbl);
    $explanation = $("<div>").addClass("vbh-well vbh-right").html("If you add someone to\nthis list <span style=\"font-weight: bold\">you will always see their posts</span>. It's \nprobably a good idea to add your own username/handle to this list so you can \nalways see your posts.");
    $dialog.append($commandsDiv);
    $dialog.append($listing);
    return $dialog.append($explanation);
  };

  this.domCreate_ignoreUsers = function($dialog) {
    var $btn, $cell0, $cell1, $commandsDiv, $explanation, $listing, $lnk, $row, $span, $tbl, $td, $tr, $txt, i, thisIgn, thisIgnore, _i, _len;
    $commandsDiv = $('<div>').attr('style', 'width:50%');
    $txt = $('<input>').attr('type', 'text').attr('id', 'gm-vbh-txt-add-ignore-author').addClass('vbh').attr('onKeyUp', "pressButtonIfEnter(event, getElementById('btnAddAuthor'))");
    $btn = $('<button>').addClass('vbh-btn vbh-btn-primary').attr('id', 'btnAddAuthor').html('Add');
    $btn.click(function() {
      return btnAddAuthor_clicked(this);
    });
    $lnk = $('<a>').html('Remove All').addClass('vbh-link vbh-removeall').click(function() {
      if (confirm('Are you sure?')) {
        return btnRemoveAllIgnoredAuthors_clicked();
      }
    });
    $commandsDiv.append($txt);
    $commandsDiv.append($btn);
    $commandsDiv.append($lnk);
    $listing = $('<div>').addClass('vbh-list-box');
    $tbl = $('<table>').attr('style', 'font-size: x-small');
    if (IgnoredAuthors.length === 0) {
      $span = $('<span>').addClass('vbh-watermark').html('You are not ignoring any users. You must have a very pleasant board.');
      $tr = $('<tr>');
      $td = $('<td>');
      $tbl.append($tr);
      $tr.append($td);
      $td.append($span);
    } else {
      for (i = _i = 0, _len = IgnoredAuthors.length; _i < _len; i = ++_i) {
        thisIgn = IgnoredAuthors[i];
        thisIgnore = thisIgn.string;
        $row = $('<tr>');
        $tbl.append($row);
        $cell0 = $('<td>').attr('style', 'width: 25px;');
        $btn = $('<input>').attr('type', 'button').val('X').attr('title', "Stop ignoring posts/threads from '" + thisIgnore + "'");
        $btn.attr('id', thisIgnore);
        $btn.attr('style', 'width: 20px; height: 20px;');
        $btn.click(function() {
          return removeIgnoreAuthor_clicked(this);
        });
        $cell0.append($btn);
        $row.append($cell0);
        $cell1 = $('<td>').attr('style', 'width: 95%');
        $span = $('<span>').attr('style', 'font-weight: bold; color: #a00;').html(thisIgnore);
        $row.append($cell1);
        $cell1.append($span);
      }
    }
    $listing.append($tbl);
    $explanation = $("<div>").addClass("vbh-well vbh-right").html("If you add someone to " + "your <span style='font-weight: bold'>Ignore Users</span> list you won't see any of their " + "posts. You also won't be able to see <span style='font-weight: bold'>threads started by</span> the user.");
    $dialog.append($commandsDiv);
    $dialog.append($listing);
    return $dialog.append($explanation);
  };

  this.addIgnoreStringToDom = function(thisIg, $tbl) {
    var $btn, $cell0, $cell1, $row, $span, thisIgnore;
    thisIgnore = thisIg.string;
    $row = $('<tr>');
    $tbl.append($row);
    $cell0 = $('<td>').attr('style', 'width: 25px;');
    $btn = $('<input>').attr('type', 'button').val('X').attr('title', 'Stop ignoring threads that contain \'' + thisIgnore + '\'');
    $btn.attr('id', thisIgnore);
    $btn.attr('style', 'width: 20px; height: 20px;');
    $btn.click(function(evt) {
      return removeIgnoreString_clicked(evt, evt.target);
    });
    $cell0.append($btn);
    $row.append($cell0);
    $cell1 = $('<td>').attr('style', 'width: 95%');
    $span = $('<span>').attr('style', 'font-weight: bold; color: #a00;').html(thisIgnore);
    $row.append($cell1);
    return $cell1.append($span);
  };

  this.domCreate_ignoreStrings = function($dialog) {
    var $btn, $commandsDiv, $explanation, $listing, $lnk, $span, $tbl, $td, $tr, $txt, i, style, thisIg, _i, _len;
    $commandsDiv = $('<div>').attr('style', 'width:50%');
    $txt = $('<input>').attr('type', 'text').attr('id', 'txtAddIgnoreString').addClass('vbh').attr('onKeyUp', "pressButtonIfEnter(event, getElementById('btnAddIgnored'))");
    $btn = $('<button>').addClass('vbh-btn vbh-btn-primary').attr('id', 'btnAddIgnored').html('Add');
    $btn.click(function(evt) {
      return btnAddIgnoreString_clicked(evt, evt.target);
    });
    $lnk = $('<a>').html('Remove All').addClass('vbh-link vbh-removeall').click(function() {
      if (confirm('Are you sure?')) {
        return btnRemoveAllIgnoredStrings_clicked();
      }
    });
    $commandsDiv.append($txt);
    $commandsDiv.append($btn);
    $commandsDiv.append($lnk);
    $listing = $('<div>').addClass('vbh-list-box');
    $tbl = $('<table>').attr('style', 'font-size: x-small').addClass('gm-vbh-tbl-ignored-strings');
    if (IgnoredStrings.length === 0) {
      $span = $('<span>').addClass('vbh-watermark').html('You have no strings that you using to ignore threads. You must have a very pleasant board.');
      $tr = $('<tr>');
      $td = $('<td>');
      $tbl.append($tr);
      $tr.append($td);
      $td.append($span);
    } else {
      for (i = _i = 0, _len = IgnoredStrings.length; _i < _len; i = ++_i) {
        thisIg = IgnoredStrings[i];
        addIgnoreStringToDom(thisIg, $tbl);
      }
    }
    $listing.append($tbl);
    style = "background:#eee; float:right; width:45%;padding: 5px; height: 200px;";
    $explanation = $('<div>').addClass('vbh-well vbh-right').html('If you add a string to ' + 'this list, it will <span style="font-weight:bold">ignore threads that contain the string in the title</span> ' + '. It won\'t ' + 'ignore threads that have the string in the <em>content</em> of the thread, just the title.');
    $dialog.append($commandsDiv);
    $dialog.append($listing);
    return $dialog.append($explanation);
  };

  this.domCreate_ignoredThreads = function($dialog) {
    var $btn, $cell0, $cell1, $commandsDiv, $explanation, $listing, $lnk, $row, $span, $tbl, $td, $tr, i, style, thisIgnore, thisIgnoreId, thisIgnoreTitle, _i, _len;
    $commandsDiv = $('<div>').attr('style', 'width:50%');
    $btn = $('<button>').addClass('vbh-btn vbh-btn-primary').attr('id', 'btnAddIgnored');
    if (Params.settings.sortBy === 'date') {
      $btn.attr('id', 'title').html('Sort Alphabetically');
    } else {
      $btn.attr('id', 'date').html('Sort By Time Added');
    }
    $btn.click(function() {
      return sortByCallback(this);
    });
    $lnk = $('<a>').html('Remove All').addClass('vbh-link vbh-removeall').click(function() {
      if (confirm('Are you sure?')) {
        return btnRemoveAllIgnoredThreads_clicked();
      }
    });
    $commandsDiv.append($btn);
    $commandsDiv.append($lnk);
    style = "border:1px solid black; padding: 5px; width: 50%; height: 200px; overflow-y:scroll;float:left;margin-bottom:25px;";
    $listing = $('<div>').addClass('vbh-list-box vbh-list-box-tall');
    $tbl = $('<table>').attr('style', 'font-size: x-small');
    if (IgnoredThreads.length === 0) {
      $span = $('<span>').addClass('vbh-watermark').html("You aren't ignoring any threads. You must have a very pleasant board.");
      $tr = $('<tr>');
      $td = $('<td>');
      $tbl.append($tr);
      $tr.append($td);
      $td.append($span);
    } else {
      if (Params.settings.sortBy === 'title') {
        IgnoredThreads = IgnoredThreads.sort(sortIgnoredThreadsByTitle);
      } else {
        IgnoredThreads = IgnoredThreads.sort(sortIgnoredThreadsByDate);
      }
      for (i = _i = 0, _len = IgnoredThreads.length; _i < _len; i = ++_i) {
        thisIgnore = IgnoredThreads[i];
        thisIgnoreId = thisIgnore.id;
        thisIgnoreTitle = thisIgnore.title;
        $row = $('<tr>');
        $tbl.append($row);
        $cell0 = $('<td>').attr('style', 'width: 25px;');
        $btn = $('<input>').attr('type', 'button').val('X').attr('title', 'Stop ignoring this thread');
        $btn.attr('id', thisIgnoreId);
        $btn.attr('style', 'width: 20px; height: 20px;');
        $btn.click(function() {
          return removeIgnoreIdCallback(this);
        });
        $cell0.append($btn);
        $row.append($cell0);
        $cell1 = $('<td>').attr('style', 'width: 95%');
        $span = $('<span>').attr('style', 'font-weight: bold; color: #a00;').html(thisIgnoreTitle);
        $row.append($cell1);
        $cell1.append($span);
      }
    }
    $listing.append($tbl);
    style = "background:#eee; float:right; width:45%;padding: 5px; height: 200px;";
    $explanation = $('<div>').addClass('vbh-well vbh-right').html('These are individual threads that you have ' + 'chosen to ignore. You can remove a thread from this list ' + '(making the thread visible again).');
    $dialog.append($commandsDiv);
    $dialog.append($listing);
    return $dialog.append($explanation);
  };

  this.domCreate_okayButton = function($dialog) {
    var $btn, $div;
    $div = $('<div>').addClass('GM-vBh-modal-footer');
    $btn = $('<button>').addClass('vbh-btn vbh');
    $btn.html('Ok');
    if (Params.screenNeedsRefresh === true) {
      $btn.attr('id', 'needsRefresh').click(function() {
        return closeButton_clicked();
      });
    } else {
      $btn.click(function() {
        $('#gm-vbh-manage-hides').hide();
        return $('.gm-vbh-modal-backdrop').remove();
      });
    }
    $div.append($btn);
    return $div.appendTo($dialog);
  };

  this.loadAllIgnored = function() {
    if (IgnoredThreads.length === 0) {
      loadIgnoredThreads();
    }
    if (IgnoredAuthors.length === 0) {
      loadIgnoredAuthors();
    }
    if (IgnoredStrings.length === 0) {
      loadIgnoredStrings();
    }
    if (WhitelistAuthors.length === 0) {
      return loadWhitelistAuthors();
    }
  };

  this.wireup = function() {
    var _this = this;
    $('.GM-vBh-modal-body').on('click', '.GM-vBh-chk-donated', function(evt) {
      var $chk, enabled;
      $chk = $(evt.target);
      enabled = $chk.prop('checked');
      Params.settings.hd = enabled;
      _this.saveSettings();
      return _this.sd();
    });
    return $('.GM-vBh-modal-body').on('click', '.GM-vBh-chk-reviewed', function(evt) {
      var $chk, enabled;
      $chk = $(evt.target);
      enabled = $chk.prop('checked');
      Params.settings.hlr = enabled;
      _this.saveSettings();
      return _this.sd();
    });
  };

  this.manageHide_clicked = function() {
    var $body, $dialog, height, modalBg, width;
    console.log("manageHide_clicked!");
    console.trace();
    this.loadAllIgnored();
    $dialog = this.domCreate_manageHidesWindow();
    $dialog.html('');
    this.domCreate_insertHelperScript();
    this.domCreate_closeBar($dialog);
    $body = this.domCreate_modalBody($dialog);
    this.domCreate_topContent($body);
    this.domCreate_sectionHeader($body, 'Ignore Users');
    this.domCreate_ignoreUsers($body);
    this.domCreate_sectionHeader($body, "Always Show posts by These Users");
    this.domCreate_whitelistUsers($body);
    this.domCreate_sectionHeader($body, 'Ignore Threads That Contain');
    this.domCreate_ignoreStrings($body);
    this.domCreate_sectionHeader($body, 'Ignored Threads');
    this.domCreate_ignoredThreads($body);
    this.domCreate_sectionHeader($body, 'Miscellaneous Options');
    this.domCreate_miscOptions($body);
    this.wireup();
    this.sd();
    this.domCreate_okayButton($dialog);
    width = screen.availWidth;
    height = screen.availHeight;
    if ($('.gm-vbh-modal-backdrop').length === 0) {
      modalBg = $('<div>').addClass('gm-vbh-modal-backdrop');
      $dialog.after(modalBg);
      modalBg.click(function() {
        if (Params.screenNeedsRefresh === true) {
          return this.closeButton_clicked();
        } else {
          $('#gm-vbh-manage-hides').hide();
          return $('.gm-vbh-modal-backdrop').remove();
        }
      });
    }
    return $dialog.show();
  };

  this.insertHeaderbar = function() {
    var $chk, $headerClear, $headerInner, $headerLeft, $headerRight, $headerTopInfo, $lbl, $lbl2, $txt, style, tooltip;
    $headerTopInfo = $('<div>').addClass('vbh-navbar');
    $headerInner = $('<div>').addClass('vbh-navbar-inner2');
    $headerLeft = $('<div>').addClass('vbh-header');
    style = "float:right; padding-right: 4px; display:block;";
    $headerRight = $('<div>').attr('style', style);
    style = "height:0px; line-height:0px; font-size:0px; clear:both; margin:0px; padding:0px; width:100%";
    $headerClear = $('<div>').attr('style', style);
    $headerLeft.append($('<span>').html("<span class='gm-vbh-script-name'>" + Params.scriptName + "</span>"));
    if (Params.settings.showRatingThreshold) {
      if (Params.settings.ignoreDownvotes) {
        tooltip = 'Posts must have an upvote rating greater than or equal to the rating threshold to be shown.';
      } else {
        tooltip = 'Posts must have a NET rating greater than or equal to the rating threshold to be shown.';
      }
      $lbl = $('<span>').addClass('vbh').html('Post Rating Threshold:').attr('title', tooltip);
      $txt = $('<input>');
      $txt.attr('type', 'text').attr('id', 'gm-vbh-txt-rating-threshold').attr('maxlength', '3').attr('size', '3').addClass('vbh').val(Params.settings.ratingThreshold);
      $txt.on('keyup', function(e) {
        return txtRatingThreshold_changed(e);
      });
      $chk = $('<input>').attr('type', 'checkbox').attr('id', 'gm-vbh-chkenable').attr('title', tooltip).addClass('vbh').click(function() {
        return chkEnableRatingThreshold_clicked();
      });
      if (Params.settings.ratingThresholdEnabled) {
        $chk.prop('checked', true);
      }
      $lbl2 = $('<span>').addClass('vbh').html('Enabled').attr('title', tooltip).attr('style', 'margin-right: 25px');
      $headerRight.append($lbl);
      $headerRight.append($txt);
      $headerRight.append($chk);
      $headerRight.append($lbl2);
    }
    $headerRight.append($('<input>').attr('type', 'button').addClass('vbh-header-btn vbh-btn').val('Options').click(function() {
      return manageHide_clicked();
    }));
    $headerRight.append($('<input>').attr('type', 'button').addClass('vbh-header-btn vbh-btn').addClass('gm-vbh-disable').val(TEMP_DISABLE).attr('title', 'Temporarily disable/enable hiding of threads/posts. (ALT-Up Arrow)').click(function() {
      return temporarilyDisable_clicked();
    }));
    $headerInner.append($headerLeft);
    $headerInner.append($headerRight);
    $headerInner.append($headerClear);
    $headerInner.appendTo($headerTopInfo);
    return $($('div.body_wrapper')[0]).prepend($headerTopInfo);
  };

  this.updatePage = function() {
    if (Params.screenNeedsRefresh) {
      return location.reload(true);
    } else {
      if (Params.env.isPostlist) {
        return this.handlePostsPage(false);
      } else {
        return this.handleThreadsPage(false);
      }
    }
  };

  this.updatePageShowAll = function() {
    if (Params.env.isPostlist) {
      return this.handlePostsPage(true);
    } else {
      return this.handleThreadsPage(true);
    }
  };

  this.handlePostsPage = function(isTemporarilyDisabled) {
    var $hiddens, $li, $postLis, $ratingSpan, author, index, li, postId, postShouldBeIgnored, _i, _j, _len, _len1, _results, _results1;
    if (isTemporarilyDisabled == null) {
      isTemporarilyDisabled = false;
    }
    if (isTemporarilyDisabled) {
      $hiddens = $('#posts').children('li.gm-vbh-hidden');
      $(".collapse").filter("div").show();
      _results = [];
      for (_i = 0, _len = $hiddens.length; _i < _len; _i++) {
        li = $hiddens[_i];
        $li = $(li);
        _this.showItFaded($li);
        _results.push(_this.highlightElem($li));
      }
      return _results;
    } else {
      _this.loadIgnoredAuthors();
      _this.loadWhitelistAuthors();
      $postLis = $('#posts').children('li');
      $(".collapse").filter("div").hide();
      _results1 = [];
      for (index = _j = 0, _len1 = $postLis.length; _j < _len1; index = ++_j) {
        li = $postLis[index];
        $li = $(li);
        author = $li.find('a.username').html();
        if (author != null) {
          author = _this.stripOffTags(author);
          postShouldBeIgnored = false;
          postId = parseInt($li.attr('id').substring(5));
          if (Params.settings.ratingThresholdEnabled && Params.settings.showRatingThreshold) {
            $ratingSpan = $('#helpfulanswers_box_' + postId);
            if ($ratingSpan.length > 0) {
              postShouldBeIgnored = _this.shouldIgnoreHelpfulAnswers($ratingSpan);
            } else {
              $ratingSpan = $("#dbtech_thanks_actions_" + postId);
              if ($ratingSpan.length > 0) {
                postShouldBeIgnored = _this.shouldIgnoreThanks($ratingSpan);
              }
            }
          }
        }
        if ((postShouldBeIgnored || _this.shouldIgnoreByAuthor(author) >= 0) && _this.shouldWhitelistByAuthor(author) < 0) {
          _results1.push(_this.hideIt($li));
        } else {
          _results1.push(_this.showItNormally($li));
        }
      }
      return _results1;
    }
  };

  this.shouldIgnoreThanks = function($ratingSpan) {
    var downRating, score, upRating;
    upRating = $ratingSpan.children('a[data-button="likes"]').text();
    downRating = $ratingSpan.children('a[data-button="dislikes"]').text();
    upRating = this.stripOffNbspAndParens(upRating);
    downRating = this.stripOffNbspAndParens(downRating);
    console.log("up: " + upRating + " down: " + downRating);
    if (Params.settings.ignoreDownvotes) {
      downRating = 0;
    }
    score = upRating - downRating;
    console.log("Score: " + score + ", threshold: " + Params.settings.ratingThreshold);
    if (score < Params.settings.ratingThreshold) {
      return true;
    } else {
      return false;
    }
  };

  this.shouldIgnoreHelpfulAnswers = function($ratingSpan) {
    var downRating, score, upRating;
    upRating = $ratingSpan.children('a[class^=rateuppost], span[class^=rateuppost]').html();
    downRating = $ratingSpan.children('a[class^=ratedownpost],span[class^=ratedownpost]').html();
    upRating = this.stripOffNbspAndParens(upRating);
    downRating = this.stripOffNbspAndParens(downRating);
    if (Params.settings.ignoreDownvotes) {
      downRating = 0;
    }
    score = upRating - downRating;
    if (score < Params.settings.ratingThreshold) {
      return true;
    } else {
      return false;
    }
  };

  this.showItNormally = function($elem) {
    return $elem.removeClass('gm-vbh-hidden gm-vbh-faded').show();
  };

  this.showItFaded = function($elem) {
    return $elem.addClass('gm-vbh-hidden gm-vbh-faded').show();
  };

  this.hideIt = function($elem) {
    return $elem.addClass('gm-vbh-hidden').removeClass('gm-vbh-faded').hide();
  };

  this.stripOffTags = function(stringToStrip) {
    var error, match, regEx;
    regEx = /^<.*>(.*)<\/.*>$/;
    match = regEx.exec(stringToStrip);
    try {
      return match[1];
    } catch (_error) {
      error = _error;
      console.error("Error stripping tags from " + stringToStrip + ": " + error);
      console.dir(error);
      return stringToStrip;
    }
  };

  this.stripOffNbspAndParens = function(stringToStrip) {
    var error, match, regEx;
    regEx = /^\s*(&nbsp;|\()*(\d*)(&nbsp;|\))*$/;
    match = regEx.exec(stringToStrip);
    try {
      return match[2];
    } catch (_error) {
      error = _error;
      console.error("Error stripping off nbsp; and parens from '" + stringToStrip + "': " + error);
      console.dir(error);
      console.dir(match);
      return stringToStrip;
    }
  };

  this.rehideHiddenPosts = function() {
    $('li.gm-vbh-hidden').removeClass('gm-vbh-faded').addClass('gm-vbh-hidden').hide();
    return $(".collapse").filter("div").hide();
  };

  this.rehideHiddenThreads = function() {
    return $('div.gm-vbh-faded').removeClass('gm-vbh-faded').addClass('gm-vbh-hidden').hide();
  };

  this.handleThreadsPage = function(isTemporarilyDisabled) {
    var $button, $li, $threadLis, $titleLink, hiddenThreads, ignoreBy, ignoreKey, ignoringByAuthor, ignoringByThread, ignoringByTitle, index, li, thread, threadAuthor, threadId, threadTitle, whitelistedAuthor, _i, _j, _len, _len1, _results, _results1;
    if (isTemporarilyDisabled == null) {
      isTemporarilyDisabled = false;
    }
    if (isTemporarilyDisabled) {
      hiddenThreads = $('div.gm-vbh-hidden');
      _results = [];
      for (_i = 0, _len = hiddenThreads.length; _i < _len; _i++) {
        thread = hiddenThreads[_i];
        this.showItFaded($(thread));
        _results.push(this.highlightElem($(thread)));
      }
      return _results;
    } else {
      this.loadIgnoredThreads();
      this.loadIgnoredStrings();
      this.loadIgnoredAuthors();
      this.loadWhitelistAuthors();
      $threadLis = $('ol li[id^="thread_"]');
      _results1 = [];
      for (index = _j = 0, _len1 = $threadLis.length; _j < _len1; index = ++_j) {
        li = $threadLis[index];
        $li = $(li);
        $titleLink = $li.find('a[id^="thread_title_"]');
        threadTitle = $titleLink.html();
        threadId = parseInt($li.attr('id').substring(7));
        threadAuthor = $li.find('div.threadinfo').find('a.username').html();
        ignoringByThread = shouldIgnoreThreadById(threadId) >= 0;
        ignoringByTitle = shouldIgnoreThreadByTitle(threadTitle) >= 0;
        ignoringByAuthor = shouldIgnoreByAuthor(threadAuthor) >= 0;
        whitelistedAuthor = shouldWhitelistByAuthor(threadAuthor) >= 0;
        if (whitelistedAuthor) {
          ignoreBy = "";
          ignoreKey = "";
        }
        if (ignoringByThread) {
          ignoreBy = "thread";
          ignoreKey = threadId;
        } else if (ignoringByTitle) {
          ignoreBy = "title";
          ignoreKey = threadTitle;
        } else if (ignoringByAuthor) {
          ignoreBy = "author";
          ignoreKey = threadAuthor;
        } else {
          ignoreBy = "";
          ignoreKey = "";
        }
        if ((ignoringByThread || ignoringByTitle || ignoringByAuthor) && !whitelistedAuthor) {
          _results1.push(this.showThread($li, false, false, ignoreBy, ignoreKey));
        } else {
          this.showThread($li, true, false, ignoreBy, ignoreKey);
          if (!this.alreadyHasIgnoreButton($li)) {
            $button = createIgnoreThreadButton(threadTitle, threadId);
            _results1.push($titleLink.before($button));
          } else {
            _results1.push(void 0);
          }
        }
      }
      return _results1;
    }
  };

  this.threadButtonsCallBack = function(threadButton) {
    var $btn, d, ignoreMe, match, newIgnore, regEx, threadId, threadLi, threadTitle;
    $btn = $(threadButton);
    this.loadIgnoredThreads();
    ignoreMe = $btn.attr('id');
    regEx = /^\[(\d+)\](.*)$/;
    match = regEx.exec(ignoreMe);
    threadId = parseInt(match[1]);
    threadTitle = trim(match[2], '"');
    d = new Date();
    newIgnore = {
      id: threadId,
      title: threadTitle,
      addedAt: d.getTime() / 1000
    };
    IgnoredThreads[IgnoredThreads.length] = newIgnore;
    Params.screenNeedsRefresh = true;
    this.saveIgnoredThreads();
    threadLi = $('#thread_' + threadId);
    if (threadLi) {
      threadLi.find('input.ignoreButton').remove();
      return this.showThread(threadLi, false, false, 'thread', threadId);
    } else {
      return this.updatePage();
    }
  };

  this.highlightElem = function($elem) {
    $elem.addClass("GM_vBh_highlight new");
    $elem.focus();
    return $elem.removeClass("new");
  };

  this.addIgnoreRemoveButton = function($elem, ignoreBy, ignoreKey) {
    var $button, $titleLink, threadAuthor, threadId, threadTitle;
    if (ignoreBy === "") {
      $titleLink = $elem.find('a[id^="thread_title_"]');
      threadTitle = $titleLink.html();
      threadId = parseInt($titleLink.attr('id').substring(13));
      threadAuthor = $elem.find('div.threadinfo').find('a.username').html();
      $button = createIgnoreThreadButton(threadTitle, threadId);
    } else {
      $button = createStopIgnoreThreadButton(ignoreBy, ignoreKey);
    }
    this.removeButtons($elem);
    if ($button != null) {
      $titleLink = $elem.find('a[id^="thread_title_"]');
      return $titleLink.before($button);
    }
  };

  this.showThread = function($threadLi, shouldShow, highlight, ignoreBy, ignoreKey) {
    var $container, container;
    container = $threadLi.find('div').first();
    $container = $(container);
    addIgnoreRemoveButton($container, ignoreBy, ignoreKey);
    if (shouldShow) {
      return showItNormally($container);
    } else {
      if (Params.settings.showIgnored || Params.settings.temporaryShowIgnored) {
        showItFaded($container);
        highlightElem($container);
        return $container.find('input.ignoreButton').remove();
      } else {
        return hideIt($container);
      }
    }
  };

  this.removeButtons = function($container) {
    $container.find('.ignoreButton').remove();
    return $container.find('.stopIgnoreButton').remove();
  };

  this.createStopIgnoreThreadButton = function(ignoreBy, ignoreKey) {
    var $img, tooltip;
    tooltip = ignoreBy === 'thread' ? "Stop ignoring this thread" : ignoreBy === 'author' ? "Stop ignoring author " + ignoreKey : "";
    if (tooltip !== "") {
      return $img = $('<img>').attr('src', "data:png;base64," + image_unban).attr('title', tooltip).attr('id', "si[" + ignoreBy + "]" + ignoreKey).attr('class', 'stopIgnoreButton vbh').click(function() {
        return stopIgnoringCallback(this);
      });
    }
  };

  this.createIgnoreThreadButton = function(threadTitle, threadId) {
    var $img;
    return $img = $('<img>').attr('src', "data:png;base64," + image_ban).attr('title', "Ignore Thread '" + threadTitle + "'").attr('id', "[" + threadId + "]" + (this.stringify(threadTitle))).attr('class', 'ignoreButton vbh').click(function() {
      return threadButtonsCallBack(this);
    });
  };

  this.loadIgnoredThreads = function() {
    var ignoredThreadsText;
    ignoredThreadsText = getKey("IgnoredThreads", "[{id: -1, title:'', addedAt:'321654'}]");
    IgnoredThreads = eval(ignoredThreadsText);
    return removeIgnoredThreadById(-1);
  };

  this.loadIgnoredStrings = function() {
    var ignoredStringsText;
    ignoredStringsText = getKey("IgnoredStrings", "[{string: 'bogusString11', addedAt:'321654'}]");
    IgnoredStrings = eval(ignoredStringsText);
    return removeIgnoredString('bogusString11');
  };

  this.loadIgnoredAuthors = function() {
    var ignoredAuthorsText;
    ignoredAuthorsText = this.getKey("IgnoredAuthors", "[{string: 'bogusAuthor11', addedAt:'321654'}]");
    IgnoredAuthors = eval(ignoredAuthorsText);
    return this.removeIgnoredAuthor('bogusAuthor11');
  };

  this.loadWhitelistAuthors = function() {
    var whitelistAuthorsText;
    whitelistAuthorsText = getKey("WhitelistAuthors", "[{string: 'bogusAuthor12', addedAt:'321654'}]");
    WhitelistAuthors = eval(whitelistAuthorsText);
    return this.removeWhitelistAuthor('bogusAuthor12');
  };

  this.removeIgnoredThreadById = function(threadId) {
    var idx, thread, _i, _len, _results;
    _results = [];
    for (idx = _i = 0, _len = IgnoredThreads.length; _i < _len; idx = ++_i) {
      thread = IgnoredThreads[idx];
      if (thread != null) {
        if (thread.id === threadId) {
          _results.push(IgnoredThreads.splice(idx, 1));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  this.removeIgnoredString = function(removeMe) {
    var idx, val, _i, _len, _results;
    _results = [];
    for (idx = _i = 0, _len = IgnoredStrings.length; _i < _len; idx = ++_i) {
      val = IgnoredStrings[idx];
      if (val != null) {
        if (val.string === removeMe) {
          _results.push(IgnoredStrings.splice(idx, 1));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  this.removeWhitelistAuthor = function(removeMe) {
    var idx, val, _i, _len, _results;
    _results = [];
    for (idx = _i = 0, _len = WhitelistAuthors.length; _i < _len; idx = ++_i) {
      val = WhitelistAuthors[idx];
      if (val != null) {
        if (val.string === removeMe) {
          _results.push(WhitelistAuthors.splice(idx, 1));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  this.saveIgnoredThreads = function() {
    return this.setKey("IgnoredThreads", this.stringify(IgnoredThreads));
  };

  this.saveIgnoredStrings = function() {
    return this.setKey("IgnoredStrings", this.stringify(IgnoredStrings));
  };

  this.saveIgnoredAuthors = function() {
    return this.setKey("IgnoredAuthors", this.stringify(IgnoredAuthors));
  };

  this.removeIgnoredAuthor = function(removeMe) {
    var idx, val, _i, _len, _results;
    _results = [];
    for (idx = _i = 0, _len = IgnoredAuthors.length; _i < _len; idx = ++_i) {
      val = IgnoredAuthors[idx];
      if (val != null) {
        if (val.string === removeMe) {
          _results.push(IgnoredAuthors.splice(idx, 1));
        } else {
          _results.push(void 0);
        }
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  this.saveWhitelistAuthors = function() {
    return this.setKey("WhitelistAuthors", stringify(WhitelistAuthors));
  };

  this.shouldIgnoreThreadByTitle = function(title) {
    var i, regEx, thisIg, _i, _len;
    if (IgnoredStrings.length > 0) {
      for (i = _i = 0, _len = IgnoredStrings.length; _i < _len; i = ++_i) {
        thisIg = IgnoredStrings[i];
        regEx = new RegExp(thisIg.string, "gim");
        if (regEx.test(title)) {
          return i;
        }
      }
    }
    return -1;
  };

  this.shouldIgnoreThreadById = function(threadId) {
    var i, thread, _i, _len;
    if (IgnoredThreads.length > 0) {
      for (i = _i = 0, _len = IgnoredThreads.length; _i < _len; i = ++_i) {
        thread = IgnoredThreads[i];
        if (thread.id === threadId) {
          return i;
        }
      }
      return -1;
    } else {
      return -1;
    }
  };

  this.shouldIgnoreByAuthor = function(author) {
    var i, regEx, xAuthor, _i, _len;
    if (IgnoredAuthors.length > 0) {
      for (i = _i = 0, _len = IgnoredAuthors.length; _i < _len; i = ++_i) {
        xAuthor = IgnoredAuthors[i];
        regEx = new RegExp(xAuthor.string, "gim");
        if (regEx.test(author)) {
          return i;
        }
      }
      return -1;
    }
    return -1;
  };

  this.shouldWhitelistByAuthor = function(author) {
    var i, regEx, xAuthor, _i, _len;
    if (WhitelistAuthors.length > 0) {
      for (i = _i = 0, _len = WhitelistAuthors.length; _i < _len; i = ++_i) {
        xAuthor = WhitelistAuthors[i];
        regEx = new RegExp(xAuthor.string, "gim");
        if (regEx.test(author)) {
          return i;
        }
      }
      return -1;
    }
    return -1;
  };

  this.insertStyles = function() {
    var styleString =
".vbh-alert {" +
"  color: #ea965a; }" +
"" +
".GM-vBh-close {" +
"  color: #ecf0f1;" +
"  opacity: 0.4;" +
"  float: right;" +
"  font-size: 29px;" +
"  font-weight: bolder;" +
"  cursor: pointer;" +
"  background: none;" +
"  border: none; }" +
"" +
".GM-vBh-modal {" +
"  z-index: 99999;" +
"  background: #ecf0f1;" +
"  padding: 0;" +
"  position: fixed;" +
"  top: 10%;" +
"  border-radius: 6px;" +
"  color: #262626;" +
"  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
"  width: 800px;" +
"  display: block;" +
"  left: 50%;" +
"  margin-left: -400px;" +
"  position: fixed;" +
"  background-clip: padding-box;" +
"  box-shadow: 0 13px 13px rgba(0, 0, 0, 0.6);" +
"  outline: medium none; }" +
"  .GM-vBh-modal .GM-vBh-modal-header {" +
"    background-color: #2c3e50;" +
"    color: #ecf0f1;" +
"    padding: 9px 15px;" +
"    border-radius: 6px 6px 0 0; }" +
"    .GM-vBh-modal .GM-vBh-modal-header h3 {" +
"      font-size: 1.2em;" +
"      font-weight: bold;" +
"      color: #ecf0f1; }" +
"    .GM-vBh-modal .GM-vBh-modal-header .GM-vBh-close {" +
"      margin-top: -11px; }" +
"  .GM-vBh-modal .GM-vBh-modal-body {" +
"    overflow-y: auto;" +
"    max-height: 500px;" +
"    padding: 15px;" +
"    position: relative; }" +
"    .GM-vBh-modal .GM-vBh-modal-body label {" +
"      float: none;" +
"      display: inline; }" +
"  .GM-vBh-modal .GM-vBh-modal-footer {" +
"    background-color: #ecf0f1;" +
"    border-radius: 0 0 6px 6px;" +
"    border-top: 1px solid #aaaaaa;" +
"    box-shadow: 0 1px 0 #ecf0f1 inset;" +
"    margin-bottom: 0;" +
"    padding: 14px 15px 15px;" +
"    text-align: right; }" +
"    .GM-vBh-modal .GM-vBh-modal-footer:before, .GM-vBh-modal .GM-vBh-modal-footer:after {" +
"      content: '';" +
"      display: table;" +
"      line-height: 0; }" +
"    .GM-vBh-modal .GM-vBh-modal-footer:after {" +
"      clear: both; }" +
"" +
".GM-vBh-donate-form {" +
"  float: right;" +
"  position: relative;" +
"  top: -4px; }" +
"" +
".vbh-manage-hides {" +
"  z-index: 99999;" +
"  background: #ecf0f1;" +
"  padding: 15px;" +
"  overflow: auto;" +
"  position: fixed;" +
"  top: 15%;" +
"  color: #262626;" +
"  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
"  width: 800px;" +
"  display: block;" +
"  left: 50%;" +
"  margin-left: -400px;" +
"  position: fixed;" +
"  background-clip: padding-box;" +
"  border: 1px solid rgba(0, 0, 0, 0.3);" +
"  border-radius: 6px;" +
"  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);" +
"  outline: medium none; }" +
"" +
".vbh-watermark {" +
"  font-style: italic;" +
"  font-size: 1.2em;" +
"  color: #aaaaaa; }" +
"" +
".vbh {" +
"  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }" +
"" +
"h3.vbh {" +
"  font-size: 1.3em; }" +
"" +
".vbh-secheader {" +
"  clear: both;" +
"  font-size: 1.2em;" +
"  font-weight: bold;" +
"  border-bottom: 1px solid #dddddd;" +
"  margin-bottom: 6px;" +
"  padding-bttom: 5px; }" +
"" +
".vbh-list-box {" +
"  border: 1px solid #dddddd;" +
"  border-radius: 6px 6px 6px 6px;" +
"  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;" +
"  padding: 5px;" +
"  width: 50%;" +
"  height: 95px;" +
"  overflow-y: auto;" +
"  float: left;" +
"  margin-bottom: 25px; }" +
"" +
".vbh-list-box.vbh-list-box-tall {" +
"  height: 200px; }" +
"" +
".vbh-header {" +
"  font-size: 1.2em;" +
"  font-weight: bold;" +
"  float: left;" +
"  margin: 8px 6px; }" +
"" +
".vbh-navbar {" +
"  color: #777777;" +
"  margin-bottom: 20px;" +
"  overflow: visible;" +
"  clear: both; }" +
"" +
".vbh-navbar-inner2 {" +
"  background-color: #2c3e50;" +
"  background-image: linear-gradient(to bottom, #507192, #2c3e50);" +
"  background-repeat: repeat-x;" +
"  border-radius: 4px;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);" +
"  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);" +
"  min-height: 40px;" +
"  padding-left: 20px;" +
"  padding-right: 20px; }" +
"" +
".vbh-navbar-inner {" +
"  background-color: #dddddd;" +
"  background-image: linear-gradient(to bottom, #ecf0f1, #dddddd);" +
"  background-repeat: repeat-x;" +
"  border: 1px solid #aaaaaa;" +
"  border-radius: 4px 4px 4px 4px;" +
"  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);" +
"  min-height: 40px;" +
"  padding-left: 20px;" +
"  padding-right: 20px; }" +
"" +
".radio input[type='radio'].vbh, .checkbox input[type='checkbox'].vbh {" +
"  float: left;" +
"  margin-left: -20px; }" +
"" +
"input[type='submit'].vbh, input[type='reset'].vbh, input[type='button'].vbh, input[type='radio'].vbh, input[type='checkbox'].vbh {" +
"  width: auto; }" +
"" +
"input[type='radio'].vbh, input[type='checkbox'].vbh {" +
"  cursor: pointer;" +
"  line-height: normal;" +
"  margin: 4px 0 0; }" +
"" +
"button.vbh, input.vbh, select.vbh, textarea.vbh {" +
"  font-size: 100%;" +
"  margin: 0;" +
"  vertical-align: middle; }" +
"" +
"input.vbh:-moz-placeholder, textarea.vbh:-moz-placeholder {" +
"  color: #999999; }" +
"" +
"textarea.vbh, input[type='text'].vbh, input[type='search'].vbh, .uneditable-input {" +
"  background-color: #ecf0f1;" +
"  border: 1px solid #dddddd;" +
"  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;" +
"  transition: border 0.2s linear 0s, box-shadow 0.2s linear 0s; }" +
"" +
"select.vbh, textarea.vbh, input[type='text'].vbh, input[type='search'].vbh, .uneditable-input {" +
"  border-radius: 4px 4px 4px 4px;" +
"  color: #777777;" +
"  display: inline-block;" +
"  font-size: 14px;" +
"  height: 20px;" +
"  line-height: 20px;" +
"  margin: 4px 6px;" +
"  padding: 4px 6px;" +
"  vertical-align: middle; }" +
"" +
"input.vbh, textarea.vbh, .uneditable-input {" +
"  margin-left: 0; }" +
"" +
".vbh-btn {" +
"  border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25);" +
"  -moz-border-bottom-colors: none;" +
"  -moz-border-left-colors: none;" +
"  -moz-border-right-colors: none;" +
"  -moz-border-top-colors: none;" +
"  background-color: #e6e6e6;" +
"  background-image: -moz-linear-gradient(center top, #e6e6e6, #dddddd);" +
"  background-repeat: repeat-x;" +
"  border-color: #e6e6e6 #e6e6e6 #aaaaaa;" +
"  border-image: none;" +
"  border-radius: 4px 4px 4px 4px;" +
"  border-style: solid;" +
"  border-width: 1px;" +
"  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);" +
"  color: #333333;" +
"  cursor: pointer;" +
"  display: inline-block;" +
"  font-size: 14px;" +
"  line-height: 20px;" +
"  margin: 0 3px;" +
"  padding: 4px 14px;" +
"  text-align: center;" +
"  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);" +
"  vertical-align: middle;" +
"  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
"  line-height: normal;" +
"  cursor: pointer; }" +
"  .vbh-btn:hover {" +
"    background-image: -moz-linear-gradient(center top, #dddddd, #aaaaaa); }" +
"" +
".vbh-btn-danger {" +
"  background-color: #d62c1a;" +
"  background-image: -moz-linear-gradient(center top, #ed7669, #e74c3c);" +
"  background-repeat: repeat-x;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }" +
"  .vbh-btn-danger:hover {" +
"    background-image: -moz-linear-gradient(center top, #d62c1a, #ed7669); }" +
"" +
".vbh-btn-info {" +
"  background-color: #49afcd;" +
"  background-image: -moz-linear-gradient(center top, #5bc0de, #2f96b4);" +
"  background-repeat: repeat-x;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }" +
"  .vbh-btn-info:hover {" +
"    background-image: -moz-linear-gradient(center top, #49afcd, #5bc0de); }" +
"" +
".vbh-btn-primary {" +
"  background-color: #006dcc;" +
"  background-image: -moz-linear-gradient(center top, #409ad5, #0d293c);" +
"  background-repeat: repeat-x;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }" +
"  .vbh-btn-primary:hover {" +
"    background-image: -moz-linear-gradient(center top, #2980b9, #040c12); }" +
"" +
".vbh-btn-warning {" +
"  background-color: #db6c1c;" +
"  background-image: -moz-linear-gradient(center top, #c46119, #e47a2c);" +
"  background-repeat: repeat-x;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }" +
"  .vbh-btn-warning:hover {" +
"    background-image: -moz-linear-gradient(center top, #974b13, #c46119); }" +
"" +
".vbh-btn-success {" +
"  background-color: #5bb75b;" +
"  background-image: -moz-linear-gradient(center top, #62c462, #51a351);" +
"  background-repeat: repeat-x;" +
"  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);" +
"  color: #ecf0f1;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25); }" +
"  .vbh-btn-success:hover {" +
"    background-image: -moz-linear-gradient(center top, #42b142, #408140); }" +
"" +
".vbh-btn-mini {" +
"  font-size: 80%;" +
"  margin: 2px 5px;" +
"  vertical-align: top;" +
"  font-size: 11px;" +
"  line-height: 17px;" +
"  padding: 0px 4px; }" +
"" +
".vbh.ignoreButton, .vbh.stopIgnoreButton {" +
"  cursor: pointer;" +
"  margin-right: 3px; }" +
"" +
".vbh-label-success, .badge-success {" +
"  background-color: #468847; }" +
"" +
".gm-vbh-modal-backdrop {" +
"  background-color: #000000;" +
"  bottom: 0;" +
"  left: 0;" +
"  position: fixed;" +
"  right: 0;" +
"  top: 0;" +
"  z-index: 1040;" +
"  opacity: 0.6; }" +
"" +
"vbh-label-info, .badge-info {" +
"  background-color: #3a87ad; }" +
"" +
".vbh-label-important, .badge-important {" +
"  background-color: #e74c3c; }" +
"" +
".vbh-label {" +
"  border-radius: 3px 3px 3px 3px;" +
"  padding: 1px 4px 2px; }" +
"" +
".vbh-label, .vbh-badge {" +
"  background-color: #999999;" +
"  color: #ecf0f1;" +
"  font-size: 11.844px;" +
"  font-weight: bold;" +
"  line-height: 14px;" +
"  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);" +
"  vertical-align: baseline;" +
"  white-space: nowrap; }" +
"" +
".vbh-well {" +
"  background-color: #e6e6e6;" +
"  border: 1px solid #e3e3e3;" +
"  border-radius: 4px;" +
"  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05) inset;" +
"  margin-bottom: 20px;" +
"  min-height: 20px;" +
"  padding: 19px; }" +
"  .vbh-well p {" +
"    margin-top: 10px; }" +
"  .vbh-well p:first {" +
"    margin-top: 0px; }" +
"" +
".GM-vBh-heading3 {" +
"  font-size: large;" +
"  font-weight: bold; }" +
"" +
".GM-vBh-chk-reviewed, .GM-vBh-chk-donated {" +
"  margin-right: 3px; }" +
"  .GM-vBh-chk-reviewed:hover, .GM-vBh-chk-donated:hover {" +
"    cursor: pointer; }" +
"" +
".GM-vBh-chk-reviewed {" +
"  margin-left: 10px; }" +
"" +
".vbh-right {" +
"  float: right;" +
"  width: 42%; }" +
"" +
".vbh-link {" +
"  color: #3e5771;" +
"  text-decoration: underline;" +
"  cursor: pointer; }" +
"  .vbh-link:hover {" +
"    color: #698aac !important;" +
"    text-decoration: underline !important; }" +
"" +
".vbh-removeall {" +
"  float: right;" +
"  margin-top: 20px; }" +
"" +
".vbh-header-btn {" +
"  margin-top: 5px; }" +
"" +
".gm-vbh-script-name {" +
"  color: #f1df54; }" +
"" +
".gm-vbh-hidden {" +
"  display: none; }" +
"" +
".gm-vbh-faded {" +
"  opacity: 0.7;" +
"  border: 2px dashed #777777 !important; }" +
"" +
".GM_vBh_highlight {" +
"  background-color: transparent;" +
"  -moz-transition: background-color 2s;" +
"  transition: background-color 2s; }" +
"" +
".GM_vBh_highlight.new {" +
"  background-color: #f1df54; }" +
   "";
    return $('<style type="text/css"></style>').html(styleString).appendTo("head");
  };

  this.initEnv();

  this.insertStyles();

  try {
    Params.settings = eval(this.getKey('settings', this.stringify(Params.defaultSettings)));
  } catch (_error) {
    error = _error;
    Params.settings = Params.defaultSettings;
  }

  try {
    Params.settings.temporaryShowIgnored = false;
    Extend(Params.defaultSettings, Params.settings);
    this.saveSettings();
    Params.enabled = (this.getKey('enabled', 'enabled') === 'enabled' ? true : false);
    this.insertHeaderbar();
    this.updatePage();
  } catch (_error) {
    error = _error;
    console.error("Error: " + error);
    console.dir(error);
  }

  $(document).on('keydown', function(evt) {
    if (evt.which === 38 && evt.altKey === true) {
      return temporarilyDisable_clicked();
    }
  });

}).call(this);
