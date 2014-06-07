// ==UserScript==
// @name          html5videomp4
// @description   Replaces html5 video tag with QuickTime to allow mp4 video to play
// @include       http://*
// @author        alice0775
// @version       2012/01/31
// ==/UserScript==
(function(){
var base = getFirstElementByXPath('//base[@href]', document)
var baseUrl = base ? base.href : location.href;

var mimetype = 'video/x-mp4';

var videoElements = document.getElementsByTagName('video');

for(i = 0; i < videoElements.length; i++) {
  var video = videoElements[i];
  var parentElement = video.parentNode;
  var sourceElement = getElementsByXPath('./source', video);

  if (sourceElement.length > 0  && /\.mp4/i.test(sourceElement[0].getAttribute('src'))) {

    var newElement = document.createElement("embed");
    var attrs = video.attributes;
    for (var j = 0; j < attrs.length; j++) {
      newElement.setAttribute(attrs[j].name, attrs[j].value);
      if (attrs[j].name == "src") {
        var src = attrs[j].value;
        src = resolvePath(src, baseUrl);
        newElement.setAttribute("src", src);
      }
      if (attrs[j].name == "loop" && !attrs[j].value)
        newElement.setAttribute(attrs[j].name, true);
    }
    var src = sourceElement[0].getAttribute('src');
    src = resolvePath(src, baseUrl);
    newElement.setAttribute("src", src);
    newElement.setAttribute("type", mimetype);
    parentElement.replaceChild(newElement, video);
    var style = window.getComputedStyle(video);
    var h = 20 + parseInt(style.getPropertyValue("height"));
    newElement.style.setProperty("height", h + "px", "");

  } else if (/\.mp4/i.test(video.getAttribute('src'))) {

    var newElement = document.createElement("embed");
    var attrs = video.attributes;
    for (var j = 0; j < attrs.length; j++) {
      newElement.setAttribute(attrs[j].name, attrs[j].value);
      if (attrs[j].name == "src") {
        var src = attrs[j].value;
        src = resolvePath(src, baseUrl);
        newElement.setAttribute("src", src);
      }
      if (attrs[j].name == "loop" && !attrs[j].value)
        newElement.setAttribute(attrs[j].name, true);
    }
    newElement.setAttribute("type", mimetype);
    parentElement.replaceChild(newElement, video);
    var style = window.getComputedStyle(video);
    var h = 20 + parseInt(style.getPropertyValue("height"));
    newElement.style.setProperty("height", h + "px", "");
  }
}


function resolvePath(path, base) {
    if (path.match(/^https?:\/\//)) {
        return path
    }
    if (path.match(/^[^\/]/)) {
        return base.replace(/[^/]+$/, '') + path
    }
    else {
        return base.replace(/([^/]+:\/\/[^/]+)\/.*/, '\$1') + path
    }
}

function getElementsByXPath(xpath, node) {
  var nodesSnapshot = getXPathResult(xpath, node,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
  var data = []
  for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
      data.push(nodesSnapshot.snapshotItem(i))
  }
  return data
}

function getFirstElementByXPath(xpath, node, css) {
  if (typeof css != 'undefined' && css) {
    if (!node || !(querySelector in node))
      node = document;
    return  node.querySelector(xpath);
  } else {
    var result = getXPathResult(xpath, node,
        XPathResult.FIRST_ORDERED_NODE_TYPE)
    return result.singleNodeValue
  }
}

function getXPathResult(xpath, node, resultType) {
    var node = node || document
    var doc = node.ownerDocument || node
    var resolver = doc.createNSResolver(node.documentElement || node)
    // Use |node.lookupNamespaceURI('')| for Opera 9.5
    var defaultNS = node.lookupNamespaceURI(null)
    if (defaultNS) {
        const defaultPrefix = '__default__'
        xpath = addDefaultPrefix(xpath, defaultPrefix)
        var defaultResolver = resolver
        resolver = function (prefix) {
            return (prefix == defaultPrefix)
                ? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
        }
    }
    return doc.evaluate(xpath, node, resolver, resultType, null)
}

function addDefaultPrefix(xpath, prefix) {
    const tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g
    const TERM = 1, OPERATOR = 2, MODIFIER = 3
    var tokenType = OPERATOR
    prefix += ':'
    function replacer(token, identifier, suffix, term, operator, modifier) {
        if (suffix) {
            tokenType =
                (suffix == ':' || (suffix == '::' &&
                 (identifier == 'attribute' || identifier == 'namespace')))
                ? MODIFIER : OPERATOR
        }
        else if (identifier) {
            if (tokenType == OPERATOR && identifier != '*') {
                token = prefix + token
            }
            tokenType = (tokenType == TERM) ? OPERATOR : TERM
        }
        else {
            tokenType = term ? TERM : operator ? OPERATOR : MODIFIER
        }
        return token
    }
    return xpath.replace(tokenPattern, replacer)
}
})();
