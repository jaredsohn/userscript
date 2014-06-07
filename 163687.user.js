// ==UserScript==
// @name        BroniesNL Discord Mod
// @namespace   http://www.bronies.nl
// @include     http://www.bronies.nl/e107_plugins/forum/*
// @include     https://www.bronies.nl/e107_plugins/forum/*
// @include		http://bronies.nl/e107_plugins/forum/*
// @include		https://bronies.nl/e107_plugins/forum/*
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     1
// @grant 		none
// ==/UserScript==

var a = ['http://i.imgur.com/PLxWOjB.png',
'http://i.imgur.com/eT8WBhH.png',
'http://i.imgur.com/LWNiFBX.png',
'http://i.imgur.com/p0WnF4o.png',
'http://i.imgur.com/KrUGbut.png',
'http://i.imgur.com/LH7wTtN.png',
'http://i.imgur.com/KzQQfS5.png',
'http://i.imgur.com/xFEjZ1B.png',
'http://i.imgur.com/YO3Y3Pb.png',
'http://i.imgur.com/7elZMP1.png',
'http://i.imgur.com/e3QgB0g.png',
'http://i.imgur.com/dRVWC1k.png',
'http://i.imgur.com/pEyf8li.png'];

$('body').hover(
function(e){
	document.documentElement.style.cursor = "url(http://i.imgur.com/Kr96ZyF.png), auto";
});

changeNames();
changeAvatar();
changeNotifications();
changeTitleImage();
changeHeader();
changeBackground();

function changeNames() {
	$('.forumheader a b').each(function(index) {
		//$(this).text('Guynio');
		var r = Math.floor(Math.random()*360);
		$(this).css('position','absolute');
		$(this).css('-moz-transform','rotate(-'+r+'deg)');
		$(this).css('-webkit-transform','rotate(-'+r+'deg)');
	});
	$('.forumheader3 .smallblacktext a').each(function(index) {
		if($(this).attr('href').indexOf('user') != -1) {
			var r = Math.floor(Math.random()*360);
			$(this).css('position','absolute');
			$(this).css('-moz-transform','rotate(-'+r+'deg)');
			$(this).css('-webkit-transform','rotate(-'+r+'deg)');
		}
	});
	$('.forumheader3 a').each(function(index) {
		if($(this).attr('href').indexOf('user') != -1) {
			var r = Math.floor(Math.random()*360);
			$(this).css('position','absolute');
			$(this).css('-moz-transform','rotate(-'+r+'deg)');
			$(this).css('-webkit-transform','rotate(-'+r+'deg)');
		}
	});
}

function changeAvatar() {
	$('.forumheader3 .spacer img').each(function(index) {
		var r = Math.floor(Math.random()*13);
		if($(this).attr('src').indexOf('avatar') != -1) {
			$(this).attr('src', a[r]);
		}
	});
}

function changeNotifications() {
	$('.forumheader2 img').each(function(index) {
		if($(this).attr('src').indexOf('nonew') != -1) {
			$(this).attr('src','http://i.imgur.com/5nCtxmA.jpg');
		} else if($(this).attr('src').indexOf('new.') != -1) {
			$(this).attr('src','http://i.imgur.com/CZ8jQlt.jpg');
		}
	});
}

function changeHeader() {
	$('#header').css('background','url(http://i.imgur.com/L3p8owm.jpg) no-repeat')
}

function changeTitleImage() {
	$('.divforum h2').css('background','url(http://i.imgur.com/IigoO8V.jpg) no-repeat');
	$('.divforum_viewtopic h2').css('background','url(http://i.imgur.com/IigoO8V.jpg) no-repeat')
}

function changeBackground() {
	$('body').css('background-image','url(http://i.imgur.com/IHqT8xH.png)')
}

function replaceAll(str1, str2, text, ignore){
   return text.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
}

jQuery.fn.extend({
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});
