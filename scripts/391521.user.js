// ==UserScript==
// @name		Reddit - Distinguish toggle
// @include		/^https?://(.*\.)?reddit\.com/.*/
// @version		1.0
// @run-at		document-start
// ==/UserScript==

function distinguish_toggle() {
	//Add distinguish button listeners
	$('.thing form[action="/post/distinguish"]').on('click', distinguishClicked);
	
	//Watches for changes in DOM to add distinguish button listeners if needed
	var commentObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(mutation.addedNodes) {
				for(var i = 0; i < mutation.addedNodes.length; ++i) {
					var item = mutation.addedNodes[i];
					//Check if the added element is a comment
					if($(item).is('div.comment')) {
						$(item).find('form[action="/post/distinguish"]').first().on('click', distinguishClicked);
						return;
					}
				}
			}
		});
	});
	commentObserver.observe(document.body, {childList: true, subtree: true, attributes: false, characterData: false});
	
	function distinguishClicked() {
		parentPost = $(this).parents('.thing').first();
		var distinguished = getDistinguishState(parentPost);
		
		$(this).find('.option > a').get(distinguished ? 1 : 0).click();
	}
	
	//Get a comment's distinguish state
	function getDistinguishState(post) {
		var author = $(post).find('a.author').first();
		return author.hasClass('moderator');
	}
}

document.addEventListener('DOMContentLoaded', function(e){
	var s = document.createElement('script');
	s.textContent = '('+distinguish_toggle.toString()+')();';
	document.head.appendChild(s);
});