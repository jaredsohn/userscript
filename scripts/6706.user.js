// ==UserScript==
// @name           BillMonk Image Adder
// @namespace      http://www.arthaey.com/
// @description    Creates images from first comment, if its format is img:http://...
// @include        https://www.billmonk.com/receipt/*
// ==/UserScript==

// TODO
//  - look at all comments and add multiple images if necessary
//  - make it a user preference whether image is added at top or in sidebar

window.addEventListener("load", function() {
   // check that elements are where we expect them to be
   var sharedImg = document.getElementsByTagName("img")[7];
   if (!sharedImg) return;

   /*
   var sidebar = getElementsByClassName("sidebar_box", "table")[0];
   if (!sidebar) return;
   */

   var commentDiv = document.getElementById("comments");
   if (!commentDiv) return;

   // if Linkify has already run, then it will be a span with an anchor
   var src;
   var comment = commentDiv.getElementsByTagName("span")[0];
   if (comment && comment.childNodes[0].nodeValue == "img:") {
      src = comment.childNodes[1].href;
   }
   // otherwise, it's just plain text
   else {
      comment = commentDiv.getElementsByTagName("i")[0];
      if (!comment) return;

      var regex = new RegExp("^img:(http://.+)$");
      src = comment.childNodes[0].nodeValue;
      if (!regex.test(src)) return;
      src = regex.exec(src)[1];
   }
   if (!src) return;

   var img = document.createElement("img");
   img.style.cssFloat = "left";
   img.src = src;

   // insert before "Shared Receipt" image
   sharedImg.parentNode.insertBefore(img, sharedImg);

   /*
   img.style.marginTop = "1em";
   // insert after "Use your cell phone" box in sidebar
   sidebar.parentNode.insertBefore(img, sidebar.nextSibling);
   */
}, true);

/*
function getElementsByClassName(clsName,htmltag){ 
	var arr = new Array(); 
	var elems = document.getElementsByTagName(htmltag);
	for ( var cls, i = 0; ( elem = elems[i] ); i++ ){
		if ( elem.className == clsName ){
			arr[arr.length] = elem;
		}
	}
	return arr;
}
*/
