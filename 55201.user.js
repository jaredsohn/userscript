// ==UserScript==
// @name           stackoverflow-tag-cloud
// @namespace      http://www.strongasanox.co.uk/greasemonkey
// @description    Shows a traditional tag cloud with popular tags in a larger font size
// @include        http://stackoverflow.com/tags*
// ==/UserScript==
(function() {
	// adds the CSS rules contained in css to
	// the head of the current document
	addStyle = function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
		
	function smallest(array) {
		return Math.min.apply(Math, array);
	}
	
	function largest(array) {
		return Math.max.apply(Math, array);
	}
	
	function calculateWeight(tagTotal, max, min) {
		return Math.round(Math.log(tagTotal) - Math.log(min) / Math.log(max) - Math.log(min));
	}
	
	function getCssClassFromWeight(weight) {
		var cssClass;
		switch(weight) {
			case 2:
				cssClass = 'level5';
				break;
			case 1:
				cssClass = 'level4';
				break;
			case 0:
				cssClass = 'level3';
				break;
			case -1:
				cssClass = 'level2';
				break;
			default:
				cssClass = 'level1';
				break;
		}
		
		return cssClass;
	}
	
	window.addEventListener('load', function() {		
		var css = [];
		css.push('#tags_list ol { list-style:none; line-height:1.2; }');
		css.push('#tags_list li { display:inline; margin-right:10px; }');
		css.push('.level1 { font-size:100%;}');
		css.push('.level2 { font-size:175%; }');
		css.push('.level3 { font-size:250%; }');
		css.push('.level4 { font-size:325%; }');
		css.push('.level5 { font-size:450%; }');
		addStyle(css.join('\n'));
		
		var tagContainer = document.getElementById('tags_list');
		var postTags = document.evaluate(
			'//a[@class="post-tag"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			
		var totals = [];
		var tags = []; // use an array for easier sorting
		
		for (var i=0; i < postTags.snapshotLength; i++) {
			var currentLink = postTags.snapshotItem(i);
			var currentSpan = currentLink.nextSibling;
			var tagName = currentLink.childNodes[0].nodeValue;
			var tagCount = currentSpan.childNodes[0].nodeValue.replace(/\D/, '').trim();
			totals.push(tagCount);
			
			tags.push({
				tag: tagName,
				total: tagCount,
				url: currentLink.href
			});
		}
		
		// Calculate the max / min values in the tags
		var max = largest(totals);
		var min = smallest(totals);
		
		var sortTags = function(a, b) {
			if (a.tag < b.tag) {
				return -1;
			} else if (a.tag > b.tag) {
				return 1;
			} else {
				return 0;
			}
		}
		
		tags.sort(sortTags);
		
		// Loop through the tags, calculate each one's weight and use this
		// to determine the font size / css class
		var listItems = [];
		for (var i = 0, max = tags.length; i < max; i++) {
			var weight = calculateWeight(tags[i].total, max, min);
			var cssClass = getCssClassFromWeight(weight);
			
			listItems.push('<li class="');
			listItems.push(cssClass);
			listItems.push('">');
			listItems.push('<a href="');
			listItems.push(tags[i].url);
			listItems.push('" title="');
			listItems.push('Tagged ');
			listItems.push(tags[i].total);
			listItems.push(' times">');
			listItems.push(tags[i].tag);
			listItems.push('</a></li>\n');
		}
		
		var tagList = document.createElement('ol');
		tagList.innerHTML = listItems.join('');
		console.log(tagList);
		
		// Get a reference to the old table and the div that wraps the pager
		var tagTable = tagContainer.getElementsByTagName('table')[0];
		
		tagContainer.replaceChild(tagList, tagTable);
	}, true);
})();