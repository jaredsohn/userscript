// ==UserScript==
// @name           Tumblr Faux Read More
// @namespace      http://userstyles.org
// @author        oldandnewfirm
// @description    Inserts a read more break in reblogged tumblr posts that allows your comments to remain visible outside of the break.
// @include        http://www.tumblr.com/reblog/*
// @grant		none
// ==/UserScript==

(function(){

FRMICONURL = 'data:image/gif;base64,R0lGODlhFAAUALMIADExMR8fHx4eHjAwMIbDHRsbG4WFhf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNDYzODlEMzQ3MTcxMUUyQUJCMDk4Qjc1NjJEREU1MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNDYzODlENDQ3MTcxMUUyQUJCMDk4Qjc1NjJEREU1MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU0NjM4OUQxNDcxNzExRTJBQkIwOThCNzU2MkRERTUwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU0NjM4OUQyNDcxNzExRTJBQkIwOThCNzU2MkRERTUwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAQAACAAsAAAAABQAFAAABEwQyUmrvbiKw7v/RyAVYNkVo2miCKmCrPt6bDDcN6DreC5mwCCwgCISW0bk8ShsYgiEimFKrU6h1Sb0UsVSvVnLFjHmWqFga6bsbEYAADs=';

if (document.body.id=='tinymce')
	return; //hack in order to prevent script from running inside editor frame.
//hack for Chrome, as it doesn't support unsafeWindow.
if (!window.unsafeWindow) 
	{
	unsafeWindow = (function() 
		{
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
		}())
	};

$ = unsafeWindow.jQuery;

function fauxMore()
	{
	
	var post = $('#post_two_ifr').contents().find('#tinymce');
	var markup = $('<body>').append(post.html()); // temporary container
	
	markup.children('blockquote:first').each(function()
		{
			var viz = function (){
			if ($(this).children('p:lt(1)').find('img').length > 0) {//Test paragraph 0 for an image (Because Jquery uses 0-based indexing; 0 = the first paragraph in the set)
				$(this).children('p:gt(1)').remove(); //if an image is found in paragraph 0, remove all paragraphs but 0 and 1
				} else {
				$(this).children('p:gt(0)').remove(); //if an image is NOT found in paragraph 0, remve all paragraphs but 0.
				};	
			}
			var original = $(this).prev('p').children('a').attr('href'); //Get the href of the read more link 
		 $(this).html(viz).append('<p><a href="'+original+'" class="tumblr_blog">Read More</a></p>'); //Change $markup's contents to reflect the above changes and append a read more link to it.
		});
		
	post.html(markup.html());
	
	}

function appendButton()
	{
	//dirty, DIRTY hack -_- But I have no idea how to do it right, as editor seems to load dynamically.
	if ($('#post_two_blockquote').size()==0)
	{
		setTimeout(appendButton, 100);
		return false;
		};
	//forming the button, adding the handler...
	var button = $('<td style="position:relative;"><a class="mceButton mceButtonEnabled" role="button" id="post_two_faux_more" href="javascript:;" title="Insert FAUX \'Read More\' Break"><img src="'+FRMICONURL+'" /></a></td>');
	button.find('#post_two_faux_more').click(fauxMore);
	//...and placing it!
	//$('#post_two_pagebreak').parent().after(button);
	$('#post_two_toolbar1').find('.mceSeparator:last').parent().before(button);
	}
	
appendButton();
})();