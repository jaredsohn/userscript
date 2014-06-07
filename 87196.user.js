// ==UserScript==
// @name           bbros
// @namespace      bb_dot_com
// @description    add download links to preview pages (only works if you have a password)
// @include        http://*bangbros.com/*/intro*
// ==/UserScript==


var playerDiv = document.getElementById('player');

if (playerDiv != null) {
  var shootNum = document.location.href.match(/\?s=(.*)[^\&]*/)[1];
  
  if (shootNum != null) {
    insertAfter(createLowLink(shootNum), playerDiv);
    insertAfter(createHighLink(shootNum), playerDiv);
  }
}

function createHighLink(shootNum) {
  var urlText = "http://old.bangbros.com/membercheck?path=" + shootNum + "/streaming/&fname=" + shootNum + "_3000.mp4&fd=1&dontstream=1";
  return createLink('download HD', urlText);
}

function createLowLink(shootNum) {
  var urlText = "http://old.bangbros.com/membercheck?path=" + shootNum + "/streaming/&fname=" + shootNum + "500k.wmv&fd=1&dontstream=1";
  return createLink('download SD', urlText);
}

function insertAfter(theItem, theSpot) {
  theSpot.parentNode.insertBefore(theItem, theSpot.nextSibling);
}

function createLink(text, href) {
  var returnVal = document.createElement('a');
  returnVal.appendChild(document.createTextNode(text));
  returnVal.href = href;
  returnVal.style.paddingLeft = '15px';
  return returnVal;
}