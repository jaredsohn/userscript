// ==UserScript==

// @name          dataup.to direct link
// @namespace     http://www.forum.p30world.com
// @description   dataup.to direct link creator !
// @include       http://dataup.to/member/files
// @include       http://www.dataup.to/member/files
// @exclude      http://www.google.com/*

// ==/UserScript==
allbuttons = document.getElementsByTagName('button');
for (i = 0 ; i < allbuttons.length ; i++){
	if(allbuttons[i].id && allbuttons[i].id != 'list'){
		allbuttons[i].parentNode.innerHTML += '<a class="direct" role="aaa" href="http://q100.dataup.to:83/download.php?id=' + allbuttons[i].id + '" > Directlink </a>';
		i += 2;
	}
}