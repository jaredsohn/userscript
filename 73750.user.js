// ==UserScript==
// @name           Improved Fobo.ru
// @description    Aids visitors of the forum fobo.ru by enhancing their user experience and improving usability
// @namespace      JackJack
// @include        http://fobo.ru/modules/post/manage.php?postId=*
// @include        http://fobo.ru/showthread.php?*
// @include        http://www.fobo.ru/modules/post/manage.php?postId=*
// @include        http://www.fobo.ru/showthread.php?*
// @scriptVersion  1.1.1
// @copyright      Copyright © 2010, JackJack of Fobo.ru
// ==/UserScript==


// ===== Settings =====

var hideSignaturesFromPosts = true; // Whether to hide user's signatures from posts
var makePostsCollapsible = true; // Whether individual posts can be collapsed/expanded
var persistCollapsibility = true; // Whether to persist collapsed state of posts
var useKeyboardForNavigation = true; // Whether to use keyboard to select thread's pages
var collapseBadPosts = true; // Whether bad posts should be collapsed
var highlightGoodPosts = true; // Whether good posts should be highlighted
var highlightNewPosts = true; // Whether new (recent) posts should be highlighted
var badPostRatingThreshold = -10; // If the post has this rating or less, it is considered bad
var goodPostRatingThreshold = +10; // If the post has this rating or more, it is considered good
var useOldFashionStorage = null; // Whether to use Greasemonkey's storage instead of Firefox's one (null means auto-determine)
var topStickyPostAction = 1; // What to do with the sticky post on every page except the first: 0 = nothing, 1 = collapse, 2 = remove
var hideUsersAvatars = false; // Whether to hide all users' avatars
var removeReportViolationLinks = true; // Determines whether to remove "Report Violation" links
var originalAlternatingBackground = true; // Whether background colors of each post should be alternated
var postsWidthConstrainingType = 1; // How to react when posts are too wide: 0 = do nothing, 1 = restrict width, 2 = add horz scrollbar
var removeDuplicatePosts = true; // Whether to remove posts with duplicate Ids


// ===== Utility Functions =====

