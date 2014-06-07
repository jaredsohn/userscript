// ==UserScript==
// @name        SSS
// @namespace   pendevin
// @description Really highlights sss
// @include     http://boards.endoftheinter.net/showmessages.php?*
// @include     https://boards.endoftheinter.net/showmessages.php?*
// @require     http://code.jquery.com/jquery-2.1.0.min.js
// @version     2
// ==/UserScript==


//add userIDs of people you want strobed
//this is apple juice and John Egbert
const STROBED=$([4897,22887]);


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

function strobe(userids){
	var colors=['#ff0000','#ff8000','#ffff00','#00ff00','#0000ff','#ff00ff'];
	var text=['#ffffff','#ffffff','#000000','#000000','#ffffff','#000000'];
	var css='';
	userids.each(function(i,userid){
		css+='.message-container>.message-top[userID="'+userid+'"], .quoted-message>.message-top[userID="'+userid+'"]{'+
			'background-color:'+colors[num]+';'+
			'color:'+text[num]+';'+
		'}'+
		'.message-container>.message-top[userID="'+userid+'"] a, .quoted-message>.message-top[userID="'+userid+'"] a{'+
			'color:'+text[num]+';'+
		'}'+
		'.message-container>.message-top[userID="'+userid+'"] a:visited, .quoted-message>.message-top[userID="'+userid+'"] a:visited{'+
			'color:'+text[num]+';'+
		'}'
	});
	addStyle(css,'sss');
	num=(num+1)%6;
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

livelinks(userids);
var num=0;
window.setInterval(strobe,50,STROBED);