// ==UserScript==
// @name          View Add-on Compatibility Reports
// @namespace     http://userscripts.org/scripts/show/61398
// @version       0.0
// @description   Adds a link to add-on compatibility reports to addons.mozilla.org.
// @include       https://addons.mozilla.org/*
// @include       https://preview.addons.mozilla.org/*
// @license       This program is in the public domain.
// ==/UserScript==

void function(){
  function encodeAsFormValue(s)
  {
    return s.replace(/[\x00-\x1F!\"#\$%&\'\(\)\*\+,\/\:;<=>\?@\[\\\]\^`\{\|\}]/g, function(str){
      var code = str.charCodeAt(0);
      if (code <= 0x0F)
        return '%0' + code.toString(16).toUpperCase();
      else
        return '%' + code.toString(16).toUpperCase();
    }).replace(/ /g, '+');
  }

  var found = location.href.match(/^https:\/\/[^\/]+\/([^\/?#]+)\/([^\/?#]+)\/addon\/([0-9]+)\/?$/);
  if (!found)
    return;
  var lang = found[1];
  var application = found[2];
  var addonid = found[3];
  var parent = document.evaluate('div[@class="section"]/div[@class="secondary"]', document.body, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  if (!parent)
    return;

  var div = document.createElement('div');
  var h3 = document.createElement('h3');
  h3.className = 'compact-bottom';
  h3.appendChild(document.createTextNode('Compatibility Reports'));
  div.appendChild(h3);
  var a = document.createElement('a');
  a.href = '/' + lang + '/' + application + '/compatibility/reporter?guid=' + encodeAsFormValue(addonid);
  a.appendChild(document.createTextNode('View compatibility reports'));
  div.appendChild(a);
  parent.appendChild(div);
}();
