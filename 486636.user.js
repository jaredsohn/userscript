// ==UserScript==
// @name        ekşi sonra oku butonu
// @namespace   http://userscripts.org/users/gzktl
// @version     0.2.0
// @description	daha sonra okunmak istenen entryleri kaydeden araç.
// @author      pointer
// @license     no license
// @include     https://eksisozluk.com/*
// @match       https://eksisozluk.com/*
// @require     http://code.jquery.com/jquery-1.11.1.min.js
// @run-at      document-end
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

var g_readLaterList = new Array();
var g_lookupTable = {};
var g_gmApiSupported = false;


RLC_EKSISOZLUK_DOMAIN = "eksisozluk.com";
RLC_EKSISOZLUK_SINGLE_ENTRY_URL = "https://" + RLC_EKSISOZLUK_DOMAIN + "/entry/";

RLC_MENU_TEXT = "sonra okunacaklar";

RLC_PANEL_TITLE = "sonra okunacak entry listem";
RLC_PANEL_BUTTON_REMOVE_ALL = "listeyi sil";
RLC_PANEL_EMPTY_LIST_MESSAGE = "listen bomboş. merak etme elbet birgün burası da dolar ;)";


RLC_PANEL_NO_GMAPI_SUPPORT_HINT = "<b>uyarı</b>: kullandığınız userscipts betik yöneticisi, greasemonkey fonksiyonlarını " +
                                "desteklemiyor. bu sebepten listeniz ekşisözlük yerel depolama alanına yazılacak. " +
                                "bu demek oluyor ki listeniz tarayıcı ayarlarından site verilerini temizle demediğiniz müddetçe " +
                                "saklı kalacaklar. (not: merak etmeyin, ekşi sözlükten logout olmanız listenizin yok olmasına sebep olmaz)" +
                                "<br /><br />bundan etkilenmemek için tarayıcınıza greasemonkey fonksiyonlarını destekleyen bir betik " +
                                "yöneticisi kurun.<br /><br />";

RLC_LINK_READ_LATER_TEXT = "sonra okuyayım";
RLC_LINK_READ_DONE_TEXT = "tamam okudum";

RLC_STYLE_CONTENT =
"\x3c\x73\x74\x79\x6c\x65\x3e\x0d\x0a\x0d\x0a\x2e\x72\x65\x61" +
"\x64\x2d\x6c\x61\x74\x65\x72\x2d\x6c\x69\x6e\x6b\x0d\x0a\x7b" +
"\x20\x0d\x0a\x20\x20\x70\x61\x64\x64\x69\x6e\x67\x2d\x6c\x65" +
"\x66\x74\x3a\x20\x31\x31\x70\x78\x3b\x0d\x0a\x20\x7d\x20\x0d" +
"\x0a\x0d\x0a\x23\x72\x65\x61\x64\x4c\x61\x74\x65\x72\x4c\x69" +
"\x73\x74\x20\x0d\x0a\x7b\x0d\x0a\x20\x20\x70\x61\x64\x64\x69" +
"\x6e\x67\x2d\x6c\x65\x66\x74\x3a\x20\x33\x30\x70\x78\x3b\x0d" +
"\x0a\x7d\x0d\x0a\x0d\x0a\x2e\x72\x65\x61\x64\x2d\x6c\x61\x74" +
"\x65\x72\x2d\x6c\x69\x73\x74\x63\x6f\x75\x6e\x74\x20\x0d\x0a" +
"\x7b\x0d\x0a\x20\x20\x20\x70\x6f\x73\x69\x74\x69\x6f\x6e\x3a" +
"\x20\x61\x62\x73\x6f\x6c\x75\x74\x65\x3b\x0d\x0a\x20\x20\x20" +
"\x72\x69\x67\x68\x74\x3a\x20\x30\x3b\x0d\x0a\x20\x20\x20\x63" +
"\x6f\x6c\x6f\x72\x3a\x20\x23\x36\x36\x36\x3b\x0d\x0a\x20\x20" +
"\x20\x66\x6f\x6e\x74\x2d\x73\x69\x7a\x65\x3a\x20\x2e\x38\x35" +
"\x65\x6d\x3b\x0d\x0a\x20\x20\x20\x70\x61\x64\x64\x69\x6e\x67" +
"\x2d\x74\x6f\x70\x3a\x20\x34\x70\x78\x3b\x0d\x0a\x20\x20\x20" +
"\x70\x61\x64\x64\x69\x6e\x67\x2d\x72\x69\x67\x68\x74\x3a\x20" +
"\x31\x38\x70\x78\x3b\x0d\x0a\x7d\x0d\x0a\x0d\x0a\x3c\x2f\x73" +
"\x74\x79\x6c\x65\x3e\x0d\x0a";



