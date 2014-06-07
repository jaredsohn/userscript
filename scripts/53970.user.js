// ==UserScript==
// @name           Userscripts => Quick "Delete Post" button
// @namespace      #aVg
// @description    Adds buttons to quickly delete your posts on the userscripts.org forums.
// @include        http://userscripts.org/topics/*
// @version        0.1
// ==/UserScript==
function remove(A) {if(A) A.parentNode.removeChild(A)}
function baleet(E) {
	E.preventDefault();
	if (!confirm("Delete this post?")) return;
	GM_xmlhttpRequest({
		url : "http://userscripts.org"+location.pathname+"/posts/"+E.target.parentNode.parentNode.id.match(/\d+/)[0],
		method : "POST",
		data : "_method=delete&authenticity_token="+encodeURIComponent(unsafeWindow.auth_token),
		onload : function() {
			remove(E.target.parentNode.parentNode);
		},
		headers : {
			"Content-Type" : "application/x-www-form-urlencoded"
		}
	});
}
var edits = document.evaluate("//span[@class='edit']/../..", document, null, 6, null), edit, i=edits.snapshotLength;
while(edit=edits.snapshotItem(--i)) {
	var del = document.createElement("a");
	del.className = "utility";
	del.textContent = "Delete Post";
	del.addEventListener("click", baleet, false);
	edit.appendChild(del);
}