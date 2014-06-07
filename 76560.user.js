// This is a Greasemonkey user script
// To install, you need Greasemonkey, get it from: www.greasespot.net
// Then restart Firefox and drag this script into the window.
// To uninstall, go to Tools/Manage User Scripts,
// select "Dreamwidth ljwho", and click Uninstall.
// 
// ==UserScript==
// @name		Dreamwidth ljwho
// @namespace		http://tearex.nfshost.com/gm/
// @description		Annotate usernames on Dreamwidth
// @longdescription		Similar to the "Notes" feature on LJ.
// @version		0.21
// (c)copyright		2006, Thomas Boutell (http://www.boutell.com/greasemonkey/)
// @attribution         Thomas Boutell (http://www.boutell.com/greasemonkey/ljwho.user.js)
// @license		GPL; http://www.gnu.org/copyleft/gpl.html
// @contributor		Nox (http://userscripts.org/users/Nox)
// @include		http://*.dreamwidth.org/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    var who = getLJNameFromLink(thisLink);
    if (who) {
		var realName = GM_getValue("realnames:" + who);
		if (realName == "") {
			realName = null;
		}
		if (realName) {
			thisLink.setAttribute("title", realName);
		}
		var parent = thisLink.parentNode;
		var child = document.createElement('span');
		child.setAttribute("class", "ljwhospan");
		child.setAttribute("ljwhoname", who);
		var color = "#FF3333;";
		if (!realName) {
			color = "#FFFFFF";
		}
		child.setAttribute("style", 
			"cursor: pointer; " + 
			"margin: 5px; padding: 0px; font-weight: bold; font-size: 10px; " +
			"color: #CCCCCC; " +
			"background-color: " + color + ";");
		if (realName) {
			child.setAttribute("title", realName);
			
		}
		var text = " * ";
		var textNode = document.createTextNode(text);
		child.appendChild(textNode);
		parent.insertBefore(child, thisLink.nextSibling);
		child.addEventListener("click", editRealName, true);
	}
}

function getLJNameFromLink(link)
{
    var href = link.getAttribute("href");
    var who;
    if (href) {
      matched = href.match(/([\w\-\_]+)\.dreamwidth.org\/?$/);
      if (matched) {
        who = matched[1];
      } 
//       else {
//         matched = href.match(/^http\:\/\/(journalfen.net\/users||www.journalfen.net\/users|www.journalfen.net\/community|community.journalfen.net|syndicated.journalfen.net)\/([\w\_\-]+)\/?$/);
//         if (matched) {
//           who = matched[2];
//         }
//       }	 

      // Undoubtedly this list is too short
      if (who && (who != 'www') && (who != 'stat') && (who != 'my') &&
	(who != 'news')) {
        // 0.2: make sure there's a text child node that
        // contains the username. If there isn't, this is
        // a usericon next to a separate username link, or
        // an "my lj" link, "entries" link, etc.
        // so displaying RN would be redundant. 
        text = getCompleteText(link);
        // Work around LJ's _/- equivalence
	// 0.21: global for multi-underscore names like foo_bar_blam
        text = text.replace(/_/g, "-");
        whoC = who.replace(/_/g, "-");
        if (text.search(whoC) != -1) {
          return who;
        }
      }
    }
    return null;	
}

function getCompleteText(node)
{
  var i;
  var text = "";
  for (i = 0; (i < node.childNodes.length); i++) {
    var c = node.childNodes[i];
    if (c.nodeName == "#text") {
      text += c.nodeValue;
    } else {
      text += getCompleteText(c);
    }
  }
  return text;
}

function editRealName()
{
	var who = this.getAttribute("ljwhoname");
	var realName;
	if (who) {
		realName = GM_getValue("realnames:" + who);
	}
	if (!realName) {
		// Prettier than "Undefined"
		realName = "";
	}
	realName = prompt("Annotation for " + who + ":", realName);
	if (realName != null) { 
		GM_setValue("realnames:" + who, realName); 	
		var allLinks, thisLink;
		allLinks = document.evaluate(
		    '//a[@href]',
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);

		for (var i = 0; i < allLinks.snapshotLength; i++) {
		    var thisLink = allLinks.snapshotItem(i);
		    var linkWho = getLJNameFromLink(thisLink);
		    if (who == linkWho) {
		       thisLink.setAttribute("title", realName);
                    }
                }
		var allSpans, thisSpan;
		allSpans = document.evaluate(
		    "//span[@class='ljwhospan']",
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);

		for (var i = 0; i < allSpans.snapshotLength; i++) {
		    var thisSpan = allSpans.snapshotItem(i);
		    var spanWho = thisSpan.getAttribute('ljwhoname');
		    if (who == spanWho) {
		       thisSpan.setAttribute("title", realName);
		       if (realName != "") {
	 	         thisSpan.style.color = "#000000;";
		       } else {
		         thisSpan.style.color = "#000000";
		       }
                    }
                }
	}
}

