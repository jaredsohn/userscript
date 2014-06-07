// ==UserScript==
// @name        Verbessertes DaWanda Postfach
// @description Dieses Script verbessert das Postfach auf www.dawanda.de. Nachrichten können nach Benutzer oder nach Betreff gruppiert werden und es kann nach Nachrichten gesucht werden.
// @namespace   Jk
// @match https://de.dawanda.com/message/inbox*
// @match http://de.dawanda.com/message/inbox*
// @version     8
// @date           2012-06-08
// @creator        Jan Krause
// @downloadURL    https://userscripts.org/scripts/source/135709.user.js
// @updateURL      https://userscripts.org/scripts/source/135709.meta.js

// @run-at document-end
// ==/UserScript==

(function () {

    // a function that loads myJ and calls a callback function when myJ has finished loading
    function addJQuery(callback) {

        var script = document.createElement("script");
        script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
        document.body.appendChild(script);

        var cssLink = document.createElement("link");
        cssLink.setAttribute("rel", "stylesheet");
        cssLink.setAttribute("type", "text/css");
        cssLink.setAttribute("href", " https://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/ui-lightness/jquery-ui.css");
        document.head.appendChild(cssLink);

        script = document.createElement("script");
        script.setAttribute("src", " https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    // the guts of this userscript
    function main() {

        var version = 8;
        var loggedInUserName;

        function _isInteger(val) {
            var digits = "1234567890";
            for (var i = 0; i < val.length; i++) {
                if (digits.indexOf(val.charAt(i)) == -1) { return false; }
            }
            return true;
        }
        function _getInt(str, i, minlength, maxlength) {
            for (var x = maxlength; x >= minlength; x--) {
                var token = str.substring(i, i + x);
                if (token.length < minlength) {
                    return null;
                }
                if (_isInteger(token)) {
                    return token;
                }
            }
            return null;
        }

        function getDateFromFormat(val, format) {
            val = val + "";
            format = format + "";
            var i_val = 0;
            var i_format = 0;
            var c = "";
            var token = "";
            var token2 = "";
            var x, y;
            var now = new Date();
            var year = now.getYear();
            var month = now.getMonth() + 1;
            var date = 1;
            var hh = now.getHours();
            var mm = now.getMinutes();
            var ss = now.getSeconds();
            var ampm = "";

            while (i_format < format.length) {
                // Get next token from format string
                c = format.charAt(i_format);
                token = "";
                while ((format.charAt(i_format) == c) && (i_format < format.length)) {
                    token += format.charAt(i_format++);
                }
                // Extract contents of value based on format token
                if (token == "yyyy" || token == "yy" || token == "y") {
                    if (token == "yyyy") { x = 4; y = 4; }
                    if (token == "yy") { x = 2; y = 2; }
                    if (token == "y") { x = 2; y = 4; }
                    year = _getInt(val, i_val, x, y);
                    if (year == null) { return 0; }
                    i_val += year.length;
                    if (year.length == 2) {
                        if (year > 70) { year = 1900 + (year - 0); }
                        else { year = 2000 + (year - 0); }
                    }
                }
                else if (token == "MMM" || token == "NNN") {
                    month = 0;
                    for (var i = 0; i < MONTH_NAMES.length; i++) {
                        var month_name = MONTH_NAMES[i];
                        if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                            if (token == "MMM" || (token == "NNN" && i > 11)) {
                                month = i + 1;
                                if (month > 12) { month -= 12; }
                                i_val += month_name.length;
                                break;
                            }
                        }
                    }
                    if ((month < 1) || (month > 12)) { return 0; }
                }
                else if (token == "EE" || token == "E") {
                    for (var i = 0; i < DAY_NAMES.length; i++) {
                        var day_name = DAY_NAMES[i];
                        if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                            i_val += day_name.length;
                            break;
                        }
                    }
                }
                else if (token == "MM" || token == "M") {
                    month = _getInt(val, i_val, token.length, 2);
                    if (month == null || (month < 1) || (month > 12)) { return 0; }
                    i_val += month.length;
                }
                else if (token == "dd" || token == "d") {
                    date = _getInt(val, i_val, token.length, 2);
                    if (date == null || (date < 1) || (date > 31)) { return 0; }
                    i_val += date.length;
                }
                else if (token == "hh" || token == "h") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 12)) { return 0; }
                    i_val += hh.length;
                }
                else if (token == "HH" || token == "H") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 23)) { return 0; }
                    i_val += hh.length;
                }
                else if (token == "KK" || token == "K") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 11)) { return 0; }
                    i_val += hh.length;
                }
                else if (token == "kk" || token == "k") {
                    hh = _getInt(val, i_val, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 24)) { return 0; }
                    i_val += hh.length; hh--;
                }
                else if (token == "mm" || token == "m") {
                    mm = _getInt(val, i_val, token.length, 2);
                    if (mm == null || (mm < 0) || (mm > 59)) { return 0; }
                    i_val += mm.length;
                }
                else if (token == "ss" || token == "s") {
                    ss = _getInt(val, i_val, token.length, 2);
                    if (ss == null || (ss < 0) || (ss > 59)) { return 0; }
                    i_val += ss.length;
                }
                else if (token == "a") {
                    if (val.substring(i_val, i_val + 2).toLowerCase() == "am") { ampm = "AM"; }
                    else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") { ampm = "PM"; }
                    else { return 0; }
                    i_val += 2;
                }
                else {
                    if (val.substring(i_val, i_val + token.length) != token) { return 0; }
                    else { i_val += token.length; }
                }
            }
            // If there are any trailing characters left in the value, it doesn't match
            if (i_val != val.length) { return 0; }
            // Is date valid for month?
            if (month == 2) {
                // Check for leap year
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { // leap year
                    if (date > 29) { return 0; }
                }
                else { if (date > 28) { return 0; } }
            }
            if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                if (date > 30) { return 0; }
            }
            // Correct hours value
            if (hh < 12 && ampm == "PM") { hh = hh - 0 + 12; }
            else if (hh > 11 && ampm == "AM") { hh -= 12; }
            var newdate = new Date(year, month - 1, date, hh, mm, ss);
            return newdate.getTime();
        }

        function supports_html5_storage() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }

        function saveMail(msgId, folder, userName, subject, body, date) {

            var msg = {
                id: msgId.trim(),
                folder: folder.trim(),
                userName: userName.trim(),
                subject: subject.trim(),
                body: body.trim(),
                date: date.trim(),
                dateVal: getDateFromFormat(date.trim(), 'dd.MM.yyyy HH:mm')
            };

            saveMsg(msg);
        }

        // fetches a mail from dawanda
        function fetchMail(msgId, date, folder) {
            myJ.ajax('/message/load_message/' + msgId, {
                type: 'POST',
                success: function (data) {
                    console.log("received msg " + msgId);
                    var msg = myJ(data);
                    var userNameLink = msg.find("a[href^='http://de.dawanda.com/user/']");
                    var userName = userNameLink.text();
                    var subject = userNameLink.next().next().next().text();
                    var msgBody = myJ("<div>").append(userNameLink.parent().find("p")).html();
                    console.log("saving msg %i", msgId);
                    saveMail(msgId, folder, userName, subject, msgBody, date);
                    console.log("Fetched msg %i from %s with subject %s", msgId, userName, subject);
                }
            });
        }

        // displays a log msg to the user
        function showMsg(msg) {
            myJ("#divMsg").html(msg);
        }

        // displays a mail
        function showMessage(msgId) {
            clearMsgContentDiv();
            var msg = loadMsgById(msgId);
            appendMessageToContentDiv(msg, false);
        }

        function appendMessageToContentDiv(msg, showShortHeader) {
            var div = myJ("#divMsgContent");
            var str = "<div data-msgid='" + msg.id + "' style='border: 1px solid #ddd; padding: 5px; margin: 2px;'>";
            // Show Header
            if (showShortHeader) {
                str += "<b>Datum:</b> " + msg.date + " <b>Ordner:</b> " + msg.folder + " <b>Betreff:</b> " + msg.subject + "<br/>";
            }
            else {
                str += "<div><b>Name:</b> " + msg.userName + "</div>";
                str += "<div><b>Datum:</b> " + msg.date + "</div>";
                str += "<div><b>Betreff:</b> " + msg.subject + "</div>";
                str += "<div><b>Ordner:</b> " + msg.folder + "</div>";
            }
            // Show Tags
            //if (msg.tags != null) {
            str += "<div class='msgTags'><b>Tags:</b> ";
            str += renderMsgTags(msg.tags);
            str += "</div>";
            //}
            // Add Tag Button
            str += "<div style='margin-top: 5px;'><button class='btnAddTag' data-msgid='" + msg.id + "'>Neues Tag</button></div>";
            // Show Body
            str += msg.body + "</div>";
            div.append(str);

            // Add Tag Handlers
            myJ("span.msgTagClose").live("click", function (e) {
                var tag = myJ(this).data("tag");
                console.log("remove tag " + tag + " from msg " + msg.id);
                // Tag aus Nachricht entfernen
                myJ(this).parent().remove();

                var idx = msg.tags.indexOf(tag); // Find the index
                if (idx != -1) msg.tags.splice(idx, 1);
                saveMsg(msg);
            });

            myJ(".btnAddTag", div).click(function (e) {
                e.preventDefault();
                var msgId = myJ(this).data("msgid");
                myJ("#dlgAddTag")
                    .empty()
                    .append("<div><h2>Neues Tag hinzufügen</h2>" +
                            "<input id='txtNewTag' type='text' /><button id='btnSaveNewTag'>Speichern</button><br/>" +
                            "" +
                            "</div>")
                    .dialog();

                myJ("#btnSaveNewTag").click(function (e) {
                    e.preventDefault();
                    myJ("#dlgAddTag").dialog("close");
                    if (msg.tags == null) {
                        msg.tags = [];
                    }
                    msg.tags.push(myJ("#txtNewTag").val());
                    saveMsg(msg);
                    renderMsgList();
                    // Taglist in der Nachricht refreshen
                    myJ(".msgTags", myJ("div[data-msgid='" + msg.id + "']")).empty().html("<b>Tags:</b> " + renderMsgTags(msg.tags));
                });

            });
        }

        function loadMsgById(msgId) {
            var msg = JSON.parse(localStorage["dawanda.msg." + loggedInUserName + "." + msgId]);
            if (msg.tags != null) {
                msg.tags = JSON.parse(msg.tags);
            }
            return msg;
        }

        function saveMsg(msg) {
            localStorage["dawanda.msg." + loggedInUserName + "." + msg.id] = JSON.stringify(msg);
        }

        function hasMessage(msgId) {
            return localStorage["dawanda.msg." + loggedInUserName + "." + msgId] != null;
        }

        function setMsgProp(msgId, propName, propVal) {
            var msg = loadMsgById(msgId);
            msg[propName] = propVal;
            saveMsg(msg);
        }

        function clearMsgContentDiv() {
            var div = myJ("#divMsgContent");
            div.empty();
        }

        // display all mails from and to the given user
        function showMessagesByUserName(userName) {
            var res = filterAllMessages(function (msg) {
                return msg.userName.toLowerCase() == userName.toLowerCase();
            });

            clearMsgContentDiv();
            myJ.each(res, function (idx, msg) {
                appendMessageToContentDiv(msg, true);
            });
        }

        function renderMsgList() {
            var res = searchMsg(myJ("#txtSearchMsg").val());
            console.log("Found %i matches", res.length);
            showMsg(res.length + " Treffer");
            divMsgList.empty();

            if (view == 'AllMessages') {
                renderMsgListAllMessages(res);
            }
            else if (view == 'GroupByUser') {
                renderMsgListGroupByUser(res);
            }
        }

        function renderMsgListAllMessages(res) {
            res = res.sort(function (a, b) { return (a.dateVal < b.dateVal) ? 1 : ((b.dateVal < a.dateVal) ? -1 : 0); });
            var str = "<table width='95%' class='messagebox' cellpadding='2'><thead><tr><th>Ordner</th><th>Betreff</th><th>Datum</th><th>Name</th><th>Tags</th></tr></thead><tbody>";
            myJ.each(res, function (idx, el) {
                str = str + "<tr style='cursor: pointer;' " + (idx % 2 == 0 ? " class='highlight'" : "") +
                        " id='msg" + el.id + "'><td>" +
                        el.folder + "</td><td>" +
                        el.subject + "</td><td>" +
                        el.date + "</td><td>" +
                        el.userName + "</td><td>";

                str += renderMsgTags(el.tags);

                str += "</td></tr>";
            });
            str = str + "</tbody></table>";
            divMsgList.append(str);

            // click handler an jeder zeile definieren
            myJ.each(res, function (idx, el) {
                myJ("#msg" + el.id).click(function () {
                    showMessage(el.id);
                });
            });
        }

        function renderMsgTags(tags) {
            str = "";
            if (tags != null) {
                myJ.each(tags, function (idx, tag) {
                    str += "<span class='msgTag' style='background-color: #FFEA8C; padding: 3px; margin: 2px;border-radius: 5px; display: inline-block;'>" + tag +
                    " <span class='msgTagClose' data-tag='" + tag + "' style='cursor: pointer; font-size: 0.9em; font-weight: bold;'>x</span></span> ";
                });
            }
            return str;
        }

        function renderMsgListGroupByUser(res) {
            res = res.sort(function (a, b) {
                return (a.userName.toLowerCase() > b.userName.toLowerCase())
                        ? 1
                        : ((b.userName.toLowerCase() > a.userName.toLowerCase())
                            ? -1
                            : (a.dateVal < b.dateVal) ? 1 : ((b.dateVal < a.dateVal) ? -1 : 0));
            });

            var str = "<table width='95%' class='messagebox' cellpadding='2'><thead><tr><th>Name</th><th>Anzahl Nachrichten</th></tr></thead><tbody>";
            if (res.length > 0) {
                var currentUser = res[0].userName;
                var numMsg = 0;
                var users = [];
                myJ.each(res, function (idx, el) {
                    numMsg++;
                    if (el.userName != currentUser) {
                        str = str + "<tr style='cursor: pointer;' id='user" + currentUser + "'><td>" + currentUser + "</td><td>" + numMsg + "</td></tr>";
                        numMsg = 0;
                        users.push(currentUser);
                        currentUser = el.userName;
                    }
                });
                users.push(currentUser);
                str = str + "<tr id='user" + currentUser + "'><td>" + currentUser + "</td><td>" + numMsg + "</td></tr>";
                str = str + "</tbody></table>";
                divMsgList.append(str);

                // click handler an jeder zeile definieren
                myJ.each(res, function (idx, el) {
                    myJ("#user" + el.userName).click(function () {
                        showMessagesByUserName(el.userName);
                    });
                });
            }
        }

        function filterAllMessages(filter) {
            var result = [];
            for (var i = 0, len = localStorage.length; i < len; i++) {
                key = localStorage.key(i);
                if ((/^dawanda\.msg\..+\.\d+$/).test(key)) {
                    // auf aktuellen user testen
                    if (key.indexOf(loggedInUserName) != -1) {
                        var msg = loadMsgById(key.replace('dawanda.msg.' + loggedInUserName + '.', ''));
                        if (filter(msg)) {
                            result.push(msg);
                        }
                    }
                }
            }
            return result;
        }

        function searchMsg(search) {
            var result = [];
            //var regexp = new RegExp("/" + search + "/gi");
            search = search.toLowerCase();

            return filterAllMessages(function (msg) {
                return (msg.body.toLowerCase().indexOf(search) != -1
                        || msg.subject.toLowerCase().indexOf(search) != -1
                        || msg.userName.toLowerCase().indexOf(search) != -1
                        || (msg.tags != null && msg.tags.join(" ").toLowerCase().indexOf(search) != -1));
            });
        }

        function loadNewMessages() {
            var numMsg = loadMessages("/message/inbox", 1, "inbox");
            numMsg += loadMessages("/message/outbox", 1, "outbox");
            showMsg(numMsg + " neue Nachrichten wurden eingelesen");
        }

        function loadMessages(url, page, folder) {

            var numMsg = 0;
            var hasLoadPageAlready = false;
            console.log("loading messages from " + url);

            showMsg("Lade " + folder + " Seite " + page);
            myJ.ajax(url + "?per_page=100&page=" + page, { async: false, success: function (data) {
                var doc = myJ(data);
                myJ("tr[id^='message_']", doc).each(function (idx, el) {
                    var msgId = myJ(this).attr("id").split('_')[1];
                    var date = myJ("td:nth-child(4)", myJ(this)).text();

                    if (!hasMessage(msgId)) {
                        console.log("Msg %i is not in local store...", msgId);
                        numMsg++;
                        fetchMail(msgId, date, folder);
                    }
                    else {
                        hasLoadPageAlready = true;
                        console.log("Msg %i is already in local store", msgId);
                    }
                });
                if (myJ(".pagination>a.next_page", doc).length > 0 && !hasLoadPageAlready) {
                    loadMessages(url, page + 1, folder);
                }
            }
            });
            console.log("messages loaded");
            return numMsg;
        }

        function switchToNewInbox() {
            myJ("#divMsgMain").next().hide();
            myJ("#divMsgMain").next().next().hide();
            myJ("#divMsgSetup").hide();
            myJ("#divMsgMain").show();
            myJ("#btnSwitch").text("Zum original DaWanda Postfach wechseln").addClass("new").removeClass("old");
            localStorage["dawanda.msg.view"] = "new";
        }

        function switchToOldInbox() {
            myJ("#divMsgMain").next().show();
            myJ("#divMsgMain").next().next().show();
            myJ("#divMsgMain").hide();
            myJ("#divMsgSetup").hide();
            myJ("#btnSwitch").text("Zur neuen Postfach Ansicht wechseln").addClass("old").removeClass("new");
            localStorage["dawanda.msg.view"] = "old";
        }

        function switchToSetup() {
            myJ("#divMsgMain").hide();
            myJ("#divMsgMain").next().hide();
            myJ("#divMsgMain").next().next().hide();
            myJ("#btnSwitch").text("Zum original DaWanda Postfach wechseln").addClass("new").removeClass("old");
            myJ("#divMsgSetup").show();
        }

        var view = 'AllMessages';

        try {
            window.onerror = function (message, url, lineNumber) {
                console.log("MyErrorFunc: " + message);
            };

            var myJ = jQuery.noConflict();

            loggedInUserName = myJ(".greet_user").text();
            console.log("loggedInUser: " + loggedInUserName);

            if (!supports_html5_storage) {
                alert('Leider kein HTML5 Storage');
            }
            else {
                myJ(".main").prepend("<button id='btnSwitch' class='new'>Zum original DaWanda Postfach wechseln</button><br />" +
                                     "<div id='divMsg' style='padding: 5px 0px 5px 0px; font-weight: bold;'></div>" +
                                     "<div id='divMsgSetup' style='display: none; margin-bottom: 10px; border: 10px solid #6a6; padding: 5px; font-size: 1.2em!important;'>" +
                                     "<h2>Willkommen zu einer etwas überarbeiteten Ansicht des DaWanda Postfaches.</h2><br />" +
                                     "Die Nutzung ist ganz einfach: Klicke auf den Button unten und alle deine Nachrichten werden in einen lokalen Speicher " +
                                     "in deinem Browser geladen. Danach kannst du zwischen verschiedenen Darstellungen der Nachrichten wählen, sowie alle Nachrichten einfach " +
                                     "durchsuchen, indem du etwas in das Textfeld eingibst. Es wird sowohl nach Inhalt, Betreff und Name gesucht.<br/>" +
                                     "Willst du also z.B. schnell alle Nachrichten eines Benutzers sehen, gib einfach seinen Namen in das Suchfeld ein.<br />" +
                                     "Neue Nachrichten werden einmal pro Minute von DaWanda geladen.<br/>" +
                                     "Da es im Moment (noch) nicht möglich ist, auf Nachrichten zu antworten, kannst du über einen großen Button auf der Seite zwischen dem " +
                                     "originalen und dem modifizierten Postfach jederzeit umschalten.<br /><br />" +
                                     "<b>Wichtig:</b> Dieses Skript ist nicht von DaWanda sondern von einem DaWanda Benutzer programmiert worden. Wende dich nicht an DaWanda, falls etwas " +
                                     "nicht so funktioniert wie erwartet, sondern deaktiere das Skript und/oder melde Fehler/Wünsche über die Scripthomepage: <a href='http://userscripts.org/scripts/show/135709' target='blank'>http://userscripts.org/scripts/show/135709</a>.<br>" +
                                     "Die Benutzung erfolgt auf eigene Gefahr.<br /> <br />" +
                                     "<button id='btnSetup'>Ja, ich möchte zur modifizierten Ansicht des Postfachs wechseln</button>" +
                                     "</div>" +
                                     "<div id='divMsgMain' style='display: none; margin-bottom: 10px; border: 5px solid #ccc; padding: 2px;'>" +
                                     "<!--<button id='btnLoadMsg'>Alle Nachrichten einlesen</button> -->" +
                                     "<button id='btnClearMsg' title='test'>Lokalen Speicher komplett löschen (Alles von vorne)</button>" +
                                     "<div style='color: #a00'>Beachte: Diese Modifikation stammt nicht von DaWanda. Probleme und Wünsche bitte <a href='http://userscripts.org/scripts/show/135709' target='blank'>hier</a> diskutieren! V" + version + "</div>" +
                                     "  <div style='margin-top: 10px;'>Suche <input type='text' id='txtSearchMsg' />" +
                                     "  Ansicht <select id='selView'>" +
                                     "    <option value='AllMessages'>Alle Nachrichten</option>" +
                                     "    <option value='GroupByUser'>Gruppiert nach Benutzer</option>" +
                                     "  </select></div>" +
                                     "<div id='divMsgList' style='margin: 10px 0px 0px 10px; max-height: 500px; overflow-y: scroll;'></div>" +
                                     "<div id='divMsgContent' style='border: 1px solid black; padding: 10px;'></div>" +
                                     "</div>" +
                                     "<div id='dlgAddTag'></div>");

                var divMsgList = myJ("#divMsgList");
                var divMsgContent = myJ("#divMsgContent");

                myJ("#btnSetup").click(function (e) {
                    e.preventDefault();
                    myJ("#divMsgSetup").empty();
                    myJ("#divMsgSetup").html("Es werden jetzt alle Nachrichten aus dem DaWanda Postfach in einen Speicher in deinem Browser übertragen. " +
                                            "Das kann bei großen Postfächern eine Weile dauern.<br/> Der aktuelle Fortschritt wird oben angezeigt.<br/>" +
                                            "Danach wirst du automatisch zu der neuen Ansicht weitergeleitet.");
                    loadNewMessages();
                    switchToNewInbox();
                    renderMsgList();
                });

                myJ("#btnSwitch").click(function (e) {
                    e.preventDefault();
                    if (myJ("#btnSwitch").hasClass("new")) {
                        var removeView = false;
                        if (localStorage["dawanda.msg.view"] == null) {
                            removeView = true;
                        }
                        switchToOldInbox();
                        if (removeView) {
                            localStorage.removeItem("dawanda.msg.view");
                        }
                    } else {
                        if (localStorage["dawanda.msg.view"] == null) {
                            switchToSetup();
                        } else {
                            switchToNewInbox();
                        }
                    }
                });

                myJ("#selView").change(function (e) {
                    view = myJ(this).val();
                    renderMsgList();
                });

                myJ("#btnClearMsg").click(function (e) {
                    e.preventDefault();
                    localStorage.clear();
                    showMsg("Alle Nachrichten wurden aus dem lokalen Cache gelöscht. Bitte die Seite aktualisieren");
                    renderMsgList();
                });

                myJ("#btnLoadMsg").click(function (e) {
                    e.preventDefault();
                    myJ("#btnLoadMsg").attr("disabled", "disabled");
                    loadNewMessages();
                    myJ("#btnLoadMsg").removeAttr("disabled");
                    myJ("#txtSearchMsg").val('');
                    renderMsgList();
                });

                myJ("#txtSearchMsg").keypress(function (e) {
                    renderMsgList();
                });

                renderMsgList();

                if (localStorage["dawanda.msg.view"] == null) {
                    // Setup
                    switchToSetup();
                }
                else {
                    if (localStorage["dawanda.msg.view"] == "old") {
                        switchToOldInbox();
                    }
                    else {
                        switchToNewInbox();
                    }
                    setInterval(loadNewMessages, 1000 * 60 * 5);
                    loadNewMessages();
                }

            }
        }
        catch (e) {
            alert(e);
        }
    }

    // load JQuery and execute the main function
    addJQuery(main);
    //main();

})();