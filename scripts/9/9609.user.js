///////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name           Jyte Claims Tree
// @description    Displays related claims as hierarchical tree.
// @namespace      http://quezako.jyte.com/
// @include        http://quezako.jyte.com/cl/*
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////
// NOTE
// version 1.0.4
// 20 Dec 2010
// fixd site host name

// version 1.0.3
// 27 Jun 2008
// added inspiring comment preview
// added settings ui
//
// version 1.0.2
// 5 Jun 2007
// implemented Settings.autoShowRelationsTree
// fixed - anchor url with #comment_n
//
// version 1.0.1
// 4 Jun 2007
// fixed voting in place
//
// version 1.0.0
// 1 Jun 2007
//
///////////////////////////////////////////////////////////////////////////////
// TODO
// [x] follow claim inspired by comments
// [x] download progress counters/done
// [x] show/hide whole tree
// [x] show/hide description
// [x] settings: distance, enable/disable, desc auto/manual
// [x] bring description
// [x] bring vote
// [x] bring score
// [x] hide border of container when empty
// [x] show inspiring comment
// [x] show descendants count and visual feedback on the control
// [ ] expand/collapse descendants to one level
// [x] disabled indication on 'arrow' button and no pointer when disabled
// [ ] ui for settings
///////////////////////////////////////////////////////////////////////////////
// FIXME
// [x] voting disapears
// [x] voting navigates to claim instead of doing it in place
// [x] recursive inspiration halting (http://quezako.jyte.com/cl/this-claim-will-inspire-itself)
// [ ] circular relations are not handled
// [ ] private group claims are counted but can't be retrieved
// [x] normalize url location url
///////////////////////////////////////////////////////////////////////////////
// http://diveintogreasemonkey.org/toc/
// http://www.oreillynet.com/lpt/a/6257
// http://www.jibbering.com/faq/faq_notes/closures.html
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
// settings
///////////////////////////////////////////////////////////////////////////////
var Settings = {

	// don't do anything
	disabled:				GM_getValue('rcl.disabled', false),

	autoShowDescription:	GM_getValue('rcl.autoShowDescription', false),

	autoRetrieveRelations:	GM_getValue('rcl.autoRetrieveRelations', true),

	autoShowRelationsTree:	GM_getValue('rcl.autoShowRelationsTree', false),
	
	// how far relations are followed
	maxDistance: 			GM_getValue('rcl.maxDistance', 12),

	showLog:				GM_getValue('rcl.showLog', false),
}

///////////////////////////////////////////////////////////////////////////////
// Utils
///////////////////////////////////////////////////////////////////////////////
function rcl$ (id) {
	return document.getElementById(id);
}

function addClassName (elem, className) {
	elem.className = elem.className + ' ' + className;
}

function removeClassName (elem, className) {
	elem.className = elem.className.replace(className, '');
}

///////////////////////////////////////////////////////////////////////////////
// log
///////////////////////////////////////////////////////////////////////////////
var Log = {
	logElem: null,
	
	init: function () {
		GM_addStyle('.rcl_log_dump_class { background: #f5f5f5; font-family: fixed; }');
		
		this.logElem = document.createElement('div');
		this.logElem.id = 'rcl_log_elem_id';
		this.logElem.style.width = '100%';
		this.logElem.style.height = '120px';
		this.logElem.style.overflow = 'auto';
		this.logElem.style.display = 'none';

		var clbox = rcl$('claim_actions_box');
		if (clbox) { clbox.parentNode.insertBefore(this.logElem, clbox.nextSibling); }
	},
	
	write: function (text) {
		if (this.logElem) this.logElem.innerHTML += '<br/>' + text;
	},

	dump: function (title, obj) {
		var d = '<p class="rcl_log_dump_class">--------------- ' + title + ' -------------<br/>';
		for (i in obj) {
			d += i + ' = ' + obj[i] + '<br/>';
		}
		d += '-------------------------------------------<br/></p>';
		this.write(d);
	},
	
	show: function () {
		if (this.logElem) this.logElem.style.display = 'block';
	},

	hide: function () {
		if (this.logElem) this.logElem.style.display = 'none';
	}
}

///////////////////////////////////////////////////////////////////////////////
// xpath utilities
///////////////////////////////////////////////////////////////////////////////

// return a snapshot nodes array
function xpathGetNodes (root, xpath) {
	return document.evaluate(xpath,
							root,
							null,
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
							null);
}

// return one snapshot node at 'index'
function xpathGetNode (root, xpath, index) {
	var a = document.evaluate(xpath,
							root,
							null,
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
							null);
	return (a && a.snapshotLength > index) ? a.snapshotItem(index) : null;
}

// return the first found node
function xpathGetFirstNode (root, xpath) {
	return document.evaluate(xpath,
							root,
							null,
							XPathResult.FIRST_ORDERED_NODE_TYPE,
							null).singleNodeValue;
}

// return the inner html of the first found node
function xpathGetInnerHTML (root, xpath) {
	var n = xpathGetFirstNode(root, xpath);
	return (n) ? n.innerHTML : null;
}

// return the string value of the first found node
function xpathGetStr (root, xpath) {
	return document.evaluate(xpath,
							root,
							null,
							XPathResult.STRING_TYPE,
							null).stringValue;
}

// return the integer value of the first found node
function xpathGetNum (root, xpath) {
	var val = document.evaluate(xpath,
							root,
							null,
							XPathResult.NUMBER_TYPE,
							null).numberValue;
	return parseInt(val);
}

///////////////////////////////////////////////////////////////////////////////
// Info for one claim
///////////////////////////////////////////////////////////////////////////////
var ClaimInfo = function (url) {
	// claim location
	this.url = url;
	this.isAnchor = false;
	// claim props
	this.claim = '';
	this.by = '';
	this.id = -1;
	this.desc = null;
	//the inspiring comment element id
	this.byComment = null;
	// comments on this claim that inspired other claims
	this.inspiringComments = null;
	// voting elements
	this.selfVote = '';
	this.voteColorClass = '';
	this.voteForScore = 0;
	this.voteAgainstScore = 0;
	this.voteForUrl = 0;
	this.voteAgainstUrl = 0;
	// relations
	this.parent = null;
	this.childs = new Array;
}

