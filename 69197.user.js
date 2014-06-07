// ==UserScript==

// @name "FFClub color rewind"
// @namespace hotlap.ru/ffclub/se
// @description Return FFClub classic colors and format
// @author Bris
// @author joedm
// @version 1.1
// @include http://*ffclub.ru*

window.__ffcProfiles = new Array();

function __getElementsByClassName(elem, __className) {
    var result = new Array();
    var index = 0;
    var elements = elem.getElementsByTagName('*');
    if (elements) {
        for (var childIndex = 0; childIndex < elements.length; childIndex++) {
            if (elements[childIndex].className == __className) {
                result[index++] = elements[childIndex];
            }
        }
    }
    return result;
}

function copyChildren(src, dst) {
    if (src.childNodes) {
        for (var childIndex = 0; childIndex < src.childNodes.length; childIndex++) {
            var child = src.childNodes[childIndex];
            dst.appendChild(child.cloneNode(true));
        }
    }
}

function getAvatarLocation(avatar) {
    // remove '_24' substring from avatar's url
    var avatarSrc = avatar.src;
    var lastSlash = avatarSrc.lastIndexOf('/');
    if (lastSlash > 0) {
        var avatarName = avatarSrc.substr(lastSlash + 1);
        var index24 = avatarName.indexOf('_24');
        // sometimes it doesn't have such substring
        if (index24 > 0) {
            avatarName = avatarName.substr(0, index24) + avatarName.substr(index24 + 3);
            avatarSrc = avatarSrc.substr(0, lastSlash + 1) + avatarName;
        }
    }
    return avatarSrc;
}

function getTargetCell(postElem) {
    var dstTable = postElem.getElementsByTagName('TABLE')[1];
    return dstTable.getElementsByTagName('TD')[0];
}

function getAvatarSourceCell(postElem) {
    var table = postElem.getElementsByTagName('TABLE')[0];
    return table.getElementsByTagName('TD')[0];
}

function forceAvatarSize(avatar) {
    if (avatar.width && avatar.height) {
        if (avatar.height < 25) {
            avatar.width = 64;
            avatar.height = 64;
        }
    }    
}

function updateAvatar(ffcProfile) {
    var avatar = ffcProfile.profileElem.firstChild;
    var location = getAvatarLocation(avatar);
    avatar.src = location;
    // copy avatar nodes
    for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
        var targetCell = getTargetCell(ffcProfile.targetPosts[i]);
        copyChildren(getAvatarSourceCell(ffcProfile.sourcePostElem), targetCell);
        // force avatar size
        forceAvatarSize(targetCell.childNodes[2].firstChild);
    }
    // remove small avatars
    for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
        var oldAvatarCell = getAvatarSourceCell(ffcProfile.targetPosts[i]);
        if (oldAvatarCell) {
           oldAvatarCell.parentNode.removeChild(oldAvatarCell); 
        }
    }
}

function storeProfile(postElement) {
    var firstPostElems = __getElementsByClassName(postElement, 'row-firstpost');
    if (firstPostElems && firstPostElems.length != 0) {
        // don't mess with the first post
        return;
    }

    var srcTable = postElement.getElementsByTagName('TABLE')[0];
    var profileElem = __getElementsByClassName(srcTable, 'profile_mini')[0];
    if (profileElem) {
        var id = profileElem.rel;
        if (window.__ffcProfiles[id] == undefined) {
            window.__ffcProfiles[id] = new Object();
            window.__ffcProfiles[id].profileElem = profileElem;
            window.__ffcProfiles[id].sourcePostElem = postElement;
            window.__ffcProfiles[id].targetPosts = new Array();
        }
        // add target post
        window.__ffcProfiles[id].targetPosts.push(postElement);
    }
}

