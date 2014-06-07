// ==UserScript==

// @name           Mod edit

// @namespace      http://userscripts.org

// @author         Anon

// @description    Adds a button to mod edit your posts

// @include        http*://*what.cd/*

// @exclude        http*://*last*fm/*what*cd*
// @version        0.5

// ==/UserScript==





var modtag = GM_getValue('mod_edit_tag');



if (!GM_getValue('mod_edit_tag')) {

	var tag = window.prompt('Enter your mod tag without the [ and ]');

	if (tag) {

		GM_setValue('mod_edit_tag', tag);

		modtag = tag;

	}

}



//Copied from whatbb

unsafeWindow.swIt = function (ta) {

	var st = ta.scrollTop;

	if (ta.selectionStart | ta.selectionStart == 0) {

		// work around Mozilla Bug #190382

		if (ta.selectionEnd > ta.value.length)

			ta.selectionEnd = ta.value.length;

			var forEnd = ta.selectionStart;

			var AfterStart = ta.selectionEnd;

			var taFor = ta.value.slice(0, forEnd);

			var taSelected = ta.value.slice(forEnd, AfterStart);

			var taAfter = ta.value.slice(AfterStart);

			taSelected = unsafeWindow.swItText(taSelected);

			ta.value = (taFor + taSelected + taAfter);

			// reset selection & focus... after the first tag and before the second 

			ta.selectionStart = forEnd;

			ta.selectionEnd = forEnd + taSelected.length;

			ta.scrollTop = st;

	} 

}



unsafeWindow.swItText = function (text) {



	//quoteregexp = /\[sw[\s\S]*?\]|\[\/color\]/gi;

	quoteregexp = new RegExp("\\["+modtag+"[\\s\\S]*?\\]|\\[\\/color\\]", "gi");

	text = text.replace(quoteregexp, '');

	urlregexp = /\[url=((?:https?|ftps?|irc):\/\/[\s\S]*?)\]([\s\S]*?)\[\/url\\]/ig;

	urlmatch = urlregexp.exec(text);

	while (urlmatch != null){

		text = text.replace(urlmatch[0], '[/'+modtag+'][url=' + urlmatch[1] + ']['+modtag+']' + urlmatch[2] + '[/'+modtag+'][/url]['+modtag+']');

		urlmatch = urlregexp.exec(text);

	}

	justurlregexp = /\[url\]((?:https?|ftps?|irc):\/\/([\s\S]*?))\[\/url\]/ig;

	justurlmatch = justurlregexp.exec(text);

	while (justurlmatch != null){

		text = text.replace(justurlmatch[0], '[/'+modtag+'][url=' + justurlmatch[1] + ']['+modtag+']' + justurlmatch[2] + '[/'+modtag+'][/url]['+modtag+']');

		justurlmatch = justurlregexp.exec(text);

	}

	linkregexp = /\b(?:https?|ftp|ftps|irc):\/\/((?![^\s]*?(?:\[\/url\\]|\]))[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$])/ig;

	linkmatch = linkregexp.exec(text);

	while (linkmatch != null){	

		text = text.replace(linkmatch[0], '[/'+modtag+'][url=' + linkmatch[0] + ']['+modtag+']' + linkmatch[1] + '[/'+modtag+'][/url]['+modtag+']');	

		linkmatch = linkregexp.exec(text);

	}

	text = '['+modtag+']' + text + '[/'+modtag+']';

	//pointlessregexp = /\[sw\]\[\/color\]/gi;

	pointlessregexp = new RegExp("\\["+modtag+"\\]\\[\\/color\\]", "gi");

	text = text.replace(pointlessregexp, '');



	return text;

}





window.addEventListener("load", function(e) {

	if(document.getElementById('quickreplytext') != null) {

		buttons = document.getElementById('quickreplytext');
		buttons.parentNode.innerHTML = buttons.parentNode.innerHTML + '<input type="button" onClick="swIt(document.getElementById(\'quickpost\'));" value="Mod edit" /> ';

	}

	

	var els = document.getElementsByTagName('a');

	for(var i = 0; i<els.length; i++) {

		if(els[i].innerHTML  == "[Edit]") {

			els[i].addEventListener("click", editClicked, true);

		}

	}

}, false);



function editClicked(e) {

	var postid = this.getAttribute("href").replace("#post", "");

	buttons = document.getElementById('bar' + postid);

	buttons.innerHTML = '<input type="button" onClick="swIt(document.getElementById(\'editbox'+postid+'\'));" value="Mod edit" /> ' + buttons.innerHTML;

}