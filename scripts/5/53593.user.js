// ==UserScript==
// @name            SN_Burdizzo
// @namespace       fredludd@gmail.com,2009-07-12:sn#v8
// @description     Sadly,No! troll kill/unkill, autopsy, logorrhea suppression, and optional badgers
// @include         http://www.sadlyno.com/archives/*
// ==/UserScript==

/*
 *
 * Edit this to suit your taste: it's the maximum number of characters allowed in a
 * comment before the script declares logorrhea.
 */
var CHARLIMIT = 2048;
/*
 *
 * What do you want it to display? Default is "LOGORRHEA ADVISORY", but by changing this
 * 'advisoryType' string you can have "POOP ADVISORY", "INCONTINENCE ADVISORY", whatever.
 */
var advisoryType = "LOGORRHEA";
/*
 *
 * Set this to 'true' for the dancers, 'false' otherwise.
 */
var useBadgers = true;
/*
 *
 * If you have another image you would prefer, this is where you'd mention it.
 */
var badgerImgSrc = "http://www.sadlyno.com/archives/badger2.gif";

/* ^^^^ editable stuff above this line ^^^^ */
/********************************************/


/*  Killfile stuff */
var KF_DELIMITER = "@@";
var KILLFILE = "SNKill";

/* Trims whitespace from either side of a string */
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/* UTF-8 data decode, borrowed from http://www.webtoolkit.info/ */
function Utf8_decode(utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while ( i < utftext.length ) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        } else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return string;
}

/* Extracts the user id from the given header para. */
function getUserID(header) {
    var idMatcher = /\s*(<a [^<]+>)?([^<\|]+)(<\/a>)?\s*said/i;
    var imatch = idMatcher.exec(header.innerHTML);
    if(imatch != null) {
        return imatch[2].trim();
    } else {
        return "";
    }
}

/* Adds the specified name to the kill file. */
function addToKillFile(sname) {
    var curKF;
    if(GM_getValue(KILLFILE, "") == "") {
        curKF = new Array();
    } else {
        curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
    }
    for(var i=0; i<curKF.length; i++) {
        if(sname == curKF[i]) return;
    }
    curKF.push(sname);
    GM_setValue(KILLFILE, curKF.join(KF_DELIMITER));
}

/* Removes the specified name from the kill file.*/
function removeFromKillFile(sname) {
    var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
    var newKF = new Array();
    for(var i=0; i<curKF.length; i++) {
        if(curKF[i] != sname) {
            newKF.push(curKF[i]);
        }
    }
    GM_setValue(KILLFILE, newKF.join(KF_DELIMITER));
}

/* Adds the (un)kill link to the specified header node. If kill is true, it will be a killed posting. */
function modHeader(header, user, kill) {
    var liEl = header.parentNode;
    var paras = liEl.getElementsByTagName("p");
    var killLink = document.createElement("a");
    var links, txt, j;
    if(kill) {
        hideComment(liEl);
        txt = "unkill";
    } else {
        showComment(liEl);
        txt = "kill";
    }
    killLink.setAttribute("href", txt + "('" + user + "')");
    killLink.appendChild(document.createTextNode(" ("+txt+")"));
    links = paras[1].getElementsByTagName("a");
    while(links.length > 1) {
        paras[1].removeChild(links[1]);
        links = paras[1].getElementsByTagName("a");
    }
    paras[1].appendChild(killLink);
    if(kill) {
        allowAutopsy(header,false);
    }
}
/* Hides the comment */
function hideComment(liEl) {
    var j, paras = liEl.getElementsByTagName("p");
    for(j=2; j<paras.length; j++) {
        paras[j].style.display = "none";
    }
    if(useBadgers) {
        if(paras[paras.length - 1].className != "badger") {
            var badgerpara = document.createElement("p");
            badgerpara.className = "badger";
            for(j=0; j<5; j++) {
                var badgerimg = document.createElement("img");
                badgerimg.src = badgerImgSrc;
                badgerpara.appendChild(badgerimg);
            }
            liEl.appendChild(badgerpara);
        } else {
            paras[paras.length - 1].style.display = "";
        }
    }
}

/* Shows the comment */
function showComment(liEl) {
    var j, paras = liEl.getElementsByTagName("p");
    for(j=2; j<paras.length; j++) {
        paras[j].style.display = "";
    }
    if(useBadgers) {
        if(paras[paras.length - 1].className == "badger") {
          liEl.removeChild(paras[paras.length - 1]);
        }
    }
}

/* Sets up and responds to the 'Autopsy' */
function allowAutopsy(header,toolong) {
    var liEl = header.parentNode;
    var paras = liEl.getElementsByTagName("p");
    var peekLink = document.createElement("a");
    var permlinkLine = paras[1];
    var autopsy = /\(autopsy\)/i;
    var advisory = /ADVISORY/;
    
    if(autopsy.exec(permlinkLine.innerHTML) == null) {
        if(toolong && !advisory.exec(permlinkLine.innerHTML)) {
            permlinkLine.insertBefore(document.createTextNode("["+advisoryType+" ADVISORY] "), permlinkLine.firstChild);
        }
        peekLink.setAttribute("class", "killfile_autopsy");
        peekLink.appendChild(document.createTextNode(" (autopsy)"));
        peekLink.style.cursor = "pointer";
        permlinkLine.appendChild(peekLink);
        peekLink.addEventListener('click',
                        function(event) {
                            var clickTarget = event.target;
                            var clickParent = clickTarget.parentNode;
                            var liEl = clickParent.parentNode;
                            var paras = liEl.getElementsByTagName("p");
                            clickTarget.className = "";
                            clickTarget.style.cursor = "default";
                            for(var j=2; j<paras.length; j++) {
                                paras[j].style.display = "";
                            }
                            clickParent.removeChild(clickTarget);
                        }, true);
    }
}

/* Examines all comments, determining status */
function adjust() {
    var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
    var comments = document.evaluate("//li[@class='comment' or @class='commentalt']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for(var j=0; j<comments.snapshotLength; j++) {
        var paras = document.evaluate("descendant::p",comments.snapshotItem(j), null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
        var authorNode = paras.iterateNext();
        var permlinkNode = paras.iterateNext();
        var userID = getUserID(authorNode);
        var killMe = false;
        for(var k=0; k<curKF.length; k++) {
            if(curKF[k] == userID) {
                killMe = true;
                break;
            }
        }
        var thisNode = paras.iterateNext();
        var cbody = "";
        if(!killMe) {
            while (thisNode) {
                cbody += thisNode.textContent;
                thisNode = paras.iterateNext();
            }
        }
        modHeader(permlinkNode, userID, killMe);
        if((cbody.length > CHARLIMIT)) {
            allowAutopsy(permlinkNode,true);
            hideComment(permlinkNode.parentNode);
        }
    }
}

/* Traps all click events and runs them through an anonymous function. */
document.addEventListener('click', function(event) {
    var clickTarget = unescape(event.target);
    var lMatcher = /.*\/(un)?kill\('(.*)'\)$/;
    var imatch = lMatcher.exec(clickTarget);

    if(imatch != null) { //user clicked a (un)kill link.
        var utf8d = Utf8_decode(imatch[2]);
        if(imatch[1] == null) {
            if(confirm("Add " + utf8d + " to your kill file?")) {
                addToKillFile(utf8d);
                adjust();
            }
        } else {
            if(confirm("Remove " + utf8d + " from your kill file?")) {
                removeFromKillFile(utf8d);
                adjust();
            }
        }
        event.stopPropagation();
        event.preventDefault();
    }
}, true);

window.onload = adjust();

//snburdizzo.user.js

