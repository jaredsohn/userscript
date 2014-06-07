// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ThoofRank plugin", and click Uninstall.
// --------------------------------------------------------------------
// Hywel Andrews - 08/2007 - ThoofRank plugin
// --------------------------------------------------------------------
// ==UserScript==
// @name          	ThoofRank plugin
// @namespace     http://thoof.com/
// @description   	Adds thoof rank to all stories shown on homepage or after search
// @include        	http://*.thoof.com/*
// @include 	http://thoof.com/*
// @exclude       	http://thoof.com/blog
// @exclude       	http://*.thoof.com/blog
// @exclude       	http://*.thoof.com/faq
// @exclude       	http://thoof.com/faq
// ==/UserScript==

window.addEventListener(
    'load', 
    selectThoofPage,
true);

function selectThoofPage()
{
	
	if(location.href.search("activity") > 0){
		insertThoofRankIdActivity()
	}else{
		window.addEventListener(
			'scroll', 
			insertThoofRankId, // ensure ThoofRankID updates when user scrolls, as new storys are continually added to page
		true);
		
		insertThoofRankId();
	}
}

function insertThoofRankId(){	
	var allNewsItems;
	
	// Some times we've got a highlighted story at the top of the home page, ensure we include it first
	
	var highlightedNewsItems = getElementsByClassName("story_highlighted", "div", document);
	
	if (highlightedNewsItems[0]){
		attachRank(highlightedNewsItems[0].childNodes[1], (getStoryId(highlightedNewsItems[0])));} // Dom Element for highlighted stories is slightly different
	
	allNewsItems = getElementsByClassName("story", "div", document);

	for (el in allNewsItems){
		//get story id & Form link to Thoof Rank
		attachRank(allNewsItems[el].childNodes[1].childNodes[1], (getStoryId(allNewsItems[el])));
	}
	

}

function insertThoofRankIdActivity(){

	var tablesOnActivity = document.getElementsByTagName("table");
		
	for (table in tablesOnActivity)
	{
		if (tablesOnActivity[table].className == "activity_table"){
			for( var z = 0; z < tablesOnActivity[table].tBodies.length; z++ ) {
					for( var x = 0; x < tablesOnActivity[table].tBodies[z].rows.length; x++ ) {
						if (x == 0){
							var y = document.createElement('th');
							y.appendChild(document.createTextNode("Thoofrank"));
							tablesOnActivity[table].tBodies[z].rows[x].appendChild(y);
						}else{
							var y = document.createElement('td');
							tablesOnActivity[table].tBodies[z].rows[x].appendChild(attachRank(y, getStoryId(tablesOnActivity[table].tBodies[z].rows[x])));
						}
					}
			}
		}
	}
}

function getStoryId(element)
{
		//Finds edit link within passed element and extracts id number
		var linksInElement = element.getElementsByTagName("a")
		var regExId = /improve\/(\d{4,})/;
		
		for (a in linksInElement)
		{
			if (regExId.test(linksInElement[a].href))
			{
				return(RegExp.$1) // series of four numeric digits have been added to class in above regEx expression
			}
		}
}

function attachRank(element, id)
{
		var testRankPresent = element.getElementsByTagName("iframe"); //check we don't have a thoofrank present already

		if (!testRankPresent[0]){
			var rankLink = "http://www.thoof.com/tr/" + id;
			//gmXmlHTTPRequest(rankLink, allNewsItems[el]) //previouly called thoof rank as XMLHttpRequest, what a banana!
			
			var rankHolder = document.createElement("div")
			rankHolder.appendChild(document.createElement("br"));
			rankHolder.innerHTML = "<iframe frameborder='0' scrolling='no' width='139' height='45' src='" + rankLink + "'> </iframe>"
			element.appendChild(rankHolder);
			return(element)
		}
}

function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
  var arrClass = strClass.split(delim);
  for (var i = 0, j = objColl.length; i < j; i++) {
    var arrObjClass = objColl[i].className.split(' ');
    if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
    var c = 0;
    comparisonLoop:
    for (var k = 0, l = arrObjClass.length; k < l; k++) {
      for (var m = 0, n = arrClass.length; m < n; m++) {
        if (arrClass[m] == arrObjClass[k]) c++;
        if (( delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
          arr.push(objColl[i]);
          break comparisonLoop;
        }
      }
    }
  }
  return arr;
}

// To cover IE 5.0's lack of the push method
Array.prototype.push = function(value) {
  this[this.length] = value;
}