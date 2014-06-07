// ==UserScript==
// @name                Google Reader + SBBS
// @namespace      	    http://bbs.seu.edu.cn/
// @description       	post entry to SBBS
// @author              irun@SBBS
// @include             http://www.google.com/reader/*
// @include             https://www.google.com/reader/*
// ==/UserScript==

//const vars
var defaultBoard = 'Linux';
//Variables for editing article details
var articleField;
var boardinput;
var titleinput;
var contentinput;

var mode;
var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);
entries.addEventListener('DOMNodeRemoved', function(event){nodeRemoved(event);},true);

function nodeInserted(event){	
    if (event.target.tagName == "DIV"){
        try{
            if (event.target.className != ""){
                var linkbar;
                if (event.target.className == "entry-actions"){
                    linkbar = event.target;
                    mode = 'list';
                }
                else if (event.target.firstChild && event.target.firstChild.className=="card card-common"){
                    linkbar = event.target.firstChild.childNodes[2].firstChild;
                    mode = 'expand';
                }
                else
                    return;
                var btn = document.createElement("span");
                btn.className = "link SBBS";
                btn.innerHTML = "转贴到SBBS";
                btn.addEventListener("click", editArticle, false);
                linkbar.appendChild(btn);
            }
        }
        catch(e){
        }
    }
}

function editArticle(event){
    var currentEntry = document.getElementById("current-entry");
    articleField = document.getElementById("articleField");
    
    var xpath;
    var tag;
    var tags;

    if (articleField) {
        xpath = '//div[@id="current-entry"]//div[@id="articleField"]';
        var t = getElementsByXPath(xpath, document).length;
        rmArticleField();
        if (t)
            return;
    }
    getArticleField();

    xpath = '//span[@id="chrome-title"]//a';
    tag = getElementsByXPath(xpath, document)[0];
    var source = tag.firstChild.textContent;

    xpath = '//div[@id="current-entry"]//a[@class="entry-title-link"]';
    tag = getElementsByXPath(xpath, document)[0];
    var url = tag.getAttribute('href');
    title = tag.textContent;

    xpath = '//div[@id="current-entry"]//div[@class="entry-body"]';
    tag = getElementsByXPath(xpath, document)[0];
    var content = tag.textContent;

    if (mode == 'list') {
        articleField.className="action-area";
        currentEntry.appendChild(articleField);
    }
    else if (mode == 'expand') {
        articleField.className = "action-area card-bottom";
        currentEntry.firstChild.appendChild(articleField);
    }
    xpath = '//div[@id="articleField"]//input[@class="email-this-to"]';
    tags = getElementsByXPath(xpath, document);
    boardinput = tags[0]
        titleinput = tags[1];
    xpath = '//div[@id="articleField"]//textarea[@class="email-this-comment"]';
    contentinput = getElementsByXPath(xpath, document)[0];

    boardinput.value = defaultBoard;
    titleinput.value = "["+source+"]"+title;
    contentinput.value = "原文:"+url+"\n"+content;

    xpath = '//div[@id="articleField"]//button';
    tags = getElementsByXPath(xpath, document);
    var postbtn = tags[0];
    var cancelbtn = tags[1];
    postbtn.addEventListener("click", postArticle,false);
    cancelbtn.addEventListener("click", function(event){rmArticleField()},false);
}

function getArticleField() {
    var xpath = '//div[@id="current-entry"]//span[@class="link SBBS"]';
    var tags = getElementsByXPath(xpath, document);
    if (tags.length)
        tags[0].className = "link SBBS email-active";
    articleField = document.createElement("div");
    articleField.setAttribute("id","articleField");
    var container = document.createElement("div");
    container.className = "email-this-area";
    container.innerHTML = "<table class='email-entry-table'><tbody><tr><td class='field-name'>版面:</td><td><input type='text' class='email-this-to'></td></tr><tr><td class='field-name'>标题:</td><td><input type='text' class='email-this-to'></td></tr><tr><td class='field-name'>内容:</td><td><textarea class='email-this-comment' rows='7'></textarea><div class='email-this-buttons'><button>转贴</button><button>取消</button></div></td></tr></tbody></table>";
    articleField.appendChild(container);
    return;
}

function rmArticleField() {
    var xpath = '//span[@class="link SBBS email-active"]';
    var tags = getElementsByXPath(xpath, document);
    if (tags.length)
        tags[0].className = "link SBBS";
    articleField.parentNode.removeChild(articleField);
    return;
}

function getElementsByXPath(xpath, node) {
    var node = node || document;
    var doc = node.ownerDocument ? node.ownerDocument : node;
    var results = doc.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var data = [];
    for (var i = 0; i < results.snapshotLength; i++) {
        data.push(results.snapshotItem(i));
    }
    return data;
}

function postArticle(event){
    var board = boardinput.value;
    var title = titleinput.value;
    var content = contentinput.value;

    var success = function(r) {
        document.getElementById("loading-area").className = "message-area";
        if(r.responseText.match(/发文成功/)) {
            document.getElementById("loading-area-text").innerHTML = "转贴成功";
        } else {
            document.getElementById("loading-area-text").innerHTML = "转贴失败";
        }
    }

    //alert(encodeURIComponent(content));
    GM_xmlhttpRequest({
        method: 'POST',
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        url: 'http://bbs.seu.edu.cn/m?act=post&board='+board+'&reid=0&post=1',
        data: 'title='+encodeURIComponent(title)+'&text='+encodeURIComponent(content),
        onload:success
    })
    rmArticleField();
}

