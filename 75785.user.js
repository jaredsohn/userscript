/*
 * This script is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This script is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
// ==UserScript==
// @name           Another Widescreen VKontakte
// @namespace      http://www.componentix.com/
// @description    Properly widens VKontakte screen (supports VK.com too)
// @include        http://vkontakte.ru/*
// @include        http://*.vkontakte.ru/*
// @include        http://vk.com/*
// @require        http://gist.github.com/raw/388518/01ac2cd18de8b1338507f5a0d599f684da015ae4/common_greasemonkey_utils.js
// @require        http://gist.github.com/raw/388513/38602019c610399e407a624481bfa7704b5029ac/vkontakte_images.js
// @scriptVersion  0.9.3
// @copyright      Copyright © 2010, Yuri Sakhno
// ==/UserScript==


// ===== Settings =====

var desiredWidth = 1200; // How wide site contents should be
var emptySpaceAtSides = 4; // Limits the width by allowing empty space on both sides of the content
var distributePhotosEvenly = false; // Whether photos should be just evenly spaced instead of rearranging
var fillAlbumPageWithLotsOfPhotos = true; // Add more than just 20 photos if available
var maxPhotosPerAlbumPage = 50; // Maximum number of photos per album page
var fillUpRows = true; // Tries to fill up all rows even though page may have more photos than maxPhotosPerAlbumPage
var enforceVkOptCompatibility = false; // If you don't use VkOpt extension, better leave this at false


// ===== Version =====

var version = "0.9.3";


// ===== Utility Functions and Classes =====

function computeWidth(e,t){var s=e?window.getComputedStyle(e,null):e;if(!s)return 0;if(!t)t=0;var v=s.
getPropertyCSSValue("width"),p=v.CSS_PX,w=0;try{if(t!=1)w=v.getFloatValue(p);if(t!=2)w+=s.getPropertyCSSValue(
"margin-left").getFloatValue(p)+s.getPropertyCSSValue("margin-right").getFloatValue(p)+s.getPropertyCSSValue(
"border-left-width").getFloatValue(p)+s.getPropertyCSSValue("border-right-width").getFloatValue(p)+s.getPropertyCSSValue
("padding-left").getFloatValue(p)+s.getPropertyCSSValue("padding-right").getFloatValue(p)}catch(x){w=e.clientWidth}
return w}

function PhotoDesc(/*String*/ pageName, /*String*/ imageUrl, /*String*/ thumbnailUrl) {
    this.pageName = pageName;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl;
}

// ==========================================================================


var pageWidth;
var currentWidth = -1;
var sidebarWidth = -1;
var isOnVK = false;
var isProfilePage = false;
var isGroupPage = false;
var isForumPage = false;
var isSearchPage = false;
var isPhotoAlbumPage = false;
var isPhotosWithUserPage = false;
var isAudioPage = false;
var isGroupsListPage = false;
var profileTableDataNewWidth = -1;
var groupWikiNewWidth = -1;
var searchDropDownNewPos = -1;
var photoCellNewWidth = -1;
var photosPerAlbumRow = -1;
var albumPhotos = null;

function /*boolean*/ determineIfPhotosWithUser() {
    if (!isPhotoAlbumPage) return false;

    var cont = byId("content");
    var sectionTypes =
        selectNodes("./div[@id='searchResults']/div[contains(concat(' ', @class, ' '), ' sectiontype ')]", cont);
    var footer = selectSingleNode("./div[contains(concat(' ', @class, ' '), ' footerBar ')]");

    return (cont && sectionTypes.snapshotLength > 0 && !footer);
}

function /*boolean*/ determineContext() {
    var pageCont = byId("pageContainer");
    var layoutCont = byId("pageLayout");
    var sideBar = byId("sideBar");

    if (!pageCont || !layoutCont || !sideBar) return false;

    pageWidth = pageCont.clientWidth;
    currentWidth = computeWidth(layoutCont);
    sidebarWidth = computeWidth(sideBar);

    isOnVK = !!byId("pageHeader1");
    isProfilePage = !!byId("userProfile");
    isGroupPage = !!byId("group");
    isForumPage = !!byId("forum");
    isSearchPage = !!byId("searchContent");
    isPhotoAlbumPage = !!byId("album");
    isPhotosWithUserPage = determineIfPhotosWithUser();
    isAudioPage = !!byId("audio_table") || !!byId("audio_edit_table");
    isGroupsListPage = !!byId("groupslist");

    return true;
}

