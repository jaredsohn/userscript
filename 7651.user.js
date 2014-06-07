// ==UserScript==
// @name           IMDB Hebrew names plus
// @namespace      grease1 DOT daniboy AT antichef DOT com
// @description    This script will add the hebrew name of a film (or TV series) to their IMDB page
// @include        http://imdb.com/title/tt*
// @include        http://*.imdb.com/title/tt*
// @date           2007-03-21
// @version        0.2
// @GM_version     0.6.8
// ==/UserScript==

// Original script idea by Lior Z. - http://userscripts.org/scripts/show/3096
// Throbber by Martin Jespersen - http://www.eyedive.com/
// (actually taken from http://mentalized.net/activity-indicators/)

var globalStrTargumonURL;

window.addEventListener('load', loadHebrewTitle, false);

// This function will call for Targumon to give the HTML source of page with the hebrew title
function loadHebrewTitle() {
  
  // This script is meaningless without GreaseMonkey's support for XMLHTTP requests, so check for it
  if (GM_xmlhttpRequest) {
    
    // Regex to get the English title and the release year
    var regexTitle = /"?(.+?)"? \((\d{4})(?:\/[IV]+)?\)/;
    var nodeTitle = document.getElementsByTagName("title")[0].textContent;
    var arrResult = regexTitle.exec(nodeTitle);
    
    // If an English title and the release year were found, continue. otherwise, ignore
    if (arrResult.length == 3) {
      
      // Create the main node, to which all future nodes will be appended
      var nodeHebrewPlaceholder = createMainScriptNode();
      document.getElementsByTagName("h1")[0].parentNode.appendChild(nodeHebrewPlaceholder);
      
      // Create the URL that will be used in the XMLHTTP request later
      globalStrTargumonURL = "http://www.targumon.co.il/titlelist.asp?kw=" + escape(convertToAscii(arrResult[1].replace(/ /g, '+'))) + "&adv=on&yearlo=" + arrResult[2] + "&yearhi=" + arrResult[2];
      
      // Now create the loading throbber and message
      var nodeThrobber = createWorkingThrobber();
      var nodeMessage = createMessageNode("\u05de\u05d7\u05e4\u05e9 \u05d1\u05ea\u05e8\u05d2\u05d5\u05de\u05d5\u05df", false);
      nodeHebrewPlaceholder.appendChild(nodeThrobber);
      nodeHebrewPlaceholder.appendChild(nodeMessage);
      
      // Request the Targumon page
      GM_xmlhttpRequest({method:"GET", url:globalStrTargumonURL, overrideMimeType:"text/plain; charset=Windows-1255", onload:handleAJAX});
      
    }
    
  }
  
}

// This function creates the main node that this script will work on
function createMainScriptNode() {
  var nodeHebrewPlaceholder = document.createElement("p");
  nodeHebrewPlaceholder.setAttribute("id", "GM_HebrewPlaceholder");
  return nodeHebrewPlaceholder;
}

