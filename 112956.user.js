// ==UserScript==
// @name          GTAForums Multiquote
// @namespace     http://userscripts.org/users/401972
// @description   Multiquote feature for GTAF.
// @include       http://www.gtaforums.com/*
// ==/UserScript==

var topicId, forumId = -1, ls = window.localStorage;
var monthList = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

var checkedImg = "url('http://media.gtanet.com/gtaforums/images/mq_checked.png')";
var loadingImg = "url('http://media.gtanet.com/gtaforums/images/mq_loading.png')";
var uncheckedImg = "url('http://media.gtanet.com/gtaforums/images/mq_unchecked.png')";

function lsSet(a, b) {
	ls.setItem(a, b);
}

function lsGet(a) {
	return ls.getItem(a);
}

function lsRem(a) {
	ls.removeItem(a);
}

function getSubs(k, j) {
	return k.getElementsByTagName(j)
}

function mqUpdateCount(change, isAbs) {
	var val = 0;
	
	if(!isAbs) {
		val = parseInt(lsGet("mqcn") | 0);
	}
	
	val += change;
	
	lsSet("mqcn", val);
	
	var elemQuote = document.getElementById("multiquote");
	
	if(elemQuote) {
		elemQuote.value = "Multiquote (" + ((lsGet("mqt") != topicId) ? "-" : val) + ")";
	}
}

function mqToggleQuote(e) {
	var tElem = this;
	var subElems = tElem.getElementsByTagName("span");
	
	if(subElems.length < 1) return false;
	
	var idValue = subElems[0].innerHTML;
	var saveVal = lsGet("mqa" + idValue);

	if(saveVal) {
		lsSet("mqv" + saveVal, "");
		lsSet("mqi" + saveVal, "0");
		lsRem("mqa" + idValue);
		tElem.style.backgroundImage = uncheckedImg;
		
		mqUpdateCount(-1, false);
		
		return false;
	}
	
	if(tElem.className == "mqeLoad") return false;
	
	tElem.style.backgroundImage = loadingImg;
	tElem.className = "mqeLoad";
	
	var tempElem = document.createElement("div");
	var xhr = new XMLHttpRequest(), x = 0;
	
	if(xhr.overrideMimeType) xhr.overrideMimeType("text/html;charset=iso-8859-1");
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				tempElem.innerHTML = xhr.responseText;
				
				if(lsGet("mqt") == topicId) x = parseInt(lsGet("mqc"));
				else ls.clear();
				
				var txtList = getSubs(tempElem, "textarea");
				
				if(txtList.length > 1) {
					var xTm = new Date(parseInt(txtList[1].parentNode.getElementsByTagName("input")[2].value)*1000);
					
					var textToAdd = "[QUOTE=";
					textToAdd += txtList[1].parentNode.getElementsByTagName("input")[1].value;
					textToAdd += "," + monthList[xTm.getUTCMonth()] + " " + xTm.getUTCDate() + " " + xTm.getUTCFullYear() + ", ";
					textToAdd += ((xTm.getUTCHours()<10) ? "0" : "") + xTm.getUTCHours() + ":" + ((xTm.getUTCMinutes()<10) ? "0" : "") + xTm.getUTCMinutes() + "]";
					textToAdd += txtList[1].value;
					textToAdd += "[/QUOTE]";
					
					lsSet("mqt", topicId);
					mqUpdateCount(1, false);
					lsSet("mqc", x + 1);
					lsSet("mqv" + x, textToAdd + "\n\n");
					lsSet("mqi" + x, idValue);
					lsSet("mqa" + idValue, x);
					tElem.style.backgroundImage = checkedImg;
				}
				else {
					tElem.style.backgroundImage = uncheckedImg;
				}
			}
			else {
				tElem.style.backgroundImage = uncheckedImg;
			}
			
			tElem.className="mqeStatic";
		}
	};
	
	xhr.open("GET", "./index.php?act=Post&CODE=06&f=" + forumId + "&t=" + topicId + "&p=" + idValue, true);
	xhr.send(null);
}

