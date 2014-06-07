/* 
    EDIT COLORS HERE
    Available colors: http://www.w3schools.com/cssref/css_colornames.asp
*/
var online = 'red';
var ingame = 'green';
var offline = 'grey';

// ==UserScript==
// @name            /r/SteamGameSwap flair links
// @author          ThisRandomRedditor
// @namespace       steamcommunity.com/id/slysteven
// @description     Turns the flair on /r/SteamGameSwap into links.
// @license         Commons, CC-BY-SA
// @version         1.3
// @include         http://reddit.com/r/SteamGameSwap/*
// @include         http://reddit.com/r/steamgameswap/*
// @include         http://www.reddit.com/r/SteamGameSwap/*
// @include         http://www.reddit.com/r/steamgameswap/*
// @match           http://www.reddit.com/r/SteamGameSwap/*
// @match           http://www.reddit.com/r/steamgameswap/*
// @released        2012-06-17
// @updated         2012-07-02
// @compatible      Greasemonkey, Chrome, Opera
// ==/UserScript==
//
// Provides:
//      Color-coded online status / link to Steam profile
//      Links to add / message in Steam
//      Links to Steam game inventory, backpack.tf listing, and SteamRep profile
//      Easy access to modify colors in the code
//
// Script forked from zedadex's /r/tf2trade flair links (http://userscripts.org/scripts/show/112566), with the following modifications:
//      Won't override SGS flair tiers
//      Better font color against SGS styling
//      Ignores hidden profiles, banned users
//      Added link to Steam game inventory, Steamrep, backpack.tf
//      Now uses backpack.tf instead of tf2b, for easier ballpack price estimates
//      Placed color variables up top to modify more easily

(function(){

/*
    The "ultimate" GetElementsByClassName implementation, developed by Robert Nyman. This is here for Opera support.
*/
var getElementsByClassName = function (className, tag, elm){
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
                returnElements = [],
                elements,
                node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
                current,
                returnElements = [],
                match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
};



/*
     Start of actual code
*/

var flairArray = document.getElementsByClassName('flair');
for(i=0;i<flairArray.length;i++)
{
    var steamURL = flairArray[i].innerHTML;

    if (steamURL == '' || steamURL.search("http://steamcommunity.com/profiles/") == -1) {continue;}; // Ignore banned user or hidden profile

    var steamID = steamURL.replace("http://steamcommunity.com/profiles/","")

    /* BETA - grab user status from steamcommunity.com */

    function updatePlayerStatus(steamID,i) {
        playerStatus = "Profile";
        GM_xmlhttpRequest({
            method: "GET",
            //synchronous: "TRUE",
            url: "http://steamcommunity.com/profiles/" + steamID,
            onload: function(response) {
                pageContents = response.responseText;
                pageContents = pageContents.substr(pageContents.search("OnlineStatus"),100);

                spanID = "player"+steamID+"_"+i;

                if (pageContents.search("currentlyPlaying")>0){playerStatus = "<span style='color:" + ingame + ";'>In-Game</span>";}
                if (pageContents.search("statusOnline")>0){playerStatus = "<span style='color:" + online + ";'>Online</span>";}
                if (pageContents.search("statusOffline")>0){playerStatus = "<span style='color:" + offline + ";'>Offline</span>";}

                document.getElementById(spanID).innerHTML=playerStatus;
            }
        });
        return playerStatus;
    }
    flairArray[i].innerHTML = " <a href='" + steamURL + "'><span id='player"+steamID+"_"+i+"'>" + "Profile" + "</span></a> [<a title='Add (must have steam running)' href='steam://friends/add/" + steamID + "'>+</a>,<a title='Message (must have steam running)' href='steam://friends/message/" + steamID + "'>m</a>], <a href='" + steamURL + "/inventory#753'>Inv</a>, <a href='http://backpack.tf/id/" + steamID + "'>TF2</a>, <a href='http://steamrep.com/search?q=" + steamID + "'>Rep</a>";
    updatePlayerStatus(steamID,i);
}

})();