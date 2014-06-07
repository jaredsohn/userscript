// ==UserScript==
// @name           TalkToTheHand
// @namespace      http://vinnietesla.com/amusements/
// @description    hides Livejournal entries with selected tags
// @include        http://vinnie_tesla.livejournal.com/friends*
// ==/UserScript==

// This edition only works with the A Sturdy Gesture layout. You need
// to modify the @include field above, replacing my username with yours.

var kills = 0;
var blist = new Array();
var btags = new Array();



tagDivs = document.evaluate(
    "//a[@rel='tag']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < tagDivs.snapshotLength; i++) {
  var redx = document.createElement('span');
  redx.style.color = "#fcf";
  redx.style.fontWeight = "bold";
  redx.style.cursor = "pointer";
  var theex = document.createTextNode("x");
  redx.appendChild(theex);
  var thistag = tagDivs.snapshotItem(i);
  redx.setAttribute("tag", thistag.href)
    redx.setAttribute("tagname", thistag.text)
  var parent = thistag.parentNode;
   parent.insertBefore(redx , thistag.nextSibling);
   redx.addEventListener("click", killTag, false);
   redx.addEventListener("mouseover", changeColor, true);
   redx.addEventListener("mouseout", changeAgain, true);
   var baleeted = GM_getValue(thistag.href);

  if (baleeted > 0) {
    blist[kills] = thistag.href;
    btags[kills] = thistag.text;
    kills++;
    var walker = thistag.parentNode;
    while (walker.className != 'box') {
      walker = walker.parentNode
	}
    walker.parentNode.removeChild(walker);
  }
 }

if (kills > 0) {
  var main = document.getElementById("body");

  var report = document.createElement("div");
  report.setAttribute("class", "box");
  report.style.cursor = "pointer";
  report.style.fontWeight = "bold";
  report.style.color = "blue";
  report.addEventListener("click", popup, true);
  report.addEventListener("mouseover", changeColor, true);
  report.addEventListener("mouseout", changeBack, true);
  if (kills == 1){
  var killcount = document.createTextNode( "One entry deleted.")
    } else {
    var killcount = document.createTextNode( kills + " entries deleted.")
      }
  report.appendChild(killcount);
  main.insertBefore(report, main.firstChild);
 }

function killTag()
{
  tag = this.getAttribute("tag");
  tagname = this.getAttribute("tagname");
  if (confirm('Do you want to hide all entries by this user tagged "' + tagname +'"?'))
    {
    GM_setValue(tag, 1);
  location.reload();
    }

}

function changeColor()
{
  this.style.color = "red";
}

function changeAgain()
{
  this.style.color = "#eae";
}

function changeBack()
{
  this.style.color = "blue";
}

function popup()
{
  var deletedtags = document.createElement("div");
  deletedtags.style.color = "black";
  report.removeEventListener("click", popup, true);
  report.removeEventListener("mouseover", changeColor, true);
  report.removeEventListener("mouseout", changeBack, true);
  deletedtags.style.backgroundColor = "yellow";
  deletedtags.style.position = "absolute";
  deletedtags.style.border = "yellow outset .3em";
  deletedtags.style.padding = ".3em";
  var header = document.createTextNode("Select the tags for entries you want to restore.");
  deletedtags.appendChild(header);
  var contents = document.createElement("form");
  deletedtags.appendChild(contents)
  contents.setAttribute("name", "tagslist");
  contents.setAttribute("id", "tagslist");
  for (i=0; i < kills; i++)
     {
       var box = document.createElement("input");
       box.setAttribute("type", "checkbox");
       box.setAttribute("name", blist[i]);
       contents.appendChild(box);
       var caption = document.createElement("span");
       var username = blist[i].match(/[\w\-]+(?=\.)/);
	 GM_log(username);
       caption.appendChild(document.createTextNode(btags[i]+ " by " + username));
       contents.appendChild(caption);
       contents.appendChild(document.createElement("br"));
     }
  var undelete = document.createElement("input");
  undelete.setAttribute("type", "button");
  undelete.setAttribute("value", "undelete");
  undelete.setAttribute("name", "undelete");
  contents.appendChild(undelete);
  undelete.addEventListener("click", process, false);
  report.appendChild(deletedtags);

}

function process()
{
  var tagslist = document.forms.namedItem("tagslist");
  for (i = 0; i < kills; i++) {
    var tagzz = tagslist.elements.namedItem(blist[i]);
    if (tagzz.checked)
      {
	GM_log(blist[i]);
	GM_setValue(blist[i], 0);
      } 
  }
  location.reload();
}

