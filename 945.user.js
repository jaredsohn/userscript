// tpmcafewide.user.js
// miguel vargas
// v0.4
//
// ==UserScript==
// @name          TPMCafe Wide
// @description   Makes columns wide, adds nested comments and fixes a few link issues
// @include       http://*.tpmcafe.com/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#wrapper {width: auto!important;}' +
'#centercol {width: auto!important;}' +
'#header h1 {' +
'  margin-left: auto!important;' +
'  margin-right: auto!important;' +
'}' +
'#comments {' +
'  width: auto!important;' +
'  max-width: none!important;' +
'}' +
'#comments div {' +
'  width: auto!important;' +
'  max-width: none!important;' +
'}' +
'#comments p {' +
'  width: auto!important;' +
'  max-width: none!important;' +
'}' +
'#comments table {' +
'  width: auto!important;' +
'  max-width: none!important;' +
'}' +
'#comments form {' +
'  width: auto!important;' +
'  max-width: none!important;' +
'}' +
'#centercol form { width: auto!important;}' +
'.modsub {width: auto!important;}' +
'.modsub table {max-width: none!important;}'
);

//
//         Nested Comments
//

var padding = 40; //pixels to indent

//let's find stuff using XPath
var commentnumber = document.evaluate(
  '//div[@class="commenthead"]/a[@class="light"][1]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
var ratingslink = document.evaluate(
  '//div[@class="commenthead"]/a[2]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
var userstring = document.evaluate(
  '//div[@class="commenthead"]/br[1]/following-sibling::text()[1]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

var headdiv = document.evaluate(
  '//div[@class="commenthead"]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
var parentlink = document.evaluate(
  '//div[@class="commentbody"]/a[@class="light"][1] | //div[@class="commentbody"]/div[not(@class="commenthead")]/a[@class="light"][1] | //div[@class="commentbody"]/p/a[@class="light"][1]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
var bodydiv = document.evaluate(
  '//div[@class="commentbody"]',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);

var neststack = new Array(9999);
neststack[0]=-1;
for (var i = 0; i < commentnumber.snapshotLength; i++) {
  thisNumber = commentnumber.snapshotItem(i);
  thisReply = parentlink.snapshotItem(i);
  thisHead = headdiv.snapshotItem(i);
  thisBody = bodydiv.snapshotItem(i);
  thisRatingslink = ratingslink.snapshotItem(i);
  thisUserstring = userstring.snapshotItem(i);

  //change 'Parent' link to point to the existing page
  if (!thisReply.href.match(/post#here/)) {
    thisReply.href=thisReply.href.replace(/\/\d+#/,"#");
    thisReply.href=thisReply.href.replace(/comments/,"story");
  }

  //fix the ratings link bug
  thisRatingslink.href=thisRatingslink.href.replace(/\w+\.tpmcafe/,"www.tpmcafe");

  //add user link
  newdiv = document.createElement("div");
  newdiv.innerHTML = thisUserstring.textContent.replace(/by (.*) on/, "by <a href=\"http://www.tpmcafe.com/user/$1\">$1<\a> on");
  thisUserstring.parentNode.replaceChild(newdiv, thisUserstring);

  //extract parent and comment numbers
  re = /#(.+)/;
  l = re.exec(thisReply.attributes[0].value);
  parentnum = l[1];
  c = re.exec(thisNumber.attributes[0].value);
  comnum = c[1];

  if (isNaN(parentnum)) {
    parentnum = 0;
  }
  if (isNaN(neststack[parentnum])) {
    neststack[parentnum] = -1;
  }
  neststack[comnum] = neststack[parentnum] + 1;

  if (neststack[parentnum] == -1) continue;

  pad = neststack[comnum] * padding;
  pad = '0px 0px 0px ' + pad + 'px';

  range = document.createRange();
  range.setStart(thisHead.previousSibling, 0);
  range.setEnd(thisBody.nextSibling, 0);
  div = document.createElement('div');
  div.style.padding = pad;
  range.surroundContents(div);
}

//Get rid of <span> tags
var commenttext = document.evaluate(
  '//div[@class="commentbody"]/descendant::text()',
  document,
  null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
  null
);
for (var i = 0; i < commenttext.snapshotLength; i++) {
  thisText = commenttext.snapshotItem(i);
  thisText.textContent = thisText.textContent.replace(/\"*<span class=\"Apple-style-span\"*>/g, "");
  thisText.textContent = thisText.textContent.replace(/<\/span>/g, "");
}

