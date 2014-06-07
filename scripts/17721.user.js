// ==UserScript==
// Script removes all the junk info like Image Upload, Registered, Total Posts etc. Removes redundant subject field. Removes all these fancy buttons and increase text size
//
//
// @name           FredMiranda-UI-fix
// @namespace      com.katkov
// @include        http://www.fredmiranda.com/forum/topic/*
// ==/UserScript==
var newContentIsShown = true;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.com_katkov_newContent { }');
addGlobalStyle('.com_katkov_newContent .userName { color:#ffffff;font-weight:bolder;font-family:verdana,Arial,Helvetica,sans-serif;font-size:14px;float:left; }');
addGlobalStyle('.toggleLink { color:#cccccc;font-size:1px;float:right; }');
addGlobalStyle('.com_katkov_oldContent {}');
addGlobalStyle('.hidden { display: none }');


function toggleFunction() {
    newContentIsShown = !newContentIsShown;
    toggleContent("com_katkov_newContent", newContentIsShown);
    toggleContent("com_katkov_oldContent", !newContentIsShown);
}

function toggleContent(className, show) {
    var findPattern = "//*[starts-with(@class,'" + className + "')]";
    var resultLinks = document.evaluate(findPattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var res;
    i = 0;
    while ((res = resultLinks.snapshotItem(i) ) != null) {
        if (show) {
            res.removeAttribute("class");
            res.setAttribute("class", className);
        } else {
            res.removeAttribute("class");
            res.setAttribute("class", className + ", hidden");
        }
        i++;
    }
}

function processLeftColumn(res) {
    var innerFindPattern = "tbody//tr//td//table//tbody//tr//td//font//span";
    var innerResultLinks = document.evaluate(innerFindPattern, res, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var j = 0;
    var innerRes;
    while ((innerRes = innerResultLinks.snapshotItem(j) ) != null) {
        var userName = innerRes.innerHTML;
        var parentTD = innerRes.parentNode.parentNode;
        parentTD.removeChild(innerRes.parentNode);
        var newContentDiv = document.createElement("div");
        newContentDiv.setAttribute("class", "com_katkov_newContent")

        var newContent_userNameSpan = document.createElement("span");
        newContent_userNameSpan.setAttribute("class", "userName")
        newContent_userNameSpan.innerHTML = userName;
        newContentDiv.appendChild(newContent_userNameSpan);

        var newContent_userToogleLink = document.createElement("a");
        newContent_userToogleLink.setAttribute("class", "toggleLink")
        newContent_userToogleLink.setAttribute("href", "javascript:void(0)")
        newContent_userToogleLink.appendChild(document.createTextNode("x"));
        newContent_userToogleLink.addEventListener("click", toggleFunction, true);
        parentTD.appendChild(newContent_userToogleLink);


        parentTD.appendChild(newContentDiv);

        var oldContentDiv = document.createElement("div");
        oldContentDiv.setAttribute("class", "com_katkov_oldContent, hidden")
        oldContentDiv.innerHTML = innerRes.parentNode.innerHTML;
        parentTD.appendChild(oldContentDiv);
        j++;
    }
}


function processRightColumn(res) {
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/post.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/email2.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/profile.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/sendpm.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/posts.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/mainpage.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/buddy.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//img[@src='http://www.fredmiranda.com/forum/images/report.gif']");
    removeElement(res, "tbody//tr//td//table//tbody//tr//td//font[@color='#ababab']");
}

function removeElement(res, pattern) {
    var innerResultLinks = document.evaluate(pattern, res, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var j = 0;
    var innerRes;
    while ((innerRes = innerResultLinks.snapshotItem(j) ) != null) {
        innerRes.setAttribute("class", "com_katkov_oldContent, hidden")
        j++;
    }

}

function replaceFont() {
    var findPattern = "//font[@face='Geneva, Verdana, Arial, Helvetica, sans-serif' and @size=2]";
    var resultLinks = document.evaluate(findPattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var res;
    i = 0;
    while ((res = resultLinks.snapshotItem(i) ) != null) {
        res.setAttribute("face", "Verdana, Arial, Helvetica, sans-serif");
        res.setAttribute("size", "3");
        i++;
    }
}

var findPattern = "//html//body//p//table";
var resultLinks = document.evaluate(findPattern, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var i = 5;
var res;
while ((res = resultLinks.snapshotItem(i) ) != null) {
    i++;
    processLeftColumn(res);
    processRightColumn(res);
}
replaceFont();