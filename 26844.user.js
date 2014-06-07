// eBay UK SellerBrowser
// version 0.1
// 2008-05-19
// Copyright (c) 2008, HitMeWithIt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay UK SellerBrowser
// @namespace     http://www.mp33pm.co.uk
// @description   The BEST way of investigating an eBayer! Check them out before buying!
// @description   This is an adaptation of the GM script that was an adaptation of The SellerBrowser.
// @description   We needed a working version of this for UK users!
// @description   The original script see here: http://userscripts.org/scripts/show/8506
// @description    - only worked for Germany and USA eBay sites.
// @description   Well now we have one for eBay.co.uk after much deleting and pasting!
// @description   I will post details for use soon but you can get the idea from the link for the version I modded:
// @description   http://userscripts.org/scripts/show/8506
//
// @include       http://*.ebay.co.uk/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

var urls, desc, tld, back, mcap1, mcap2, mcap3, capClose, capConfirm,
    capSelect, capEnter, capLinks, capSave, capMember, capCopy, userID;

tld = document.domain.split("ebay.")[1]
switch (tld) {
    case "com":
        mcap1 = "SB Browse Member";
        mcap2 = "SB Get Links";
        mcap3 = "SB Switch View";
        break;
    default:
        mcap1 = "SB Browse Member";
        mcap2 = "SB Get Links";
        mcap3 = "SB Switch View";
        break;
}
GM_registerMenuCommand(mcap1, sellerBrowser);
GM_registerMenuCommand(mcap2, sellerBrowserLinks);
GM_registerMenuCommand(mcap3, sellerBrowserToggle);

function initSB() {

const URLSUS = new Array(
'http://feedback.ebay.co.uk/ws/eBayISAPI.dll?ViewFeedback2&items=200&interval=0&userid=',
'http://cgi6.ebay.co.uk/ws/eBayISAPI.dll?ViewListedItems&since=31&rdir=0&rows=200&page=1&sort=3&userid=',
'http://cgi6.ebay.co.uk/ws/eBayISAPI.dll?ViewListedItems&since=-1&rdir=0&rows=200&userid=',
'http://forums.ebay.co.uk/search.jspa?dateRange=last90days&numResults=30&q=&userID=',
'http://forums.ebay.co.uk/search.jspa?dateRange=all&numResults=30&userID=&q=',
'http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=',
'http://feedback.ebay.co.uk/ws/eBayISAPI.dll?ViewFeedback2&items=200&interval=365&which=negative&userid=',
'http://feedback.ebay.co.uk/ws/eBayISAPI.dll?ViewFeedback2&items=200&interval=365&which=neutral&userid=',
'http://cgi6.ebay.co.uk/ws/eBayISAPI.dll?ViewBidItems&completed=1&all=1&rows=200&sort=3&userid=',
'http://www.google.co.uk/search?hl=en&num=100&safe=off&q=',
'http://search-completed.ebay.co.uk/_W0QQsassZ',
'http://www.goofbay.com/ebay_seller_history_tool.html?gsl_days=120&gsl_include=both&gsl_show_fees=on&gsl_show_buyers=on&gsl_submit=&gsl_username=',
'http://www.goofbay.com/ebay_bid_history_tool.html?gbl_days=120&gbl_show_sellers=on&gbl_submit=&gbl_username=',
'http://search.ebay.co.uk/ws/search/MemberSearchResult?MfcISAPICommand=MemberSearchResult&userid=',
'http://contact.ebay.co.uk/ws/eBayISAPI.dll?ReturnUserIdHistory&requested=',
'http://myworld.ebay.co.uk/'
);

const DESCUS = new Array(
'Feedback',
'Items last 31 days',
'Current items',
'Postings discussion boards',
'Postings discussion boards containing name',
'toolhaus.org',
'Negative feedback last 12 months',
'Neutral feedback last 12 months',
'Recent auctions bid on',
'Google',
'Items last 14 days',
'goofbay Seller History',
'goofbay Bid History',
'Member search',
'Member User ID History',
'My World page'
);

switch (tld) {
    case "com":
        urls = URLSUS;
        desc = DESCUS;
        capClose = "Close";
        capConfirm = "Confirm";
        capSelect = "Select member name:";
        capEnter = "Enter member name";
        capLinks = "Select links";
        capSave = "Save selection";
        capMember = "eBay member";
        capCopy = "Copy text";
        break;
    default:
        urls = URLSUS;
        desc = DESCUS;
        capClose = "Close";
        capConfirm = "Confirm";
        capSelect = "Select member name:";
        capEnter = "Enter member name";
        capLinks = "Select links";
        capSave = "Save selection";
        capMember = "eBay member";
        capCopy = "Copy text";
        break;
}

}