String.prototype._split=String.prototype.split;Number.prototype.clamp=function(l,u){return Math.max(l,Math.min(this,u))}
String.prototype.lower=function(){return this.toLowerCase()};String.prototype.upper=function(){return this.toUpperCase()
};String.prototype.trim=function(){var w=" \n\r\t",s=0,e=this.length-1;for(;e+1;--e)if(w.indexOf(this[e])<0)break;for(;s
<=e;++s)if(w.indexOf(this[s])<0)break;return(s>e)?"":((s||e+1!=this.length)?this.substr(s,e+1-s):this)};Number.prototype
.toHexString=function(w){if(w==undefined)w=1;var s=this.toString(16).upper();while(s.length<w)s="0"+s;return s};String.
prototype.split=function(d,l){var s=this._split(d);if(l&&s.length>l)s.push(s.splice(l-1).join(d));return s}
function stripPrefix(t,p){return(t.indexOf(p))?null:t.substr(p.length)}function selectSingleNode(p,c,d){if(!d)d=document
;var n=d.evaluate(p,(c)?c:d,null,XPathResult.ANY_TYPE,null).iterateNext();return n}function removeAllChildren(e){var c=e
.childNodes,i;for(i=c.length-1;i>=0;--i)e.removeChild(c[i])}function removeChildNode(n){if(n)n.parentNode.removeChild(n)
}function selectNodes(p,c){return document.evaluate(p,(c)?c:document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
}function findPreviousTextNodeWithText(e,t){for(e=e.previousSibling;e&&e.nodeType!=3&&e.nodeType!=1;e=e.previousSibling)
;return(e&&e.nodeType==3&&e.nodeValue.indexOf(t)>=0)?e:null}function getAllElementsByTagName(p,t){t=t.lower();var e=[],c
=p.childNodes,i,n;for(i=0;i<c.length;++i){n=c[i];if(n.nodeType==1&&n.tagName.lower()==t)e.push(n)}return e}function
insertNodeAfter(n,r){var s=r.nextSibling,p=r.parentNode;if(s)p.insertBefore(n,s);else p.appendChild(n);return n}function
getParameterValueFromURL(u,n){var i=u.indexOf(n+"=");if(i>0&&(u[i-1]=='?'||u[i-1]=='&')||!i){var e=u.indexOf("&",i+=n.
length+1);return u.substring(i,(e<0)?u.length:e)}return null}function getElementByTagName(p,n,x){if(!x)x=0;n=n.lower();
for(var i=0;i<p.childNodes.length;++i){var e=p.childNodes[i];if(e.nodeType==1&&e.tagName.lower()==n&&!x--)return e}
return null}

function Color(r,g,b){this.R=function(){return Math.round(this.red*255).clamp(0,255)};this.G=function(){return Math.
round(this.green*255).clamp(0,255)};this.B=function(){return Math.round(this.blue*255).clamp(0,255)};this.clamp=function
(){this.red=this.red.clamp(0,1);this.green=this.green.clamp(0,1);this.blue=this.blue.clamp(0,1);return this};this.
multiply=function(c){this.red*=c.red;this.green*=c.green;this.blue*=c.blue;return this.clamp()};this.screen=function(c){
this.red+=c.red;this.green+=c.green;this.blue+=c.blue;return this.clamp()};this.toCSS=function(){return "#"+this.R().
toHexString(2)+this.G().toHexString(2)+this.B().toHexString(2)};this.red=(r!=undefined)?r:0;this.green=(g!=undefined)?g:
0;this.blue=(b!=undefined)?b:0;this.clamp()};function colorFromRGB(r,g,b){return new Color(r/255.0,g/255.0,b/255.0)}
function colorFromRGBColor(c){var u=c.red.CSS_NUMBER;return colorFromRGB(c.red.getFloatValue(u),c.green.getFloatValue(u)
,c.blue.getFloatValue(u))}
function Parameters(){this.l=[];this.m=[];this.isNumber=function(k){return"number"==typeof this.m[k]};this.get=function(
k){return this.m[k]};this.count=function(){return this.l.length};this.contains=function(k){return this.m[k]!=undefined};
this.getAsInt=function(k,d){return this.isNumber(k)?Math.round(this.m[k]):(d!=undefined?d:null)};this.store=function(k,v
){if(typeof v!="undefined"){if(!this.contains(k))this.l.push(k);this.m[k]=v}};this.isEmpty=function(){return!this.count(
)};this.remove=function(k){if(this.contains(k))for(var i=0;i<this.count();++i)if(this.l[i]==k){this.l.splice(i,1);delete
this.m[k];break}};this.parse=function(d){var e=d.split(";"),j,s;for(j=0;j<e.length;++j){s=e[j].split("=",2);if(s.length<
2)continue;var k=s[0].trim(),v=s[1].trim();if(!k.indexOf("this."))k=k.substr(5);if(!k.length||!v.length)continue;if(v.
length>1&&v[0]==v[v.length-1]&&(v[0]=="'"||v[0]=='"'))v=v.slice(1,-1);else if(v=="true"||v=="false")v=(v=="true");else
if(v=="null")v=null;else{v=v.lower();var i=parseInt(v),f=parseFloat(v);if(!isNaN(i))v=isNaN(f)||(v.indexOf(".")<0&&v.
indexOf("e")<0)?i:f;else if(isNaN(f))continue;else v=f}this.store(k,v)}};this.toString=function(w){var s="",i;for(i=0;i<
this.count();++i){var k=this.l[i],v=this.m[k];s+=(w?"this.":"")+k+"="+(typeof v=="string"?('"'+v+'"'):v)+";"}return s}}


// ===== Visual Customizations =====

var goodPostHighlight = {
    general:{multiply:new Color(1,1,0.53112)},
    link:{multiply:new Color(1,1)},
    linkHover:{multiply:new Color(0.6875,0.6875)},
    postbitLinkClass:["postbitHlGoodEvn","postbitHlGoodOdd"]
};
var newPostHighlight = {
    general:{multiply:new Color(0.79668,1,0.79668)},
    link:{multiply:new Color(0,1)},
    linkHover:{multiply:new Color(0,0.6875)},
    postbitLinkClass:["postbitHlNewEvn","postbitHlNewOdd"]
};


var isEditingArea = false;
var isThreadPage = false;
var isPostEditingPage = false;
var isThreadLocked = false;
var isGoToLastPost = false;
var threadId = null;
var pageNumber = null;
var pageNavigatorParams = new Parameters();
var pagePostsIds = [];
var firstNewPostIdx = -1;


// ===== Fobo.ru-specific Utility Functions =====

function /*String*/ getLinkFromComment(/*String*/ c) {
    var i = c.indexOf('href="');

    if (i+1) c = c.substr(i+6);

    i = c.indexOf('"');
    return (i+1) ? c.substr(0, i) : null
}

var collapsedPosts = [];
var collapsedPostsStr = null;

function savePostsCollapseState(tid) {
    if (!useOldFashionStorage && window.localStorage) {
        var settingName = "JackJack.ifobo.coll." + tid;

        if (collapsedPostsStr.length)
            window.localStorage.setItem(settingName, collapsedPostsStr);
        else window.localStorage.removeItem(settingName)
    } else if (GM_setValue && GM_deleteValue) {
        var settingName = "coll." + tid;

        if (collapsedPostsStr.length)
            GM_setValue(settingName, collapsedPostsStr);
        else GM_deleteValue(settingName);

        GM_setValue("collapsedPostsStateWasSavedInGM", true)
    }
}

function isPostCollapsed(pid) {return collapsedPosts[pid]}

function savePostCollapsed(/*String*/ pid, /*boolean*/ isCollapsed) {
    if (isCollapsed == isPostCollapsed(pid)) return;

    if (!isCollapsed) {
        collapsedPostsStr = "," + collapsedPostsStr + ",";

        var idx = collapsedPostsStr.indexOf("," + pid + ",");

        if(idx+1) collapsedPostsStr = collapsedPostsStr.substr(0, idx+1) + collapsedPostsStr.substr(idx + pid.length+2);

        collapsedPostsStr = collapsedPostsStr.slice(1, -1);
        collapsedPosts[pid] = null
    } else {
        collapsedPostsStr += (collapsedPostsStr.length?",":"") + pid;
        collapsedPosts[pid] = true
    }

    if (isThreadPage && threadId) savePostsCollapseState(threadId)
}

function savePostsCollapsed(/*Array*/ pids, /*boolean*/ isCollapsed) {
    if (!isCollapsed) {
        collapsedPostsStr = "," + collapsedPostsStr + ",";

        for (var i = 0; i < pids.length; ++i) {
            if (!isPostCollapsed(pids[i])) continue;

            var idx = collapsedPostsStr.indexOf("," + pids[i] + ",");

            if (idx+1)
                collapsedPostsStr =
                    collapsedPostsStr.substr(0, idx+1) + collapsedPostsStr.substr(idx + pids[i].length+2);

            collapsedPosts[pids[i]] = null
        }

        collapsedPostsStr = collapsedPostsStr.slice(1, -1)
    } else
        for (var i = 0; i < pids.length; ++i)
            if (!isPostCollapsed(pids[i])) {
                collapsedPostsStr += ((collapsedPostsStr.length > 0) ? "," : "") + pids[i];
                collapsedPosts[pids[i]] = true
            }

    if (isThreadPage && threadId) savePostsCollapseState(threadId)
}

function removePostFromPage(/*String*/ postId, /*[otptional] int*/ index) {
    var postContent = null;

    if (index) {
        var posts = selectNodes("//table[@id='postContainer_" + postId + "']");

        if (index < posts.snapshotLength) postContent = posts.snapshotItem(index)
    } else postContent = document.getElementById("postContainer_" + postId)

    if (!postContent) return;

    var prevDiv = postContent.previousSibling;

    while (prevDiv && prevDiv.nodeType != 1) prevDiv = prevDiv.previousSibling;

    if (prevDiv && prevDiv.tagName.lower() == "div") removeChildNode(prevDiv);
    removeChildNode(postContent)
}

function /*String*/ applyHighlight(/*CSSStyleDeclaration*/ style, /*String*/ name, /*[optional] Object*/ d) {
    var v = style.getPropertyCSSValue(name);

    if (!v || v.primitiveType != v.CSS_RGBCOLOR) return "transparent";

    var c = colorFromRGBColor(v.getRGBColorValue());

    if (!d) return c.toCSS();
    if (!d.reverse) {
        if (d.multiply) c.multiply(d.multiply);
        if (d.screen) c.screen(d.screen)
    } else {
        if (d.screen) c.screen(d.screen);
        if (d.multiply) c.multiply(d.multiply)
    }

    return c.toCSS()
}

function isOnFirstPage() {return(!pageNumber||pageNumber<2)}

function isOnLastPage() {
    var cnt = pageNavigatorParams.getAsInt("pageCount");
    return !pageNumber || !cnt || pageNumber >= cnt
}

// ==========================================================================


function /*String*/ determineThreadId() {
    var tempThreadId = getParameterValueFromURL(window.location.href, "threadid");

    if (tempThreadId && tempThreadId.length != 0) {
        return tempThreadId;
    }

    var templateDiv = document.getElementById("tPageNavigatorPage");

    if (templateDiv) {
        var linkInside = getLinkFromComment(templateDiv.innerHTML.toString());

        tempThreadId = (linkInside) ? getParameterValueFromURL(linkInside, "threadid") : null;

        if (tempThreadId && tempThreadId.length > 0) {
            return tempThreadId;
        }
    }

    var threadVoteLink = selectSingleNode("//a[@class='threadVoteLink'][contains(@href, 'threadId=')]");

    if (threadVoteLink) {
        tempThreadId = getParameterValueFromURL(threadVoteLink.href, "threadId");
        if (tempThreadId && tempThreadId.length > 0) {
            return tempThreadId;
        }
    }

    var threadRating = selectSingleNode("//span/@id[starts-with(../@id, 'threadRating')]");

    if (threadRating) {
        tempThreadId = stripPrefix(threadRating.nodeValue, "threadRating");
        if (tempThreadId) {
            return tempThreadId;
        }
    }

    var formField = selectSingleNode("//form/input[@type='hidden'][@name='threadid'][@value]");

    if (formField && formField.value && formField.value.length > 0) {
        return formField.value;
    }

    return null;
}

function obtainPageNavigatorParameters(/*[in/out] Parameters*/ params, /*Element*/ node, /*Document*/ doc) {
    if (node) {
        var comment = selectSingleNode("comment()", node, doc);

        if (comment) {
            node = comment;
        }
    }

    if (node) {
        params.parse((node.nodeValue) ? node.nodeValue : node.textContent);
    }
}

function /*Integer*/ determineCurrentPageNumber() {
    if (!isThreadPage || !threadId) {
        return null;
    }

    obtainPageNavigatorParameters(pageNavigatorParams, document.getElementById("tPageNavigatorParameters"));

    var pageNum = pageNavigatorParams.getAsInt("currentPage");

    if (pageNum) {
        return pageNum;
    }

    pageNum = getParameterValueFromURL(window.location.href, "pagenumber");

    if (pageNum && pageNum.length > 0) {
        var pageNumber = parseInt(pageNum, 10);

        if (!isNaN(pageNumber)) {
            return pageNumber;
        }
    }

    return null;
}

function determineIdsOfAllPostsOnPage() {
    if (!isThreadPage) {
        return;
    }

    var postIds = selectNodes("//table/@id[starts-with(../@id, 'postContainer_')]");
    var knownIds = [];

    for (var i = 0; i < postIds.snapshotLength; ++i) {
        var postId = stripPrefix(postIds.snapshotItem(i).textContent, "postContainer_");

        if (!knownIds[postId]) {
            pagePostsIds.push(postId);
            knownIds[postId] = true;
        } else if (removeDuplicatePosts) {
            removePostFromPage(postId, 1);
        }
    }
}

function /*boolean*/ shouldGoToLastPost() {
    if (!isThreadPage) {
        return false;
    }

    var action = getParameterValueFromURL(window.location.href, "action");
    var postId = getParameterValueFromURL(window.location.href, "postid");

    return (action == "gotoPost" && postId == "lastpost");
}

function /*int*/ findFirstNewPost() {
    for (var i = 0; i < pagePostsIds.length; ++i) {
        var postCont = document.getElementById("postContainer_" + pagePostsIds[i]);

        if (postCont && selectSingleNode(".//a[@name='newpost']", postCont)) {
            return i;
        }
    }

    return -1;
}

function determineCurrentContext() {
    isEditingArea = (selectSingleNode("/html/head/title") == null);
    if (isEditingArea) {
        return;
    }

    isPostEditingPage = !!(window.location.href.indexOf("modules/post/manage.php?postId=")+1);
    isThreadPage = !isPostEditingPage; // this might change in the future
    threadId = determineThreadId();
    pageNumber = determineCurrentPageNumber();
    determineIdsOfAllPostsOnPage();

    if (isThreadPage || isPostEditingPage) {
        isThreadLocked = !document.getElementById("newReplyForm");
    }

    isGoToLastPost = shouldGoToLastPost();
    if (isGoToLastPost) {
        firstNewPostIdx = findFirstNewPost();
    }
}

function loadPostsCollapseState(/*String*/ tid) {
    if (!useOldFashionStorage && window.localStorage) {
        collapsedPostsStr = window.localStorage.getItem("JackJack.ifobo.coll." + tid);
    }

    if (!collapsedPostsStr && GM_getValue) {
        collapsedPostsStr = GM_getValue("coll." + tid);

        if (!useOldFashionStorage && window.localStorage && collapsedPostsStr != null) {
            window.localStorage.setItem("JackJack.ifobo.coll." + tid, collapsedPostsStr);
        }
    }

    if (collapsedPostsStr) {
        var posts = collapsedPostsStr.split(",");

        for (var i = 0; i < posts.length; ++i) {
            collapsedPosts[posts[i]] = true;
        }
    } else {
        collapsedPostsStr = "";
    }
}

function loadSettings() {
    if (GM_getValue && GM_setValue && GM_deleteValue) {
        hideSignaturesFromPosts = GM_getValue("hideSignatures", hideSignaturesFromPosts);
        makePostsCollapsible = GM_getValue("addCollapsibility", makePostsCollapsible);
        useKeyboardForNavigation = GM_getValue("enableKeyboardNavigation", useKeyboardForNavigation);
        collapseBadPosts = GM_getValue("collapseBadPosts", collapseBadPosts);
        highlightGoodPosts = GM_getValue("highlightGoodPosts", highlightGoodPosts);
        highlightNewPosts = GM_getValue("highlightNewPosts", highlightNewPosts);
        badPostRatingThreshold = GM_getValue("ratingThreshold.badPost", badPostRatingThreshold);
        goodPostRatingThreshold = GM_getValue("ratingThreshold.goodPost", goodPostRatingThreshold);
        topStickyPostAction = GM_getValue("topStickyPostAction", topStickyPostAction);
        hideUsersAvatars = GM_getValue("hideUsersAvatars", hideUsersAvatars);
        removeReportViolationLinks = GM_getValue("removeReportViolationLinks", removeReportViolationLinks);
        originalAlternatingBackground = GM_getValue("originalAlternatingBackground", originalAlternatingBackground);
        postsWidthConstrainingType = GM_getValue("postsWidthConstrainingType", postsWidthConstrainingType);
        removeDuplicatePosts = GM_getValue("removeDuplicatePosts", removeDuplicatePosts);

        useOldFashionStorage = GM_getValue("useOldFashionStorage", useOldFashionStorage);

        if (useOldFashionStorage == null) {
            useOldFashionStorage = (window.localStorage && GM_getValue("collapsedPostsStateWasSavedInGM", false));
        }
    }

    if (isThreadPage && threadId) {
        loadPostsCollapseState(threadId);
    }
}

function /*String*/ prepareFirstPageURL(/*integer*/ numPostsPerPage) {
    return window.location.protocol + "//" + window.location.host + "/showthread.php/?threadid=" +
            threadId + "&perpage=" + numPostsPerPage;
}

function /*String*/ prepareForParsing(/*String*/ html) {
    html = html.replace(/&/g, "&amp;");

    var s = html.indexOf("<!DOCTYPE");
    var e = html.indexOf('<div class="footer">');

    return html.substring(Math.max(0, s), (e < 0) ? html.length : e) + ((e+1) ? "</body></html>" : "");
}

function startStickyPostRequest() {
    if (!isThreadPage || !threadId || pagePostsIds.lentgh < 1 || isOnFirstPage() || topStickyPostAction == 0) {
        return;
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: prepareFirstPageURL(2),
        onload: function(response) {
            if (response.status != 200) {
                return;
            }

            var doc = new DOMParser().parseFromString(prepareForParsing(response.responseText), "text/xml");
            var id = selectSingleNode("//table/@id[starts-with(../@id, 'postContainer_')]", doc, doc);

            if (!id) {
                return;
            }

            id = stripPrefix(id.nodeValue, "postContainer_");

            if (id == pagePostsIds[0]) {
                switch (topStickyPostAction) {
                    case 0:
                        break;

                    case 1:
                        expandCollapsePost(id, false, false);
                        break;

                    case 2:
                        removePostFromPage(id);
                        pagePostsIds[0] = null;
                        break;
                }
            }
        }
    });
}