// This function creates the throbber animation
function createWorkingThrobber() {
  var nodeThrobberPackage = document.createElement("span");
  nodeThrobberPackage.setAttribute("id", "GM_Throbber");
  
  var nodeThrobber = document.createElement("img");
  nodeThrobber.setAttribute("src", "data:image/gif;base64,R0lGODlhEAAQANU9ANPT0/f399HR0dfX18nJycrKysbGxvz8/PDw8Ojo6NXV1fv7+/j4+M/Pz8XFxcTExOLi4tnZ2e/v7/Pz89TU1MjIyPT09Obm5uPj49ra2vX19fHx8dLS0vn5+eTk5OHh4fb29uvr68vLy+zs7MPDw9DQ0Ofn58zMzOnp6dzc3OXl5djY2M7OzsHBwdvb2+rq6u7u7t3d3d/f397e3tbW1vLy8u3t7fr6+uDg4P7+/v39/cfHx////////wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAA9ACwAAAAAEAAQAAAGw0CeULfJ8QQUSiZ3EDo7H8KEF9k9AAeGxsnI7HYfXmJnsPFCkYDwlno4BDzGI6NbsAy4Q3MBKxmMABs8OF87CBgXNzw6KUYdBwgiHBgWPBQkCi8LOTpON0ZOAAYOJy5OpyAmAw0CAyYgQqA8BwoVJDscpzkWijw5OQEfLC25FhgUcwtOF0ITMTMTFV8isBBCIgOVdToQttYTIluiBIlCDC4AAToDDh48KgYGER1cI2fxCjwBBTj0p8oqKChoIGRDJyFBAAAh+QQFAAA9ACwAAAAAEAAQAAAGbECekIfAAYQAHGLIhBR2OyG0gGMKJQSoFJpgXm48bJTH5elQxIIAjJV2dYNCEboOC98DqBG6qw/hfEdWg4SFVgB8O11DYlBJfG9CbFk7Sk94QnVYcjw4eGN9bBBMgKChgyhPpgUXhEWCSUtDQQAh+QQFAAA9ACwAAAAAEAAQAAAGvkCekLfAURQN4UY3FAYCvNRjp+AFCjjGkBHx8CyEnVe1ozJ1kF1Fk4M4NDyFg8SBTirlFY9R1VVOGFBQFhgAFSg5Nzw3K2w8IV5DiU0dOjUZOw0CAyYgTUMeDQ4OAgA7UyUTnzwgFwMNNC0FERtNBzc5TTgKIbkjQzo4DxQYFjwTUAsyJ7k4PAclZTsIOTkvDZl7BL8jUzgHPDkRDgYfPAkGDQcHGRFQQgsfBKoROw4XORrvwBu5AhQcICxoEgQAOw==");
  
  nodeThrobberPackage.appendChild(nodeThrobber);
  nodeThrobberPackage.appendChild(document.createTextNode(" "));
  return nodeThrobberPackage;
}

// This function creates a message and appends it to the main node
function createMessageNode(strMessage, bTitle) {
  var nodeMessage = document.createElement("a");
  nodeMessage.setAttribute("href", globalStrTargumonURL);
  if (bTitle) {
    nodeMessage.setAttribute("id", "GM_Title");
  } else {
    nodeMessage.setAttribute("id", "GM_Message");
  }
  nodeMessage.appendChild(document.createTextNode(strMessage));
  return nodeMessage;
}

// This function handles the result of the XMLHTTP request
function handleAJAX(details) {
  
  if (details.status == 200 && details.readyState == 4) {
    // If the result is satisfactory, add the title
    addHebrewTitle(details.responseText);
  } else {
    // If there is a problem with the request, give up with a server error
    giveUp(true);
  }
  
}

// This function attempts to add the hebrew title to the main node
function addHebrewTitle(strResponseHTML) {
  
  // Regex to get the hebrew title from the HTML source that was recieved from Targumon
  var regexHebrewTitle = /<h2>(?!<a)(.+)<\/h2>/;
  var arrResult = regexHebrewTitle.exec(strResponseHTML);
  
  if (arrResult && arrResult.length == 2) {
    // If a hebrew title was found, append it to the main node, and remove the throbber and message
    document.removeElementById("GM_Throbber");
    document.removeElementById("GM_Message");
    
    var titleNode = createMessageNode(arrResult[1], true);
    document.getElementById("GM_HebrewPlaceholder").appendChild(titleNode);
  } else {
   // If no hebrew title was found, give up without a server error
    giveUp(false);
  }
  
}

// This function handles the part where the script gives up on error
function giveUp(bServerError) {
  
  // Remove the throbber and the current message
  document.removeElementById("GM_Throbber");
  document.removeElementById("GM_Message");
  
  // Create a new message, depending if we have up because of a server error, or because no hebrew title was found
  nodeHebrewPlaceholder = document.getElementById("GM_HebrewPlaceholder");
  if (bServerError) {
    var nodeMessage = createMessageNode("\u05ea\u05e7\u05dc\u05d4 \u05d1\u05d2\u05d9\u05e9\u05d4 \u05dc\u05d0\u05ea\u05e8 \u05ea\u05e8\u05d2\u05d5\u05de\u05d5\u05df", false);
  } else {
    var nodeMessage = createMessageNode("\u05d4\u05e9\u05dd \u05dc\u05d0 \u05e0\u05de\u05e6\u05d0 \u05d1\u05ea\u05e8\u05d2\u05d5\u05de\u05d5\u05df\u002e \u05dc\u05d7\u05e5 \u05db\u05d0\u05df \u05dc\u05d7\u05d9\u05e4\u05d5\u05e9 \u05d9\u05d3\u05e0\u05d9\u002e", false);
  }
  nodeHebrewPlaceholder.appendChild(nodeMessage);
  
}

