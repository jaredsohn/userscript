// ==UserScript==
// @name            What.CD Quick Quote
// @namespace       What.CD
// @description     Only selected text is quoted as long as it's quoted in the proper quote box
// @author          Chrome version by Mordred (inspired by Etheryte and Amareus)
// @include         https://*what.cd/inbox.php?action=viewconv&id=*
// @include         https://*what.cd/forums.php?*action=viewthread&threadid=*
// @include         https://*what.cd/torrents.php?id=*
// @include         https://*what.cd/colleges.php?id=*
// @include         https://*what.cd/artist.php*
// @include         https://*what.cd/requests.php?action*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL	    https://userscripts.org/scripts/source/161325.meta.js
// @version         0.9.5
// @date            2013-10-09
// ==/UserScript==

{
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	var orig_quote = window.Quote;
        window.Quote = function(args){
            return false;
        };
		
	$('a[onclick^="Quote("]').click(function(event) {
		//Get required arguments
		var arguments = jQuery(this).attr("onclick");
		var username = arguments.replace(/Quote\(\'[0-9]*\', \'/,"").replace(/\'.*/,"");
		var postID = arguments.replace(/Quote\(\'/,"").replace(/\'.*/,"");
		var textArea = jQuery('#quickpost');
		var addNewLines = false;
		var link = true;
		var target = '';
		var requrl = '';
			
		var elem = getSelectionContainerElement(); // find what element contains the selection and only quote if it's the container for the Quote button you clicked on
		var selText = window.getSelection().toString();
		
		if (url.path == "inbox") {
			requrl = 'inbox.php?action=get_post&post=' + postID;
		} else {
			requrl = 'comments.php?action=get&postid=' + postID;
		}
		if (url.path == "artist") {
			// artist comment
			target = 'a';
		} else if (url.path == "torrents") {
			// torrent comment
			target = 't';
		} else if (url.path == "collages") {
			// collage comment
			target = 'c';
		} else if (url.path == "requests") {
			// request comment
			target = 'r';
		} else {
			// forum post
			requrl = 'forums.php?action=get_post&post=' + postID;
		}
		target += postID;
		/*
		if(selText.length != 0 && (elem.id == "content"+postID || (elem && elem.id == "" && elem.nodeName != "BLOCKQUOTE" && elem.parentNode.id == "content"+postID))){
			// the target and requrl code got moved above so that the links work in more than just the forums
			var target = '';
			var requrl = '';
			
			ajax.get(requrl, function(response) {
				debugger;
				var selText = window.getSelection().toString();
				var selection = window.getSelection();
			
				if ($('#quickpost').raw().value !== '') {
					$('#quickpost').raw().value = $('#quickpost').raw().value + "\n\n";
				}
				str = html_entity_decode(response);
				$('#quickpost').raw().value = $('#quickpost').raw().value + "[quote=" + username + "|" + target + "]" + str + "[/quote]";
				resize('quickpost');
			});
		*/
		if(selText.length != 0 && (elem.id == "content"+postID || (elem && elem.id == "" && elem.nodeName != "BLOCKQUOTE" && elem.parentNode.id == "content"+postID))){
			if (textArea.val() !== '') addNewLines = true;
			textArea.val(textArea.val() + (addNewLines ? "\n\n" : "") + "[quote="+username + "|" + target + "]" + selText.trim() + "[/quote]");
		
			resize('quickpost');
		//...Otherwise proceed with a regular full-post quote
		} else {
			orig_quote(postID, username, true);
		}
		textArea[0].scrollIntoView();

		return false;
	});

	function getSelectionContainerElement() {
		var range, sel, container;
		if (document.selection && document.selection.createRange) {
			// IE case
			range = document.selection.createRange();
			return range.parentElement();
		} else if (window.getSelection) {
			sel = window.getSelection();
			if (sel.getRangeAt) {
				if (sel.rangeCount > 0) {
					range = sel.getRangeAt(0);
				}
			} else {
				// Old WebKit selection object has no getRangeAt, so
				// create a range from other selection properties
				range = document.createRange();
				range.setStart(sel.anchorNode, sel.anchorOffset);
				range.setEnd(sel.focusNode, sel.focusOffset);

				// Handle the case when the selection was selected backwards (from the end to the start in the document)
				if (range.collapsed !== sel.isCollapsed) {
					range.setStart(sel.focusNode, sel.focusOffset);
					range.setEnd(sel.anchorNode, sel.anchorOffset);
				}
			}

			if (range) {
				/*** This function is generic and unedited except for the part between here and the next comment. Remove this section to always return the actual getSelectionContainerElement. ***/
				if (range.startContainer.parentNode.nodeName == "BLOCKQUOTE" || range.endContainer.parentNode.nodeName == "BLOCKQUOTE") {
					container = range.commonAncestorContainer.parentNode;	// we want to ensure we don't return the true parent div so that later checks will fail
				}
				else
				/*** edited section ends here ***/
					container = range.commonAncestorContainer;

				// Check if the container is a text node and return its parent if so
				return container.nodeType === 3 ? container.parentNode : container;
			}   
		}
	}
	
	/*function doQuickQuote(obj) {
		// can't use $ in here because it's called after we've called jQuery.noConflict
		var addNewLines = false;
		var selText = document.getSelection().toString();
		var commentDiv = jQuery(obj).parent().parent().parent().parent().find('td.body > div').eq(0);
		var ajaxResponse;
		postID = commentDiv.attr("id").match(/content(\d*)/)[1];
		poster = jQuery(obj).parent().find('strong > a').eq(0).text();
		//console.log(poster);
		jQuery.ajax({
				url: "?action=get_post&post=" + postID,
				type: 'GET',
				async: false,
				success: function(response) {
					ajaxResponse = html_entity_decode(response);	//not sure if this needs to happen but Quote() in comments.js does it, so why not be safe?
				}
			});
			
		elem = getSelectionContainerElement();
		if (selText == "" || selText == null || elem != commentDiv[0]) {
			selText = ajaxResponse;
		}
		textArea = jQuery('#quickpost');
		if (textArea.val() !== '')
			addNewLines = true;
		textArea.val(textArea.val() + (addNewLines ? "\n\n" : "") + "[quote="+poster+"|"+postID+"]" + selText.trim() + "[/quote]");
	}*/
		
	jQuery.noConflict();
}
// load jQuery and execute the main function
if( /opera/i.test(navigator.userAgent)) {
	console.log("What.CD Quick Quote: If this script is not working in Opera, make sure the filename ends in user.js");
	addJQuery(main);
}
else if( ! /firefox/i.test(navigator.userAgent) ) {	// chrome and safari
	addJQuery(main);
	}
else {
	this.$ = this.jQuery = jQuery.noConflict(true);
	main();
}
}