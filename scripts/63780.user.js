// ==UserScript==
// @name            LinkedIn Template Messages
// @author          darkyndy
// @description     LinkedIn Send Message using Templates
// @include         http://www.linkedin.com/msgToConns*
// @include         http://www.linkedin.com/groupMsg*
// @include         http://www.linkedin.com/inbox/#compose*
// @include         http://www.linkedin.com/inbox/#msgToConns*
// @include         http://www.linkedin.com/inbox/#groupMsg*
// @include         http://www.linkedin.com/inbox/#action?mboxItemGID*
// @include         http://www.linkedin.com/inbox/?goto=compose*
// @include         http://www.linkedin.com/inbox/?goto=msgToConns*
// @include         http://www.linkedin.com/inbox/?goto=groupMsg*
// @include         http://www.linkedin.com/inbox/?goto=mboxItemGID*
// @grant           none
// @version         1.7.3
// @namespace       darkyndy.com/linkedintemplatemsg
// @downloadURL     http://userscripts.org/scripts/source/63780.user.js
// @updateURL       http://userscripts.org/scripts/source/63780.user.js
// ==/UserScript==

/**
 *    LinkedIn Send Message using Template
 *    Copyright (C) 2009-2013  darkyndy
 *
 *    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *    THE SOFTWARE.
 *
 *    Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 *    Developer contact: darkyndy@gmail.com
 */

/**
 * Change log (version 1.7.3)
 * (minor) include more compose pages where script will run
 */

