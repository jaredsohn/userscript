// ==UserScript==
// @name           MangaUpdate Stat List+
// @namespace      http://userscripts.org/users/81576
// @description    Enhanced mangaupdate user stats list
// @include        http://www.mangaupdates.com/stats.html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

// EXTEND JQUERY
jQuery.fn.extend({
  findArray: function(searchStr, arr) {
	  var returnArray = false;
	  for (i=0; i<arr.length; i++) {
	    if (typeof(searchStr) == 'function') {
	      if (searchStr.test(arr[i])) {
	        if (!returnArray) { returnArray = [] }
	        returnArray.push(i);
	      }
	    } else {
	      if (arr[i]===searchStr) {
	        if (!returnArray) { returnArray = [] }
	        returnArray.push(i);
	      }
	    }
	  }
	  return returnArray;
  }
});


// MAIN
var data_table = evaluateXPath(document, "//td[@id='main_content']/table/tbody/tr//table")[0];
var data = [];

if(data_table) {
	// get row genre data
	var data_row = evaluateXPath(data_table, ".//td/i/span");
	
	// parse row genre data
	get_table_data();
	
	// JQUERY STUFFS
	$('#main_content > table > tbody > tr > td p+p').after(
		"<p class=\"operations\">"+
		"<a href=\"#\" id=\"show_stats\">Show Stats</a>"+
		"</p>");
	
	$("a#show_stats").click(function() {
		for(var q = 0; q < data_row.length; q++) {;
			var chObj;
			if(evaluateXPath(data[q].series, "./strong").length == 0) {
				chObj = document.createElement("strong"); 
				chObj.className = "status";
				data[q].series.appendChild(chObj);
			}
			else {
				chObj = evaluateXPath(data[q].series, "./strong")[0];
			}
			get_vc(chObj, data[q].series_link);
		}
		return false;
	});
	
	$('#main_content > table > tbody > tr > td p+p+p > table tr').hover(
		function() {
			$(this).find("strong").css("opacity", "0.1");
		},
		function() {
			$(this).find("strong").css("opacity", "1");
		}
	)
	

}
// END MAIN


// FUNCTIONS

// Evaluate an XPath expression aExpression against a given DOM node
// or Document object (aNode), returning the results as an array
// thanks wanderingstan at morethanwarm dot mail dot com for the
// initial work.
function evaluateXPath(aNode, aExpr) {
  var xpe = new XPathEvaluator();
  var result = xpe.evaluate(aExpr, aNode, null, 0, null);
  var found = [];
  var res;
  while (res = result.iterateNext())
    found.push(res);
  return found;
}

// get table data
function  get_table_data() {
	for(var q = 0; q < data_row.length; q++) {
		data[q] = [];
		var series = data_row[q];
		data[q].series = series;
		data[q].series_row = series.parentNode.parentNode.parentNode;
		data[q].series_link = series.parentNode.parentNode.firstChild.href;
		data[q].series_genre = series.innerHTML.replace(/(\&nbsp;)+/g,"").replace(/\s+/g,"").split(',');
	}
	
}

// get manga statistic (AJAX)
function get_vc(chObj, URL) {
	GM_xmlhttpRequest({ method: 'GET', url: URL, onload: function(response) {
		var v = new Array();
		var c = new Array();
		page = response.responseText;
		page = page.replace(/\n/gm, "");
		v = /v.<i>([^<]+)/im.exec(page);
		c = /c.<i>([^<]+)/im.exec(page);
		
		// lots to read!! 
		if((v != null && v[1] > 3) || (c != null && c[1] > 30))
			$(chObj).toggleClass('alot', true);
		else
			$(chObj).toggleClass('alot', false);
		
		(v == null) ? v="" : v="&nbsp;v."+v[1];
		(c == null) ? c="" : c="&nbsp;c."+c[1];
		chObj.innerHTML = (v+c == "") ? "-" : v+c;
		$(chObj).fadeIn('fast');
	}});
}

// global function to set CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// CSS
addGlobalStyle(""
	+".r1 { opacity: 0.5; }"
	+".status { display:none; color:blue; position:absolute; right:140px;}"
	+".alot { color:red; }"
	+"p.operations { text-align: right; }"
	+"p.operations a { font-weight: bolder; }"
	+"#main_content > table > tbody > tr > td p+p+p > table a:visited { color: #999; }"
);