//==HELPER FUNCTIONS==

function tracefn(f) {
    console.log(f + " called.");
}

function _loadv(key, defval) {
    var r = loadv(key);

    if (r == null) {
        return defval;
    }

    return r;
}

function loadv(key) {
    if (g_gmApiSupported) {
        return GM_getValue(key, null);
    }
    else {
        return localStorage.getItem(key);
    }

    return null;
}

function storv(key, val) {
    if (g_gmApiSupported) {
        GM_setValue(key, val);
    }
    else {
        localStorage.setItem(key, val);
    }
}

function remv(key) {
    if (g_gmApiSupported) {
        GM_deleteValue(key);
    }
    else {
        localStorage.removeItem(key);
    }
}

function elementExists(e) {
    return $("#" + e).length > 0;
}

function storeUserData() {
    if (g_readLaterList.length > 0) {
        storv("rlstor", JSON.stringify(g_readLaterList));
    }
}

function loadUserData() {
    var data = loadv("rlstor");

    if (data != null) {
        console.log(data);

        g_readLaterList = JSON.parse(data);

        console.log(g_readLaterList);

        //build entry lookup table.
        $.each(g_readLaterList, function (i, val) {
            g_lookupTable[val.id] = { item: val, listIndex: i };
        });

    }
}

function removeUserData() {
    remv("rlstor");
}

function buildEntryLinkHandler(entryId,user) {
    var inList = entryExists(entryId);

    var linkText = RLC_LINK_READ_LATER_TEXT;
    var op = "add";

    if (inList) {
        linkText = RLC_LINK_READ_DONE_TEXT;
        op = "remove";
    }

    return $("<a />", { id: "rle_" + entryId, entryid: entryId, suser: user, oper: op, text: linkText, class: "read-later-link" }).
            click(readLaterLinkHandler);

}


function buildMenuItemText() {
    var menuText = RLC_MENU_TEXT;
    
    if (g_readLaterList.length > 0) {
        //get outer html
        menuText += $("<p />").append(
            $("<small class=\"read-later-listcount\" />").text(g_readLaterList.length.toString())
            ).html();
    }

    return menuText;
}

function updateMenuReadListCounter() {
    $("#readLaterMenuItem").html(buildMenuItemText());
}

//==HANDLERS==
function removeAllEntries() {
    removeAll(true);
    updateMenuReadListCounter();
    loadPanel();
}

function readLaterLinkHandler() {
    var entryObj;
    var entryId = $(this).attr("entryid");
    var topicText = $("#topic > #title").attr("data-title");
    var user = $(this).attr("suser");

    var op = $(this).attr("oper");

    if (op == "add") {
        addEntry(entryId, topicText,user);
        $(this).attr("oper", "remove");
        $(this).text(RLC_LINK_READ_DONE_TEXT);
    }
    else if (op == "remove") {
        removeEntry(entryId);
        $(this).attr("oper", "add");
        $(this).text(RLC_LINK_READ_LATER_TEXT);
    }

    storeUserData();

    updateMenuReadListCounter();

}