function /*Object*/ loadSetting(/*String*/ name, /*Object [optional]*/ def) {
    return GM_getValue(name, def);
}

function loadSettings() {
    if (!GM_getValue) return;

    desiredWidth = loadSetting("desiredWidth", desiredWidth);
    emptySpaceAtSides = loadSetting("emptySpaceAtSides", emptySpaceAtSides);
    distributePhotosEvenly = loadSetting("distributePhotosEvenly", distributePhotosEvenly);
    fillAlbumPageWithLotsOfPhotos = loadSetting("fillAlbumPageWithLotsOfPhotos", fillAlbumPageWithLotsOfPhotos);
    maxPhotosPerAlbumPage = loadSetting("maxPhotosPerAlbumPage", maxPhotosPerAlbumPage);
    fillUpRows = loadSetting("fillUpRows", fillUpRows);
    enforceVkOptCompatibility = loadSetting("enforceVkOptCompatibility", enforceVkOptCompatibility);
}

function adjustWidths() {
    desiredWidth = Math.max(Math.min(desiredWidth, pageWidth - emptySpaceAtSides), currentWidth);
}

function deleteStupidScriptsForCounters() {
    var noscripts = selectNodes("//noscript");

    for (var i = noscripts.snapshotLength-1; i >= 0; --i) {
        removeChildNode(noscripts.snapshotItem(i));
    }

    var scripts = selectNodes("/html/body//script");

    for (var i = scripts.snapshotLength-1; i >= 0; --i) {
        var script = scripts.snapshotItem(i);

        if (script.textContent.contains("document.referrer")) {
            removeChildNode(script);
        }
    }
}

function widenDataWraps(/*Element*/ elem) {
    if (!isProfilePage && !isGroupPage) return;

    var tableLabel = selectSingleNode(".//td[contains(concat(' ', @class, ' '), ' label ')]", elem);
    var tableLabelWidth = computeWidth(tableLabel);
    var infoCont = selectSingleNode(".//div[contains(concat(' ', @class, ' '), ' basicInfo ') or " +
            "contains(concat(' ', @class, ' '), ' flexBox ')]", elem);

    if (infoCont && tableLabelWidth > 0) {
        profileTableDataNewWidth = computeWidth(infoCont, 2) - tableLabelWidth;
    }

    var wikiTextCont = selectSingleNode(".//div[@id='recentNews']//div[contains(concat(' ', @class, ' '), ' dataWrap ')]", elem);

    if (wikiTextCont) {
        groupWikiNewWidth = computeWidth(wikiTextCont.parentNode, 2) - computeWidth(wikiTextCont, 1);
    }
}

function widenOpinion(/*Element*/ elem) {
    var opinionField = selectSingleNode(
            ".//div/form[@id='postMessage'][@name='postMessage']/textarea[@id='op_field'][@name='op_field']", elem);

    if (opinionField != null) {
        opinionField.style.width =
            (computeWidth(opinionField.parentNode.parentNode, 2) - computeWidth(opinionField, 1)) + "px";
    }
}

function widenQuickWallReply(/*Element*/ elem) {
    var replyField =
        selectSingleNode(".//div[@id='quickReply']//form[@id='postMessage']/textarea[@id='reply_field']", elem);
    var toggleDiv = replyField;

    for (; toggleDiv && (toggleDiv.tagName.lower() != "div" || toggleDiv.id != "r"); toggleDiv = toggleDiv.parentNode) {
        if (toggleDiv.id == "quickReply") {
            toggleDiv = null;
            break;
        }
    }

    if (!toggleDiv) return;

    var oldDisplay = toggleDiv.style.display;

    if (oldDisplay == "none") toggleDiv.style.display = "block";
    replyField.style.width = (computeWidth(replyField.parentNode.parentNode, 2) - computeWidth(replyField, 1)) + "px";
    toggleDiv.style.display = oldDisplay;
}