function mqCreateMQButton(buttonClass) {
	var mqKey = document.createElement("input");
	mqKey.addEventListener("click", mqAppendToText, false);
	mqKey.type = "button";
	mqKey.className = buttonClass;
	mqKey.style.backgroundColor = "#dddda2";
	mqKey.style.margin = "0 0 0 5px";
	mqKey.id = "multiquote";
	mqKey.value = "Multiquote (-)";
	
	return mqKey;
}

function mqCreateSplitButton(buttonClass) {
	var mqSplit = document.createElement("input");
	mqSplit.addEventListener("click", mqSplitQuote, false);
	mqSplit.type = "button";
	mqSplit.className = buttonClass;
	mqSplit.style.backgroundColor = "#dddda2";
	mqSplit.style.margin = "0 0 0 5px";
	mqSplit.id = "multiquotesplit";
	mqSplit.value = "Split quote";
	
	return mqSplit;
}

function mqLoadForViewMode() {
	var tdList = getSubs(document, "td");
	
	var preLoadContainer = document.createElement("div");
	preLoadContainer.style.visiblity = "hidden";
	
	for(var i = 0; i < 2; i++) {
		var preLoadItem = document.createElement("div");
		preLoadItem.style.backgroundImage = (i == 0) ? checkedImg : loadingImg;
		preLoadContainer.appendChild(preLoadItem);
	}
	
	document.getElementsByTagName("body")[0].appendChild(preLoadContainer);
	
	for(var i = 0; i < tdList.length; i++) {
		var spanList = getSubs(tdList[i], "span");
		var aList = getSubs(tdList[i].parentNode, "a");
		
		if(spanList.length == 0 || spanList[0].parentNode != tdList[i] || spanList[0].className != "normalname" || aList.length < 3) {
			continue;
		}
		
		var parseElem = aList[aList.length - 1], parseHref = parseElem.href;
		
		if(forumId == -1) {
			forumId = parseInt(parseHref.substr(parseHref.indexOf("f=") + 2, 3));
		}
		
		var postId = parseInt(parseHref.substr(parseHref.indexOf("p=") + 2, 10));
		
		var newButton = document.createElement("a");
		newButton.addEventListener("click", mqToggleQuote, false);
		newButton.className = "mqeStatic";
		newButton.style.backgroundImage = lsGet("mqa" + postId) ? checkedImg : uncheckedImg;
		newButton.style.cursor = "pointer";
		newButton.style.height = "20px";
		newButton.style.width = "75px";
		newButton.style.marginLeft = "1px";
		newButton.id = "tpi" + postId;
		newButton.style.cssFloat = "right";
		newButton.style.display = "block";
		
		var subSpan = document.createElement("span");
		subSpan.style.display = "none";
		subSpan.innerHTML = postId;
		newButton.appendChild(subSpan);
		
		parseElem.parentNode.insertBefore(newButton, parseElem.nextSibling);
	}
	
	var inputNode = null;
	var inputList = document.getElementsByTagName("input");
	
	for(var i = 0; i < inputList.length; i++) {
		if(inputList[i].value == "More Options" && inputList[i].className == "forminput") {
			inputNode = inputList[i];
			break;
		}
	}
	
	if(inputNode == null) return false;
	
	inputNode.parentNode.insertBefore(mqCreateMQButton("forminput"), inputNode.nextSibling);
	inputNode.parentNode.insertBefore(mqCreateSplitButton("forminput"), inputNode.nextSibling);
	
	mqUpdateCount(0, false);
}

function mqAppendToText(e) {
	var textArea = document.getElementsByTagName("textarea")[0];
	
	var maxIndex = parseInt(lsGet("mqc")), el, ck;
	
	if(lsGet("mqt") != topicId) return;
	
	var addedText = "";
	
	for(var i = 0; i < maxIndex; i++) {
		addedText += lsGet("mqv" + i);
		
		var el = document.getElementById("tpi" + lsGet("mqi" + i));
		
		if(el) {
			el.style.backgroundImage = uncheckedImg;
		}
	}
	
	textArea.value = textArea.value.substring(0, textArea.selectionStart) + addedText + textArea.value.substring(textArea.selectionEnd);
	
	mqUpdateCount(0, true);
	ls.clear();
}

