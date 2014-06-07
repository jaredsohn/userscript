// ==UserScript==
// @name           ButtonsToLinks
// @namespace      zstr
// @description    Converts download buttons to real links on certain sites so you can use a link collector like RSFind.
// @version        2.1
// @include        http://ddl-scene.com/*
// @include        http://ddl-warez.org/*
// @include        http://dream-team.bz/*
// @include        http://mov-world.net/*
// @include        http://musik.am/*
// @include        http://oxygen-warez.com/*
// @include        http://pirate-loads.com/*
// @include        http://porn-traffic.net/*
// @include        http://relink.us/*
// @include        http://serienjunkies.org/*
// @include        http://serienfreaks.to/*
// @include        http://sceneload.to/*
// @include        http://stealth.to/*
// @include        http://titanload.to/*
// @include        http://top-hitz.com/*
// @include        http://warez-load.com/*
// @include        http://xxx-4-free.net/*
// @include        http://*.ddl-scene.com/*
// @include        http://*.ddl-warez.org/*
// @include        http://*.dream-team.bz/*
// @include        http://*.mov-world.net/*
// @include        http://*.musik.am/*
// @include        http://*.oxygen-warez.com/*
// @include        http://*.pirate-loads.com/*
// @include        http://*.porn-traffic.net/*
// @include        http://*.relink.us/*
// @include        http://*.sceneload.to/*
// @include        http://*.serienjunkies.org/*
// @include        http://*.serienfreaks.to/*
// @include        http://*.sceneload.to/*
// @include        http://*.stealth.to/*
// @include        http://*.titanload.to/*
// @include        http://*.top-hitz.com/*
// @include        http://*.warez-load.com/*
// @include        http://*.xxx-4-free.net/*
// ==/UserScript==

// Changelog:
// v2.1 20.03.2008  Custom support for Relink.us
// v2.0 18.03.2008  Custom support for DDL-Warez.org and Stealth.to
// Please report any bugs.


switch (document.domain.replace("www.","")) {
    
    case "ddl-warez.org":
        func_site_DDLW();
        break;
    case "stealth.to":
        func_site_StealthTo();
        break;
    case "relink.us":
        func_site_RelinkUs();
        break;
    default:
        func_site_Default();
        break;
}

function func_site_Default() {
    with(document) {
        var allForms = evaluate("//form[starts-with(@action, 'http:')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var i = 0; i < allForms.snapshotLength; i++) {
        thisLink = allForms.snapshotItem(i);
        
        p = document.createElement("p");
        a = document.createElement("a");
        var tempHREF = thisLink.action
        var searchString1 = 'http://anonym.to/?';
        var searchPos1 = tempHREF.lastIndexOf(searchString1);
        if (searchPos1 != -1) {
            tempHREF = decodeURIComponent(tempHREF.substr(searchPos1 + searchString1.length));
            if (tempHREF.substr(-1,1) == '+') {
                tempHREF = tempHREF.substr(0,tempHREF.length - 1);
            }
        }
        var searchString2 = 'http://download.serienjunkies.org/go';
        var searchPos2 = tempHREF.lastIndexOf(searchString2);
        if (searchPos2 != -1) {
            tempHREF = thisLink.action.replace(searchString2,'http://download.serienjunkies.org/frame/go');
        }
        
        with(a) {
            setAttribute('href', tempHREF);
            if (thisLink.firstChild.title == '') {
                textContent = 'btl-Link' + i;
            }
            else {
                textContent = 'btl-' + thisLink.firstChild.title;
            }
            setAttribute('class', 'tab');
        }
        thisLink.parentNode.appendChild(p).appendChild(a);
    }
} //end func_site_Default


function func_site_DDLW() {
    with(document) {
        var allForms = evaluate("//form[starts-with(@action, 'get_file.php')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var i = 0; i < allForms.snapshotLength; i++) {
        var allInputs, thisInput, concatInputs, thisLink, finalURL;
        thisLink = allForms.snapshotItem(i);
        concatInputs = '';
        allInputs = thisLink.getElementsByTagName('input');
        p = document.createElement("p");
        a = document.createElement("a");

        with(a) {
            id = 'btl-Link' + (i + 1);
            tempHREF = finalURL;
            setAttribute('href', tempHREF);
            if (thisLink.firstChild.title == '') {
                textContent = 'btl-Link' + (i + 1) + '-loading';
            }
            else {
                textContent = thisLink.firstChild.title;
            }
            setAttribute('class', 'tab');
        }

        thisLink.parentNode.appendChild(p).appendChild(a);
        
        for (var j = 0; j < allInputs.length; j++) {
            thisInput = allInputs[j];
            if (concatInputs) {concatInputs += '&'};
            concatInputs = concatInputs + thisInput.name + '=' + thisInput.value;
        }
        wrapperXHR_DDLW(concatInputs, i);
    }


    function wrapperXHR_DDLW(prm_Data, prm_Id) {

        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://www.ddl-warez.org/get_file.php',
            data: encodeURI(prm_Data),
            headers: {
                    'User-agent': 'Mozilla/5.0',
                    'Content-Type': 'application/x-www-form-urlencoded'
            },
                
            onload: function(responseDetails) {
                myResp = responseDetails.responseText.toLowerCase();
                framesetTagOpenPos  = myResp.indexOf('<frameset');
                framesetTagClosePos = myResp.indexOf('</frameset>');
                myFrameset=myResp.substring(framesetTagOpenPos,framesetTagClosePos);
                myFrameset = removeNL(myFrameset);
                myRegExp1 = new RegExp('(frame[^>]*name="second[^<]*)','gi');
                myRegExp1.exec(myFrameset);
                myResult1 = RegExp.$1
                myRegExp2 = new RegExp('src="([^"]*)','gi');
                myRegExp2.exec(myResult1);
                finalResult = RegExp.$1;
                myLinkId = "btl-Link" + (prm_Id + 1);
                with (document.getElementById(myLinkId)) {
                        setAttribute('href', finalResult);
                        textContent = myLinkId;
                }
            }
        });
    }
} // end func_site_DDLW