function loadPanel() {
    var entryItem,topicLink;
    var entryObj;
    var entryDomList;

    //close the menu after click.
    $(".dropdown-menu.toggles-menu").attr("class", "dropdown-menu toggles-menu");

    $("#content-body").html("<h1>" + RLC_PANEL_TITLE + "</h1>");

    //notify user for not supported GM api issue.
    if (!g_gmApiSupported) {
        $("#content-body").append(RLC_PANEL_NO_GMAPI_SUPPORT_HINT);
    }

    if (g_readLaterList.length > 0) {

        //print list
        entryDomList = $("<ol id=\"readLaterList\" class=\"topic-list\"/>");

        for (var i = 0; i < g_readLaterList.length; i++) {
            entryObj = g_readLaterList[i];

            topicLink = $("<a />",
                {
                    href: RLC_EKSISOZLUK_SINGLE_ENTRY_URL + entryObj.id,
                    text: entryObj.baslik + "/@" + entryObj.suser
                });

            entryItem = $("<li />").append(topicLink);

            entryDomList.append(entryItem);
        }

        $("#content-body").append(entryDomList);

        $("#content-body").append($("<input />", { type: "button", class: "primary" }).
            click(removeAllEntries).val(RLC_PANEL_BUTTON_REMOVE_ALL));

    }
    else {
        $("#content-body").append(RLC_PANEL_EMPTY_LIST_MESSAGE);
    }

    $("title").text(RLC_PANEL_TITLE);

    //scroll window to top if necessary
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

//==SYS FUNCTIONS==


function injectCss() {
    $(RLC_STYLE_CONTENT).appendTo("head");
}

function injectEntryHandlers() {
    var currEntryId;
    var footerObj;
    var suser;

    if (elementExists("entry-list")) {
        //attach our handler to all entries in the page.
        $("#entry-list > li").each(function (index, val) {
            footerObj = $(this).find("footer");
            currEntryId = footerObj.attr("data-id");
            suser = $(this).find("span[itemprop='name']").text();

            buildEntryLinkHandler(currEntryId,suser).
                insertAfter(footerObj.find(".favorite-link.favicon"));

        });
    }
}

function injectMenu() {
    
    //inject our menu item before the logout item.
    var leaveMenu = $(".dropdown-menu.toggles-menu").find('li.separated');
    var readLaterMenu = $("<li />").append($("<a />", { id: "readLaterMenuItem" }).
        html(buildMenuItemText()).click(loadPanel));
		
    readLaterMenu.insertBefore(leaveMenu);

    //a little bit wider menu container for us.
    $(".dropdown-menu.toggles-menu").css("min-width", "180px"); 
}

function inject() {
    injectCss();
    injectMenu();
    injectEntryHandlers();
}

function removeAll(truncStor) {
    //clear lookup table
    for (var i = 0; i < g_readLaterList.length; i++) {
        delete g_lookupTable[g_readLaterList[i].id];
    }

    //clear read list
    while (g_readLaterList.length > 0) {
        g_readLaterList.shift();
    }

    //clear userdata if needed.
    if (truncStor) {
        removeUserData();
    }

}

function addEntry(entryId, topicText, user) {
    var entryObj = { baslik: topicText, suser : user, id: entryId };
    g_readLaterList.push(entryObj);
    g_lookupTable[entryObj.id] = { item: entryObj, listIndex: g_readLaterList.length - 1 };

    console.log("Current list count: " + g_readLaterList.length.toString());
    console.log(g_readLaterList);
}

function removeEntry(entryId) {
    //fast entry object lookup by id.
    var lo = lookupEntry(entryId);

    if (lo != null) {

        //adjust indexes of the remaining items.
        var entryObj = lo.item;

        for (var i = lo.listIndex + 1; i < g_readLaterList.length; i++) {
            lookupEntry(g_readLaterList[i].id).listIndex--;
        }

        //delete entry data from lookup table and list.
        g_readLaterList.splice(lo.listIndex, 1);
        delete g_lookupTable[lo.item.id];
    }
}

function lookupEntry(id) {
    var obj = g_lookupTable[id];

    if (obj == 'undefined') {
        return null;
    }

    return obj;
}

function entryExists(id) {
    return lookupEntry(id) != null;
}

function lookupEntryIndex(entryObject) {
    var obj;

    if (!entryObject) {
        return -1;
    }

    obj = lookupEntry(entryObject.id);

    if (obj == null) {
        return -1;
    }

    return obj.listIndex;
}


function init() {
    
    if (typeof (Storage) === "undefined" || typeof (Storeage) === void (0)) {
        alert("tarayıcında html5 yerel depolama nesnesini bulamadık. daha güncel bir tarayıcıya geçmen önerilir.");
        return;
    }

    //check userscript runtime for greasemonkey storage api support.
    if (typeof (GM_setValue) == 'function') {
        g_gmApiSupported = true;
    }
    else {
        console.log("Not supported GM API's");
    }

    loadUserData();
}

$(document).ready(function () {
    init();
    inject();
});
