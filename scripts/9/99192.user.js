// ==UserScript==
// @name           Redmine - better projects page
// @namespace      366.hopto.org
// @description    Adds links to repository and activity for each project/sub-project
// ==/UserScript==
// set your projects redmine page like this (and move the line between ==UserScript== and ==/Userscript==):
// @include        https://example.com/projects

var result = document.evaluate("//li[@class='root' or @class='child']//div[@class='root' or @class='child']", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0;i<result.snapshotLength;i++){
    var h=result.snapshotItem(i);
	h.innerHTML = h.innerHTML.replace(/(<a href="(\/.*?)" class="project my-project">.*?<\/a>)(<div class="wiki description"><p>.*?<\/p><\/div>)/img, '$1 <a href="$2/activity" class="project">[A]</a> <a href="$2/repository" class="project">[R]</a> $3');
}
