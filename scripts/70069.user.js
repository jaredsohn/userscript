// ==UserScript==
// @name           Second Life Forums: Add Quote Button
// @namespace      https://blogs.secondlife.com/*
// @include        https://blogs.secondlife.com/post*btjquote
// @include	   https://blogs.secondlife.com/message/*
// @include	   https://blogs.secondlife.com/thread/*
// ==/UserScript==

// --- when you post a reply from the "quote" link ---

if (window.location.href.search(/btjquote/) != -1) {

    var btjQuoteText;

    // --- retrieve the quoted text and fix it ---

    btjQuoteText = unsafeWindow._jive_gui_quote_text;
   
    btjQuoteText = btjQuoteText.replace(/<div class=.jive-rendered-content.>/,'');
    btjQuoteText = btjQuoteText.replace(/<span class=.jive-quote-header.>/, '<pre class=\"jive_text_macro jive_macro_quote\" jivemacro=\"quote\"><p>');
    btjQuoteText = btjQuoteText.replace(/<.blockquote>/,'');
    btjQuoteText = btjQuoteText.replace(/<blockquote[^>]*>/,'');
    btjQuoteText = btjQuoteText.replace(/wrote:<.span><br .><br .>/,'wrote:<\/p>');
    btjQuoteText = btjQuoteText.replace(/<.div>$/,'<\/pre><p><\/p>');

    // --- stick the quoted text into the window ---

    var btjTextArea = document.getElementById('wysiwygtext');
    btjTextArea.innerHTML = btjQuoteText;


// --- this part adds the "quote" link to each post ---

} else {

    var allElements, thisElement;

    // --- first, find all the "reply" links in posts ---

    allElements = document.evaluate(
	"//a[@class='jive-thread-reply-link']",
	document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

    for (var i = 0; i < allElements.snapshotLength; i++) {
	thisElement = allElements.snapshotItem(i);

        // --- create the quote link ---

	var btjQuoteLink = document.createElement('a');
	btjQuoteLink.innerHTML = 'Quote';
	btjQuoteLink.setAttribute('class','jive-thread-reply-link');
	btjQuoteLink.setAttribute('title','Reply and quote');

	// --- add the key that calls the quoting business above ---

        btjQuoteLink.href = thisElement.href + '&btjquote';

        // --- stick the quote link after the ordinary reply link ---

	thisElement.parentNode.appendChild(btjQuoteLink);
    }
}
