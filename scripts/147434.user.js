// ==UserScript==
// @name        JavaDocsTableToggler
// @namespace   http://userscripts.org/user/code.ape
// @description In Javadoc API sites, enable toggling for block/lists.
// @include     http://docs.oracle.com/javase/*
// @include     http://docs.oracle.com/javame/config/cldc/*
// @include     http://docs.oracle.com/javafx/2/api/*
// @version     0.2
// @license     Creative Commons Attribution-Noncommercial 3.0 United States License
// @copyright   code.ape
// ==/UserScript==

/*
TODO:
- Settings: load minimized or expanded
- Insert expand/shrink-all link/button
- CSSize toggle-items (background or border..)

Old style:
table > tbody > tr.TableHeadingColor
	> siblings tr.TableRowColor
New style:
ul.blocklist > li.blocklist
	> h3: Summary Title
	> table
		> caption
		> tbody
*/

(function() {
	function l(s) { if(console && console.log) console.log(s); }
	function e(s) { if(console && console.error) console.error(s); }
	function i(s) { if(console && console.info) console.info(s); }
	function toggleDisplay(node) {
		var styleDisplay = node.style.display;
		node.style.display = (!styleDisplay || styleDisplay === "block") ?
			"none" : "block";
	}
	function onClick_toggle(ev) {
		var styleDisplay = this.style.display;
		styleDisplay = (!styleDisplay || styleDisplay === "block") ?
			"none" : "block";
		
		var node = this.nextSibling;
		while(node) {
			if(node.nodeName != "#text")
				//node.style.display = styleDisplay;
				toggleDisplay(node);
			node = node.nextSibling;
		}
	}
	function onclick_nonSummaryOld(ev) {
		var node = this.parentNode.parentNode.nextSibling; // table > a
		while(node) {
			if(node.nodeName == "#text" || node.nodeName == "#comment") {
				node = node.nextSibling;
				continue;
			}
			
			toggleDisplay(node);
			var nodeNext = node.nextSibling;
			var nodeNexxt = nodeNext.nextSibling;
			if(!nodeNext || !nodeNexxt)
				break;
			else if(nodeNexxt.nodeName.toLowerCase() == "table") {
				break;
			}
			node = node.nextSibling;
		}
	}
	function initHeads(xpath_xpr, condition, onclick_condition) {
		//var xprType = XPathResult.ANY_TYPE;
		var xprType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
		var itrHeads = document.evaluate(xpath_xpr, document, null, xprType, null);
		try {
			var nodes = new Array();
			var node = itrHeads.iterateNext();
			while(node) {
				nodes.push(node);
				node = itrHeads.iterateNext();
			}
			for(var idx in nodes) {
				var isSummary = true;
				if(condition) {
					var condResult = document.evaluate(condition, nodes[idx], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
					isSummary = condResult.singleNodeValue;
				}
				if(isSummary) {
					nodes[idx].onclick = onClick_toggle;
					nodes[idx].style.cursor = 'pointer';
				}
				else if(onclick_condition) {
					nodes[idx].onclick = onclick_condition;
					nodes[idx].style.cursor = 'pointer';
				}
			}
		}
		catch(ev) {
			e('Error: ' + ev);
		}
	}
	var isNew = location.href.indexOf("/javase/7/") + 1;
	if(!isNew) {
		isNew = location.href.indexOf("/javafx/2/") + 1
	}
	if(isNew) {
		initHeads("//li[@class='blockList']/h3");
	}
	else {
		//initHeads("//tr[@class='TableHeadingColor']");
		initHeads("//tr[@class='TableHeadingColor']", "following-sibling::tr", onclick_nonSummaryOld);
	}	
})();