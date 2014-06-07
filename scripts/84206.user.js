// ==UserScript==
// @name            Retecool Kill Filter
// @author          Monade.Retecool@gmail.com
// @exclude         http://retecool.com/verzineenonderschrift/*
// @include         http://goldmember.retecool.com/post/*
// @include         http://retecool.com/forum/*
// @include         http://retecool.com/linkdump/*
// @include         http://retecool.com/post/*
// @namespace       spime.retecool.reaguurders
// @description     Automatically hides trolls and gives your opinion of them.
// @version         20100824
// ==/UserScript==

// Disclaimer: This author is in now way affiliated with retecool.com,
// never will, nor wants to be.

(function() { // anonymous wrapper

// Settable parameters TODO place them in the menu. //
var Retecool = {};
Retecool.creeps = [
    { id: "", nick: "" }
    ];
Retecool.trolls = [
    { id: "18093", nick: "Sturmvogel" }
    ];
//Retecool.trolls_are_creeps = true;
Retecool.trolls_are_creeps = false;
//Retecool.hide_flushed_articles = true; TODO


// HELPER FUNCTIONS //
// Usage:
// var xpathResult = document.evaluate(
//  xpathExpression, 
//  contextNode, 
//  namespaceResolver, 
//  resultType, 
//  result);
//
function findNodes(expression, nodeRoot) {
    return document.evaluate(
        expression,
        nodeRoot,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
        );
}

function findFirstNode(expression, nodeRoot) {
    return document.evaluate(
        expression,
        nodeRoot,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
        );
}


// INTERNAL GLOBAL VARIABLES //
// The interesting data from the current page.
var currentPage = {};
currentPage.baseURL = "";
currentPage.messages = []; // process() depends on this.

// Message: stored properties of a particular message node.
// Contains div { div{ a(href)} a(href) } etc.
function Message(m) {
    this.messagePath = m;
    this.author = this.getAuthor();
    this.id = this.getId();
    if (!this.author || !this.author.id || !this.id) {
        return null;
    }
}

//
Message.prototype.getAuthor = function() {
    // Ex.: "/profile/1/reet"
    var authorStr = /^\/profile\/(.*)\/(.*)$/; // capture 1 and 2.
    var aResult = [];
    // There are multiple a's and the 'a' we want is on depth 0 or depth 1.
    // './/' means all descendants, starting from this context.
    // starts-with(s1, s2) selects all with a s1 attribute starting with s2
    var aNode = findFirstNode(".//a[starts-with(@href, '/profile')]",
        this.messagePath
        );
    var aHref = null;
    if (aNode && aNode.singleNodeValue &&
    (aHref = aNode.singleNodeValue.getAttribute('href'))) {
        aResult = authorStr.exec(aHref);
        // [ string, pos1, pos2 ]
        if (aResult && aResult.length === 3) {
            //console.log('author.id = ' + aResult[1] +
            //    ' author.nick = ' + aResult[2]
            //    );
            return { id: aResult[1], nick: aResult[2] };
        }
    }
    // Program failure, there must be a <a href="/profile...
    return null;
}

//
Message.prototype.getId = function() {
    // Ex.: "comment_14141414"
    var idStr = /^comment_(.*)$/; // capture 1.
    var id = idStr.exec(this.messagePath.getAttribute('id'));
    if (id && id.length === 2) {
        return id[1];
    } else {
        return null;
    }
    //return idStr.exec( this.messagePath.getAttribute('id') )[1];
}

//
Message.prototype.flush = function() {
    //XXX TODO
    var flushImgURL = currentPage.baseURL + '/images/buttons/doorgetrokken.gif';
}

//
Message.prototype.hide = function() {
    //this.messagePath.parentNode.removeChild(this.messagePath);
    this.messagePath.style.display = 'none';
    console.log(this.id + ' hidden');
}

//
Message.prototype.voteNegative = function() {
    unsafeWindow.xajax_voteNegativeComment(parseInt(this.id, 10));
    console.log('Voted -');
}

//
Message.prototype.votePositive = function() {
    unsafeWindow.xajax_votePositiveComment(parseInt(this.id, 10));
    console.log('Voted +');
}

//
Message.prototype.toString = function() {
    return 'Author: ' + this.author.id + ', ' + this.author.nick + '\n' +
    'MessageId: ' + this.id + '\n' +
    'Message: ' + this.messagePath.textContent + '\n'
    ;
}

// RETRIEVAL PHASE //
//
function retrieve() {
    return retrieveMessages();
}

//
function retrieveMessages() {
    currentPage.messages = findNodes(currentPage.expression, document);
    if (!currentPage.messages.snapshotLength) {
        return false;
    }
    console.log('got ' + (currentPage.messages.snapshotLength+1) + ' messages');
    return true;
}


// SETUP PHASE //
// Depending upon subdomain, set up script parameters and dynamically
// rewire dynamic methods.
// returns true if the webpage is one we're interested in and contains
// user messages.
// returns false otherwise.
function setup() {
    // Currently, the way to obtain the messageId and the author of the
    // message is the same for all subdomains, and has therefore been
    // placed in the Message object.
    //
    // Construct the list of message nodes.
    var forum = /\/\/retecool.com\/forum\/*/;
    var goldmember = /\/\/goldmember.retecool.com\/post\/*/;
    var frontpage = /\/\/retecool.com\/*/;
    var baseURL = "";
    var expression = "";
    console.log("setup for document " + document.URL);
    // Order from the most to the least specific.
    if (goldmember.test(document.URL)) {
        baseURL = 'http://goldmember.retecool.com';
        expression = "//div[@class='comment'][@id]";
    } else if (forum.test(document.URL)) {
        baseURL = 'http://retecool.com';
        expression = "//div[@class='comment clearfix'][@id]";
    } else if (frontpage.test(document.URL)) {
        baseURL = 'http://retecool.com';
        expression = "//div[@class='comment'][@id]";
    } else {
        // Retecool has a lot more urls, such as adbanners. bail out.
        return false;
    }
    currentPage.baseURL = baseURL;
    currentPage.expression = expression;
    return setupFilters();
}

// Construct the internal filter lists
function setupFilters() {
    // We create a hash from the guaranteed unique authorIds.
    // XXX 
    currentPage.creeps = {};
    for (var i = 0; i < Retecool.creeps.length; ++i) {
        currentPage.creeps[ Retecool.creeps[i].id ] = Retecool.creeps[i];
        //console.log(currentPage.creeps[Retecool.creeps[i].id]);
    }
    currentPage.trolls = {};
    for (var i = 0; i < Retecool.trolls.length; ++i) {
        currentPage.trolls[ Retecool.trolls[i].id ] = Retecool.trolls[i];
        //console.log(currentPage.trolls[Retecool.trolls[i].id]);
    }
    currentPage.trolls_are_creeps = Retecool.trolls_are_creeps;
    currentPage.hide_flushed_articles = Retecool.hide_flushed_articles;
    return true;
}


// PROCESSING PHASE //
// Process the messages.
function process() {
    for (var i = 0; i < currentPage.messages.snapshotLength; ++i) {
        var m = new Message(currentPage.messages.snapshotItem(i));
        if (!m) {
            continue;
        } else if (m.author.id in currentPage.creeps) {
            console.log('Detecting creep - ' + m.toString());
            m.voteNegative();
        } else if (m.author.id in currentPage.trolls) {
            console.log('Detecting troll - ' + m.toString());
            if (currentPage.trolls_are_creeps) {
                m.voteNegative();
            }
            m.hide();
        } else {
            ; // do nothing
        }
    }
    return true;
}


// MAIN //
console.log("Start");
setup() && retrieve() && process();
console.log("End");

})(); // anonymous wrapper
