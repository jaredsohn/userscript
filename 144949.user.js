// ==UserScript==
// @name	        ABX
// @version         0.8.1.5
// @description	    Add's various features to animes-bg's forum page.
// @include	        http://forum.animes-bg.com/*
// @license         MIT; http://en.wikipedia.org/wiki/Mit_license
// @copyright       Daniel Kolev <mooner4u@gmail.com>
// @update          http://userscripts.org/scripts/source/144949.user.js
// @download        http://userscripts.org/scripts/source/144949.user.js
// ==/UserScript==

(function () {
    var spam_id = 68798;
    var searchstring1 = "http://forum.animes-bg.com/search.php?keywords=&terms=all&author=";
    var searchstring2 = "&sc=1&sf=all&sk=t&sd=d&sr=topics&st=0&ch=300&t=0&submit=%D0%A2%D1%8A%D1%80%D1%81%D0%B5%D0%BD%D0%B5";
    var user = "";
    var url = document.URL;
    var topics = new Array();
    var hide_notifications = new Array();
    var new_notifications = new Array();
    var last_check = 0;

    var browser = 0; /*  0 = AcidTech
                         1 = AeroBlue
                         2 = subsilver
                         3 = animes or prosilver
                         4 = skynukes_red */

    Array.prototype.check_topics = function (top) {
        if (top == null) { return; }
        var found = false;
        for (var i = 0; i < this.length; i++) {
            if (top.link == this[i].link) {
                this[i].name = top.name;
                this[i].answers = top.answers;
                this[i].lastop.author = top.lastop.author;
                this[i].lastop.date = top.lastop.date;
                if (top.last_post != "error") {
                    this[i].last_post = top.last_post;
                }
                this[i].author = top.author;
                found = true;
            }
        }
        if (!found) {
            this.push(top);
            while (this.length > 50) {
                this.shift();
            }
        }
    };
    Array.prototype.check_equality = function (towhat) {
        if (towhat == null) {
            return false;
        }
        for (var j = 0; j < this.length; j++) {
            for (var i = 0; i < towhat.length; i++) {
                if (this[j].name != towhat[i].name || this[j].author != towhat[i].author || this[j].answers != towhat[i].answers || this[j].link != towhat[i].link || this[j].lastop.author != towhat[i].lastop.author || this[j].lastop.date != towhat[i].lastop.date || this[j].last_post != towhat[i].last_post) {
                    return false;
                }
            }
        }
        return true;
    };
    /* RegExp's */
    var FT = new RegExp(/.*viewtopic.php.*?t=(\d*).*/i); /* Find Post */
    var FP = new RegExp(/.*viewtopic.php.*p=(\d*).*/i);
    var VT = new RegExp(/.*viewtopic.php.*/i); /* viewing topic */
    var VF = new RegExp(/.*viewforum.php.*/i); /* viewing forum */
    var posting = new RegExp(/.*posting.php.*/i);
    var logged = false;
    function last_op() {
        this.author = "";
        this.date = "";
    };
    function topic() {
        this.name = "";
        this.author = "";
        this.answers = "";
        this.link = 0;
        this.lastop = new last_op();
        this.last_post = 0;
    };
    t = new topic();
    var lS = window.localStorage;

    function s(what, towhat) {
        if (towhat == null || what == null) { return; }
        lS.setItem(what, JSON.stringify(towhat));
        if (what == 'new_notifys') {
            s('reply_check', new Date());
        }
    };
    function g(what) {
        return JSON.parse(lS.getItem(what));
    };
    Main = {
        get: function (url) {
            var xml = new XMLHttpRequest();
            xml.open("GET", url, false);
            xml.setRequestHeader('Content-Type', 'text/xml');
            xml.send();
            var result = 0;
            if (xml.readyState == 4 && xml.status == 200) {
                var parser = new DOMParser();
                result = parser.parseFromString(xml.response, "application/xml");
            }
            return result;
        },

        get_recent_replays: function () {
            return Main.get(searchstring1 + user + searchstring2);
        },

        logged: function () { return true; },
        getCSSRule: function (ruleName, deleteFlag) {
            ruleName = ruleName.toLowerCase();
            if (document.styleSheets) {
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var styleSheet = document.styleSheets[i];
                    var ii = 0;
                    var cssRule = false;
                    do {
                        if (styleSheet.cssRules) {
                            cssRule = styleSheet.cssRules[ii];
                        } else {
                            cssRule = styleSheet.rules[ii];
                        }
                        if (cssRule) {
                            if (cssRule.selectorText.toLowerCase() == ruleName) {
                                if (deleteFlag == 'delete') {
                                    if (styleSheet.cssRules) {
                                        styleSheet.deleteRule(ii);
                                    } else {
                                        styleSheet.removeRule(ii);
                                    }
                                    return true;
                                } else {
                                    return cssRule;
                                }
                            }
                        }
                        ii++;
                    } while (cssRule)
                }
            }
            return false;
        },
        spoiler_fix: function () {
            /* spoiler fixes */
            var spoilertags = document.getElementsByClassName("spoiler");
            if (spoilertags.length == 0) return;
            var newwidth = 0;
            if (spoilertags.length > 0) {
                /* word wrap*/
                var precss = Main.getCSSRule("pre");
                precss.style.whiteSpace = "pre-wrap";
                precss.style.whiteSpace = "-moz-pre-wrap";
                precss.style.whiteSpace = "-pre-wrap";
                precss.style.whiteSpace = "-o-pre-wrap";
                precss.style.wordWrap = "break-word";
            }
            newwidth = window.getComputedStyle(spoilertags[0].parentNode).width - 40;
            for (var i = 0; i < spoilertags.length; i++) {
                /* fix width bug */
                spoilertags[i].style.width = newwidth;
                var pre = spoilertags[i].getElementsByTagName("pre")[0];
                pre.style.width = "100%";
            }
        },
        spam_fix: function () {
            var deleting = new Array();
            deleting.push("postsubject");
            deleting.push("postonline");
            deleting.push("postbody signature");
            deleting.push("postrankimg");
            deleting.push("posterrank");
            deleting.push("postdetails");
            //document.getElementsByClassName("postdetails");
            for (var j = 0; j < deleting.length; j++) {
                posts = document.getElementsByClassName(deleting[j]);
                for (var i = posts.length - 1; i >= 0; i--)
                    posts[i].parentNode.removeChild(posts[i]);
            }
        },
        replay_check: function () {
            recent = Main.get_recent_replays();
            change = false;
            delete new_notifications;
            new_notifications = new Array();
            switch (browser) {
                case 0:
                case 1:
                case 2:
                case 4:
                    trs = recent.getElementsByTagName("tr");
                    for (var i = 0; i < trs.length; i++) {
                        if (trs[i].getAttribute("valign") == "middle") {
                            var tds = trs[i].getElementsByTagName("td");
                            if (tds[0].getElementsByTagName("img")[0].getAttribute("title") == "UNREAD_POSTS") {
                                var temp_t = new topic();
                                temp_t.name = tds[2].getElementsByClassName("topictitle")[0].innerHTML;
                                var m = FT.exec(tds[2].getElementsByClassName("topictitle")[0].getAttribute("href"));
                                if (m)
                                    temp_t.link = m[1];
                                else
                                    temp_t.link = 'error';
                                temp_t.author = tds[3].getElementsByTagName("a")[0].innerHTML;
                                temp_t.answers = tds[4].childNodes[0].innerHTML;
                                temp_t.lastop.author = tds[6].getElementsByTagName("a")[0].innerHTML;
                                temp_t.lastop.date = tds[6].getElementsByTagName("p")[0].innerHTML;
                                var m = FP.exec(tds[6].getElementsByTagName("a")[1].getAttribute("href"));
                                if (m)
                                    temp_t.last_post = m[1];
                                else
                                    temp_t.last_post = 'error';
                                new_notifications.check_topics(temp_t);
                                change = true;
                            }
                        }
                    }
                    break;
                case 3:
                    topiclist = recent.getElementsByClassName("topiclist topics")[0];
                    if (topiclist == null) { return; };
                    lis = topiclist.getElementsByTagName("li");
                    for (var i = 0; i < lis.length; i++) {
                        dl = lis[i].getElementsByTagName("dl")[0];
                        if (dl == null || dl.getElementsByTagName("dt").length == 0) { continue; };
                        if (/.*unread\#unread.*/.exec(dl.getElementsByTagName("dt")[0].getElementsByTagName("a")[0].getAttribute("href"))) {
                            var temp_t = new topic();
                            temp_t.name = dl.getElementsByClassName("topictitle")[0].innerHTML;
                            var m = FT.exec(dl.getElementsByClassName("topictitle")[0].getAttribute("href"));
                            if (m)
                                temp_t.link = m[1];
                            else
                                temp_t.link = 'error';
                            temp_t.author = dl.getElementsByTagName("a")[dl.getElementsByTagName("a").length - 4].innerHTML;
                            temp_t.answers = dl.getElementsByClassName("posts")[0].innerHTML;
                            dd = dl.getElementsByClassName("lastpost")[0];
                            temp_t.lastop.author = dd.getElementsByTagName("a")[0].innerHTML;
                            temp_t.lastop.date = dd.getElementsByTagName("br")[0].innerHTML;
                            var m = FP.exec(dd.getElementsByTagName("a")[1].getAttribute("href"));
                            if (m)
                                temp_t.last_post = m[1];
                            else
                                temp_t.last_post = 'error';
                            new_notifications.check_topics(temp_t);
                            change = true;
                        }
                    }
                    break;
            }
            s('new_notifys', new_notifications);
            nao = new Date();
            lS.setItem('last_check', nao);
            last_check = nao;

            return change;
        },
        hide_notification: function (index) {
            hide_notifications.check_topics(new_notifications[index]);
            Main.hide_notifi_refresh();
        },
        replay_watch: function () {
            if (lS.getItem("reply_check_time") == null || new Date() - new Date(lS.getItem("reply_check_time")) > 60000) {
                Main.show_notifications();
                lS.setItem("reply_check_time", new Date());
            }
            if (last_check != lS.getItem('last_check')) {
                var nv = g('new_notify');
                if (nv != null) {
                    if (!new_notifications.check_equality(nv)) {
                        new_notifications = nv;
                        Main.show_notifications(true);
                    }
                }
            }
            window.setTimeout(Main.replay_watch, 5000);
        },
        hide_notifi_refresh: function () {
            return; //this is fucked up, we dont do shit here!
            hn = g('hide_notifys');
            if (hn != null) {
                old_hides = hide_notifications;
                hide_notifications = hn;
                for (var i = 0; i < old_hides.length; i++) {
                    if (hide_notifications.indexOf(old_hides[i]) == -1) {
                        hide_notifications.push(old_hides[i]);
                        if (hide_notifications > 50) {
                            hide_notifications.check_topics();
                        }
                    }
                }
            }
            s('hide_notifys', hide_notifications);
        },
        show_notifications: function (forced) {
            var bool = forced;
            if (bool == null) {
                Main.replay_check();
            }
            var noti_field = document.getElementById("notifications");
            (removeChild = function (child) { while (child.firstChild) removeChild(child.firstChild); child.parentNode.removeChild(child) });
            if (noti_field) { removeChild(noti_field); }

            Main.hide_notifi_refresh();
            if (last_check != lS.getItem('last_check')) {
                delete new_notifications;
                new_notifications = g('new_notifys');
                last_check = lS.getItem('last_check');
            }
            if (new_notifications != null) {
                if (new_notifications.length > 0) {
                    for (var i = 0; i < new_notifications.length; i++) {
                        if (hide_notifications.length > 0) {
                            var bool = true;
                            for (var j = 0; j < hide_notifications.length; j++) {
                                if (hide_notifications[j].link == new_notifications[i].link && hide_notifications[j].last_post == new_notifications[i].last_post) {
                                    bool = false;
                                }
                            }
                            if (bool) {
                                Main.addNotification(i);
                            }
                        } else {
                            Main.addNotification(i);
                        }
                    }
                }
            }
        },
        addNotification: function (index) {
            if (new_notifications[index] != null) {
                Main.notification("RE: " + "<a href=\"viewtopic.php?t=" + new_notifications[index].link + "&view=unread#unread\">" + new_notifications[index].name + "</a>", index);
            }
        },
        notification: function (note_html, index) {
            var noti_field = document.getElementById("notifications");
            if (!noti_field) {
                noti_field = document.createElement("div");
                noti_field.setAttribute("id", "notifications");
                document.getElementsByTagName("body")[0].appendChild(noti_field);
            }
            var icon_div = document.createElement("div");
            icon_div.setAttribute("class", "icon");
            var icon_div_2 = document.createElement("div");
            icon_div_2.setAttribute("class", "img");
            if (typeof icon == "undefined")
                icon_div_2.style.backgroundImage = "url(http://forum.animes-bg.com/styles/acidtech/imageset/announce_read.gif)";
            else
                icon_div_2.style.backgroundImage = "url(" + icon + ")";
            icon_div.appendChild(icon_div_2);

            var base_div = document.createElement("div");
            base_div.setAttribute("class", "notification");

            var text_div = document.createElement("div");
            text_div.setAttribute("class", "msg");
            text_div.innerHTML = note_html;

            var delete_div = document.createElement("div");
            delete_div.setAttribute("class", "delete");
            delete_div.onclick = (function () {
                base = base_div;
                Main.hide_notification(index);
                (function deletingallchilds() {
                    var old_base = base;
                    if (base.childElementCount > 0)
                        for (var i = 0; i < base.childElementCount; i++) {
                            base = base.children[i]
                            deletingallchilds();
                        }
                    base = old_base;
                    if (base != null) {
                        if (base.parentNode.childElementCount == 1 && base.parentNode.getAttribute("id") == "notifications") {
                            var FATHER = base.parentNode;
                        }

                        base.parentNode.removeChild(base);
                        if (typeof FATHER != "undefined") {
                            FATHER.parentNode.removeChild(FATHER);
                        }
                    }
                }).call();
            });


            base_div.appendChild(icon_div);
            base_div.appendChild(text_div);
            base_div.appendChild(delete_div);
            noti_field.appendChild(base_div);
            base_div.onmouseover = (function () {
                for (var i = 0; i < base_div.childElementCount; i++)
                    if (base_div.children[i].getAttribute("class") == "delete")
                        child = base_div.children[i];
                BLA = child;
                child.style.display = 'block';
            });
            base_div.onmouseout = (function () {
                for (var i = 0; i < base_div.childElementCount; i++)
                    if (base_div.children[i].getAttribute("class") == "delete")
                        child = base_div.children[i];
                child.style.display = 'none';
            });
        },
        notifications_check: function (visited_topic_id) {
            for (var i = 0; i < new_notifications.length; i++) {
                if (new_notifications[i].link == visited_topic_id) {
                    new_notifications.splice(i);
                    s('new_notifys', new_notifications);
                    Main.show_notifications();
                    break;
                }
            }
        },
        include_css: function () {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '#notifications{top:20px;left:88%;width:320px;margin-left:-200px;background:rgba(251,251,251,0.8);border-width:1px;border-style:solid;border-color:#8d8d8d;border-radius:5px;-webkit-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;-moz-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;-o-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;overflow:hidden;position:fixed;z-index:1;max-height:300px;overflow-y:hidden;text-shadow:white 0 1px 0;font:normal 12px HelveticaNeue,Helvetica,Arial,sans-serif}.notification{position:relative}.notification .delete,.modal .delete{position:absolute;display:block;right:-4px;top:4px;cursor:pointer;font-weight:bold;width:31px;height:31px;background:url(http://i.imgur.com/2eEJp.png) no-repeat;opacity:.5;display:none;overflow:hidden}.modal .delete:before{position:relative;top:3px}.notification .delete:hover{opacity:1}.notification .msg,.notification .icon{width:290px;height:100%;float:left;position:relative;left:-10px}.notification .icon{height:100%;width:30px;padding:10px;position:absolute;padding-top:0;padding-bottom:0;overflow:hidden}.notification .msg{top: 3px; margin-left:50px; padding: 7px}.notification .msg .inner{padding:10px}.notification .icon:after{content:\'\';background:#c1c1c1;-moz-box-shadow:white 1px 0 0;-webkit-box-shadow:white 1px 0 0;box-shadow:white 1px 0 0;width:0;height:100%;position:absolute;top:0;right:0}.notification .img{position:relative;top:10px;width:20px;background-size:auto 100%;background-position:center;height:20px;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;position:absolute;margin:-2px 0 0 10px}.notification .imgNone{position:relative;top:10px;width:20px;background-size:auto 100%;background-position:center;height:20px;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;position:absolute;margin:-3px 0 0 10px}.notification:after{content:".";visibility:hidden;display:block;clear:both;height:0;font-size:0}.notification h2{color:#666;font-size:14px;margin:0}.animated{-webkit-animation:1s ease;-moz-animation:1s ease;-ms-animation:1s ease;-o-animation:1s ease;animation:1s ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both}.animated.fast{-webkit-animation-duration:.4s;-moz-animation-duration:.4s;-ms-animation-duration:.4s;-o-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes fadeInLeftMiddle{0%{opacity:.5;-webkit-transform:translateX(-400px)}100%{opacity:1;-webkit-transform:translateX(0)}}@-moz-keyframes fadeInLeftMiddle{0%{opacity:.5;-moz-transform:translateX(-400px)}100%{opacity:1;-moz-transform:translateX(0)}}@-ms-keyframes fadeInLeftMiddle{0%{opacity:.5;-ms-transform:translateX(-400px)}100%{opacity:1;-ms-transform:translateX(0)}}@-o-keyframes fadeInLeftMiddle{0%{opacity:.5;-o-transform:translateX(-400px)}100%{opacity:1;-o-transform:translateX(0)}}@keyframes fadeInLeftMiddle{0%{opacity:.5;transform:translateX(-400px)}100%{opacity:1;transform:translateX(0)}}.fadeInLeftMiddle{-webkit-animation-name:fadeInLeftMiddle;-moz-animation-name:fadeInLeftMiddle;-ms-animation-name:fadeInLeftMiddle;-o-animation-name:fadeInLeftMiddle;animation-name:fadeInLeftMiddle}@-webkit-keyframes fadeInDownBig{0%{opacity:0;-webkit-transform:translateY(-2000px)}100%{opacity:1;-webkit-transform:translateY(0)}}@-moz-keyframes fadeInDownBig{0%{opacity:0;-moz-transform:translateY(-2000px)}100%{opacity:1;-moz-transform:translateY(0)}}@-ms-keyframes fadeInDownBig{0%{opacity:0;-ms-transform:translateY(-2000px)}100%{opacity:1;-ms-transform:translateY(0)}}@-o-keyframes fadeInDownBig{0%{opacity:0;-o-transform:translateY(-2000px)}100%{opacity:1;-o-transform:translateY(0)}}@keyframes fadeInDownBig{0%{opacity:0;transform:translateY(-2000px)}100%{opacity:1;transform:translateY(0)}}.fadeInDownBig{-webkit-animation-name:fadeInDownBig;-moz-animation-name:fadeInDownBig;-ms-animation-name:fadeInDownBig;-o-animation-name:fadeInDownBig;animation-name:fadeInDownBig}@-webkit-keyframes fadeOutRightBig{0%{opacity:1;-webkit-transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(2000px)}}@-moz-keyframes fadeOutRightBig{0%{opacity:1;-moz-transform:translateX(0)}100%{opacity:0;-moz-transform:translateX(2000px)}}@-ms-keyframes fadeOutRightBig{0%{opacity:1;-ms-transform:translateX(0)}100%{opacity:0;-ms-transform:translateX(2000px)}}@-o-keyframes fadeOutRightBig{0%{opacity:1;-o-transform:translateX(0)}100%{opacity:0;-o-transform:translateX(2000px)}}@keyframes fadeOutRightBig{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(2000px)}}.fadeOutRightBig{-webkit-animation-name:fadeOutRightBig;-moz-animation-name:fadeOutRightBig;-ms-animation-name:fadeOutRightBig;-o-animation-name:fadeOutRightBig;animation-name:fadeOutRightBig}@-webkit-keyframes fadeOutRight{0%{opacity:1;-webkit-transform:translateX(0)}100%{opacity:0;-webkit-transform:translateX(40px)}}@-moz-keyframes fadeOutRight{0%{opacity:1;-moz-transform:translateX(0)}100%{opacity:0;-moz-transform:translateX(40px)}}@-ms-keyframes fadeOutRight{0%{opacity:1;-ms-transform:translateX(0)}100%{opacity:0;-ms-transform:translateX(40px)}}@-o-keyframes fadeOutRight{0%{opacity:1;-o-transform:translateX(0)}100%{opacity:0;-o-transform:translateX(40px)}}@keyframes fadeOutRight{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(40px)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;-moz-animation-name:fadeOutRight;-ms-animation-name:fadeOutRight;-o-animation-name:fadeOutRight;animation-name:fadeOutRight}@media screen and (max-width:450px) and (max-width:767px){#notifications{top:0;width:99%;left:0;margin-left:0}.notification .msg,.notification .icon{width:85%;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.notification .msg{margin-left:15%}}@media only screen and (device-width:768px){#notifications{top:20px;left:85%;width:320px;margin-left:-200px;background:rgba(251,251,251,0.8);border-width:1px;border-style:solid;border-color:#8d8d8d;border-radius:5px;-webkit-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;-moz-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;-o-box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;box-shadow:white 0 -1px 0 inset,rgba(0,0,0,0.5) 2px 2px 25px;overflow:hidden;position:absolute;z-index:1;max-height:300px;overflow-y:hidden;text-shadow:white 0 1px 0;font:normal 12px HelveticaNeue,Helvetica,Arial,sans-serif}}';
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        GetUser: function () {
            get_skin_type = function (d) {
                if (d == null) { return; }
                for (var j = 0; j < d.length; j++) {
                    if (d[j] == null) { continue; };
                    for (var i = d[j].length - 1; i >= 0; i--) {
                        m = /.*ucp\.php\?mode=logout.*/i.exec(d[j][i].getAttribute("href"));
                        if (m) {
                            logged = true;
                            m = /.*\[ (.*) \].*/i.exec(d[j][i].innerHTML);
                            if (m[1]) {
                                user = m[1];
                                browser = j;
                                return;
                            }
                        }
                    }
                }
            };
            b = new Array();
            if (AcidTech = document.getElementsByClassName("navrow")[0]) AcidTech = AcidTech.getElementsByTagName("a");
            b.push(AcidTech); // 0 = AcidTech
            AeroBlue = document.getElementsByClassName("squarebuttonr");
            b.push(AeroBlue); // 1 = AeroBlue
            if (subsilver = document.getElementsByClassName("genmed")[0]) subsilver = subsilver.getElementsByTagName("a");
            b.push(subsilver); // 2 = subsilver
            if (animesprosilver = document.getElementsByClassName("icon-logout")[0]) animesprosilver = animesprosilver.getElementsByTagName("a");
            b.push(animesprosilver); // 3 = animes or prosilver
            if (skynukes_red = document.getElementById("menumade")) skynukes_red = skynukes_red.getElementsByTagName("a");
            b.push(skynukes_red);  // 4 = skynukes_red
            get_skin_type(b);
        },

        create_page_element: function (element) {
            new_element = document.createElement(element);
            var i = 1;
            while (arguments[i]) {
                new_element.setAttribute(arguments[i][0], arguments[i][1]);
                i++;
            }
            return new_element;
        },

        fast_replay2: function () {
            atags = document.getElementsByTagName("a");
            for (var i = 0; i < atags.length; i++) if (/.*posting\.php\?mode\=reply.*/i.exec(atags[i].href)) { b = atags[i]; break; }
            postpage = Main.get(b.href);

            form1 = postpage.getElementsByTagName("form")[0];
            form2 = form1.cloneNode();
            form2.innerHTML = form1.innerHTML;
            function delete_all_but(what) {
                if (what == null || what.parentNode == null) { return; }
                for (var i = what.parentNode.childElementCount; i >= 0; i--) {
                    if (what.parentNode.children[i] != null && what.parentNode.children[i] != what && what.parentNode.children[i].tagName != "input" && what.parentNode.children[i].tagName != "script") {
                        what.parentNode.removeChild(what.parentNode.children[i]);
                        i = what.parentNode.childElementCount
                    }
                }
                if (what.tagName == "FORM") { return; }
                delete_all_but(what.parentNode);
            };
            delete_all_but(form1.getElementsByTagName("textarea")[0]);
            submit = form2.getElementsByTagName("input");
            for (var i = 0; i < submit.length; i++) if (submit[i].type == "submit") { submit = submit[i]; break; }
            console.log(submit);
            delete_all_but(submit);
            while (submit.parentNode != null) {
                if (submit.parentNode.tagName != "FORM") {
                    submit = submit.parentNode
                } else {
                    break;
                }
            };
            form2.removeChild(form2.children(1));
            form2.removeChild(form2.children(1));
            form1.innerHTML += form2.innerHTML;


        },
        fast_replay: function () {
            //http://forum.animes-bg.com/posting.php?mode=reply&f=30&t=60060
            atags = document.getElementsByTagName("a");
            for (var i = 0; i < atags.length; i++) if (/.*posting\.php\?mode\=reply.*/i.exec(atags[i].href)) { b = atags[i]; break; }
            postpage = Main.get(b.href);
            form = Main.create_page_element("form", ["action", b], ["method", "post"], ["name", "postform"]);

            textarea = Main.create_page_element("textarea", ["name", "message"], ["rows", "15"], ["cols", "76"], ["tableindex", "3"], ["class", "posting-textarea"], ["style", "padding:0px; width:100%"]);

            script = Main.create_page_element("script", ["type", "text/javascript"]);
            script.innerHTML = "\n// <![CDATA[ \n  var form_name = 'postform'; \n  var text_name = 'message';	\n// ]]>\n";
            table = Main.create_page_element("table", ["class", "tablebg"], ["width", "100%"], ["cellspacing", "0"]);
            tr = Main.create_page_element("tr");

            td = Main.create_page_element("td", ["class", "cat"], ["colspan", "2"], ["align", "center"]);

            b_preview = Main.create_page_element("input", ["class", "btnlite"], ["type", "submit"], ["tabindex", "10"], ["name", "preview"], ["value", "Прегледай"]);

            b_post = Main.create_page_element("input", ["class", "btnmain"], ["type", "submit"], ["accesskey", "s"], ["tabindex", "11"], ["name", "post"], ["value", "Изпрати"])

            hidden_input1 = postpage.getElementsByName("topic_cur_post_id")[0];
            hidden_input2 = postpage.getElementsByName("lastclick")[0];
            //hidden_input3 = postpage.getElementsByName("creation_time")[0];
            //hidden_input4 = postpage.getElementsByName("form_token")[0];

            tr.appendChild(td);
            td.appendChild(hidden_input1);
            td.appendChild(hidden_input2);
            td.appendChild(b_preview);
            td.appendChild(b_post);

            table.appendChild(script);
            table.appendChild(textarea);
            table.appendChild(tr)
            //table.appendChild(hidden_input3);
            //table.appendChild(hidden_input4);

            form.appendChild(table);
            if (browser == 3) {
                footer = document.getElementById("jumpbox");
            } else {
                footer = document.getElementById("pagefooter");
            }
            footer.parentNode.insertBefore(form, footer);

        },
        quote_fix: function () {
            quotewrappers = document.getElementsByClassName("quotewrapper");
            if (quotewrappers.length == 0) return;
            for (var i = 0; i < quotewrappers.length; i++)
                quotewrappers[i].setAttribute("onclick", "q = this.getElementsByClassName('quotecontent')[0]; if (this.id != '' || this.id == null) { q.style.display == 'none' ? q.style.display = 'block' : q.style.display = 'none';}");
        },
        start: function () {
            Main.GetUser();
            Main.include_css();
            if (logged) {
                nn = g('new_notifys');
                last_check = new Date();
                if (nn != null) {
                    new_notifications = nn;
                    Main.show_notifications(true);
                }
                Main.replay_watch();
                if (VT.exec(url)) {
                    if (browser == 3) {
                        var title = document.getElementsByTagName("h2")[0].getElementsByTagName("a")[0];
                    } else {
                        var title = document.getElementsByClassName("titles")[0];
                    }
                    var m = FT.exec(title.getAttribute('href'));
                    if (m[1] == spam_id || title.innerHTML == '*~~ С П А М ~~*') { /* Checking if we are in the SPAM TOPIC */
                        Main.spam_fix();
                    }
                    Main.notifications_check(m[1]);
                    Main.spoiler_fix();
                    Main.fast_replay();
                    Main.quote_fix();
                }
                if (posting.exec(url)) {
                    Main.spoiler_fix();
                    Main.quote_fix();
                }
            }
        }
    }
    Main.start();
})();