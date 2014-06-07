// ==UserScript==
// @name           Craiglist Live Filter
// @namespace      srawlins
// @description    Filter out listings with given words on Craigslist
// @include        http://*.craigslist.org/search/*
// ==/UserScript==

// v1.2

var clfDiv = document.createElement('div');
clfDiv.setAttribute("id", "clfDiv");
clfDiv.innerHTML = "<span>Filter:   </span>" +
  "<input type='radio' name='CLFfiltertype' value='regex' id='CLFregex' style='vertical-align: middle;' checked='checked' /><span>regex  </span>" +
  "<input type='radio' name='CLFfiltertype' value='words' id='CLFwords' style='vertical-align: middle;' /><span>words&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>" +
  "<input type='radio' name='CLFhidetype' value='gray' id='CLFgray' style='vertical-align: middle;' checked='checked' /><span>gray  </span>" +
  "<input type='radio' name='CLFhidetype' value='hide' id='CLFhide' style='vertical-align: middle;' /><span>hide</span>"
var clfDiv3 = document.createElement('br');
var clfDiv2 = document.createElement('textarea');
clfDiv2.cols = 48;
clfDiv2.rows = 3;
clfDiv2.spellcheck = false;
clfDiv2.addEventListener("keyup", updateFilter, false);
clfDiv.appendChild(clfDiv3);
clfDiv.appendChild(clfDiv2);
document.body.appendChild(clfDiv);
document.getElementById("CLFregex").addEventListener("click", updateFilterType, false);
document.getElementById("CLFwords").addEventListener("click", updateFilterType, false);
document.getElementById("CLFgray").addEventListener("click", updateFilterType, false);
document.getElementById("CLFhide").addEventListener("click", updateFilterType, false);

addGlobalStyle(
  "div#clfDiv {\n" +
  "  position: fixed;\n" +
  "  bottom: 5px;\n" +
  "  right: 5px;\n" +
  "  font-family: sans-serif;\n" +
  "  font-size: 0.8em;\n" +
  "  padding: 0.1em;\n" +
  "}\n\n" +

  "div#clfDiv * {\n" +
  "  vertical-align: middle;\n" +
  "}\n\n" +

  "div#clfDiv textarea {\n" +
  "  font-family: sans-serif;\n" +
  "  font-size: 1.1em;\n" +
  "}\n\n" +

  "blockquote p {\n" +
  "  padding-top: 6px;\n" +
  "  padding-bottom: 6px;\n" +
  "  margin: 0px;\n" +
  "}\n\n" +

  ".filterOK {\n" +
  "  font-size: 1em;\n" +
  "}\n\n" +

  ".filterOut {\n" +
  "  color: #999999;\n" +
  "  font-size: 0.8em;\n" +
  "  padding-top: 0px;\n" +
  "  padding-bottom: 0px;\n" +
  "}\n\n" +

  ".filterOut a {\n" +
  "  color: #999999;\n" +
  "}\n\n" +

  ".filterOut span.p {\n" +
  "  color: #999999;\n" +
  "}\n\n" +

  ".CLFinvert {\n" +
  "  background-color: #CCCCCC;\n" +
  "  color: #FFFFFF;\n" +
  "}\n"
);

var listings = document.evaluate("//blockquote[2]/p",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
for (var i = listings.snapshotLength - 1; i >= 0; i--) {
  var listing = listings.snapshotItem(i);
  for (var j = listing.childNodes.length - 1; j >= 0; j--) {
    if ( listing.childNodes[j].nodeName == "A" ) {
      listing.childNodes[j].innerHTML = listing.childNodes[j].innerHTML.toLowerCase();
      //listing.childNodes[j].innerHTML = listing.childNodes[j].innerHTML.replace(/[\x80-\xFFFF]/g, "X");
    }
    if ( listing.childNodes[j].nodeName == "FONT" ) { listing.childNodes[j].innerHTML = listing.childNodes[j].innerHTML.toLowerCase(); }
  }
}

var CLFtext = GM_getValue("CLFtext", "");
if (CLFtext != "") {
  clfDiv2.value = CLFtext;
  updateFilter();
}

var CLFregex = GM_getValue("CLFregex", true);
if (!CLFregex) {
  document.getElementById("CLFwords").checked = true;
  updateFilter();
}
var CLFgray  = GM_getValue("CLFgray", true);
if (!CLFgray) {
  document.getElementById("CLFhide").checked = true;
  updateFilter();
}


function updateFilterType(event) {
  GM_setValue("CLFregex", document.getElementById("CLFregex").checked);
  GM_setValue("CLFgray", document.getElementById("CLFgray").checked);
  updateFilter(event);
}


function updateFilter(event) {
  // Reset display, who knows what the user typed/untyped!
  for (var i = listings.snapshotLength - 1; i >= 0; i--) {
    var listing = listings.snapshotItem(i);
    listing.setAttribute("class", 'filterOK');
    listing.style.display = "block";
  }
  
  var inversions = document.evaluate("//*[@class='CLFinvert']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = inversions.snapshotLength - 1; i >= 0; i--) {
    var inversion = inversions.snapshotItem(i);
    inversion.parentNode.replaceChild(document.createTextNode(inversion.innerHTML), inversion);
  }
  
  
  // If blank, leave page "cleaned up"
  if (clfDiv2.value == "") { return false; }
  
  filterRegex = document.getElementById("CLFregex").checked;
  filterGray = document.getElementById("CLFgray").checked;
  if ( filterRegex ) {
    //detect and tweak bad input
    regString = clfDiv2.value.replace(/[|(]+$/, "")
    var regex = new RegExp(regString);
  } else {
    regString = clfDiv2.value.replace(/[,\s]+$/, "").replace(/,\s?(?=[^,\s])/g, "|")
    var regex = new RegExp(regString);
  }
  
  for (var i = listings.snapshotLength - 1; i >= 0; i--) {
    var listing = listings.snapshotItem(i);
    for (var j = listing.childNodes.length - 1; j >= 0; j--) {
      if ( listing.childNodes[j].nodeName == "A" ||
           listing.childNodes[j].nodeName == "FONT" ) {
        if ( listing.childNodes[j].innerHTML.match(regex) ) {
          if ( filterGray ) {
            listing.setAttribute("class", 'filterOut');
            listing.childNodes[j].innerHTML = listing.childNodes[j].innerHTML.replace(regex, "<span class='CLFinvert'>$&</span>");
            break;
          } else {
            listing.style.display = "none";
            break;
          }
        }
      }
    }
  }
  
  var adjustedHeight = clfDiv2.clientHeight;
  var maxHeight = 500
  if ( !maxHeight || maxHeight > adjustedHeight )
  {
    adjustedHeight = Math.max(clfDiv2.scrollHeight, adjustedHeight);
    if ( maxHeight )
      adjustedHeight = Math.min(maxHeight, adjustedHeight+5);
    if ( adjustedHeight > clfDiv2.clientHeight+5 )
      clfDiv2.style.height = adjustedHeight + "px";
  }
  
  GM_setValue("CLFtext", clfDiv2.value);
}


function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  } catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
      document.styleSheets[0].cssText += css;
  }
}