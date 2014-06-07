// ==UserScript==
// @name           KTT Quick Reply
// @namespace      http://userscripts.org/
// @description    Quick Reply Smiley Script.
// @author         sour7
// @include        */index.php?topic=*
// @version        1.5
// ==/UserScript==

var smiliesUrl = GM_getValue("smilies", "|").split("|");
smiliesUrl.pop();
smiliesUrl.push("http://i.imgur.com/gHTJVfW.png?1");
	function putInTxtarea(text, textarea) {
		
		if (typeof(textarea.selectionStart) != "undefined") {
			var begin = textarea.value.substr(0, textarea.selectionStart);
			var end = textarea.value.substr(textarea.selectionEnd);
			var scrollPos = textarea.scrollTop;

			textarea.value = begin + text + end;

			if (textarea.setSelectionRange)
			{
				textarea.focus();
				textarea.setSelectionRange(begin.length + text.length, begin.length + text.length);
			}
			textarea.scrollTop = scrollPos;
		}
		
		else {
			textarea.value += text;
			textarea.focus(textarea.value.length - 1);
		}
	}



function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Try the path for SMF 1.*
function getXpathRes1(){
	var path = xpath("//tr/td/textarea[@name='message']");
	return (path.snapshotLength > 0) ?  path : false;
}

//Try the path for SMF 2.*
function getXpathRes2(){
	var path = xpath("//div/div/textarea[@name='message']");
	return (path.snapshotLength > 0) ?  path : false;
}
function insertImgsIntoElement (elem, urls){
	for(var i = 0; i < urls.length; i++) {
		var img = document.createElement("Img");
		img.src = urls[i];
		img.style.cursor = "pointer";
		var listner = function(url2){
			return function(){
				putInTxtarea('[Img]' + url2 + '[/Img]', 
				document.getElementsByName('message')[0]);
				};
			}(urls[i]);

		img.addEventListener('click', listner, false);
		elem.appendChild(img);
	}
}

// SMF 1.0.*
var xpathRes = getXpathRes1();
if(xpathRes){
	var tr = document.createElement("tr");
	var td1 = document.createElement("td");
	td1.setAttribute("valign", "middle");
	
	var td2 = document.createElement("td");
	td2.setAttribute("align", "right");
	
	var elem = document.createElement("div");
	elem.id = "mySmilies";
	elem.innerHTML = "";
	
	insertImgsIntoElement(elem, smiliesUrl);
	
	td1.appendChild(elem);
	
	tr.appendChild(td2);
	tr.appendChild(td1);
	
	xpathRes.snapshotItem(0).parentNode.parentNode.parentNode.insertBefore(tr, xpathRes.snapshotItem(0).parentNode.parentNode);
	
}else{
// SMF 2.0.*
	var xpathRes = getXpathRes2();
	if(xpathRes){
		
		var cdiv = document.createElement("div");
		var showHideDiv = document.createElement("div");
		var imgsdiv = document.createElement("div");
		var showHideButton = document.createElement("button");
		
		showHideButton.type = "button";
		showHideButton.textContent = "Show/hide Smilies";
		var shouldShow = GM_getValue("showSmilies", false);
		
		imgsdiv.style.display = shouldShow ? "block" : "none";
		
		showHideButton.onclick = function (){
				shouldShow = !shouldShow;
				GM_setValue("showSmilies", shouldShow);
				
				imgsdiv.style.display = shouldShow ? "block" : "none";
			}
			

		var elem = document.createElement("div");
		elem.id = "mySmilies";
		elem.innerHTML = "";
		
		insertImgsIntoElement(elem, smiliesUrl);
		
		imgsdiv.appendChild(elem);

		showHideDiv.appendChild(showHideButton);

		cdiv.appendChild(showHideDiv);
		cdiv.appendChild(imgsdiv);
		
		xpathRes.snapshotItem(0).parentNode.parentNode.parentNode.insertBefore(cdiv, xpathRes.snapshotItem(0).parentNode.parentNode);

	}
}