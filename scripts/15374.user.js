// ==UserScript==
// @name           orkut - Dictionary on Orkut (by LeoWebmaster)
// @namespace      LeoWebmaster [ Kumail Raza ]
// @description    Adds AJAX Dictionary to Orkut
// @include        http://www.orkut.com/Scrapbook.aspx*
// @include        http://www.orkut.com/CommMsgPost.aspx*
// @maintained by  Copyright  2005-2008, LeoWebmaster.\nAll Right Reserved.\n\nSite developed and Maintained by LeoWebmaster[Kumail Raza].
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addDict() {
	 var c = document.getElementById('scrapInputContainer');
	 if(!c)
	 c = document.getElementById('messageBody');
	 if(!c){
		return;}
	 if(c.type == "textarea")
		c.parentNode.parentNode.innerHTML = '<div id="dictresult" style="margin: 30px 0px; height: 270px; position: absolute; width: 22%;overflow-x:hidden;overflow-y:auto;"></div>' + c.parentNode.parentNode.innerHTML;
	 else
			c.innerHTML = '<div id="dictresult" style="margin: 0px 545px; height: 85px; position: absolute; width: 290px;overflow-x:hidden;overflow-y:auto;"></div>' + c.innerHTML;
		var allDivs, thisDiv;
		allDivs = document.evaluate(
			"//div[@class='parabtns']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
			thisDiv = allDivs.snapshotItem(allDivs.snapshotLength-1);
			thisDiv.innerHTML = thisDiv.innerHTML+'<span>Find Meaning of : <input type="text" id="word" size=10>&nbsp;<span class="grabtn"><a id="sb" class="btn" href="javascript:void(0);">search</a></span><span class="btnboxr"><img width="5" height="1" alt="" src="http://img1.orkut.com/img/b.gif"/></span></span>';
	if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
	}
}
function showM(){
			var w = document.getElementById('sb');
			if(w.innerHTML == "search"){
			GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.dictionary.hm/search_function.php?q='+document.getElementById('word').value,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/atom+xml,application/xml,text/xml',},
			onreadystatechange: function(responseDetails){document.getElementById('dictresult').innerHTML = "Loading...";},
			onload: function(responseDetails){document.getElementById('dictresult').innerHTML = responseDetails.responseText;}});
			w.innerHTML = "clear";
			}else{
				//document.getElementById('dictresult').innerHTML = "";
				//document.getElementById('word').value="";
				//w.innerHTML = "search";
				clear();
			}
	}
function clear(){
	document.getElementById('dictresult').innerHTML = "";
	document.getElementById('word').value="";
	w.innerHTML = "search";
}
	
addDict();
var w = document.getElementById('sb');
	if(!w)
		return;
	w.addEventListener('click',showM,false);
var t = document.getElementById('word');
	if(!t)
		return;
	t.addEventListener('focus',clear,false);