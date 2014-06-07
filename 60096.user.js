// ==UserScript==
// @name           Cheggit Tag Flagging
// @namespace      http://www.cothlamadh.net/greasemonkey
// @description    Highlights tags that you would like to be notified of, colors tags that you want to be warned of, and completely removes torrents containing tags that you've marked undesirable.  This is a very significantly modified version of a script originally written by "watergirls"
// @include        http://cheggit.net/users.php?userid=*
// @include        http://cheggit.net/browsetorrents.php
// @include        http://cheggit.net/browsetorrents.php?*
// @include        http://cheggit.net/torrents.php?torrentid=*
// ==/UserScript==

GM_addStyle('td.tabletext span a:visited { color: #666666; font-weight: inherit;}');
GM_addStyle('td.tabletext span a.tag:visited { color: inherit;}');
GM_addStyle('a.goodtag { color: green !important; }');
GM_addStyle('a.warntag { color:orange !important; font-size:100%; }');
GM_addStyle('tr.goodcell { display: table-row !important; visibility: visible !important;}');
GM_addStyle('tr.warncell { display: none; visibility: hidden;}');
GM_addStyle('tr.badcell { display: none !important; visibility: hidden !important;}');
GM_addStyle('a.badtag { color:red !important; font-size:100%; }');
GM_addStyle('a.taglist { font-weight: bold !important; }');

function appendClass(node, newClass) {
    var newClassName;
    var appendName;
    if (typeof newClass == "string" && newClass.trim().length > 0) {
    	appendName = newClass.trim();
    } else if (typeof newClass == 'object' && newClass.constructor == Array && newClass.length > 0) {
    	appendName = newClass.join(' ');
    } else {
    	return;
    }
    if (newClassName = node.getAttribute('class')) {
        newClassName += " " + appendName;
    } else {
        newClassName = appendName;
    }
    newClassName = newClassName.split(' ').unique().join(' ');
    node.setAttribute('class', newClassName);
}

function removeClass(node, newClass) {
    var classNames = node.className.split(' ');
    for (var i = 0; i < classNames.length; i++) {
        if (classNames[i] != newClass) {
            appendClass(node, classNames[i]);
        }
    }
};

Array.prototype.unique =
  function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
      for(var j=i+1; j<l; j++) {
        // If this[i] is found later in the array
        if (this[i] === this[j])
          j = ++i;
      }
      a.push(this[i]);
    }
    return a;
  };

img_green_plus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAABGdBTUEAAK/INwWK6QAAABl0'+
'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABASURBVHjaYmDACxhBxAIckgkM'+
'TMjc//H/gQhZhImBMFjA8B8DQGwkoJsF6sKFjBC74Wyi7GZB8SWSPqIAQIABANSOHUBsegfT'+
'AAAAAElFTkSuQmCC';

img_green_minus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAABGdBTUEAAK/INwWK6QAAABl0'+
'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAwSURBVHjaYmDACxhBxAIckgkM'+
'TPh1E5BmgVD/4/+j27qQkWjdELUk201AmgAACDAAasYEt53mHC8AAAAASUVORK5CYII=';

img_yellow_plus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9i'+
'ZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF////zMwAAAAANJ5ySAAAACJJREFUeNpiYIIDBiZGK'+
'IAwGRgwmQxggM7ErhZhGBwABBgAGVoAdb8Fi4oAAAAASUVORK5CYII=';

img_yellow_minus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZ'+
'SBJbWFnZVJlYWR5ccllPAAAAAlQTFRF////zMwAAAAANJ5ySAAAABxJREFUeNpiYIIDBiZGKM'+
'DNZAADdCYhbXAAEGAAGxIAfXROui0AAAAASUVORK5CYII=';

img_red_plus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAABGdBTUEAAK/INwWK6QAAABl0'+
'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA+SURBVHjaYmLAC1iA+AwOORMG'+
'BiZkvvH//0CELMLEQBAADf+PAc4Qo5sFQp1lZITYDWczkKAb2QwSAECAAQDmzx2dT/4q7wAA'+
'AABJRU5ErkJggg==';

