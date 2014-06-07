// ==UserScript==
// @name       Twitterfall modification by IFET
// @namespace  IFET
// @version    0.1
// @description  used for ifet twitterfall
// @match	http://www.twitterfall.com/*
// @match	www.twitterfall.com/*
// @match	twitterfall.com/*
// @copyright  I Fix Everything Team
// ==/UserScript==

console.log('starting the superawesome IFET twitterfall script...');
var hashtagAlreadyExists = function(hashtag) {
    var result = false;
    $('#customlist > .customsearch').each(function(index, value) {
        if($.trim($(value).text()) == hashtag) {
            result = true;
        }
    });
             
	return result;
}

var generateHashtag = function() {
	var year = new Date().getFullYear();
	return '#EHFG' + year;    
}

// add the ehfg hashtag if necessary
if (!hashtagAlreadyExists(generateHashtag())) {
    console.log('setting hashtag', generateHashtag());
	$('#customsearch').val(generateHashtag());   
	$('#customform button').click();    
}

// set the new background
$('body').css('background-image', 'url("http://student.cosy.sbg.ac.at/~poberbich/ehfg_logo5.jpg")');

// append new speed and select it - twitterfall only checks the speed if the select is changed
$('#speed').append('<option id="ifetspeed" value="5000">ifet</option>');
$('#ifetspeed').prop('selected', true);
    
$('#presentmode').click();
$('#presentationtext').text(generateHashtag());

$('#closepresent').text('modified by I Fix Everything Team with Tampermokey');

// twitterlogin is shown
if ($('#popuploading > .dontshowme').css('display') == 'block') {
    console.log('twitter login not found, clicking the login link...');
    $('#popuploading > .dontshowme > .authorize > img[alt="Login With Twitter"]').click();
}

// override the mouseover, so twitterfall won't stop by accident
$('#timeline_body').mouseover(function() {
	var hightlightList = $(this).find('.highlight');
    $.each(hightlightList, function(index, element) {
		$(element).removeClass('highlight'); 
    });
    restartQueue();
});