function widenWallMessages(/*Element*/ elem) {
    widenQuickWallReply(elem);

    var wallPosts =
        selectNodes(".//td/div[starts-with(@id, 'wPost')][contains(concat(' ', @class, ' '), ' text ')]", elem);
    var requiredWidth = -1;

    for (var i = 0; i < wallPosts.snapshotLength; ++i) {
        var post = wallPosts.snapshotItem(i);

        if (requiredWidth == -1) {
            var reference = getPreviousElementByTagName(post, "div");

            if (!reference) break;

            var cell = getPreviousElementByTagName(reference.parentNode, "td");

            if (cell) {
                var emptyImg = document.createElement("img");

                emptyImg.style.cssFloat = "left";
                emptyImg.style.height = "1px";
                emptyImg.src = emptyImageData;
                cell.appendChild(emptyImg);
            }

            requiredWidth = computeWidth(reference) - computeWidth(post, 1);
        }

        post.style.width = requiredWidth + "px";
    }
}

function hideLastSeparatorFromAudiotracks(/*Element*/ elem) {
    return; // Ruins the stupid audio tracks list; disable for now

    var audiotracks =
        selectNodes(".//div[starts-with(@id, 'audio')][contains(concat(' ', @class, ' '), ' audioRow ')]/table", elem);
    var separators = selectNodes(
            ".//div[starts-with(@id, 'audio')][contains(concat(' ', @class, ' '), ' audioRow ')]/" +
            "div[not(starts-with(@id, 'lyrics'))]", elem);

    if (separators.snapshotLength > 0 && audiotracks.snapshotLength == separators.snapshotLength) {
        separators.snapshotItem(separators.snapshotLength-1).style.display = "none";
    }
}

function /*boolean*/ makeWidescreen() {
    var layoutCont = byId("pageLayout");
    var pageBodyCont = byId("pageBody");

    if (!layoutCont || !pageBodyCont) return false;

    var originalWidthDelta = computeWidth(layoutCont, 2) - computeWidth(pageBodyCont, 2);
    
    layoutCont.style.width = desiredWidth + "px";
    pageBodyCont.style.width = (desiredWidth - originalWidthDelta) + "px";

    var cont = null;

    if (isProfilePage) {
        cont = byId("userProfile");
    } else if (isGroupPage) {
        cont = byId("group");
    } else if (isForumPage) {
        cont = byId("forum");
    }

    var leftColumn = null;
    var rightColumn = null;

    if (isProfilePage) {
        leftColumn = byId("leftColumn");
        rightColumn = byId("rightColumn");
    } else if (isGroupPage || isForumPage) {
        var divs = getAllElementsByTagName(cont, "div");

        for (var i = 0; i < divs.length; ++i) {
            if (!rightColumn && divs[i].className == "left") {
                rightColumn = divs[i];
            } else if (!leftColumn && divs[i].className == "right") {
                leftColumn = divs[i];
            }
        }
    }

    if (leftColumn && rightColumn) {
        rightColumn.style.width = (computeWidth(cont, 2)-computeWidth(leftColumn)) + "px";
    }

    if (rightColumn) {
        widenDataWraps(rightColumn);
        widenOpinion(rightColumn);
        widenWallMessages(rightColumn);
        hideLastSeparatorFromAudiotracks(rightColumn);
    }

    return true;
}

function head_OnDOMNodeInserted(/*Event*/ e) {
    if (e.target.nodeType != 1 || e.target.tagName.lower() != "style") return;

    var text = e.target.textContent.trim();

    if (text.startsWith("#userProfile > div[style]") && text.contains(" !important;")) {
        // This is a stupid style-element, and it must be removed!
        removeChildNode(e.target);
    }
}

function makeCompatibleWithVkOpt() {
    if (!enforceVkOptCompatibility) return;

    var htmlHeader = selectSingleNode("/html/head");

    if (!htmlHeader) return; // Very unlikely

    htmlHeader.addEventListener("DOMNodeInserted", head_OnDOMNodeInserted, true);
}

function inferNewPhotoCellWidth(/*Element*/ album, /*int*/ albumWidth) {
    var refCell = selectSingleNode("./table/*/tr/td", album);

    if (!refCell) return;

    var excessCellWidth = computeWidth(refCell, 1);
    var excessWidth = excessCellWidth * 4;
    var parent = refCell.parentNode;

    while (parent != album) {
        excessWidth += computeWidth(parent, 1);
        parent = parent.parentNode;
    }

    photoCellNewWidth = (albumWidth - excessWidth) / 4;
}

