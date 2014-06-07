// ==UserScript==
// @name horseheadhuffer-dethumb
// @namespace >>6883672
// @include http://funnyexam.com/*
// @include http://explainthisimage.com/*
// @include http://cantbeunseen.com/*
// @include http://spoiledphotos.com/*
// @include http://japanisweird.com/*
// @include http://searchenginesuggestions.com/*
// @include http://perfectlytimedphotos.com/*
// @include http://shitbrix.com/*
// @include http://diyfail.com/*
// @include http://roulettereactions.com/*
// @include http://morefailat11.com/*
// @include http://sparesomelol.com/*
// @include http://tattoofailure.com/*
// @include http://passedoutphotos.com/*
// @include http://stopdroplol.com/*
// @include http://chairmanlol.com/*
// @include http://objectiface.com/*
// @include http://yoimaletyoufinish.com/*
// @include http://funnytipjars.com/*
// @include http://iamdisappoint.com/*
// @include http://yodawgpics.com/*
// @include http://wtface.com/*
// @include http://joeblocked.com/*
// @include http://candidateequals.com/*
// @include http://extremeadvertisements.com/*
// @include http://pornsfw.com/*

// ==/UserScript==

function xpath(query, node) {
return document.evaluate(
query,
node || document,
null,
XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
null
);
}

var imgs = xpath('//a[@href][@class="thumbnail"]/img[contains(@src, "/icon/")]');
var len = imgs.snapshotLength;
for (var i = 0; i < len; ++i) {
var img = imgs.snapshotItem(i);
img.src = img.src.replace(/\/icon\//g, '/resized/');
img.parentNode.removeAttribute('class');
}