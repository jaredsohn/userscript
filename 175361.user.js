// ==UserScript==
// @name        Ignorator
// @namespace   pendevin
// @description hides either the post body or the whole post of specified people
// @include     http://boards.endoftheinter.net/showmessages.php?*
// @include     http://archives.endoftheinter.net/showmessages.php?*
// @include     https://boards.endoftheinter.net/showmessages.php?*
// @include     https://archives.endoftheinter.net/showmessages.php?*
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @version     4
// ==/UserScript==


//add userIDs of people you want ignorated but want to still show the message-tops
//this is Kamano, Zasabi, and Shizuku Oikawa
const IGNORATED=$([13682,15104,23230]);

//add userIDs of people you want ignorated and don't want to show the message-tops
//this is Gate of Destiny and xdeathsagex
const INVISIBLE_TOPS=$([3910,6265]);


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

//tags message-tops with userids
//should call it with livelinks imo *JQUERY
function userids(container){
	$(container).find('.message-top').each(function(i,top){
		top=$(top);
		//get userid attribute from the profile link
		top.attr('userID',top.children('a[href*="user="]').attr('href').split('user=')[1]);
	});
}

//adds hidden class to posts of ignorated users
//needs stuff and jquery
function ignorate(container){
	rearrangeQuotes(container);
	userids(container);
	$(container).find('.message-top').each(function(i,top){
		top=$(top);
		//check against each ignorated id
		IGNORATED.each(function(j,id){
			if(top.attr('userID')==id){
				//hides message-body
				top.next().addClass('hidden');
				//this guy breaks the loop
				return;
			}
		});
		//check the super ignorated dudes
		INVISIBLE_TOPS.each(function(k,id){
			if(top.attr('userID')==id){
				//hides message container
				top.parent().addClass('hidden');
				//this guy breaks the loop
				return;
			}
		});
	});
}

//tag posts with userids
livelinks(ignorate);
addStyle('.hidden{display:none}','hidden');