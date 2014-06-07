// ==UserScript==
// @name           Wikipedia with NoScript
// @namespace      http://arkq.awardspace.us/
// @description    Use some useful wiki scripts when NoScript is on
// @include        http://*.wikipedia.org/*
// @version        0.1.7
// @author         (c) Arkadiusz Bokowy (based on wiki scripts)
// ==/UserScript==


var wikiScript = {
user_lang: false, //set it to your proffered language (default: browser lang)
                 //for German: user_lang: 'de',
                 //for Polish: user_lang: 'pl',
hider_id: 'hideSidebarElement',
hidden: false,

enwiki: false,
userwiki: false,

// Skin dependent elements modifications info
// = [[elemID, styleProp], ...]
modifElems_monobook: [['content', 'margin-left:0'], ['p-cactions', 'left:0'],
		['p-logo', 'display:none'], ['p-navigation', 'display:none'],
		['p-search', 'display:none'], ['p-interaction', 'display:none'],
		['p-tb', 'display:none'], ['p-coll-print_export', 'display:none'],
		['p-lang', 'display:none'],
// PL-lang fix
		['p-zmiany', 'display:none'], ['p-dla_edytor.C3.B3w', 'display:none']],
modifElems_modern: [['mw_content', 'margin-left:0'],
		['p-cactions', 'margin-left:0'], ['mw_portlets', 'display:none']],
modifElems_vector: [['content', 'margin-left:0'],
		['mw-head-base', 'margin-left:0'], ['footer', 'margin-left:0'],
		['left-navigation', 'left:0'], ['mw-panel', 'display:none']],

// Perform show/hide action
modifElems: null,
actionModifElems: function() {
	var hider = document.getElementById(wikiScript.hider_id);

	if(wikiScript.hidden != true) {
		GM_setValue('SBhidden', 1);
		wikiScript.hidden = true;
		hider.innerHTML = '»';

		// set new (our) style
		for (x in wikiScript.modifElems) {
			var elemInfo = wikiScript.modifElems[x];
			var elem = document.getElementById(elemInfo[0]);
			if(!elem) continue;
			elem.setAttribute('style', elemInfo[1]);
		}
	}
	else {
		GM_setValue('SBhidden', 0);
		wikiScript.hidden = false;
		hider.innerHTML = '«';

		// remove our style (back to default)
		for (x in wikiScript.modifElems) {
			var elemInfo = wikiScript.modifElems[x];
			var elem = document.getElementById(elemInfo[0]);
			if(!elem) continue;
			elem.removeAttribute('style');
		}
	}
},

// Determine used wiki skin
testWikiSkin: function(className) {
	var sTypes = [['skin-monobook', wikiScript.modifElems_monobook],
		['skin-modern', wikiScript.modifElems_modern],
		['skin-vector', wikiScript.modifElems_vector]];

	// default skin (if from some reasons it is not possible to determine one)
	wikiScript.modifElems = wikiScript.modifElems_monobook;

	var classVar = className.split(' ');
	for (x in sTypes)
		if(sTypes[x][0] == classVar[classVar.length - 1])
			wikiScript.modifElems = sTypes[x][1];
},

// Get 'lang' language wiki link from langBox (otherwise return false)
get_langlink: function(lang) {
	var lang_div = document.getElementById('p-lang');
	if(lang_div == null) return false;
	var wlinks = lang_div.getElementsByTagName('a');
	var re = new RegExp(lang.toLowerCase() + '.wikipedia.org', 'g');
	for(x in wlinks) if(re.test(wlinks[x].href))
		return wlinks[x].href;
	return false;
},

// Insert quick link to EN or userLang wiki to article title
quick_wiki_link: function() {
	if(/en.wikipedia.org/.test(window.location)){
		if(wikiScript.userwiki == false) return;
		var lnk = wikiScript.userwiki;
		var ttl = wikiScript.userwiki.replace(/.*\//, '');
		var lng = wikiScript.user_lang.toUpperCase();}
	else{
		if(wikiScript.enwiki == false) return;
		var lnk = wikiScript.enwiki;
		var ttl = wikiScript.enwiki.replace(/.*\//, '');
		var lng = 'EN';}

	ttl = decodeURI(ttl).replace(/_/g, ' ');

	var heading = document.getElementById('firstHeading');
	var clr = document.defaultView.getComputedStyle(heading, '')['color'];

	// PL.wiki shitty script overcome... :/
	var innerDiv = heading.getElementsByTagName('div')[0];
	if(innerDiv) heading = innerDiv;

	heading.innerHTML += ' [<a href="' + lnk	+ '" title="'
			+ ttl + '" style="color:' + clr + '">' + lng + '</a>]';
},

init: function() {
	var body = document.getElementsByTagName('body')[0];
	var hider = document.createElement('div');
	hider.id = wikiScript.hider_id;
	hider.style.cssText = 'cursor:pointer; color:#696; font-weight:bold;' +
			'font-size:20px; left:0px; bottom:0px; padding:2px; z-index:101;' +
			'position:fixed;';
	hider.innerHTML = '«';
	body.appendChild(hider);

	// determine current wiki skin and register click event
	wikiScript.testWikiSkin(body.className);
	hider.addEventListener('click', wikiScript.actionModifElems, false);

	// test default action
	if(GM_getValue('SBhidden', 0) == 1) wikiScript.actionModifElems();

	// try to get en.wiki and user_lang.wiki links
	if(wikiScript.user_lang == false)
		wikiScript.user_lang = navigator.language.substring(0, 2)
	wikiScript.enwiki = wikiScript.get_langlink('en');
	wikiScript.userwiki = wikiScript.get_langlink(wikiScript.user_lang);

	wikiScript.quick_wiki_link();
}
}

wikiScript.init();