function sellerBrowserSelect(mode) {
    var links = document.links;
    var res;
    var list = new Object();
    for (var i = 0; i < links.length; i++) {
        res = links[i].href.match(/(\?|&)userid=([^&]+)(&|$)/i);
        if (res) {
            list[res[2]] = "";
        }
        res = links[i].href.match(/http:\/\/myworld\.ebay\.(\w+)\/([^\/]+)(\/|$)/i);
        if (res) {
            list[res[2]] = "";
        }
        res = links[i].href.match(/http:\/\/members\.ebay\.(\w+)\/aboutme\/(\S+)$/i);
        if (res) {
            list[res[2]] = "";
        }
        res = links[i].href.match(/(\?|&)requested=([^&]+)(&|$)/i);
        if (res) {
            list[res[2]] = "";
        }
        res = links[i].href.match(/(\?|&)bidder_id=([^&]+)(&|$)/i);
        if (res) {
            list[res[2]] = "";
        }
        res = links[i].href.match(/http:\/\/blogs\.ebay\.(\w+)\/([^\/]+)(\/.+|$)/i);
        if (res) {
            list[res[2]] = "";
        }
    }
    if (!urls) {
        initSB();
    }
    var frame, content, node;
    frame = document.getElementById("esbframe");
    if (!frame) {
        frame = document.createElement("div");
        frame.setAttribute("style", "background-color: white; " +
            "position: absolute; top: 0px; left: 0px; width: 100%; " +
            "font-family: Arial,Helvetica,sans-serif;");
        frame.setAttribute("id", "esbframe");
        document.body.appendChild(frame);
    }
    content = '<div style="padding: 10px; background-color: #efefff; ' +
        'width: 95%; margin-left: auto; margin-right: auto; ' +
        'margin-top: 10px; margin-bottom: 10px; ' +
        'border: 1px solid rgb(204, 204, 255); font-size: small;">';
    content += '<input type="button" value="' + capClose +
        '" id="esbclose" style="font-size: x-small; color: white; ' +
        'border: none; background-color: #0040b2; padding: 1px; ' + 
        'margin: 1px; float: right;" />\n';
    content += '<center style="clear: right"><h1 style="font-weight: ' +
        'bold; font-size: large;">SellerBrowser</h1></center>';
    content += '<hr style="background-color: #ffffff; border: 1px solid ' +
        '#ffffff; height:2px;">\n';
    content += '<h2 style="font-weight: bold; font-size: medium;">' +
        capSelect + '</h2>\n';
    content += '<select id="esbseli1" style="margin-right: 10px;">';
    for (var UID in list) {
        content += '<option>' + UID + '</option>';
    }
    content += '</select>';
    content += '<input type="button" style="color: white; border: none; ' +
        'background-color: #0040b2; padding: 5px; font-size: x-small; ' +
        'cursor: pointer;" value="' + capConfirm + '" id="esbselb1">\n';
    content += '<hr style="background-color: #ffffff; border: 1px solid ' +
        '#ffffff; height:2px;">\n';
    content += '<h2 style="font-weight: bold; font-size: medium">' +
        capEnter + '</h2>\n';
    content += '<input type="text" id="esbseli2" style="margin-right: 10px;">';
    content += '<input type="button" style="color: white; border: none; ' +
        'background-color: #0040b2; padding: 5px; font-size: x-small; ' +
        'cursor: pointer;" value="' + capConfirm + '" id="esbselb2">\n';
    content += '</div>';
    frame.innerHTML = content;
    node = document.getElementById("esbclose");
    node.addEventListener('click',
        function(event) {
            close(event);
        }, true);
    node = document.getElementById("esbselb1");
    node.addEventListener('click',
        function(event) {
            var ID = event.target.id.slice(event.target.id.length - 1,
                event.target.id.length);
            selectMember(ID, mode);
        }, true);
    node = document.getElementById("esbselb2");
    node.addEventListener('click',
        function(event) {
            var ID = event.target.id.slice(event.target.id.length - 1,
                event.target.id.length);
            selectMember(ID, mode);
        }, true);
    var hash = document.location.hash;
    if (hash.length > 0 && hash != "#esbframe") {
        back = hash;
    }
    document.location.hash = "#esbframe";
}

