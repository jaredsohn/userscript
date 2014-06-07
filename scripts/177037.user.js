// ==UserScript==
// @name        Toggle Post Visibility
// @namespace   pendevin
// @description Shows or hides a post when you click on the toggle button
// @include     http://boards.endoftheinter.net/showmessages.php?*
// @include     http://archives.endoftheinter.net/showmessages.php?*
// @include     https://boards.endoftheinter.net/showmessages.php?*
// @include     https://archives.endoftheinter.net/showmessages.php?*
// @require			http://code.jquery.com/jquery-2.0.3.min.js
// @version     1
// ==/UserScript==

//ll breaks without noconflict jquery
this.$ = this.jQuery = jQuery.noConflict(true);

//livelinks compatiblity *JQUERY
//calls the function on each message-container in a document, including ones added by livelinks
function livelinks(func,extraParams){
	if(extraParams==undefined)
		extraParams=null;
	//run the function on the message-containers currently on the page
	$('#u0_1 .message-container').each(function(i,container){
		func(container,extraParams);
	});
	//run it on any message-containers added in the future
	$('#u0_1').on(
		'DOMNodeInserted',
		extraParams,
		function(e){
			if($(e.target).children('.message-container').length){
				$(e.target).children('.message-container').each(function(i,container){
					func(container,e.data);
				});
			}
		}
	);
}

//adds a style to a document and returns the style object *JQUERY
//css is a string, id is an optional string that determines the object's id
function addStyle(css,id){
	//create a style
	var style=$('<style type="text/css">');
	//add the css data to it
	style.html(css);
	if(id){
		//remove any style that has our id
		$('#'+id).remove();
		//give our style the id after removing the other stuff. idk if it matters, but i'm too lazy to find out
		style.attr('id',id);
	}
	//add the style into the head
	$('head').append(style);
	//we're outta here
	return style;
}

//puts the message body of any quoted-message in its own message div like normal messages for easier styling(hiding)
//livelinks ready *JQUERY
function rearrangeQuotes(container){
	//this is a for loop or something
	$(container).find('.quoted-message').each(function(i,quote){
		var quote=$(quote);
		//create message div for quote
		var quoteBody=$('<div class="message">');
		//add everything but the message-top to the message div
		quote.contents().each(function(j,node){
			if(!$(node).hasClass('message-top')&&!$(node).hasClass('message')){
				quoteBody.append($(node).detach());
			}
		});
		//add the new message div to the quoted-message
		quote.append(quoteBody);
	});
}

function addToggles(container){
	rearrangeQuotes(container);
	$(container).find('.message-top').each(function(i,top){
		top=$(top);
		top.append('&nbsp;|&nbsp;');
		var toggle=$('<span class="linky">Toggle</span>');
		top.append(toggle);
		toggle.on(
			'click',
			function(e){
				$(e.target).parent().next().toggleClass('hidden');
			}
		);
	});
}

livelinks(addToggles);