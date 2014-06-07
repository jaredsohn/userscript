// ==UserScript==
// @name          Instapaper Wordcounter
// @namespace     http://userstyles.org
// @description	  Add a button to fetch the word count of saved Instapaper articles
// @author        Matt Timlin
// @include       http://www.instapaper.com/u*
// ==/UserScript==

function main() {
	var allDivs, thisDiv;
	allDivs = document.evaluate("//div[@class='tableViewCell' or @class='tableViewCell tableViewCellFirst' or @class='tableViewCell tableViewCellLast']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		var hrefNum = thisDiv.getAttribute("id");
		hrefNum = hrefNum.replace("tableViewCell","");

		var anchors = thisDiv.getElementsByTagName('a');
		for (var j=0; j < anchors.length; j++) {
			if (anchors[j].getAttribute("class") == "actionButton textButton") {
				var anchorTarget = anchors[j].href;
				var buttonLocation = document.getElementById("text" + hrefNum);

				var wcButton = document.createElement('button');
				wcButton.setAttribute('class', 'actionButton textButton');
				wcButton.setAttribute('id', hrefNum);
				
				if (anchorTarget.indexOf(".pdf") != -1) {
					wcButton.appendChild(document.createTextNode("PDF"));
				} else {
					wcButton.addEventListener('click', clickHandle, false);
					wcButton.appendChild(document.createTextNode("WC"));
				}
				buttonLocation.parentNode.insertBefore(wcButton, buttonLocation);
			}
		}
	}
}

main();

function clickHandle() {
	var articleId = this.getAttribute('id');
	
	var oldButton = document.getElementById(articleId);
	var spinner = document.createElement('img');
	spinner.setAttribute('class', 'actionButton');
	spinner.setAttribute('style', "vertical-align: -10px;");
	spinner.setAttribute('width', '14px');
	spinner.setAttribute('height', '14px');
	spinner.setAttribute('src', '/images/loader-gray-big.gif');
		
	oldButton.parentNode.replaceChild(spinner, oldButton);

	GM_xmlhttpRequest({method: 'GET', url: 'http://www.instapaper.com/go/'+articleId+'/text',
		headers: {
			'Accept': 'text/xml',
		}, onload: function (responseDetails) {
			var count = 0, regexStr = '<.*?>', regex = new RegExp(regexStr, 'g');
			
			var oDiv = document.createElement('div');
			oDiv.setAttribute('id', 'gmTopicList');
			oDiv.setAttribute('name', 'gmTopicList');
			oDiv.innerHTML = responseDetails.responseText;
			
			var o = oDiv.getElementsByTagName("div");
			
			for(var i=0;i<=o.length-1;i++) {
				if(o[i].id=="story") {
					var story = o[i].innerHTML;
					break;
				}
			}
			
			var text = story.replace(regex, ' ');
			if (words = text.match(/(\S+)/g)) {
				count = words.length;
			}
			
			var newButton = document.createElement('button');
			newButton.setAttribute('class', 'actionButton textButton');
			newButton.setAttribute('id', articleId);
			newButton.appendChild(document.createTextNode(count));
			
			spinner.parentNode.replaceChild(newButton, spinner);
		}, onerror: function(responseDetails) {
			alert('Oops! Access error to http://www.instapaper.com/go/'+articleId);
		}
	});
}