function sellerBrowser() {
    reset();
    var frame, iframe, content, node, viewFrames;
    viewFrames = getViewFrames();
    if (!urls) {
        initSB();
    }
    if(!userID) {
        getSelection(window);
    }
    if(!userID) {
        sellerBrowserSelect(true);
        return;
    }
    if(userID) {
        if (!viewFrames) {
            for (var i = 0; i < urls.length; i++) {
                GM_openInTab(urls[i] + userID);
            }
            close(null);
            return;
        }
        frame = document.getElementById("esbframe");
        if (!frame) {
            frame = document.createElement("div");
            frame.setAttribute("style", "background-color: white; " +
                "position: absolute; top: 0px; left: 0px; width: 100%; " +
                "font-family: Arial,Helvetica,sans-serif;");
            frame.setAttribute("id", "esbframe");
            document.body.appendChild(frame);
        }
        content = '<div style="padding: 10px; background-color: #efefff; ' +
            'width: 95%; margin-left: auto; margin-right: auto; ' +
            'margin-top: 10px; margin-bottom: 10px; ' +
            'border: 1px solid rgb(204, 204, 255); font-size: small;">';
        content += '<input type="button" value="' + capClose +
            '" id="esbclose" style="font-size: x-small; color: white; ' +
            'border: none; background-color: #0040b2; padding: 1px; ' + 
            'margin: 1px; float: right; cursor: pointer;" />\n';
        content += '<center style="clear: right"><h1 style="font-weight: ' +
            'bold; font-size: large;">SellerBrowser</h1></center>';
        content += '<hr style="background-color: #ffffff; border: 1px solid ' +
            '#ffffff; height:2px;"><br />\n<center>';
        for (var i = 0; i < urls.length; i++) {
            content += '<input style="font-size: x-small; color: white; ' +
                'border: none; background-color: #0040b2; padding: 1px; ' +
                'margin: 1px; cursor: pointer;" type="button" value="' +
                desc[i] + '" id="esbb' + i + '" />\n';
        }
        content += '</center><br />\n';
        for (var i = 0; i < urls.length; i++) {
            content += '<div style="display: none;" id="esbd' + i + '">' +
                '</div>\n';
        }
        content += '</div>\n';
        frame.innerHTML = content;
        for (var i = 0; i < urls.length; i++) {
            node = document.getElementById("esbd" + i);
            iframe = document.createElement("iframe");
            iframe.setAttribute("id", "esbi" + i);
            iframe.setAttribute("src", urls[i] + userID);
            iframe.setAttribute("style", "background-color: white; " +
                "width: 100%; height: 860px;");
            node.appendChild(iframe);
        }
        node = document.getElementById("esbd0");
        node.style.display = "";
        node = document.getElementById("esbb0");
        node.style.backgroundColor = "orange";
        for (var i = 0; i < urls.length; i++) {
            node = document.getElementById("esbb" + i);
            node.addEventListener('click',
                function(event) {
                    var ID = event.target.id.slice(4, event.target.id.length);
                    showFrame(ID);
                }, true);
        }
        node = document.getElementById("esbclose");
        node.addEventListener('click',
            function(event) {
                close(event);
            }, true);
        var hash = document.location.hash;
        if (hash.length > 0 && hash != "#esbframe") {
            back = hash;
        }
        document.location.hash = "#esbframe";
    }
}

