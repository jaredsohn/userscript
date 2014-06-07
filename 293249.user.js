// ==UserScript==
// @name         ym_emo_fb
// @namespace    https://github.com/chinhodado/ym_emo_fb
// @version      0.1
// @description  View Yahoo Messenger emoticons on Facebook
// @include      http://facebook.com/*
// @include      http://*.facebook.com/*
// @include      https://facebook.com/*
// @include      https://*.facebook.com/*
// @copyright    2013, Chin
// @run-at       document-end
// ==/UserScript==


function walk(node) {      
    var child, next;
    switch (node.nodeType)  {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
                handleText(node);
                break;
    }
}

var laughing     = "<span class='myemo laughing'></span>";
var crying       = "<span class='myemo crying'></span>";
var ohgoon       = "<span class='myemo ohgoon'></span>";
var rolling      = "<span class='myemo rolling'></span>";
var hehe         = "<span class='myemo hehe'></span>";
var angry        = "<span class='myemo angry'></span>";
var batting      = "<span class='myemo batting'></span>";
var blushing     = "<span class='myemo blushing'></span>";
var broken       = "<span class='myemo broken'></span>";
var devil        = "<span class='myemo devil'></span>";
var hug          = "<span class='myemo hug'></span>";
var love         = "<span class='myemo love'></span>";
var smug         = "<span class='myemo smug'></span>";
var whew         = "<span class='myemo whew'></span>";
var worried      = "<span class='myemo worried'></span>";
var bye          = "<span class='myemo bye'></span>";
var callme       = "<span class='myemo callme'></span>";
var clown        = "<span class='myemo clown'></span>";
var daydreaming  = "<span class='myemo daydreaming'></span>";
var donttell     = "<span class='myemo donttell'></span>";
var loser        = "<span class='myemo loser'></span>";
var nerd         = "<span class='myemo nerd'></span>";
var notalking    = "<span class='myemo notalking'></span>";
var phone        = "<span class='myemo phone'></span>";
var raised       = "<span class='myemo raised'></span>";
var sick         = "<span class='myemo sick'></span>";
var silly        = "<span class='myemo silly'></span>";
var sleepy       = "<span class='myemo sleepy'></span>";
var straight     = "<span class='myemo straight'></span>";
var talkhand     = "<span class='myemo talkhand'></span>";
var timeout      = "<span class='myemo timeout'></span>";
var witsend      = "<span class='myemo witsend'></span>";
var applause     = "<span class='myemo applause'></span>";
var beatup       = "<span class='myemo beatup'></span>";
var bringit      = "<span class='myemo bringit'></span>";
var dancing      = "<span class='myemo dancing'></span>";
var doh          = "<span class='myemo doh'></span>";
var dontknow     = "<span class='myemo dontknow'></span>";
var dontsee      = "<span class='myemo dontsee'></span>";
var drooling     = "<span class='myemo drooling'></span>";
var frustrated   = "<span class='myemo frustrated'></span>";
var hipno        = "<span class='myemo hipno'></span>";
var liar         = "<span class='myemo liar'></span>";
var money        = "<span class='myemo money'></span>";
var nail         = "<span class='myemo nail'></span>";
var notworthy    = "<span class='myemo notworthy'></span>";
var party        = "<span class='myemo party'></span>";
var peace        = "<span class='myemo peace'></span>";
var phbbt        = "<span class='myemo phbbt'></span>";
var praying      = "<span class='myemo praying'></span>";
var rockon       = "<span class='myemo rockon'></span>";
var shame        = "<span class='myemo shame'></span>";
var sigh         = "<span class='myemo sigh'></span>";
var thinking     = "<span class='myemo thinking'></span>";
var thumbdown    = "<span class='myemo thumbdown'></span>";
var thumbup      = "<span class='myemo thumbup'></span>";
var waiting      = "<span class='myemo waiting'></span>";
var whistling    = "<span class='myemo whistling'></span>";
var yawn         = "<span class='myemo yawn'></span>";

