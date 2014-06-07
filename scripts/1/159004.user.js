// ==UserScript==
// @name           Refuse2Logout
// @namespace      http://userscripts.org/users/vtsatskin
// @include        http://learn.uwaterloo.ca/*
// @include        https://learn.uwaterloo.ca/*
// @description    Prevents uWaterloo's Desire2Learn from logging you out automatically
// @version        0.0.3
// ==/UserScript==

window.addEventListener('load', function () {
    var POLL_INTERVAL = 10 * 6E4 // 10 minutes in ms
      , POLL_URL = "/d2l/lp/auth/session/extend"
      , tapItLikeItsHot = function () {
            try {
                var oReq = new XMLHttpRequest();
                oReq.open("GET", POLL_URL, true);
                oReq.onreadystatechange = function (oEvent) {
                  if (oReq.readyState === 4) {
                    if (oReq.status === 200) {
                      console && console.log && console.log("Successfully polled D2L!");
                    } else {
                      console && console.error && console.error("Polling error: ", oReq.statusText);
                    }
                  }
                };
                oReq.send(null);
            } catch (err) {
                console && console.error && console.error(err);
            }
        };

    setInterval(tapItLikeItsHot, POLL_INTERVAL);
});