function func_site_StealthTo() {

    with(document) {
        var allImgs = evaluate("//img[starts-with(@id, 'dlbtn')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    for (var i = 0; i < allImgs.snapshotLength; i++) {
        
        thisImg = allImgs.snapshotItem(i);
        myOnClick =thisImg.getAttribute('onclick');
        myRegExp1 = new RegExp('download\\(\'([^\']*)','gi');
        myRegExp1.exec(myOnClick);
        myResult1 = RegExp.$1;
        p = document.createElement("p");
        a = document.createElement("a");

        with(a) {
            id = 'btl-Link' + (i + 1);
            tempHREF = myResult1;
            setAttribute('href', tempHREF);
            textContent = 'btl-Link' + (i + 1) + '-loading';
            setAttribute('class', 'tab');
        }

        thisImg.parentNode.appendChild(p).appendChild(a);
        wrapperXHR_StealthTo(myResult1, i);
    }

    function wrapperXHR_StealthTo(prm_Data, prm_Id) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://stealth.to/index.php?go=download&id=' + prm_Data,
            headers: {
                'User-agent': 'Mozilla/5.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(responseDetails) {
                myResp = responseDetails.responseText;
                myLinkId = "btl-Link" + (prm_Id + 1);
                with (document.getElementById(myLinkId)) {
                        setAttribute('href', 'http://' + myResp.split('|',1));
                        textContent = myLinkId;
                }
            }
        });
    }
} // end func_site_StealthTo


function func_site_RelinkUs() {
    with(document) {
        var allForms = evaluate("//form[starts-with(@action, 'http')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    
    for (var i = 0; i < allForms.snapshotLength; i++) {
        
        thisForms = allForms.snapshotItem(i);
        myResult1 =thisForms.getAttribute('action');
        p = document.createElement("p");
        a = document.createElement("a");
    
        with(a) {
            id = 'btl-Link' + (i + 1);
            tempHREF = myResult1;
            setAttribute('href', tempHREF);
            textContent = 'btl-Link' + (i + 1) + '-loading';
            setAttribute('class', 'tab');
        }
    
        thisForms.parentNode.appendChild(p).appendChild(a);
        wrapperXHR_RelinkUs(myResult1, i);
    }
    
    function wrapperXHR_RelinkUs(prm_Data, prm_Id) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: prm_Data,
            headers: {
                'User-agent': 'Mozilla/5.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            onload: function(responseDetails) {
                myResp = responseDetails.responseText.toLowerCase();
                myFrameset = removeNL(myResp);
                myRegExp1 = new RegExp('(iframe[^>]*name="ordner[^<]*)','gi');
                myRegExp1.exec(myFrameset);
                myResult1 = RegExp.$1
                myRegExp2 = new RegExp("src='([^']*)",'gi');
                myRegExp2.exec(myResult1);
                finalResult = RegExp.$1;
                myLinkId = "btl-Link" + (prm_Id + 1);
                with (document.getElementById(myLinkId)) {
                    setAttribute('href', finalResult);
                    textContent = myLinkId;
                }
            }
        });
    }
}


// general functions ->

function removeNL(s) {
    r = "";
    for (i=0; i < s.length; i++) {
    if (s.charAt(i) != '\n' &&
        s.charAt(i) != '\r' &&
        s.charAt(i) != '\t') {
        r += s.charAt(i);
        }
    }
    return r;
}