img_red_minus='data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAABGdBTUEAAK/INwWK6QAAABl0'+
'RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAySURBVHjaYmDACxiB+AwOORMG'+
'Bib8uglIs0Ao4///0STOMjISrRuilmS7CUgTAAABBgCBigTjAsuh4QAAAABJRU5ErkJggg==';

var good_tags = GM_getValue("good_tags", "").split(' ');
var warn_tags = GM_getValue("warn_tags", "").split(' ');
var bad_tags = GM_getValue("bad_tags", "").split(' ');

function withoutEmptyEntries(myarray) {
    var copy = new Array();
    for (var i = 0; i < myarray.length; i++) {
        if (myarray[i].length != 0) {
            copy.push(myarray[i]);
        }
    }
    return copy;
}

function saveTags(name, array) {
    var tmp = withoutEmptyEntries(array);
    tmp.sort();
    GM_setValue(name, tmp.join(" "));
}

function saveGoodTags() {
    saveTags("good_tags", good_tags);
}

function addGoodTags(tags) {
    var tmp = tags.split(" ");
    for(var i=0; i<tmp.length; i++) {
        var tag = tmp[i];
        if (tag.length > 0) {
            var idx = good_tags.indexOf(tag);
            if (idx < 0) {
                good_tags.push(tag);
                saveGoodTags();
            }
        }
    }
}

function removeGoodTag(tag) {
    var idx = good_tags.indexOf(tag);
    if (idx >= 0) {
        good_tags.splice(idx, 1);
        saveGoodTags();
    }
}

function isGoodTag(tag) {
    return good_tags.indexOf(tag) >= 0;
}

function saveWarnTags() {
    saveTags("warn_tags", warn_tags);
}

function addWarnTags(tags) {
    var tmp = tags.split(" ");
    for(var i=0; i<tmp.length; i++) {
        var tag = tmp[i];
        if (tag.length > 0) {
            var idx = warn_tags.indexOf(tag);
            if (idx < 0) {
                warn_tags.push(tag);        
                saveWarnTags();
            }
        }
    }
}

function removeWarnTag(tag) {
    var idx = warn_tags.indexOf(tag);
    if (idx >= 0) {
        warn_tags.splice(idx, 1);
        saveWarnTags();
    }
}

function isWarnTag(tag) {
    return warn_tags.indexOf(tag) >= 0;
}

function saveBadTags() {
    saveTags("bad_tags", bad_tags);
}

function addBadTags(tags) {
    var tmp = tags.split(" ");
    for(var i=0; i<tmp.length; i++) {
        var tag = tmp[i];
        if (tag.length > 0) {
            var idx = bad_tags.indexOf(tag);
            if (idx < 0) {
                bad_tags.push(tag);        
                saveBadTags();
            }
        }
    }
}

function removeBadTag(tag) {
    var idx = bad_tags.indexOf(tag);
    if (idx >= 0) {
        bad_tags.splice(idx, 1);
        saveBadTags();
    }
}

function isBadTag(tag) {
    return bad_tags.indexOf(tag) >= 0;
}

function output(text) {
  //print(text);
  GM_log(text);
}

function remove_all_IMGs() {
    var images = document.getElementsByTagName('img');    
    for (var i=0; i < images.length; i++) {
        var image = images[i];
        var image_clazz = image.getAttribute("class");
        if (image_clazz == "cheggitTagHighlight") {
            var deleted = image.parentNode.removeChild(image);
        }
    }
}

function insertBefore_IMG(element, img_data, style) {
    var img_element = document.createElement('img');
    img_element.setAttribute("src", img_data);
    img_element.setAttribute("style", style);
    img_element.setAttribute("class", "cheggitTagHighlight");
    element.parentNode.insertBefore(img_element, element);
    return img_element;
}

function insertAfter_IMG(element, img_data, style) {
    return insertBefore_IMG(element.nextSibling, img_data, style);
}

