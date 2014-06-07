// ==UserScript==
// @name           pols203-framefixer
// @namespace      MAP
// @include        http://facweb.northseattle.edu/erolguin/pol230/*
// ==/UserScript==

(function()
{

document.title = "Political Science - International Relations - \"It's ok, 'cause I'm not a communist anymore.\""

var topFrame = document.getElementsByName('topFrame')[0];
topFrame.parentNode.removeChild(topFrame);

var frameSet = document.getElementsByTagName('frameset');
frameSet[0].setAttribute('rows', '*');
frameSet[1].setAttribute('cols', '180,*');

var leftFrame = document.getElementsByName('leftFrame')[0];
var linkTable = leftFrame.contentDocument.getElementsByTagName('table');
linkTable[0].setAttribute('width', '100%');

var mainFrame = document.getElementsByName('mainFrame')[0];

mainFrame.addEventListener('load',function () {
  var contentTable = mainFrame.contentDocument.getElementsByTagName('table')[0];
  contentTable.setAttribute('width', '100%');
},false);

})();