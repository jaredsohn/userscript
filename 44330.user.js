// ==UserScript==
// @name           Plurk Sunny
// @namespace      http://littlebtc.blogspot.com/2009/03/plurk-sunny.html
// @description    Yet Another Plurk Smilies Userscript
// @version        0.1
// @license        MIT License (http://www.opensource.org/licenses/mit-license.php)
// @include        http://www.plurk.com/*
// ==/UserScript==

/*
NOTE: It is NOT suggested to include the smilies in this userscript. It will be hard to maintain multiple scripts.
Instead, in Plurk Sunny, putting your smilies data in a standalone userscript is suggested.
Please see XXX for example.
*/

var isGreasemonkey = false;
var isLoaded = false;
var isInjected = false;
var wait = 0;
var smilies_data = [];
var target_obj = null;

function init() {
  /* Check if we are in Greasemonkey / GM Compiler (other userscript approach doesn't support GM_-series) */
  if (typeof GM_getValue == 'function') { isGreasemonkey = true; }
  
  document.addEventListener('DOMNodeInserted', watchDom, false);
  window.addEventListener('load', receiveSmilies, false);
}

function receiveSmilies() {
  /* Collect smilies data from Userscript */
  var smilies_dom = document.getElementById('smilies_holder').getElementsByTagName('a');
  for (var i = 0; i < smilies_dom.length; i++) {
    smilies_data.push({title: smilies_dom[i].title, prefix: smilies_dom[i].href, images: smilies_dom[i].textContent.split(',')});
  }
  /* XXX: getElementsByClassName support? */
  var smily_holders = document.getElementsByClassName('smily_holder');
  for (var i = 0; i < smily_holders.length; i++) {
    smily_holders[i].addEventListener('click', function(e) {
      /* Determine the right place */
      if(document.getElementById('input_permalink')) { target_obj = document.getElementById('input_permalink'); }
      else if (this.parentNode.parentNode.parentNode.parentNode.id != 'main_poster') { target_obj = document.getElementById('input_small'); }
      else if (document.getElementById('input_big')) { target_obj = document.getElementById('input_big'); }
    }, false);
  }
  isLoaded = true;

}

function watchDom(e) {
  if (e.target && e.target.id && e.target.id === 'emoticon_selecter') {
    isInjected = true;
    /* Use setTimeout to speed up a little */
    window.setTimeout(waitLoaded, 5);
    document.removeEventListener('DOMNodeInserted', watchDom, false);
  }
};

/* Avoid injectTabs before loaded */
function waitLoaded() {
  if (wait == 10) {
    return;
  }
  if (isLoaded) {
     window.setTimeout(injectTabs, 5);
     return;
  }
  wait++;
  window.setTimeout(waitLoaded, 300);
}

function injectTabs() {
  if (!isLoaded) {alert('bad!')}
  /* Set CSS */
  document.getElementById('emoticons_show').style.width = '100%';
  document.getElementById('emoticons_show').style.maxHeight = '200px';
  document.getElementById('emoticons_show').style.overflow = 'auto';
  var tabs = smilies_data.length;
  /* Avoid overflow */
  if (tabs > 6) {
    document.getElementById('emoticons_tabs').firstChild.style.height = (20 * Math.ceil(tabs / 6)).toString()+'px';
  }

  var li = document.createElement('li');
  li.className = 'emoticon_selecter';

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < smilies_data.length; i++) {
    var test = li.cloneNode(false);
    test.id = 'plurksunny-tabs-'+i;
    /* XXX: HTML entitles */
    test.innerHTML = '<a href="#">'+smilies_data[i].title+'</a>';
    test.addEventListener('click', makeTabListener(i), false);
    fragment.appendChild(test);
  }
  document.getElementById('emoticons_tabs').firstChild.appendChild(fragment);
};

function makeTabListener(id)
{
  return function(e) { switchTab(id); e.preventDefault();};
}

function switchTab(id) {
  /* Unset old, set new */
  var tabs = document.getElementById('emoticons_tabs').getElementsByTagName('li');
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].className.indexOf('current') != 1) {
      tabs[i].className = 'emoticon_selecter';
    }
    if (tabs[i].id == 'plurksunny-tabs-'+id) {
      tabs[i].className = 'emoticon_selector current';
    }
  }
  var div = document.createElement('div');
  var html = '<table><tbody>'+"\n"+'<tr>';
  for (var i = 0; i < smilies_data[id].images.length; i++ ) {
    html += '<td><a href="#"><img width="35" src="'+smilies_data[id].prefix+smilies_data[id].images[i]+'"></a></td>';
    if (i % 8 == 7 && i < smilies_data[id].images.length - 1) { html += '</tr>'+"\n"+'<tr>'; }
  }
  html += '</tr></tbody></table>';
  div.innerHTML = html;
  document.getElementById('emoticons_show').removeChild(document.getElementById('emoticons_show').firstChild);
  document.getElementById('emoticons_show').appendChild(div);
  
  /* Handle the emoticons insertion */
  var images = document.getElementById('emoticons_show').getElementsByTagName('img');
  for (var i = 0; i < images.length; i++ ) {
    images[i].addEventListener('click', function() {
      /* Set the selection */
      if (typeof target_obj.selectionStart != 'undefined') {
        var start = target_obj.selectionStart;
        var end = target_obj.selectionEnd;
        target_obj.value = target_obj.value.substring(0, start) + this.src + ' ' + target_obj.value.substring(end);
        var p = end + this.src.length + 1;
        target_obj.setSelectionRange(p, p);
      }
    }, false);
  }
}

/* Go ahead */
init();
