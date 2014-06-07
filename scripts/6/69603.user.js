// ==UserScript==
// @name           4chan Expand Images (modified) + works with 4shadow
// @namespace      http://www.4chan.org
// @description    Expand images on 4chan, kusaba and wakaba-style boards by clicking on + button in reply mode
// @include        */res/*.*html*
// @version        v1.03
// ==/UserScript==

var expanded = false;
var limitMode = "height";

var d = document;

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
var yotsuba = (/\.4chan\.org/.test(d.URL)) ? true : false;

for(i in d.styleSheets) {
    if(!d.styleSheets[i].disabled && d.styleSheets[i].title) {
        cssName = d.styleSheets[i].title.toLowerCase();
    }
}

if(cssName == "burichan" || cssName == "yotsuba b") {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwXBBMjQpg9JwAAAF1JREFUOMtjYBhsgBGZw88T%2B58UzR%2B%2FLIbrZ0E2pKq9gCRXtFUy%2FIcZxkRIcVmOLkNZji5BQ5moFUaDzyAWbGGCK6yQQdeUy3RyEbpNMJegi4%2FkWCMUZjTPtIMPAADZdxyhrs93egAAAABJRU5ErkJggg%3D%3D";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QwXBBMlq%2FuYEgAAAEtJREFUOMtjYBhsgBGZw88T%2B58UzR%2B%2FLIbrZ0E2pKq9gCRXtFUy%2FIcZxkQtrw1jg1jQBcpydInS2DXlMp1chG7TaKxRzyCqZdrBBwB%2BShSBpVB6HAAAAABJRU5ErkJggg%3D%3D";
} else if(cssName == "gurochan") {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQWGIeS82IAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAAERJREFUOMtjSJj2n4EamIEmBjUyMPwnBWM1CCRxelI1SRjZMIIG/f//C4xHDUIYBNNICNPPoNFYI90gkrMI1TLtoCmPAJxvC/IynNPtAAAAAElFTkSuQmCC";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQYNsXH0yMAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAADxJREFUOMtjSJj2n4EamIEmBjUyMPwnBWM1CCRxelI1SRjZsFGDyDDo//9fRGH6GTQaa3QwiGqZdtCURwBjbfnjPXIHLQAAAABJRU5ErkJggg==";
} else if(cssName == "photon") {
    img_plus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQXDx1aR+QAAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAAENJREFUOMtjSJj2n4EamIEmBgHBf1IwVoNAEmfPniEJIxtG0KD//3+B8ahBCINgGglh+hk0GmukG0RyFqFaph005REAJWMvqkq8KHcAAAAASUVORK5CYII=";
    img_minus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9gJHgQYNCvJsg8AAAAjdEVYdFNvZnR3YXJlAFBpeGlhOlNfUE5HKE1hc3NhIFZlcnNpb24pe1aJ/gAAADtJREFUOMtjSJj2n4EamIEmBgHBf1IwVoNAEmfPniEJIxs2ahAZBv3//4soTD+DRmONDgZRLdMOmvIIALQLJorS6zDXAAAAAElFTkSuQmCC";
} else if(cssName == "not4chan") {
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
img_ex.setAttribute("onclick", "expandImages()");

img_ex2 = d.createElement("div");
img_ex2.innerHTML = "<a id='limitMode' href='javascript:toggleLimit()'>"+limitMode+"</button>";

img_ex3 = d.createElement("div");
img_ex3.innerHTML = "<a href='javascript:addFilenames()'>-</a>";

if(!yotsuba && !$node("ancestor::td[1]", sizes)) buttonplace = sizes.parentNode;
if(yotsuba && $node("child::div[1]", buttonplace)) buttonplace = buttonplace.firstChild;
buttonplace.insertBefore(img_ex, buttonplace.firstChild);
buttonplace.insertBefore(img_ex2, buttonplace.firstChild);
buttonplace.insertBefore(img_ex3, buttonplace.firstChild);


unsafeWindow.getContent = function(){
	images = $xpath("//img[@md5 or @class='thumb']");
	replies = $xpath("//blockquote");
	thumbmsg = $xpath("//*[@class='thumbnailmsg']");
	sizes = $node("//*[@class='filesize']");
}



unsafeWindow.addFilenames = function(){
	unsafeWindow.getContent();
	for(i = 0; i < images.snapshotLength; i++) {
		link = $node("ancestor::a[1]", images.snapshotItem(i));
		// 7chan only 
		link.href = link.href + "?file_" + i;
	}
}

unsafeWindow.toggleLimit = function(){
	if(limitMode == "height"){
		limitMode = "width";
	}else{
		limitMode = "height";
	}
	var obj = document.getElementById('limitMode');
	obj.innerHTML = limitMode;
	unsafeWindow.expandNewImages();
}

unsafeWindow.expandNewImages = function(){
	if(expanded){
		unsafeWindow.collapseImages();
		unsafeWindow.getContent();
		unsafeWindow.expandImages();
	}else{
		unsafeWindow.getContent();
	}
}

unsafeWindow.expandImages = function() {
	expanded = true;
    for(i = 0; i < images.snapshotLength; i++) {
        link = $node("ancestor::a[1]", images.snapshotItem(i));
        if(!/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)) continue;
        reply = $node("ancestor::*[1]", link);
        fullimg = images.snapshotItem(i).cloneNode(false);
        fullimg.setAttribute("src", link.href);
        fullimg.setAttribute("border", "0");
        fullimg.setAttribute("hspace", "20");
	  var width = reply.textContent.match(/([0-9]+)x[0-9]+/)[1];
	  var displayWidth = width;
	  var height = reply.textContent.match(/[0-9]+x([0-9]+)/)[1];
	  var displayHeight = height;
	  if(limitMode == "height"){
	 	if(height > 750){
			displayHeight = 750;
			displayWidth = 750/height * width;
	  	}else if(width > 800){
			displayWidth = 800;
			displayHeight = 800/width * height;
	  	}	
	  }else{
	  	if(width > 800){
			displayWidth = 800;
			displayHeight = 800/width * height;
	  	}
	  }
        fullimg.setAttribute("width", displayWidth);
        fullimg.setAttribute("height", displayHeight);
        fullimg.removeAttribute("class");
        fullimg.removeAttribute("align");
        link.insertBefore(fullimg, link.firstChild);
        if(!$node("ancestor::td[1]", link) && (!yotsuba || (yotsuba && link.childNodes.length == 2))) {
            reply.insertBefore(link, replies.snapshotItem(0));
            reply.insertBefore(d.createElement("br"), link);
        }
        images.snapshotItem(i).style.setProperty("display", "none", "important");
    }
    for(i = 0; i < thumbmsg.snapshotLength; i++) {
        thumbmsg.snapshotItem(i).style.setProperty("display", "none", "important");
    }

    img_ex.setAttribute("onclick", "collapseImages()");
    img_ex.setAttribute("src", img_minus);
}

