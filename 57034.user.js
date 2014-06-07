// ==UserScript==
// @name          Friendster Testi
// @namespace     pnoytambayan.com
// @description   Auto testi message
// @include     http://www.friendster.com/testimonials.php?action=add&uid=*
// @include	http://www.friendster.com/publiccomments.php?uid=*
// @Version	Beta Version
// ==/UserScript==

(function() {

// Testimonial Signature : change variable below with yourself signature with "\n" (newline/enter)
var signT = "\n\n===============\nDon't forget to fill my Testimonial, OK?";

// Comment Signature : change variable below with yourself signature with "\n" (newline/enter)
var signC = "\n\n===============\nDon't forget to fill my CommentBox, OK?";

// Enough! Don't Edit!
var FSTestimonial = document.getElementsByName('body')[0];
var FSComment = document.getElementById('commentTextArea');

if (FSTestimonial) { 
		FSTestimonial.value = signT;
		} else {
		FSComment.value = signC;
	}
	

})();