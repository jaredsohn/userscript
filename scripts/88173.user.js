// ==UserScript==
// @name           LeproSummary
// @namespace      http://kt.pri.ee/lepra/
// @description    Показывает облака тегов вместо содержания поста.
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

var badLetters = /[^абвгдеёжзийклмнопрстуфхцчшщъыьэюя]/ig;

Comment = function(elComment) {
    collectText = function(node) {
       var r = node.nodeValue ? node.nodeValue : '';
       r = r.toLowerCase();
       r = r.replace(badLetters,' ');
       for (var i in node.childNodes) {
           r = r + ' ' + collectText(node.childNodes[i]);
       }
       return r;
    }
    this.div = elComment;
    var textDiv = xpathOneEx("div[@class='dt']", this.div);
    this.text = collectText(textDiv);
    this.author = xpathOneEx("div[@class='dd']/div/a", this.div).innerHTML;
    this.rating = parseInt(xpathOneEx("div//span[@class='rating']/em", this.div).innerHTML);
    this.wordWeight = this.rating > 0 ? 1 : 
                      this.rating == 0 ? 0.01 : -1;
}

Comment.parseAll = function() {
    var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
    var result = Array();
    for (var i = 0; i < comments.snapshotLength; i++) {
        result[i] = new Comment(comments.snapshotItem(i));
    }
    return result;
}


WordStats = function() {
   this.map = Object();
}
WordStats.prototype.addWord = function(word, weight) {
    if (word.length > 3) {
        if (!this.map[word]) this.map[word] = 0;
        this.map[word] += weight;
    }
}
WordStats.prototype.process = function() {
    var a = Array();
    for (var i in this.map) a[a.length] = [this.map[i],i];
    a.sort(function(a,b) { return b[0] - a[0]; });

    if (a.length > 20) {
        var b = Array();
        for (var i = 0; i < 10; i++) b[i] = a[i];
        for (var i = 0; i < 10; i++) b[19-i] = a[a.length-1-i];
        a = b;
    }
    this.array = a;
}

Comment.prototype.countWordsInto = function(wordStatsObj) {
    var ws = this.text.split(' ');
    for (var i = 0; i < ws.length; i++) wordStatsObj.addWord(ws[i], this.wordWeight);
}

AuthorWordStats = function() {
    this.author_map = Object();
    this.author_rating = Object();
}

AuthorWordStats.prototype.addAuthorWord = function(author, word, weight) {
    this.author_map[author].addWord(word, weight);
}

AuthorWordStats.prototype.addAuthorRating = function(author, rating) {
    if (!this.author_rating[author]) {
        this.author_map[author] = new WordStats();
        this.author_rating[author] = 0;
    }
    this.author_rating[author] += rating;
}

AuthorWordStats.prototype.process = function() {
    var a = Array();
    for (var i in this.author_map) a[a.length] = [this.author_rating[i], i, this.author_map[i]];
    a.sort(function(a,b) { return b[0] - a[0]; });

    // Trim list of authors
    if (a.length > 20) {
        var b = Array();
        for (var i = 0; i < 10; i++) b[i] = a[i];
        for (var i = 0; i < 10; i++) b[19-i] = a[a.length-1-i];
        a = b;
    }
    this.array = a;

    // Trim list words for each author
    for (var i = 0; i < a.length; i++) a[i][2].process();
}

Comment.prototype.countAuthorWordsInto = function(result) {
    result.addAuthorRating(this.author, this.rating);
    var ws = this.text.split(' ');
    for (var i = 0; i < ws.length; i++) result.addAuthorWord(this.author, ws[i], this.wordWeight);
}

collectWordStats = function(cmts) {
    var r = new WordStats();
    for (var i = 0; i < cmts.length; i++) cmts[i].countWordsInto(r);
    r.process();
    return r;
}

collectAuthorStats = function(cmts) {
    var r = new AuthorWordStats();
    for (var i = 0; i < cmts.length; i++) cmts[i].countAuthorWordsInto(r);
    r.process();
    return r;
}


