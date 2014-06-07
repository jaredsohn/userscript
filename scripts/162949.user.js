// ==UserScript==
// @name            Scripps Newspapers Troll Comment Blocker
// @namespace       ScrippsTrollBlocker
// @description	    Block comments from trolls on Scripps newspaper sites, including GoVolsXtra and KnoxNews
// @version         1.0.0
// @updateURL       https://userscripts.org/scripts/source/162949.user.js
// @downloadURL     https://userscripts.org/scripts/source/162949.user.js
// @include         http://www.knoxnews.com/*
// @include         http://www.govolsxtra.com/*
// @include         http://www.commercialappeal.com/*
// @include         http://www.kitsapsun.com/*
// @include         http://www.courierpress.com/*
// @include         http://www.independentmail.com/*
// @include         http://www.tcpalm.com/*
// @include         http://www.naplesnews.com/*
// @include         http://www.caller.com/*
// @include         http://www.gosanangelo.com/*
// @include         http://www.reporternews.com/*
// @include         http://www.timesrecordnews.com/*
// @include         http://www.vcstar.com/*
// @include         http://www.redding.com/*
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==
if (typeof unsafeWindow != "undefined")
{
    console = unsafeWindow.console;
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported") > -1))
{
    this.GM_getValue = function (key, def)
    {
        return localStorage[key] || def;
    };
    this.GM_setValue = function (key, value)
    {
        return localStorage[key] = value;
    };
    this.GM_deleteValue = function (key)
    {
        return delete localStorage[key];
    };
}

var blocked = "nope";
var banned = "nope";
var lastBlocked = "nope";
var authorList;
var lastDisplayedCommentStyle;
var commentPagesSelectHTML;
var commentPagesSelectInt;
var commentTitleBar;

function saveList()
{
    if (lastBlocked != "nope")
    {
        GM_setValue("gvxLastBlockedAuthor", lastBlocked);
    }
    else
    {
        console.log("no last blocked to save");
    }

    if (blocked != "nope")
    {
        GM_setValue("gvxBlockedAuthors", blocked);
    }
    else
    {
        console.log("no blocked list to save");
    }

    if (banned != "nope")
    {
        GM_setValue("gvxBannedAuthors", banned);
    }
    else
    {
        console.log("no banned list to save");
    }
}

function unblockAuthorButton()
{
    var author = this.getAttribute("author");
    if (!author)
    {
        var author = prompt("Could not get author to unblock. Please write authors name to unblock:", lastBlocked);
    }
    if (!author)
    {
        return;
    }

    blocked = blocked.replace(author + ";", "");
    saveList();
    console.log(author + " is now unblocked");
    refreshBlockedAuthorList();
    filter();
}

function blockAuthor()
{
    var author = this.getAttribute("author");
    if (!blocked.match(";" + author + ";"))
    {
        blocked += author + ";";
        lastBlocked = author;
        saveList();
        console.log(author + " is now ignored");
    }

    saveList();
    refreshBlockedAuthorList();
    filter();
}

function banAuthor()
{
    var author = this.getAttribute("author");
    if (!banned.match(";" + author + ";"))
    {
        blocked = blocked.replace(author + ";", "");
        banned += author + ";";
        lastBlocked = author;
        saveList();
        console.log(author + " is now banned");
    }

    saveList();
    refreshBlockedAuthorList();
    filter();
}

function unblockAuthor()
{
    var author = document.querySelector("#GVXblockAuthorList").value;
    console.log("unblocking " + author);
    if (!author)
    {
        author = prompt("Could not get author to unblock. Please write authors name to unblock:", lastBlocked);
    }

    if (!author)
    {
        return;
    }

    if (blocked.match(author))
    {
        blocked = blocked.replace(author + ";", "");
    }
    else if (banned.match(author))
    {
        banned = banned.replace(author + ";", "");
    }

    saveList();
    console.log(author + " is now unignored/unbanned");
    refreshBlockedAuthorList();
    filter();
}

function refreshBlockedAuthorList()
{
    var blockedAuthors = (blocked + banned).split(";");
    authorList = document.querySelector("#GVXblockAuthorList");
    authorList.options.length = 0;

    for (x = 0; x < blockedAuthors.length - 1; x++)
    {
        document.querySelector("#GVXblockAuthorList").add(new Option(blockedAuthors[x], blockedAuthors[x]));
    }

    authorList.selectedIndex = 0;
}

function importList()
{
    var newList = prompt("Paste your exported ignored list here:");
    if (newList)
    {
        blocked = newList;
    }

    var newBanList = prompt("Paste your exported banned list here:");
    if (newBanList)
    {
        banned = newBanList;
    }

    saveList();
    refreshBlockedAuthorList();
    filter();
}

function exportList()
{
    prompt("Here is your exported ignored list:", blocked);
    prompt("Here is your exported banned list:", banned);
}

function createButton(author, after, value, callback, cls)
{
    if (!value)
    {
        return;
    }

    var button = document.createElement("a");
    button.setAttribute("class", (cls ? cls + " eab" : "gvxAuthorBlocker eab"));
    button.setAttribute("author", author);
    button.innerHTML = " " + value + " ";
    after.appendChild(button, after);
    button.addEventListener("click", callback, false);
    button = null;
}

function setCommentStyle(message)
{
    if (lastDisplayedCommentStyle == "comment_wrapper_even")
    {
        message.setAttribute("class", (message.getAttribute("class").replace("comment_wrapper_even", "comment_wrapper_odd")));
        lastDisplayedCommentStyle = "comment_wrapper_odd";
    }
    else
    {
        message.setAttribute("class", (message.getAttribute("class").replace("comment_wrapper_odd", "comment_wrapper_even")));
        lastDisplayedCommentStyle = "comment_wrapper_even";
    }
}

function UnhideQuote()
{
    var quote = document.getElementById(this.id);

    var nextElementSibling = quote.parentNode.nextElementSibling;
    while (nextElementSibling)
    {
        nextElementSibling.style.display = "";
        nextElementSibling = nextElementSibling.nextElementSibling;
    }

    quote.parentNode.removeChild(quote);
}

function handleMessage(message)
{
    var authorDiv = message.querySelector(".author");
    if (!authorDiv)
    {
        console.log("could not process message");
        return;
    }

    var a = authorDiv.querySelector("a");
    var controls = authorDiv.querySelector(".controls");
    if (!controls)
    {
        var div = document.createElement("div");
        div.setAttribute("class", "controls");
        div.setAttribute("style", "float:right;");
        controls = div;
        a.parentNode.appendChild(div, a.parentNode);
        div = null;
    }
    else
    {
        controls.innerHTML = "";
    }

    var display = message.querySelector(".comment-content").style.display;
    if (blocked.match(";" + authorDiv.querySelector("a").textContent + ";"))
    {
        message.querySelector(".comment-content").style.display = "none";
        var quote = message.querySelector(".comment-quote");
        if (quote)
        {
            quote.style.display = "none";
        }

        if (!authorDiv.querySelector('.gvxAuthorUnBlock'))
        {
            createButton(a.textContent, controls, "Unblock", unblockAuthorButton, "gvxAuthorUnBlock");
        }
        if (!authorDiv.querySelector(".gvxAuthorBan"))
        {
            createButton(a.textContent, controls, "Ban", banAuthor, "gvxAuthorBan");
        }
        if (authorDiv.querySelector(".gvxAuthorBlocker"))
        {
            authorDiv.removeChild(controls.querySelector(".gvxAuthorBlocker"));
        }

        setCommentStyle(message);
    }
    else if (banned.match(";" + a.textContent + ";"))
    {
        message.style.display = "none";
    }
    else
    {
        if ((display == "") && (message.querySelector(".gvxAuthorBlocker")))
        {
            return;
        }

        message.style.display = "";
        message.querySelector(".comment-content").style.display = "";

        var quote = message.querySelector(".comment-quote");
        if (quote)
        {
            quote.style.display = "";

            var quotedAuthor = "";
            if (quote.querySelector("a"))
            {
                quotedAuthor = quote.querySelector("a").textContent;
            }

            if (blocked.match(";" + quotedAuthor + ";"))
            {
                var quote = message.querySelector(".comment-response_to");
                if (quote)
                {
                    var nextElementSibling = quote.nextElementSibling;
                    while (nextElementSibling)
                    {
                        nextElementSibling.style.display = "none";
                        nextElementSibling = nextElementSibling.nextElementSibling;
                    }

                    var showIgnoredQuote = quote.querySelector(".showIgnoredQuote");
                    if (!showIgnoredQuote)
                    {
                        var button = document.createElement("a");
                        button.id = "ignoredQuote" + message.id;
                        button.setAttribute("class", "showIgnoredQuote");
                        button.innerHTML = " (Show ignored quote)";
                        button.style.fontStyle = "italic";
                        button.addEventListener("click", UnhideQuote, false);
                        quote.appendChild(button, quote);
                        button = null;
                    }
                }
            }
            else if (banned.match(";" + quotedAuthor + ";"))
            {
                quote.style.display = "none";
            }
            else
            {
                quote.style.display = "";

                var blockedQuote = quote.querySelector(".showIgnoredQuote");
                if (blockedQuote)
                {
                    blockedQuote.parentNode.removeChild(blockedQuote);
                }

                var quote = message.querySelector(".comment-response_to");
                if (quote)
                {
                    var nextElementSibling = quote.nextElementSibling;
                    while (nextElementSibling)
                    {
                        nextElementSibling.style.display = "";
                        nextElementSibling = nextElementSibling.nextElementSibling;
                    }
                }
            }
        }

        if (authorDiv.querySelector(".gvxAuthorBan"))
        {
            authorDiv.removeChild(controls.querySelector(".gvxAuthorBan"));
        }
        if (authorDiv.querySelector(".gvxAuthorUnBlock"))
        {
            authorDiv.removeChild(controls.querySelector(".gvxAuthorUnBlock"));
        }
        if (!message.querySelector(".gvxAuthorBlocker"))
        {
            createButton(a.textContent, controls, "Ignore", blockAuthor);
        }

        setCommentStyle(message);
    }

    a = null;
    controls = null;
    message = null;
    authorDiv = null;
}

function filter()
{
    lastDisplayedCommentStyle = "comment_wrapper_odd";

    var comments = document.getElementById("comment_list");
    if (comments)
    {
        var messages = comments.querySelectorAll(".comment_wrapper");
        for (i = 0; i < messages.length; i++)
        {
            handleMessage(messages[i]);
        }
    }

    messages = null;
}

function commentPagesSelectWatcher()
{
    if (commentTitleBar)
    {
        var commentPagesSelect = commentTitleBar.querySelector(".comments_pages_select");
        if (commentPagesSelect)
        {
            if (commentPagesSelect.innerHTML != commentPagesSelectHTML)
            {
                commentPagesSelectHTML = commentPagesSelect.innerHTML;
                clearInterval(commentPagesSelectInt);
                start();
            }
        }
    }
}

function start()
{
    if (document)
    {
        if (document.getElementById("comments"))
        {
            startInt = clearInterval(startInt);

            blocked = GM_getValue("gvxBlockedAuthors", ";");
            lastBlocked = GM_getValue("gvxLastBlockedAuthor", "");
            banned = GM_getValue("gvxBannedAuthors", ";");

            var topMargin = 4;
            var leftMargin = 16;
            var bottomMargin = 0;

            commentTitleBar = document.querySelector(".comment_pagination_placeholder");
            if (commentTitleBar != null)
            {
                commentTitleBar.style.height = "24px";
            }
            else
            {
                commentTitleBar = document.querySelector(".pagination");
                topMargin = 0;
                leftMargin = 153;
                bottomMargin = 2;

                var commentPagesSelect = commentTitleBar.querySelector(".comments_pages_select");
                if (commentPagesSelect)
                {
                    commentPagesSelectHTML = commentPagesSelect.innerHTML;
                    commentPagesSelectInt = setInterval(commentPagesSelectWatcher, 500);
                }
            }

            authorList = document.createElement("select");
            authorList.setAttribute("id", "GVXblockAuthorList");
            authorList.style.width = "200px";
            authorList.style.lineHeight = "30px";
            authorList.style.marginTop = "" + topMargin + "px" + "";
            authorList.style.marginLeft = "" + leftMargin + "px" + "";
            authorList.style.marginBottom = "" + bottomMargin + "px" + "";
            commentTitleBar.appendChild(authorList, commentTitleBar);
            refreshBlockedAuthorList();

            createButton("none", commentTitleBar, "Unblock", unblockAuthor);
            createButton("none", commentTitleBar, "Export", exportList);
            createButton("none", commentTitleBar, "Import", importList);

            filter();
        }
    }
}

var startInt = setInterval(start, 500);