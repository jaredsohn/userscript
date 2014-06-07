// ==UserScript==
// @name           ya4cie
// @namespace      aeosynth
// @description    Yet another 4chan image expander.
// @include        http://*.4chan.org/*
// @include        http://suptg.thisisnotatrueending.com/archive/*
// @include        http://4chanarchive.org/brchive/*
// @version        1.3.9
// @copyright      2009, James Campos
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

//start preferences
var inline = true;
var autoGif = false;
var clickFull = false;
var clickFit = false;
var inFilter = false;
var autoExpand = 0;// 0 = nothing, 1 = replies, 2 = everything
var reduce = 0;
var maxWidth = 0;
//end preferences

//TODO
// instant feedback
// sanity checking
// enter to save
// wtf opera

(function () {

//main
var thumbs = X(".//img[@md5]|.//span[@class='tn_reply' or @class='tn_thread']");
if (!thumbs.length) return;

if (!String.trim)//lol opera
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {//chrome compat
  GM_addStyle = function (css) {
    var style = document.createElement('style');
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  };

  GM_deleteValue = function (name) {
    localStorage.removeItem(name);
  };

  GM_getValue = function (name, defaultValue) {
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
  };

  GM_log = function (message) {
    console.log(message);
  };

   GM_registerMenuCommand = function (name, funk) {
  //todo
  };

  GM_setValue = function (name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  };
}

inline = GM_getValue('Inline', inline);
autoGif = GM_getValue('Load Gifs', autoGif);
clickFull = GM_getValue('Click Full', clickFull);
clickFit = GM_getValue('Click Fit', clickFit);
inFilter = GM_getValue('In Filter', inFilter);
autoExpand = Number(GM_getValue('Auto', autoExpand));
reduce = GM_getValue('Reduce', reduce);
maxWidth = GM_getValue('Max Width', maxWidth);

var reply = /res|read|archive\/|thread/.test(window.location.pathname);//imageboard|textboard|suptgarchive|4chanarchive+easymodo
var server = location.hostname.match(/(\w+)?/)[0];
var clientHeight, clientWidth;

var controls = tag('span');
controls.innerHTML =
  ' <select><option>full</option><option>fit width</option><option>fit screen</option></select>' +
  '<label class="pointer">Expand Images<input type="checkbox"></label>';
controls.style.display = 'none';

var expandSize = controls.getElementsByTagName('select')[0];
expandSize.addEventListener('change', changeSize, true);
switch (GM_getValue('expandSize')) {
  case 'fit width':
    expandSize.childNodes[1].selected = true;
    break;
  case 'fit screen':
    expandSize.childNodes[2].selected = true;
    break;
}
var expandImages = controls.getElementsByTagName('input')[0];
expandImages.addEventListener('click', expandImagesF, true);
if (autoExpand == 2 || autoExpand && reply) {
  expandImages.checked = true;
  expandImagesF();
}

if (autoGif)
  thumbs.forEach(function (thumb) {
    var link = thumb.parentNode;
    if (/\.gif$/.test(link.href))
      thumb.src = link.href;
  });

if (inline)
  thumbs.forEach(function (thumb) {
    thumb.parentNode.addEventListener('click', click, true);
  });

var filter = document.getElementById('thread_filter');
if (inFilter && filter) {
  controls.appendChild(tag('br'));
  inBefore(filter.childNodes[1].firstChild, controls);
  inBefore(filter.childNodes[2].firstChild, tag('br'));
} else {
  var filesize = x("//span[@class='filesize']");
  var parent = filesize.parentNode;
  if (parent.nodeName == 'DIV') {//threading
    var prev = parent.previousSibling;
    if (prev)//4chan X
      inBefore(prev, controls);
    else//4chan extension
      inBefore(parent, controls);
  } else
    filesize.appendChild(controls);
}

document.body.addEventListener('DOMNodeInserted', nodeInserted, true);
GM_registerMenuCommand('ya4cie Options', options);
GM_addStyle(
  '#ya4cie {' +
     'position: fixed;' +
     'color: inherit;' +
     'border: 1px ridge;' +
     'padding: 5px;' +
     'text-align: right;' +
  '}' +
   '#ya4cie label,' +
   '#ya4cie a,' +
   '.pointer { cursor: pointer; }' +
   '#ya4cie div:first-child { text-align: center; }'
);

//funks
function expandImagesF() {
  clientHeight = document.body.clientHeight;
  clientWidth = document.body.clientWidth - reduce;
  if (expandImages.checked)
    thumbs.forEach(function (thumb) {
      if (thumb.style.display != 'none')//thumb is not hidden
        expand(thumb);
    });
  else
    thumbs.forEach(function (thumb) {
      if (thumb.style.display == 'none')
        contract(thumb);
    });
}

function expand(thumb) {
  thumb.style.display = 'none';
  var link = thumb.parentNode;
  var expanded = tag('img');
  expanded.src = link.href;
  expanded.border = 0;
  var width = resize(expanded, link);
  link.appendChild(expanded);
  if (link.parentNode.nodeName != 'TD') {//OP
    if (Number(width) <= maxWidth)
      expanded.align = 'left';
    var nextBQ = x("following-sibling::blockquote", link);
    inBefore(nextBQ, tag('br'));
    inBefore(nextBQ, link);
  }
  if (thumb.nodeName == 'SPAN' && server != '4chanarchive')//thumbnail not available
    inBefore(link, tag('br'));
}

function resize(expanded, link) {
  var size =
    x("preceding::span[@class='filesize'][1]/text()[2]", link)
    .textContent.match(/(\d+)x(\d+)/);
  var width = size[1];
  var height = size[2];
  switch (expandSize.value) {
    case 'fit width':
      if (width > clientWidth)
        expanded.setAttribute('width', clientWidth);
      break;
    case 'fit screen':
      if (width > clientWidth || height > clientHeight) {
        if (width / height < clientWidth / clientHeight)
          expanded.setAttribute('width', Math.floor(width * clientHeight / height));
        else
          expanded.setAttribute('width', clientWidth);
      }
      break;
    default:
      expanded.removeAttribute('width');
      break;
  }
  return width;
}

function contract(thumb) {
  var link = thumb.parentNode;
  remove(link.lastChild);//expanded image
  thumb.style.display = '';
  if (link.parentNode.nodeName != 'TD') {
    remove(link.previousSibling);
    var checkbox = x("preceding::input[1]", link);
    inBefore(checkbox, link);
  }
  if (thumb.nodeName == 'SPAN')
    remove(link.previousSibling);
}

function click(e) {
  if (e.ctrlKey || e.button > 0) return;//ctrl key held or not left-clicked
  e.preventDefault();
  clientHeight = document.body.clientHeight;
  clientWidth = document.body.clientWidth - reduce;
  var thumb = this.firstChild;
  if (thumb.style.display != 'none')
    expand(thumb);
  else {//manipulate dimensions
    var expanded = this.lastChild;
    var width = expanded.width;
    var height = expanded.height;
    if (clickFull && !expanded.getAttribute('Full') && expanded.getAttribute('width')) {
      expanded.removeAttribute('width');
      expanded.setAttribute('Full', true);
    } else if (clickFit && !expanded.getAttribute('Fit') && height > clientHeight) {
      if (!expanded.getAttribute('width'))
        expanded.setAttribute('Full', true);
      expanded.setAttribute('width', Math.floor(width * clientHeight / height));
      expanded.setAttribute('Fit', true);
    } else
      contract(thumb);
  }
}

function changeSize() {
  GM_setValue('expandSize', expandSize.value);
  clientWidth = document.body.clientWidth - reduce;
  clientHeight = document.body.clientHeight;
  thumbs.forEach(function (thumb) {
    if (thumb.style.display == 'none') {
      var link = thumb.parentNode;
      var expanded = link.lastChild;
      resize(expanded, link);
    }
  });
}

function nodeInserted(e) {
  var el = e.target;
  if (el.nodeName != 'TABLE') return;
  var thumb = x(".//img[@md5]|.//span[@class='tn_reply']", el);
  if (thumb) {
    var link = thumb.parentNode;
    if (inline)
      link.addEventListener('click', click, true);
    if (autoGif && /\.gif$/.test(link.href))
      thumb.src = link.href;
    if (expandImages.checked && thumb.style.display != 'none')
      expand(thumb);
    thumbs.push(thumb);
  }
}

function options() {
  var div = tag('div');
  div.id = 'ya4cie';
  div.className = 'reply';
  div.style.top = document.body.clientHeight / 2;
  div.style.left = document.body.clientWidth / 2;
  div.innerHTML =
    '<div>ya4cie</div>' +
    '<div>' +
    '<label>Inline<input type="checkbox"></label><br>' +
    '<label>Click Full<input type="checkbox"></label><br>' +
    '<label>Click Fit<input type="checkbox"></label><br>' +
    '<label>In Filter<input type="checkbox"></label><br>' +
    '<label>Load Gifs<input type="checkbox"></label><br>' +
    '<label>Reduce <input size=3 maxlength=5></label><br>' +
    '<label>Max Width <input size=3 maxlength=5></label><br>' +
    'Auto Expand:<br>' +
    '<label>Nothing<input type="radio" name="Auto" value=0></label><br>' +
    '<label>Replies<input type="radio" name="Auto" value=1></label><br>' +
    '<label>Everything<input type="radio" name="Auto" value=2></label><br>' +
    '<a>save</a> <a>cancel</a>' +
    '</div>';
  var temp = X('.//input[@type="checkbox"]', div);
  temp[0].checked = GM_getValue('Inline', true);
  for (var i = 1, l = temp.length; i < l; i++)//Only Inline is on by default
    temp[i].checked = GM_getValue(temp[i].previousSibling.nodeValue);
  temp = X('.//input[@size]', div);
  temp[0].value = GM_getValue('Reduce', 0);
  temp[1].value = GM_getValue('Max Width', 600);
  x('.//input[@value="' + GM_getValue('Auto', 0) + '"]', div).checked = true;
  temp = X('.//a', div);
  temp[0].addEventListener('click',
    function () {//save
      var boxen = X(".//input[@type='checkbox']", div);
      for (var i in boxen)
        GM_setValue(boxen[i].previousSibling.nodeValue, boxen[i].checked);
      var numbs = X(".//input[@size]", div);
      for (var i in numbs)
        GM_setValue(numbs[i].previousSibling.nodeValue.trim(), numbs[i].value);
      var radio = X(".//input[@type='radio']", div);
      for (var i in radio)
        if (radio[i].checked)
          GM_setValue('Auto', radio[i].value);
      remove(div);
    },
    true);
  temp[1].addEventListener('click',
    function () {//cancel
      remove(div);
    },
    true);
  document.body.appendChild(div);
}

//utility
function inBefore(root, el) {
  root.parentNode.insertBefore(el, root);
}

function remove(el) {
  el.parentNode.removeChild(el);
}

function tag(el) {
  return document.createElement(el);
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

})();