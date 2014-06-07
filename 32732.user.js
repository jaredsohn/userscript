// ==UserScript==
// @name           LiveJournal Ads remover
// @namespace      strukov.net
// @description    Remove ads from livejournal pages
// @include        http://*.livejournal.com/*
// ==/UserScript==


function getLikeElements(tagName, attrName, attrValue) {
  var startSet;
  var endSet = new Array( );
  if (tagName) {
    startSet = document.getElementsByTagName(tagName);    
  } else {
    startSet = (document.all) ? document.all : 
    document.getElementsByTagName("*");
  }
  if (attrName) {
    for (var i = 0; i < startSet.length; i++) {
      if (startSet[i].getAttribute(attrName)) {
        if (attrValue) {
          if (startSet[i].getAttribute(attrName) == attrValue) {
            endSet[endSet.length] = startSet[i];
          }
        } else {
          endSet[endSet.length] = startSet[i];
        }
      }
    }
  } else {
    endSet = startSet;
  }
  return endSet;
}

var collection = getLikeElements("div", "class", "adv");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("div", "class", "adv-block");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("div", "class", "promo-block no-widget-div");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("div", "class", "advert vertical");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("iframe", "src", "http://inf.sup.ru/show?cat=avito_common_ljcom");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("div", "class", "ljad ljad5linkunit");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};

var collection = getLikeElements("div", "class", "ljadwrapper-journal-after-post-c");
for (i = 0; i < collection.length; i++)
{
  collection[i].style.display = "none";
};