// ==UserScript==
// @name           Find Distorted Images
// @namespace      http://thomas-rosenau.de/
// @include        file:///*
// @include        *
// @description    Draws borders around images that have "wrong" sizing parameters
// ==/UserScript==

function toArray(obj) {
    var result = new Array();
    for (var i in obj) {
        result.push(obj[i]);
    }
    return result;
}

function correspondingImage(obj) {
    if(obj.tagName.toLowerCase() == 'img')
        return obj;
    else if (obj.src) {
        var newImage = new Image();
        newImage.src = obj.src;
        return newImage;
    } else return null;
}

window.addEventListener('load', function() {
    var graphics = toArray(document.images);
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'image') graphics.push(inputs[i]);
    }
    for (var i = 0; i < graphics.length; i++) {
        var node = graphics[i];
        var img = correspondingImage(node);
        var wOrig = img.naturalWidth;
        var hOrig = img.naturalHeight;
        if (wOrig == 1 && hOrig == 1) continue; // spacer GIFs, Webbugs etc.
        var hRendered = parseInt(.5 + parseFloat(document.defaultView.getComputedStyle(node, null).getPropertyValue('height')));
        var wRendered = parseInt(.5 + parseFloat(document.defaultView.getComputedStyle(node, null).getPropertyValue('width')));
        var wAttrib = node.getAttribute('width');
        var hAttrib = node.getAttribute('height');
        var wCss = node.style.width;
        var hCss = node.style.height;
        if (wOrig != wRendered || hOrig != hRendered || (wAttrib == null && !wCss) || (hAttrib == null && !hCss)) {
            node.title = '';
            if ((wOrig + 'px' != wCss) && (wCss != ''))
                node.title += 'width(CSS): ' + wCss + ', originalWidth: ' + (wOrig ? wOrig + 'px' : '\u2718');
            else if (wOrig != wAttrib && (wCss == ''))
                node.title += 'width = ' + ((wAttrib == null) ? '\u2718' : wAttrib) + ', originalWidth = ' + (wOrig ? wOrig : '?');
            if ((hOrig + 'px' != hCss) && (hCss != ''))
                node.title = (node.title ? node.title + '; ' : '')
                            + 'height(CSS): ' + hCss + ', originalHeight: ' + (hOrig ? hOrig + 'px' : '\u2718');
            else if (hOrig != hAttrib && (hCss == ''))
                node.title = (node.title ? node.title + '; ' : '')
                            + 'height = ' + ((hAttrib == null) ? '\u2718' : hAttrib) + ', originalHeight = ' + (hOrig ? hOrig : '?');
            if (node.tagName.toLowerCase() == 'input') node.title = '[input] ' + node.title;
            with(node.style) {
                outlineColor = (!wOrig || !hOrig) ? 'orangered' : 'gold';
                outlineWidth = '3px';
                outlineStyle = 'dashed';
            }
            if (wOrig && hOrig && (wOrig != wRendered || hOrig != hRendered)) {
                node.style.outlineColor = 'deeppink';
                node.style.cursor = (wOrig == wRendered) ? 's-resize' : (hOrig == hRendered) ? 'e-resize' : 'se-resize';
                node.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clicked = !this.clicked;
                    if (this.clicked) {
                        this.originalCssWidth = this.style.width;
                        this.originalCssHeight = this.style.height;
                        this.style.width = correspondingImage(this).naturalWidth + 'px';
                        this.style.height = correspondingImage(this).naturalHeight + 'px';
                        this.style.outlineColor = 'greenyellow';
                    } else {
                        this.style.width = this.originalCssWidth;
                        this.style.height = this.originalCssHeight;
                        this.style.outlineColor = 'deeppink';
                    }
                    return false;
                }, false);
            }
        }
        // node.title = wOrig + ', ' + hOrig + ', ' + wRendered + ', ' + hRendered + ', ' + wAttrib + ', ' + hAttrib + ', ' + wCss + ', ' + hCss // DEBUG
    }
}, false);
