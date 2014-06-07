// ==UserScript==
// @name           Netflix Keyboard Shortcuts
// @namespace      http://userscripts.org/users/109864
// @description    Adds keyboard shortcuts to the Netflix web site
// @match          *://*.netflix.com/*
// @version        1.10.2012.418
// ==/UserScript==

var elemsListContainers;
var currListContainer = -1;
var elemsNPList;
var currListItem = -1;

function getElementsByClassName(className, parentNode)
{
    var elements = [];
    var parent = parentNode;
    if (parentNode == undefined) {
        parent = document.body;
    }
    if (parent.getElementsByClassName != undefined) {
        return parent.getElementsByClassName(className);
    }

    if (parent.getElementsByTagName == undefined) {
        return elements;
    }
    var children = parent.getElementsByTagName('*');
    for (var i = 0; i < children.length; i ++) {
        var child = children[i];
        if (child.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) {
            elements[elements.length] = child;
        }
    }
    return elements;
}

function SimulateEvent(elem, event)
{
    if(document.createEvent && elem) {
        var e = document.createEvent("MouseEvents");
        e.initEvent(event, true, true);
        elem.dispatchEvent(e);
    }
}

function SimulateClick(elem)
{
    if (elem) {
        SimulateEvent(elem, "mouseover");
        SimulateEvent(elem, "click");
    }
}

function ListHasItems(list)
{
    if (list) {
        if (list.length > 0) {
            return true;
        }
    }
    return false;
}

function RateMovie(rating)
{
    switch (rating) {
    case "`":
        rating = "clear";
        break;
    case "0":
        rating = "norec";
        break;
    default:
        break;
    }

    var elemRatingContainer;
    if (elemsNPList) {
        elemRatingContainer = elemsNPList[currListItem];
    }
    if (!elemRatingContainer) {
        elemRatingContainer = document.getElementById("mdp-boxshot");
    }
    if (!elemRatingContainer) {
        elemRatingContainer = document.getElementById("sdp-action-area");
    }
    if (elemRatingContainer) {
        var elemRating = getElementsByClassName("rv" + rating, elemRatingContainer);
        if (elemRating && (elemRating.length > 0)) {
            SimulateClick(elemRating[0]);
        }
    }
}

function WatchOrQueueMovie(action)
{
    var actionRegEx;
    switch (action) {
    case " ":
        actionRegEx = /Play/;
        break;
    case "*":
    case "Shift+*":
        actionRegEx = /to Instant/;
        break;
    case "+":
    case "Shift++":
        actionRegEx = /Add to DVD Queue|Add Season|^Add$|Save|Add All/;
        break;
    default:
        return;
    }
    
    var elemActionContainer;
    if (elemsNPList) {
        elemActionContainer = elemsNPList[currListItem];
    }
    if (!elemActionContainer) {
        elemActionContainer = document.getElementById("mdp-actions");
    }
    if (!elemActionContainer) {
        if (action.substr(-1) == "+") {
            elemActionContainer = document.getElementById("seasonMetaData");
        }else{
            elemActionContainer = document.getElementById("sdp-actions");
        }
    }
    if (elemActionContainer) {
        var elemActionList = getElementsByClassName("btn", elemActionContainer);
        for (var i = 0; i < elemActionList.length; i++) {
            var child = elemActionList[i];
            if (child.getElementsByTagName("span")[0].innerHTML.match(actionRegEx)) {
                SimulateClick(child);
                return;
            }
        }
    }

}

function NextPreviousListPage(direction)
{
    var strBtnClass;
    switch (direction) {
    case 1:
        strBtnClass = "next";
        break;
    case -1:
        strBtnClass = "prev";
        break;
    default:
        return;
        break;
    }
    SimulateClick(getElementsByClassName(strBtnClass)[0]);
}

function NextPreviousListContainer(direction)
{
    if (!ListHasItems(elemsListContainers)) {
        NextPreviousListPage(direction);
        return;
    }
    
    currListContainer += direction;
    if (currListContainer < 0) {
        currListContainer = 0;
    } else if (currListContainer > elemsListContainers.length - 1) {
        currListContainer = elemsListContainers.length - 1;
    } else {
        NextPreviousListItem(0);
        currElem = elemsListContainers[currListContainer];
        currElem.scrollIntoView(true);
        elemsNPList = getElementsByClassName("agMovie", currElem);
        currListItem = -1;
        NextPreviousListItem(1);
    }

}