function rearrangePhotos(/*Element*/ album, /*int*/ albumWidth) {
    var table = getElementByTagName(album, "table");
    var photos = selectNodes("./*/tr/td/a[@href][img/@src]", table);

    if (photos.snapshotLength == 0) return;
    if (fillUpRows) {
        photosPerAlbumRow = Math.floor(albumWidth / computeWidth(photos.snapshotItem(0).parentNode));
    }

    var list = document.createElement("ul");

    album.insertBefore(list, table);

    for (var i = 0; i < photos.snapshotLength; ++i) {
        var photo = photos.snapshotItem(i);
        var listItem = document.createElement("li");

        list.appendChild(listItem);

        removeChildNode(photo);
        listItem.appendChild(photo);
    }

    removeChildNode(table);
}

function /*Object*/ getPhotoInfo(/*String*/ photoTxt) {
    var parts = photoTxt.split(",");

    if (parts.length < 3) return null;

    for (var i = 0; i < 3; ++i) {
        var str = parts[i].trim();

        if (str.length < 2 || str[0] != str[str.length-1] || (str[0] != "'" && str[0] != '"')) return null;

        parts[i] = str.slice(1, -1).replace(/\\\//g, "/");
    }

    return new PhotoDesc(parts[0], parts[2], parts[1]);
}

function /*Array*/ processPhotosInformation(/*String*/ photosInfo) {
    var photos = [];

    if (photosInfo.length < 2 || photosInfo[0] != '[' || photosInfo[photosInfo.length-1] != ']') return photos;

    photosInfo = photosInfo.slice(1, -1);

    var end = 0;

    for (;;) {
        var start = photosInfo.indexOf("[", end);

        if (start < 0) return photos;
        end = photosInfo.indexOf("]", start);
        if (end < 0) return photos;
        if (start+1 > end-1) continue;

        var photo = getPhotoInfo(photosInfo.slice(start+1, end).trim());

        if (photo) photos.push(photo);
    }
}

function /*int*/ indexOfPhotoByThumbnailUrl(/*String*/ url) {
    if (!albumPhotos) return -1;

    for (var i = 0; i < albumPhotos.length; ++i) {
        if (albumPhotos[i].thumbnailUrl.endsWith(url)) return i;
    }

    return -1;
}

function /*String*/ determineAlbumPagesLink(/*Element*/ pageList) {
    var links = selectNodes("./li/a/@href", pageList);

    for (var i = 0; i < links.snapshotLength; ++i) {
        var link = links.snapshotItem(i).value;

        if (getParameterValueFromURL(link, "st")) return link;
    }

    return null;
}

function repopulatePageLists(/*int*/ firstPhoto, /*int*/ photosPerPage) {
    var pageLists = selectNodes("//div[@id='content']/div/ul[contains(concat(' ', @class, ' '), ' pageList ')]");
    var totalPages = Math.floor((firstPhoto + photosPerPage-1) / photosPerPage) +
            Math.floor((albumPhotos.length - firstPhoto + photosPerPage-1) / photosPerPage);

    if (totalPages < 2) {
        for (var i = pageLists.snapshotLength-1; i >= 0; --i) {
            removeChildNode(pageLists.snapshotItem(i));
        }
        return;
    }

    var url = (pageLists.snapshotLength > 0) ? new Url(determineAlbumPagesLink(pageLists.snapshotItem(0))) : null;

    if (!url) return;

    for (var i = 0; i < pageLists.snapshotLength; ++i) {
        removeAllChildren(pageLists.snapshotItem(i));
    }

    var currentPage = Math.ceil(firstPhoto / photosPerPage);

    for (var i = 0; i < totalPages; ++i) {
        for (var j = 0; j < pageLists.snapshotLength; ++j) {
            var item = document.createElement("li");
            var textHolder = item;

            pageLists.snapshotItem(j).appendChild(item);

            if (i != currentPage) {
                var link = document.createElement("a");
                var photoNum = Math.max(0, firstPhoto + (i - currentPage) * photosPerPage);

                item.appendChild(link);
                url.search.set("st", photoNum);
                link.href = url;
                textHolder = link;
            } else {
                item.className = "current";
            }

            textHolder.textContent = (i+1);
        }
    }
}

function processPhotoPageResponse(/*String*/ text) {
    var album = byId("album");
    var photoThumbs = selectNodes(".//a[@href]/img[@src]", album);

    if (!album || !photoThumbs.snapshotLength) return;

    var idx = text.indexOf("var ph="), end;

    if (idx < 0) return;

    end = text.indexOf(";", idx += 7);
    if (end <= idx) return;

    albumPhotos = processPhotosInformation(text.slice(idx, end).trim());

    var photoIdx = indexOfPhotoByThumbnailUrl(photoThumbs.snapshotItem(0).src);
    var i;

    if (photoIdx++ < 0) return;

    for (i = 1; i < photoThumbs.snapshotLength && photoIdx < albumPhotos.length; ++i, ++photoIdx) {
        if (!albumPhotos[photoIdx].thumbnailUrl.endsWith(photoThumbs.snapshotItem(i).src)) break;
    }

    if (i < photoThumbs.snapshotLength) return;

    var photosLimit = (maxPhotosPerAlbumPage > 0) ? maxPhotosPerAlbumPage : albumPhotos.length;
    var list = getElementByTagName(album, "ul");

    if (fillUpRows && photosPerAlbumRow > 0) {
        photosLimit = Math.ceil(photosLimit / photosPerAlbumRow) * photosPerAlbumRow;
    }

    repopulatePageLists(photoIdx - i, photosLimit);

    if (!list) return;

    for (; i < photosLimit && photoIdx < albumPhotos.length; ++i, ++photoIdx) {
        var item = document.createElement("li");
        var link = document.createElement("a");
        var image = document.createElement("img");

        list.appendChild(item);
        item.appendChild(link);
        link.appendChild(image);

        link.href = "/photo" + albumPhotos[photoIdx].pageName;
        image.src = albumPhotos[photoIdx].thumbnailUrl;
    }
}

function startPhotoLoadRequest(/*Element*/ elem) {
    if (!fillAlbumPageWithLotsOfPhotos || isPhotosWithUserPage) return;

    var photoLink = selectSingleNode(".//a[@href][img/@src]", elem);

    if (!photoLink) return;

    var oldNotAjaxPhotos = (getCookie("remixnotajaxphotos") == "1");

    if (oldNotAjaxPhotos) {
        setCookie("remixnotajaxphotos", 0, 1);
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: photoLink.href,
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml",
            "Cookie": "remixnotajaxphotos=0" // I think this has no effect
        },
        onload: function(response) {
            if (response.status != 200) return;

            processPhotoPageResponse(response.responseText);
        }
    });

    if (oldNotAjaxPhotos) {
        setCookie("remixnotajaxphotos", 1, 365240); // This cookie "will last for a thousand years!"
    }
}

