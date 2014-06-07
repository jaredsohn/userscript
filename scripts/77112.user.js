// ==UserScript==
// @name           TrollEyBuzz
// @namespace      http://userscripts.org/users/20935
// @description    Hide comments written by trolls on Google Buzz
// @author         Wojciech 'KosciaK' Pietrzok
// @version        0.2.2
// @include        https://mail.google.*/mail/*
// @include        http://mail.google.*/mail/*
// ==/UserScript==


(function() {

var CANVAS
var TROLLS
var LIST
var COUNTER


var addTroll = function() {
    oid = this.parentNode.getAttribute('oid');
    name = this.getAttribute('t_name');
    id = this.getAttribute('t_id');
    TROLLS.push(oid);
    TROLLS.push(id);
    TROLLS.push(name);
    saveTrolls();
    LIST.style.display = 'none';
}


var removeTroll = function() {
    oid = this.parentNode.getAttribute('oid');
    index = TROLLS.indexOf(oid);
    TROLLS.splice(index, 3);
    saveTrolls();
    unhideTrollComments(oid);
    LIST.style.display = 'none';
}


var showUsersList = function(users, text) {
    if (!LIST) {
        LIST = CANVAS.createElement('div');
        LIST.id = 'UsersList';
        CANVAS.body.appendChild(LIST);
        inner = CANVAS.createElement('div');
        inner.id = 'UL_inner';
        LIST.appendChild(inner);
        list = CANVAS.createElement('div');
        list.id = 'UL_list';
        LIST.appendChild(list);
        caption = CANVAS.createElement('div');
        caption.id = 'UL_caption';
        inner.appendChild(caption);
        img = CANVAS.createElement('div');
        img.id = 'UL_close';
        img.addEventListener('click', function() {LIST.style.display = 'none';}, false);
        inner.appendChild(img);
        button = CANVAS.createElement('button');
        button.id = 'UL_button';
        button.innerHTML = 'Close';
        button.addEventListener('click', function() {LIST.style.display = 'none';}, false);
        inner.appendChild(button);
    }
    list = CANVAS.getElementById('UL_list')
    CANVAS.getElementById('UL_caption').innerHTML = text;
    list.innerHTML = null;
    for (i=0; i < users.length ; i=i+3) {
        oid = users[i];
        id = users[i+1];
        name = users[i+2];
        user = CANVAS.createElement('div');
        user.setAttribute('oid', oid);
        link = CANVAS.createElement('a');
        link.setAttribute('href', 'http://www.google.com/profiles/'+ id +'#buzz')
        link.innerHTML = '<b>'+ name +'</b>';
        trollizer = CANVAS.createElement('span');
        trollizer.className = 'UL_trollizer';
        trollizer.setAttribute('t_name', name);
        trollizer.setAttribute('t_id', id);
        if (TROLLS.indexOf(oid) >= 0) {
            user.className = 'UL_user';
            trollizer.innerHTML = '<b>NOT Troll</b>';
            link.className = 'troll';
            trollizer.addEventListener('click', removeTroll, false);
        } else {
            user.className = 'UL_user';
            trollizer.innerHTML = 'Troll';
            trollizer.addEventListener('click', addTroll, false);
        }
        user.appendChild(trollizer);
        user.appendChild(link);
        list.appendChild(user);
    }
    LIST.style.display = 'block';
}


var showTrollsList = function() {
    showUsersList(TROLLS, 'Trolls');
}


var showCommentatorsList = function() {
    node = this.parentNode.parentNode.parentNode.parentNode.parentNode
               .parentNode.parentNode.parentNode.parentNode.parentNode;
    var commenters = node.getElementsByClassName('proflink');
    users = new Array();
    for (i=0; i < commenters.length ; i++) {
        if (!commenters[i].hasAttribute('oid')) {
            continue;
        }
        oid = commenters[i].getAttribute('oid');
        name = commenters[i].innerHTML;
        id = commenters[i].getAttribute('href');
        id = id.substring(31, id.lastIndexOf('#buzz'));
        if (users.indexOf(oid) < 0) {
            users.push(oid);
            users.push(id);
            users.push(name);
        }
    }
    showUsersList(users, 'Commentators')
}


var hideCommentNode = function(node) {
    node.innerHTML = '[...]';
    node.title = 'Show comment';
    node.previousSibling.style.display = 'none';
    node.addEventListener('click', showComment, false);
}


var hideComment = function() {
    this.removeEventListener('click', hideComment, false);
    hideCommentNode(this);
}


var showComment = function() {
    this.innerHTML = '<b>(hide)<b>';
    this.title = 'Hide comment';
    this.previousSibling.style.display = 'inline';
    this.removeEventListener('click', showComment, false);
    this.addEventListener('click', hideComment, false);
}


var hideTrollComments = function(oid) {
    XPath = '//span[@class="Yd"]/a[@oid="'+ oid +'" and not(@troll="true")]'
    var comments = CANVAS.evaluate(XPath, 
                                   CANVAS, null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                   null); 
    for (j=0; j < comments.snapshotLength ; j++) {
        item = comments.snapshotItem(j);
        item.setAttribute("troll", "true");
        item.style.textDecoration = "line-through";
        comment = item.parentNode.getElementsByTagName('span')[1];
        button = CANVAS.createElement('span');
        button.className = "showHide";
        item.parentNode.insertBefore(button, comment.nextSibling);
        hideCommentNode(button);
    }
}

var unhideTrollComments = function(oid) {
    XPath = '//span[@class="Yd"]/a[@oid="'+ oid +'" and @troll="true"]'
    var comments = CANVAS.evaluate(XPath, 
                                   CANVAS, null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                   null); 
    for (j=0; j < comments.snapshotLength ; j++) {
        item = comments.snapshotItem(j);
        item.removeAttribute("troll");
        item.style.textDecoration = "none";
        comment = item.parentNode.getElementsByTagName('span')[1];
        comment.style.display = 'inline';
        button = comment.nextSibling
        button.parentNode.removeChild(button);
    }
}


var appendCommentersListButton = function() {
    var buzzes = CANVAS.evaluate('//td[@class="io" and not(@troll="true")]', 
                                 CANVAS, null, 
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                 null); 
    
    for (i=0; i < buzzes.snapshotLength ; i++) {
        io = buzzes.snapshotItem(i);
        io.setAttribute('troll', 'true');
        td = CANVAS.createElement('td');
        button = CANVAS.createElement('div');
        button.className = 'mD';
        td.appendChild(button);
        link = CANVAS.createElement('span');
        link.className = 'mG';
        link.innerHTML = 'Troll?';
        link.addEventListener('click', showCommentatorsList, false);
        button.appendChild(link);
        io.parentNode.insertBefore(td, io)
    }
}


var appendTrollsListButton = function() {
    if (CANVAS.getElementById('TrollsList')) {
        return;
    }
    trolls = CANVAS.createElement('span');
    trolls.id = 'TrollsList';
    trolls.innerHTML = ' - ';
    COUNTER = CANVAS.createElement('span');
    COUNTER.className = 'GC';
    COUNTER.innerHTML = ' Trolls: ' + TROLLS.length/3;
    COUNTER.addEventListener('click', showTrollsList, false);
    trolls.appendChild(COUNTER);
    var settings = CANVAS.evaluate('//div[@class="IR Gw"]', 
                                   CANVAS, null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                   null); 
    settings.snapshotItem(0).appendChild(trolls);
}


var detrollify = function() {
    for (i=0; i < TROLLS.length ; i=i+3) {
        hideTrollComments(TROLLS[i]);
    }
    appendCommentersListButton();  
    appendTrollsListButton();  
}


var initTrolls = function() {
    TROLLS = new Array()
    TROLLS = GM_getValue('trolls', '').split('::');
    if (TROLLS.length == 1) {
        TROLLS.pop();
    }
}

var saveTrolls = function() {
    trolls = TROLLS.join('::')
    trolls = trolls //+ ';';
    GM_setValue('trolls', trolls);
    initTrolls();
    COUNTER.innerHTML = ' Trolls: ' + TROLLS.length/3;
}


var init = function() {

    initTrolls();
    
    if (!document.getElementById('canvas_frame')) {
        return;
    }
    CANVAS = document.getElementById('canvas_frame').contentDocument;
    var result = CANVAS.evaluate('//span[@class="Yd"]/a[1]', 
                                 CANVAS, null, 
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, 
                                 null); 
    if (result.snapshotLength < 1) {
        setTimeout(init, 250);
        return;
    }
    
    setInterval(detrollify, 500);
    detrollify();
}

GM_addStyle('.showHide:hover {text-decoration: underline; cursor: pointer; cursor: hand;} .showHide { padding-left: 0.5em; }');
GM_addStyle('#UsersList {z-index:999; position: fixed; left: 50%; top: 50%; width: 500px; height: 560px; margin-left: -233px; margin-top: -271px; border: 1px solid #3a5774;}');
GM_addStyle('#UL_inner {border: 10px solid #c1d9ff; background-color: #e0edfe; width: 480px; height: 540px; }');
GM_addStyle('#UL_list {position: absolute; top: 48px; left: 10px; width: 480px; height: 444px; overflow: auto; background-color: white; }');
GM_addStyle('#UL_caption {padding-top: 10px; padding-left: 10px; font-size: 16px; font-weight: bold;}');
GM_addStyle("#UL_button {position: absolute; bottom: 20px; left: 20px;}");
GM_addStyle("#UL_close {position: absolute; top: 20px; right: 20px; width: 15px; height: 15px; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHBJREFUKM9jLJ+5+z8jA3mAhZGBgaE9zYVkjZWz9jAwMVAAmLCZiMsmvJphCtAV4hJH0Yzsd2wa0MMGw9nYDGDAEahYAwxdIa7YYCImcHAFIt7QxuUFvKGNrBGfAVhDG5efSQptQuIUJU8WfKFJCAAAW5Q0vWVv/M0AAAAASUVORK5CYII=')}");
GM_addStyle("#UL_close:hover {cursor: pointer; cursor: hand;}");
GM_addStyle('.UL_user {height: 30px; border-bottom: 1px solid #ddd; padding: 5px 10px; margin: 0px 10px; font-size: 13px;}');
GM_addStyle('.UL_user:first-child {border-top: 1px solid #ddd; }');
GM_addStyle('.UL_user a {color: #224499;}');
GM_addStyle('.UL_trollizer {float: right; color: #224499; text-decoration: underline; cursor: pointer; cursor: hand; font-size: 12px;}');
GM_addStyle('.troll {text-decoration: line-through underline;}');

init();

})();