function NextPreviousListItem(direction)
{
    if (!ListHasItems(elemsNPList)) {
        return;
    }
    
    var currElem = elemsNPList[currListItem];
    var lastIndex = elemsNPList.length - 1;
    try {
        currElem.style.backgroundColor = "";
    } catch(err) {
        //ignore error
    }
    if (direction == 0) {
        return;
    }
    currListItem += direction;
    if (currListItem < 0) {
        currListItem = 0;
        NextPreviousListPage(-1);
    } else if (currListItem > lastIndex) {
        currListItem = lastIndex;
        NextPreviousListPage(1);
    } else {
        currElem = elemsNPList[currListItem];
        SimulateEvent(currElem, "mouseover");
        currElem.scrollIntoView(true);
    }
    currElem.style.backgroundColor = "LightCyan";
    var elemsLinks = currElem.getElementsByTagName("a");
    if (elemsLinks.length == 0) {
        switch (currListItem) {
        case 0:
            NextPreviousListItem(1);
            break;
        case lastIndex:
            NextPreviousListItem(-1);
            break;
        default:
            NextPreviousListItem(direction);
            break;
        }
        //NextPreviousListItem(-direction);
    }
}

function OpenCurrentLink()
{
    if (!ListHasItems(elemsNPList)) {
        return;
    }
    
    var elemsLinks = elemsNPList[currListItem].getElementsByTagName("a");
    if (elemsLinks.length > 0) {
        for (var i = 0; i < elemsLinks.length; i++) {
        var link = elemsLinks[i];
            if (link.href.match(/netflix\.com\/(Wi)?(Movie|RoleDisplay)/)) {
                window.location = link.href;
                break;
            }
        }
    }

}

function handleKeyPress(e)
{
    if (e.target.nodeName.match(/^(textarea|input)$/i)) {
        return;
    }
    var override = true;
    var keyCombo = String.fromCharCode(e.charCode||e.which).toLowerCase();
    if (e.altKey) { 
        keyCombo = "Alt+" + keyCombo;
    }
    if (e.ctrlKey) { 
        keyCombo = "Ctrl+" + keyCombo;
    }
    if (e.shiftKey) { 
        keyCombo = "Shift+" + keyCombo;
    }
    
    switch(keyCombo) {
    case " ":
    case "*":
    case "+":
    case "Shift+*":
    case "Shift++":
        WatchOrQueueMovie(keyCombo);
        break;
    case "`":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
        RateMovie(keyCombo);
        break;
    case "/":
        var elem = document.getElementById("searchField");
        elem.focus();
        elem.select();
        break;
    case "?":
        window.location = "https://www2.netflix.com/Help";
        break;
    case "a":
        window.location = "http://www.netflix.com/ReturnedRentals";
        break;
    case "Shift+a":
        window.location = "http://account.netflix.com/WiViewingActivity?lnkctr=RRIQ";
        break;
    case "b":
        window.location = "http://movies.netflix.com/MemberHome";
        break;
    case "d":
        window.location = "https://www2.netflix.com/DVDDistribution";
        break;
    case "i":
        window.location = "http://movies.netflix.com/WiHome";
        break;
    case "k":
        window.location = "http://movies.netflix.com/Kids";
        break;
    case "n":
        NextPreviousListItem(1);
        break;
    case "Shift+n":
        NextPreviousListContainer(1);
        break;
    case "o":
        OpenCurrentLink();
        break;
    case "p":
        NextPreviousListItem(-1);
        break;
    case "Shift+p":
        NextPreviousListContainer(-1);
        break;
    case "q":
        window.location = "http://movies.netflix.com/Queue";
        break;
    case "Shift+q":
        window.location = "http://movies.netflix.com/Queue?qtype=ED";
        break;
    case "s":
        window.location = "http://movies.netflix.com/RecommendationsHome";
        break;
    case "y":
        window.location = "https://www2.netflix.com/YourAccount";
        break;
    default:
        return;
    }
    if (override) {
        e.preventDefault();
    }
}

var currURL = document.URL;
if (currURL.match(/netflix\.com\/(WiSearch|Search)/)) {
    elemsNPList = getElementsByClassName("mresultWrap");
} else if (currURL.match(/netflix\.com\/RoleDisplay/)) {
    elemsNPList = getElementsByClassName("agMovie", document.getElementById("yui-main"));
} else if (currURL.match(/netflix\.com\/(ReturnedRentals|RentalActivity)/)) {
    elemsNPList = document.getElementById("rhtable").getElementsByTagName("tr");
} else if (currURL.match(/netflix\.com\/Top100/)) {
    elemsNPList = document.getElementById("topmovers").getElementsByTagName("tr");
} else if (currURL.match(/netflix\.com\/WiViewingActivity/)) {
    elemsNPList = document.getElementById("rental-history").getElementsByTagName("tr");
} else if (currURL.match(/^(?=.*?netflix\.com\/(MemberHome|Genre|RecommendationsHome|NewReleases))((?!\?vt=|&vt=).)*$/)) {
    elemsListContainers = getElementsByClassName("mrow", document.getElementById("yui-main"));
    //window.location = currURL + "&vt=tg";
} else if (currURL.match(/netflix\.com\/((Sub)?Genre|Recs|Critic)/)) {
    elemsNPList = getElementsByClassName("agMovie", document.getElementById("yui-main"));
}

if (elemsNPList) {
    NextPreviousListItem(1);
}
if (elemsListContainers) {
    NextPreviousListContainer(1);
}

document.addEventListener('keypress', handleKeyPress, false);