// ==UserScript==
// @name             Digg Done That
// @namespace        http://www.outshine.com/
// @description      Been there, done that?  On Digg, this removes articles you've read.
// @include          *digg.com/*
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2008-04-13.
Updated on 2008-09-27.
Version: 1.0.2
*/
function getRealElement(item) {
	while (item.nodeType !== 1) {
		item = item.nextSibling;
	}
	return item;
}

/*
This runs whenever the user clicks the "mark this read" link by a story.
*/
function handleBegone(e) {
//	divAbout = this.parentNode.parentNode.parentNode.getAttribute("about");
	tempNodes = this.parentNode.childNodes;
	for (var z = 0; z < tempNodes.length; z++) {
		if (tempNodes[z].nodeType == 1) {
			if (tempNodes[z].className.indexOf('comments') != -1) {
				divAbout = tempNodes[z].getAttribute("href");
			}
		}
	}
	var doneThatString = GM_getValue('diggDoneThat');
	if (doneThatString === "" || doneThatString === null || doneThatString === false || typeof doneThatString == 'undefined') {
		var doneThatArray = new Array();
		doneThatArray[0] = divAbout;
	}
	else {
		doneThatArray = doneThatString.split(/, */);
		doneThatArray.unshift(divAbout);
		if (doneThatArray.length > 250) {
			doneThatArray.length = 250;
		}
	}
	tempDoneThatString = doneThatArray.toString();
	GM_setValue('diggDoneThat', tempDoneThatString);
	this.parentNode.parentNode.parentNode.setAttribute('style', 'display: none;');
}

/*
This runs when the user clicks the "clear your read stories" link, in settings.
*/
function handleReset(e) {
	if (confirm('All the stories marked "read" will reappear if you do this.  OK?')) {
		GM_setValue('diggDoneThat', '');
		this.setAttribute('style', 'font-family: inherit; font-size: 85%; font-weight: bold; padding: 4px 10px 4px 32px; color: gray;');
		this.removeEventListener("click", handleReset, false);
		alert('Done!');
	}
}

mainDiv = document.getElementById('wrapper');

/*
First let's handle the settings page, which gets an added config option.
*/
if (document.location.pathname.indexOf('/settings') === 0) {
	divArray = mainDiv.childNodes;
	for (var i = divArray.length - 1; i > -1; i--) {
		if (divArray[i].nodeType == 1) {
			if (divArray[i].className.indexOf('sidebar') != -1) {
				/*
				We found the sidebar, so let's add the new config option.
				*/
				divElement = document.createElement('li');
				divElement.setAttribute('style', 'font-family: inherit; font-size: 85%; font-weight: bold; padding: 4px 10px 4px 32px; cursor: pointer; color: #105CB6;');
				divLink = 'Clear your read stories';
				divElement.innerHTML = divLink;
				divElement.addEventListener("click", handleReset, false);
				divFirstChild = getRealElement(divArray[i].firstChild);
				divFinalDestination = getRealElement(divFirstChild.nextSibling);
				divFinalDestination.appendChild(divElement);
			}
		}
	}
}
/*
Now let's handle the rest of digg.com, including the news pages.
*/
else {
	tempNodes = mainDiv.childNodes;
	for (var x = 0; x < tempNodes.length; x++) {
		if (tempNodes[x].nodeType == 1) {
			if (tempNodes[x].className.indexOf('main') != -1) {
				divArray = tempNodes[x].childNodes;
			}
		}
	}
	/*
	If we remove an element, the array is modified mid-loop!  So we count backwards.
	That way, if the array changes, it only affects elements we're done with.
	*/
	for (var i = divArray.length - 1; i > -1; i--) {
		/*
		The nodeType of 1 verifies we're working with an element (like a div).
		*/
		if (divArray[i].nodeType == 1) {
			if (divArray[i].className.indexOf('news-summary') != -1) {
				/*
				The comment link's "href" attribute is a unique id we can use.
				*/

				tempAs = divArray[i].getElementsByTagName('a');
				for (var x = 0; x < tempAs.length; x++) {
					if (tempAs[x].nodeType == 1) {
						if (tempAs[x].className.indexOf('comments') != -1) {
							divAbout = tempAs[x].getAttribute('href');
						}
					}
				}

//				divAbout = divArray[i].getAttribute('about');
				divRegEx = '(,|^)' + divAbout + '(,|$)';
				var pattern1 = new RegExp(divRegEx, 'i');
				filterWords = GM_getValue('diggDoneThat');
				/*
				If the unique identifier is in our list of taboo IDs, kill it...
				*/
				if (pattern1.test(filterWords)) {
					divArray[i].parentNode.removeChild(divArray[i]);
				}
				/*
				...Otherwise, give it a link to kill it.
				*/
				else {
					divElement = document.createElement('span');
					divElement.setAttribute('class', 'tool');
					divElement.setAttribute('style', 'font-weight: bold; padding: 5px 0px 0px 32px; cursor: pointer; color: #105CB6;');
					divLink = '(Mark this read)';
					divElement.innerHTML = divLink;
					divElement.addEventListener("click", handleBegone, false);
					newsArray = divArray[i].getElementsByTagName('div');
					for (var j = newsArray.length - 1; j > -1; j--) {
						if (newsArray[j].nodeType == 1) {
							if (newsArray[j].className.indexOf('news-details') != -1) {
								newsArray[j].appendChild(divElement);
							}
						}
					}
				}
			}
		}
	}
}
