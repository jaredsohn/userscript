// ==UserScript==
// @name          Friendster Testimonial & Comment - Auto Signature
// @namespace     NuKeRz - http://userscripts.org/people/23975
// @description   Will Add automatic add a signature to your testimonial messages & comment.
// @include     http://www.friendster.com/testimonials.php?action=add&uid=*
// @include	http://www.friendster.com/publiccomments.php?uid=*
// @Version	March 20, 2007 - v1.1
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