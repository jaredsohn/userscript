// ==UserScript==
// @name           Basketnews komentarų filtras
// @namespace      retas
// @description    Slepia neregistruotų basketnews.lt vartotojų komentarus, galima įtraukti vartotojus į registruotų blacklist ir neregistruotų whitelist.
// @include        http://www.basketnews.lt/news-*
// @include        http://www.basketnews.lt/foto/ziureti-*
// @include        http://www.basketnews.lt/video/ziureti/*
// @include        http://www.basketnews.lt/audio/ziureti/*
// @include        http://www.basketnews.lt/vaizdo-transliacijos/ziureti/*
// @include        http://www.basketnews.lt/diskusijos/temos/*
// @include        http://www.basketnews.lt/apklausos/*
// @include        http://www.basketnews.lt/citatos/*
// @include        http://www.basketnews.lt/keuras/*
// @include        http://m.basketnews.lt/news-*
// @include        http://m.basketnews.lt/foto/ziureti-*
// @include        http://m.basketnews.lt/video/ziureti/*
// @include        http://m.basketnews.lt/keuras/*
// @version        0.2.2
// ==/UserScript==

// ---
// Išimčių sąrašas: registruoti vartotojai, kurių komentarai bus nematomi:
var blackList = new Array();

// Išimčių sąrašas: neregistruoti vartotojai, kurių komentarai bus matomi:
var whiteList = new Array();

// Pvz.: var grayList = new Array("antanas", "petras", "jonas");
// Pastabos: vartotojo vardas turi būti kabutėse, juos atskirti kableliais; didžiosios/mažosios raidės neturi reikšmės
// ---

function normalize(str) {
    str = str.replace(/^\s+/,'');
    str = str.replace(/\s+$/,'');
    str = str.toLowerCase();
    
    return str;
}

function isInWhiteList(user) {
    user = normalize(user);
    
    for(var i in whiteList) {
        if (user == whiteList[i].toLowerCase()) return true;
    }
    
    return false;
}

function isInBlackList(user) {
    user = normalize(user);
    
    for(var i in blackList) {
        if (user == blackList[i].toLowerCase()) return true;
    }
    
    return false;
}

function deleteNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

// ---

var commentsToRemove = new Array();

NRComments = document.evaluate(".//div[@class='main_feedbacks2']//div[@class='author'][contains('//', a)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
RComments = document.evaluate(".//div[@class='main_feedbacks2']//div[@class='author']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < NRComments.snapshotLength; ++i) {
    node = NRComments.snapshotItem(i);
    
    if (!isInWhiteList(node.textContent)) {
        commentsToRemove.push(node.parentNode);
    }
}

for(var i = 0; i < RComments.snapshotLength; ++i) {
    node = RComments.snapshotItem(i);
    
    if (isInBlackList(node.textContent)) {
        commentsToRemove.push(node.parentNode.parentNode);
    }
}

document.evaluate(".//h3[. = 'Komentarai']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent += " (pašalintų: " + commentsToRemove.length + ")";

for(var i = 0; i < commentsToRemove.length; ++i) {
    deleteNode(commentsToRemove[i].parentNode);
}