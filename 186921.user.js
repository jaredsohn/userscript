// ==UserScript==
// @name        Seenthis Quotator
// @namespace   seenthis
// @description Easy answering with quote
// @include     http://seenthis.net/*
// @include     https://seenthis.net/*
// @version     2
// @grant       none
// ==/UserScript==



function getAuthor(){
	var selectNode = $(window.getSelection().anchorNode);
	var cont = selectNode.parents('.reponse');
	if(cont.length < 1) // selected text not in answer
		cont = selectNode.parents('article');	
	if(cont.length < 1) // selected text not in answer or article
		return "";
	var title = cont.find('.logo_auteur a').first().attr('title');

	var matches = title.match(/^(.+) \(@([^)]+)\)$/);
	if(matches[1].toLowerCase() == matches[2].toLowerCase())
		return '@'+matches[2];
	else
		return title;
}




function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text.replace('▻','').replace('►','').replace(/^\s*\n/gm, "") ;
}


function scrollToElement(selector, time, verticalOffset) {
    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({
        scrollTop: offsetTop
    }, time);
}

function addSelectedTextInAnswer(cont){
var selectedText = getSelectedText();
	if(selectedText.length > 0){
		var author = getAuthor();
		if(author.length >0){
			window.getSelection().removeAllRanges()
			var textarea = cont.find('textarea').first();
			/*if(textarea.val().length > 0){

			}
			else{
				textarea.val(author+' :\n❝'+selectedText+'❞\n');

			}*/
			insertAtTextareaCursor(textarea,author+' :\n❝'+selectedText+'❞\n');
		}
	}
}



function insertAtTextareaCursor(elt,text) {

    var txtarea = elt[0];
 var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
    "ff" : (document.selection ? "ie" : false ) );
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        strPos = range.text.length;
    }
    else if (br == "ff") strPos = txtarea.selectionStart;
    
    var front = (txtarea.value).substring(0,strPos); 
    var back = (txtarea.value).substring(strPos,txtarea.value.length); 
    txtarea.value=front+text+back;
    strPos = strPos + text.length;
    if (br == "ie") { 
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart ('character', -txtarea.value.length);
        range.moveStart ('character', strPos);
        range.moveEnd ('character', 0);
        range.select();
    }
    else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
}


$(document).keydown(function(e) {
    if(e.which == 82 && e.altKey && e.ctrlKey) {
	
var article = $(window.getSelection().anchorNode).parents('li[id^=message]').first();
	if(article.length > 0){

		addSelectedTextInAnswer(article);
		//article.find('.repondre .formulaire_poster_message').addClass('focus');
		var repondre = article.find('.repondre').first(); 	
		repondre.stop().slideDown("fast");
		scrollToElement(repondre.find('textarea').first(),500,-70);
		article.find(repondre.find('textarea')).focus();
       		
	}
    }

});


$('.bouton_repondre a').click(function(){
addSelectedTextInAnswer($(this).parents('li[id^=message]'));
});