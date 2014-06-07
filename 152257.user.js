// ==UserScript==
// @name           Auction helper for mtg.sk
// @namespace      seko.eea.sk
// @description    Adds references to various price lists from auction record at mtg.sk
// @include        http://www.mtg.sk/auction/*
// @version        1.3
// ==/UserScript==

// version history
// 1.0 - initial revision
// 1.1 - added magiccardmarket.eu
// 1.2 - added starcitygames.com and trollandtoad.com
// 1.3 - links organized as list of structured, and visualised as (popup) kontext menu

// supported price lists
var LINKS = [
    {
    name: 'Aktu\341lne pred\341van\351 na mtg.sk',
    url: 'http://www.mtg.sk/auction/?type=1&display_type=0&auction_type=2&vName=${CARD}',
    color: '#ffff22'},
    {
    name: 'Star\351, predan\351 z mtg.sk',
    url: 'http://www.mtg.sk/auction/?type=10&display_type=0&auction_type=2&vName=${CARD}',
    color: '#888811'},
    {
    name: 'Star\351, nepredan\351 z mtg.sk',
    url: 'http://www.mtg.sk/auction/?type=11&display_type=0&auction_type=2&vName=${CARD}',
    color: '#444400'},
    {
    name: 'CernyRytir.cz',
    url: 'http://www.cernyrytir.cz/index.php3?akce=3&submit=Vyhledej&${FOIL}&jmenokarty=${CARD}',
    foil0: 'foil=R',
    foil1: 'foil=F',
    color: '#6D6D5E'},
    {
    name: 'ModraVevericka.sk',
    url: 'http://www.modravevericka.sk/x-cards.html?cmdsearch=Vyh%C4%BEadaj&${FOIL}&filter_name=${CARD}',
    foil0: 'filter_foil=0',
    foil1: 'filter_foil=1',
    color: '#4444ff'},
    {
    name: 'M:TG Card Price History',
    url: 'http://ark42.com/mtg/pricehistory.php?d=1000&${FOIL}&q=${CARD}',
    foil0: 'f=0',
    foil1: 'f=1',
    color: '#44ff44'},
    {
    name: 'TCGPlayer.com',
    url: 'http://magic.tcgplayer.com/db/magic_single_card.asp?cn=${CARD}',
    color: '#ff4444'},
    {
    name: 'MagicMarket.eu',
    url: 'https://www.magiccardmarket.eu/?mainPage=advancedSearch&cardName=${CARD}',
    color: '#ffffff'},
    {
    name: 'StarCityGames.com',
    url:'http://sales.starcitygames.com//spoiler/display.php?namematch=EXACT&display=3&numpage=100&showart=1&action=Show+Results&${FOIL}&name=${CARD}',
    foil0: 'foil=nofoil',
    foil1: 'foil=foil',
    color: '#ee9a49'},
    {
    name: 'TrollAndToad.com',
    url: 'http://trollandtoad.com/products/search.php?searchmode=basic&search_category=7085&Image1.x=13&Image1.y=10&search_words=${CARD}',
    color: '#008b45'},
    {
    name: 'ChannelFireball.com',
    url: 'http://store.channelfireball.com/advanced_search?search[fuzzy_search]=${CARD}&search[in_stock]=0&${FOIL}&commit=Search',
    foil0:'search[with_descriptor_values][256][]=Regular',
    foil1:'search[with_descriptor_values][256][]=Foil',
    color: '#aabbcc'}
];

// prevent event propagation (click should not propagate to parent elements)
function stopEvent(e) {
    if (!e) var e = window.event;
    //e.cancelBubble is supported by IE - this will kill the bubbling process.
    e.cancelBubble = true;
    e.returnValue = false;
    //e.stopPropagation works only in Firefox.
    if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
    }
    return false;
}

// opens popup window for url set in the element
function openPopup(e) {
    var url = this.href;
    var opts = "menubar=0,location=0,scrollbars=1,directories=0,status=0,toolbar=0,resizable=1,width=1024,height=650";
    var win = window.open(url, "Price." + url, opts);
    win.focus();
    return stopEvent(e);
}

// find elements to enhance (i.e. table rows with card name)
function getRecordElements() {
  return document.evaluate("//td[@class='auction_card_name']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}  

// creates one link to specified page for current card (url)
function makeLink(lnk, cardName, foil) {
    // use regular card link by default
    var url = lnk.url.replace('${CARD}', encodeURIComponent(cardName));
    // use foil link if needed and available
    if (!foil && lnk.foil1) {
        url = url.replace('${FOIL}', lnk.foil0);
    } else if (foil && lnk.foil1) {
        url = url.replace('${FOIL}', lnk.foil1);
    }
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('title', lnk.name);
    a.addEventListener("click", openPopup, false);
    a.setAttribute('style', 'color:' + lnk.color);
    a.appendChild(document.createTextNode('$ ' + lnk.name));
    return a;
}

// creates one link to specified page for current card (url)
function addPopupMenu(record, cardName, foil) {
    var div2 = document.createElement('div');
    div2.setAttribute('id', 'mtgtooltip');
    var head = document.createElement('span');
    var foilString = foil ? ' <small style="color:gray">(foil)</small>' : '';
    head.innerHTML = '<b><i>' + cardName + foilString + ':</i></b><br/><hr/>';
    div2.appendChild(head);
    for (index in LINKS) {
        if (index > 0) {
            div2.appendChild(document.createElement('br'));
        }
        div2.appendChild(makeLink(LINKS[index], cardName, foil));
    }
    var div1 = document.createElement('span');
    div1.setAttribute('id', 'mtgbigdiv');
    div1.setAttribute('style', 'color:red');
    div1.appendChild(document.createTextNode('($) '));
    div1.appendChild(div2);
    div1.addEventListener("click", stopEvent, false);
    record.insertBefore(div1, record.firstChild);
    GM_addStyle("#mtgtooltip{display:none;}\
        #mtgbigdiv:hover #mtgtooltip{\
            display:inline;\
            border: thin solid;\
            position:absolute;top:auto;left:auto;\
            z-index:100;\
            opacity:100;\
            background:#000000;\
            padding:8px;\
            cursor:default;\
        }\
        a:link {text-decoration:none !important;}\
        a:visited {text-decoration:none !important;}\
        a:hover {text-decoration:underline !important;}\
        a:active {text-decoration:underline !important;}\
        ");
}

// fix for some special chars / substrings / tags etc
function transl(str) {
    return str.replace(/\xb4/g, "'").replace(/foil/i,'').replace(/^\s+|\s+$/g, '');
}

// add all supported links for specified record (i.e. table row)
function addLinksToRecord(record) {
    var cardName = record.getElementsByTagName('a')[0].textContent;
    var foil = cardName.match(/foil/i) || record.nextSibling.textContent.match(/foil/i);
    addPopupMenu(record, transl(cardName), foil);
}

// find all auction elements and add links to price lists
recordElements = getRecordElements();
if (recordElements) {
    var records = [];
    while (record = recordElements.iterateNext()) {
        records.push(record);
    }
    for (r in records) {
        addLinksToRecord(records[r]);
    }
}    
