// ==UserScript==
// @name StackOverflow tag remover mockup
// @description Just a mockup of the idea in http://meta.stackoverflow.com/questions/40990
// @match http://meta.stackoverflow.com/questions
// @match http://stackoverflow.com/questions
// @match http://meta.stackoverflow.com/questions?*
// @match http://stackoverflow.com/questions?*
// @match http://meta.stackoverflow.com/unanswered
// @match http://stackoverflow.com/unanswered
// @match http://meta.stackoverflow.com/unanswered?*
// @match http://stackoverflow.com/unanswered?*
// @match http://meta.stackoverflow.com/
// @match http://stackoverflow.com/
// @match http://meta.stackoverflow.com/?*
// @match http://stackoverflow.com/?*
// @namespace Camilo Martin Momenti
// @version 1.0
// ==/UserScript==

var main = function () {
	
	// Icon by Yusuke Kamiyamane.
	var iconUri = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn' +
		'ZVJlYWR5ccllPAAAAe5JREFUeNqkk89KG1EUxr+ZubnUjJaipgtNtTZKxE1AVIi4yM5tF30Hoe/iA3Tn' +
		'QkTBRbZFKApCAl1142CJqLR0ZUNJJpPJZP70nJvcEK0SpAPfzD3n5vedM2dujCRJ8D+XODIMGMA4aYfi' +
		'bdLkCKZO+kxlP5FcwRla7MytrHxcLhazMp2WT5HcbeB5gVOp5H44Dqd2RdTb217a2Mi6vi/h+6O6lu9W' +
		'V7M3jsPd7ppsQJqMTVO6rgtWdn8fev1YrpskkhlmzZBuLJ8qN5tNLJfLqgw/OX4sxyaaE2G/L8/z0Gq1' +
		'cLy4iA+1mjKcOzhQ+RrFpmniy9oaUqkUMpkMNDcwCIIAYRhiwraxNz2NwskJLMtSgJQSZwSr6Xa7aDca' +
		'/xowHFB7Xr0OO47vwazx4W9PJpozu2xK6hCY3N1hLIqQPz29BwshULq8RJp+x5JUTHODIRpkkKbv/GYI' +
		'/ra+jq+FgjJgbV5dKYMX1KHmBh1ImgFv3pZKCr4geJZiVjWfV+2e53K9LqiQ5kSnfzwjmuIY+cxT8J3g' +
		'+aF35nWVYJ1rx3HQ6R1pWNd0ewu8bkdRfkYI2zYMi/8M4oF0juGq7//8FUWHh0DF4L2XwMIW8H4KKFL8' +
		'asRR/vObwHOg3ACu2YA6x0S/wHMunmHzrwADAPb07huzEp/RAAAAAElFTkSuQmCC';

	var lsHiddenTags = localStorage['hiddenTags'];
	if (!lsHiddenTags ) {
		var hiddenTags = [];
	} else {
		var hiddenTags = JSON.parse(lsHiddenTags);
	}

	function storeHiddenTags() {
		localStorage['hiddenTags'] = JSON.stringify(hiddenTags);
	}

	function storeHiddenTag(tagName) {
		hiddenTags.push(tagName)
		storeHiddenTags();
	}

	function clearHiddenTags() {
		delete localStorage['hiddenTags'];
	}

	function hideTags(tagName) {
		$('.post-tag:contains(\'' + tagName + '\')').closest('.question-summary').remove();
	}

	function hideTagsSmooth(tagName) {
		$('.post-tag:contains(\'' + tagName + '\')').closest('.question-summary').fadeTo('fast', 0, function(){
			$(this).slideUp('slow', function() {
				$(this).remove();
			});
		});
	}

	for (var i in hiddenTags) {
		hideTags(hiddenTags[i]);
	}

	var icon = '<img src="' + iconUri + '" class="tag-remove-button" title="Hide questions with this tag on this page" style="opacity:0.4;padding-left:3px;margin:0 -2px -4px 0;"  onMouseOver="this.style.opacity=1" onMouseOut="$(this).fadeTo(200, 0.4)">';

	$('.post-tag').append(icon);

	// Look, I really don't know why, but the last tag looks weird on Chrome otherwise.
	$('.tags').append('<br>');
		
	$('.tag-remove-button').click(function(e) {
		tagName = this.parentNode.textContent;
		hideTagsSmooth(tagName);
		storeHiddenTag(tagName);
		$('#hidden-tags > h4').hide().text('Hidden Tags: ' + hiddenTags.length).fadeIn();
		e.stopPropagation(); // Don't bubble up
		e.preventDefault(); // Don't follow the link
	});

	// Styling inspired by: http://cdn.sstatic.net/security/all.css
	var clearTagsButton = '<input type="button" value="Clear hidden tag list" style="background-color:#c63929;background:-moz-linear-gradient(0% 100% 90deg, #891100 0%, #b51700 50%, #c63929 50%, #ee432e 100%);background:-webkit-gradient(linear, 0 0, 0 100%, color-stop(0, #ee432e), color-stop(0.5, #c63929), color-stop(0.5, #b51700), color-stop(1, #891100));background: -o-linear-gradient(top, rgba(238,67,46,1) 0%,rgba(198,57,41,1) 50%,rgba(181,23,0,1) 50%,rgba(137,17,0,1) 100%);border:1px solid #951100;color:#FFF;box-shadow: rgba(255, 115, 100, 0.398438) 0px 0px 0px 1px inset, rgb(51, 51, 51) 0px 1px 3px 0px;font-size: 12px;text-shadow: rgba(0, 0, 0, 0.796875) 0px -1px 1px;border-radius:3px;padding:0 4px 1px 4px;opacity:0.4;" onMouseOver="this.style.opacity=1" onMouseOut="$(this).fadeTo(200, 0.4)" OnClick="delete localStorage[\'hiddenTags\'];window.location.reload()">';

	$('#related-tags').before('<div class="module" id="hidden-tags"><h4>Hidden Tags: ' + hiddenTags.length + '</h4><p style="text-align:center">' + clearTagsButton + '</p></div>');

};

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
