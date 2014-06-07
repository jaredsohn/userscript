// ==UserScript==
// @name           TDWTF - MFD Autohider
// @namespace      http://www.beerputer.com/greasemonkey/tdwtf/
// @description    Autohides Mandatory Fun Day articles on TheDailyWTF
// @include        http://thedailywtf.com/
// ==/UserScript==

function xpath(pattern, container) {
	if(container == null) container = document;

	var matches = document.evaluate(pattern, container, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	//return an array of matches
	var result = [];
	var i = 0;
	while((match = matches.snapshotItem(i)) != null) {
		result[i] = match;
		i++;
	}
	return result;
}

function toggleMFD(evt) {
	var e = evt.target;
	var mfd = e.parentNode.parentNode.parentNode.getElementsByClassName('ArticleBody')[0];
	//show or hide the mfd and change the link text
	if(mfd.style.display == "block") {
		mfd.style.display = "none";
		e.innerHTML = "Show MFD";
	} else {
		mfd.style.display = "block";
		e.innerHTML = "Hide MFD";
	}
}

mfds = xpath('//div[@class="Home_ArticleSummaryContainer"]//div[@class="Mandatory_Fun_Day_Outer"]/following-sibling::div[@class="ArticleBody"]');

//autohide all of the actual articles and add a unique ID (of sorts)
for(var i = 0; i < mfds.length; i++) {
	mfd = mfds[i];
	mfd.style.display = "none";
	mfd.id = "tdwtf_-mfd_autohider_id_" + i;

	//add a 'show hidden content' link to the headers
	header = mfd.parentNode.getElementsByClassName('Mandatory_Fun_Day_Inner')[0];

	var span, text;
	span = document.createElement('span');
	span.className = 'Date';
	span.addEventListener('click', toggleMFD, true);
	text = document.createTextNode('Show MFD');
	span.appendChild(text);
	header.appendChild(span);

}
