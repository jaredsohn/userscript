// ==UserScript==
// @name           Danbooru Ajax Interface
// @namespace      http://danbooru.donmai.us
// @description    New interface to search images on Booru-style sites.
// @downloadURL    https://userscripts.org/scripts/source/35953.user.js
// @icon           http://sadpanda.us/images/1618532-CRIEU6O.png

// @include        http://danbooru.donmai.us/
// @include        http://danbooru.donmai.us/#*
// @include        http://www.donmai.us/
// @include        http://www.donmai.us/#*
// @include        http://donmai.us/
// @include        http://donmai.us/#*

// @include        http://gelbooru.com/
// @include        http://gelbooru.com/#*
// @include        http://www.gelbooru.com/
// @include        http://www.gelbooru.com/#*

// @include        http://konachan.com/
// @include        http://konachan.com/#*
// @include        http://konachan.net/
// @include        http://konachan.net/#*

// @include        https://yande.re/post
// @include        https://yande.re/post#*

// @version        0.2.81
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// CONSTANTS
const ratio = ((1 + Math.sqrt(5)) / 2);
const d = document;

// NEW SITES CAN BE ADDED NOW
var sites = [
    {
        name    :   "Danbooru",                                 // Site name
        site    :   "donmai\.us",                               // Regular expression check on current url
        post    :   "/post/index.xml",                          // Relative url to xml post API
        note    :   "/note_versions.xml",                       // Relative url to xml note API
        list    :   "/posts/",                                  // Relative url to post listing
        page    :   "/posts/",                                  // Relative url to post page
        query   :   function(tags, images, page, postid) {      // Query passed to API
                        login = btoa(/user_name=(.*?)(;|$)/.test(d.cookie) ? (d.cookie.match("user_name=(.*?)(;|$)")[1]) : "");
                        passhash = btoa(/password_hash=(.*?)(;|$)/.test(d.cookie) ? (d.cookie.match("password_hash=(.*?)(;|$)")[1]) : "");
                        apiquery = "?login=" + atob(login) + "&passhash=" + atob(passhash);
                        apiquery += tags ? "&tags=" + tags : "";
                        apiquery += images ? "&limit=" + images : "";
                        apiquery += page ? "&page=" + page : "";
                        apiquery += postid ? "&search[post_id]=" + postid : "";
                        return (apiquery);
                    }
    },
    {
        name    :   "Gelbooru",
        site    :   "(www\.)?gelbooru\.",
        post    :   "/index.php?page=dapi&s=post&q=index",
        note    :   "/index.php?page=dapi&s=note&q=index&post_id=",
        list    :   "/index.php?page=post&s=list",
        page    :   "/index.php?page=post&s=view&id=",
        query   :   function(tags, images, page, postid) {
                        return (postid ? postid : "&tags=" + tags + "&limit=" + images + "&pid=" + (page - 1));
                    }
    },
    {
        name    :   "Konachan",
        site    :   "konachan\.",
        post    :   "/post.xml",
        note    :   "/note.xml?post_id=",
        list    :   "/post/",
        page    :   "/post/show/",
        query   :   function(tags, images, page, postid) {
                        return (postid ? postid : "?tags=" + tags + "&limit=" + images + "&page=" + page);
                    }
    },
    {
        name    :   "Yande.re",
        site    :   "yande\.re",
        post    :   "/post.xml",
        note    :   "/note.xml?post_id=",
        list    :   "/post/",
        page    :   "/post/show/",
        query   :   function(tags, images, page, postid) {
                        return (postid ? postid : "?tags=" + tags + "&limit=" + images + "&page=" + page);
                    }
    }
];

var booru;
for(var i = 0; i < sites.length; i++)
    if(new RegExp(sites[i].site).test(window.location.hostname))
        booru = sites[i];

var alltags = GM_getValue("tags", setDefaults("alltags", sites.length));
var allpage = GM_getValue("page", setDefaults("allpage", sites.length));
var allimages = GM_getValue("images", setDefaults("allimages", sites.length));
var allcolumns = GM_getValue("columns", setDefaults("allcolumns", sites.length));
var allrating = GM_getValue("rating", setDefaults("allrating", sites.length));

// PAGE CLEANING
while(d.documentElement.firstChild)
    d.documentElement.removeChild(d.documentElement.firstChild);

