// ==UserScript==
// @name           Fronter session keepalive
// @namespace      http://stiell.org/
// @description    Stay logged in to Fronter by keeping the session active.
// @author         Stian Ellingsen
// @license        http://creativecommons.org/publicdomain/zero/1.0/
// @version        0.2
// @include        http://fronter.com/*/main.phtml
// @include        https://fronter.com/*/main.phtml
// ==/UserScript==

// One second = 1000 ms.
const SEC = 1000;
// Minimum keepalive interval.
const MIN_TIMEOUT = 120 * SEC;
// Perform keepalive when remaining time is below this value.
const EXPIRE_MARGIN = 600 * SEC;
// Retry delay if new expire time not found in first response.
const FIRST_RETRY = 5 * SEC;
// Minimum retry delay for consecutive retries.
const SECOND_RETRY = 30 * SEC;
// Regex to find expire time. Value should be in first capturing group.
const VALUE_PATTERN = /\bvar session_expire_time=(\d+);/;

var getET = function(s) {
  var m = VALUE_PATTERN.exec(s);
  return m == null ? null : Number(m[1]) * SEC;
};

// Calculates timeout delay value needed to keep session alive.
var timeout = function() {
  return Math.max(MIN_TIMEOUT, et - EXPIRE_MARGIN - new Date().getTime());
};

// Keeps session alive, updates expire time and repeats when needed.
var keepalive = function(retryDelay) {
  // Request for a new version of this document.
  var r = new XMLHttpRequest();
  r.open("get", location.href, true);
  r.onreadystatechange = function() {
    // Only do the following when the response is complete.
    if (r.readyState != 4) return;
    // Search for the new expire time value in the response text.
    et = getET(r.responseText);
    // If found, update the value and set to repeat before session expires.
    // Otherwise, retry the request later and increase next retry delay.
    if (et != null)
      setTimeout(keepalive, timeout(), FIRST_RETRY);
    else
      setTimeout(keepalive, retryDelay,
        Math.max(SECOND_RETRY, retryDelay * 2));
  };
  // Send the request.
  r.send(null);
};

// Get the current expire time and start the keepalive before expiry.
var et = getET(document.head.innerHTML) || 0;
setTimeout(keepalive, timeout(), FIRST_RETRY);
