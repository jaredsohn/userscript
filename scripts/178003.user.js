// ==UserScript==
// @name           New Facebook Cleaner
// @description    Hide Facebook useless area, now only Favorites and Groups Remaining on the left
// @author         jgiak92
// @include        http://www.facebook.*
// @include        https://www.facebook.*
// @updateURL      https://userscripts.org/scripts/source/142273.meta.js
// @downloadURL    https://userscripts.org/scripts/source/142273.user.js
// @version        1.0.0
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

function CleanFBP(){
	var t0 = document.getElementById('pagelet_ego_pane_w');
	if (t0 != null && t0.getAttribute("class")!="hidden_elem") {
		t0.setAttribute("class", "hidden_elem");
		console.log("Settato pagelet_ego_pane_w " + t0.getAttribute("class"));
	}
	
	var t1 = document.getElementById('pagelet_ego_pane');
	if (t1 != null && t1.getAttribute("class")!="hidden_elem") {
		t1.setAttribute("class", "hidden_elem");
		console.log("Settato pagelet_ego_pane " + t1.getAttribute("class"));
	}
	
	var t = document.getElementById('MessagingNetegoWrapper');
	if (t != null&& t.getAttribute("class")!="hidden_elem") {
		t.setAttribute("class", "hidden_elem");
		console.log("Settato sidmess "+t.getAttribute("class"));
	}
	
	var mf = document.getElementById('MessagingFrame');
    if (mf != null) {
        mf.style.width = '100%'; //Expand messaging frame
		if(document.getElementById('MessagingMainContent') != null)
		{
			document.getElementById('MessagingMainContent').style.width = '100%'; //Expand content area
			$('div .MessagingReadHeader').css('width','57%'); //Expand top section
			$('div .MessagingReadHeader').css('height','38px'); //Shrink top section
			$('div .MessagingReadHeader').css('padding-top','5px'); //Change top padding of top section
			$('div .MessagingReadHeader').css('border-bottom-width','1px'); //Add bottom border width to top section
			$('div .MessagingReadHeader').css('border-bottom-style','solid'); //Add bottom border style to top section
			$('div .MessagingReadHeader').css('border-bottom-color','lightGrey'); //Add bottom border color to top section
		}
		if(document.getElementById('MessagingContentWrapper')!=null){
			document.getElementById('MessagingContentWrapper').style.marginTop = '25px'; //Hide the top line
		}
		if(document.getElementById('MessagingShelf')!=null){
			document.getElementById('MessagingShelf').style.width = $('#MessagingMainContent').css('width'); //Expand grey section
		}
		if(document.getElementById('MessagingShelfContent')!=null){
			document.getElementById('MessagingShelfContent').style.paddingBottom = '25px'; //Shrink grey section
		}
		if(document.getElementById('MessagingInlineComposer')!=null){
			document.getElementById('MessagingInlineComposer').style.paddingLeft = '0px'; //remove padding
		}
        
        //Expand the writing section        
        $('div .MessagingComposerForm').css('max-width','none'); //Remove max width to allow to expand
		if(document.getElementsByTagName('textarea')!=null){
			document.getElementsByTagName('textarea')[0].style.maxWidth = 'none'; //Remove max width to allow to expand text box
		}
		if(document.getElementById('MessagingComposerOptions')!=null){
			document.getElementById("MessagingComposerOptions").style.maxWidth = 'none'; //Remove max width to allow to move option with text box expand
		}
    }
	
	var t2 = document.getElementById('pagesNav');
	if (t2 != null && t2.getAttribute("class")!="hidden_elem") {
		t2.setAttribute("class", "hidden_elem");
		console.log("Settato pagesNav "+t2.getAttribute("class"));
	}
	
	var t3 = document.getElementById('listsNav');
	if (t3 != null && t3.getAttribute("class")!="hidden_elem") {
		t3.setAttribute("class", "hidden_elem");
		console.log("Settato listsNav "+t3.getAttribute("class"));
	}
	
	var t4 = document.getElementById('appsNav');
	if (t4 != null && t4.getAttribute("class")!="hidden_elem") {
		t4.setAttribute("class", "hidden_elem");
		console.log("Settato appsNav "+t4.getAttribute("class"));
	}
}

function periodico()
{
	var t0 = document.getElementById('pagelet_ego_pane_w');
	if (t0 != null && t0.getAttribute("class")!="hidden_elem") {
		t0.setAttribute("class", "hidden_elem");
		console.log("Settato pagelet_ego_pane_w " + t0.getAttribute("class"));
	}
	var t1 = document.getElementById('pagelet_ego_pane');
	if (t1 != null && t1.getAttribute("class")!="hidden_elem") {
		t1.setAttribute("class", "hidden_elem");
		console.log("Settato pagelet_ego_pane " + t1.getAttribute("class"));
	}	
	
	var t = document.getElementById('MessagingNetegoWrapper');
	if (t != null&& t.getAttribute("class")!="hidden_elem") {
		t.setAttribute("class", "hidden_elem");
		console.log("Settato sidmess "+t.getAttribute("class"));
	}
}
//$(document).ready(function () {
/*$(window).load(function(){
	CleanFBP();
	var gc = document.getElementById('globalContainer');
	if(gc!=null){
		gc.addEventListener("DOMSubtreeModified", periodico, true);
	}
});*/

$(document).ready(function(){
	CleanFBP();
	var gc = document.getElementById('globalContainer');
	if(gc!=null){
		gc.addEventListener("DOMSubtreeModified", periodico, true);
	}
});