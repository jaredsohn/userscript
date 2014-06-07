// ==UserScript==
// @name           tianya script
// @namespace      caoglish
// @include        http://www.tianya.cn/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js

// ==/UserScript==

$('.post')
//.css('z-index','10')
.css('border-radius','8px')
.css('border','3px solid white')
.css('box-shadow','0px 0px 3px black');

$('#pContentDiv')
.removeClass('allpost');

//highlight first author
var firstAuthor=$('#firstAuthor td a').text();
console.log(firstAuthor);

$('#pContentDiv > table:contains("'+firstAuthor+'") font').attr('color','red');

//highlight clicked author

$('table').click(function(){
	var clickAuthor=$(this).find('font a').text();
	$('#pContentDiv > table font').attr('color','green');
	$('#pContentDiv > table').next('.post').css('border','3px solid white');
	$('#pContentDiv > table:contains("'+clickAuthor+'") font').attr('color','red');
	$('#pContentDiv > table:contains("'+clickAuthor+'")').next('.post').css('border','3px solid red');
	
});

$('table').dblclick(function(){
	var clickAuthor=$(this).find('font a').text();
	
	$('#pContentDiv > table').not(':contains("'+clickAuthor+'")').toggle('slow');
	$('#pContentDiv > table').not(':contains("'+clickAuthor+'")').next('.post').toggle('slow');
});