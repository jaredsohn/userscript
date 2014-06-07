// ==UserScript==
// @name           Facebook: InviteThemAll
// @namespace      https://userscripts.org/users/Aspi
// @author         https://userscripts.org/users/Aspi
// @description    Adds a button to select multiple, thus all, friends in the "invite friends" dialog at Facebook.
// @include        /^https?://(www\.)?facebook\.com(/.*)?$/
// @domain         facebook.com
// @match          http://facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://facebook.com/*
// @match          https://www.facebook.com/*
// @require        http://usocheckup.redirectme.net/89653.js?method=update
// @updateURL      https://userscripts.org/scripts/source/89653.meta.js
// @downloadURL    https://userscripts.org/scripts/source/89653.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @version        3.01
// ==/UserScript==

// ==ChangeLog==
// @history        3.01 [2014.02.26] Bugfixes, more dynamic detection and made info alert dialogs scrollable.
// @history        3.00 [2013.12.12] Major update. Cleaned up and enhanced code, improved detection methods, improved cross-browser compatibility and added donation dialogs.
// @history        2.17 [2012.08.02] Hotfix.
// @history        2.16 [2012.07.18] Improved friend enumeration method.
// @history        2.15 [2012.07.13] Added friend enumeration (sloppy version).
// @history        2.14 [2012.06.28] Increased invite dialog detection redundancy.
// @history        2.13 [2012.06.21] Made compatible with arrangements one is not attending to.
// @history        2.12 [2012.06.20] Addressed bug with use of "button" element.
// @history        2.11 [2011.07.20] Enhanced fade function, plus minor fixes.
// @history        2.10 [2011.06.23] Added, among much, non-blocking error alerting.
// @history        2.03 [2011.06.23] Added selection span option.
// @history        2.02 [2011.06.23] Changed the scrolling method.
// @history        2.01 [2011.06.05] Hotfix.
// @history        2.00 [2011.05.20] Major rewrite.
// @history        1.05 [2011.05.20] Changed updater to usoCheckup.
// @history        1.04 [2011.03.05] Added selection option ("Select ALL").
// @history        1.03 [2011.03.05] Removed the (deleted) updater.
// @history        1.02 [2010.12.08] Added manual update search command and fixed selection bug.
// @history        1.01 [2010.12.07] Added this awesome script updater, privatized the data, fixed small bugs and re-wrote the button injection method.
// @history        1.00 [2010.11.04] Initial release.
// ==/ChangeLog==

// ==License==
/*
@licstart
Copyright (C) 2010-2014  Free Software Foundation, Inc
51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You may have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
@licend
*/
// ==/License==

/**
 *
 * Thanks a TONNNN to Douglas Crockford, here especially for JSLint. Who knows where browsers would be today, without this noble soul. Cheers!
 *
**/

/** Developed with Notepad++, like a boss **/

