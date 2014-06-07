// ==UserScript==
// @name        Scrolling Pesterlogs
// @namespace   brendan10211
// @description pesterlogs emulate real webchats to make them easier to read
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @include		http://homestuckology.appspot.com/www.mspaintadventures.com/*
// @version     0.1
// ==/UserScript==

// code stolen from the homosuck script on userscripts.org because i'm a lazy fuck

//does shit with xpaths i guess
var XPATH={
    //returns an ordered array of objects matching the xpath expression
    //if context is undefined, defaults to the document
    //returns an empty array if there are no matches
    get:function (expression,context) {
        //optional variable, yo
        if (context == undefined)
            context = document;
        var xpathResult = document.evaluate(expression, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var result = [];
        for (var i=0; i<xpathResult.snapshotLength; i++)
            result.push(xpathResult.snapshotItem(i));
        return result.length > 0 ? result : [];
    },
    
    //counts all the elements that match the xpath expression
    //if context is undefined, defaults to the document
    count:function(expression, context) {
        //optional variable, yo
        if (context == undefined)
            context = document;
        expression = 'count('+expression+')';
        var xpathResult = document.evaluate(expression, context, null, XPathResult.NUMBER_TYPE, null);
        return xpathResult.numberValue;
    }
}

var title      = XPATH.get('//td[@bgcolor="#EEEEEE"]/table/tbody/tr/td[2]/center/p')[0];
var images     = XPATH.get('//td[@bgcolor="#EEEEEE"]/center')[0];
var text       = XPATH.get('//td[@bgcolor="#EEEEEE"]/table/tbody/tr/td[1]/center')[0];
var banner     = XPATH.get('//td[@background="images/bannerframe.png"]/center/a')[0];
var news       = XPATH.get('//table[@width="676"]/tbody/tr/td/table')[0];
var searchLink = XPATH.get('//font[@size="1"]/b/a[6]')[0];
var backLink   = XPATH.get('//span[@style="font-size: 10px;"]/b[2]/a')[0];
var latest     = [
    XPATH.get('//table[@width="255"]/tbody/tr[2]/td/center/img[2]')[0],
    XPATH.get('//table[@width="255"]/tbody/tr[3]/td/table/tbody/tr/td/p')[0],
    XPATH.get('//table[@width="255"]/tbody/tr[4]/td/center/font')[0],
    XPATH.get('//table[@width="255"]/tbody/tr[4]/td/center[2]/span')[0]
];
var command    = XPATH.get('//table/tbody/tr/td/font//a[contains(@href,"?s=6&p=")]')[0];

function pesterLine(color, text, delay) {
    this.color = color;
    this.text = text;
    this.delay = delay;
}

if(text){
    if(text.firstElementChild.textContent=='\n	\n			\n')
        text.firstElementChild.style.display='none';
    text.firstElementChild.style.maxHeight='450px';
    text.firstElementChild.style.overflowY='auto';
    if(text.children[1]){
        text.children[1].style.maxHeight='450px';
        text.children[1].style.overflowY='auto';
    }
}

var line = new Array;

for(var i=0;i<document.getElementsByClassName('spoiler').length;i++){
    //get pesterlog
    var pesterlog = document.getElementsByClassName('spoiler')[0];
    var log = pesterlog.getElementsByTagName('p')[0];
    log.className = "inside";
    var k = log.getElementsByTagName('span').length;
    
    var foo = 0;                                               // running delay
    var bar = log.getElementsByTagName('span')[0].style.color; // previous color
    for (var j = 0; j < k; j++) {        
        foo += (log.getElementsByTagName('span')[0].innerHTML.length * 50);
        if (bar != log.getElementsByTagName('span')[0].style.color) { // who was the last person to type
            foo += 1500;
        }
        line[j] = new pesterLine(
            log.getElementsByTagName('span')[0].style.color, // color of person typing
            log.getElementsByTagName('span')[0].innerHTML,   // text of person typing
            foo                                              // delay between people typing
        );
        bar = log.getElementsByTagName('span')[0].style.color; // store the "previous" color
        log.getElementsByTagName('span')[0].remove();
    }
    
    line[k] = new pesterLine("#000000", "End of pesterlog.", foo + 1000);
    
    for (var j = 0; j < k - 1; j++) {
        log.getElementsByTagName('br')[0].remove();
    }
    
    var delay = 0;
    
    // this is the thing that triggers all the displaying
    for(var j=0; j < line.length; j++) {
        setTimeout(
            (function(s) { 
                return function() {
                    console.log(s);
                    var line = document.createElement('span');
                    var brk = document.createElement('br');
                    line.textContent = s.text;
                    line.style.fontWeight = "bold";
                    line.style.fontFamily='courier,monospace';
                    line.style.color = s.color;
                    log.parentNode.appendChild(line, log);
                    log.parentNode.appendChild(brk, log);                      
                    log.parentNode.lastElementChild.scrollIntoView(false);
                    
                    delay = s.delay;
                }
            })(line[j]), line[j].delay);
    }
    
    var end = document.createElement('span');
    end.textContent = "End of pesterlog.";
    end.style.fontWeight = "bold";
    end.style.fontFamily='courier,monospace';
    log.parentNode.lastElementChild.scrollIntoView(false);
    
    //display pesterlog back with delay
    pesterlog.previousSibling.style.display='none';
    pesterlog.style.display='block';
    pesterlog.firstChild.firstChild.style.display='none';
}