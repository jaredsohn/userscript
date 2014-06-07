// ==UserScript==
// @name           ETI Image Transload
// @namespace      shoecream@luelinks.net
// @description    Transloads images from web sites onto ETI
// @include        *
// @exclude        http://endoftheinter.net*
// @exclude        https://endoftheinter.net*
// @exclude        http://*.endoftheinter.net*
// @exclude        https://*.endoftheinter.net* 
// @require        http://userscripts.org/scripts/source/69456.user.js 
// @history        1.1 Release
// @history        1.0 First version
// ==/UserScript==

String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

function findpos (element) {
  var d = {x:0,y:0};
  d.h = element.offsetHeight;
  d.w = element.offsetWidth;
  do {
    d.x += element.offsetLeft;
    d.y += element.offsetTop;
  } while (element = element.offsetParent);

  return d;
}

var boxes = [];

function createFloatBox (dims, dom) {
  var div = document.createElement('div');
  dims.x -= 3; dims.y -= 3;
  var style = 'position:absolute;left:{x}px;top:{y}px;height:{h}px;width:{w}px;border:3px dashed red;cursor:pointer;z-index:1000'.supplant(dims);
  div.setAttribute('style', style);
  div.setAttribute('value', dom.src);
  div.addEventListener('mouseover', mouseover, false);
  div.addEventListener('mouseout', mouseout, false);
  div.addEventListener('click', click, false);
  boxes.push(div);
  document.body.appendChild(div);

  function mouseover (ee) { ee.target.style.borderColor = 'green'; }
  function mouseout (ee) { ee.target.style.borderColor = 'red'; }

  function click (ee) {
    document.body.style.cursor = 'wait';    
    transload (ee.target);
    boxes.forEach(function (box) {
      box.parentNode.removeChild(box);
    });
  }
}

function transload (dom) {
  var href = dom.getAttribute('value');
  BinaryRes.get({url: href, callback: transload_got});
}

function transload_got (resp) {
  filename = (resp.finalUrl.split('/') || ['something.jpg']).pop();
  BinaryRes.post({
    url: 'http://u.endoftheinter.net/u.php',
    callback: transload_posted,
    data: {
      file: {
        value: BinaryRes._clean(resp.responseText),
        filename: filename,
        type: BinaryRes.guessType(resp.responseText)
      }
    }
  });
}

function transload_posted (resp) {
  document.body.style.cursor = 'default';
  var html = document.createElement('html');
  html.innerHTML = resp.responseText;
  // newly uploaded images are always the first to be returned
  var value = html.getElementsByClassName('img')[0].getElementsByTagName('input')[0].value;
  prompt('Here is your image', value);
}

function highlight () {
  [].forEach.call(document.getElementsByTagName('img'), function (img) {
    createFloatBox(findpos(img), img);
  });
}

GM_registerMenuCommand('Start ETI Image Transload', highlight);