// ==UserScript==
// @name          DeKalb County Georgia Public Library 
// @namespace     
// @description   Is this Amazon, Barnes and Noble, Powell's, or Netflix item (book, CD, DVD) available from the DeKalb County Georgia Public Library?
// @include       http://www.amazon.com/*
// @include       http://*.barnesandnoble.com/*
// @include       http://www.powells.com/*
// @include       http://www.netflix.com/*
// ==/UserScript==

// From the Prototype Javascript Framework 
// http://prototypejs.org/

var $A = Array.from = function(iterable) {
    if (!iterable) return [];
    if (iterable.toArray) {
        return iterable.toArray();
    }
    else {
        var results = [];
        for (var i = 0; i < iterable.length; i++) {
            results.push(iterable[i]);
        }

        return results;
    }
}

Function.prototype.bind = function() {
    var __method = this, args = $A(arguments), object = args.shift();

    return function() {
        return __method.apply(object, args.concat($A(arguments)));
    }
}

// Adapted from the Yahoo! User Interface Library Version 2.5.1
// http://developer.yahoo.com/yui/

function getXY(el) {
    if ((el.parentNode === null || el.offsetParent === null || el.style.display == 'none') && el != el.ownerDocument.body) {
        return false;
    }
    else {
        var pos = [el.offsetLeft, el.offsetTop];
        var parentNode = el.offsetParent;

        if (parentNode != el) {
            while (parentNode) {
                pos[0] += parentNode.offsetLeft;
                pos[1] += parentNode.offsetTop;
                parentNode = parentNode.offsetParent;
            }
        }

        parentNode = el.parentNode;

        // account for any scrolled ancestors
        while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
            if (parentNode.scrollTop || parentNode.scrollLeft) {
                // work around opera inline/table scrollLeft/Top bug (false reports offset as scroll)
                if (!/^(?:inline|table-row)$/i.test(parentNode.style.display)) { 
                    pos[0] -= parentNode.scrollLeft;
                    pos[1] -= parentNode.scrollTop;
                }
            }
                    
            parentNode = parentNode.parentNode; 
        }

        return pos;
    }
}


function hasNode(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate('count(' + xpath + ')', contextDocument, null, XPathResult.NUMBER_TYPE, null).numberValue != 0;
    }
    else {
        return document.evaluate('count(' + xpath + ')', document, null, XPathResult.NUMBER_TYPE, null).numberValue != 0;
    }
}

function stringFor(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.STRING_TYPE, null).stringValue;
    }
    else {
        return document.evaluate(xpath, document, null, XPathResult.STRING_TYPE, null).stringValue;
    }
}

function countFor(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate('count(' + xpath + ')', contextDocument, null, XPathResult.NUMBER_TYPE, null).numberValue;
    }
    else {
        return document.evaluate('count(' + xpath + ')', document, null, XPathResult.NUMBER_TYPE, null).numberValue;
    }
}

function nodeFor(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    else {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}

function nodeIteratorFor(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    }
    else {
        return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    }
}