function sellerBrowserLinks() {
    reset();
    var frame, content, node;
    if (!urls) {
        initSB();
    }
    if(!userID) {
        getSelection(window);
    }
    if(!userID) {
        sellerBrowserSelect(false);
        return;
    }
    if(userID) {
        prefs = getPrefs(tld);
        frame = document.getElementById("esbframe");
        if (!frame) {
            frame = document.createElement("div");
            frame.setAttribute("style", "background-color: white; " +
                "position: absolute; top: 0px; left: 0px; width: 100%; " +
                "font-family: Arial,Helvetica,sans-serif;");
            frame.setAttribute("id", "esbframe");
            document.body.appendChild(frame);
        }
        content = '<div style="padding: 10px; background-color: #efefff; ' +
            'width: 95%; margin-left: auto; margin-right: auto; ' +
            'margin-top: 10px; margin-bottom: 10px; ' +
            'border: 1px solid rgb(204, 204, 255); font-size: small;">';
        content += '<input type="button" value="' + capClose +
            '" id="esbclose" style="font-size: x-small; color: white; ' +
            'border: none; background-color: #0040b2; padding: 1px; ' + 
            'margin: 1px; float: right;" />\n';
        content += '<center style="clear: right"><h1 style="font-weight: ' +
            'bold; font-size: large;">SellerBrowser Links</h1></center>';
        content += '<hr style="background-color: #ffffff; border: 1px solid ' +
            '#ffffff; height:2px;">\n';
        content += '<h2 style="font-weight: bold; font-size: medium;">' +
            capLinks + '</h2>\n';
        for (var i = 0; i < urls.length; i++) {
            content += '<input type="checkbox" id="esbc' + i + '" />' +
                '<label><a href="' + urls[i] + userID + '">' + desc[i] +
                '</a></label><br />\n';
        }
        content += '<input type="button" style="margin-top: 10px; ' +
            'margin-bottom: 10px; color: white; border: none; ' +
            'background-color: #0040b2; padding: 5px; font-size: x-small; ' +
            'cursor: pointer;" value="' + capSave + '" id="esbsave">\n';
        content += '<hr style="background-color: #ffffff; border: 1px solid ' +
            '#ffffff; height:2px;">\n';
        content += '<h2 style="font-weight: bold; font-size: medium">' +
            capCopy + '</h2>\n';
        content += '<div style="font-size: x-small; border: 1px solid ' +
            'rgb(204, 204, 255); padding: 5px;">\n' +
            '<span>&lt;strong&gt;' + capMember + ' ' + userID +
            '&lt;/strong&gt;</span><br />\n';
        for (var i = 0; i < urls.length; i++) {
            content += '<span id="esbs' + i + '" style="display:none">' +
                '&lt;a href="' + urls[i] + userID + '"&gt;' + desc[i] +
                '&lt;/a&gt;<br /></span>\n';
        }
        content += '</div></div>';
        frame.innerHTML = content;
        for (var i = 0; i < urls.length; i++) {
            node = document.getElementById("esbc" + i);
            node.addEventListener('change',
                function(event) {
                    var ID = event.target.id.slice(4, event.target.id.length);
                    change(ID);
                }, true);
        }
        node = document.getElementById("esbclose");
        node.addEventListener('click',
            function(event) {
                close(event);
            }, true);
        node = document.getElementById("esbsave");
        node.addEventListener('click',
            function(event) {
                save(event);
            }, true);
        for (var i = 0; i < urls.length; i++) {    
            if (prefs.length > 0 && i < prefs.length && prefs[i] == 1) {
                node = document.getElementById("esbc" + i);
                node.setAttribute("checked", "checked");
                change(i);
            }
        }
        var hash = document.location.hash;
        if (hash.length > 0 && hash != "#esbframe") {
            back = hash;
        }
        document.location.hash = "#esbframe";
    }
}

