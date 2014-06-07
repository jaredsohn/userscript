// ==UserScript==
// @name          html5h264video
// @description   Replaces html5 video tag with Flash player to allow H264 videos to play
// @include       http://*
// @include       https://*
// @home          http://userscripts.org/scripts/show/70028
// @author        mcarans
// @version       2010/05/05 resolve relative path by A
// ==/UserScript==
// eg. http://visitmix.com/LabNotes/HTML5-video-tag-with-H264-codec

var base = getFirstElementByXPath('//base[@href]', document)
var baseUrl = base ? base.href : location.href;

var mimetype = 'application/x-shockwave-flash';
var player = 'http://player.longtailvideo.com/player.swf';
var width = 800;
var height = 480;

var videoElements = document.getElementsByTagName('video');

for(i=0;i<videoElements.length;i++){
  var parentElement = videoElements[i].parentNode;

  if (/\.og.?/i.test(videoElements[i].getAttribute('src')))
    continue;

  var src = parentElement.innerHTML.match(/src="([^"]+)"/)[1];
  src = resolvePath(src, baseUrl);

  var newElement = document.createElement("flashreplacementvideo"+String(i));

  newElement.innerHTML = '<embed src="' + player + '" width="' + width + '"' +
    'height="' + height + 'type="' + mimetype +
    'allowscriptaccess="always" allowfullscreen="true"' +
    'bgcolor="undefined" wmode="transparent"' +
    'flashvars="file='+src+'"></embed>';
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