function newClosureAddGoodTag(someTag, someLink, someIMG1, someIMG2, someIMG3) {
    var tag = someTag;
    var link = someLink;
    var delIMG1 = someIMG1;
    var delIMG2 = someIMG2;
    var delIMG3 = someIMG3;
    return function(evt) {
        addGoodTags(tag);
        link.parentNode.removeChild(delIMG1);
        link.parentNode.removeChild(delIMG2);
        link.parentNode.removeChild(delIMG3);
        link.setAttribute("class", "tag goodtag");
        var img = insertBefore_IMG(link, img_green_minus, "padding-right: 6px;");
        img.addEventListener('click', newClosureRemoveGoodTag(tag, link, img), true);
    }
}

function newClosureAddWarnTag(someTag, someLink, someIMG1, someIMG2, someIMG3) {
    var tag = someTag;
    var link = someLink;
    var delIMG1 = someIMG1;
    var delIMG2 = someIMG2;
    var delIMG3 = someIMG3;
    return function(evt) {
        addWarnTags(tag);
        link.parentNode.removeChild(delIMG1);
        link.parentNode.removeChild(delIMG2);
        link.parentNode.removeChild(delIMG3);
        link.setAttribute("class", "tag warntag");
        var img = insertBefore_IMG(link, img_yellow_minus, "padding-right: 6px;");
        img.addEventListener('click', newClosureRemoveWarnTag(tag, link, img), true);
    }
}

function newClosureAddBadTag(someTag, someLink, someIMG1, someIMG2, someIMG3) {
    var tag = someTag;
    var link = someLink;
    var delIMG1 = someIMG1;
    var delIMG2 = someIMG2;
    var delIMG3 = someIMG3;
    return function(evt) {
        addBadTags(tag);
        link.parentNode.removeChild(delIMG1);
        link.parentNode.removeChild(delIMG2);
        link.parentNode.removeChild(delIMG3);
        link.setAttribute("class", "tag badtag");
        var img = insertBefore_IMG(link, img_red_minus, "padding-right: 6px;");
        img.addEventListener('click', newClosureRemoveBadTag(tag, link, img), true);
    }
}

function resetTagImages(img, tag, link) {
    link.parentNode.removeChild(img);
    link.setAttribute("style", "");
    
    var img1 = insertBefore_IMG(link, img_green_plus, "padding-right: 6px;");
    var img2 = insertBefore_IMG(link, img_yellow_plus, "padding-right: 6px;");
    var img3 = insertBefore_IMG(link, img_red_plus, "padding-right: 6px;");
    img1.addEventListener('click', newClosureAddGoodTag(tag, link, img1, img2, img3), true);
    img2.addEventListener('click', newClosureAddWarnTag(tag, link, img1, img2, img3), true);
    img3.addEventListener('click', newClosureAddBadTag(tag, link, img1, img2, img3), true);
}

function newClosureRemoveGoodTag(someTag, someLink, someIMG) {
    return function(evt) {
        someLink.removeAttribute('class');
        removeGoodTag(someTag);
        resetTagImages(someIMG, someTag, someLink);
    }
}

function newClosureRemoveWarnTag(someTag, someLink, someIMG) {
    return function(evt) {
        someLink.setAttribute('class', 'tag');
        removeWarnTag(someTag);
        resetTagImages(someIMG, someTag, someLink);
    }
}

function newClosureRemoveBadTag(someTag, someLink, someIMG) {
    return function(evt) {
        someLink.setAttribute('class', 'tag');
        removeBadTag(someTag);
        resetTagImages(someIMG, someTag, someLink);
    }
}

function addFavoritesBox() {
    var topTagsBox = document.getElementById('browsetorrentsTopTags');
    if (!topTagsBox) {
        return;
    }
    var newtext = '<p class="title" onclick="if (document.getElementById(\'favorite-tags-collapse\').innerHTML.match(\'-\')) { document.getElementById(\'favorite-tags\').style.display=\'none\'; document.getElementById(\'favorite-tags-collapse\').innerHTML=\'+\'; } else { document.getElementById(\'favorite-tags\').style.display=\'inline\'; document.getElementById(\'favorite-tags-collapse\').innerHTML=\'-\'; }">Favorite Tags <span id="favorite-tags-collapse">+</span></p>';
    newtext += '<ul id="favorite-tags" style="display: none">';
    for (var i = 0; i < good_tags.length; i++) {
        newtext += '<li><a class="tag goodtag" href="browsetorrents.php?filter=' + good_tags[i] +'">' + good_tags[i] + '</a></li>';
    }
    for (var i = 0; i < warn_tags.length; i++) {
        newtext += '<li><a class="tag warntag" href="browsetorrents.php?filter=' + warn_tags[i] +'">' + warn_tags[i] + '</a></li>';
    }
    for (var i = 0; i < bad_tags.length; i++) {
        newtext += '<li><a class="tag badtag" href="browsetorrents.php?filter=' + bad_tags[i] +'">' + bad_tags[i] + '</a></li>';
    }
    newtext += '</ul>';
    topTagsBox.innerHTML = newtext;
}

