// ==UserScript==
// @name          embedToFlash
// @description   Replaces the embed tag with a Flash player to allow videos to play without additional plugins
// @include       *
// @author        James, greyboxconcepts.com.au (credit to: mcarans and alice0775)
// @version       2012/03/05 18:33
// ==/UserScript==

var base = getFirstElementByXPath('//base[@href]', document);
var baseUrl = base ? base.href : location.href;

// Some default settings
var mimetype = 'application/x-shockwave-flash';
var player = 'http://player.longtailvideo.com/player.swf';
var width = 640;
var height = 480;
var autostart = 'true';

var videoElements = document.getElementsByTagName('embed');

for(i=0; i < videoElements.length; i++) {

   var currentElement = videoElements[i];
   var parentElement = currentElement.parentNode;
   var src = resolvePath(currentElement.getAttribute('src'), baseUrl);
   var newElement = document.createElement("flashReplacementTracker"+String(i));
   
   width = parseInt(currentElement.getAttribute('width'));
   height = parseInt(currentElement.getAttribute('height'));
   autostart = currentElement.getAttribute('autostart');

   newElement.innerHTML = '<embed '+
   'src="' + player + '" '+
   'width="' + width + '" ' +
   'height="' + height + '" ' +
   'type="' + mimetype + '" ' +
   'autostart="' + autostart + '" ' +
   'flashvars="file='+src+'" '+
   'allowscriptaccess="always" allowfullscreen="true" bgcolor="undefined" wmode="transparent"' +
   '></embed><br />';
   
   parentElement.replaceChild(newElement, videoElements[i]);
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

function getElementsByXPath(xpath, node, css) {
if (typeof css != 'undefined' && css) {
   if (!node || !(querySelector in node))
      node = document;
   var nodesSnapshot = node.querySelectorAll(xpath);
   var data = []
   for (var i = 0; i < nodesSnapshot.length; i++) {
      data.push(nodesSnapshot[i])
   }
} else {
   var nodesSnapshot = getXPathResult(xpath, node,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
   var data = []
   for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
      data.push(nodesSnapshot.snapshotItem(i))
   }
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
