// ==UserScript==
// @name NeoGAF Live Thread
// @namespace http://www.neogaf.com
// @version 2.1
// @description Automatically update a thread with new posts
// @include http://www.neogaf.com/forum/showthread*
// @include http://www.neogaf.net/forum/showthread*
// ==/UserScript==

(function () {

"use strict";

var css = document.createElement("style");
css.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}@-webkit-keyframes spin{from{-webkit-transform:rotate(0)}to{-webkit-transform:rotate(360deg)}}.live-toggle{background:transparent url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTYgMjgiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxkZWZzPjxwYXRoIGlkPSJpY29uIiBkPSJNMTAuOTkyLDguNzkxYzEuOTc0LTEuMTQsNC4zMjYtMS4wMzIsNi4xNDQsMC4wNzdsLTAuNjEyLDIuMjg3IGwxLjA0Mi0wLjYwMmwwLjc0NC0wLjQyOWwwLjE5My0wLjExMmwyLjEwNS0xLjIxNXYwbDAuMDgzLTAuMDQ4bC0yLjQwNi00LjE2N2wtMC41MDgsMS44OTYgYy0yLjQ0Ny0xLjIyNi01LjQ0MS0xLjI0MS03Ljk4NywwLjIyOWMtMy42NzIsMi4xMi01LjEzMyw2LjU4OC0zLjYsMTAuNDE0bDIuMTA1LTEuMjE2QzcuNDA1LDEzLjI0OCw4LjQ3MywxMC4yNDYsMTAuOTkyLDguNzkxeiBNMjEuODExLDEwLjg4bC0yLjEwNSwxLjIxNWMwLjg5LDIuNjU3LTAuMTc5LDUuNjU5LTIuNjk4LDcuMTE0Yy0xLjk3NCwxLjE0MS00LjMyNiwxLjAzMy02LjE0NC0wLjA3NmwwLjYxMi0yLjI4N2wtMS4wNDIsMC42MDIgIGgwTDcuMzEsMTkuMjUybDIuNDA2LDQuMTY4bDAuNTA4LTEuODk3YzIuNDQ3LDEuMjI2LDUuNDQxLDEuMjQxLDcuOTg3LTAuMjI5QzIxLjg4MywxOS4xNzMsMjMuMzQ0LDE0LjcwNiwyMS44MTEsMTAuODh6Ii8+PC9kZWZzPjx1c2UgeGxpbms6aHJlZj0iI2ljb24iIGZpbGw9IiM5OTkiLz48dXNlIHhsaW5rOmhyZWY9IiNpY29uIiBmaWxsPSIjZjkwIiB4PSIyOCIvPjwvc3ZnPg==") 0 0 / 56px 28px no-repeat;border:0;display:inline-block;float:right;font-size:0;height:28px;margin:0 0 0 8px;outline:0;padding:0;width:28px}.live-toggle.on{animation:spin 1s linear infinite;-webkit-animation:spin 1s linear infinite;background-position:-28px 0}.live-spacer{background:#01518e;text-align:center;overflow:auto;padding:4px}.live-spacer-page{color:#fff}.live-spacer-close{background:transparent url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBvbHlnb24gZmlsbD0iI2ZmZiIgcG9pbnRzPSIxNiw2LjQwMSAxMy41OTgsNCAxMCw3LjU5OSA2LjQwMiw0IDQsNi40MDEgNy41OTgsMTAgNCwxMy41OTkgNi40MDIsMTYuMDAxIDEwLDEyLjQwMSAxMy41OTgsMTYuMDAxIDE2LDEzLjU5OSAxMi40LDEwICIvPjwvc3ZnPg==") 0 0 / 20px 20px no-repeat;display:block;float:right;font-size:0;height:20px;opacity:.4;width:20px}.live-spacer-close:focus,.live-spacer-close:hover{opacity:1}.live-menu[hidden]{display:none !important}.live-menu,.live-info:hover .live-options{background:#eee;border-radius:3px}.live-menu{margin:auto;text-align:center;padding:8px 0 4px 0;width:220px}.live-info{position:relative}.live-info:hover .live-options{display:block}.live-options{position:absolute;bottom:100%;width:100%;display:none;padding:8px 0}.live-option{background:#ddd;border:0;font-weight:bold}.live-option.on{background:#bbb}.live-message{padding:8px 0}.live-actions{padding:8px 0}.live-action{background:#1b639a;border:0;border-radius:3px;color:#eee;font-weight:bold;margin:0 2px;padding:8px;text-transform:capitalize;width:70px}.live-action:focus,.live-action:hover{background:#01518e}.live-action:active{background:#444}.live-dark .live-spacer{background:#414141}.live-dark .live-menu,.live-dark .live-info:hover .live-options{background:#282828}.live-dark .live-option{background:#373737;color:#e6e6e6}.live-dark .live-option.on{background:#474747;color:#e6e6e6}.live-dark .live-action{background:#505050;color:#e6e6e6}.live-dark .live-action:focus,.live-dark .live-action:hover{background:#5a5a5a}.live-dark .live-action:active{background:#414141}';
document.head.appendChild(css);

var OPTION_FAIL_LIMIT   = Number(localStorage.LiveThread_FAIL_LIMIT) || 8,
    OPTION_CONFIRM_EXIT = (localStorage.LiveThread_CONFIRM_EXIT === "true") ? true : false,
    OPTION_CHECk_EDITS  = (localStorage.LiveThread_CHECk_EDITS  !== "false") ? true : false,
    OPTION_USE_HISTORY  = (localStorage.LiveThread_USE_HISTORY  !== "false") ? true : false;

var TEXT_RESPONSE_ERROR = "Response error",
    TEXT_PARSE_ERROR    = "Parse error",
    TEXT_NO_POSTS       = "No new posts",
    TEXT_POST_ADDED     = " new post",
    TEXT_POSTS_ADDED    = " new posts",
    TEXT_PENDING        = "Pending",
    TEXT_WAIT           = "Wait",
    TEXT_SPAM           = "\u0CA0_\u0CA0",
    TEXT_SECOND         = " second",
    TEXT_SECONDS        = " seconds",
    TEXT_MINUTE         = " minute",
    TEXT_MINUTES        = " minutes",
    TEXT_STOPPED        = "Stopped",
    TEXT_STARTING       = "Starting",
    TEXT_START          = "Start",
    TEXT_STOP           = "Stop",
    TEXT_UPDATE         = "Update",
    TEXT_CLOSE          = "Close",
    TEXT_SLOW           = "Slow",
    TEXT_NORMAL         = "Normal",
    TEXT_FAST           = "Fast",
    TEXT_PAGE           = "Page ",
    TEXT_CONFIRM_EXIT   = "NeoGAF Live Thread is on",
    TEXT_SPACER_CLOSE   = "Delete posts above this";

var STATE_LIVE          = false,
    STATE_PENDING       = false,
    STATE_INTERVAL      = 60,
    STATE_FAIL_COUNT    = 0,
    STATE_URL           = window.location.href,
    STATE_NEXTPAGE      = false,
    STATE_TIMER         = null,
    STATE_DELAY         = null;

var GAF_pagenavHead     = document.querySelectorAll("a.large-button[href^=newreply]")[0].parentNode.nextElementSibling,
    GAF_pagenavFoot     = document.querySelectorAll("a.large-button[href^=newreply]")[1].parentNode.nextElementSibling,
    GAF_postsContainer  = document.querySelector("#posts"),
    GAF_footerWrap      = document.querySelector("#footer > .wrap"),
    GAF_next            = document.querySelector(".pagenav a[rel=next]");

var UI_toggleHead       = document.createElement("button"),
    UI_toggleFoot       = document.createElement("button"),
    UI_optionSlow       = document.createElement("button"),
    UI_optionNorm       = document.createElement("button"),
    UI_optionFast       = document.createElement("button"),
    UI_actionStart      = document.createElement("button"),
    UI_actionStop       = document.createElement("button"),
    UI_options          = document.createElement("div"),
    UI_message          = document.createElement("div"),
    UI_info             = document.createElement("div"),
    UI_actions          = document.createElement("div"),
    UI_menu             = document.createElement("div");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UI Elements
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

UI_toggleHead.classList.add("live-toggle");

UI_toggleFoot.classList.add("live-toggle");

UI_optionSlow.classList.add("live-option");
UI_optionSlow.textContent = TEXT_SLOW;

UI_optionNorm.classList.add("live-option");
UI_optionNorm.classList.add("on");
UI_optionNorm.textContent = TEXT_NORMAL;

UI_optionFast.classList.add("live-option");
UI_optionFast.textContent = TEXT_FAST;

UI_options.classList.add("live-options");
UI_options.appendChild(UI_optionSlow);
UI_options.appendChild(UI_optionNorm);
UI_options.appendChild(UI_optionFast);

UI_message.classList.add("live-message");

UI_info.classList.add("live-info");
UI_info.appendChild(UI_options);
UI_info.appendChild(UI_message);

UI_actionStart.classList.add("live-action");
UI_actionStart.textContent = TEXT_START;

UI_actionStop.classList.add("live-action");
UI_actionStop.textContent = TEXT_STOP;

UI_actions.classList.add("live-actions");
UI_actions.appendChild(UI_actionStart);
UI_actions.appendChild(UI_actionStop);

UI_menu.setAttribute("hidden", "");
UI_menu.classList.add("live-menu");
UI_menu.appendChild(UI_info);
UI_menu.appendChild(UI_actions);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Page changes
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkReponse(response) {

    if (!response || !response.body) {
        STATE_FAIL_COUNT += 1;
        UI_message.textContent = TEXT_RESPONSE_ERROR;
        return;
    }

    function updatePage(posts, spacer) {

        function fullImage(img) {
            img.addEventListener("click", function() {
                this.classList.toggle("full-image");
            }, false);
        }

        function spoiler(el) {
            el.addEventListener("click", function() {
                this.classList.toggle("show");
            }, false);
        }

        var fragment = document.createDocumentFragment();

        if (spacer) {
            fragment.appendChild(spacer);
        }

        posts.forEach(function(post) {
            [].forEach.call(post.querySelectorAll("img"), fullImage);
            [].forEach.call(post.querySelectorAll(".spoiler"), spoiler);
            fragment.appendChild(post);
        });

        GAF_postsContainer.insertBefore(fragment, GAF_postsContainer.lastElementChild);

        STATE_FAIL_COUNT = 0;

        UI_message.textContent = posts.length + ((posts.length > 1) ? TEXT_POSTS_ADDED : TEXT_POST_ADDED);

        try {
            document.dispatchEvent(new CustomEvent("LiveThreadUpdate"));
        } catch (ignore) {}
    }

    function createSpacer(pagenav, url) {

        var title  = pagenav.querySelector("li[class=current] span").getAttribute("title"),
            number = pagenav.querySelector("li[class=current] strong").textContent,
            spacer = document.createElement("div"),
            page   = document.createElement("a"),
            close  = document.createElement("a");

        spacer.classList.add("live-spacer");
        spacer.appendChild(page);
        spacer.appendChild(close);

        page.classList.add("live-spacer-page");
        page.setAttribute("href", url);
        page.setAttribute("title", title);
        page.textContent = TEXT_PAGE + number;

        close.classList.add("live-spacer-close");
        close.setAttribute("title", TEXT_SPACER_CLOSE);
        close.textContent = TEXT_SPACER_CLOSE;

        close.addEventListener("click", function() {
            [].some.call(document.querySelectorAll("#posts > *"), function(node) {
                if (node !== spacer) {
                    node.parentNode.removeChild(node);
                    return false;
                }
                window.scrollTo(0, 0);
                spacer.removeChild(close);
                return true;
            });
        }, false);

        return spacer;
    }

    var newposts, newpagenav, newspacer, curposts, curpagenav, nextpage;

    try {
        newposts   = [].slice.call(response.querySelectorAll("#posts > div[id^=edit]"), 0);
        newpagenav = response.querySelectorAll(".pagenav");

        if (STATE_NEXTPAGE) {
            if (newpagenav.length) {
                newspacer = createSpacer(newpagenav[0], STATE_URL);
            }
        } else {
            curposts = document.querySelectorAll("#posts > div[id^=edit]");
            curposts = [].slice.call(curposts, Math.max(curposts.length - 100, 0));

            newposts = newposts.filter(function (a) {
                var isnew = true;
                curposts.some(function (b, i) {
                    if (a.id === b.id) {
                        if (OPTION_CHECk_EDITS
                                && !a.querySelector("form") // quick edit open
                                && !a.querySelector(".post").isEqualNode(b.querySelector(".post"))) {
                            try {
                                GAF_postsContainer.replaceChild(a, b);
                            } catch (ignore) {}
                        }
                        curposts.splice(curposts[i], 1);
                        isnew = false;
                        return true;
                    }
                    return false;
                });
                return isnew;
            });
        }

        if (newpagenav.length) {

            curpagenav = document.querySelectorAll(".pagenav");

            if (curpagenav.length) {
                if (STATE_NEXTPAGE) {
                    GAF_pagenavHead.replaceChild(newpagenav[0], curpagenav[0]);
                    GAF_pagenavFoot.replaceChild(newpagenav[1], curpagenav[1]);
                }
            } else {
                GAF_pagenavHead.appendChild(newpagenav[0]);
                GAF_pagenavFoot.appendChild(newpagenav[1]);
            }

            nextpage = newpagenav[0].querySelector("a[rel=next]");

            if (nextpage) {
                STATE_NEXTPAGE = true;
                STATE_URL = nextpage.href;
            } else {
                STATE_NEXTPAGE = false;
            }

        }

        if (!newposts.length) {
            STATE_FAIL_COUNT += 1;
            UI_message.textContent = TEXT_NO_POSTS;
        } else {
            updatePage(newposts, newspacer);
        }

    } catch (e) {
        STATE_FAIL_COUNT += 1;
        UI_message.textContent = TEXT_PARSE_ERROR;
        return;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Upate
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function confirmExit(e) {
    (e || window.event).returnValue = TEXT_CONFIRM_EXIT;
    return TEXT_CONFIRM_EXIT;
}

function updateComplete() {
    setTimeout(function() {
        STATE_PENDING = false;
        UI_message.textContent = TEXT_STOPPED;
        if (STATE_LIVE) {
            updateStart();
        }
    }, 5000);
}

function updateRequest() {

    clearInterval(STATE_TIMER);
    STATE_TIMER = null;
    STATE_PENDING = true;

    UI_actionStart.textContent = TEXT_PENDING;

    UI_message.textContent = TEXT_WAIT;

    try {
        var r = new XMLHttpRequest();
        r.open("GET", STATE_URL, true);
        r.responseType = "document";
        r.onload = function() {
            checkReponse(r.response);
            updateComplete();
        };
        r.onerror = function() {
            STATE_FAIL_COUNT += 1;
            updateComplete();
        };
        r.send(null);
    } catch (e) {
        STATE_FAIL_COUNT += 1;
        updateComplete();
    }
}

function updateStop() {

    if (!STATE_LIVE) {
        STATE_PENDING = false;
        UI_menu.setAttribute("hidden", "");
        return;
    }

    clearInterval(STATE_TIMER);
    STATE_TIMER = null;
    STATE_LIVE = false;
    STATE_FAIL_COUNT = 0;

    UI_toggleHead.classList.remove("on");
    UI_toggleFoot.classList.remove("on");

    UI_actionStart.textContent = TEXT_START;
    UI_actionStop.textContent  = TEXT_CLOSE;

    UI_message.textContent = TEXT_STOPPED;

    window.removeEventListener("beforeunload", confirmExit, false);
}

function updateTick() {

    function time(n) {
        var t = "",
            s = Math.floor(n % 60),
            m = Math.floor((n / 60) % 60);
        if (m > 1) {
            t = m + TEXT_MINUTES + " ";
        } else {
            if (m === 1) {
                t = m + TEXT_MINUTE + " ";
            }
        }
        if (s > 1) {
            t += s + TEXT_SECONDS;
        } else {
            if (s === 1) {
                t += s + TEXT_SECOND;
            }
        }
        return t;
    }

    STATE_DELAY -= 1;

    UI_message.textContent = time(STATE_DELAY);

    if (STATE_DELAY <= 0) {
        return updateRequest();
    }
}

function updateStart() {

    if (STATE_PENDING) {
        STATE_LIVE = true;
        UI_message.textContent = TEXT_SPAM;
        return;
    }

    if (STATE_FAIL_COUNT > OPTION_FAIL_LIMIT) {
        return updateStop();
    }

    if (STATE_TIMER) {
        STATE_FAIL_COUNT = 0;
        return updateRequest();
    }

    STATE_LIVE  = true;
    STATE_DELAY = STATE_INTERVAL * STATE_FAIL_COUNT || STATE_INTERVAL;
    STATE_TIMER = setInterval(updateTick, 1000);

    UI_toggleHead.classList.add("on");
    UI_toggleFoot.classList.add("on");

    UI_actionStart.textContent = TEXT_UPDATE;
    UI_actionStop.textContent  = TEXT_STOP;

    UI_message.textContent = TEXT_STARTING;

    UI_menu.removeAttribute("hidden");

    if (OPTION_CONFIRM_EXIT) {
        window.addEventListener("beforeunload", confirmExit, false);
    }
}

function updateToggle() {
    if (STATE_LIVE) {
        updateStop();
    } else {
        updateStart();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Actions
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

UI_toggleHead.addEventListener("click", updateToggle, false);
UI_toggleFoot.addEventListener("click", updateToggle, false);

UI_actionStart.addEventListener("click", updateStart, false);
UI_actionStop.addEventListener("click", updateStop, false);

UI_optionSlow.addEventListener("click", function () {
    STATE_INTERVAL = 120;
    UI_optionSlow.classList.add("on");
    UI_optionNorm.classList.remove("on");
    UI_optionFast.classList.remove("on");
}, false);

UI_optionNorm.addEventListener("click", function () {
    STATE_INTERVAL = 60;
    UI_optionSlow.classList.remove("on");
    UI_optionNorm.classList.add("on");
    UI_optionFast.classList.remove("on");
}, false);

UI_optionFast.addEventListener("click", function () {
    STATE_INTERVAL = 30;
    UI_optionSlow.classList.remove("on");
    UI_optionNorm.classList.remove("on");
    UI_optionFast.classList.add("on");
}, false);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// init
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (window.getComputedStyle(document.body, null).getPropertyValue("background-color") === "rgb(30, 30, 30)") {
    document.body.classList.add("live-dark");
}

GAF_pagenavHead.parentNode.insertBefore(UI_toggleHead, GAF_pagenavHead.parentNode.firstElementChild);
GAF_pagenavFoot.parentNode.insertBefore(UI_toggleFoot, GAF_pagenavFoot.parentNode.firstElementChild);
GAF_footerWrap.insertBefore(UI_menu, GAF_footerWrap.firstElementChild);

if (GAF_next) {
    STATE_NEXTPAGE = true;
    STATE_URL = GAF_next.href;
}

}());