// ==UserScript==
// @name           LT Auto Link Replies - LibraryThing
// @namespace      http://userscripts.org/users/brightcopy
// @description    Automatically adds a link to the message number and possibly username when clicking the Reply links in Talk.
// @include        http*://*.librarything.tld/topic/*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
      case XPathResult.NUMBER_TYPE:
          p = 'numberValue';
          break;
      case XPathResult.STRING_TYPE:
          p = 'stringValue';
          break;
      case XPathResult.BOOLEAN_TYPE:
          p = 'booleanValue';
          break;
      case XPathResult.ANY_UNORDERED_NODE_TYPE:
      case XPathResult.FIRST_ORDERED_NODE_TYPE:
          p = 'singleNodeValue';
          break;
      default:
          return d.evaluate(x, r, null, 
              t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    var result = d.evaluate(x, r, null, t, null);
    if (result != null)
      result = result[p];
    
    return result;
}

function $x1(x, r) {
  return $x(x, XPathResult.ANY_UNORDERED_NODE_TYPE, r)
} 

function firstElementChild(node) {
  if (node.firstElementChild !== undefined)
    return node.firstElementChild;
  else {
    node = node.firstChild;
    if (node.nodeType == Node.ELEMENT_NODE)
      return node;
    else
      return nextElementSibling(node);
  }
}

function lastElementChild(node) {
  if (node.lastElementChild !== undefined)
    return node.lastElementChild;
  else {
    node = node.lastChild;
    if (node.nodeType == Node.ELEMENT_NODE)
      return node;
    else
      return previousElementSibling(node);
  }
}

function nextElementSibling(node) {
  if (node.nextElementSibling !== undefined)
    return node.nextElementSibling;
  else {
    while (node = node.nextSibling() && node.nodeType != Node.ELEMENT_NODE);
  
    return node;
  }
}

function previousElementSibling(node) {
  if (node.previousElementSibling !== undefined)
    return node.previousElementSibling;
  else {
    while (node = node.previousSibling() && node.nodeType != Node.ELEMENT_NODE);
  
    return node;
  }
}

var config = $x1('.//td', document.getElementById('talkpostte_0').parentNode).
    appendChild(document.createElement('div'));

config.setAttribute('style', 'display: inline-block; width: 100%; text-align: right;');
var a = config.appendChild(document.createElement('a'));
a.appendChild(document.createTextNode('LT Auto-link config'));
a.setAttribute('href', '#');
a.setAttribute('style', 'margin-right:1em');
a.addEventListener('click', configClick, false);


var links = $x('//div[@class="ed" and .//a[@onclick=\"fm(this)\"]]');

for (var i = 0; i < links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  
  var reply = firstElementChild(link);
  
  if (nextElementSibling(reply).getAttribute('onclick') == 'sm(this)')
    reply.addEventListener('click', replyClick, false);
  
  var span = lastElementChild(link);
  span.appendChild(document.createTextNode(' | '));
  var a = span.appendChild(document.createElement('a'));
  a.appendChild(document.createTextNode('Ref'));
  a.setAttribute('title', 'Adds a linked reference to this post in the posting area (LT Auto-link Replies)');
  a.setAttribute('href', '#');
  a.addEventListener('click', referClick, false);
}

var PROMPT_DEFAULT = '#MESSAGE by MEMBER> ';

function referClick(e) {
  var posts = $x('//textarea[@class="talkpostte"]');
  
  for (var i = 0; i < posts.snapshotLength; i++) {
    var post = posts.snapshotItem(i);
    
    if (document.getElementById('hform_' + post.id.
        slice('talkpostte_'.length)).style.display != 'none') {
      post.value = post.value + '\n\n' + 
          getLink(firstElementChild(this.parentNode.parentNode));
      break;
    }
  }
  
  e.preventDefault();
}

function configClick(e) {
  var value = prompt(
      'Enter the format to use for the inserted reference.  The text'
      + ' "MESSAGE" (all capitals) will be replaced with a link to the message number.  The'
      + ' text "USER" (again, all capitals) will be replaced with a link to the member\'s profile.'
      + '  The text "\\n" will add a carriage return.\n\n'
      + ' Examples: \n'
      + '   MESSAGE> \n'
      + '   MEMBER: \n'
      + '   Reply to message MESSAGE by MEMBER\\n\n\n'
      + ' The default:\n'
      + '   MESSAGE by MEMBER> \n'
      , GM_getValue('ltalPrompt', PROMPT_DEFAULT));
  
  if (value)
    GM_setValue('ltalPrompt', value);
  
  e.preventDefault();
}

function getLink(elem) {
  var message = elem.parentNode.parentNode.id.slice(2);
  var ltalPrompt = GM_getValue('ltalPrompt', PROMPT_DEFAULT);
  var header = document.getElementById('mh' + message);
  var numElem = firstElementChild(header);
  var num = numElem.textContent;
  var memberElem = nextElementSibling(numElem);
  if (memberElem.nodeName == 'IMG')
    memberElem = nextElementSibling(memberElem);
  
  var member = memberElem.textContent;
  var messageLink = '<a href="#' + message + '">' + num + '</a>';
  var memberLink = '@' + member;
  
  return ltalPrompt.replace(/MEMBER/, memberLink).replace(/MESSAGE/, messageLink);
}

function replyClick(e) {
  var message = this.parentNode.parentNode.id.slice(2);
  var txt = getLink(this);

  replyLoop(message, txt);
}

function replyLoop(message, txt) {
  var box = document.getElementById('talkpostte_' + message);

  if (box) {
    if (box.value.substring(0, txt.length) != txt)
      box.value = txt + box.value;
  }
  else {
    var t = this;
    setTimeout(
        function () {
          replyLoop.apply(t, [message, txt])
        }
    , 200);
  }
}