// ==UserScript==
// @name        Imagenorator
// @namespace   pendevin
// @description turns images into links in specified people's posts
// @include     http://boards.endoftheinter.net/showmessages.php?*
// @include     http://archives.endoftheinter.net/showmessages.php?*
// @include     https://boards.endoftheinter.net/showmessages.php?*
// @include     https://archives.endoftheinter.net/showmessages.php?*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @version     2
// ==/UserScript==


//add userIDs of people you want ignorated
//this is CactusMD and Miyako
const IMAGENORATED=$([13346,17300]);


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

//tags message-tops with userids
//should call it with livelinks imo *JQUERY
function userids(container){
	$(container).find('.message-top').each(function(i,top){
		top=$(top);
		//get userid attribute from the profile link
		top.attr('userID',top.children('a[href*="user="]').attr('href').split('user=')[1]);
	});
}

//puts the message body of any quoted-message in its own message div like normal messages for easier styling(hiding)
//livelinks ready *JQUERY
function rearrangeQuotes(container){
	//this is a for loop or something
	$(container).find('.quoted-message').each(function(i,quote){
		quote=$(quote);
		//create message div for quote
		var quoteBody=$('<div class="message">');
		//add everything but the message-top to the message div
		quote.contents().each(function(i2,node){
			node=$(node);
			//make sure we don't do shit with an already parsed quote
			if(!node.hasClass('message-top')&&!node.hasClass('message')){
				quoteBody.append(node);
			}
		});
		//add the new message div to the quoted-message if it's got anything in it
		if(quoteBody.contents()[0]){
			quote.append(quoteBody);
		}
	});
}

//adds hidden class to posts of ignorated users
//needs stuff and jquery
function ignorate(container){
	rearrangeQuotes(container);
	userids(container);
	//get the messages and such
	$(container).find('.message-top').each(function(i,top){
		top=$(top);
		//check against each ignorated id
		IMAGENORATED.each(function(j,id){
			if(top.attr('userID')==id){
				//do the thing in the function and stuff
				hideImages(top.parent().find('.message:first'));
				//this guy breaks the loop
				return;
			}
		});
	});
	//do shit for blank quotes
	$(container).find('.quoted-message[msgid=""]>.message').each(function(i,message){
		message=$(message);
		//get appropriate userID
		//this could be inside a quote or directly inside a message
		var parentID=message.parent().parent().prev().attr('userID')?
			message.parent().parent().prev().attr('userID'):
			message.parent().parent().parent().parent().parent().prev().attr('userID');
		//find out if parent is imagenorated
		IMAGENORATED.each(function(j,id){
			if(parentID==id){
				//do the thing in the function and stuff
				hideImages(message);
				//this guy breaks the loop
				return;
			}
		});
	});
}

//take a message element and turn images into links in it
function hideImages(message){
	//aah we gotta do the same thing in multiple places
	function hider(i,img){
		img=$(img);
		//make sure you don't gots links turned on
		if(img.children()[0]){
			//hide image
			img.children().addClass('hidden');
			//get image name
			var name=decodeURIComponent(img[0].href.substring(img[0].href.lastIndexOf('/')+1));
			//stick name in link content
			img.append(name);
			//add a br tag after the link
			img.after('<br>');
		}
	}

	//make sure we're only getting the imgs elements from this message and not subordinate ones
	message.children('.imgs').find('a').each(hider);
	//shit in spoilers oh god this is so long i wish i could select descendents of the selection context with find()
	message.children('.spoiler_closed,.spoiler_open').children('.spoiler_on_open').children('.imgs').find('a').each(hider);
}

//tag posts with userids
livelinks(ignorate);
addStyle('.hidden{display:none}','hidden');