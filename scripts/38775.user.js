//  Loosely based on pharyngulakillfile.user.js by stan [dot] dyck (at) gmail {dot} com.
//    a revison prompted by Simba B and some kiwi commentator
//
// ==UserScript==
// @name            SN Badgers
// @namespace       fredludd@gmail.com,2007-10-28:sn#v4
// @description     Sadly,No! comment killer, with Badgers and Autopsy
// @include         http://www.sadlyno.com/archives/*
// ==/UserScript==

var KF_DELIMITER = "@@";
var KILLFILE = "SNKill"
//A convenience function to remove whitespace on either side of a string.
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*
  UTF-8 data decode -- from http://www.webtoolkit.info/
*/
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
/*
  Blanks out all comments by people on the kill list and adds a (un)kill link in the sig line.
*/
function adjust() {
  var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
  var comments = document.evaluate(
    "//p[@class='commentauthor']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for(var j=0; j<comments.snapshotLength; j++) {
    var header = comments.snapshotItem(j);
    var userID = getUserID(header);
    var killMe = false;
    for(var k=0; k<curKF.length; k++) {
      if(curKF[k] == userID) {
        killMe = true;
        break;
      }
    }
    modHeader(header, userID, killMe);
  }
}

/*
 Adds the (un)kill link to the specified header node. If kill is true, it will be a killed link.
*/
function modHeader(header, user, kill) {
  var fchillin = header.childNodes;
  var liEl = header.parentNode;
  var paras = liEl.getElementsByTagName("p");
  var killLink = document.createElement("a");
  var links, txt;
  if(kill) {
    var badgerpara = document.createElement("p");
    badgerpara.className = "badger";
    for(var j=2; j<paras.length; j++)
      paras[j].style.display = "none";
    txt = "unkill";
    for(j=0; j<5; j++) {
        var badgerimg = document.createElement("img");
        badgerimg.src = "http://www.sadlyno.com/archives/badger2.gif";
        badgerpara.appendChild(badgerimg);
    }
    liEl.appendChild(badgerpara);
  } else {
    for(var j=2; j<paras.length; j++) {
      paras[j].style.display = "";
    }
    if(paras[paras.length - 1].className == "badger") {
      liEl.removeChild(paras[paras.length - 1]);
    }
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
    var peekLink = document.createElement("a");
    peekLink.setAttribute("class", "killfile_autopsy");
    peekLink.appendChild(document.createTextNode(" (autopsy)"));
    peekLink.style.cursor = "pointer";
    paras[1].appendChild(peekLink);
    peekLink.addEventListener('click',
        function(event) {
            var clickTarget = event.target;
            var clickParent = clickTarget.parentNode;
            var liEl = clickParent.parentNode;
            var paras = liEl.getElementsByTagName("p");
            clickTarget.className = "";
            clickTarget.style.cursor = "default";
            for(var j=2; j<paras.length; j++)
              paras[j].style.display = "";
            clickParent.removeChild(clickTarget);
        }, true);
  }
/**/
}

/*
  Extracts the user id from the specified header node.
*/
function getUserID(header) {
  var idMatcher = /\s*(<a [^<]+>)?([^<\|]+)(<\/a>)?\s*said/i;
  var imatch = idMatcher.exec(header.innerHTML);
  if(imatch != null) {
    return imatch[2].trim();
  } else {
    return "";
  }
}

/*
  Adds the specified name to the kill file.
*/
function addToKillFile(name) {
  var curKF;
  if(GM_getValue(KILLFILE, "") == "") {
    curKF = new Array();
  } else {
    curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
  }
  for(var i=0; i<curKF.length; i++) {
    if(name == curKF[i]) return;
  }
  curKF.push(name);
  GM_setValue(KILLFILE, curKF.join(KF_DELIMITER));
}

/*
  Removes the specified name from the kill file.
*/
function removeFromKillFile(name) {
  var curKF = GM_getValue(KILLFILE, "").split(KF_DELIMITER);
  var newKF = new Array();
  for(var i=0; i<curKF.length; i++) {
    if(curKF[i] != name)
      newKF.push(curKF[i]);
  }
  GM_setValue(KILLFILE, newKF.join(KF_DELIMITER));
}

/*
  Traps all click events and runs them through an anonymous function.
*/
document.addEventListener('click', function(event) {
  var clickTarget = unescape(event.target);
  var lMatcher = /.*\/(un)?kill\('(.*)'\)$/;  //finds the (un)kill link
  var imatch = lMatcher.exec(clickTarget);
/**/
  var aMatcher = /.*\/autopsy\(\)$/;  //finds the (un)kill link
  var amatch = aMatcher.exec(clickTarget);
/**/

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
        //prevent further processing of the click event.
        event.stopPropagation();
        event.preventDefault();
    }
}, true);

window.onload = adjust();

//sn_badgers.user.js

