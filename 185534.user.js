// ==UserScript==

// @name          Facebook Unseen Remover 

// @description   This Source Code Form is subject to the terms of the Mozilla Public

// @include https://www.facebook.com/ajax/mercury/change_read_status.php

// ==/UserScript==

/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function debug(data) {
    Components.utils.reportError(data);
}

function httpObserve() {
    this.register();
}

httpObserve.prototype = {
    registerTopic: "http-on-modify-request",
    facebookReadStatusUrl: /http(s)?:\/\/(www.)?facebook.com\/ajax\/mercury\/change_read_status.php(\?(.)+)?/,

    observe: function(subject, topic, data) {
        if (topic == this.registerTopic) {
            subject.QueryInterface(Components.interfaces.nsIHttpChannel);
            var url = subject.URI.spec;

            if (this.facebookReadStatusUrl.test(url)) {
                subject.cancel(Components.results.NS_BINDING_ABORTED);
            }
        }
    },
    register: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
                              .getService(Components.interfaces.nsIObserverService);
        observerService.addObserver(this, this.registerTopic, false);
    },
    unregister: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"]
                                .getService(Components.interfaces.nsIObserverService);
        observerService.removeObserver(this, this.registerTopic);
    }
};

var obs = null;

function startup(data, reason) {
    obs = new httpObserve();
}

function shutdown(data, reason) {
    obs.unregister();
    obs = null;
}