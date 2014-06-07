// ==UserScript==
// @name		IMDB Board Expander
// @version		1.03

// @match 		http://www.imdb.com/title/*/board/nest/*
// @match 		http://www.imdb.com/title/*/board/thread/*
// @match 		http://www.imdb.com/name/*/board/thread/* 
// @match 		http://www.imdb.com/name/*/board/nest/* 
// @match 		http://www.imdb.com/board/*/thread/* 

// @description	Expands threads in IMDB.

// @namespace   toxicFork
// ==/UserScript==

//additional credits: highway_robbery ( http://userscripts.org/users/266264 ) for non-movie board matches

var tempContainer = document.createElement("div");

function expand(tr){
	if(tr.getElementsByTagName("a")[0]){
		var url = tr.getElementsByTagName("a")[0].href;
		var leftPad = 0;
		if(tr.getElementsByTagName("img")[0])
			leftPad = tr.getElementsByTagName("img")[0].getAttribute("width").match(/([0-9]+)\%/)[1];
		tr.innerHTML = "<td>Loading...</td><td>Loading...</td><td>Loading...</td>";
		
		GM_xmlhttpRequest({
			method:"GET",
			url:url,
			onload:function(pad){ return function(result) {
				var r = result.responseText;
				tempContainer.innerHTML = r;
				
				
				tr.innerHTML = tempContainer.getElementsByTagName("table")[7].parentNode.parentNode.innerHTML;
				if(pad!=0){
					tr.getElementsByTagName("td")[0].setAttribute("style","padding-left:"+(pad*5)+"px;");
				}
				tempContainer.innerHTML = "";
			}
			}(leftPad)
		});
	}
}
var mainTable = document.getElementsByName("last")[0].nextSibling;
var actualTable = mainTable.getElementsByTagName("table")[1];
var trs = mainTable.getElementsByTagName("tbody")[0].childNodes;

for(var i=1;i<trs.length;i++){
	if(trs[i].tagName == "TR"){
		if(trs[i] != actualTable.parentNode.parentNode){
			expand(trs[i]);
		}
	}
}