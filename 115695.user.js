// ==UserScript==
// @name BlackheartedNightmareToolbar
// @version 6.66.2
// @description vw and mw buttons on the top for feed filters then go to personal fb pages and hover a bit to add clan gift or go to their stats pages with the click of a button
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// @exclude http://*.facebook.com/ai.php?*
// @exclude https://*.facebook.com/ai.php?*
// @exclude http://*.facebook.com/ajax/*
// @exclude https://*.facebook.com/ajax/*
// @exclude http://*.facebook.com/connect/*
// @exclude https://*.facebook.com/connect/*
// @exclude http://*.facebook.com/plugins/*
// @exclude https://*.facebook.com/plugins/*
// @license Creative Commons BY-UmbrellaCorp
// ==/UserScript==
//
// History
// 1.0 initial version 10.16.11 bethblackheart for blackheart industries under umbrella corp
// 6.66.2 variant version 12.24.11 bethblackheartnightmare for blackheart industries 
//
 
function getFBId() {
    var elem;
    if ((elem = document.getElementById("profile_action_report_block")) && (id = (/cid=(\d+)/).exec(elem.innerHTML)[1])) return id;
    if ((elem = document.getElementById("profile_pic")) && (id = (/(?:\d+)_(\d+)_(?:\d+)\_n\.jpg/).exec(elem.src)[1])) return id;
    return null;
}
 
function getTagByClass(tagName, className) {
    var n, nodes = document.getElementsByTagName(tagName);
    var l = nodes.length;
    for (var i = 0; n = nodes[i], i < l; i++) if (n.getAttribute("class") == className) return n;
    return null;
}
 
function createProfileBar() {
    var id, profHead;
    if ((!document.getElementById("extra_profilelinks_holder")) && (profHead = getTagByClass("div", "profileHeaderMain")) && (id = getFBId())) {
        var bar = document.createElement("div");
        bar.id = "extra_profilelinks_holder";
        bar.setAttribute("class", "rfloat");
        bar.setAttribute("style", "border: 0px; padding-top: 6px;");
 
        // profile page links
        var lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "GET ID# BIATCH";
        lnk.href = "";
        lnk.onclick = function() {
            var name = getTagByClass("span", "profileName fn ginormousProfileName fwb");
            prompt("Facebook ID", ((name) ? name.innerText : "N/A") + ": " + id);
            return false;
        }
        lnk.title = "Get FB ID Biatch";
        lnk.setAttribute("style", "padding:0 10px 0 0 !important; color:#0000AA; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "MWStats";
        lnk.href = prot + "//apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22" + id + "%22%7D";
        lnk.title = "Switch to MWStats";
        lnk.setAttribute("style", "padding:0 4px 0 0 !important; color:#000000; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "MWMakeTop";
        lnk.href = prot + "//apps.facebook.com/inthemafia/track.php?next_controller=group&next_action=view&next_params=%7B%22promote%22%3A%22yes%22%2C%22pid%22%3A%22" + id + "%22%7D";
        lnk.title = "Promote";
        lnk.setAttribute("style", "padding:0 8px 0 0 !important; color:#000000; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "ToMyVWCrypt";
        lnk.href = prot + "//apps.facebook.com/vampiresgame/stats.php?user=" + id;
        lnk.title = "Switch to VW crypt";
        lnk.setAttribute("style", "padding:0 4px 0 0 !important; color:#AA0000; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "GiftMeBaby";
        lnk.href = prot + "//facebook6.vampires.zynga.com/gift.php?user_id=" + id;
        lnk.title = "Send VW gift";
        lnk.setAttribute("style", "padding:0 4px 0 0 !important; color:#AA0000; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "ClanMeCunt";
        lnk.href = prot + "//facebook6.vampires.zynga.com/status_invite.php?from=" + id;
        lnk.title = "Add to clan";
        lnk.setAttribute("style", "padding:0 8px 0 0 !important; color:#AA0000; font-weight:normal; font-family: 'lucida grande ',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        profHead.insertBefore(bar, profHead.nextSibling);
    }
}
 
function createTopBar() {
    var navSearch;
    if ((!document.getElementById("extra_toplinks_holder")) && (navSearch = document.getElementById("headNav"))) {
        var bar = document.createElement("div");
        bar.id = "extra_toplinks_holder";
        bar.onmouseover = function() {
            createProfileBar();
        }
        bar.setAttribute("class", "lfloat");
        bar.setAttribute("style", "border: 0px; padding-top: 10px;");
 
        // navigation bar links
        var lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "Wannabes";
        lnk.href = prot + "//www.facebook.com/reqs.php";
        lnk.title = "Go to Facebook requests";
        lnk.setAttribute("style", "padding:0 0 0 6px !important; color:##F52887; font-weight:normal; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "MWFilter";
        lnk.href = prot + "//www.facebook.com/?sk=app_10979261223";
        lnk.title = "Show only Mafia Wars in newsfeed";
        lnk.setAttribute("style", "padding:0 0 0 12px !important; color:###7F38EC; font-weight:normal; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        lnk = bar.appendChild(document.createElement("a"));
        lnk.textContent = "VWFilter";
        lnk.href = prot + "//www.facebook.com/?sk=app_25287267406";
        lnk.title = "Show only Vampire Wars in newsfeed";
        lnk.setAttribute("style", "padding:0 0 0 6px !important; color:##50EBEC; font-weight:normal; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; font-size: 16px;");
 
        navSearch.insertBefore(bar, navSearch.nextSibling);
    }
}
 
var prot = document.location.protocol;
GM_log("BlackheartedNightmareToolbar starting @ " + document.URL);
createTopBar();
createProfileBar();