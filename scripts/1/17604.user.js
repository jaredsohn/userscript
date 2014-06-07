// ==UserScript==
// @name             Google Music Search
// @namespace        sizzlemctwizzle
// @description      Search for Music with Google
// @include          http://www.google.*/
// @include          http://www.google.*/webhp?*
// @include          http://www.google.*/search?*#music
// ==/UserScript==

function newsubmit(event) {
    var target = event ? event.target : this;
    target.action = target.action + "#music";
    value = document.getElementById('fakesearch').value;
    document.getElementsByName("q")[0].value = 'intitle:"index.of" (mp4|mp3) ' + value.replace( /[ \t]/g, "." ) + ' -asp -htm -html -cf -jsp';
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function remove(element) {
    element.parentNode.removeChild(element);
}

function musicSearch() {
document.getElementsByTagName("img")[0].src = "data:image/gif;base64,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";
document.getElementsByTagName("img")[0].height = "110";
document.getElementsByTagName("img")[0].width = "276";
remove(document.getElementsByName("btnI")[0]);
document.getElementsByName("btnG")[0].value = "Google Music Search";

searchform = document.getElementsByTagName("form")[0];
fake = document.createElement("input");
fake.maxlength = "2048";
fake.size = "55";
fake.value = document.getElementsByName("q")[0].value;
fake.title = "Google Search";
fake.id = "fakesearch";
insertAfter(fake, document.getElementsByName("q")[0]);
document.getElementsByName("q")[0].type = "hidden";
document.getElementsByName("q")[0].id = "realsearch";

bannertext = document.createElement("p");
bannertext.innerHTML = '<font color="#224499"><b>Your source for free music!</b></font><br><br>';
insertAfter(bannertext, searchform);

var body = document.body;
actionval = document.getElementsByTagName("form")[0].action;
var onUnloadCode = "document.getElementsByTagName('form')[0].action = '" + actionval + "';";
body.setAttribute('onUnload',onUnloadCode);

document.title = "Google Music Search";
var dev = document.evaluate(
	'//span[@class="gb1"]', 
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

c = dev.snapshotItem(0);
c.innerHTML = '<a href="http://www.google.com/webhp?hl=en&amp;tab=iw">Web</a>';
document.getElementById("music").innerHTML = "Music";
window.addEventListener('submit', newsubmit, true);
document.getElementById('fakesearch').focus();
}

var dev = document.evaluate(
	'//span[@class="gb1"]', 
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

c = dev.snapshotItem(1);
span = document.createElement("span");
span.innerHTML = '<a href="javascript:void(0);">Music</a>';
span.id = "music";
span.className = "gb1";
insertAfter(span, c);

if (window.location.hash != "#music") {
span.addEventListener('click', musicSearch, false);
} else {
var dev = document.evaluate(
	'//span[@class="gb1"]', 
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

c = dev.snapshotItem(0);
c.innerHTML = '<a href="http://www.google.com/webhp?hl=en&amp;tab=iw">Web</a>';
document.getElementById("music").innerHTML = "Music";
dev.snapshotItem(1).innerHTML = '<a href="http://images.google.com/imghp?hl=en&tab=wi">Images</a>';

if (document.getElementsByName("q")[0].value.split(')')[1] != null) {
value = document.getElementsByName("q")[0].value.split(')')[1].split(' ')[1].split('-')[0];
} else {
value = document.getElementsByName("q")[0].value;
}
document.getElementsByName("q")[0].value = value.replace(/\./g, ' ');
document.title = "Google Music Searched for " + value.replace(/\./g, ' ');
fake = document.createElement("input");
fake.maxlength = "2048";
fake.size = "41";
fake.value = document.getElementsByName("q")[0].value;
fake.title = "Google Search";
fake.id = "fakesearch";
insertAfter(fake, document.getElementsByName("q")[0]);
document.getElementsByName("q")[0].type = "hidden";
document.getElementsByName("q")[0].id = "realsearch";
if (document.getElementsByName("q")[1] != null) {
remove(document.getElementsByName("q")[1]);
remove(document.getElementsByName("btnG")[1]);
}
var body = document.body;
actionval = document.getElementsByTagName("form")[0].action;
var onUnloadCode = "document.getElementsByTagName('form')[0].action = '" + actionval + "';";
body.setAttribute('onUnload',onUnloadCode);
navbar = document.getElementById("navbar");
links = navbar.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
links[i].href = links[i].href + "#music";
}
window.addEventListener('submit', newsubmit, true);

}