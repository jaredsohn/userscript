// ==UserScript==
// @name       RegexGeneratorSiteAwesomeifier
// @namespace  http://www.chrismgonzales.wordpress.com
// @version    0.3
// @description  Blocks the ad on the regex site and displays the full regexs for you to copy.
// @match      http://txt2re.com/index-csharp*
// @copyright  2012+, Chris Gonzales
// @license GNU General Public License (GPL)
// ==/UserScript==


function blockThat(){
	var allParas = document.getElementsByTagName("a");
	for(var i = 0; i < allParas.length; i++){
		if(allParas[i].getAttributeNode("href").value.indexOf("amazon") != -1){
			var parent = allParas[i].parentNode.parentNode.parentNode.parentNode.parentNode;
			parent.parentNode.removeChild(parent);
		}
	}
}

function displayRegexs(){
var strings = document.getElementsByClassName("string");
var fullRegex = "";

for(var i = 0; i < strings.length; i++){
    if(strings[i].previousSibling.previousSibling.innerHTML.indexOf("re") != -1){
        var groupValue = strings[i].innerHTML.trim();
        groupValue = groupValue.substring(1,groupValue.length - 1);
        fullRegex = fullRegex.concat(groupValue);
    }
}

if(strings.length > 1){

	var codeTable = document.getElementsByClassName("normal")['0'];
	var target = codeTable.parentNode.parentNode.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;

	var toBeInserted = "<table cellspacing=\"0\" cellpadding=\"5\" border=\"1\" bgcolor=\"#ffffff\"><tr><td><pre><font color=\"black\"><b>Full Regex</b></font></pre></td><td><pre><font class=\"string\">";

	toBeInserted = toBeInserted.concat(fullRegex);

	toBeInserted = toBeInserted.concat("</font></pre></td></tr><tr><td><pre><font color=\"black\"><b>Escape Characters Removed</b></font></pre></td><td><pre><font class=\"string\">");

	var removedRegex = "";

	var removedRegex = fullRegex.replace(/\\\\/g,"\\");

	toBeInserted = toBeInserted.concat(removedRegex);

	toBeInserted = toBeInserted.concat("</font></pre></td></tr></table>");

	target.innerHTML = toBeInserted;
	
}

}

blockThat();
displayRegexs();