function traverse(elem) {
    // change color of posts
    if (elem.tagName == 'DIV') {
        if (elem.className == 'row-comment' 
              || elem.className == 'row-firstpost'
              || elem.className == 'postcolor') {
            elem.style.backgroundColor = '#EFEFE3';
            elem.style.padding = '10px';
        }
        if (elem.id) {
            if (elem.id.toString().indexOf('thepost_') == 0) {
                storeProfile(elem);
            }
        }
    }
    // table columns
    if (elem.tagName == 'TD') {
        // hide unwanted
        if (elem.width == '30%' && elem.className != 'subinfo' && elem.className != 'forum-pages-bar') {
            elem.style.display = 'none';
        }
        // change font and colors
        if (elem.className == 'post-bar2') {
            elem.style.fontSize = '12px';
            elem.style.backgroundColor = '#DFDFD3';
        }
        if (elem.width == 43 && (elem.className == 'row-comment' || elem.className == 'row-comment-fill')) {
            elem.style.backgroundColor = '#EFEFE3';
            var post = elem.parentNode.getElementsByTagName('TD')[1];
            post.style.backgroundColor = '#EFEFE3';
            post.style.paddingTop = '11px';
            post.setAttribute('valign', 'top');
            // update cell for the avatar and profile data
            elem.width = 150;
            elem.setAttribute('valign', 'top');
            // insert a divider between avatar and comment text
            var divider = elem.parentNode.insertCell(1);
            divider.style.backgroundColor = '#EFEFE3';
            divider.style.borderWidth = '0pt 0pt 0pt 1px';
            divider.style.borderStyle = 'solid';
            divider.style.borderColor = '#DFDFD3';
            divider.width = '12px';
        }
    }
    // post number
    if (elem.tagName == 'SPAN' && elem.className == 'postdetails') {
        var linkElement = elem.getElementsByTagName('A')[0];
        if (linkElement) {
            var postNumberStr = linkElement.href.substr(0, linkElement.href.length - 1);
            var lastSlash = postNumberStr.lastIndexOf('/');
            var postNumber = postNumberStr.substr(lastSlash + 1, postNumberStr.length);
            linkElement.innerText = '#' + postNumber;
            linkElement.style.fontSize = '12px';
            linkElement.style.fontWeight = 'normal';
        }
    }
    // further traverse
    if (elem.childNodes) {
        for (var childIndex = 0; childIndex < elem.childNodes.length; childIndex++) {
            traverse(elem.childNodes[childIndex]);
        }
    }
}
window.__ffcFetchProfileInfo = function(ffcProfile) {
    // create iframe to fetch profile data
    var iframeElement = document.createElement('IFRAME');
    iframeElement.style.visibility = 'hidden';
    iframeElement.width = 1;
    iframeElement.height = 1;
    iframeElement.src = '' + ffcProfile.profileElem.rel;
    var listener = function() {
        // remove listener
        if (iframeElement.removeEventListener) {
            iframeElement.removeEventListener('load', listener, false);
        } else if (iframeElement.detachEvent) {
            iframeElement.detachEvent('onload', listener);
        }
        // gather data
        var parentsToCopy = new Array();
        var _j = 0;
        var srcElements = iframeElement.contentDocument.body.getElementsByTagName('*');
        for (var _i = 0; _i < srcElements.length; _i++) {
            var child = srcElements[_i];
            if (child.className == 'desc') {
                parentsToCopy[_j++] = child;
            }
            if (child.className == 'row1') {
                parentsToCopy[_j++] = child.parentNode;
            }
        }
        // remove iframe
        document.body.removeChild(iframeElement);
        // copy profile info
        for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
            var targetCell = getTargetCell(ffcProfile.targetPosts[i]);
            // KLUDGE: on Opera (which suxx & must die ;) ) this info sometimes added twice
            var tables = targetCell.getElementsByTagName('TABLE');
            if (tables == undefined || tables.length == 0) {
                // create new table
                var infoTable = document.createElement('TABLE');
                infoTable.style.display = 'none';
                infoTable.className = '__ffc_infoTable';
                infoTable.border = '0';
                infoTable.cellspacing = '0';
                infoTable.cellpadding = '0';
                var infoTr = infoTable.insertRow(-1);
                var infoTd = infoTr.insertCell(-1);
                infoTd.style.fontSize = '9px';
                targetCell.appendChild(infoTable);
                for (var j = 0; j < parentsToCopy.length; j++) {
                    copyChildren(parentsToCopy[j], infoTd);
                }
            }
        }
        // flag this profile as done fetching
        ffcProfile.doneFetching = true;
    };
    // install listener
    if (iframeElement.addEventListener) {
        iframeElement.addEventListener('load', listener, false);
    } else if (iframeElement.attachEvent) {
        iframeElement.attachEvent('onload', listener);
    }
    document.body.appendChild(iframeElement);
}

window.__ffcUpdateProfileInfo = function() {
    for (var childIndex in window.__ffcProfiles) {
        if (!window.__ffcProfiles[childIndex].doneFetching) {
            // not all fetched, poll later (this is not good, but who'll offer a better way, you're welcome)
            window.setTimeout(window.__ffcUpdateProfileInfo, 300);
            return;
        }
    }
    var infoTables = __getElementsByClassName(document.body, '__ffc_infoTable');
    if (infoTables) {
        for (var index = 0; index < infoTables.length; index++) {
            var infoTable = infoTables[index];
            infoTables[index].style.display = '';
        }
    }
}

// do the job
traverse(document.body);
// fetch profiles info
var counter = 0;
var timeoutDelta = 500;
for(var childIndex in window.__ffcProfiles) {
    updateAvatar(window.__ffcProfiles[childIndex]);
    window.setTimeout(window.__ffcFetchProfileInfo, timeoutDelta * ++counter, window.__ffcProfiles[childIndex]);
}
// update page with profiles
window.setTimeout(window.__ffcUpdateProfileInfo, timeoutDelta * counter + 1);

// ==/UserScript==