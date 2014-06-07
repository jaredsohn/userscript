// ==UserScript==
// @name        W odpowiedzi do...
// @include     /^http(s)?://(www.)?wykop.pl/(mikroblog|wpis).*$/
// @include     /^http(s)?://(www.)?wykop.pl/ludzie/(wpisy/|komentowane-wpisy/|).*/$/
// @version     1.51
// @description Umozliwia podglad postow do ktorych zostala napisana odpowiedz
// @namespace   MS
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/180302.meta.js
// @downloadURL	https://userscripts.org/scripts/source/180302.user.js
// ==/UserScript==

(function (document, $, MutationObserver) {
    "use strict";
    var start = +(new Date()),
        //bo czesto uzywany ;)
        sliceArray = Array.prototype.slice,
        previewDiv = document.createElement("div"),
        getCommentClone = function (commentID) {
            var commentContentP = $("li[data-id='" + commentID + "']").find("blockquote > p"),
                clonedComment = document.createElement("div");

            if (commentContentP.length === 0) {
                clonedComment.appendChild(document.createTextNode("(komentarz zwinięty)"));
            } else {
                //tresc komentarza
                clonedComment.appendChild(commentContentP.get(0).cloneNode(true));
                //zalacznik
                if (!commentContentP.eq(1).hasClass("small")) {
                    clonedComment.appendChild(commentContentP.get(1).cloneNode(true));
                }
                $("a.replyEntryComment", clonedComment).remove();
            }

            return clonedComment;
        },
        registerEvents = function (elements, isComment) {
            elements.forEach(function (element) {
                (function addLinkWhenReplyToClicked(element) {
                    element.getElementsByClassName("replyEntryComment")[0].addEventListener("click", function () {
                        //wykonywane w timeoutcie, poniewaz textarea na tresc odpowiedzi przestaje istniec po dodaniu odpowiedzi #maciej
                        setTimeout(function () {
                            var replyContentTextarea,
                                linkToComment = element.getElementsByClassName("votes")[0].lastElementChild.href;

                            if (isComment === false) {
                                replyContentTextarea = element.getElementsByTagName("textarea")[0];
                            } else {
                                replyContentTextarea = element.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0];
                            }
                            replyContentTextarea.value += "[(#)](" + linkToComment + ") ";
                        }, 25);
                    });
                }(element));

                if (isComment === false) {
                    return;
                }

                (function showPreviewWhenOverLink(element, previewDiv, $) {
                    var possiblePreviewableLinks = sliceArray.call($("blockquote > p", element).find("a")),
                        supportedLinksPatternMatches,
                        commentClone,
                        timeoutID;

                    possiblePreviewableLinks.forEach(function (possiblePreviewableLink) {
                        var commentID;

                        //naprawia blad, kiedy link kieruje do komentarza ale nie jest linkiem z dodatku (np. "pokaż całość")
                        if (possiblePreviewableLink.textContent !== "(#)") {
                            return;
                        }

                        supportedLinksPatternMatches = possiblePreviewableLink.href.match(/wykop\.pl\/wpis\/([0-9]+)\/[A-Za-z0-9\-]+\/(#comment-([0-9]+))?/);

                        if (supportedLinksPatternMatches === null) {
                            return;
                        }

                        if (supportedLinksPatternMatches[3] === undefined) {
                            //odpowiedz do glownego wpisu (brak koncowki #comment-id)
                            commentID = supportedLinksPatternMatches[1];
                        } else {
                            //odpowiedz do jednego z komentarzy
                            commentID = supportedLinksPatternMatches[3];
                        }

                        possiblePreviewableLink.addEventListener("mouseenter", function (e) {
                            var commentClone;
                            clearTimeout(timeoutID);
                            previewDiv.style.top = e.pageY + 15 + "px";
                            previewDiv.style.left = e.pageX + "px";
                            if (previewDiv.children.length !== 0) {
                                previewDiv.firstElementChild.remove();
                            }
                            commentClone = getCommentClone(commentID);
                            previewDiv.appendChild(commentClone);
                            $(previewDiv).fadeIn(100);
                        });

                        possiblePreviewableLink.addEventListener("mouseleave", function () {
                            timeoutID = setTimeout(function () {
                                $(previewDiv).fadeOut(100);
                            }, 250);
                        });

                        previewDiv.addEventListener("mouseenter", function () {
                            clearTimeout(timeoutID);
                        });

                        previewDiv.addEventListener("mouseleave", function () {
                            //bug wystepujacy pod Chrome - z jakiegos dziwnego po kliknieciu w spoiler
                            //odpala sie zdarzenie mouseleave a zaraz po nim znowu mouseenter
                            timeoutID = setTimeout(function () {
                                $(previewDiv).fadeOut(100);
                            }, 50);
                        });
                    });


                }(element, previewDiv, $));
            });
        };

    (function setPreviewDiv(document, previewDiv) {
        var styleText = "#previewDiv { display: block; position: absolute; margin-bottom: 7px; border-radius: 2px; max-width: 800px; max-height: 600px; overflow: auto; z-index: 9999; padding: 3px; text-align: left; ",
            style = document.createElement("style");

        //style do diva
        style.setAttribute("type", "text/css");
        if (window.nightmode === true) {
            styleText += "border: 1px solid #4c4c4c; border-bottom: 2px solid #4c4c4c; box-shadow: 0px 6px 3px -3px rgba(0, 0, 0, .2); background: #3c3c3c; }";
        } else {
            //#tylkodzienny
            styleText += "border: 1px solid #626b77; border-bottom: 1px solid #626b77; box-shadow: 0px 6px 3px -3px rgba(128, 128, 128, .2); background: #f8f8f8; }";
        }

        //obsluga Wypokowego markdowna
        styleText += "#previewDiv strong { font-weight: bold; } #previewDiv em { font-style: italic; } #previewDiv cite { padding-left: 10px; display: block; color: #8E8E8E; border-left: 2px solid #8E8E8E; }";

        style.appendChild(document.createTextNode(styleText));
        document.getElementsByTagName("head")[0].appendChild(style);

        previewDiv.setAttribute("id", "previewDiv");
        previewDiv.setAttribute("class", "small");
        document.body.appendChild(previewDiv);
    }(document, previewDiv));

    (function processVisibleComments() {
        var commentsToEntry = sliceArray.call(document.querySelectorAll("li[data-type='entrycomment']")),
            entries = sliceArray.call(document.querySelectorAll("li[data-type='entry']"));
        registerEvents(commentsToEntry);
        registerEvents(entries, false);
    }());

    (function observeEntryDivsForNewComments(document, registerEvents, sliceArray, MutationObserver) {
        var entryDivs = sliceArray.call(document.querySelectorAll("div.marginbott10")),
            newCommentsObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    var changedElement = mutation.addedNodes[0],
                        changedElementTagName,
                        newComments;

                    //nic nie zmienione badz dodany wezel tekstowy
                    if (!changedElement || typeof changedElement.tagName === "undefined") {
                        return;
                    }

                    changedElementTagName = changedElement.tagName.toLowerCase();

                    if (changedElementTagName === "div") {
                        //rozwinieto DIV z odpowiedziami - addedNodes zawiera tego diva, wydobadz z niego komentarze
                        newComments = sliceArray.call(changedElement.querySelectorAll("li[data-type='entrycomment']"));
                    } else if (changedElementTagName === "li") {
                        //przyszly nowe komentarze na stronie wpisu - addedNodes zawiera ich liste
                        newComments = sliceArray.call(mutation.addedNodes).filter(function (addedNode) {
                            return addedNode.getAttribute("data-type") === "entrycomment";
                        });
                    } else {
                        return;
                    }
                    registerEvents(newComments);
                });
            });

        entryDivs.forEach(function (entryDiv) {
            newCommentsObserver.observe(entryDiv, {
                childList: true,
                subtree: true
            });
        });
    }(document, registerEvents, sliceArray, MutationObserver));
    console.log(new Date() - start);
}(document, $, window.MutationObserver));