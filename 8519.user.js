// ==UserScript==
// @name          Gmail Sublabels
// @namespace     http://norman.rasmussen.co.za/gmailsublabels
// @description   Makes :: into a subfolder seperator in gmail.
// @include       http://mail.google.com/mail/*
// @include       https://mail.google.com/mail/*
// @include       http://mail.google.com/a/*
// @include       https://mail.google.com/a/*
// @exclude       http://mail.google.com/mail/help/*
// @exclude       https://mail.google.com/mail/help/*
// @exclude       http://mail.google.com/a/help/*
// @exclude       https://mail.google.com/a/help/*
// ==/UserScript==

(function() {

// START OF PERSITENT SEARCHING STUFF

// Utility functions
function getObjectMethodClosure(object, method) {
  return function() {
    return object[method](); 
  }
}

function getObjectMethodClosure1(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

function getDateString(date) {
  return date.getFullYear() + "/" +
         (date.getMonth() + 1) + "/" +
         date.getDate();
}

// Shorthand
var newNode = getObjectMethodClosure1(document, "createElement");
var newText = getObjectMethodClosure1(document, "createTextNode");
var getNode = getObjectMethodClosure1(document, "getElementById");
var getTags = getObjectMethodClosure1(document, "getElementsByTagName");

function initializeSubLabels() {
  var labelsBlock = getNode("nvl");

  if (!labelsBlock) {
    return;
  }

  var labels = document.evaluate(
    '//div[@class="lk cs"]',
    labelsBlock,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

  if (labels.snapshotLength == 0)
  {
    labelsBlock.removeAttribute('SubLabelsProcessed');
    return;
  }

  var previousParts = [];
  
  for (var labelIndex = 0; labelIndex < labels.snapshotLength - 1; labelIndex++ )
  {
    var label = labels.snapshotItem(labelIndex);
    
    var parts = label.id.substr(3).split('::');

    var prefix = '';
    for (var partIndex = 0; partIndex < parts.length - 1; partIndex++)
    {
      var part = parts[partIndex];
      prefix = prefix + part + '::';
    }

    label.innerHTML = label.innerHTML.replace(prefix, '');
    label.style.marginLeft = (parts.length - 1) * 10 + 'px';

    for (var partIndex = 0; partIndex < previousParts.length; partIndex++)
    {
      if (parts[partIndex] != previousParts[partIndex])
        break;
    }
    for (; partIndex < parts.length - 1; partIndex++)
    {
      var parentLabel = newNode('div');
      parentLabel.className = "cs";
      parentLabel.title = parts.slice(0, partIndex + 1).join('::');
      parentLabel.innerHTML = parts[partIndex];
      parentLabel.style.marginLeft = partIndex * 10 + 'px';
      label.parentNode.insertBefore(parentLabel, label);
    }

    previousParts = parts;

  }
  
  labelsBlock.setAttribute('SubLabelsProcessed', 'true');
  checkSubLabelsState();

}

// For some reason, when naving back to the Inbox after viewing a message, we seem
// to get removed from the nav section, so we have to add ourselves back. This only
// happens if we're a child of the "nav" div, and nowhere else (but that's the place
// where we're supposed to go, so we have no choice)
function checkSubLabelsState() {
  var labelsBlock = getNode("nvl");
  
  if (!labelsBlock) {
    return;
  }

  if (labelsBlock.getAttribute('SubLabelsProcessed') != 'true') {
    initializeSubLabels();
  }
  
  window.setTimeout(checkSubLabelsState, 200);
}

initializeSubLabels();

})();