function enhancePhotoAlbum() {
    var albumDivs = [];

    if (isPhotosWithUserPage) {
        var albums = selectNodes("//div[@id='album']");

        for (var i = 0; i < albums.snapshotLength; ++i) {
            albumDivs.push(albums.snapshotItem(i));
        }
    } else if (isPhotoAlbumPage) {
        albumDivs.push(byId("album"));
    }

    for (var i = 0; i < albumDivs.length; ++i) {
        var newWidth = computeWidth(albumDivs[i].parentNode, 2) - computeWidth(albumDivs[i], 1);

        albumDivs[i].style.width = newWidth + "px";
        if (!distributePhotosEvenly) {
            rearrangePhotos(albumDivs[i], newWidth);
            startPhotoLoadRequest(albumDivs[i]);
        } else {
            inferNewPhotoCellWidth(albumDivs[i], newWidth);
        }
    }
}

function /*int*/ widenInnerSearchContent(/*Element*/ cell, /*int*/ contentWidth) {
    var conts = selectNodes(".//table[contains(concat(' ', @class, ' '), ' infotable ')]/*/tr/td[2]", cell);

    if (contentWidth < 0 && conts.snapshotLength > 0) {
        var refCells = getAllElementsByTagName(conts.snapshotItem(0).parentNode, "td");

        contentWidth = computeWidth(cell, 2);
        for (var i = 0; i < refCells.length; ++i) {
            contentWidth -= computeWidth(refCells[i], i==1);
        }
    }

    if (contentWidth > 0) {
        for (var i = 0; i < conts.snapshotLength; ++i) {
            var cont = conts.snapshotItem(i);
            var divItm = getElementByTagName(cont, "div");

            if (divItm) divItm.style.width = contentWidth + "px";
            cont.removeAttribute("class");
        }
    }

    return contentWidth;
}

