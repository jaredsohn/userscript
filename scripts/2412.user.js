// ==UserScript==
// @name          Bloglines kill file
// @description   Allows you to manage a kill file list of contributors to aggregators on bloglines.
// @namespace     http://www.tikva.com/greasemonkey
// @include       http://www.bloglines.com/myblogs_display*

// This is mostly a management overlay on top of 
// "Mental health through ignorance", which had the div hiding code.  That
// script, in turn, referenced:
///// All the clever stuff stolen directly from: 
///// http://sharedobject.org/greasemonkey/michaeljackson.reuters.user.js

//// ITEMS:
// blog names with quotes in them are problematic.
// the XPath interface is great, but waiting for the page to load is not.

// ==/UserScript==

(function() {
function killProvider(e) {
        var aggregator = this.parentNode.childNodes[0].getAttribute("aggregator");
        var blogger = this.parentNode.childNodes[0].getAttribute("blogger");
        var current_bloggers = GM_getValue(aggregator);
        if (current_bloggers == undefined || current_bloggers == "") {
                GM_setValue(aggregator, blogger);
        } else {
                var currblog = current_bloggers.split('|');
                if (currblog.indexOf(blogger) == -1) {
                        GM_setValue(aggregator, current_bloggers+"|"+blogger);
                } else {
                        alert("This blogger already killfiled.");
                }
        }
}

function showKills(e) {
var kl = document.getElementById("killList "+this.parentNode.childNodes[0].getAttribute("aggregator"));
var ttn = this.childNodes[0];
if (kl.style.display == "block") {
ttn.nodeValue = "Show list of hidden bloggers";
kl.style.display = "none";
} else {
ttn.nodeValue = "Hide list of hidden bloggers";
kl.style.display = "block";
}
}

function removeBlogger(e) {
        var aggregator = this.parentNode.childNodes[5].getAttribute("aggregator");
        var blogger = this.parentNode.childNodes[5].getAttribute("blogger");
        var current_bloggers = GM_getValue(aggregator);
        if (current_bloggers != undefined) {
                var currblog = current_bloggers.split('|');
                var blogInd = currblog.indexOf(blogger);
                if (blogInd != -1) {
                        currblog.splice(blogInd, 1);
                        var new_bloggers = "";
                        for (var i = 0; i < currblog.length-1; i++) {
                                new_bloggers += currblog[i]+"|";
                        }
                        if (currblog.length > 0) {
                                new_bloggers += currblog[currblog.length-1];
                        }
                        GM_setValue(aggregator, new_bloggers);
                }
        }
}

// COMMENT OUT THESE THREE LINES FOR AUTO
//window.addEventListener(
//    'load', 
//    function() { 
  var regexps = [];
var globalToMatch = new Array();
var gtmi = 0;
var countHash = new Object();
var allitemdates = 0;
var aggregatorfind = document.evaluate("//div[@class = 'channel']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var k = 0; k < aggregatorfind.snapshotLength; k++) {
var aggregatorNode;
if (aggregatorfind.snapshotItem(k).childNodes[1].src == undefined) {
aggregatorNode = aggregatorfind.snapshotItem(k).childNodes[1].childNodes[0].childNodes[0];
} else {
aggregatorNode = aggregatorfind.snapshotItem(k).childNodes[3].childNodes[0].childNodes[0];
}
var aggregator = aggregatorNode.nodeValue.substring(1, aggregatorNode.nodeValue.length-1);
var aggsite = "Site: "+aggregator;
//.replace(/\'/g, "\'");;
var itemdates, thisdate, newlink, titles, thissite;
itemdates = document.evaluate("//li[@class = 'itemdate']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
titles = document.evaluate("//a[@title = \""+aggsite+"\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//titles = document.evaluate("//a[@title = '"+aggsite+"']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//titles = document.evaluate("//a[@title = \"Site: dealnews - Today\x27s Edition\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i = 0; i < titles.snapshotLength; i++, allitemdates++) {
        thisdate = itemdates.snapshotItem(allitemdates);
        thissite = titles.snapshotItem(i);
//GM_log("TS:"+thissite);
//GM_log("Tsl:"+titles.snapshotLength);
//GM_log("i:"+i);
        newlink = document.createElement('li');
        var aa = document.createElement('a');
        aa.setAttribute("aggregator", aggregator);
        var blogreg = /^([^:]*):/;
        var bre = blogreg.exec(thissite.childNodes[0].nodeValue);
        if (bre != undefined) {
        aa.setAttribute("blogger", bre[1]);
        aa.href = 'javascript:void(0);';
        aa.addEventListener('click', killProvider, true);
        aa.appendChild(document.createTextNode("Killfile this blogger"));
        newlink.appendChild(aa);
// put at beginning of list (before date)
//        thisdate.parentNode.insertBefore(newlink, thisdate);
// put at end of list (after Clip/Blog This)
        thisdate.parentNode.appendChild(newlink);
}
  }

  var thisKill = GM_getValue(aggregator);
///  var thisKill = GM_getValue("Charlottesville Blogs");
  if (thisKill != undefined && thisKill != "") {
var tksplit = thisKill.split('|');
for (var vit = 0; vit < tksplit.length; vit++) {
globalToMatch.push(tksplit[vit]);
}
}
//GM_log(thisKill);
//GM_log(globalToMatch[0]);
//GM_log(globalToMatch[1]);

 var sk3 = document.createElement('h2');
 var sk = document.createElement('a');
 sk3.appendChild(sk);
 sk.href = 'javascript:void(0);';
 sk.setAttribute("aggregator", aggregator);
 sk.addEventListener('click', showKills, true);
 var tn = document.createTextNode("Show list of hidden bloggers");
 tn.id = "showhidebloggers"; 
 sk.appendChild(tn);
 aggregatorNode.parentNode.parentNode.parentNode.appendChild(sk3);
 var killList = document.createElement('div');
 killList.style.display = "none";
 killList.id = "killList "+aggregator;
  for(;gtmi < globalToMatch.length; gtmi++) {
//    globalToMatch.push(globalToMatch[gtmi]);
    regexps[gtmi] = new RegExp("^"+globalToMatch[gtmi], "i");
    regexps[gtmi].compile;
    var tk = document.createElement('h2');
    tk.appendChild(document.createTextNode(globalToMatch[gtmi]));
    var tka = document.createElement('a');
    tka.setAttribute("aggregator", aggregator);
    tka.setAttribute("blogger", globalToMatch[gtmi]);
tka.href = 'javascript:void(0);';
tka.addEventListener('click', removeBlogger, true);
tka.appendChild(document.createTextNode("Remove blogger from killfile"));
    tk.appendChild(document.createTextNode(" | "));    
    if (countHash[globalToMatch[gtmi]] == undefined) {
    countHash[globalToMatch[gtmi]] = document.createTextNode("0");
//GM_log("CH created:"+globalToMatch[gtmi]);
}
//GM_log("CH hit:"+globalToMatch[gtmi]+":"+countHash[globalToMatch[gtmi]].nodeValue);
    tk.appendChild(document.createTextNode("Articles killed: "));
    tk.appendChild(countHash[globalToMatch[gtmi]]);
    tk.appendChild(document.createTextNode(" | "));
    tk.appendChild(tka);
    tk.appendChild(document.createTextNode(" | "));
    killList.appendChild(tk);
  }
 aggregatorNode.parentNode.parentNode.parentNode.appendChild(killList);
} // for all aggs


  var divs = document.getElementsByTagName("div");
  for(var i = 0; i < divs.length; i++) {
    if(divs[i].id.match(/(siteItem\.\d+\.\d+)/)) {
      for(var j = 0; j < regexps.length; j++) {
//	var match = regexps[j].exec(divs[i].innerHTML);
	var match = regexps[j].exec(divs[i].childNodes[2].childNodes[0].childNodes[0].nodeValue);
        if(match) {
          countHash[globalToMatch[j]].nodeValue++;
//GM_log("CH incr:"+globalToMatch[j]+":"+countHash[globalToMatch[j]].nodeValue+":"+regexps[j]);
//GM_log(divs[i].childNodes[2].childNodes[0].childNodes[0].nodeValue);
//GM_log(divs[i].innerHTML);
          // uncomment the following line and comment the following two if you'd rather just hide entries entirely.
          // divs[i].style["display"] = "none";
          var orig = divs[i].innerHTML;
          divs[i].innerHTML = "<div><a onclick=\"javascript:document.getElementById('_gmHidden" + i + "').style.display = 'block'\">view '" + match[0] + "' at your own risk</a><div style=\"display: none\" id=\"_gmHidden" + i  +"\">" + orig + "</div></div>";
          break;
          }
      }
    }
  }
// COMMENT OUT THESE TWO LINES FOR AUTO
//},
//    true);


})();