(function () {
    var my,
        debugHelper;

    //methods used for debugging
    debugHelper = {
        /**
         * Array that will store debug data
         */
        data: [],
        /**
         * Alert message
         *  this should be called only if we encounter a blocker so the user will see a message
         * @param {Object|String|EventException} data
         */
        alert: function (data) {
            var msg = "[LinkedIn Template Messages] ";
            if (data.message) {
                msg += data.message;
                if (data.stack) {
                    msg += "\n" + data.stack;
                }
                alert(msg);
            } else {
                alert(msg + data);
            }
        },
        /**
         * Log message
         * @param {String} msg
         * @param {String} stackTrace
         */
        log: function (msg, stackTrace) {
            var item = {};
            msg = msg || "";
            stackTrace = stackTrace || "";
            item.time = (new Date()).getTime();
            item.msg = msg;
            item.trace = stackTrace;
            debugHelper.data.push(item);
        },
        /**
         * Log exception
         * @param {EventException} ex
         */
        logException: function (ex) {
            var stackTrace = '_cannot-be-retrieved_';
            if (ex.stack) {
                stackTrace = ex.stack;
            }
            debugHelper.log(ex.message, stackTrace);
        },
        /**
         * Get debug data as string
         * @returns {String}
         */
        getData: function () {
            return JSON.stringify(debugHelper.data);
        }
    };

    //closure
    my = {
        /**
         * String to store data for user that will sned the message
         */
        senderName: "",
        /**
         * Update data stored for the user that will send the message
         */
        updateSenderInfo: function () {
            var myInfoEl = document.getElementById("fromName-msgForm");
            if (myInfoEl !== null) {
                my.senderName = myInfoEl.value;
            } else {
                myInfoEl = document.querySelector(".act-set-name-split-link");
                if (myInfoEl !== null) {
                    my.senderName = myInfoEl.textContent.trim();
                } else {
                    debugHelper.log("[updateSenderInfo] ~ Cannot find sender info");
                }
            }
        },
        /**
         * Object to store data for user that will receive the message
         */
        receiverInfo: {},
        /**
         * Update data stored for the user that will receive the message
         */
        updateReceiverInfo: function () {
            var connectionInfoEl = document.querySelectorAll('#recipients-composeForm .ccCon'),
                connectionNameEl,
                connectionName,
                connectionNameArray,
                connectionInfoJson,
                connectionIndex;
            if (connectionInfoEl.length > 0) {
                connectionInfoEl = connectionInfoEl[0];
                my.receiverInfo.memberId = parseInt(connectionInfoEl.getAttribute("id"));
                connectionNameEl = document.getElementById(my.receiverInfo.memberId + "-name");
                if (connectionNameEl) {
                    connectionName = connectionNameEl.textContent.trim();
                    my.receiverInfo.fullName = connectionName;
                    connectionNameArray = connectionName.split(" ");
                    my.receiverInfo.lastName = connectionNameArray[connectionNameArray.length - 1];
                    my.receiverInfo.firstName = connectionName.replace(my.receiverInfo.lastName, "").trim();
                } else {
                    debugHelper.log("[updateReceiverInfo] ~ Cannot find connectionName element");
                }
            } else {
                //try old version
                connectionInfoEl = document.getElementById('connectionNames-msgForm');
                if (connectionInfoEl !== null) {
                    connectionInfoJson = JSON.parse(connectionInfoEl.getAttribute("value"));
                    if (typeof connectionInfoJson === "object") {
                        for (connectionIndex in connectionInfoJson) {
                            if (connectionInfoJson.hasOwnProperty(connectionIndex)) {
                                my.receiverInfo = connectionInfoJson[connectionIndex];
                                break;
                            }
                        }
                    } else {
                        debugHelper.log("[updateReceiverInfo] ~ connectionInfoJson is not an object");
                    }
                } else {
                    debugHelper.log("[updateReceiverInfo] ~ Cannot find connectionInfo element");
                }
            }
        },
        /**
         * Get style that is used by extension
         * @returns {String}
         */
        getStyle: function () {
            var scriptStyle,
                borderRadius;
            borderRadius = "-webkit-border-radius: 7px; -moz-border-radius: 7px; border-radius: 7px;";
            scriptStyle = "" +
                ".ltmContainer { width: 461px; border: 5px solid #3399CC;" + borderRadius + "background: #3399CC; color: #FFFFFF; font-weight:bold;}" +
                ".ltmContainerData { width: 461px; border: 0px; color: #FFFFFF;padding:2px 0px 5px 0px;font-weight:normal;}" +
                ".ltmHeader { font-weight: bold; background: #3399CC; color: #FFFFFF; padding: 0px 0px 0px 5px; float:left; }" +
                ".ltmSubject { width: 100px; }" +
                ".ltmMessage { width: 290px; }" +
                ".ltmOptions { width: 60px; }" +
                ".ltmOptions.ltmHeader { width: 55px; }" +
                ".ltmOptions .ltmButton { margin: 0; }" +
                ".ltmTemplateContainer, .ltmTemplateContainerNew { width: 465px; font-weight: normal; background: #EDF6FF; color: #000000; float:left; border: 3px solid #EDF6FF;" + borderRadius + "}" +
                ".ltmTemplateContainerExtend { background: #CAE5FF; border: 3px solid #CAE5FF;" + borderRadius + "}" +
                ".ltmTemplateData { float:left; padding: 0px 0px 2px 5px; overflow: hidden; text-overflow: ellipsis; }" +
                ".ltmTemplateData.ltmSubject, .ltmTemplateData.ltmMessage { cursor: pointer; }" +
                ".ltmLink { color: blue;cursor:pointer;text-decoration:none; }" +
                ".ltmLink:hover { color: blue;cursor:pointer;text-decoration:underline; }" +
                "#ltmJson { border: 1px #000000 solid; padding: 10px; margin:0px;width:498px;" + borderRadius + "}" +
                "#ltmScriptNewSubject {width:90px;border:1px solid #000000; background: #FFFFFF;}" +
                ".ltmScriptTextarea {width:280px;max-width:280px;height:145px;border:1px solid #000000; background: #FFFFFF;margin:0px;padding:0px;}" +
                ".ltmScriptDebugInfo {width:460px;max-width:460px;}" +
                ".ltmScriptSetActiveTemplateMsg {margin: 0 5px 0 0;}" +
                ".ltmButton { margin:0px 0px 0px 10px; }" +
                ".ltmSpacer{ line-height:0px; font-size:0px; float:left; width:1px; height:1px; } " +
                ".ltmClear{ clear:both; height:0px; margin:0px; padding:0px; border:0px; font-size:0px; line-height:0px; }" +
                ".ltmHide { display:none; }" +
                "";
            return scriptStyle;
        },
        /**
         * Insert style provided as string from parameter
         * @param {String} text
         */
        insertStyle: function (text) {
            var head = document.getElementsByTagName("head")[0],
                styleEl;
            if (!head) {
                debugHelper.log("[insertStyle] ~ Cannot find HEAD tag");
                return;
            }
            if (text) {
                styleEl = document.createElement("style");
                styleEl.setAttribute("type", "text/css");
                styleEl.textContent = text;
                head.appendChild(styleEl);
            }
        },
        /**
         * Function executed when "Reset templates" button is clicked
         *  If user confirms then we delete all stored templates
         * @param {MouseEvent} e
         */
        clickReset: function (e) {
            var confirmVal;
            confirmVal =  confirm("Are you sure you want to reset templates? If you press OK then you will lose all saved templates!");
            if (confirmVal === true) {
                my.resetTemplates(true);
            }
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when "Debug info" button is clicked
         *  If we have debug data open email client with message containing debug info
         * @param {MouseEvent} e
         */
        clickDebugInfo: function (e) {
            var debugData = debugHelper.getData(),
                debugDataToMail;
            if (debugData.length > 2) {
                //by default it has length of 2, if greater then send email
                if (my.el.debugInfoBlock.style.display === "block") {
                    //then hide
                    my.el.debugInfoBlock.style.display = "none";
                } else {
                    //show and update data
                    debugDataToMail = "mailto:darkyndy@gmail.com?subject=[LTM] Debug data&body=" + debugData;
                    my.el.debugInfoMail.setAttribute("href", debugDataToMail);
                    my.el.debugInfoData.value = debugData;
                    my.el.debugInfoBlock.style.display = "block";
                }
            } else {
                debugHelper.alert("[clickDebugInfo] ~ no data stored for debug");
            }
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when add button is clicked that will save new template
         * @param {MouseEvent} e
         */
        clickAddTemplate: function (e) {
            var newTemplate = {};

            if (my.el.newSubject === null || my.el.newMessage === null) {
                debugHelper.alert("[clickAddTemplate] ~ cannot find subject and/or message elements");
                return;
            }
            newTemplate.subject = my.el.newSubject.value;
            newTemplate.message = my.el.newMessage.value;
            newTemplate.active = my.el.newActive.checked;
            if (newTemplate.active && my.templates[my.templateActive]) {
                //old active template isn't any more
                my.templates[my.templateActive].active = false;
            }
            //clear values
            my.el.newSubject.value = "";
            my.el.newMessage.value = "";
            my.el.newActive.checked = false;

            my.templates.push(newTemplate);
            my.saveTemplates(true);
            e.stopPropagation();
        },
        /**
         * Function executed when you click on Display/Hide JSON
         * @param {MouseEvent} e
         */
        clickToggleDisplayJson: function (e) {
            var displayStyle = "none";
            if (my.jsonBtnVal === "Display JSON") {
                //display
                displayStyle = "block";
                my.jsonBtnVal = "Hide JSON";
            } else {
                //hide
                my.jsonBtnVal = "Display JSON";
            }
            my.el.jsonContainer.style.display = displayStyle;
            my.el.btnDisplayJson.value = my.jsonBtnVal;
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when you click on Display/Hide information
         * @param {MouseEvent} e
         */
        clickToggleDisplayInfo: function (e) {
            var displayStyle = "none";
            if (my.infoBtnVal === "Display information") {
                //display
                displayStyle = "block";
                my.infoBtnVal = "Hide information";
            } else {
                //hide
                my.infoBtnVal = "Display information";
            }
            my.el.infoContainer.style.display = displayStyle;
            my.el.btnDisplayInfo.value = my.infoBtnVal;
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when you click on subject or message to auto-complete
         * @param {MouseEvent} e
         */
        clickUseTemplate: function (e) {
            var templateId = this.parentNode.getAttribute("data-template-id");
            templateId = parseInt(templateId, 10);
            if (!isNaN(templateId) && templateId >= 0 && templateId < my.templates.length) {
                my.populateTemplateMsg(templateId);
            } else {
                debugHelper.log("[clickUseTemplate] ~ tried to send invalid templateId " + templateId);
            }
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when delete was clicked
         * @param {MouseEvent} e
         */
        clickDelTemplate: function (e) {
            var templateId = this.getAttribute("data-template-id"),
                confirmVal;
            if (my.templates.length < 2) {
                //if we have only one or no template then reset
                my.resetTemplates(true);
            } else {
                templateId = parseInt(templateId, 10);
                if (!isNaN(templateId) && templateId >= 0 && templateId < my.templates.length) {
                    confirmVal =  confirm("Are you sure you want to delete this template?");
                    if (confirmVal === true) {
                        my.templates.splice(templateId, 1);
                        if (templateId === my.templateActive) {
                            my.setFirstTemplateAsActive(true);
                        }
                        my.saveTemplates(true);
                    }
                } else {
                    debugHelper.log("[clickDelTemplate] ~ tried to delete templateId " + templateId);
                }
            }
            e.preventDefault();
            e.stopPropagation();
        },
        /**
         * Function executed when active radio button was checked
         * @param {MouseEvent} e
         */
        clickSetActiveTemplate: function (e) {
            var templateId = this.getAttribute("data-template-id");
            templateId = parseInt(templateId, 10);
            if (!isNaN(templateId) && templateId >= 0 && templateId < my.templates.length) {
                if (templateId !== my.templateActive) {
                    if (my.templateActive >=0 && my.templateActive < my.templates.length) {
                        my.templates[my.templateActive].active = false;
                    }
                    my.templates[templateId].active = true;
                    my.templateActive = templateId;
                    my.saveTemplates();
                }
            } else {
                debugHelper.log("[clickDelTemplate] ~ tried to delete templateId " + templateId);
            }
            e.stopPropagation();
        },
        /**
         * Elements
         */
        el: {},
        /**
         * Get subject element where template-subject will be set
         * @returns {HTMLElement}
         */
        getComposeSubjectEl: function () {
            var el;
            el = document.getElementById("subject-msgForm");
            if (el === null) {
                el = document.getElementById("subject-composeForm");
            }
            if (el === null) {
                my.populateWithTemplate = false;
                debugHelper.log("[getComposeSubjectEl] ~ Cannot get message-subject element");
            } else {
                my.populateWithTemplate = true;
            }
            return el;
        },
        /**
         * Get message element where template-message will be set
         * @returns {HTMLElement}
         */
        getComposeMessageEl: function () {
            var el;
            el = document.getElementById("body-msgForm");
            if (el === null) {
                el = document.getElementById("body-composeForm");
            }
            if (el === null) {
                my.populateWithTemplate = false;
                debugHelper.log("[getComposeMessageEl] ~ Cannot get message-body element");
            } else {
                my.populateWithTemplate = true;
            }
            return el;
        },
        /**
         * Cache elements that are used in multiple places
         */
        cacheDataGeneral: function () {
            //json info for templates
            my.jsonBtnVal = "Display JSON";
            my.el.btnDisplayJson = document.getElementById("ltmScriptBtnDisplayTemplateJson");
            my.el.jsonContainer = document.getElementById("ltmScriptJsonBlock");
            //script help
            my.infoBtnVal = "Display information";
            my.el.btnDisplayInfo = document.getElementById("ltmScriptBtnDisplayInfo");
            my.el.infoContainer = document.getElementById("ltmScriptInfoBlock");
            //container for templates in view
            my.el.templatesContainer = document.getElementById("ltmTemplatesContainer");
            //subject & message elements for new template form
            my.el.newSubject = document.getElementById("ltmScriptNewSubject");
            my.el.newMessage = document.getElementById("ltmScriptNewMessage");
            //new template active checkbox
            my.el.newActive = document.getElementById("ltmScriptNewActive");
            //debug info area
            my.el.debugInfoBlock = document.getElementById("ltmScriptDebugInfoBlock");
            my.el.debugInfoMail = document.getElementById("ltmScriptDebugInfoMail");
            my.el.debugInfoData = document.getElementById("ltmScriptDebugInfo");
        },
        /**
         * Attach events that are always needed for the page
         */
        delegateGeneral: function () {
            var resetEl,
                debugInfoEl,
                addTemplateEl;
            resetEl = document.getElementById("ltmScriptBtnResetTemplateMsg");
            if (resetEl) {
                resetEl.addEventListener("click", my.clickReset, true);
            } else {
                debugHelper.log("[delegateGeneral] ~ cannot find reset element");
            }
            debugInfoEl = document.getElementById("ltmScriptBtnDebugInfo");
            if (debugInfoEl) {
                debugInfoEl.addEventListener("click", my.clickDebugInfo, true);
            } else {
                debugHelper.alert("[delegateGeneral] ~ cannot find debug info element");
            }
            addTemplateEl = document.getElementById("ltmScriptAddTemplateMsg");
            if (addTemplateEl) {
                addTemplateEl.addEventListener("click", my.clickAddTemplate, true);
            } else {
                debugHelper.alert("[delegateGeneral] ~ cannot find add template element");
            }

            if (my.el.btnDisplayJson) {
                my.el.btnDisplayJson.addEventListener("click", my.clickToggleDisplayJson, true);
            } else {
                debugHelper.log("[delegateGeneral] ~ cannot find my.el.btnDisplayJson element");
            }

            if (my.el.btnDisplayInfo) {
                my.el.btnDisplayInfo.addEventListener("click", my.clickToggleDisplayInfo, true);
            } else {
                debugHelper.log("[delegateGeneral] ~ cannot find my.el.btnDisplayInfo element");
            }
        },
        /**
         * Attach events that are temporary needed
         */
        delegatePartial: function () {
            var templateEls = document.querySelectorAll("#ltmTemplatesContainer .ltmSubject, #ltmTemplatesContainer .ltmMessage"),
                templateElsLength = templateEls.length,
                templateDelEls = document.querySelectorAll("#ltmTemplatesContainer .ltmScriptDelTemplateMsg"),
                templateDelElsLength = templateDelEls.length,
                templateSetActiveEls = document.querySelectorAll("#ltmTemplatesContainer .ltmScriptSetActiveTemplateMsg"),
                templateSetActiveElsLength = templateSetActiveEls.length,
                i;
            for (i = 0; i < templateElsLength; i += 1) {
                templateEls[i].addEventListener("click", my.clickUseTemplate, true);
            }
            for (i = 0; i < templateDelElsLength; i += 1) {
                templateDelEls[i].addEventListener("click", my.clickDelTemplate, true);
            }
            for (i = 0; i < templateSetActiveElsLength; i += 1) {
                templateSetActiveEls[i].addEventListener("click", my.clickSetActiveTemplate, true);
            }
        },
        /**
         * Templates list
         */
        templates: [],
        /**
         * By default we consider that we have subject & message elements for compose form
         *  If this flag is false then template population will not work
         */
        populateWithTemplate: true,
        /**
         * Store active template id
         */
        templateActive: -1,
        /**
         * Save templates from local data to storage
         *      based on flag can update view
         * @param {Boolean} withViewUpdate
         */
        saveTemplates: function (withViewUpdate) {
            withViewUpdate = withViewUpdate || false;
            localStorage.ltm = JSON.stringify(my.templates);
            if (withViewUpdate) {
                my.updateViewTemplates();
            }
        },
        /**
         * Reset templates data
         *  Also update view if parameter is true
         * @param {Boolean} updateView
         */
        resetTemplates: function (updateView) {
            updateView = updateView || false;
            my.templateActive = -1;
            my.templates = [];
            my.updateTemplatesWithDefault();
            if (updateView) {
                my.updateViewTemplates();
            }
        },
        /**
         * Updated templates with default one
         */
        updateTemplatesWithDefault: function () {
            var defaultTemplate;
            if (my.templates.length === 0) {
                //only if we don't have templates then set default one
                defaultTemplate = {
                    "subject": "Hello",
                    "message": "Hi {connName}, \u000aI'd like to add you to my professional network on LinkedIn.\u000a\u000aBest regards, \u000a{myname}",
                    "active": true
                };
                my.templates.push(defaultTemplate);
                localStorage.ltm = JSON.stringify(my.templates);
            }
        },
        /**
         * Retrieve templates from storage and update local data
         */
        updateTemplates: function () {
            if (localStorage) {
                if (localStorage.ltm === undefined) {
                    my.updateTemplatesWithDefault();
                } else {
                    my.templates = JSON.parse(localStorage.ltm);
                    my.updateTemplatesWithDefault();
                }
            } else {
                debugHelper.alert("[updateTemplates] ~ cannot access localStorage");
            }
        },
        /**
         * Replace variables from templates with real values
         * @param {String} useString
         * @returns {String}
         */
        getMessageVarsToValue: function (useString) {
            useString = useString.replace(/{myname}/g, my.senderName);
            useString = useString.replace(/{connFirstName}/g, my.receiverInfo.firstName);
            useString = useString.replace(/{connLastName}/g, my.receiverInfo.lastName);
            useString = useString.replace(/{connName}/g, my.receiverInfo.firstName + " " + my.receiverInfo.lastName);
            return useString;
        },
        /**
         * Update view with new templates
         */
        updateViewTemplates: function () {
            my.el.templatesContainer.style.display = "none";
            my.el.templatesContainer.innerHTML = my.populateViewTemplates();
            my.delegatePartial();
            my.el.templatesContainer.style.display = "block";
        },
        /**
         * Set first template as active template
         *  Also update view if flag is true
         * @param {Boolean} updateView
         */
        setFirstTemplateAsActive: function (updateView) {
            var newActiveTemplateInputEl;
            updateView = updateView || false;
            my.templateActive = 0;
            my.templates[0].active = true;
            if (updateView) {
                newActiveTemplateInputEl = document.getElementById("ltmScriptSetActiveTemplateMsg0");
                if (newActiveTemplateInputEl) {
                    newActiveTemplateInputEl.setAttribute("checked", "checked");
                } else {
                    debugHelper.log("[clickDelTemplate] ~ cannot find input element for active template with id 0");
                }
            }
        },
        /**
         * Escape string to be displayed correctly in HTML
         * @param {String} str
         * @returns {String}
         */
        escapeStringForHtml: function (str) {
            str = str || "";
            str = str.replace(/\"/gm, "&quot;");
            return str;
        },
        /**
         * Populate subject & message based on template id
         * @param {String|Number} templateMsgId
         * @param {Boolean} checkMessagePresent
         */
        populateTemplateMsg: function (templateMsgId, checkMessagePresent) {
            var useTemplate,
                subjectCurrentValue,
                messageCurrentValue,
                continueWithPopulate = true,
                composeSubjectEl = my.getComposeSubjectEl(),
                composeMessageEl = my.getComposeMessageEl();
            checkMessagePresent = checkMessagePresent || false;
            if (my.populateWithTemplate) {
                useTemplate = my.templates[templateMsgId];
                if (useTemplate) {
                    if (checkMessagePresent) {
                        //overwrite check for message already present from localStorage
                        if (localStorage && localStorage.ltmCheckMessagePresent !== undefined &&
                            localStorage.ltmCheckMessagePresent === "false") {

                        } else {
                            subjectCurrentValue = composeSubjectEl.value.trim();
                            if (subjectCurrentValue.length > 0) {
                                continueWithPopulate = false;
                            } else {
                                messageCurrentValue = composeMessageEl.value.trim();
                                if (messageCurrentValue.length > 0) {
                                    continueWithPopulate = false;
                                }
                            }
                        }
                    }
                    if (continueWithPopulate) {
                        my.updateReceiverInfo();
                        composeSubjectEl.value = my.getMessageVarsToValue(useTemplate.subject);
                        composeMessageEl.value = my.getMessageVarsToValue(useTemplate.message);
                    } else {
                        debugHelper.log("[populateTemplateMsg] ~ subject or message field is already completed");
                    }
                } else {
                    debugHelper.log("[populateTemplateMsg] ~ template not found");
                }
            }
        },
        /**
         * Populate view with templates
         * @returns {String}
         */
        populateViewTemplates: function () {
            var i,
                templatesLength = my.templates.length,
                rowClass,
                templateMsgRow,
                isActiveHtml,
                templateRowHtml = '',
                templatesHtml = '';
            my.templateActive = -1;
            for (i = 0; i < templatesLength; i += 1) {
                rowClass = '';
                if (i % 2 === 1) {
                    rowClass = ' ltmTemplateContainerExtend';
                }
                templateMsgRow = my.templates[i];
                isActiveHtml = '';
                if (templateMsgRow.active === true && my.templateActive < 0) {
                    my.templateActive = i;
                    isActiveHtml = 'checked="checked"';
                }
                templateRowHtml = '' +
                    '<div class="ltmTemplateContainer' + rowClass + '" data-template-id="' + i + '">' +
                        '<div class="ltmTemplateData ltmSubject" title="' + my.escapeStringForHtml(templateMsgRow.subject) + '">' + templateMsgRow.subject + '</div>' +
                        '<div class="ltmTemplateData ltmMessage" title="' + my.escapeStringForHtml(templateMsgRow.message) + '">' + templateMsgRow.message + '</div>' +
                        '<div class="ltmTemplateData ltmOptions">' +
                            '<input id="ltmScriptSetActiveTemplateMsg' + i + '" class="ltmScriptSetActiveTemplateMsg" data-template-id="' + i + '" type="radio" name="ltmScriptSetActiveTemplateMsg" ' + isActiveHtml + '/>' +
                            '<input type="button" class="btn-primary ltmButton ltmScriptDelTemplateMsg" data-template-id="' + i + '" value="del" title="Delete this template" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="ltmClear"></div>' +
                    '<div class="ltmSpacer" style="height:2px;"></div>' +
                    '<div class="ltmClear"></div>';
                templatesHtml += templateRowHtml;
            }
            return templatesHtml;
        },
        /**
         * Populate view with entire HTML structure
         */
        populateView: function () {
            var html,
                htmlSpacer10,
                mainContainerEl,
                appendToEl;
            appendToEl = document.getElementById("content-outer");
            if (!appendToEl) {
                //maybe is old interface
                appendToEl = document.querySelector("#content form");
            }
            if (appendToEl) {
                htmlSpacer10 = '<div class="ltmClear"></div>' +
                    '<div class="spacer" style="height:10px;"></div>' +
                    '<div class="ltmClear"></div>';
                html = '' +
                    '<div class="ltmContainer">' +
                        '<div class="ltmHeader ltmSubject">Subject</div>' +
                        '<div class="ltmHeader ltmMessage">Message</div>' +
                        '<div class="ltmHeader ltmOptions">Options</div>' +
                        '<div class="ltmClear"></div>' +
                    '</div>' +
                    '<div id="ltmTemplatesContainer">' +
                    my.populateViewTemplates() +
                    '</div>' +
                    htmlSpacer10 +
                    '<div class="ltmContainer">' + //start add new template
                        '<div class="ltmHeader ltmSubject">new Subject</div>' +
                        '<div class="ltmHeader ltmMessage">Message</div>' +
                        '<div class="ltmHeader ltmOptions">Default</div>' +
                        '<div class="ltmClear"></div>' +
                    '</div>' +
                    '<div class="ltmClear"></div>' +
                    '<div class="ltmTemplateContainerNew">' +
                        '<div class="ltmTemplateData ltmSubject">' +
                            '<input id="ltmScriptNewSubject" type="text"/>' +
                        '</div>' +
                        '<div class="ltmTemplateData ltmMessage">' +
                            '<textarea id="ltmScriptNewMessage" class="ltmScriptTextarea"></textarea>' +
                        '</div>' +
                        '<div class="ltmTemplateData ltmOptions">' +
                            '<input class="ltmScriptSetActiveTemplateMsg" type="checkbox" id="ltmScriptNewActive"/>' +
                            '<input type="button" class="btn-primary ltmButton" id="ltmScriptAddTemplateMsg" value="add" title="Add new template" />' +
                        '</div>' +
                    '</div>' +
                    htmlSpacer10 +
                    '<div class="ltmContainer">' +
                        '<input id="ltmScriptBtnDebugInfo" type="button" value="Debug info" class="btn-primary ltmButton" title="Get debug data"/>' +
                        '<input id="ltmScriptBtnResetTemplateMsg" type="button" value="Reset templates" class="btn-primary ltmButton" title="Reset"/>' +
                        '<input id="ltmScriptBtnDisplayInfo" type="button" value="Display information" class="btn-primary ltmButton" title="Help"/>' +
                        '<input id="ltmScriptBtnSaveTemplateMsg" type="button" value="Save" class="btn-primary ltmButton ltmHide"/>' +
                        '<input id="ltmScriptBtnDisplayTemplateJson" type="button" value="Display JSON" class="btn-primary ltmButton ltmHide"/>' +
                    '</div>' +
                    htmlSpacer10 +
                    '<div class="ltmContainer ltmHide" id="ltmScriptDebugInfoBlock">' +
                        'Please send an email to <a id="ltmScriptDebugInfoMail" target="_blank" href="mailto:darkyndy@gmail.com">darkyndy@gmail.com</a> and in body add:<br/><br/>' +
                        '<textarea class="ltmScriptTextarea ltmScriptDebugInfo" id="ltmScriptDebugInfo"></textarea>' +
                    '</div>' +
                    htmlSpacer10 +
                    '<div class="ltmContainer ltmHide" id="ltmScriptJsonBlock">' +
                        '<textarea class="ltmScriptTextarea" id="ltmJson"></textarea>' +
                    '</div>' +
                    htmlSpacer10 +
                    '<div class="ltmContainer ltmHide" id="ltmScriptInfoBlock">' +
                        '<span>Information</span>' +
                        '<div class="ltmClear"></div>' +
                        '<div class="ltmContainerData">' +
                            'In the content of the message you can use:<br/>' +
                            '{myname} that will be automatically replaced with your name (' + my.senderName + ')<br/>' +
                            '{connFirstName} that will be automatically replaced with connection first name (' + my.receiverInfo.firstName + ')<br/>' +
                            '{connLastName} that will be automatically replaced with connection last name (' + my.receiverInfo.lastName + ')<br/>' +
                            '{connName} that will be automatically replaced with connection name (' + my.receiverInfo.firstName + ' ' + my.receiverInfo.lastName + ')<br/>' +
                        '</div>' +
                        '<div class="ltmClear"></div>' +
                    '</div>' +
                    htmlSpacer10;
                //create element that will contain generated HTML
                mainContainerEl = document.createElement("div");
                mainContainerEl.setAttribute("id", "ltmMainContainer");
                mainContainerEl.setAttribute("class", "ltmMainContainer");
                mainContainerEl.innerHTML = html;
                appendToEl.appendChild(mainContainerEl);

                my.cacheDataGeneral();
                my.delegateGeneral();
                my.delegatePartial();
            } else {
                debugHelper.alert("[populateView] ~ cannot find element where to append");
            }
        },
        /**
         * Initialize script
         */
        init: function () {
            try {
                //insert styling
                my.insertStyle(my.getStyle());
                //retrieve logged user info, name
                my.updateSenderInfo();
                //retrieve receiver info
                my.updateReceiverInfo();
                //update templates that can be used
                my.updateTemplates();
                //populate view
                my.populateView();
                //populate subject & message with default template
                my.populateTemplateMsg(my.templateActive, true);
            } catch (e) {
                debugHelper.alert(e);
            }
        }
    };
    //initialize
    my.init();
}());