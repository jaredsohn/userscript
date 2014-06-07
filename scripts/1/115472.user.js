// ==UserScript==
// @name           Fetlife, Safe for Work
// @namespace      http://example.com
// @description	   "Safe for Work" theme for Fetlife
// @include        https://fetlife.com/*
// ==/UserScript==

(function(){

	document.at = document.querySelector
	document.search = function(css,f) {
		var nodes = document.querySelectorAll(css)
		for (var n = 0; n < nodes.length; n++) f(nodes.item(n))
	}
	
	function makeSafeForWork(string) {
		if (!string || string.length < 4) return string;
		return string.
			replace(/\b(BDSM|Bottom|Bondage)\w*\b/ig,'B').
			replace(/\b(Slut|Slave|Sub)\w*\b/ig,'S').
			replace(/\bFetish\w*\b/ig,'F').
			replace(/\bKink\w*\b/ig,'K').
			replace(/\bPoly\w*\b/ig,'P').
			replace(/\bRope\w*\b/ig,'R').
			replace(/\bTop\w*\b/ig,'T').
			replace(/\bDom\w*\b/ig,'D').
			replace(/\bFetlife\b/ig,'Funlife')
	}

	function search(xpath,block) {
		var nodes = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
		for (var n = 0; n < nodes.snapshotLength; n++) block(nodes.snapshotItem(n))
	}
	
	removeNode = function(node) {
		node.parentNode.removeChild(node)
	}

	useClassicEventPages = function(node) {
		var href = node.getAttribute('href')
		if (/events.\d+$/.test(href)) node.setAttribute('href',href+'/v1')
	} 

	var ad = /adgear/.test(document.location)

	// Script starts here
	
	if (ad) {
		GM_addStyle('body { background: rgb(0,33,49) } .ad { background: none; } .ad img { opacity: 0.05; }');
		search('//text()',function(node){node.data = makeSafeForWork(node.data)})
		return // exit
	}

	GM_addStyle("\
		body > header { background: #333333 -moz-linear-gradient(#333333, #111111); } \
		body { background: rgb(0,33,49) url('http://twitter.com/images/themes/theme15/bg.png') no-repeat fixed; } \
		#main_content, .event_header, ul.group_listings li a.group_listing, \
		  .stickies ul li a { background: rgba(0,0,0,0.14); } \
		ul.group_listings li a.new_items, .groups_search, nav.hl .selected, form.open p, form.closed p, \
		  .icomment, #user_picture section#picture a.pic { background: rgba(0,0,0,0.42); } \
		.greybar { background-color: transparent; border: none } \
	")
		
	GM_addStyle("\
		img { opacity: 0.20; } \
		img.avatar { opacity: 0.80; } \
		img:hover { opacity: 1; } \
	")

	document.title = makeSafeForWork(document.title)

	var longPath = '//body//text()[not(ancestor::p) and not(parent::textarea) and normalize-space()]'
	search(longPath,function(node){node.data = makeSafeForWork(node.data)})

	document.search('#main_content_w_secondary div.container', removeNode) // remove huge mess on homepage
	document.search('a.protect_pic', removeNode) // allow download of images
	document.search('p.ac a[href^="mailto:"]', removeNode) // remove email on feed page
	document.search('a[href^="/events"]', useClassicEventPages)

	document.at('header a[href="/fetishes"]').innerHTML = "More"
	document.at('header span.nickname').parentNode.innerHTML = "<span class='picto q'>y</span> Settings"

	document.at('div#trademark').innerHTML +=
		"<br><br>\"Safe For Work\" theme lovingly made by <a href='/users/373477'>Enumerator</a>."
	
})()