function restoreStripyPosts() {
    if (!isThreadPage || !originalAlternatingBackground) {
        return;
    }

    for (var i = 0; i < pagePostsIds.length; ++i) {
        var postContainer = document.getElementById("postContainer_" + pagePostsIds[i]);

        if (!postContainer) {
            continue;
        }

        var cells = selectNodes("(.//tr/td|.//tr)[contains(@style, 'background-color')]", postContainer);

        for (var j = 0; j < cells.snapshotLength; ++j) {
            cells.snapshotItem(j).style.backgroundColor = (i&1)?"#F1F1F1":"#DFDFDF";
        }
    }
}

function addGlobalStyle(css){var n=selectNodes("//style|//link[@type='text/css'][@rel='stylesheet']");var s=document.
createElement("style");if(n.snapshotLength>0)insertNodeAfter(s,n.snapshotItem(n.snapshotLength-1));else document.body.
appendChild(s);s.type="text/css";s.textContent=css}

function/*String*/ generatePostbitLinkStyleCSS(/*CSSStyleDeclaration*/ style, /*String*/ classPrefix, /*Object*/ desc) {
    var color = applyHighlight(style, "color", desc.link);
    var colorHover = applyHighlight(style, "color", desc.linkHover);

    return "a." + classPrefix + "Odd{color:" + color + ";text-decoration:none;}" +
           "a." + classPrefix + "Odd:hover{color:" + colorHover + ";}" +
           "a." + classPrefix + "Evn{color:" + color + ";text-decoration:none;}" +
           "a." + classPrefix + "Evn:hover{color:" + colorHover + ";}";
}

