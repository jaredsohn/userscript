// ==UserScript==
// @name           Facebook: Fejs-o-loler
// @namespace      marooned/fejs-funny
// @description    Make usable all those "funny" sites required FB login
// @include        http://www.megademot.com/*
// @include        http://www.temysli.pl/*
// @include        http://szafunia.pl/*
// @include        http://www.alestyll.com/*
// @include        http://profesorki.pl/*
// @include        http://www.pomyslodawcy.pl/*
// @include        http://niefartfb.pl/*
// @include        http://www.megademocik.pl/*
// @include        http://tinypic.com/*
// @include        http://fajniutko.pl/*
// @include        http://memawyslij.pl/*
// @include        http://wklejmema.pl/*
// @include        http://cudne.pl/*
// @include        http://www.smajler.pl/*
// @include        http://fungine.net/*
// @include        http://niepowazna.pl/*
// @include        http://www.pantofelek.pl/*
// @include        http://maxlol.pl/*
// @include        http://www.kaba-rety.pl/*
// @version        19
// @author         Marooned
// @date           2013-12-02 (reviewed)
// ==/UserScript==

//domains (without www.)
var data = {
	'megademot.com': {path: '//meta[@itemprop="image"]', attr: 'content'},
	'temysli.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'szafunia.pl': {path: '//a[@rel="prettyPhoto[gal]"]', attr: 'href'},
	'alestyll.com': {path: '//meta[@property="og:image"]', attr: 'content', search: '_miniatura'},
	'profesorki.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'pomyslodawcy.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: 'minfb/'},
	'niefartfb.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'megademocik.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'tinypic.com': {path: '//img[@id="imgElement"]', attr: 'src'},
	'fajniutko.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'memawyslij.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: 'mini', replace: 'img'},
	'wklejmema.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: 'mini', replace: 'img'},
	'cudne.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'smajler.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: '_miniatura'},
	'fungine.net': {path: '//meta[@property="og:image"]', attr: 'content'},
	'niepowazna.pl': {path: '//meta[@property="og:image"]', attr: 'content'},
	'pantofelek.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: '/fb'},
	'maxlol.pl': {path: '//meta[@property="og:image"]', attr: 'content', search: 'hidden-crop-'},
	'kaba-rety.pl': {path: '//meta[@property="og:image"]', attr: 'content'}
};

var img;
var info = data[document.location.host.replace(/^www\./,'')];
if (info) {
	var elements = document.evaluate(info.path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elements.snapshotLength) {
		img = elements.snapshotItem(0).getAttribute(info.attr);
		if (img && info.search) {
			img = img.replace(info.search, info.replace || '');
		}
	}
}

if (img) {
	document.location = img;
}