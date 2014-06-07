// ==UserScript==
// @name           Notifus
// @version        1.01
// @namespace      notifus
// @author         Dmitry Koterov
// @description    Adds buttons "Send & notify me in ..." to GMail
// @grant          none
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==


/**
 * A handy tool to bind "this" to an object while passing a callback.
 */
Function.prototype.bind = function(obj) {
    var fn = this;
    return function() {
        var args = [];
        for (var i = 0, ix = arguments.length; i < ix; i++) {
            args.push(arguments[i]);
        }
        return fn.apply(obj, args);
    };
};


/**
 * A library to call Notifus API.
 */
var NotifusApi = {
    _DOMAIN: 'https://notifus.com',
    _VERSION: 9,
    _TIMEOUT: 10,
    _CALLBACKS: {},
    _latestVersion: null,
    _latestUpdateUrl: null,

    /**
     * Private. Sends a request to Notifus API server.
     * Response format: { result: ..., errorCode: ..., errorText: ..., out: ..., version: ..., update_url: ... }
     *
     * @param function callback   A function to be called when API responded.
     * @param array    args       Arguments to pass to API.
     * @return void
     */
    _request: function(callback, args) {
        // Prepare ID of element which will be used to hold the resulting data.
        var id = "NotifusApi_" + (new Date().getTime());
        args['element_id'] = id;

        // Pre-defined args.
        args['tz'] = Math.floor(-new Date().getTimezoneOffset() / 60);
        args['rnd'] = new Date().getTime();
        args['version'] = this._VERSION;

        // Append other args.
        var url = this._DOMAIN + "/" + navigator.language + "/api/";
        var sep = '?';
        for (var k in args) if (args.hasOwnProperty(k)) {
            url += sep + encodeURIComponent(k) + "=" + encodeURIComponent(args[k]);
            sep = '&';
        }

        // Run a background request.
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);

        // Watch for request termination or timeout.
        var startedAt = new Date().getTime();
        var handler = setInterval(function() {
            var data = null;
            var elt = top.document.getElementById(id);
            if (elt) {
                // Seems this is the only method to receive JSONP data with userscript
                // (because of sandboxing responded JavaScript does not see any variables
                // assigned by userscript, but userscript sees DOM changes).
                try {
                    data = eval("(" + elt.firstChild.nodeValue + ")");
                } catch (e) {
                    data = {
                        result: null,
                        errorCode: "JSON_PARSE_ERROR",
                        errorText: "Error parsing the response from Notifus server:\n" + e,
                        out: elt.innerHTML
                    };
                }
                elt.parentNode.removeChild(elt);
            } else {
                if (new Date().getTime() > startedAt + this._TIMEOUT * 1000) {
                    data = {
                        result: null,
                        errorCode: "TIMEOUT",
                        errorText: "Time-out while receiving the response from Notifus server",
                        out: null
                    };
                }
            }
            if (data !== null) {
                clearInterval(handler);
                document.body.removeChild(script);
                if (data.errorCode && !data.errorCode.match(/^UNKNOWN_/)) {
                    this.log("Notifus error: ", data);
                }
                this._latestVersion = data.version;
                this._latestUpdateUrl = data.update_url;
                callback(data.result, data.errorCode, data.errorText, data.out);
            }
        }.bind(this), 50);
    },

    /**
     * Sets a notification for email+hash at stamp+subject.
     *
     * Format of result: { activation_mail_sent: "0|1" }
     * Specific error codes: none
     */
    setNotification: function(callback, email, hash, participant, subject, stamp, comment) {
        this._request(
            callback,
            { method: 'setNotification', email: email, hash: hash, participant: participant, subject: subject, stamp: stamp? stamp.toUTCString() : "", comment: comment }
        );
    },

    /**
     * Deletes a notification for email+subject.
     *
     * Format of result: null
     * Specific error codes: null, "STATUS_UNKNOWN_EMAIL"
     */
    delNotification: function(callback, email, subject) {
        this._request(
            callback,
            { method: 'delNotification', email: email, subject: subject }
        );
    },

    /**
     * Gets a notification status.
     *
     * Format of result: { stamp: "YYYY-MM-DD hh:mm", unixtime: 123, delta: "tomorrow" }
     * Specific error codes: null, "STATUS_UNKNOWN_EMAIL", "STATUS_UNKNOWN_THREAD", "STATUS_ACCOUNT_PENDING"
     */
    getStatus: function(callback, email, subject) {
        this._request(
            callback,
            { method: 'getStatus', email: email, subject: subject }
        );
    },

    /**
     * Returns information about latest version available.
     */
    getLatestVersionInfo: function() {
        return {
            isOutdated: (this._latestVersion && this._VERSION < this._latestVersion),
            curVersion: this._VERSION,
            latestVersion: this._latestVersion,
            updateUrl: this._latestUpdateUrl
        };
    },

    /**
     * Prints a debug message to Firebug console.
     */
    log: function() {
        try { unsafeWindow.console.log.apply(unsafeWindow.console.log, arguments) } catch (e) {}
    }
};