function nodeSnapshotFor(xpath, contextDocument) {
    if(contextDocument) {
        return contextDocument.evaluate(xpath, contextDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    else {
        return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
}

function GreaseFrame() {
}

GreaseFrame.prototype = {
    statusUnknown: 0,
    statusPresent: 1,
    statusAbsent: 2,
    statusError: 3,
    status: GreaseFrame.prototype.statusUnknown,
    
    request: function(url) {
        GM_xmlhttpRequest({
            url:     url,
            method:  'GET',
            onload:  this.load.bind(this),
            onerror: this.error.bind(this)
        });
    },

    load: function(response) {
        var iframe;

        iframe = document.createElement('iframe'); 
        iframe.style.position   = 'absolute';
        iframe.style.visibility = 'hidden';
        iframe.style.width      = '95%';
        iframe.style.height     = '0px';

        if(this.iframe) {
            document.body.replaceChild(iframe, this.iframe);
        }
        else {
            document.body.appendChild(iframe);
        }

        this.iframe = iframe;
	
        with(iframe) {
            contentWindow.addEventListener('load', this.post.bind(this, iframe.contentDocument), false);
            contentWindow.location.href = location.href;
            contentDocument.open("text/html");
            contentDocument.write(response.responseText.replace(/<script(.|\s)*?>(.|\s)*?<\/script>/gmi, ''));
            contentDocument.close();
        }
    }, 

    post: function(document) {
        this.parse(document);
    },

    error: function(response) {
        this.status = this.statusError;
    }
}

function GreaseFunction() {
}

GreaseFunction.prototype = {
    statusUnknown: 0,
    statusPresent: 1,
    statusAbsent: 2,
    statusError: 3,
    status: GreaseFunction.prototype.statusUnknown,
    
    request: function(url, callback) {
        this.callback = callback;
        
        GM_xmlhttpRequest({
            url:     url,
            method:  'GET',
            onload:  this.load.bind(this),
            onerror: this.error.bind(this)
        });
    },

    load: function(response) {
        var iframe;

        iframe = document.createElement('iframe'); 
        iframe.style.position   = 'absolute';
        iframe.style.visibility = 'hidden';
        iframe.style.width      = '95%';
        iframe.style.height     = '0px';

        if(this.iframe) {
            document.body.replaceChild(iframe, this.iframe);
        }
        else {
            document.body.appendChild(iframe);
        }

        this.iframe = iframe;
	
        with(iframe) {
            contentWindow.addEventListener('load', this.post.bind(this, iframe.contentDocument), false);
            contentWindow.location.href = location.href;
            contentDocument.open("text/html");
            contentDocument.write(response.responseText.replace(/<script(.|\s)*?>(.|\s)*?<\/script>/gmi, ''));
            contentDocument.close();
        }
    }, 

    post: function(document) {
        this.callback(this.statusPresent, document);
    },

    error: function(response) {
        this.callback(this.statusError);
    }
}

function Library() {
}

Library.prototype       = new GreaseFrame();
Library.prototype.xpath = new Object();

Library.prototype.get = function(key, document) {
    return stringFor(this.xpath[key], document);
}

Library.prototype.search = function(success, failure) {
    this.success = success;
    this.failure = failure;
    
    this.request(this.location);
}

Library.prototype.searchByISBN10 = function(ISBN10, success, failure) {
    this.location = this.locationSearchByISBN10.replace(new RegExp(this.placeholderISBN10, 'g'), ISBN10);
        
    this.search(success, failure);
}

Library.prototype.searchByISBN13 = function(ISBN13, success, failure) {
    this.location = this.locationSearchByISBN13.replace(new RegExp(this.placeholderISBN13, 'g'), ISBN13);
        
    this.search(success, failure);
}

Library.prototype.searchByTitleAuthor = function(title, author, success, failure) {
    this.location = this.locationSearchByTitleAuthor.replace(new RegExp(this.placeholderTitle, 'g'), title).replace(new RegExp(this.placeholderAuthor, 'g'), author);
        
    this.search(success, failure);
}

Library.prototype.searchByTitle = function(title, success, failure) {
    this.location = this.locationSearchByTitle.replace(new RegExp(this.placeholderTitle, 'g'), title);
        
    this.search(success, failure);
}

Library.prototype.parse = function(document) {
    this.foundHolding         = hasNode(this.xpath['holding'],      document);
    this.foundHoldingList     = hasNode(this.xpath['holdingList'],  document);
    this.foundHoldingListSize = countFor(this.xpath['holdingList'], document) - 2;
    
    if(this.foundHolding) {
        this.holdingArray = new Array();
        
        var nodeIteratorHoldingLibrary  = nodeIteratorFor(this.xpath['holdingLibrary'],  document);
        var nodeIteratorHoldingCopy     = nodeIteratorFor(this.xpath['holdingCopy'],     document);
        var nodeIteratorHoldingMaterial = nodeIteratorFor(this.xpath['holdingMaterial'], document);
        var nodeIteratorHoldingLocation = nodeIteratorFor(this.xpath['holdingLocation'], document);

        var nodeHoldingLibrary  = nodeIteratorHoldingLibrary  .iterateNext();
        var nodeHoldingCopy     = nodeIteratorHoldingCopy     .iterateNext();
        var nodeHoldingMaterial = nodeIteratorHoldingMaterial .iterateNext();
        var nodeHoldingLocation = nodeIteratorHoldingLocation .iterateNext();

        while(nodeHoldingLibrary) {
            var holding = new Object();
            this.holdingArray.push(holding);
            
            holding.library  = nodeHoldingLibrary .textContent;
            holding.copy     = nodeHoldingCopy    .textContent;
            holding.material = nodeHoldingMaterial.textContent;
            holding.location = nodeHoldingLocation.textContent;

            nodeHoldingLibrary  = nodeIteratorHoldingLibrary  .iterateNext();
            nodeHoldingCopy     = nodeIteratorHoldingCopy     .iterateNext();
            nodeHoldingMaterial = nodeIteratorHoldingMaterial .iterateNext();
            nodeHoldingLocation = nodeIteratorHoldingLocation .iterateNext();
        }
    }

    if(this.foundHolding || this.foundHoldingList) {
        this.success(this);
    }
    else {
        this.failure(this);
    }
}

function LibraryGADekalb() { Library.call(this); }
LibraryGADekalb.prototype = new Library();
LibraryGADekalb.prototype.locationSearch              = true;
LibraryGADekalb.prototype.locationSearch1             = 'http://findit.dekalblibrary.org/uPortal/Initialize?uP_reload_layout=true&uP_tparam=props';
LibraryGADekalb.prototype.locationSearch2             = 'http://findit.dekalblibrary.org/uPortal/tag.idempotent.render.userLayoutRootNode.uP?uP_root=root&uP_sparam=activeTab&activeTab=2';

LibraryGADekalb.prototype.placeholderISBN13           = 'PLACEHOLDERISBN13';
LibraryGADekalb.prototype.placeholderISBN10           = 'PLACEHOLDERISBN10';
LibraryGADekalb.prototype.placeholderTitle            = 'PLACEHOLDERTITLE';
LibraryGADekalb.prototype.placeholderAuthor           = 'PLACEHOLDERAUTHOR';
LibraryGADekalb.prototype.locationSearchByISBN13      = 'http://findit.dekalblibrary.org/uPortal/tag.idempotent.render.userLayoutRootNode.target.n12.uP?doSearch=true&showBrief=true&searchGroup=BROW1&template=search-multi-index-drop&index1=ISBNEX&term1=PLACEHOLDERISBN13&defaultLimit=&defaultSort=#n12';
LibraryGADekalb.prototype.locationSearchByISBN10      = 'http://findit.dekalblibrary.org/uPortal/tag.idempotent.render.userLayoutRootNode.target.n12.uP?doSearch=true&showBrief=true&searchGroup=BROW1&template=search-multi-index-drop&index1=ISBNEX&term1=PLACEHOLDERISBN10&defaultLimit=&defaultSort=#n12';
LibraryGADekalb.prototype.locationSearchByTitleAuthor = 'http://findit.dekalblibrary.org/uPortal/tag.idempotent.render.userLayoutRootNode.target.n12.uP?doSearch=true&showBrief=true&searchGroup=KW2&template=search-power&index1=.AW&term1=PLACEHOLDERAUTHOR&operator1=AND&index2=.TW&term2=PLACEHOLDERTITLE&operator2=AND&index3=.TW&term3=&operator3=AND&index4=.SW&term4=&allCategories=on&searchTargets=16&defaultLimit=&defaultSort=&limitBoxCount=3&limit1=&limitOperator1=%3D&limitValue1=&limit2=&limitOperator2=%3D&limitValue2=&sort=#n12';
LibraryGADekalb.prototype.locationSearchByTitle       = 'http://findit.dekalblibrary.org/uPortal/tag.idempotent.render.userLayoutRootNode.target.n12.uP?doSearch=true&showBrief=true&searchGroup=KW2&template=search-power&index1=.TW&term1=PLACEHOLDERTITLE&operator1=AND&index2=.AW&term2=&operator2=AND&index3=.TW&term3=&operator3=AND&index4=.SW&term4=&allCategories=on&searchTargets=16&defaultLimit=&defaultSort=&limitBoxCount=3&limit1=&limitOperator1=%3D&limitValue1=&limit2=&limitOperator2=%3D&limitValue2=&sort=#n12';
LibraryGADekalb.prototype.xpath['holdingList']        = '//form[@name="summaryForm"]/table[2]/tbody/tr';
LibraryGADekalb.prototype.xpath['holding']            = '//form[@name="CopyRequest"]/table/tbody/tr[position()>1]';     
LibraryGADekalb.prototype.xpath['holdingLibrary']     = '//div[@id="panel1"]/table/tbody/tr/td[position()=1][@class="holdingslist"]';
LibraryGADekalb.prototype.xpath['holdingCopy']        = '//div[@id="panel1"]/table/tbody/tr/td[position()=3][@class="holdingslist"]';
LibraryGADekalb.prototype.xpath['holdingMaterial']    = '//div[@id="panel1"]/table/tbody/tr/td[position()=4][@class="holdingslist"]';
LibraryGADekalb.prototype.xpath['holdingLocation']    = '//div[@id="panel1"]/table/tbody/tr/td[position()=5][@class="holdingslist"]';

LibraryGADekalb.prototype.search = function(success, failure) {
    this.success = success;
    this.failure = failure;

    if(this.locationSearch) {
        new GreaseFunction().request(this.locationSearch1, this.searchHelper1.bind(this));
    }
    else {
        this.request(this.location);
    }
}

LibraryGADekalb.prototype.searchHelper1 = function(status, document) {
    if(status == this.statusPresent) {
	  new GreaseFunction().request(this.locationSearch2, this.searchHelper2.bind(this));
    }
    else {
        this.failure();
    }
}

LibraryGADekalb.prototype.searchHelper2 = function(status, document) {
    if(status == this.statusPresent) {
        this.locationSearch = false;
	  this.request(this.location);
    }
    else {
        this.failure();
    }
}

function Store(library) {
    this.library = library;
}

Store.prototype = {
    stringFor: function(key) {
        return stringFor(this.xpath[key]);
    },

    nodeFor: function(key) {
        return nodeFor(this.xpath[key]);
    },

    nodeIteratorFor: function(key) {
        return nodeIteratorFor(this.xpath[key]);
    },

    context: function() {
        return this.nodeFor('context');
    },
    
    ISBN10: function() {
        return this.stringFor('ISBN-10').replace(/^\s+|\s+$/g, '').replace('-', '');
    },
    
    ISBN13: function() {
        return this.stringFor('ISBN-13').replace(/^\s+|\s+$/g, '').replace('-', '');
    },

    title: function() {
        return this.stringFor('title').replace(/\([^\)]*\)/g, '').replace(/\[[^\]]*\]/g, '').replace('-', ' ').replace(/^\s+|\s+$/g, '');
    },
    
    authorIndex: -1,
    
    author: function() {
        var authorIterator = this.nodeIteratorFor('author');
        var authorList     = new Array();

        for(var authorNode = authorIterator.iterateNext(); authorNode; authorNode = authorIterator.iterateNext()) {
            authorList.push(authorNode.textContent);
        }
        
        return authorList;
    },

    actorIndex: -1,
    
    actor: function() {
        var actorIterator = this.nodeIteratorFor('actor');
        var actorList     = new Array();

        for(var actorNode = actorIterator.iterateNext(); actorNode; actorNode = actorIterator.iterateNext()) {
            actorList.push(actorNode.textContent);
        }
        
        return actorList;
    },

    directorIndex: -1,
    
    director: function() {
        var directorIterator = this.nodeIteratorFor('director');
        var directorList     = new Array();

        for(var directorNode = directorIterator.iterateNext(); directorNode; directorNode = directorIterator.iterateNext()) {
            directorList.push(directorNode.textContent);
        }
        
        return directorList;
    },
    
    initialize: function() {
        this.renderBefore();
        this.attemptSearchByISBN13();
    },
    
    attemptSearchByISBN13: function() {
        if(this.xpath['ISBN-13'] && this.ISBN13()) {
            this.status.innerHTML = this.ISBN13();
            
            this.library.searchByISBN13(this.ISBN13(), this.renderAfter.bind(this), this.attemptSearchByISBN10.bind(this));
        }
        else {
            this.attemptSearchByISBN10();
        }
    },
    
    attemptSearchByISBN10: function() {
        if(this.xpath['ISBN-10'] && this.ISBN10()) {
            this.status.innerHTML = this.ISBN10();

            this.library.searchByISBN10(this.ISBN10(), this.renderAfter.bind(this), this.attemptSearchByTitle.bind(this));
        }
        else {
            this.attemptSearchByTitle();
        }
    },
    
    attemptSearchByTitleAuthor: function() {
        this.authorIndex++;
        
        if(this.xpath['title'] && this.title() && this.xpath['author'] && this.author()[this.authorIndex]) {
            this.status.innerHTML = this.title() + ' & ' + this.author()[this.authorIndex];

            this.library.searchByTitleAuthor(this.title(), this.author()[this.authorIndex], this.renderAfter.bind(this), this.attemptSearchByTitleAuthor.bind(this));
        }
        else {
            this.attemptSearchByTitleActor();
        }
    },
    
    attemptSearchByTitleActor: function() {
        this.actorIndex++;
        
        if(this.xpath['title'] && this.title() && this.xpath['actor'] && this.actor()[this.actorIndex]) {
            this.status.innerHTML = this.title() + ' & ' + this.actor()[this.actorIndex];

            this.library.searchByTitleAuthor(this.title(), this.actor()[this.actorIndex], this.renderAfter.bind(this), this.attemptSearchByTitleActor.bind(this));
        }
        else {
            this.attemptSearchByTitleDirector();
        }
    },
    
    attemptSearchByTitleDirector: function() {
        this.directorIndex++;
        
        if(this.xpath['title'] && this.title() && this.xpath['director'] && this.director()[this.directorIndex]) {
            this.status.innerHTML = this.title() + ' & ' + this.director()[this.directorIndex];

            this.library.searchByTitleAuthor(this.title(), this.director()[this.directorIndex], this.renderAfter.bind(this), this.attemptSearchByTitleDirector.bind(this));
        }
        else {
            this.renderAfter();
        }
    },
    
    attemptSearchByTitle: function() {
        if(this.title()) {
            this.status.innerHTML = this.title();

            this.library.searchByTitle(this.title(), this.attemptSearchByTitleAuthor.bind(this), this.renderAfter.bind(this));
        }
        else {
            this.renderAfter();
        }
    },
    
    renderBefore: function() {
        var context         = this.context();
        var contextPosition = getXY(context);
        
        this.div                       = document.createElement('div');
        this.div.style.border          = 'none';
        this.div.style.position        = 'absolute';
        this.div.style.textAlign       = 'center';
        this.div.style.backgroundColor = 'white';
        this.div.style.border          = '1px solid #CC6600';
        this.div.style.padding         = '5px';
        this.div.style.paddingTop      = '0px';
        
        if(this.position == 'l') {
            this.div.style.left            = contextPosition[0] - context.offsetWidth  / 2;
            this.div.style.top             = contextPosition[1] + context.offsetHeight / 2 - 15;
            this.div.style.width           = context.offsetWidth - 12;
        }
        else {
            this.div.style.left            = contextPosition[0];
            this.div.style.top             = contextPosition[1] - 20;
            this.div.style.width           = context.offsetWidth - 12;
        }
        
        this.img                = document.createElement('img');
        this.img.src            = this.iconQuestion;
        this.img.style.border   = '0px';
        this.img.style.display  = 'block';
        this.img.style.margin   = 'auto';
        
        this.status                  = document.createElement('span');
        this.status.style.fontSize   = '11px';
        this.status.style.fontWeight = 'bold';

        this.div.appendChild(this.img);
        this.div.appendChild(this.status);

        document.body.appendChild(this.div);
    },
    
    renderAfter: function(library) {
        this.img.addEventListener('mouseover', this.onMouseover.bind(this), false);
        this.img.addEventListener('mouseout',  this.onMouseout .bind(this), false);
        
        this.status.style.display      = 'none';
        this.div.style.borderColor     = 'transparent';
        this.div.style.backgroundColor = 'transparent';
        
        if(library  && (library.foundHolding || library.foundHoldingList)) {
            this.img.src = this.iconSmile;

            if(library.foundHoldingList) {
                this.status.innerHTML += ' (' + library.foundHoldingListSize + ')';
            }

            a = document.createElement('a');
            a.href = library.location;

            this.img.parentNode.replaceChild(a, this.img);
            
            a.appendChild(this.img);
        }
        else {
            this.img.src = this.iconFrown;
        }
    },
    
    onMouseover: function() {
        this.status.style.display      = '';
        this.div.style.borderColor     = '#CC6600';
        this.div.style.backgroundColor = 'white';
    },
    
    onMouseout: function() {
        this.status.style.display      = 'none';
        this.div.style.borderColor     = 'transparent';
        this.div.style.backgroundColor = 'transparent';
    }
}

Amazon = function(library) { 
    Store.call(this, library); 
    if(window == window.top) {
        addEventListener('load', this.initialize.bind(this), false);
    }
} 

Amazon.prototype = new Store();
Amazon.prototype.xpath             = new Object();
Amazon.prototype.xpath['ISBN-13']  = '//li[b/text()="ISBN-13:"]/text()';
Amazon.prototype.xpath['ISBN-10']  = '//li[b/text()="ISBN-10:"]/text()';
Amazon.prototype.xpath['context']  = '//*[@id="prodImageCell"]';
Amazon.prototype.xpath['title']    = '//*[@id="btAsinTitle"]/text()';
Amazon.prototype.xpath['author']   = '//*[h1/span[@id="btAsinTitle"]]/span/a/text()';
Amazon.prototype.xpath['actor']    = '//li[b[text()="Actors:"]]/a/text()';
Amazon.prototype.xpath['director'] = '//li[b[text()="Director:" or text()="Directors:"]]/a/text()';
Amazon.prototype.iconQuestion      = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAFr0lEQVR42mJkIAH8//+fCZccIyPjP2LNAQggRhIsYwZidiiNrO8/EP8F4p8gmhjLAQKIkUjLuIFYAIglgZgXiFmQlP0B4s9A/ByIPwDxV0KWAwQQIw7LGKEGgywTBGIFIFYDYl0gloL6GAZAPnwGxJeB+BYQPwDi91DL/wAt/49uPkAAMeKwEGSoGBArA7E6EBtALQVZzg/1PQyAgvYj1DKQpReA+CYQ3wXiVyBHoVsMEECMWCzkAGIZIDYFYisg1gJiRaiPuf79/s7659MLhl8fnjKwi6kysHAJMDAys/8Gyn2D+vA+EF8D4mNAfBqInwDxD2SLAQKIBYsPQRZaALEr1GIJUDC/PjSD9e3xRQyfbx1n+P0O4VBWIWAkq1mySriX8QsYBHAhxT0fNEROAPFjoPlwHwMEECOSpaxQxTZA7AG1WObX2/uctyd5MHy8dIvhH9A/TEBVjEDMAkxOf4DJ5z9QDCYuZGHJoJq/nYGZg/871IcgC3cA8RFQQgNaCgoRBoAAYkFKpdzQOLSC+lDm29PLnFfr9MA+Y+KAGCoT0sXAo2wD9+mn67sYnm1qYHh/9jjDm8PHGb4/kWLQabvHycorDouiT9CU/QlozydQqgYIIEYkX0oDsTsQhwOx4d8fHwUuFoky/Hj+m4FDkpVBrXgf3LIPFzYwfL65F8wWtklj4JLWBYvd6glk+ANMs9zyfAz6/UCXMjKDstB5IF4JxDuB+CnItwABxAj1JRc0O0QDsRfIlzc6rVjfnTgOjjP9rnsMbMLAtPTvL8PVRi2gr26Bg/Pfb4hvpXyDGJTS1zIAQ4bhSrkeMJHBxX5Dg3kbEC+FZqtvAAEEK9aYoZkelAf5gZpZQcEFAgrpSyAWglLD6gKwhXyaEgwGUy4x6LSsZ2AXB2bSzevAPgX5WC66Feygt6fWMQBDixWaxaSg5oOzGkAAMSFlHRZYMff2yCyGv8AMwKMiwSBqFg2Pv3fA1PvzNQPQ4OlgC4CplYFLRg0sBwtuCc8qcHT8fAlUf2o5A1LxyQJLuAABhLUA//rgLJgWNAlBEdesvcBgue4S2DIQAAXntyeQoOZVd4arE9D3hTjk+m6sxSBAAGG19Neb+2CDOBQtUMRBwQzyISzVguIP5CMJjyC4Q0CAV9MVTH9/dgWrpQABhNXS/38hZTUrGzdWTcBSieHOZB9wgpGPzQEnIlIAQABhtZRdXBmcMmHxhA6+PToLxL/BCUo2fDKGPCxYOaV0sOoHCCAWbILcCsbgjP7p2i6smkD51WjmJQZWPjGs8h+v7ADTXHLGWOUBAogJqSL+A6uIBU3CwXH66fotcNyhA2A5zHC714Xh8bIsrHLfn3wDF5NCZpEMSBX8H6g9DAABxIRUPX2G1osfgT75za+nBi5X704LBMchMvjx/CrDm6Ov4D6Cgd+fXzI8WJgJZos5BIES3m9otfcMaj7IHgaAAGKC1vA/oeXjZWi9+FU1bwe4vAW5+kqVEthAGAAVfdoNrQwysbMQ8QwqjUDq3kFqHvn4eQzQivwB1Nzn0Lr1H0AAMSIV+KCqyBCIg4EYlOnkgUHLea3JneHfD4hBEm458LIW2TJQYfJ88xRwucsCTPBajYdB8Q4KnodADEqNa6FlMLjABwggglXbl7tHOG/1OoFTKzjlAeOKXYSLgYmZBVgU/2H4+eYbuIoDpQFuRTEG1eI9IEfhrdoAAogRSyUui1SJgy0GZlzOFzs6GV7u7ARa8gnsI1gdCvIZuwgfg7h7OagI/A0N0hfQVsNuWCWO3GwBCCB8zRXk1oMo1EHsoMrg0/uXDMzfXjL85RJn4BMUB/mMpOYKQADhapjBLDYBYksgloNaLIXUDCG7YQYQQPiaoOxQi2ShtDS0kUZxExQggBjxNLSRqzs2qA+p0tgGCCCC3Qqk/gvVuhUAAcRISu1ArQ4UQIABADTLNkOuLt/IAAAAAElFTkSuQmCC';
Amazon.prototype.iconSmile         = 'data:image/png;base64,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';
Amazon.prototype.iconFrown         = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAFgElEQVR42mJkIBL8//+fEUgxATEjNmkg/sfIyPifGLMAAoiRSMuYgZgFiDmgNCMU/4fiP0D8A0r/JWQ5QAAxEmEZKxDzALEQEIsBMR9UDAZ+A/EnIH4FxO+A+AtUDKflAAHEiMNCUDCyATEvEAsDsTwQKwOxGhCLAzE7kk9/AvFLIL4FxHeB+CEQvwXiz0D8C2jxP3TzAQKIEYuFIN9xQQ1XAmJVINYCYhUglgViAWgQwwAoSD8A8WMgvgPE14D4NhDfgzrmG9Div8h2AAQQIxYLuYFYDogNgNgEiDWAWAHqY+5/v79z/vn0guHXh6cM7GKqDCxcAgyMzOzfgXJfoT58AMQ3gPgMEF8A4kcgOWSLAQKIBS1IuaAWgiyzA2JDIJYCBfPrQzM43x5fxPD51nGG3+8QDmUFxjSvmiWnhHsZp4BBAMjBgtBQ4kMy/yHQ/K+woAYIIEakRAOKJxkgtgBiJyA2BTng19v7fLcneTB8vHSL4R8weTABkxAjELMAY/sPMNb+A8Vg4kIWlgyq+dsZmDn4P0F9eBqI9wHxCSB+Aop/UOICCCCYS5ihiUYJ6kuQD+W+Pb3Md7VOD+wzJg6IoTIhXQw8yjZwn366vovh2aYGhvdnjzO8OXyc4fsTKQadtnt8rLzictD4hqXsj1D+H4AAYkTyJSiFOgOxH8jSvz8+il0sEmX48fw3A4ckK4Na8T4Uy9DBhwsbGG71BDL8AcYstzwfg34/0KWMzCDLzgPxJiDeC03ZPwECiAlaynBA86AaNE55b0/0BFsIijOd5pt4LQQBYHwy6HReYmABxurnO58Y7s0KY4CGnhzUXDGoPUwAAQQr1ligEQ9KAALAYOUEBRcIKKQvYWATVgSzz2WxMRzxQc1lyGJc0roMctGt4Ph9e2odAzC0OKFZDDlhMQIEEBNS1mGFBjPL2yOzGP5+AxZDKhIMombRKJZwybFi+BJZTMKzChwdP4E59N2p5bAcwg41H+w6gABiQcuvYPrrg7NgjqBJCIrhRtN+YViITUxA35fh26N1DJ+v72YQtcvAMB8ggJiwxc+vN/fBQcShaMFADuDVdAXT359dwSoPEEBYLf3/F1JcsrJxM9ACAAQQVkvZxZXBGf7zzb0o4sBSieFYICMGBokjA1CwggCnlA5WSwECiAWpEobT3ArG4Iz+6douuMJ7M4MZXuxYx6BaOB0WT3CH3O7PBFuklL4WLPbxyg5oAjNmwGY+QAAxIXF+Q6upP4Im4eA4/XT9FrjEAWf+i5sxLAQBEB8kDpKHOeL7k2/gYlLILBJWC/2Emg+2FCCAwDULEAsAsS0QTwDia0D87Uqd2v+jAQz/z+Vw/f/769t/YsCvTy/+n0piAOu7OyMIJPQNat4EqPkge5gBAgjk03/QpsYraEUMKqg/q+btAJe3IFdfqVJi+P35Jd7EASxQIOreQWoe+fh5DNCK/BHU3FdQe/4BBBATtEnxB9rUuAOtC58BS6FPWnU7wRZ/ufOC4UKBBMPjlblgw9EtA4lfKdeDBCswwWtWHYbVNM+g5t2Bmv8HZB9AABGs2r7cPcJ3q9cJmNl/Q1IeMK7YRbgYmJhZGP79/cPw8803cBUHSgPcimIMqsV7QMUh3qoNIIAY0SpxbmhtA6re7KG0HDDj8r3Y0cnwcmcn0JJP4JoEVoeCfMYuwscg7l4OKgK/Q4P0GbR2OQRtQTyEth7ABQBAAOFrrsBaDwbQAhvUquAABifHp/cvGZi/vWT4yyXOwCcoDvIZSc0VgADC1TDjhjbCDGAVOrRqkkBrhpDVMAMIIFxNUFiLEGSRNJSWgrYsKG6CAgQQvsY2rO0Lqng5oT6kSmMbIIAYSei/UK1bARBAjMTWDNTsQAEEGADCxF1UmhYcHAAAAABJRU5ErkJggg==';
Amazon.prototype.position          = 't';

Barnes = function(library) { 
    Store.call(this, library); 
    if(window == window.top) {
        addEventListener('load', this.initialize.bind(this), false);
    }
}
Barnes.prototype = new Store();
Barnes.prototype.xpath             = new Object();
Barnes.prototype.xpath['ISBN-13']  = '//li[starts-with(text(), "ISBN-13:")]/a/text()';
Barnes.prototype.xpath['ISBN-10']  = '//li[starts-with(text(), "ISBN:")]/a/text()';
Barnes.prototype.xpath['context']  = '//*[@id="product-image"]/div[@class="look-inside-pdp"]/a/img';
Barnes.prototype.xpath['title']    = '//div[@id="product-info"]/div/h2/text()';
Barnes.prototype.xpath['author']   = '//*[@id="product-info"]//h2//a/text()';
Barnes.prototype.xpath['actor']    = undefined; // same as author
Barnes.prototype.xpath['director'] = undefined; // same as author
Barnes.prototype.iconQuestion      = 'data:image/png;base64,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';
Barnes.prototype.iconSmile         = 'data:image/png;base64,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';
Barnes.prototype.iconFrown         = 'data:image/png;base64,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';
Barnes.prototype.position          = 't';

Powells = function(library) { 
    Store.call(this, library); 
    if(window == window.top) {
        addEventListener('load', this.initialize.bind(this), false);
    }
}

Powells.prototype = new Store();

Powells.prototype.xpath             = new Object();
Powells.prototype.xpath['ISBN-13']  = '//div[@id="seemore"]/p/a[preceding-sibling::strong/text()="ISBN13:"]/text()';
Powells.prototype.xpath['ISBN-10']  = '//div[@id="seemore"]/p/a[preceding-sibling::strong/text()="ISBN10:"]/text()';
Powells.prototype.xpath['context']  = '//*[@id="data"]';
Powells.prototype.xpath['title']    = '//div[@id="productpage"]/div[2]/text()';
Powells.prototype.xpath['author']   = '//div[@id="productpage"]/a/text()';
Powells.prototype.xpath['actor']    = undefined; // '//dd[@class="actor"]/a/text()';
Powells.prototype.xpath['director'] = undefined; // '//dd[@class="director"]/a/text()';
Powells.prototype.iconQuestion      = 'data:image/png;base64,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';
Powells.prototype.iconSmile         = 'data:image/png;base64,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';
Powells.prototype.iconFrown         = 'data:image/png;base64,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';
Powells.prototype.position          = 'l';

Netflix = function(library) { 
    Store.call(this, library); 
    if(window == window.top) {
        addEventListener('load', this.initialize.bind(this), false);
    }
}
Netflix.prototype = new Store();

Netflix.prototype.xpath             = new Object();
Netflix.prototype.xpath['ISBN-13']  = undefined;
Netflix.prototype.xpath['ISBN-10']  = undefined;
Netflix.prototype.xpath['context']  = '//div[@id="boxshotimg"]/a/img';
Netflix.prototype.xpath['title']    = '//div[@id="mdpInfo"]/div[@class="title"]/text()';
Netflix.prototype.xpath['author']   = undefined; // 
Netflix.prototype.xpath['actor']    = '//div[@class="section" and h6[@id="cast"]]//a/text()'; 
Netflix.prototype.xpath['director'] = '//div[@class="section" and h6[@id="director"]]//a/text()';
Netflix.prototype.iconQuestion      = 'data:image/png;base64,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';
Netflix.prototype.iconSmile         = 'data:image/png;base64,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';
Netflix.prototype.iconFrown         = 'data:image/png;base64,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';
Netflix.prototype.position          = 'l';

if(window.location.toString().match(/^http:\/\/www\.amazon\.com\//))          { new Amazon (new LibraryGADekalb()); }
if(window.location.toString().match(/^http:\/\/[^\.]*.barnesandnoble.com\//)) { new Barnes (new LibraryGADekalb()); }
if(window.location.toString().match(/^http:\/\/www\.powells\.com\//))         { new Powells(new LibraryGADekalb()); }
if(window.location.toString().match(/^http:\/\/www\.netflix\.com\//))         { new Netflix(new LibraryGADekalb()); }