function mqMinIndex(a, b, c) {
	if(a < 0) return b;
	else if(b < 0) return a;
	else if (a < b) return a;
	else return b;
}

function mqSplitQuote(e) {
	var textArea = document.getElementsByTagName("textarea")[0];
	
	var firstPart = textArea.value.substring(0, textArea.selectionStart);
	var lastPart = textArea.value.substring(textArea.selectionStart);
	
	while(firstPart.length > 0 && firstPart.charAt(firstPart.length-1) == "\n") {
		firstPart = firstPart.substring(0, firstPart.length-1);
	}
	
	while(lastPart.length > 0 && lastPart.charAt(0) == "\n") {
		lastPart = lastPart.substring(1);
	}
	
	var tagEndPos = -1, tagStartPos, tagNameEndPos, inTag = false;
	
	var splitChain = new Array();
	
	while((tagStartPos = firstPart.indexOf("[", tagEndPos+1)) != -1) {
		inTag = true;
		
		if((tagEndPos = firstPart.indexOf("]", tagStartPos+1)) == -1) {
			break;
		}
		
		inTag = false;
		
		tagNameEndPos = mqMinIndex(mqMinIndex(tagEndPos, firstPart.indexOf(" ", tagStartPos+1)), firstPart.indexOf("=", tagStartPos+1));
		
		if(firstPart.charAt(tagStartPos+1) == "/") {
			if(splitChain.length < 1) break;
			
			splitChain.pop();
		}
		else if(firstPart.charAt(tagStartPos+1) != "*") {
			var tagBeginText = firstPart.substring(tagStartPos, tagEndPos+1);
			var tagEndText = "[/" + firstPart.substring(tagStartPos+1, tagNameEndPos) + "]";
			
			splitChain.push(new Array(tagBeginText, tagEndText));
		}
	}
	
	if(inTag) {
		window.alert("In the middle of a tag.");
	}
	else if(splitChain.length == 0) {
		window.alert("Nothing to split.");
	}
	else {
		var newText = firstPart;
		
		for(var i = splitChain.length - 1; i >= 0; i--) {
			newText += splitChain[i][1];
		}
		
		newText += "\n";
		
		var newSelection = newText.length;
		
		newText += "\n\n";
		
		for(var i = 0; i < splitChain.length; i++) {
			newText += splitChain[i][0];
		}
		
		newText += lastPart;
	
		textArea.value = newText;
		textArea.selectionStart = newSelection;
		textArea.selectionEnd = newSelection;
		textArea.focus();
	}
}

function mqLoadForPostMode(ismsg) {
	var inputNode = null;
	var inputList = document.getElementsByTagName("input");
	
	for(var i = 0; i < inputList.length; i++) {
		if(inputList[i].value == " QUOTE " && inputList[i].className == "codebuttons") {
			inputNode = inputList[i];
			break;
		}
	}
	
	if(inputNode == null) return false;
	
	if(ismsg) {
		inputNode.parentNode.insertBefore(mqCreateMQButton("codebuttons"), inputNode.nextSibling);
		mqUpdateCount(0, false);
	}
	
	inputNode.parentNode.insertBefore(mqCreateSplitButton("codebuttons"), inputNode.nextSibling);
}

function mqLoadScript() {
	var pos, loc = document.location.href;
	
	if((pos = loc.indexOf("showtopic=")) >= 0) {
		topicId = parseInt(loc.substr(pos + 10, 10));
		
		mqLoadForViewMode();
	}
	else if((pos = loc.indexOf("act=ST&")) >= 0) {
		topicId = parseInt(loc.substr(loc.indexOf("&t=")+3, 10));
		
		mqLoadForViewMode();
	}
	else if(loc.indexOf("act=Post") >= 0) {
		topicId = parseInt(loc.substr(loc.indexOf("&t=")+3, 10));
		
		mqLoadForPostMode(true);
	}
	else if(loc.indexOf("act=Msg") >= 0 && loc.indexOf("CODE=04") >= 0) {
		mqLoadForPostMode(false);
	}
}

mqLoadScript();