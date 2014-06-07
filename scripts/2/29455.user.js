// ==UserScript==
// @name          Insert Selected Quote into Your Reply
// @description	  When you select text in a user's comment and click the reply button, the selection will automatically get included into your reply on Lifehacker (and other Gawker Media sites).
// @namespace     http://ginatrapani.org/workshop/firefox/betterlifehacker/
// @include       http://lifehacker.com/*
// @include       http://gizmodo.com/*
// @include       http://io9.com/*
// @include       http://jezebel.com/*
// @include       http://consumerist.com/*
// @include       http://kotaku.com/*
// @include       http://gawker.com/*
// @include       http://deadspin.com/*
// @include       http://jalopnik.com/*
// @include       http://defamer.com/*
// @include       http://fleshbot.com/*

// @author	Gina Trapani
// @enabledbydefault true
// ==/UserScript==


window.getElementsByClass = function(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var replyBtns;
replyBtns = window.getElementsByClass('commentToolReply');
//GM_log(main.length);
for (var i=0; i < replyBtns.length; ++i) 
	replyBtns[i].addEventListener("mousedown", ganjaAddQuote, true);


function ganjaAddQuote(  ) {
	if (window.getSelection().toString()!="") {
		if (document.getElementById('text').value != "" ) {
			document.getElementById('text').value = document.getElementById('text').value + "\n";
		}
		document.getElementById('text').value=document.getElementById('text').value + "<i>\"" + window.getSelection().toString() + "\"</i> \n";
		document.getElementById('text').focus();
	}
    return true;
}


/*
document.addEventListener('mouseup', function(event) {
	if (window.getSelection()!='')	{
		GM_setValue("quote", "<i>"+window.getSelection().toString()+"</i>\n");
		GM_log("selection=" + GM_getValue("quote", ""));
	} else {
		GM_setValue("quote", '');
		GM_log("cleared");
	}
}, true);
*/