function alterGlobalStyleSheets() {
    var topHdrLinkColor = null;

    for (var i = 0; i < document.styleSheets.length; ++i) {
        var sheet = document.styleSheets[i];

        try {
            sheet.cssRules.length;
        } catch(e) {
            continue;
        }

        for (var j = 0; j < sheet.cssRules.length; ++j) {
            var rule = sheet.cssRules[j];
            var sel = rule.selectorText;

            if (sel == "body") {
                rule.style.margin = "0px 8px";
                rule.style.padding = "0px 10px";
            } else if (sel == ".nav_container") {
                rule.style.borderWidth = "1px 1px 0px 1px";
                rule.style.margin = "0px";
            } else if (sel == ".headerBlueSmall") {
                topHdrLinkColor = rule.style.color;
            }
        }
    }

    var css = "";
    var node = selectSingleNode("//a[contains(@class, 'postbitGray')]");

    if (node) {
        var style = window.getComputedStyle(node, null);

        css += generatePostbitLinkStyleCSS(style, "postbitHlGood", goodPostHighlight);
        css += generatePostbitLinkStyleCSS(style, "postbitHlNew", newPostHighlight);
    }

    addGlobalStyle(css +
        "a.expCollAll{border-bottom:1px dotted;color:" + ((topHdrLinkColor)?topHdrLinkColor:"#EEEEFF") +
            ";margin:0 4px;text-decoration:none;}" +
        "a.expCollAll:hover{color:white;}");
}

function removeAllSignatures() {
    if (!hideSignaturesFromPosts) {
        return;
    }

    var signatures = selectNodes("//td[2]/div[div/.='__________________']");

    for (var i = 0; i < signatures.snapshotLength; ++i) {
        removeAllChildren(signatures.snapshotItem(i));
    }
}

