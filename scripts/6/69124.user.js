// ==UserScript==

// @name "FFClub color rewind"
// @namespace hotlap.ru/ffclub/se
// @description Return FFClub classic colors and format
// @author Bris
// @author joedm
// @include http://*ffclub.ru*

var postElements = new Array();
var postElementIndex = 0;

window.__ffclubUpdateProfile = new Array();


function __getElementsByClassName(elem, __className) {
    var result = new Array();
    var index = 0;
    var elements = elem.getElementsByTagName('*');
    if (elements) {
        for (var childIndex in elements) {
            if (elements[childIndex].className == __className) {
                result[index++] = elements[childIndex];
            }
        }
    }
    return result;
}

function moveChildren(src, dst) {
    while (src.childNodes.length > 0) {
        var child = src.firstChild;
        src.removeChild(child);
        dst.appendChild(child);       
    } 
}

function updateProfile(elem, childIndex) {
    var divTables = elem.getElementsByTagName('TABLE');
    var srcTable = divTables[0];
    var tdSrc = srcTable.getElementsByTagName('TD')[0];
    var dstTable = divTables[1];
    var tdDst = dstTable.getElementsByTagName('TD')[0];
    tdDst.setAttribute('valign', 'top');
    // move avatar into new table
    moveChildren(tdSrc, tdDst);
    tdSrc.parentNode.removeChild(tdSrc);
    // change avatar picture
    var profileElem = __getElementsByClassName(tdDst, 'profile_mini')[0];
    if (profileElem) {
        // remove '_24' substring from avatar's url
        var avatar = profileElem.firstChild;
        var avatarSrc = avatar.src;
        var lastSlash = avatarSrc.lastIndexOf('/');
        if (lastSlash > 0) {
            var avatarName = avatarSrc.substr(lastSlash + 1);
            var index24 = avatarName.indexOf('_24');
            // sometimes it doesn't have such substring
            if (index24 > 0) {
                avatarName = avatarName.substr(0, index24) + avatarName.substr(index24 + 3);
                avatar.src = avatarSrc.substr(0, lastSlash + 1) + avatarName;
            }
        }
        // force avatar size
        if (avatar.width && avatar.height) {
            if (avatar.width < 64 && avatar.height < 64) {
                avatar.width = 64;
                avatar.height = 64;
            }
        }
        window.__ffclubUpdateProfile[childIndex] = function() {
            // create iframe to fetch profile data
            var iframeElement = document.createElement('IFRAME');
            iframeElement.style.visibility = 'hidden';
            iframeElement.width = 1;
            iframeElement.height = 1;
            iframeElement.src = 'http://ffclub.ru' + profileElem.rel;
            tdDst.appendChild(iframeElement);
            // create new table
            var infoTable = document.createElement('TABLE');
            infoTable.border = '0';
            infoTable.cellspacing = '0';
            infoTable.cellpadding = '0';
            tdDst.appendChild(infoTable);
            var infoTr = document.createElement('TR');
            infoTable.appendChild(infoTr);
            var infoTd = document.createElement('TD');
            infoTd.style.fontSize = '9px';
            infoTr.appendChild(infoTd);
            var listener = function() {
                // gather data
                var parentsToCopy = new Array();
                var _j = 0;
                var srcElements = iframeElement.contentDocument.body.getElementsByTagName('*');
                for (var _i in srcElements) {
                    var child = srcElements[_i];
                    if (child.className == 'desc') {
                        parentsToCopy[_j++] = child;
                    }
                    if (child.className == 'desc2') {
                        parentsToCopy[_j++] = child.parentNode;
                    }
                }
                // copy
                for (var _i in parentsToCopy) {
                    moveChildren(parentsToCopy[_i], infoTd);
                }
                // remove iframe
                tdDst.removeChild(iframeElement);
                // tweak
                tdDst.width = 150;
                // some cleanup
                if (iframeElement.removeEventListener) {
                    iframeElement.removeEventListener('load', listener, false);
                } else if (iframeElement.detachEvent) {
                    iframeElement.detachEvent('onload', listener);
                }
            };
            if (iframeElement.addEventListener) {
                iframeElement.addEventListener('load', listener, false);
            } else if (iframeElement.attachEvent) {
                iframeElement.attachEvent('onload', listener);
            }
        }
    }
}

function traverse(elem) {
    // change color of posts
    if (elem.tagName == 'DIV') {
        if (elem.className == 'row-comment' 
              || elem.className == 'row-firstpost'
              || elem.className == 'postcolor') {
            elem.style.backgroundColor='#EFEFE3';
            elem.style.padding = '10px';
        }
        if (elem.id) {
            if (elem.id.toString().indexOf('thepost_') == 0) {
                postElements[postElementIndex++] = elem;
            }
        }
    }
    // table columns
    if (elem.tagName == 'TD') {
        // hide unwanted
        if (elem.width == '30%') {
            elem.style.display = 'none';
        }
        // change font and colors
        if (elem.className == 'post-bar2') {
            elem.style.fontSize = '12px';
            elem.style.backgroundColor = '#DFDFD3';
        }
        if (elem.className == 'row-clear' && elem.width == 43) {
            elem.style.backgroundColor = '#EFEFE3';
            elem.parentNode.getElementsByTagName('TD')[1].style.backgroundColor = '#EFEFE3';
        }
    }
    // further traverse
    if (elem.childNodes) {
        for (var childIndex in elem.childNodes) {
            traverse(elem.childNodes[childIndex]);
        }
    }
}

// do the job
traverse(document.body);
for(var childIndex in postElements) {
    if (childIndex != 0) {
        updateProfile(postElements[childIndex], childIndex);
        window.setTimeout(window.__ffclubUpdateProfile[childIndex], 1500 * childIndex);
    }
}

// ==/UserScript==