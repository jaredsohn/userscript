// ==UserScript==
// @name           BBT your smilies
// @namespace      http://userscripts.org/
// @description    Add your personalized smilies to BBT
// @author         brunoais
// @include        http://bakabt.me/addcomment.php*
// @include        http://bakabt.me/editcomment.php*
// @version        1.1.1
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

function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

function getXpathRes(){
	//Bakabt add comment
	var path = xpath("//div[@id='smilies4']");
	if(path.snapshotLength > 0) return path;
	//Bakabt edit comment
	path = xpath("//input[@name='returnto']");
	if(path.snapshotLength > 0) return path;
	return false;
}

function insertImgsIntoElement (elem, urls){
	for(var i = 0; i < urls.length; i++) {
		var img = document.createElement("img");
		img.src = urls[i];
		img.style.cursor = "pointer";
		var listner = function(url2){
			if(document.getElementsByName('main')[0]){
				return function(){
					putInTxtarea('[img]' + url2 + '[/img]', 
					document.getElementsByName('main')[0]);
					};
			}else{
				return function(){
					putInTxtarea('[img]' + url2 + '[/img]', 
					document.getElementsByName('text')[0]);
					};
			}
		}(urls[i]);

		img.addEventListener('click', listner, false);
		elem.appendChild(img);
	}
}

var xpathRes = getXpathRes();
if(xpathRes){
	var elem = document.createElement("div");
	elem.id = "mySmilies";
	elem.innerHTML = "";
	
	insertImgsIntoElement(elem, smiliesUrl);
	
	insertAfter(xpathRes.snapshotItem(0), elem);
	
}

	
var menu=function() {
	
	var img=prompt("Url for the smilie");
	if (img!=null && img != "")
	{
		GM_setValue("smilies", (GM_getValue("smilies", "") + img + "|") );
		alert('smilie added');
	}
}
GM_registerMenuCommand("BBT:New smilie", menu);

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
GM_registerMenuCommand("BBT:Edit/Erase Smilie", menu);