// Stylish!
GM_addStyle("#GM_HebrewPlaceholder {direction: rtl; margin: 8px 8px 14px 12px; text-align: right; }");
GM_addStyle("#GM_HebrewPlaceholder a {font-size: 28px !important; font-weight: bold !important; line-height: 28px; text-decoration: none; }");
GM_addStyle("#GM_HebrewPlaceholder a:hover {text-decoration: underline; }");
GM_addStyle("#GM_Throbber img {height: 16px; width: 16px; }");
GM_addStyle("#GM_Message {color: #ccc !important; }");
GM_addStyle("#GM_Message:hover {color: #ddd !important; }");
GM_addStyle("#GM_Title {color: #5871b6 !important; }");
GM_addStyle("#GM_Title:hover {color: #6881c6 !important; }");

// This function removes an element by it's id
document.removeElementById = function(strId) {
  var node = document.getElementById(strId);
  if (node) {
    node.parentNode.removeChild(node);
  }
}

// This function converts letters with little decorations to ASCII letters
function convertToAscii(str) {
  
  var strRet = str;
  var regexConvert;
  regexConvert = /([\u00c1\u00c0\u0102\u1eae\u1eb0\u1eb4\u1eb2\u00c2\u1ea4\u1ea6\u1eaa\u1ea8\u01cd\u00c5\u01fa\u00c4\u00c3\u0104\u0100\u1ea2\u1ea0\u1eb6\u1eac])/g; // A
  strRet = strRet.replace(regexConvert, 'A');
  regexConvert = /([\u00e1\u00e0\u0103\u1eaf\u1eb1\u1eb5\u1eb3\u00e2\u1ea5\u1ea7\u1eab\u1ea9\u01ce\u00e5\u01fb\u00e4\u00e3\u0105\u0101\u1ea3\u1ea1\u1eb7\u1ead])/g; // a
  strRet = strRet.replace(regexConvert, 'a');
  regexConvert = /([\u0106\u0108\u010c\u010a\u00c7])/g; // C
  strRet = strRet.replace(regexConvert, 'C');
  regexConvert = /([\u0107\u0109\u010d\u010b\u00e7])/g; // c
  strRet = strRet.replace(regexConvert, 'c');
  regexConvert = /([\u010e\u0110])/g; // D
  strRet = strRet.replace(regexConvert, 'D');
  regexConvert = /([\u010f\u0111])/g; // d
  strRet = strRet.replace(regexConvert, 'd');
  regexConvert = /([\u00c9\u00c8\u0114\u00ca\u1ebe\u1ec0\u1ec4\u1ec2\u011a\u00cb\u1ebc\u0116\u0118\u0112\u1eba\u1eb8\u1ec6])/g; // E
  strRet = strRet.replace(regexConvert, 'E');
  regexConvert = /([\u00e9\u00e8\u0115\u00ea\u1ebf\u1ec1\u1ec5\u1ec3\u011b\u00eb\u1ebd\u0117\u0119\u0113\u1ebb\u1eb9\u1ec7])/g; // e
  strRet = strRet.replace(regexConvert, 'e');
  regexConvert = /([\u011e\u011c\u0120\u0122])/g; // G
  strRet = strRet.replace(regexConvert, 'G');
  regexConvert = /([\u011f\u011d\u0121\u0123])/g; // g
  strRet = strRet.replace(regexConvert, 'g');
  regexConvert = /([\u0124\u0126])/g; // H
  strRet = strRet.replace(regexConvert, 'H');
  regexConvert = /([\u0125\u1e96\u0127])/g; // h
  strRet = strRet.replace(regexConvert, 'h');
  regexConvert = /([\u00cd\u00cc\u012c\u00ce\u01cf\u00cf\u0128\u0130\u012e\u012a\u1ec8\u1eca])/g; // I
  strRet = strRet.replace(regexConvert, 'I');
  regexConvert = /([\u00ed\u00ec\u012d\u00ee\u01d0\u00ef\u0129\u0069\u012f\u012b\u1ec9\u1ecb\u0131])/g; // i
  strRet = strRet.replace(regexConvert, 'i');
  regexConvert = /([\u0134])/g; // J
  strRet = strRet.replace(regexConvert, 'J');
  regexConvert = /([\u0135])/g; // j
  strRet = strRet.replace(regexConvert, 'j');
  regexConvert = /([\u0136])/g; // K
  strRet = strRet.replace(regexConvert, 'K');
  regexConvert = /([\u0137])/g; // k
  strRet = strRet.replace(regexConvert, 'k');
  regexConvert = /([\u0139\u013d\u013b\u0141\u013f])/g; // L
  strRet = strRet.replace(regexConvert, 'L');
  regexConvert = /([\u013a\u013e\u013c\u0142\u0140])/g; // l
  strRet = strRet.replace(regexConvert, 'l');
  regexConvert = /([\u0143\u0147\u00d1\u0145])/g; // N
  strRet = strRet.replace(regexConvert, 'N');
  regexConvert = /([\u0144\u0148\u00f1\u0146])/g; // n
  strRet = strRet.replace(regexConvert, 'n');
  regexConvert = /([\u00d3\u00d2\u014e\u00d4\u1ed0\u1ed2\u1ed6\u1ed4\u01d1\u00d6\u0150\u00d5\u00d8\u01fe\u014c\u1ece\u01a0\u1eda\u1edc\u1ee0\u1ede\u1ee2\u1ecc\u1ed8])/g; // O
  strRet = strRet.replace(regexConvert, 'O');
  regexConvert = /([\u00f3\u00f2\u014f\u00f4\u1ed1\u1ed3\u1ed7\u1ed5\u01d2\u00f6\u0151\u00f5\u00f8\u01ff\u014d\u1ecf\u01a1\u1edb\u1edd\u1ee1\u1edf\u1ee3\u1ecd\u1ed9])/g; // o
  strRet = strRet.replace(regexConvert, 'o');
  regexConvert = /([\u0154\u0158\u0156])/g; // R
  strRet = strRet.replace(regexConvert, 'R');
  regexConvert = /([\u0155\u0159\u0157])/g; // r
  strRet = strRet.replace(regexConvert, 'r');
  regexConvert = /([\u015a\u015c\u0160\u015e])/g; // S
  strRet = strRet.replace(regexConvert, 'S');
  regexConvert = /([\u015b\u015d\u0161\u015f])/g; // s
  strRet = strRet.replace(regexConvert, 's');
  regexConvert = /([\u0164\u0162\u0166])/g; // T
  strRet = strRet.replace(regexConvert, 'T');
  regexConvert = /([\u0165\u1e97\u0163\u0167])/g; // t
  strRet = strRet.replace(regexConvert, 't');
  regexConvert = /([\u00da\u00d9\u016c\u00db\u01d3\u016e\u00dc\u01d7\u01db\u01d9\u01d5\u0170\u0168\u0172\u016a\u1ee6\u01af\u1ee8\u1eea\u1eee\u1eec\u1ef0\u1ee4])/g; // U
  strRet = strRet.replace(regexConvert, 'U');
  regexConvert = /([\u00fa\u00f9\u016d\u00fb\u01d4\u016f\u00fc\u01d8\u01dc\u01da\u01d6\u0171\u0169\u0173\u016b\u1ee7\u01b0\u1ee9\u1eeb\u1eef\u1eed\u1ef1\u1ee5])/g; // u
  strRet = strRet.replace(regexConvert, 'u');
  regexConvert = /([\u1e82\u1e80\u0174\u1e84])/g; // W
  strRet = strRet.replace(regexConvert, 'W');
  regexConvert = /([\u1e83\u1e81\u0175\u1e98\u1e85])/g; // w
  strRet = strRet.replace(regexConvert, 'w');
  regexConvert = /([\u00dd\u1ef2\u0176\u0178\u1ef8\u1ef6\u1ef4])/g; // Y
  strRet = strRet.replace(regexConvert, 'Y');
  regexConvert = /([\u00fd\u1ef3\u0177\u1e99\u00ff\u1ef9\u1ef7\u1ef5])/g; // y
  strRet = strRet.replace(regexConvert, 'y');
  regexConvert = /([\u0179\u017d\u017b])/g; // Z
  strRet = strRet.replace(regexConvert, 'Z');
  regexConvert = /([\u017a\u017e\u017c])/g; // z
  strRet = strRet.replace(regexConvert, 'z');
  
  return strRet;
}