/**
 * Allows to watch for GMail Send form appearance & to find elements within this form.
 * Also detects Subject headline.
 */
var GMail = {
    _DOC: null,

    /**
     * Reads a cookie.
     */
    getCookie: function(name) {
        var prefix = name + "=";
        var cookieStartIndex = document.cookie.indexOf(prefix);
        if(cookieStartIndex == -1) return null;
        var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
        if(cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
        return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
    },

    /**
     * Returns reference to the last Send button on the page.
     */
    getSendButton: function() {
        if (!this._DOC) return null;
        var bs = this._DOC.getElementsByTagName('B');
        // Find the LAST sending button.
        for (var i = bs.length - 1; i >= 0; i--) {
            var e = bs[i].parentNode;
            var role = e.getAttribute('role');
            if (role == 'button' && e.parentNode.parentNode.getAttribute('role') == "navigation") {
                return e;
            }
        }
        return null;
    },

    /**
     * Returns reference to a BCC field.
     */
    getBcc: function() {
        if (!this._DOC) return null;
        var elts = this._DOC.getElementsByTagName('textarea');
        // Find the LAST bcc, because "To:" field may also have name="bcc".
        for (var i = elts.length - 1; i >= 0; i--) {
            var e = elts[i];
            if (e.name == 'bcc') {
                return e;
            }
        }
        return null;
    },

    /**
     * Returns reference to a TO field.
     */
    getTo: function() {
        if (!this._DOC) return null;
        var elts = this._DOC.getElementsByTagName('textarea');
        for (var i = elts.length - 1; i >= 0; i--) {
            var e = elts[i];
            if (e.name == 'to') {
                return e;
            }
        }
        return null;
    },

    /**
     * Returns reference to a BCC field.
     */
    getSubject: function() {
        if (!this._DOC) return null;
        var elts = this._DOC.getElementsByTagName('input');
        for (var i = 0; i < elts.length; i++) {
            var e = elts[i];
            if (e.name == 'subject') {
                return e;
            }
        }
        return null;
    },

    /**
     * Returns value of "From" email.
     */
    getFromEmailValue: function() {
        if (!this._DOC) return null;
        var elts = this._DOC.getElementsByTagName('input');
        for (var i = 0; i < elts.length; i++) {
            var e = elts[i];
            if (e.type == 'hidden' && e.name == 'from') {
                return e.value;
            }
        }
        var elts = this._DOC.getElementsByTagName('select');
        for (var i = 0; i < elts.length; i++) {
            var e = elts[i];
            if (e.name == 'from') {
                return e.value;
            }
        }
        return null;
    },

    /**
     * Returns current opened thread subject together with its node reference.
     */
    getHeadingSubjectValue: function() {
        if (!this._DOC) return null;
        var elts = this._DOC.getElementsByTagName('h1');
        for (var i = elts.length - 1; i >= 0; i--) {
            var h1 = elts[i];
            if (h1.firstChild && h1.firstChild.tagName == "SPAN" && h1.childNodes.length == 2) {
                // "2" means "no duplicate-avoiding marker NOTIFUS_STATUS yet"?
                // Glue content together (it may contain e.g. <wbr> or sub-span tags).
                var texts = h1.firstChild.childNodes;
                var value = '';
                for (var n = 0; n < texts.length; n++) {
                    if (texts[n].nodeValue != null) {
                        value += texts[n].nodeValue;
                    } else if (texts[n].tagName == "SPAN") {
                        value += texts[n].firstChild.nodeValue;
                    }
                }
                return {
                    subject: value,
                    node: h1
                };
            }
        }
    },

    /**
     * Sets the status HTML code into needed place.
     * Returns an element which should be deleted to completely remove the status block.
     */
    insertStatusHtml: function(html) {
        var subject = this.getHeadingSubjectValue();
        var buttonsContainer = subject.node;
        var but = buttonsContainer.ownerDocument.createElement('span');
        but.innerHTML = '<span style="padding-left:30px"></span><span style="display:inline-block; border: 1px solid #CCC; font:13px arial,sans-serif; padding:3px 5px 0px">' + html + '</span>';
        buttonsContainer.appendChild(but);
        return but;
    },

    /**
     * Clicks a button at GMail sending form.
     */
    clickButton: function(button) {
        this._simulateClickEvent(button, "mousedown");
        this._simulateClickEvent(button, "mouseup");
    },

    /**
     * Create a copy of the button with specified text and click callback.
     */
    makeSendButtonCopy: function(origButton, html, onclick) {
        var but = origButton.ownerDocument.createElement('DIV');
        but.className = origButton.className;
        but.innerHTML = '<b>' + html + '</b>';
        but.addEventListener("click", function() { onclick(but) }, false);
        but.addEventListener("mousedown", function() {
            but.style.borderStyle = "inset";
        }, false);
        but.addEventListener("mouseup", function() {
            but.style.borderStyle = "";
        }, false);
        but.addEventListener("mouseover", function() {
            but.style.border = "1px solid #888";
        }, false);
        but.addEventListener("mouseout", function() {
            but.style.borderStyle = "";
            but.style.border = "";
        }, false);
        return but;
    },

    /**
     * Calls callbacks when something is changed on the page.
     */
    watchAppearance: function(formAppearedCallback, subjectAppearedCallback) {
        if (window.top && top.location.href != window.location.href) return;
        setInterval(function() {
			// New GMail version does not use canvas iframe.
			this._DOC = document;

            // Monitor sending form appearance.
            var MARKER = 'SEND_BUTTON_APPEARED';
            if (!this._hasMarker(MARKER)){
                var sendButton = this.getSendButton();
                if (sendButton) {
                    this._setMarker(sendButton, MARKER);
                    formAppearedCallback();
                }
            }

            // Monitor subject headline appearance.
            var MARKER = 'SUBJECT_APPEARED';
            if (!this._hasMarker(MARKER)){
                var subject = this.getHeadingSubjectValue();
                if (subject) {
                    this._setMarker(subject.node, MARKER);
                    subjectAppearedCallback();
                }
            }
        }.bind(this), 500);
    },

    /**
     * Restarts subject watching loop.
     */
    reappearThreadSubject: function() {
        this._removeMarker('SUBJECT_APPEARED');
    },

    /**
     * Returns GMail logged user email.
     */
    getPrimaryEmail: function() {
        var s = this.getCookie("gmailchat") || "";
        if (s.match(/^(.*)\//)) return RegExp.$1;
        return null;
    },

    /**
     * Simulates a clict to the node.
     */
    _simulateClickEvent: function(node, eventType) {
        var event = node.ownerDocument.createEvent("MouseEvents");
        event.initMouseEvent(eventType,
            true, // can bubble
            true, // cancellable
            node.ownerDocument.defaultView,
            1, // clicks
            50, 50, // screen coordinates
            50, 50, // client coordinates
            false, false, false, false, // control/alt/shift/meta
            0, // button,
            node
        );
        node.dispatchEvent(event);
    },

    /**
     * Inserts a marker into the element. It may be later checked for existence.
     */
    _setMarker: function(elt, id) {
        // It is a very, very strange method to check if we already added
        // SFU buttons or not. But it is the only method which works.
        // I tried to set CANVAS.contentDocument.LOADED flag and even
        // do CANVAS.contentDocument.body.appendChild(LOAD_MARKER_DIV),
        // but nothing works fine. It is because of the sandboxing?
        var m = this._DOC.createElement('span');
        m.style.display = "none";
        m.id = id;
        elt.parentNode.insertBefore(m, elt);
    },

    /**
     * Removes the marker manually.
     */
    _removeMarker: function(id) {
        var m = this.$(id);
        if (m) m.parentNode.removeChild(m);
    },

    /**
     * Checks if the marker is presented.
     */
    _hasMarker: function(id) {
        return !!this.$(id);
    },

    /**
     * Returns an element with specified ID.
     */
    $: function(id) {
        if (!this._DOC) return null;
        return this._DOC.getElementById(id);
    }
};



/**
 * Localization constants.
 */
var NotifusText = {
    send_notify_me_in_d_days: "in % day",
    etc_in_d_days: "% d",
    etc_in_d_week: "% week",
    etc_custom: "custom",
    when_to_notify_you_q: "In how many days to notify you about this thread?",
    invalid_days_count_format: "Please specify numerical days count!",
    no_primary_email: "Cannot detect primary email of your account. Possibly GMail has changed something? Please contact Notifus developers.",
    error_ask_if_send_s: "An error happened:\n%\n\nSend the mail without a notification?",
    notifus_head_error_s: 'Error: %',
    notifus_alert_error_s: 'Notifus error: %',
    notified_you_at_s: 'Already notified you at %',
    click_to_delete_notification: 'Click to delete this notification',
    notify_you_s: 'Will notify you %',
    new_version_avaliable: '<font color="red">New version of Notifus is available. <a href="%" target="_blank">Please update</a> and RELOAD the page</font>',
    time_in: 'in',
    n_days: '% days',
    now: 'now',
    STATUS_UNKNOWN_THREAD: '<span title="To set a notification - reply to somebody">No notification for this conversation</span>',
    STATUS_UNKNOWN_EMAIL: '<span title="To set them - reply to somebody">You have not set any notifications yet</span>',
    STATUS_ACCOUNT_PENDING: '<span title="We have sent you an activation e-mail. Please use instructions in it." onclick="alert(\'Don\\\'t click me, I am a plain text. :-)\\n\\n\' + this.title)">Please activate your account</span>',

    get: function(name) {
        var s = this[name] || "";
        var i = 0, args = arguments;
        return s.replace(/%/g, function() { i++; return args[i]; });
    }
};



/**
 * Notifus user interface for GMail.
 */
var NotifusUi = {
    _ROTATING: NotifusApi._DOMAIN + "/i/progress.gif",
    _BELL: NotifusApi._DOMAIN + "/i/bell-sm.gif?1",
    _DELETE: NotifusApi._DOMAIN + "/i/delete-sm.gif",
    _OPTIONS: [
        //[ "Send + notify me in 1 min", 60 ],
        [ NotifusText.get('send_notify_me_in_d_days', 1),  1 * 24 * 3600 ],
        [ NotifusText.get('etc_in_d_days', 2),             2 * 24 * 3600 ],
        [ NotifusText.get('etc_in_d_days', 3),             3 * 24 * 3600 ],
        [ NotifusText.get('etc_in_d_days', 4),             4 * 24 * 3600 ],
        [ NotifusText.get('etc_in_d_days', 6),             6 * 24 * 3600 ],
        [ NotifusText.get('etc_custom'),                   null]
    ],
    _COUNTDOWN_ID: "NOTIFUS_STATUS_COUNTDOWN",
    _rotatingElt: null,
    _curFormHash: null,
    _deadline: null,
    _deadlineCounter: 0,

    /**
     * Prompts user for a custom date.
     */
    _promptDelay: function() {
        var msg = NotifusText.get('when_to_notify_you_q');
        var p = msg;
        while (1) {
            var s = prompt(p);
            if (!s) return null;
            s = s.replace(/\s+/g, '');
            if (s.match(/^\d+(\.\d+)?$/i)) {
                return parseFloat(s) * 3600 * 24;
            }
            p = NotifusText.get('invalid_days_count_format') + "\n" + msg;
        }
    },

    /**
     * Called when we have found a GMail canvas.
     */
    _onFormAppeared: function() {
        this._curFormHash = (''+top.location.hash).match(/\/([0-9a-f]{16})$/)? RegExp.$1 : '-' + Math.round(new Date().getTime()/1024);
        var sendButton = GMail.getSendButton();
        var next = sendButton.nextSibling;
        for (var i = 0; i < this._OPTIONS.length; i++) (function(opt) {
            var html = '<img style="vertical-align:middle" src="' + this._BELL + '"/>&#160;' + opt[0];
            if (!i) {
                html = '<span style="padding-right:5px">' + "Send &" + '</span>' + html;
            }
            var button = GMail.makeSendButtonCopy(
                sendButton, html,
                function() { this._onButtonClick(button, opt[1]) }.bind(this)
            );
            next.parentNode.insertBefore(button, next);
        }.bind(this))(this._OPTIONS[i]);
    },

    /**
     * Called when somebody clicks to the button "but".
     */
    _onButtonClick: function(but, delay) {
        if (this._rotatingIsActive()) return;
        var email = GMail.getPrimaryEmail();
        if (!email) {
            alert(NotifusText.get('no_primary_email'));
            return;
        }
        if (!delay) {
            delay = this._promptDelay();
            if (!delay) return;
        }
        this._rotatingSet(but);
        NotifusApi.setNotification(
            function(result, errorCode, errorText) {
                if (errorCode && !confirm(NotifusText.get('error_ask_if_send_s', NotifusText.get(errorCode) || errorText || errorCode))) {
                    this._rotatingRemove();
                    return;
                }
                this._rotatingRemove();
                // Send the mail.
                GMail.clickButton(GMail.getSendButton());
                // Refresh status information.
                GMail.reappearThreadSubject();
            }.bind(this),
            email,
            this._curFormHash,
            (this._parseParticipantList(GMail.getTo().value)[0] || ""),
            GMail.getSubject().value,
            new Date(new Date().getTime() + delay * 1000),
            ''
        );
    },

    /**
     * Called when a thread subject appeared.
     */
    _onThreadSubjectAppeared: function() {
        var subject = GMail.getHeadingSubjectValue();
        var email = GMail.getPrimaryEmail();
        var doc = subject.node.ownerDocument;
        NotifusApi.getStatus(
            function(result, errorCode, errorText, out) {
                var STATUS_BLOCK_ID = "NOTIFUS_STATUS";
                var DELETE_ID = "NOTIFUS_STATUS_DEL";

                // Create content text.
                var text, title = "";
                var version = NotifusApi.getLatestVersionInfo();
                if (version.isOutdated) {
                    text = NotifusText.get('new_version_avaliable', version.updateUrl);
                } else if (errorCode) {
                    if (errorCode.match(/^STATUS_/)) {
                        text = NotifusText.get(errorCode) || errorCode;
                    } else {
                        text = '<font color="red">' + NotifusText.get('notifus_head_error_s', NotifusText.get(errorCode) || errorText || errorCode) + '</font>';
                    }
                } else {
                    this._deadline = result.unixtime;
                    if (this._deadline > new Date().getTime() / 1000) {
                        text =
                            '<span id="' + this._COUNTDOWN_ID + '"></span>' +
                            '<span title="' + NotifusText.get('click_to_delete_notification') + '" id="' + DELETE_ID + '" style="background:url(' + this._DELETE + ') right center no-repeat; padding-left:22px; cursor:pointer"></span>';
                        title = result.delta;
                    } else {
                        text = NotifusText.get('notified_you_at_s', result.stamp);
                    }
                }

                // Build status message block.
                text = '<span title="' + title + '">'
                    + '<img style="vertical-align:middle" height="13" src="' + this._BELL + '"/>&#160;'
                    + text + '</span>';

                // Remove old status block if any.
                var block = GMail.$(STATUS_BLOCK_ID);
                if (block) block.parentNode.removeChild(block);

                // Create a new status block.
                var block = GMail.insertStatusHtml(text);
                if (block) {
                    block.id = STATUS_BLOCK_ID;
                    this._onTick();

                    // Assign deletion handler.
                    if (GMail.$(DELETE_ID)) GMail.$(DELETE_ID).addEventListener("click", function() {
                        block.parentNode.removeChild(block);
                        NotifusApi.delNotification(
                            function(result, errorCode, errorText) {
                                if (errorCode) {
                                    alert(NotifusText.get('notifus_alert_error_s', NotifusText.get(errorCode) || errorText || errorCode));
                                }
                                GMail.reappearThreadSubject();
                            }.bind(this),
                            email,
                            subject.subject
                        );
                    }.bind(this), false);
                }
            }.bind(this),
            email,
            subject.subject
        );
    },

    /**
     * Called periodically (no less than once per second).
     */
    _onTick: function() {
        var caption = GMail.$(this._COUNTDOWN_ID);
        if (!caption) return;
        // Set remaining time text.
        var text, delta = this._deadline - new Date().getTime() / 1000;
        if (delta > 0) {
            var days = Math.floor(delta / 3600 / 24);
            var hours = this._pad(Math.floor(delta / 3600) % 24, 2);
            var mins = this._pad(Math.floor(delta / 60) % 60, 2);
            var secs = this._pad(Math.floor(delta) % 60, 2);
            text = NotifusText.get('time_in') + " " + (days > 0? NotifusText.get('n_days', days) + " " : "") + hours + ":" + mins + ":" + secs;
        } else {
            text = NotifusText.get('now');
        }
        caption.innerHTML = text;
    },

    /**
     * Pads a number at the left side.
     */
    _pad: function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    },

    /**
     * Shows a "rotating image" above the button.
     */
    _rotatingSet: function(but) {
        but.style.opacity = 0.5;
        this._rotatingElt = but;
    },

    /**
     * Hides the "rotating image" if it is active.
     */
    _rotatingRemove: function() {
        if (!this._rotatingElt) return;
        this._rotatingElt.style.opacity = '';
        this._rotatingElt = null;
    },

    /**
     * Returns true if a "rotating image" is active.
     */
    _rotatingIsActive: function() {
        return !!this._rotatingElt;
    },

    /**
     * Extracts all emails from participants list.
     */
    _parseParticipantList: function(participants) {
        participants = participants.replace(/"(.*?)"/g, "");
        var parts = participants.split(/,/);
        var emails = [];
        for (var i = 0; i < parts.length; i++) {
            var email = parts[i].replace(/^\s+|\s+$/g, '');
            if (email.match(/<\s*(.*?)\s*>/)) {
                email = RegExp.$1;
            }
            if (email.match(/^[^@\s;,<>]+@[^@\s;,<>]+$/)) {
                emails.push(email);
            }
        }
        return emails;
    },

    /**
     * UI entry point. Initializes everything and waits for user interaction.
     */
    main: function() {
        // Watch for sending form appearance.
        GMail.watchAppearance(
            this._onFormAppeared.bind(this),
            this._onThreadSubjectAppeared.bind(this)
        );
        // Call tick callback.
        setInterval(this._onTick.bind(this), 1000);
    }
};

NotifusUi.main();
