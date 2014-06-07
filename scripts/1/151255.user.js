// ==UserScript==
// @name        Select default From sender in Gmail
// @description This script allows you to override the default From address in Gmail with a query string parameter called bu. Example: https://mail.google.com/mail/?bu=... You can either set a full email address or just a domain.
// @namespace   gwnRob@gmail.com
// @author      Rob W <gwnRob@gmail.com>
// @website     http://userscripts.org/scripts/show/151255
// @version     1.3
// @match       *://mail.google.com/mail/*bu*
// @grant       none
// ==/UserScript==

// Auto-selects email from a domain retrieved from the URL.
// Compose screen: Auto-selects email, warn if not possible
// Reply screen: Warn about non-matching domain.
//               After clicking on "edit" to select a different email, no auto-selection occurs, and no warning is shown,
//               because the user is aware of a mismatched domain, and might want to manually switch to the correct domain.

if (top === window) (function() {
    // Accepts ?bu=... / &bu=... / &bu= / &bu
    var bu = /[&?]bu([=&]|$)([^&]*)/i.exec(location.search)
      , email, domain
      , dealWithFromField, watchFromField, getMainDocument
      , buConfirmedEmail;
    if (bu) {
        // If &bu=... or ?bu=... is found, then select ...
        email = bu[1] === '=' ? bu[2].toLowerCase() : '';
        domain = email.split('@').pop();
        // If email equals domain, then `email` is not an email address (missing @).
        if (email === domain) email = '';
        
        
        // Used to get main context
        getMainDocument = function() {
            var canvas_frame = document.getElementById('canvas_frame');
            if (canvas_frame) return canvas_frame.contentDocument || document;
            return document;
        };
        
        // When a From: SELECT field is found
        dealWithFromField = function(/*HTMLSelectElement*/ fromField) {
            // If an email is passed, compare with email. Otherwise, compare against domain
            var isMatching = email ? function(fieldValue) {
                return email === fieldValue.toLowerCase();
            } : function(fieldValue) {
                return domain === fieldValue.toLowerCase().split('@').pop();
            };
            if (email || domain) {
                if (isMatching(fromField.value)) return; // Already a correct email address
                for (var i=0; i<fromField.options.length; i++) {
                    // Check equality of domain / email
                    if (isMatching(fromField.options[i].value)) {
                        if (!fromField.__rw_seen_field) {
                            fromField.__rw_seen_field = true;
                            fromField.selectedIndex = i; // Auto-select only once
                        }
                        return removeWarning(fromField);
                    }
                }
            }
            // When this point is reached, the specified domain is not found
            insertWarning(fromField, 'Warning: email will be sent from default email address!');
        };
        // When a From: INPUT field is found (old reply OR new compose feature)
        dealWithFromReplyOrNewCompose = function(/*HTMLInputElement*/ fromField) {
            var current_from = fromField.value.toLowerCase();
            if (buConfirmedEmail) {
                // The email is not available in the DOM, but it's still known in a different way (see bottom)
                if (!fromField.__rw_seen_field) {
                    fromField.__rw_seen_field = true; // Auto-populate only once
                    return setFromFieldWithFallbackOption(fromField, current_from, buConfirmedEmail);
                } else if (buConfirmedEmail == current_from) {
                    return removeWarning(fromField);
                }
            }
            
            if (email && email !== current_from) {
                insertWarning(fromField, 'Warning: Can\'t find ' + email +  ' for selection');
            } else if (!domain || domain !== current_from.split('@').pop()) {
                insertWarning(fromField, 'Warning: Can\'t find address at ' + domain);
            } else {
                removeWarning(fromField);
            }
        };
        removeWarning = function(fromField) {
            var warning = fromField.nextSibling;
            if (warning) {
                if (warning.__isWarningElement || (warning = warning.nextSibling) && warning.__isWarningElement) {
                    fromField.parentNode.removeChild(warning);
                }
            }
        };
        insertWarning = function(fromField, warningText) {
            var warning = fromField.nextSibling;
            if (warning) {
                if (warning.__isWarningElement || (warning = warning.nextSibling) && warning.__isWarningElement) {
                    // Don't add a warning if one already exists
                    return;
                }
            }
            warning = document.createElement('span');
            warning.__isWarningElement = true;
            warning.style.cssText = 'color:red;font-weight:bold;';
            warning.textContent = warningText;
            warning.title = 'Expected address ' + (email || domain || '(empty)') + ' (defined in query string &bu=)';
            fromField.parentNode.insertBefore(warning, fromField.nextSibling);
        };
        // Auto-populate hidden From field, and show a message to return to the previous email address
        setFromFieldWithFallbackOption = function(fromField, previous_email, suggested_email) {
            var notice = fromField.nextSibling;
            if (notice) {
                if (notice.__isNoticeElement || (notice = notice.nextSibling) && notice.__isNoticeElement) {
                    // Don't add a notice if one already exists
                    return;
                }
            }
            removeWarning(fromField);
            fromField.value = suggested_email;
            if (previous_email === suggested_email) {
                // No point in showing a rollback suggestion if the email did not change
                return;
            }
            notice = document.createElement('span');
            notice.__isNoticeElement = true;
            notice.style.cssText = 'color:red;font-weight:bold;';
            notice.textContent = 'From: ' + suggested_email;
            notice.title = 'The From field is changed to ' + suggested_email + '.\nClick to revert to ' + previous_email;
            notice.onclick = function() {
                if (confirm('Do you want to send the mail from ' + previous_email + ' instead of ' + suggested_email + '?')) {
                    fromField.form.__rw_seen_form = true; // User made a definite choice, don't show any warnings again.
                    fromField.value = previous_email;
                    notice.parentNode.removeChild(notice);
                }
            };
            fromField.parentNode.insertBefore(notice, fromField.nextSibling);
        };
        
        // Watch for appearance of the from field:
        watchFromField = function() {
            var forms = getMainDocument().forms
              , i = forms.length
              , form, fromField;
            while (form = forms[--i]) {
                if (!form.__rw_seen_form) { // Optimization: Skip non-compose / already marked forms
                    if (fromField = form.elements.from) {
                        if (fromField.nodeName.toUpperCase() === 'SELECT') {
                            dealWithFromField(fromField);
                        } else {
                            dealWithFromReplyOrNewCompose(fromField);
                        }
                    } else {
                        form.__rw_seen_form = true;
                    }
                }
            }
        };
        watchFromField();
        setInterval(watchFromField, 200);
        
        // If the domain is non-empty, see if any match can be found
        if (domain) {
            // Get list of managed addresses to support changing address on Reply and the new Compose feature
            // In a Greasemonkey script / real page, just read directly
            var GLOBALS = window.GLOBALS || (typeof unsafeWindow !== "undefined" ? unsafeWindow.GLOBALS : undefined);
            var processListOfEmails = function(list_of_emails) {
                if (email) {
                    if (list_of_emails.indexOf(email) !== -1) {
                        buConfirmedEmail = email;
                    }
                } else { // bu is given, but a domain
                    for (var i=0; i<list_of_emails.length; i++) {
                        if (list_of_emails[i].split('@').pop() === domain) {
                            buConfirmedEmail = list_of_emails[i];
                            break;
                        }
                    }
                }
            };
            var getListOfEmails = function() { 
                for (var i=0; i<GLOBALS[17].length; i++) { 
                    if (GLOBALS[17][i] &&
                        GLOBALS[17][i][1] &&
                        GLOBALS[17][i][1][1] &&
                        /@/.test(GLOBALS[17][i][1][1][1])
                   ) { 
                       return GLOBALS[17][i][1].map(function(info) { 
                           return String(info[1]).toLowerCase(); // <-- email address
                       });
                   } 
                } 
            };
            if (GLOBALS) { 
                try { 
                    processListOfEmails(/*list_of_emails=*/getListOfEmails());
                } catch (e) { 
                    console.debug('Can\'t find the list of owned emails. Error:' + e.message);
                } 
            } else { 
                // In a Chrome extension, use injection & messaging
                var messageListener = function(e) { 
                    if (e.data && e.data.__rw_get_list_of_emails) { 
                        removeEventListener('message', messageListener);
                        if (e.data.list_of_emails) { 
                            // Check if pre-defined email address makes sense
                            processListOfEmails(e.data.list_of_emails);
                        } 
                    } 
                };
                addEventListener('message', messageListener);
                var s = document.createElement('script');
                s.textContent = '(' + function(getListOfEmails) {
                    try {
                        var list_of_emails = getListOfEmails();
                        if (!list_of_emails)
                            throw new Error('Email not found!');
                        postMessage({
                            __rw_get_list_of_emails: true,
                            list_of_emails: list_of_emails
                        }, '*');
                    } catch (e) {
                        console.debug('Can\'t find the list of owned emails. Error: ' + e.message);
                        postMessage({__rw_get_list_of_emails: true}, '*');
                    }
                } + ')(' + getListOfEmails + ')';
                document.head.appendChild(s);
                document.head.removeChild(s);
            }
        }
    }
})();
