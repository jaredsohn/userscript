// ==UserScript==
// @name	HC Plus!
// @author	LokiCode
// @namespace	http://cubical-geek.blogspot.com/
// @description  Resizes posted images, searches for posts relevant to username, removes signatures, and more.
// @include	  *topic*.html*
// @include *post*.html*
// @include http://*hikiculture.net/*
// @require       http://code.jquery.com/jquery-1.8.3.min.js
// @require		https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// @icon        http://i.imgur.com/A3dAQKg.png
// @version       1.2.3
// ==/UserScript==


/* Changelog
1.2.3
	-Added support for Google Chrome via TamperMonkey
	-Removed image resize
1.2.2
	-Added GUI for settings
	-code cleanup
1.2.1
	-Added page navigation to bottom of screen	
1.2.0
	-Fixed top button
	-Code cleanup
1.1.9	-Added new bbcode and changed shortchuts
	-Sped up image resizer
	-Code cleanup
1.1.8
	-Added jQuery libraries @include
	-Added fade-in/fade-out effect for avatars
	-Added "top" button
1.1.7
	-Added bbcode shortcuts
	-Code cleanup
1.0.7
	-Minor code clean up
1.0.6
	-Fixed the image resizer conflict with CSS
	-Fixed settings
	-Removed customSearch function
	-Made features optional
	-Added @include handle for HC forum
	-Edited CSS code for image resizer compatibility
1.0.5
	-Added ThomasPink CSS as JS option for Stats, VIP, Rank, etc
	-Created separate resource file for CSS code. CSS will now load on document-start
1.0.4
	-Added handle for Google Chrome browsers
1.0.3
	-Added poster signature remover
1.0.2
	-Code clean up
1.0.1
	-Added image resizer
1.0.0
	-Initial code
*/
GM_config.init('HC Plus! Settings', {
    'avatar': {
        'label': 'Enable avatar fade effect?',
        'type': 'checkbox',
        'default': true
    },
	'vip': {
		'label': 'Make everyone VIP?',
		'type': 'checkbox',
		'default': true
	},
	'rank': {
        'label': 'Hide user ranks?',
        'type': 'checkbox',
        'default': true
    },
	'signature': {
        'label': 'Remove signatures from posts?',
        'type': 'checkbox',
        'default': true
    },	
	'highlight': {
        'label': 'Enable post highlighter?',
        'type': 'checkbox',
        'default': true
    },
	'bbcode': {
        'label': 'Enable bbcode shortcuts?',
        'type': 'checkbox',
        'default': true
    },
	'stats': {
        'label': 'Remove user stats?',
        'type': 'checkbox',
        'default': true
    },
	'top': {
        'label': 'Show top button?',
        'type': 'checkbox',
        'default': true
    },
	'nav': {
        'label': 'Show page navigation?',
        'type': 'checkbox',
        'default': true
    }
});
var enableAvatarFade = GM_config.get('avatar');
var enableEveryoneVip = GM_config.get('vip');
var enableHideRank = GM_config.get('rank');
var enableRemoveSignature = GM_config.get('signature');
var enableBBCodeShortcuts = GM_config.get('bbcode');
var enableHighlighter = GM_config.get('highlight');
var enableHideStats = GM_config.get('stats');
var enableTopButton = GM_config.get('top');
var enablePageNavigation = GM_config.get('nav');


/* Manual override for settings
enableEveryoneVip = true;
enableHideRank = true;
enableHideStats = true;
enableHighlighter = true;
enableRemoveSignature = true;
enableBBCodeShortcuts = true;
enableAvatarFade = true;
enableTopButton = true;
enablePageNavigation = true;
*/
function optWin() {
GM_config.open();
} GM_registerMenuCommand('HC Plus! Settings',optWin); 