d.documentElement.appendChild(d.createElement("HEAD"));
d.documentElement.appendChild(d.createElement("BODY"));
d.documentElement.firstChild.appendChild(title = d.createElement("TITLE"));
title.appendChild(d.createTextNode(booru.name));

GM_addStyle("a { text-decoration: none; color: #0000EE; } img { border: 0px; } .thumb { border: 1px solid WhiteSmoke; text-align: center; vertical-align: middle; min-width: 150px; min-height: 150px; padding: 1px; line-height: 10px; }");

// SCRIPT STARTS HERE
var tags = getValue("alltags", alltags);
var page = getValue("allpage", allpage);
var images = getValue("allimages", allimages);
var columns = getValue("allcolumns", allcolumns);
var rating = getValue("allrating", allrating);

var searchTable, searchTr, searchTd, searchForm, aLink, aTags, aReply, aTableBar, aLeftBar, aCenterBar, aRightBar, aTable, aTr1, aTd1, aTd2, aPage, aTd3, aRS, aRQ, aRE, aFIT, aSD, aTr2, aTd4, aTd5, aImages, aTr3, aTd6, aTd7, aColumns, aPrev, aSearch, aNext, aTagsDisplay, imagesLayer, overlay, display, displayDiv, sampleRate = 1;

d.body.appendChild(searchTable = d.createElement("TABLE"));
searchTable.appendChild(searchTr = d.createElement("TR"));
searchTr.setAttribute("style", "vertical-align: top;");
searchTr.appendChild(searchTd = d.createElement("TD"));
searchTd.setAttribute("style", "text-align: center;");

searchForm = d.createElement("FORM");
searchForm.addEventListener("submit", function(event) {
    tags = aTags.value;
    page = Math.max(1, parseInt(aPage.value, 10));
    images = Math.max(1, Math.min(parseInt(aImages.value, 10), 100));
    columns = Math.max(1, parseInt(aColumns.value, 10));
    rating = (aRS.checked ? "s" : "") + (aRQ.checked ? "q" : "") + (aRE.checked ? "e" : "") + (aFIT.checked ? "f" : "");

    allimages = setValue("images", allimages, images);
    allcolumns = setValue("columns", allcolumns, columns);
    allrating = setValue("rating", allrating, rating);

    search(tags, page);
    event.preventDefault();
}, false);

searchForm.appendChild(aLink = d.createElement("A"));
aLink.setAttribute("href", booru.list);
aLink.appendChild(d.createTextNode(booru.name));

searchForm.appendChild(d.createElement("BR"));

searchForm.appendChild(aTags = d.createElement("INPUT"));
aTags.setAttribute("type", "text");
aTags.setAttribute("cols", 25);
aTags.setAttribute("value", tags);
aTags.setAttribute("tabindex", "1");
aTags.addEventListener("change", function(event) {
    aPage.value = 1;
}, false);

searchForm.appendChild(d.createElement("P"));

searchForm.appendChild(aReply = d.createElement("SPAN"));
aReply.appendChild(d.createTextNode("Nobody here but us chickens!"));

searchForm.appendChild(d.createElement("P"));

// Slider
aTableBar = d.createElement("TABLE");
aTableBar.appendChild(d.createElement("TR"));
aTableBar.setAttribute("style", "border: 1px solid Black; border-collapse: collapse; width: 100%;");
aLeftBar = d.createElement("TD");
aLeftBar.setAttribute("style", "padding: 0px;");
aTableBar.firstChild.appendChild(aLeftBar);
aCenterBar = d.createElement("TD");
aCenterBar.setAttribute("style", "border: 1px solid Black; padding: 0px; padding-top: 3px; background-color: WhiteSmoke; width: 25%; min-width: 1px");
aTableBar.firstChild.appendChild(aCenterBar);
aRightBar = d.createElement("TD");
aRightBar.setAttribute("style", "padding: 0px; width: 100%;");
aTableBar.firstChild.appendChild(aRightBar);
searchForm.appendChild(aTableBar);

aTable = d.createElement("TABLE");
aTr1 = d.createElement("TR");
aTd1 = d.createElement("TD");
aTd1.appendChild(d.createTextNode("Page:"));
aTr1.appendChild(aTd1);

aTd2 = d.createElement("TD");
aPage = d.createElement("INPUT");
aPage.setAttribute("type", "text");
aPage.setAttribute("size", "1");
aPage.setAttribute("value", page);
aPage.setAttribute("tabindex", "2");
aTd2.appendChild(aPage);
aTr1.appendChild(aTd2);

