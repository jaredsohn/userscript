// ==UserScript==
// @name           4chan filter
// @namespace      http://userscripts.org/users/64431
// @description    Regular expression, point-and-click filtering
// @include        http://boards.4chan.org/*
// @include        http://dis.4chan.org/*
// @include        http://archive.easymodo.net/cgi-board.pl/*
// @include        http://4chanarchive.org/brchive/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @version        6.4.0-mod-4chanX-2.2.1
// @delay          100
// @copyright      2009, 2010, James Campos
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+, Opera 10.50+, Chrome 4+
// ==/UserScript==

//TODO
// fychan
// dimensions entering should have an immediate effect
// standardized movement
// object for filter lists
// pnc filtering doesn't work on easymodo
// new switches: -t temp, -F replies WITH files, -o -O op/not op (or reverse?)

(function() {// <- Opera wrapper

//x-browser
// if (typeof GM_deleteValue == 'undefined') {
  GM_addStyle = function(css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  GM_deleteValue = function(name) {
    localStorage.removeItem(name);
  }

  GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)
      return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
      case 'b':
        return value == 'true';
      case 'n':
        return Number(value);
      default:
        return value;
    }
  }

  GM_log = function(message) {
    console.log(message);
  }

   GM_registerMenuCommand = function(name, funk) {
  //todo
  }

  GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  }
//}

//define
function $(selector, root) {
  if (!root) root = document.body;
  return root.querySelector(selector);
}

function $$(selector, root) {
  if (!root) root = document.body;
  var result = root.querySelectorAll(selector);
  var a = [];
  for (var i = 0, l = result.length; i < l; i++)
    a.push(result[i]);
  return a;
}