$(document).ready(function() {

// post highlighter
function relevantPosts() {
	function searchPosts() {
		var usernames = GM_getValue('usernames');
		if (usernames !== undefined) {
			var queryRegExp = new RegExp("("+usernames.replace(/,\s*/g, '|')+")", "gi");
			console.info(queryRegExp);
			var divs = document.getElementsByTagName('div');
			var count = 0;
			for (var i=0;i<divs.length;i++) {
				if (divs[i].className == 'postbody') {
					if (divs[i].textContent.search(queryRegExp) != -1) {
						highlightSubject(divs[i], 'yellow');
						count++;
					}
				}
			}
		}
	}
	function highlightSubject(post, color) {
		var subject = post.previousSibling;
		while (subject.className == undefined || subject.className != 'postsubject') {
			subject = subject.previousSibling;
		}
		subject.style.backgroundColor = color;
	}
	function editUserNames() {
		var usernames = GM_getValue('usernames');
		usernames = usernames?usernames:'';
		var query = prompt('HC Plus!\n\nEnter your username:\n\nSeparate multiple usernames/nicknames with commas\nExample: Username One,UsernameTwo,UsErNaMe tHreE',usernames);
		if (query !== false) {
			GM_setValue('usernames', query);
		}
		searchPosts();
	}
	document.addEventListener("keydown", function(e) {
	if(!e.ctrlKey) return;
	switch(e.keyCode) {
		case 90: editUserNames(); return;
	} }, false);
	GM_registerMenuCommand('HC Plus!: Enter Your Username', editUserNames);	
	searchPosts();
}
// bbcode shortcut
function bbShortcut(){
	var textarea = document.getElementsByTagName('textarea');
	if (textarea.length = 1){
		function bbcode(val,val2){
			var len = textarea[0].value.length;
			var start = textarea[0].selectionStart;
			var end = textarea[0].selectionEnd;
			var str = textarea[0].value.substring(start, end);
			var replace = "["+val+"]" + str + "["+val2+"]";
			textarea[0].value =  textarea[0].value.substring(0,start) + replace + textarea[0].value.substring(end,len);

		}
	} else { return; }

	document.addEventListener("keydown", function(e) {
	if(!e.altKey) return;
	switch(e.keyCode) {
		// x
		case 88: bbcode("b","/b"); return;
		// k
		case 75: bbcode("i","/i"); return;
		// p
		case 80: bbcode("u","/u"); return;
		// c
		case 67: bbcode("code","/code"); return;
		// i
		case 73: bbcode("img","/img"); return;
		// u
		case 85: bbcode("url","/url"); return;
		// z
		case 90: bbcode("spoiler","/spoiler"); return;
		// q
		case 81: bbcode("quote","/quote"); return;
		// y
		case 89: bbcode("youtube","/youtube"); return;
		
	} }, false);
}

// top button
function topButton(){
	if (/#p.*/g.test(window.location.href) == true){
		$('body').append("<div class='topbutton'><a href='"+window.location.href.replace(/#p.*/g, '#top')+"' alt='top' name='top' style='position:fixed;bottom:20px;right:10px;'><img src='http://i.imgur.com/SGtwH.png' alt='Top'></a>'");
	} else {
		$('body').append("<div class='topbutton'><a href='"+window.location.href+"#top' alt='top' name='top' style='position:fixed;bottom:20px;right:10px;'><img src='http://i.imgur.com/SGtwH.png' alt='Top'></a>'");

	}
}
// conditionals
if (enableBBCodeShortcuts == true){
	bbShortcut();
}
if (enablePageNavigation == true){
var div = $('<div />').attr('style',"position:fixed;bottom:20px;right:70px;");
$(div).mouseover(function(){
	div.attr('style', "position:fixed;bottom:20px;right:70px;border: 1px solid black;background-color: #ddd8f0;");
});
$(div).mouseout(function(){
	div.attr('style',"position:fixed;bottom:20px;right:70px;");
});
$('body').append(div); 
div.append($('td.gensmall b')[0]);
$('td.gensmall b').detach();

}
if (enableTopButton == true){
	topButton();
}
if (enableHighlighter == true){
		relevantPosts();
}
if (enableTopButton == true){
	topButton();
}
// Avatar fade effect
if (enableAvatarFade == true){
	$('.postavatar img').css({"opacity":"0.3"});
	$('.postavatar img').each(function() {
        	  $(this).hover(
        	   function() {
        	       $(this).stop().animate({ opacity: 1.0 }, 400);
        	         },
        	   function() {
        	       $(this).stop().animate({ opacity: 0.3 }, 400);
        	    })
       		});
}
// Everyone's a VIP
if (enableEveryoneVip == true) {
	$(".username-coloured, .postauthor").css('cssText', 'font-weight: bold; color: #0099CC !important;');
}
// Hide user rank text	
if (enableHideRank == true) {
	$(".posterrank, .postrankimg").css('cssText', 'display: none !important;');
}
// Hide post stats
if (enableHideStats == true) {
	$(".postdetails").css('cssText', 'display: none !important;');
}
if (enableRemoveSignature == true) {
	$(".postbody.signature").css('cssText', 'display: none !important;');
}
});