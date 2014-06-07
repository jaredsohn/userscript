// ==UserScript==
// @name eRepublik Link Warning Blocker
// @version 0.1
// @description eRepublik Link Warning Blocker

// @include *.erepublik.com/en

$(document).ready(function(){
$('.post_content p a').attr('href',$(this).html());
});
// ==/UserScript==