function handleText(textNode) {
    if (textNode.nodeValue.match(/:\)\)|:\(\(|:-j|=\)\)|;\)\)|x\(|;;\)|:">|=\(\(|>:\)|>:D<|:x|:>|#:-s|:-s|:-h|:-c|:O\)|8->|:-\$|L-\)|:-B|\[-\(|:\)\]|\/:\)|:-&|8-\}|I-\)|:\||=;|:-t|~X\(|=D>|b-\(|>:\/|\\:D\/|#-o|:-\?\?|X_X|=P~|:-L|@-\)|:\^o|\$-\)|:-ss|\^:\)\^|<:-P|:\)>-|>:P|\[-O<|\\m\/|\[-X|:-<|:-\?|:-q|:-bd|:-w|:-"|\(:\|/i)) {
        var parent = textNode.parentNode;
        textNode.nodeValue = textNode.nodeValue.replace(/:-ss/gi, nail);
        textNode.nodeValue = textNode.nodeValue.replace(/:-bd/gi, thumbup);
        textNode.nodeValue = textNode.nodeValue.replace(/\(:\|/gi, yawn);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\)/g, laughing);
        textNode.nodeValue = textNode.nodeValue.replace(/:\(\(/g, crying);
        textNode.nodeValue = textNode.nodeValue.replace(/:-j/g, ohgoon);
        textNode.nodeValue = textNode.nodeValue.replace(/=\)\)/g, rolling);
        textNode.nodeValue = textNode.nodeValue.replace(/;\)\)/g, hehe);
        textNode.nodeValue = textNode.nodeValue.replace(/~X\(/gi, witsend);
        textNode.nodeValue = textNode.nodeValue.replace(/x\(/gi, angry);
        textNode.nodeValue = textNode.nodeValue.replace(/;;\)/g, batting);
        textNode.nodeValue = textNode.nodeValue.replace(/:">/g, blushing);
        textNode.nodeValue = textNode.nodeValue.replace(/=\(\(/g, broken);
        textNode.nodeValue = textNode.nodeValue.replace(/>:\)/g, devil);
        textNode.nodeValue = textNode.nodeValue.replace(/>:D</gi, hug);
        textNode.nodeValue = textNode.nodeValue.replace(/:x/gi, love);
        textNode.nodeValue = textNode.nodeValue.replace(/:>/g, smug);
        textNode.nodeValue = textNode.nodeValue.replace(/#:-S/gi, whew);
        textNode.nodeValue = textNode.nodeValue.replace(/:-s/gi, worried);
        textNode.nodeValue = textNode.nodeValue.replace(/:-h/gi, bye);
        textNode.nodeValue = textNode.nodeValue.replace(/:-c/gi, callme);
        textNode.nodeValue = textNode.nodeValue.replace(/:O\)/gi, clown);
        textNode.nodeValue = textNode.nodeValue.replace(/8->/gi, daydreaming);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\$/gi, donttell);
        textNode.nodeValue = textNode.nodeValue.replace(/L-\)/gi, loser);
        textNode.nodeValue = textNode.nodeValue.replace(/:-B/gi, nerd);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-\(/gi, notalking);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)\]/gi, phone);
        textNode.nodeValue = textNode.nodeValue.replace(/\/:\)/gi, raised);
        textNode.nodeValue = textNode.nodeValue.replace(/:-&/gi, sick);
        textNode.nodeValue = textNode.nodeValue.replace(/8-\}/gi, silly);
        textNode.nodeValue = textNode.nodeValue.replace(/I-\)/gi, sleepy);
        textNode.nodeValue = textNode.nodeValue.replace(/:\|/gi, straight);
        textNode.nodeValue = textNode.nodeValue.replace(/=;/gi, talkhand);
        textNode.nodeValue = textNode.nodeValue.replace(/:-t/gi, timeout);
        textNode.nodeValue = textNode.nodeValue.replace(/=D>/gi, applause);
        textNode.nodeValue = textNode.nodeValue.replace(/b-\(/gi, beatup);
        textNode.nodeValue = textNode.nodeValue.replace(/>:\//gi, bringit);
        textNode.nodeValue = textNode.nodeValue.replace(/\\:D\//gi, dancing);
        textNode.nodeValue = textNode.nodeValue.replace(/#-o/gi, doh);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\?\?/gi, dontknow);
        textNode.nodeValue = textNode.nodeValue.replace(/X_X/gi, dontsee);
        textNode.nodeValue = textNode.nodeValue.replace(/=P~/gi, drooling);
        textNode.nodeValue = textNode.nodeValue.replace(/:-L/gi, frustrated);
        textNode.nodeValue = textNode.nodeValue.replace(/@-\)/gi, hipno);
        textNode.nodeValue = textNode.nodeValue.replace(/:\^o/gi, liar);
        textNode.nodeValue = textNode.nodeValue.replace(/\$-\)/gi, money);        
        textNode.nodeValue = textNode.nodeValue.replace(/\^:\)\^/gi, notworthy);
        textNode.nodeValue = textNode.nodeValue.replace(/<:-P/gi, party);
        textNode.nodeValue = textNode.nodeValue.replace(/:\)>-/gi, peace);
        textNode.nodeValue = textNode.nodeValue.replace(/>:P/gi, phbbt);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-O</gi, praying);
        textNode.nodeValue = textNode.nodeValue.replace(/\\m\//gi, rockon);
        textNode.nodeValue = textNode.nodeValue.replace(/\[-X/gi, shame);
        textNode.nodeValue = textNode.nodeValue.replace(/:-</gi, sigh);
        textNode.nodeValue = textNode.nodeValue.replace(/:-\?/gi, thinking);
        textNode.nodeValue = textNode.nodeValue.replace(/:-q/gi, thumbdown);        
        textNode.nodeValue = textNode.nodeValue.replace(/:-w/gi, waiting);
        textNode.nodeValue = textNode.nodeValue.replace(/:-"/gi, whistling);        

        var newSpan = document.createElement('span');
        newSpan.innerHTML = textNode.nodeValue;
        parent.replaceChild(newSpan, textNode);
    }
}

var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", "https://rawgithub.com/chinhodado/ym_emo_fb/master/emo_style.css");
document.getElementsByTagName("head")[0].appendChild(fileref);
               
walk(document.body);

// select the target node for mutation observation
var target = document.body;
 
// create an observer instance
var observer = new MutationObserver(function(mutations) { // mutations: an array of MutationRecord objects
    mutations.forEach(function(mutation) {
        var addedList = mutation.addedNodes;
        for (var i = 0; i < addedList.length; ++i) {
            var item = addedList[i];  // Calling myNodeList.item(i) isn't necessary in JavaScript
            walk(item);
        }
    });    
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true, subtree: true };
 
// pass in the target node, as well as the observer options
observer.observe(target, config);