(function () {
    'use strict';

    // Cross browser compatibility.
    window.unsafeWindow = window;
    window.GM_log = window.console.log;
    if (window.localStorage) {
        window.GM_setValue = function (aName, aValue) {
            return localStorage.setItem(aName, aValue);
        };
        window.GM_getValue = function (aName, aDefaultValue) {
            return localStorage.getItem(aName) || aDefaultValue;
        };
        window.GM_deleteValue = function (aName) {
            return localStorage.removeItem(aName);
        };
    }
    window.GM_addStyle = function (aCss) {
        var head = document.getElementsByTagName('head')[0];
        if (head) {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            style.textContent = aCss;
            head.appendChild(style);
            return style;
        }
        return null;
    };
    window.GM_openInTab = function (aUrl) {
        var win = window.open(aUrl, '_blank');
        if (win) {
            win.focus();
        } else {
            window.location.href = aUrl;
        }
    };
    window.GM_registerMenuCommand = function () {
        // No way to register to menu atm.
        return !0;
    };
    // http://wiki.greasespot.net/GM_xmlhttpRequest
    // This naive implementation will simply fail to do cross-domain requests,
    // just like any javascript in any page would.
    window.GM_xmlhttpRequest = function (aOpts) {
        var
            aSetupRequestEvent = function (aOpts, aReq, aEventName) {
                if (!aOpts['on' + aEventName]) {return; }

                aReq.addEventListener(aEventName, function (aEvent) {
                    var responseState = {
                        responseText: aReq.responseText,
                        responseXML: aReq.responseXML,
                        readyState: aReq.readyState,
                        responseHeaders: null,
                        status: null,
                        statusText: null,
                        finalUrl: null
                    };
                    switch (aEventName) {
                    case "progress":
                        responseState.lengthComputable = aEvent.lengthComputable;
                        responseState.loaded = aEvent.loaded;
                        responseState.total = aEvent.total;
                        break;
                    case "error":
                        break;
                    default:
                        if (4 !== aReq.readyState) {break; }
                        responseState.responseHeaders = aReq.getAllResponseHeaders();
                        responseState.status = aReq.status;
                        responseState.statusText = aReq.statusText;
                        break;
                    }
                    aOpts['on' + aEventName](responseState);
                });
            },
            req = new XMLHttpRequest(),
            prop;

        aSetupRequestEvent(aOpts, req, 'abort');
        aSetupRequestEvent(aOpts, req, 'error');
        aSetupRequestEvent(aOpts, req, 'load');
        aSetupRequestEvent(aOpts, req, 'progress');
        aSetupRequestEvent(aOpts, req, 'readystatechange');

        req.open(aOpts.method, aOpts.url, !aOpts.synchronous,
                aOpts.user || '', aOpts.password || '');
        if (aOpts.overrideMimeType) {
            req.overrideMimeType(aOpts.overrideMimeType);
        }
        if (aOpts.headers) {
            for (prop in aOpts.headers) {
                if (Object.prototype.hasOwnProperty.call(aOpts.headers, prop)) {
                    req.setRequestHeader(prop, aOpts.headers[prop]);
                }
            }
        }
        var body = aOpts.data || null;
        if (aOpts.binary) {
            return req.sendAsBinary(body);
        }
        return req.send(body);
    };


    // Global variables.
    var
        // enable for debug logging to console
        debug = false,
        // looping
        i, j, l, c, k,
        // temporary storage
        current,
        // persistent storage
        persistentStorage = {
            inviteDialogDeepSearch : {
                name : 'fbITA-pers-' + 'inviteDialogDeepSearch',
                defaultValue : 'false'
            },
            timesSelectedFriends : {
                name : 'fbITA-pers-' + 'timesSelectedFriends',
                defaultValue : 0
            },
            toAutoscroll : {
                name : 'fbITA-pers-' + 'toAutoscroll',
                defaultValue : 'true'
            },
            autoscrollWaitForNewElementsInMs : {
                name : 'fbITA-pers-' + 'autoscrollWaitForNewElementsInMs',
                defaultValue : '1000'
            },
            selection : {
                // "span" or "array"
                type : {
                    name : 'fbITA-pers-' + 'selectionType',
                    defaultValue : 'span'
                },
                // must be the same as "ids.fromField"
                fromField : {
                    name : 'fbITA-pers-' + 'selectionFrom',
                    defaultValue : ''
                },
                // must be the same as "ids.toField"
                toField : {
                    name : 'fbITA-pers-' + 'selectionTo',
                    defaultValue : ''
                }
            },
            // must be the same as "ids.inviteDialogCustomClassNames"
            inviteDialogCustomClassNames : {
                name : 'fbITA-pers-' + 'inviteDialogCustomClassNames',
                defaultValue : ''
            },
            // must be the same as "ids.inviteDialogCustomIds"
            inviteDialogCustomIds : {
                name : 'fbITA-pers-' + 'inviteDialogCustomIds',
                defaultValue : ''
            }
        },
        // elements
        pageElements = {
            collections : {
                friends : [],
                friendCheckBoxes : []
            },
            sections : {
                inviteDialog : undefined,
                inviteDialogFooter : undefined,
                inviteDialogTable : undefined,
                friendContainer : undefined
            },
            buttons : {
                inviteButton : undefined
            }
        },
        userInput = {
            sections : {
                selectSection : undefined,
                optionDialog : undefined
            },
            checkBoxes : {
                selectSpanTypeCheckBox : undefined,
                autoscrollCheckBox : undefined,
                inviteDialogDeepSearchCheckBox : undefined
            },
            buttons : {
                selectButton : undefined,
                optionButton : undefined,
                inviteButton : undefined,
                clearButton : undefined
            },
            fields : {
                autoscrollWaitForNewElementsInMsField : undefined,
                fromField : undefined,
                toField : undefined
            },
            labels : {
                fromFieldLabel : {
                    defaultValues : [],
                    values : []
                },
                toFieldLabel : {
                    defaultValues : [],
                    values : []
                },
                autoscrollCheckBoxLabel : undefined,
                autoscrollWaitForNewElementsInMsFieldLabel : undefined,
                selectSpanTypeCheckBoxLabel : undefined,
                inviteDialogDeepSearchCheckBoxLabel : undefined
            }
        },
        observation = {
            documentObserve : {
                observer : undefined,
                config : undefined,
                callback : undefined,
                observing : false
            },
            inviteDialogObserve : {
                observer : undefined,
                config : undefined,
                callback : undefined,
                observing : false
            }
        },
        timing = {
            autoscroll : {
                timer : undefined,
                func : undefined,
                callback : undefined,
                time : undefined
            },
            fade : {
                timer : undefined,
                func : undefined,
                callback : undefined,
                time : undefined
            }
        },
        flags = {
            executing : false,
            styleAdded : false,
            // Variable for determining when user has selected people and not (clicked the button).
            selectButtonClicked : false,
            fieldError : false,
            toAutoscroll : false
        },
        classNames = {
            // Array is checked from end to start.
            inviteDialog : ['standardLayout', 'eventInviteLayout', 'fbProfileBrowserListContainer', 'profileBrowserDialog'],
            inviteDialogFooter : 'uiOverlayFooter',
            inviteButtonCustom : 'invButton',
            friend : 'friend',
            friendCheckBox : 'checkbox',
            textField : 'textInput inputtext',
            enumeration : 'enumeration',
            enumerationParent : 'enumerationParent',
            alertBox : 'alertBox',
            textContainer : 'textContainer',
            button : 'uiButton',
            OKButtonContainer : 'OKButtonContainer'
        },
        names = {
            friendCheckBoxes : 'checkableitems[]'
        },
        ids = {
            // Array is checked form end to start.
            inviteDialog : ['u_6_0'],
            inviteDialogCustom : 'inviteDialog',
            inviteButtonCustom : 'invButton',
            selectButton : 'selectButton',
            selectSection : 'selectSection',
            optionDialog : 'optionDialog',
            autoscrollCheckBox : 'autoscrollCheckBox',
            autoscrollWaitForNewElementsInMsField : 'autoscrollWaitForNewElementsInMsField',
            fromField : 'fromField',
            toField : 'toField',
            clearButton : 'clearButton',
            selectSpanTypeCheckBox : 'selectSpanTypeCheckBox',
            inviteDialogDeepSearchCheckBox : 'inviteDialogDeepSearchCheckBox',
            inviteDialogCustomClassNames : 'inviteDialogCustomClassNames',
            inviteDialogCustomIds : 'inviteDialogCustomIds',
            errorMessageBox : 'errorMessageBox',
            enumeration : function (number) {
                return 'enumeration' + number.toString();
            }
        },
        values = {
            selection : {
                type : {
                    span : 'span',
                    amount : 'amount'
                }
            },
            selectButtonText : {
                clicked : 'Unselect all',
                notClicked : 'Select'
            },
            optionButtonText : 'Options',
            fromFieldLabelValues : {
                span : undefined,
                amount : undefined
            },
            fromFieldPlaceholders : {
                span : 'from',
                amount : 'from'
            },
            toFieldLabelValues : {
                span : undefined,
                amount : undefined
            },
            toFieldPlaceholders : {
                span : 'last',
                amount : 'all'
            }
        },
        selectors = {
            // Checkboxes with name = name.friendCheckBoxes
            friendCheckBoxes : 'input.' + classNames.friendCheckBox + '[name=\'' + names.friendCheckBox + '\']',
            globalCheckBoxes : 'input[type="checkbox"]:not(#' + ids.autoscrollCheckBox + '):not(#' + ids.selectSpanTypeCheckBox + ')'
        },
        styles = {
            global : ' ' +
                '.' + classNames.alertBox + ' {' +
                    'z-index: 100 !important;' +
                    // try and prevent alert boxes from exceeding screen
                    (window.screen ?
                            ((window.screen.availWidth ?
                                    'max-width: ' + (window.screen.availWidth * 0.8).toString() + 'px;' +
                                    'left: ' + (window.screen.availWidth * 0.05).toString() + 'px;' :
                                    'left: 4em;') + (window.screen.availHeight ?
                                            'max-height: ' + (window.screen.availHeight * 0.8).toString() + 'px;' +
                                            'bottom: ' + (window.screen.availHeight * 0.05).toString() + 'px;' :
                                            'bottom: 5em;')
                                    ) :
                            '') +
                    'overflow: auto;' +
                    'text-align: center;' +
                    'display: block;' +
                    'background: linear-gradient(#fff,  #bbb);' +
                    'border-radius: 1em;' +
                    'border-color: #999 #999 #888;' +
                    'border-style: solid;' +
                    'border-width: 0.1em;' +
                    'box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2), inset 0 0 3px #888;' +
                '}' +
                '.' + classNames.alertBox + ' b {' +
                    'line-height: 1em;' +
                '}' +
                '.' + classNames.alertBox + ' .' + classNames.textContainer + ' {' +
                    'z-index: 100 !important;' +
                    'text-align: left;' +
                    'padding-left: 1.5em;' +
                    'padding-top: 1em;' +
                    'padding-right: 1.5em;' +
                    'padding-bottom: 1em;' +
                '}' +
                '.' + classNames.alertBox + ' .' + classNames.OKButtonContainer + ' {' +
                    'text-align: right;' +
                    'padding-top: 1em;' +
                    'line-height: 2em;' +
                '}' +
                '.' + classNames.button + ':hover {' +
                    'color: #fff;' +
                '}' +
                '.' + classNames.enumeration + ' {' +
                    'z-index: 100 !important;' +
                    'position: absolute;' +
                    'left: 0.1em;' +
                    'top: 0.1em;' +
                    'line-height: 1em !important;' +
                    'opacity: 0.7;' +
                    'color: white;' +
                    'font-weight: bold;' +
                    'text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;' +
                '}' +
                '.' + classNames.enumerationParent + ' {' +
                    'position: relative;' +
                '}' +
                '.' + classNames.friendCheckBox + ' {' +
                    'display: inherit !important;' +
                    'float: left;' +
                '}' +
                '.' + classNames.inviteButtonCustom + ' {' +
                    'float: left;' +
                '}' +
                ' '
        },
        links = {
            homePage : 'http://userscripts.org/scripts/show/89653',
            bug : 'http://userscripts.org/topics/135961',
            suggestion : 'http://userscripts.org/topics/77659',
            donation : {
                large : 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=R9P2DXHKZTKD4&lc=US&item_name=Facebook%3a%20InviteThemAll%20development&item_number=Remote%20inspiration&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted',
                small : 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=R9P2DXHKZTKD4&lc=US&item_name=Facebook%3a%20InviteThemAll%20development&item_number=Remote%20inspiration&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted',
                btnImgLarge : 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
                btnImgSmall : 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif'
            }
        },


        // Cross browser stuff.
        // Page Visibility API
        // https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
        pageVisibilityAPI = {
            hidden : undefined,
            visibilityChange : undefined
        },

        // Function to add custom CSS.
        addStyle = function (aCss) {
            var head = document.getElementsByTagName('head')[0];
            if (head) {
                var style = document.createElement('style');
                style.setAttribute('type', 'text/css');
                style.textContent = aCss;
                head.appendChild(style);
                return style;
            }
            return null;
        },

        // Functions to log to console.
        logFunction = window.console.log,
        cLog = function (msg) {
            logFunction(msg);
        },
        infoLog = function (msg) {
            cLog('{Facebook: InviteThemAll} ' + msg);
        },
        dbgLog = function (msg) {
            if (debug) {
                infoLog(msg);
            }
        },
        dbgCLog = function (msg) {
            if (debug) {
                cLog(msg);
            }
        },

        // Functions to manage persistent storage.
        // Customized to data form used in this script. See JS objects defined earlier.
        setPersistentValue = function (aPersVarObj, aValue) {
            dbgLog('setting \'' + aPersVarObj.name + '\' in localStorage to \'' + aValue + '\'');
            return localStorage.setItem(aPersVarObj.name, aValue);
        },
        getPersistentValue = function (aPersVarObj) {
            return localStorage.getItem(aPersVarObj.name) || aPersVarObj.defaultValue;
        },
        removePersistentValue = function (aPersVarObj) {
            dbgLog('removing \'' + aPersVarObj.name + '\' from localStorage. was \'' + getPersistentValue(aPersVarObj) + '\'');
            return localStorage.removeItem(aPersVarObj.name);
        },

        // Function to parse booleans as string, like parseInt parses integers.
        parseBoolean = function (str) {
            // http://stackoverflow.com/a/8918257
            str = str.toString().toLowerCase();
            return str === 'true';
        },

        // Function to determine array contains element.
        // http://www.sitepoint.com/google-closure-how-not-to-write-javascript/
        arrayHasElement = function (arr, elm) {
            var count = arr.length;
            while (count--) {
                if (arr[count] === elm) {
                    return true;
                }
            }
            return false;
        },

        // Function to reset all children of JS object.
        // Must specify object whose children are to be reset, and what to reset to.
        resetObjectChildrenTo = function (obj, setTo) {
            for (current in obj) {
                if (obj.hasOwnProperty(current)) {
                    obj[current] = setTo;
                }
            }
        },

        // Function to reset timer.
        // Expect input in timer format specified in this script.
        resetTimer = function (obj) {
            window.clearTimeout(obj.timer);
            obj.timer = window.setTimeout(obj.func, obj.time);
        },

        // Function to ensure element has specified class.
        ensureElementHasClass = function (elm, classNeim) {
            if (elm.className.indexOf(classNeim) === -1) {
                elm.className += ' ' + classNeim;
            }
        },

        // Function to check if element exists in page.
        // https://developer.mozilla.org/en-US/docs/Web/API/Node.contains#Example
        isInPage = function (node) {
            return (node === document.body) ? false : document.body.contains(node);
        },

        // Function to replace elements in the DOM.
        replaceElement = function (elmReplacement, elmToReplace) {
            // Insert new and remove previous.
            elmToReplace.parentNode.insertBefore(elmReplacement, elmToReplace);
            elmToReplace.parentNode.removeChild(elmToReplace);
        },

        // Function for clicking elements.
        clickElement = function (elm) {
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elm.dispatchEvent(evt);
        },

        // Functions to enable or disable groups of elements.
        // function (BOOLEAN, {}, [])
        toggleEnablementOfElements = function (disabledState, elms, elmsToExclude) {
            var elm;
            for (elm in elms) {
                // omg, faulty standards. http://yuiblog.com/blog/2006/09/26/for-in-intrigue/
                // Only change if not to exclude this.
                if (elms.hasOwnProperty(elm) && !(elmsToExclude && arrayHasElement(elmsToExclude, elms[elm]))) {
                    elms[elm].disabled = disabledState;
                }
            }
        },
        enableElements = function (elms, elmsToExclude) {
            toggleEnablementOfElements(false, elms, elmsToExclude);
        },
        disableElements = function (elms, elmsToExclude) {
            toggleEnablementOfElements(true, elms, elmsToExclude);
        },

        // Function to get cumulative (real) position of element.
        // Thanks to Patrick H. Lauke at QuirksMode (http://www.quirksmode.org/js/findpos.html).
        getCumulativePosition = function (obj) {
            var curleft = 0, curtop = curleft;

            // Iterate through all offsetParents.
            if (obj.offsetParent) {
                do {
                    // Add the offsetParent's offsets to the variables holding the offset-values.
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;

                    // Iterate.
                    obj = obj.offsetParent;
                } while (obj);
            }

            return {fromLeft: curleft, fromTop: curtop};
        },

        // Function for checking if an element is below the viewport / out of view.
        isBelowViewport = function (container, element) {
            // Gather necessary data.
            var scrolledFromTop = container.scrollTop,
                viewportHeight = container.offsetHeight,
                totalHeight = container.scrollHeight,
                elementHeight = element.offsetHeight,
            // Calculate how much is left from bottom of viewport to top of page.
                leftFromTop = scrolledFromTop + viewportHeight,
            // Calculate how much is left from bottom of viewport to bottom of page.
                remainingFromBottom = totalHeight - leftFromTop;

            // If "bottom of viewport to bottom of page" > "element height", element is below viewport.
            return remainingFromBottom > elementHeight;
        },

        // Function to ensure MutationObserver is observing.
        ensureObserving = function (observationObject, objectToObserve) {
            if (!observationObject.observer) {return; }

            if (!observationObject.observing) {
                observationObject.observer.observe(objectToObserve, observationObject.config);
                // flag
                observationObject.observing = true;
            }
        },
        // Function to ensure MutationObserver is not observing.
        ensureNotObserving = function (observationObject) {
            if (!observationObject.observer) {return; }

            if (observationObject.observing) {
                observationObject.observer.disconnect();
                // flag
                observationObject.observing = false;
            }
        },

        // Fade function (element, duration in seconds, from opacity, to opacity[, callback]).
        fade = function (elm, time, from, to, fadeCallback) {
            /*
                updateRate           = interval (in ms) between each execution of the fade function (below)
                neenedcalcs          = (milliseconds in one second * input seconds) / milliseconds to allot on
                currentCalculations  = number incrementing with the number of calculations performed
                opacityPerLoop       = (from what opacity - to what opacity)[array of opacity to loop through] / calculations to allot on
                currentOpacity       = well ... current opacity :)
            */
            var updateRate = 10, neededCalculations = (1000 * time) / updateRate,
                currentCalculations = 0, opacityPerLoop = (from - to) / neededCalculations, currentOpacity = from;

            // Initiate fade.
            // First, set initial opacity.
            elm.style.opacity = currentOpacity;

            // Use "recursive" setTimeouts instead of setInterval to make sure previous execution is finished before next starts.
            timing.fade.callback = fadeCallback;
            timing.fade.func = function () {
                // If haven't reached number of calculations yet.
                if (currentCalculations !== neededCalculations) {
                    // Reduce / increase current opacity.
                    currentOpacity -= opacityPerLoop;
                    // Set opacity.
                    elm.style.opacity = currentOpacity;
                    // Iterate.
                    currentCalculations += 1;

                    // Continue.
                    resetTimer(timing.fade);

                // If done.
                } else {
                    // If element has negative opacity, remove it.
                    if (opacityPerLoop > 0) {
                        elm.parentNode.removeChild(elm);
                    }

                    // If callback is passed, execute it.
                    if (timing.fade.callback) {
                        timing.fade.callback();
                    }
                }
            };
            timing.fade.time = updateRate;
            timing.fade.timer = window.setTimeout(timing.fade.func, timing.fade.time);
        },

        // Function to create container for an array of elements.
        createContainer = function (aContElmType, aElmArray) {
            var aCont = document.createElement(aContElmType);
            for (i = 0, l = aElmArray.length; i < l; ++i) {
                aCont.appendChild(aElmArray[i]);
            }

            return aCont;
        },
        // Function to create a label for an element.
        createLabelFor = function (textParam, forElm) {
            var labl = document.createElement('label');
            labl.appendChild(document.createTextNode(textParam));
            labl.setAttribute('for', forElm.id);

            return labl;
        },
        // Function to create a link (A tag).
        createLink = function (aUrl, aTitle) {
            var elm = document.createElement('a');
            elm.setAttribute('href', aUrl);
            elm.textContent = aUrl;
            // Always open links at "_blank".
            elm.setAttribute('target', '_blank');
            // Set title/tooltip if presented.
            if (aTitle) {
                elm.title = aTitle;
            }
            return elm;
        },


        // Function to remove persistent storage.
        resetPersistentStorage = function () {
            // bfs, or w/e
            var queue = [], child;

            // init
            queue[0] = persistentStorage;
            // return;
            while (queue.length) {
                // remove if is a value
                if (queue[0].name) {
                    removePersistentValue(queue[0]);
                // else, assume it is a parent, so add children to queue.
                } else {
                    for (child in queue[0]) {
                        if (queue[0].hasOwnProperty(child)) {
                            queue[queue.length] = queue[0][child];
                        }
                    }
                }
                // any way, remove from queue.
                queue.shift();
            }
        },


        // Function to alert errors in a non-blocking way.
        // 'elms' is an array, either an DOM element or a String, each being appended with a BR in between.
        // 'relativeElement' is a DOM element the info alert dialog will be placed relative to.
        // 'infoAlertCallback' is a function to be executed after closing the info alert dialog.
        infoAlert = function (header, elms, relativeElement, infoAlertCallback) {
            if (!elms) {return; }

            // Try executing the non-blocking way. If nothing else works, fall back to window.alert.
            try {
                // Function for appending the elms to the container.
                var appendText = function (elm, elms) {
                    for (i = 0, l = elms.length; i < l; ++i) {
                        elm.appendChild(typeof elms[i] === 'string' ? document.createTextNode(elms[i]) : elms[i]);

                        // Append line break after element.
                        elm.appendChild(document.createElement('br'));
                    }
                };

                // Outer container.
                var container = document.createElement('div');
                container.className = classNames.alertBox;
                container.id = ids.errorMessageBox;
                container.style.opacity = 0;

                // Inner container.
                var innerContainer = document.createElement('div');
                innerContainer.className = classNames.textContainer;

                // Header.
                var headerElm = document.createElement('b');
                headerElm.appendChild(document.createTextNode(header || 'InviteThemAll'));
                headerElm.appendChild(document.createElement('br'));
                headerElm.appendChild(document.createElement('br'));

                // OK button.
                var OKButtonContainer = document.createElement('div');
                var OKButton = document.createElement('input');

                OKButton.type = 'button';
                OKButton.value = 'OK';
                OKButton.className = classNames.button;

                // It's function.
                // If any callback is present, append it as a callback to the fade function.
                OKButton.addEventListener('click', function () {
                    fade(container, 0.1, container.style.opacity, 0, (infoAlertCallback && function () {
                        infoAlertCallback();
                    }));
                    return false;
                }, false);

                // OK button container.
                OKButtonContainer.className = classNames.OKButtonContainer;
                OKButtonContainer.appendChild(OKButton);


                // Append elements.
                innerContainer.appendChild(headerElm);
                appendText(innerContainer, elms);
                innerContainer.appendChild(OKButtonContainer);
                container.appendChild(innerContainer);

                // Append container to outer container.
                // Try first at the invite dialog footer, fall back to first child of invite dialog, in worst case "document.body".
                try {
                    pageElements.sections.inviteDialogFooter.appendChild(container);
                } catch (e) {
                    dbgLog('failed to append error alert dialog to invite dialog footer. error: ' + e);
                    try {
                        pageElements.sections.inviteDialog.firstChild.appendChild(container);
                    } catch (f) {
                        dbgLog('failed to append error alert dialog to invite dialog. error: ' + f);
                        document.body.appendChild(container);
                    }
                }

                // Apply position.
                container.style.position = 'fixed';

                // // If position array is present, and if two values exact, set it to those.
                // if (positionArray && positionArray.length === 2) {
                    // // Remove the width and height of the container from the given positions,
                    // // to make the lower left corner what the position is relative to.
                    // var pixelsFromLeft = positionArray[0], pixelsFromTop = positionArray[1] - container.offsetHeight;

                    // container.style.left = pixelsFromLeft.toString() + 'px';
                    // container.style.top = pixelsFromTop.toString() + 'px';
                // 
                // If a relativeElement is present, calculate it's position, and set postitionArray from calculations.
                // Else, keep default values.
                if (relativeElement) {
                    var
                        relativeElementPosition = getCumulativePosition(relativeElement), offsetPixelsToRight = 30, offsetPixelsToBottom = 10,
                        // Remove the width and height of the container from the given positions,
                        // to make the lower left corner what the position is relative to.
                        pixelsFromLeft = relativeElementPosition.fromLeft - offsetPixelsToRight,
                        pixelsFromTop = relativeElementPosition.fromTop - offsetPixelsToBottom - container.offsetHeight,
                        // Get pixels from bottom if we can, because we set .alertBox from bottom.
                        //     We need to undo what pixelsFromTop did. Twice, because now we want from bottom.
                        pixelsFromBottom = (window.screen && window.screen.availHeight) && window.screen.availHeight - pixelsFromTop - 2 * offsetPixelsToBottom - 2 * container.offsetHeight;

                    // We must have valid input. Else, we do nothing.
                    if (!isNaN(pixelsFromLeft) && !isNaN(pixelsFromTop)) {
                        container.style.left = pixelsFromLeft.toString() + 'px';

                        // Use pixels from bottom if we can.
                        if (!isNaN(pixelsFromBottom)) {
                            container.style.bottom = pixelsFromBottom.toString() + 'px';
                        // Else, dirty fix.
                        } else {
                            container.style.top = pixelsFromTop.toString() + 'px';
                            container.style.bottom = 'inherit';
                        }
                    }
                }

                // Fade it in.
                fade(container, 0.2, container.style.opacity, 0.9);

                // Return the container.
                return container;
            // If nothing else works, fall back to window.alert.
            } catch (f) {
                dbgLog('error utilizing custom info alert dialog. ' + f);
                dbgLog('    passed info which failed:');
                dbgCLog(elms);

                // Start with header, and two newlines.
                var messageInString = header + '\n\n';

                for (i = 0, l = elms.length; i < l; ++i) {
                    // Append message. That will be an element's 'textContent' or the element itself.
                    messageInString += (elms[i].textContent || elms[i].toString()) + '\n';
                }

                window.alert(messageInString);

                if (infoAlertCallback) {
                    infoAlertCallback();
                }
            }
        },
        // Function to alert errors.
        errorAlert = function (message, relativeElement, errorAlertCallback) {
            infoAlert('Error!', message, relativeElement, errorAlertCallback);
        },

        generateDonationButton = function (large) {
            // img inside a link
            var a = document.createElement('a'), img = document.createElement('img'),
                donationLink = large ?
                        links.donation.large :
                        links.donation.small;

            a.setAttribute('href', donationLink);
            a.setAttribute('target', '_blank');

            img.src = large ?
                    links.donation.btnImgLarge :
                    links.donation.btnImgSmall;

            a.appendChild(img);

            return a;
        },

        // Function to show donation dialog.
        showDonationDialog = function () {
            dbgLog('showing donation dialog');

            infoAlert('Thanks', [
                'for using this script another 50 times!',
                'Much time and energy is put into developing it,',
                'regarding functionality, performance and, lately,',
                'cross-browser compatibility. I have fun doing some',
                'of it, and some, well, is a pain in the arse.',
                '',
                'I hate $$ beggers myself, so I\'ll merely give you',
                'the opportunity. If you would like to send a thanks',
                'in a way I really would appreciate,',
                'here is an option to send me some encouragement',
                'for my regularly hard work.',
                '',
                generateDonationButton(),
                '',
                'By the way, the only situation I actually think you',
                'owe me a bit, is if you own a night club, run discos,',
                'throw parties, or perform other activities',
                'where your guest count, thus income, depends on',
                'Facebook invites, eased by this script, big time.',
                'Say, you would have 20 less guests, each worth $10;',
                'then I just earned you $200, every single arrangement.',
                'Hope you agree with me that it\'s in many ways',
                'fair to share a little of that with an unemployed',
                'student developer.',
                '',
                'So, nuff interruption. Happy further inviting them all!']);
        },

        // Function to scroll friend container.
        // Returns 0 if executed scrolling, and !0 if no scrolling was executed.
        scrollFriends = function () {
            if (!pageElements.collections.friends.length) {return; }
            dbgLog('scrolling');

            var lastFriend = pageElements.collections.friends[pageElements.collections.friends.length - 1],
                scrollableDiv = lastFriend.offsetParent;

            // If last element is below viewport, scroll it into view.
            if (isBelowViewport(scrollableDiv, lastFriend)) {
                // Scroll last visible friend into view.
                    // Old version.
                    // lastFriend.scrollIntoView(alignToTop);
                // Top of viewport scrolled from top = total height - viewport heigh.
                scrollableDiv.scrollTop = scrollableDiv.scrollHeight - scrollableDiv.offsetHeight;

                // return positively.
                return 0;
            }

            // If last friend is visible (all scrolled down already) before any scrolling is executed ...
            // ... return negatively.
            return !0;
        },

        // Function to autoscroll.
        autoscroll = function (callback) {
            dbgLog('autoscrolling');

            // If already autoscrolling, no need to initiate a new one.
            if (flags.toAutoscroll) {return; }

            // If last friend is visible, no scrolling is necessary.
            // This can be determined by running the scroll function once. It returns 0 if scrolling was executed, and !0 if no scrolling was possible.
            // As well, initiate first scroll.
            if (!scrollFriends()) {
                // Flag for invite dialog observer to scroll on added nodes.
                flags.toAutoscroll = true;

                // Wait specified time for new elements.
                // If none showed up within time, disable scrolling and initiate callback.
                timing.autoscroll.callback = callback;
                timing.autoscroll.func = function () {
                    dbgLog('finished autoscrolling');

                    flags.toAutoscroll = false;
                    if (timing.autoscroll.callback) {
                        timing.autoscroll.callback();
                    }
                };
                timing.autoscroll.timer = window.setTimeout(timing.autoscroll.func, timing.autoscroll.time);

            // If no scrolling was performed, just initiate callback.
            } else {
                if (callback) {
                    callback();
                }
            }
        },

        // Friend-select function.
        selectFriends = function (btn) {
            var
                // Use the friends' checkboxes, as it's easiest to figure out if the friend is disabled this way, as well as other advantages.
                // Variable for choice to select all (including disabled friends), regardless of their state.
                forceChoose = false,
                // Set the first friend to select.
                // If no userset value, start from beginning.
                // Else, start from the given number.
                selectionStart = getPersistentValue(persistentStorage.selection[ids.fromField]) === '' ?
                        0 :
                        // Translate first (#1) to #0.
                        parseInt(getPersistentValue(persistentStorage.selection[ids.fromField]), 10) - 1,
                // Set the last friend to select.
                // If no userset value, select until end.
                // Else if element select type is "span" is set, try select until the given value.
                // Else, select excactly the given number of friends.
                friendsToSelect = getPersistentValue(persistentStorage.selection[ids.toField]) === '' ?
                        getPersistentValue(persistentStorage.selection.type) === values.selection.type.span ?
                                // Starting later = ending sooner.
                                pageElements.collections.friendCheckBoxes.length - selectionStart :
                                // Just take whole bunch; loop will break anyways.
                                pageElements.collections.friendCheckBoxes.length :
                        getPersistentValue(persistentStorage.selection.type) === values.selection.type.span ?
                                // to #: b
                                parseInt(getPersistentValue(persistentStorage.selection[ids.toField]), 10) - selectionStart :
                                // How many?: b
                                parseInt(getPersistentValue(persistentStorage.selection[ids.toField]), 10),
                selectedFriends = 0,
                // If "amount" selection type, iterate only when selecting.
                // Else if "span" selection type, iterate always.
                alwaysIterate = getPersistentValue(persistentStorage.selection.type) === values.selection.type.span,
                currentFriendNumber = selectionStart,
                // Initialize variables.
                currentLink;

            // Select friends.
            if (!flags.selectButtonClicked) {
                dbgLog('selecting ' + friendsToSelect + ' friends');

                // Measure selection performance.
                var beforeSelect = new Date().getTime();

                // If there is more to select, and if the next friend to select exists.
                while (friendsToSelect > selectedFriends && pageElements.collections.friendCheckBoxes[currentFriendNumber] && pageElements.collections.friends[currentFriendNumber]) {
                    // If friend is not selected and not disabled, or if user has chosen to select it anyway -> select the friend.
                    if ((!pageElements.collections.friendCheckBoxes[currentFriendNumber].checked && !pageElements.collections.friendCheckBoxes[currentFriendNumber].disabled) || forceChoose) {
                        // If no custom global "Invite" button has been added, current page does not feature friends with one "Invite" button for each friend,
                        // but each friend is first selected, and then invited through a global native "Invite" button.
                        //     In such a case, one can click a checkbox of a friend, or an anchor (link) of the friend.
                        //     Clicking the links has better performance than clicking the checkboxes.
                        // Else, custom global "Invite" button has been added, and current page features friends with one "Invite" button for each friend.
                        //     In such a case, checkboxes must be added to make the page feature a way to select which friends to invite.
                        //     Click the checkboxes.

                        // If found invite button does not have the same ID as custom invite button would have, invite button is not a custom invite button.
                        currentLink = (userInput.buttons.inviteButton && userInput.buttons.inviteButton.id !== ids.inviteButtonCustom) ?
                                // The anchors are hopefully the first link within the current friend.
                                (pageElements.collections.friends[currentFriendNumber].getElementsByTagName('a')[0] && pageElements.collections.friends[currentFriendNumber].getElementsByTagName('a')[0].className.indexOf('anchor') !== -1 && pageElements.collections.friends[currentFriendNumber].getElementsByTagName('a')[0]) :
                                pageElements.collections.friendCheckBoxes[currentFriendNumber];

                        clickElement(currentLink);

                        // Iterate variable "selectedFriends".
                        selectedFriends += 1;
                    } else if (alwaysIterate) {
                        selectedFriends += 1;
                    }

                    // Iterate currentFriendNumber.
                    currentFriendNumber += 1;
                }

                dbgLog('selection took ' + (new Date().getTime() - beforeSelect).toString() + 'ms');

                // Change button text, and set it clicked.
                btn.value = values.selectButtonText.clicked;
                flags.selectButtonClicked = true;

                // Iterate times select button has been used.
                // get value and iterate. if empty, start over.
                var timesSelectedFriends = parseInt(getPersistentValue(persistentStorage.timesSelectedFriends), 10) + 1;
                setPersistentValue(persistentStorage.timesSelectedFriends, timesSelectedFriends);

                // Show donation dialog every 50 times selection is used.
                if (timesSelectedFriends % 50 === 0) {
                    showDonationDialog();
                }
            // Unselect friends.
            } else {
                dbgLog('unselecting all friends');

                // Measure selection performance.
                var beforeSelect = new Date().getTime();

                i = pageElements.collections.friendCheckBoxes.length;
                while (i--) {
                    // If friend is selected and not disabled, or if user has chosen to select it anyway -> unselect the friend.
                    if ((pageElements.collections.friendCheckBoxes[i].checked && !pageElements.collections.friendCheckBoxes[i].disabled) || forceChoose) {
                        // Detailed documentation in selection section.

                        // If found invite button does not have the same ID as custom invite button would have, invite button is not a custom invite button.
                        currentLink = (userInput.buttons.inviteButton && userInput.buttons.inviteButton.id !== ids.inviteButtonCustom) ?
                                // The anchors are hopefully the first link within the current friend.
                                (pageElements.collections.friends[i].getElementsByTagName('a')[0] && pageElements.collections.friends[i].getElementsByTagName('a')[0].className.indexOf('anchor') !== -1 && pageElements.collections.friends[i].getElementsByTagName('a')[0]) :
                                pageElements.collections.friendCheckBoxes[i];

                        clickElement(currentLink);
                    }
                }

                dbgLog('Selection took: ' + (new Date().getTime() - beforeSelect).toString() + 'ms');

                // Change button text, and set it unclicked.
                btn.value = values.selectButtonText.notClicked;
                flags.selectButtonClicked = false;
            }
        },

        // Function to show option dialog. Persistent storage, amongst more, is set here.
        showOptionDialog = function (relativeElement) {
            // Return if already exists.
            if (document.getElementById(ids.optionDialog)) {return; }

            // Create the fields' functions
            // Error alerting function. See it's declearance for information.
            var fieldErrorAlert = function (message, concerningElementParameter) {
                // Set error variable ("flags.fieldError").
                flags.fieldError = true;

                // The concerningElement variable is either the passed element, or "this".
                // The relativeElement variable is "this" because this function is called with "func.call(this, [msg])"
                // to pass the "this" in a good way.
                var concerningElement = concerningElementParameter || this,
                    errorAlertCallback = function () {
                        concerningElement.value = '';
                        concerningElement.focus();
                    };

                errorAlert(message, this, errorAlertCallback);
            }, fieldBlurHandler = function (persistentValueToSet) {
                // Loop through possibilities of "this.value".
                switch (this.value) {
                case '':
                case this.getAttribute('placeholder'):
                    // Set variable "flags.fieldError" to false.
                    flags.fieldError = false;
                    break;
                default:
                    // Make it an integer.
                    this.value = parseInt(this.value, 10);

                    if (isNaN(this.value)) {
                        fieldErrorAlert.call(this, [
                            'You can\'t insert a non-numeric value.',
                            'Please insert a valid value.'
                        ]);
                        break;
                    }
                    // If this.previousSibling.textContent (the associated label) does not contain "#",
                    // it is not a matter of friend #x, so "0" will simply make the script select 0 friends.
                    // Else, there is no friend #0, so report an error.
                    if (this.previousSibling.textContent.indexOf('#') !== -1 && this.value === '0') {
                        fieldErrorAlert.call(this, [
                            'There does not exist a friend #0.',
                            'Please insert a valid value.'
                        ]);
                        break;
                    }
                    if (parseInt(this.value, 10) < 0) {
                        fieldErrorAlert.call(this, [
                            'You can\'t insert a negative value.',
                            'Please insert a valid value.'
                        ]);
                        break;
                    }

                    // Set variable "flags.fieldError" to false.
                    flags.fieldError = false;
                }

                // If no errors occurred, store value in persistent storage.
                if (!flags.fieldError) {
                    // Set only if not the same value as "placeholder" attribute, which means field was not set. If so, set to empty string.
                    setPersistentValue(persistentValueToSet, this.value !== this.getAttribute('placeholder') ? this.value : '');
                }
            };

            // Create a container of the elements to add to the option dialog.
            var optionElements = [];

            // Create start message.
            // Create link to home page.
            var
                homePageLink = createLink(links.homePage, 'home page'),
                bugLink = createLink(links.bug, 'bug reporting'),
                suggestionLink = createLink(links.suggestion, 'script suggestions'),
                linkContainer = createContainer('div', [
                    homePageLink, document.createElement('br'),
                    bugLink, document.createElement('br'),
                    suggestionLink, document.createElement('br')
                ]);
            linkContainer.style.textAlign = 'right';
            
            // Inform user about usage.
            var
                usageInfo = document.createTextNode('Funfact: You have Select\'ed friends ' + parseInt(getPersistentValue(persistentStorage.timesSelectedFriends), 10) + ' times.'),
                usageInfoContainer = createContainer('div', [usageInfo]);
            usageInfoContainer.style.textAlign = 'right';
            usageInfoContainer.style.fontStyle = 'italic';

            var startMessageContainer = createContainer('div', [
                linkContainer,
                usageInfoContainer,
                document.createElement('br'),
                document.createTextNode('Here, you can set various options.'), document.createElement('br'),
                document.createTextNode('Options set here will be stored in your browser,'), document.createElement('br'),
                document.createTextNode('and will be the same next time InviteThemAll is loaded.')
            ]);
            // Add to elements to include in dialog.
            optionElements.push(startMessageContainer);


            // Create the autoscroll option.
            userInput.checkBoxes.autoscrollCheckBox = document.createElement('input');
            userInput.checkBoxes.autoscrollCheckBox.type = 'checkbox';
            userInput.checkBoxes.autoscrollCheckBox.id = ids.autoscrollCheckBox;
            // Pre-check it if set in persistent storage.
            userInput.checkBoxes.autoscrollCheckBox.defaultChecked = parseBoolean(getPersistentValue(persistentStorage.toAutoscroll));
            // Align the label on line with checkbox.
            userInput.checkBoxes.autoscrollCheckBox.style.verticalAlign = 'middle';
            // Assign a function to update persistent variable on change.
            userInput.checkBoxes.autoscrollCheckBox.addEventListener('change', function () {
                setPersistentValue(persistentStorage.toAutoscroll, this.checked);
            }, false);
            // Create it's label.
            userInput.labels.autoscrollCheckBoxLabel = createLabelFor('Autoscrolling', userInput.checkBoxes.autoscrollCheckBox);
            // tooltip
            userInput.labels.autoscrollCheckBoxLabel.title = 'enable or disable autoscrolling of friends dialog before selecting';
            // Append to a container.
            var autoscrollCheckBoxContainer = createContainer('span', [userInput.labels.autoscrollCheckBoxLabel, userInput.checkBoxes.autoscrollCheckBox]);

            // Create an option to set time autoscroll waits for new elements before stopping autoscrolling and commencing selection.
            userInput.fields.autoscrollWaitForNewElementsInMsField = document.createElement('input');
            userInput.fields.autoscrollWaitForNewElementsInMsField.type = 'text';
            userInput.fields.autoscrollWaitForNewElementsInMsField.id = ids.autoscrollWaitForNewElementsInMsField;
            userInput.fields.autoscrollWaitForNewElementsInMsField.className = classNames.textField;
            userInput.fields.autoscrollWaitForNewElementsInMsField.style.width = '3em';
            userInput.fields.autoscrollWaitForNewElementsInMsField.style.textAlign = 'right';
            // Assign value form persistent storage as "placeholder" attribute, so that if field is left blank, it is known what value will be used.
            userInput.fields.autoscrollWaitForNewElementsInMsField.setAttribute('placeholder', getPersistentValue(persistentStorage.autoscrollWaitForNewElementsInMs));
            // Assign value from persistent storage if present, regardless if it's default value.
            current = getPersistentValue(persistentStorage.autoscrollWaitForNewElementsInMs);
            if (current) {
                userInput.fields.autoscrollWaitForNewElementsInMsField.value = current;
            }
            // Create it's label.
            userInput.labels.autoscrollWaitForNewElementsInMsFieldLabel = createLabelFor('Autoscroll wait [ms]:', userInput.fields.autoscrollWaitForNewElementsInMsField);
            // informative tooltip
            userInput.labels.autoscrollWaitForNewElementsInMsFieldLabel.title =
                'time in milliseconds\n' +
                'autoscroll function scrolls, then waits specified time for new elements:\n' +
                '    if new elements have arrived, scroll and wait again, \n' +
                '    if no new elements arrived in time, commence selection.\n' +
                'change this if autoscroll function stops scrolling before all friends are loaded';
            // Function to change persistent storage on field leave.
            userInput.fields.autoscrollWaitForNewElementsInMsField.addEventListener('blur', function () {
                // Call with "this", to communicate it.
                fieldBlurHandler.call(this, persistentStorage.autoscrollWaitForNewElementsInMs);
            }, false);

            // Append to a container.
            var autoscrollWaitForNewElementsInMsContainer = createContainer('span', [userInput.labels.autoscrollWaitForNewElementsInMsFieldLabel, document.createTextNode(' '), userInput.fields.autoscrollWaitForNewElementsInMsField]);

            // Append all autoscroll items to a container.
            var autoscrollContainer = createContainer('span', [autoscrollCheckBoxContainer, document.createTextNode(' '), autoscrollWaitForNewElementsInMsContainer]);
            // Add to elements to include in dialog.
            optionElements.push(autoscrollContainer);

            // Create and style checkbox for option to select all.
            userInput.checkBoxes.selectSpanTypeCheckBox = document.createElement('input');
            userInput.checkBoxes.selectSpanTypeCheckBox.type = 'checkbox';
            userInput.checkBoxes.selectSpanTypeCheckBox.id = ids.selectSpanTypeCheckBox;
            // Pre-check it if set in persistent storage.
            userInput.checkBoxes.selectSpanTypeCheckBox.defaultChecked = getPersistentValue(persistentStorage.selection.type) !== values.selection.type.span;
            // Align the label on line with checkbox.
            userInput.checkBoxes.selectSpanTypeCheckBox.style.verticalAlign = 'middle';
            // Create it's label.
            userInput.labels.selectSpanTypeCheckBoxLabel = createLabelFor('Toggle selection type', userInput.checkBoxes.selectSpanTypeCheckBox);
            // tooltip
            userInput.labels.selectSpanTypeCheckBoxLabel.title = 'click and observe';
            // Create it's function.
            userInput.checkBoxes.selectSpanTypeCheckBox.addEventListener('change', function () {
                // Set selection type in persistent storage. If not checked, type is "span"; if checked, type is "amount".
                setPersistentValue(persistentStorage.selection.type, !this.checked ? values.selection.type.span : values.selection.type.amount);

                // Change both fields' label values.
                userInput.labels.fromFieldLabel.textContent = values.fromFieldLabelValues[getPersistentValue(persistentStorage.selection.type)];
                userInput.labels.toFieldLabel.textContent = values.toFieldLabelValues[getPersistentValue(persistentStorage.selection.type)];

                // Change both fields' placeholders.
                userInput.fields.fromField.setAttribute('placeholder', values.fromFieldPlaceholders[getPersistentValue(persistentStorage.selection.type)]);
                userInput.fields.toField.setAttribute('placeholder', values.toFieldPlaceholders[getPersistentValue(persistentStorage.selection.type)]);
            }, false);
            // Append to a container.
            var selectSpanTypeContainer = createContainer('span', [userInput.labels.selectSpanTypeCheckBoxLabel, userInput.checkBoxes.selectSpanTypeCheckBox]);
            // Add to elements to include in dialog.
            optionElements.push(selectSpanTypeContainer);


            // Create select span dialogs and their labels.
            // Create and style the "from friend #x field".
            userInput.fields.fromField = document.createElement('input');
            userInput.fields.fromField.type = 'text';
            userInput.fields.fromField.id = ids.fromField;
            userInput.fields.fromField.className = classNames.textField;
            userInput.fields.fromField.style.width = '2.5em';
            userInput.fields.fromField.style.textAlign = 'right';
            userInput.fields.fromField.setAttribute('placeholder', values.fromFieldPlaceholders[getPersistentValue(persistentStorage.selection.type)]);
            // Assign value from persistent storage if present.
            current = getPersistentValue(persistentStorage.selection[ids.fromField]);
            if (current &&  current !== persistentStorage.selection[ids.fromField].defaultValue) {
                userInput.fields.fromField.value = current;
            }
            // Create it's label
            values.fromFieldLabelValues.span = 'Select friends from #:';
            values.fromFieldLabelValues.amount = 'Select friends from #:';
            userInput.labels.fromFieldLabel = createLabelFor(values.fromFieldLabelValues[getPersistentValue(persistentStorage.selection.type)], userInput.fields.fromField);

            // Create and style the "to friend #x field".
            userInput.fields.toField = document.createElement('input');
            userInput.fields.toField.type = 'text';
            userInput.fields.toField.id = ids.toField;
            userInput.fields.toField.className = classNames.textField;
            userInput.fields.toField.style.width = '2.5em';
            userInput.fields.toField.style.textAlign = 'right';
            userInput.fields.toField.setAttribute('placeholder', values.toFieldPlaceholders[getPersistentValue(persistentStorage.selection.type)]);
            // Assign value from persistent storage if present.
            current = getPersistentValue(persistentStorage.selection[ids.toField]);
            if (current &&  current !== persistentStorage.selection[ids.toField].defaultValue) {
                userInput.fields.toField.value = current;
            }
            // Create it's label
            values.toFieldLabelValues.span = 'to #:';
            values.toFieldLabelValues.amount = 'How many? :';
            userInput.labels.toFieldLabel = createLabelFor(values.toFieldLabelValues[getPersistentValue(persistentStorage.selection.type)], userInput.fields.toField);

            // Assign the handlers to the fields.
            userInput.fields.fromField.addEventListener('blur', function () {
                // Call with "this", to communicate it.
                fieldBlurHandler.call(this, persistentStorage.selection[this.id]);
            }, false);
            userInput.fields.toField.addEventListener('blur', function () {
                fieldBlurHandler.call(this, persistentStorage.selection[this.id]);
            }, false);

            // Add elements to an array, for easier later use.
            var selectSpanArray = [userInput.labels.fromFieldLabel, userInput.fields.fromField, userInput.labels.toFieldLabel, userInput.fields.toField];

            // Create space between elements.
            i = selectSpanArray.length;
            while (i--) {
                // Add space to the right
                // Exclude specified elements
                if (!(selectSpanArray[i] === userInput.labels.selectSpanTypeCheckBoxLabel || selectSpanArray[i] === userInput.checkBoxes.selectSpanTypeCheckBox)) {
                    selectSpanArray[i].style.marginRight = '0.5em';
                }
            }

            // Append to a container.
            var selectSpanContainer = createContainer('span', selectSpanArray);
            // Add to elements to include in dialog.
            optionElements.push(selectSpanContainer);


            // Create space.
            optionElements.push('');


            // Inform that developer settings now follows.
            var devSettingsMessage = document.createElement('i');
            devSettingsMessage.textContent = 'Developer settings now follows. Know what you\'re doing.';
            // Add to elements to include in dialog.
            optionElements.push(devSettingsMessage);

            // Create fields to allow user input of invite dialog class names and ids.
            // This enables the end user to fix compatibility without changing source code.
            // Inform about possibility, and that values must be separated by spaces.
            var inviteDialogCustomMessage = createContainer('span', [
                document.createTextNode('Invite dialog is looked up through hard coded class names and ids.'), document.createElement('br'),
                document.createTextNode('If Facebook changes their code again, you can update the lookup'), document.createElement('br'),
                document.createTextNode('yourself here, before the dev might get around to hard code it again :)')
            ]);
            // Custom class names.
            userInput.fields.inviteDialogCustomClassNames = document.createElement('input');
            userInput.fields.inviteDialogCustomClassNames.type = 'text';
            userInput.fields.inviteDialogCustomClassNames.id = ids.inviteDialogCustomClassNames;
            userInput.fields.inviteDialogCustomClassNames.className = classNames.textField;
            userInput.fields.inviteDialogCustomClassNames.style.width = '100%';
            userInput.fields.inviteDialogCustomClassNames.setAttribute('placeholder', 'Custom class names');
            userInput.fields.inviteDialogCustomClassNames.value = getPersistentValue(persistentStorage[ids.inviteDialogCustomClassNames]);
            // Inform current info in tooltip.
            userInput.fields.inviteDialogCustomClassNames.title = 'current class names: "' + classNames.inviteDialog.toString().replace(/,/g, ' ') + '"';
            // Custom ids.
            userInput.fields.inviteDialogCustomIds = document.createElement('input');
            userInput.fields.inviteDialogCustomIds.type = 'text';
            userInput.fields.inviteDialogCustomIds.id = ids.inviteDialogCustomIds;
            userInput.fields.inviteDialogCustomIds.className = classNames.textField;
            userInput.fields.inviteDialogCustomIds.style.width = '100%';
            userInput.fields.inviteDialogCustomIds.setAttribute('placeholder', 'Custom ids');
            // Inform current info in tooltip.
            userInput.fields.inviteDialogCustomIds.title = 'current ids: "' + ids.inviteDialog.toString().replace(/,/g, ' ') + '"';
            userInput.fields.inviteDialogCustomIds.value = getPersistentValue(persistentStorage[ids.inviteDialogCustomIds]);
            // Set persistent storage on leaving field.
            var inviteDialogCustomFieldBlurHandler = function () {
                // Set only if not the same value as "placeholder" attribute, which means field was not set. If so, set to empty string.
                setPersistentValue(persistentStorage[this.id], this.value !== this.getAttribute('placeholder') ? this.value : '');
            };
            userInput.fields.inviteDialogCustomClassNames.addEventListener('blur', inviteDialogCustomFieldBlurHandler, false);
            userInput.fields.inviteDialogCustomIds.addEventListener('blur', inviteDialogCustomFieldBlurHandler, false);

            // Append to a container.
            var inviteDialogCustomInputContainer = createContainer('span', [
                inviteDialogCustomMessage, document.createElement('br'),
                userInput.fields.inviteDialogCustomClassNames, document.createElement('br'),
                userInput.fields.inviteDialogCustomIds
            ]);
            // Add to elements to include in dialog.
            optionElements.push(inviteDialogCustomInputContainer);

            // Create option to perform "deep search for invite dialog", ie. search document for invite dialog at each document mutation.
            // Inform that this is much slower than surface checking.
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox = document.createElement('input');
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox.type = 'checkbox';
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox.id = ids.inviteDialogDeepSearchCheckBox;
            // Pre-check it if set in persistent storage.
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox.defaultChecked = parseBoolean(getPersistentValue(persistentStorage.inviteDialogDeepSearch));
            // Align the label on line with checkbox.
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox.style.verticalAlign = 'middle';
            // Assign a function to update persistent variable on change.
            userInput.checkBoxes.inviteDialogDeepSearchCheckBox.addEventListener('change', function () {
                setPersistentValue(persistentStorage.inviteDialogDeepSearch, this.checked);
            }, false);
            // Create it's label.
            userInput.labels.inviteDialogDeepSearchCheckBoxLabel = createLabelFor('Invite dialog deep search (slow!)', userInput.checkBoxes.inviteDialogDeepSearchCheckBox);
            userInput.labels.inviteDialogDeepSearchCheckBoxLabel.title =
                'invite dialog lookup is performed at each DOM mutation\n' +
                'if not enabled, only look through inserted nodes for invite dialog\n' +
                'not failsafe, so if enabled, look through the whole DOM for invite dialog';
            // Append to a container.
            var inviteDialogDeepSearchContainer = createContainer('span', [userInput.labels.inviteDialogDeepSearchCheckBoxLabel, userInput.checkBoxes.inviteDialogDeepSearchCheckBox]);
            // Add to elements to include in dialog.
            optionElements.push(inviteDialogDeepSearchContainer);


            // Create space.
            optionElements.push('');


            // Create "Clear" button.
            userInput.buttons.clearButton = document.createElement('input');
            userInput.buttons.clearButton.type = 'button';
            userInput.buttons.clearButton.className = classNames.button;
            userInput.buttons.clearButton.id = ids.clearButton;
            userInput.buttons.clearButton.value = 'Clear stored data';
            userInput.buttons.clearButton.title = 'like settings and ... well, just settings';
            userInput.buttons.clearButton.addEventListener('click', function () {
                resetPersistentStorage();
            }, false);
            // Add to elements to include in dialog.
            optionElements.push(userInput.buttons.clearButton);


            // Add to DOM and make globally accessible.
            userInput.sections.optionDialog = infoAlert('Options', optionElements, relativeElement);
            if (userInput.sections.optionDialog) {
                userInput.sections.optionDialog.id = ids.optionDialog;
            }
        },

        // Function for adding the section containing "Select" and "Options" buttons.
        addSelectSection = function () {
            if (!pageElements.sections.inviteDialog || !pageElements.sections.inviteDialogTable) {return; }
            dbgLog('adding select section');

            // Check if invite dialog already contains select section.
            if (!(pageElements.sections.inviteDialog.getElementById && pageElements.sections.inviteDialog.getElementById(ids.selectSection)) || document.getElementById(ids.selectSection)) {
                // Create select button.
                userInput.buttons.selectButton = document.createElement('input');
                userInput.buttons.selectButton.type = 'button';
                userInput.buttons.selectButton.className = classNames.button;
                userInput.buttons.selectButton.id = ids.selectButton;

                // Set default button text value.
                userInput.buttons.selectButton.value = values.selectButtonText.notClicked;

                // Button function.
                userInput.buttons.selectButton.addEventListener('click', function () {
                    // Return if variable flags.fieldError is set.
                    if (flags.fieldError) {
                        return;
                    }

                    if (parseBoolean(getPersistentValue(persistentStorage.toAutoscroll))) {
                        autoscroll(function () {
                            selectFriends(userInput.buttons.selectButton);
                        });
                    } else {
                        selectFriends(userInput.buttons.selectButton);
                    }
                }, false);

                // Create options button.
                userInput.buttons.optionButton = document.createElement('input');
                userInput.buttons.optionButton.type = 'button';
                userInput.buttons.optionButton.className = classNames.button;
                userInput.buttons.optionButton.id = ids.optionButton;

                // Set default button text value.
                userInput.buttons.optionButton.value = values.optionButtonText;

                // Button function.
                userInput.buttons.optionButton.addEventListener('click', function () {
                    // showOptionDialog(this);
                    showOptionDialog();
                }, false);


                // Create the container and inner container.
                var cont = document.createElement('tr');
                var icont = document.createElement('td');

                // Style/modify inner container.
                icont.setAttribute('colspan', 0);
                icont.style.textAlign = 'right';
                icont.style.paddingTop = '0.4em';

                // Append elements.
                icont.appendChild(userInput.buttons.optionButton);
                icont.appendChild(userInput.buttons.selectButton);
                cont.appendChild(icont);

                // Make globally accessible.
                cont.id = ids.selectSection;
                userInput.sections.selectSection = cont;

                // Inject the button.
                pageElements.sections.inviteDialogTable.appendChild(cont);
            }
        },

        // Function to invite friends.
        // Only used at pages lacking a "Invite" button, so used with custom "Invite" button.
        // Function is to click "Invite" button of each friend user specifies.
        inviteFriends = function () {
            // Check for required variables before attempting execution.
            if (!pageElements.collections.friends || !pageElements.collections.friendCheckBoxes) {return; }
            dbgLog('inviting checked friends');

            // Initialize variables.
            var currentLinks;

            // Loop through each friend.
            i = pageElements.collections.friends.length;
            while (i--) {
                // If current friend's checkbox is checked, click the Invite button.
                if (pageElements.collections.friendCheckBoxes[i].checked) {
                    // Favour intelligent way of finding Invite button.
                    // Current procedure is:
                    //   Expect only one A element under each friend that is used as a button.
                    //   Buttons contains classNames.button in class name.
                    currentLinks = pageElements.collections.friends[i].getElementsByTagName('a');

                    // For each anchor in friend.
                    for (j = 0, c = currentLinks.length; j < c; j += 1) {
                        // If anchor has class classNames.button.
                        if (currentLinks[j].className.indexOf(classNames.button) !== -1) {
                            // Assume it's the right one.
                            // Selection must happen here insinde, else wrong links can be clicked.
                            clickElement(currentLinks[j]);

                            // // Used for debugging. Or else, the friend list reduction should be a grande consequence.
                            // currentLinks[j].style.padding = '0';

                            break;
                        }
                    }
                }
            }
        },

        // Function to add custom "Invite" button.
        // function ("parent to append to")
        addCustomInviteButton = function (breed) {
            if (!breed) {return; }
            dbgLog('adding invite button');

            // Create button, if not pre-existent.
            if (!userInput.buttons.inviteButton) {
                userInput.buttons.inviteButton = document.createElement('input');
                userInput.buttons.inviteButton.type = 'button';
                userInput.buttons.inviteButton.className = classNames.button + ' ' + classNames.inviteButtonCustom;
                userInput.buttons.inviteButton.id = ids.inviteButtonCustom;
                userInput.buttons.inviteButton.value = 'Invite';
                userInput.buttons.inviteButton.addEventListener('click', inviteFriends, false);
            }

            // Add to page.
            breed.insertBefore(userInput.buttons.inviteButton, breed.firstChild);
        },

        // Function to add additional elements to the page.
        addFriendEnumeration = function () {
            if (!pageElements.collections.friends || !pageElements.collections.friends.length) {return; }
            dbgLog('ensuring enumeration for ' + pageElements.collections.friends.length + ' friends');

            var
                createEnumerationElement = function (number) {
                    var elm = document.createElement('div');

                    elm.appendChild(document.createTextNode(number.toString()));
                    elm.className = classNames.enumeration;
                    elm.id = ids.enumeration(number);

                    return elm;
                },
                // Initialize variables.
                currentFriend, enumerationElement, imgChild;

            // Loop through friends and enumerate each.
            for (i = 0, l = pageElements.collections.friends.length; i < l; ++i) {
                currentFriend = pageElements.collections.friends[i];

                // If it is not enumerated already, enumerate it.
                // if (!currentFriend.getElementById(ids.enumeration(i))) {
                if (!currentFriend.getElementsByClassName(classNames.enumeration)[0]) {
                    // Add 1 to each enumeration to start at 1, as compensation for the non-adaptable common mind.
                    enumerationElement = createEnumerationElement(i + 1);
                    imgChild = currentFriend.getElementsByTagName('img')[0];

                    // If an IMG element is found under friend container, create a new container, with the enumeration and IMG element inside.
                    // This is done to try and add the enumeration as a floating text on the IMG element.
                    // The enumeration element is floating relatively to some element. That element is hopefully the custom container element,
                    // else it is the alternative parent to append enumeration element to.
                    if (imgChild) {
                        // Create.
                        current = document.createElement('div');
                        // Copy class name of IMG elm to try and replicate as much as possible.
                        // It is also the enumeration parent, so add class name indicating that.
                        current.className = imgChild.className + ' ' + classNames.enumerationParent;
                        current.appendChild(enumerationElement);
                        current.appendChild(imgChild.cloneNode(true));

                        // Insert new and remove previous.
                        replaceElement(current, imgChild);
                    // Else, just append it to the container.
                    } else {
                        currentFriend.appendChild(enumerationElement);
                        ensureElementHasClass(currentFriend, classNames.enumerationParent);
                    }
                }
            }
        },


        // Functions to check if specific elements exist.
        getInviteDialog = function () {
            // Get invite dialog.
            var inviteDialog;

            // Try IDs.
            i = ids.inviteDialog.length;
            while (i-- && !inviteDialog) {
                inviteDialog = document.getElementById(ids.inviteDialog[i]);
            }
            // If not successful, check all specified class names.
            if (!inviteDialog) {
                i = classNames.inviteDialog.length;
                while (i-- && !inviteDialog) {
                    inviteDialog = document.getElementsByClassName(classNames.inviteDialog[i])[0];
                }
            }
            // If not successful, and "friends" is not empty, try to get via a friend.
            if (!inviteDialog && pageElements.collections.friends.length) {
                // If the parent DIV needed is not found directly, find it relatively to a friend.
                // Loop trough parent nodes, and use first parent node containing a TABLE element.
                var containerParentNode = pageElements.collections.friends[0], containerTableElement;

                do {
                    containerParentNode = containerParentNode.parentNode;
                    containerTableElement = containerParentNode.getElementsByTagName('table')[0];
                } while (containerParentNode && !containerTableElement);

                // If successful, use parent node for invite dialog. If not successful, set nothing.
                if (containerTableElement) {
                    inviteDialog = containerParentNode;
                }
            }

            // Return results.
            return inviteDialog || null;
        },
        getInviteDialogFooter = function () {
            if (!pageElements.sections.inviteDialog) {return; }

            var inviteDialogFooter = pageElements.sections.inviteDialog.getElementsByClassName(classNames.inviteDialogFooter)[0];

            return inviteDialogFooter || null;
        },
        getInviteDialogTable = function () {
            if (!pageElements.sections.inviteDialog) {return; }

            var inviteDialogTable = pageElements.sections.inviteDialog.getElementsByTagName('table')[0];

            return inviteDialogTable || null;
        },
        getInviteButton = function () {
            if (!pageElements.sections.inviteDialogFooter && !ids.inviteButtonCustom) {return; }

            var inviteButton = document.getElementById(ids.inviteButtomCustom) ||
                    (pageElements.sections.inviteDialogFooter && pageElements.sections.inviteDialogFooter.getElementsByTagName('button')[0]);

            return inviteButton || null;
        },
        getFriendCheckBoxes = function () {
            if (!pageElements.sections.inviteDialog) {return; }

            var friendCheckBoxes = document.getElementsByClassName(classNames.friendCheckBox)[0] ? document.getElementsByClassName(classNames.friendCheckBox) :
                        pageElements.sections.inviteDialog.querySelector(selectors.friendCheckBox) ? pageElements.sections.inviteDialog.querySelectorAll(selectors.friendCheckBox) :
                                pageElements.sections.inviteDialog.querySelector(selectors.globalCheckBoxes) && pageElements.sections.inviteDialog.querySelectorAll(selectors.globalCheckBoxes);

            return friendCheckBoxes || null;
        },
        getFriends = function () {
            if (!pageElements.collections.friendCheckBoxes) {return; }

            // Get the upper element of each friend, possibly alias the friend container.
            // Find each checkbox and build an array of their parents, which are the upper elements.

            // If the n'th parent node of first and second friend is the same, the (n-1)'th parent node is the upper element of each friend.
            // n = 1 gives first parent node, n = 0 gives elm.
            //     more dynamic, in cost of performance. var friends = pageElements.collections.friends || [],
            var friends = [],
                n = 0,
                friend0ParentNumbern = pageElements.collections.friendCheckBoxes[0],
                friend1ParentNumbern = pageElements.collections.friendCheckBoxes[1],
                getParentNodeNumbern = function (elm, n) {
                    while (n-- !== 0) {
                        elm = elm.parentNode;
                    }
                    return elm;
                };

            // Start at n = 1.
            while (friend0ParentNumbern && friend0ParentNumbern !== pageElements.sections.inviteDialog) {
                // Advance.
                friend0ParentNumbern = friend0ParentNumbern.parentNode;
                friend1ParentNumbern = friend1ParentNumbern.parentNode;
                ++n;

                // Check.
                if (friend0ParentNumbern === friend1ParentNumbern) {
                    // if parent #n is common, parent #n-1 is the one hunted for
                    --n;
                    break;
                }
            }

            // Build array.
            for (i = friends.length, l = pageElements.collections.friendCheckBoxes.length; i < l; ++i) {
                // Store the n'th parent node, if not already stored.
                if (!friends[friends.length]) {
                    friends[friends.length] = getParentNodeNumbern(pageElements.collections.friendCheckBoxes[i], n);
                }
            }

            return friends || null;
        },
        getSelectButton = function () {
            if (!ids.selectButton) {return; }

            var selectButton = document.getElementById(ids.selectButton);

            return selectButton || null;
        },


        // Function to prepare for manipulation.
        prepareForManipulation = function () {
            dbgLog('preparing');

            // Function for returning.
            var ret = function () {
                // If error, inform and return negatively.
                dbgLog('    returning');
                return !0;
            };

            dbgLog('    setting necessary variables');
            // If not present, get invite dialog.
            pageElements.sections.inviteDialog = getInviteDialog();
            // Check if variable was set.
            if (!pageElements.sections.inviteDialog) {
                dbgLog('        did not find invite dialog. found: ');
                dbgCLog(pageElements.sections.inviteDialog);
                return ret();
            }

            // Get invite dialog footer.
            pageElements.sections.inviteDialogTable = getInviteDialogTable();
            // if not found
            if (!pageElements.sections.inviteDialogTable) {
                dbgLog('        did not find invite dialog table, ie. the elm to inject the custom select section to. found: ');
                dbgCLog(pageElements.sections.inviteDialogTable);
                return ret();
            }

            // Get invite dialog footer.
            pageElements.sections.inviteDialogFooter = getInviteDialogFooter();
            // if not found
            if (!pageElements.sections.inviteDialogFooter) {
                dbgLog('        did not find invite dialog footer. found: ');
                dbgCLog(pageElements.sections.inviteDialogFooter);
                return ret();
            }

            // Get invite button.
            // Can do by using get-function, as no manipulation has been performed yet.
            pageElements.buttons.inviteButton = getInviteButton();
            // if not found
            if (!pageElements.buttons.inviteButton) {
                dbgLog('        did not find invite button. found: ');
                dbgCLog(pageElements.buttons.inviteButton);
            }

            // Get friend checkboxes.
            pageElements.collections.friendCheckBoxes = getFriendCheckBoxes();
            // if not found
            if (!pageElements.collections.friendCheckBoxes) {
                dbgLog('        did not find friend checkboxes. found: ');
                dbgCLog(pageElements.collections.friendCheckBoxes);
                return ret();
            }
            // Get friends.
            pageElements.collections.friends = getFriends();
            // if not found
            if (!pageElements.collections.friends) {
                dbgLog('        did not find friends. found: ');
                dbgCLog(pageElements.collections.friends);
                return ret();
            }

            // If all was set successfully, return positively.
            return 0;
        },

        // Function to manipulate page.
        manipulate = function () {
            if (!pageElements.sections.inviteDialog) {return; }
            dbgLog('manipulating page');

            // Add CSS to error alert box and it's sub elements.
            if (!flags.styleAdded) {
                addStyle(styles.global);
                flags.styleAdded = true;
            }

            // Observe invite dialog for children, to manipulate them.
            // Will be adding custom elements, so will inevitably be triggered.
            ensureObserving(observation.inviteDialogObserve, pageElements.sections.inviteDialog);

            // Add the select dialog, if a previous one does not exist.
            // if (!pageElements.sections.inviteDialog.getElementById(ids.selectSection)) {
            if (!document.getElementById(ids.selectSection)) {
                addSelectSection();
            }

            // Add a custom "Invite" button, if a previous one does not exist.
            if (!document.getElementById(ids.inviteButtonCustom)) {
                // We favor invite dialog footers.
                if (pageElements.sections.inviteDialogFooter) {
                    // Currently, assume that existence of a BUTTON in invite dialog footer element yields an "Invite" button.
                    // Add custom only if it does not exist.
                    if (pageElements.sections.inviteDialogFooter.getElementsByTagName && !pageElements.sections.inviteDialogFooter.getElementsByTagName('button')[0]) {
                        addCustomInviteButton(pageElements.sections.inviteDialogFooter);
                    } else if (pageElements.sections.inviteDialogFooter.querySelector && !pageElements.sections.inviteDialogFooter.querySelector('button')) {
                        addCustomInviteButton(pageElements.sections.inviteDialogFooter);
                    }
                // If if invite dialog footer is not found, nothing can be presumed. Add "Invite" button to custom select dialog in such case.
                } else if (userInput.sections.selectSection) {
                    addCustomInviteButton(userInput.sections.selectSection);
                }
            }

            // Flag that manipulation has been performed. Troll a tad.
            pageElements.sections.inviteDialog.setAttribute('manipulated', 'no');
        },

        // Function to act on hiding or activating tabs.
        // https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
        handleVisibilityChange = function () {
            // If page is turning inactive.
            if (document[pageVisibilityAPI.hidden]) {
                dbgLog('page was hidden');
                dbgLog('disabling all observation');
                // Ensure all observation is disabled.
                for (current in observation) {
                    if (observation.hasOwnProperty(current)) {
                        ensureNotObserving(observation[current]);
                    }
                }
            // Else, page is turning active.
            } else {
                dbgLog('page became visible');
                dbgLog('initializing observation');
                // Ensure observation is enabled.
                ensureObserving(observation.documentObserve, document.body);
            }
        };


    // Update variables.
    // Add custom invite dialog class names to "classNames.inviteDialog". They are separated by spaces.
    current = getPersistentValue(persistentStorage[ids.inviteDialogCustomClassNames]).split(' ');
    i = current.length;
    while (i--) {
        // If not empty string.
        if (current[i].length) {
            classNames.inviteDialog[classNames.inviteDialog.length] = current[i];
        }
    }
    // Add custom invite dialog ids to "ids.inviteDialog". They are separated by spaces.
    current = getPersistentValue(persistentStorage[ids.inviteDialogCustomIds]).split(' ');
    i = current.length;
    while (i--) {
        // If not empty string.
        if (current[i].length) {
            ids.inviteDialog[ids.inviteDialog.length] = current[i];
        }
    }

    // Autoscroll waiting time
    timing.autoscroll.time = parseInt(getPersistentValue(persistentStorage.autoscrollWaitForNewElementsInMs), 10);


    // Observers.
    // Invite dialog observer.
    observation.inviteDialogObserve.callback = function (mutations) {
        // Scroll if necessary. Is set through auto scroll function.
        if (flags.toAutoscroll) {
            scrollFriends();
            resetTimer(timing.autoscroll);
        }

        // Get friends.
        pageElements.collections.friendCheckBoxes = getFriendCheckBoxes();
        pageElements.collections.friends = getFriends();

        // Ensure that checkboxes have a known class name. If predicted one is not present, assign predicted one customly.
        if (pageElements.collections.friendCheckBoxes) {
            i = pageElements.collections.friendCheckBoxes.length;
            while (i--) {
                ensureElementHasClass(pageElements.collections.friendCheckBoxes[i], classNames.friendCheckBox);
            }
        }

        // // Add custom class name to each friend, to be able to manipulate it.
        // if (pageElements.collections.friends) {
            // i = pageElements.collections.friends.length;
            // while (i--) {
                // ensureElementHasClass(pageElements.collections.friends[i], classNames.friend);
            // }
        // }

        // Add friend enumeration.
        // This is done by observing invite dialog for new children, and adding enumeration at each insertion.
        if (pageElements.collections.friends) {
            addFriendEnumeration();
        }
    };
    observation.inviteDialogObserve.observer = new MutationObserver(observation.inviteDialogObserve.callback);
    observation.inviteDialogObserve.config = {
        childList : true,
        subtree : true
    };

    // Document-wide observer.
    // Function to watch for node insertion (to see if the invite dialog has appeared).
    observation.documentObserve.callback = function (mutations) {
        // Routines when invite dialog has been found.
        if (pageElements.sections.inviteDialog) {
            // Check if it still exists.
            // if (isInPage(pageElements.sections.inviteDialog)) {
            if (!pageElements.sections.inviteDialog.parentNode) {
                dbgLog('invite dialog does not exist anymore');

                // if invite dialog does not exist anymore, reset necessary variables.
                // make invite dialog undefined; it does not exist.
                dbgLog('resetting variables');
                resetObjectChildrenTo(pageElements.sections, undefined);
                resetObjectChildrenTo(pageElements.collections, []);

                // stop observing invite dialog children.
                ensureNotObserving(observation.inviteDialogObserve);
            }

            // Any way, if invite dialog exists, return, as there is no need to look for new ones.
            return;
        }

        // Try and find invite dialog.
        var inviteDialog;
        // If option is set, perform a global search at each document mutation.
        if (parseBoolean(getPersistentValue(persistentStorage.inviteDialogDeepSearch))) {
            inviteDialog = getInviteDialog();
        // Else, check if invite dialog was one of the mutations.
        } else {
            i = mutations.length;
            while (i-- && !inviteDialog) {
                j = mutations[i].addedNodes.length;
                while (j-- && !inviteDialog) {
                    // If current mutation has class name
                    if (mutations[i].addedNodes[j].className) {
                        // and matches one that of invite dialog
                        // thus, Loop classes of invite dialog.
                        k = classNames.inviteDialog.length;
                        while (k-- && !inviteDialog) {
                            if (mutations[i].addedNodes[j].className.indexOf(classNames.inviteDialog[k]) !== -1) {
                                // mark as the invite dialog.
                                inviteDialog = mutations[i].addedNodes[j];
                            }
                        }
                    // Else, if current mutation has an ID
                    } else if (mutations[i].addedNodes[j].id) {
                        // and matches that of invite dialog
                        // this, Loop ids of inviteDialog.
                        k = ids.inviteDialog.length;
                        while (k-- && !inviteDialog) {
                            if (mutations[i].addedNodes[j].id === ids.inviteDialog[k]) {
                                // mark as the invite dialog.
                                inviteDialog = mutations[i].addedNodes[j];
                            }
                        }
                    }
                }
            }
        }

        // If check has returned with results ...
        if (inviteDialog) {
            dbgLog('invite dialog was found');

            // ... initiate if hasn't already.
            // // Determine by checking if select section already exists.
            // if (!document.getElementById(ids.selectSection)) {
            if (!inviteDialog.getAttribute('manipulated')) {
                // // As result is a child of a Mutation Object, it may not be as reliable as a standard "Node" Object.
                // // Thus, get by document lookup.
                // // If result does not have an ID, set custom.
                // if (!inviteDialog.id) {
                    // inviteDialog.id = ids.inviteDialogCustom;
                // }
                // // Store the ID.
                // ids.inviteDialogCurrent = inviteDialog.id;

                // // Store invite dialog object globally.
                // pageElements.sections.inviteDialog = document.getElementById(ids.inviteDialogCurrent);

                // Store invite dialog object globally.
                pageElements.sections.inviteDialog = inviteDialog;

                // Prepare for manipulation.
                prepareForManipulation();

                // Manipulate.
                manipulate();
            }
        }
    };
    observation.documentObserve.observer = new MutationObserver(observation.documentObserve.callback);
    observation.documentObserve.config = {
        childList : true,
        subtree : true
    };

    // Initialize!
    // Initialize the watch.
    ensureObserving(observation.documentObserve, document.body);

    // Initialize visibility (active tab or not) handler.
    // https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API#Example
    if (document.hidden !== undefined) {
        pageVisibilityAPI.hidden = 'hidden';
        pageVisibilityAPI.visibilityChange = 'visibilitychange';
    } else if (document.mozHidden !== undefined) {
        pageVisibilityAPI.hidden = 'mozHidden';
        pageVisibilityAPI.visibilityChange = 'mozvisibilitychange';
    } else if (document.msHidden !== undefined) {
        pageVisibilityAPI.hidden = 'msHidden';
        pageVisibilityAPI.visibilityChange = 'msvisibilitychange';
    } else if (document.webkitHidden !== undefined) {
        pageVisibilityAPI.hidden = 'webkitHidden';
        pageVisibilityAPI.visibilityChange = 'webkitvisibilitychange';
    }
    if (pageVisibilityAPI.hidden && pageVisibilityAPI.visibilityChange) {
        document.addEventListener(pageVisibilityAPI.visibilityChange, handleVisibilityChange, false);
    }

}());
