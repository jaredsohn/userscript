// ==UserScript==
// @name           DGM Detect
// @version        2010-06-12
// @licence        (CC) by-sa || GPLv2 || GPLv3
// @namespace      http://userscripts.org/users/raphaelquinet
// @description    Détection de messages automatiques DGM sur le forum Hordes
// @include        http://www.hordes.fr/*
// ==/UserScript==

var mytimer = null;

// Petite aide pour XPath
function xpath(expression, contextNode, type) {
    return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
        .evaluate(expression, contextNode, null, type, null);
}

// Attribue un style aux éléments de la liste
function colorize(elements) {
    var el = null;
    while ((el = elements.shift()) != null) {
        el.setAttribute('style', 'background-color: #6b3f35');
    }
}

// Vérifie si des messages sont spéciaux
function checkMessages(contextNode) {
    var tagged = [];
    var msgs = xpath("div[@class='thread']/div[contains(@class, 'message')]/div[@class='content']",
                     contextNode, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    var msg = null;
    while ((msg = msgs.iterateNext()) != null) {
        if (msg.innerHTML.substring(msg.innerHTML.length - 8) == '&nbsp; \n') {
            tagged.push(msg.parentNode);
        }
    }
    colorize(tagged);
}

// Vérifie si des résumés de messages sont spéciaux
function checkReports(contextNode) {
    var tagged = [];
    var reports = xpath("//span[contains(@id, 'long_')]",
                        contextNode, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    var msg = null;
    while ((msg = reports.iterateNext()) != null) {
        if (msg.innerHTML.substring(msg.innerHTML.length - 6) == '&nbsp;') {
            tagged.push(msg.parentNode);
        }
    }
    colorize(tagged);
}

// Vérifie si des résumés de messages sont spéciaux
function checkReports2(contextNode) {
    var tagged = [];
    var msgs = xpath("div[contains(@class, 'athreads')]/ul/li/div[@class='thread']",
                     contextNode, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
    var msg = null;
    while ((msg = msgs.iterateNext()) != null) {
        if (msg.innerHTML.substring(msg.innerHTML.length - 7) == '&nbsp;\n') {
            tagged.push(msg.parentNode);
        }
    }
    colorize(tagged);
}

// Vérifie les messages ou les résumés sur toute la page
function checkAll() {
    mytimer = null;
    if (document.getElementById('generic_section')) {
        checkMessages(document.getElementById('generic_section'));
    } else if (document.getElementById('modHelp')) {
        checkReports(document.getElementById('gamebody'));
    } else {
        checkReports2(document.getElementById('gamebody'));
    }
}

// Interception de la fonction js.Block.show()
var oldBlockShow = unsafeWindow.js.Block.show;
unsafeWindow.js.Block.show = function(block) {
    oldBlockShow(block);
    checkReports(block);
}

// Interception de la fonction js.XmlHttp.get()
var oldXmlHttpGet = unsafeWindow.js.XmlHttp.get;
unsafeWindow.js.XmlHttp.get = function(url, obj) {
    oldXmlHttpGet(url, obj);
    // pas optimal mais permet de ne pas réécrire js.XmlHttp.get() pour ajouter une callback
    if (mytimer) {
        clearTimeout(mytimer);
    }
    mytimer = setTimeout(checkAll, 1000);
}

// Vérification initiale
mytimer = setTimeout(checkAll, 1000);
