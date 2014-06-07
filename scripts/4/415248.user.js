// ==UserScript==
// @name       Lostfilm Series Feed
// @version    1.0
// @description  Shows Lostfilm series in order of their appearance, just open "http://www.lostfilm.tv/browse.php?sf".
// @match      http://www.lostfilm.tv/browse.php?sf
// @copyright  2014+, Maxim Manuylov
// ==/UserScript==

function isPilot(item) {
    return item.childNodes[2] && item.childNodes[2].textContent.trim() == "01.01";
}

function getFilteredItemsText(content_body) {
    var items = content_body.childNodes, result = "";
    
    var showItem = false;
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        
        if (item.nodeName.toLowerCase() == "div") {
            showItem = isPilot(item);
        }
        
        if (showItem) {
            if (item.nodeType == Node.ELEMENT_NODE) {
                result += item.outerHTML;
            }
            else if (item.nodeType == Node.TEXT_NODE) {
                result += item.textContent;
            }
        }
    }
    
    return result;
}

function getContentBody(doc) {
    return doc.getElementsByClassName("content_body")[0];
}

var SHOW_MORE_BTN_WRAPPER_ID = "show_more_btn_wrapper";
var LOADING_TEXT = "Загрузка...";
var MORE_ITEMS_COUNT = 150;
var MORE_ITEMS_COUNT_PER_REQUEST = 15;

function getShowMoreBtnWrapper() {
    return document.getElementById(SHOW_MORE_BTN_WRAPPER_ID);
}

function getShowMoreBtnWrapperText(n) {
    return "<div id='" + SHOW_MORE_BTN_WRAPPER_ID + "'>" +
        (n == -1 ? LOADING_TEXT : "Поиск проведен по " + n + " эпизодам<br/><input type='button' value='Искать в следующих " + MORE_ITEMS_COUNT + "-ти' onclick='document.showMore(" + n + ");'/>") +
        "</div>";
}

function doShowMore(n, maxN) {
    var ajax = new XMLHttpRequest();
    ajax.open('GET', document.baseURI + "&o=" + n, true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var content_body = getContentBody(new DOMParser().parseFromString(ajax.responseText, "text/html"));
            var nextN = n + MORE_ITEMS_COUNT_PER_REQUEST, doNextRequest = nextN < maxN;
            getShowMoreBtnWrapper().outerHTML = getFilteredItemsText(content_body) + getShowMoreBtnWrapperText(doNextRequest ? -1 : nextN);
            if (doNextRequest) {
                doShowMore(nextN, maxN);
            }
        }
    };
    ajax.send(null);
}

document.showMore = function(n) {
    var wrapperNode = getShowMoreBtnWrapper();
    wrapperNode.innerHTML = LOADING_TEXT;    
    doShowMore(n, n + MORE_ITEMS_COUNT);
};

var content_body = getContentBody(document);
content_body.innerHTML = getFilteredItemsText(content_body) + getShowMoreBtnWrapperText(-1);
doShowMore(MORE_ITEMS_COUNT_PER_REQUEST, MORE_ITEMS_COUNT);


