// ==UserScript==
// @name           LeproImageComments
// @namespace      http://kt.pri.ee/lepra/
// @description    Прячет комментарии без картинок
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// ==/UserScript==

xpathOneEx = function(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
xpathOne = function(query) {
    return xpathOneEx(query, document);
}
xpathMany = function(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

Comment = function(elComment) {
    collectImages = function(node) {
	   if (node.tagName == 'IMG') return [node];
	   var r = Array();
	   for (var i in node.childNodes) {
		   r = r.concat(collectImages(node.childNodes[i]));
       }
       return r;
    }
    this.div = elComment;
    var textDiv = xpathOneEx("div[@class='dt']", this.div);
    this.imgs = collectImages(textDiv);
    this.hasPicture = (this.imgs.length > 0);
}

Comment.prototype.hide = function() {
	this.div.style.display = 'none';
}

Comment.parseAll = function() {
    var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
    var result = Array();
    for (var i = 0; i < comments.snapshotLength; i++) {
        result[i] = new Comment(comments.snapshotItem(i));
    }
    return result;
}

hideNonPictures = function() {
    var cmts = Comment.parseAll();
	for (var i = 0; i < cmts.length; i++) 
        if (!cmts[i].hasPicture) cmts[i].hide();
}

rearrangePictures = function() {
    var root = xpathOne("//div[@id='js-commentsHolder']");
    var cmts = Comment.parseAll();
	root.innerHTML = '';
    for (var i = 0; i < cmts.length; i++)
        for (var j = 0; j < cmts[i].imgs.length; j++) {
            var img = cmts[i].imgs[j];
            var d = document.createElement('div');
            d.setAttribute('style', 'width: 200px; height: 200px; margin: 10px 10px; float: left');
            img.removeAttribute('width');
            img.removeAttribute('height');
            img.setAttribute('style', (img.width > img.height) ? 'width: 100%' : 'height: 100%');
            d.appendChild(img);
            root.appendChild(d);
        }
}

addButton = function(title, onClick) {
	var elButton = document.createElement('td');
	elButton.innerHTML = "<a href='' onclick='return false;'>" + title + "</a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	var panel = xpathOne("//table[@class='category']//tr[@class='kt_panel_1']")
    if (panel == null) {
        var panel = xpathOne("//table[@class='category']//tr")
        var newtr = document.createElement('tr');
        newtr.setAttribute('class', 'kt_panel_1');
        panel.parentNode.appendChild(newtr);
        panel = newtr;
    }
	panel.appendChild(elButton);
}

addButton('Только комментарии с картинками', hideNonPictures);
addButton('Галерея', rearrangePictures);
