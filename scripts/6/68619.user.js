// ==UserScript==
// @name                Easy Jira Comments
// @description         Adds clickable effect to the comments text field to add a new comment
// @include http://howler.holler.local:8082/*
// ==/UserScript==
(function() {
	//#descriptionArea
	//try {return showComment();}catch(e){return true;};
	//var elComments = document.getElementById('descriptionArea');
	//elComments.addEventListener('click', showComments, true);
	document.addEventListener('click', findDetails, true);
	
	function findDetails() {
		var elComments = document.getElementById('issueContent');
		if(elComments) {
			elComments.addEventListener('click', showComments, true);
		}
	}
	function showComments() {
		try {
			//return showComment();
			var comment = document.getElementById('commentDiv');
			comment.style.display = 'block';
			
		}
		catch(e){
			return true;
		};
	}
})();

