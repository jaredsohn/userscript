// ==UserScript==
// @name            Pitchfork/Newzleech search
// @namespace       http://userscripts.org/scripts/
// @include         http://www.pitchforkmedia.com/*
// @include         http://pitchforkmedia.com/*
// @include         http://www.pitchfork.com/*
// @include         http://pitchfork.com/*
// @description     A mash-up to create a quick link to the global search on Newzleech from a Pitchfork review you are reading
// @version         1.0.4
// ==/UserScript==

function do_script(){
	/*if(document.location.href.match(/article\/record_review/) == 'article/record_review' || document.location.href.match(/\/node\//) == '/node/'){
		try{getSearchParams(window.document,document.evaluate('//h2[@class="fn"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);}catch(err){}
	}*/
	if(document.location.href.match(/reviews\/albums/) == 'reviews\/albums' || document.location.href.match(/\/node\//) == '/node/'){
		try{getSearchParams(window.document,document.evaluate('//h2[@class="title"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);}
		catch(err){}
	}
}
window.addEventListener("load", function() { do_script() }, false);

function getSearchParams(doc, element){
	var easynewsURL = '';
	match_re = new RegExp(/\<span class="artists"\>\s+\<a href="[\/\d\w\-]+"\>\<b\>([\w\s'\?!:\.\W]+)\<\/b\>\<\/a>\s+\<\/span\>\s+\<br\>\s+\<span class="albums"\>\s+\<a href="[\/\d\w\-]+"\>([\w\s'\?!:\.\W]+)\<\/a>\s+\<\/span\>/);
	match_re2 = new RegExp(/_|[^\w\d√°√Å√¢√Ç√†√Ä√•√Ö√£√É√§√Ñ√¶√Ü√ß√á√∞√ê√©√â√™√ä√®√à√´√ã√≠√ç√Æ√é√¨√å√Ø√è√±√ë√≥√ì√¥√î√≤√í√∏√ò√µ√ï√∂√ñ√ü√æ√û√∫√ö√ª√õ√π√ô√º√ú√Ω√ù√ø\s]+/g);
	
	if (element.innerHTML && element.innerHTML.search(match_re) != -1) {
		easynewsURL = element.innerHTML.replace(match_re, "$1/$2");
		
		easynewsURL = easynewsURL.split(/\//);
		artist = easynewsURL[0];
		title = easynewsURL[1];
		
		match_re4 = new RegExp(/√±/g);
		match_re5 = new RegExp(/√†|√°|a|√¢|√£|√§|√•/g);
		match_re6 = new RegExp(/&amp|\band\b/g);
		match_re7 = new RegExp(/√©|√®|√™|√´/g);
		match_re8 = new RegExp(/√≥|√≥|√¥|√µ|√∂/g);
		match_re9 = new RegExp(/√¨|√≠|√Æ|√Ø/g);
		match_re10 = new RegExp(/√π|√∫|√ª|√º/g);
		match_re11 = new RegExp(/√ß/g);
		match_re12 = new RegExp(/\s+/g);
		
		title = title.replace(/\bEP\b$/, "");
		
		artist = artist.replace(match_re6, "");
		title = title.replace(/&amp;/, "");
		
		artist = artist.replace(match_re2, "");
		title = title.replace(match_re2, "");
		
		artist = artist.replace(match_re4, "n");
		title = title.replace(match_re4, "n");
		
		artist = artist.replace(match_re5, "a");
		title = title.replace(match_re5, "a");
		
		artist = artist.replace(match_re7, "e");
		title = title.replace(match_re7, "e");
		
		artist = artist.replace(match_re8, "o");
		title = title.replace(match_re8, "o");
		
		artist = artist.replace(match_re9, "i");
		title = title.replace(match_re9, "i");
		
		artist = artist.replace(match_re10, "u");
		title = title.replace(match_re10, "u");
		
		artist = artist.replace(match_re11, "c");
		title = title.replace(match_re11, "c");
		
		artist = artist.replace(match_re12, "+");
		title = title.replace(match_re12, "+");
		
		easynewsURL = artist + '+' + title;
		
		html_insert_it(window.document,document.evaluate('//table/tbody/tr/td[2]/table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,'<div style="color:#FF6600; padding:20px; margin:10px 0px 10px 0px; border: 1px dashed #ff6600; clear:both;"><a href="http://www.newzleech.com/?group=&minage=&age=&min=min&max=max&q='+easynewsURL+'&m=search&adv=" target="_blank">Click here</a> if you would like to search Easynews for this album.',false,true);
	}
}
function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
		parent.insertBefore(newNode, refChild);
    else
		parent.appendChild(newNode);
};
function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};