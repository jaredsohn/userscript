// ==UserScript==
// @name           PeopleAdmin Job Search
// @description    Looking for a job at a university or other org that uses this one-job-at-a-time listing engine? Opens job details in new windows / tabs.
// @namespace      https://*
// @include        https://*/applicants/jsp/shared/*
// ==/UserScript==

var xpathResult = document.evaluate('//a[starts-with(@class,"command")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0; i<xpathResult.snapshotLength; i++) {

	var link = xpathResult.snapshotItem(i);
	var myForm = link.parentNode;
	while(myForm.nodeName != 'FORM' && myForm.nodeName != 'BODY') {
		myForm = myForm.parentNode;
	}

	if(myForm.nodeName == 'FORM') {

		myForm.target = '_blank';
		myForm.attributes.removeNamedItem('onsubmit');

		link.href = '';
		link.attributes.removeNamedItem('onclick');

		var newAction = document.createAttribute('onclick');
		newAction.value = 'document.' + myForm.name + '.submit(); return false;';
		link.attributes.setNamedItem(newAction);

	}
}