///////////////////////////////////////////////////////////////////////////////
// Extracts parts of a claim page
//
// the 'root' param is either 'document', for the current page,
// or the root element where a loaded related claim page was inserted.
///////////////////////////////////////////////////////////////////////////////
var ClaimDoc = {
	thisInspiredByXPath: 	".//div[@id='claims_spun_off_this']/h2[text()='This claim was inspired by']/"
						 	+ "following-sibling::ul[1]/li/a[starts-with(@href,'http://quezako.jyte.com/cl/')]",

	inspiredByThisXPath: 	".//div[@id='claims_spun_off_this']/h2[text()='Claims inspired by this one']/"
						 	+ "following-sibling::ul[1]/li/a[starts-with(@href,'http://quezako.jyte.com/cl/')]",

	inspiredByCommentXPath:	".//div[@id='all_comments']/table/tbody/tr//h4[text()='Claims inspired by this comment']/following-sibling::a",

	inspiringCommentsXPath:	".//div[@id='all_comments']/table/tbody/tr//h4[text()='Claims inspired by this comment']/ancestor::tr[starts-with(@id,'comment_')]",
	
	claimIdXPath: 			".//input[@id='claim_id']/@value",

	claimTextXPath:			".//div[@id='claim_box']/h1[@id='claim']",
	
	claimDescXPath:			".//div[@id='supporting_material']",

	claimByXPath:			".//div[@id='claim_box']/h4[@id='claim_made_by']",
	
	claimSelfVoteXPath:		".//div[@id='claim_box']/parent::*/script[contains(text(), 'liu_current_votes')]",
	
	claimVoteXPath:			".//div[@id='showing_vote']",

	// these are relative to claimVoteXPath
	claimVoteForScoreXPath:		"./a[@rev='vote-for']/span/text()",
	claimVoteAgainstScoreXPath:	"./a[@rev='vote-against']/span/text()",
	claimVoteForUrlXPath:		"./a[@rev='vote-for']/@href",
	claimVoteAgainstUrlXPath:	"./a[@rev='vote-against']/@href",
	
	// extract an array of claim urls
	getRelatedLinks: function (root, xpath, originUrl) {
		try {
			var arr = new Array;
			var res = xpathGetNodes(root, xpath);
			for (var i = 0; i < res.snapshotLength; i++) {
				//Log.write('xpathGetNodes : [' + i + '] = ' + res.snapshotItem(i));
				//Log.write(res.snapshotItem(i).href);
				var url = res.snapshotItem(i).href;
				if (url != originUrl) arr.push(url);
			}
			//Log.write(arr.length);
			return arr.length ? arr : null;
		}
		catch (e) {
			Log.write('getRelatedLinks - XPathException: "' + e.toString() + '"');
		}
		return null;
	},
	
	// get inspiring claim
	// returns a pair of {url, boolean}
	// url - the inspiring claim
	// bool - true if by comment
	getInspiringClaim: function (root, originUrl) {
		var a = xpathGetNodes(root, this.thisInspiredByXPath);
		if (! a || ! a.snapshotLength) return null;
		
		var urlParts = a.snapshotItem(0).href.split('#');
		var url = urlParts[0];
		var byComment = urlParts[1];
		if (byComment && byComment.indexOf('comment_') != 0) {
			byComment = null;
		}
		if (a.snapshotLength > 1) {
			url = a.snapshotItem(1).href;
		}
		if (url == originUrl) return null;
		Log.write("getInspiringClaim found inspiring claim " + url + " for " + originUrl);
		return { url: url, byComment: byComment};
	},
	
	// get inspired claims
	// returns an array of urls
	getInspiredClaims: function (root, originUrl) {
		return this.getRelatedLinks(root, this.inspiredByThisXPath, originUrl);
	},
	
	// get claims inspired by comments
	// returns an array of urls
	getInspiredByCommentClaims: function (root, originUrl) {
		return this.getRelatedLinks(root, this.inspiredByCommentXPath, originUrl);
	},

	// get comments that inspired other claims
	getInspiringComments: function (root) {
		var a = xpathGetNodes(root, this.inspiringCommentsXPath);
		if (! a || a.snapshotLength == 0) return null;

		var comments = new Object;

		for (var i = 0; i < a.snapshotLength; i++) {
			var comment = a.snapshotItem(i);
			comments[comment.id] = comment.innerHTML;
		}
		
		return comments;
	},
	
	// extract details about the claim from the page at root node
	getClaimInfo: function (root, cl) {
		try {
			cl.claim = xpathGetStr(root, this.claimTextXPath);
			cl.id = xpathGetNum(root, this.claimIdXPath);
			cl.by = xpathGetInnerHTML(root, this.claimByXPath);
			cl.desc = xpathGetInnerHTML(root, this.claimDescXPath);
   			cl.inspiringComments = this.getInspiringComments(root);
			cl.selfVote = xpathGetInnerHTML(root, this.claimSelfVoteXPath);
			var votesNode = xpathGetFirstNode(root, this.claimVoteXPath);
			if (votesNode) {
				// this is the class name for the color
				cl.voteColorClass = votesNode.className.substr('showing_votes '.length);
				// these are relative to claimVoteXPath
				cl.voteForScore		= xpathGetStr(votesNode, this.claimVoteForScoreXPath);
				cl.voteAgainstScore	= xpathGetStr(votesNode, this.claimVoteAgainstScoreXPath);
				cl.voteForUrl		= xpathGetStr(votesNode, this.claimVoteForUrlXPath);
				cl.voteAgainstUrl	= xpathGetStr(votesNode, this.claimVoteAgainstUrlXPath);
			}
		}
		catch (e) {
			Log.write('>>>>>>>>>>> getClaimInfo - exception: "' + e.toString() + '"');
		}
	},

	// return true if related claims exist in the page at root
	hasRelated: function (root, originUrl) {
		return	this.getInspiringClaim(root, originUrl) != null ||
				this.getInspiredClaims(root, originUrl) != null ||
				this.getInspiredByCommentClaims(root, originUrl) != null;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Retrieve a claim page
//
// load a claim page into temporary container
// call 'handler' to handle the loaded page
// empty the temporary container
///////////////////////////////////////////////////////////////////////////////
var ClaimRetriever = function (handler, url, parentOf, childOf, distance) {
	this.handler	= handler;
	this.url		= url;
	this.parentOf	= parentOf;
	this.childOf	= childOf;
	this.distance	= distance;

	if (! rcl$('rcl_temp_page_container')) { this.insertTempContainer(); }
}

ClaimRetriever.prototype = {
	// intsert root element for loaded related claims
	insertTempContainer: function () {
		tempPageContainer = document.createElement('div');
		tempPageContainer.id = 'rcl_temp_page_container';
		tempPageContainer.style.display = 'none';

		var clbox = rcl$('claim_actions_box');
		if (clbox) {
			clbox.parentNode.insertBefore(tempPageContainer, clbox.nextSibling);
		}
	},
		
	// load this.url
	retriveUrl: function () {
		//Log.write("retriving: " + this.url);
		var retriever = this;
		GM_xmlhttpRequest({
			method: 'GET',
			url   : this.url,
			onload: function (response) {
					if (response.status == 200) {
						var tmp = rcl$('rcl_temp_page_container');
						tmp.innerHTML = response.responseText;
						retriever.handler.handleClaimDoc(retriever.url,
														 tmp,
														 retriever.parentOf,
														 retriever.childOf,
														 retriever.distance);
						tmp.innerHTML = '';
					}
				}
		});
 	}
}

///////////////////////////////////////////////////////////////////////////////
// Return an event handler in context of handler
///////////////////////////////////////////////////////////////////////////////
function newBtnEventHandler (handler, methodName) {
	return function (event) { handler[methodName](); };
}

function newBtnActionCallback (handler, methodName) {
	// 'this' is the button which was clicked
	// handler can check the 'activated' member for the btn state
	return function () { handler[methodName](this); };
}

///////////////////////////////////////////////////////////////////////////////
// IconButton
///////////////////////////////////////////////////////////////////////////////
function IconButton (title, imgs, text, callback) {
	this.highlight		= 0;
	this.activated		= 0;
	this.disabled		= false;
	this.disabledTxt	= null;
	this.title			= title;
	this.imgs			= imgs;
	this.action			= callback;
	this.btnDiv			= null;
	this.setText(text);
}

IconButton.prototype = {
	// create the btn DOM elements
	// return the button 'div'
	create: function () {
		var btnDiv = document.createElement('div');
		var btnImg = document.createElement('img');
		var btnTxt = document.createElement('text');

		btnDiv.appendChild(btnImg);
		btnDiv.appendChild(btnTxt);
		
		btnDiv.addEventListener('mouseover', newBtnEventHandler(this, 'onMouseOver'), true);
		btnDiv.addEventListener('mouseout', newBtnEventHandler(this, 'onMouseOut'), true);
		btnDiv.addEventListener('click', newBtnEventHandler(this, 'onClick'), true);
		
		btnDiv.className = 'rcl_toolbar_btn_class';
		
		this.btnDiv = btnDiv;
		
		this.update();
		
		return btnDiv;
	},

	setText: function (text) {
		if (text == null) text = '';
		this.txts		= (typeof text == 'string') 
						? [[text, text],[text, text]] 
						: (text.length == 2 && typeof text[0] == 'string') 
						? [[text[0], text[1]], [text[0], text[1]]] 
						: text;
	},
	
	isActive: function () {
		return (this.activated == 1);
	},
	
	update: function () {
		this.btnDiv.childNodes[0].src = this.imgs[this.highlight][this.activated];
		this.btnDiv.childNodes[1].innerHTML = 
			(this.disabled && this.disabledTxt) 
			? '&nbsp;' + this.disabledTxt
			: this.txts[this.highlight][this.activated] + '&nbsp;' + this.title;
	},
	
	activate: function (active) {
		this.activated = (active) ? 1 : 0;
		this.update();
		if (this.action) this.action();
	},

	setDisabled: function (disabled, disabledTxt) {
		if (this.disabled == disabled) return;
		this.disabled = disabled;
		if (disabledTxt != null) this.disabledTxt = disabledTxt;
		if (disabled) 
			addClassName(this.btnDiv, 'rcl_toolbar_btn_disabled_class');
		else
			removeClassName(this.btnDiv, 'rcl_toolbar_btn_disabled_class');
		this.update();
	},

	toggle: function () {
		if (this.disabled) return;
		this.activate(!this.isActive()); 
	},

	onMouseOver: function () {
		if (this.disabled) return;
		this.highlight = 1;
		this.update();
	},

	onMouseOut: function () {
		if (this.disabled) return;
		this.highlight = 0;
		this.update();
	},

	onClick: function () {
		this.toggle();
	},
	
	setTitle: function (title) {
		this.title = title;
		this.update();
	}
}

///////////////////////////////////////////////////////////////////////////////
// Icon sets
///////////////////////////////////////////////////////////////////////////////
var ArrowIcons = {
ral: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVQ4y6XSMQ6CMABA0U9"
	+"D1IkwuMPOgKPEaxhCGBy8CDdxcCCEeA9XPYRODg2TxkgdDAkSCyV2bf9r09ZSSvHPsLIs004Gy5WKFiGVlHNgVhb5pbtGDO1wPJ1xXPcGXOMkZTQQLcIGqYFJFx"
	+"kEhPWFPIBpGxEmF9VB7oDdIML0tjvIExBxkuqB9WY7hLxGnQCgVp9XCXyPSkoc1zUH2nHzhyopzYBfMUBZ5MNAX2z8E3WxEdAXA9i68LDfAViB7yldbHSCssi1M"
	+"cAbm0tZmvlRuh0AAAAASUVORK5CYII=",

rad: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAy0lEQVQ4y5XTPwrCMByG4Tf"
	+"F1it0ziHcHBVEd7vpMXoBoaNX6Jbu7VJnTyF07gnEP2hcrBRNk/hBliTfw49AhNYaW4rqEALhejk7m84DIQRDa5HudCzlDXgU1SEy3QlwJMsVsZQX4K7K+ncCF5"
	+"Bukg55AtE34gQirfvIFRj3ESdgQC7AqEO8AANyBwJV1sPA/nhyIY+/JgC4CUGWK7bTCW3TEEvpD/TL74i2afwAUxkgWc3dgK3s9Qa2shdgK382bVFlrYfK3jF9o"
	+"i4vh+5d5ySxINUAAAAASUVORK5CYII=",

dal: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAu0lEQVQ4y92SzQqCQBRGz1T"
	+"78BEE1wmCu5CeysfQjXsFXySGdsJArYOgTb2E3BYZiTrT365vfw4f935KREjTlG8z48f8gWABsFpv5FPwsNsqACUinC9X0Y0hiSPmSlmhVgTdGMLAB6CuSjUD0I"
	+"1RSRyhG0Mr8jbcb0DXYLLJEAYUwP54uh+xyDO6BqMmNhggDPznF2wSGzz5ximJC66rcryDocQFW4fUl7hg5xIfEhf8cspFnrH0PCsMcAMOrH0oPD0lfQAAAABJR"
	+"U5ErkJggg==",

dad: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAv0lEQVQ4y92SIQ7CQBAAZxv"
	+"CG9ANigfgSFANog84V35BBRJRfsG5ewISguMBYKCaN9QcgpY07fWA1LHuxEwmu4e1lj4T0HP+QDAAWKw2P29yv10LgFhrOV7vNtOGNFEMPVcpRMi0YTmbAqDiSA"
	+"KATBtJE0WmDYXI13C9gLLAWdKEAQHYnc4vgYhwuNycki74/agEgFPig1sCl8QHqzhqC5qSR553ws6CpqRW0IK9gkpSFjjhj195PhkzCsNOGOAJJHKEstQjnjsAA"
	+"AAASUVORK5CYII="
}

// icon set:
// +-----------+-------------+-------------+
// |           | deactivated |  activated  |
// +-----------+-------------+-------------+
// |   normal  |             |             |
// +-----------+-------------+-------------+
// | highlight |             |             |
// +-----------+-------------+-------------+
var ArrowBtnIconsSet = [ [ArrowIcons.ral, ArrowIcons.dal],[ArrowIcons.rad, ArrowIcons.dad] ];

var CheckBoxIcons = {
ucl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAF9"
	+"JREFUOMtjYBhowAhjLF638T+xmpaevMy4o7MG0wB9VWWCmi/evssAVceop6vDwIKuQFBYGL8Jt++icJkoDYNRAwaDASzoiQQ9nkkxgFFfVfk/2V44f+QgLGkTi6"
	+"kDABjUGCUz3MLMAAAAAElFTkSuQmCC",

ucd: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGV"
	+"JREFUOMtjYBhowAhjeJS3/CdF347OGgYGBgYGFmTRBFszgjoXHD7FkGBr9j/BdhdjhI8bqgEMDAwMcoqK+E04fAqFy0RpGIwaMBgMYEFPJOjxTIoBjAm2Zv/J9g"
	+"I0bTOSgKkDADA1FHjV5QysAAAAAElFTkSuQmCC",

ccl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAOd"
	+"JREFUOMvFk7EKwjAQhj+lo0IbqAhO4lBBfCP14VRwF3wCwV1E0EGcCqWFM9DudZCWNlatOHgQSEj+L38ud/DvaGST1XqT1hXtd9tcZxU3usoGwHWcSmF0uxGIZj"
	+"KdpcvFvAHQNA8FovHDCFupfPhhxOFyrQSXAK7joNotJE44ns4AHE9nJE5Q7ValqycHo6FXgmTiXsfFVuozwIRk4ldRCSjeLHGS56QWwLRt5uQjwLRdfI4WeQJY5"
	+"j+PB32AkuXR0EOL4IfRe0AgmkD0Y3G51qpKq1iek+ks/bYXSg6y8vwmmr924x3X6msKZBts0QAAAABJRU5ErkJggg==",

ccd: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAOZ"
	+"JREFUOMvFkjEOgjAUhj+NpwACwQsYFzcGY2IcPICb3sLF0cVb4OYBHIyJYejGQrwApAR6DR0MBAsKTr6kSV/b/+vf1wf/jl4xWWz3j66iy2FX6gbVjbFjMLKtj8"
	+"J7mhFJxel8fayW8x5Av3pgZFv4IiSIM2zXLUcQZ/gibIT39QXHNJC54ngTABxvApkrHNNodFUDrGfeG6QQT4cWtuu2A3RIIf4UjYDqzTJXZU06AXTbek1aAbrt6"
	+"nPSJKkBBvo/b7wJwJvl9cwjTRKCOPsOiKQikuqViPC3VgY4na+d27noxP/HEyiRZi4XdXkwAAAAAElFTkSuQmCC"
}

var CheckBoxIconsSet = [ [CheckBoxIcons.ucl, CheckBoxIcons.ccl],[CheckBoxIcons.ucd, CheckBoxIcons.ccd] ];

///////////////////////////////////////////////////////////////////////////////
// Claims tree toolbar
///////////////////////////////////////////////////////////////////////////////
var TreeToolbar = {
	// the number of downloads in progress
	downloadCount: 0,
	
	// the number of claims in the tree
	claimsCount: 0,

	// progress display element
	countDisplay: null,
	
	// tree show/hide button
	treeTogglerBtn: null,
	
	// insert the controls before 'beforeElem'
	insert: function (beforeElem) {
 		GM_addStyle(".rcl_toolbar_container_class { border-bottom: 1px #CBDDEE solid; }"
				 	+ ".rcl_toolbar_btn_class { cursor: pointer; display:inline; margin-left: 0.2em; margin-right: 1em; }"
					+ ".rcl_toolbar_btn_class img { vertical-align: middle; display: inline; border: none; }"
					+ ".rcl_toolbar_btn_class text { color: gray; }"
					+ ".rcl_toolbar_btn_class:hover text { color: #22525f; }"
					+ ".rcl_toolbar_btn_disabled_class { cursor: auto; }"
					+ ".rcl_toolbar_btn_disabled_class text { color: gray ! important; }");
 		
		var ctrlContainer = document.createElement('div');
		ctrlContainer.className = 'rcl_toolbar_container_class';

		this.treeTogglerBtn = new IconButton('Related claims', ArrowBtnIconsSet, '', newBtnActionCallback(this, 'onTreeToggleClick'));
		
 		ctrlContainer.appendChild(this.treeTogglerBtn.create());

		this.countDisplay = document.createElement('div');
		this.countDisplay.className = 'rcl_toolbar_btn_class';

		ctrlContainer.appendChild(this.countDisplay);
		
		this.settingsTogglerBtn = new IconButton('Settings', ArrowBtnIconsSet, '', newBtnActionCallback(this, 'onSettingsToggleClick'));
		
 		ctrlContainer.appendChild(this.settingsTogglerBtn.create());
		
		this.update();
		
		beforeElem.parentNode.insertBefore(ctrlContainer, beforeElem);
	},

	// called when download starts or finishes
	// 'delta' is the number of downlaods started or finished
	// 'delta' 0 means no more downloads
	retrievalsCount: function (delta) {
		if (delta > 0) this.claimsCount++;
		this.downloadCount += delta;
		this.update();
	},

	update: function () {		
		var btnTitle = '' + this.claimsCount + ' related claim' + ((this.claimsCount > 1) ? 's' : '');
		this.treeTogglerBtn.setTitle(btnTitle);
		this.treeTogglerBtn.setDisabled((this.claimsCount == 0), 'No related claims');

		this.countDisplay.innerHTML = 'Loading ' + this.downloadCount + ' claim' + ((this.downloadCount > 1) ? 's' : '');
		this.countDisplay.style.display = (this.downloadCount) ? 'inline' : 'none';
	},
	
	onTreeToggleClick: function (btn) {
		rcl$('rcl_claims_tree_cont').style.display = (btn.isActive()) ? 'block' : 'none';
		if (btn.activated && this.settingsTogglerBtn.isActive()) this.settingsTogglerBtn.activate(false);
	},

	onSettingsToggleClick: function (btn) {
		rcl$('rcl_settings_cont').style.display = (btn.isActive()) ? 'block' : 'none';
		if (btn.activated && this.treeTogglerBtn.isActive()) this.treeTogglerBtn.activate(false);
	}
}

///////////////////////////////////////////////////////////////////////////////
// Claims Tree in the DOM
//
// insert:		create the tree root <div> in the page
// addClaim:	add a new claim to the tree
///////////////////////////////////////////////////////////////////////////////
var ClaimsTreeUI = {
	// incremented on each claim added
	claimsCount: 0,

	// vote widget html template
	voteBoxHTML:  '  <div id="showing_vote__rcl_counter_"\n'
				+ '       class="showing_votes _rcl_color_value_"\n'
				+ '       onmouseover="open_polls(_rcl_counter_);">\n'
				+ '    <a id="votes_left__rcl_counter_"\n'
				+ '         rev="vote-for"\n'
				+ '       class="left_value big_number _rcl_voted_for_flag_"\n'
				+ '       href="_rcl_vote_for_url_" rel="nofollow">\n'
				+ '      <span id="votes_left_text__rcl_counter_" style="color:#fff;">_rcl_votes_for_</span>\n'
				+ '    </a>\n'
				+ '    <a id="votes_right__rcl_counter_"\n'
				+ '       rev="vote-against"\n'
				+ '       class="right_value big_number _rcl_voted_against_flag_"\n'
				+ '       href="_rcl_vote_against_url_" rel="nofollow">\n'
				+ '      <span id="votes_right_text__rcl_counter_" style="color:#fff;">_rcl_votes_against_</span>\n'
				+ '    </a>\n'
				+ '  </div>\n'
				+ '  <div id="making_vote__rcl_counter_" class="making_a_vote"\n'
				+ '       onmouseover="keep_open(this);"\n'
				+ '       onmouseout="close_polls(this);"\n'
				+ '       style="display:none;">\n'
				+ '    <a href="_rcl_vote_for_url_"\n'
				+ '       id="votes_for__rcl_counter_" class="left_value big_number _rcl_voted_for_flag_"\n'
				+ '       rev="vote-for"\n'
				+ '       onmouseover="position_background(this);"\n'
				+ '       onmouseout="reposition_background(this);"\n'
				+ '       onclick="vote_for(this,\'left\',_rcl_counter_,\'_rcl_vote_for_url_\',27876);return false;" rel="nofollow">\n'
				+ '      <span id="voting_left_text__rcl_counter_"\n'
				+ '            style="color:#fff;">_rcl_votes_for_</span>\n'
				+ '    </a>\n'
				+ '    <a href="_rcl_vote_against_url_"\n'
				+ '       id="votes_against__rcl_counter_" class="right_value big_number _rcl_voted_against_flag_"\n'
				+ '       rev="vote-against"\n'
				+ '       onmouseover="position_background(this);"\n'
				+ '       onmouseout="reposition_background(this);"\n'
				+ '       onclick="vote_for(this,\'right\',_rcl_counter_,\'_rcl_vote_against_url_\',27876);return false;" rel="nofollow">\n'
				+ '      <span id="voting_right_text__rcl_counter_"\n'
				+ '            style="color:#fff;">_rcl_votes_against_</span>\n'
				+ '    </a>\n'
				+ '  </div>',

	// insert the container div and some styles
	insert: function () {
		GM_addStyle('#rcl_claims_tree_cont { display: none; padding-right: 4em; border: 1px #CBDDEE solid; margin-top: -1px; background: #FEFEFE; }'
				  + '.rcl_tree_list_class { margin-bottom: 0; list-style: square outside; }'
				  + '.rcl_tree_list_class li { margin: 1em 0 1em 4em; }'
				  + '.rcl_tree_list_item_by_comment_class { list-style: circle outside ! important; }'
				  + '.rcl_tree_anchor_claim_text_class { font-style:italic ! important; color: darkblue; }'
				  + '.rcl_claim_description_class { padding: 1em 0 1em 0; }'
				  + '.rcl_by_comment_class { border-top: 1px solid lightgray; border-bottom: 1px solid lightgray; padding-top: 0.5em; margin-top: 0.2em; }');

		var treeContainer = document.createElement('div');
		treeContainer.id = 'rcl_claims_tree_cont';

		// the tree root for claim nodes which are <li>
		var treeRoot = document.createElement('ul');
		treeRoot.id = 'rcl_claims_tree_root';
		treeRoot.className = 'rcl_tree_list_class';

		treeContainer.appendChild(treeRoot);
		
		var clbox = rcl$('claim_actions_box');
		clbox.parentNode.insertBefore(treeContainer, clbox.nextSibling);
	},

	// get a <li> node of cliam 'cl'
	getClaimElement: function (cl) {
		return rcl$('rcl_tree_item_id_' + cl.id);
	},

	// get a <ul> node of claim 'cl'
	getClaimChildsElement: function (cl) {
		return rcl$('rcl_tree_item_id_' + cl.id + '_childs');
	},

	// create a voting widget for claim 'cl'
	newVotingBoxElem: function (cl) {
		
		// replacements
		// _rcl_counter_: 				claim title counter
		// _rcl_color_value_: 			color
		// _rcl_votes_for_:				votes for
		// _rcl_votes_against_:			votes against
		// _rcl_vote_for_url_:			vote-for url
		// _rcl_vote_against_url_:		vote-against url
		// _rcl_voted_for_flag_:		selected if voted for
		// _rcl_voted_against_flag_:	selected if voted against

		this.claimsCount += 1;
		
		vbHTML = this.voteBoxHTML.replace(/_rcl_counter_/g, ('' + this.claimsCount));
		vbHTML = vbHTML.replace(/_rcl_color_value_/g, cl.voteColorClass);
		vbHTML = vbHTML.replace(/_rcl_votes_for_/g, cl.voteForScore);
		vbHTML = vbHTML.replace(/_rcl_votes_against_/g, cl.voteAgainstScore);
		vbHTML = vbHTML.replace(/_rcl_vote_for_url_/g, cl.voteForUrl);
		vbHTML = vbHTML.replace(/_rcl_vote_against_url_/g, cl.voteAgainstUrl);
		vbHTML = vbHTML.replace(/_rcl_voted_for_flag_/g, (cl.selfVote.indexOf('= true') == -1) ? '' : 'selected');
		vbHTML = vbHTML.replace(/_rcl_voted_against_flag_/g, (cl.selfVote.indexOf('= false') == -1) ? '' : 'selected');

		vb = document.createElement('div');
		vb.className = 'claim_voting_widget';
		vb.innerHTML = vbHTML;
		vb.style.margin = '8px 0 0 0';

		return vb;
	},

	onToggleClaimDescription: function (btn) {
		var clDescElem = btn['descElem'];
		var isActive = btn.isActive();
		clDescElem.style.display = (isActive) ? 'block' : 'none';
		// deactivate the inspiring comment if it is active
		var inspCommentBtn = btn['cl']['inspCommentBtn'];
		if (isActive && inspCommentBtn && inspCommentBtn.isActive()) inspCommentBtn.activate(false);
	},
	
	onToggleClaimDescendants: function (btn) {
		var clChildsElem = btn['childsElem'];
		clChildsElem.style.display = (btn.isActive()) ? 'block' : 'none';
	},

	onToggleInspiringComment: function (btn) {
		var clInspCommentElem = btn['inspCommentElem'];
		var isActive = btn.isActive();
		if (isActive && clInspCommentElem.innerHTML == '') {
			// first time - populate the inspiring comment element
			cl = btn['cl'];
			clInspCommentElem.innerHTML = cl.parent.inspiringComments[cl.byComment];
			// remove the "followup" part of the comment
			var followUpDiv = xpathGetFirstNode(clInspCommentElem, ".//div[@class='open_follow_up_comments']");
			if (followUpDiv) followUpDiv.parentNode.removeChild(followUpDiv);
		}
		clInspCommentElem.style.display = isActive ? 'block' : 'none';
		// deactivate the description if it is active
		var descBtn = btn['cl']['descBtn'];
		if (isActive && descBtn.isActive()) descBtn.activate(false);
	},
	
	// create a new <li> node for claim 'cl'
	newClaimElem: function (cl) {
		Log.write('adding claim ' + cl.id);
		// claim item node
		var clNode = document.createElement('li');
		clNode.id = 'rcl_tree_item_id_' + cl.id;
		clNode.className = 'rcl_tree_item_class' + (cl.byComment ? ' rcl_tree_list_item_by_comment_class' : '');
		clNode.innerHTML = '<a href="'
							+ cl.url
							+ '" class="claim_title'
							+ (cl.isAnchor ? ' rcl_tree_anchor_claim_text_class' : '')
							+'">'
							+ cl.claim
							+ '</a><div>'
							+ cl.by
							+ '</div>';

		// description <div>
		var hasExtraInfo = (cl.desc && cl.desc != '') ? true : false;
		var extraInfoShown = (hasExtraInfo && Settings.autoShowDescription);
		var descElem = document.createElement('div');
		descElem.className = 'rcl_claim_description_class';
		descElem.id = 'rcl_claim_description_' + cl.id;
		descElem.innerHTML = cl.desc;
		descElem.style.display = (extraInfoShown ? 'block' : 'none');

		// construct self vote script element
		var selfVoteElem = document.createElement('script');
		selfVoteElem.type = 'text/javascript';
		selfVoteElem.innerHTML = cl.selfVote;

		// construct a voting box
		var votingBoxElem = this.newVotingBoxElem(cl);

		// child nodes list
		clChildsNode = document.createElement('ul');
		clChildsNode.id = clNode.id + '_childs';
		clChildsNode.className = 'rcl_tree_list_class';

		// description & tags toggler
		var descBtn = new IconButton("Description", ArrowBtnIconsSet, '', newBtnActionCallback(this, 'onToggleClaimDescription'));
		descBtn['descElem'] = descElem;
		// attach the description button to the claim
		cl['descBtn'] = descBtn;
		descBtn['cl'] = cl;
		
		// descendants toggler
		var childsBtn = new IconButton("Descendants", ArrowBtnIconsSet, '', newBtnActionCallback(this, 'onToggleClaimDescendants'));
		childsBtn['childsElem'] = clChildsNode;
		// attach the descendant button to the claim
		// for later descendants counter change
		cl['childsBtn'] = childsBtn;
		
		// inspiring comment element
		var clInspCommentElem = null;
		var inspCommentBtn = null;

		if (cl.byComment) {
			clInspCommentElem = document.createElement('div');
			clInspCommentElem.className = 'rcl_by_comment_class';
			clInspCommentElem.style.display = 'none';
			
			// inspiring comment toggler
			inspCommentBtn = new IconButton("Inspiring Comment", ArrowBtnIconsSet, '', newBtnActionCallback(this, 'onToggleInspiringComment'));
			inspCommentBtn['inspCommentElem'] = clInspCommentElem;
			inspCommentBtn['cl'] = cl;

			inspCommentBtn.setDisabled(false);
		
			// attach the inspiring comment button to the claim
			cl['inspCommentBtn'] = inspCommentBtn;
		}
		
		clNode.appendChild(descBtn.create());
		if (inspCommentBtn) clNode.appendChild(inspCommentBtn.create());
		clNode.appendChild(childsBtn.create());
		
		clNode.appendChild(descElem);
		if (clInspCommentElem) clNode.appendChild(clInspCommentElem);

		clNode.appendChild(selfVoteElem);
		clNode.appendChild(votingBoxElem);
		clNode.appendChild(clChildsNode);
		
		descBtn.setDisabled(hasExtraInfo == false, 'No&nbsp;Description');
		descBtn.activate(Settings.autoShowDescription);
		
		childsBtn.setDisabled(cl.childs.length == 0, 'No&nbsp;Descendants');
		childsBtn.activate(false);
		
		Log.write('returning claim node' + clNode.id);
		return clNode;
	},

	// insert a new node in the tree for claim 'cl'
	addClaim: function (cl, parentOf, childOf) {
		var claimElem = this.newClaimElem(cl);
		var parentCl = null;
		if (parentOf) {
			var childElem = this.getClaimElement(parentOf);
			var parentElem = childElem.parentNode;
			parentElem.appendChild(claimElem);
			this.getClaimChildsElement(cl).appendChild(childElem);
			parentCl = cl;
		}
		else if (childOf) {
			var parentElem = this.getClaimChildsElement(childOf);
			parentElem.appendChild(claimElem);
			parentCl = childOf;
		}
		else {
			Log.write('inserting root claim node' + cl.id);
			rcl$('rcl_claims_tree_root').insertBefore(claimElem, null);
		}
		
		if (parentCl) {
			// update relevant parent's descendants counter
			var childsBtn = parentCl['childsBtn']; 
			childsBtn.setTitle('' + parentCl.childs.length + '&nbsp;descendant' + (parentCl.childs.length > 1 ? 's' : ''));
			childsBtn.setDisabled(false, null);
			childsBtn.activate(true);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
// Manage claim relations
///////////////////////////////////////////////////////////////////////////////
var ClaimRelation = {

	// states: 'init', 'unrelated', 'related'
	state: 'init',

	// the claim of the document
	anchorClaim: null,

	// the root of the claims tree
	rootClaim: null,

	normalizedLocation: '',
	
	init: function () {
		this.preparePage();
		this.insertUI();
		this.traverseRelated();
	},
	
	// look for relations of the current claim
	preparePage: function () {
		this.normalizedLocation = location.href.split('#')[0];
		this.state = ClaimDoc.hasRelated(document, this.normalizedLocation) ? 'related' : 'unrelated';
		return;
	},
	
	// insert ui in the current doc
	insertUI: function () {
		ClaimsTreeUI.insert();
		TreeToolbar.insert(rcl$('rcl_claims_tree_cont'));
	},
	
	// start traversal of related claims
	traverseRelated: function () {
		if (this.state != 'related') { TreeToolbar.retrievalsCount(0); return; }
		TreeToolbar.retrievalsCount(+1);
		this.handleClaimDoc(this.normalizedLocation, document, null, null, Settings.maxDistance);
	},

	// called by ClaimRetriever when a claim page was downloaded
	// or from traverseRelated for the anchor claim
	handleClaimDoc: function (url, claimDocRoot, parentOf, childOf, distance) {
		try {
			Log.write('handleClaimDoc: ' + url);
			// get new ClaimInfo
			var cl = new ClaimInfo(url);

			ClaimDoc.getClaimInfo(claimDocRoot, cl);
			
			if (parentOf != null) {
				parentOf.parent = cl;
				cl.childs.push(parentOf);
			}
			if (childOf  != null) {
				cl.parent = childOf;
				childOf.childs.push(cl);
			}

			if (distance > 0) {
				var urlBoolPair = ClaimDoc.getInspiringClaim(claimDocRoot, url);
				if (urlBoolPair != null)
				{
					Log.write("ClaimDoc.getInspiringClaim returned " + urlBoolPair.url);
					cl.byComment = urlBoolPair.byComment;
					var url = urlBoolPair.url;
					if (!childOf || childOf.url != url) {
						// get this url as parent of cl
						var r = new ClaimRetriever(this, url, cl, null, distance - 1);
						r.retriveUrl();
						TreeToolbar.retrievalsCount(+1);
					}
				}

				var urlArr = ClaimDoc.getInspiredClaims(claimDocRoot, url);
				if (urlArr != null)
				{
					Log.write("ClaimDoc.getInspiredClaims returned " + urlArr.length + " inspired claims");
					for (var i = 0; i < urlArr.length; i++) {
						// get this url as child of cl
						if (!parentOf || parentOf.url != urlArr[i])
						{
							var r = new ClaimRetriever(this, urlArr[i], null, cl, distance - 1);
							r.retriveUrl();
							TreeToolbar.retrievalsCount(+1);
						}
					}
    			}

				var urlArr = ClaimDoc.getInspiredByCommentClaims(claimDocRoot, url);
				if (urlArr != null)
				{
					Log.write("ClaimDoc.getInspiredByCommentClaims returned " + urlArr.length + " inspired by comments claims");
					for (var i = 0; i < urlArr.length; i++) {
						// get this url as child of cl
						if (!parentOf || parentOf.url != urlArr[i])
						{
							var r = new ClaimRetriever(this, urlArr[i], null, cl, distance - 1);
							r.retriveUrl();
							TreeToolbar.retrievalsCount(+1);
						}
					}
    			}
			}

			this.handleNewClaim(cl, parentOf, childOf);
			
			return cl;
		}
		catch (e) {
			Log.write('handleClaimDoc - "' + e.toString() + '"');
		}
		return null;
	},

	// handle a new complete claim
	handleNewClaim: function (cl, parentOf, childOf) {
		TreeToolbar.retrievalsCount(-1);
		
		if (!this.rootClaim) {
			this.rootClaim = cl;
		}
		else if (parentOf && this.rootClaim.id == parentOf.id) {
			this.rootClaim = cl;
		}

		if (!this.anchorClaim) {
			cl.isAnchor = true;
			this.anchorClaim = cl;
		}
		
		ClaimsTreeUI.addClaim(cl, parentOf, childOf);

		if (ClaimsTreeUI.claimsCount == 1 && Settings.autoShowRelationsTree) {
			// first claim - show tree
			TreeToolbar.treeTogglerBtn.activate(true);
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
// Settings UI
///////////////////////////////////////////////////////////////////////////////
var SettingsUI = {
	// insert the container div and some styles
	insert: function () {
		GM_addStyle('#rcl_settings_cont { display: none; padding: 1em; border: 1px #CBDDEE solid; margin-top: -1px; background: #FFFFA0; }'
		);

		var settingsContainer = document.createElement('div');
		settingsContainer.id = 'rcl_settings_cont';

		// the check boxes
		this.initBtn(settingsContainer, 'Auto Expand Related Claims', 'rcl.autoShowRelationsTree');
		this.initBtn(settingsContainer, 'Auto Expand Descriptions', 'rcl.autoShowDescription');
		
		var clbox = rcl$('claim_actions_box');
		clbox.parentNode.insertBefore(settingsContainer, clbox.nextSibling);
	},

	initBtn: function (container, title, key) {
		var btn = new IconButton(title, CheckBoxIconsSet, '', newBtnActionCallback(this, 'onCheckboxClick'));
		container.appendChild(btn.create());
		btn['settingsKeyName'] = key;
		btn.activate(GM_getValue(key, false));
	},
	
	onCheckboxClick: function (btn) {
		GM_setValue(btn['settingsKeyName'], btn.isActive());
	}
}

///////////////////////////////////////////////////////////////////////////////
// run
///////////////////////////////////////////////////////////////////////////////
if (! Settings.disabled) {
	Log.init();
	if (Settings.showLog)
		Log.show();
	SettingsUI.insert();
	ClaimRelation.init();
}

///////////////////////////////////////////////////////////////////////////////
// tests
///////////////////////////////////////////////////////////////////////////////

// ClaimRelation.insertUI();
// TreeToolbar.enableArrow(true);
// TreeToolbar.showTree(true);

// Log.init();
// Log.show();

// Log.dump('settings', Settings);

// inspiring claim
//
// var urlBoolPair = ClaimDoc.getInspiringClaim(document);
// if (urlBoolPair != null)
// {
// 	Log.write("url: " + urlBoolPair.url);
// 	Log.write("byComment: " + urlBoolPair.byComment);
// }
// else {
// 	Log.write('not found');
// }

// inspired by comment claims
//
// var urls = ClaimDoc.getInspiredByCommentClaims(document);
// if (urls != null)
// {
// 	for (var i = 0; i < urls.length; i++) {
// 		Log.write(urls[i]);
// 	}
// }
// else {
// 	Log.write('not found');
// }

// claim info
//
// Log.write(ClaimDoc.claimSelfVoteXPath);
// var v = xpathGetNode(document, ClaimDoc.claimVoteXPath, 0);
// if (v) {
// 	Log.write(v.className.substr('showing_votes '.length));
// 	// these are relative to claimVoteXPath
// 	Log.write(ClaimDoc.claimVoteForScoreXPath + ': ' + xpathGetStr(v, ClaimDoc.claimVoteForScoreXPath));
// 	Log.write(ClaimDoc.claimVoteAgainstScoreXPath + ': ' + xpathGetStr(v, ClaimDoc.claimVoteAgainstScoreXPath));
// 	Log.write(ClaimDoc.claimVoteForUrlXPath+ ': ' + xpathGetStr(v, ClaimDoc.claimVoteForUrlXPath));
// 	Log.write(ClaimDoc.claimVoteAgainstUrlXPath + ': ' + xpathGetStr(v, ClaimDoc.claimVoteAgainstUrlXPath));
// }
// else {
// 	Log.write('not found');
// }

// var m = new ClaimRelation;
// 
// unsafeWindow.addEventListener(
//     'load',
//     function() {
//     	m.init();
// 		if (m.state == 'related')
// 			m.traverseRelated();
// 	},
//     true);

// inspired claims
//
// var urlArr = ClaimDoc.getInspiredClaims(document);
// if (urlArr != null)
// 	for (var i = 0; i < urlArr.length; i++) {
// 		Log.write(urlArr[i]);
// 	}