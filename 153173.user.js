// ==UserScript==
// @name           NZHerald news cleanup
// @namespace      britta.nz
// @description    Renders NZHerald.co.nz news site more readable to deafblind people using RSS news bookmarks
// @include        http://www.nzherald.co.nz/*
// ==/UserScript==


  /* NZHerald remove everything, apart from the article content, on the article pages */
var item_to_replace = $x("//div[@class='siteWrapper ']")[0];
var replace_with    = $x("//div[@class='contentContainer left six nopad articleBody']")[0];

/* Do the replacements defined by the variables above */
if (item_to_replace && replace_with) {
	item_to_replace.parentNode.replaceChild(replace_with, item_to_replace);
}

/*********** List of objects to be deleted */

var stuff_to_remove = [

	/*NZ Herald remove header on main page and sub topic pages*/
	"//HEADER[@id='header']",
	/*NZ Herald remove latest news links on main page*/
	"//div[@class='nzh-ltstnews-widget']",
	/*NZ Herald remove bottom 3 column of news on main page - weather, grabone deals, traffic updates*/
	"//div[@class='contentContainer four right']",
	"//div[@class='storyHeader']",
	"//div[@class='clearBoth']",
	"//div[@class='sectionHeader sectionHeaderAlt']",
	"//div[@class='OUTBRAIN']",
	/*NZ Herald remove middle column on article page*/
	"//div[@class='contentContainer right two nopad relatedColumn']			",
	/*NZ Herald remove google ads on article page*/
	"//div[@class='advert']",
	/*NZ Herald remove social media on article page*/
	"//div[@class='tools toolsAlt']",
		/*NZ Herald remove social media on article page*/
	"//div[@class='tools']",
	"//div[@class='boxStyle2']",
	/*NZ Herald remove images on article page*/
	"//div[@id='storyExtraContent']",
	/*NZ Herald remove google ads on article page*/
	"//div[@class='boxStyle1']",
	/*NZ Herald remove special offer ads on all page*/
	"//div[@class='marketPlace']",
	"//div[@class='marketPlaceItem marketPlaceItemAlt']",
	"//div[@class='marketPlaceItem']",
	/*NZ Herald remove footer on main page and sub topic pages*/
	"//FOOTER[@id='footer']",
	"//div[@id='serverFoot']",
	"//div[@id='footerMainTop']"
];

/* This deletes from the page all the items mentioned in the array above */
stuff_to_remove.forEach(
	function(xpath) {
		$x(xpath).forEach(
			function(item) {
				item.parentNode.removeChild(item);
			}
		);
	}
);

/* Function copied from greasemonkey wiki that searches for an XPath and 
 * returns a list of matching elements */
function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

