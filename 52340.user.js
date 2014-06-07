// ==UserScript==
// @name           link2txt
// @namespace      http://userscripts.org/users/96624/scripts
// @description    quick & dirty link disabler, partly stolen from mailto disabler :)
// @include        *
// ==/UserScript==


// this is the blocklist, don't forget to wrap in single quotes and separate with commas!
var blocklist = new Array(
    'twitter',
    'huffington'
);

function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

blocklist.forEach(function(blockword) {
    var links = $x("//a[contains(@href, '" + blockword + "')]");
    links.forEach(function(link) {
        link.setAttribute("onclick", "return confirm('Are you sure you want to visit: "+ link.href + " ?')");
        link.innerHTML += "(disabled)";
        link.style.color = "gray";
    });
});