function sellerBrowserToggle() {
    if (!urls) {
        initSB();
    }
    var viewFrames = getViewFrames();
    if (viewFrames) {
        setViewFrames("false");
    } else {
        setViewFrames("true");
    }
}

function selectMember(ID, mode) {
    var node = document.getElementById("esbseli" + ID);
    userID = node.value;
    if (mode) {
        sellerBrowser();
    } else {
        sellerBrowserLinks();
    }
}

function change(ID) {
    var span = document.getElementById("esbs" + ID);
    if (span.style.display == "none") {
        span.style.display = "";
    } else {
        span.style.display = "none";
    }
}

function showFrame(ID) {
    var node;
    for (var i = 0; i < urls.length; i++) {    
        node = document.getElementById("esbd" + i);
        node.style.display = "none";
        node = document.getElementById("esbb" + i);
        node.style.backgroundColor = "#0040b2";
    }
    node = document.getElementById("esbd" + ID);
    node.style.display = "";
    node = document.getElementById("esbb" + ID);
    node.style.backgroundColor = "orange";
}

function close(event) {
    reset();
    userID = null;
    if (back != null) {
        document.location.hash = back;
    } else {
        document.location.hash = "#";
    }
}

function reset() {
    var node = document.getElementById("esbframe");
    if (node) {
        node.innerHTML = "";
    }
}

function save() {
    var newPrefs = new Array();
    var check;
    for (var i = 0; i < urls.length; i++) {
        check = document.getElementById("esbc" + i);
        if (check.checked) {
            newPrefs.push("1");
        } else {
            newPrefs.push("0");
        }
    }
    setPrefs(newPrefs, tld);
}

function getPrefs(tld) {
    var prefsString = GM_getValue("prefs");
    if (prefsString != undefined && prefsString.length > 0) {
        var prefsList = prefsString.split("|");
        var temp;
        for (var i = 0; i < prefsList.length; i++) {
            temp = prefsList[i].split(",");
            if (temp[0] == tld) {
                temp.splice(0, 1);
                return temp;
            }
        }
        return new Array();
    } else {
        return new Array();
    }
}

function setPrefs(newPrefs, tld) {
    if (newPrefs != undefined && newPrefs.length > 0 && tld != undefined &&
        tld.length > 0) {
        var prefsString = GM_getValue("prefs");
        if (prefsString != undefined && prefsString.length > 0) {
            var prefsList = prefsString.split("|");
            var temp;
            for (var i = 0; i < prefsList.length; i++) {
                temp = prefsList[i].split(",");
                if (temp[0] == tld) {
                    newPrefs.unshift(tld);
                    prefsList[i] = newPrefs;
                    GM_setValue("prefs", prefsList.join("|"));
                    return;
                }
            }
            prefsList.push(tld + "," + newPrefs);
            GM_setValue("prefs", prefsList.join("|"));
            
        } else {
            GM_setValue("prefs", tld + "," + newPrefs);
        }
    }
}

function getViewFrames() {
    var viewFramesString = GM_getValue("viewframes");
    if (viewFramesString != undefined && viewFramesString.length > 0 &&
        viewFramesString == "false") {
        return false;
    } else {
        return true;
    }
}

function setViewFrames(viewFrames) {
    if (viewFrames != undefined && viewFrames.length > 0 &&
        viewFrames == "false") {
        GM_setValue("viewframes", "false");
    } else {
        GM_setValue("viewframes", "true");
    }
}

function getText(doc) {
    if(doc.getSelection) {
        return doc.getSelection();
    }
    return doc.selection.createRange().text;
}

function getSelection(win) {
    try {
        userID = getText(win.document);
        if (userID) {
            return;
        }
        var frame;
        for(var i = 0; frame = win.frames[i]; i++) {
            getSelection(frame);
            if (userID) {
                return;
            }
        }
    } catch(e) {}
}

})();