function removeEmptyWithUsSince() {
    var fields = selectNodes("//table[starts-with(@id, 'postContainer_')]/*/tr/td/table/*/" +
            "tr[1]/td[1][@class='normalfont']/div[5][@class='smallfont'][normalize-space(span/.)='']");

    for (var i = 0; i < fields.snapshotLength; ++i) {
        removeAllChildren(fields.snapshotItem(i));
    }
}

function removeUselessElements() {
    removeChildNode(selectSingleNode("//div[contains(@style, 'clear') and contains(@style, 'margin-bottom')]"));

    if (isThreadPage) {
        removeAllSignatures();
        removeEmptyWithUsSince();
    } else if (isPostEditingPage) {
        removeChildNode(selectSingleNode("//form/div/div/h3"));
    }

    if (isThreadPage && removeReportViolationLinks) {
        var links = selectNodes("//td/a[starts-with(@href, 'report.php?postid=')]");

        for (var i = 0; i < links.snapshotLength; ++i) {
            var link = links.snapshotItem(i);

            removeChildNode(findPreviousTextNodeWithText(link, "|"));
            removeChildNode(link);
        }
    }

    var errorOutput = selectNodes("//body/b|//body/br|//body/text()");

    for (var i = 0; i < errorOutput.snapshotLength; ++i) {
        removeChildNode(errorOutput.snapshotItem(i));
    }
}

function changeContent(/*Element*/ link, /*boolean*/ isUp) {
    link.title = link.textContent;
    link.textContent = (isUp) ? "+" : "-";
    link.style.fontSize = "14pt";
    link.style.fontWeight = "bold";
    link.style.textDecoration = "none";
    link.style.marginLeft = "4px";

    if (isUp) {
        link.style.color = "green";
    } else {
        link.style.color = "red";
        link.style.marginRight = "4px";
    }
}

function addPostVotingLinks(/*Element*/ elem) {
    var idStr = stripPrefix(elem.id, "postRating");
    var voteLinks = selectNodes("//a[@class='voteLink'][contains(@href, 'postId=" + idStr + "')]");
    var upLink = null;
    var downLink = null;

    for (var i = 0; i < voteLinks.snapshotLength; ++i) {
        var link = voteLinks.snapshotItem(i);
        var linkHref = link.href.toString();

        if (!upLink && linkHref.indexOf("direction=up")+1) {
            upLink = link;
        } else if (!downLink && linkHref.indexOf("direction=down")+1) {
            downLink = link;
        }
    }

    if (downLink) {
        removeChildNode(findPreviousTextNodeWithText(downLink, "|"));
        removeChildNode(downLink);
        elem.parentNode.insertBefore(downLink, elem);
        changeContent(downLink, false);
    }
    if (upLink) {
        removeChildNode(findPreviousTextNodeWithText(upLink, "|"));
        removeChildNode(upLink);
        insertNodeAfter(upLink, elem);
        changeContent(upLink, true);
    }
}

function addPostRatingButtons() {
    if (!isThreadPage) {
        return;
    }

    var ratings = selectNodes("//span[starts-with(@id, 'postRating')]");

    for (var i = 0; i < ratings.snapshotLength; ++i) {
        addPostVotingLinks(ratings.snapshotItem(i));
    }
}

function enhanceBreadCrumbs() {
    if (!isThreadPage || !threadId) {
        return;
    }

    var breadCrumbs = selectSingleNode("//body/div/span[a/@href='index.php']");

    if (!breadCrumbs) {
        return;
    }

    var lastTextNode = breadCrumbs.lastChild;

    while (lastTextNode && lastTextNode.nodeType != 3) {
        lastTextNode = lastTextNode.previousSibling;
    }
    if (!lastTextNode) {
        return;
    }

    var nodeText = lastTextNode.nodeValue;
    var idx = nodeText.indexOf(">");

    if (idx+1) {
        nodeText = nodeText.substr(idx+1).trim();
    }

    lastTextNode.nodeValue = " > ";

    var newLinkNode = document.createElement("a");

    breadCrumbs.appendChild(newLinkNode);
    newLinkNode.href = "/showthread.php?threadid=" + threadId;
    newLinkNode.style.color = "black";
    newLinkNode.textContent = nodeText;
}

function showChildNodes(/*Element*/ parent, /*[optional] boolean*/ show, /*[optional] int*/ firstNodeToShow) {
    if (show == undefined) {
        show = true;
    }
    if (firstNodeToShow == undefined) {
        firstNodeToShow = 0;
    }

    for (var i = 0; i < parent.childNodes.length; ++i) {
        var elem = parent.childNodes[i];

        if (elem.nodeType != 1) {
            continue;
        }

        var tag = elem.tagName.lower();

        if (tag != "div" && tag != "tr" || firstNodeToShow-- > 0) {
            continue;
        }

        elem.style.display = (show) ? "" : "none";
    }
}

function alterCollapseExpandLink(/*Element*/ link, /*boolean*/ expand) {
    link.textContent = "[" + ((expand) ? "+" : "\u2013") + "]";
    link.setAttribute("expand", expand.toString());
    link.setAttribute("title", ((expand) ? "Expand" : "Collapse") + " this post");
}

var _saved_MemberStatus_MarginBottom = null;
var _saved_PostHeader_BorderBottom = null;
var _saved_PostHeader_PaddingBottom = null;

