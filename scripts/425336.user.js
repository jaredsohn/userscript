// ==UserScript==
// @name       WoW AH - Undermine Journal Prices
// @namespace  http://userscripts.org/users/73286
// @version    0.9.4
// @description  Adds prices from TUJ to the WoW web AH
// @match      https://*.battle.net/wow/*/vault/character/auction/*/browse*
// @match      https://*.battle.net/wow/*/vault/character/auction/*/create*
// @copyright  2014+, Atlanis
// ==/UserScript==

function insertBrowseTUJSpans(el) {
    var split=el.parentNode.href.split('/');
    el.parentNode.insertAdjacentHTML("afterend","<span class='TUJ' rel='"+split[split.length-1]+"'></span>");
    return el;
}

function insertCreateTUJSpans(el) {
    var id=el.dataset.id;
    el.insertAdjacentHTML("afterend","<span class='TUJ' rel='"+id+"'></span>");
    return el;
}

var original_AuctionCreate_chooseItem = AuctionCreate.chooseItem;
AuctionCreate.chooseItem = function(target) {
    var TUJNode = target.querySelector('.TUJ').cloneNode(true); 
    original_AuctionCreate_chooseItem.apply(AuctionCreate, arguments);
    var oldNode = document.querySelector('#item-info>.TUJ');
    if(oldNode) oldNode.remove();
    document.querySelector('#item-info>#item-name').insertAdjacentElement('afterend', TUJNode);
};

[].slice.call(document.querySelectorAll('td.item>a>strong')).map(insertBrowseTUJSpans);
[].slice.call(document.querySelectorAll('td.name>a')).map(insertCreateTUJSpans);

// the below is from http://cdn.tuj.me/tuj.js
// it has one modification that makes it work with https://....

TheUndermineJournal = {
    gsc: function(m,g,s,c,os,st) {
        var tr = '';
        if (g != '') {
            if (parseInt(g) >= 1000) s = '';
            if (parseInt(g) >= 1) c = '';
            tr += ''+g+'g';
        }
        if (s != '') tr += ((tr=='')?'':' ')+s+'s'; 
        if (c != '') tr += ((tr=='')?'':' ')+c+'c';
        return tr;
    },
    parsedata: function(o) {
        var s, re=/(\d*?)(\d{0,2}?)(\d{1,2})$/;
        var spans, x;
        if (document.getElementsByClassName) {
            spans = document.getElementsByClassName('TUJ');
        } else {
            spans = new Array();
            var spantags = document.getElementsByTagName('span');
            for (x = 0; x < spantags.length; x++) 
                if (/\bTUJ\b/.test(spantags[x].className))
                    spans.push(spantags[x]);
                }
        var iid;
        for (x = 0; x < spans.length; x++) {
            s = spans[x];
            if (s.getAttribute('rel') && (!s.rel)) s.rel = s.getAttribute('rel');
            if (!s.rel) continue;
            s.rel = s.rel.toLowerCase().replace(/^\s+|\s+$/g,"");
            iid = (isNaN(s.rel) && (o.byname) && (o.byname[s.rel]))?o.byname[s.rel]:s.rel; 
            if ((!isNaN(iid)) && o[iid]) {
                s.style.marginLeft = '0.25ex';
                s.style.marginRight = '0.25ex';
                s.innerHTML = '<a href="https://theunderminejournal.com/item.php?item='+iid+'">'+o[iid].toString().replace(re,TheUndermineJournal.gsc)+'</a>';
            }
        }
    },
    startup: function(){
        var s=document.createElement('script');
        s.src='https://cdn.tuj.me/tujprices.js'; // modified here: changed http:// to https://
        if(s.addEventListener){s.addEventListener('error',function(evt){if(evt)evt.stopPropagation();},false);}
        document.getElementsByTagName('head')[0].appendChild(s);
    },
    stickevent: function(o,ev,ptr){if(o.addEventListener)o.addEventListener(ev,ptr,false);else if(o.attachEvent)o.attachEvent('on'+ev,ptr);}
}
TheUndermineJournal.stickevent(window,'load',TheUndermineJournal.startup);