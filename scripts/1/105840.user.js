// ==UserScript==
// @name          Disable G.A. Elements
// @author        blackledger
// @namespace     http://www.ncleg.net/
// @description	  Removes superfluous menu items and shortens others on ncleg.net
// @version       1.5.4
// @include       http://www.ncleg.net/*
// @include       http://ncleg.net/*
// @include       http://www.ncga.state.nc.us/*
// @include       http://ncga.state.nc.us/*
// @icon          http://ncleg.net/favicon.ico
// ==/UserScript==

block_me1 = document.evaluate('//td[@class="menuItem"]/a[@href="/representation/redistricting.aspx"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i = 0; i < block_me1.snapshotLength; i++) {
  foo1 = block_me1.snapshotItem(i);
  foo1.parentNode.removeChild(foo1);
}

block_me1b = document.evaluate('//td[@class="menuItem"]/a[@href="/representation/WhoRepresentsMe.aspx"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i = 0; i < block_me1b.snapshotLength; i++) {
  foo1b = block_me1b.snapshotItem(i);
  foo1b.parentNode.removeChild(foo1b);
}

block_me1c = document.evaluate('//td[@class="menuItem"]/a[@href="/representation/WhoRepresentsMe.html"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i = 0; i < block_me1c.snapshotLength; i++) {
  foo1c = block_me1c.snapshotItem(i);
  foo1c.parentNode.removeChild(foo1c);
}

block_me2 = document.evaluate('//td[@class="menuItem"]/a[@href="/"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (i = 0; i < block_me2.snapshotLength; i++) {
  foo2 = block_me2.snapshotItem(i);
  foo2.parentNode.removeChild(foo2);
}

$x=function(xpath,root){var doc=root?root.evaluate?root:root.ownerDocument:document,next;var got=doc.evaluate(xpath,root||doc,null,null,null),result=[];while(next=got.iterateNext())result.push(next);return result;};

var searchString = {
  1: 'About NCGA',
  2: 'Legislation/Bills',
  3: 'width: 1000px; ',
  4: 'width: 505;'
};

var replacString = {
  1: 'About',
  2: 'Legislation',
  3: 'width: 800px; ',
  4: 'width: 50%;'
};

for (i = 1; i < 6; i++) {
  var searchTmp = searchString[i];
  var replacTmp = replacString[i];

  Array.forEach($x("//text()[contains(.,'"+searchTmp+"')]"),function(item){
  item.parentNode.innerHTML=item.parentNode.innerHTML.replace(new RegExp(searchTmp,"g"),replacTmp);
  });
};
