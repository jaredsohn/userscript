// ==UserScript==
// @name           LeproSimplify
// @namespace      http://kt.pri.ee/lepra/
// @description    Убирает картинки из постов и сокращает тексты. Или наоборот, добавляет случайные картинки.
// @include        http://leprosorium.ru/
// @include        http://*.leprosorium.ru/
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

swapDOM = function(oldnode, newnode) {
    oldnode.parentNode.insertBefore(newnode, oldnode);
    oldnode.parentNode.removeChild(oldnode);
    return oldnode;
}

Post = function(elPost) {
    collectText = function(node) {
        if (node.tagName == 'IMG') return ' [КАРТИНКА]';
        if (node.tagName == 'BR') return '\n';
        var r = node.nodeValue ? node.nodeValue : '';
        for (var i in node.childNodes) {
            r = r + ' ' + collectText(node.childNodes[i]);
        }
        return r;
    }
    this.div = elPost;
    this.textDiv = xpathOneEx("div[@class='dt']", elPost);
    this.dataDiv = xpathOneEx("div[@class='dd']", elPost);
    this.author = xpathOneEx("div[@class='dd']//a[@class='js-user_login']", elPost).innerHTML;
    this.rating = parseInt(xpathOneEx("div[@class='dd']//span[@class='rating']/em", elPost).innerHTML);
    this.linkSPAN = xpathOneEx("div[@class='dd']/div[@class='p']/span", elPost);
    this.text = collectText(this.textDiv);
    this.textShort = this.text;
    if (this.textShort.length > 100) {
        this.textShort = this.textShort.substr(0, 90) + '...';
    }
    this.simpleTextDiv = document.createElement('div');
    this.simpleTextDiv.setAttribute("class", "dt");
    this.simpleTextDiv.innerHTML = this.textShort;

    this.randomPicID = Math.floor(Math.random()*156500*3) + 504501;
    this.randomPic = document.createElement('img');
    this.randomPic.setAttribute("src", "http://img.leprosorium.com/" + this.randomPicID);

    this.imgTextDiv = document.createElement('div');
    this.imgTextDiv.setAttribute("class", "dt");
    this.imgTextDiv.appendChild(document.createTextNode(this.text.replace('[КАРТИНКА]','')));
    this.imgTextDiv.appendChild(document.createElement('br'));
    this.imgTextDiv.appendChild(this.randomPic);
}

Post.prototype.simplify = function() {
    swapDOM(this.textDiv, this.simpleTextDiv);
    this.div.style.paddingBottom = '15px';
}

Post.prototype.refactor = function() {
    swapDOM(this.textDiv, this.imgTextDiv);
}


Post.parseAll = function() {
    var result = Array();
    posts = xpathMany('//div[@id="js-posts_holder"]/div[contains(@class,"post")]');
    for (var i = 0; i < posts.snapshotLength; i++) result[i] = new Post(posts.snapshotItem(i));
    return result;
}

addButton = function(title, onClick) {
	var elButton = document.createElement('li');
	elButton.innerHTML = "<a href='' onclick='return false;'><span><em>" + title + "</em></span></a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne("//ul[@class='menu']")
	panel.appendChild(elButton);
}

simplify = function() {
    posts = Post.parseAll();
    for (var i = 0; i < posts.length; i++) posts[i].simplify();
}

refactor = function() {
    posts = Post.parseAll();
    for (var i = 0; i < posts.length; i++) posts[i].refactor();
}

addButton('Упростить!', simplify);
addButton('Улучшить картинки!', refactor);