function expandCollapsePost(/*String*/ postId, /*boolean*/ expand, /*[optional] boolean*/ persist) {
    var postContainer = document.getElementById("postContainer_" + postId);

    if (!postContainer) {
        return null;
    }

    var cells = selectNodes(".//tr/td[contains(@style, 'background-color')][div]", postContainer);

    if (cells.snapshotLength < 2) {
        return null;
    }

    if (persist == undefined) {
        persist = true;
    }

    var leftColumn = cells.snapshotItem(0);
    var rightColumn = cells.snapshotItem(1);

    showChildNodes(leftColumn, expand, 2);
    showChildNodes(rightColumn, expand, 1);
    showChildNodes(leftColumn.parentNode.parentNode, expand, 1);

    var memberStatus = getElementByTagName(leftColumn, "div", 1);

    if (memberStatus) {
        if (!_saved_MemberStatus_MarginBottom) {
            _saved_MemberStatus_MarginBottom = memberStatus.style.marginBottom.toString();
        }
        memberStatus.style.marginBottom = (expand) ? _saved_MemberStatus_MarginBottom : "0px";
    }

    var postHeader = getElementByTagName(rightColumn, "div", 0);

    if (postHeader) {
        if (!_saved_PostHeader_BorderBottom) {
            _saved_PostHeader_BorderBottom = postHeader.style.borderBottomWidth;
        }
        if (!_saved_PostHeader_PaddingBottom) {
            _saved_PostHeader_PaddingBottom = postHeader.style.paddingBottom;
        }

        postHeader.style.borderBottomWidth = (expand) ? _saved_PostHeader_BorderBottom : "0px";
        postHeader.style.paddingBottom = (expand) ? _saved_PostHeader_PaddingBottom : "0px";
    }

    var link = document.getElementById("expandCollapse_" + postId);

    if (link) {
        alterCollapseExpandLink(link, !expand);
    }

    var isGood = !postContainer.getAttribute("bad");

    if (persist) {
        savePostCollapsed(postId, (isGood) ? !expand : false);
        return null;
    } else {
        return (isGood) ? postId : null;
    }
}

function expandCollapsePostLink_OnClick(/*Event*/ e, /*String*/ postId) {
    var ex = e.target.getAttribute("expand");

    expandCollapsePost(postId, (ex) ? (ex == "true") : true);

    e.target.blur();
    e.preventDefault();
}

function instrumentPostWithCollapsing(/*String*/ postId) {
    var postContainer = document.getElementById("postContainer_" + postId);

    if (!postContainer) {
        return;
    }

    var postHeader = selectSingleNode(".//tr/td[2]/div[@class='smallfont'][contains(@style, 'color')]", postContainer);

    if (!postHeader) {
        return;
    }

    var link = document.createElement("a");

    postHeader.insertBefore(document.createTextNode(" "), postHeader.firstChild);
    postHeader.insertBefore(link, postHeader.firstChild);
    link.id = "expandCollapse_" + postId;
    link.className = "postbitGray";
    link.href = "javascript:void(0)";
    link.style.fontSize = "larger";
    alterCollapseExpandLink(link, false);
    link.addEventListener("click", function(e) {
                return expandCollapsePostLink_OnClick(e, postId);
            }, true);
}

function expandCollapseAll_OnClick(/*Event*/ e) {
    e.target.blur();
    e.preventDefault();

    var expand = (e.target.getAttribute("expand") == "true");
    var idsToSave = [];

    for (var i = 0; i < pagePostsIds.length; ++i) {
        var id = expandCollapsePost(pagePostsIds[i], expand, false);

        if (id) {
            idsToSave.push(id);
        }
    }

    savePostsCollapsed(idsToSave, !expand);
}

function addCollapseExpandAll() {
    var threadHeading = selectSingleNode("//body/table/*/tr/td[1]/table/*/tr/td[2]/div[1]");

    if (!threadHeading) {
        return;
    }

    var expColl = document.createElement("div");

    insertNodeAfter(expColl, threadHeading);
    expColl.style.cssFloat = "left";
    expColl.style.margin = threadHeading.style.margin;
    expColl.style.marginLeft = "16px";
    expColl.style.fontWeight = "normal";

    expColl.appendChild(document.createTextNode("All Posts: ["));

    var lnk = document.createElement("a");

    expColl.appendChild(lnk);
    lnk.href = "javascript:void(0)";
    lnk.className = "expCollAll";
    lnk.textContent = "Collapse";
    lnk.setAttribute("expand", "false");
    lnk.addEventListener("click", expandCollapseAll_OnClick, true);

    expColl.appendChild(document.createTextNode("] ["));

    lnk = document.createElement("a");
    expColl.appendChild(lnk);
    lnk.href = "javascript:void(0)";
    lnk.className = "expCollAll";
    lnk.textContent = "Expand";
    lnk.setAttribute("expand", "true");
    lnk.addEventListener("click", expandCollapseAll_OnClick, true);

    expColl.appendChild(document.createTextNode("]"));
}

function addCollapsibilityToPosts() {
    if (!makePostsCollapsible) {
        return;
    }

    for (var i = 0; i < pagePostsIds.length; ++i) {
        instrumentPostWithCollapsing(pagePostsIds[i]);

        if (isPostCollapsed(pagePostsIds[i])) {
            expandCollapsePost(pagePostsIds[i], false, false);
        }
    }

    addCollapseExpandAll();
}

function collapseBadPost(/*String*/ postId) {
    expandCollapsePost(postId, false, false);

    var postCont = document.getElementById("postContainer_" + postId);

    if (postCont) {
        postCont.setAttribute("bad", "true");
    }
}

function isOddPost(id){for(var i=0;i<pagePostsIds.length;++i)if(pagePostsIds[i]==id)return!(i&1);return false}

function highlightPost(/*String*/ postId, /*Object*/ desc) {
    var postContainer = document.getElementById("postContainer_" + postId);

    if (!postContainer) {
        return;
    }

    var oddPost = isOddPost(postId);
    var cells = selectNodes("(.//tr/td|.//tr)[contains(@style, 'background-color')]", postContainer);

    for (var i = 0; i < cells.snapshotLength; ++i) {
        var cell = cells.snapshotItem(i);
        var style = window.getComputedStyle(cell, null);

        if (cell.tagName.lower() == "tr") {
            cell.style.color = applyHighlight(style, "color", desc.general);
        }

        cell.style.backgroundColor = applyHighlight(style, "background-color", desc.general);
    }

    postContainer.style.backgroundColor =
        applyHighlight(window.getComputedStyle(postContainer, null), "background-color", desc.general);

    var postHeader = selectSingleNode(".//tr/td[2]/div[@class='smallfont'][contains(@style, 'color')]", postContainer);

    if (postHeader) {
        var style = window.getComputedStyle(postHeader, null);

        postHeader.style.color = applyHighlight(style, "color", desc.general);
        postHeader.style.borderBottomColor = applyHighlight(style, "border-bottom-color", desc.general);
    }

    var postLinks = selectNodes(".//a[contains(@class, 'postbitGray')]", postContainer);

    for (var i = 0; i < postLinks.snapshotLength; ++i) {
        var link = postLinks.snapshotItem(i);

        link.className = link.className.replace("postbitGray", desc.postbitLinkClass[(oddPost) ? 1 : 0]);
    }
}