aTd3 = d.createElement("TD");
aTd3.setAttribute("rowspan", "3");
aTd3.setAttribute("align", "left");

aRS = d.createElement("INPUT");
aRS.setAttribute("type", "checkbox");
if(/s/.test(rating)) aRS.setAttribute("checked", "checked");
aTd3.appendChild(aRS);
aTd3.appendChild(d.createTextNode("Safe"));
aTd3.appendChild(d.createElement("BR"));

aRQ = d.createElement("INPUT");
aRQ.setAttribute("type", "checkbox");
if(/q/.test(rating)) aRQ.setAttribute("checked", "checked");
aTd3.appendChild(aRQ);
aTd3.appendChild(d.createTextNode("Questionable"));
aTd3.appendChild(d.createElement("BR"));

aRE = d.createElement("INPUT");
aRE.setAttribute("type", "checkbox");
if(/e/.test(rating)) aRE.setAttribute("checked", "checked");
aTd3.appendChild(aRE);
aTd3.appendChild(d.createTextNode("Explicit"));
aTd3.appendChild(d.createElement("BR"));

aFIT = d.createElement("INPUT");
aFIT.setAttribute("type", "checkbox");
if(/f/.test(rating)) aFIT.setAttribute("checked", "checked");
aTd3.appendChild(aFIT);
aTd3.appendChild(d.createTextNode("Fit width"));
aTd3.appendChild(d.createElement("BR"));

aSD = d.createElement("INPUT");
aSD.setAttribute("type", "checkbox");

aTr1.appendChild(aTd3);
aTable.appendChild(aTr1);

aTr2 = d.createElement("TR");
aTd4 = d.createElement("TD");
aTd4.appendChild(d.createTextNode("Images:"));
aTr2.appendChild(aTd4);

aTd5 = d.createElement("TD");
aImages = d.createElement("INPUT");
aImages.setAttribute("type", "text");
aImages.setAttribute("size", "1");
aImages.setAttribute("value", images);
aImages.setAttribute("tabindex", "3");
aTd5.appendChild(aImages);
aTr2.appendChild(aTd5);
aTable.appendChild(aTr2);

aTr3 = d.createElement("TR");
aTd6 = d.createElement("TD");
aTd6.appendChild(d.createTextNode("Columns:"));
aTr3.appendChild(aTd6);

aTd7 = d.createElement("TD");
aColumns = d.createElement("INPUT");
aColumns.setAttribute("type", "text");
aColumns.setAttribute("size", "1");
aColumns.setAttribute("value", columns);
aColumns.setAttribute("tabindex", "4");
aTd7.appendChild(aColumns);
aTr3.appendChild(aTd7);
aTable.appendChild(aTr3);
searchForm.appendChild(aTable);

searchForm.appendChild(d.createElement("HR"));

searchForm.appendChild(aPrev = d.createElement("INPUT"));
aPrev.setAttribute("type", "button");
aPrev.setAttribute("value", "<");
aPrev.setAttribute("disabled", "disabled");
aPrev.addEventListener("click", function(event) {
    search(tags, --page);
}, false);

searchForm.appendChild(aSearch = d.createElement("INPUT"));
aSearch.setAttribute("type", "submit");
aSearch.setAttribute("value", "Search");

searchForm.appendChild(aNext = d.createElement("INPUT"));
aNext.setAttribute("type", "button");
aNext.setAttribute("value", ">");
aNext.setAttribute("disabled", "disabled");
aNext.addEventListener("click", function(event) {
    search(tags, ++page);
}, false);

searchForm.appendChild(d.createElement("HR"));

searchForm.appendChild(aTagsDisplay = d.createElement("DIV"));
aTagsDisplay.setAttribute("style", "overflow-x: hidden;");

searchTd.appendChild(searchForm);
searchTr.appendChild(imagesLayer = d.createElement("TD"));

searchTd.style.setProperty("min-width", (searchTd.getBoundingClientRect().right - searchTd.getBoundingClientRect().left) + "px", "important");
searchTd.style.setProperty("max-width", (searchTd.getBoundingClientRect().right - searchTd.getBoundingClientRect().left) + "px", "important");

