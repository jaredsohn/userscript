// ==UserScript==
// @name          Facebook
// @namespace     appi
// @description   for test porpus

// ==/UserScript==


/*
 * Copyright 2011 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

Config = null;

function facebookInit(config) {
  Config = config;

  FB.init({
    appId: Config.appId,
    xfbml: true,
    channelUrl:
      window.location.protocol + '//' + window.location.host + '/channel.html'
  });
  FB.Event.subscribe('auth.sessionChange', handleSessionChange);
  FB.Canvas.setAutoResize();

  // ensure we're always running on apps.facebook.com
  if (window == top) { goHome(); }
}

function handleSessionChange(response) {
  if ((Config.userIdOnServer && !response.session) ||
      Config.userIdOnServer != response.session.uid) {
    goHome();
  }
}

function goHome() {
  top.location = 'http://apps.facebook.com/' + Config.canvasName + '/';
}

function setDateFields(date) {
  document.getElementById('date_year').value = date.getFullYear();
  document.getElementById('date_month').value = date.getMonth() + 1;
  document.getElementById('date_day').value = date.getDate();
}
function dateToday() {
  setDateFields(new Date());
}
function dateYesterday() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  setDateFields(date);
}

function publishRun(title) {
  FB.ui({
    method: 'stream.publish',
    attachment: {
      name: title,
      caption: "I'm running!",
      media: [{
        type: 'image',
        href: 'http://runwithfriends.appspot.com/',
        src: 'http://runwithfriends.appspot.com/splash.jpg'
      }]
    },
    action_links: [{
      text: 'Join the Run',
      href: 'http://runwithfriends.appspot.com/'
    }],
    user_message_prompt: 'Tell your friends about the run:'
  });
}