function collapseAndHightlightPosts() {
    if (!isThreadPage || !((makePostsCollapsible && collapseBadPosts) || highlightGoodPosts || highlightNewPosts)) {
        return;
    }

    for (var i = 0; i < pagePostsIds.length; ++i) {
        var postId = pagePostsIds[i];
        var highlighted = false;

        if (highlightNewPosts && 0 <= firstNewPostIdx && firstNewPostIdx <= i) {
            highlightPost(postId, newPostHighlight);
            highlighted = true;
        }

        var ratingObj = document.getElementById("postRating" + postId);
        var rating = parseInt((ratingObj) ? ratingObj.textContent.trim() : null);

        if (isNaN(rating)) {
            continue;
        }

        if (makePostsCollapsible && collapseBadPosts && rating <= badPostRatingThreshold) {
            collapseBadPost(postId);
        } else if (!highlighted && highlightGoodPosts && rating >= goodPostRatingThreshold) {
            highlightPost(postId, goodPostHighlight);
        }
    }
}

function hideAvatars() {
    if (!hideUsersAvatars) {
        return;
    }

    var avatars = selectNodes("//table[starts-with(@id, 'postContainer_')]/*/tr/td/table/*/tr[1]/td[1]/div[3]/img");

    for (var i = 0; i < avatars.snapshotLength; ++i) {
        removeChildNode(avatars.snapshotItem(i));
    }
}

function turnAltsToTitles() {
    var imgs = selectNodes("//img[@alt]");

    for (var i = 0; i < imgs.snapshotLength; ++i) {
        var img = imgs.snapshotItem(i);
        var alt = img.alt.trim();

        if (!alt.length) {
            img.removeAttribute("alt");
        } else if (!img.getAttribute("title") || img.title.trim().length == 0) {
            img.title = alt;
        }
    }
}

var _oneOffOverflowConstraint = true;

function window_OnResize() {
    var reference = selectSingleNode("//body/table/*/tr/td[1]/table/*/tr[@class='headerBlueSmall']/td[2]");

    if (!reference) {
        return;
    }

    var widthValue = window.getComputedStyle(reference, null).getPropertyCSSValue("width");
    var containerWidth = widthValue.getFloatValue(widthValue.CSS_PX);
    var overflow = null;

    for (var i = 0; i < pagePostsIds.length; ++i) {
        var content = document.getElementById("postText_" + pagePostsIds[i]);

        if (!content) {
            continue;
        }

        if (!overflow) {
            var contentStyle = window.getComputedStyle(content, null);

            overflow = contentStyle.getPropertyCSSValue("margin-left").getFloatValue(widthValue.CSS_PX) +
                    contentStyle.getPropertyCSSValue("margin-right").getFloatValue(widthValue.CSS_PX);
            overflow += contentStyle.getPropertyCSSValue("border-left-width").getFloatValue(widthValue.CSS_PX) +
                    contentStyle.getPropertyCSSValue("border-right-width").getFloatValue(widthValue.CSS_PX);
            overflow += contentStyle.getPropertyCSSValue("padding-left").getFloatValue(widthValue.CSS_PX) +
                    contentStyle.getPropertyCSSValue("padding-right").getFloatValue(widthValue.CSS_PX);
        }

        content.style.overflowX = "hidden";
        content.style.width = (containerWidth - overflow).toString() + "px";

        if (_oneOffOverflowConstraint) {
            var typeOfContraint = (postsWidthConstrainingType == 1) ? "hidden" : "auto";
            var divs = getAllElementsByTagName(content, "div");

            for (var j = 0; j < divs.length; ++j) {
                divs[j].style.overflowX = typeOfContraint;
            }
        }
    }

    _oneOffOverflowConstraint = false;
}

function installResizeListener() {
    if (!isThreadPage || !postsWidthConstrainingType) {
        return;
    }

    window.addEventListener("resize", window_OnResize, true);
    window_OnResize();
}

function improvePageNavigator() {
    if (!isThreadPage || !pageNumber || pageNavigatorParams.isEmpty()) {
        return;
    }

    var pagesCount = pageNavigatorParams.getAsInt("pageCount");
    var pagesPerHalfSet = pageNavigatorParams.getAsInt("pagesPerSet")>>1;
    var pagesFrom = pageNumber-pagesPerHalfSet;
    var pagesTo = pageNumber+pagesPerHalfSet;

    if (!(pagesCount && pagesPerHalfSet && pagesFrom && pagesTo)) {
        return;
    }

    if (pagesFrom < 1) {
        pagesTo += 1-pagesFrom;
    } else if (pagesTo > pagesCount) {
        pagesFrom -= pagesTo-pagesCount;
    }

    pageNavigatorParams.store("pagesFrom", Math.max(1, pagesFrom));
    pageNavigatorParams.store("pagesTo", Math.min(pagesCount, pagesTo));

    var paramsDiv = document.getElementById("tPageNavigatorParameters");

    if (!paramsDiv) {
        return;
    }

    removeAllChildren(paramsDiv);

    paramsDiv.appendChild(document.createComment(" " + pageNavigatorParams.toString(true) + " "));
}

function showEditingArea(/*Element*/ editingAreaContainer, /*[optional] boolean*/ show) {
    if (show == undefined) {
        show = true;
    }

    var elements = getAllElementsByTagName(editingAreaContainer, "div");

    for (var i = 0; i < elements.length; ++i) {
        elements[i].style.display = (show) ? "" : "none";
    }

    elements = getAllElementsByTagName(editingAreaContainer, "h3");

    for (var i = 1; i < elements.length; ++i) {
        elements[i].style.display = (show) ? "" : "none";
    }
}

function respondLink_OnClick(/*Event*/ e) {
    var respondHeader = document.getElementById("respondFormHeaderLink");

    if (respondHeader) {
        showEditingArea(respondHeader.parentNode);

        var link = getElementByTagName(respondHeader, "a");

        if (link) {
            respondHeader.textContent = link.textContent;
        }

        var anchor = document.createElement("a");

        respondHeader.appendChild(anchor);
        respondHeader.scrollIntoView();
    }

    e.preventDefault();
}

