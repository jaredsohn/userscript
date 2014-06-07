// Greasemonkey user script - punBB shout blocker
//
// This script disables strong (bold), color, and font tags 
// in user posts on punBB and vb boards.
//
// At some point I should probably break out punBB and vb
// components into separate scripts.
//
// This is also my first greasemonkey script and hence an
// utter hack job.
//
// written by Stephen Mason
//
// based on phpBB Signature Hider Written by Michael Tandy



// ==UserScript==
// @name          punBB shout blocker
// @namespace     http://www.stephemason.com/scripts
// @include       */showthread.php?t=*
// @include       */showpost.php?p=*
// @include       */viewtopic.php?*
// @description	  removes bold, color, and font formatting in punBB/vb posts.
// @exclude
// ==/UserScript==



  var allelements = document.getElementsByTagName("*");
 
  for (var i = 0 ; i < allelements.length ; i++) {

    if(allelements[i].className == "postmsg") { // punBB postbody
      var postmsgChildNodes = allelements[i].childNodes;
      for (var j = 0 ; j < postmsgChildNodes.length ; j++) {       
          ShoutHide(postmsgChildNodes[j]);
      } // end for each node of post
    } // end code for if it's a post
    
    
    if(allelements[i].className == "alt1") { //vb postbody
      var postmsgChildNodes = allelements[i].childNodes;
      for (var j = 0 ; j < postmsgChildNodes.length ; j++) {         
          ShoutHide(postmsgChildNodes[j]);
      } // end for each node of post
    } // end code for if it's a post
    
  } // end for each span

// 
// This function removes the undesired formatting from the post messages.
// Recursion was taken from Michael Tandy's phpBB signature hider @
// http://www.warwick.ac.uk/~esudbi/greasemonkeyscripts/#phpbbsighider

function ShoutHide(CurrentNode) {
	
	if (CurrentNode.childNodes.length > 0) { // If the node under inspection has children...
    var ChildNodes = CurrentNode.childNodes;       // ...create an array of them...
    for (var i = 0 ; i < ChildNodes.length ; i++)  // ...and for each of them...
      ShoutHide(ChildNodes[i]);             // ...recurse.
  }


  if(CurrentNode.nodeName == "STRONG") {    // Removes bold from punBB            
			removeNode(CurrentNode)      
  }

  if(CurrentNode.nodeName == "SPAN") {    // Removes color tags from punBB
   		CurrentNode.removeAttribute("style");       
  }
  
  if(CurrentNode.nodeName == "B") {    // Removes bold from vb            
			removeNode(CurrentNode)   
  }
  
  if(CurrentNode.nodeName == "FONT") {    // removes color, font, and size from vb 
 			CurrentNode.removeAttribute("color");
 			CurrentNode.removeAttribute("face");    
 			CurrentNode.removeAttribute("size");   
  }
  


}

// this function implements the removeNode functionality available in IE.
// taken verbatim from http://www.snook.ca/archives/000290.php

function removeNode(n){
    if(n.hasChildNodes()){
        for(var i=0;i<n.childNodes.length;i++){
            n.parentNode.insertBefore(n.childNodes[i].cloneNode(true),n);
        }
    }
    n.parentNode.removeChild(n);
}