function widenSearchResults() {
    var searchResultsCont = byId("searchResults");

    if (!searchResultsCont) {
        searchResultsCont = selectSingleNode("//div[contains(concat(' ', @class, ' '), ' searchResults ')]");
    }
    if (!searchResultsCont) return;

    var childDiv = getElementByTagName(searchResultsCont, "div");

    if (childDiv) {
        childDiv.style.width = (computeWidth(searchResultsCont, 2) - computeWidth(childDiv, 1)) + "px";
    }

    if (isGroupsListPage) {
        var groupsConts = selectNodes(".//div[starts-with(@id, 'groupCont')]", childDiv || searchResultsCont);
        var newGroupContWidth = -1;

        for (var i = 0; i < groupsConts.snapshotLength; ++i) {
            var groupCont = groupsConts.snapshotItem(i);

            if (newGroupContWidth < 0) {
                newGroupContWidth = (computeWidth(groupCont.parentNode, 2) - computeWidth(groupCont, 1)) + "px";
            }

            groupCont.style.width = newGroupContWidth;
        }
    }

    var dataCells = selectNodes(
            ".//div[contains(concat(' ', @class, ' '), ' result ') or " +
            "contains(concat(' ', @class, ' '), ' grouprow ')]/table/*/tr/td[2]", searchResultsCont);
    var newCellWidth = -1;
    var newContentWidth = -1;

    for (var i = 0; i < dataCells.snapshotLength; ++i) {
        var cell = dataCells.snapshotItem(i);

        if (newCellWidth < 0) {
            var referenceDiv = cell.parentNode.parentNode.parentNode.parentNode;
            var referenceCells = getAllElementsByTagName(cell.parentNode, "td");
            var excessWidth = 0;

            for (var j = 0; j < referenceCells.length; ++j) {
                excessWidth += computeWidth(referenceCells[j], j==1);
            }

            newCellWidth = computeWidth(referenceDiv, 2) - excessWidth;
        }

        cell.removeAttribute("width");

        var innerDiv = getElementByTagName(cell, "div");

        if (innerDiv) {
            innerDiv.style.width = newCellWidth + "px";
            innerDiv.style.overflow = "hidden";
        } else {
            cell.style.width = newCellWidth + "px";
            newContentWidth = widenInnerSearchContent(cell, newContentWidth);
        }
    }
}

function widenAudiotracksList() {
    if (!isAudioPage) return;

    var audioTable = byId("audio_table");

    if (!audioTable) audioTable = byId("audio_edit_table");
    if (!audioTable) return;

    audioTable.style.width = (computeWidth(audioTable.parentNode, 2) - computeWidth(audioTable, 1)) + "px";
    hideLastSeparatorFromAudiotracks(audioTable);
}

function /*Element*/ getSearchButton() {
    if (!isOnVK) return null;

    var div = selectSingleNode("//div[contains(concat(' ', @class, ' '), ' top_search_button ')][div/@onclick]");

    return (div) ? getElementByTagName(div, "div") : null;
}

function resizeMainHeader() {
    var header = byId("pageHeader") || byId("pageHeader1");

    if (!header) return;

    header.setAttribute("style", "-moz-border-radius:0 0 8px 8px;");
    header.style.width = (desiredWidth - computeWidth(header, 1)) + "px";
    header.style.height = "41px";
    header.style.backgroundImage = "url(" + backgroundImageData + ")";
    header.style.backgroundRepeat = "repeat-x";

    if (!isOnVK) {
        var headerLogo = document.createElement("div");

        headerLogo.style.position = "absolute";
        headerLogo.style.width = "129px";
        headerLogo.style.height = "22px";
        headerLogo.style.left = "12px";
        headerLogo.style.top = "10px";
        headerLogo.style.backgroundImage = "url(" + logoImageData + ")";
        header.appendChild(headerLogo);
    }

    var headerBorder = document.createElement("div");

    headerBorder.setAttribute("style", "-moz-border-radius:0 0 8px 8px;");
    headerBorder.style.position = "relative";
    headerBorder.style.left = "-2px";
    headerBorder.style.width = (desiredWidth+2) + "px";
    headerBorder.style.height = "42px";
    headerBorder.style.backgroundColor = "#a4bacf";
    headerBorder.style.border = "1px solid #335d8b";
    headerBorder.style.borderTopWidth = "0";
    headerBorder.style.zIndex = -1;
    header.appendChild(headerBorder);

    var searchDropdown = byId("qdropdown");
    var searchCont = byId("qquery");
    var qsearch = byId("quickSearch");
    var searchButton = getSearchButton();

    if (searchDropdown && searchCont && qsearch && (!isOnVK || searchButton)) {
        var home = (isSearchPage) ? byId("home") : null;
        var qinput = getElementByTagName(searchCont, "input");

        if (home && qinput && !isOnVK) {
            var homeRight = home.offsetLeft + computeWidth(home) + 4;
            var searchFieldWidth = computeWidth(searchCont, 2);
            var newSearchFieldWidth = searchFieldWidth + qsearch.offsetLeft - homeRight;

            searchCont.style.left = homeRight + "px";
            searchCont.style.width = newSearchFieldWidth + "px";
            qinput.style.width = (computeWidth(qinput, 2) + newSearchFieldWidth - searchFieldWidth) + "px";

            var searchTip = byId("qfriends");

            if (searchTip) {
                searchTip.style.left = searchCont.style.left;
                searchTip.style.width = (computeWidth(searchCont, 1) +
                        newSearchFieldWidth - computeWidth(searchTip, 1)) + "px";
            }
        }

        if (isOnVK) {
            searchDropDownNewPos = qsearch.offsetLeft + qsearch.offsetWidth -
                    computeWidth(searchButton) - computeWidth(searchDropdown);
        } else {
            searchDropDownNewPos = qsearch.offsetLeft + searchCont.clientWidth - computeWidth(searchDropdown, 2);
        }
    }
}

