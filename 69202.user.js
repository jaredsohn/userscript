// ==UserScript==

// @name FFClub color rewind classic
// @namespace hotlap.ru/ffclub/se
// @description Return FFClub classic colors and format
// @author Bris
// @author joedm
// @include http://*ffclub.ru*

var postElements = new Array();
var postElementIndex = 0;

function moveChildren(src, dst) {
    while (src.childNodes.length > 0) {
        var child = src.firstChild;
        src.removeChild(child);
        dst.appendChild(child);       
    } 
}

function changeAvatar(elem) {
    var divTables = elem.getElementsByTagName('TABLE');
    var srcTable = divTables[0];
    var tdSrc = srcTable.getElementsByTagName('TD')[0];
    var dstTable = divTables[1];
    var tdDst = dstTable.getElementsByTagName('TD')[0];
    // move avatar into new table
    moveChildren(tdSrc, tdDst);
    // change avatar picture
    var profileElem = tdDst.getElementsByClassName('profile_mini')[0];
    if (profileElem) {
        var avatar = profileElem.firstChild;
        var avatarSrc = avatar.src;
        var lastSlash = avatarSrc.lastIndexOf('/');
        if (lastSlash > 0) {
            var avatarName = avatarSrc.substr(lastSlash + 1);
            var index24 = avatarName.indexOf('_24');
            if (index24 > 0) {
                avatarName = avatarName.substr(0, index24) + avatarName.substr(index24 + 3);
                avatar.src = avatarSrc.substr(0, lastSlash + 1) + avatarName;
            }
        }
        if (avatar.width && avatar.height) {
            if (avatar.width < 64 && avatar.height < 64) {
                avatar.width = 64;
                avatar.height = 64;
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
        for(var childIndex in elem.childNodes) {
            traverse(elem.childNodes[childIndex]);
        }
    }
}

// do the job
traverse(document.body);
for(var childIndex in postElements) {
    if (childIndex != 0) {
        changeAvatar(postElements[childIndex]);
    }
}

// ==/UserScript==