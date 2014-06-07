// ==UserScript==
// @name           Userscripts.org Anti-Spam Bot
// @namespace      #aVg
// @description    Clean up spam more effectively than ever before.
// @include        http://userscripts.org/posts*
// @version        0.1
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
if(self!=top) return;
var ver = 0.1;
function Element(A, B, C) {
	A = document.createElement(A);
	if(B) for(var b in B) {
		var cur=B[b];
		if(b.indexOf("on")==0) A.addEventListener(b.substring(2), cur, false);
		else if(b.charAt(0)=="@") A.setAttribute(b.substring(1), B[b]);
		else A[b]=B[b];
	}
	if(C) for each(var c in C) A.appendChild(c);
	return A;
}
function $(A) {return document.getElementById(A)}
function single(A, B) {return document.evaluate("." + A, B || document.body, null, 9, null).singleNodeValue}
function loop(A, B, C) {
	A = document.evaluate("." + A, C || document.body, null, 6, null);
	var I = A.snapshotLength;
	while(--I >= 0) B.apply(A.snapshotItem(I));
}
function remove(A) {if(A) A.parentNode.removeChild(A);return remove}
var spam = [], spammers = {};
loop("//td[@class='body entry-content']", function() {
	var text = this.innerHTML;
	if(text.indexOf(", most recently on topic ") > 0) return;
	if(/\b(?:finance|accessoi?r)/i.test(text) || this.getElementsByTagName("a").length >= 10) spam.push(this);
});
for(var i = spam.length - 1; i >= 0; --i) {
	var parent = spam[i].parentNode;
	var user = single("//span[@class='fn']/a", parent),
	    id = user.href.match(/(\d+)/)[1];

	var topic = single("//a[starts-with(@href, '/topics/')]", parent);

	if(topic.pathname=="/topics/9") {
		spam.splice(i, 1);
		continue;
	}

	if(!(id in spammers))
	spammers[id] = {
		name : user.textContent,
		posts : [],
		avatar : single("//img[@class='photo']", parent).src
	};

	spammers[id].posts.push({
		url : topic.href,
		title : topic.textContent,
		post : parent.id
	});
}
if(spam.length == 0) return;
console.log(spammers);
var report = "<h1>UserScripts.org Anti-Spam Bot 9,001 <em>v "+ver+"</em></h1><small>The following is an automagically generated list of spammers and their posts.</small><ul>";
for(var s in spammers) {
	var spammer = spammers[s];
	report += "<li><img src=\""+spammer.avatar+"\"><a href=\"/users/"+s+"\"><strong>" + spammer.name + "</strong></a><ul>";
	for (var p in spammer.posts) {
		var spamPost = spammer.posts[p];
		report += "<li><a href=\""+spamPost.url + "#" + spamPost.post +"\">Post</a> on topic: <a href=\""+spamPost.url+"\">"+spamPost.title+"</a></li>";
	}
	report += "</ul></li>";
}
report += "</ul>";
if(confirm("Report "+spam.length+" spam posts?"))
GM_xmlhttpRequest({
	method : "POST",
	data : "authenticity_token=" + encodeURIComponent(unsafeWindow.auth_token) + "&post%5Bbody%5D="+encodeURIComponent(report)+"&commit=Post+reply",
	url : "http://userscripts.org/topics/9/posts",
	onload : function(A) {
		console.log(A);
		alert("SPAM REPORTED! PAT YOURSELF ON THE BACK!");
	},
	headers : {
		"Content-type" : "application/x-www-form-urlencoded"
	}
});