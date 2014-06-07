// ==UserScript==
// @name           nicovideo Break Uploader Comment
// @namespace      http://d.hatena.ne.jp/gifnksm/
// @description    Insert <br> to uploader comment.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

function tree_walk(node, has_link_parent, has_br) {
  if(node === null)
    return;
  if(node.nodeType != 3) {
    if(node.childNodes) {
      var flag = has_link_parent || node.nodeName == 'A';
      Array.map(node.childNodes, function(node) { return node; })
        .forEach(function(node) { tree_walk(node, flag, has_br); });
    }
  }
  else if(!has_link_parent && !has_br) {
    replaceSpaces(node).map(replaceURL);
  }
  else if(!has_link_parent) {
    replaceURL(node);
  }
  else if(!has_br) {
    replaceSpaces(node);
  }
}

const space_regex = /\s{3,}/;
function replaceSpaces(text_node) {
  var parent = text_node.parentNode;
  var ret = [];
  while(space_regex.test(text_node.nodeValue)) {
    var text = document.createTextNode(RegExp.leftContext);
    ret.push(text);
    parent.insertBefore(text, text_node);
    parent.insertBefore(document.createElement('br'), text_node);
    text_node.nodeValue = RegExp.rightContext;
  }
  ret.push(text_node);
  return ret;
}

const url_regex = new RegExp('(?:h?t?t?ps?|ftp)(?:://[-_.!~*\'()a-zA-Z0-9;/?:@&=+$,%#]+)');
function replaceURL(text_node) {
  var parent = text_node.parentNode;
  while(url_regex.test(text_node.nodeValue)) {
    var a = document.createElement('a');
    var url = RegExp.lastMatch;
    a.textContent = url;
    if(url.indexOf('p') == 0)
      url = 'htt' + url;
    else if(url.indexOf('tp') == 0)
    url = 'ht' + url;
    else if(url.indexOf('ttp') == 0)
    url = 'h' + url;
    a.href = url;
    parent.insertBefore(document.createTextNode(RegExp.leftContext), text_node);
    parent.insertBefore(a, text_node);
    text_node.nodeValue = RegExp.rightContext;
  }
  return text_node;
}

var p = document.evaluate(
  'id("des_2")//p[contains(concat(" ", @class, " "), " video_description ")]',
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

tree_walk(p, false, p.getElementsByTagName('br').length > 0);