// "Lightbox"
overlay = d.createElement("DIV");
overlay.setAttribute("style", "opacity: 0.75; display: none; background-color: Black; width: 100%; height: 100%; position: fixed; top: 0px; left: 0px");
display = d.createElement("TABLE");
display.setAttribute("style", "display: none; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; text-align: center; vertical-align: middle");
displayDiv = d.createElement("DIV");
displayDiv.setAttribute("id", "displayDiv");
displayDiv.setAttribute("style", "background-color: White; display: inline-block; padding: 10px; min-width: 200px; min-height: 200px; border-radius: 10px");

display.appendChild(d.createElement("TR"));
display.firstChild.appendChild(d.createElement("TD"));
display.firstChild.firstChild.appendChild(displayDiv);

d.body.insertBefore(display, d.body.firstChild);
d.body.insertBefore(overlay, d.body.firstChild);

if(!window.location.origin)
    window.location.origin = (window.location.protocol + "//" + window.location.host);

if(window.location.hash)
    search(window.location.hash.split("#")[1], 1);

var requestPost, requestNote, requestCount;

function search(newtags, newpage) {
    if(requestPost)
        requestPost.abort();
    if(requestNote)
        requestNote.abort();
    if(requestCount)
        requestCount.abort();

    aTags.value = tags = newtags;
    aPage.value = page = newpage;
    aImages.value = images;

    alltags = setValue("tags", alltags, tags);
    allpage = setValue("page", allpage, page);

    aPrev.disabled = (newpage < 2);
    aRS.checked = /s/.test(rating);
    aRQ.checked = /q/.test(rating);
    aRE.checked = /e/.test(rating);
//    aFIT.checked = /f/.test(rating);

    if(/^sf?$/.test(rating))
        newtags += " rating:safe";
    if(/^qf?$/.test(rating))
        newtags += " rating:questionable";
    if(/^ef?$/.test(rating))
        newtags += " rating:explicit";
    if(/^qef?$/.test(rating))
        newtags += " -rating:safe";
    if(/^sef?$/.test(rating))
        newtags += " -rating:questionable";
    if(/^sqf?$/.test(rating))
        newtags += " -rating:explicit";

    if(imagesLayer.hasChildNodes())
        imagesLayer.removeChild(imagesLayer.firstChild);

    imagesLayer.appendChild(d.createTextNode("Loading..."));

    requestPost = GM_xmlhttpRequest({
        method : "GET",
        url : window.location.origin + booru.post + booru.query(encodeURIComponent(newtags), images, page),
        headers: { "Accept" : "application/xml" },
        overrideMimeType : "application/xml; charset=utf-8",
        onload : function(response) {
            getContent(new DOMParser().parseFromString(response.responseText, "application/xml"), newtags);
        }
    });
}

