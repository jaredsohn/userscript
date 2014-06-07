// ==UserScript==
// @name        Reddit - Auto-distinguish
// @include		/^https?://(.*\.)?reddit\.com/.*/
// @version		1.0
// @run-at document-start
// ==/UserScript==

function autoDistinguish() {
	//Watches for changes in the DOM
	var commentObserver = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			if(mutation.addedNodes) {
				for(var i = 0; i < mutation.addedNodes.length; ++i) {
					var item = mutation.addedNodes[i];
					//Check if the added element is a comment
					if($(item).is('div.comment')) {
						//Distinguish the comment
						$(item).find('form[action="/post/distinguish"] > .option > a').first().click();
						
						//Stop watching for changes
						commentObserver.disconnect();
						return;
					}
				}
			}
		});
	});

	//Add the mod save button next to each comment save button
	var saveButton = $('body.moderator button.save');
	if(saveButton.css("display") != "none")
		saveButton.after('<button class="save-mod">mod save</button>');
	
	//Add actions to the mod save buttons
	$('.usertext-buttons').on('click', 'button.save-mod', function (e) {
		commentObserver.observe(document.body, {childList: true, subtree: true, attributes: false, characterData: false});
		$(this).parent().find('button.save').click();
	});
}

//Add the script to the page
document.addEventListener('DOMContentLoaded', function(e) {
	var s = document.createElement('script');
	s.textContent = '('+autoDistinguish.toString()+')();';
	document.head.appendChild(s);
});
