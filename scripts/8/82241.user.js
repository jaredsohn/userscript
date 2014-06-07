// ==UserScript==
// @name           Tweet Balloon Translator
// @namespace      http://userscripts.org/users/stoyanov
// @description    Allows you to translate tweets from twitter.com at the tip of your cursor
// @include        http*://twitter.com/*
// @include        http*://www.twitter.com/*
// ==/UserScript==

var getById = function (node, targetId) {
    if (node) {
        if (node.wrappedJSObject) node = node.wrappedJSObject;

        if (node.childNodes) for (var i = 0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];

            if (n.id == targetId) return n;

            var c = getById(n, targetId);

            if (c) return c;
        }
    }

    return null;
}

var getByClass = function (node, targetClassName) {
    if (node) {
        if (node.wrappedJSObject) node = node.wrappedJSObject;

        if (node.childNodes) for (var i = 0; i < node.childNodes.length; i++) {
            var n = node.childNodes[i];

            if (n.className == targetClassName) return n;

            var c = getByClass(n, targetClassName);

            if (c) return c;
        }
    }

    return null;
}

var addTranslateLinks = function () {
    var timeline = document.getElementById("timeline");

    if (timeline) {
        var tweets = timeline.getElementsByTagName("li");

        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];

            if (!tweet.id) continue;
            else if (tweet.id.indexOf("status_") != 0 && tweet.id.indexOf("direct_message_") != 0) continue;

            // We are using a translate link ID so as to avoid re-adding it to a given tweet
            var idTranslate = "translate_" + tweet.id;
            var actions = getByClass(tweet, "actions-hover");
            var liTranslate = getById(tweet, idTranslate);

            if (!liTranslate) {
                if (!actions) {
                    // Guest/not logged in users need to have the "actions" menu added before we add a translate link
                    var statusbody = getByClass(tweet, "status-body");
                    var metadataclearfix = getByClass(tweet, "meta-data clearfix");

                    if (!statusbody || !metadataclearfix) break;

                    actions = document.createElement("ul");
                    actions.className = 'actions-hover';

                    statusbody.insertBefore(actions, metadataclearfix);
                }

                liTranslate = document.createElement("li");
                liTranslate.innerHTML = '<SPAN class="translate-link" id="' + idTranslate + '">' + '<SPAN class="retweet-icon icon"></SPAN>' + '<A id="link_' + idTranslate + '" href="javascript:void(0);">Translate</A>' + '</SPAN>'

                // Attach a mouse handler for the actual translation
                liTranslate.getElementsByTagName("a")[0].id = 'link' + idTranslate;
                liTranslate.getElementsByTagName("a")[0].addEventListener("mouseover", function (mouseEvent) {

                    var getIsSelected = function (current) {
                        var $ = unsafeWindow['$'];

                        if (current == 'separator') return 'disabled';

                        if ($.cookie(tweetTransLang) == current) return 'selected="selected"';
                        else return '';
                    }

                    var getLanguageCode = function (language) {
                        for (var k = 0; k < languages.length; k++)
                        if (languages[k][1] == language) return languages[k][0];

                        return '';
                    }

                    var doTranslationDelayed = function () {
                        try {
                            var tweetId = lastControl.id.substring(lastControl.id.indexOf('_') + 1);
                            var tweet = document.getElementById(tweetId);
                            var content = getByClass(tweet, "status-content");

                            if (!content) content = getByClass(tweet, "entry-content");
                            if (!content) return false;

                            // Access the global twitter object, and get a reference to jQuery
                            var twttr = unsafeWindow['twttr'];
                            var h = twttr.HOVERCARD;
                            var $ = unsafeWindow['$'];


                            if ($(lastControl).css("text-decoration") != "underline" && !translationForced) return;

                            translationForced = false;

                            // TEST: twttr.statusUpdateError.decider('test');
                            if (lastTranslation == tweetId && h.isOpen) return;

                            lastTranslation = tweetId;

                            var ctl = $(content);

                            if (tweet.id.indexOf("status_") < 0) ctl = ctl.parent();

                            var text = ctl.html();
                            var encodedText = escape(text);

                            // Open the hovercard
                            if (h.isOpen) h.hide();

                            h._renderCard(true);

                            var G = $(content);
                            h.$target = G;

                            var L = G.closest("li.status, li.direct_message, li.user");

                            if (G.is("img")) {
                                S = h._extractScreenNameFromClass(L)
                            } else {
                                if (G.is(".username") || G.is(".screen-name")) {
                                    S = gh._extractScreenNameFromClass(G);
                                    S = S || G.text()
                                }
                            }

                            G.click(function () {
                                twttr.HoverCard.instance().hide();
                                twttr.User.bail()
                            });

                            h.positionCard(G);

                            // 'Loading...' phase
                            h._$card.addClass("hovercard-loading-above-below")
                            h.triggerHovercardEvent("hovercard-loading");
                            h.isOpen = true


                            var lang = $.cookie(tweetTransLang);

                            if (lang == null) lang = "en";

                            // Translate the actual tweet content
                            GM_xmlhttpRequest({
                                method: "get",
                                url: "https://ajax.googleapis.com/ajax/services/language/translate?v=2.0&q=" + encodedText + "&langpair=|" + lang + "&type=html",
                                onload: function (details)

                                {
                                    try {
                                        // Response data from Google
                                        var r = eval('(' + details.responseText + ')');
                                        var t = r.responseData.translatedText;

                                        if (content.wrappedJSObject) content = content.wrappedJSObject;

                                        // Populate the hovercard with the translated content
                                        h.triggerHovercardEvent("hovercard-show");

                                        var E = content;
                                        var F = h;
                                        var G = $(content);

                                        var translationComboBox = 'translationComboBox';
                                        var hovercardContent = '<ol class="statuses">' + '<li style="padding: 5px;">' + t + '</li>' + '<li style="padding: 5px; font-size: small; BACKGROUND-COLOR: #f6f6f6; COLOR: #666;">' + '    Translate to: <select id="' + translationComboBox + '">';

                                        for (var k = 0; k < languages.length; k++)
                                        hovercardContent += '<option value="' + languages[k][1] + '" ' + getIsSelected(languages[k][0]) + '>' + languages[k][1] + '</option>';

                                        hovercardContent += '    </select>' + '</li>' + '</ol>';

                                        h._$card.find(".hovercard-content").html(hovercardContent);

                                        var selectControls = document.getElementsByTagName("select");

                                        for (var k = 0; k < selectControls.length; k++)
                                        if (selectControls[k].id == translationComboBox) {
                                            $(selectControls[k]).change(function () {
                                                $.cookie(tweetTransLang, getLanguageCode($(this).val()));



                                                lastTranslation = -1;
                                                translationForced = true;

                                                setTimeout(doTranslationDelayed, 500);

                                            });

                                        }


/*        h.actionMenu = new twttr.control.ActionMenu(G);
        h.actionMenu.mention.listen(function() {
            F.triggerHovercardEvent("hovercard-mention");
            F.hide()
        });
        h.actionMenu.actionTaken.listen(function(G) {
            F.changeControlState(G, E);
            F.triggerHovercardEvent("hovercard-" + G.type);
            if (!G.bypassMenu) {
                twttr.HoverCard.toggleActionMenu();
                twttr.wait(function() {
                    twttr.clearWait(B);
                    A = twttr.wait(function() {
                        F.hide()
                    }, C.menuOut)
                }, 100)
            }
        });

                                        h.actionMenu.append(".hovercard");
        h._$card.find(".follow-controls a").bind("click", function(G) {
            G.preventDefault();
            twttr.api.follow(E.data("user_id"), {
                success: function(H) {
                    F.actionMenu.actionTaken.trigger({
                        type: "follow",
                        element: F.actionMenu.$content,
                        bypassMenu: true
                    })

                }
            })
        });
*/
                                        $(".following-controls span.setting").tipsy();
                                        var F = h;
                                        h._$card.find("a.load-more").one("click", function (K) {
                                            K.preventDefault();
                                            var J = $(h);
                                            J.hide();
                                            var G = J.closest(".hovercard").find(".description");
                                            if (F._$card.hasClass("position_above")) {
                                                var H = G.find(".description-inner").height();
                                                var I = parseInt(F._$card.css("top"));
                                                F._$card.css("top", I - H)
                                            }
                                            G.removeClass("description-inactive")
                                        })

                                        h.removeLoadingState();
                                        h.positionCard(G);

                                        h.isOpen = true;
                                        h._$card.css({
                                            display: "none",
                                            visibility: "visible"
                                        }).show();

                                    } catch (e) {
                                        // alert(e);

                                        // Show the error message, the most likely cause is that the tweet language could not be determined
                                        var H = h;
                                        var F = h._$card.find(".hovercard-inner");
                                        var I = h._$card.find(".loading-above-below");
                                        var G = I.find(".user-dne");
                                        var E = $(content);
                                        h._$card.addClass("hovercard-user-dne");
                                        E.unbind("mouseover").unbind("mouseout");

                                        function J() {
                                            I.css({
                                                width: "",
                                                height: "",
                                                padding: "5px"
                                            });

                                            G.text("Sorry, this tweet could not be translated");

                                            G.animate({
                                                opacity: 1
                                            })
                                        }
                                        h._$card.find(".loading-msg").hide();
                                        I.removeClass("loading-above-below");
                                        F.animate({
                                            width: "+=" + 100,
                                            height: "+=" + 22
                                        }, 250, J).css("overflow", "visible");
                                        twttr.wait(function () {
                                            H._$card.animate({
                                                opacity: 0
                                            })
                                        }, 5000)


                                    }
                                }
                            });

                        } catch (ex) {
                            // alert(ex);
                        }
                    }


                    lastControl = this;
                    setTimeout(doTranslationDelayed, 500);

                }, false);

                if (actions.childNodes.length == 0) actions.appendChild(liTranslate);
                else actions.insertBefore(liTranslate, actions.childNodes[0]);
            }
        }
    }

    setTimeout(addTranslateLinks, 3000);
}


