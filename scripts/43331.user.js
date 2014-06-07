// ==UserScript==
// @name        MacDailyNews
// @description	Cleans up the website and implements a quoter for comments
// @namespace   http://userscripts.org/users/82254
// @version     1.5.0
// @copyright   2009, StarkHalo (starkhalo at yahoo dot com)
// @include		http://macdailynews.com/*
// @include		http://www.macdailynews.com/*
// ==/UserScript==

// Auto-update code
var version_scriptNum = 43331; // Change this to the number given to the script by userscripts.org (check the address bar)
var version_timestamp = 1235962457500; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
function updateCheck(forced) {if((forced)||(parseInt(GM_getValue("lastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/" + version_scriptNum + "?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("lastUpdate", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); var scriptName = (/@name\s*(.*?)\s*$/m.exec(rt))[1]; GM_setValue("targetScriptName", scriptName); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for the Greasemonkey script \"" + scriptName + ".\"\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/" + version_scriptNum);}} else if (forced) {alert("No update is available for \"" + scriptName + ".\"");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}} GM_registerMenuCommand(GM_getValue("targetScriptName", "???") + " - Manual Update Check", function() {updateCheck(true);}); updateCheck(false);

// Gimme mojo !!
var script = document.createElement('script');
script.src="http://o.aolcdn.com/dojo/1.2.3/dojo/dojo.xd.js";
document.getElementsByTagName('head')[0].appendChild(script);

var disableTextAds = {

  blockAds: function(elt) {
    var target = elt;
    var childNode;
    
    switch(elt.nodeName.toLowerCase()) {

      // EchoTopic and ResultLinks wrap their inserted links in a <nobr> tag.
      case 'nobr':
      try {
          if (elt.firstChild.getAttribute('class') == "tfTextLink") { //EchoTopic
            childNode = elt.firstChild.firstChild;
          } else if (elt.firstChild.hasAttribute('id') && elt.firstChild.getAttribute('id').search(/RLLINK/) >= 0) { //ResultLinks
            childNode = elt.firstChild.firstChild;       
          } 
      } catch(e) { }      
        childNode = elt;
        elt.innerHTML = elt.innerHTML.replace(/<.*?>/, "");
        
      break;
      

      // AdBrite check
      case 'ispan':
      if (elt.hasAttribute('id')) {
        if (match = elt.getAttribute('id').match(/AdBriteInlineAd_(.*)/i)) {
          childNode = document.createTextNode(match[1]);
        }
      }
      break;
      
      // Chitika
      case 'span':
      if (elt.firstChild.nodeName.toLowerCase() == 'a') {
        if (elt.getAttribute('class') != null && elt.getAttribute('class').search(/lx-link/) >= 0) {
          childNode = elt.firstChild.firstChild;
          break;          
        }
      }

      // The rest of the networks
      case 'a':

      var a_class = elt.getAttribute('class');

      switch(a_class) {
        // Infolinks
        case 'IL_LINK_STYLE':
          childNode = elt.firstChild;
          break;

        // Kontera
        case 'kLink':
          childNode = disableTextAds.findKonteraText(elt);
          break;        
      }
      
      // IntelliTXT
      if (elt.hasAttribute('itxtdid')) {
        childNode = elt.firstChild;
        break;
      }

      // Mediatext
      if (elt.hasAttribute('c4fadvertpos')) {
        childNode = elt.firstChild;
        break;
      }

      // Targetpoint Check
      if (elt.hasAttribute('tpi')) {
        childNode = elt.firstChild;
        break;
      }			



      // Old AdBrite check - not sure if this is still relevant
      if (elt.hasAttribute('id')) {
        if (match = elt.getAttribute('id').match(/AdBriteInlineAd_(.*)/i)) {
          childNode = document.createTextNode(match[1]);
        }
        break;
      }

      // Can't be too cautious.
      break;
      } // case


      // Grab the inner text and replace the inserted tag with it
      if (childNode) {
        target.parentNode.replaceChild(childNode, target);
      }
    },

    findKonteraText: function(elt) {
      // kontera triply-nests the original content: 
      // <a><font><span>text</span><span>here</span></font></a>

      var kTextNodes = document.evaluate("font/span[@class='kLink']/text()", elt, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
      var kTextNode = kTextNodes.iterateNext();
      var content = '';
      while(kTextNode) {
        content += kTextNode.data + ' ';
        kTextNode = kTextNodes.iterateNext();
      }

      return document.createTextNode(content.substring(0,content.length-1));
    }
  };

  document.addEventListener('DOMNodeInserted', function(event) { disableTextAds.blockAds(event.target); }, true);

  // Handle the cases that don't trigger our DOMNodeInserted hook.
  window.addEventListener("load", function(event) { 

    // According to LingoSpot, setting this global variable will disable all ads.  Doesn't actually see to have any effect.
    unsafeWindow.LINGOSPOT_DISABLED = true;

    // Thanks to Descriptor for yet another way to block LingoSpot; doesn't on every page, unfortunately.
    // Still, it should reduce runtime for pages where it works.
    unsafeWindow.tf_maxKeywords = 0;

    // Unfortunately, Linkworth has decided to remove their container div, so we're stuck crawling the entire document body.  Meh.
    var links = document.evaluate("//a[@class='lw_cad_link' or @itxtdid]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0; i<links.snapshotLength; i++) { 
      var anchor = links.snapshotItem(i);
      anchor.parentNode.replaceChild(document.createTextNode(anchor.textContent), anchor);
    }
  }, false);
  
$ = function(x) {
  return document.getElementById(x);
}

kill = function(x) {
  if ($(x))
    $(x).parentNode.removeChild($(x));
}

function killDivs(x) {
    allHTMLTags = document.getElementsByTagName('div');

    for (i=0; i < allHTMLTags.length; i++) {
        if (allHTMLTags[i].className == x) {
            allHTMLTags[i].parentNode.removeChild(allHTMLTags[i--]);
        }
    }
}

function emptyTDs(x) {
    allHTMLTags = document.getElementsByTagName('td');

    for (i=0; i < allHTMLTags.length; i++) {
        if (allHTMLTags[i].className == x) {
            allHTMLTags[i].innerHTML = '';
        }
    }
}

function fixComments(x) {
    allHTMLTags = document.getElementsByTagName('div');
   comment = 0;
    for (i=0; i < allHTMLTags.length; i++) {
        if (allHTMLTags[i].className == x) {
            allHTMLTags[i].innerHTML = allHTMLTags[i].innerHTML + '-&nbsp;<a href="javascript:quoteMe('+comment+++');">Reply w/Quote</a>'; 
        }
    }
}

window.addEventListener('load', function(event) {
   var dojo = unsafeWindow["dojo"]; 
}, 'false');

function quoteMe(pos) {
    comments = dojo.query(".comment");
    quote = '';

    for (counter = 0; counter < comments[pos].childNodes[3].childNodes.length; counter++) {
        if (comments[pos].childNodes[3].childNodes[counter].length > 2) {       
            quote = quote + comments[pos].childNodes[3].childNodes[counter].nodeValue;
        }
    }   

    author = comments[pos].childNodes[1].childNodes[4].nodeValue.replace(/^\W*/,"");
    allHTMLTags = document.getElementsByTagName('textarea');
    
    for (i=0; i < allHTMLTags.length; i++) {
        if (allHTMLTags[i].className == "field") {
            allHTMLTags[i].value = author.replace(/\W*$/,"") + ' wrote:\n' + quote + '\n--- --- --- --- --- --- --- --- --- --- --- --- --- --- \n'; 
            allHTMLTags[i].focus();
        }
    }    
}
     
document.body.appendChild(document.createElement("script")).innerHTML = quoteMe;

kill("sm-banner-ad");
kill("lg-banner-ad");
kill("left");
kill("right");
$("banner").style.height = '50px';
$("center").style.margin = '10px 20px';

killDivs("adbox");
killDivs("related");
emptyTDs("ad");
fixComments("comment_info");