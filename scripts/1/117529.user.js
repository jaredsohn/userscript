// ==UserScript==
// @name           Turntable.fm Growl Notifications for Fluid.app
// @version        1.1
// @namespace      http://dreamcloudstudios.com
// @description    Display growl notifications for Turntable in Fluid.app
// @include        http://www.turntable.fm/*
// @include        http://turntable.fm/*
// @exclude        http://turntable.fm/
// @exclude        http://*.turntable.fm/
// ==/UserScript==
(function() {
  jQuery(function() {
    var checkSong, clickMute, currentSong, oldSong, setCurrents, songChanged, toggleMute;
    currentSong = null;
    oldSong = null;
    window.hideNotifications = false;
    setCurrents = function() {
      if ($('.songlog .song .songinfo').length) {
        return currentSong = $('.songlog .song .songinfo')[0];
      } else {
        return currentSong = null;
      }
    };
    songChanged = function() {
      var attention, descriptionString, growlOptions, titleString;
      attention = function() {
        window.fluid.unhide();
        return window.fluid.active();
      };
      titleString = $(currentSong).children('.title').attr('title');
      descriptionString = $(currentSong).children('.details').children().html();
      growlOptions = {
        title: titleString,
        description: descriptionString,
        sticky: false,
        onclick: attention
      };
      return window.fluid.showGrowlNotification(growlOptions);
    };
    checkSong = function() {
      setCurrents();
      if (oldSong !== currentSong) {
        oldSong = currentSong;
        if (currentSong !== null) {
          songChanged();
        }
        return setTimeout(checkSong, 1500);
      } else {
        if (!window.hideNotifications) {
          return setTimeout(checkSong, 1500);
        }
      }
    };
    toggleMute = function() {
      window.hideNotifications = !window.hideNotifications;
      if (window.hideNotifications) {
        window.fluid.removeDockMenuItem("Mute");
        window.fluid.addDockMenuItem("Unmute", clickMute);
      } else {
        window.fluid.removeDockMenuItem("Unmute");
        window.fluid.addDockMenuItem("Mute", clickMute);
      }
      if (!window.hideNotifications) {
        return setTimeout(checkSong, 1500);
      }
    };
    clickMute = function() {
      return $('.mute_btn').first().trigger('click');
    };
    $('.mute_btn').live('click', toggleMute);
    window.fluid.addDockMenuItem("Mute", clickMute);
    return setTimeout(checkSong, 1500);
  });
}).call(this);