var _editingAreaEnlarged = false;
var _editingAreaHidden = false;

function enlargeEditingArea() {
    if (isThreadLocked) {
        return;
    }
    if (!isPostEditingPage && !isThreadPage) {
        _editingAreaEnlarged = true;
    }

    if (!_editingAreaEnlarged) {
        var editingIFrame = document.getElementById("messageWysiwygIFrame");
        var rawEditingArea = document.getElementById("messageRaw");

        if (editingIFrame) {
            editingIFrame.style.minHeight = "512px";
            _editingAreaEnlarged = true;
        }
        if (rawEditingArea) {
            rawEditingArea.style.minHeight = "512px";
        }
    }
    if (!_editingAreaEnlarged) {
        return;
    }

    if (!isThreadPage) {
        _editingAreaHidden = true;
    }

    if (!_editingAreaHidden) {
        var respondHeader = selectSingleNode("//body/form/div/div/h3");

        if (respondHeader) {
            respondHeader.id = "respondFormHeaderLink";
            showEditingArea(respondHeader.parentNode, false);

            var respondLinkText = respondHeader.textContent.trim();
            var respondLink = document.createElement("a");

            removeAllChildren(respondHeader);
            respondHeader.appendChild(respondLink);

            respondLink.textContent = respondLinkText;
            respondLink.href = "javascript:void(0)";
            respondLink.style.borderBottom = "1px dotted";
            respondLink.style.textDecoration = "none";
            respondLink.addEventListener("click", respondLink_OnClick, true);

            _editingAreaHidden = true;
        }
    }
}

function scrollToFirstNewPost() {
    if (!isThreadPage || !isGoToLastPost || !pagePostsIds.length) {
        return;
    }

    var lastPostId = null;

    if (firstNewPostIdx < 0) {
        for (var i = pagePostsIds.length-1; !lastPostId && i >= 0; lastPostId = pagePostsIds[i--]);
    } else {
        for (var i = firstNewPostIdx; !lastPostId && i < pagePostsIds.length; lastPostId = pagePostsIds[i++]);
    }

    var cont = document.getElementById("postContainer_" + lastPostId);

    if (cont) {
        cont.scrollIntoView(firstNewPostIdx >= 0);
    }
}

var deferredProcessingTimer = null;

function deferredProcessing() {
    enlargeEditingArea();

    if (!isThreadLocked && !_editingAreaEnlarged || !_editingAreaHidden) {
        return;
    }

    window.clearInterval(deferredProcessingTimer);
    deferredProcessingTimer = null;
    scrollToFirstNewPost();
}

function navigateToPageNum(/*int*/ newPageNum) {
    if (newPageNum < 1) {
        newPageNum = 1;
    }

    var pageCount = pageNavigatorParams.getAsInt("pageCount");

    if (pageCount && newPageNum > pageCount) {
        newPageNum = pageCount;
    }

    var pageLink = document.getElementById("tPageNavigatorPage");

    if (!pageLink) {
        return;
    }

    var link = getLinkFromComment(pageLink.innerHTML.toString());

    if (link) {
        window.location.href = link.replace(new RegExp("%pageNumber%", 'g'), newPageNum.toString());
    }
}

function navigateToPreviousPage() {
    if (!isOnFirstPage()) {
        navigateToPageNum(pageNumber-1);
    }
}

function navigateToNextPage() {
    if (!isOnLastPage()) {
        navigateToPageNum(pageNumber+1);
    }
}

function navigateToFirstPage() {
    if (!isOnFirstPage()) {
        navigateToPageNum(1);
    }
}

function navigateToLastPage() {
    if (!isOnLastPage()) {
        navigateToPageNum(123456789);
    }
}

function nagivateBunchUp() {
    var pagesPerSet = pageNavigatorParams.getAsInt("pagesPerSet");

    if (!isOnFirstPage() && pagesPerSet) {
        navigateToPageNum(pageNumber - pagesPerSet);
    }
}

function nagivateBunchDown() {
    var pagesPerSet = pageNavigatorParams.getAsInt("pagesPerSet");

    if (!isOnLastPage() && pagesPerSet) {
        navigateToPageNum(pageNumber + pagesPerSet);
    }
}

function document_OnKeyDown(/*Event*/ e) {
    if (!e.ctrlKey || e.shiftKey || e.altKey) {
        return;
    }

    if (e.target && e.target.nodeType == 1) {
        var tagName = e.target.tagName.lower();

        if (tagName == "input") {
            var type = e.target.type.lower();

            if (type == "text" || type == "password") {
                return;
            }
        } else if (tagName == "textarea") {
            return;
        }
    }

    switch (e.keyCode) {
        case e.DOM_VK_LEFT:
            navigateToPreviousPage();
            break;

        case e.DOM_VK_RIGHT:
            navigateToNextPage();
            break;

        case e.DOM_VK_HOME:
            navigateToFirstPage();
            break;

        case e.DOM_VK_END:
            navigateToLastPage();
            break;

        case e.DOM_VK_UP:
            nagivateBunchUp();
            break;

        case e.DOM_VK_DOWN:
            nagivateBunchDown();
            break;

        default:
            return;
    }

    e.preventDefault();
}

function installKeyListener() {
    if (!isThreadPage || !useKeyboardForNavigation) {
        return;
    }

    document.addEventListener("keydown", document_OnKeyDown, true);
}

// Main function
(function() {
    determineCurrentContext();

    if (isEditingArea) {
        return;
    }

    loadSettings();
    startStickyPostRequest();
    installKeyListener();

    restoreStripyPosts();
    alterGlobalStyleSheets();
    removeUselessElements();
    addPostRatingButtons();
    enhanceBreadCrumbs();
    addCollapsibilityToPosts();
    collapseAndHightlightPosts();
    hideAvatars();
    turnAltsToTitles();
    installResizeListener();
    improvePageNavigator();

    enlargeEditingArea();
    if (!isThreadLocked && !_editingAreaEnlarged && !_editingAreaHidden) {
        deferredProcessingTimer = window.setInterval(deferredProcessing, 100);
    } else {
        scrollToFirstNewPost();
    }
})();