// Initialization
addTranslateLinks();

var lastTranslation = -1;
var translationForced = false;

var tweetTransLang = 'gm_tweetTransLang';
var languages = new Array(

new Array('en', 'English'),
new Array('separator', '&#8212;'),
new Array('af', 'Afrikaans'),
new Array('sq', 'Albanian'),
new Array('ar', 'Arabic'),
//new Array('hy', 'Armenian ALPHA'),
//new Array('az', 'Azerbaijani ALPHA'),
//new Array('eu', 'Basque ALPHA'),
new Array('be', 'Belarusian'),
new Array('bg', 'Bulgarian'),
new Array('ca', 'Catalan'),
new Array('zh-CN', 'Chinese (Simplified)'),
new Array('zh-TW', 'Chinese (Traditional)'),
new Array('hr', 'Croatian'),
new Array('cs', 'Czech'),
new Array('da', 'Danish'),
new Array('nl', 'Dutch'),
new Array('en', 'English'),
new Array('et', 'Estonian'),
new Array('tl', 'Filipino'),
new Array('fi', 'Finnish'),
new Array('fr', 'French'),
new Array('gl', 'Galician'),
//new Array('ka', 'Georgian ALPHA'),
new Array('de', 'German'),
new Array('el', 'Greek'),
//new Array('ht', 'Haitian Creole ALPHA'),
new Array('iw', 'Hebrew'),
new Array('hi', 'Hindi'),
new Array('hu', 'Hungarian'),
new Array('is', 'Icelandic'),
new Array('id', 'Indonesian'),
new Array('ga', 'Irish'),
new Array('it', 'Italian'),
new Array('ja', 'Japanese'),
new Array('ko', 'Korean'),
new Array('lv', 'Latvian'),
new Array('lt', 'Lithuanian'),
new Array('mk', 'Macedonian'),
new Array('ms', 'Malay'),
new Array('mt', 'Maltese'),
new Array('no', 'Norwegian'),
new Array('fa', 'Persian'),
new Array('pl', 'Polish'),
new Array('pt', 'Portuguese'),
new Array('ro', 'Romanian'),
new Array('ru', 'Russian'),
new Array('sr', 'Serbian'),
new Array('sk', 'Slovak'),
new Array('sl', 'Slovenian'),
new Array('es', 'Spanish'),
new Array('sw', 'Swahili'),
new Array('sv', 'Swedish'),
new Array('th', 'Thai'),
new Array('tr', 'Turkish'),
new Array('uk', 'Ukrainian'),
//new Array('ur', 'Urdu ALPHA'),
new Array('vi', 'Vietnamese'),
new Array('cy', 'Welsh'),
new Array('yi', 'Yiddish')

);