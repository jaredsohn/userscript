// ==UserScript==
// @name          Boing Boing Quiz
// @namespace     http://www.allpeers.com/blog/greasemonkey
// @description		Transforms Boing Boing into a death-defying quiz
// @include       http://www.boingboing.net/
// @include       http://boingboing.net/

// ==/UserScript==

(function() {
	var select = "<select><option>(Guess Who!)</option><option>Cory Doctorow</option><option>David Pescovitz</option>";
	select += "<option>Mark Frauenfelder</option><option>Xeni Jardin</option></select>";
	
	var posteds = document.evaluate("//p[@class='posted']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; i<posteds.snapshotLength; i++)
	{
		var posted = posteds.snapshotItem(i);
	  var textNode = posted.firstChild;
	  var author = textNode.nodeValue.match(/posted by\s*(\w* \w*) at\s.*/)[1];
	  posted.innerHTML = textNode.nodeValue.replace(/(posted by\s).*(\sat\s.*)/, "$1"+select+"$2");
	  posted.setAttribute("answer", author);
	}
	
	var archives = document.evaluate("//a[@href='http://boingboing.net/archive.html']", document, null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	archives = archives.snapshotItem(archives.snapshotLength-1);
	archives.parentNode.insertBefore(document.createElement("p"), archives.nextSibling);
	var div = document.createElement("div");
	div.setAttribute("align", "center");
	div.innerHTML = "<button>How'd I do?</button>";
	archives.parentNode.insertBefore(div, archives.parentNode.lastChild);
	div.firstChild.onclick = calcResults;

	function calcResults()
	{
		var correct = 0;
		for (i=0; i<posteds.snapshotLength; i++)
		{
			var posted = posteds.snapshotItem(i);
			var selectElement = posted.firstChild.nextSibling;
			var selectedValue = selectElement.options[selectElement.selectedIndex].text;
	  	var para = document.createElement("p");
		  if (selectedValue == posted.getAttribute("answer"))
		  {
		  	para.innerHTML = "<font color='green' size='+1'>Correct!</font>";
				correct++;
			}
			else
				para.innerHTML = "<font color='red' size='+1'>Wrong! (" + posted.getAttribute("answer") + ")</font>";
			posted.insertBefore(para, posted.lastChild.nextSibling);
		}
		var percent = Math.round((100 * correct) / posteds.snapshotLength);

		var scoring = new Array(
			"Bwaaaaaahahahahahaha!", 
			"You're new here, aren't you?", 
			"Rough night last night?", 
			"Well done! Now get back to work.", 
			"Boingolicious!",
			"Hmmm, me thinkee you peekee.");
	
		div.innerHTML = "<font size='+1'>" + percent + "% " + scoring[Math.floor(percent/20)] + "</font>";		
		div.scrollIntoView(false);
	}
})();