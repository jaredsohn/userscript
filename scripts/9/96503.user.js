// ==UserScript==
// @name           SMF your smilies
// @namespace      http://userscripts.org/
// @description    Add your personalized smilies to SMF
// @author         brunoais
// @include        */index.php?action=post;topic=*
// @include        */index.php?action=post;msg=*
// @include        */index.php?action=post;quote=*
// @include        */index.php?action=post;board=*
// @version        1.5
// ==/UserScript==


var smiliesUrl = GM_getValue("smilies", "|").split("|");
smiliesUrl.pop();
//////////////// ADD YOUR SMILIES HERE!!!!!!!! ///////////////////

/* To add a smile You just need to copy this code:
smiliesUrl.push("");
and insert the url for the image between the "", like this:
smiliesUrl.push("http://i23.photobucket.com/albums/b371/K0modoDragon/Smileys/nosebleed.gif");
*/

//////////////// UNLESS YOU WANT TO CHANGE THE CODE, DON'T MESS UP WITH WHAT'S BELOW!!!!!!!! ///////////////////

/* 	Replace a text in the textarea
 *	@author bakabt
 */
	function putInTxtarea(text, textarea) {
		// Mozilla text range replace.
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
		// Just put it on the end.
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
		var img = document.createElement("img");
		img.src = urls[i];
		img.style.cursor = "pointer";
		var listner = function(url2){
			return function(){
				putInTxtarea('[img]' + url2 + '[/img]', 
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
		showHideButton.textContent = "Click to show/hide your smilies";
		var shouldShow = GM_getValue("showSmilies", true);
		
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

	
var menu=function() {
	
	var img=prompt("Url for the smilie");
	if (img!=null && img != "")
	{
		GM_setValue("smilies", (GM_getValue("smilies", "") + img + "|") );
		alert('smilie added');
	}
}
GM_registerMenuCommand("SMF:New smilie", menu);

var menu=function() {
	var smilies = GM_getValue("smilies", "").split("|");
	smilies.pop();
	var promptOut = "";
	for (num in smilies){
		promptOut +=num + "->" + smilies[num] + "\n";
	}
	if(smilies.length == 0){
		alert("There are no smilies");
		return false;
	}
	
	var option = prompt("Which one do you want to edit/eliminate?(The number)\n"+promptOut, "");
	if(option != null && !isNaN(option) && option < smilies.length ){
		var newUrl = prompt("Change the url to edit it or erase it to delete it", smilies[option]);
		if(newUrl != null && newUrl.length > 0){
			smilies[option] = newUrl;
			alert('smilie changed');
		}else if(newUrl != null && newUrl.length == 0){
			smilies.splice(option,1);
			alert('smilie deleted');
		}
		
		GM_setValue("smilies",smilies.join("|")+"|" );

	}
}
GM_registerMenuCommand("SMF:Edit/Erase Smilie", menu);