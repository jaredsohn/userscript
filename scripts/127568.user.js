// ==UserScript==
// @name          Friends Of New Nakama Video Embed Fixer (FONNVEF)
// @description   Replaces the embed tag used with a Flash player to allow videos to play without additional plugins
// @include       http://tell.fll.purdue.edu*
// @author        James @ UNSW, greyboxconcepts.com.au (credit to: mcarans and alice0775)
// @version       2012/03/19 12:57
// ==/UserScript==

var base = getFirstElementByXPath('//base[@href]', document)
var baseUrl = base ? base.href : location.href;

var mimetype = 'application/x-shockwave-flash';
var player = 'http://player.longtailvideo.com/player.swf';
var width = 600;
var height = 190;

var videoElements = document.getElementsByTagName('embed');

for(i=0; i < videoElements.length; i++) {

   var currentElement = videoElements[i];
   var parentElement = currentElement.parentNode;
   var relativePath = currentElement.getAttribute('src');

   var absolutePath = resolvePath(relativePath, baseUrl);
   
   width = parseInt(currentElement.getAttribute('width'));
   height = parseInt(currentElement.getAttribute('height'));
   autostart = currentElement.getAttribute('autostart');
   
   var newElement = document.createElement("flashReplacementTracker"+String(i));

   newElement.innerHTML = '<p>' +
   '<embed '+
   'src="' + player + '" '+
   'width="' + width + '" ' +
   'height="' + height + '" ' +
   'type="' + mimetype + '" ' +
   'allowscriptaccess="always" allowfullscreen="true"' +
   'bgcolor="undefined" wmode="transparent"' +
   'flashvars="file=' + absolutePath + '"></embed>'+
   '<br />' +
   '<small><small>Wont\'t play? Download the file here: <a href="' + absolutePath + '">' + relativePath + '</a></small></small>' +
   '</p>';
   
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