function alterGlobalStyleSheets() {
    var topHdrLinkColor = null;
    var photoAlbumCellCss = null;

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

            if (sel == ".headNav a, .headNav div") {
                rule.style.paddingBottom = "10px";
            } else if (sel == "ul.bNav" || sel == "#bFooter p") {
                rule.style.marginLeft = sidebarWidth + "px";
            } else if (sel == ".bNav li") {
                rule.style.cssFloat = "none";
                rule.style.display = "inline-block";
            } else if (sel == "div#quickSearch") {
                rule.style.paddingBottom = "12px";
            } else if (sel == "#pageBody" && (isSearchPage || isOnVK)) {
                rule.style.marginTop = "2px";
            } else if (sel == ".playline, .playlineWall") {
                rule.style.borderBottom = rule.style.borderTop;
                rule.style.borderTop = "0 none transparent";
                rule.style.marginTop = "0";
                rule.style.position = "static";
                rule.style.width = null;
            } else if (sel == ".playerClassWall, .playlineWall" || sel == ".audioRowWall") {
                rule.style.width = null;
            } else if ((sel == ".mainPanel" || sel == "#audio_edit_table .mainPanel" ||
                    sel == ".audioTitle") && isAudioPage) {
                rule.style.width = null;
            } else if (sel == "#qdropdown" && searchDropDownNewPos >= 0) {
                rule.style.left = searchDropDownNewPos + "px";
            } else if (((sel == ".dataWrap" && isProfilePage) ||
                        (sel == "#group.profile td .dataWrap" && isGroupPage)) &&
                    profileTableDataNewWidth > 0) {
                rule.style.width = profileTableDataNewWidth + "px";
                rule.style.overflow = "hidden";
            } else if (sel == "#album td") {
                if (photoCellNewWidth > 0) {
                    rule.style.width = photoCellNewWidth + "px";
                } else if (!photoAlbumCellCss) {
                    photoAlbumCellCss = rule.cssText.replace(/^#album\s+td\s*\{/, "#album ul li{");
                    photoAlbumCellCss = photoAlbumCellCss.replace(/\}$/, ";display:inline-block}");
                }
            }
        }
    }

    if (!photoAlbumCellCss) {
        photoAlbumCellCss =
            "#album ul li{display:inline-block;padding:3px 2px;text-align:center;vertical-align:middle;width:150px}";
    }

    addGlobalStyle("#album ul{border:0 none transparent;margin:0;padding:0;text-align:left}" + photoAlbumCellCss +
            ((groupWikiNewWidth > 0) ? "#group.profile #recentNews .dataWrap{width:" + groupWikiNewWidth + "px}" : ""));
}

(function(){
    if (!determineContext()) return;

    loadSettings();
    adjustWidths();
    deleteStupidScriptsForCounters();

    if (!makeWidescreen()) return;

    makeCompatibleWithVkOpt();
    enhancePhotoAlbum();
    widenSearchResults();
    widenAudiotracksList();
    resizeMainHeader();
    alterGlobalStyleSheets();
})();