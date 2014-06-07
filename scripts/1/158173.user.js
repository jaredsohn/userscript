// ==UserScript==
// @name           punch-comment-highlighter
// @namespace      userscripts.org
// @include        http://www.thepunch.com.au/articles/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// ==/UserScript==


//resolve the article uri
var punchref = window.location.href;
var urlCrudIndex = punchref.indexOf('/', 37);
if(urlCrudIndex != -1){
  GM_log('punchref:'+punchref);
  punchref = punchref.substring(0, urlCrudIndex);
  GM_log('punchref now:'+punchref);
}

//get the previous high value from persistent store.
var prev_high_value = GM_getValue(punchref, -1);
var ref_phv = prev_high_value;
var new_phv = prev_high_value;


var allDivs, thisDiv;
var changeCount = 0;

allDivs = document.getElementsByTagName('div');

for (var i = 0; i < allDivs.length; i++) {
    thisDiv = allDivs[i];
    //get the id.
    var thisDivId = thisDiv.id;
    if(thisDivId.indexOf('comment-') >= 0){

    	var thisCommentId = thisDivId.replace(/\D/g,"");
    	var commentValue = parseInt(thisCommentId);
    	if (commentValue > prev_high_value ){
    	
    	      //set the new prev high value
    	      //this satisfies unordered comment ids
    	      if(commentValue > new_phv) {
    	          new_phv = commentValue;
    		     //set the high value.
   	    		 GM_setValue(punchref, commentValue);
    	      }
   	
    	     //get the comment block of this div.
			var childDivs = thisDiv.getElementsByClassName('comment-body');
			
			for (var j = 0 ; j < childDivs.length; j++ ){
			
	    	    // change the comment background colour, but only if this is not the first time here.
	    	    if( ref_phv != -1 ){
					childDivs[j].style.border = '3px solid #df9b4b';
					childDivs[j].style.padding = '3px';
					
	    	    }
			}
        
    	    //update the counter for user notification
    	    changeCount++;
	    }
    
    }

}

var commentParagraphs = document.getElementsByClassName('comments');

for (var k = 0; k < commentParagraphs.length; k++) {
	var pp = commentParagraphs[k];
	if(pp.className != 'comments sidebar-comments' && pp.className != 'comments mustread-comments' ){
		var updateDescr = document.createElement('span');
		updateDescr.innerHTML = '  ('+changeCount+' new)';
		pp.appendChild(updateDescr);
	}
}



var moduleComments = document.getElementsByClassName('module-comments-header');

for (var p = 0; p < moduleComments.length; p++) {
	var mcd = moduleComments[p];
	var updateDescr2 = document.createElement('span');
	updateDescr2.innerHTML = '  ('+changeCount+' new)';
	mcd.appendChild(updateDescr2);
}