function colorizeTags() {
    addFavoritesBox();

    var ccenter = document.getElementById('browsetorrentsTopTags');
    var tags = document.getElementById('tags');
    if (tags) {
        var links = tags.getElementsByTagName('a');
    } else if (ccenter) {
        var links = ccenter.getElementsByTagName('a');        
    } else {
	var links = Array();
    }
    for (var i=0; i < links.length; i++) {
        var link = links[i];
	if (link.href.match("browsetorrents\\.php\\?filter=$")) {
		continue;
	}
	//alert(link.href);
        if ((link.href.indexOf("tags.php?filter=") >= 0 && link.innerHTML != "Go To Cloud")
                || link.href.indexOf("browsetorrents.php?filter=") >= 0) {
            var tag = link.firstChild.nodeValue;
            if (isGoodTag(tag)) {
                link.setAttribute("class", "tag goodtag");
                var img = insertBefore_IMG(link, img_green_minus, "padding-right: 6px;");
                img.addEventListener('click', newClosureRemoveGoodTag(tag, link, img), true);
            }
            else if (isWarnTag(tag)) {
                link.setAttribute("class", "tag warntag");
                var img = insertBefore_IMG(link, img_yellow_minus, "padding-right: 6px;");
                img.addEventListener('click', newClosureRemoveWarnTag(tag, link, img), true);
            }
            else if (isBadTag(tag)) {
                link.setAttribute("class", "tag badtag");
                var img = insertBefore_IMG(link, img_red_minus, "padding-right: 6px;");
                img.addEventListener('click', newClosureRemoveBadTag(tag, link, img), true);
            }
            else
            {
                var img1 = insertBefore_IMG(link, img_green_plus, "padding-right: 6px;");
                var img2 = insertBefore_IMG(link, img_yellow_plus, "padding-right: 6px;");
                var img3 = insertBefore_IMG(link, img_red_plus, "padding-right: 6px;");
                img1.addEventListener('click', newClosureAddGoodTag(tag, link, img1, img2, img3), true);
                img2.addEventListener('click', newClosureAddWarnTag(tag, link, img1, img2, img3), true);
                img3.addEventListener('click', newClosureAddBadTag(tag, link, img1, img2, img3), true);
            }
            continue;
        }
    }

    var ccenter = document.getElementById('ccenter');
    if (ccenter) {
        var links = ccenter.getElementsByTagName('a');
        for (var i=0; i < links.length; i++) {
            var link = links[i];
            if (link.className == "tag") {
                var tagname = link.firstChild.nodeValue;
                if (isGoodTag(tagname)) {
                    appendClass(link, 'goodtag taglist');
                    link.parentNode.parentNode.childNodes[1].firstChild.style.fontWeight = "bold";
                    removeClass(link.parentNode.parentNode.parentNode, "warncell");
                    appendClass(link.parentNode.parentNode.parentNode, "goodcell");
                }
                else if (isWarnTag(tagname)) {
                    appendClass(link, 'warntag taglist');
                    appendClass(link.parentNode.parentNode.parentNode, "warncell");
                }
                else if (isBadTag(tagname)) {
                    appendClass(link, 'badtag taglist');
                    removeClass(link.parentNode.parentNode.parentNode, "goodcell");
                    removeClass(link.parentNode.parentNode.parentNode, "warncell");
                    appendClass(link.parentNode.parentNode.parentNode, "badcell");
                }
            }
        }
    }
}

colorizeTags();
