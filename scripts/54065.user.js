// ==UserScript==
// @name           unixforum-compact
// @namespace      watashiwa_daredeska@unixforum.org
// @description    Делает интерфейс unixforum.org более компактным.
// @include        http://unixforum.org/index.php?*showtopic=*
// @version        0.1.13
// ==/UserScript==

function xpathList(path, root) {
    return document.evaluate(path, root, null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                             null);
}

function xpathIter(path, root) {
    return document.evaluate(path, root, null,
                             XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                             null);
}

function xpathNode(path, root) {
    return document.evaluate(path, root, null,
                             XPathResult.FIRST_ORDERED_NODE_TYPE,
                             null).singleNodeValue;
}

function nodeList2Array(nodeList) {
    var result = [];
    for (var i = 0; i < nodeList.length; i++) {
        result.push(nodeList[i]);
    }
    return result;
}

function showSig(elem, div) {
    div.style.display = "block";
    elem.addEventListener("click", function() { hideSig(elem, div); }, false);
}

function hideSig(elem, div) {
    div.style.display = "none";
    elem.addEventListener("click", function() { showSig(elem, div); }, false);
}            

function makeClickHandler(elem, div) {
    return function(event) { showSig(elem, div); }
}

function main() {
    var localPostAnchors = {};

    // Apply custom styles
    GM_addStyle(".normalname { white-space: nowrap; }");
    GM_addStyle(".postcolor p {" +
                "background: transparent;" +
                "border: 0;" +
                "margin: 12px 0;" +
                "padding: 0;}");
    GM_addStyle(".postcolor .quote {" +
                "background: #fafcfe;" +
                "border: 1px dotted black;" +
                "border-left: 4px solid #727272;" +
                "margin: 0px auto;" +
                "padding: 4px;" +
                "}");
    GM_addStyle(".postcolor .quote h3 {" +
                "background: #ececec;" +
                "border: 0;" +
                "color: black;" +
                "font-size: 10px;" +
                "font-weight: bold;" +
                "margin: -4px 0 0 -4px;" +
                "padding: 3px;" +
                "width: 100%;" +
                "}");
    GM_addStyle(".author-mark {" +
                "color: green;" +
                "font-weight: bold;" +
                "}");
    var postClasses = [".post1", ".post2", ".post1shaded", ".post2shaded"];
    for (var i = 0; i < postClasses.length; i++) {
        var postClass = postClasses[i];
        GM_addStyle(postClass + " a{color:#00e;}" + postClass +
                    "a:visited{color:#551A8B;}");
    }

    var forumPosts = xpathList(
        "//table[@class = 'ipbtable'][./tbody/tr[2]/td[1]/" +
        "span[@class='postdetails']]",
        document);

    var anchoredPost = null;

    for (var i=0; i < forumPosts.snapshotLength; i++) {
        var thisPost = forumPosts.snapshotItem(i);
        thisPost.normalize();

        // Move post detail into popup menu.
        var leftdetails = xpathNode("./tbody/tr[2]//span[@class='postdetails']",
                                    thisPost);
        var postdetails = xpathNode("./tbody/tr[1]/td[2]/div[2]//span[@class='postdetails']",
                                    thisPost);
        var user_button = xpathNode(".//div[@class = 'popmenubutton-new-out']",
                                    thisPost);

        // Set a 'Topic author' indicator.
        var author = xpathNode(".//b[string() = 'Автор темы']", leftdetails);
        if (author) {
            var author_span = document.createElement("span");
            author_span.textContent = "T";
            author_span.className = "author-mark";
            user_button.appendChild(author_span);
            author.parentNode.removeChild(author);
        }

        // Move contents to a new node except redundant BRs.
        var newItemContents = document.createElement("span");
        var children = nodeList2Array(leftdetails.childNodes);
        var empty = true;
        for (var j = 0; j < children.length; j++) {
            var node = children[j];
            if (node.nodeName == "BR") {
                if (!empty) {
                    newItemContents.appendChild(node);
                    empty = true;
                }
            } else if (node.nodeName == "#text") {
                if ((node.textContent.search(/\S/) != -1) &&
                    (node.textContent != "   :   ")) {
                    newItemContents.appendChild(node);
                    empty = false;
                }
            } else if (node.nodeName == "A") {
                if (node.textContent == "Вставить имя" ||
                    node.textContent == "Цитата") {
                    var space = document.createTextNode(" ");
                    postdetails.appendChild(space);
                    postdetails.appendChild(node);
                } else {
                    newItemContents.appendChild(node);
                    empty = false;
                }
            } else {
                newItemContents.appendChild(node);
                empty = false;
            }
        }
        var newMenuItem = document.createElement("div");
        newMenuItem.setAttribute("class", "popupmenu-item-last");
        newMenuItem.appendChild(newItemContents);

        var popupMenu = xpathNode(".//div[@class='popupmenu-new']", thisPost);
        var menuLastItem = xpathNode("./div/div[@class='popupmenu-item-last']",
                                     popupMenu);
        menuLastItem.setAttribute("class", "popupmenu-item");

        var menuContents = xpathNode("./div", popupMenu);
        menuContents.appendChild(newMenuItem);

        // Remove post details cell.
        var post = xpathNode("./tbody/tr[2]", thisPost);
        var td1 = xpathNode("./td[1]", post);
        var td2 = xpathNode("./td[2]", post);
        post.removeChild(td1);
        td2.setAttribute("colspan", "2");

        // Move links to top
        var bottomLinks = xpathList("./tbody/tr[3]/td/div/*", thisPost);
        for (var j = 0; j < bottomLinks.snapshotLength; j++) {
            var link = bottomLinks.snapshotItem(j);
            if (link.textContent == "▲" ||
                link.textContent == "+ Цитата") {
                continue;
            }
            var space = document.createTextNode(" ");
            postdetails.appendChild(space);
            postdetails.appendChild(link);
        }

        var tbody = xpathNode("./tbody", thisPost);
        var tr3 = xpathNode("./tr[3]", tbody);
        tbody.removeChild(tr3);

        // Make post header smaller
        var cells = xpathList("./tbody/tr[1]/td", thisPost);
        for (var j = 0; j < cells.snapshotLength; j++) {
            var cell = cells.snapshotItem(j);
            cell.style.padding = "1px";
        }

        // Replace header links text to smaller equivalents
        var links = xpathList(".//a", postdetails);
        for (var j = 0; j < links.snapshotLength; j++) {
            var link = links.snapshotItem(j);
            var textMap = {
                "Вставить имя": "[N]",
                "Цитата": "[Q]",
                "Модератору": "[M]",
                "Спасибо": "[+]",
                "Удалить": "[×]",
                "Редактировать": "[E]",
                "Ответ": "[R]"
            };
            var mappedText = textMap[link.textContent];
            if (mappedText) {
                link.title = link.textContent;
                link.textContent = mappedText;
            }
        }

        // Make post separator smaller
        var cells = xpathList("./tbody/tr[2]/td", thisPost);
        for (var j = 0; j < cells.snapshotLength; j++) {
            var cell = cells.snapshotItem(j);
            cell.style.borderBottom = "2px solid #727272";
        }
        var anchor = xpathNode("./tbody/tr[1]/td[1]/a", thisPost);
        localPostAnchors[anchor.getAttribute("name")] = 1;
        if ("#" + anchor.getAttribute("name") == window.location.hash) {
            var cells = xpathList("./tbody/tr[1]/td", thisPost);
            for (var j = 0; j < cells.snapshotLength; j++) {
                var cell = cells.snapshotItem(j);
                cell.style.borderTop = "2px solid #FF0000";
            }
            anchoredPost = thisPost;
        }

        var separator = xpathNode("./tbody/tr[3]", thisPost);
        separator.parentNode.removeChild(separator);

        // Hide signature
        var divSignature = xpathNode(".//div[@class = 'signature']", thisPost);
        if (divSignature && divSignature.parentNode.className != "thin") {
            var sibling = divSignature.previousSibling;
            while (sibling && !(sibling.nodeName == "DIV" && sibling.className == "postcolor")) {
                divSignature.insertBefore(sibling, divSignature.firstChild);
                sibling = divSignature.previousSibling;
            }
            divSignature.style.display = "none";
            var spanLink = document.createElement("span");
            var anchorElem = document.createElement("a");
            anchorElem.href = "javascript:void(0);";
            anchorElem.innerHTML = "[S]";
            spanLink.appendChild(anchorElem);
            postdetails.appendChild(spanLink);
            anchorElem.addEventListener("click", makeClickHandler(anchorElem, divSignature), false);
        }

        // Remove leading and trailing <BR> in rssbot's quotes
        var br = xpathNode(".//p/*[position() = 1 or last()][self::br]", thisPost);
        if (br) {
            br.parentNode.removeChild(br);
        }
    }

    // Transform every link to local post to the simplest form href="#entryDDDDDDD".
    var topicUrlRegex = /showtopic=(\d+)/;
    var topic = (function() {
        var match = location.href.match(topicUrlRegex);
        if (match) {
            return match[1];
        }
        return null;
    })();

    if (topic) {
        var postUrlDetectRegex = /^(http:\/\/unixforum\.org)?\/index\.php\?(.*&)*view=findpost/;
        var postUrlPostRegex = /[&?]p=(\d+)/;
        var anchors = xpathList("//a", document);
        for (var i = 0; i < anchors.snapshotLength; i++) {
            var anchor = anchors.snapshotItem(i);
            var match = anchor.href.match(postUrlDetectRegex);
            if (match) {
                var urlTopic = anchor.href.match(topicUrlRegex)[1];
                if (topic != urlTopic) continue;
                var urlPost = anchor.href.match(postUrlPostRegex)[1];
                if (('entry' + urlPost) in localPostAnchors) {
                    anchor.href = '#entry' + urlPost;
                    anchor.target = '';
                }
            }
        }
    }

    // Position the page on the anchor after all the mess we did.
    var anchorElement = anchoredPost ||
        xpathNode("//*[@name='" + window.location.hash.substring(1) + "']", document);
    if (anchorElement)
        anchorElement.scrollIntoView();
}

main();