function x(xpath, root) {
  if (!root) root = document.body;
  return document.evaluate(xpath, root, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function X(xpath, root) {
  if (!root) root = document.body;
  var result = document.evaluate(xpath, root, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var a = [], item;
  while (item = result.iterateNext())
    a.push(item);
  return a;
}

//main
if (!$('blockquote')) return;

if (!String.trim)//lol opera
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
  }

GM_addStyle("\
#thread_filter { color: inherit; text-align: right; font-size:16px; z-index:1; }\
#thread_filter > div:first-child { cursor: move; }\
#thread_filter > div:not(:first-child) > span,\
#thread_filter label,\
#thread_filter a\
 { cursor: pointer }\
#thread_filter .autohide { display: none }\
#thread_filter:hover .autohide,\
#thread_filter:active .autohide\
 { display: block }\
#thread_filter > div,\
#thread_filter.reply.autohide:not(:hover) > div\
 { padding: 0 5px 0 0; }\
#thread_filter.reply > div:first-child { padding: 10px 10px 0 10px }\
#thread_filter.reply > div:last-child { padding: 0 10px 10px 10px }\
#thread_filter.reply > div:not(:first-child):not(:last-child) { padding: 0 10px 0 10px }\
#thread_filter.reply:not(.autohide),\
#thread_filter.reply.autohide:hover\
 { border: 2px ridge; }\
#thread_filter.autohide:not(:hover)\
 { background: transparent; }\
")
// Temporary MD5 class style. Ugly solution for now
GM_addStyle(".md5Div {padding: 10px 0 0 30px; font-style: italic;}")

var dialog = document.createElement('div');
dialog.innerHTML = '\
<div>\
  <span></span><br>\
  <span></span>\
</div>\
<div>\
  <select></select> <label>Fappe Tyme<input type="checkbox"></label><br>\
  <span>Name</span> <input><br>\
  <span>Tripcode</span> <input><br>\
  <span>Email</span> <input><br>\
  <span>Subject</span> <input><br>\
  <span>Comment</span> <input><br>\
  <span>File</span> <input><br>\
  <span>MD5 Sums</span> <input><br>\
</div>\
<div style="display: none;">\
  <label>Min Width <input maxlength="4" size="2"></label><br>\
  <label>Min Height <input maxlength="4" size="2"></label><br>\
  <label>Manual Filtering<input type="checkbox"></label><br>\
  <label>Global Default<input type="checkbox"></label><br>\
  <label>Show Stubs<input type="checkbox"></label><br>\
  <label>Auto Tyme<input type="checkbox"></label><br>\
  <label>Alternate Skin<input type="checkbox"></label><br>\
  <label>Sticky<input type="checkbox"></label><br>\
</div>\
<div>\
  <a title="The characters .*+?^${}()|[]/\\ are RegEx operators. Prefix them with a backslash to make them behave normally (? -> \\?).">hide</a> \
  <a title="Show filtered posts">show</a> \
  <a title="Switch between main/advanced controls">adv</a> \
  <a title="Auto-hide dialog box">auto</a>\
</div>';
dialog.id = 'thread_filter';
dialog.style.position = GM_getValue('Sticky', true) ? 'fixed' : 'absolute';
if (GM_getValue('right', true))
  dialog.style.right = GM_getValue('right', 0);
else
  dialog.style.left = GM_getValue('left');
if (GM_getValue('top', true))
  dialog.style.top = GM_getValue('top', 0);
else
  dialog.style.bottom = GM_getValue('bottom');

const reply = /res|read|archive\/|thread/.test(window.location.pathname);//imageboard|textboard|suptgarchive|4chanarchive+easymodo
try{const site = window.location.hostname.match(/\.(\w+)/)[1]} catch(e){};// using try/catch because my saved test pages don't have url formatted filneames
const server = location.hostname.match(/(\w+)?/)[0];
const tripx =
  site == 'easymodo' ? ".//span[@class='postertrip']" :
  server == 'dis' ? './/span[@class="postertrip"]' :
  "./span[@class='postertrip']|./a/span[@class='postertrip']";
//we can't just use the dis xpath because on the imageboards,
// replies are children of the OP, and we don't want to filter
// the entire thread just because of one reply.
const filex = site == 'easymodo' ? "./span" : "./span[@class='filesize']";
const imagex = site == 'easymodo' ? ".//img[@class='thumb']" : ".//img[@md5]|//span[@class='tn_reply' or @class='tn_thread']";
switch (site) {
  case 'thisisnotatrueending':
    var board = '\/tg\/';
    break;
  case 'easymodo':
    board = window.location.pathname.match(/\.pl(\/\w+)/)[1] + '/';
    break;
  default:// use .+? for i18n.
    board = window.location.pathname.match(/(\/read)?(\/.+?\/)/)[2];
}
const manual = GM_getValue('Manual Filtering', true);
const stubs = GM_getValue('Show Stubs');
var replies = X('.//blockquote/parent::td');
var imageCount = X(imagex).length;
var sumCount = 0;
var threads = X("./form/div/div[@id!='footer'][not(contains(@id,'hidden'))]"); //MOD

var posts = $$('.post');//Text Boards
var disSubjects = $$('span.replies + a');
var hideCount = 0;
var listBoard = board;
var replyHidden = JSON.parse(GM_getValue(board + 'manual', '[]'));
var now = new Date().getTime();
var cutoff = now - (7 * 24 * 60 * 60 * 1000);//prune after seven days
while (replyHidden.length && replyHidden[0].timestamp < cutoff)
  replyHidden.shift();
GM_setValue(board + 'manual', JSON.stringify(replyHidden));

var postCount = (posts.length || threads.length) ? posts.length + threads.length + replies.length : $$('blockquote').length;

$('div:first-child', dialog).addEventListener('mousedown', startMove, true);
$('div:first-child > span:first-child', dialog).textContent = 'Images: ' + imageCount + ' Posts: ' + postCount;

var list = $('select', dialog);
list.addEventListener('mouseup', loadValues, true);//the 'change' event is kinda weird.
list.addEventListener('keyup', loadValues, true);

var option = document.createElement('option');
option.textContent = 'global';
list.appendChild(option);
option = document.createElement('option');
option.textContent = board;
list.appendChild(option);
if (!GM_getValue('Global Default'))
  option.selected = true;

var remainingBoards = GM_getValue('boardList', '').replace(board, '').match(/\/\w+\//g);
for (var i in remainingBoards) {
  var option = document.createElement('option');
  option.textContent = remainingBoards[i];
  list.appendChild(option);
}

var filters = $$('div:nth-child(2) input:not([type])', dialog);
for (var i = 0, l = filters.length; i < l; i++) {
  var span = filters[i].previousElementSibling;
  span.addEventListener('click', expandInput, true);
  var name = span.textContent;
  filters[i].value = GM_getValue(list.value + name, '');
  filters[i].addEventListener('keypress', function(event) { if (event.keyCode == 13) applyF() }, true);
}

var boxes = $$('input[type="checkbox"]', dialog);
var hideText = boxes[0];// Expand Images can get added
if (GM_getValue('Auto Tyme'))
  hideText.checked = GM_getValue('Fappe Tyme');
hideText.addEventListener('click', switcher, true);
for (var i = 1, l = boxes.length; i < l; i++) {
  var text = boxes[i].previousSibling.nodeValue;
  var defaultValue = false;
  switch (text) {
    case 'Manual Filtering':
      defaultValue = true;
      break;
    case 'Sticky':
      defaultValue = true;
      break;
  }
  boxes[i].checked = GM_getValue(text, defaultValue);
  boxes[i].addEventListener('click', switcher, true);
}

var dimensions = $$('input[size]', dialog);
for (var i = 0, l = dimensions.length; i < l; i++) {
  dimensions[i].value = GM_getValue(dimensions[i].previousSibling.nodeValue.trim(), 0);
}

var anchors = $$('a', dialog);
anchors[0].addEventListener('click', applyF, true);
anchors[1].addEventListener('click', reset, true);
anchors[2].addEventListener('click', advF, true);
anchors[3].addEventListener('click', autoHideF, true);

var omitted = $$('.omittedposts');
for (var i = 0, l = omitted.length; i < l; i++) {//getPosts on thread collapse. Does this work w/ 4chan x?
  omitted[i].addEventListener('DOMCharacterDataModified', function() { if (/^\d/.test(this.textContent)) getPosts() }, true);//4chan extension
  var button = omitted[i].previousSiblingElement;
  if (button)
    button.addEventListener('DOMAttrModified', function() { if (this.textContent=='+') getPosts() }, true);
}

if (manual)
  addReplyHiding(document.body);
if (reply)
  addSum(document.body);
document.body.addEventListener('DOMNodeInserted', function(e){if(e.target.nodeName=='TABLE') getPosts($('.reply', e.target))}, true);
autoHideF();
document.body.appendChild(dialog);
applyF();

//functions

//Add MD5 sum to the blockquote
function addSum(root) {
	var tmp = $('blockquote', root);
	var childDiv = document.createElement('DIV');
	childDiv.appendChild(document.createTextNode('MD5: '));
	var tempImage = x(".//img[@md5]|.//span[@class='tn_reply']", root);
	childDiv.appendChild(document.createTextNode(tempImage.getAttribute("md5")));
	childDiv.setAttribute("class","md5Div");
	tmp.appendChild(childDiv);
}

function addReplyHiding(root) {
  var spans = $$('[id^=norep]', root);
  for (var i = 0, el; el = spans[i]; i++) {
    var toggle = document.createElement('a');
    toggle.style.cursor = 'pointer';
    toggle.className = 'pointer';
    toggle.addEventListener('click', handleReply, true);
    toggle.textContent = 'Hide';
    el.parentNode.insertBefore(toggle, el.nextSibling);
    el.parentNode.insertBefore(document.createTextNode(' '), toggle);
  }
}

function hideReply(toggle, bq, click) {
  if (manual && stubs) {
    bq.style.display = 'none';
    toggle.textContent = 'Show';
    var prev = bq.previousSibling;
    if (prev.href)//image
      prev.style.display = 'none';
  } else
    toggle.parentNode.parentNode.style.display = 'none';
  if (click) {
    replyHidden.push({
      id: bq.parentNode.id,
      timestamp: new Date().getTime()
    });
    GM_setValue(board + 'manual', JSON.stringify(replyHidden));
  }
}

function showReply(toggle, bq, click) {
  bq.style.display = '';
  toggle.textContent = 'Hide';
  bq.previousSibling.style.display = '';
  if (click) {
    var id = bq.parentNode.id;
    for (var i in replyHidden) {
      if (replyHidden[i].id == id)
        replyHidden.splice(i, 1);
    }
    GM_setValue(board + 'manual', JSON.stringify(replyHidden));
  }
}

function handleReply() {
  var bq = x("following::blockquote", this);
  if (this.textContent == 'Show')
    showReply(this, bq, true);
  else
    hideReply(this, bq, true);
}

function getPosts(el) {
  if (el) {
    if (manual)
      addReplyHiding(el);
    var tempImage = x(".//img[@md5]|.//span[@class='tn_reply']", el);
	if (tempImage)
      imageCount++;
    if (hideText.checked && !tempImage) {
      el.parentNode.style.display = 'none';
      hideCount++;
    } else if (spam(el)) {
      el.parentNode.style.display = 'none';
      hideCount++;
    }
    replies.push(el);
    var hideSpan = $('div:first-child span:last-child', dialog);
    hideSpan.textContent = 'Hidden Posts: ' + hideCount;
  } else {
    imageCount = X(imagex).length;
    replies = X('.//blockquote/parent::td');
    hideCountF();
  }
  var postCount = reply ? replies.length + 1 : threads.length ? threads.length + replies.length : $$('blockquote').length;
  $('div:first-child > span:first-child', dialog).textContent = 'Images: ' + imageCount + ' Posts: ' + postCount;
}

function reset() {
  if (!reply)
    for (var i = 0; i < threads.length; i++) {
      var prev = threads[i].previousSibling;
      if (!prev || prev.nodeName == 'HR' || /^▲/.test(prev.textContent)) {
        threads[i].parentNode.style.display = ''; //MOD
        threads[i].parentNode.nextSibling.style.display = ''; //MOD
      }
    }
  if (manual && stubs)
    for (var i in replies)
      showReply($('.pointer', replies[i]), $('blockquote', replies[i]));
  else
    for (var i in replies)
      replies[i].parentNode.style.display = '';
  for (var i = 0; i < posts.length; i++) {
    posts[i].parentNode.parentNode.style.display = '';
    posts[i].style.display = '';
  }
  if (hideText.checked)
    hideTextF(true);
  else if (this.nodeName)//Don't call hideCountF() in the middle of applyF()
    hideCountF();
}

function switcher() {
  var name = this.previousSibling.nodeValue;
  var checked = this.checked;
  GM_setValue(name, checked);
  switch(name) {
    case 'Alternate Skin':
      skinF(checked);
      break;
    case 'Fappe Tyme':
      hideTextF(checked);
      break;
    case 'Sticky':
      dialog.style.position = checked ? 'fixed' : 'absolute';
      break;
    }
}

function hideTextF(checked) {
  if (checked) {
    const minWidth = GM_getValue('Min Width');
    const minHeight = GM_getValue('Min Height');
    for (var i in replies) {
      if (!x(filex, replies[i]))
        replies[i].parentNode.style.display = 'none';
      else if (site != 'easymodo') {
        var type = x("./span[@class='filesize']/a", replies[i]);
        if (type.textContent.match(/[a-z]+/) == 'gif')
          continue;
        var size = x("./span[@class='filesize']/text()[2]", replies[i]);
        size = size.textContent.match(/(\d+)x(\d+)/);
        if (Number(size[1]) < minWidth)
          replies[i].parentNode.style.display = 'none';
        else if (Number(size[2]) < minHeight)
          replies[i].parentNode.style.display = 'none';
      }
    }
    hideCountF();
  } else {
    if (manual && stubs)
      for (var i in replies)
        replies[i].parentNode.style.display = '';
    else
      applyF();
  }
}

var specialCom;
var specialTag;
var names;
var tripcodes;
var emails;
var subjects;
var comments;
var files;
var sums;
function applyF() {
  var prefix = list.value;
  for (var i = 0, l = filters.length; i < l; i++)
    GM_setValue(prefix + filters[i].previousElementSibling.textContent, filters[i].value);
  for (var i = 0, l = dimensions.length; i < l; i++) {
    if (!dimensions[i].value.length || isNaN(dimensions[i].value) || dimensions[i].value < 0)
      dimensions[i].value = 0;
    GM_setValue(dimensions[i].previousSibling.nodeValue.trim(), dimensions[i].value);
  }

  specialTag = [];
  specialCom = [];
  names = fetch('Name');
  tripcodes = fetch('Tripcode');
  emails = fetch('Email');
  subjects = fetch('Subject');
  comments = fetch('Comment');
  files = fetch('File');
  sums = fetch('MD5 Sums');
  var nonEmpty;

  function fetch(el) {
    var temp = GM_getValue(board + el);
    if (temp)
      nonEmpty = true;
    else
      GM_deleteValue(board + el);
    temp += ';' + GM_getValue('global' + el, '');
    var rawMatches = temp.match(/[^\s;][^;]*/g);
    var filterList = new Array;
    if (rawMatches) {
      if (el == 'Comment')
        for (var i = 0, l = rawMatches.length; i < l; i++) {
          var raw = rawMatches[i];
          var tempArray = raw.match(/(?: -([fhi]{1,3}))?( ?#.*)?$/);
          var match = tempArray[0],
              tags  = tempArray[1];
          s = raw.substr(0, raw.length - match.length);
          if (tags) {
            var filter = new RegExp(s, /i/.test(tags) ? '' : 'i');
            tags = tags.replace(/i/, '');
            if (tags.length) {
              specialTag.push(tags);
              specialCom.push(filter);
            } else
              filterList.push(filter);
          } else
            filterList.push(new RegExp(s, 'i'));
        }
      else
        for (var i = 0, l = rawMatches.length; i < l; i++) {
          raw = rawMatches[i];
          tempArray = raw.match(/(?: -(i))?( ?#.*)?$/);
          match = tempArray[0],
              tags = tempArray[1];
          s = raw.substr(0, raw.length - match.length);
          filterList.push(new RegExp(s, tags ? '' : 'i'));
        }
      }
    return filterList;
  }
  var boardList = GM_getValue('boardList', '');
  if (nonEmpty && prefix != 'global' && boardList.indexOf(prefix) == -1)
    GM_setValue('boardList', boardList + prefix);
  else if (!nonEmpty)
    GM_setValue('boardList', boardList.replace(prefix, ''));
  //reset(); //MOD
  if (!reply) {
    for (var i in threads) {
      if (spam(threads[i])) {
        threads[i].parentNode.style.display = 'none'; //MOD
        //threads[i].parentNode.nextSibling.style.display = 'none'; //MOD
		
		var childDiv = document.createElement('DIV');
		childDiv.innerHTML = "Hidden Thread"
		childDiv.setAttribute("class","md5Div");
		threads[i].parentNode.parentNode.insertBefore(childDiv, threads[i].parentNode.nextSibling);
      }
    }
  }
  if (stubs) {
    for (var i in replies)
      if (spam(replies[i]))
        hideReply($('.pointer', replies[i]), $('blockquote', replies[i]));
  } else {
    for (var i in replies)
      if (spam(replies[i]))
        replies[i].parentNode.style.display = 'none';
  }
  posts.forEach(function (post) {
    if (spam(post)) {
      if ($('.postnum', post).textContent == 1 && !reply)//OP
        post.parentNode.parentNode.style.display = 'none';
      else
        post.style.display = 'none';
    }
  });
  if (subjects) {//this is kind of ugly
    disSubjects.forEach(function (sub) {
      for (j in subjects)
        if (subjects[j].test(sub.textContent))
          sub.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
    });
  }

  hideCountF();
}

function spam(el) {
  var temp = el.id;
  
  for (var i in replyHidden) {
    if (temp == replyHidden[i].id)
      return true;
  }
  var bq = $('blockquote', el);
  if(!bq) return false; //MOD
  bqTC = bq.textContent;
  bqIH = bq.innerHTML;
  for (var i in comments)
    if (comments[i].test(bqTC))
      return true;
  if (specialCom)
    for (var i in specialCom) {
      if (/f/.test(specialTag[i]) && x(filex, el))
        continue;
      temp = /h/.test(specialTag[i]) ? bqIH : bqTC;
      if (specialCom[i].test(temp))
        return true;
    }
  var n = x(".//span[@class='postername' or @class='commentpostername']", el);
  for (var i in names)
    if (names[i].test(n.textContent))
      return true;
  if (files) {
    temp = x(filex, el);
    if (temp)
      for (j in files)
        if (files[j].test(temp.textContent))
          return true;
  } if (tripcodes) {
    temp = x(tripx, el);
    if (temp)
      for (j in tripcodes)
        if (tripcodes[j].test(temp.textContent))
          return true;
  } if (emails) {
    temp = $('a', n);
    if (temp)
      for (j in emails)
        if (emails[j].test(decodeURIComponent(temp.href.slice(7))))//slice off mailto:
          return true;
  } if (subjects) {
    temp = el.nodeName == "DIV" ? $('.filetitle', el) : $('.replytitle', el);
    if (temp)
      for (j in subjects)
        if (subjects[j].test(temp.textContent))
          return true;
  }
  
  //MD5 filtering
   if (sums) {
    var tempImage = x(".//img[@md5]|.//span[@class='tn_reply']", el);
	if (tempImage) {
	 addSum(el);
	 for (k in sums) {
		if (sums[k].test(tempImage.getAttribute("md5"))) {
		  return true;
		}
	 }
	}
   }
}

//GUI
var height;
var initial_mouseX;
var initial_mouseY;
var initial_boxX;
var initial_boxY;
function startMove(event) {
  height = Math.min(document.documentElement.clientHeight, document.body.clientHeight);
  initial_mouseX = event.clientX;
  initial_mouseY = event.clientY;
  if (dialog.style.right)
    initial_boxX = parseInt(dialog.style.right);
  else
    initial_boxX = document.body.clientWidth - dialog.offsetWidth - parseInt(dialog.style.left);
  if (dialog.style.top)
    initial_boxY = parseInt(dialog.style.top);
  else
    initial_boxY = height - dialog.offsetHeight - parseInt(dialog.style.bottom);
  document.addEventListener('mousemove', move, true);
  document.addEventListener('mouseup', endMove, true);
}

function move(event) {
  var right = initial_boxX + initial_mouseX - event.clientX;
  var left = document.body.clientWidth - dialog.offsetWidth - right;
  dialog.style.left = '';
  if (left < right) {
    dialog.style.right = '';
    dialog.style.left = left + 'px';
    if (left < 25)
      dialog.style.left = 0;
  } else if (right < 25)
    dialog.style.right = 0;
  else
    dialog.style.right = right + 'px';

  var top = initial_boxY - initial_mouseY + event.clientY;
  var bottom = height - dialog.offsetHeight - top;
  dialog.style.bottom = '';
  if (bottom < top) {
    dialog.style.top = '';
    dialog.style.bottom = bottom + 'px';
    if (bottom < 25)
      dialog.style.bottom = 0;
  } else if (top < 25)
    dialog.style.top = 0;
  else
    dialog.style.top = top + 'px';
}

function endMove() {
  document.removeEventListener('mousemove', move, true);
  document.removeEventListener('mouseup', endMove, true);
  GM_setValue('right', dialog.style.right);
  GM_setValue('left', dialog.style.left);
  GM_setValue('top', dialog.style.top);
  GM_setValue('bottom', dialog.style.bottom);
}

function expandInput() {
  var input = this.nextElementSibling;
  if (input.style.display != 'none') {
    input.style.display = 'none';
    var textArea = document.createElement('textarea');
    textArea.cols = 23;
    textArea.rows = 5;
    textArea.value = input.value;
    textArea.addEventListener('change', function() { this.previousElementSibling.value = this.value }, true);
    this.parentNode.insertBefore(textArea, input.nextSibling);
    this.appendChild(document.createElement('br'));
    textArea.focus();
  } else {
    this.removeChild(this.lastChild);//remove <br>
    this.parentNode.removeChild(input.nextSibling);//remove textArea
    input.style.display = '';
    input.focus();
  }
}

function autoHideF() {
  var autoHide = $('a:nth-of-type(4)', dialog);
  var adv = $('a:nth-of-type(3)', dialog);
  var hideSpan = $('div:first-child span:last-child', dialog);
  var mainDiv = $('div:nth-child(2)', dialog);
  var advDiv = $('div:nth-child(3)', dialog);
  var buttonsDiv = $('div:last-child', dialog);
  var skin = GM_getValue('Alternate Skin');
  if (this.nodeName)
    GM_setValue('autohide', !GM_getValue('autohide'));
  if (GM_getValue('autohide')) {
    autoHide.innerHTML = '<b>auto</b>';
    hideSpan.className = 'autohide';
    adv.textContent == 'adv' ? mainDiv.className = 'autohide' : advDiv.className = 'autohide';
    buttonsDiv.className = 'autohide';
    dialog.className = skin ? 'autohide' : 'reply autohide';
  } else {
    autoHide.innerHTML = 'auto';
    hideSpan.className = '';
    mainDiv.className = '';
    advDiv.className = '';
    buttonsDiv.className = '';
    dialog.className = skin ? '' : 'reply';
  }
}

function advF() {
  var mainDiv = $('div:nth-child(2)', dialog);
  var advDiv = $('div:nth-child(3)', dialog);
  if (this.textContent == 'adv') {
    this.textContent = 'main';
    mainDiv.style.display = 'none';
    advDiv.style.display = '';
    if (GM_getValue('autohide')) {
      mainDiv.className = '';
      advDiv.className = 'autohide';
    }
  } else {
    this.textContent = 'adv';
    mainDiv.style.display = '';
    advDiv.style.display = 'none';
    if (GM_getValue('autohide')) {
      mainDiv.className = 'autohide';
      advDiv.className = '';
    }
  }
}

function skinF(useClear) {
  if (GM_getValue('autohide'))
    dialog.className = useClear ? 'autohide' : 'reply autohide';
  else
    dialog.className = useClear ? '' : 'reply';
}

function loadValues() {
  for (var i = 0, l = filters.length; i < l; i++)
    GM_setValue(listBoard + filters[i].previousElementSibling.textContent, filters[i].value);
  listBoard = list.value;
  for (var i = 0, l = filters.length; i < l; i++)
    filters[i].value = GM_getValue(listBoard + filters[i].previousElementSibling.textContent, '');
  var textArea = $$('textarea', dialog);
  for (var i = 0, l = textArea.length; i < l; i++)
    textArea[i].value = textArea[i].previousSibling.value;
}

function hideCountF() {
  hideCount = 0;
  for (var i = 0; i < threads.length; i++)
    if (threads[i].style.display)
      hideCount++;
  if (stubs) {
    for (var i in replies)
      if ($('blockquote', replies[i]).style.display)
        hideCount++;
  } else
    for (var i in replies)
      if (replies[i].parentNode.style.display)
        hideCount++;
  for (var i = 0; i < posts.length; i++)
    if (posts[i].style.display)
      hideCount++;

  $('span:last-child', dialog).textContent = 'Hidden Posts: ' + hideCount;
}

}) ();