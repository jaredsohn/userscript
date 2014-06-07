// ==UserScript==
// @name Rearrange Issue Links in JIRA 4
// @namespace Patrick Ryan
// @description This script moves the Issue Links to the top.
// @include https://carbon.pd.local:8443/browse/*
// @include https://carbon.pd.local/browse/*
// @author Patrick Ryan
// @version 0.9
// ==/UserScript==



	var link = document.getElementById('linkingmodule');
	var deet = document.getElementById('detailsmodule');
	var pare = document.getElementById('primary');
	pare = pare.firstChild;
	pare = pare.nextSibling;
	pare.insertBefore(link, deet);
	var desc = deet.firstChild.nextSibling;
	link = link.firstChild.nextSibling;
	var temp = link.cloneNode(1);
	deet.insertBefore(temp, desc);
	temp2 = temp.firstChild.nextSibling;
	temp.removeChild(temp2);
	temp2 = temp.firstChild.nextSibling.nextSibling;
	temp2.innerHTML = "Issue Description";
	var babies = deet.childNodes;
	temp2 = babies[2];
	for(i=0;i<4;i++){
		babies = temp2.childNodes;
		temp2 = babies[1];
	}
	temp2.innerHTML = '';
	