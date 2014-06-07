// ==UserScript==
// @name           EVElopedia Tidyup
// @namespace      http://userscripts.org/users/74780
// @description    Makes some small but much-needed changes to EVElopedia
// @include        http://wiki.eveonline.com/*
// @include        https://wiki.eveonline.com/*
// @include        http://wiki.eve-online.com/*
// @include        https://wiki.eveonline.com/*
// ==/UserScript==
var allLinks, thisLink;
allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
  thisLink = allLinks[i];
  if ((thisLink.href.indexOf('action=edit') > 0) && (thisLink.innerHTML.indexOf('Edit') == -1) && (thisLink.innerHTML.indexOf('+') == -1)) {
    thisLink.style.color = 'red';
  } else if ((thisLink.href.indexOf('action=edit') > 0) && (thisLink.innerHTML.indexOf('Edit') > 0) && document.getElementById('bodyContent').innerHTML.indexOf('noarticletext') > 0) {
    thisLink.style.color = 'green';
    thisLink.innerHTML = 'Create';
  }
}