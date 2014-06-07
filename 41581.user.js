// ==UserScript==
// @name           Periscope
// @namespace      http://distilledb.com
// @description    Periscope lets you see what's on the other side of links from specific sites. When those sites are recognized, it appends additional text to the title tag of supported links.
// @version        0.2.2
// @include        http://*
// @exclude        http://*tinyurl.com/*
// @exclude        http://*youtube.com/*
// @exclude        http://*tiny.cc/*
// @exclude        http://*is.gd/*
// @exclude        http://*bit.ly/*
// ==/UserScript==

var processingString = " {...}";
var placeholderString = " {!}";

processAllLinks();

function processAllLinks() {
  var links = document.evaluate("//a[contains(@href,'http://')]",
                                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  // The handler map contains the domains we support.
  var handlerMap = new Object();

  // For each domain, we provide a domain handler that understands how to provide a meaningful title for the
  // periscoped link. We optionally provide an id handler that knows how to transform the identifier of each
  // periscoped link so that it's easier to find what we're looking for.
  handlerMap["tinyurl.com"]    = {domainHandler: handleTinyUrl, idHandler: null};
  handlerMap["youtube.com"]    = {domainHandler: handleYouTube, idHandler: handleYouTubeId};
  handlerMap["tiny.cc"]        = {domainHandler: handleGetTitle, idHandler: null};       
  handlerMap["is.gd"]          = {domainHandler: handleIsGd, idHandler: null};
  handlerMap["bit.ly"]         = {domainHandler: handleGetTitle, idHandler: null};
  handlerMap[""]               = {domainHandler: handleUnknown, idHandler: null};

  // For each link in the list that we found...
  for (var i = 0; i < links.snapshotLength; i++) {
    // Get the link.
    var link = links.snapshotItem(i);
    // Find which domain it belongs to.
    var result = identifyProvider(link);
    // Use the domain as the lookup to our handler map.
    var handle = handlerMap[(result.domain in handlerMap) ? result.domain : ""];

    // Process the result using the handlers we found.
    handle.domainHandler(link, (handle.idHandler != null) ? (handle.idHandler(result.id)) : result.id);
  }
}

function identifyProvider(link) {
  var decodedUri = decodeURIComponent(link.href);

  // Match the domain name [1] and the path [2].
  var reUri = decodedUri.match(/^https?:\/\/([^/]+)\/(.*)/);

  if (reUri) {
    // Strip leading www's.
    return {domain: reUri[1].replace("www.", ""), id: reUri[2]};
  } else {
    return {domain: "unknown", id: ""};
  }
}

// ---- id handlers
function handleYouTubeId(unparsedId) {
  // Match a GET parameter called 'v' whose value is alphanumeric.
  var reId = unparsedId.match(/[\?\&]v=([_\-0-9A-Za-z]+)/);
  return (reId) ? reId[1] : unparsedId;
}

// ---- domain handlers

// --
//   The default handler for domains we don't support.
function handleUnknown(node, id) {
  // Couldn't understand how to process this URL. Do nothing.
  return;
}

// --
//   Handles TinyURL compression. Provides the name of the URL on the remote page.
function handleTinyUrl(node, id) {
  prepareNode(node);
  makeHandlerRequest(
    "http://tinyurl.com/preview.php?num=" + id,
    function(response) {
      var regex = response.responseText.match("<blockquote><b>(.+)</b></blockquote>");
      if (regex) {
        var url = regex[1].replace(/\<br \/\>/g, "").replace(/&amp;/g, "&");
        updateNode(node, "tinyURL: " + url);
      } else {
        updateNode(node, "");
      }
    },
    function() {
      updateNode(node, "?");
    }
  );
}

// --
//   Handles arbitrary pages by visiting it and reporting what the title is.
function handleGetTitle(node, id) {
  prepareNode(node);
  makeHandlerRequest(
    decodeURIComponent(node.href),
    function(response) {
      var regex = response.responseText.match("<title>(.*)</title>");
      if (regex) {
        updateNode(node, "title of remote page: " + regex[1]);
      } else {
        updateNode(node, "");
      }
    },
    function() {
      updateNode(node, "?");
    }
  );
}

// --
//   Handles YouTube videos. Provides the name of a remote video.
function handleYouTube(node, id) {
  prepareNode(node);
  makeHandlerRequest(
    "http://youtube.com/watch?v=" + id,
    function(response) {
      var regex = response.responseText.match("<meta name=\"title\" content=\"(.*)\">");
      if (regex) {
        var videoTitle = regex[1].replace(/&amp;/g, "&").replace(/&quot;/, "\"").replace(/&amp;/g, "&");
        updateNode(node, "YouTube video: " + videoTitle);
      } else {
        updateNode(node, "");
      }
    },
    function() {
      updateNode(node, "?");
    }
  );
}

// --
//   Handles is.gd links. Provides the URL of the remote page.
function handleIsGd(node, id) {
  prepareNode(node);
  makeHandlerRequest(
    // Append an "-" to the id if we don't already have it.
    "http://is.gd/" + id + (id.substring(id.length - 1) == "-" ? "" : "-"),
    function(response) {
      var regex = response.responseText.match("followed points to <a href=\"(.*)\"");
      if (regex) {
        var target = regex[1];
        updateNode(node, "is.gd: " + target);
      } else {
        updateNode(node, "");
      }
    },
    function() {
      updateNode(node, "?");
    }
  );
}

function prepareNode(node, text) {
  if (node.getElementsByTagName('img').length == 0) {
    node.textContent = node.textContent + processingString;
  }
}

function unprepareNode(node) {
  // Remove any placeholders.
  if (node.getElementsByTagName('img').length == 0) {
    node.textContent = node.textContent.replace(processingString, "");
  }
}

function updateNode(node, text) {
  unprepareNode(node);

  // Make no changes if the text is blank.
  var textIsBlank = (text == "" || text == null);
  if (textIsBlank) {
    return;
  }

  var existingTitle = node.getAttribute("title");
  var emptyTitle = (existingTitle == "" || existingTitle == null);
  var titlePrefix = (emptyTitle ? "" : (existingTitle + " "));
  var fullTitleText = titlePrefix + "[" + text + "]";
  node.setAttribute("title", fullTitleText);

  // If this anchor tag isn't wrapping an image, let readers know there's more information about this link.
  if (node.getElementsByTagName('img').length == 0) {
    // Try to insert before the last punctuation mark, if any.
    node.textContent = insertBeforeLastPunctuation(node.textContent, placeholderString);
  }
}

function insertBeforeLastPunctuation(target, textToInsert) {
  var result = "";
  var regex = target.match(/([\.\?\!])([^\.\?\!]*)$/);
  if (!regex || regex[1].length == 0) {
    // No punctuation found.
    result = target + textToInsert;
  } else {
    // Punctuation found.
    var endingString = regex[2];
    if (endingString.replace(/\s+$/, "").length == 0) {
      // It's at the end.
      var textLength = target.length;
      result = target.substring(0, textLength - 1 - endingString.length)
        + textToInsert
        + target.substring(textLength - 1 - endingString.length);
    } else {
      // It's not at the end.
      result = target + textToInsert;
    }
  }

  return result;
}

function makeHandlerRequest(uri, onSuccessHandler, onFailureHandler) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: uri,
    onload: onSuccessHandler,
    onerror: onFailureHandler,
  });
}

// Automatically update.
function update(filename){
  var body = document.getElementsByTagName('body')[0];
  script = document.createElement('script');
  script.src = filename;
  script.type = 'text/javascript';
  body.appendChild(script);
  var today = new Date();
  GM_setValue('muUpdateParam_35', String(today));
}

// Check for updates.
function checkForUpdate() {
  var lastupdatecheck = GM_getValue('muUpdateParam_35', 'never');
  var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=35&version=0.2.2';
  var today = new Date();
  var one_day = 24 * 60 * 60 * 1000; // 1 day in ms
  if (lastupdatecheck != 'never') {
    today = today.getTime();
    var lastupdatecheck = new Date(lastupdatecheck).getTime();
    var interval = (today - lastupdatecheck) / one_day;
    if(interval >= 1){
      update(updateURL);
    }
  } else {
    update(updateURL);
  }
}

checkForUpdate();