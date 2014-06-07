// ==UserScript==
// @name           ptchan images
// @namespace      
// @description    expande imagens
// @include        http://www.ptchan.net/*/res/*
// @version        v1.551
// ==/UserScript==

// you should know what you're doing
const PARTIAL_EXPANSION = false;
const PARTIAL_WIDTH = 1024;
const PARTIAL_HEIGHT = 768;

const d = document;
function nsResolver(prefix) {
    var ns = { "xhtml" : "http://www.w3.org/1999/xhtml" };
    return ns[prefix] || null;
}
var ns = d.evaluate("count(/xhtml:html)", d, nsResolver, XPathResult.NUMBER_TYPE, null).numberValue > 0 ? "xhtml:" : "";

function $node(xpath, context) {
    xpath = xpath.replace(/(\:+)/g, "$1" + ns).replace(/(\/+)/g, "$1" + ns);
    return d.evaluate(xpath, context || d, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function $xpath(xpath) {
    xpath = xpath.replace(/(\:+)/g, "$1" + ns).replace(/(\/+)/g, "$1" + ns);
    return d.evaluate(xpath, d, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

if(!$node("//a[text() = 'Return']")) return;
var yotsuba = /^.*\.4chan\.org$/.test(window.location.hostname)

for(i in d.styleSheets) {
    if(!d.styleSheets[i].disabled && d.styleSheets[i].title) {
        cssName = d.styleSheets[i].title.toLowerCase();
    }
}

if(/burichan|yotsuba b/.test(cssName)) {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwXBBMjQpg9JwAAAF1JREFUOMtjYBhsgBGZw88T%2B58UzR%2B%2FLIbrZ0E2pKq9gCRXtFUy%2FIcZxkRIcVmOLkNZji5BQ5moFUaDzyAWbGGCK6yQQdeUy3RyEbpNMJegi4%2FkWCMUZjTPtIMPAADZdxyhrs93egAAAABJRU5ErkJggg%3D%3D";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwXBBMlq%2FuYEgAAAEtJREFUOMtjYBhsgBGZw88T%2B58UzR%2B%2FLIbrZ0E2pKq9gCRXtFUy%2FIcZxkQtrw1jg1jQBcpydInS2DXlMp1chG7TaKxRzyCqZdrBBwB%2BShSBpVB6HAAAAABJRU5ErkJggg%3D%3D";
} else if(/gurochan/.test(cssName)) {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQWGIeS82IAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAAERJREFUOMtjSJj2n4EamIEmBjUyMPwnBWM1CCRxelI1SRjZMIIG/f//C4xHDUIYBNNICNPPoNFYI90gkrMI1TLtoCmPAJxvC/IynNPtAAAAAElFTkSuQmCC";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQYNsXH0yMAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAADxJREFUOMtjSJj2n4EamIEmBjUyMPwnBWM1CCRxelI1SRjZsFGDyDDo//9fRGH6GTQaa3QwiGqZdtCURwBjbfnjPXIHLQAAAABJRU5ErkJggg==";
} else if(/photon/.test(cssName)) {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQXDx1aR+QAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAAENJREFUOMtjSJj2n4EamIEmBgHBf1IwVoNAEmfPniEJIxtG0KD//3+B8ahBCINgGglh+hk0GmukG0RyFqFaph005REAJWMvqkq8KHcAAAAASUVORK5CYII=";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQYNCvJsg8AAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAADtJREFUOMtjSJj2n4EamIEmBgHBf1IwVoNAEmfPniEJIxs2ahAZBv3//4soTD+DRmONDgZRLdMOmvIIALQLJorS6zDXAAAAAElFTkSuQmCC";
} else if(/not4chan/.test(cssName)) {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwVFiIAkwn0cgAAAFlJREFUOMtjYBhsgBGZY1/g9p8UzQcn7ILrZ0E2xNHRiVSH/IcZxkRIZb1fEUO9XxFBE5moFUaDzyAWbGGCK6yQQeOmPjq5CN0mmEvQxUdyrBEKM5pn2sEHAKRbGyWP74NIAAAAAElFTkSuQmCC";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwVFiIN7biIzwAAAEhJREFUOMtjYBhsgBGZY1/g9p8UzQcn7ILrZ0E2xNHRiVSH/IcZxkQtrw1jg1jQBer9iojS2Lipj04uQrdpNNaoZxDVMu3gAwCFqBKlTKME8QAAAABJRU5ErkJggg==";
} else { // default to futaba
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEX%2FAP%2BfQDuAAAD%2F%2F%2FoaBukIAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVDAgPEh4HxOhfAAAAJ0lEQVQI12NgQAJMq1atYGDgDA0NA5FfsZP%2F%2F3%2BDk7jUgE2AmIYEAFiDGVHNVlhQAAAAAElFTkSuQmCC";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEX%2FAP%2BfQDuAAAD%2F%2F%2FoaBukIAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfVDAgPEjDbEuWQAAAAI0lEQVQI12NgQAJMq1atYGDgDA0Nw0P%2B%2F%2F8NTuJVCTENCQAASnQUUY5hgOAAAAAASUVORK5CYII%3D";
}

var images = $xpath("//img[@md5 or @class='thumb']");
var replies = $xpath("//blockquote");
var thumbmsg = $xpath("//*[@class='thumbnailmsg']");
var sizes = $node("//*[@class='filesize']");
var buttonplace = $node("//form[@*='delform']");

img_ex = d.createElement("img");
img_ex.setAttribute("style", "cursor: pointer; vertical-align: text-bottom;");
img_ex.setAttribute("src", img_plus);
img_ex.setAttribute("title", "Expand All Images");
img_ex.setAttribute("onclick", "expandImagesPartial()");

if(!yotsuba && !$node("ancestor::td[1]", sizes)) buttonplace = sizes.parentNode;
if(yotsuba && $node("child::div[1]", buttonplace)) buttonplace = buttonplace.firstChild;
buttonplace.insertBefore(img_ex, buttonplace.firstChild);

unsafeWindow.expandImagesPartial = function() {
    for(i = 0; i < images.snapshotLength; i++) {
        link = $node("ancestor::a[1]", images.snapshotItem(i));
        if(!/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)) continue;
        reply = $node("ancestor::*[1]", link);
        fullimg = images.snapshotItem(i).cloneNode(false);
        fullimg.setAttribute("src", link.href);
        fullimg.setAttribute("border", "0");
        fullimg.setAttribute("hspace", "20");
        if(PARTIAL_EXPANSION) { // I'm not sure how this works at all
            fullsize = $node("child::*[@class='filesize']", reply).textContent.match(/(\d+)x(\d+)/);
            fullwidth = fullsize[1];
            fullheight = fullsize[2];
            if(fullwidth > PARTIAL_WIDTH) {
                fullimg.setAttribute("width", Math.min(PARTIAL_WIDTH, PARTIAL_HEIGHT / fullheight * fullwidth));
                fullimg.setAttribute("height", Math.min(PARTIAL_HEIGHT, PARTIAL_WIDTH / fullwidth * fullheight));
            } else {
                if(fullheight > PARTIAL_HEIGHT) {
                    fullimg.setAttribute("width", PARTIAL_HEIGHT / fullheight * fullwidth);
                    fullimg.setAttribute("height", PARTIAL_HEIGHT);
                } else {
                    fullimg.setAttribute("width", fullwidth);
                    fullimg.setAttribute("height", fullheight);
                }
            }
        }
        fullimg.removeAttribute("class");
        fullimg.removeAttribute("align");
        link.insertBefore(fullimg, link.firstChild);
        if(!$node("ancestor::td[1]", link) && (!yotsuba || (yotsuba && link.childNodes.length == 2))) {
            reply.insertBefore(link, replies.snapshotItem(0));
            reply.insertBefore(d.createElement("br"), link);
        }
        images.snapshotItem(i).style.setProperty("display", "none", "");
    }
    for(i = 0; i < thumbmsg.snapshotLength; i++) {
        thumbmsg.snapshotItem(i).style.setProperty("display", "none", "important");
    }
    
    img_ex.setAttribute("onclick", "expandImagesFull()");
    img_ex.setAttribute("src", img_plus);
    if(!PARTIAL_EXPANSION) unsafeWindow.expandImagesFull();
}

unsafeWindow.expandImagesFull = function() {
    for(i = 0; i < images.snapshotLength; i++) {
        link = $node("ancestor::a[1]", images.snapshotItem(i));
        if(!/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)) continue;
        fullsize = $node("child::*[@class='filesize']", $node("ancestor::*[1]", link)).textContent.match(/(\d+)x(\d+)/);
        fullimg = $node("child::img[1]", link);
        fullimg.setAttribute("width", fullsize[1]);
        fullimg.setAttribute("height", fullsize[2]);
    }
    
    img_ex.setAttribute("onclick", "collapseImages()");
    img_ex.setAttribute("src", img_minus);
}

unsafeWindow.collapseImages = function() {
    for(i = 0; i < images.snapshotLength; i++) {
        link = $node("ancestor::a[1]", images.snapshotItem(i));
        if(!/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)) continue;
        reply = $node("ancestor::*[1]", link);
        link.removeChild($node("child::img[1]", link));
        if(!$node("ancestor::td[1]", link)) {
            if(yotsuba && link.childNodes.length == 1) {
                reply.removeChild(link.previousSibling);
            } else if(!yotsuba) {
                reply.removeChild(link.previousSibling);
                reply.insertBefore(link, sizes.nextSibling.nextSibling.nextSibling.nextSibling);
            }
        }
        images.snapshotItem(i).style.setProperty("display", ((yotsuba && link.childNodes.length > 1) ? "none" : ""), "");
    }
    for(i = 0; i < thumbmsg.snapshotLength; i++) {
        thumbmsg.snapshotItem(i).style.setProperty("display", "", "important");
    }
    
    img_ex.setAttribute("onclick", "expandImagesPartial()");
    img_ex.setAttribute("src", img_plus);
}

// Image & reply count
img_count = d.createElement("span");
img_count.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; padding: 2px; font-size: small;");
img_count.textContent = "Images: " + images.snapshotLength + " Replies: " + (replies.snapshotLength - 1);
d.body.appendChild(img_count);