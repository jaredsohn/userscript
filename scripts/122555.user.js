// ==UserScript==
// @name Lor Flat Tree
// @match http://www.linux.org.ru/*
// ==/UserScript==

var pageToCommentMap = {}

function log_empty() {}
function log_noempty(a, b, c, d, e) {
    // for some reason console.log.apply doesn't work
    switch (arguments.length) {
    case 0: console.log(); break
    case 1: console.log(a); break
    case 2: console.log(a, b); break
    case 3: console.log(a, b, c); break
    case 4: console.log(a, b, c, d); break
    default: console.log(a, b, c, d, e); break
    }
}

var log = log_empty

function extractPageUrl(url) {
    return /^(.*?)(\?.*?)?(#.*?)?$/.exec(url)[1]
}

function extractCommentId(url) {
    return /^(.*?)(\?.*?)?(#.*?)?$/.exec(url)[3]
}

function cloneMessage(element) {
    var rv = element.cloneNode(true)
    var elements = rv.querySelectorAll("*")
    for (var i = 0; i < elements.length; ++i) {
        elements[i].removeAttribute("id")
    }
    var parentComponent = rv.querySelector(".msg > .parentComment")
    if (parentComponent != null) {
        rv.removeChild(parentComponent)
    }
    return rv
}

function installParentLinkClickHandler(msg) {
    var titleLinks = msg.querySelectorAll(".title > a")
    if (titleLinks.length == 2) {
        titleLinks[1].onclick = linkOnClick
    }
}

function parseResponse(responseText) {
    var html = document.createElement("html")
    html.innerHTML = responseText
    log(html)
    return html.querySelector(".comment")
}

function getMessageAndProcess(page, id, handleSuccess, handleError, handleProgress) {
    if (page in pageToCommentMap) {
        handleSuccess(pageToCommentMap[page].querySelector(id))
    } else {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            try {
                log("onreadystatechange", xhr.readyState)
                if (xhr.readyState == 4) {
                    log("onreadystatechange DONE", xhr.status, xhr.statusText)
                    if (xhr.status == 200) {
                        comment = parseResponse(xhr.responseText)
                        handleSuccess(comment.querySelector(id))
                        pageToCommentMap[page] = comment
                    } else {
                        handleError(xhr.status + " " + xhr.statusText)
                    }
                } else {
                    handleProgress()
                }
            } catch (e) {
                log("exception", e)
            }
        }
        xhr.open("GET", page, "true")
        xhr.send()
    }
}

function linkOnClick(event) {
    try {
        if (event.button != 0) {
            return true;
        }

        var link = event.target
        var title = link.parentElement
        var msg = title.parentElement
        var parentComment = msg.querySelector(".msg > .parentComment")
        if (parentComment == null) {
            var infoSpan = title.querySelector(".title > span.ltr-info")
            if (infoSpan == null) {
                infoSpan = document.createElement("span")
                infoSpan.setAttribute("class", "ltr-info")
                title.appendChild(infoSpan)
            }
            infoSpan.innerHTML = ""
        
            var parentMessagePage = extractPageUrl(link.href)
            var parentMessageId = extractCommentId(link.href)
            getMessageAndProcess(parentMessagePage, parentMessageId,
                function (parentMessage) {
                    var clonedMessage = cloneMessage(parentMessage)
                    installParentLinkClickHandler(clonedMessage)
                    parentComment = document.createElement("div")
                    parentComment.setAttribute("class", "parentComment")
                    parentComment.appendChild(clonedMessage)
                    msg.insertBefore(parentComment, title.nextSibling)
                    infoSpan.innerHTML = ""
                },
                function (errorText) {
                    infoSpan.innerHTML = "Error " + errorText
                },
                function () {
                    var animation = "|/-\\"
                    var current = animation.indexOf(infoSpan.innerHTML)
                    current = (current + 1) % animation.length
                    infoSpan.innerHTML = animation.substr(current, 1)
                }
            )
        } else {
            if (parentComment.style.display == "none") {
                parentComment.style.display = "block"
            } else {
                parentComment.style.display = "none"
            }
        }
        return false
    } catch (e) {
        log("exception", e)
        return false
    }
}

var messages = document.querySelectorAll(".msg")
for (var i = 0; i < messages.length; ++i) {
    installParentLinkClickHandler(messages[i])
}

var head = document.querySelector("head")
var body = document.querySelector("body")
var bgColor = window.getComputedStyle(body).getPropertyValue("background-color")
var style = document.createElement("style")
style.appendChild(document.createTextNode(
" .parentComment {                               " +
"   background-color: " + bgColor + ";           " +
"   padding: 1px 1px 1px 10px;                   " +
"   margin: 0 1px;                               " +
" }                                              " +
" .parentComment .msg {                          " +
"   margin-bottom: 0;                            " +
" }                                              "
))
head.appendChild(style)

pageToCommentMap[extractPageUrl(document.URL)] = document.querySelector(".comment")