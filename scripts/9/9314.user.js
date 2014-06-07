// ==UserScript==
// @name           JIRA: Add New Comment
// @namespace      JIRA
// @description    Moves the new comment field so that it appears after the last comment.
// @include        */jira/browse/*
// @include        */jira//browse/*
// ==/UserScript==

function runScript() {

	addNewComment();

};
window.addEventListener("load", function() { runScript() }, false);

function addNewComment() {
  var doc = window.document;
  var newCommentDiv = doc.createElement("div");
	newCommentDiv.innerHTML = getNewCommentHtml();
	var commentDiv = document.getElementById("commentDiv");
	insertBefore(newCommentDiv, commentDiv);
}

function insertBefore(newNode, target) {
	var parent = target.parentNode;
	var refChild = target.previousSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
};

function getNewCommentHtml() {
	var html = "<img src=\"/jira/images/icons/bullet_creme.gif\" align=\"absmiddle\" border=\"0\" height=\"8\" width=\"8\">\n";
	html += "<b><a onclick=\"try {return showComment();}catch(e){return true;};\" id=\"comment_issue\" href=\"/jira/secure/AddComment%21default.jspa?id=30753\">Comment</a></b><a accesskey=\"m\" onclick=\"try {return showComment();}catch(e){return true;};\" href=\"/jira/secure/AddComment%21default.jspa?id=30753\"></a></b> on this issue\n";
	return html;
}