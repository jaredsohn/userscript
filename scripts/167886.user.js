// ==UserScript==
// @name		Konachan: Tag Subscription Page Tag Completion
// @namespace	Zolxys
// @description	Adds tag completion boxes to the edit page for tag subscriptions.
// @include	http://konachan.com/tag_subscription
// @include	http://konachan.net/tag_subscription
// @include	https://yande.re/tag_subscription
// @version	1.1
// ==/UserScript==
var f = String(function(){
var zoltsa = [];
function zoltsf() {
	var a = document.getElementById('tag-subscription-body').getElementsByTagName('input');
	var r = /^tag_subscription_(\d+)_tag_query$/;
	for (var i = 0; i < a.length; i++)
	  if (r.test(a[i].id)) {
		var n = parseInt(r.exec(a[i].id)[1]);
		if (zoltsa.indexOf(n)== -1) {
			zoltsa.push(n);
			new TagCompletionBox(a[i]);
			if (TagCompletion)
				TagCompletion.observe_tag_changes_on_submit(a[i].up('form'), a[i], null);
		}
	}
}
document.getElementById('content').addEventListener('DOMNodeInserted', zoltsf);
zoltsf();
});
var ne = document.createElement('script');
ne.setAttribute('type','text/javascript');
ne.innerHTML=f.substring(f.indexOf('\n') + 1, f.lastIndexOf('}'));
document.head.appendChild(ne);