function showContent(xmldoc) {
    if(imagesLayer.hasChildNodes())
        imagesLayer.removeChild(imagesLayer.firstChild);

    aReply.textContent = "Nobody here but us chickens!";

    var posts = xmldoc.evaluate("posts", xmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if(!posts) {
        reason = xmldoc.evaluate("response/@reason", xmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(reason)
            imagesLayer.textContent = reason.nodeValue;
        else
            imagesLayer.textContent = "Something broke.";
        return;
    }
    var post = xmldoc.evaluate("posts/post", xmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    aReply.textContent = "Found " + posts.getAttribute("count") + ", showing " + (parseInt(posts.getAttribute("offset"), 10) + 1) + "-" + (Math.min(posts.getAttribute("count"), parseInt(posts.getAttribute("offset"), 10) + images));
    aLeftBar.style.setProperty("width", (posts.getAttribute("offset") / posts.getAttribute("count") * 100) + "%");
    aCenterBar.style.setProperty("width", (images / posts.getAttribute("count") * 100) + "%");

    aNext.disabled = (page >= Math.ceil(posts.getAttribute("count") / images));

    imagesLayer.appendChild(table = d.createElement("TABLE"));
    table.setAttribute("style", "border-collapse: collapse;");

    for(var i = 0; i < Math.ceil(images / columns); i++) {
        table.appendChild(tr = d.createElement("TR"));
        for(var j = 0; j < Math.min(columns, images); j++) {
            tr.appendChild(td = d.createElement("TD"));
            data = post.snapshotItem(i * Math.min(columns, images) + j);
            if(data) {
                if(/true/.test(data.getAttribute("has_notes")))
                    td.style.setProperty("background-color", "LightYellow", "");
                if(/deleted/.test(data.getAttribute("status")))
                    td.style.setProperty("background-color", "MistyRose", "");

                var image = d.createElement("IMG");
                image.setAttribute("width", (data.getAttribute("preview_width") || ""));
                image.setAttribute("height", (data.getAttribute("preview_height") || ""));
                image.setAttribute("src", data.getAttribute("preview_url"));
                image.setAttribute("id", data.getAttribute("id"));
                image.setAttribute("alt", data.getAttribute("tags").trim());
                image.setAttribute("title", data.getAttribute("tags").trim() + " rating:" + data.getAttribute("rating").replace(/e$/, "Explicit").replace(/s$/, "Safe").replace(/q$/, "Questionable") + " score:" + data.getAttribute("score"));
                image.setAttribute("fullsize", data.getAttribute("file_url"));
                image.setAttribute("fullwidth", data.getAttribute("width"));
                image.setAttribute("fullheight", data.getAttribute("height"));
                image.setAttribute("notes", data.getAttribute("has_notes"));
                image.setAttribute("md5", data.getAttribute("md5"));

                // Show tags on sidebar
                image.addEventListener("click", function(event) {
                    if(aTagsDisplay.hasChildNodes())
                        aTagsDisplay.removeChild(aTagsDisplay.firstChild);
                    aTagsDisplay.appendChild(d.createElement("DIV"));

                    var tagnames = this.getAttribute("alt").split(" ");
                    for(var t = 0; t < tagnames.length; t++) {
                        var taglink = d.createElement("A");
                        taglink.appendChild(d.createTextNode(tagnames[t]));
                        taglink.setAttribute("href", "#" + tagnames[t]);
                        taglink.addEventListener("click", function(event) {
                            aTags.value = this.textContent;
                            aPage.value = 1;
                            aSearch.click();
                            event.preventDefault();
                        }, false);
                        aTagsDisplay.firstChild.appendChild(taglink);
                        aTagsDisplay.firstChild.appendChild(document.createElement("BR"));
                    }

                    // CTRL + click to show only the tags
                    if(event.ctrlKey) return;

                    // "Lightbox" by VIPPER ("How do I jQuery?")
                    while(displayDiv.hasChildNodes())
                        displayDiv.removeChild(displayDiv.firstChild);

                    overlay.addEventListener("click", function(event) {
                        if(event.target.id) return;
                        overlay.style.setProperty("display", "none", "");
                        display.style.setProperty("display", "none", "");
                    }, false);

                    display.addEventListener("click", function(event) {
                        if(event.target.id) return;
                        overlay.style.setProperty("display", "none", "");
                        display.style.setProperty("display", "none", "");
                    }, false);

                    display.addEventListener("dblclick", function(event) {
                        overlay.style.setProperty("display", "none", "");
                        display.style.setProperty("display", "none", "");
                    }, false);

                    if(/\.swf$/.test(this.getAttribute("fullsize"))) {
                        fullsize = d.createElement("EMBED");
                    } else {
                        fullsize = d.createElement("IMG");
                        fullsize.addEventListener("click", function(event) {
                            noteDivs = d.evaluate("//DIV[starts-with(@id, 'note')]", d, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                            for(var n = 0, note = null; note = noteDivs.snapshotItem(n++); n) {
                                if(window.getComputedStyle(note, null).getPropertyValue("visibility") == "visible")
                                    note.style.setProperty("visibility", "hidden", "");
                                else
                                    note.style.setProperty("visibility", "visible", "");
                            }
                        }, false);
                    }
                    fullsize.setAttribute("src", this.getAttribute("fullsize"));
                    
                    sampleRate = 1;
                    fullsize.setAttribute("width", this.getAttribute("fullwidth"));
                    fullsize.setAttribute("height", this.getAttribute("fullheight"));
                    
                    var clientwidth = Math.min(d.documentElement.clientWidth, d.body.clientWidth) - 30;
                    if(aFIT.checked && this.getAttribute("fullwidth") > clientwidth) {
                        sampleRate = clientwidth / this.getAttribute("fullwidth");
                        fullsize.setAttribute("width", clientwidth + "px");
                        fullsize.setAttribute("height", Math.floor(this.getAttribute("fullheight") * clientwidth / this.getAttribute("fullwidth")) + "px");
                    }
                    fullsize.setAttribute("id", this.getAttribute("id"));
                    fullsize.setAttribute("notes", this.getAttribute("notes"));
                    fullsize.setAttribute("md5", this.getAttribute("md5"));

                    if(fullsize.getAttribute("notes") == "true") {
                        requestNote = GM_xmlhttpRequest({
                            method : "GET",
                            url : window.location.origin + booru.note + booru.query(null, 10000, null, fullsize.getAttribute("id")),
                            headers: { "Accept" : "application/xml" },
                            overrideMimeType : "application/xml; charset=utf-8",
                            onload : function(response) {
                                getNotes(new DOMParser().parseFromString(response.responseText, "application/xml"), response.finalUrl);
                            }
                        });
                    }

                    var pagelink = d.createElement("A");
                    pagelink.setAttribute("href", booru.page + fullsize.getAttribute("id"));
                    pagelink.appendChild(d.createTextNode(fullsize.getAttribute("id")));

                    displayDiv.appendChild(fullsize);
                    displayDiv.appendChild(d.createElement("BR"));
                    displayDiv.appendChild(pagelink);

                    overlay.style.setProperty("display", "", "");
                    display.style.setProperty("display", "", "");
                }, false);

                var link = d.createElement("A");
                link.setAttribute("href", data.getAttribute("file_url"));
                link.setAttribute("alt", data.getAttribute("id"));
                link.appendChild(image);
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                }, false);
                td.setAttribute("class", "thumb");
                td.appendChild(link);
            }
        }
    }
}

function getContent(xmldoc, newtags) {
    if(booru.name == "Danbooru") { // Inject the count where it should be by default...
        requestCount = GM_xmlhttpRequest({
            method : "GET",
            url : window.location.origin + "/counts/posts.xml" + booru.query(encodeURIComponent(newtags)),
            headers: { "Accept" : "application/xml" },
            overrideMimeType : "application/xml; charset=utf-8",
            onload : function(response) {
                newxmldoc = new DOMParser().parseFromString(response.responseText, "application/xml");
                posts = xmldoc.evaluate("posts", xmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                count = newxmldoc.evaluate("counts/posts", newxmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if(posts) {
                    posts.setAttribute("count", count ? count.textContent.trim() : "0");
                    posts.setAttribute("offset", (page - 1) * images);
                }
                showContent(xmldoc);
            }
        });
    } else {
        showContent(xmldoc);
    }
}

function showNotes(note, id) {
    var offsetx = fullsize.getBoundingClientRect().left + (d.documentElement.scrollLeft || d.body.scrollLeft);
    var offsety = fullsize.getBoundingClientRect().top + (d.documentElement.scrollTop || d.body.scrollTop);
    var vp_bottom = Math.max(window.innerHeight, displayDiv.getBoundingClientRect().bottom - displayDiv.getBoundingClientRect().top);

    for(var i = 0, ndata = null; ndata = note.snapshotItem(i++); i) {
        if(id.match(/[0-9]+$/)[0] != fullsize.getAttribute("id")) continue;
        if(d.getElementById("note" + ndata.getAttribute("id"))) continue;

        var ntop = (parseInt(ndata.getAttribute("y"), 10) + offsety) * sampleRate;
        var nleft = (parseInt(ndata.getAttribute("x"), 10) + offsetx) * sampleRate;

        var noteDiv = d.createElement("DIV");
        noteDiv.setAttribute("id", "note" + ndata.getAttribute("id"));
        noteDiv.setAttribute("style", "opacity: 0.4; border: 1px solid Black; background-color: LightYellow; position: absolute;");
        noteDiv.style.setProperty("top", ntop + "px", "");
        noteDiv.style.setProperty("left", nleft + "px", "");
        noteDiv.style.setProperty("width", ndata.getAttribute("width") * sampleRate + "px", "");
        noteDiv.style.setProperty("height", ndata.getAttribute("height") * sampleRate + "px", "");
        noteDiv.addEventListener("mouseover", function(event) {
            d.getElementById("body" + this.getAttribute("id")).style.setProperty("display", "", "");
        }, false);
        noteDiv.addEventListener("mouseout", function(event) {
            d.getElementById("body" + this.getAttribute("id")).style.setProperty("display", "none", "");
        }, false);
        displayDiv.appendChild(noteDiv);

        var noteBody = d.createElement("DIV");
        noteBody.innerHTML = ndata.getAttribute("body");
        noteBody.setAttribute("id", "bodynote" + ndata.getAttribute("id"));
        noteBody.setAttribute("style", "border: 1px solid Black; background-color: LightYellow; position: absolute; color: Black; text-align: left; padding: 4px; z-index: 1" + i + ";");
        noteBody.addEventListener("mouseover", function(event) {
            this.style.setProperty("display", "", "");
        }, false);
        noteBody.addEventListener("mouseout", function(event) {
            this.style.setProperty("display", "none", "");
        }, false);
        displayDiv.appendChild(noteBody);

        // this sucks, find another method!
        var w = parseInt(ndata.getAttribute("width"), 10) * sampleRate;
        var h = parseInt(ndata.getAttribute("height"), 10) * sampleRate;
        if(w < h) { w ^= h; h ^= w; w ^= h; } // FUCK YEAH XOR SWAP
        while(w / h > ratio) {
            w -= ratio;
            h += ratio;
        }

        noteBody.style.setProperty("min-width", "-moz-min-content", "");
        noteBody.style.setProperty("max-width", w + "px", "");

        ntop = ntop + 5 + (parseInt(ndata.getAttribute("height"), 10) * sampleRate);
        nheight = noteBody.getBoundingClientRect().bottom - noteBody.getBoundingClientRect().top;
        if(ntop + nheight > vp_bottom)
            noteBody.style.setProperty("top", vp_bottom - nheight + "px", "");
        else
            noteBody.style.setProperty("top", ntop + "px", "");

        noteBody.style.setProperty("left", nleft + "px", "");
        noteBody.style.setProperty("display", "none", "");
    }
}

function getNotes(xmldoc, id) {
    if(booru.name == "Danbooru") { // fix for not working http://danbooru.donmai.us/notes.xml?search[post_id]=
        var notesxml = xmldoc.evaluate("note-versions/note-version/note-id", xmldoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var allnotes = new Array(notesxml.snapshotLength);
        for(var i = 0, ndata = null; ndata = notesxml.snapshotItem(i++); i)
            allnotes[i] = ndata.textContent;

        // remove duplicates
        var temp = {};
        for(var i = 0; i < allnotes.length - 1; i++)
            temp[allnotes[i + 1]] = true;
        var notes = [];
        for(var i in temp)
            notes.push(i);

        for(var i = 0; i < notes.length; i++) {
            requestNote = GM_xmlhttpRequest({
                method : "GET",
                url : window.location.origin + "/notes/" + notes[i] + ".xml" + booru.query(),
                headers: { "Accept" : "application/xml" },
                overrideMimeType : "application/xml; charset=utf-8",
                onload : function(response) {
                    var xmldoc = new DOMParser().parseFromString(response.responseText, "application/xml");
                    var note = xmldoc.evaluate("note", xmldoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    while(note.firstChild) {
                        if(note.firstChild.nodeName != "#text")
                            note.setAttribute(note.firstChild.nodeName, note.firstChild.textContent);
                        note.removeChild(note.firstChild);
                    }
                    showNotes(xmldoc.evaluate("note[@is-active = 'true']", xmldoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), id);
                }
            });
        }
    } else {
        showNotes(xmldoc.evaluate("notes/note[@is_active = 'true']", xmldoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), id);
    }
}

function getValue(name, values) {
    for(var i = 0; i < sites.length; i++)
        if(new RegExp(sites[i].site).test(window.location.hostname)) {
            if(eval(values)[i] != "" && !eval(values)[i]) {
                values = setValue(name.replace(/all/, ""), values, setDefaults(name, 1));
            }
            return eval(values)[i];
        }
}

function setValue(name, values, newvalue) {
    for(var i = 0; i < sites.length; i++)
        if(new RegExp(sites[i].site).test(window.location.hostname)) {
            oldvalue = eval(values);
            oldvalue[i] = (newvalue == "" ? "" : newvalue || oldvalue[i]);
            GM_setValue(name, JSON.stringify(oldvalue));
            return(JSON.stringify(oldvalue));
        }
}

function setDefaults(name, all) {
    var def, string = "[";
    for(var i = 0; i < all; i++) {
        if(name == "alltags")
            def = "\"\"";
        if(name == "allpage")
            def = "1";
        if(name == "allimages")
            def = "20";
        if(name == "allcolumns")
            def = "5";
        if(name == "allrating")
            def = "\"s\"";
        string += (def) + (i < sites.length - 1 ? ", " : "]");
    }
    return (all > 1 ? string : eval(def));
}