WordStats.prototype.makeTagCloud = function() {
    var root = document.createElement('div');
    root.style.width = '700px';
    
    ws = this.array;
    if (ws.length == 0) return root;

    var max_plus = ws[0][0];
    var max_minus = -ws[ws.length-1][0];
    var min_minus = 0;
    var min_plus = 0;
    for (var i = 0; i < ws.length; i++) {
        if (ws[i][0] > 0) min_plus = ws[i][0];
        if (ws[i][0] < 0) { 
            min_minus = -ws[i][0];
            break;
        }
    }
    
    var words = Array();
    for (var i = 0; i < ws.length; i++) {
        var el = document.createElement('span');
        el.innerHTML = ws[i][1] + ' ';
        el.style.color = ws[i][0] > 0 ? 'blue' : 'red';
        var mx = ws[i][0] > 0 ? max_plus : max_minus;
        var mn = ws[i][0] > 0 ? min_plus : min_minus;
        var sc = Math.abs(ws[i][0]) - mn/2;
        mx = mx - mn/2;
        el.style.fontSize = (sc > mx/1.7) ? '25px' :
                            (sc > mx/Math.pow(1.7,2)) ? '18px' :
                            (sc > mx/Math.pow(1.7,3)) ? '13px' : '9px';
        words[i] = el;
    }
    
    // Shuffle
    var shuffler = Array();
    for (var i = 0; i < ws.length; i++) shuffler[i] = [Math.random(), i];
    shuffler.sort(function(a, b) { return b[0] - a[0]; });
    
    for (var i = 0; i < shuffler.length; i++) root.appendChild(words[shuffler[i][1]]);
    return root;
}

makeTR = function(title, div) {
    var tr = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    tr.childNodes[0].innerHTML = title;
    tr.childNodes[0].style.verticalAlign = 'top';
    tr.childNodes[0].style.paddingRight = '40px';
    tr.childNodes[0].style.fontWeight = 'bold';
    tr.childNodes[1].appendChild(div);
    tr.style.border = '1px dotted #444';
    tr.style.margin = '10px 10px 10px 10px';
    return tr;
}

swapDOM = function(oldnode, newnode) {
    oldnode.parentNode.insertBefore(newnode, oldnode);
    oldnode.parentNode.removeChild(oldnode);
    return oldnode;
}

makeSummary = function() {
    var cmts = Comment.parseAll();
    var ws = collectWordStats(cmts);
    var auth = collectAuthorStats(cmts);

    var newTable = document.createElement('table');
    var tc = ws.makeTagCloud();
    var tr = makeTR('Общее', tc);
    newTable.appendChild(tr);
    for (var i = 0; i < auth.array.length; i++) {
        tc = auth.array[i][2].makeTagCloud();
        title = auth.array[i][1] + ' (' + auth.array[i][0] + ')';
        tr = makeTR(title, tc);
        newTable.appendChild(tr);
    }
    
    var root = document.getElementById('js-commentsHolder');
    var newDiv = document.createElement('div');
    newDiv.appendChild(newTable);
    newDiv.style.padding = '10px';
    var button = document.createElement('div');
    button.innerHTML = '<a href="" onclick="return false;" style="display: block; text-align: center; margin: 10px auto;">Фигня какая-то, убрать немедленно!</a>';
    button.childNodes[0].addEventListener('click', function() { swapDOM(newDiv, root); }, false);
    newDiv.appendChild(button);
    
    swapDOM(root, newDiv);
}


addButton = function(title, onClick) {
	var elButton = document.createElement('td');
	elButton.innerHTML = "<a href='' onclick='return false;'>" + title + "</a>";
	elButton.childNodes[0].addEventListener("click", onClick, false);
	panel = xpathOne("//table[@class='category']//tr")
	panel.appendChild(elButton);
}

addButton('Краткое содержание', makeSummary);