unsafeWindow.collapseImages = function() {
	expanded = false;
    for(i = 0; i < images.snapshotLength; i++) {
        link = $node("ancestor::a[1]", images.snapshotItem(i));
        if(!/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)) continue;
        reply = $node("ancestor::*[1]", link);
        link.removeChild($node("child::img[1]", link));
        if(!$node("ancestor::td[1]", link)) {
            if(yotsuba && link.childNodes.length == 1) {
                reply.removeChild(link.previousSibling);
                reply.insertBefore(link, sizes.nextSibling);
            } else if(!yotsuba) {
                reply.removeChild(link.previousSibling);
                reply.insertBefore(link, sizes.nextSibling.nextSibling.nextSibling.nextSibling);
            }
        }
        images.snapshotItem(i).style.setProperty("display", ((yotsuba && link.childNodes.length > 1) ? "none" : ""), "important");
    }
    for(i = 0; i < thumbmsg.snapshotLength; i++) {
        thumbmsg.snapshotItem(i).style.setProperty("display", "", "important");
    }

    img_ex.setAttribute("onclick", "expandImages()");
    img_ex.setAttribute("src", img_plus);
}

// Image & reply count
img_count = d.createElement("span");
img_count.setAttribute("style", "position: fixed; bottom: 0px; right: 0px; padding: 2px; font-size: small;");
img_count.textContent = "Images: " + images.snapshotLength + " Replies: " + (replies.snapshotLength - 1);
d.body.appendChild(img_count);