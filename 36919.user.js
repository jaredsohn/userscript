// 

// ==UserScript==

// @name          mononoke-bt_clear_icons

// @namespace     http://test.com

// @description   Vire les icones des pages de mononoke-bt.org

// @include       http://mononoke-bt.org/*

// @include       http://*.mononoke-bt.org/*

// ==/UserScript==


allImages = document.evaluate(

    '//img[@usemap]',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);



for (i=0; i<allImages.snapshotLength; i++) { 

  allImages.snapshotItem(i).parentNode.removeChild(allImages.snapshotItem(i));

}

allMaps = document.evaluate(

    '//map',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);



for (i=0; i<allMaps.snapshotLength; i++) { 

  allMaps.snapshotItem(i).parentNode.removeChild(allMaps.snapshotItem(i));

}

maps = document.getElementsByTagName('map');
for (i=0; i<maps.length; i++) {
  maps[i].parentNode.removeChild(maps[i]);
}

p = document.evaluate(

    '//div[@class="topwelcomebar"]//p',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null).snapshotItem(3);
p.parentNode.removeChild(p);

h3 = document.evaluate(

    '//td[@class="outer"]/h3',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null).snapshotItem(0);
h3.parentNode.removeChild(h3);

p = document.evaluate(

    '//td[@class="outer"]/p',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null).snapshotItem(0);
p.parentNode.removeChild(p);

br = document.evaluate(

    '//td[@class="outer"]/br',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);
for (i=0; i<3; i++) {
  br.snapshotItem(i).parentNode.removeChild(br.snapshotItem(i));
}


hr = document.evaluate(

    '//td[@class="outer"]/hr',

    document,

    null,

    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

    null);
for (i=0; i<2; i++) {
  hr.snapshotItem(i).parentNode.removeChild(hr.snapshotItem(i));
}